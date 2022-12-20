<template>
  <img class="logo pointer" :src="`${OSS_PREFIX}default/digiads_logo.png`" alt="Digi Ads Logo" @click="handleLogo">
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PartLogo',
  components: {},
  data () {
    return {}
  },
  computed: {
    // 获取用户当前语言
    ...mapGetters('global/user', ['currentLanguage'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleLogo () {
      let _path = ''
      switch (this.currentLanguage) {
        case 'zh':
          _path = '/'
          break
        case 'en':
          _path = '/us'
          break
      }
      this.$router.push(_path)
    }
  }
}
</script>
<style  lang="less" scoped>
.logo {
  max-width: 100%;
  max-height: 100%;
}
</style>
