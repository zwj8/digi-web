import CONFIG from '@/api/config'
import ls from 'local-storage'
import store from '@/store'
/**
 * @description: 设置全局点击事件，如果点击目标不是下拉框内，则关闭下拉框
 * @param {*} dm document
 * @param {*} vm Vue对象
 * @return {*}
 */
export const globalClose = (dm, vm) => {
  return dm.addEventListener('click', e => {
    try {
      if (!Object.prototype.hasOwnProperty.call(e.target, 'id')) {
        if (_querySelectParentNode(e.target, vm.name)) {
          vm.optionBoxShow = false
        }
      } else {
        vm.optionBoxShow = false
      }
    } catch { }
  })
}

/**
 * @description: 递归查找父元素id进行匹配，如果找不到就返回true，直到遇到section标签
 * @param {*} curDom 当前要查找的dom
 * @param {*} name 匹配参考值
 * @return {Boolean} 是否找到匹配的id
 */
function _querySelectParentNode (curDom, name) {
  if (curDom.id !== name) {
    if (curDom.nodeName !== 'BODY') {
      return _querySelectParentNode(curDom.parentNode, name)
    } else {
      return true
    }
  }
}

/**
 * @description: 获取选项
 * @param {*} vm Vue对象
 * @param {*} optionName 要设置的选项对象名
 * @return {*}
 */
export const getOptions = async (vm, optionName) => {
  const lowerName = optionName[0].toLowerCase() + optionName.substring(1) // 将首字母小写
  // 现在本地缓存找
  let options = await findInLocalStorage(lowerName)
  // 本地缓存找不到，调用接口获取
  if (!options) options = await callApi(optionName)
  // 设置 vuex config 值
  store.dispatch('global/config/dispatchOpts', { keyName: lowerName, value: options })
  vm[`${lowerName}Options`] = options
}

/**
 * @description: 查找本地缓存获取选项
 * @param {*} vm Vue对象
 * @param {*} keyName 缓存key名
 * @return {*} 缓存数据 / false
 */
export const findInLocalStorage = async (keyName) => {
  const result = JSON.parse(localStorage.getItem(keyName))
  if (result) return result
  else return false
}
/**
 * @description: 调用接口获取选项
 * @param {*} apiName 接口名称
 * @return {*} 缓存数据
 */
export const callApi = (apiName) => {
  return CONFIG[`Get${apiName}`]().then((res) => {
    if (!res || res === null || res.length === 0) return []
    const tmp = res.map((v) => {
      if (apiName === 'Region') return { label: v.zhName, value: v.code } // 就国家跟别人不一样
      else if (apiName === 'RegionGroup') { // 国家分组跟人更不一样
        return {
          groupLabel: v.groupLabel,
          groupValue: v.regionOptionDTOList.map(groupItem => ({ label: groupItem.zhName, value: groupItem.code }))
        }
      } else return { label: v.label, value: v.key }
    })
    const loaclName = apiName[0].toLowerCase() + apiName.substring(1) // 将首字母小写
    localStorage.setItem(loaclName, JSON.stringify(tmp))
    return tmp
  })
}
/**
 * @description: 处理传参
 * @param {*} params 搜索组件传的值
 * @return {*}
 */
export const formatSearchParams = (params) => {
  const _params = {}
  // 如果没有参数，则返回空对象
  if (!params) return _params
  Object.keys(params).forEach(key => {
    if (typeof params[key] === 'string' || typeof params[key] === 'number') {
      if (params[key] !== '') _params[key] = params[key]
      // 当 fuzzySearchText 不存在时，不传 fuzzySearchType， 因为他们是组合一起使用的
      if (!params.fuzzySearchText) delete params.fuzzySearchType
    } else if (Array.isArray(params[key])) {
      // 如果是广告数（adTotal）或者投放天数（putDay），则把数组转成Min/Max形式
      if (['adTotal', 'putDay'].includes(key)) {
        // 如果有值则添加，如果没有则删除
        if (params[key].length) {
          _params[`${key}Min`] = params[key][0]
          _params[`${key}Max`] = params[key][1]
          // 当putDayMax 和 adTotalMax 大于100时，直接传null
          if (key === 'putDay') _params.putDayMax = _params.putDayMax >= 100 ? null : _params.putDayMax
          if (key === 'adTotal') _params.adTotalMax = _params.adTotalMax >= 100 ? null : _params.adTotalMax
        } else {
          delete _params[`${key}Min`]
          delete _params[`${key}Max`]
          delete params[`${key}Min`]
          delete params[`${key}Max`]
        }
      } else if (['firstPut', 'lastPut'].includes(key)) {
        // 时间范围处理
        if (params[key].length) {
          _params[`${key}From`] = params[key][0]
          _params[`${key}To`] = params[key][1]
        } else {
          delete _params[`${key}From`]
          delete _params[`${key}To`]
          delete params[`${key}From`]
          delete params[`${key}To`]
        }
      } else {
        _params[key] = params[key]
      }
    } else if (typeof params[key] === 'boolean') {
      _params[key] = params[key]
    } else if (['adTotalMax', 'putDayMax'].includes(key)) {
      // adTotalMax 和 putDayMax 可以为 null
      _params[key] = params[key]
    }
  })
  return _params
}

// clazz 专用
export const getClazz = async vm => {
  let clazz = await clazzFindInLocalStorage()
  if (!clazz) clazz = await clazzCallApi()
  // 设置 vuex config 值
  store.dispatch('global/config/dispatchOpts', { keyName: 'clazz', value: clazz })
  vm.clazzOptions = clazz
}

/**
 * @description: 查找本地缓存
 * @return {*}
 */
async function clazzFindInLocalStorage () {
  const result = ls.get('clazz')
  if (result) return result
  else return false
}

/**
 * @description: 远端获取 clazz
 * @return {*}
 */
async function clazzCallApi () {
  return CONFIG.GetClazz().then((res) => {
    if (res === null || res.length === 0) return []
    const tmp = res.map((v) => ({ zhLabel: v.label, enLabel: v.key, value: v.key }))
    // 让电商排在最前
    const eIndex = tmp.findIndex(e => e.value === 'ECOMMERCE')
    const eObject = tmp.splice(eIndex, 1)
    tmp.unshift(...eObject)
    tmp.unshift({ zhLabel: '全选', enLabel: 'ALL', value: '' })
    localStorage.setItem('clazz', JSON.stringify(tmp))
    return tmp
  })
}
