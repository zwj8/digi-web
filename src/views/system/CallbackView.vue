<template>
  <div v-loading="true" style="height: 100vh"></div>
</template>
<script>
import util from '@/libs/util'
import auth from '@/libs/auth'
import { LS } from '@/constants'
import store from '@/store'

export default {
  created () {
    this.setToken()
  },
  mounted () {
    this.initial()
    this.redirect()
  },
  methods: {
    // 处理token
    setToken () {
      const token = this.$route.query?.token
      if (token) auth.setToken(token)
    },
    initial () {
      // 初始化动作
      // 设置UID cookie
      const token = auth.getToken()
      if (token) {
        const tokenObj = auth.parseToken(token)
        auth.setUid(tokenObj?.uid)
      }
    },
    redirect () {
      const prevPage = util.lsGet(LS.PREV_PAGE)
      util.lsRemove(LS.PREV_PAGE)
      if (prevPage && prevPage !== '/callback') {
        this.$router.push(prevPage)
      } else {
        store.dispatch('global/locate/setLocate', 'CN')
        this.$router.push({ name: 'index' })
      }
    }
  }
}
</script>
