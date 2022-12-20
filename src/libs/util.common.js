/* eslint-disable no-undef */
import ls from 'local-storage'
import { FRONT_SCROLL_CLASS } from '@/constants'
import store from '@/store'
import { Message } from 'element-ui'
import i18n from '@/i18n'

const common = {}

/**
 * 是否开发环境
 * @param {boolean} onlyDev 是否仅判断development环境
 */
common.isDev = function (onlyDev = false) {
  return process.env.NODE_ENV === 'development'
}

/**
 * 是否测试环境
 * @param {boolean} onlyDev 是否仅判断test环境
 */
common.isTest = function (onlyDev = false) {
  return process.env.NODE_ENV === 'test'
}

/**
 * 是否生产环境
 * @param {boolean} onlyPro 是否仅判断production环境
 */
common.isPro = function (onlyPro = false) {
  return process.env.NODE_ENV === 'production'
}

/**
 * 获取当前运行版本
 */
common.getVersion = function () {
  return null
}

/**
 * @description 本地存储
 * @param {String} name cookie name
 */
common.lsSet = function (name, value) {
  return ls.set(name, value)
}

/**
 * @description 拿本地存储值
 * @param {String} name cookie name
 */
common.lsGet = function (name, defaultValue = null) {
  const value = ls.get(name)
  return value == null || value === undefined ? defaultValue : value
}

/**
 * @description 删除本地缓存
 * @param {String} name cookie name
 */
common.lsRemove = function (name) {
  return ls.remove(name)
}

/**
 * @description 本地存储
 * @param {String} name cookie name
 */
common.lsSetUser = function (uid, name, value) {
  if (!uid) {
    uid = 'ghost'
  }
  let userCache = ls.get('user')
  if (!userCache) {
    userCache = {}
  }
  if (!userCache[uid]) {
    userCache[uid] = {}
  }
  userCache[uid][name] = value

  return ls.set('user', userCache)
}

/**
 * @description 拿本地存储值
 * @param {String} name cookie name
 */
common.lsGetUser = function (uid, name, defaultValue = null) {
  if (!uid) {
    uid = 'ghost'
  }

  const userCache = common.lsGet('user', {})
  if (!userCache || !userCache[uid]) {
    return defaultValue
  }

  return userCache[uid][name] == null || userCache[uid][name] === undefined ? defaultValue : userCache[uid][name]
}

/**
 * @description 删除本地缓存
 * @param {String} name cookie name
 */
common.lsRemoveUser = function (uid, name) {
  if (!name) {
    return false
  }

  if (!uid) {
    uid = 'ghost'
  }

  const userCache = common.lsGet('user', {})
  if (!userCache || !userCache[uid]) {
    return true
  }

  delete userCache[uid][name]
  return ls.set('user', userCache)
}

/**
 * @description pop 本地存储值
 * @param {String} name cookie name
 */
common.lsPop = function (name) {
  const value = ls.get(name)
  ls.set(name, null)
  return value
}

/**
 * @description 构建 Url
 * @param {String} baseUrl
 * @param {String} params
 */
common.buildUrl = function (baseUrl, params) {
  const parmasArray = Object.keys(params).map(item => {
    return `${item}=${encodeURIComponent(params[item])}`
  })
  return `${baseUrl}?${parmasArray.join('&')}`
}

/**
 * 网络测速
 * @param {Number} times
 */
common.getNetSpeed = function (times = 3) {
  // downlink测算网速
  const connection = window.navigator.connection
  if (connection && connection.downlink) {
    let speed = connection.downlink * 1024 / 8
    let m = ' kb/s'
    if (speed > 1024) {
      speed /= 1024
      m = ' mb/s'
    }
    return speed.toFixed(2) + m
  }
  // 多次测速求平均值
  const arr = []
  for (let i = 0; i < times; i++) {
    arr.push(getSpeedWithAjax('https://s3.forcloudcdn.com/dmc/6fb948e2-3983-42c5-bb59-44b15731406d-1920x1080.jpg'))
  }
  return Promise.all(arr).then(speeds => {
    let sum = 0
    speeds.forEach(speed => {
      sum += speed
    })

    let speed = sum / times
    let m = ' kb/s'
    if (speed > 1024) {
      speed /= 1024
      m = ' mb/s'
    }
    return speed.toFixed(2) + m
  })
}

/**
 * 网络是否在线
 */
common.isOnline = function () {
  return navigator.onLine
}

