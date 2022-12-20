import common from '@/i18n/config/common/common.en'
const chart = {
  text_title: 'My business',
  label_link: 'My invitation link',
  text_link: 'Share this link and recommend it to others to get a commission for any subscription. ',
  text_tip: 'If you need to track the performance of your promotion channels or your promotion staff, you can create invitation links with UTM parameters and distribute them to track data through the data dashboard. ',
  btn: {},
  table: {},
  confirm: {},
  msg: {},
  desc: {},
  chart: {},
  verify: {}
}

// button
chart.btn = {
  new_partner: common.btn.new_partner,
  edit: common.btn.edit,
  delete_link: 'Delete link',
  copy_link: 'Copy link',
  setting: 'Go to settings'
}
// sheet
chart.table = {
  label_duid: 'DUID',
  label_company: 'Company name',
  label_link: 'Invitation link',
  label_status: 'Account status',
  label_action: common.label.action
}

// confirm popup
chart.confirm = {
  text_tip: 'Are you sure to delete this partner? ',
  text_title: 'Tips',
  btn_confitm: common.btn.confirm,
  btn_close: common.btn.close
}

// prompt message
chart.msg = {
  del_success: common.message.del_success
}

// Partner service fee description
chart.desc = {
  title: 'Partner service fee description',
  sub_title_01: 'Service Fee Policy',
  sub_title_02: 'Service fee calculation and payment',
  scale: 'a certain percentage',
  p_01: 'The calculation and finalization rules of partner account service fee are subject to the latest announcement or notification issued by Dongkun DigiAds partner business team to partners via email;',
  p_02: 'Dongkun DigiAds reserves the right to adjust the service fee policy according to market conditions. All are subject to the official notice of Dongkun DigiAds. ',
  p_03: 'When the partner agreement is terminated, the partner will no longer be qualified to the conditions for obtaining the service fee and will obtain any service fee. ',
  p_04: 'From the date when the partner and Dongkun DigiAds partner business team sign the cooperation agreement, the last business day of each quarter is the time for calculating business performance of last quarter. The service fee is the [PLACEHOLDER] of the actual Dongkun DigiAds products payments attributed to the partner and associated accounts. Dongkun DigiAds will notify partners of the service fee amount by means of platform message or email (referred to as "online notification").',
  p_05: 'Partners should mail out the corresponding invoices within [PLACEHOLDER] business days after receiving various online notifications from Dongkun DigiAds. After receiving legal and valid invoices, Dongkun DigiAds will pay the corresponding amount of service fee to the corporate bank account provided by the partner. It is emphasized here that the premise of Dongkun DigiAds paying the service fee is to receive the legal and valid invoices. '
}

// graph
chart.chart = {
  title: 'Overall Data Dashboard',
  up_to_now: 'Up to date',
  remaining_time: 'The data of the current cycle will be reset to zero in [PLACEHOLDER] days ([PLACEHOLDER] UTC+[PLACEHOLDER]). ',
  register_month: 'Monthly registrations',
  paid_month: 'Monthly paid number',
  commission_month: 'Monthly Commission',
  number: 'Number',
  amount: 'Amount',
  current_period_total: 'Current cycle total'
}

// pending review
chart.verify = {
  title: 'Information is under review',
  tip_01: 'It will take 3 business days to complete the review',
  tip_02: 'You can check more after the review is processed',
  customer_serivce: common.customer_serivce
}

export default chart
