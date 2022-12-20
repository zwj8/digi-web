import Mock from 'mockjs'

export const costTemplate = (cur = 'USD') => {
  return Mock.mock({
    value: '@integer(1, 1000000)',
    'unit|1': ['YUAN', 'FEN'],
    currency: cur,
    'lan|1': LANG,
    display () {
      return this.value / 100 + ''
    }
  })
}

export const apiResult = {
  success: true,
  'errorCode|100000-200000': 100000,
  errorMsg: '',
  warmMsg: 'Mock 模拟的报错信息',
  traceId: /[A-Za-z0-9]{32}/
}

export const listResult = {
  'total|1-1000': 1,
  'pageTotal|1-50': 1
}

export const STATE_LIST = ['IN_REVIEW', 'APPROVAL', 'NEED_MODIFY', 'REJECT']

export const LANG = ['ZH', 'EN', 'AR', 'FR', 'PL', 'DE', 'ES', 'IT', 'NL', 'EL', 'CS', 'SV', 'PT', 'HU', 'DA', 'FI', 'NO', 'SK', 'HR', 'SL', 'HE', 'RU']

export const CUR = ['CNY', 'USD', 'SAR', 'EUR', 'KWD', 'AED', 'AUD', 'BDT', 'BGN', 'BHD', 'CAD', 'CHF', 'DKK', 'EGP', 'GBP', 'GHS', 'HUF', 'IDR', 'INR', 'JOD', 'KES', 'LKR', 'MAD', 'MUR', 'MYR', 'NGN', 'OMR', 'PHP', 'PLN', 'QAR', 'RON', 'SEK', 'SGD', 'SZL', 'THB', 'TRY', 'VND', 'XOF', 'ZAR', 'ZMW', 'LBP', 'YER', 'IQD', 'HKD', 'CZK', 'NOK', 'HRK', 'ALL', 'BRL', 'ILS', 'RUB', 'MXN', 'DZD', 'TND', 'AOA', 'XCD', 'ARS', 'AMD', 'AWG', 'AZM', 'BSD', 'BBD', 'BYN', 'BZD', 'BMD', 'BTN', 'BOB', 'BAM', 'BWP', 'BND', 'BIF', 'KHR', 'XAF', 'CVE', 'KYD', 'CLP', 'RMB', 'COP', 'CDF', 'CRC', 'CUP', 'DJF', 'DOP', 'ERN', 'ETB', 'FJD', 'XPF', 'GMD', 'GEL', 'GIP', 'GTQ', 'GNF', 'GYD', 'HTG', 'HNL', 'ISK', 'JMD', 'JPY', 'KZT', 'KRW', 'KGS', 'LAK', 'LSL', 'LRD', 'LYD', 'MOP', 'MGA', 'MWK', 'MVR', 'MRO', 'MDL', 'MNT', 'MZM', 'NAD', 'NPR', 'NZD', 'NIO', 'PKR', 'PAB', 'PGK', 'PYG', 'PEN', 'ROL', 'RWF', 'ANG', 'WST', 'STD', 'SCR', 'SLL', 'SBD', 'SRG', 'TWD', 'TJS', 'TZS', 'TOP', 'TTD', 'TMT', 'UGX', 'UAH', 'UYU', 'UZS', 'VUV', 'VEB', 'ZMK', 'ZWD']

export const PAY_STATE = ['CREATED', 'PAID', 'IN_REVIEW', 'FINISHED', 'CLOSED']

export const PAY_STATE_LABEL = {
  CREATED: '待支付',
  PAID: '已支付',
  IN_REVIEW: '审核中',
  FINISHED: '已生效',
  CLOSED: '已取消'
}
