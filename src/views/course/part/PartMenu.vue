<template>
  <div class="part-menu">
    <div class="part-menu-wrapper" v-loading="classMenuList.length === 0">
      <!-- 课程目录 -->
      <div class="part-menu__header" @click="handleIndex">
        <div class="pace-wrapper">
          <div class="circle"></div>
          <div class="line"></div>
        </div>
        <span class="header-title">{{ $t('class.class_menu') }}</span>
      </div>
      <!-- 目录列表 -->
      <div class="part-menu__content">
        <template v-for="_cm in classMenuList">
          <div class="part-menu__content_item" :key="_cm.title">
            <!-- 大标题 -->
            <div class="item-title">
              <div class="pace-wrapper">
                <div class="circle"></div>
                <div class="line"></div>
              </div>
              <span class="title">{{ _cm.title }}</span>
            </div>
            <!-- 小标题 -->
            <div
              v-for="_sub in _cm.children"
              :key="_sub.title"
              class="item-subtitle"
              :class="{'active': (_sub.sn === (currentCourse && currentCourse.sn) && !isIndex)}"
            >
              <div class="pace-wrapper">
                <div class="circle"></div>
                <div class="line"></div>
              </div>
              <span class="subtitle" @click.stop="handleVideo(_sub)">{{ _sub.title }}</span>
            </div>
            <div class="last-line"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { COURSE_ID } from '@/constants'
import { mapGetters } from 'vuex'
export default {
  name: 'PartMenu',
  mixins: [],
  components: {},
  filters: {},
  props: {},
  data () {
    return {
      currentSn: ''
    }
  },
  computed: {
    ...mapGetters('global/course', ['currentCourse', 'isBought']),
    isIndex () {
      return this.$route.name === 'courseIndex'
    },
    classMenuList () {
      let getterIndex = store.getters['global/course/courseIndex']
      if (!getterIndex?.length) return []
      // 排序
      getterIndex = getterIndex.sort((a, b) => a.order - b.order)
      // 处理课程目录
      const courseFormat = []
      for (const item of getterIndex) {
        const hitIndex = courseFormat.findIndex(_hit => _hit.title === item.chapter)
        if (hitIndex >= 0) courseFormat[hitIndex].children.push(item)
        else courseFormat.push({ title: item.chapter, children: [item] })
      }
      return courseFormat
    }
  },
  watch: {},
  created () {
    // 检查课程目录
    store.dispatch('global/course/checkIndex', COURSE_ID)
  },
  mounted () {
    // 初始化
    this.initial()
  },
  methods: {
    /**
     * @description: 初始化
     * @return {*}
     */
    initial () {
      if (this.$route.query?.sn) {
        this.currentSn = +this.$route.query?.sn
      }
    },
    /**
     * @description: 课程首页
     * @return {*}
     */
    handleIndex () {
      if (this.$route.name !== 'courseIndex') {
        this.$router.push({
          name: 'courseIndex'
        })
      }
    },
    /**
     * @description: 课程详情
     * @param {*} obj
     * @return {*}
     */
    handleVideo (obj) {
      // 是否已经购买课程
      if (!this.isBought) {
        this.$message({
          type: 'warning',
          message: this.$t('class.tail.msg.no_buy')
        })
        return false
      }
      store.commit('global/course/setCurrentCourse', obj.sn)
      this.currentSn = obj.sn
      this.$router.push({
        name: 'courseVideo',
        query: {
          sn: obj.sn
        }
      })
    }
  }
}
</script>
<style  lang="less" scoped>
@title_w: 16; // 大标题圆直径
@title_w_a: 8; // 大标题激活内圆直径
.part-menu {
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  .r-padding(40);
  padding-bottom: 0;
  background-color: #fff;

  // 包装
  &-wrapper {
    height: 100%;
  }

  // header 标题
  &__header {
    // .r-padding-bottom(20);
    .r-height(50);
    display: flex;
    align-items: flex-start;
    .header-title {
      .pointer;
      .r-font-size(20);
      font-weight: bold;
    }
    .pace-wrapper {
      height: 100%;
      position: relative;
      .r-padding-right(16);
      .circle {
        position: relative;
        .r-border-radius(@title_w);
        .r-width-height(@title_w);
        box-sizing: border-box;
        .r-border(1, solid, @color-primary);
        &::after {
          position: relative;
          .p2r(left, 3);
          .p2r(top, 3);
          content: '';
          display: block;
          .r-width-height(@title_w_a);
          .r-border-radius(@title_w_a);
          background-color: @color-primary;
        }
      }
      .line {
        position: absolute;
        .p2r(left, 7);
        .r-width(2);
        height: 100%;
        background-color: @color-primary;
      }
    }
  }

  // 课程列表
  &__content {
    .public-scroll;
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
    &_item {

      // 大标题
      .item-title {
        align-items: flex-start;
        .title {
          font-weight: bold;
          .r-font-size(16);
          position: relative;
          .p2r(top, -3);
        }
        .pace-wrapper {
          .r-padding-right(16);
          .circle {
            background-color: #fff;
            position: relative;
            .r-border-radius(@title_w);
            .r-width-height(@title_w);
            box-sizing: border-box;
            .r-border(1, solid, @color-primary);
          }
        }

        // 激活
        &.active {
          .pace-wrapper {
            .circle {
              &::after {
                position: relative;
                .p2r(left, 3);
                .p2r(top, 3);
                content: '';
                display: block;
                .r-width-height(@title_w_a);
                .r-border-radius(@title_w_a);
                background-color: @color-primary;
              }
            }
          }
        }
      }
      // 小标题
      .item-subtitle {
        .pointer;
        align-items: center;
        .subtitle {
          color: @color-gray;
          .r-font-size(14);
        }
        .pace-wrapper {
          display: flex;
          align-items: center;
          .r-padding-right(20);
          .circle {
            z-index: 2;
            .r-border-radius(8);
            .r-width-height(8);
            .r-margin-left(4);
            background-color: @color-light-gray;
          }
        }

        // 激活
        &.active {
          .subtitle {
            color: @color-font-primary;
          }
          .pace-wrapper {
            .circle {
              background-color: @color-primary;
            }
          }
        }
      }

      // 进度
      .item-title,
      .item-subtitle {
        .r-height(30);
        display: flex;
        // 进度盒子
        .pace-wrapper {
          height: 100%;
          position: relative;
          .line {
            position: absolute;
            z-index: 1;
            .p2r(left, 7);
            .r-width(2);
            height: 100%;
            background-color: @color-light-gray;
          }
        }

        // 激活状态
        // &.active {
        //   .pace-wrapper {
        //     .line {
        //       background-color: @color-primary;
        //     }
        //   }
        // }
      }

      .last-line {
        position: relative;
        .p2r(left, 7);
        .r-width(2);
        .r-height(40);
        background-color: @color-light-gray;

      }

      // .item-subtitle.active + .last-line {
      //   background-color: @color-primary;
      // }
    }
  }
}
</style>
