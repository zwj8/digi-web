<template>
  <section class="header-layout">
    <part-logo />
    <div class="header-layout__right">
      <layout-nav />
      <layout-auth />
      <layout-language />
    </div>
  </section>
</template>
<script>
import PartLogo from '@/components/part/PartLogo'
import LayoutNav from './components/LayoutNav'
import LayoutAuth from './components/LayoutAuth'
import LayoutLanguage from './components/LayoutLanguage'
export default {
  name: 'HeaderLayout',
  components: {
    PartLogo,
    LayoutNav,
    LayoutAuth,
    LayoutLanguage
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style  lang="less" scoped>
// header 高宽
@header-height: @layout-front-header-height;
@header-width: 100vw;
@padding: 5px 20px;

.header-layout {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  height: @header-height;
  width: @header-width;
  box-sizing: border-box;
  .r-padding(5, 20);
  // padding: @padding;
  .r-box-shadow(0, 0, 10, 0, rgba(0, 0, 0, 0.1));
  // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  &__right {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
}
</style>
