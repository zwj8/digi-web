const defaultData = {
  orderSn: '',
  payAmount: '',
  qrCodeUrl: '',
  cur: ''
}
export default {
  namespaced: true,
  state: {
    show: false,
    payType: null,
    data: { ...defaultData },
    itemId: null,
    couponCode: null
  },
  getters: {
    // 收银台弹窗是否显示
    show (state) {
      return state.show
    },
    // 支付类型
    payType (state) {
      return state.payType
    },
    // 获取源数据
    data (state) {
      return state.data
    },
    // 获取套餐ID
    itemId (state) {
      return state.itemId
    },
    // 获取优惠卷ID
    couponCode (state) {
      return state.couponCode
    }
  },
  mutations: {
    // 设置 show
    setShow (state, status = false) {
      state.show = status
    },
    // 设置支付类型
    setType (state, type = null) {
      state.payType = type
    },
    // 设置源数据
    setData (state, data = { ...defaultData }) {
      state.data = { ...data }
    },
    // 设置套餐ID
    setItemId (state, value = null) {
      state.itemId = value
    },
    // 设置套餐ID
    setCouponCode (state, value = null) {
      state.couponCode = value
    }
  },
  actions: {
    /**
     * @description: 设置支付类型并打开收银台弹窗
     * @param {*} commit
     * @param {*} status
     * @param {*} type
     * @return {*}
     */
    set ({ commit }, { status, type }) {
      commit('setType', type)
      commit('setShow', status)
    },
    /**
     * @description: 设置源数据
     * @param {*} commit
     * @param {*} data
     * @param {*} itemId
     * @param {*} couponCode
     * @return {*}
     */
    setSource ({ commit }, { data, itemId, couponCode }) {
      commit('setData', data)
      commit('setItemId', itemId)
      commit('setCouponCode', couponCode)
    },
    // 关闭收银台
    close ({ commit }) {
      commit('setShow')
      commit('setType')
      commit('setData')
    }
  }
}
