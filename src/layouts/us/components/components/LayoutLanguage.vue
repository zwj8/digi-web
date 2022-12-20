<template>
  <el-dropdown @command="languageChange">
    <span class="layout-language">
      {{ currentLanguage}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="i18n in i18nOptions"
        :key="i18n.code"
        :command="i18n.code"
      >{{ i18n.label }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { I18N_OPTIONS } from '@/constants/config'
import { mapActions } from 'vuex'

export default {
  name: '',
  props: {},
  components: {},
  filters: {},
  data () {
    return {
    }
  },
  computed: {
    // 选项
    i18nOptions () {
      return I18N_OPTIONS
    },
    // 当前语言
    currentLanguage () {
      return I18N_OPTIONS.find(v => v.code === this.$i18n.locale).label
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    ...mapActions('global/user', ['setLang']),
    /**
     * @description: 语言切换
     * @param {*} command
     * @return {*}
     */
    languageChange (command) {
      // this.$i18n.locale = command
      if (this.currentLanguage === command) return
      switch (command) {
        case 'en':
          this.$router.push({ name: 'us' })
          break
        case 'zh':
          this.$router.push({ name: 'index' })
          break
      }
      this.setLang(command)
    }
  }
}
</script>
<style  lang="less" scoped>
.layout-language {
  .r-font-size(14);
  .r-padding(0, 30);
  // padding: 0 30px;
  .pointer;
}
</style>
