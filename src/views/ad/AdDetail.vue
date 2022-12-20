<template>
  <div class="video-detail-wrap">
    <el-card v-if="Object.keys(detailData).length > 0" style="width: 100%" shadow="hover">
      <div class="video-detail-card">
        <div class="video-wrap">
          <!-- 视频 -->
          <div class="video-v">
            <video controls :src="detailData.vedioUrl" :poster="detailData.coverUrl"></video>
          </div>
          <!-- like 评论 分享 -->
          <div class="video-digg">
            <div class="digg-item">
              <div class="heart-shape"></div>
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
            <el-popover v-if="detailData && detailData.ttShareUrl" placement="top" trigger="hover">
              <vue-qr :text="detailData.ttShareUrl" :margin="10"></vue-qr>
              <button slot="reference" class="btn">
                {{ $t('ttad.btn_tiktok') }}
              </button>
            </el-popover>
            <el-popover v-if="detailData && detailData.landPageUrl" placement="top" trigger="hover">
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
                <div class="avatar-img pointer" @click="oponNewPage('adverDetail', detailData.adverId)">
                  <img :src="detailData.appIconUrl" :alt="detailData.appName" />
                </div>
                <div class="avatar-name">
                  <p>
                    {{ detailData.appName }}
                    <com-copy v-if="detailData.appName" :content="detailData.appName" />
                  </p>
                  <p>
                    {{ detailData.adverDomain }}
                    <com-btn v-if="detailData.adverId" size="mini" style="margin-left: 5px"
                      @click.native="oponNewPage('adverDetail', detailData.adverId)">
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
                  @callback="favorResult"
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
          <div class="info-table-wrap">
            <div class="info-title">
              <span>{{ $t('ttad.label_ad_data') }}:</span>
              <span>{{ $t('ttad.label_ad_effect') }}:</span>
            </div>
            <div class="info-w border info-table">
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
              </div>
              <!-- 广告效果 -->
              <div class="info-data">
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
                    <com-copy v-if="detailData.ttShareUrl" :label="$t('ttad.label_orginal')" :content="detailData.ttShareUrl"/>
                  </a>
                </p>
              </div>
              <!-- 落地页 -->
              <div class="p">
                <p class="p-label">{{ $t('ttad.label_land_page') }}:</p>
                <p class="p-content">
                  <a target="_blank" :href="detailData.landPageUrl">
                    {{ detailData.landPageUrl }}
                    <com-copy v-if="detailData.landPageUrl" :label="$t('ttad.label_land_page')" :content="detailData.landPageUrl"/>
                  </a>
                </p>
              </div>
              <!-- 广告主 -->
              <div class="p">
                <p class="p-label">{{ $t('ttad.label_avder') }}:</p>
                <p class="p-content">
                  <a target="_blank" :href="`/adver/detail?id=${detailData.adverId}`">
                    {{ detailData.adverDomain }}
                    <com-copy v-if="detailData.adverDomain" :label="$t('ttad.label_avder')" :content="detailData.adverDomain"/>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- 下载按钮 -->
          <div class="info-w">
            <com-btn :download="detailData.vedioUrl" type="bg-primary">
              <i class="el-icon-download" />
              {{ $t('ttad.btn_dowmload') }}
            </com-btn>
          </div>
        </div>
      </div>
      <!-- 广告文案列表 -->
      <div class="video-desc-list">
        <div class="desc-wrap">
          <div class="table-header">
            <span>{{ $t('ttad.label_ad_text') }}</span>
            <span>{{ $t('ttad.label_video_text') }}</span>
          </div>
          <div class="table-main">
            <div class="table-w">
              <template v-if="
                detailData &&
                detailData.similarAdList &&
                detailData.similarAdList.length
              ">
                <div v-for="(desc, dindex) in detailData.similarAdList" :key="dindex" class="content">
                  <p>{{ desc.title }}</p>
                  <p>{{ desc.desc }}</p>
                </div>
              </template>
              <div v-else class="table-w__no-data">
                <span>{{ $t('ttad.label_video_detail_no_data') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <com-favor @callback="favorResult"/>
    </el-card>
    <el-empty v-else description=" ">
      <p class="tip">{{ $t('ttad.data_is_go') }}</p>
    </el-empty>
  </div>
</template>
<script>
import { FAVOR_TYPE } from '@/constants'
import TTAD from '@/api/ad'
import PartSvg from '@/components/part/PartSvg'
import com from '@/libs/util'
import vueQr from 'vue-qr'
import store from '@/store'
import filter from '@/libs/util.filter'
import { ttadReport } from '@/libs/util.report'
export default {
  name: 'AdDetail',
  components: {
    PartSvg,
    vueQr
  },
  data () {
    return {
      detailData: {},
      favorShow: false,
      favorObject: null,
      favorListIndex: null
    }
  },
  computed: {
    favorType () {
      return FAVOR_TYPE.AD
    },
    detailID () {
      return this.$route.query?.id || null
    },
    clazzFilter () {
      const tmpClazz = filter.clazzFilter(this.detailData?.clazz)
      if (tmpClazz) return this.$t(tmpClazz)
      return tmpClazz
    }
  },
  watch: {},
  created () {
    store.dispatch('global/config/checkRegion')
    this.getDetail()
  },
  mounted () {
    // 打开视频详情页，上报行为
    ttadReport(this.detailID)
  },
  methods: {
    // 视频收藏返回
    favorResult ({ data, index }) {
      this.detailData.favor = data.favor
      this.detailData.favorGroup = data.favorGroup
    },
    // 分享
    shareCopy () {
      const url = `${location.origin}/ad/detail?id=${this.detailId}`
      this.copy(this.$t('copy.share'), url)
    },
    // 获取广告详情
    getDetail () {
      const vloading = this.$loading()
      TTAD.GetDetail(this.detailID).then(res => {
        res.regionList = com.arrayEllipsis(com.regionCodeToCN(res.regionList), 1000, false)
        // debugger
        this.detailData = res
        vloading.close()
      }).catch(e => {
        vloading.close()
      })
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
    }
  }
}
</script>
<style lang="less" scoped>
.video-detail-wrap {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .r-margin-top(80);
  .r-margin-bottom(60);
  // margin-top: 80px;
  // box-shadow: 1px 1px 1px #ccc;
  width: 80vw;
  .p2r(min-width, 1280);
  .p2r(max-width, 1920);
  // min-width: 1280px;
  // max-width: 1920px;
  .video-detail-card {
    position: relative;
    display: flex;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    .r-padding-bottom(40);
    // padding-bottom: 40px;
    .video-wrap {
      @rem: (480 / @remPx);
      @rem_f: ~'@{rem}rem';
      flex: @rem_f 0 0;
      display: flex;
      flex-flow: column;
      align-items: center;
      height: 100%;
      background: #000;
      .r-border-radius(8);
      // border-radius: 8px;
      overflow: hidden;
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
        .r-height(600);
        // height: 600px;
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
            .p2r-calc-reduce(width, 100%, 10);
            // width: calc(100% - 10px);
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
      .p2r-calc-reduce(width, 100%, 480);
      // width: calc(100% - 480px);
      background: #fff;
      display: flex;
      flex-flow: column;
      .r-padding(15, 25);
      // padding: 15px 25px;
      .info-table {
        .r-width(600);
        // width: 600px;
      }
      .info-table-wrap {
        display: flex;
        flex-flow: row nowrap;
        .info-title {
          .p2r(min-width, 80);
          // min-width: 80px;
          .r-margin-right(15);
          // margin-right: 15px;
          display: flex;
          flex-flow: column;
          justify-content: space-around;
        }
      }
      .info-w {
        .r-margin-bottom(13);
        // margin-bottom: 13px;
        &.border {
          .r-padding(10);
          // padding: 10px;
          .r-border(2, solid, @color-light-gray);
          // border: 2px solid @color-light-gray;
          .r-border-radius(5);
          // border-radius: 5px;
        }
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
                &:first-child {
                  .p2r(min-width, 80);
                  // min-width: 80px;
                  .r-margin-right(15);
                  // margin-right: 15px;
                }
              }
            }
          }
          .share {
            .r-width(50);
            // width: 50px;
            color: @color-primary;
            cursor: pointer;
            text-align: right;
          }
        }
        .info-data:first-child {
          border-bottom: 2px solid @color-light-gray;
        }
        .info-data {
          display: flex;
          flex-flow: row nowrap;
          .r-padding(20, 0);
          // padding: 20px 0;
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
            .r-padding(10, 0);
            // padding: 10px 0;
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
              white-space: normal;
              word-break: break-all;
              color: @color-primary;
            }
          }
        }
        &:last-child {
          flex: 1;
        }
      }
    }
  }
  .video-desc-list {
    width: 100%;
    .desc-wrap {
      position: relative;
      height: 100%;
      .table-header {
        display: flex;
        width: 100%;
        flex-flow: row nowrap;
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
        flex: 1;
        .table-w {
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
          &::-webkit-scrollbar {
            .r-width(8);
            // width: 8px;
            scrollbar-arrow-color: @color-light-gray;
          }
          &::-webkit-scrollbar-thumb {
            background: @color-light-gray;
          }
          .content {
            border-bottom: 1px solid @color-light-gray;
            .p2r(min-height, 30);
            // min-height: 30px;
            .r-padding(10, 0);
            // padding: 10px 0;
            align-items: center;
            display: flex;
            p {
              .r-padding-left(20);
              // padding-left: 20px;
              flex: 1;
              .r-line-height(30);
              // line-height: 30px;
            }
          }
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
@rem: (13 / @remPx);
@rem_size: ~'@{rem}rem';
@size: @rem_size;
// @size: 13px;
.heart-shape {
  .r-margin-right(16);
  // margin-right: 16px;
  position: relative;
  width: @size;
  height: @size;
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
  width: @size;
  height: @size;
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
</style>
