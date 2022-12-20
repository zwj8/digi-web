import auth from '@/libs/auth'
export default {
  namespaced: true,
  state: {
    isLogined: false,
    isLimit: false
  },
  getters: {
    isLogined (state) {
      return state.isLogined
    },
    isLimit (state) {
      return state.isLimit
    }
  },
  mutations: {
    setLogined (state) {
      state.isLogined = true
    },
    logout (state) {
      state.isLogined = false
    },
    setLimit (state, bool) {
      state.isLimit = bool
    }
  },
  actions: {
    check ({ commit, dispatch }, aid) {
      // 检查登陆状态
      if (auth.isLogined()) {
        // 设置路由状态
        commit('setLogined')
        // 检查 user 信息
        dispatch('global/user/check', null, { root: true })
      } else commit('logout')
      // 检查是否有Aid，如果有则存入
      if (aid) {
        auth.setAid(aid)
      }
    },
    // 设置次数限制提示
    setLimit ({ commit }, bool) {
      commit('setLimit', bool)
    }
  }
}
