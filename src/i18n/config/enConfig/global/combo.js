import common from '@/i18n/config/common/common.en'

const combo = {
  title: 'Package',
  sub_title: 'TikTok ads product selection, seize the cross-border short video opportunity',
  label_device: 'Multiple devices available',
  label_ad_limit: 'Number of TikTok ads (daily)',
  label_ad_detail_limit: 'View ad details (daily)',
  label_adver_limit: 'Number of TikTok advertisers (daily)',
  label_adver_detail_limit: 'View advertiser details (daily)',
  text_contact_consult: 'Contact and Consult',
  text_customize: 'Customize',
  text_current_version: 'Current version',
  text_question: 'FAQ',
  text_other_queation: 'Other questions',
  text_contact: 'For any other questions, please reach out to us via email or WeChat',
  text_contact_us: 'Contact us',
  btn: {
    contact: 'Consult now',
    free_use: 'Free trial',
    buy: 'Buy now',
    payment: 'Pay now',
    renewal: 'Renew now',
    confirm: common.btn.confirm,
    cancel: common.btn.cancel
  },
  type: {
    free: 'Free Version',
    month: 'Monthly Payment',
    season: 'Quarterly Payment',
    year: 'Annual Payment',
    customize: 'Enterprise Customized Version'
  },
  question: {},
  checkout: {},
  cashier: {}
}

// common problem
combo.question = {
  question_01: 'Which payment methods are accepted? Do you provide the invoices? ',
  answer_01: 'You can use WeChat to purchase membership. After purchasing, you can visit the order page to download the payment invoice. ',
  question_02: 'Can I get a refund after purchasing? ',
  answer_02: 'We do not provide any refund. ',
  question_03: 'How to upgrade membership?',
  answer_03: 'You can directly purchase the higher level membership. The remaining time of your current membership will be converted to time and added to the advanced membership version.',
  question_04: 'How to apply for a customized corporate membership?',
  answer_04: 'If you and your team members (more than 5 people) need access, or you need more data, then you can contact us for request. We will provide a more affordable and useful customization solution catering to your needs. Please send your request to the following email: support@digiads.com or contact us via WeChat, and we will respond promptly. '
}

combo.checkout = {
  title: 'Membership Package Options',
  sub_title: 'Order Information',
  label_account: 'Recharge account',
  label_selected_combo: 'Selected membership package',
  label_term: 'Purchase duration',
  text_unit_day: common.unit.day,
  label_coupon_code: 'Coupon code',
  placeholder_coupon_code: 'Please enter the coupon code',
  label_pay_type: 'Payment method',
  text_01: 'For other payment methods, please',
  contact_customer: 'contact customer service',
  label_discount: 'Discount',
  label_price: 'Price',
  label_paid: 'Actually paid'
}

// checkout counter
combo.cashier = {
  text_cashier: 'Cashier',
  text_richscan: 'Please use [PLACEHOLDER] to scan to complete the payment',
  label_amount: 'Payment amount',
  label_order: 'Order number',
  label_paid_order: 'Payment order number',
  text_qr_code_expired: 'The order has been cancelled, please click to place a new order. ',
  text_countdown: 'Orders that are not paid within [PLACEHOLDER] will be cancelled, please complete the payment as soon as possible',
  text_link: 'If no payment window pops up, please click',
  text_a_title: 'Jump to payment',
  title_tip: common.title.tip,
  text_create_order: 'Create order',
  text_wait_pay: 'Waiting for payment',
  text_pay_confirm: 'Payment complete',
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
    wechat: `${common.payment_type.wechat} payment`,
    alipay: `${common.payment_type.alipay} payment`,
    paypal: `${common.payment_type.paypal} payment`
  },
  msg: {
    paid_failed: 'Payment failed',
    user_refund: 'The user has been refunded',
    order_close: 'The transaction has been closed',
    user_close_order: 'The order has been cancelled',
    if_recreate_order: 'Do you want to place a new order? ',
    cancel_action: 'Cancel the operation'
  },
  btn: {
    recreate_order: 'Re-order',
    cancel_order: 'Cancel order'
  }
}

export default combo
