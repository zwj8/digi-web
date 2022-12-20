<template>
  <div class="auth">
    <!-- 用户头像 -->
    <part-avatar v-if="isLogined" :hw="45" />
    <!-- 登录 / 注册按钮 -->
    <template v-else>
      <com-btn size="small" style="margin-right:10px;" @click.native="toLogin">{{ $t('auth.login_and_reg') }}</com-btn>
      <!-- <com-btn type="bg-primary" size="small" @click.native="toSignUp">免费注册</com-btn> -->
    </template>
  </div>
</template>
<script>
import PartAvatar from '@/components/part/PartAvatar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LayoutAuth',
  components: {
    PartAvatar
  },
  filters: {},
  data () {
    return {}
  },
  computed: {
    // 用户是否是登录状态
    ...mapGetters('global/auth', ['isLogined'])
  },
  watch: {
  },
  created () { },
  mounted () { },
  methods: {
    ...mapActions('global/account', ['login', 'signUp']),
    toLogin () {
      this.$loading()
      this.login()
    },
    toSignUp () {
      this.$loading()
      this.signUp()
    }
  }
}
</script>
<style  lang="less" scoped>
.auth {
  .r-margin-left(40);
  .r-padding-left(40);
  .r-padding-right(20);
  .r-border-left(1, solid, @color-border-gray);
  display: flex;
  align-items: center;
}
</style>
