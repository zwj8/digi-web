<template>
  <div class="filter">
    <div class="filter-title">
      <span>{{ $t('components.search.label_date') }}</span>
    </div>
    <div class="filter-option">
        <!-- 时间 -->
        <div v-if="components.includes('dateSingle')" class="filter-option__item">
          <select-single
            ref="dateSingle"
            name="dayRange"
            require
            :default="mixinDayRange"
            :initial-value="dayRange"
            :placeholder="$t('components.search.palcaholder_date')"
            :option-list="dayRangeOptions"
            @search="search"
          ></select-single>
        </div>
        <!-- 时间范围 -->
        <div v-if="components.includes('dateRange')" class="filter-option__item">
          <div class="date-range-wrap">
            <!-- <span v-show="firstShowText" class="date-range-wrap__replace">
              {{ firstShowText }}
              <i
                class="el-icon-circle-close hover"
                @click.stop="resetItem('firstPut')"
              ></i>
            </span> -->
            <el-date-picker
              v-model="firstPut"
              type="daterange"
              prefix-icon=""
              size="small"
              align="center"
              value-format="timestamp"
              range-separator=""
              :start-placeholder="$t('components.search.placeholder_first_start')"
              :end-placeholder="$t('components.search.placeholder_first_end')"
              :class="{ hasValue: firstShowText }"
              @change="dateRangeSearch($event, 'firstPut')"
            >
            </el-date-picker>
          </div>
          <!-- </el-tooltip> -->
        </div>
        <div v-if="components.includes('dateRange')" class="filter-option__item">
          <!-- <select-date-picker-range ref="lastDateRange" name="lastPut" @search="search" /> -->
          <!-- <el-tooltip :disabled="!lastPut.length" effect="dark" :visible-arrow="false" content="最后发现开始时间 与 最后发现结束时间" placement="top"> -->
          <div class="date-range-wrap">
            <!-- <span v-show="lastShowText" class="date-range-wrap__replace">
              {{ lastShowText }}
              <i
                class="el-icon-circle-close hover"
                @click.stop="resetItem('lastPut')"
              ></i>
            </span> -->
            <el-date-picker
              v-model="lastPut"
              type="daterange"
              prefix-icon=""
              align="center"
              size="small"
              value-format="timestamp"
              range-separator=""
              :start-placeholder="$t('components.search.placeholder_last_start')"
              :end-placeholder="$t('components.search.placeholder_last_end')"
              :class="{ hasValue: lastShowText }"
              @change="dateRangeSearch($event, 'lastPut')"
            >
            </el-date-picker>
          </div>
          <!-- </el-tooltip> -->
        </div>
        <!-- 排除浏览过的广告 -->
        <div  v-if="components.includes('excludeVisited')" class="filter-option__item">
          <select-checkbox
            ref="excludeVisited"
            name="excludeVisited"
            :label="$t('components.search.exclude_ad')"
            @change="search"
          />
        </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import mixinFill from '@/mixin/search.fill'
