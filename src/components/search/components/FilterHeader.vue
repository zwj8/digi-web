<template>
  <div class="filter-wrap">
    <div class="filter-wrap__content">
      <el-select v-if="needSelect" v-model="searchType" class="select filter-item">
        <el-option v-for="t in searchTypes" :key="t.value" :value="t.value" :label="$t(t.label)"></el-option>
      </el-select>
      <el-input class="filter-item filter-header-search" v-model="searchText" :placeholder="$t('components.search.placeholder_header_keyword')" clearable @keyup.enter.native="search" @clear="search">
        <el-button slot="append" icon="el-icon-search" @click="search"> </el-button>
      </el-input>
      <div class="btn-wrap filter-item">
        <com-btn size="mini" @click.native="resetAll">{{ $t('ttad.btn_reset_options') }}</com-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterHeader',
  props: {
    initialData: { type: Object, default: () => {} },
    needSelect: { type: Boolean, default: () => false }
  },
  data () {
    return {
      searchTypes: [
        { label: 'components.search.search_info', value: 'INFO' },
        { label: 'components.search.search_desc', value: 'DESC' },
        { label: 'components.search.search_adver', value: 'ADVER' },
        { label: 'components.search.search_land', value: 'LAND_PAGE' }
      ],
      searchType: null,
      searchText: ''
    }
  },
  computed: {},
  created () {
    this.initial()
  },
  methods: {
    search () {
      const params = {
        fuzzySearchText: this.searchText,
        fuzzySearchType: this.searchType
      }
      this.$emit('submit', params)
    },
    // 设置初始值
    initial () {
      this.searchText = this.initialData?.text || ''
      this.searchType = this.needSelect
        ? this.initialData?.type || 'INFO'
        : null
    },
    // 重置
    reset () {
      this.searchText = ''
      this.searchType = this.needSelect ? 'INFO' : null
    },
    // 调用父组件reset，用于重置所有选项
    resetAll () {
      this.$emit('reset-all')
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/part/part.search.less';
.filter-wrap {
  border-bottom: 1px solid @color-light-gray;
}

.filter-header-search {
  .p2r(max-width, 600);
  // max-width: 600px;
  .r-font-size(14);
  /deep/ .el-input__inner {
    .r-height(40);
    .r-line-height(40);
    .r-padding(0, 15);
  }
}

/deep/ .el-input-group {
  .el-input-group__append {
    color: #fff;
    background: #303030;
    border-color: #303030;
  }
}

// 筛选框样式
.select {
  .r-width(170);
  // 占位文本样式
  /deep/ .el-input__inner {
    font-size: @font-form-size;
    border: 1px solid #303030;
  }
}

// 按钮容器
.btn-wrap {
  height: 40px;
  line-height: 40px;
}

</style>
