import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './config/zh'
import en from './config/en'
// Element-Ui 多语言
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import { getLanguage } from '@/libs/util.i18n'
import store from '@/store'

Vue.use(VueI18n)

// 获取当前语言
const currentLanguage = getLanguage()

// 设置语言
store.dispatch('global/user/setLang', currentLanguage)

const i18n = new VueI18n({
  // 默认语言
  locale: currentLanguage,
  messages: {
    zh: {
      ...zh,
      ...elementZhLocale
    },
    en: {
      ...en,
      ...elementEnLocale
    }
  }
})

export default i18n
