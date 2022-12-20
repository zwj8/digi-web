import modules from './enConfig'
import common from './common/common.en'
import combo from './enConfig/global/combo'
const en = {
  ...modules
}

// 组件
en.components = {}
// 搜索组件
en.components.search = {
  label_auto_sort: 'Ranking',
  label_show: 'Sort',
  label_type: 'Category',
  label_page: 'Paging',
  label_basic: 'Basis',
  label_data: 'Metrics',
  label_date: 'Time',
  search_info: 'Ad info',
  search_desc: 'Ad copy',
  search_adver: 'Advertiser',
  search_land: 'Land Page URL',
  sort_last_time: 'Last found time',
  sort_first_time: 'First found time',
  sort_ad_show: common.search.ad_show,
  sort_put_days: common.search.put_days,
  sort_hot: common.search.hot,
  sort_ad_total: 'Total ads',
  palcaholder_date: 'Time',
  placeholder_ad_show: common.search.ad_show,
  placeholder_digg: 'Likes',
  placeholder_hot: common.search.hot,
  placeholder_put_days: common.search.put_days,
  placeholder_keyword: common.placeholder.keyword,
  placeholder_first_start: 'First Found Starting Date',
  placeholder_first_end: 'First Found Ending Date',
  placeholder_last_start: 'Last Found Starting Date',
  placeholder_last_end: 'Last Found Ending Date',
  first_start: 'First start',
  first_end: 'First end',
  last_start: 'Last start',
  last_end: 'Last end',
  last_7: 'Last 7 days',
  last_30: 'Last 30 days',
  last_90: 'Last 90 days',
  exclude_ad: 'Exclude Browsed Ads',
  placeholder_region: 'Country/region',
  placeholder_ad_btn: 'CTA Button',
  placeholder_site: 'Site System',
  placeholder_ad_total: 'Number of ads',
  placeholder_ad_type: 'Ad Type',
  placeholder_land_page: 'Landing Page',
  placeholder_header_keyword: 'Search DigiAds',
  option_ad_type_1: 'Brand',
  option_ad_type_0: 'No Brand',
  option_land_page_1: 'Landing Page',
  option_land_page_0: 'No Landing Page'
}
// Favorite component
en.components.favor = {
  label_select_group: 'Select group',
  btn_new_group: '+ New group',
  btn_del_group: '- Delete group',
  btn_new_group_done: 'New completion',
  btn_del_group_done: 'Delete completion',
  brn_change_group: 'Change group',
  btn_cancel_favor: 'Cancel favorite',
  btn_collect: common.btn.collect,
  placeholder_group: 'Please enter the group name',
  msg_del_success: common.message.del_success,
  msg_add_success: 'Favorite successfully. ',
  msg_cancel_success: 'Cancel favorite'
}
// search count limit component
en.components.limit = {
  text_auth_01: 'No permissions to view, please upgrade your membership,',
  text_auth_02: 'Upgrade your membership now to get more times. ',
  btn_level_up: 'Membership upgrade',
  btn_continue: 'Continue',
  title: common.title.tip
}
// contact us
en.components.contact_us = {
  title: 'Contact customer service',
  customer_serivce: common.customer_serivce
}

// foreground navigation
en.nav = {
  tt_ad: 'TikTok ad',
  tt_ad_search: 'TikTok ad search',
  adver_rank: 'Advertiser ranking list',
  collect: common.btn.collect,
  combo: 'Package',
  course: 'Course',
  scheme: 'All-in-one solution',
  cp_free_browser: 'Cp free browser',
  account_apply: 'Advertising account creation',
  e_business_apply: 'E-commerce initiation',
  logistics_apply: 'Logistics application',
  distr_apply: 'Service provider application',
  distr_management: 'Distribution management backend',
  about: 'About us'
}

// avatar label and dropdown menu
en.avatar = {
  tag_vip: 'VIP',
  tag_free: 'Free',
  personal_center: 'Personal center',
  update_secret: common.update_secret,
  logout: common.logout
}

// footer
en.footer = {
  logo_bottom: 'One-click Monetization of TikTok Blue Ocean',
  contact_us: common.contact_us,
  address: common.info.address,
  email: common.info.email,
  wechat: common.info.wechat
}

