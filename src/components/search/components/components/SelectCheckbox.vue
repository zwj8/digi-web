<template>
  <div class="com-checkbox">
    <input :id="comId" class="com-checkbox__input" type="checkbox" v-model="checkboxValue" @change="output">
    <label class="com-checkbox__label" :for="comId">
      <span class="com-checkbox__label_text" v-if="label">{{ label }}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'SelectCheckbox',
  mixins: [],
  components: {},
  filters: {},
  props: {
    label: { type: String, default: '' },
    name: { type: String, default: () => '' } // 设置组件ID，用于全局点击事件，关闭下拉窗
  },
  data () {
    return {
      checkboxValue: false
    }
  },
  computed: {
    comId () {
      const _id = Math.random().toString(36).substr(2)
      return `com-checkbox-${_id}`
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 传值给父组件
     * @return {*}
     */
    output () {
      const params = {}
      params[this.name] = this.checkboxValue
      this.$emit('change', params)
    },
    /**
     * @description: 重置
     * @param {*} output
     * @return {*}
     */
    reset (output = true) {
      this.checkboxValue = false
      output && this.output()
    }
  }
}
</script>
<style lang="less" scoped>
.com-checkbox {
  .flex-cc;
  &__input {
    .r-width-height(15);
    .r-margin-right(8);
    position: relative;
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;

    &::before {
      box-sizing: border-box;
      display: inline-block;
      content: '';
      .r-width-height(16);
      .r-border-radius(16);
      background: #fff;
      .r-border(1, solid, @color-primary);
      // border: 1px solid @color-primary;
      position: relative;
    }

    &:checked::after {
      display: inline-block;
      content: '';
      background: @color-primary;
      .r-width-height(8);
      .r-border-radius(8);
      position: absolute;
      .p2r(left, 4);
      .p2r(top, 4);
    }
  }
  &__label {
    color: @color-font-basic;
    .r-font-size(@font-size-basic-rem);
    cursor: pointer;
  }
}
</style>
