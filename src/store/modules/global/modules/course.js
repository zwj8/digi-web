import util from '@/libs/util'
import auth from '@/libs/auth'
import lodash from 'lodash'
import COURSE from '@/api/course'
import { TIME, LS } from '@/constants'
export default {
  namespaced: true,
  state: {
    currentCourse: null,
    courseObject: null,
    isBought: false
  },
  getters: {
    // 是否已经购买课程
    isBought (state) {
      return state.isBought
    },
    // 当前观看视频
    currentCourse (state) {
      if (state.currentCourse) return state.currentCourse
      else return state.courseObject?.list[0]
    },
    // 课程目录
    courseIndex (state) {
      return state.courseObject?.list || []
    }
  },
  mutations: {
    // 设置是否已经购买课程
    setIsBought (state, bool) {
      state.isBought = bool
    },
    // 设置目录
    setIndex (state, indexData) {
      state.courseObject = indexData
    },
    // 设置当前观看课程
    setCurrentCourse (state, sn = null) {
      const hit = state.courseObject?.list.find(v => v.sn === sn)
      // 如果没有匹配，则默认第一节课
      if (hit) state.currentCourse = hit
      else state.currentCourse = state.courseObject?.list[0]
    }
  },
  actions: {
    // 检查某个课程ID的目录是否存在
    async checkIndex ({ state, dispatch }, courseId) {
      courseId += ''
      if (state.courseObject?.courseId === courseId) return
      await dispatch('load', courseId)
    },
    /**
     * @description: 加载数据
     * @param {*} commit
     * @param {*} dispatch
     * @param {*} courseId 课程ID
     * @return {*}
     */
    async load ({ commit, dispatch }, courseId) {
      // 当前时间戳
      const currentTimestamp = new Date().getTime()
      // 获取本地缓存
      const localInfo = await util.lsGet(LS.COURSE)
      console.log('localInfo', localInfo)
      // 本地缓存是否存在和是否过期
      if (localInfo && lodash.has(localInfo, courseId) && localInfo[courseId]?.expire > currentTimestamp) {
        commit('setIndex', { courseId: courseId, list: localInfo[courseId].data })
      } else await dispatch('loadRemote', courseId) // 本地缓存过期或者不存在, 获取远端数据
    },
    /**
     * @description: 远程加载课程数据
     * @param {*} commit
     * @param {*} dispatch
     * @return {*}
     */
    async loadRemote ({ commit }, courseId) {
      // 过期限制
      const { STORE: { COURSE_INDEX_EXPIRE } } = TIME
      // 获取数据
      const result = await COURSE.getIndex(courseId).catch(e => {})
      // 没有结果，直接返回
      if (!result?.length) return
      // 设置课程目录
      console.log('result', { courseId: courseId, list: result })
      commit('setIndex', { courseId: courseId, list: result })
      // 设置过期时间，并保存到本地缓存
      const value = {}
      value[courseId] = {
        expire: new Date().getTime() + COURSE_INDEX_EXPIRE,
        data: result
      }

      util.lsSet(LS.COURSE, value)
    }
  }
}
