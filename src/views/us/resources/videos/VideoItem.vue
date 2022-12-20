<template>
  <div class="item-box">
    <img class="item-img" :src="`${OSS_PREFIX }${video.background}`">
    <div class="item-content">
      <div class="item-content-title">{{video.id}}</div>
      <div class="item-content-question">{{video.title1}}</div>
      <div class="item-content-answer">{{video.title2}}</div>
    </div>
    <div class="item-btn">
        <com-btn type="default" class="watch-btn" fontSize="25" @click="handleWatch">
          WATCH NOW
          <i class="el-icon-video-play watchIcon"></i>
        </com-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoItem',
  mixins: [],
  components: {},
  filters: {},
  props: {
    video: { type: Object, default: null },
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleWatch () {
      this.$emit('handleWatch', this.video)
    }
  }
}
</script>
<style lang="less" scoped>
.item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  .r-width(470);
  .r-height(577);
  background: #FFFFFF;
  .r-box-shadow(0, 4, 16, 0, @color-shadow);
  // .r-margin-right(44);
  .r-margin-bottom(41);

  .item-img {
    .r-width(470);
    .r-height(267);
    .r-margin-bottom(46)
  }

  .item-content {
    .r-width(365);
    .r-margin-bottom(65);

    .item-content-title {
      .r-font-size(22);
      .r-margin-bottom(10);
      .r-line-height(30);
      color: #282828
    }

    .item-content-question {
      .r-font-size(18);
      .r-margin-bottom(10);
      font-weight: 500;
      color: #282828
    }

    .item-content-answer {
      .r-font-size(18);
      font-weight: 500;
      color: #282828
    }
  }

  .item-btn {
    .watch-btn {
      .r-width(249);
      .r-height(65);

      .watchIcon {
        .r-font-size(23);
        .r-margin-left(8);
      }
    }
  }
}
</style>
