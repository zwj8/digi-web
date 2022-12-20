import common from '@/i18n/config/common/common.zh'

const combo = {
  title: '套餐',
  sub_title: 'TikTok 广告选品，抓住跨境短视频红利',
  label_device: '可同时使用设备',
  label_ad_limit: 'tiktok 广告数（每日）',
  label_ad_detail_limit: '查看广告详情（每日）',
  label_adver_limit: 'tiktok 广告主数（每日）',
  label_adver_detail_limit: '查看广告主详情（每日）',
  text_contact_consult: '联系咨询',
  text_customize: '定制',
  text_current_version: '当前版本',
  text_question: '常见问题',
  text_other_queation: '其他问题',
  text_contact: '如还有其他问题，请通过邮件或微信方式',
  text_contact_us: '联系我们',
  btn: {
    contact: '立即咨询',
    free_use: '免费试用',
    buy: '立即购买',
    payment: '立即付款',
    renewal: '立即续费',
    confirm: common.btn.confirm,
    cancel: common.btn.cancel
  },
  type: {
    free: '免费版',
    month: '月付',
    season: '季付',
    year: '年付',
    customize: '企业定制版'
  },
  question: {},
  checkout: {},
  cashier: {}
}

// 常见问题
combo.question = {
  question_01: '支持哪些付款方式？是否提供发票？',
  answer_01: '您可以使用微信购买会员，购买完您可以访问订单页面下载支付凭证。',
  question_02: '购买后可以退款吗？',
  answer_02: '我们不提供退款。',
  question_03: '如何升级会员?',
  answer_03: '直接购买更高级的会员版本即可，当前会员剩余时长会按照一 定比例折算成更高级版本的会员时长。',
  question_04: '如何申请企业定制会员?',
  answer_04: '如果你需要与你的组织的其他成员一起使用(超过5人) ，或者你需要更多的数据访问，那么你可以联系我们进行定制，我们将为你定制一个更实惠和有用的定制版本。请将您的请求发送至以下电子邮件: support@digiads.com 或联系微信， 我们将及时回复。'
}

combo.checkout = {
  title: '会员套餐选择',
  sub_title: '订单信息',
  label_account: '充值账号',
  label_selected_combo: '已选会员套餐',
  label_term: '购买时长',
  text_unit_day: common.unit.day,
  label_coupon_code: '优惠码',
  placeholder_coupon_code: '请输入优惠码',
  label_pay_type: '支付方式',
  text_01: '如需其他付款方式，请',
  contact_customer: '联系客服',
  label_discount: '折扣',
  label_price: '价格',
  label_paid: '实付'
}

// 收银台
combo.cashier = {
  text_cashier: '收银台',
  text_richscan: '请使用 [PLACEHOLDER] 扫一扫完成支付',
  label_amount: '支付金额',
  label_order: '订单号',
  label_paid_order: '支付单号',
  text_qr_code_expired: '订单已取消，请点击重新下单。',
  text_countdown: '订单在 [PLACEHOLDER] 内未支付将被取消，请尽快完成支付',
  text_link: '如果没有弹出支付窗口,请点击',
  text_a_title: '跳转支付',
  title_tip: common.title.tip,
  text_create_order: '创建订单',
  text_wait_pay: '等待支付',
  text_pay_confirm: '支付完成',
  unit: {
    min: common.unit.minute,
    sec: common.unit.second
  },
  platform: {
    wechat: common.payment_type.wechat,
    alipay: common.payment_type.alipay,
    paypal: common.payment_type.paypal
  },
  payment_type: {
    wechat: `${common.payment_type.wechat}支付`,
    alipay: `${common.payment_type.alipay}支付`,
    paypal: `${common.payment_type.paypal}支付`
  },
  msg: {
    paid_failed: '支付失败',
    user_refund: '用户已退款',
    order_close: '交易已关闭',
    user_close_order: '订单已取消',
    if_recreate_order: '是否重新下单？',
    cancel_action: '取消操作'
  },
  btn: {
    recreate_order: '重新下单',
    cancel_order: '取消订单'
  }
}

export default combo
