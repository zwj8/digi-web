<template>
  <div class="about-wrap">
    <header class="wrap-bg">
      <section class="item_header">
        <div class="item_header__logo">
          <img class="item_header__logo-img" :src="`${OSS_PREFIX}default/about_logo.png`" alt="" />
        </div>
        <div class="item_header__desc">
          <h3 class="item_header__desc-title">{{ $t('about.text_title') }}</h3>
          <span>{{ $t('about.text_sub_title') }}</span>
          <p class="item_header__desc-sub-title">{{ $t('about.text_desc') }}</p>
        </div>
      </section>
    </header>
    <part-join-now />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PartJoinNow from '@/components/part/PartJoinNow'
export default {
  name: 'AboutView',
  components: {
    PartJoinNow
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('global/auth', ['isLogined'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    freeUse () {
      let pathName = 'register'
      // 如果是登陆状态，则跳转到TT广告列表
      if (this.isLogined) pathName = 'adList'
      this.$router.push({ name: pathName })
    }
  }
}
</script>
<style  lang="less" scoped>
.about-wrap {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .wrap-bg {
    .r-padding-top(81);
    // padding-top: 81px;
    width: 100%;
    background-color: @bg-color;
    background-image: url('@{oss_prefix}default/about_us_bg.png');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    border-bottom: 2px solid @color-light-gray;
  }
  // logo和描述
  .item_header {
    @header-height-rem: 492;
    @rem-hhr: (@header-height-rem / @remPx);
    @header-height: ~'@{rem-hhr}rem';
    // @header-height: 492px;

    @box-w-rem: 1749;
    @rem-bwr: (@box-w-rem / @remPx);
    @box-w: ~'@{rem-bwr}rem'; // box的的宽度
    // @box-w: 1749px; // box的的宽度

    @content-w-rem: 1472;
    @rem-cwr: (@content-w-rem / @remPx);
    @content-w: ~'@{rem-cwr}rem'; //内容的宽度
    // @content-w: 1472px; //内容的宽度

    @content-h-rem: 362;
    @rem-chr: (@content-h-rem / @remPx);
    @content-h: ~'@{rem-chr}rem'; //内容高度
    // @content-h: 362px; //内容高度

    width: @box-w;
    height: @header-height;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding-left: calc((@box-w - @content-w) / 2);
    padding-right: calc((@box-w - @content-w) / 2);
    .r-padding-bottom(129);
    // padding-bottom: 129px;
    // logo
    &__logo {
      .r-width-height(505, 433);
      // width: 505px;
      // height: 433px;
      position: relative;
      &-img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
    // 关于我们描述
    &__desc {
      .r-width(852);
      // width: 852px;
      height: @content-h;
      .r-padding-top(59);
      // padding-top: 59px;
      &-title {
        .r-font-size(60);
        // font-size: 60px;
        font-weight: bold;
        display: block;
        .r-margin-bottom(26);
        // margin-bottom: 26px;
      }
      span {
        .r-font-size(28);
        // font-size: 28px;
        font-weight: 500;
      }
      &-sub-title {
        .r-font-size(20);
        // font-size: 20px;
        .r-line-height(48);
        // line-height: 48px;
        .r-margin-top(55);
        // margin-top: 55px;
      }
    }
  }
}
.phone-code-select {
  .r-width(100);
  // width: 100px;
}
</style>
