<template>
  <div class="com-nav" @mouseenter="showNav(true)" @mouseleave="showNav(false)">
    <span class="com-nav__label" @click="handleNav">{{ navName }}</span>
    <!-- 下拉菜单 -->
    <template v-if="isSinlge">
      <!-- <transition
        enter-class="animated-enter"
        leave-class="animated-leave"
      > -->
      <div v-show="isShow" class="com-nav__ops">
        <div class="ops">
          <div class="ops__title">{{ navName }}</div>
          <div v-for="op in menuItem.children" :key="op.path" class="ops__item">
            <span class="ops__item_label" @click.stop="handleItemNav(op)">{{ op.name }}</span>
          </div>
        </div>
      </div>
      <!-- </transition> -->
    </template>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'ComNavItem',
  mixins: [],
  components: {},
  filters: {},
  props: {
    menuItem: { type: Object, default: () => {} }
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    // 导航名
    navName () {
      return this.menuItem.name
    },
    // 是否有下拉
    isSinlge () {
      return _.has(this.menuItem, 'children')
    }
    // 当前激活菜单
    // isActive () {
    //   let _isActive = false
    //   if (_.has(this.menuItem, 'children')) {
    //     for (const item of this.menuItem.children) {

    //     }
    //   }
    //   // if ()
    //   // return this.$route.path ===
    //   return false
    // }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 点击导航
     * @return {*}
     */
    handleNav () {
      // 是否有下拉，没有直接执行
      if (this.isSinlge) return
      this.$emit('handle', this.menuItem.path)
    },
    /**
     * @description: 点击下拉导航
     * @return {*}
     */
    handleItemNav (item) {
      this.$emit('handle', item.path)
    },
    showNav (bool) {
      this.isShow = bool
    }
  }
}
</script>
<style lang="less" scoped>
.com-nav {
  position: relative;
  .r-line-h-height(60);
  .pointer;
  // 菜单名
  &__label {
    .r-font-size(14);
    .r-line-height(14);
  }
  // 鼠标经过效果
  &:hover {
    color: @color-primary;
  }

  // 下拉项
  &__ops {
    background: #fff;
    .r-width(200);
    position: absolute;
    .p2r(left, -20);
    .p2r(top, 45);
    .r-padding-top(10);
    .r-box-shadow(0, 0, 15, 0);
    .r-border-radius(5);
    .ops {
      &__title {
        background: @color-light-primary;
        color: @color-primary;
        .r-line-h-height(40);
        .r-padding-left(30);
      }
      &__item {
        .r-line-h-height(40);
        .r-padding-left(30);
        &_label {
          .r-font-size(14);
          .pointer;
          color: @color-font-primary;
          border-bottom: 1px solid @color-hide;
          &:hover {
            color: @color-primary;
            border-bottom: 1px solid @color-primary;
          }
        }
      }
    }
  }
}

.animated-enter {
  opacity: .5;
}
.animated-leave {
  opacity: 1;
}
</style>
