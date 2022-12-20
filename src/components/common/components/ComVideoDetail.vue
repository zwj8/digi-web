<template>
  <div v-if="controlShow" class="video-detail-wrap">
    <div v-if="priviousShow" class="btn-wrap" @click="switchVideo('privious')">
      <div class="btn-icon-left">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <div v-else class="btn-wrap-hidden"></div>
    <div class="video-detail-card">
      <i class="el-icon-circle-close btn-close" @click="close"></i>
      <div class="video-wrap">
        <!-- 视频 -->
        <div class="video-v">
          <video
            controls
            autoplay
            :src="detailData.vedioUrl"
            :poster="detailData.coverUrl"
          ></video>
        </div>
        <!-- like 评论 分享 -->
        <div class="video-digg">
          <div class="digg-item">
            <i class="heart-shape"></i>
            {{ detailData.diggCnt | kmb }}
          </div>
          <div class="digg-item">
            <i class="el-icon-s-comment"></i>{{ detailData.commentCnt | kmb }}
          </div>
          <div class="digg-item">
            <i class="el-icon-s-promotion"></i>{{ detailData.shareCnt | kmb }}
          </div>
        </div>
        <!-- 二维码 -->
        <div class="video-share">
          <el-popover
            v-if="detailData && detailData.ttShareUrl"
            placement="top"
            trigger="hover"
          >
            <vue-qr :text="detailData.ttShareUrl" :margin="10"></vue-qr>
            <button slot="reference" class="btn">
              {{ $t('ttad.btn_tiktok') }}
            </button>
          </el-popover>
          <el-popover
            v-if="detailData && detailData.landPageUrl"
            placement="top"
            trigger="hover"
          >
            <vue-qr :text="detailData.landPageUrl" :margin="10"></vue-qr>
            <button v-if="detailData.landPageUrl" slot="reference" class="btn">
              {{ $t('ttad.btn_phone') }}
            </button>
          </el-popover>
          <button class="btn" @click="shareCopy">
            {{ $t('ttad.btn_share') }}
          </button>
        </div>
      </div>
      <div class="info-wrap">
        <div class="info-w">
          <!-- 头像 -->
          <div class="avatar">
            <div class="avatar-w">
              <el-avatar
                shape="circle"
                class="avatar-img pointer"
                :src="detailData.appIconUrl"
                :alt="detailData.appName"
                @click.native="oponNewPage('adverDetail', detailData.adverId)"
              ></el-avatar>
              <div class="avatar-name">
                <p>
                  {{ detailData.appName }}
                  <com-copy v-if="detailData.appName" :content="detailData.appName" />
                </p>
                <p>
                  {{ detailData.adverDomain }}
                  <com-btn
                    v-locate
                    v-if="detailData.adverId"
                    size="mini"
                    style="margin-left: 5px"
                    @click.native="oponNewPage('adverDetail', detailData.adverId)"
                  >
                    {{ $t('ttad.btn_adver_detail') }}
                  </com-btn>
                </p>
              </div>
            </div>
            <div class="favor">
              <!-- 收藏按钮 -->
              <com-favor-btn
                :state="detailData.favor"
                :type="favorType"
                :data="detailData"
                :index="favorIndex"
                @callback="favorBtnCallback"
              />
              <span>{{ $t('ttad.label_collect') }}</span>
            </div>
          </div>
        </div>
        <div class="info-w">
          <div class="ad-w">
            <!-- 广告名称 -->
            <div class="ad-info">
              <p>
                <span>{{ $t('ttad.label_title') }}:</span>
                <el-tooltip
                  :content="detailData.desc"
                  placement="top"
                  :open-delay="300"
                >
                  <span>{{ detailData.desc }}</span>
                </el-tooltip>
                <com-copy v-if="detailData.desc" :label="$t('ttad.label_title')" :content="detailData.desc" />
              </p>
            </div>
            <!-- 分享按钮 -->
            <div class="share">
              <span @click="shareCopy">{{ $t('ttad.btn_share') }}</span>
            </div>
          </div>
        </div>
        <div class="info-w">
          <!-- 广告数据 -->
          <div class="info-data">
            <div class="data-item">
              <span>{{ detailData.playCnt | kmb }}</span>
              <span>{{ $t('ttad.label_ad_show') }}</span>
            </div>
            <div class="data-item">
              <span>{{ detailData.putDays | kmb }}</span>
              <span>{{ $t('ttad.label_put_day') }}</span>
            </div>
            <div class="data-item">
              <span>{{ detailData.hot | kmb }}</span>
              <span>{{ $t('ttad.label_hot') }}</span>
            </div>
            <div class="data-item">
              <span>{{
                detailData.estimatefee !== 'null' &&
                detailData.estimatefee !== null &&
                detailData.estimatefee !== ''
                  ? `$${detailData.estimatefee}`
                  : '---'
              }}</span>
              <span>{{ $t('ttad.label_consumption') }}</span>
            </div>
            <div class="data-item">
              <span>{{ detailData.estimateOrders | kmb }}</span>
              <span>{{ $t('ttad.label_estimate_orders') }}</span>
            </div>
            <div class="data-item">
              <span>{{ detailData.diggRate }}%</span>
              <span>{{ $t('ttad.label_digg_rate') }}</span>
            </div>
          </div>
        </div>
        <div class="info-w">
          <div class="p-w">
            <!-- 国家/地区 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_region') }}:</p>
              <p class="p-content">
                {{ detailData.regionList }}
              </p>
            </div>
            <!-- 发布时间 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_put_time') }}:</p>
              <p class="p-content">{{ detailData.releaseAt | dateFilter }}</p>
            </div>
            <!-- 首次发现开始时间 - 最后发现结束时间 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_first_last_date') }}:</p>
              <p class="p-content">
                {{ detailData.firstPutAt | dateFilter }}
                /
                {{ detailData.lastPutAt | dateFilter }}
              </p>
            </div>
            <!-- 设备 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_device') }}:</p>
              <part-svg :svg-list="detailData.sourceList"></part-svg>
            </div>
            <!-- 类型 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_type') }}:</p>
              <p class="p-content">{{ clazzFilter }}</p>
            </div>
            <!-- 按钮文案 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_btn_text') }}:</p>
              <p class="p-content">{{ detailData.btnText }}</p>
            </div>
            <!-- 原帖子 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_orginal') }}:</p>
              <p class="p-content">
                <a target="_blank" :href="detailData.ttShareUrl">
                  {{ detailData.ttShareUrl }}
                </a>
                <com-copy v-if="detailData.ttShareUrl" :label="$t('ttad.label_orginal')" :content="detailData.ttShareUrl"/>
              </p>
            </div>
            <!-- 落地页 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_land_page') }}:</p>
              <p class="p-content">
                <a target="_blank" :href="detailData.landPageUrl">
                  {{ detailData.landPageUrl }}
                </a>
                <com-copy v-if="detailData.landPageUrl" :label="$t('ttad.label_land_page')" :content="detailData.landPageUrl"/>
              </p>
            </div>
            <!-- 广告主 -->
            <div class="p">
              <p class="p-label">{{ $t('ttad.label_avder') }}:</p>
              <p class="p-content">
                <a
                  target="_blank"
                  :href="`https://${detailData.adverDomain}`"
                >{{ detailData.adverDomain }}</a>
                <com-copy v-if="detailData.adverDomain" :label="$t('ttad.label_avder')" :content="detailData.adverDomain"/>
              </p>
            </div>
          </div>
        </div>
        <!-- 广告文案列表 -->
        <div class="info-w">
          <div class="desc-wrap">
            <div class="table-header">
              <span>{{ $t('ttad.label_ad_text') }}</span>
              <span>{{ $t('ttad.label_video_text') }}</span>
            </div>
            <div class="table-main">
              <div class="table-w">
                <template
                  v-if="
                    detailData &&
                    detailData.similarAdList &&
                    detailData.similarAdList.length
                  "
                >
                  <div
                    v-for="(desc, dindex) in detailData.similarAdList"
                    :key="dindex"
                    class="content"
                  >
                    <span>{{ desc.title }}</span>
                    <span>{{ desc.desc }}</span>
                  </div>
                </template>
                <div v-else class="table-w__no-data">
                  <span>{{ $t('ttad.label_video_detail_no_data') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-w">
          <!-- 查看详情按钮 -->
          <com-btn @click.native="oponNewPage('adDetail', detailData.id)">
            <i class="el-icon-search" />
            {{ $t('ttad.btn_detail') }}
          </com-btn>
          <!-- 下载按钮 -->
          <com-btn :download="detailData.vedioUrl" type="bg-primary">
            <i class="el-icon-download" />
            {{ $t('ttad.btn_dowmload') }}
          </com-btn>
        </div>
      </div>
    </div>
    <div v-if="nextShow" class="btn-wrap" @click="switchVideo('next')">
      <div class="btn-icon-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div v-else class="btn-wrap-hidden"></div>
  </div>
</template>

<script>
import { FAVOR_TYPE } from '@/constants'
import TTAD from '@/api/ad'
// import FAVOR from '@/api/favor'
import PartSvg from '@/components/part/PartSvg'
import com from '@/libs/util'
import vueQr from 'vue-qr'
import filter from '@/libs/util.filter'
import { ttadReport } from '@/libs/util.report'
export default {
  name: 'ComVideoDetail',
  props: {
    show: { type: Boolean, default: () => false },
    detailId: { type: String, default: () => '' },
    favorIndex: { type: Number, default: null },
    videoIdList: { type: Array, default: () => [] }
  },
  components: {
    PartSvg,
    vueQr
  },
  data () {
    return {
      controlShow: false,
      detailData: {},
      currentId: null,
      favorShow: false,
      favorObject: null,
      favorListIndex: null
    }
  },
  computed: {
    // 收藏类型
    favorType () {
      return FAVOR_TYPE.AD
    },
    priviousShow () {
      return this.videoIdList.length !== 0 && this.videoIdList.indexOf(this.currentId) !== 0
    },
    nextShow () {
      return this.videoIdList.length !== 0 && this.videoIdList.indexOf(this.currentId) !== this.videoIdList.length - 1
    },
    clazzFilter () {
      const tmpClazz = filter.clazzFilter(this.detailData?.clazz)
      if (tmpClazz) return this.$t(tmpClazz)
      return tmpClazz
    }
  },
  watch: {
    show (newValue) {
      // 如果是关闭，则直接关闭，否则执行获取接口
      if (!newValue) {
        this.controlShow = false
      } else {
        this.videoDetailOpen(this.detailId)
        this.currentId = this.detailId
      }
    }
  },
  mounted () {
    // 计算宽高
  },
  methods: {
    close () {
      this.$emit('close')
    },
    // 视频详情打开
    videoDetailOpen (vid) {
      const vloading = this.$loading()
      // 打开视频详情，上报行为
      ttadReport(vid)
      TTAD.GetDetail(vid).then(res => {
        res.regionList = com.arrayEllipsis(com.regionCodeToCN(res.regionList), 1000, false)
        this.detailData = res
        this.controlShow = true
        vloading.close()
      }).catch(e => {
        this.$emit('close')
        vloading.close()
      })
    },
    // 上一个/下一个 视频
    switchVideo (type) {
      let currentIndex = this.videoIdList.indexOf(this.currentId)
      switch (type) {
        case 'privious':
          if (currentIndex !== 0) {
            currentIndex -= 1
          }
          break
        case 'next':
          if (currentIndex !== this.videoIdList.length - 1) {
            currentIndex += 1
          }
          break
      }
      this.currentId = this.videoIdList[currentIndex]
      this.videoDetailOpen(this.currentId)
    },
    // 分享
    shareCopy () {
      const url = `${location.origin}/ad/detail?id=${this.detailId}`
      com.copyToClipboard(this.$t('copy.share'), url)
    },
    /**
     * @description: 打开新页面
     * @param {*} pathName 路由name
     * @param {*} id
     * @return {*}
     */
    oponNewPage (pathName, id) {
      if (!id) return
      const route = this.$router.resolve({
        name: pathName,
        query: {
          id: id
        }
      })
      window.open(route.href)
    },
    /**
     * @description: 返回收藏操作的结果给列表
     * @param {*} params
     * @return {*}
     */
    favorBtnCallback ({ data, index }) {
      this.detailData.favor = data.favor
      this.detailData.favorGroup = data.favorGroup
      this.$emit('favor-callback', { data, index })
    },
    /**
     * @description: 用于父组件直接修改详情弹窗的收藏状态
     * @param {*} favorState
     * @param {*} favorGroup
     * @return {*}
     */
    setFavorState ({ favorState, favorGroup }) {
      this.detailData.favor = favorState
      this.detailData.favorGroup = favorGroup
    }
  }
}
</script>

<style lang='less' scoped>
.video-detail-wrap {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .video-detail-card {
    @radius-rem: 21;
    @rem-rr: (@radius-rem / @remPx);
    @radius: ~'@{rem-rr}rem';
    // @radius: 21px;
    position: relative;
    border-radius: @radius;
    .r-width(1280);
    // width: 1280px;
    height: 90vh;
    .p2r(max-height, 850);
    // max-height: 850px;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    .btn-close {
      position: absolute;
      // @hw: 40px;
      // height: @hw;
      // width: @hw;
      // top: calc(13px - @hw);
      // right: calc(7px - @hw);
      .r-width-height(40);
      .p2r(top, (13 - 40));
      .p2r(right, (7 - 40));
      z-index: 101;
      cursor: pointer;
      color: #fff;
      .r-font-size(37);
      // font-size: 37px;
    }
    .video-wrap {
      overflow: hidden;
      border-top-left-radius: @radius;
      border-bottom-left-radius: @radius;
      display: flex;
      flex-flow: column;
      align-items: center;
      .r-width(500);
      // width: 500px;
      height: 100%;
      background: #000;
      .flex {
        width: 100%;
        .r-height(80);
        // height: 80px;
        display: flex;
        .r-font-size(18);
        // font-size: 18px;
        justify-content: space-around;
        align-items: center;
        color: #fff;
      }
      .video-v {
        @height: (160 / @remPx);
        @rem_h: ~'@{height}rem';
        height: calc(100% - @rem_h);
        // height: calc(100% - 160px);
        width: 100%;
        video {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
      .video-digg {
        .flex;
        .digg-item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .r-font-size(18);
          // font-size: 18px;
          i {
            .r-margin-right(8);
            // margin-right: 8px;
            .r-font-size(28);
            // font-size: 28px;
          }
        }
      }
      .video-share {
        .flex;
        background: #16161a;
        span {
          flex: 1;
        }
        span /deep/ .el-popover__reference-wrapper {
          width: 100%;
          display: block;
          .btn {
            @rem_w: (10 / @remPx);
            @w: ~'@{rem_w}rem';
            width: calc(100% - @w);
          }
        }
        .btn {
          .r-margin-left(10);
          // margin-left: 10px;
          flex: 1;
          .r-border-radius(3);
          // border-radius: 3px;
          background: #2a2a32;
          border: 0;
          .r-height(50);
          // height: 50px;
          .r-font-size(16);
          // font-size: 16px;
          color: #fff;
          cursor: pointer;
          .no-select;
          transition: all ease-in-out 0.2s;
          &:last-child {
            .r-margin-right(10);
            // margin-right: 10px;
          }
          &:hover {
            background: #42424e;
          }
        }
      }
    }
    .info-wrap {
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;
      border-top-right-radius: @radius;
      border-bottom-right-radius: @radius;
      // width: calc(100% * 0.6);
      height: 100%;
      background: #fff;
      display: flex;
      flex-flow: column;
      .r-padding(15, 25);
      // padding: 15px 25px;
      overflow-y: auto;
      .public-scroll;
      .info-w {
        .r-margin-bottom(13);
        // margin-bottom: 13px;
        .avatar {
          display: flex;
          justify-content: space-between;
          &-w {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            .avatar-img {
              .r-width-height(80);
              // height: 80px;
              // width: 80px;
              .r-border-radius(40);
              // border-radius: 40px;
              overflow: hidden;
              .r-margin-right(20);
              // margin-right: 20px;
            }
            .avatar-name {
              p:nth-child(1) {
                .r-font-size(20);
                // font-size: 20px;
                font-weight: bold;
                .r-margin-bottom(10);
                // margin-bottom: 10px;
              }
              p:nth-child(2) {
                color: @color-gray;
              }
            }
          }
          .favor {
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            i {
              .r-font-size(35);
              // font-size: 35px;
              .r-margin-bottom(5);
              // margin-bottom: 5px;
            }
          }
        }
        .ad-w {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .ad-info {
            max-width: 80%;
            p {
              .r-height(30);
              // height: 30px;
              display: flex;
              align-items: center;
              span {
                display: inline-block;
                max-width: 75%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                .r-margin-right(8);
                // margin-right: 8px;
              }
            }
          }
          .share {
            .r-width(50);
            // width: 50px;
            color: @color-primary;
            cursor: pointer;
          }
        }
        .info-data {
          display: flex;
          flex-flow: row nowrap;
          border: 2px solid @color-light-gray;
          .r-padding(20, 0);
          // padding: 20px 0;
          .r-border-radius(5);
          // border-radius: 5px;
          .data-item {
            flex: 1;
            display: flex;
            flex-flow: column;
            align-items: center;
            border-right: 1px solid @color-light-gray;
            .r-padding(0, 10);
            // padding: 0 10px;
            span {
              white-space: nowrap;
              display: block;
              &:first-child {
                font-weight: bold;
                .r-margin-bottom(10);
                // margin-bottom: 10px;
              }
            }
            &:last-child {
              border: 0;
            }
          }
        }
        .p-w {
          .p {
            .r-padding-bottom(16);
            // padding-bottom: 16px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;

            &-label {
               .r-margin-right(15);
              display: inline-block;
              white-space: nowrap;
              text-overflow: ellipsis;
              .p2r(min-width, 80);
              line-height: 1;
            }
            &-content {
              white-space: normal;
              word-break: break-all;
              line-height: 1;
            }
            a {
              color: @color-primary;
            }
          }
        }
        .desc-wrap {
          position: relative;
          height: 100%;
          .p2r(min-height, 150);
          // min-height: 150px;
          .table-header {
            display: flex;
            width: 100%;
            flex-flow: row nowrap;
            position: absolute;
            top: 0;
            .r-line-h-height(40);
            // height: 40px;
            // line-height: 40px;
            background: @color-table-thead;
            .r-padding-right(8);
            // padding-right: 8px;
            box-sizing: border-box;
            span {
              display: block;
              .r-padding-left(20);
              // padding-left: 20px;
              flex: 1;
            }
          }
          .table-main {
            position: relative;
            .p2r(top, 40);
            // top: 40px;
            flex: 1;
            @rem_h: (40 / @remPx);
            @h: ~'@{rem_h}rem';
            height: calc(100% - @h);
            // height: calc(100% - 40px);
            .table-w {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              overflow-y: auto;
              &__no-data {
                .r-height(30);
                // height: 30px;
                border: 1px solid @color-light-gray;
                border-top: none;
                color: @color-gray;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              // 滚动条样式
              .public-scroll;

              .content {
                border-bottom: 1px solid @color-light-gray;
                .p2r(min-height, 30);
                // min-height: 30px;
                .r-padding(5, 0);
                // padding: 5px 0 5px 0;
                align-items: center;
                display: flex;
                span {
                  .r-padding-left(20);
                  // padding-left: 20px;
                  flex: 1;
                }
              }
            }
          }
        }
        &:last-child {
          flex: 1;
        }
      }
    }
  }
  .btn-wrap-hidden {
    .r-width-height(170);
    // @hw: 170px;
    // height: @hw;
    // width: @hw;
  }
  .btn-wrap {
    .r-width-height(170);
    // @hw: 170px;
    // height: @hw;
    // width: @hw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-shrink: 0;
    .btn-icon-left,
    .btn-icon-right {
      .r-width-height(74);
      // @btn-hw: 74px;
      // height: @btn-hw;
      // width: @btn-hw;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      i {
        .r-font-size(50);
        // font-size: 50px;
        color: @color-primary;
        position: relative;
        transition: all ease-in-out 0.3s;
      }
    }
    .btn-icon-left {
      i {
        .p2r(top, 15);
        .p2r(left, 10);
        // top: 15px;
        // left: 10px;
      }
      &:hover {
        i {
          left: 0;
        }
      }
    }
    .btn-icon-right {
      i {
        .p2r(top, 15);
        .p2r(left, 15);
        // top: 15px;
        // left: 15px;
      }
      &:hover {
        i {
          .p2r(left, 25);
          // left: 25px;
        }
      }
    }
  }
}

i.el-star,
i.el-icon-document-copy {
  cursor: pointer;
}
i.el-icon-document-copy {
  color: @color-primary;
}

// 心形icon
// @size: 13px;
.size {
  .r-width-height(13)
}
.heart-shape {
  margin-right: 16px !important;
  position: relative;
  .size;
  // width: @size;
  // height: @size;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  background-color: #fff;
}
.heart-shape:before,
.heart-shape:after {
  position: absolute;
  .size;
  // width: @size;
  // height: @size;
  content: '';
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  background-color: #fff;
}
.heart-shape:before {
  bottom: 0;
  .p2r(left, -7);
  // left: -7px;
}
.heart-shape:after {
  .p2r(top, -7);
  // top: -7px;
  right: 0;
}

// 二维码wrap
.q-code {
  .r-width-height(200);
  // @hw: 200px;
  // height: @hw;
  // width: @hw;
}
</style>
