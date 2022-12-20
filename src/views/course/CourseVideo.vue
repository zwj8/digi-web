<template>
  <section>
    <h1 class="h1">{{ $t('class.class_menu') }} - <span class="sub-title">{{ courseName }}</span></h1>
    <!-- 视频播放 -->
    <div class="video-wrapper">
      <!-- 视频标题 -->
      <div class="video-title">
        <span class="video-title__title">{{ videoName }}</span>
      </div>
      <!-- 视频组件 -->
      <div class="video-component" v-loading="loading">
        <part-aliplayer
          v-if="video.vid"
          :autoplay="false"
          :vid="video.vid"
          :cover="lessonInfo.coverURL"
          :playauth="video.playauth"
          ref="aliplayer"
        />
      </div>
      <!-- 视频其他操作 -->
      <div class="video-action">
        <!-- 课程评分 -->
        <div class="video-action__star">
          <span class="video-action__star_label">{{ $t('class.tail.label.has_help') }}</span>
          <div class="video-action__start_component">
            <!-- <i class="el-icon-star-on"></i> -->
            <start-rating
              v-model="StarScore"
              :increment="0.5"
              :star-size="25"
              :show-rating="false"
              @rating-selected="handleScore"
            />
          </div>
        </div>
        <!-- 上一节 -->
        <div class="video-action__next">
          <el-link v-if="prevLessonSn" @click.stop="handleNext('pre')">{{ $t('class.tail.btn.pre') }}</el-link>
          <el-link v-if="nextLessonSn" @click.stop="handleNext('next')">{{ $t('class.tail.btn.next') }}</el-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import PartAliplayer from '@/components/part/PartAliplayer'
import COURSE from '@/api/course'
import StartRating from 'vue-star-rating'
import store from '@/store'
export default {
  name: 'CourseVideo',
  mixins: [],
  components: {
    PartAliplayer,
    StartRating
  },
  filters: {},
  props: {},
  data () {
    return {
      loading: false,
      courseName: '',
      videoName: '',
      videoSn: '',
      isLastCourse: false,
      StarScore: 0,
      video: {
        vid: '',
        playauth: '',
        cover: '',
        autoplay: false,
        height: '100%',
        width: '100%'
      },
      nextLessonSn: null,
      prevLessonSn: null,
      lessonInfo: {}
    }
  },
  computed: {},
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler (value) {
        if (value.query?.sn) {
          this.videoSn = value.query?.sn
          this.getLessonInfo(this.videoSn)
        }
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 获取课程视频 VID 和 playAuth
     * @param {*} sn
     * @return {*}
     */
    getLesson (sn) {
      this.loading = true
      COURSE.getLessonURL(sn).then(res => {
        this.video.vid = res?.videoID
        this.video.playauth = res?.playAuth
        this.reloadPlayer()
      }).catch(e => { console.log(e) }).finally(() => {
        this.loading = false
        this.isLastCourse = this.isLast()
      })
    },
    /**
     * @description: 获取课程详情
     * @param {*} sn
     * @return {*}
     */
    getLessonInfo (sn) {
      COURSE.getLesson(sn).then(res => {
        this.lessonInfo = res
        this.videoName = res?.title
        this.courseName = res?.chapter
        this.nextLessonSn = res?.nextLessonSn
        this.prevLessonSn = res?.prevLessonSn
        this.StarScore = res?.userScore / 20 || 0
      }).catch(e => { console.log(e) }).finally(() => {
        this.getLesson(this.videoSn)
      })
    },
    /**
     * @description: 判断是否是最后一项
     * @return {*}
     */
    isLast () {
      // 获取课程目录
      const courseMenu = store.getters['global/course/courseIndex']
      // 找到当前所在课程的索引
      const currentIndex = courseMenu.findIndex(v => v.sn === +this.videoSn)
      return currentIndex + 1 >= courseMenu.length
    },
    /**
     * @description: 课程评分
     * @param {array} value 分数
     * @return {*}
     */
    handleScore (value) {
      const params = {
        lessonSn: this.videoSn,
        score: value * 20
      }
      COURSE.setScore(params).then(res => {
        if (res) this.$message.success(this.$t('class.tail.msg.score_success'))
        else this.$message.error(this.$t('class.tail.msg.score_failed'))
      }).catch(e => { console.log(e) })
    },
    /**
     * @description: 下一课程
     * @param {array} action 切换课程
     * @return {*}
     */
    handleNext (action) {
      const lesson = action === 'next' ? this.nextLessonSn : this.prevLessonSn
      store.commit('global/course/setCurrentCourse', lesson)
      this.$router.push({
        name: 'courseVideo',
        query: {
          sn: lesson
        }
      })
    },
    /**
     * @description: 重载播放组件
     * @return {*}
     */
    reloadPlayer () {
      this.$refs?.aliplayer?.reloadPlayer()
    }

  }
}
</script>
<style  lang="less" scoped>
.sub-title {
  font-size: 16px;
}

.video {
  &-wrapper {
    .r-max-width(1100);
    margin: 0 auto;
  }
  // 视频标题
  &-title {
    .r-padding-top(40);
    .r-padding-bottom(20);
    &__title {
      .r-font-size(25);
      color: @color-gray;
    }
  }
  // 组件样式
  &-component {
    .r-width(1100);
    .r-height(619);
    .r-margin-bottom(40);
  }

  // 操作
  &-action {
    .flex-sbc;

    /deep/ .el-link {
      .r-margin-right(15);
    }

    // 课程评分
    &__star {
      .flex-fsc;
    }
  }

}
</style>
