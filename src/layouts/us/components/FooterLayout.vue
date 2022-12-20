<template>
  <section class="all">
    <div class="banner">
      <div class="left">
        <h3>Contact us</h3>
        <p>Address : RM22 2/F FU TAO BUILDING ，</p>
        <p>NO.98 ARGYLE STREET KOWLOON HONG KONG</p>
        <p>Email : service@superdigiads.com</p>
        <div class="icon">
          <img :src="`${OSS_PREFIX}default/us_linkdin.png`" alt="">
          <img :src="`${OSS_PREFIX}default/us_youtube.png`" alt="">
        </div>
        <div class="logos">
          <el-image class="biglogo" ref="animation-logo" :src="`${OSS_PREFIX}default/digiads_logo_white.png`"
            alt="digiads logo">
          </el-image>
          <div class="small-title">
            Stop chasing , startcatching
          </div>
        </div>
      </div>
      <div class="right">
        <div class="onerow">
          <el-row>
            <el-col :span="4" v-for="item in menu" :key="item.name">
              <div class="grid-content bg-purple nav-item" @click="$router.push(item.path)">{{ item.name }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="tworow">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <ul class="tworow-left  nav-item">
                  <li @click="$router.push({ name: 'usAdList' })">TikTok Ads Search</li>
                  <li>TikTok Ads Ranking</li>
                  <li>Data Intelligence(Dashboard)</li>
                </ul>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <ul class="tworow-left  nav-item">
                  <li @click="$router.push({ name: 'usBlogs' })">Blogs</li>
                  <li @click="$router.push({ name: 'usTutorial' })"> Videos</li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
        <p class="title-last">Copyright © 2021 深圳市东坤信息科技有限公司 版权所有 备案/许可证编号为 粤ICP备2021093925号</p>

      </div>

    </div>
  </section>
</template>
<script>
import { US_MENU_CONFIG } from '@/router/menu'

export default {
  name: 'FooterLayout',
  mixins: [],
  components: {},
  filters: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {
    menu() {
      const menu = [...US_MENU_CONFIG]
      return menu
    }
  },
  watch: {},
  created() { },
  methods: {
    //点击跳转到广告搜索页面
    //   search() {
    //     this.$route.push({
    //       name: 'usAd',
    //     })
    //   }
  }
}
</script>
<style lang="less" scoped>
.all {
  background-color: #25242A;
  .r-padding-top (80);
  .r-padding-bottom (30);


  .banner {
    .r-width (1580);
    margin: 0 auto;

    display: flex;
    justify-content: space-between;

    //底部左半边文字+logo区域
    .left {
      .r-margin-right (10);
      // margin-right: 10px;
      // width: 650px;
      // background-color: pink;

      .icon {
        img {
          .r-margin-right (30);
          // margin-right: 30px;
          .r-margin-bottom (50);
          // margin-bottom: 50px;
        }
      }

      // 底部logo区域
      .logos {
        display: flex;
        justify-content: space-between;
        .r-height (235);
        // height: 235px;
        align-items: center;

        //底部logo右边的小文子
        .small-title {
          color: #D3D3D5;
          .r-font-size (20);
          // font-size: 20px;

          .r-margin-left (30);
          // margin-left: 30px;
        }
      }

      .video-icon {

        .r-margin-left (30);
        // margin-left: 30px;
        display: inline-block;

        .r-width (50);
        // width: 50px;

        .r-height (35);
        // height: 35px;
        color: #fff;
        // background-color: red;
      }




    }

    .right {
      position: relative;
      flex: 1;

      //第一行导航
      .onerow {


        .r-margin-bottom (37);
        // margin-bottom: 37px;
        .r-font-size (26);
        // font-size: 26px;
        color: #fff;
      }

      .title-last {
        position: absolute;
        right: 0%;
        bottom: 0%;
        color: #9B9B9B;
        .r-font-size (18);
        // font-size: 18px;
      }
    }
  }




  //下半部分导航
  .tworow {
    color: #9a9a9d;

    .tworow-left {
      li {
        font-weight: 400;
        .r-font-size (18);
        // font-size: 18px;
        .r-margin-bottom (20);
        // margin-bottom: 20px;
      }
    }


  }

  p {
    .r-line-height (20);
    // line-height: 20px;
    .r-font-size (20);
    // font-size: 20px;
    .r-margin-bottom (30);
    // margin-bottom: 30px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #D3D3D5;
  }

  h3 {
    .r-margin-bottom (25);
    // margin-bottom: 25px;
    .r-font-size (33);
    // font-size: 33px;
    color: #fff;
  }


}

/deep/.nav {
  font-family: PingFang SC;
  font-weight: 500;
  .r-font-size (40);
  // font-size: 24px;
  color: #FFFFFF;
  .r-line-height (60);
  // line-height: 60px;
}

.nav-item {
  cursor: pointer;
}
</style>
