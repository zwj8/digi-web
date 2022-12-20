<template>
  <section>
    <ad-search-form ref="adSearchForm" :initial-data="mixinInitialParams" @search="searchFormData" />
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
          :page-sizes="[20, 40, 60, 80, 100]"
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
    <p v-else class="no-data" v-loading.lock="loading">{{ $t('ttad.no_data') }}</p>
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
  </section>
</template>
<script>
import TTAD from '@/api/ad'
import adSearchForm from '@/components/search/adSearchForm'
import com from '@/libs/util'
import seatchInitial from '@/mixin/search.initial'
import { FRONT_SCROLL_CLASS } from '@/constants'
import { mapGetters } from 'vuex'
export default {
  name: 'AdList',
  mixins: [seatchInitial],
  components: {
    adSearchForm
  },
  data () {
    return {
      loading: false,
      lazyName: FRONT_SCROLL_CLASS, // 懒加载所需的滚动元素class name
      pagination: { // 分页
        page: 1,
        pageSize: 20,
        total: 0
      },
      adCordData: [], // 列表数据
      videoDetailShow: false, // 视频详情组件是否显示
      videoDetailData: {}, // 视频详情数据
      videoIdList: [], // 视频详情ID合集，用于视频详情切换时使用
      videoDetailID: null, // 视频详情ID
      videoDetailIndex: null, // 视频详情索引
      params: {
        orderBy: 'LAST_PUT_TIME' // 默认传最后发现时间
      } // 搜索接口参数
    }
  },
  computed: {
    ...mapGetters('global/auth', ['isLimit'])
  },
  watch: {
    // 监控账号限制
    isLimit (val) {
      if (!val) {
        this.$refs.adSearchForm.reset()
      }
    }
  },
  created () {
    this.search()
  },
  mounted () { },
  methods: {
    // 搜索组件传过来的参数
    searchFormData (params) {
      this.params = { ...params }
      // 当存在 pageSize 值时，替换 pagination 中的 pageSize
      if (Object.prototype.hasOwnProperty.call(params, 'pageSize')) {
        this.pagination.pageSize = params.pageSize
      }
      this.pagination.page = 1 // 当使用搜索时，回到第一页
      this.search()
    },
    // 获取列表信息
    search () {
      this.loading = true
      const params = {
        ...this.params,
        ...this.pagination
      }
      delete params.total // 删除无用项
      this.$router.push({
        path: this.$route.path,
        query: params
      })
      this.adCordData = []
      TTAD.GetList(params).then((res) => {
        for (const keyName of ['total', 'page', 'pageSize']) {
          this.pagination[keyName] = res[keyName]
        }
        this.adCordData = res.data || []
        this.adCordData.forEach((i) => {
          i.regionList = i.regionList || []
        })
        com.top()
        // 获取视频列表所有ID，用于视频详情上一个下一个视频定位
        this.videoIdList = res.data.map((v) => v.id)
      }).catch((e) => {
        this.adCordData = []
        // 出现错误时,页数重置到第一页
        this.pagination.page = 1
      }).finally(() => {
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
    // 视频详情收藏按钮点击
    videoFavorChange (isFavor) {
      const hit = this.adCordData.find((i) => i.id === this.videoDetailID)
      if (hit) {
        hit.favor = isFavor
      }
    },
    // 视频详情打开
    videoDetailOpen ({ videoId, favorIndex }) {
      this.videoDetailID = videoId
      this.videoDetailIndex = favorIndex
      this.videoDetailShow = true
    },
    // 视频收藏返回
    favorResult ({ data, index }) {
      this.$set(this.adCordData, index, data)
      // 当详情弹窗显示时
      if (this.videoDetailShow) this.$refs.ComVideoDetail.setFavorState({ favorState: data.favor, favorGroup: data.favorGroup })
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.ad.less';
</style>
