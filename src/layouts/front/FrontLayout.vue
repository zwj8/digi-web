<template>
  <section class="front-layout">
    <header-layout></header-layout>
    <div class="content">
      <router-view></router-view>
    </div>
    <footer-layout></footer-layout>
    <part-limit />
    <part-cashier />
  </section>
</template>
<script>
import PartCashier from '@/components/part/PartCashier'
import PartLimit from '@/components/part/PartLimit'
import { HeaderLayout, FooterLayout } from './components'
import mixinLang from '@/mixin/layout.lang'
import store from '@/store'
export default {
  name: 'FrontLayout',
  mixins: [mixinLang],
  components: {
    HeaderLayout,
    FooterLayout,
    PartLimit,
    PartCashier
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {
    // 设置语言为中文
    this.mixinSetLangZH()
  },
  mounted () {
    store.dispatch('global/locate/setLocate', 'CN')
  },
  methods: {}
}
</script>
<style  lang="less" scoped>
// header 栏的高度
@content-margin-top: @layout-front-header-height;
// footer 高度
@footer-height: @layout-front-footer-height;

.front-layout {
  height: 100vh;
  overflow-x: auto;
  .public-scroll;

  .content {
    // 最小高度为 (浏览器高度 - header高度 - footer高度)
    min-height: calc(100vh - @content-margin-top - @footer-height);
    margin-top: @content-margin-top;
    max-width: 100%;
    // max-width: calc(100% - @scroll-width);
    word-break: break-all;
  }
}
</style>
