<template>
  <section class="adver-search-wrap">
    <!-- 关键字搜索 -->
    <filter-header ref="header" @submit="search" @reset-all="reset" />
    <div class="collapse-wrap">
      <div class="collapse-content" :class="{ 'is-collapse': isCollapse }">
        <!-- 分类 -->
        <filter-clazz ref="clazz" :initial-data="mixinInitial.clazz" @handle="search" />
        <!-- 基础 -->
        <filter-basic ref="basic" :initial-data="mixinInitial.basic" :components="['regionList', 'siteFrameworkList', 'adTotal']" @handle="search" />
        <!-- 数据 -->
        <filter-data ref="data" :initial-data="mixinInitial.data" :components="['showTimesLevelList', 'diggTimesLevelList', 'hotLevelList', 'putDay']" @handle="search" />
        <!-- 时间 -->
        <filter-date ref="date" :initial-data="mixinInitial.date" :components="['dateSingle']" @handle="search" />
        <!-- 自动排序 -->
        <filter-sort ref="sort" :initial-data="mixinInitial.sort" :components="['orderBy']" sort-type="adver" @handle="search"></filter-sort>
      </div>
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click.stop="collapse">
        <i class="el-icon-arrow-up icon" :class="{ 'icon-is-collapse': isCollapse }"></i>
      </div>
    </div>
  </section>
</template>
<script>
import lodash from 'lodash'
import { FilterHeader, FilterSort, FilterClazz, FilterBasic, FilterData, FilterDate } from './components'
import { formatSearchParams } from '@/libs/util.search'
import { mapGetters } from 'vuex'
import dispatchInitial from '@/mixin/search.dispatch'
const defaultParams = {
  orderBy: 'PLAY_TIME',
  dayRange: 7
}
export default {
  mixins: [dispatchInitial],
  props: {
    initialData: { type: Object, default: () => null }
  },
  components: {
    FilterHeader,
    FilterSort,
    FilterClazz,
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
        ...params,
        page: 1 // 当筛选条件时，默认回到第一页
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
