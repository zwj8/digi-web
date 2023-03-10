import _auth from '@/libs/auth'
import { COOKIE } from '@/constants'
import util from '@/libs/util'
import USER from '@/api/user'
export default {
  namespaced: true,
  state: {
    locate: null
  },
  getters: {
    // 获取用户定位
    userLocate (state) {
      return state.locate
    }
  },
  mutations: {
    setLocate (state, locate) {
      state.locate = locate
    }
  },
  actions: {
    // 检查用户定位
    checkLocate ({ dispatch }) {
      if (!util.cookie.get(COOKIE.LOCATE)) dispatch('getLocate')
    },
    // 获取用户定位
    getLocate ({ dispatch }) {
      USER.Locate().then(res => {
        if (res) {
          dispatch('setLocate', res)
          // 判断用户当前所在页面和地区是否符合，不符合时，弹出提示框询问是否切换到对应站点
          console.log(res)
        }
      }).catch(e => {
        dispatch('setLocate', 'CN')
      })
    },
    // 设置用户定位
    setLocate ({ commit }, locate) {
      commit('setLocate', locate)
      // 设置语言
      const _lang = locate !== 'CN' ? 'en' : 'zh'
      commit('global/user/setLanguage', _lang, { root: true })
      _auth.setLocate(locate) // 7 天后失效
    }
  }
}
