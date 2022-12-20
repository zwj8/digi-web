import { OSS_PREFIX } from './index.js'
// 支付状态
export const PAYMENT_STATUS = [
  { code: 'CREATED', label: '待支付' },
  { code: 'PAID', label: '已支付' },
  { code: 'FINISHED', label: '已生效' },
  { code: 'CLOSED', label: '已关闭' }
]

// 支付类型
export const PAYMENT_TYPE = [
  { code: 'WECHATPAY', label: '微信支付' },
  { code: 'ALIPAY', label: '支付宝支付' },
  { code: 'AWX_ALIPAY', label: '支付宝支付' },
  { code: 'PAYPAL', label: 'PayPal支付' }
]

// 多语言选项
export const I18N_OPTIONS = [
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' }
]

// TT广告搜索 - 自动排序
export const TT_SORT = [
  {
    label: 'components.search.sort_last_time',
    needI18n: true,
    value: 'LAST_PUT_TIME',
    code: 'LAST_PUT_TIME'
  },
  {
    label: 'components.search.sort_first_time',
    needI18n: true,
    value: 'FIRST_PUT_TIME',
    code: 'FIRST_PUT_TIME'
  },
  {
    label: 'components.search.sort_ad_show',
    needI18n: true,
    value: 'PLAY_TIME',
    code: 'PLAY_TIME'
  },
  {
    label: 'components.search.sort_put_days',
    needI18n: true,
    value: 'PUT_DAY',
    code: 'PUT_DAY'
  },
  {
    label: 'components.search.sort_hot',
    needI18n: true,
    value: 'HOT',
    code: 'HOT'
  }
]

// 广告主搜索 - 自动排序
export const AVDER_SORT = [
  {
    label: 'components.search.sort_ad_show',
    needI18n: true,
    value: 'PLAY_TIME',
    code: 'PLAY_TIME'
  },
  {
    label: 'components.search.sort_put_days',
    needI18n: true,
    value: 'PUT_DAY',
    code: 'PUT_DAY'
  },
  {
    label: 'components.search.sort_hot',
    needI18n: true,
    value: 'HOT',
    code: 'HOT'
  },
  {
    label: 'components.search.sort_ad_total',
    needI18n: true,
    value: 'AD_TOTAL',
    code: 'AD_TOTAL'
  }
]

// 分销商后台导航
export const DISTR_MENU = [
  {
    // 联盟计划
    label: '联盟计划',
    pathName: 'plan',
    children: [
      {
        // 数据看板
        label: '数据看板',
        pathName: 'accountChart'
      },
      {
        // 合作伙伴管理
        label: '合作伙伴管理',
        pathName: 'accountList'
      }
    ]
  },
  {
    // 款项
    label: '款项',
    pathName: 'payment',
    children: [
      {
        // 佣金
        label: '佣金',
        pathName: 'commission'
      },
      {
        // 提现记录
        label: '提现记录',
        pathName: 'log'
      }
    ]
  },
  // 个人信息
  {
    label: '个人信息',
    pathName: 'distrInfo',
    children: [
      {
        // 个人信息
        label: '个人信息',
        pathName: 'distrInfo'
      }
    ]
  }
]

// 友情链接
export const LINK_EXCHANGE = [
  'closphere',
  'adseasy'
]

// 广告分类
export const AD_TYPE = [
  {
    // 其他
    code: 'OTHERS',
    label: 'config.ad_type.other'
  },
  {
    // 电商
    code: 'ECOMMERCE',
    label: 'config.ad_type.ecommerce'
  },
  {
    // 应用
    code: 'APP',
    label: 'config.ad_type.app'
  },
  {
    // 游戏
    code: 'GAME',
    label: 'config.ad_type.game'
  }
]

// 分销商类型
export const DISTR_TYPE = [
  // 渠道经理
  {
    label: 'distr_apply.distr_type.channel_sales',
    code: 'CHANNEL_SALES'
  },
  // 直客销售
  {
    label: 'distr_apply.distr_type.direct_sales',
    code: 'DIRECT_SALES'
  },
  // 一级分销商
  {
    label: 'distr_apply.distr_type.primary',
    code: 'PRIMARY'
  }
]

