<template>
  <section class="home">
    <section class="home-banner">
      <div class="home-banner__content">
        <h1 class="title">
          {{ $t('home.banner_title') }}
        </h1>
        <p class="subtitle">
          {{ $t('home.banner_sub_title') }}
        </p>
        <p class="intro">
          {{ $t('home.banner_content') }}
        </p>
        <p class="line"></p>
        <com-btn size="big" @click.native="toTTAD">{{ $t('home.banner_free_btn') }}</com-btn>
        <div class="free-seven">
          <span class="free-seven_day">{{ $t('home.banner_tip_01') }}</span>
          <span class="free-seven_free">
            <span class="free-seven_free_bold">{{
                $t('home.banner_tip_02')
            }}</span>
            {{ $t('home.banner_tip_03') }}
          </span>
        </div>
      </div>
      <!-- 背景图片盒子 -->
      <div class="home-banner__bg">
        <div class="home-banner__bg_left"></div>
        <div class="home-banner__bg_right"></div>
      </div>
    </section>
    <div class="our-superiority">
      <section class="super-item">
        <el-row>
          <el-col :span="12">
            <h2 class="super-item__title">
              <span>{{ $t('home.section_1.title') }}</span>
            </h2>
            <h4 class="super-item__subtitle">
              {{ $t('home.section_1.sub_title') }}
            </h4>
            <ul class="super-tab">
              <li v-for="num in [1, 2, 3]" :key="num" class="super-tab-item" :class="{ active: imgIndex === num }">
                <h4 class="title" :class="{ active: imgIndex === num }">
                  {{ $t(`home.section_1.item_${num}.title`) }}
                </h4>
                <div class="intro">
                  {{ $t(`home.section_1.item_${num}.desc`) }}
                </div>
              </li>
            </ul>
            <div class="super-bullet-list">
              <i v-for="num in [1, 2, 3]" :key="num" class="super-bullet-list__item"
                :class="{ active: imgIndex === num }" @click="imgChange(num)"></i>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <img v-for="num in [1, 2, 3]" :key="num" v-show="imgIndex === num" class="changeable-img"
              :src="`${OSS_PREFIX}default/index_slideshow_0${num}.png`" />
            <!-- <img
              v-else
              class="changeable-img"
              src="${OSS_PREFIX}default/home_section_03.png"
            /> -->
          </el-col>
        </el-row>
      </section>
      <section class="super-item">
        <el-row>
          <el-col :span="24">
            <h2 class="super-item__title">
              <span>{{ $t('home.section_2.title') }}</span>
            </h2>
            <h4 class="super-item__subtitle">
              {{ $t('home.section_2.sub_title') }}
            </h4>
            <ul class="super-wrap">
              <li>
                <img :src="`${OSS_PREFIX}default/home_plan_03.png`" :alt="$t(`home.section_2.item_1.title`)" />
                <span>{{ $t(`home.section_2.item_1.title`) }}</span>
                <p>{{ $t(`home.section_2.item_1.desc`) }}</p>
              </li>
              <li>
                <img :src="`${OSS_PREFIX}default/home_plan_02.png`" :alt="$t(`home.section_2.item_2.title`)" />
                <span>{{ $t(`home.section_2.item_2.title`) }}</span>
                <p>{{ $t(`home.section_2.item_2.desc`) }}</p>
              </li>
              <li>
                <img :src="`${OSS_PREFIX}default/home_plan_01.png`" :alt="$t(`home.section_2.item_3.title`)" />
                <span>{{ $t(`home.section_2.item_3.title`) }}</span>
                <p>{{ $t(`home.section_2.item_3.desc`) }}</p>
              </li>
            </ul>
          </el-col>
        </el-row>
      </section>
      <section class="super-item">
        <el-row>
          <el-col :span="24">
            <h2 class="super-item__title">
              <span>{{ $t('home.section_3.title') }}</span>
            </h2>
            <h4 class="super-item__subtitle">
              {{ $t('home.section_3.sub_title') }}
            </h4>
            <div class="super-seller-wrap">
              <div class="swiper">
                <div class="swiper-wrapper">
                  <div class="li swiper-slide" v-for="num in [1, 2, 3]" :key="num">
                    <img class="signal" :src="`${OSS_PREFIX}default/home_seller_quote.png`" />
                    <span class="title">{{ $t(`home.section_3.item_${num}.title`) }}</span>
                    <p class="desc">{{ $t(`home.section_3.item_${num}.desc`) }}</p>
                    <div class="date">
                      <span>{{ $t(`home.section_3.item_${num}.name`) }}</span>
                      <span>{{ $t(`home.section_3.item_${num}.time`) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrap">
                <div class="btn-right"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>
      <section class="super-item">
        <el-row>
          <el-col :span="24">
            <h2 class="super-item__title">
              <span>{{ $t('home.partners.title') }}</span>
            </h2>
            <h4 class="super-item__subtitle">
              {{ $t('home.partners.sub_title') }}
            </h4>
            <div class="super-partners-wrap">
              <el-image class="part-shopline" :src="`${OSS_PREFIX}default/partners_shopline.png`" />
              <el-image class="part-airwallex" :src="`${OSS_PREFIX}default/partners_airwallex.png`" />
              <el-image class="part-shoplazza" :src="`${OSS_PREFIX}default/partners_shoplazza.png`" />
              <el-image class="part-luban" :src="`${OSS_PREFIX}default/partners_luban.png`" />
            </div>
          </el-col>
        </el-row>
      </section>
      <part-join-now />
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import PartJoinNow from '@/components/part/PartJoinNow'
export default {
  name: 'HomeView',
  components: {
    PartJoinNow
  },
  data() {
    return {
      imgIndex: 1,
      timer: null,
      imgMax: 3,
      changeInterval: 4000, // 自动切换间隔
      sliderIndex: 1,
      sliderList: [
        { backgroundColor: '#3f51b5', width: '18.75rem', height: '100%' },
        { backgroundColor: '#eee', width: '18.75rem', height: '100%' },
        { backgroundColor: '#f44336', width: '18.75rem', height: '100%' }
      ]
    }
  },
  computed: {
    ...mapGetters('global/auth', ['isLogined'])
  },
  watch: {},
  created() { },
  mounted() {
    this.swiperInit()
    this.imgChangeAuto()
  },
  methods: {
    toTTAD() {
      this.$router.push('/ad/list')
    },
    swiperInit() {
      this.swiper = new window.Swiper('.swiper', {
        speed: 800,
        spaceBetween: 30,
        autoplay: true,
        allowTouchMove: false,
        followFinger: false,
        loop: true,
        slidesPerView: 2,
        slideToClickedSlide: false,
        mousewheel: false,
        navigation: {
          nextEl: '.btn-right'
        }
      })
    },
    imgChange(num) {
      this.imgIndex = num
    },
    // 每4秒切换一次图片
    imgChangeAuto() {
      this.timer = setTimeout(() => {
        if (this.imgIndex + 1 <= this.imgMax) this.imgIndex++
        else this.imgIndex = 1
        this.imgChangeAuto()
      }, this.changeInterval)
    }
  },
  // 实例销毁时，停止图片切换
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>
<style  lang="less" scoped>
// banner 高度
@banner-height: 645px;
@banner-height-rem: 645;
// 背景色
@banner-bg-color: @bg-color;

// 背景图
.bg-img {
  .r-height(@banner-height-rem);
  // height: @banner-height;
  background-image: url('@{oss_prefix}default/home_banner_01.jpg');
}

.home {

  // banner
  &-banner {
    position: relative;

    // 背景图
    &__bg {
      z-index: -1;
      background: @banner-bg-color;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;

      &_left {
        .bg-img;
        background-position: 0 0;
        .p2r(width, 546);
        // width: 546px;
      }

      &_right {
        position: absolute;
        right: 0;
        top: 0;
        .bg-img;
        background-position: right top;
        .p2r(width, 550);
        // width: 550px;
      }
    }

    &__content {
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // height: @banner-height;
      // .p2r(height, @banner-height-rem);
      .r-height(@banner-height-rem);
      margin: 0 auto;

      .title {
        .r-font-size(46);
        // font-size: 46px;
        .r-margin-bottom(15);
        // margin-bottom: 15px;
      }

      .subtitle {
        .r-margin-bottom(40);
        // margin-bottom: 40px;
        .r-font-size(18);
        // font-size: 18px;
      }

      .intro {
        line-height: 2;
        .r-font-size(22);
        // font-size: 22px;
        .r-width(560);
        // width: 560px;
        text-align: center;
      }

      .line {
        display: inline-block;
        .r-width(44);
        // width: 44px;
        .r-height(8);
        // height: 8px;
        .r-margin-bottom(73);
        .r-margin-top(30);
        // margin-bottom: 73px;
        // margin-top: 30px;
        background: #303030;
        .r-border-radius(4);
      }
    }
  }
}

// 免费七天试用样式
.free-seven {
  .r-padding(0, 40);
  // padding: 0 40px;
  .r-padding-bottom(30);
  // padding-bottom: 30px;
  font-style: italic;
  font-weight: bold;
  .r-margin-top(20);
  // margin-top: 20px;
  .r-font-size(20);
  // font-size: 20px;
  background-image: radial-gradient(@color-light-green 0%,
      @color-light-green 5%,
      @bg-color 70%);

  // background-image: radial-gradient(
  //   @color-light-green 0%,
  //   @color-light-green 5%,
  //   transparent 70%
  // );
  &_free {
    // padding-bottom: 3px;

    color: @color-primary;
    border-bottom: 1px solid @color-primary;

    &_bold {
      .r-font-size(30);
      // font-size: 30px;
    }
  }
}

.our-superiority {
  display: flex;
  justify-content: center;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.super-item {
  .r-width(1280);
  // width: 1280px;
  .r-padding-top(110);

  // padding-top: 110px;
  .el-row {
    display: flex;
    justify-content: space-between;
  }

  .changeable-img {
    .r-height(380);
    // height: 380px;
    .r-width(555);
    // width: 555px;
    float: right;
  }

  .super-item__title {
    position: relative;
    .r-padding-left(40);
    // padding-left: 40px;
    color: @color-primary;
    line-height: 1;
    margin: 0;

    span {
      .r-font-size(60);
      // font-size: 60px;
      white-space: nowrap;
      font-weight: bold;
    }

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 55%;
      left: 0;
      .r-width(10);
      // width: 10px;
      .r-height(44);
      // height: 44px;
      background: @color-primary;
      .r-border-radius(4);
      // border-radius: 4px;
      transform: translateY(-60%);
    }
  }

  .super-item__subtitle {
    .r-font-size(32);
    // font-size: 32px;
    font-weight: normal;
    .r-margin-top(17);
    .r-margin-bottom(30);
    .r-margin-left(40);
    // margin-top: 17px;
    // margin-bottom: 30px;
    // margin-left: 40px;
  }

  &_media {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    img:nth-child(2) {
      .r-height(210);
      // height: 210px;
      width: auto;
    }
  }

  .super-tab {
    .r-width(481);
    // width: 481px;
    .r-margin-left(80);
    // margin-left: 80px;
    .r-margin-bottom(52);

    // margin-bottom: 52px;
    .super-tab-item {
      line-height: 1.6;
      .r-margin-bottom(20);
      display: none;

      // margin-bottom: 20px;
      &.active {
        display: block;
      }

      .title {
        position: relative;
        .r-font-size(28);
        // font-size: 28px;
        font-weight: normal;
        cursor: pointer;

        &.active {
          display: block;
          color: @color-primary;

          &::before {
            background: @color-primary;
          }
        }

        &::before {
          position: absolute;
          top: 50%;
          .p2r(left, -42);
          // left: -42px;
          content: '';
          display: block;
          .r-width-height(16);
          // width: 16px;
          // height: 16px;
          background: #303030;
          border-radius: 50%;
          transform: translateY(-50%);
        }
      }

      .intro {
        .r-font-size(20);
        // font-size: 20px;
        color: @color-font-basic;
      }
    }
  }

  // 圆点列表
  .super-bullet-list {
    .r-padding-left(87);

    // padding-left: 87px;
    &__item {
      display: inline-block;
      .r-width-height(16);
      // width: 16px;
      // height: 16px;
      border-radius: 50%;
      .pointer;
      background: @color-gray;

      &:not(:last-child) {
        .r-margin-right(24);
        // margin-right: 24px;
      }

      &.active {
        background: @color-footer-bg;
      }
    }
  }

  // section_2
  .super-wrap {
    display: flex;
    justify-content: space-between;
    .p2r(padding, 30);

    // padding: 30px;
    li {
      display: inherit;
      flex-flow: column;
      align-items: center;
      width: 30%;

      img,
      span {
        .r-margin-bottom(20);
        // margin-bottom: 20px;
        .r-font-size(25);
        // font-size: 25px;
        font-weight: 600;
      }

      img {
        .r-height(150);
        // height: 150px;
        .r-width(150);
        // width: 150px;
      }

      p {
        .r-line-height(30);
        // line-height: 30px;
        .r-font-size(20);
        // font-size: 20px;
        text-align: center;
        color: @color-font-basic;
      }
    }
  }

  // section_3
  .super-seller-wrap {
    display: flex;
    justify-content: flex-start;
    .r-padding-bottom(40);

    // padding-bottom: 40px;
    .swiper {
      width: 90%;
      display: flex;
      flex-flow: row nowrap;
      margin: 0;
      justify-content: flex-start;

      .swiper-wrapper {

        // display: flex;
        // flex-flow: row nowrap;
        .li {
          box-sizing: border-box;
          .r-padding(50, 80);
          // padding: 50px 80px;
          display: flex;
          flex-flow: column;
          position: relative;
          background: @banner-bg-color;

          .signal {
            .r-height(60);
            // height: 60px;
            .r-width(70);
            // width: 70px;
          }

          .title {
            .r-font-size(24);
            // font-size: 24px;
            .r-padding-top(25);
            // padding-top: 25px;
            color: @color-font-basic;
          }

          .desc,
          .date {
            .r-font-size(20);
            // font-size: 20px;
            .r-padding-top(20);
            // padding-top: 20px;
            .r-line-height(30);
            // line-height: 30px;
          }

          .date {
            .r-padding-top(60);

            // padding-top: 60px;
            span:last-child {
              .r-margin-left(10);
              // margin-left: 10px;
              color: @color-font-basic;
            }
          }
        }
      }
    }

    .btn-wrap {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;

      .btn-right {
        @hw: 50px;
        // .r-height(@hw);
        // .r-width(@hw);
        width: @hw;
        height: @hw;
        // .r-border(4, solid, #000);
        border: 4px solid #000;
        border-radius: 50%;
        cursor: pointer;

        &::before {
          content: '';
          display: block;
          // .r-height(20);
          // .r-width(20);
          height: 20px;
          width: 20px;
          // .r-border-top(4, solid, @color-primary);
          border-top: 4px solid @color-primary;
          // .r-border-right(4, solid, @color-primary);
          border-right: 4px solid @color-primary;
          position: relative;
          // .p2r(top, 13);
          top: 13px;
          // .p2r(right, -8);
          right: -8px;
          transform: rotate(45deg);
          transition: all ease-in-out 0.3s;
        }

        &:hover {
          &::before {
            // .p2r(right, -15);
            right: -15px;
          }
        }
      }
    }
  }

  // 合作伙伴
  .super-partners-wrap {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .r-padding(0, 40);
    // padding: 0 40px;
    .r-padding-top(80);
    // padding-top: 80px;
    .r-margin-bottom(168);

    // margin-bottom: 168px;
    /deep/ .el-image {
      img {
        .r-height(50);
        // height: 50px;
        object-fit: cover;
      }

      &.part-shopline>img {
        .r-height(50);
        .r-width(307);
        // height: 50px;
        // width: 307px;
      }

      &.part-airwallex>img {
        .r-height(50);
        .r-width(350);
        // height: 50px;
        // width: 350px;
      }

      &.part-shoplazza>img {
        .r-height(60);
        // height: 60px;
        width: auto;
      }

      &.part-luban>img {
        .r-height(70);
        // height: 60px;
        width: auto;
      }
    }
  }

}
</style>
