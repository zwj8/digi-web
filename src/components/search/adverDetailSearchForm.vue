<template>
  <section class="ad-search-wrap">
    <div class="collapse-wrap">
      <div class="collapse-content" :class="{ 'is-collapse': isCollapse }">
        <!-- 自动排序 -->
        <filter-sort ref="sort" :initial-data="mixinInitial.orderBy" sort-type="ttAd" @handle="search"></filter-sort>
        <!-- 基础 -->
        <filter-basic ref="basic" :initial-data="mixinInitial.basic" :components="['regionList', 'siteFrameworkList', 'btnCatalogList', 'hasLandPage', 'isBrand']" :region-limit="regionLimit" @handle="search" />
        <!-- 数据 -->
        <filter-data ref="data" :initial-data="mixinInitial.data" :components="['showTimesLevelList', 'diggTimesLevelList', 'hotLevelList', 'putDay']" @handle="search" />
        <!-- 时间 -->
        <filter-date ref="date" :initial-data="mixinInitial.date" :components="['dateRange']" @handle="search" />
      </div>
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click.stop="collapse">
        <i class="el-icon-arrow-up icon" :class="{ 'icon-is-collapse': isCollapse }"></i>
      </div>
    </div>
  </section>
</template>
<script>
import {
  FilterSort,
  FilterBasic,
  FilterData,
  FilterDate
} from './components'
import lodash from 'lodash'
import { formatSearchParams } from '@/libs/util.search'
import { mapGetters } from 'vuex'
import dispatchInitial from '@/mixin/search.dispatch'
const defaultParams = {
  orderBy: 'LAST_PUT_TIME'
}
export default {
  mixins: [dispatchInitial],
  props: {
    initialData: { type: Object, default: () => null },
    // 国家限制
    regionLimit: { type: Array, default: () => [] }
  },
  components: {
    FilterSort,
    FilterBasic,
    FilterData,
    FilterDate
  },
  computed: {
    ...mapGetters('global/auth', ['isLimit'])
  },
  watch: {
    isLimit (newValue) {
      if (newValue) {
        this.limitReset()
      }
    }
  },
  data () {
    return {
      isCollapse: false, // 是否是折叠状态
      params: lodash.cloneDeep(this.initialData)
    }
  },
  methods: {
    search (params) {
      this.params = {
        ...this.params,
        ...params
      }
      // 过滤掉为空的值
      this.params = formatSearchParams(this.params)
      const _params = { ...this.params }
      this.$emit('search', _params)
    },
    limitReset () {
      ['sort', 'basic', 'data', 'date'].forEach(v => {
        this.$refs[v].reset()
      })
      this.params = { ...defaultParams }
    },
    // 重置
    reset () {
      ['sort', 'basic', 'data', 'date'].forEach(v => {
        this.$refs[v].reset()
      })
      this.params = { ...defaultParams }
      this.search(this.params)
    },
    // 搜索项折叠
    collapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
@import '@/assets/part/part.search.less';
</style>