// 登录、注册页、忘记密码、修改密码
en.auth = {
  email: common.info.email,
  secret: common.secret,
  placeholder_email: common.placeholder.email,
  placeholder_secret: common.placeholder.secret,
  confirm_secret: 'Confirm password',
  placeholder_confirm_secret: 'Please re-enter the password',
  login_and_reg: 'Login / Sign Up',
  login: {
    title: 'Login',
    desc: 'Welcome to Digi Ads! ',
    forgot_secret: common.forgot_secret,
    btn_login: 'Login account',
    register: 'Register account',
    not_registered: 'Not registered yet? ',
    success: 'Registration successful. '
  },
  register: {
    title: 'Register',
    desc: 'Sign up quickly, experience TikTok ads product selection, and seize the cross-border EC short video opportunity',
    btn_create: 'Create account',
    contact: 'Contact information',
    placeholder_contact: common.placeholder.phone,
    send_captcha: 'Send verification code',
    placeholder_captcha: common.placeholder.captcha,
    msg_captcha: 'The verification code has been sent, please check it. ',
    agree_tips: 'By registration you have read and agreed to digiads.com',
    msg_agree: common.message.need_agreement,
    service_agreement: common.service_agreement,
    privacy_clause: common.privacy_clause,
    and: 'and',
    has_account: 'Already have an account? ',
    to_login: 'Login',
    customer_serivce: common.customer_serivce
  },
  forgot: {
    title: 'Password reset',
    desc: 'Enter your registered email address and we will send you an email with your username and a link to set your password. ',
    btn_send: 'Send',
    msg_send: 'The mail has been sent, please check it. ',
    reseted_title: 'Reset password complete! ',
    success: 'The setup is complete, please return to the login page to log in again. ',
    email_captcha: 'Email verification code',
    placeholder_email_captcha: 'Please enter the email verification code',
    btn_confirm: common.btn.confirm,
    msg_invalid_operation: common.message.invalid_operation
  }
}

// form validation
en.valid = {
  email_required: 'Please enter the email address',
  email_type_error: common.valid.email_error,
  secret_required: 'Please enter the password',
  confirm_secret_required: 'Please enter the password again',
  confirm_secret_error: 'The passwords you entered do not match',
  agreement_required: 'Please agree to the terms first',
  phone_required: 'Please enter the phone number',
  phone_error: common.valid.phone_error,
  phone_null: 'The phone number cannot be empty',
  email_captcha_required: 'Please enter the email verification code'
}

// video card component
en.video_card = {
  btn_ad_detail: 'Ad details',
  btn_adver_detail: 'Advertiser details',
  btn_view_more: 'View more',
  label_count_ad: 'Ad Display',
  label_count_day: 'Running days',
  label_count_hot: 'Hot'
}

// TikTok ad related
en.ttad = {
  btn_reset_options: 'Reset Filters',
  btn_confirm: common.btn.confirm,
  no_data: common.no_data,
  adver_analysis: 'Advertiser analysis',
  label_rank: 'Rank',
  label_adver: 'Advertiser',
  label_ad_total: 'Number of ads',
  label_ad_show: 'Impressions',
  label_put_day: 'Running days',
  label_hot: 'Hot',
  label_consumption: 'Cost',
  label_estimate_orders: 'Conversion',
  label_digg_rate: 'Like ratio',
  label_put_date: 'Running time',
  label_put_region: 'Target country/region',
  label_new: 'Latest material',
  label_handle: 'Operation',
  label_video_detail_no_data: 'No data',
  label_ad_text: 'Ad copy',
  label_video_text: 'Video copy',
  label_collect: common.btn.collect,
  label_region: 'Country/Region',
  label_put_time: 'Release time',
  label_first_start: en.components.search.placeholder_first_start,
  label_last_end: en.components.search.placeholder_last_end,
  label_first_last_date: 'First/last found time',
  label_title: 'Ad name',
  label_device: 'Device',
  label_type: 'Type',
  label_btn_text: 'CTA Button',
  label_orginal: 'Original post',
  label_land_page: 'Landing page',
  label_avder: 'Advertiser',
  btn_share: 'Share',
  btn_tiktok: 'View with TikTok',
  btn_phone: 'View with mobile phones',
  btn_detail: 'View details',
  btn_dowmload: 'Download video',
  btn_adver_detail: 'View advertisers',
  label_ad_data: 'Ad data',
  label_ad_effect: 'Ad result',
  data_is_go: 'Data lost',
  label_adver_domain: 'Advertiser domain name',
  label_ad_fodder: 'Creative',
  limit_text: 'For more content, please',
  limit_level_up: 'upgrade membership'
}

