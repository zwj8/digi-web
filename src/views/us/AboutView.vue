<template>
  <section class="all">
    <div class="banner">
      <div class="big-title">
        <h2>We help you <span class="blue">understand your audience </span></h2>
        <h2 class="blue">and boost your business <span style="color:#282828 ;">with TikTok!</span></h2>
      </div>
      <div class="hengxian">
      </div>
      <div class="article">
        <p> DigiAds is all about data, content, and strategy to help you win with TikTok. </p>
        <p>TikTok is one of the top emerging global social media in recent years, </p>
        <p>and its continuing growth and dedication to transform into an eCommerce </p>
        <p>land make it the most promising social media of the future. Founded by a group of </p>
        <p>ByteDance alumni, DigiAds focuses on TikTok ads data and analysis, eCommerce product selection,</p>
        <p>and content optimization to help your business seize the opportunity and make a difference with TikTok.</p>
        <p>Seize the opportunity and win your future with DigiAds!</p>
      </div>
    </div>
    <catuns></catuns>
  </section>
</template>
<script>
import catuns from '@/components/part/PartFooter2.vue'
export default {
  name: 'AboutView',
  mixins: [],
  components: { catuns },
  filters: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>
<style lang="less" scoped>
@titleColor: #282828;
@theme: #1436F5;

.all {
  background-image: url('@{oss_prefix}default/us_banner_bg.jpg');
  // background-position: 290px 100px;
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: 0px -50px;

  .banner {
    width: 1350px;
    margin: 120px auto;
    margin-top: 130px;
    margin-bottom: 110px;

    .big-title {
      font-size: 38px;
      line-height: 58px;
      margin-bottom: 10px;

      .blue {
        color: @theme;
      }
    }

    .hengxian {
      width: 39px;
      height: 8px;
      background: @titleColor;
      border-radius: 4px;
      margin-top: 50px;
      margin-left: 5px;
      margin-bottom: 15px;
    }

    .article {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: @titleColor;
      line-height: 40px;

      &>p:nth-child(6) {
        margin-bottom: 40px;
      }
    }
  }
}
</style>
