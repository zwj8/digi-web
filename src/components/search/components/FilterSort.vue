<template>
  <div class="filter">
    <div class="filter-title">
      <span>{{ $t('components.search.label_show') }}</span>
    </div>
    <!-- <div class="filter-option filter-option--checkbox">
      <span
        v-for="sort in sortOption"
        :key="sort.code"
        class="filter-option__item"
        :class="{ active: activeSort === sort.code }"
        @click="handleOrderByActive(sort.code)"
      >
        {{ $t(sort.label) }}
      </span>
    </div> -->
    <div class="filter-option">
      <!-- 排序 -->
      <div v-if="components.includes('orderBy')" class="filter-option__item">
        <select-single
          ref="orderBy"
          name="orderBy"
          require
          :placeholder="$t('components.search.label_auto_sort')"
          :default="mixinOrderBy"
          :initial-value="defaultOrderBy"
          :prefix-title="$t('components.search.label_auto_sort')"
          :option-list="sortOptions"
          @search="search"
        ></select-single>
      </div>
      <!-- 分页 -->
      <div v-if="components.includes('pageSize')" class="filter-option__item">
        <select-single
          ref="pageSize"
          name="pageSize"
          require
          :placeholder="$t('components.search.label_page')"
          :default="mixinPageSize"
          :initial-value="defaultPageSize"
          :prefix-title="$t('components.search.label_page')"
          :option-list="pageSizeOpts"
          @search="search"
        ></select-single>
      </div>
    </div>
  </div>
</template>
<script>
import mixinFill from '@/mixin/search.fill'
import { AVDER_SORT, TT_SORT } from '@/constants/config'
import { SelectSingle } from './components'
export default {
  name: 'FilterSort',
  mixins: [mixinFill],
  components: {
    SelectSingle
  },
  props: {
    initialData: { type: [String, Object], default: '' },
    sortType: { type: String, default: '' },
    components: { type: Array, default: () => ['orderBy', 'pageSize'] } // 需要哪些组件，默认全部
  },
  data () {
    return {
      // activeSort: '',
      params: {}
    }
  },
  computed: {
    // 判断是 TT广告 还是 广告主， 分别使用不同配置项
    sortOptions () {
      let arr = []
      switch (this.sortType) {
        case 'ttAd':
          arr = [...TT_SORT]
          break
        case 'adver':
          arr = [...AVDER_SORT]
          break
      }
      return [...arr]
    },
    /**
     * @description: 默认选项
     * @return {*}
     */
    defaultOrderBy () {
      let _dob = null
      if (this.initialData?.orderBy) _dob = this.initialData.orderBy
      else _dob = this.sortOptions[0].code
      return _dob
    },
    /**
     * @description: 默认分页大小
     * @return {*}
     */
    defaultPageSize () {
      let _dps = null
      if (this.initialData?.pageSize) _dps = +this.initialData.pageSize
      else _dps = 20
      return _dps
    },
    /**
     * @description: 分页选项
     * @return {*}
     */
    pageSizeOpts () {
      const sizeList = [20, 40, 60, 80, 100]
      return sizeList.map(v => {
        return {
          label: `${v}${this.$t('chore.page')}`,
          value: v
        }
      })
    }
  },
  watch: {},
  created () {
    // 设置默认值
    // this.initSort()
  },
  mounted () {},
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
    // 选择
    // handleOrderByActive (code) {
    //   // 选项相同则不往下执行
    //   if (code === this.activeSort) return false
    //   this.activeSort = code
    //   const params = {
    //     orderBy: this.activeSort
    //   }
    //   this.$emit('handle', params)
    // },
    // 重置
    // reset () {
    //   this.activeSort = this.sortOption[0].code
    // }
    // 设置默认值
    // initSort () {
    //   this.activeSort = this.initialData || this.sortOption[0].code
    // }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.search.less';
</style>
