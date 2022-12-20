<template>
  <div class="part-footer-container">
    <div class="content-box">
      <!-- 引导正文 -->
      <div class="f-content">Join DigiAds and Start a New TikTok Marketing and eCommerce Journey!</div>
      <div class="f-second">
        <div class="second-content">Free 7-Day Trial. No Commitment. No Credit Card Required.</div>
        <div class="btn-img">
          <com-btn type="bg-primary" class="sign-up-free" fontSize="25">SIGN UP FREE</com-btn>
        </div>
      </div>
    </div>
    <img class="bottom-img" :src="`${OSS_PREFIX}default/footer_right_bottom.png`" alt="">
  </div>
</template>
<script>
export default {
  name: 'PartFooter',
  components: {},
  data() {
    return {}
  },
  computed: {
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {
  }
}
</script>
<style  lang="less" scoped>
.part-footer-container {
  display: flex;
  width: 100%;
  .r-height(343);
  background: #F6f7FF;

  .content-box {
    .r-padding-top(83);
    .r-padding-left(156);
    // margin-left: 300px;
    .r-margin-left(340);

    .f-content {
      height: 42px;
      .r-font-size(38);
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #1436F5;
      .r-margin-bottom(40);
      .r-line-height(43)
    }

    .f-second {
      display: flex;

      .btn-img {
        width: 330px;
        height: 100px;
        background-image: radial-gradient(#ceff00 0%, #ceff00 5%, #f6f7ff);
      }

      .second-content {
        // width: 1029px;
        // .r-height(39);
        .r-font-size(36);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303030;
        .r-line-height(43);
        .r-margin-right(100)
      }

      .sign-up-free {
        .r-margin-top(3);
        .r-width(321);
        .r-height(62)
      }
    }
  }

  .bottom-img {
    transform: rotateY(180deg);
    .r-width(299);
    .r-height(330);
    margin-left: auto;
    margin-top: auto;
  }
}
</style>