/**
 * 获取对象嵌套层级的值，没有则返回默认值
 * 默认值：null
 * @param {Object} times
 * @param {String} times
 * @param {Mixed} times
 */
common.getDeepValueOrDefault = function (object, key, defValue = null) {
  if (!object || !key) {
    return defValue
  }
  let value = object
  for (const field of key.split('.')) {
    if (field && value && typeof value[field] !== 'undefined') {
      value = value[field]
    } else {
      value = defValue
      break
    }
  }
  return value
}

/**
 * 复制
 * @param {Object} title 复制的标题
 * @param {String} str   复制的内容
 */
common.copyToClipboard = function (title = '', str = '', msgSuccess = i18n.tc('copy.success'), msgFailed = i18n.tc('copy.failed')) {
  if (Object.prototype.hasOwnProperty.call(navigator, 'clipboard') && Object.prototype.hasOwnProperty.call(navigator.clipboard, 'writeText')) {
    navigator.clipboard.writeText(str).then(() => {
      Message({
        type: 'success',
        message: `${title}${msgSuccess}`,
        duration: 2000
      })
    }).catch(e => {
      Message({
        type: 'error',
        message: `${title}${msgFailed}：${e}`,
        duration: 2000
      })
    })
  } else {
    const textareaCopy = document.createElement('textarea')
    textareaCopy.setAttribute('readonly', 'readonly')
    textareaCopy.value = str
    document.body.appendChild(textareaCopy)
    textareaCopy.select()
    document.execCommand('copy')
    textareaCopy.remove()
    Message({
      type: 'success',
      message: `${title}${msgSuccess}`,
      duration: 2000
    })
  }
}

/**
 * @description:               加载指定目录下所有模块
 * @param {Array}   moudles    require.context 返回的路径和文件名组成的数组
 * @return {Object}            返回一个模块对象
 */
common.importAll = moudles => {
  const _modules = {}
  moudles.keys().forEach(key => {
    const module = moudles(key).default
    const name = module.name
    _modules[name] = module
  })

  return _modules
}

/**
 * @description: 让滚动条置顶
 * @param {String} className 要置顶滚动条的元素
 * @return {*}
 */
// 置顶
common.top = (className) => {
  // 如果没有置顶样式名，则默认置顶前台layout
  const elementName = className || FRONT_SCROLL_CLASS
  const emt = document.querySelector(elementName)
  if (emt) emt.scrollTop = 0
}

/**
 * @description: 国家code转中文
 * @param {*} regionCodeList code列表
 * @return {*}
 */
common.regionCodeToCN = regionCodeList => {
  if (!Array.isArray(regionCodeList) || regionCodeList.length <= 0) return []
  let regionList = store.getters['global/config/region']
  if (Array.isArray(regionList) && regionList.length) {
    regionList = regionList.filter(r => regionCodeList.includes(r.value))
    return regionList.map(v => v.label)
  }
  return []
}

/**
 * @description: 数组显示超过N个后，就变成省略号，然后添加一个括号显示总数
 * @param {*} reArr      列表
 * @param {*} canShowNum 显示的参数数量     default 3
 * @param {*} needCount  是否需要显示总数   default true
 * @param {*} needOmit   是否需要显示省略号 default false
 * @return {*}
 */
common.arrayEllipsis = (reArr = [], canShowNum = 3, needCount = true, needOmit = false) => {
  if (!Array.isArray(reArr) || reArr.length <= 0) return ''
  let str = ''
  // 数组除空
  reArr = reArr.filter(v => v !== null && v !== '')
  const len = reArr.length
  if (reArr.length <= canShowNum) {
    str = needCount ? `${reArr.join('、')} (${len})` : `${reArr.join('、')}`
  } else {
    str = needCount
      ? `${reArr.slice(0, canShowNum).join('、')}... (${len})`
      : `${reArr.slice(0, canShowNum).join('、')}${needOmit
        ? '...'
        : ''}`
  }
  return str
}

/**
 * @description: 克隆对象
 * @param {*} targetObject 要克隆的目标对象
 * @return {*} 返回已经克隆的对象
 */
common.cloneObject = targetObject => {
  return JSON.parse(JSON.stringify(targetObject))
}

/**
 * @description: 首字母大写
 * @param {*} str 要处理的字符串
 * @return {*} 返回处理后的字符串
 */
common.firstLetterUppercase = str => {
  const strList = [...str]
  strList[0] = strList[0].toUpperCase()
  return strList.join('')
}

export default common