// 收藏页面
en.collect = {
  nav_ttad: 'Video favorite',
  nav_adver: 'Advertiser favorite',
  placeholder_content: common.placeholder.content,
  text_group: 'Group',
  btn_new_group: en.components.favor.btn_new_group,
  btn_del_group: en.components.favor.btn_del_group,
  btn_new_group_done: en.components.favor.btn_new_group_done,
  btn_del_group_done: en.components.favor.btn_del_group_done,
  placeholder_group: en.components.favor.placeholder_group,
  text_no_data: common.no_data,
  msg_del_success: common.message.del_success
}

// personal center
en.personal = {
  label_account_id: 'Account ID',
  label_Expire_date: 'Membership expire date',
  label_free: 'Free version',
  nav_account: 'My account',
  nav_order: 'My order',
  account: {
    title: 'Personal Center',
    label_company_name: 'Company name',
    placeholder_label_company_name: 'Please enter the company name',
    label_email: common.info.email,
    placeholder_label_email: common.placeholder.email,
    label_username: 'Username',
    placeholder_label_username: 'Please enter a username',
    label_nick: 'nickname',
    placeholder_nick: 'Please enter a nickname',
    label_anncout_password: 'Account password',
    label_phone: common.info.phone,
    placeholder_label_phone: common.placeholder.phone,
    btn_save: common.btn.save,
    btn_change_secret: common.update_secret,
    label_login_title: 'Login Status',
    text_max_pc_01: 'The current version at the same time can only be used on',
    text_max_pc_02: 'computer(s)',
    label_combo_title: 'Package information',
    label_combo_sub_title: 'Membership package usage status',
    label_project: 'Project',
    label_data: 'data',
    label_available_title: 'Package valid time',
    label_device_limit: 'Device limit number',
    label_ad_search_limit: 'Number of ad queries',
    label_ad_detail_limit: 'Number of ad details',
    label_adver_search_limit: 'Number of advertiser\'s query times',
    label_adver_detail_limit: 'Number of advertiser\'s ad details times',
    text_more_limit: 'If you want obtain more usage, you can click',
    btn_level_up: 'Upgrade membership version',
    msg_save_success: common.message.save_success,
    label_first_name: 'First Name',
    label_last_name: 'Last Name',
    label_country: 'Country',
    label_industry: 'Industry',
    label_login: 'Login',
    label_login_information: 'The current version can only be used by 2 computers at the same',
    label_id: 'ID',
    label_ip: 'IP',
    label_device_information: 'Device Information',
    label_login_time: 'Login time',
    lable_current_device_or_not: 'Current device or not',
    lable_unbinding: 'Unbinding',
    lable_member_function: 'Member function',
    label_times_per_mounth: 'Times per month',
    label_recharge_times: 'Recharge times',
    label_user: 'User',
    lable_Dashboard_access: 'Dashboard access',
    label_Ads_View: 'Ads View',
    label_Posts_details: 'Posts details',
    label_Advertisers: 'Advertisers',
    label_Advertisers_details: 'Advertisers details',
    label_Downloadable_data: 'Downloadable data'
  },
  order: {
    title: 'Order information',
    label_order_id: 'Order number',
    label_combo: 'Package',
    label_paid_date: 'Payment time',
    label_order_state: 'Order status',
    label_paid_type: 'Payment method',
    label_action: 'Operation',
    no_data: common.no_data
  },
  btn: {
    continue_pay: 'Continue payment',
    cancel_order: combo.cashier.btn.cancel_order
  },
  msg: {
    close_order: combo.cashier.msg.user_close_order
  }
}

// about us
en.about = {
  text_title: 'About Us',
  text_sub_title: 'About Us',
  text_desc: 'DigiAds is committed to leverage massive amount of data to enable accurate analysis, to drastically improve industry\'s efficiency of ad materials optimization, product selection and ad investment, and to help businesses better understand overseas local markets and familiarize with short video strategies. The all-in-one TikTok cross-border e-commerce solution constructed with the hard power, plus with various resources (traffic, tools, site creation, payment, etc.) from soft power together makes every overseas business possible.',
  text_bottom_title: 'Join Now And Start A Cross-Border Journey !',
  text_bottom_sub_title: 'Join now and start a cross-border journey! ',
  btn_free: 'Free trial'
}

// copy
en.copy = {
  btn: 'Copy',
  success: 'Copy completed',
  failed: 'Copy failed',
  share: 'Share link'
}

en.chore = {
  to: 'to',
  unit: '',
  page: ''
}

export default en
