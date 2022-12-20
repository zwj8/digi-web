<template>
  <el-container>
    <!-- 视频列表 -->
    <el-aside width="auto">
      <part-menu />
    </el-aside>
    <el-main class="main">
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import PartMenu from './part/PartMenu.vue'
export default {
  name: 'CourseHome',
  mixins: [],
  components: {
    PartMenu
  },
  filters: {},
  props: {},
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
.el-container {
  min-height: @layout-front-min-hf-height;
}
.main {
  background-color: @bg-color;
  padding-right: 0;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .r-padding(40, 50);
  .r-padding-right(0);
  background-color: #fff;
  .p2r(border-top-left-radius, 15);
  .r-box-shadow(0, 0, 10, 0, @color-shadow);
}
</style>
