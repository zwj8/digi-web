<template>
  <section>
    <div :id="name" class="se-input-wrap" :title="placeholder" @click="optionBoxShow = !optionBoxShow">
      <!-- 鼠标放置Tip -->
      <el-tooltip :disabled="!tagShow" effect="dark" :visible-arrow="false" :content="tagText" placement="top">
        <div class="se-input-box">
          <!-- 当已有选项时显示Top占位文本提示 -->
          <!-- <span v-show="tagShow" class="se-input-box__placeholder" v-text="placeholder"></span> -->
          <!-- 选项展示框 -->
          <div v-if="tagShow" class="tag-box">
            <span v-show="tagShow" class="tag-box__placeholder">{{`${placeholder}`}}</span>
            <!-- 已选项 -->
            <span class="placeholder placeholder--tagText">{{tagText}}</span>
          </div>
          <!-- 如果没有选项被选中时，展示占位文本 -->
          <span v-else class="placeholder" v-text="placeholder"></span>
          <div class="se-input-box__icon">
            <!-- 重置icon -->
            <i v-if="tagShow" class="el-icon-circle-close hover" @click.stop="reset"></i>
            <i class="el-icon-caret-bottom arrow" :class="{ 'is-up': optionBoxShow }"></i>
          </div>
        </div>
      </el-tooltip>
      <!-- 下拉选项 -->
      <div
        v-show="optionBoxShow"
        class="se-option-wrap se-option-wrap--range"
        :class="{ 'is-show': optionBoxShow }"
        @click.stop
      >
        <div class="range-component-wrap">
          <span class="range-component-number">0</span>
          <el-slider v-model="selectedRange" range class="range-component"></el-slider>
          <span>{{ max }}+</span>
          <!-- <el-slider v-if="marks" v-model="selectedRange" range :marks="marks" class="range-component"></el-slider>
          <el-slider v-else v-model="selectedRange" range :max="max" :format-tooltip="foramtTooltip" class="range-component"></el-slider> -->
        </div>
        <div class="range-footer">
          <com-btn @click.native.stop="output" size="mini">{{ $t('ttad.btn_confirm') }}</com-btn>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { globalClose } from '@/libs/util.search'
export default {
  name: 'SelectRange',
  components: {},
  props: {
    initialData: { type: [Array, Object, String], default: () => [] },
    name: { type: String, default: () => '' }, // 设置组件ID，用于全局点击事件，关闭下拉窗
    placeholder: { type: String, default: () => '请选择' }, // 占位文本
    optionList: { type: Array, default: () => [] }, // 选项数据源
    // max / marks 只选其中一个，都加的话marks优先
    max: { type: Number, default: 100 } // 数字范围选择
    // marks: { type: Object, default: () => null } // 标签对象 默认为空
  },
  data () {
    return {
      optionBoxShow: false,
      initRange: [0, this.max],
      selectedRange: [0, this.max]
    }
  },
  computed: {
    // 是否显示 重置按钮 / 已选范围（默认值为0 ~ max，如果值为默认值，则不显示）
    tagShow () {
      return this.selectedRange[0] !== 0 || this.selectedRange[1] !== this.max
    },
    // 已选项的显示文本
    tagText () {
      const [min, max] = this.selectedRange
      return `${min} ~ ${max < this.max ? max : this.max + '+'}`
    }
  },
  watch: {
    initialData (val) {
      this.$set(this, 'selectedRange', [val[0] || 0, val[1] || this.max])
    }
  },
  created () {
    this.initial()
  },
  mounted () {
    // 全局点击事件
    globalClose(document, this)
  },
  methods: {
    /**
     * @description: 设置初始值
     * @return {*}
     */
    initial () {
      this.$set(this, 'selectedRange', [this.initialData[0] || 0, this.initialData[1] || this.max])
    },
    /**
     * @description: 格式化 tooltip message
     * @param {*} value 滑块到达的值
     * @return {*}
     */
    foramtTooltip (value) {
      if (value >= this.max) return `${this.max}+`
      return value
    },
    // 传值给父组件
    output () {
      this.optionBoxShow = false
      const params = {}
      // 当所选项为默认值时，传空数组
      if (Array.isArray(this.selectedRange) && this.tagShow) {
        params[this.name] = [...this.selectedRange]
      } else {
        params[this.name] = []
      }
      this.$emit('search', params)
    },
    /**
     * @description: 重置
     * @param {*} output 是否执行output
     * @return {*}
     */
    reset (output = true) {
      this.selectedRange = [...this.initRange]
      output && this.output()
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.search.less';

// 已选项容器
.tag-box {
  // 借用占位文本的样式
  .placeholder--tagText {
    color: @color-primary !important;
    font-size: @font-tag-selected !important;
  }
}

// 范围选择下拉容器
.se-option-wrap--range {
  // .p2r(width, 300);
  .r-width(500) !important;
  // width: 200% !important;
  box-sizing: border-box;
  .r-padding(0, 20);
  // padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  // element-ui 范围选择组件容器（主要用于解决组件左右两点溢出问题）
  .range-component-wrap {
    .r-padding(0, 10);
    // padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    .flex-sbc;
    .range-component-number {
      display: inline-block;
      white-space: nowrap;
      .r-padding(0, 5);
      // padding: 0 5px;
    }
    // element-ui 范围选择组件
    .range-component {
      width: 75%;
    }
  }
  // 底部操作
  .range-footer {
    flex-shrink: 0;
    box-sizing: border-box;
    .r-padding(10, 5);
    // padding: 10px 5px;
  }
}
</style>
