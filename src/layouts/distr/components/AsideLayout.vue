<template>
  <el-aside class="el-aside-adjust" :width="asideWidth">
    <div class="logo">
      <part-logo />
    </div>
    <div class="menu">
      <div class="title">
        <span>{{ $t('layout_distr.text_work') }}:</span>
      </div>
      <layout-menu />
    </div>
  </el-aside>
</template>
<script>
import LayoutMenu from './components/LayoutMenu'
import PartLogo from '@/components/part/PartLogo'
import { REM_PX } from '@/constants'
export default {
  name: 'AsideLayout',
  props: {},
  components: {
    PartLogo,
    LayoutMenu
  },
  filters: {},
  data () {
    return {}
  },
  computed: {
    asideWidth () {
      return `${300 / REM_PX}rem`
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style  lang="less" scoped>
// 侧边样式
.el-aside-adjust {
  min-height: 100vh;
  box-sizing: border-box;
  .r-box-shadow(0, 0, 8, 0, @color-light-gray);
  // box-shadow: 0 0 8px 0 @color-light-gray;
  .logo {
    .r-width-height(230, 62);
    // width: 230px;
    // height: 62px;
    margin: 0 auto;
    .r-margin-top(10);
    .r-margin-bottom(10);
    // margin: 10px auto;
  }
  .menu {
    .r-padding(0, 30);
    // padding: 0 30px;
    .r-padding-top(30);
    // padding-top: 30px;
    .title {
      .r-padding-bottom(30);
      // padding-bottom: 30px;
      border-bottom: 1px solid @color-light-gray;
      .r-font-size(20);
      // font-size: 20px;
    }
  }
}
</style>
