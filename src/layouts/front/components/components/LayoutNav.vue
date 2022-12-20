<template>
  <ul class="nav" :class="{ footer: footer }">
    <li v-for="nav in menu" :key="nav.name" class="nav__item">
      <span
        class="nav__item_label"
        v-if="!nav.single && !nav.children"
        :class="{
          'nav-active': navActive === nav.path && !footer
        }"
        @click="handleNav(nav.path)"
        >{{ nav.name }}</span
      >
      <el-dropdown v-else @command="handleNav">
        <span
          class="nav__item_label"
          :class="{
            'nav-active': nav.children.some(v => navActive === v.path) && !footer
          }"
        >
          {{ nav.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="chd in nav.children"
            :command="chd.path"
            :key="chd.path"
            class="index-dropdown-fix"
            >{{ chd.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ul>
</template>
<script>
import { ZH_MENU_CONFIG } from '@/router/menu'
import { USER } from '@/constants'
import { mapGetters } from 'vuex'
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
    ...mapGetters('global/user', ['distrState']),
    menu () {
      let menu = [...ZH_MENU_CONFIG]
      menu = menu.map(v => {
        // 是否只显示单个
        if (v.single) {
          let distrState = this.distrState >= USER.TO_DISTR
            ? USER.TO_DISTR
            : this.distrState
          distrState = distrState || 0
          v = v.children[distrState]
        }
        return v
      })
      return menu
    },
    navActive () {
      return this.$route.path
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleNav (navPath) {
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
