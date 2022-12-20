export const COOKIE_PREFIX = process.env.VUE_APP_COOKIE_PREFIX
export const COOKIE_DOMAIN = process.env.VUE_APP_COOKIE_DOMAIN
export const API_GATEWAY = process.env.VUE_APP_API_GATEWAY
export const ROUTER_BASE = process.env.VUE_APP_ROUTER_BASE
export const HOMEPAGE = process.env.VUE_APP_HOMEPAGE
export const AUTH_GATEWAY = process.env.VUE_APP_AUTH_GATEWAY
export const CALLBACK = process.env.VUE_APP_CALLBACK
export const PERMISSION_GROUP = '/front'
export const APP_KEY = 'DIGIADS-WEB'

// OSS图片前缀
export const OSS_PREFIX = 'https://dk-front.oss-accelerate.aliyuncs.com/'

// 默认语言
export const DEFAULT_LANG = 'zh'

// 根元素字体单位
export const REM_PX = 16

// 课程id (因为目前只有一套课程，没有课程列表，所以先固定写死一个课程ID，ID由后端提供)
export const COURSE_ID = 1

// 收藏组件不同API对应类型字段
export const FAVOR_TYPE = {
  AD: 'TTAD',
  ADVER: 'ADVER'
}

// i18n 占位符 正则匹配
export const I18N_PLACEHOLDER = /\[PLACEHOLDER\]/g

// 前台滚动条样式名
export const FRONT_SCROLL_CLASS = '.front-layout'

export const COOKIE = {
  TOKEN: 'token',
  UID: 'uid',
  AID: 'aid',
  LANG: 'lang',
  LOCATE: 'locate',
  SIDEBAR_COLLAPSE: 'sidebar_collapse',
  NAVBAR_LOCK: 'navbar_lock'
}

export const LS = {
  PREV_PAGE: 'prev_page',
  USER_INFO: 'info',
  DISTR_INFO: 'distrInfo',
  PERMISSION: 'permission',
  COURSE: 'course_index'
}

export const TIME = {
  STORE: {
    // config 默认缓存过期时间(ms) - 12h
    CONFIG_DEFAULT_EXPIRE: 43200000,
    // 权限默认缓存过期时间(ms) - 10min
    PERMISSION_DEFAULT_EXPIRE: 600000,
    // 权限刷新频率限制(ms) - 30s
    PERMISSION_REFRESH_LIMIT: 30000,
    // 课程目录过期时间(ms)
    COURSE_INDEX_EXPIRE: 600000
  },
  COOKIE: {
    // 地区过期时间(ms) - 7天
    LOCATE_EXPIRE: 604800000
  }
}

// 支付状态对应字段名
export const PAY_STATE = {
  // 订单创建
  created: 'CREATED',
  // 已支付
  confirm: 'CONFIRM',
  // 支付失败
  failed: 'FAILED',
  // 交易关闭
  close: 'CLOSED',
  // 已退款
  refund: 'REFUND'
}

export const USER = {
  // 0：可申请，1：申请中，2：已经是分销商
  IS_DISTR: 2,
  // 能进入分销商后台的参数大小 >= TO_DISTR
  TO_DISTR: 1,
  // 默认头像
  DEFAULT_AVATAR: OSS_PREFIX + '/default/default_avatar.png'
}

// 需要特殊判定的页面  - 分销商管理后台
export const DISTR_PATH_PREFIX = '/distr/'
// 需要特殊判定的页面  - 分销商申请，仅有状态为0时可以进入
export const APPLY_DISTR = '/apply/distrbutor'
// 需要特殊判定的页面  - 当状态为1时，仅能查看数据看板页面
export const DISTR_ACCOUNT_CHART = '/distr/account/chart'

export const DISTR_ACTIONS = {
  // 分销商申请，仅有状态为0时可以进入
  STATE_0: ['/apply/distrbutor'],
  // 当状态为1时，仅能查看数据看板页面
  STATE_1: [
    '/distr/account/chart',
    '/distr/account/info'
  ],
  // 当状态为2时，进入分销商所有页面
  STATE_2: [
    '/distr/account/list',
    '/distr/account/detail',
    '/distr/account/info',
    '/distr/payment/commission',
    '/distr/payment/log'
  ]
}

/**
 * 不需要验证权限的资源
 */
export const EXCLUDE_ACTIONS = [
  '/',
  '/callback',
  '/about',
  '/secret/forget',
  '/secret/update',
  '/apply/e-business',
  '/us',
  '/us/',
  '/us/about'
]
