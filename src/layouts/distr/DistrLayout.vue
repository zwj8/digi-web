<template>
  <el-container>
    <!-- 侧边栏 -->
    <aside-layout />
    <el-container>
      <!-- 顶部 -->
      <el-header class="el-header-adjust">
        <header-layout />
      </el-header>
      <el-main class="el-main-adjust">
        <div class="content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { AsideLayout, HeaderLayout } from './components'
import mixinLang from '@/mixin/layout.lang'
import store from '@/store'
export default {
  name: 'DistrLayout',
  mixins: [mixinLang],
  components: {
    AsideLayout,
    HeaderLayout
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
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
/deep/ .el-container {
  height: 100vh;
}

// 顶部样式
.el-header-adjust {
  height: auto;
  display: flex;
  flex-flow: column;
  border-bottom: 1px solid @color-border-gray;
  /deep/ &.el-header {
    .r-height(120) !important;
    // height: 120px !important;
  }
}
// 内容区样式
.el-main-adjust {
  background: @bg-color;
  box-sizing: border-box;
  padding: 0;
  .r-padding-top(20);
  .r-padding-left(20);
  .content {
    background: #fff;
    width: 100%;
    .p2r-calc-reduce(height, 100vh, 140);
    // height: calc(100vh - 140px);
    // height: calc(100vh - 190px);
    overflow: auto;
    box-sizing: border-box;
    .r-box-shadow(0, 0, 10, 0, @color-shadow);
    // box-shadow: 0 0 10px 0 @color-shadow;
    .r-padding(20);
    // padding: 20px;
    .r-padding-top(30);
    // 滚动条样式
    .public-scroll;
  }
}

</style>
