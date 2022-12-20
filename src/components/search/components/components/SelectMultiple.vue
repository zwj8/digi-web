<template>
  <section>
    <div
      :id="name"
      class="se-input-wrap"
      :title="placeholder"
      @click="optionBoxShow = !optionBoxShow"
    >
      <!-- 鼠标放置Tip -->
      <el-tooltip
        :disabled="!selectedCount"
        effect="dark"
        :visible-arrow="false"
        :content="tooltipContent"
        placement="top"
      >
        <div class="se-input-box">
          <!-- 当已有选项时显示Top占位文本提示 -->
          <!-- <span v-show="selectedCount" class="se-input-box__placeholder" v-text="placeholder"></span> -->
          <!-- 如果没有选项被选中时，展示占位文本 -->
          <span
            v-if="!selectedList.length"
            class="placeholder"
            v-text="placeholder"
          ></span>

          <!-- 选项展示框 -->
          <div v-else class="tag-box">
            <span v-show="selectedCount" class="tag-box__placeholder">{{
              `${placeholder}`
            }}</span>
            <!-- 已选项 -->
            <div class="tag-box__item">
              <span>{{ lastSelectedItem.label }}</span>
              <i class="el-icon-remove" @click.stop="deleteTag(lastSelectedItem.index)"></i>
            </div>
            <!-- 当选项多于2个时展示选了多少项 -->
            <!-- <span v-if="selectedCount > 1" class="tag-box__count">{{ `+${selectedCount}` }}</span> -->
          </div>
          <!-- 重置icon -->
          <div class="se-input-box__icon">
            <i
              v-if="selectedCount"
              class="el-icon-circle-close hover"
              @click.stop="reset"
            ></i>
            <i
              class="el-icon-caret-bottom arrow"
              :class="{ 'is-up': optionBoxShow }"
            ></i>
          </div>
        </div>
      </el-tooltip>
      <!-- 下拉选项 -->
      <div
        v-show="optionBoxShow"
        class="se-option-wrap"
        :class="{ 'is-show': optionBoxShow }"
      >
        <!-- 选项搜索框 -->
        <div v-if="needSearch" class="se-option-search">
          <el-input
            v-model="searchText"
            :placeholder="$t('components.search.placeholder_keyword')"
            clearable
            @click.native.stop
            @input="handleSelectSearch"
          ></el-input>
        </div>
        <!-- 选项 -->
        <div class="se-option-box">
          <!-- 是否有分组 -->
          <ul v-if="group">
            <div v-for="(op, index) in curOptionList" :key="index">
              <li class="se-option-group">{{ op.groupLabel }}</li>
              <li
                v-for="(child, childIndex) in op.groupValue"
                :key="childIndex"
                class="se-option-item"
                :class="{ 'is-selected': isActive(child) }"
                @click.stop="handleSelected(child)"
              >
                <!-- 当是国家选项时，有图标展示 -->
                <span
                  v-if="showCountryIcon"
                  class="c-flag"
                  :class="child.value | lowercase"
                ></span>
                <span class="se-option-item__text" :title="child.label">{{ child.label }}</span>
                <i class="se-option-item__checkbox"></i>
              </li>
            </div>
          </ul>
          <ul v-else>
            <li
              v-for="(op, index) in curOptionList"
              :key="index"
              class="se-option-item"
              :class="{ 'is-selected': isActive(op) }"
              @click.stop="handleSelected(op)"
            >
              <!-- 当是国家选项时，有图标展示 -->
              <span
                v-if="showCountryIcon"
                class="c-flag"
                :class="op.value | lowercase"
              ></span>
              <span class="se-option-item__text" :title="op.label">
                {{ op.label }}
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
import { cloneDeep } from 'lodash'
import com from '@/libs/util'
export default {
  name: 'SelectMultiple',
  components: {},
  filters: {
    // 国家code格式化给样式使用
    lowercase (val) {
      return String(val).toLowerCase()
    }
  },
  props: {
    initialData: { type: Array, default: () => [] }, // 默认选项
    name: { type: String, default: () => '' }, // 设置组件ID，用于全局点击事件，关闭下拉窗
    placeholder: { type: String, default: () => '请选择' }, // 占位文本
    group: { type: Boolean, default: false }, // 选项是否有分组
    optionList: { type: Array, default: () => [] }, // 选项数据源
    showCountryIcon: { type: Boolean, default: false }, // 是否有图标
    needSearch: { type: Boolean, default: false } // 是否需要输入搜索
  },
  data () {
    return {
      optionBoxShow: false,
      searchText: '',
      curOptionList: [],
      selectedList: []
    }
  },
  computed: {
    // 当选项多于2时，展示该项目
    selectedCount () {
      return this.selectedList?.length
    },
    // 已选框只显示最后选中的那项，没有选项则返回空对象
    lastSelectedItem () {
      const len = this.selectedList.length
      if (!len) return {}
      const lastObj = this.selectedList[len - 1]
      return {
        ...lastObj,
        index: len - 1
      }
    },
    // 已选项的鼠标放置提示
    tooltipContent () {
      const reArr = this.selectedList?.map(v => v.label)
      const formatText = com.arrayEllipsis(reArr, 233, false)
      return `${this.placeholder}：${formatText}`
    }
  },
  watch: {
    optionList: {
      immediate: true,
      deep: true,
      handler (val) {
        this.curOptionList = [...val]
      }
    },
    initialData: {
      deep: true,
      handler (val) {
        this.selectedList = cloneDeep(val) || []
      }
    }
  },
  created () {},
  mounted () {
    // 全局点击事件
    globalClose(document, this)
  },
  methods: {
    // 传值给父组件
    output () {
      const params = {}
      if (Array.isArray(this.selectedList) && this.selectedList.length) {
        params[this.name] = this.selectedList.map(v => {
          return v.value
        })
      } else {
        params[this.name] = []
      }
      this.$emit('search', params)
    },
    /**
     * @description: 删除tag
     * @param {*} index 要删除的tag的索引
     * @return {*}
     */
    deleteTag (index) {
      this.selectedList.splice(index, 1)
      this.output()
    },
    /**
     * @description: 下拉框搜索
     * @param {*} keyword 搜索关键字
     * @return {*}
     */
    handleSelectSearch (keyword) {
      const TL = Text => Text.toLowerCase()
      // 分组搜索和非分组搜索
      let hits = JSON.parse(JSON.stringify(this.optionList))
      if (!this.group) {
        hits = hits.filter(op => {
          // 如果标题符合
          if (
            typeof op.label === 'string' &&
            TL(op.label).includes(TL(keyword))
          ) return true
          // 如果值符合
          if (
            typeof op.value === 'string' &&
            TL(op.value).includes(TL(keyword))
          ) return true
          return false
        })
      } else {
        hits = hits.map(op => {
          // 当分组名包含keyword时，返回整个分组
          if (TL(op.groupLabel).includes(TL(keyword))) return op
          // 当分组内子项包含keyword时，过滤子项后，返回这个分组，否则返回空
          op.groupValue = op.groupValue.filter(hit => {
            if (
              typeof hit.label === 'string' &&
              TL(hit.label).includes(TL(keyword))
            ) return true
            if (
              typeof hit.value === 'string' &&
              TL(hit.value).includes(TL(keyword))
            ) return true
            return false
          })
          if (op.groupValue.length) return op
          else return null
        })
      }
      // 处理null值
      hits = hits.filter(v => v !== null)
      this.curOptionList = [...hits]
      // 搜索完成后，置顶滚动条
      com.top('.se-option-box')
    },
    /**
     * @description: 点击选中
     * @param {*} value 被选中的值
     * @return {*}
     */
    handleSelected (value) {
      const hit = this.selectedList.find(_h => {
        if (typeof value === 'string') {
          return _h !== value
        }
        return _h.value === value.value
      })
      if (hit) {
        this.selectedList = this.selectedList.filter(v => {
          if (typeof value === 'string') {
            return v !== value
          }
          return v.value !== value.value
        })
      } else {
        this.selectedList.push(value)
      }
      this.output()
    },
    /**
     * @description: 选项是否激活状态
     * @param {*} val
     * @return {*}
     */
    isActive (val) {
      const index = this.selectedList.findIndex(v => v.value === val.value)
      return index !== -1
    },
    /**
     * @description: 重置
     * @param {*} output 是否执行output
     * @return {*}
     */
    reset (output = true) {
      this.selectedList = []
      output && this.output()
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.search.less';
@import '@/assets/part/part.region.less';
</style>
