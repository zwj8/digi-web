<template>
  <div class="tags" v-show="showTagElement">
    <div class="tags-items">
      <!-- 分类 -->
      <template v-for="tag in tags">
        <select-tag
          :key="`${tag.flag}_${tag.value}`"
          :flag="tag"
          :title="tag.title"
          :content="tag.label"
          @delete="handleDelete"
        />
      </template>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import mixinFill from '@/mixin/search.fill'
import { SelectTag } from './components'
import { mapGetters } from 'vuex'
import format from '@/libs/filters/format'
const hasLandPage = [
  { label: '无落地页', value: 0 },
  { label: '有落地页', value: 1 }
]
const isBrand = [
  { label: '非品牌广告', value: 0 },
  { label: '品牌广告', value: 1 }
]
export default {
  name: 'FilterTags',
  mixins: [mixinFill],
  components: {
    SelectTag
  },
  filters: {},
  props: {
    initialData: { type: Object, default: () => {} },
    sortType: { type: String, default: '' }
  },
  data () {
    return {
      params: null,
      tags: [],
      hasLandPageOptions: [...hasLandPage], // 是否有落地页
      isBrandOptions: [...isBrand], // 是否品牌
      titleKey: {
        clazz: this.$t('components.search.label_type'),
        diggTimesLevelList: this.$t('components.search.placeholder_digg'),
        hotLevelList: this.$t('components.search.placeholder_hot'),
        showTimesLevelList: this.$t('components.search.placeholder_ad_show'),
        regionList: this.$t('components.search.placeholder_region'),
        btnCatalogList: this.$t('components.search.placeholder_ad_btn'),
        siteFrameworkList: this.$t('components.search.placeholder_site'),
        isBrand: this.$t('components.search.placeholder_ad_type'),
        hasLandPage: this.$t('components.search.placeholder_land_page'),
        adTotal: this.$t('components.search.placeholder_ad_total'),
        putDay: this.$t('components.search.sort_put_days'),
        firstPut: this.$t('components.search.sort_first_time'),
        lastPut: this.$t('components.search.sort_last_time')
      },
      keyValue: {
        diggTimesLevelList: 'timesLevel',
        hotLevelList: 'timesLevel',
        showTimesLevelList: 'timesLevel',
        regionList: 'region',
        btnCatalogList: 'btnCatalog',
        siteFrameworkList: 'siteFramework',
        isBrand: 'isBrand',
        hasLandPage: 'hasLandPage'
      }
    }
  },
  computed: {
    ...mapGetters('global/user', ['currentLanguage']),
    // 是否显示tag栏
    showTagElement () {
      let bool = false
      // 只要有一项不为空，则显示tag栏
      if (Array.isArray(this.tags) && this.tags.length) bool = true
      return bool
    }
  },
  watch: {
    initialData: {
      deep: true,
      handler (val) {
        if (val) {
          this.params = _.cloneDeep(val)
          this.formatTags(val)
        }
      }
    },
    clazz: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val) this.formatTags(this.initialData)
      }
    },
    timesLevel: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val) this.formatTags(this.initialData)
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 处理 params，转为可供遍历的 TAGs
     * @param {*} params
     * @return {*}
     */
    formatTags (params) {
      const _tags = []
      const keyList = Object.keys(params)
      for (const [key, value] of Object.entries(params)) {
        switch (key) {
          // 分类
          case 'clazz': {
            const _hit = this.clazz?.find(v => v.value === value)
            if (_hit) {
              const _tmp = _.cloneDeep(_hit)
              _tmp.flag = 'clazz'
              _tmp.title = this.titleKey.clazz
              _tmp.label = this.currentLanguage === 'zh' ? _tmp.zhLabel : _tmp.enLabel
              _tags.push(_tmp)
            }
            break
          }
          // 多选项
          case 'diggTimesLevelList':
          case 'hotLevelList':
          case 'showTimesLevelList':
          case 'regionList':
          case 'btnCatalogList':
          case 'siteFrameworkList': {
            value.forEach(val => {
              const _hit = this[this.keyValue[key]]?.find(v => v.value === val)
              if (_hit) {
                const _tmp = _.cloneDeep(_hit)
                _tmp.flag = key
                _tmp.title = this.titleKey[key]
                _tags.push(_tmp)
              }
            })
            break
          }
          // 单选项
          case 'isBrand':
          case 'hasLandPage': {
            const _hit = this[this.keyValue[key]]?.find(v => v.value === +value)
            if (_hit) {
              const _tmp = _.cloneDeep(_hit)
              _tmp.flag = key
              _tmp.title = this.titleKey[key]
              _tags.push(_tmp)
            }
            break
          }
          // 数值范围选择
          case 'putDayMax':
          case 'putDayMin':
          case 'adTotalMin':
          case 'adTotalMax': {
            const [, attrKey, sizeType] = key.match(/(.+)(Max|Min)$/)
            // 检查tags中是否已存在对应名称的数组
            const _hit = _tags.find(v => v.flag === attrKey)
            if (_hit) {
              if (sizeType === 'Max') {
                const _maxLabel = value === null ? '100+' : value
                _hit.label += ` ~ ${_maxLabel}`
              } else _hit.label = value + ' ~ ' + _hit.label
            } else {
              const _tmp = {
                flag: attrKey,
                label: value >= 0 ? value : '100+',
                title: this.titleKey[attrKey]
              }
              _tags.push(_tmp)
            }
            break
          }
          // 时间范围
          case 'firstPutFrom':
          case 'firstPutTo':
          case 'lastPutFrom':
          case 'lastPutTo': {
            const [, attrKey, sizeType] = key.match(/(.+)(From|To)$/)
            // 检查tags中是否已存在对应名称的数组
            const _hit = _tags.find(v => v.flag === attrKey)
            const formatValue = format.dateFilter(value)
            if (_hit) {
              if (sizeType === 'To') {
                _hit.label += ` ~ ${formatValue}`
              } else _hit.label = formatValue + ' ~ ' + _hit.label
            } else {
              const _tmp = {
                flag: attrKey,
                label: formatValue,
                title: this.titleKey[attrKey]
              }
              _tags.push(_tmp)
            }
            break
          }
        }
      }
      this.tags = _tags
    },
    /**
     * @description: 删除标签
     * @param {*} ev
     * @return {*}
     */
    handleDelete (ev) {
      // 删除tags中对应数据
      const _hitIndex = this.tags.findIndex(v => (v.flag === ev.flag && v.value === ev.value))
      this.tags.splice(_hitIndex, 1)

      // 删除params中对应数据
      switch (ev.flag) {
        // 多选项
        case 'diggTimesLevelList':
        case 'regionList':
        case 'hotLevelList':
        case 'btnCatalogList':
        case 'siteFrameworkList':
        case 'showTimesLevelList': {
          // 过滤掉删除的那项，然后替换数组
          const filterList = this.params[ev.flag].filter(v => v !== ev.value)
          this.$set(this.params, ev.flag, filterList)
          break
        }
        // 单选 | 分类
        case 'clazz':
        case 'isBrand':
        case 'hasLandPage': {
          delete this.params[ev.flag]
          break
        }
        // 范围
        case 'adTotal':
        case 'putDay':
          delete this.params[`${ev.flag}Max`]
          delete this.params[`${ev.flag}Min`]
          break
        // 时间
        case 'firstPut':
        case 'lastPut':
          delete this.params[`${ev.flag}From`]
          delete this.params[`${ev.flag}To`]
          break
      }

      // 传值给父组件
      this.search()
    },
    // 传值给父组件
    search () {
      this.$emit('handle', this.params)
    },
    // 重置所有选项
    reset () {
      this.params = null
      this.tags = null
    }
  }
}
</script>
<style lang="less" scoped>
@import '@/assets/part/part.search.less';
</style>
