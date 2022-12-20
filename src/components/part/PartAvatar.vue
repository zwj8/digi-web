<template>
  <div class="avatar" :class="{ isVIP: isVip }">
    <el-dropdown :disabled="disabled" @command="handleCommand">
      <div>
        <span class="vip-tag">{{ avatarTag }}</span>
        <div class="avatar-center" :style="`height:${remHW};width:${remHW};`">
          <img v-if="avatarUrl" :src="avatarUrl" :alt="nick" />
          <img v-else :src="defaultAvatarUrl" alt="default avatar" />
        </div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="detail">{{
          $t('avatar.personal_center')
        }}</el-dropdown-item>
        <el-dropdown-item command="reset">{{
          $t('avatar.update_secret')
        }}</el-dropdown-item>
        <el-dropdown-item command="logout">{{
          $t('avatar.logout')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {
  USER,
  REM_PX
} from '@/constants'
export default {
  name: 'PartAvatar',
  components: {},
  filters: {},
  props: {
    hw: { type: Number, default: 60 },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
    }
  },
  computed: {
    // 头像宽高计算
    remHW () {
      const rem = this.hw / REM_PX
      return `${rem}rem`
    },
    // 获取用户头像
    ...mapGetters('global/user', ['avatarUrl', 'nick', 'isVip', 'email']),
    // 用户会员状态标签
    avatarTag () {
      const vip = this.$t('avatar.tag_vip')
      const free = this.$t('avatar.tag_free')
      return this.isVip ? vip : free
    },
    // 用户默认头像
    defaultAvatarUrl () {
      return USER.DEFAULT_AVATAR
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    ...mapActions('global/account', ['logout', 'resetPW']),
    handleCommand (com) {
      switch (com) {
        case 'detail':
          // eslint-disable-next-line no-case-declarations
          const iszh = this.$i18n.locale === 'zh'
          if (iszh) {
            this.$router.push({ name: 'personalDetail' })
          } else {
            this.$router.push({ name: 'usPersonalDetail' })
          }
          break
        case 'reset':
          this.resetPW({ email: this.email })
          break
        case 'logout':
          this.logout()
          // 通知父元素，退出登录
          this.$emit('logout')
          break
      }
    }
  }
}
</script>
<style  lang="less" scoped>
.avatar {
  @avatar-center-border-rem: 3;
  @rem-acb: (@avatar-center-border-rem / @remPx);
  @avatar-center-border: ~'@{rem-acb}rem'; // 头像边框粗细
  // @avatar-center-border: 3px; // 头像边框粗细

  @avatar-tag-h-rem: (20 / @remPx);
  @rem-ath: ~'@{avatar-tag-h-rem}rem';
  @avatar-tag-h: @rem-ath; // 标签高度
  // @avatar-tag-h: 20px; // 标签高度

  @avatar-tag-w-rem: (56 / @remPx);
  @rem-atw: ~'@{avatar-tag-w-rem}rem';
  @avatar-tag-w: @rem-atw; // 标签宽度
  // @avatar-tag-w: 56px; // 标签宽度
  position: relative;

  &-center {
    .r-margin-right(30);
    // margin-right: 30px;
    overflow: hidden;
    border-radius: 50%;
    height: 100%;
    width: auto;
    display: block;
    box-sizing: border-box;
    position: relative;
    border: @avatar-center-border solid @color-light-gray;
    object-position: 50% 50%;
    z-index: 1;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
  .vip-tag {
    line-height: @avatar-tag-h;
    .r-padding-right(10);
    // padding-right: 10px;
    .p2r(border-top-right-radius, 5);
    .p2r(border-bottom-right-radius, 5);
    // border-top-right-radius: 5px;
    // border-bottom-right-radius: 5px;
    display: inline-block;
    .r-font-size(16);
    height: @avatar-tag-h;
    width: @avatar-tag-w;
    background: @color-light-gray;
    position: absolute;
    bottom: 0;
    .p2r(right, -7);
    // right: -7px;
    text-align: right;
    z-index: 0;
  }

  &.isVIP {
    .avatar-center {
      border: @avatar-center-border solid @color-light-green;
    }
    .vip-tag {
      background: @color-light-green;
    }
  }
}
</style>
