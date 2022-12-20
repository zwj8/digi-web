<template>
  <div class="page-adver-analysis">
    <template v-if="!isLimit">
      <header class="ada-header" v-loading="fullLoading">
        <div class="ada-header-title">
          <div class="domain">
            <!-- 收藏按钮 -->
            <com-favor-btn
              :state="adverInfo.favor"
              :type="favorType"
              :data="adverInfo"
              @callback="favorResult"
            />
            {{ $t('ttad.label_adver_domain') }}：
            <a
              :href="`https://${adverInfo.domain}`"
              target="_blank"
              v-text="adverInfo.domain"
            ></a>
          </div>
          <div class="fodder">
            <span>{{ $t('ttad.label_ad_fodder') }}：{{ adverInfo.vedioCnt }} {{ $t('chore.unit') }}</span>
          </div>
        </div>
        <div class="ada-header-info">
          <table class="table">
            <thead>
              <th>{{ $t('ttad.label_device') }}</th>
              <th>{{ $t('ttad.label_put_region') }}</th>
              <th>{{ $t('ttad.label_hot') }}</th>
              <th>{{ $t('ttad.label_type') }}</th>
              <th>{{ $t('ttad.label_first_start') + '-' + $t('ttad.label_last_end') }}</th>
              <th>{{ $t('ttad.label_put_time') }}</th>
              <th>{{ $t('ttad.label_ad_show') }}</th>
              <th>{{ $t('ttad.label_put_day') }}</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <part-svg :svg-list="adverInfo.platformList"></part-svg>
                </td>
                <td>
                  <el-tooltip
                    :content="adverInfo.regionList"
                    placement="top-start"
                  >
                    <span>{{ adverInfo.regionListOmit }}</span>
                  </el-tooltip>
                </td>
                <td>{{ adverInfo.hot | kmb }}</td>
                <td>
                  <el-tooltip
                    :content="adverInfo.clazzList"
                    placement="top-start"
                  >
                    <span>{{ adverInfo.clazzListOmit }}</span>
                  </el-tooltip>
                </td>
                <td>
                  {{ adverInfo.putFrom | dateFilter }}<br />-<br />{{
                    adverInfo.putTo | dateFilter
                  }}
                </td>
                <td>{{ adverInfo.firstFoundAt | dateFilter }}</td>
                <td>{{ adverInfo.showTimes | kmb }}</td>
                <td>{{ adverInfo.putDays }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <adver-detail-search-form :initial-data="mixinInitialParams" :region-limit="adverInfo.sourceRegionList" @search="searchFormData" />
      </header>
      <!-- 视频列表 -->
    <div class="list" v-if="adCordData.length">
      <div class="list-box">
        <div
          v-for="(ad, index) in adCordData"
          :key="ad.id"
          class="list-box__item"
        >
          <com-video-card
            :lazy-watch="lazyName"
            :data="ad"
            :favor-index="index"
            @open-detail="videoDetailOpen"
            @favor-callback="favorResult"
          />
        </div>
      </div>
      <div class="td-theme-pagination pagination-area">
        <el-pagination
          :page-sizes="[8, 20, 40, 60, 80, 100]"
          :current-page.sync="pagination.page"
          background
          :page-size="pagination.pageSize"
          layout="sizes, prev, pager, next"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div v-else-if="loading" v-loading="loading" class="list-loading"></div>
    <p v-else class="no-data">{{ $t('ttad.no_data') }}</p>
      <com-video-detail
        ref="ComVideoDetail"
        :show="videoDetailShow"
        :video-id-list="videoIdList"
        :detail-id="videoDetailID"
        :favor-index="videoDetailIndex"
        @close="videoDetailClose"
        @favor-callback="favorResult"
      />
      <com-favor @callback="favorResult"/>
    </template>
    <el-empty class="empty-wrap" v-else description=" ">
      <p class="tip">
        <span>{{ $t('ttad.limit_text') }}</span>
        <span
          class="text-primary pointer vip"
          @click="levelUp"
        >
        {{ $t('ttad.limit_level_up') }}
        </span>
      </p>
    </el-empty>
  </div>
</template>
<script>
import lodash from 'lodash'
import ADVER from '@/api/adver'
import TTAD from '@/api/ad'
import PartSvg from '@/components/part/PartSvg'
import adverDetailSearchForm from '@/components/search/adverDetailSearchForm'
import com from '@/libs/util'
import seatchInitial from '@/mixin/search.initial'
import { FRONT_SCROLL_CLASS, FAVOR_TYPE } from '@/constants'
import filter from '@/libs/util.filter'
export default {
  name: 'AdverDetail',
  mixins: [seatchInitial],
  components: {
    PartSvg,
    adverDetailSearchForm
  },
  data () {
    return {
      fullLoading: false,
      loading: false,
      lazyName: FRONT_SCROLL_CLASS, // 懒加载所需的滚动元素class name
      adverInfo: {},
      adCordData: [],
      isLimit: false,
      pagination: {
        page: 1,
        pageSize: 8,
        total: 0
      },
      params: {
        orderBy: 'LAST_PUT_TIME' // 默认传最后发现时间
      },
      videoDetailShow: false,
      videoIdList: [],
      videoDetailID: null,
      videoDetailIndex: null // 视频详情索引
    }
  },
  computed: {
    favorType () {
      return FAVOR_TYPE.ADVER
    },
    detailID () {
      return this.$route.query?.id || null
    }
  },
  watch: {},
  created () {
    this.getAdverInfo()
  },
  mounted () {},
  methods: {
    // 搜索组件传过来的参数
    searchFormData (params) {
      this.params = { ...params }
      this.pagination.page = 1 // 当使用搜索时，回到第一页
      this.getAdverList()
    },
    // 获取广告主信息
    getAdverInfo () {
      this.fullLoading = true
      ADVER.GetDetail(this.detailID).then(
        res => {
          const tmpReg = com.regionCodeToCN(res.regionList)
          this.adverInfo = res ? { ...res } : {}
          this.adverInfo.sourceRegionList = [...this.adverInfo.regionList]
          this.adverInfo.regionList = com.arrayEllipsis(tmpReg, 10000, false)
          this.adverInfo.regionListOmit = com.arrayEllipsis(tmpReg)
          res.clazzList = res.clazzList.map(clazz => {
            let clazzFormat = filter.clazzFilter(clazz)
            if (clazzFormat) clazzFormat = this.$t(clazzFormat)
            return clazzFormat
          })
          this.adverInfo.clazzList = com.arrayEllipsis(res.clazzList, 1000, false)
          this.adverInfo.clazzListOmit = com.arrayEllipsis(res.clazzList, 3, false)

          this.isLimit = false
        },
        rej => {
          if (rej.errorCode === 100012) {
            this.isLimit = true
          }
        }
      ).then(() => {
        // 获取列表
        this.getAdverList()
      }).catch(e => {}).finally(() => {
        this.fullLoading = false
      })
    },
    // 获取广告主视频列表
    getAdverList () {
      this.loading = true
      const params = {
        ...this.params,
        ...this.pagination
      }
      const queryParams = lodash.cloneDeep(params)
      queryParams.id = this.detailID
      this.$router.push({
        path: this.$route.path,
        query: queryParams
      })
      params.adverId = this.detailID
      delete params.id
      // 处理数据，为空的不post
      this.adCordData = []
      TTAD.GetList(params).then(res => {
        for (const keyName of ['total', 'page', 'pageSize']) {
          this.pagination[keyName] = res[keyName]
        }
        this.adCordData = res?.data || []
        // 获取视频列表所有ID，用于视频详情上一个下一个视频定位
        this.videoIdList = res?.data ? res.data.map(v => (v.id)) : []
        com.top()
      }).catch(e => {
        this.adCordData = []
        this.pagination.page = 1
      }).finally(() => {
        this.loading = false
      })
    },
    handleSizeChange (ps) {
      this.pagination.pageSize = ps
      this.getAdverList()
    },
    handleCurrentChange (page) {
      this.pagination.page = page
      this.getAdverList()
    },
    // 视频详情关闭触发的事件
    videoDetailClose () {
      this.videoDetailShow = false
    },
    // 视频详情打开
    videoDetailOpen ({ videoId, favorIndex }) {
      this.videoDetailID = videoId
      this.videoDetailIndex = favorIndex
      this.videoDetailShow = true
    },
    // 视频收藏返回
    favorResult ({ data, index, type }) {
      switch (type) {
        case FAVOR_TYPE.AD:
          this.$set(this.adCordData, index, data)
          // 当详情弹窗显示时
          if (this.videoDetailShow) this.$refs.ComVideoDetail.setFavorState({ favorState: data.favor, favorGroup: data.favorGroup })
          break
        case FAVOR_TYPE.ADVER:
          this.adverInfo.favor = data.favor
          this.adverInfo.favorGroup = data.favorGroup
          break
      }
    },
    levelUp () {
      this.$router.push({
        name: 'comboList'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '@/assets/part/part.ad.less';
@import '@/assets/element-ui.modify.less';
.ada-header {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .r-padding-top(30);
  // padding-top: 30px;
  .r-font-size(18);
  // font-size: 18px;
  &-title,
  &-info,
  &-option {
    width: 90%;
    .p2r(max-width, 1920);
    // max-width: 1920px;
    border-bottom: 1px solid @color-light-gray;
    .r-padding(20, 0);
    // padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  &-title {
    .domain {
      .flex-fsc;
      a {
        color: @color-primary;
      }
    }
  }
  &-info {
    .table {
      flex: 1;
      th {
        .r-font-size(14);
        // font-size: 14px;
        color: @color-gray;
        .r-padding-bottom(10);
        // padding-bottom: 10px;
      }
      th,
      td {
        text-align: center;
      }
    }
    .btn {
      display: flex;
      flex-flow: column;
      .btn-primary:last-child {
        .r-margin-top(10);
        // margin-top: 10px;
      }
    }
  }
  &-option {
    border-bottom: none;
    padding-bottom: 0;
  }
}
.el-select-dropdown__item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .option-img {
    .r-height(10);
    // height: 10px;
    width: auto;
    .r-margin-right(10);
    // margin-right: 10px;
  }
}
.el-input {
  .r-margin-bottom(5);
  // margin-bottom: 5px;
}

.ada-video-list {
  display: flex;
  flex-flow: column;
  align-items: center;
  .video-list {
    width: 80%;
  }
}

.pagination-area {
  .r-margin-top(20);
  // margin-top: 20px;
  text-align: center;
}

.adver-region-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty-wrap {
  .r-padding(30, 0);
}
</style>
