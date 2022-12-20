<template>
  <footer class="footer-layout">
    <el-row class="footer-content">
      <el-col :span="9">
        <div class="logo">
          <el-image
            ref="animation-logo"
            :src="`${OSS_PREFIX}default/digiads_logo_white.png`"
            alt="digiads logo"
          >
          </el-image>
        </div>
        <p class="text-gray">
          <span>{{$t('footer.logo_bottom')}}</span>Stop chasing, start catching
        </p>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-row class="footer-nav">
          <layout-nav footer />
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="info_us">
              <h3 class="title">{{$t('footer.contact_us')}}</h3>
              <div class="info-item">
                <div class="label">{{$t('footer.address')}}:</div>
                <div class="content">
                  <span>香港九龍旺角亞皆老街98號富都大廈2樓22室</span>
                  <span>RM22 2/F FU TAO BUILDING ，NO.98 ARGYLE STREET KOWLOON HONG KONG</span>
                </div>
              </div>
              <div class="info-item">
                <div class="label">{{$t('footer.email')}}:</div>
                <div class="content">
                  <span>service@superdigiads.com</span>
                </div>
              </div>
              <div class="info-item">
                <div class="label">{{$t('footer.wechat')}}:</div>
                <div class="content">
                  <span>digiads01</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <div class="copyright">
          Copyright © 2021 深圳市东坤信息科技有限公司 版权所有 备案/许可证编号为
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021093925号</a>
        </div>
      </el-col>
    </el-row>
  </footer>
</template>
<script>
import LayoutNav from './components/LayoutNav'
export default {
  name: 'FooterLayout',
  components: {
    LayoutNav
  },
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
// @media screen and (max-width: 1360px) {
//   .footer-layout {
//     padding-left: 60px;
//   }
// }
// @media screen and (min-width: 1360px) {
//   .footer-layout {
//     padding-left: 170px;
//   }
// }
// @media screen and (min-width: 1920px) {
//   .footer-layout {
//     padding-left: 170px;
//     .footer-content {
//       max-width: 1920px;
//       margin: 0 auto;
//     }
//   }
// }

// // footer 顶部距离
// @padding-top: 30px;
// // footer 底部距离
// @padding-bottom: 20px;

.footer-layout {
  .r-padding-left(170);
  .r-padding-top(30);
  .r-padding-bottom(20);
  // padding-top: @padding-top;
  // padding-bottom: @padding-bottom;
  color: #fff;
  background: @color-footer-bg;
  line-height: 2;
  .r-font-size(16);
  // font-size: 16px;
  overflow: hidden;
  .footer-content {
    .p2r(max-width, 1920);
    margin: 0 auto;
  }
  .text-gray {
    .r-font-size(18);
    // font-size: 18px;
    color: #fff;
    span {
      .r-padding-right(10);
      // padding-right: 10px;
      .r-font-size(15);
      // font-size: 15px;
      &:first-child {
        font-weight: bold;
        .r-font-size(18);
        // font-size: 18px;
      }
    }
  }
  .logo {
    .r-width(230);
    // width: 230px;
    .r-margin-bottom(53);
    // margin-bottom: 53px;
  }
  // 当滚动滚动到底部时，给logo添加动画
  .logo-animation {
    // 动画
    animation: spin-momentum 5s cubic-bezier(0.65, 0, 0.35, 1) 3;
  }
  @keyframes spin-momentum {
    0% {
      transform: rotate(0deg);
    }
    90% {
      transform: rotate(4turn);
    }
    100% {
      transform: rotate(4turn);
    }
  }

  .footer-nav {
    .r-padding-bottom(20);
    .r-margin-bottom(20);
    // padding-bottom: 20px;
    // margin-bottom: 20px;
    border-bottom: 1px solid @color-border-gray;
  }

  .info_us {
    .title {
      color: @color-font-secondary;
    }
    .info-item {
      display: flex;
      flex-wrap: nowrap;
      .label {
        .r-width(80);
        // width: 80px;
      }
      .content {
        flex: 1;
        span {
          display: block;
        }
      }
    }
  }
  .copyright {
    .r-margin-top(40);
    // margin-top: 40px;
    text-align: right;
    .r-padding-right(44);
    // padding-right: 44px;
    .r-font-size(16);
    // font-size: 16px;
    color: @color-font-basic;
  }
}
</style>