import { SelectSingle, SelectCheckbox } from './components'
import utils from '@/libs/filters'
export default {
  name: 'FilterDate',
  mixins: [mixinFill],
  components: {
    SelectSingle,
    SelectCheckbox
  },
  props: {
    initialData: { type: Object, default: () => {} },
    // ['dateSingle', 'dateRange']
    components: { type: Array, default: () => ['dateSingle', 'dateRange', 'excludeVisited'] }, // 需要哪些组件，默认全部
    updateData: { type: [String, Object], default: '' }
  },
  data () {
    return {
      dayRangeOptions: [ // 次数选项
        { label: this.$t('components.search.last_7'), value: 7 },
        { label: this.$t('components.search.last_30'), value: 30 },
        { label: this.$t('components.search.last_90'), value: 90 }
      ],
      firstPut: null, // 首次发现时间范围
      lastPut: null, // 最后发现时间范围
      params: {}
    }
  },
  computed: {
    // 用于判断时间范围组件是否有值，并用于显示已选值
    firstShowText () {
      if (Array.isArray(this.firstPut) && this.firstPut.length) {
        return `${this.$t('components.search.first_start')}：${utils.dateFilter(this.firstPut[0])} - ${this.$t('components.search.first_end')}：${utils.dateFilter(this.firstPut[1])}`
      }
      return false
    },
    lastShowText () {
      if (Array.isArray(this.lastPut) && this.lastPut.length) {
        return `${this.$t('components.search.last_start')}：${utils.dateFilter(this.lastPut[0])} - ${this.$t('components.search.last_end')}：${utils.dateFilter(this.lastPut[1])}`
      }
      return false
    },
    // 时间
    dayRange () {
      let _dr = null
      if (this.initialData?.dayRange) _dr = this.initialData?.dayRange
      else _dr = 7
      return _dr
    }
  },
  watch: {
    updateData: {
      deep: true,
      handler (val) {
        this.mixinUpdate(val)
        this.updateReset(val)
      }
    }
  },
  created () {
    this.initial()
  },
  mounted () { },
  methods: {
    /**
     * @description: 设置初始值
     * @return {*}
     */
    initial () {
      // 最后发现时间
      if (this.initialData?.lastPut?.length) this.$set(this, 'lastPut', this.initialData.lastPut)
      // 开始发现时间
      if (this.initialData?.firstPut?.length) this.$set(this, 'firstPut', this.initialData.firstPut)
    },
    /**
     * @description: 组件 change 事件
     * @param {*} event
     * @param {*} keyName
     * @return {*}
     */
    dateRangeSearch (event, keyName) {
      if (!event) this[keyName] = []
      this.search()
    },
    // 传值给父组件
    search (params = []) {
      this.params = {
        ...this.params,
        ...params,
        firstPut: this.firstPut,
        lastPut: this.lastPut
      }
      this.$emit('handle', this.params)
    },
    /**
     * @description: 重置单项
     * @param {*} keyName firstPut / lastPut
     * @return {*}
     */
    resetItem (keyName) {
      this[keyName] = []
      this.search()
    },
    /**
     * @description: 数据更新时，检查 updateData 是否还存在 firstPut / lastPut， 不存在则删除对应数据
     * @return {*}
     */
    updateReset (params) {
      const paramsKeys = Object.keys(params)
      // 是否存在 lastPut
      const lastPutArr = _.intersection(paramsKeys, ['lastPutFrom', 'lastPutTo'])
      if (!lastPutArr?.length) this.lastPut = []
      // 是否存在 firstPut
      const firstPutArr = _.intersection(paramsKeys, ['firstPutFrom', 'firstPutTo'])
      if (!firstPutArr?.length) this.firstPut = []
    },
    // 重置所有选项
    reset () {
      this.params = {}
      for (const v of this.components) {
        if (v === 'dateRange') {
          // 如果是时间范围的话，会有2个
          // this.isReset = true
          this.firstPut = []
          this.lastPut = []
        } else {
          this.$refs[v].reset(false)
        }
      }
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.search.less';
// 时间范围容器
.date-range-wrap {
  position: relative;
  display: flex;
  align-items: center;
  // overflow: hidden;
  // 覆盖原本显示内容
  // &__replace {
  //   padding-left: 5px;
  //   font-size: @font-tag-selected;
  //   position: absolute;
  //   .r-height(30);
  //   .r-line-height(30);
  //   z-index: 10;
  //   background: #fff;
  //   color: @color-primary;
  //   .hover {
  //     color: @color-font-secondary;
  //     .pointer;
  //     &:hover {
  //       color: @color-primary;
  //     }
  //   }
  // }
}
// 范围时间组件样式修改
/deep/ .el-date-editor {
  // width: 100% !important;
  background: none !important;
  // 边框
  border: 1px solid @color-border-gray;
  // 修改左padding使其往左对齐
  // padding-left: 5px !important;
  // 去掉组件前边的icon
  .r-height(30);
  .el-range__icon {
    visibility: hidden;
  }

  &.el-input__inner {
    .r-padding(3, 10);
    .r-width(380);
  }
  // 修改输入框样式
  .el-range-input {
    // text-align: left;
    // color: @color-font-secondary;
    &::-webkit-input-placeholder {
      background: none;
      font-size: @font-form-size;
      color: @color-font-basic;
      font-weight: 400;
    }
    &::-moz-input-placeholder {
      background: none;
      font-size: @font-form-size;
      color: @color-font-basic;
      font-weight: 400;
    }
    &:-moz-input-placeholder {
      background: none;
      font-size: @font-form-size;
      color: @color-font-basic;
      font-weight: 400;
    }
    &:-ms-input-placeholder {
      background: none;
      font-size: @font-form-size;
      color: @color-font-basic;
      font-weight: 400;
    }
  }
  // 当已有值时，让输入框内的文本颜色为蓝色
  &.hasValue {
    .el-range-input {
      color: @color-primary;
      // color: rgba(0, 0, 0, 0);
      font-weight: 300;
      font-size: @font-tag-selected;
    }
    // 不显示清空按钮
    // .el-range__close-icon {
    //   display: none;
    // }
  }

  // 修改 icon 大小
  .el-input__icon {
    .r-font-size(14);
  }
  .el-range__close-icon {
    .r-line-height(24);
  }
}
</style>
