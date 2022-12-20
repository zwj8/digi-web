import _ from 'lodash'
import util from '@/libs/util'
import { mapGetters } from 'vuex'
const mixin = {
  data () {
    return {
      mixinOrderBy: null,
      mixinRegionList: [],
      mixinBtnCatalogList: [],
      mixinSiteFrameworkList: [],
      mixinAdTotal: [],
      mixinIsBrand: null,
      mixinHasLandPage: null,
      mixinShowTimesLevelList: [],
      mixinDiggTimesLevelList: [],
      mixinHotLevelList: [],
      mixinPutDay: [],
      mixinFirstPut: [],
      mixinLastPut: [],
      mixinDayRange: null,
      mixinPageSize: null,
      mixinExcludeVisited: null
    }
  },
  created () {
    this.mixinInitial()
  },
  computed: {
    ...mapGetters('global/config', ['region', 'clazz', 'btnCatalog', 'siteFramework', 'timesLevel']),
    hasLandPage () {
      return [
        { label: '无落地页', value: 0 },
        { label: '有落地页', value: 1 }
      ]
    },
    isBrand () {
      return [
        { label: '非品牌广告', value: 0 },
        { label: '品牌广告', value: 1 }
      ]
    }
  },
  watch: {
    // 国家
    regionGroupOptions: {
      deep: true,
      handler (val) {
        this.mixinRegionList = this.mixinMatchMultipleGroup(this.initialData.regionList, val)
      }
    },
    // 广告按钮
    btnCatalogOptions: {
      deep: true,
      handler (val) {
        this.mixinBtnCatalogList = this.mixinMatchMultiple(this.initialData.btnCatalogList, val)
      }
    },
    // 建站系统
    siteFrameworkOptions: {
      deep: true,
      handler (val) {
        this.mixinSiteFrameworkList = this.mixinMatchMultiple(this.initialData.siteFrameworkList, val)
      }
    },
    // 广告展现 / 总点赞数 / 热度
    timesLevelOptions: {
      deep: true,
      handler (val) {
        this.mixinLocalOpts(this.initialData, ['showTimesLevelList', 'diggTimesLevelList', 'hotLevelList'], val)
      }
    }
  },
  mounted () {
    this.mixinRange(this.initialData, ['adTotal', 'putDay', 'firstPut', 'lastPut'])
  },
  methods: {
    /**
     * @description: 匹配 多项选择 group 数组
     * @param {*} chked 已选项数组
     * @param {*} opts 选项数组
     * @return {*}
     */
    mixinMatchMultipleGroup (chked, opts) {
      if (!chked) return []
      let _tmp = []
      for (const group of opts) {
        const hit = group.groupValue.filter(_r => chked.includes(_r.value))
        _tmp.push(...hit)
      }
      _tmp = _.uniqWith(_tmp, _.isEqual)
      return _tmp
    },
    /**
     * @description: 匹配普通多选
     * @param {*} chked
     * @param {*} opts
     * @return {*}
     */
    mixinMatchMultiple (chked, opts) {
      if (!chked) return null
      const hit = opts.filter(v => chked.includes(v.value))
      return hit
    },
    /**
     * @description: 无须拉取远端配置项的一般多选项
     * @param {*} actionList 执行列表
     * @return {*}
     */
    mixinLocalOpts (params, actionList, opts) {
      for (const keyName of actionList) {
        const thisName = 'mixin' + util.firstLetterUppercase(keyName)
        this[thisName] = this.mixinMatchMultiple(params[keyName], opts)
      }
    },
    /**
     * @description: 范围选择
     * @param {*} actionList 执行列表
     * @return {*}
     */
    mixinRange (params, actionList) {
      const _params = _.cloneDeep(params)
      // 如果是 update 时传过来的带max min， from to的类型，则需要处理一下
      for (const [key, value] of Object.entries(params)) {
        // 如果不包含 actionList 的字段 或者 value 已经为数组，则不往下执行

        if (
          actionList.findIndex(v => key.includes(v)) === -1 ||
          Array.isArray(value)
        ) continue
        const [, attrKey, sizeType] = key.match(/(.+)(Max|Min|From|To)$/)
        const _index = sizeType === 'Min' || sizeType === 'From'
          ? 0
          : 1
        if (_params[attrKey]) _params[attrKey][_index] = value
        else {
          _params[attrKey] = []
          _params[attrKey][_index] = value
        }
      }

      for (const keyName of actionList) {
        const thisName = 'mixin' + util.firstLetterUppercase(keyName)
        this[thisName] = _.cloneDeep(_params[keyName])
      }
    },
    // 其余单选项
    mixinSingle (params) {
      this.mixinOrderBy = params?.orderBy || null
      this.mixinIsBrand = _.isEmpty(params?.isBrand) ? params?.isBrand : null
      this.mixinHasLandPage = _.isEmpty(params?.hasLandPage) ? params?.hasLandPage : null
      this.mixinDayRange = params?.dayRange || null
      this.mixinPageSize = params?.pageSize ? +params.pageSize : null
      this.mixinExcludeVisited = params?.excludeVisited
        ? params?.excludeVisited === 'true'
        : null
    },
    // 设置初始值
    mixinInitial () {
      this.params = _.cloneDeep(this.initialData)
      this.mixinSingle(this.initialData)
    },
    /**
     * @description: 数据更新
     * @param {*} params
     * @return {*}
     */
    mixinUpdate (params) {
      // 国家
      this.mixinRegionList = this.mixinMatchMultiple(params?.regionList, this.region)
      // 广告按钮
      this.mixinBtnCatalogList = this.mixinMatchMultiple(params?.btnCatalogList, this.btnCatalog)
      // 建站系统
      this.mixinSiteFrameworkList = this.mixinMatchMultiple(params?.siteFrameworkList, this.siteFramework)
      // 广告展现 / 总点赞数 / 热度
      this.mixinLocalOpts(params, ['showTimesLevelList', 'diggTimesLevelList', 'hotLevelList'], this.timesLevel)
      // 范围选择
      this.mixinRange(params, ['adTotal', 'putDay', 'firstPut', 'lastPut'])
      // 其余单选项
      this.mixinSingle(params)
      this.params = params
    }
  }
}

export default mixin
