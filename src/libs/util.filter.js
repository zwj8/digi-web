import { AD_TYPE, PAYMENT_MODE } from '@/constants/config'

const filter = {}

/**
 * @description: 广告分类格式化 - code 转 中文
 * @param {*} code
 * @param {*} placeholder
 * @return {*}
 */
filter.clazzFilter = (code, placeholder = null) => {
  if (!code) return placeholder
  const matchElement = AD_TYPE.find(v => v.code === code)
  return matchElement?.label || placeholder
}

/**
 * @description: 收款方式转换 code 转 i18n
 * @param {*} code 收款代码
 * @param {*} placeholder
 * @return {*}
 */
filter.wAccountTypeFilter = (code, placeholder = '---') => {
  if (!code) return placeholder
  const type = PAYMENT_MODE.typeList.find(v => code === v.type)
  return type.label || placeholder
}

export default filter
