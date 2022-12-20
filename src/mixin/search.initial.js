import store from '@/store'
import _ from 'lodash'

const mixin = {
  data () {
    return {
      mixinInitialParams: null
    }
  },
  methods: {
    // 搜索项初始化
    mixinSearchInit () {
      const initialParams = _.cloneDeep(this.$route.query)
      // 如果默认初始值都没有，则给加上
      if (!initialParams?.page) initialParams.page = 1
      if (!initialParams?.pageSize) {
        switch (this.$route.name) {
          // 广告主详情默认最多只有8条
          case 'adverDetail':
            initialParams.pageSize = 8
            break
          // 广告主列表默认最多10条
          case 'adverList':
            initialParams.pageSize = 10
            break
          default:
            initialParams.pageSize = 20
        }
      }
      // 如果是广告主，没有时间时默认加上时间
      if (
        !initialParams?.dayRange &&
        this.$route.name === 'adverList'
      ) initialParams.dayRange = this.params.dayRange

      if (!initialParams?.orderBy) initialParams.orderBy = this.params.orderBy
      // 给父组件赋值
      this.params = this.mixinParamsFormat(initialParams)
      const _pagination = this.mixinPagination(initialParams)
      this.pagination.page = _pagination.page
      this.pagination.pageSize = _pagination.pageSize
      // 搜索组件初始值
      this.mixinInitialParams = this.mixinSearchFormat(this.params)
    },
    /**
     * @description: 处理 query 参数
     * @param {*} initdata
     * @return {*}
     */
    mixinParamsFormat (initdata) {
      const _p = _.cloneDeep(initdata)
      // 字符串类型
      // int 类型
      const intList = [
        'id',
        'hasLandPage',
        'isBrand',
        'dayRange',
        'putDayMax',
        'putDayMin',
        'adTotalMax',
        'adTotalMin',
        'firstPutFrom',
        'firstPutTo',
        'lastPutFrom',
        'lastPutTo',
        'btnCatalogList'
      ]
      // 数组类型
      const arrayList = [
        'regionList',
        'siteFrameworkList',
        'showTimesLevelList',
        'diggTimesLevelList',
        'hotLevelList',
        'btnCatalogList'
      ]

      for (const [key, value] of Object.entries(_p)) {
        // int
        if (intList.includes(key)) {
          if (Array.isArray(value)) _p[key] = value.map(v => +v)
          else if (typeof value === 'number') _p[key] = value
          else _p[key] = typeof value === 'string' ? +value : null
        }
        // array
        if (arrayList.includes(key)) {
          _p[key] = _.concat([], _p[key])
        }
      }
      return _p
    },
    /**
     * @description:  设置分页参数
     * @param {*} initData
     * @return {*}
     */
    mixinPagination (initData) {
      const _p = {}
      const _i = _.cloneDeep(initData)
      if (_.has(_i, 'page')) _p.page = +_i.page || 1
      if (_.has(_i, 'pageSize')) _p.pageSize = +_i.pageSize || 20
      return _p
    },
    /**
     * @description: 处理 query 参数，转换为搜索组件使用的格式
     * @param {*} initData 待转换的参数
     * @return {*}
     */
    mixinSearchFormat (initData) {
      const _f = _.cloneDeep(initData)
      const rangeKey = [
        'putDayMax',
        'putDayMin',
        'adTotalMax',
        'adTotalMin',
        'firstPutFrom',
        'firstPutTo',
        'lastPutFrom',
        'lastPutTo'
      ]
      const searchData = {}
      // 一般参数处理
      for (const [key, value] of Object.entries(_f)) {
        if (rangeKey.includes(key)) continue
        searchData[key] = value
      }
      // 特殊参数处理
      for (const key of ['putDay', 'adTotal']) {
        const _max = `${key}Max`
        const _min = `${key}Min`
        if (Object.hasOwn(_f, _max) && Object.hasOwn(_f, _min)) searchData[key] = [_f[_min], _f[_max]]
      }
      for (const key of ['firstPut', 'lastPut']) {
        const _from = `${key}From`
        const _to = `${key}To`
        if (Object.hasOwn(_f, _from) && Object.hasOwn(_f, _to)) searchData[key] = [_f[_from], _f[_to]]
      }
      return searchData
    }
  },
  created () {
    store.dispatch('global/config/checkRegion')
    this.mixinSearchInit()
  }
}

export default mixin
