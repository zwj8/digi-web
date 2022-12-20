<template>
  <div class="menu-list">
    <div
      v-for="me in menu"
      :key="me.pathName"
      class="menu-list-item"
      :name="me.pathName"
      :class="{ active: activeMenu === me.pathName }"
      @click="handleMenu(me)"
    >
      {{ me.label }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutMenu',
  props: {},
  components: {},
  filters: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters('global/distr', ['menu', 'activeMenu'])
  },
  watch: {},
  created () {
    // 设置默认导航
    this.$store.commit('global/distr/setActiveMenu')
  },
  mounted () {},
  methods: {
    /**
     * @description: 点击导航
     * @param {*} item
     * @return {*}
     */
    handleMenu (item) {
      const pathName = item.children[0].pathName
      // 跳转路由
      this.$router.push({ name: pathName })
      // 设置导航
      this.$store.commit('global/distr/setActiveMenu', pathName)
    }
  }
}
</script>
<style  lang="less" scoped>
.menu-list {
  .r-padding-top(10);
  .r-font-size(16);
  &-item {
    .r-padding(10, 0);
    .no-select;
    &:hover {
      color: @color-primary;
    }
    .pointer;
    &.active {
      color: @color-primary;
    }
  }
}
</style>
