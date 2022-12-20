import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import auth from '@/libs/auth'
import { API_GATEWAY } from '@/constants'
import router from '@/router'

// 创建 axios 实例
const service = axios.create({
  baseURL: API_GATEWAY,
  timeout: 20000
})

service.defaults.withCredentials = true

// 用于根据当前请求的信息，生成请求 Key
function generateReqKey (config) {
  const { method, url, params, data } = config
  return [method, url].join('&')
}

// 用于把当前请求信息添加到 pendingRequest 对象中
const pendingRequest = new Map()
function addPendingRequest (config) {
  const requestKey = generateReqKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel)
    }
  })
}

// 检查是否存在重复请求，若存在则取消已发的请求
function removePendingRequest (config) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    pendingRequest.delete(requestKey)
  }
}

// 请求拦截
service.interceptors.request.use(
  config => {
    // 获取token
    const token = auth.getToken()
    // 获取地区
    config.headers.Authorization = token || ''
    // 语言
    config.headers['x-dk-lang'] = store.getters['global/user/currentLanguage']
    // 地区
    config.headers['x-dk-region'] = store.getters['global/locate/userLocate']

    removePendingRequest(config)
    addPendingRequest(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    removePendingRequest(response.config)
    // 状态200，请求成功
    if (response.status === 200) {
      const _spd = response.data
      if (_spd && _spd.success) {
        // 接口状态成功直接返回 value
        return _spd.value
      } else {
        // 根据接口code返回提示
        switch (response?.data?.errorCode) {
          case 100012:
            // TT广告 / 广告主搜索次数限制
            store.dispatch('global/auth/setLimit', true)
            break
          case 105001:
            // 分销商权限
            break
          default:
            // 接口状态失败，提示错误信息，并返回reject
            Message({
              type: 'error',
              message: _spd.warmMsg || _spd.errorMsg,
              duration: 1500
            })
        }
        return Promise.reject(_spd)
      }
    }
    // 其他状态，返回下游处理
    return response.data
  },
  error => {
    removePendingRequest(error.config || {})
    // 是否重复请求
    if (axios.isCancel(error)) return false
    // 先判断是否是因为权限问题导致接口请求失败
    if (error.response && error.response.status) {
      // 根据状态码不同执行不同操作
      const _spd = error.response.data
      Message({
        type: 'warning',
        message: _spd.warmMsg || _spd.errorMsg,
        duration: 1500
      })
      switch (error.response.status) {
        case 401:
          // 提示用户跳转重新登录
          store.dispatch('global/account/login', { confirm: true, toPath: router.currentRoute.fullPath })
          break
        case 403:
          store.dispatch('global/account/denied')
          break
      }
      return Promise.reject(_spd)
    } else if (error.response && error.response.data) {
      // 如果有data，则说明接口请求成功，但是请求条件不符合接口要求
      const _spd = error.response.data
      Message({
        type: 'warning',
        message: _spd.warmMsg || _spd.errorMsg,
        duration: 1500
      })
      return Promise.reject(_spd)
    } else if (error.response) {
      return Promise.reject(error.response)
    } else {
      Message({
        type: 'error',
        message: error.message,
        duration: 1500
      })
      return Promise.reject(error)
    }
  }
)

export default service
