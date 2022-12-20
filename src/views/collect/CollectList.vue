<template>
  <div class="favor">
    <header class="favor-header">
      <div class="nav" v-locate>
        <div class="btn-nav" :class="{ active: activeName === 'TTAD' }" @click="handleNav('TTAD')">
          {{ $t('collect.nav_ttad') }}
        </div>
        <div class="btn-nav" :class="{ active: activeName === 'ADVER' }" @click="handleNav('ADVER')">
          {{ $t('collect.nav_adver') }}
        </div>
      </div>
      <div class="search">
        <el-input v-model="searchText" :placeholder="$t('collect.placeholder_content')" @keyup.enter.stop="search">
          <i v-show="searchText !== ''" slot="suffix" class="el-icon-circle-close el-input__icon"
            @click="handleIconClick">
          </i>
          <el-button slot="append" icon="el-icon-search" @click="search" />
        </el-input>
      </div>
      <div class="hr"></div>
    </header>
    <!-- 分组列表 -->
    <section class="favor-group">
      <div class="favor-group__title">
        <span>{{ $t('collect.text_group') }}</span>
        <!-- 分组操作按钮 -->
        <div class="btn">
          <span :class="{ newing: newGroupInputShow }" @click="addGroup">{{
              newGroupInputShow ? $t('collect.btn_new_group_done') : $t('collect.btn_new_group')
          }}</span>
          <span :class="{ newing: deleteShow }" @click="deleteGroup">{{
              deleteShow ? $t('collect.btn_del_group_done') : $t('collect.btn_del_group')
          }}</span>
        </div>
      </div>
      <div class="favor-group__list">
        <span v-for="item in groupList" v-cloak :key="item.id" :class="{ active: currentGroupActive === item.name }"
          class="item-tab" @click="selectThis(item)">
          {{ `${item.name} (${item.count})` }}
          <i v-if="deleteShow && +item.id !== 0" class="el-icon-circle-close"
            @click.stop="deleteGroupById(item.id)"></i>
        </span>
        <span v-if="newGroupInputShow" class="item-tab edit">
          <input ref="addInput" v-model="newGroupName" :placeholder="$t('collect.placeholder_content')" type="text"
            @keyup.enter="addGroupApi" />
          <i class="el-icon-circle-close" @click="deleteNewInput"></i>
        </span>
      </div>
    </section>
    <section v-if="activeName === 'TTAD'" class="favor-list">
      <!-- 视频列表 -->
      <div class="list loading" v-if="dataList.length">
        <div class="list-box">
          <div v-for="(ad, index) in dataList" :key="ad.id" class="list-box__item">
            <com-video-card :lazy-watch="lazyName" :data="ad" :favor-index="index" @open-detail="videoCardDetailOpen"
              @favor-callback="favorResult" />
          </div>
        </div>
      </div>
      <p v-else class="no-data">{{ $t('collect.text_no_data') }}</p>
    </section>
    <el-main v-else class="main loading">
      <template v-if="dataList.length !== 0">
        <el-table :data="dataList" :style="tableStyle" :cell-style="{ 'text-align': 'center' }"
          :header-cell-style="{ 'text-align': 'center' }">
          <el-table-column prop="rank" :label="$t('ttad.label_rank')" width=""></el-table-column>
          <el-table-column :label="$t('ttad.label_adver')" width="250">
            <template slot-scope="scope">
              <div class="adver-img-wrap">
                <el-avatar :size="80" :src="scope.row.iconUrl" :alt="scope.row.name || 'no name'" class="pointer"
                  @click.native="handleAnalysis(scope.row)"></el-avatar>
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
          <el-table-column prop="putDays" :label="$t('ttad.label_put_day')" width=""></el-table-column>
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
                <el-tooltip v-if="typeof scope.row.regionList === 'string'" :content="scope.row.regionList"
                  :open-delay="500" placement="top-start">
                  <span>{{ scope.row.regionListOmit }}</span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('ttad.label_new')" width="280">
            <template slot-scope="scope">
              <div class="adver-video-wrap">
                <div v-for="(v, index) in scope.row.recentlyVedioList" :key="index" class="adver-video"
                  @click="videoDetailOpen(v, scope.row.recentlyVedioList)">
                  <div class="video-cover">
                    <el-image :src="v.coverUrl">
                      <div slot="error">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <i class="el-icon-caret-right"></i>
                  </div>
                  <span class="video-play-count">{{ v.playCnt | kmb }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('ttad.label_handle')" width="">
            <template slot-scope="scope">
              <div class="adver-analyse-wrap">
                <span class="btn-analyse" :name="scope.row.favor" @click="handleAnalysis(scope.row)">{{
                    $t('ttad.adver_analysis')
                }}</span>
                <!-- 收藏按钮 -->
                <com-favor-btn :state="scope.row.favor" :type="favorType" :data="scope.row" :index="+scope.$index"
                  @callback="favorResult" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <p v-else class="no-data">{{ $t('collect.text_no_data') }}</p>
    </el-main>
    <div v-show="dataList.length !== 0" class="pagination-area">
      <el-pagination :page-sizes="[20, 40, 60, 80, 100]" :current-page.sync="pagination.page" background
        :page-size="pagination.pageSize" layout="sizes, prev, pager, next" :total="pagination.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <com-video-detail ref="ComVideoDetail" :show="videoDetailShow" :video-id-list="videoIdList"
      :detail-id="videoDetailID" :favor-index="videoDetailIndex" @close="videoDetailClose"
      @favor-callback="favorResult" />
    <com-favor @callback="favorResult" />
  </div>
</template>
<script>
import com from '@/libs/util'
import { FRONT_SCROLL_CLASS, REM_PX, FAVOR_TYPE } from '@/constants'
import FAVOR from '@/api/favor'
export default {
  name: 'CollectList',
  components: {},
  data() {
    return {
      lazyName: FRONT_SCROLL_CLASS, // 懒加载所需的滚动元素class name
      searchText: '',
      activeName: '',
      groupList: [],
      currentGroupActive: 'ALL',
      dataList: [],
      videoIdList: [],
      videoDetailID: null,
      videoDetailIndex: null, // 视频详情索引
      videoDetailShow: false,
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      newGroupName: '',
      newGroupInputShow: false,
      deleteShow: false
    }
  },
  computed: {
    favorType() {
      return FAVOR_TYPE.ADVER
    },
    tableStyle() {
      const remWidth = 1800 / REM_PX
      const remFontSize = 14 / REM_PX
      return `max-width: ${remWidth}rem;margin: 0 auto;font-size: ${remFontSize}rem;`
      // return `max-width: ${remWidth}rem;margin: 0 auto;font-size: ${remFontSize}rem;`
    }
  },
  watch: {},
  created() { },
  mounted() {
    this.handleNav('TTAD')
  },
  methods: {
    // 搜索清空
    handleIconClick() {
      this.searchText = ''
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.getFavorList(this.activeName)
    },
    handleCurrentChange(page) {
      this.pagination.page = page
      this.getFavorList(this.activeName)
    },
    search() {
      this.getFavorList(this.activeName)
    },
    // 视频详情关闭触发的事件
    videoDetailClose() {
      this.videoDetailShow = false
    },
    // 广告主视频详情打开
    videoDetailOpen(item, list) {
      if (!item.id) return
      this.videoDetailID = item.id
      this.videoDetailIndex = null
      this.videoIdList = list.map(v => v.id)
      this.videoDetailShow = true
    },
    // 广告视频详情打开
    videoCardDetailOpen({ videoId, favorIndex }) {
      this.videoDetailID = videoId
      this.videoIdList = this.dataList.map(v => v.id)
      this.videoDetailIndex = favorIndex
      this.videoDetailShow = true
    },
    // 视频收藏返回
    favorResult({ data, index, type }) {
      switch (type) {
        case FAVOR_TYPE.AD:
          if (index !== null) this.$set(this.dataList, index, data)
          // 当详情弹窗显示时
          if (this.videoDetailShow) this.$refs.ComVideoDetail.setFavorState({ favorState: data.favor, favorGroup: data.favorGroup })
          break
        case FAVOR_TYPE.ADVER:
          this.$set(this.dataList, index, data)
          break
      }
      if (index !== null) {
        this.getGroupList(type)
        this.getFavorList(type)
      }
    },
    // 点击Nav
    async handleNav(type) {
      if (type === this.activeName) return
      this.activeName = type
      this.dataList = [] // 清空列表
      await this.getGroupList(type)
      await this.getFavorList(type)
    },
    // 获取收藏组数据
    async getGroupList(type) {
      const res = await FAVOR.GetGroup(type)
      this.groupList = res
      if (!res.some(i => i.name === this.currentGroupActive)) {
        this.currentGroupActive = 'ALL'
      }
    },
    // 收藏视频
    handleFavor(obj, index) {
      let apiName = ''
      if (this.activeName === 'TTAD') {
        apiName = 'AddVideo'
      } else {
        apiName = 'AddAdver'
      }
      FAVOR[apiName]({
        objectId: obj.id
      }).then(res => {
        obj.favor = !obj.favor
        this.getGroupList(this.activeName)
        this.getFavorList(this.activeName)
      })
    },
    // 获取收藏列表
    getFavorList(type) {
      const loading = this.$loading({
        lock: true,
        target: '.loading',
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, .9)',
        customClass: 'loading-fix'
      })
      let grp = 0
      if (this.groupList.length !== 0) {
        const selectObj = this.groupList.filter(v => v.name === this.currentGroupActive)
        if (selectObj.length !== 0) {
          grp = selectObj[0].id
        }
      }
      FAVOR[type === 'TTAD' ? 'GetVideo' : 'GetAdver']({
        keyword: this.searchText,
        groupId: grp,
        page: this.pagination.page,
        pageSize: this.pagination.pageSize
      }).then(res => {
        this.pagination.page = res.page
        this.pagination.pageSize = res.pageSize
        this.pagination.total = res.total
        if (res.data) {
          // 因为只要2个最新视频素材，后端最多给3个，为了不再页面上做判断，直接在数据这里做处理
          // 顺便加上排名
          if (type === 'ADVER' && res.data && res.data.length > 0) {
            res.data = res.data.map((v, index) => {
              const tmpReg = com.regionCodeToCN(v.regionList)
              v.regionList = com.arrayEllipsis(tmpReg, 1000, false)
              v.regionListOmit = com.arrayEllipsis(tmpReg, 4)
              v.rank = (res.page - 1) * res.pageSize + 1 + index
              v.recentlyVedioList = v.recentlyVedioList ? v.recentlyVedioList.filter((video, index) => index < 2) : []
              return v
            })
          }
          this.dataList = res.data || []
          // 获取视频列表所有ID，用于视频详情上一个下一个视频定位
          this.videoIdList = type === 'TTAD' ? res.data.map(v => v.id) : []
        } else {
          this.dataList = []
          this.videoIdList = []
        }
        com.top()
        loading.close()
      }).catch(e => {
        loading.close()
      })
    },
    // 广告主分析
    handleAnalysis(item) {
      const route = this.$router.resolve({
        name: 'adverDetail',
        query: {
          id: item.id
        }
      })
      window.open(route.href)
    },
    addGroup() {
      this.deleteShow = false
      this.newGroupInputShow = !this.newGroupInputShow
      setTimeout(() => {
        this.$refs.addInput.focus()
      }, 100)
    },
    deleteGroup() {
      this.newGroupInputShow = false
      this.deleteShow = !this.deleteShow
    },
    addGroupApi() {
      FAVOR.AddGroup({
        name: this.newGroupName,
        type: this.activeName
      }).then(res => {
        this.newGroupInputShow = false
        this.newGroupName = ''
        this.getGroupList(this.activeName)
      })
    },
    // 选择一个标签
    selectThis(item) {
      if (this.currentGroupActive === item) return
      this.currentGroupActive = item.name
      this.getFavorList(this.activeName)
    },
    // 删除新建的input
    deleteNewInput() {
      this.newGroupInputShow = false
      this.newGroupName = ''
    },
    // 删除分组
    deleteGroupById(id) {
      FAVOR.DelGroup(id).then(res => {
        this.groupList = this.groupList.filter(v => v.id !== id)
        this.$message({
          type: 'success',
          message: this.$t('collect.msg_del_success')
        })
      })
    },
    // 视频详情收藏按钮点击
    videoFavorChange(isFavor) {
      const hit = this.dataList.find((i) => i.id === this.videoDetailID)
      if (hit) {
        hit.favor = isFavor
      }
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/part/part.ad.less';
@import '@/assets/part/part.adver.less';

.favor {
  background-color: @bg-list;

  &-header {
    .r-padding-top(30);
    // padding-top: 30px;
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: #fff;

    .hr {
      .r-width(1676);
      // .r-border-bottom(2, solid, @color-light-gray);
      border-bottom: 1px solid @color-light-gray;
    }

    .search {
      .r-width(600);
      // width: 600px;
      .r-padding-bottom(30);

      // padding-bottom: 30px;
      /deep/ .el-input {
        .el-input-group__append {
          color: #fff;
          background: @color-footer-bg;
          border-color: @color-footer-bg;
          // font-weight: bold;
        }
      }
    }

    .nav {
      width: 20%;
      // .p2r(min-width, 300);
      // border: 1px solid red;
      display: flex;
      justify-content: space-between;
      flex: row nowrap;
      .r-margin-bottom(20);

      // margin-bottom: 20px;
      .btn-nav {
        white-space: nowrap;
        .r-font-size(24);
        // font-size: 24px;
        .r-padding(21);
        // padding: 21px;
        box-sizing: border-box;
        border-bottom: 6px solid transparent;
        cursor: pointer;
        transition: all ease-in-out 0.3s;

        &.active {
          color: @color-primary;
          .r-border-bottom(6, solid, @color-primary);
          // border-bottom: 6px solid @color-primary;
        }
      }
    }
  }

  &-group {
    display: flex;
    justify-content: center;
    flex-flow: column;
    background-color: #fff;
    @rem-w: 1497;

    // @w: 1497px;
    &__title {
      .r-width(@rem-w);
      // width: @w;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      .r-padding(24, 0);

      // padding: 24px 0;
      .btn {
        span {
          .r-width(150);
          text-align: right;
          display: inline-block;
          .r-margin-left(10);
          // margin-left: 10px;
          cursor: pointer;

          &.newing {
            color: @color-primary;
          }
        }
      }
    }

    &__list {
      .r-width(@rem-w);
      // width: @w;
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      .r-padding-bottom(39);

      // padding-bottom: 39px;
      .item-tab {
        .r-margin-right(10);
        // margin-right: 10px;
        .r-margin-bottom(10);
        // margin-bottom: 10px;
        display: inline-block;
        .r-font-size(20);
        // font-size: 20px;
        .r-padding(12, 40);
        // padding: 12px 40px;
        box-sizing: border-box;
        .r-border(2, solid, @color-footer-bg);
        // border: 2px solid #303030;
        .r-border-radius(6);
        // border-radius: 6px;
        cursor: pointer;
        position: relative;
        .no-select;

        &.active {
          color: #fff;
          .r-border(2, solid, @color-primary);
          // border: 2px solid @color-primary;
          background: @color-primary;
        }

        i {
          color: @color-primary;
          position: absolute;
          .p2r(top, 16);
          .p2r(right, 10);
          // top: 16px;
          // right: 10px;
        }

        &.edit {
          .r-padding(12, 15);
          // padding: 12px 15px;
          .r-border(2, solid, @color-primary);

          // border: 2px solid @color-primary;
          // 新建时输入框样式
          input {
            border: 0;
            .r-height(18);
            // height: 18px;
            .r-font-size(16);
            // font-size: 16px;
            .r-width(150);
            // width: 150px;
            outline-style: none;
          }
        }
      }
    }
  }

  .pagination-area {
    .r-padding(30, 0);
    // padding: 30px 0;
    text-align: center;
    background: @bg-list;
  }
}
</style>
