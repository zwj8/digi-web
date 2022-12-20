/* eslint-disable comma-dangle */
import router from '@/router'
import util from '@/libs/util'
import auth from '@/libs/auth'
import { MessageBox } from 'element-ui'
import { LS, AUTH_GATEWAY, APP_KEY } from '@/constants'

export default {
  namespaced: true,
  state: {
    singleDialogOnShow: false
  },
  getters: {},
  mutations: {
    lockSingleDialog (state) {
      state.singleDialogOnShow = true
    },
    releaseSingleDialog (state) {
      state.singleDialogOnShow = false
    }
  },
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     */
    login ({ dispatch, commit, state }, { confirm = false, toPath = '/' } = {}) {
      // 判断是否需要确认
      if (confirm) {
        if (!state.singleDialogOnShow) {
          commit('lockSingleDialog')
          // eslint-disable-next-line no-undef
          MessageBox.alert(
            '你处于非登录状态，请重新登录。',
            '登录失效 401', {
              confirmButtonText: '重新登录',
              type: 'warning',
              center: true,
              showClose: false,
              closeOnHashChange: false,
            }).then(async () => {
            dispatch('goAuth', { toPath })
          })
        }
      } else {
        dispatch('goAuth', { toPath })
      }
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      function logout () {
        // 跳转路由
        dispatch('clearAuth')
        // 根据用户当前定位，选择跳转到哪个登录页面
        const locate = auth.getLocate()
        window.location.href = `${AUTH_GATEWAY}/logout?appKey=${APP_KEY}&locate=${locate}`
      }
      // 判断是否需要确认
      if (confirm) {
        // eslint-disable-next-line no-undef
        MessageBox.confirm('退出当前账户吗?', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning',
        }).then(() => {
          logout()
        })
      } else {
        logout()
      }
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    async signUp ({ dispatch }) {
      await dispatch('goAuth', { action: 'signUp' })
    },
    /**
     * 没有权限，阻止访问页面
     * @param {*} param
     */
    denied ({ state, commit }, { routeBack = false } = {}) {
      if (!state.singleDialogOnShow) {
        commit('lockSingleDialog')
        // eslint-disable-next-line no-undef
        MessageBox.confirm(
          '你暂时没有访问权限。',
          '禁止操作 403', {
            confirmButtonText: '好',
            // cancelButtonText: '回到主页',
            type: 'warning',
            showCancelButton: false,
            center: true,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            closeOnHashChange: false,
          }).then(() => {
          if (routeBack) {
            if (!router?.history?.current?.name) router.push({ name: 'index' })
          }
        }).catch(() => {
          router.push({ name: 'index' })
        }).finally(() => {
          commit('releaseSingleDialog')
        })
      }
    },
    /**
     * @description 注销用户cookie、storage、vuex
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    clearAuth ({ dispatch }) {
      // 清空 vuex 用户信息
      dispatch('global/user/clear', null, { root: true })
      // 清空分销商信息
      dispatch('global/distr/clear', null, { root: true })

      // 清空用户cookie
      auth.removeToken()
      // 检查登录状态
      dispatch('global/auth/check', null, { root: true })
    },
    /**
     * @description 跳转登录
     */
    async goAuth ({ dispatch }, { action = 'login', toPath = '/' } = {}) {
      // 清除用户登录信息
      dispatch('clearAuth')
      util.lsSet(LS.PREV_PAGE, toPath)
      // 跳转认证中心
      // 根据用户当前定位，选择跳转到哪个登录页面
      const locate = auth.getLocate()
      let _url = ''
      if (locate !== 'CN') _url = `${AUTH_GATEWAY}/us`
      else _url = `${AUTH_GATEWAY}`
      window.location.href = `${_url}/${action}?appKey=${APP_KEY}`
    },
    /**
     * @description 充值密码
     */
    async resetPW ({ dispatch }, { email } = {}) {
      // 清除用户登录信息
      dispatch('clearAuth')
      // 根据用户当前定位，选择跳转到哪个登录页面
      const locate = auth.getLocate()
      // 跳转认证中心
      window.location.href = `${AUTH_GATEWAY}/passwd/reset?email=${email}&locate=${locate}`
    }
  },
}
