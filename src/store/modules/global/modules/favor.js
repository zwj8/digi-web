import { FAVOR_TYPE } from '@/constants'
export default {
  namespaced: true,
  state: {
    show: false,
    actionType: null,
    favorType: null,
    favorData: null,
    favorIndex: null
  },
  getters: {
    // 是否显示收藏框
    isShow (state) {
      return state.show
    },
    // 操作类型
    actionType (state) {
      return state.actionType
    },
    // 收藏类型
    favorType (state) {
      return state.favorType
    },
    // 数据源
    favorData (state) {
      return state.favorData
    },
    // 数据源索引
    favorIndex (state) {
      return state.favorIndex
    },
    // 默认分组id
    defaultGroupId (state) {
      return state.favorData?.favorGroup || null
    }
  },
  mutations: {
    /**
     * @description: 设置收藏组件显示
     * @param {*} state
     * @param {Boolean} status true | false
     * @return {*}
     */
    setShow (state, status = false) {
      state.show = status
    },
    /**
     * @description: 设置此次操作的类型
     * @param {*} state
     * @param {*} type 操作类型 FAVOR | EDIT | CANCEL
     * @return {*}
     */
    setActionType (state, type = null) {
      state.actionType = type
    },
    /**
     * @description: 设置收藏类型
     * @param {*} state
     * @param {*} type
     * @return {*}
     */
    setFavorType (state, type = FAVOR_TYPE.AD) {
      state.favorType = type
    },
    /**
     * @description: 设置要操作的数据源
     * @param {*} state
     * @param {*} data
     * @return {*}
     */
    setFavorData (state, data = null) {
      state.favorData = data
    },
    /**
     * @description: 设置数据源的索引
     * @param {*} state
     * @param {*} index
     * @return {*}
     */
    setFavorIndex (state, index = null) {
      state.favorIndex = index
    }
  },
  actions: {
    /**
     * @description: 打开收藏组件
     * @param {*} commit
     * @param {*} type 要操作的分组类型
     * @param {*} data 要操作的数据源
     * @param {*} index 要操作的数据在列表的索引
     * @return {*}
     */
    openFavor ({ dispatch, commit }, { type, data, index, action }) {
      // 获取各项数据
      commit('setFavorType', type)
      commit('setFavorData', data)
      commit('setFavorIndex', index)
      commit('setActionType', action)

      // 打开收藏组件
      commit('setShow', true)
    },
    /**
     * @description: 关闭收藏组件
     * @param {*} commit
     * @return {*}
     */
    closeFavor ({ commit }) {
      // 关闭组件
      commit('setShow')
      // 重置所有数据
      commit('setFavorType')
      commit('setFavorData')
      commit('setFavorIndex')
      commit('setActionType')
    }
  }
}
