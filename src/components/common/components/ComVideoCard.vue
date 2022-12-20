<template>
  <div class="video-card">
    <el-card v-cloak shadow="hover">
      <!-- 头像与标题 -->
      <div class="header">
        <div class="flex-vc">
          <el-dropdown @command="handleCommand">
            <el-avatar
              shape="circle"
              :src="data.appIconUrl"
              class="avatar-img pointer"
            ></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="adDetail">{{
                $t('video_card.btn_ad_detail')
              }}</el-dropdown-item>
              <el-dropdown-item v-locate v-if="data.adverId" command="adverDetail">{{
                $t('video_card.btn_adver_detail')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="right">
            <el-tooltip :content="data.appName" placement="top" :open-delay="300">
              <div class="nickname" :title="data.appName">
                {{ data.appName | nullPlaceholder }}
              </div>
            </el-tooltip>
            <div class="domain">{{ data.adverDomain | nullPlaceholder }}</div>
          </div>
        </div>
        <!-- 收藏按钮 -->
        <com-favor-btn
          :is-lock="isLock"
          :state="data.favor"
          :type="favorType"
          :data="data"
          :index="favorIndex"
          @callback="favorBtnCallback"
        />
      </div>
      <!-- 时间 国家 设备 详情按钮 -->
      <div class="info">
        <div>
          <el-tooltip class="item" :content="`${$t('ttad.label_first_start')} - ${$t('ttad.label_last_end')}`" placement="top" :open-delay="300">
            <p class="time">
              <span>{{ data.firstPutAt | dateFilter | nullPlaceholder }}</span>
              <span>-</span>
              <span>{{ data.lastPutAt | dateFilter | nullPlaceholder }}</span>
            </p>
          </el-tooltip>
          <p>
            <el-tooltip class="item" :content="regionList" placement="top" :open-delay="300">
              <span class="info-tag">{{
                regionListOmit | nullPlaceholder
              }}</span>
            </el-tooltip>
            <span class="info-tag">{{ clazzFilter | nullPlaceholder }}</span>
          </p>
        </div>
        <com-btn @click.native="openVideoDetail">
          {{ data.btnCatalogText || $t('video_card.btn_view_more') }}
        </com-btn>
        <!-- <el-button plain @click="openVideoDetail">
          {{ data.btnCatalogText || $t('video_card.btn_view_more') }}
        </el-button> -->
      </div>
      <!-- 视频展示 -->
      <com-video
        :id="data.id"
        :lock="isLock"
        :video-url="data.vedioUrl"
        :cover-url="data.coverUrl"
        :lazy-watch="lazyWatch"
      />
      <!-- 主标题 副标题 -->
      <div class="intro">
        <el-tooltip :content="data.title" placement="top" :open-delay="300">
          <p class="title text-ellipsis">
            {{ data.title | nullPlaceholder }}
          </p>
        </el-tooltip>
        <el-tooltip :content="data.desc" placement="bottom" :open-delay="300">
          <p class="desc text-ellipsis">
            {{ data.desc | nullPlaceholder }}
          </p>
        </el-tooltip>
      </div>
      <!-- 广告展示 投放天数 热度 -->
      <div class="footer">
        <div class="item">
          <div class="count">{{ data.playCnt | kmb | noData }}</div>
          <div class="label">
            {{ $t('video_card.label_count_ad') }}
          </div>
        </div>
        <div class="item">
          <div class="count">{{ data.putDays | kmb | noData }}</div>
          <div class="label">
            {{ $t('video_card.label_count_day') }}
          </div>
        </div>
        <div class="item">
          <div class="count">{{ data.hot | kmb | noData }}</div>
          <div class="label">
            {{ $t('video_card.label_count_hot') }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import com from '@/libs/util'
import store from '@/store'
import filter from '@/libs/util.filter'
import { FAVOR_TYPE } from '@/constants'
export default {
  name: 'ComVideoCard',
  props: {
    data: { type: Object, default: () => { } },
    favorIndex: { type: Number, default: null },
    lazyWatch: { type: String, default: () => '.app-container' }
  },
  components: {},
  filters: {
    noData (value) {
      if (value) return value
      else return 0
    }
  },
  data () {
    return {}
  },
  computed: {
    // 收藏类型
    favorType () {
      return FAVOR_TYPE.AD
    },
    // 是否是lock状态
    isLock () {
      return this.data?.lock
    },
    regionList () {
      const tmpReg = com.regionCodeToCN(this.data.regionList)
      return com.arrayEllipsis(tmpReg, 1000, false)
    },
    regionListOmit () {
      const tmpReg = com.regionCodeToCN(this.data.regionList)
      return com.arrayEllipsis(tmpReg, 1, false, true)
    },
    clazzFilter () {
      const tmpClazz = filter.clazzFilter(this.data?.clazz)
      if (tmpClazz) return this.$t(tmpClazz)
      return tmpClazz
    }
  },
  watch: {},
  created () {
    store.dispatch('global/config/checkRegion')
  },
  mounted () {},
  methods: {
    // 头像下拉选项
    handleCommand (com) {
      if (this.checkLock()) return
      let route = null
      let id = null
      switch (com) {
        case 'adDetail':
          id = this.data.id
          break
        case 'adverDetail':
          id = this.data.adverId
          break
      }
      route = this.$router.resolve({
        name: com,
        query: {
          id: id
        }
      })
      window.open(route.href)
    },
    // 视频详情按钮
    openVideoDetail () {
      if (this.checkLock()) return
      this.$emit('open-detail', { videoId: this.data.id, favorIndex: this.favorIndex })
    },
    // 检查是否lock，在用户操作时弹出付费弹窗
    checkLock () {
      if (this.isLock) {
        this.$store.dispatch('global/auth/setLimit', true)
        return true
      }
      return false
    },
    /**
     * @description: 收藏组件callback
     * @param {*} objectId
     * @param {*} favorState
     * @return {*}
     */
    favorBtnCallback ({ data, index, type }) {
      this.$emit('favor-callback', { data, index, type })
    }
  }
}
</script>
<style lang="less" scoped>
.video-card {
  .p2r(min-height, 300);
  // min-height: 300px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .r-margin(10, 0);
    // margin: 10px 0;
    .flex-vc {
      display: flex;
      align-items: center;
      // 广告主头像
      .avatar-img {
        .r-width-height(50);
      }
    }
    .el-icon-star-off {
      cursor: pointer;
    }
    .right {
      .r-margin-left(20);
      // margin-left: 20px;
      .nickname {
        .r-margin-bottom(10);
        // margin-bottom: 10px;
        .r-font-size(20);
        // font-size: 20px;
        .r-line-height(25);
        // line-height: 25px;
        font-weight: bold;
        width: 100%;
        .text-ellipsis-by-value(1);
        // .text-ellipsis;
      }
      .domain {
        color: @color-font-secondary;
        .r-font-size(13);
        // font-size: 13px;
        .r-line-height(16);
        // line-height: 16px;
        .text-ellipsis-by-value(1);
      }
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .r-margin-bottom(18);
    // margin-bottom: 18px;
    .r-margin-top(18);
    // margin-top: 18px;
    .r-font-size(14);
    // font-size: 14px;
    .time {
      .r-font-size(14);
      color: @color-font-secondary;
      .r-margin-bottom(10);
      // margin-bottom: 10px;
      span {
        white-space: nowrap;
      }
    }
    &-tag {
      display: inline-block;
      .r-margin-right(5);
      // margin-right: 5px;
    }
  }
  .intro {
    line-height: 1.6;
    .r-margin(10, 0);
    // margin-top: 10px;
    // margin-bottom: 10px;
    .r-padding-bottom(10);
    // padding-bottom: 10px;
    border-bottom: 1px solid @color-border-gray;
    .title {
      .r-font-size(20);
      // font-size: 20px;
    }
    .desc {
      color: #a2a2a2;
      .r-line-h-height(25);
      // height: 25px;
      // line-height: 25px;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    .item {
      flex: 1;
      text-align: center;
      .count {
        .r-font-size(18);
        // font-size: 18px;
        font-weight: 600;
        color: #000;
      }
      .label {
        .r-font-size(16);
        // font-size: 16px;
        .r-margin-top(10);
        // margin-top: 10px;
        color: #666;
      }
    }
  }
}

// 占位条
.lock-placeholder {
  background: @color-shadow;
  .r-border-radius(5);
  // border-radius: 5px;
}
</style>
