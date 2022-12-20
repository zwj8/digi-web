<template>
  <div class="error">
    <el-image
      class="error-img"
      :src="`${OSS_PREFIX}default/404.png`"
      :size="388"
    ></el-image>
    <p class="error-tip__en">sorry! The Page Not Found:(</p>
    <p class="error-tip__cn">不过不要不开心，因为富裕属于口袋充满快乐的人。</p>
    <div class="error-btn">
      <com-btn size="mini" type="black" @click.native="$router.push({ name: 'home' })">返回首页</com-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style  lang="less" scoped>
.error {
  background: @bg-color;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-image: url('@{oss_prefix}default/404_bg.png');
  .p2r(background-size, 500);
  // background-size: 500px;
  p {
    .r-margin-top(45);
  }
  &-tip__en {
    .r-font-size(36);
  }
  &-tip__cn {
    .r-font-size(23);
    .r-padding-left(25);
  }
  &-btn {
    .r-padding-top(20);
  }
}
</style>
