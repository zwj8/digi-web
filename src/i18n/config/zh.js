import modules from './zhConfig'
import common from './common/common.zh'
import combo from './zhConfig/global/combo'
const zh = {
  ...modules
}

// 组件
zh.components = {}
// 搜索组件
zh.components.search = {
  label_auto_sort: '排序',
  label_show: '展示',
  label_type: '分类',
  label_page: '分页',
  label_basic: '基础',
  label_data: '数据',
  label_date: '时间',
  search_info: '广告信息',
  search_desc: '广告文案',
  search_adver: '广告主',
  search_land: '落地页 URL',
  sort_last_time: '最后发现时间',
  sort_first_time: '首次发现时间',
  sort_ad_show: common.search.ad_show,
  sort_put_days: common.search.put_days,
  sort_hot: common.search.hot,
  sort_ad_total: '广告数',
  palcaholder_date: '时间',
  placeholder_ad_show: common.search.ad_show,
  placeholder_digg: '总点赞数',
  placeholder_hot: common.search.hot,
  placeholder_put_days: common.search.put_days,
  placeholder_keyword: common.placeholder.keyword,
  placeholder_first_start: '首次发现开始时间',
  placeholder_first_end: '首次发现结束时间',
  placeholder_last_start: '最后发现开始时间',
  placeholder_last_end: '最后发现结束时间',
  first_start: '首次开始',
  first_end: '首次结束',
  last_start: '最后开始',
  last_end: '最后结束',
  last_7: '最近7天',
  last_30: '最近30天',
  last_90: '最近90天',
  exclude_ad: '排除浏览过的广告',
  placeholder_region: '国家 / 地区',
  placeholder_ad_btn: '广告按钮',
  placeholder_site: '建站系统',
  placeholder_ad_total: '广告数',
  placeholder_ad_type: '广告类型',
  placeholder_land_page: '落地页',
  placeholder_header_keyword: '请输入搜索内容',
  option_ad_type_1: '品牌广告',
  option_ad_type_0: '非品牌广告',
  option_land_page_1: '有落地页',
  option_land_page_0: '无落地页'
}
// 收藏组件
zh.components.favor = {
  label_select_group: '选择分组',
  btn_new_group: '+ 新建分组',
  btn_del_group: '- 删除分组',
  btn_new_group_done: '新建完成',
  btn_del_group_done: '删除完成',
  brn_change_group: '更改分组',
  btn_cancel_favor: '取消收藏',
  btn_collect: common.btn.collect,
  placeholder_group: '请输入分组名',
  msg_del_success: common.message.del_success,
  msg_add_success: '收藏成功。',
  msg_cancel_success: '已取消收藏'
}
// 搜素次数限制组件
zh.components.limit = {
  text_auth_01: '权限不足无法查看，请升级会员，',
  text_auth_02: '立即升级会员版本，获得更多次数。',
  btn_level_up: '升级会员',
  btn_continue: '继续使用',
  title: common.title.tip
}
// 联系我们
zh.components.contact_us = {
  title: '联系后台客服',
  customer_serivce: common.customer_serivce
}

// 前台导航
zh.nav = {
  tt_ad: 'TikTok 广告',
  tt_ad_search: 'TikTok 广告搜索',
  adver_rank: '广告主榜单',
  collect: common.btn.collect,
  combo: '套餐',
  course: '课程',
  scheme: '一站式解决',
  cp_free_browser: 'Cp 免费浏览器',
  account_apply: '广告开户',
  e_business_apply: '电商启动流程',
  logistics_apply: '物流申请',
  distr_apply: '服务商申请',
  distr_management: '分销管理后台',
  about: '关于我们'
}

// 头像标签与下拉菜单
zh.avatar = {
  tag_vip: 'VIP',
  tag_free: '免费',
  personal_center: '个人中心',
  update_secret: common.update_secret,
  logout: common.logout
}

// footer
zh.footer = {
  logo_bottom: '一键掘金 TikTok 蓝海',
  contact_us: common.contact_us,
  address: common.info.address,
  email: common.info.email,
  wechat: common.info.wechat
}

