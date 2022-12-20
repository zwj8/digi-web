import { mapActions } from 'vuex'
const mixin = {
  methods: {
    ...mapActions('global/user', ['setLang']),
    /**
     * @description: 设置语言为中文
     * @return {*}
     */
    mixinSetLangZH () {
      this.$i18n.locale = 'zh'
      this.setLang('zh')
    },
    /**
     * @description: 设置语言为中文
     * @return {*}
     */
    mixinSetLangEN () {
      this.$i18n.locale = 'en'
      this.setLang('en')
    }
  }
}
export default mixin
