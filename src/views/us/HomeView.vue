<template>
  <div>
    <!-- 整体通底大背景盒子 -->
    <div class="alltip">
      <div class="banner">
        <!-- 商家图标以上区域 -->
        <div class="top">
          <!-- 整个tiktok标题加按钮区域 -->
          <div class="tit-btn">
            <div class="thirdtitle">
              <!-- tik-tok大标题 -->
              <div class="tik-tok">
                <h2 class="bigtitle"><span>TikTok </span>Marketing and
                </h2>
                <h2 class="bigtitle"> Product Selection Platform</h2>
              </div>
              <div class="hengxian">
              </div>
              <P>Grow your market, engage with your customers,
              </P>
              <P style="font-size: 26px;">and empower your business on TikTok</P>
              <P style="font-size: 26px;">with DigiAds one-stop marketing solution and eCommerce insight tool</P>
            </div>
            <!-- 右侧按钮 已登录就隐藏 -->
            <!-- <div class="bgc-btn-img">
              <div class="bgc-img" v-show="!isLogined">
                <com-btn class="btn-1" type="bg-primary" @click.native="toLogin">SIGN UP FREE</com-btn>
              </div> -->
            <!-- 右侧按钮 已登录就隐藏,未登录就显示  -->
            <div class="bgc-btn-img">
              <div :class="['bgc-img', `bgc-img-${isLogined ? 'hidden' : 'visible'}`]">
                <com-btn class="btn-1" type="bg-primary" @click.native="toLogin">SIGN UP FREE</com-btn>
              </div>

            </div>
          </div>
        </div>
        <!-- <div class="ban"> -->
        <!-- <BusinessTitle></BusinessTitle> -->
        <!-- </div> -->
        <!-- 下半部分 -->
        <div class="bot">
          <!-- a-tik大标题+视频列表图片区域 -->
          <div class="a-tik">
            <div class="title-left">
              <h3>A TikTok-Focused, Best-in-Class Marketing</h3>
              <h3>Analytics and eCommerce Solution Tool </h3>
              <div class="group1-title">
                <h4 class="h4-title">Insight into Your Market and Industry</h4>
                <p>Access the global TikTok video ad library to discover new trends
                </p>
                <p>in your industry before anyone else. Stay on top of your market
                </p>
                <p>trends and make smarter decisions.</p>
              </div>
              <div class="group2-title">
                <h4 class="h4-title">Monitor Your Competitors</h4>
                <p>Find out your competitors’ strategies and investments in TikTok </p>
                <p>and ROI. Leverage data and unique insights from DigiAds and </p>
                <p>get a competitive edge achieving measurable results.</p>
                <div>
                  <!-- 已经登陆点击跳到广告搜索 -->
                  <com-btn v-if="isLogined" class="btn" type="bg-primary"
                    @click.native="$router.push({ name: 'usAd', })">HAVE A TRY</com-btn>
                  <!-- 没登录跳登录页面 -->
                  <com-btn v-else class="btn" type="bg-primary" @click.native="toLogin">SIGN UP FREE</com-btn>
                </div>
              </div>
            </div>
            <div class="title-right">
              <img :src="`${OSS_PREFIX}default/us_home_01.png`" class="title-img" />

            </div>
          </div>
          <!-- 筛选表格图片+右侧文案区域 -->
          <div class="table">
            <div class="table-left">
              <img class="table-img" :src="`${OSS_PREFIX}default/us_home_02.png`" alt="">
            </div>
            <div class="table-right">
              <div class="group1-title">
                <h4 class="h4-title">eCommerce Product Solutions</h4>
                <p>Solutions to the challenge of what to sell for your business.
                </p>
                <p>Utilize DigiAds algorithm to find out effective content strategies
                </p>
                <p>to enhance TikTok video performances.</p>
              </div>
              <div class="group2-title">
                <h4 class="h4-title">Data Dashboard that Really Works</h4>
                <p>Customized data intelligence and analysis dashboard on TikTok. </p>
                <p>Take the stress out of data processing and analysis and manage </p>
                <p>all TikTok data with ease.</p>
                <div>
                  <!-- 已经登陆点击跳到广告搜索 -->
                  <com-btn v-if="isLogined" class="btn" type="bg-primary"
                    @click.native="$router.push({ name: 'usAd', })">HAVE A TRY</com-btn>
                  <!-- 没登录跳登录页面 -->
                  <com-btn v-else class="btn" type="bg-primary" @click.native="toLogin">SIGN UP FREE</com-btn>
                </div>
              </div>
            </div>
          </div>
          <!--问题区域  -->
          <div class="question">
            <h2>What Are People Saying? </h2>
            <h4>See why thousands of companies of all sizes use DigiAds to grow their businesses</h4>
          </div>
          <!-- 四个人详情介绍版块 -->
          <div class="everyself">
            <div class="everyself-left">
              <el-card class="prension-box1 commomimg ">
                <div>
                  <span>DigiAds has been our go to tool for TikTok content solutions for my business.
                  </span><br>
                  <span>When you are unsure of what style and content for video and how to write </span><br>
                  <span>your TikTok ad copy, check DigiAds, you will find your answer with proven </span><br>
                  <span>success cases!</span>
                  <div class="detil-box">
                    <div class="avator">

                      <img :src="`${OSS_PREFIX}default/us_victoria_bentz.png`">
                    </div>
                    <div>
                      <h4>Victoria Bentz</h4>
                      <p>Founder & CEO at The Blue</p>
                    </div>
                  </div>
                </div>
              </el-card>
              <el-card class="prension-box2 commomimg ">
                <div>
                  <span> 2022 Global TikTok business for eCommerce is like the night before the
                  </span><br>
                  <span>gold rush. DigiAds helps my business get there with solid data-driven </span><br>
                  <span>solutions before everyone else even started their journey!</span><br>
                  <span> </span>
                  <div class="detil-box" style="margin-top:82px;">
                    <div class="avator">
                      <img :src="`${OSS_PREFIX}default/us_joseph_lee.png`">
                    </div>
                    <div>
                      <h4>Joseph Lee</h4>
                      <p>eCommerce Manager at CrossSea eCommerce</p>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="everyself-right">
              <el-card class="prension-box3 commomimg">
                <div>
                  <span>It’s a game-changer! DigiAds helps me to quickly identify and understand
                  </span><br>
                  <span>the status and strategies of TikTok in my clients’ industries. It is a powerful </span><br>
                  <span>source of real-time insight to strategize and enable business improvements </span><br>
                  <span>for my clients.</span>
                  <div class="detil-box">
                    <div class="avator">
                      <img :src="`${OSS_PREFIX}default/us_david_miller.png`">
                    </div>
                    <div>
                      <h4>David Miller</h4>
                      <p>Strategist Lead at Together</p>
                    </div>

                  </div>
                </div>
              </el-card>
              <el-card class="prension-box4 commomimg">
                <div>
                  <span>DigiAds is the best tool when it comes to TikTok analytics. It took our team
                  </span><br>
                  <span>a while to find out a tool with thorough social marketing data metrics for </span><br>
                  <span>business decisions and easy-to-digest dashboard visualization that meet </span><br>
                  <span>team’s needs.</span>
                  <div class="detil-box">
                    <div class="avator">
                      <img :src="`${OSS_PREFIX}default/us_amanda_siebart.png`">
                    </div>
                    <div>
                      <h4>Amanda Siebart</h4>
                      <p>Social Media Director at Round Outdoors</p>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <!-- 单独按钮区域 -->
          <div class="bot-btn">
            <!-- <div class="btn center-btn">SIGN UP FREE</div> -->
            <com-btn class="btn center-btn" type="bg-primary">SIGN UP FREE</com-btn>
          </div>
          <!-- 绿色原点背景图片 -->
          <div class="green">
            <img :src="`${OSS_PREFIX}default/us_decorate.png`">
          </div>
          <!-- 蓝色播放视频区域 -->
          <div class="bluepic">
            <div class="bluepic-left">
              <img class="bluepic-img" :src="`${OSS_PREFIX}default/us_video_cover.png`" />
            </div>
            <div class="bluepic-right">
              <div class="bluepic-title">
                <h2 class="bluebigtitle">TikTok Lessons</h2>
                <h4>Course introduction</h4>
                <p>With zero foundation and hand in hand, it provides a full process
                  outbound plan for TikTok account grayconstruction, operation and
                  realization, empowers cross-border enterprises, and helps businesses
                  to jointly build a cross-border ecosystem.</p>
              </div>
              <!-- 登录状态跳视频播放首页 -->
              <com-btn v-if="isLogined" type="bg-primary" @click.native="$router.push({ name: 'usTutorial' })">WATCH
                NOW
                <i class="el-icon-video-play"></i></com-btn>
              <com-btn v-else type="bg-primary" @click.native="toLogin">SIGN UP FREE</com-btn>
            </div>
          </div>
          <!-- Have标题区域 -->
          <div class="have">
            <div class="first-title">
              <h2>Have a Look at Our Blog Posts</h2>
            </div>
            <!-- 三个板块 -->
            <div class="have-all">
              <!-- 左边   上下两个  盒子区域 -->
              <div class="have-left">
                <div class="haveleft-top-all">
                  <div class="haveleft-top">
                    <div class="have-pic">
                      <img src="" alt="" class="have-img">
                    </div>
                    <div class="have-title">
                      <h4>How to Get More Engagement on Twitter?
                        17 Easy Ways</h4>
                      <span>Current TikTok is like Douyin 5 years ago -
                        a great time when the
                        demand is very large and the competition is low.
                      </span>
                    </div>
                  </div>
                  <div class="have-title-bottom">
                    <h4>Read the whole passage <i class="el-icon-arrow-right"></i></h4>
                    <p class="gray">Release time：2022.09.10</p>
                  </div>
                </div>
                <div class="haveleft-top-all">
                  <div class="haveleft-top">
                    <div class="have-pic">
                      <img src="" alt="" class="have-img">
                    </div>
                    <div class="have-title">
                      <h4>How to Get More Engagement on Twitter?
                        17 Easy Ways</h4>
                      <span>Current TikTok is like Douyin 5 years ago -
                        a great time when the
                        demand is very large and the competition is low.
                      </span>
                    </div>
                  </div>
                  <div class="have-title-bottom">
                    <h4>Read the whole passage <i class="el-icon-arrow-right"></i></h4>
                    <p class="gray">Release time：2022.09.10</p>
                  </div>
                </div>
              </div>
              <!-- 右边  盒子区域 -->
              <div class="have-right">
                <h3>Read More</h3>
                <h5>How to Get More Engagement on
                  Twitter? 17 Easy Ways</h5>
                <h5>How to Get More Engagement on
                  Twitter? 17 Easy Ways</h5>
                <h5>How to Get More Engagement on
                  Twitter? 17 Easy Ways</h5>
                <h5>How to Get More Engagement on
                  Twitter? 17 Easy Ways</h5>
                <div style="text-align: center;">
                  <com-btn type="bg-primary">VISIT BLOG</com-btn>
                </div>
              </div>
            </div>
          </div>
          <!-- 合作伙伴区域 -->
          <div class="partner">
            <div class="first-title">
              <h2>Partners</h2>
              <h5>Great help for TikTok marketing and eCommerce</h5>
            </div>
          </div>
          <!-- 合作伙伴商家图标区域 -->
          <section class="super-item">
            <el-row>
              <el-col :span="24">
                <div class="super-partners-wrap">
                  <el-image class="part-shopline" :src="`${OSS_PREFIX}default/partners_shopline.png`" />
                  <el-image class="part-shopline" :src="`${OSS_PREFIX}default/partners_airwallex.png`" />
                  <el-image class="part-shopline" :src="`${OSS_PREFIX}default/partners_shoplazza.png`" />
                  <el-image class="part-shopline" :src="`${OSS_PREFIX}default/partners_luban.png`" />
                </div>
              </el-col>
            </el-row>
          </section>
        </div>
      </div>
    </div>
    <catuns>
    </catuns>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import { mapGetters, mapActions } from 'vuex'
