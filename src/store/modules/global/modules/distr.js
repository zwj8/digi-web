import { DISTR_MENU } from '@/constants/config'
import DISTR from '@/api/distr'
import auth from '@/libs/auth'
import { LS } from '@/constants'
import util from '@/libs/util'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    menu: [...DISTR_MENU],
    activeMenu: 'plan',
    activeMenuItem: 'accountList',
    info: null
  },
  getters: {
    // 分销商类型
    distrType (state) {
      return state.info?.type
    },
    // 获取导航
    menu (state) {
      let _menu = [...state.menu]
      // 如果账号未审核通过,过滤掉个人信息
      if (state.info?.stateLabel !== '已审核' && state.info?.stateLabel !== '已激活') {
        _menu = _menu.filter(item => item.pathName !== 'distrInfo')
      }
      // 如果不是二级分销商,直接返回
      if (state.info?.type !== 'SECONDARY') return _menu
      // 如果是二级分销商,过滤账号列表
      _menu = state.menu.map(item => {
        item.children = item.children.filter(itemChild => itemChild.pathName !== 'accountList')
        return item
      })
      return _menu
    },
    // 获取当前激活的导航
    activeMenu (state) {
      return state.activeMenu
    },
    // 获取当前激活导航的子导航
    menuChildren (state) {
      const children = state.menu.find(v => v.pathName === state.activeMenu)
      return children?.children || null
    },
    // 获取当前激活的子导航
    activeChildrenMenu (state) {
      return state.activeMenuItem
    },
    // 获取分销商自己的 company 名
    company (state) {
      return state?.info?.company
    },
    // 获取duid
    duid (state) {
      return state?.info?.duid
    },
    // 是否是二级分销商
    isSecondary (state) {
      return state?.info?.type === 'SECONDARY'
    },
    // 是否有设置提现账号
    hasWdAccount (state) {
      return state?.info?.wdAccount !== '' || state?.info?.wdAccount !== null
    },
    // 获取父级分销商
    parentName (state) {
      return state?.info?.parentName
    },
    // 获取分销商全部信息
    distrInfo (state) {
      return state?.info
    }
  },
  mutations: {
    setInfo (state, info = {}) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    },
    // 设置当前导航
    setActiveMenu (state, childrenPathName = null) {
      if (!childrenPathName) childrenPathName = router?.history?.current?.name
      state.menu.forEach(v => {
        if (v.children.some(item => item.pathName === childrenPathName)) {
          state.activeMenu = v.pathName
        }
      })
      state.activeMenuItem = childrenPathName
    }
  },
  actions: {
    /**
     * @description: 检查是否有分销商信息
     * @param {*} state
     * @return {*}
     */
    check ({ dispatch, state }) {
      if (!state?.info?.company) {
        // 没有加载，执行加载流程
        dispatch('load')
      }
    },
    /**
     * @description: 设置分销商信息
     * @param {*} commit
     * @param {*} info
     * @return {*}
     */
    set ({ commit }, info) {
      commit('setInfo', info)
      util.lsSetUser(auth.getUid(), LS.DISTR_INFO, info)
    },
    /**
     * @description: 加载分销商信息
     * @param {*} dispatch
     * @param {*} commit
     * @param {*} state
     * @return {*}
     */
    load ({ dispatch, commit, state }) {
      const distrInfo = util.lsGetUser(auth.getUid(), LS.DISTR_INFO, {})
      if (distrInfo && Object.keys(distrInfo).length) {
        commit('setInfo', distrInfo)
      } else {
        dispatch('loadFromRemote')
      }
    },
    /**
     * @description: 远程获取分销商信息
     * @param {*} dispatch
     * @return {*}
     */
    async loadFromRemote ({ dispatch }) {
      // 加载分销商信息
      const distrInfo = await DISTR.GetInfo()
      dispatch('global/distr/set', distrInfo, { root: true })
      if (distrInfo) return Promise.resolve(distrInfo)
    },
    /**
     * 清除分销商信息
     * @param {*} param
     */
    async clear ({ commit }) {
      util.lsRemoveUser(auth.getUid(), LS.DISTR_INFO)
      commit('clearInfo')
    }
  }
}
