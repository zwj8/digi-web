<template>
  <div class="e-wrap">
    <header>
      <div class="header-wrap">
        <div class="title">
          <span>Tiktok整体电商启动流程</span>
          <h1>HOW TO GET</h1>
          <h1>STARTED</h1>
          <span>如何开始</span>
        </div>
        <div class="item-link">
          <a href="https://www.closphere.com/?code=7866" target="_blank">
            <div class="item-link__item" @mouseenter="text_0 = '点击前往'" @mouseleave="text_0 = '免费浏览器'">
              <div class="img-wrap"><img :src="`${OSS_PREFIX}default/cp_browser.png`" alt="" /></div>
              <span>{{ text_0 }}</span>
            </div>
          </a>
          <a href="https://www.shoplazza.cn/pages/affiliate-register?ref=221" target="_blank">
            <div class="item-link__item" @mouseenter="text_1 = '点击建站（开店）'" @mouseleave="text_1 = '1.建站（开店）'">
              <div class="img-wrap"><img :src="`${OSS_PREFIX}default/e_item_01.png`" alt="" /></div>
              <span>{{ text_1 }}</span>
            </div>
          </a>
          <a href="https://www.airwallex.com/cn/signup?utm_source=a11BB0000004KBNYA2" target="_blank">
            <div class="item-link__item" @mouseenter="text_2 = '点击支付'" @mouseleave="text_2 = '2.支付'">
              <div class="img-wrap"><img :src="`${OSS_PREFIX}default/e_item_02.png`" alt="" /></div>
              <span>{{ text_2 }}</span>
            </div>
          </a>
          <a href="javascript:;" @click="$router.push({ name: 'logistics' })">
            <div class="item-link__item" @mouseenter="text_3 = '申请物流'" @mouseleave="text_3 = '3.物流'">
              <div class="img-wrap"><img :src="`${OSS_PREFIX}default/e_item_03.png`" alt="" /></div>
              <span>{{ text_3 }}</span>
            </div>
          </a>
          <a href="javascript:;" @click="$router.push({ name: 'adAccount' })">
            <div class="item-link__item" @mouseenter="text_4 = '点击开户'" @mouseleave="text_4 = '4.广告开户'">
              <div class="img-wrap"><img :src="`${OSS_PREFIX}default/e_item_04.png`" alt="" /></div>
              <span>{{ text_4 }}</span>
            </div>
          </a>
        </div>
      </div>
    </header>
    <section>
      <h1>Start registration</h1>
      <span>开始申请注册</span>
    </section>
    <footer>
      <div><span>香港公司代注册申请表链接: </span><a href="https://jinshuju.net/f/PVWysN" target="_blank">https://jinshuju.net/f/PVWysN</a></div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'EBusinessView',
  components: {},
  data () {
    return {
      text_0: '免费浏览器',
      text_1: '1.建站（开店）',
      text_2: '2.支付',
      text_3: '3.物流',
      text_4: '4.广告开户'
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
@width: 1366;
.e-wrap {
  display: flex;
  flex-flow: column;
  align-items: center;
  header {
    .r-height(536);
    // height: 536px;
    width: 100%;
    background-color: @bg-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-wrap {
      margin: 0 auto;
      .r-width(@width);
      // width: 75%;
      justify-content: space-between;
      display: flex;
      flex-flow: row nowrap;
      .title {
        // max-width: 980px;
        // flex-shrink: 0;
        .r-width(366);
        // width: 430px;
        position: relative;
        span {
          display: block;
          .r-font-size(22);
          // font-size: 24px;
          &:first-child::before {
            content: '';
            position: absolute;
            .p2r(top, 30);
            .p2r(left, -56);
            // top: 30px;
            // left: -56px;
            .r-width-height(10, 44);
            // width: 10px;
            // height: 44px;
            background: @color-primary;
            .r-border-radius(4);
            // border-radius: 4px;
            transform: translateY(-60%);
          }
          &:first-child {
            .r-margin-bottom(24);
            // margin-bottom: 24px;
          }
          &:last-child {
            .r-margin-top(24);
            // margin-top: 24px;
          }
        }
        h1 {
          font-family: Helvetica;
          white-space: nowrap;
          .r-line-h-height(60);
          // height: 60px;
          .r-font-size(60);
          // font-size: 60px;
          color: @color-primary;
          font-weight: bold;
        }
      }
      .item-link {
        flex-grow: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        .r-padding-top(60);
        // padding-top: 60px;
        &__item {
          .r-width-height(151, 136);
          // @hw: 136px;
          // width: calc(@hw + 15px);
          // height: @hw;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          .r-margin-left(20);
          // margin-left: 20px;
          box-sizing: border-box;
          .pointer;
          .img-wrap {
            img {
              .r-width-height(100);
              // height: @hw;
              // width: @hw;
              object-fit: scale-down;
              .r-margin-bottom(29);
              // margin-bottom: 29px;
            }
          }
          span {
            text-align: center;
            display: block;
            .r-font-size(20);
            // font-size: 22px;
            white-space: nowrap;
          }
          &:hover {
            color: @color-primary;
          }
        }
      }
    }
  }
// @media screen and (min-width: 1930px) {
//   section, footer {
//    padding-left: 0 !important;
//   }
// }
  section {
    .r-height(208);
    // height: 208px;
    .r-width(@width);
    // width: 80%;
    box-sizing: border-box;

    // .r-padding-left(60);
    // padding-left: 60px;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    border-bottom: 1px solid @color-light-gray;
    h1 {
      .r-font-size(60);
      // font-size: 60px;
      .r-margin-bottom(30);
      // margin-bottom: 30px;
    }
    span {
      display: block;
      .r-font-size(28);
      // font-size: 28px;
    }
  }
  footer {
    .r-width(@width);
    box-sizing: border-box;
    .r-padding(40, 0);
    // padding: 40px 0;
    // .r-padding-left(60);
    // padding-left: 60px;
    .r-padding-bottom(120);
    // padding-bottom: 120px;
    a {
      color: @color-primary;
    }
  }
}
</style>
