<template>
  <section>
    <div class="el-header-item">
      <layout-auth />
    </div>
    <div class="el-header-item">
      <span
        v-for="tab in menuChildren"
        :key="tab.pathName"
        class="tab"
        :class="{ active: activeChildrenMenu === tab.pathName }"
        @click="handleTab(tab.pathName)"
      >
        {{ tab.label }}
      </span>
    </div>
  </section>
</template>
<script>
import LayoutAuth from './components/LayoutAuth'
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderLayout',
  props: {},
  components: {
    LayoutAuth
  },
  filters: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('global/distr', ['menuChildren', 'activeChildrenMenu'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * @description: 切换子导航
     * @param {*} pathName
     * @return {*}
     */
    handleTab (pathName) {
      this.$router.push({ name: pathName })
      this.$store.commit('global/distr/setActiveMenu', pathName)
    }
  }
}
</script>
<style  lang="less" scoped>
.el-header-item {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  .r-height(60);
  // height: 60px;
  &:first-child {
    justify-content: flex-end;
    border-bottom: 1px solid @color-border-gray;
  }
  .tab {
    display: inline-block;
    .r-padding(0, 10);
    // padding: 0 10px;
    .pointer;
    &.active {
      color: @color-primary;
    }
  }
}
</style>
