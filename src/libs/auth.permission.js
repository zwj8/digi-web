import store from '@/store'
import router from '@/router'
import {
  DISTR_PATH_PREFIX,
  DISTR_ACTIONS,
  APPLY_DISTR,
  DISTR_ACCOUNT_CHART
} from '@/constants'

/* 权限这两个方法比较通用基础，抽取出来不要跟其他东西依赖混在一起 */
const permission = {}

/**
 * 当前用户是否具有权限
 */
permission.hasPermission = async function (action) {
  // if (process.env.NODE_ENV === 'development') {
  //   return true
  // }
  // 是否是分销后台 或者 服务商申请
  if (action.includes(DISTR_PATH_PREFIX) || action.includes(APPLY_DISTR)) {
    // 允许进入的路由
    const allow = await permission.allowActions()
    if (allow.includes(action)) return true
    else return false
  }

  // 进入课程详情，检查是否已经购买了课程
  if (action.includes('video')) {
    const isBought = store.getters['global/course/isBought']
    // 如果已经购买，返回 ture，没有购买，跳转到课程首页
    if (isBought) return true
    else {
      router.push({ name: 'courseIndex' })
    }
  }

  return true
}

// 根据分销商状态获取可进入的路由
permission.allowActions = async () => {
  const state = await _loadFromRemote()
  let allow = []
  switch (state) {
    case 0:
      allow = [...DISTR_ACTIONS.STATE_0]
      break
    case 1:
      allow = [...DISTR_ACTIONS.STATE_0, ...DISTR_ACTIONS.STATE_1]
      break
    case 2:
      allow = [...DISTR_ACTIONS.STATE_0, ...DISTR_ACTIONS.STATE_1, ...DISTR_ACTIONS.STATE_2]
      break
  }
  return allow
}

async function _loadFromRemote () {
  let state = store.getters['global/user/distrState']

  // 加载时顺便检测分销商info数据
  store.dispatch('global/distr/check')
  if (!state) {
    await store.dispatch('global/user/loadFromRemote')
    state = store.getters['global/user/distrState']
  }
  return state
}

// 当用户已经申请分销商，则将分销商申请重定向到分销商后台
permission.redirect = async path => {
  const state = await _loadFromRemote()
  if (path === APPLY_DISTR && state > 0) return DISTR_ACCOUNT_CHART
  return null
}

export default permission
