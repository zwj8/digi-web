import Vue from 'vue'
import VersionTooltip from './VersionTooltip.vue'
import util from '@/libs/util'

// OSS URL
const versionUrl = process.env.VUE_APP_VERSION_URL

// 组件构造器
const VersionConstructor = Vue.extend(VersionTooltip)

// 提示是否已经显示
let _isToolTipShow = false

// 对比版本间隔时间 默认5分钟
let _timeInterval = 300000

/**
 * @description: 挂载提示组件
 * @param {*} options 传参（暂时没用上，但先保留
 * @return {*}
 */
const _mountVersion = function (options) {
  const vm = new VersionConstructor({
    data: options
  })

  vm.$mount()
  document.body.appendChild(vm.$el)
}

/**
 * @description: 提示框显示
 * @return {*}
 */
const _show = () => {
  // 获取用户当前使用语言
  const currentLang = util.cookie.get('lang')
  _mountVersion({ lang: currentLang })
}

/**
 * @description: 获取版本号
 * @return {*}
 */
const _getVersion = async () => {
  const timestamp = new Date().getTime()
  const currentUrl = `${versionUrl}?_t=${timestamp}`
  try {
    const response = await fetch(currentUrl, {
      method: 'GET'
    })
    const result = await response.json()
    return result
  } catch (e) {
    console.log(e)
    return null
  }
}

/**
 * @description: 获取当前版本
 * @return {*}
 */
const _getCurrentVersion = async () => {
  const currentVersion = await localStorage.getItem('version')
  return currentVersion
}

/**
 * @description: 设置版本号
 * @param {*} versionStr
 * @return {*}
 */
const _setVersion = (versionStr) => {
  localStorage.setItem('version', versionStr)
}

/**
 * @description: 对比版本
 * @return {*}
 */
const _diffVersion = async () => {
  const remoteResult = await _getVersion()
  const remoteVersion = remoteResult?.version || null
  const currentVersion = await _getCurrentVersion()
  if (!currentVersion) {
    _setVersion(remoteVersion || '')
  } else {
    // 版本不同，弹出提示
    if (
      remoteVersion &&
      remoteVersion !== currentVersion
    ) {
      _show()
      _setVersion(remoteVersion)
      _isToolTipShow = true
    }
  }

  // 如果已经显示提示，则不在获取版本接口
  if (!_isToolTipShow) _setTimeout()
}

/**
 * @description: 设置定时器
 * @return {*}
 */
const _setTimeout = () => {
  setTimeout(_diffVersion, _timeInterval)
}

/**
 * @description: 启动版本对比
 * @param {*} timeInterval 获取版本信息间隔时间
 * @return {*}
 */
const _start = (timeInterval = null) => {
  if (timeInterval) _timeInterval = timeInterval
  _diffVersion()
}

export default { start: _start }
