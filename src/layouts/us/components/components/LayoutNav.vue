<template>
  <ul class="nav" :class="{ footer: footer }">
    <li v-for="nav in menu" :key="nav.name" class="nav__item">
      <com-nav-item :menu-item="nav" @handle="handleNav" />
    </li>
  </ul>
</template>
<script>
import { US_MENU_CONFIG } from '@/router/menu'
import { LINK_EXCHANGE } from '@/constants/config'
export default {
  name: 'LayoutNav',
  props: {
    footer: { type: Boolean, default: false }
  },
  components: {},
  data () {
    return {}
  },
  computed: {
    menu () {
      return US_MENU_CONFIG
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleNav (navPath) {
      console.log(navPath)
      // 当跳转的的 path 与当前的一致，则不执行
      if (navPath === this.$route.path) return
      // 如果是友情链接,则打开链接
      if (this.checkLink(navPath)) window.open(navPath)
      // 不是则跳转路由
      else this.$router.push(navPath)
    },
    // 检测是否是友情链接
    checkLink (navPath) {
      return LINK_EXCHANGE.some(v => navPath.includes(v))
    }
  }
}
</script>
<style  lang="less" scoped>
@import '@/assets/element-ui.modify.less';

.nav {
  display: flex;
  align-items: center;
  &__item {
    .r-padding-right(40);
    // padding-right: 40px;
    &_label {
      color: @color-font-basic;
      .r-font-size(@font-size-basic-rem);
      // font-size: @font-size-basic;
      .r-padding-bottom(8);
      // padding-bottom:8px;
      .r-border-bottom(0, solid, transparent);
      // border-bottom: 0px solid transparent;
      transition: all ease-in-out 0.2s;
      .no-select;
      &:hover {
        color: @color-primary;
        cursor: pointer;
      }
    }
  }
  &-active {
    color: @color-primary;
    .r-border-bottom(5, solid, @color-primary);
    // border-bottom: 5px solid @color-primary;
  }
  // footer 状态下
  &.footer {
    justify-content: flex-start;
    .nav__item {
      &_label {
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}

</style>
