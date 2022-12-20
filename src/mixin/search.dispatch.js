import _ from 'lodash'
const mixin = {
  data () {
    return {
      mixinInitial: {
        // 关键字搜索
        fuzzySearch: {
          text: null,
          type: null
        },
        // 排序
        sort: {
          orderBy: null,
          pageSize: null
        },
        // 自动排序
        orderBy: null,
        // 分类
        clazz: null,
        // 基础
        basic: {
          // 国家
          regionList: [],
          // 广告按钮
          btnCatalogList: [],
          // 建站系统
          siteFrameworkList: [],
          // 广告数
          adTotal: [],
          // 广告类型
          isBrand: null,
          // 落地页
          hasLandPage: null
        },
        // 数据
        data: {
          // 广告展现
          showTimesLevelList: [],
          // 总点赞数
          diggTimesLevelList: [],
          // 热度
          hotLevelList: [],
          // 投放天数
          putDay: []
        },
        // 时间
        date: {
          firstPut: [],
          lastPut: [],
          dayRange: null,
          excludeVisited: false
        }
      }
    }
  },
  created () {
    this.mixinDispatchInitial()
  },
  watch: {
    initialData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.mixinInitialData(val)
      }
    }
  },
  methods: {
    // 分派初始值
    mixinDispatchInitial (params) {
      const _i = params || _.cloneDeep(this.initialData)
      // 关键字搜索
      if (_.has(_i, 'fuzzySearchText')) this.mixinInitial.fuzzySearch.text = _i.fuzzySearchText
      if (_.has(_i, 'fuzzySearchType')) this.mixinInitial.fuzzySearch.type = _i.fuzzySearchType
      // 自动排序
      if (_.has(_i, 'orderBy')) this.mixinInitial.orderBy = _i.orderBy
      // 排序
      for (const key of Object.keys(this.mixinInitial.sort)) {
        if (_.has(_i, key)) {
          if (Array.isArray(this.mixinInitial.sort[key])) this.mixinInitial.sort[key] = _.concat([], _i[key])
          else this.mixinInitial.sort[key] = _i[key]
        }
      }
      // 分类
      if (_.has(_i, 'clazz')) this.mixinInitial.clazz = _i.clazz
      // 基础
      for (const key of Object.keys(this.mixinInitial.basic)) {
        if (_.has(_i, key)) {
          if (Array.isArray(this.mixinInitial.basic[key])) this.mixinInitial.basic[key] = _.concat([], _i[key])
          else this.mixinInitial.basic[key] = _i[key]
        }
      }
      // 数据
      for (const key of Object.keys(this.mixinInitial.data)) {
        if (_.has(_i, key)) {
          if (Array.isArray(this.mixinInitial.data[key])) this.mixinInitial.data[key] = _.concat([], _i[key])
          else this.mixinInitial.data[key] = _i[key]
        }
      }
      // 时间
      for (const key of Object.keys(this.mixinInitial.date)) {
        if (_.has(_i, key)) {
          if (Array.isArray(this.mixinInitial.date[key])) this.mixinInitial.date[key] = _.concat([], _i[key])
          else this.mixinInitial.date[key] = _i[key]
        }
      }
    },
    // 设置初始值
    mixinInitialData (val) {
      this.params = _.cloneDeep(val)
    }
  }
}

export default mixin
