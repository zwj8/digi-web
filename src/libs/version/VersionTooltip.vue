<template>
  <div class="version-tooltip-warpper">
    <div class="tooltip">
      <div class="tooltip-title">
        <span>{{ language[lang].title }}</span>
      </div>
      <div class="tooltip-content">
        <p class="tooltip-content__message">{{ language[lang].message }}</p>
        <com-btn size="mini" @click="reload">{{ language[lang].btn }}</com-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VersionTooltip',
  components: {},
  filters: {},
  props: {},
  data () {
    return {
      lang: 'zh',
      language: {
        en: {
          title: 'Website update prompt',
          message: 'The website has been updated and needs to refresh the page.',
          btn: 'ok'
        },
        zh: {
          title: '网站更新提示',
          message: '网站已更新，需要刷新页面。',
          btn: '确定'
        }
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 刷新页面
     * @return {*}
     */
    reload () {
      window.location.reload()
    }
  }
}
</script>
<style  lang="less" scoped>
.version-tooltip-warpper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tooltip {
  background-color: #fff;
  border-radius: 5px;
  &-title {
    font-size: 14px;
    padding: 5px;
    border-bottom: 1px solid #e7e7e7;
  }
  &-content {
    padding: 10px;
    text-align: center;
    &__message {
      margin-bottom: 10px;
    }
  }
}
</style>
