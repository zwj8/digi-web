/* jshint esversion: 6 */
import { PAYMENT_TYPE, PAYMENT_STATUS } from '@/constants/config'

/**
 * 格式化时间戳显示
 * @param {Number} timestamp
 */
function datetime (timestamp, format = 'yyyy-MM-dd HH:mm:ss') {
  if (!timestamp) {
    return null
  }
  // 将时间戳统一转成毫秒
  timestamp = parseInt((timestamp + '').padEnd(13, 0))
  const dateTime = new Date(timestamp)
  const o = {
    'M+': dateTime.getMonth() + 1,
    'd+': dateTime.getDate(),
    'H+': dateTime.getHours(),
    'm+': dateTime.getMinutes(),
    's+': dateTime.getSeconds(),
    'q+': Math.floor((dateTime.getMonth() + 3) / 3),
    S: dateTime.getMilliseconds()
  }
  let fmt = format
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 数值比例缩放
 * @param {Number} amount    数值
 * @param {Number} scale     比例
 * @param {Number} precision 精度
 * @param {Boolean} autofix  自动适配千分比展示
 */
function scale (amount, scale = 1) {
  if (!amount && amount !== 0) {
    return null
  }

  return amount * scale
}

/**
 * 精度显示
 * @param {Number} amount    数值
 * @param {Number} precision 精度
 */
function precise (amount, precision = 2) {
  if (!amount && amount !== 0) {
    return null
  }

  return parseFloat(amount).toFixed(precision)
}

/**
 * 百分比显示
 * @param {Number} amount    数值
 * @param {Number} precision 精度
 * @param {Boolean} autofix  自动适配千分比展示
 */
function percent (amount, precision = 2, autofix = false) {
  if (!amount && amount !== 0) {
    return null
  }

  let symbol = '%'
  if (autofix && amount < 0.01) {
    // 千分比显示
    amount = amount * 10
    symbol = '‰'
  }

  amount = parseFloat(amount).toFixed(precision)
  return `${amount}${symbol}`
}

/**
 * 格式化显示金额
 * @param {Number} amount  币值(分)
 * @param {String} symbol  币种/符号
 */
function money (amount, symbol = '￥') {
  if (!amount && amount !== 0) {
    return null
  }

  const display = (amount / 100).toFixed(2)
  return `${symbol} ${display}`
}

/**
 * 格式化显示交易项目金额
 * @param {Object} money 交易项目专用金额结构体
 * @param {Object} model 展示模式['normal', 'amount', 'symbol', 'cent']
 */
function dgMoney (money, model = 'normal') {
  if (!money) {
    return null
  }

  switch (model) {
    case 'amount':
      return money.display || placeholder
    case 'symbol':
      return money.displayWithCur || placeholder
    case 'cent':
      return money.fenValue || placeholder
    case 'normal':
    default:
      return money.currency + ' ' + money.display
  }
}

/**
 * 默认占位符
 * @param {String} value
 * @param {String} defStr 占位符
 */
function placeholder (value, defStr = '---') {
  return value || defStr
}

/**
 * Get value of enum
 * @param {string} name
 * @param {object} enums
 * @param {mixed} defaultVal
 */
function enumVal (name, enums, defaultVal = '') {
  if (Object.prototype.hasOwnProperty.call(enums, name)) {
    const enumVar = enums[name]
    if (enumVar && Object.prototype.hasOwnProperty.call(enumVar, 'value')) {
      return enumVar.value
    }
  }

  return defaultVal
}

/**
 * Get label of enum
 * @param {string} name
 * @param {object} enums
 * @param {mixed} defaultLabel
 */
function enumLabel (name, enums, defaultLabel = '') {
  if (Object.prototype.hasOwnProperty.call(enums, name)) {
    const enumVar = enums[name]
    if (enumVar) {
      return enumVar.label || defaultLabel
    }
  }

  return defaultLabel
}

/**
 * Get enum by name
 * @param {string} name
 * @param {object} enums
 * @param {string} field
 * @param {object} defaultVal
 */
function enumData (name, enums, field, defaultVal = '') {
  if (Object.prototype.hasOwnProperty.call(enums, name)) {
    const enumVar = enums[name]
    if (enumVar && enumVar.data && Object.prototype.hasOwnProperty.call(enumVar.data, field)) {
      return enumVar.data[field]
    }
  }

  return defaultVal
}

/**
 * String to upper
 * @param {string} str
 */
function uppercase (str) {
  if (typeof str === 'string' && str.length) {
    return str.toUpperCase()
  }
  return ''
}

/**
 * String to lower
 * @param {string} str
 */
function lowercase (str) {
  if (typeof str === 'string' && str.length) {
    return str.toLowerCase()
  }
  return ''
}

/**
 * String to capitalize
 * @param {string} str
 */
function capitalize (str) {
  if (typeof str === 'string' && str.length) {
    return str.split(' ').map(w => ucfirst(w)).join(' ')
  }
  return ''
}

/**
 * String to ucfirst
 * @param {string} str
 */
function ucfirst (str) {
  if (typeof str === 'string' && str.length) {
    str = str.toString()
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return ''
}

/**
 * String to ucfirst
 * @param {string} str
 */
function lcfirst (str) {
  if (typeof str === 'string' && str.length) {
    str = str.toString()
    return str.charAt(0).toLowerCase() + str.slice(1)
  }
  return ''
}

/**
 * Array implode
 * @param {string} arr
 * @param {string} delimiter
 * @param {string} defStr
 */
function implode (arr, delimiter = ',', defStr = '---') {
  if (arr && Array.isArray(arr) && arr.length) {
    return arr.join(delimiter)
  }
  return defStr
}

/**
 * get weekday name by code
 * @param {Integer} code
 */
function weekday (code) {
  switch (code) {
    case 1:
      return 'MONDAY'
    case 2:
      return 'TUESDAY'
    case 3:
      return 'WEDNESDAY'
    case 4:
      return 'THURSDAY'
    case 5:
      return 'FRIDAY'
    case 6:
      return 'SATURDAY'
    case 7:
      return 'SUNDAY'
    default:
      return null
  }
}

/**
 * @description: 当时间不是两位数字时，给前边添加一个0
 * @param {*} time
 * @return {*}
 */
function _additional (time) {
  time += ''
  if (time.length !== 2) {
    time = '0' + time
  }
  return time
}

/**
   * @description: 时间戳转换 - 格式化时间
   * @param {*} stamp       时间戳
   * @param {*} needSeconds 是否需要时分秒
   * @return {*}
   */
function dateFilter (stamp, needSeconds = false) {
  if (!stamp) return '\u3000'
  const _d = new Date(stamp)
  let returnText = `${_d.getFullYear()}-${_additional(_d.getMonth() + 1)}-${_additional(_d.getDate())}`

  // 如果需要精确到秒，那么显示24小时制的时间
  if (needSeconds) {
    returnText += ` ${_additional(_d.getHours())}:${_additional(_d.getMinutes())}:${_additional(_d.getSeconds())}`
  }
  return returnText
}

/**
 * @description: 如果值为false，返回一个占位符
 * @param {*} value
 * @return {*}
 */
function nullPlaceholder (value) {
  // 返回一个空白符占位
  return value || '\u3000'
}

/**
 * @description: 支付方式转换 - code 转 中文
 * @param {*} code
 * @param {*} placeholder
 * @return {*}
 */
function paymentTypeFilter (code, placeholder = '---') {
  if (!code) return placeholder
  const matchElement = PAYMENT_TYPE.find(v => v.code === code)
  return matchElement?.label || placeholder
}

/**
 * @description: 订单状态格式化 - code 转 中文
 * @param {*} code
 * @param {*} placeholder
 * @return {*}
 */
function orderStateFilter (code, placeholder = '---') {
  if (!code) return placeholder
  const matchElement = PAYMENT_STATUS.find(v => v.code === code)
  return matchElement?.label || placeholder
}

/**
 * @description: 将数字转换为以K、M、B为单位的字符串
 * @param {*} num
 * @return {*}
 */
function kmb (num) {
  if (!num) return 0
  if (num >= Math.pow(10, 9)) {
    num = `${parseInt((num / Math.pow(10, 9)) * 10) / 10}B`
  } else if (num >= Math.pow(10, 6)) {
    num = `${parseInt((num / Math.pow(10, 6)) * 10) / 10}M`
  } else if (num >= Math.pow(10, 3)) {
    num = `${parseInt((num / Math.pow(10, 3)) * 10) / 10}K`
  }
  return num
}

/**
 * 千分格式化
 * @param {Number} number
 */
function thousandsFmt (number) {
  return (number || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

/**
 * 文本过长省略
 * @param {String} text
 * @param {Number} limit
 */
function ellipsis (text, limit) {
  if (!text) return ''
  if (!limit) {
    limit = 12
  }
  if (text.length > limit) {
    return text.slice(0, limit) + '...'
  }
  return text
}

export default {
  datetime,
  scale,
  precise,
  percent,
  money,
  dgMoney,
  placeholder,
  nullPlaceholder,
  enumVal,
  enumLabel,
  enumData,
  uppercase,
  lowercase,
  capitalize,
  ucfirst,
  lcfirst,
  implode,
  weekday,
  dateFilter,
  paymentTypeFilter,
  orderStateFilter,
  kmb,
  thousandsFmt,
  ellipsis
}
