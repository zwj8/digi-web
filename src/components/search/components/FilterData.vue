<template>
  <div class="filter">
    <div class="filter-title">
      <span>{{ $t('components.search.label_data') }}</span>
    </div>
    <div class="filter-option">
      <!-- 广告展现 -->
      <div v-if="components.includes('showTimesLevelList')" class="filter-option__item">
        <select-multiple
          ref="showTimesLevelList"
          name="showTimesLevelList"
          :initial-data="mixinShowTimesLevelList"
          :placeholder="$t('components.search.placeholder_ad_show')"
          :option-list="timesLevelOptions"
          @search="search"
        ></select-multiple>
      </div>
      <!-- 总点赞数 -->
      <div v-if="components.includes('diggTimesLevelList')" class="filter-option__item">
        <select-multiple
          ref="diggTimesLevelList"
          name="diggTimesLevelList"
          :initial-data="mixinDiggTimesLevelList"
          :placeholder="$t('components.search.placeholder_digg')"
          :option-list="timesLevelOptions"
          @search="search"
        ></select-multiple>
      </div>
      <!-- 热度 -->
      <div v-if="components.includes('hotLevelList')" class="filter-option__item">
        <select-multiple
          ref="hotLevelList"
          name="hotLevelList"
          :initial-data="mixinHotLevelList"
          :placeholder="$t('components.search.placeholder_hot')"
          :option-list="timesLevelOptions"
          @search="search"
        ></select-multiple>
      </div>
      <!-- 投放天数 -->
      <div v-if="components.includes('putDay')" class="filter-option__item">
        <select-range
          ref="putDay"
          name="putDay"
          :initial-data="mixinPutDay"
          :placeholder="$t('components.search.placeholder_put_days')"
          :max="100"
          @search="search"
        ></select-range>
      </div>
    </div>
  </div>
</template>
<script>
import mixinFill from '@/mixin/search.fill'
import { SelectMultiple, SelectRange } from './components'
import { getOptions } from '@/libs/util.search'
export default {
  name: 'FilterData',
  mixins: [mixinFill],
  components: {
    SelectMultiple,
    SelectRange
  },
  props: {
    initialData: { type: Object, default: () => {} },
    // ['showTimesLevelList', 'diggTimesLevelList', 'hotLevelList', 'btnCatalogList', 'putDay']
    components: { type: Array, default: () => ['showTimesLevelList', 'diggTimesLevelList', 'hotLevelList', 'btnCatalogList', 'putDay'] }, // 需要哪些组件，默认全部
    updateData: { type: [String, Object], default: '' }
  },
  data () {
    return {
      timesLevelOptions: [], // 次数选项
      params: {}
    }
  },
  computed: {},
  watch: {
    updateData: {
      deep: true,
      handler (val) {
        this.mixinUpdate(val)
      }
    }
  },
  created () {
    // 获取选项
    ['TimesLevel'].forEach(v => {
      getOptions(this, v)
    })
  },
  mounted () {
  },
  methods: {
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
