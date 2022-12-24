<template>
  <button :disabled='disabled' v-loading="downloading" :class="[
    'btn',
    `btn-type-${type}`,
    `btn-size-${size}`,
    { 'btn-disabled': disabled }
  ]" :style="`font-size: ${compFontSize}`" @click="handleClick">
    <slot />
  </button>
</template>
<script>
import { REM_PX } from '@/constants'
export default {
  name: 'ComBtn',
  props: {
    // big basic mini
    size: { type: String, default: 'basic' },
    // default primary black
    type: { type: String, default: 'default' },
    // 按钮是否禁用
    disabled: { type: Boolean, default: false },
    // 文字大小
    fontSize: { type: [Number, String], default: 0 },
    // 是否是下载按钮
    download: { type: String, default: '' }
  },
  components: {},
  filters: {},
  data() {
    return {
      downloading: false
    }
  },
  computed: {
    compFontSize() {
      if (+this.fontSize > 0) return `${+this.fontSize / REM_PX}rem`
      return 'none'
    }
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {
    /**
     * @description: 省去使用组件时添加.native
     * @param {*} evt
     * @return {*}
     */
    handleClick(evt) {
      this.$emit('click', evt)
      if (this.download) this.downloadFile()
    },
    /**
     * @description: 文件下载
     * @return {*}
     */
    downloadFile() {
      const url = this.download
      const fileName = this.matchFileName(url)
      this.downloading = true
      fetch(url, {
        method: 'GET',
        mode: 'cors'
      }).then(response => {
        return response.blob()
      }).then(blob => {
        const url = URL.createObjectURL(blob)

        const _a = document.createElement('a')
        _a.download = fileName
        _a.href = url
        _a.click()
      }).finally(() => {
        this.downloading = false
      })
    },
    // 匹配文件名
    matchFileName(url) {
      const reg = /[a-zA-Z0-9]+?\.[mp4|jpg|jpeg|gif|png]+/
      const matList = url.match(reg)
      if (matList.length) return matList[0]
      return ''
    }
  }
}
</script>
<style  lang="less" scoped>
@border-size: 1px; // 按钮边框

// 按钮样式
.btn {
  display: inline-block;
  .r-border-radius(6);
  // border-radius: 6px;
  color: @color-font-black;
  cursor: pointer;
  white-space: nowrap;
  // 不可选中
  .no-select;

  // 按键风格
  // 背景透明,边框黑,经过透明
  &.btn-type-default {
    color: @color-font-black;
    border: @border-size solid @color-font-black;
    background: transparent;

    &:hover {
      transition: all ease-in-out 0.2s;
      color: @color-primary;
      border: @border-size solid @color-primary;
    }
  }

  // 背景蓝,边框蓝,经过透明
  &.btn-type-bg-primary {
    color: #fff;
    background: @color-primary;
    border: @border-size solid @color-primary;

    &:hover {
      transition: all ease-in-out 0.2s;
      color: @color-primary;
      border: @border-size solid @color-primary;
      background: transparent;
    }
  }

  // 背景黑,边框黑,经过透明
  &.btn-type-bg-black {
    color: #fff;
    background: @color-font-black;
    border: @border-size solid @color-font-black;

    &:hover {
      transition: all ease-in-out 0.2s;
      color: @color-font-black;
      border: @border-size solid @color-font-black;
      background: transparent;
    }
  }

  // 背景透明,边框蓝,经过蓝
  &.btn-type-primary {
    color: @color-primary;
    background: transparent;
    border: @border-size solid @color-primary;

    &:hover {
      transition: all ease-in-out 0.2s;
      color: #fff;
      border: @border-size solid @color-primary;
      background: @color-primary;
    }
  }

  // 背景透明,边框黑,经过黑
  &.btn-type-black {
    color: @color-font-black;
    background: transparent;
    border: @border-size solid @color-font-black;

    &:hover {
      transition: all ease-in-out 0.2s;
      color: #fff;
      border: @border-size solid @color-font-black;
      background: @color-font-black;
    }
  }

  // 固定宽度，主题色背景
  &.btn-type-fixed {
    width: 320px;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    background: @color-primary;
    border: @border-size solid @color-primary;
    border-radius: 5px !important;
    padding: 10px !important;
    font-size: 25px !important;

    &:hover {
      transition: all ease-in-out 0.2s;
      background: @color-light-primary-80;
      border: @border-size solid @color-light-primary-80;
    }
  }

  // 按键大小
  &.btn-size-big {
    .r-font-size(26);
    .r-padding(10, 20);
    // font-size: 26px;
    // padding: 10px 20px;
  }

  &.btn-size-basic {
    .r-font-size(16);
    .r-padding(8, 15);
    // font-size: 16px;
    // padding: 8px 15px;
  }

  &.btn-size-small {
    .r-font-size(16);
    .r-padding(6, 15);
    // font-size: 16px;
    // padding: 6px 15px;
  }

  &.btn-size-mini {
    .r-font-size(13);
    .r-padding(6, 15);
    // font-size: 13px;
    // padding: 6px 15px;
  }

}

// 如果前方有按钮，则分隔5px
.btn+.btn {
  .r-margin-left(5);
  // margin-left: 5px;
}

// 按钮禁用
.btn-disabled {
  opacity: 0.5;
  .not-allowed;
}
</style>
