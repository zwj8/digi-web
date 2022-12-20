import USER from '@/api/user'
import util from '@/libs/util'
import auth from '@/libs/auth'
import { LS, EXCLUDE_ACTIONS } from '@/constants'
import { setLanguage } from '@/libs/util.i18n'

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    language: null
  },
  getters: {
    nick (state) {
      return state.info.nick
    },
    uid (state) {
      return state.info.uid
    },
    email (state) {
      return state.info.email
    },
    // 分销商状态
    distrState (state) {
      return state.info.distributorState
    },
    // 获取头像图片地址
    avatarUrl (state) {
      return state.info.avatarUrl
    },
    // 是否是会员
    isVip (state) {
      return state.info.hasOrder
    },
    // 会员过期时间
    userComboExpireAt (state) {
      return state.info.userComboExpireAt
    },
    // 用户套餐ID
    userComboId (state) {
      return state.info.userComboId
    },
    // 用户使用语言
    currentLanguage (state) {
      return state.language
    }
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    },
    setLanguage (state, code) {
      state.language = code
    }
  },
  actions: {
    /**
     * @description: 检查该路径是否需要获取userInfo
     * @param path 路由地址
     * @return {*}
     */
    check ({ dispatch, commit }, path) {
      // 如果不在不需要鉴权的列表里，那么执行load
      if (!EXCLUDE_ACTIONS.includes(path) || auth.isLogined()) {
        dispatch('load')
      }
    },
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set ({ dispatch, commit }, info) {
      // store 赋值
      commit('setInfo', info)
      // 持久化
      util.lsSetUser(auth.getUid(), LS.USER_INFO, info)
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load ({ dispatch, commit, state }) {
      if (state.info && Object.keys(state.info).length) {
        // 已经加载了
        return
      }
      // store 赋值
      const userInfo = util.lsGetUser(auth.getUid(), LS.USER_INFO, {})
      if (userInfo && Object.keys(userInfo).length) {
        commit('setInfo', userInfo)
      } else {
        dispatch('loadFromRemote')
      }
    },
    /**
     * 从远端拉用户信息
     * @param {*} param
     */
    async loadFromRemote ({ dispatch }) {
      // 加载用户信息
      const userInfo = await USER.GetInfo()
      dispatch('global/user/set', userInfo, { root: true })
      if (userInfo) return userInfo
    },
    /**
     * 清除用户信息
     * @param {*} param
     */
    async clear ({ commit }) {
      util.lsRemoveUser(auth.getUid(), LS.USER_INFO)
      commit('clearInfo')
    },
    /**
     * @description: 设置用户语言
     * @param {*} commit
     * @param {*} code
     * @return {*}
     */
    setLang ({ commit }, code = 'zh') {
      commit('setLanguage', code)
      setLanguage(code)
    }
  }
}
