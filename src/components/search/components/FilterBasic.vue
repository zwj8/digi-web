<template>
  <div class="filter">
    <div class="filter-title">
      <span>{{ $t('components.search.label_basic') }}</span>
    </div>
    <div class="filter-option">
      <!-- 国家 / 地区 -->
      <div v-if="components.includes('regionList')" class="filter-option__item">
        <select-multiple
          ref="regionList"
          name="regionList"
          :initial-data="mixinRegionList"
          :placeholder="$t('components.search.placeholder_region')"
          need-search
          group
          show-country-icon
          :option-list="regionGroupOptions"
          @search="search"
        ></select-multiple>
      </div>
        <!-- 广告按钮 -->
        <div v-if="components.includes('btnCatalogList')" class="filter-option__item">
          <select-multiple
            ref="btnCatalogList"
            name="btnCatalogList"
            :initial-data="mixinBtnCatalogList"
            :placeholder="$t('components.search.placeholder_ad_btn')"
            need-search
            :option-list="btnCatalogOptions"
            @search="search"
          ></select-multiple>
        </div>
        <!-- 建站系统 -->
        <div v-if="components.includes('siteFrameworkList')" class="filter-option__item">
          <select-multiple
            ref="siteFrameworkList"
            name="siteFrameworkList"
            :initial-data="mixinSiteFrameworkList"
            :placeholder="$t('components.search.placeholder_site')"
            :option-list="siteFrameworkOptions"
            @search="search"
          ></select-multiple>
        </div>
        <!-- 广告数 -->
        <div v-if="components.includes('adTotal')" class="filter-option__item">
          <select-range
            ref="adTotal"
            name="adTotal"
            :initial-data="mixinAdTotal"
            :placeholder="$t('components.search.placeholder_ad_total')"
            :max="100"
            @search="search"
          ></select-range>
        </div>
        <!-- 广告类型 -->
        <div v-if="components.includes('isBrand')" class="filter-option__item">
          <select-single
            ref="isBrand"
            name="isBrand"
            :default="mixinIsBrand"
            :placeholder="$t('components.search.placeholder_ad_type')"
            :option-list="isBrandOptions"
            @search="search"
          ></select-single>
        </div>
        <!-- 是否有落地页 -->
        <div v-if="components.includes('hasLandPage')" class="filter-option__item">
          <select-single
            ref="hasLandPage"
            name="hasLandPage"
            :default="mixinHasLandPage"
            :placeholder="$t('components.search.placeholder_land_page')"
            :option-list="hasLandPageOptions"
            @search="search"
          ></select-single>
        </div>
    </div>
  </div>
</template>
<script>
import mixinFill from '@/mixin/search.fill'
import { SelectMultiple, SelectRange, SelectSingle } from './components'
import { getOptions } from '@/libs/util.search'
import { IS_BRAND, LAND_PAGE } from '@/constants/config'
import i18n from '@/i18n'
export default {
  name: 'FilterBasic',
  mixins: [mixinFill],
  components: {
    SelectMultiple,
    SelectRange,
    SelectSingle
  },
  props: {
    initialData: { type: Object, default: () => {} },
    // 国家限制
    regionLimit: { type: Array, default: () => [] },
    // ['regionList', 'siteFrameworkList', 'adTotal', 'btnCatalogList', 'hasLandPage', 'isBrand']
    components: { type: Array, default: () => ['regionList', 'siteFrameworkList', 'adTotal', 'btnCatalogList', 'hasLandPage', 'isBrand'] }, // 需要哪些组件，默认全部
    updateData: { type: [String, Object], default: '' }
  },
  data () {
    return {
      regionGroupOptions: [], // 国家分组选项
      siteFrameworkOptions: [], // 建站系统选项
      btnCatalogOptions: [], // 广告按钮选项
      params: {}
    }
  },
  computed: {
    // 是否有落地页
    hasLandPageOptions () {
      return LAND_PAGE.map(v => {
        v.label = i18n.t(v.label)
        return v
      })
    },
    // 是否品牌
    isBrandOptions () {
      return IS_BRAND.map(v => {
        v.label = i18n.t(v.label)
        return v
      })
    }
  },
  watch: {
    regionLimit (newValue) {
      if (newValue?.length) this.regionLimitFormat()
    },
    updateData: {
      deep: true,
      handler (val) {
        this.mixinUpdate(val)
      }
    }
  },
  created () {
    // 获取选项
    ;['RegionGroup', 'SiteFramework', 'BtnCatalog'].forEach(v => {
      getOptions(this, v)
    })
    // 国家限制
    if (this.regionLimit?.length) this.regionLimitFormat()
  },
  mounted () {},
  methods: {
    // 国家限制
    regionLimitFormat () {
      const _r = [...this.regionLimit]
      this.regionGroupOptions.map(group => {
        group.groupValue = group.groupValue.filter(v => _r.includes(v.value))
        return group
      })
      // 过滤已经没有元素的分组
      this.regionGroupOptions = this.regionGroupOptions.filter(v => v.groupValue.length)
    },
    // 传值给父组件
    search (params) {
      this.params = {
        ...this.params,
        ...params
      }
      this.$emit('handle', this.params)
    },
    // 重置所有选项
    reset () {
      this.params = {}
      for (const v of this.components) {
        this.$refs[v].reset(false)
      }
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.search.less';
</style>
