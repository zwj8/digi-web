<template>
  <section>
    <div :id="name" class="se-input-wrap" :title="placeholder" @click="optionBoxShow = !optionBoxShow">
      <!-- 鼠标放置Tip -->
      <el-tooltip :disabled="!tagText" effect="dark" :visible-arrow="false" :content="tooltipContent" placement="top">
        <div class="se-input-box">
          <!-- 如果没有选项被选中时，展示占位文本 -->
          <span v-if="!tagText" class="placeholder" v-text="placeholder"></span>
          <!-- 选项展示框 -->
          <div v-else class="tag-box">
            <!-- 已选项 -->
            <span class="placeholder placeholder--tagText">{{ tagText }}</span>
          </div>
          <!-- 重置icon -->
          <div class="se-input-box__icon">
            <!-- 如果是必须项，则不显示清空icon -->
            <template v-if="!isRequire">
              <i v-if="tagText" class="el-icon-circle-close hover" @click.stop="reset"></i>
            </template>
            <i class="el-icon-caret-bottom arrow" :class="{ 'is-up': optionBoxShow }"></i>
          </div>
        </div>
      </el-tooltip>
      <!-- 下拉选项 -->
      <div v-show="optionBoxShow" class="se-option-wrap" :class="{ 'is-show': optionBoxShow }">
        <!-- 选项 -->
        <div class="se-option-box">
          <ul>
            <li
              v-for="(op, index) in optionList"
              :key="index"
              class="se-option-item"
              :class="{ 'is-selected': tagText === op.label }"
              @click.stop="handleSelected(op)"
            >
              <!-- 当是国家选项时，有图标展示 -->
              <span class="se-option-item__text" :title="op.label">
                {{ op.needI18n ? $t(op.label) : op.label }}
              </span>
              <i class="se-option-item__checkbox"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { globalClose } from '@/libs/util.search'
export default {
  name: 'SelectSingle',
  components: {},
  filters: {},
  props: {
    name: { type: String, default: () => '' }, // 设置组件ID，用于全局点击事件，关闭下拉窗
    placeholder: { type: String, default: () => '请选择' }, // 占位文本
    optionList: { type: Array, default: () => [] }, // 选项数据源
    default: { type: [Boolean, Object, String, Number, Array], default: undefined }, // 是否有默认值
    initialValue: { type: [Boolean, Object, String, Number, Array], default: undefined }, // 初始值，跟默认值不同，当存在这个值时，组件重置时使用这个值
    prefixTitle: { type: String, default: null }, // 是否在组件内展示 title
    require: { type: Boolean, default: false } // 是否是必选
  },
  data () {
    return {
      optionBoxShow: false,
      selected: null
    }
  },
  computed: {
    isRequire () {
      if (this.require) return true
      else return false
    },
    // 已选
    tagText () {
      if (this.selected) {
        let _label = null
        if (this.selected?.needI18n) _label = this.$t(this.selected?.label)
        else _label = this.selected?.label
        let _text = null
        if (this.prefixTitle) _text = `${this.prefixTitle}: ${_label}`
        else _text = _label
        return _text
      }
      return false
    },
    // 已选项的鼠标放置提示
    tooltipContent () {
      let _text = null
      if (this.selected?.needI18n) _text = this.$t(this.selected?.label)
      else _text = this.selected?.label
      return `${this.placeholder}：${_text}`
    }
  },
  watch: {
    default: {
      deep: true,
      handler (val) {
        if (typeof val === 'undefined') this.selected = null
        else this.selected = this.optionList.find(v => v.value === val)
      }
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
     * @description: 设置默认值
     * @return {*}
     */
    initial () {
      if (typeof this.default === 'undefined') return
      this.selected = this.optionList.find(v => v.value === this.default)
    },
    // 传值给父组件
    output () {
      const params = {}
      params[this.name] = this.selected?.value
      this.$emit('search', params)
    },
    /**
     * @description: 点击选中
     * @param {*} item 被选中的值
     * @return {*}
     */
    handleSelected (item) {
      this.optionBoxShow = false
      if (this.selected?.value === item.value) return false
      this.selected = item
      this.output()
    },
    /**
     * @description: 重置
     * @param {*} output 是否执行output
     * @return {*}
     */
    reset (output = true) {
      // 是否存在初始值
      if (this.initialValue) this.selected = this.optionList.find(v => v.value === this.initialValue)
      else this.selected = null
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
</style>
