<template>
  <section>
    <adver-search-form ref="adverSearchForm" :initial-data="mixinInitialParams" @search="searchFormData" />
    <div v-if="adCordData.length" class="list">
      <el-table
        :data="adCordData"
        :style="tableStyle"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="rank" :label="$t('ttad.label_rank')" width="50"></el-table-column>
        <el-table-column :label="$t('ttad.label_adver')" width="200">
          <template slot-scope="scope">
            <div class="adver-img-wrap">
              <el-avatar
                :size="80"
                :src="scope.row.iconUrl"
                :alt="scope.row.name || 'no name'"
                class="pointer"
                @click.native="handleAnalysis(scope.row)"
              ></el-avatar>
              <span v-text="scope.row.domain"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ttad.label_ad_total')" width="">
          <template slot-scope="scope">
            {{ scope.row.vedioCnt | kmb }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('ttad.label_ad_show')" width="">
          <template slot-scope="scope">
            {{ scope.row.showTimes | kmb }}
          </template>
        </el-table-column>
        <el-table-column
          prop="putDays"
          :label="$t('ttad.label_put_day')"
          width=""
        ></el-table-column>
        <el-table-column :label="$t('ttad.label_hot')" width="">
          <template slot-scope="scope">
            {{ scope.row.hot | kmb }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('ttad.label_put_date')" width="180">
          <template slot-scope="scope">
            <div class="adver-img-wrap">
              <span>{{ scope.row.putFrom | dateFilter(true) }}</span>
              <span>-</span>
              <span>{{ scope.row.putTo | dateFilter(true) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ttad.label_put_region')" width="170">
          <template slot-scope="scope">
            <div class="adver-region-wrap">
              <el-tooltip
                :content="scope.row.regionList"
                :open-delay="500"
                placement="top-start"
              >
                <span>{{ scope.row.regionListOmit }}</span>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ttad.label_new')" width="280">
          <template slot-scope="scope">
            <div class="adver-video-wrap">
              <div
                v-for="(v, index) in scope.row.recentlyVedioList"
                :key="index"
                class="adver-video"
                @click="videoDetailOpen(v, scope.row.recentlyVedioList, +scope.$index)"
              >
                <div class="video-cover">
                  <el-image :src="v.coverUrl">
                    <div slot="error">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div class="video-shade"></div>
                  <i class="el-icon-video-play"></i>
                  <!-- <i class="el-icon-caret-right"></i> -->
                </div>
                <span class="video-play-count">{{ v.playCnt | kmb }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ttad.label_handle')" width="">
          <template slot-scope="scope">
            <div class="adver-analyse-wrap">
              <span
                class="btn-analyse"
                :name="scope.row.favor"
                @click="handleAnalysis(scope.row)"
                >{{ $t('ttad.adver_analysis') }}</span
              >
              <!-- 收藏按钮 -->
              <com-favor-btn
                :state="scope.row.favor"
                :type="favorType"
                :data="scope.row"
                :index="+scope.$index"
                @callback="favorResult"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-area">
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          background
          :current-page.sync="pagination.page"
          :page-size="pagination.pageSize"
          layout="sizes, prev, pager, next"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
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
    />
    <com-favor @callback="favorResult"/>
  </section>
</template>
<script>
import ADVER from '@/api/adver'
import _ from 'lodash'
import adverSearchForm from '@/components/search/adverSearchForm'
import com from '@/libs/util'
import { mapGetters } from 'vuex'
import { REM_PX, FAVOR_TYPE } from '@/constants'
import seatchInitial from '@/mixin/search.initial'
export default {
  name: 'AdverList',
  mixins: [seatchInitial],
  components: {
    adverSearchForm
  },
  data () {
    return {
      loading: false,
      adCordData: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      videoDetailShow: false,
      videoDetailData: {},
      videoIdList: [],
      videoDetailID: null,
      videoDetailIndex: null, // 视频详情索引
      favorShow: false,
      favorObject: null,
      favorListIndex: null,
      params: {
        orderBy: 'PLAY_TIME', // 默认传广告展现
        dayRange: 7 // 默认传最近7天
      }
    }
  },
  computed: {
    favorType () {
      return FAVOR_TYPE.ADVER
    },
    tableStyle () {
      const remWidth = 1800 / REM_PX
      const remFontSize = 14 / REM_PX
      return `max-width: ${remWidth}rem;margin: 0 auto;font-size: ${remFontSize}rem;`
    },
    ...mapGetters('global/auth', ['isLimit'])
  },
  watch: {
    // 监控账号限制
    isLimit (val) {
      if (!val) {
        this.$refs.adverSearchForm.reset()
      }
    }
  },
  created () {
    this.search()
  },
  mounted () {},
  methods: {
    // 搜索组件传过来的参数
    searchFormData (params) {
      this.params = { ...params }
      if (!_.has(this.params, 'dayRange')) this.params.dayRange = 7
      this.pagination.page = 1 // 当使用搜索时，回到第一页
      this.search()
    },
    // 搜索组件的search
    search () {
      this.loading = true
      const params = {
        ...this.params,
        ...this.pagination
      }
      // 如果没有 dayRange 字段，则补上
      // if (!_.has(params, 'dayRange')) params.dayRange = 7
      delete params.total // 删除无用项
      this.$router.push({
        path: this.$route.path,
        query: params
      })
      this.adCordData = []
      ADVER.GetList(params)
        .then(
          (res) => {
            this.pagination.total = res.total
            this.pagination.page = res.page
            this.pagination.pageSize = res.pageSize
            // 因为只要2个最新视频素材，后端最多给3个，为了不再页面上做判断，直接在数据这里做处理
            // 顺便加上排名
            if (res.data && res.data.length > 0) {
              this.adCordData = res.data.map((v, index) => {
                const tmpReg = com.regionCodeToCN(v.regionList)
                v.regionList = com.arrayEllipsis(tmpReg, 1000, false)
                v.regionListOmit = com.arrayEllipsis(tmpReg, 4)
                v.rank = (res.page - 1) * res.pageSize + 1 + index
                v.recentlyVedioList = v.recentlyVedioList ? v.recentlyVedioList.filter((video, index) => index < 2) : []
                return v
              })
            } else {
              this.adCordData = []
            }
          }
        )
        .catch((e) => {
          // 出现错误时,页数重置到第一页
          this.pagination.page = 1
        }).finally(() => {
          com.top()
          this.loading = false
        })
    },
    /**
     * @description: 每页显示记录更改
     * @param {*} pageSize
     * @return {*}
     */
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.search()
    },
    /**
     * @description: 页数更改
     * @param {*} page
     * @return {*}
     */
    handleCurrentChange (page) {
      this.pagination.page = page
      this.search()
    },
    // 视频详情关闭触发的事件
    videoDetailClose () {
      this.videoDetailShow = false
    },
    // 视频详情打开
    videoDetailOpen (item, list, index) {
      if (this.checkLock(item.lock)) return
      if (!item.id) return
      this.videoDetailID = item.id
      this.videoIdList = list && list.map((v) => v.id)
      this.videoDetailShow = true
      this.videoDetailIndex = index
    },
    // 视频收藏返回
    favorResult ({ data, index, type }) {
      if (type === FAVOR_TYPE.ADVER) this.$set(this.adCordData, index, data)
    },
    // 广告主分析
    handleAnalysis (item) {
      if (this.checkLock(item.lock)) return
      const route = this.$router.resolve({
        name: 'adverDetail',
        query: {
          id: item.id
        }
      })
      window.open(route.href)
    },
    // 检查是否lock，在用户操作时弹出付费弹窗
    checkLock (lock) {
      if (lock) {
        this.$store.dispatch('global/auth/setLimit', true)
        return true
      }
      return false
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.ad.less';
@import '@/assets/part/part.adver.less';
</style>