// 银行卡
const CardForm = {
  wdAccountContact: '', // 收款账号人
  wdCardBank: '',
  cur: 'CNY'
}

// 支付宝
const AlipayForm = {
  wdAccountContact: '', // 收款账号人
  cur: 'CNY'
}

// 微信
const WeChatForm = {
  wdAccountContact: '', // 收款账号人
  cur: 'CNY'
}

// Payoneer
const PayoneerForm = {
  cur: 'USD'
}

// 空中云汇
const AirForm = {
  wdBankNumber: '', // 银行卡号 Bank Account Number
  wdBankCode: '', // 银行代号 Bank Code
  wdBranchCode: '', // 银行分行代码 Branch Code
  wdSwiftCode: '', // SWIFT 代码 SWITF Code
  wdAccountLocation: '', // Account Location
  wdBankName: '', // 银行名称 Bank Name
  wdBankAddr: '', // 银行地址 Bank Address
  wdAwxCity: '', // Airwallex city city
  cur: 'USD'
}

// 支付方式
const paymentType = [
  {
    title: 'distr_apply.payment_type.cur_rmb',
    option: [
      {
        label: 'distr_apply.payment_type.type_card',
        img: `${OSS_PREFIX}pay-tool/yinlian-logo.png`,
        hw: 'height:20px;width:32px;',
        type: 'CARD',
        active: false
      },
      {
        label: 'distr_apply.payment_type.type_wechat',
        img: `${OSS_PREFIX}pay-tool/wechatpay-logo.png`,
        hw: 'height:20px;width:23px;',
        type: 'WECHATPAY',
        active: false
      },
      {
        label: 'distr_apply.payment_type.type_alipay',
        img: `${OSS_PREFIX}pay-tool/alipay-logo.png`,
        hw: 'height:20px;width:20px;',
        type: 'ALIPAY',
        active: false
      }
    ]
  },
  {
    title: 'distr_apply.payment_type.cur_usd',
    option: [
      {
        label: 'distr_apply.payment_type.type_airwallex',
        img: `${OSS_PREFIX}pay-tool/airwallex-logo.png`,
        hw: 'height:20px;width:31px;',
        type: 'AIRWALLEX',
        active: false
      },
      {
        label: 'distr_apply.payment_type.type_payoneer',
        img: `${OSS_PREFIX}pay-tool/paynoeer-logo.png`,
        hw: 'height:20px;width:22px;',
        type: 'PAYONEER',
        active: false
      }
    ]
  }
]

// 收款类型
const typeList = [
  {
    label: 'distr_apply.payment_type.type_card',
    type: 'CARD'
  },
  {
    label: 'distr_apply.payment_type.type_wechat',
    type: 'WECHATPAY'
  },
  {
    label: 'distr_apply.payment_type.type_alipay',
    type: 'ALIPAY'
  },
  {
    label: 'distr_apply.payment_type.type_airwallex',
    type: 'AIRWALLEX'
  },
  {
    label: 'distr_apply.payment_type.type_payoneer',
    type: 'PAYONEER'
  }
]

// 支付方式
export const PAYMENT_MODE = {
  CardForm,
  AlipayForm,
  WeChatForm,
  PayoneerForm,
  AirForm,
  paymentType,
  typeList
}

// 是否品牌广告
export const IS_BRAND = [
  { label: 'components.search.option_ad_type_0', value: 0 },
  { label: 'components.search.option_ad_type_1', value: 1 }
]

// 是否有落地页
export const LAND_PAGE = [
  { label: 'components.search.option_land_page_0', value: 0 },
  { label: 'components.search.option_land_page_1', value: 1 }
]

// 行业
export const INDUSTRY = [
  { label: 'Agency', value: 'Agency' },
  { label: 'CPG', value: 'CPG' },
  { label: 'Financial Services', value: 'Financial Services' },
  { label: 'Media & Entertainment', value: 'Media & Entertainment' },
  { label: 'Pharmaceuticals & Healthcare', value: 'Pharmaceuticals & Healthcare' },
  { label: 'Retail', value: 'Retail' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Other', value: 'Other' },
]
