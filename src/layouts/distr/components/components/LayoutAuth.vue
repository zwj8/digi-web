<template>
  <div>
    <el-tag v-if="parentName" type="info" size="small" style="margin: 0 5px;">上级代理：{{ parentName }}</el-tag>
    &nbsp;&nbsp;&nbsp;
    <el-dropdown>
      <div class="user-account">
        <i class="el-icon-user"></i>
        <span class="account-name" v-text="company"></span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <!-- 如果是二级分销商，则不会有新建合作伙伴选项 -->
        <span v-if="!isSecondary" class="acc-new" @click="NewLink">
          {{ $t('layout_distr.auth.new_partner') }}
          <i style="margin-left: 5px" class="el-icon-circle-plus-outline"></i>
        </span>
        <span class="acc-logout" @click="logout">{{ $t('layout_distr.auth.logout') }}</span>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LayoutAuth',
  props: {},
  components: {},
  filters: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('global/distr', ['company', 'isSecondary', 'parentName'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapActions('global/account', ['logout']),
    /**
     * @description: 跳转新建下属分销商
     * @return {*}
     */
    NewLink () {
      this.$router.push({
        name: 'accountDetail',
        query: {
          isNew: true
        }
      })
    }
  }
}
</script>
<style  lang="less" scoped>
.user-account {
  .pointer;
  .el-icon-user,
  .account-name {
    .r-padding-right(5);
    // padding-right: 5px;
  }
}
// 账号选择下拉菜单
.acc {
  &-title,
  &-new,
  &-logout {
    .r-font-size(13);
    display: block;
    .r-padding(15);
    .pointer;
  }
}
.acc-list {
  .r-padding(0, 15);
  &-item {
    display: flex;
    flex-flow: column;
    .r-font-size(14);
    .r-padding(10);
    border-radius: 5px;
    .pointer;
    .biz {
      .r-margin-bottom(5);
    }
    .id {
      .r-font-size(12);
    }
    // 被选中的状态
    &.active {
      background: @bg-color;
      color: @color-primary;
    }
  }
}
</style>
