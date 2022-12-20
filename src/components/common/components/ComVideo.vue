<template>
  <div ref="videoArea" class="video-area" :style="`height: ${heightRem};width: ${width}`">
    <template v-if="!lock">
      <el-image class="img-bg" :src="coverUrl" :scroll-container="lazyWatch" lazy>
        <i class="el-icon-picture-outline"></i>
      </el-image>
      <video
        ref="video"
        class="com-video-content"
        preload="none"
        controlslist="nodownload noremoteplayback"
        oncontextmenu="return false"
        disablePictureInPicture
        :poster="coverUrl"
      >
        <source
          :src="videoUrl"
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        />
        <source :src="videoUrl" type="video/webm" />
        <source :src="videoUrl" type="video/mov" />
      </video>
      <!-- 播放按钮 -->
      <div v-show="!isPlay" class="video-play-btn">
        <i class="el-icon-video-play" @mouseenter.stop="handlePlay"></i>
        <!-- <div v-show="isPlay" class="video-play-btn__paused" @click="handlePause"></div> -->
      </div>
    </template>
    <!-- 毛玻璃效果 X 换成跟虚化背景一样-->
    <div v-else class="fuzzy-wrap">
      <el-image class="img-bg" :src="coverUrl" :scroll-container="lazyWatch" lazy>
      <!-- <el-image class="video-mask" :src="coverUrl" :scroll-container="lazyWatch" lazy> -->
        <i class="el-icon-picture-outline"></i>
      </el-image>
      <div class="actions-warp">
        <!-- <i class="el-icon-lock"></i> -->
        <div class="fuzzy-lock"></div>
        <com-btn class="fuzzy-btn" size="mini" type="primary" @click.native="$router.push({ name: 'comboList' })">{{ $t('components.limit.btn_level_up') }} >></com-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { REM_PX } from '@/constants'
import { ttadReport } from '@/libs/util.report'
export default {
  name: 'ComVideo',
  props: {
    id: { type: [String, Number], default: '' },
    lock: { type: Boolean, default: false },
    videoUrl: { type: String, default: () => '' },
    coverUrl: { type: String, default: () => '' },
    width: { type: String, default: () => '100%' },
    height: { type: Number, default: () => 280 },
    lazyWatch: { type: String, default: () => '' }
  },
  components: {},
  filters: {},
  data () {
    return {
      // 播放中?
      isPlay: false,
      // 是否已经上报
      isBehavior: false,
      bhTimer: null
    }
  },
  computed: {
    heightRem () {
      return `${this.height / REM_PX}rem`
    }
  },
  watch: {},
  created () {},
  mounted () {
    // 鼠标移出范围后停止播放并重置进度
    const _v = this.$refs.video
    const _va = this.$refs.videoArea
    _va.addEventListener('mouseleave', () => {
      this.isPlay = false
      _v.controls = false
      _v.currentTime = 0
      _v.pause()
      // 如果触发播放没超过1.5秒，则判断非用户有意触发，不予上报
      clearTimeout(this.bhTimer)
    })
  },
  methods: {
    /**
     * @description: 视频播放
     * @return {*}
     */
    handlePlay () {
      const _v = this.$refs.video
      _v.play()
      _v.controls = true
      this.isPlay = true
      // 如果已经上报，则不再重新上报（当前组件生命周期有效）
      if (this.isBehavior) return
      const _this = this
      this.bhTimer = setTimeout(() => {
        // 用户行为上报
        ttadReport(_this.id)
        _this.isBehavior = true
      }, 1500)
    }
  }
}
</script>
<style  lang="less" scoped>
.video-area {
  position: relative;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  video {
    position: absolute;
    height: 100%;
    .r-width(190);
    // width: 190px;
    // &:: {
    //   display: none !important;
    // }
  }
  // 播放按钮
  .video-play-btn {
    .full;
    height: 100%;
    width: 100%;
    .flex-cc;
    .el-icon-video-play {
      .pointer;
      .r-font-size(80);
      transition: all ease-in-out .2s;
      transform: rotate(-15deg);
      font-size: 80px;
      color: #fff;
      &:hover {
        transform: rotate(0);
      }
    }

    // 暂停按钮
    &__paused {
      // .full;
      height: 80%;
      .pointer;
    }
  }
  .img-bg {
    .full;
    height: 100%;
    width: 100%;
    opacity: 0.2;
    .flex-cc;
    i {
      .r-font-size(100);
      // font-size: 100px;
    }
  }
  // 毛玻璃遮罩
  .fuzzy-wrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .video-mask {
      position: absolute;
      top: -10%;
      left: -10%;
      height: 120%;
      width: 120%;
      .fuzzy-mask;
      overflow: hidden;
    }
    .actions-warp {
      position: absolute;
      height: 100%;
      width: 100%;
      .flex-cc;
      flex-flow: column;
      // .el-icon-lock {
      //   font-size: 60px;
      //   color: @color-primary;
      //   margin-bottom: 5px;
      // }
      .fuzzy-lock {
        .r-width-height(80, 80);
        // height: 80px;
        // width: 80px;
        // background: @color-primary;
        background-image: url('@{oss_prefix}default/lock-video.png');
        background-size: 130%;
        background-repeat: no-repeat;
        background-position: center;
        .r-margin-bottom(5);
        // margin-bottom: 5px;
      }
      .fuzzy-btn {
        .r-border(2, solid, @color-primary);
        // border: 2px solid @color-primary;
        font-weight: bold;
      }
    }
  }
}
</style>