// import BusinessTitle from '@/components/part/BusinessTitle'
import catuns from '@/components/part/PartFooter2.vue'
export default {
  name: 'UsLayout',
  mixins: [],
  // components: { BusinessTitle },
  // components: { PartFooter },
  components: { catuns },
  filters: {},
  props: {},
  data() {
    return {
      // isLogined: true
    }
  },
  computed: {
    //用户是否是登录状态
    ...mapGetters('global/auth', ['isLogined'])
    // ...mapGetters('global/auth', ['isLogined'])
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {
    ...mapActions('global/account', ['login']),
    toLogin() {
      this.$loading(),
        this.login()
    }
  }
}
</script>
<style>

</style>
<style lang="less" scoped>
@showColor: #c0bbbc;

.alltip {
  background-image: url('@{oss_prefix}default/us_banner_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0px 60px;
  // padding: 125px 100px 100px 100px;
  .r-padding-top (125);
  .r-padding-right (225);
  .r-padding-left (225);



  .banner {
    margin: 0 auto;


    .ban {
      .r-margin-bottom(100);
      // margin-bottom: 100px;
      .r-height(160);
      // height: 160px;
      .r-border-bottom(1, solid, #D7D7D7);
      // border-bottom: 1px solid #D7D7D7;

    }

    .top {
      .tit-btn {
        display: flex;
        justify-content: center;
        .r-margin-bottom(126);

        .bgc-btn-img {

          // .r-width (540);
          .bgc-img-visible {
            //未登陆,就显示
            visibility: visible;
          }

          .bgc-img-hidden {
            //登陆了,就隐藏
            visibility: hidden;
          }

          .bgc-img {

            .r-margin-top(360);
            .r-width (330);
            // width: 330px;
            .r-height (100);
            // height: 100px;
            background-image: radial-gradient(#ceff00 0%, #ceff00 5%, #fff 70%);
          }



        }



      }

      .thirdtitle {
        .r-font-size(24);
        font-family: PingFang SC;
        font-weight: 400;
        color: #282828;
        .r-line-height(40);
        // .r-margin-right(650);

        p {
          .r-font-size(26);
          .r-line-height(50)
        }

        .tik-tok {
          .r-margin-bottom(100);

          // margin-bottom: 100px;
          .bigtitle {
            .r-font-size(65);
            .r-line-height (70);
            // line-height: 70px;
            // font-size: 68px;
            color: #303030;

            span {
              color: #1436F5;
              .r-font-size(65);
            }
          }
        }



        .hengxian {
          .r-width (39);
          // width: 39px;
          .r-width (8);
          // height: 8px;
          background: #282828;
          .r-border-radius (4);
          // border-radius: 4px;
          .r-margin-bottom(35);
          // margin-bottom: 35px;
        }
      }
    }
  }

  .bot {
    position: relative;

    .bot-btn {
      .r-width(300);
      margin: 0 auto;
    }

    .green {
      position: absolute;
      .right (-90);
      // right: -70px;
      .top (2750);
      // top: 2750px;
    }

    .question {
      text-align: center;
      .r-padding-top(103);
      // .r-padding-right(45);
      .r-line-height(50);
      // line-height: 50px;
    }

    .everyself {
      display: flex;
      justify-content: center;

      // 个人详细中心左半边盒子
      .everyself-left {

        //左上个人细节盒子
        .prension-box1 {
          background-image: url('@{oss_prefix}default/us_people_saying_1.png');
          background-position: 290px 100px;
          .r-margin-right(30);
          // margin-right: 30px;
        }

        //左下个人细节盒子
        .prension-box2 {
          background-image: url('@{oss_prefix}default/us_people_saying_3.png');
          background-position: 290px 100px;
          .r-margin-right(30);
          // margin-right: 30px;
        }
      }

      // 个人详细中心右半边盒子
      .everyself-right {

        //右上个人细节盒子
        .prension-box3 {
          background-image: url('@{oss_prefix}default/us_people_saying_2.png');
          background-position: 300px 100px;
        }

        //右下个人细节盒子
        .prension-box4 {
          background-image: url('@{oss_prefix}default/us_people_saying_4.png');
          background-position: 300px 100px;
        }
      }

    }

    //a-tiktok 标题整块区域
    .a-tik {
      display: flex;
      justify-content: center;

      // .r-margin-right(50);
      // margin-right: 50px;

      //a-tiktok 左边文字区域
      .title-left {
        .r-width(750);
        // margin-right: 40px;
        .r-margin-right(40);
      }

      //a-tiktok 右边视频图片区域
      .title-right {
        // flex: 1;
        .r-width(750);
        // .r-height(480);
        .r-padding-top(60);

        // .r-padding-left(10);
        .title-img {
          // .r-width(750);
          // width: 100%;
          // height: 100%;
          .r-margin-top(-40);
          // margin-top: 60px;
        }
      }
    }

    .table {
      display: flex;
      justify-content: center;
      .r-margin-top(85);
      // margin-top: 130px;

      //表格图片部分
      .table-left {
        // flex: 1;
        .r-width(800);
        // width: 45%;

        // .r-margin-right(30);
        .r-margin-top(80);
        .r-margin-right(100);
      }

      //表格图片右部分的文字
      .table-right {
        .r-width(800);
        // width: 50%;

      }
    }

    //蓝色视频区域部分
    .bluepic {
      display: flex;
      justify-content: center;
      .r-margin-top(120);
      // margin-top: 100px;

      //蓝色视频区域左边图片部分
      .bluepic-left {
        // flex: 1;
        .r-width (650);

        // width: 600px;
        .bluepic-img {
          .r-box-shadow (@t: 2, @r: 3, @b: 16, @l: 0, @color: @showColor);
          // box-shadow: 2px 3px 16px 0px rgba(0, 0, 0, 0.2);
          .r-border-radius (10);
          // border-radius: 10px;
          width: 100%;
        }
      }

      //蓝色视频区域右边文字部分
      .bluepic-right {
        .r-margin-left (80);
        .r-width (700);

        // margin-left: 80px;
        .bluepic-title {
          flex: 1;

          p {
            word-wrap: break-word; // 强制以单词为单位换行
            .r-font-size (20);
            // font-size: 23px;
            .r-line-height (28);
            // line-height: 34px;
          }
        }

        .btn {
          .r-margin-top (55);
          // margin-top: 55px;
        }
      }
    }

    //have问题区域
    .have {
      .r-margin-top (100);
      // margin-top: 100px;
      .r-margin-bottom (60);

      // margin-bottom: 60px;
      .first-title {
        text-align: center;
        .r-margin-bottom (60);
        // margin-bottom: 60px;
      }

      .have-all {
        display: flex;
        justify-content: center;

        //整个左边区域
        .have-left {
          .r-margin-right (40);
          // margin-right: 35px;

          //左边盒子里左边上半部分整个
          .haveleft-top-all {

            .r-width (820);
            // width: 865px;
            .r-box-shadow (@t: 0, @r: 4, @b: 16, @l: 0, @color: @showColor);
            // box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.16);
            // border-radius: 10px;
            .r-border-radius (10);
            .r-margin-bottom (36);
            // margin-bottom: 36px;
            .r-padding (30);
            // padding: 30px;

            .haveleft-top {
              display: flex;
              justify-content: space-between;

              //左边盒子里左边img
              .have-pic {
                .r-width (260);
                // width: 260px;
                .r-height (240);
                // height: 280px;

                //左边盒子里左边img
                .have-img {
                  .r-width (246);
                  // width: 246px;
                  .r-height (146);
                  // height: 146px;
                  background: #EDEDED;
                  .r-margin-bottom (60);
                  // margin-bottom: 105px;
                }
              }
            }

            //右边文字区域
            .have-title {
              // flex: 1;
              .r-width (550);
              .r-height (210);

              // width: 597px;
              span {
                word-wrap: break-word; // 强制以单词为单位换行
                .r-font-size (20);
                .r-line-height (30);
              }

              h4 {
                word-wrap: break-word; // 强制以单词为单位换行
                .r-margin-bottom (10);
                // margin-bottom: 10px;
              }

              p {
                word-wrap: break-word; // 强制以单词为单位换行
                .r-margin-top (52);
                // margin-top: 52px;
                .r-margin-left (280);
                // margin-left: 280px;
                .r-font-size (20) // font-size: 20px;
              }
            }
          }

          .have-title-bottom {
            display: flex;
            justify-content: space-between;

            h4 {
              // font-size: 20px;
              .r-font-size (20);
              .r-margin-bottom (10);
              // margin-bottom: 10px;
            }

            .gray {
              color: #bdbdc2;
            }
          }

          &>.haveleft-top:nth-child(2) {
            margin-bottom: 0px;
          }

        }

        //大块区域的整个右边文字区域
        .have-right {
          // .r-height (635);
          .r-padding (35);
          // padding: 30px;
          .r-width (480);
          // width: 410px;
          // box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.16);
          .r-box-shadow (@t: 0, @r: 4, @b: 16, @l: 0, @color: @showColor);
          .r-border-radius (10);
          // border-radius: 10px;

          h5 {
            .r-font-size (24);
            // .r-border-left(4 solid #EDEDED);
            border-left: 5px solid #EDEDED;
            // margin-top: 55px;

            .r-margin-top (50);
            .r-padding-left (25);
            // padding-left: 15px;
            .r-padding-right (25);
            // padding-right: 25px
          }

          .btn {
            margin: 0 auto;
            .r-margin-top (60)
          }
        }
      }
    }

    .super-item {
      .r-width (1200);
      // width: 1200px;
      margin: 0 auto;
    }

    .partner {
      text-align: center;

      .first-title {
        text-align: center;

        h2 {
          .r-margin-bottom (15);
          // margin-bottom: 15px;
        }
      }
    }

    .super-item {
      .super-partners-wrap {
        align-items: center;
        text-align: center;
        .r-padding-top(80);
        .r-margin-bottom(80);

        .part-shopline {
          .r-width (196);
          // width: 196px;
          .r-padding (0, 50);
          // padding: 0 50px // height: 66px;
        }
      }
    }

    .group1-title {
      .r-margin-top(40);
      .r-font-size(30);

      .h4-title {
        .r-margin-right(20);
        // margin-top: 20px;
        .r-line-height(55);
        // line-height: 55px;
      }
    }

    .group2-title {
      .r-margin-top(40);
      // margin-top: 40px;
      color: #AAAAB0;
    }

    .commomimg {
      // background-image: url('@/assets/img//us_people_saying_1.png');
      background-repeat: no-repeat;
      background-size: 60%;
      .r-margin-top(30);
      // margin-top: 30px;
      .r-padding-top(20);
      // padding: 20px 0;
      // .r-height(450);
      .r-width(720);

      // height: 350px;
      span {
        .r-font-size(17);
      }
    }

    /deep/.el-card__body {
      .p2r(padding, 30);
      .r-padding-left(30);
      .r-padding-right(30);
      // padding: 30px 20px;
    }

    span {
      .r-font-size(23);
      // font-size: 23px;
      color: #282828;
      .r-line-height(40);
      // line-height: 40px;
    }

    /deep/.btn {
      user-select: none;
      cursor: pointer;
      .r-margin-top(80);
      .r-margin-right(100);
      .r-font-size(25);
      // font-size: 25px;
      .r-height(62);
      .r-width(321);
      // width: 321px;
      // height: 62px;
      .r-border-radius(6);
      // border-radius: 6px;
      text-align: center;
      .r-line-height(45);

    }

    .center-btn {
      margin: 0 auto;
      .r-margin-top(40);
    }

    p {
      .r-font-size(20);
      // font-size: 28px;
      // .r-line-height(60);
      .r-line-height(35);
      // line-height: 35px;
    }

    h2 {
      .r-font-size(42);
      .r-line-height(60);
    }

    h3 {
      .r-font-size(30);
      // font-size: 38px;
    }

    h4 {
      .r-font-size(26);
      // font-size: 30px;
    }

    h5 {
      font-weight: 540;
      .r-font-size(28);
      // font-size: 18px;
    }
  }

  .bluebigtitle {
    .r-margin-bottom(20);
  }

  // 每一个个人细节详情的卡片
  .detil-box {
    .r-margin-top(45);
    // margin-top: 40px;
    display: flex;
    justify-content: start;

    h4 {
      .r-font-size(25);
      // font-size: 25px;
    }

    p {
      .r-font-size(23);
      // font-size: 23px;
    }

    .avator {
      .r-margin-right(40);

    }

  }
}

.bgc-img {
  text-align: center;
  .r-margin-top(120);
  .r-margin-left(180);
  .r-width (300);
  // width: 300px;
  .r-height (95);
  // height: 95px;
  // line-height: 42px;
  .r-line-height (42);
  background-image: radial-gradient(#ceff00 0%, #ceff00 5%, #ffffff 70%);

  .btn-1 {
    user-select: none;
    cursor: pointer;
    .r-font-size(25);
    .p2r(width, 321);
    .r-height(62);
    // height: 62px;
    .r-line-height(45);
    // border-radius: 6px;
    .r-border-radius(6);
  }
}
</style>
