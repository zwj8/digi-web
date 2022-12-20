<template>
  <section>
    <!-- 教程视频首页 -->
    <div class="sketch-container">
      <div class="left-box">
        <!-- 教程简述 -->
        <div class="left-box-title">Tutorial Videos</div>
        <div class="p-title">TikTok Lessons</div>
        <div class="p-second-title">Course introduction</div>
        <div class="p-content">
          With zero foundation and hand in hand, it provides
          a full process outbound plan for TikTok account construction,
          operation and realization, empowers cross-border enterprises,
          and helps businesses to jointly build a cross-border ecosystem.
        </div>
        <com-btn type="bg-primary" fontSize="25" class="watch-btn" @click="palyFirst">
          WATCH NOW
          <i class="el-icon-video-play watchIcon"></i>
        </com-btn>
      </div>
      <div class="right-box">
        <img :src="`${OSS_PREFIX }default/us_video_cover.png`" alt="">
      </div>
    </div>
    <div class="gray-line"></div>
    <div class="video-list">
      <!-- 教程列表 -->
      <video-item
      v-for="(itemVideo,index) in videoList"
      :key="index"
      :video="itemVideo"
      @handleWatch="handleWatch"
      ></video-item>
    </div>
    <part-footer></part-footer>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="760px"
      :before-close="handleClose"
      class="dialog-style"
    >
      <div class="iframeBox">
        <div class="iframeContent">
          <div class="contentFont">{{playingVideo.id}}</div>
          <div class="contentFont">{{ playingVideo.title1 + playingVideo.title2}}</div>
        </div>
        <iframe width="748" height="432" :src="`https://www.youtube.com/embed/${playingVideo.videoKey}`" title="YouTube video player"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import VideoItem from '@/views/us/resources/videos/VideoItem.vue'
import PartFooter from '@/components/part/PartFooter.vue'
export default {
  name: 'VideoList',
  mixins: [],
  components: {
    VideoItem,
    PartFooter
  },
  filters: {},
  props: {},
  data () {
    return {
      dialogVisible: false,
      playingVideo: {},
      videoList: [
        {
          id: 'Lesson 1',
          title1: 'Making Money with TikTok',
          title2: '- Fundamental Knowledge You Must Know!',
          background: 'default/us_lesson_1_cover.png',
          url: 'https://www.youtube.com/watch?v=CU3gEihWGeU',
          videoKey: 'CU3gEihWGeU'

        },
        {
          id: 'Lesson 2',
          title1: 'How to Win Free TikTok Traffic？',
          title2: '- Quick and Easy Mastery of TikTok Algorithm',
          background: 'default/us_lesson_2_cover.png',
          url: 'https://www.youtube.com/watch?v=DAtZsGTwlpI',
          videoKey: 'DAtZsGTwlpI'
        },
        {
          id: 'Lesson 3',
          title1: 'Next TikTok’s Top Video ',
          title2: '- How to Make a Viral Video on TikTok?',
          background: 'default/us_lesson_3_cover.png',
          url: 'https://www.youtube.com/watch?v=NaliSDbbNJ8',
          videoKey: 'NaliSDbbNJ8'
        },
        {
          id: 'Lesson 4',
          title1: 'Tips on TikTok Ad Video Copy,',
          title2: ' Music, and Tags to Win Your Audience!',
          background: 'default/us_lesson_4_cover.png',
          url: 'https://www.youtube.com/watch?v=1IymPmAqfgw',
          videoKey: '1IymPmAqfgw'

        },
        {
          id: 'Lesson 5',
          title1: 'How to Fast and Effectively ',
          title2: 'Build Up Your TikTok Account Like A Pro',
          background: 'default/us_lesson_1_cover.png',
          url: 'https://www.youtube.com/watch?v=1IymPmAqfgw',
          videoKey: '1IymPmAqfgw'
        },
        {
          id: 'Lesson 6',
          title1: 'Private Domain Traffic and Monetization ',
          title2: '- An Emerging TikTok eCommerce Tactics You Must Know',
          background: 'default/us_lesson_1_cover.png',
          url: 'https://www.youtube.com/watch?v=1IymPmAqfgw',
          videoKey: '1IymPmAqfgw'
        }

      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    handleWatch (obj) {
      // console.log(url)
      this.playingVideo = null
      this.playingVideo = obj
      this.dialogVisible = true
    },
    palyFirst() {
      this.playingVideo = this.videoList[0]
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
// .container{

  .sketch-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    // .r-border-bottom(1, solid, @color-light-gray);
      .r-width(1409);
      margin-right: auto;
      margin-left: auto;
      .r-margin-top(99);

      .left-box {
        display: flex;
        flex-direction: column;
        .r-width(654);
        .r-margin-right(48);

        .left-box-title {
          .r-width(520);
          // .r-height(67);
          .r-font-size(68);
          font-family: PingFang SC;
          font-weight: 600;
          color: #1436F5;
          // .r-line-height(67);
          .r-margin-bottom(63);
        }

        .p-title {
          // .r-width(263);
          // .r-height(28);
          .r-font-size(36);
          font-family: PingFang SC;
          font-weight: 600;
          color: #282828;
          // .r-line-height(64);
          .r-margin-bottom(25)
        }

        .p-second-title {
          // .r-width(224);
          // .r-height(18);
          .r-font-size(24);
          font-family: PingFang SC;
          font-weight: 500;
          color: #282828;
          // .r-line-height(60)
        }
        .p-content{
          // .r-width(654);
          // .r-height(111);
          .r-font-size(22);
          font-family: PingFang SC;
          font-weight: 400;
          color: #282828;
          // .r-line-height(30);
          .r-margin-bottom(95)
        }
        .watch-btn{
          .r-width(246);
          .r-height(62);
          .r-margin-bottom(145);
          .watchIcon{
            .r-font-size(23);
            .r-margin-left(8);
          }
        }

      }

      .right-box {
        .r-width(708);
        .r-height(426);
        background: #fff;
        .r-box-shadow(0, 4, 16, 0, @color-shadow);
        .r-border-radius(10);
        .r-margin-top(36)
      }
    }
  .gray-line {
    .r-width(1644);
    .r-height(1);
    margin-right: auto;
    margin-left: auto;
    border-bottom: 1px solid #D7D7D7;
  }
  .video-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .r-width(1498);
    .r-margin-top(81) ;
    margin-left: auto;
    margin-right: auto;
    .r-margin-bottom(41);
    // .r-margin-bottom(92)
  }
  .iframeBox{
    display: flex;
    flex-direction: column;
    align-items: center;
    .iframeContent{
      color: #fff;
      width: 748px;
      .r-padding-bottom(20);
      .contentFont{
        .r-font-size(20);
        font-family: PingFang SC;
        font-weight: 600;
      }
    }
  }
// }

// 弹出框样式调整
/deep/ .dialog-style .el-dialog {
  background: @color-footer-bg;
}
</style>