// 登录、注册页、忘记密码、修改密码
zh.auth = {
  email: common.info.email,
  secret: common.secret,
  placeholder_email: common.placeholder.email,
  placeholder_secret: common.placeholder.secret,
  confirm_secret: '确认密码',
  placeholder_confirm_secret: '请再次输入密码',
  login_and_reg: '登录 / 注册',
  login: {
    title: '登陆',
    desc: '欢迎来到 Digi Ads！',
    forgot_secret: common.forgot_secret,
    btn_login: '登陆账号',
    register: '注册账号',
    not_registered: '还没有注册账号？',
    success: '注册成功。'
  },
  register: {
    title: '注册',
    desc: '快速注册，体验 TikTok 广告选品，抓住跨境短视频红利',
    btn_create: '创建账户',
    contact: '联系方式',
    placeholder_contact: common.placeholder.phone,
    send_captcha: '发送验证码',
    placeholder_captcha: common.placeholder.captcha,
    msg_captcha: '验证码已发送，请注意查收。',
    agree_tips: '通过注册代表您已阅读和同意 digiads.com 的',
    msg_agree: common.message.need_agreement,
    service_agreement: common.service_agreement,
    privacy_clause: common.privacy_clause,
    and: '和',
    has_account: '已经有账号了？',
    to_login: '直接登陆',
    customer_serivce: common.customer_serivce
  },
  forgot: {
    title: '密码重置',
    desc: '输入您注册的电子邮箱地址，我们会给您发送一封邮件，其中包含您的用户名和一个链接来设置您的密码。',
    btn_send: '发送',
    msg_send: '邮件已发送，请注意查收。',
    reseted_title: '重置密码完成！',
    success: '已设置完成，请返回登陆页面重新登陆。',
    email_captcha: '邮箱验证码',
    placeholder_email_captcha: '请输入邮箱验证码',
    btn_confirm: common.btn.confirm,
    msg_invalid_operation: common.message.invalid_operation
  }
}

// 表单验证
zh.valid = {
  email_required: '请输入邮箱',
  email_type_error: common.valid.email_error,
  secret_required: '请输入密码',
  confirm_secret_required: '请再次输入密码',
  confirm_secret_error: '两次输入密码不一致',
  agreement_required: '请先同意条款',
  phone_required: '请输入手机号',
  phone_error: common.valid.phone_error,
  phone_null: '手机号不能为空',
  email_captcha_required: '请输入邮箱验证码'
}

// 视频card组件
zh.video_card = {
  btn_ad_detail: '广告详情',
  btn_adver_detail: '广告主详情',
  btn_view_more: '查看更多',
  label_count_ad: '广告展示',
  label_count_day: '投放天数',
  label_count_hot: '热度'
}

// TikTok广告相关
zh.ttad = {
  btn_reset_options: '重置所有筛选条件',
  btn_confirm: common.btn.confirm,
  no_data: common.no_data,
  adver_analysis: '广告主分析',
  label_rank: '排名',
  label_adver: '广告主',
  label_ad_total: '广告数',
  label_ad_show: '广告展现',
  label_put_day: '投放天数',
  label_hot: '热度',
  label_consumption: '花费',
  label_estimate_orders: '转化',
  label_digg_rate: '点赞比',
  label_put_date: '投放时间',
  label_put_region: '投放国家/地区',
  label_new: '最新素材',
  label_handle: '操作',
  label_video_detail_no_data: '暂无数据',
  label_ad_text: '广告文案',
  label_video_text: '视频文案',
  label_collect: common.btn.collect,
  label_region: '国家/地区',
  label_put_time: '发布时间',
  label_first_start: zh.components.search.placeholder_first_start,
  label_last_end: zh.components.search.placeholder_last_end,
  label_first_last_date: '首次/末次发现时间',
  label_title: '广告名称',
  label_device: '设备',
  label_type: '类型',
  label_btn_text: '广告按钮',
  label_orginal: '原帖子',
  label_land_page: '落地页',
  label_avder: '广告主',
  btn_share: '分享',
  btn_tiktok: '使用TikTok查看',
  btn_phone: '使用手机查看',
  btn_detail: '查看详情',
  btn_dowmload: '下载视频',
  btn_adver_detail: '查看广告主',
  label_ad_data: '广告数据',
  label_ad_effect: '广告效果',
  data_is_go: '数据走丢了',
  label_adver_domain: '广告主根域名',
  label_ad_fodder: '广告素材',
  limit_text: '如需查看更多内容，请',
  limit_level_up: '升级会员'
}

