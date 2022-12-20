import { I18N_PLACEHOLDER, COOKIE, COOKIE_DOMAIN, DEFAULT_LANG } from '@/constants'
import cookie from '@/libs/util.cookie'

/**
 * @description: 递归函数
 * @param {Object} obj     递归对象
 * @param {Object} pherObj 递归对象
 * @param {String} prefix  要添加的前缀
 * @return {*}
 */
export const recursion = (obj, pherObj, prefix) => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      pherObj[key] = prefix + obj[key]
    } else {
      pherObj[key] = {}
      recursion(obj[key], pherObj[key], prefix)
    }
  })
}

/**
 * @description: 处理 i18n 中带有占位符 [PLACEHOLDER] 的文本，并替换占位符内容
 * @param {*} i18nText     i18n文本
 * @param {*} replaceArray 要替换的内容的数组
 * @return {*}
 */
export const replacePLH = (i18nText, replaceArray = []) => {
  if (!i18nText) return null
  const reArr = [...replaceArray]
  return i18nText.replace(I18N_PLACEHOLDER, () => {
    return reArr.shift()
  })
}

/**
 * @description: 设置语言
 * @param {*} code 语言代号
 * @return {*}
 */
export const setLanguage = (code = DEFAULT_LANG) => {
  cookie.set(COOKIE.LANG, code, { domain: COOKIE_DOMAIN })
}

/**
 * @description: 获取语言
 * @return {*}
 */
export const getLanguage = () => {
  // 根据之前会议结果，digiads 只使用中文，英文版直接跳转北美版
  const defaultLanguage = DEFAULT_LANG
  // const languageCookie = cookie.get(COOKIE.LANG)
  // // 如果cookie有值，则使用cookie值
  // if (languageCookie) defaultLanguage = languageCookie
  // // 否则检查浏览器语言是否是中文
  // else if (navigator?.language?.includes('zh')) defaultLanguage = 'zh'
  return defaultLanguage
}
