import CONFIG from '@/api/config'
export default {
  namespaced: true,
  state: {
    region: null,
    clazz: null,
    btnCatalog: null,
    siteFramework: null,
    regionGroup: null,
    timesLevel: null,
    timer: 1
  },
  getters: {
    region (state) { return state.region },
    clazz (state) { return state.clazz },
    btnCatalog (state) { return state.btnCatalog },
    siteFramework (state) { return state.siteFramework },
    timesLevel (state) { return state.timesLevel },
    regionGroup (state) { return state.regionGroup }
  },
  mutations: {
    setRegion (state, value) {
      state.region = value
    },
    setOpts (state, { keyName, value }) {
      state[keyName] = value
    },
    setTimer (state) {
      state.timer = 0
    }
  },
  actions: {
    dispatchOpts ({ commit }, value) {
      commit('setOpts', value)
    },
    /**
     * @description: 检查state是否有region
     * @param {*} dispatch
     * @param {*} state
     * @return {*}
     */
    async checkRegion ({ dispatch, state }) {
      // 已经加载了，直接返回
      if (state?.region) return
      // 没有加载，调用加载方法
      await dispatch('load')
    },
    /**
     * @description: 加载region
     * @param {*} dispatch
     * @param {*} commit
     * @return {*}
     */
    async load ({ dispatch, commit, state }) {
      const localRegion = localStorage.getItem('region')
      // 如果有缓存，则读取缓存数据
      if (localRegion) commit('setRegion', JSON.parse(localRegion))
      // 没有缓存，调用接口
      else if (state.timer) await dispatch('loadRemote')
    },
    /**
     * @description: 调用接口获取region
     * @param {*} commit
     * @return {*}
     */
    async loadRemote ({ commit }) {
      commit('setTimer')
      await CONFIG.GetRegion().then(async res => {
        let regionList = null
        if (res.length) regionList = res.map(v => ({ label: v.zhName, value: v.code }))
        if (regionList) {
          await commit('setRegion', regionList)
          await localStorage.setItem('region', JSON.stringify(regionList))
        }
      })
    }
  }
}