// 收藏页面
zh.collect = {
  nav_ttad: '视频收藏',
  nav_adver: '广告主收藏',
  placeholder_content: common.placeholder.content,
  text_group: '分组',
  btn_new_group: zh.components.favor.btn_new_group,
  btn_del_group: zh.components.favor.btn_del_group,
  btn_new_group_done: zh.components.favor.btn_new_group_done,
  btn_del_group_done: zh.components.favor.btn_del_group_done,
  placeholder_group: zh.components.favor.placeholder_group,
  text_no_data: common.no_data,
  msg_del_success: common.message.del_success
}

// 个人中心
zh.personal = {
  label_account_id: '账户ID',
  label_Expire_date: '会员到期时间',
  label_free: '免费版',
  nav_account: '我的账号',
  nav_order: '我的订单',
  account: {
    title: '个人中心',
    label_company_name: '公司名称',
    placeholder_label_company_name: '请输入公司名称',
    label_email: common.info.email,
    placeholder_label_email: common.placeholder.email,
    label_username: '用户名',
    placeholder_label_username: '请输入用户名',
    label_nick: '昵称',
    placeholder_nick: '请输入昵称',
    label_anncout_password: '账号密码',
    label_phone: common.info.phone,
    placeholder_label_phone: common.placeholder.phone,
    btn_save: common.btn.save,
    btn_change_secret: common.update_secret,
    label_login_title: '登陆情况',
    text_max_pc_01: '当前版本最多仅可同时',
    text_max_pc_02: '台电脑使用',
    label_combo_title: '套餐信息',
    label_combo_sub_title: '会员套餐使用情况',
    label_project: '项目',
    label_data: '数据',
    label_available_title: '套餐有效时间',
    label_device_limit: '设备限制数量',
    label_ad_search_limit: '广告查询次数',
    label_ad_detail_limit: '广告详情次数',
    label_adver_search_limit: '广告主查询次数',
    label_adver_detail_limit: '广告主详情次数',
    text_more_limit: '如果您期望获得更多使用次数，可以点击',
    btn_level_up: '升级会员版本',
    msg_save_success: common.message.save_success,
    label_first_name: '名字',
    label_last_name: '姓氏',
    label_country: '国家',
    label_industry: '行业',
    label_login: '登录信息',
    label_login_information: 'The current version can only be used by 2 computers at the same',
    label_id: 'ID',
    label_ip: 'IP',
    label_device_information: '设备信息',
    label_login_time: '登录时间',
    lable_current_device_or_not: 'Current device or not',
    lable_unbinding: 'Unbinding',
    lable_member_function: 'Member function',
    label_times_per_mounth: '次/月',
    label_recharge_times: 'Recharge times',
    label_user: 'User',
    lable_Dashboard_access: '数据看板接口',
    label_Ads_View: '广告观看量',
    label_Posts_details: '发布详情',
    label_Advertisers: '广告主',
    label_Advertisers_details: '广告主详情',
    label_Downloadable_data: '可下载数据'
  },
  order: {
    title: '订单情况',
    label_order_id: '订单号',
    label_combo: '套餐',
    label_paid_date: '支付时间',
    label_order_state: '订单状态',
    label_paid_type: '支付方式',
    label_action: '操作',
    no_data: common.no_data
  },
  btn: {
    continue_pay: '继续支付',
    cancel_order: combo.cashier.btn.cancel_order
  },
  msg: {
    close_order: combo.cashier.msg.user_close_order
  }
}

// 关于我们
zh.about = {
  text_title: 'About Us',
  text_sub_title: '关于我们',
  text_desc: 'DigiAds致力于海量数据提供精准分析，对素材优化、产品筛选和广告投放大大提升行业效率，使商家更了解海外当地市场，熟悉短视频投放玩儿法。通过硬实力构建一站TikTok跨境出海方案，整合流量、工具、建站、支付多方资源的运营软实力，成就每一种出海可能。',
  text_bottom_title: 'Join Now And Start A Cross-Border Journey !',
  text_bottom_sub_title: '立即加入，开启跨境之旅！',
  btn_free: '免费试用'
}

// 复制
zh.copy = {
  btn: '复制',
  success: '复制完成',
  failed: '复制失败',
  share: '分享链接'
}

zh.chore = {
  to: '至',
  unit: '个',
  page: '页'
}

export default zh
