<template>
  <section class="ad-search-wrap">
    <!-- 关键字搜索 -->
    <filter-header ref="header" :initial-data="mixinInitial.fuzzySearch" need-select @submit="search" @reset-all="reset" />
    <div class="collapse-wrap">
      <div class="collapse-content" :class="{ 'is-collapse': isCollapse }">
        <!-- 分类 -->
        <filter-clazz ref="clazz" :initial-data="mixinInitial.clazz || ''" :update-data="params.clazz || ''" @handle="search" />
        <!-- 基础 -->
        <filter-basic ref="basic" :initial-data="mixinInitial.basic" :update-data="params" :components="['regionList', 'siteFrameworkList', 'btnCatalogList', 'hasLandPage', 'isBrand']" @handle="search" />
        <!-- 数据 -->
        <filter-data ref="data" :initial-data="mixinInitial.data" :update-data="params" :components="['showTimesLevelList', 'diggTimesLevelList', 'hotLevelList', 'putDay']" @handle="search" />
        <!-- 时间 -->
        <filter-date ref="date" :initial-data="mixinInitial.date" :update-data="params" :components="['dateRange', 'excludeVisited']" @handle="search" />
        <!-- 标签 -->
        <filter-tags ref="tags" :initial-data="params" sort-type="ttAd" @handle="search($event, true)"></filter-tags>
        <el-divider />
        <!-- 排序 -->
        <filter-sort ref="sort" :initial-data="mixinInitial.sort" :components="['orderBy', 'pageSize']" sort-type="ttAd" @handle="search"></filter-sort>
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
  FilterHeader,
  FilterSort,
  FilterClazz,
  FilterBasic,
  FilterData,
  FilterDate,
  FilterTags
} from './components'
import lodash from 'lodash'
import { formatSearchParams } from '@/libs/util.search'
import { mapGetters } from 'vuex'
import dispatchInitial from '@/mixin/search.dispatch'
const defaultParams = {
  orderBy: 'LAST_PUT_TIME',
  pageSize: 20
}
export default {
  mixins: [dispatchInitial],
  props: {
    initialData: { type: Object, default: () => null }
  },
  created () {
    this.params = formatSearchParams(this.initialData)
  },
  components: {
    FilterHeader,
    FilterSort,
    FilterClazz,
    FilterBasic,
    FilterData,
    FilterDate,
    FilterTags
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
      params: null
    }
  },
  methods: {
    search (params, tags = false) {
      if (tags) {
        this.params = formatSearchParams(params)
      } else {
        this.params = {
          ...this.params,
          ...params
        }
      }
      // 过滤掉为空的值
      this.params = formatSearchParams(this.params)
      const _params = { ...this.params }
      this.$emit('search', _params)
    },
    limitReset () {
      ['header', 'sort', 'clazz', 'basic', 'data', 'date'].forEach(v => {
        this.$refs[v].reset()
      })
      this.params = { ...defaultParams }
    },
    // 重置
    reset () {
      ['header', 'sort', 'clazz', 'basic', 'data', 'date'].forEach(v => {
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
