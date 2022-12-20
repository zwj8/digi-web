import common from '@/i18n/config/common/common.zh'
const chart = {
  text_title: '我的企业',
  label_link: '我的邀请链接',
  text_link: '分享此链接并向他人推荐以获取订阅费返佣。',
  text_tip: '如果您需要追踪不同推广渠道的引流效果、或追踪不同推广人员的推广绩效，可前往创建带 UTM 参数的邀请链接并分发出去，通过邀请链接数据看板进行追踪。',
  btn: {},
  table: {},
  confirm: {},
  msg: {},
  desc: {},
  chart: {},
  verify: {}
}

// 按钮
chart.btn = {
  new_partner: common.btn.new_partner,
  edit: common.btn.edit,
  delete_link: '删除链接',
  copy_link: '复制链接',
  setting: '前往设置'
}
// 表格
chart.table = {
  label_duid: 'DUID',
  label_company: '企业名称',
  label_link: '邀请链接',
  label_status: '账号状态',
  label_action: common.label.action
}

// confirm 弹窗
chart.confirm = {
  text_tip: '确认删除该合作伙伴？',
  text_title: '提示',
  btn_confitm: common.btn.confirm,
  btn_close: common.btn.close
}

// 提示信息
chart.msg = {
  del_success: common.message.del_success
}

// 合作伙伴服务费说明
chart.desc = {
  title: '合作伙伴服务费说明',
  sub_title_01: '服务费政策',
  sub_title_02: '服务费计算及支付',
  scale: '一定比例',
  p_01: '合作伙伴账号服务费计算和结算规则以东坤 DigiAds 通过合作伙伴业务团队通过电子邮件给合作伙伴发布的最新通告或通知为准；',
  p_02: '东坤 DigiAds 有权根据市场情形对服务费政策进行调整，一切以东坤 DigiAds 官方通知为准。',
  p_03: '合作伙伴协议终止，则合作伙伴不再符合取得服务费条件，无法继续获得服务费。',
  p_04: '合作伙伴和东坤 DigiAds 合作伙伴业务团队签署合作协议之日起，每季度的最后一个工作日为统计业绩时间，统计周期为上一个季度。服务费为合作伙伴账号以及关联的合作伙伴用户账号下发生的东坤 DigiAds 产品实付金额消费的[PLACEHOLDER]。东坤 DigiAds 会以平台消息或电子邮件方式（简称“线上通知”方式）通知合作伙伴服务费金额；',
  p_05: '合作伙伴应在收到东坤 DigiAds 的各类线上通知后 [PLACEHOLDER] 个工作日内邮寄出对应金额的发票。在收到合法有效的发票后将对应金额的服务费支付至合作伙伴提供的对公银行账号，在此强调，东坤 DigiAds 支付服务费的前提是收到合法有效的发票。'
}

// 图表
chart.chart = {
  title: '整体数据看板',
  up_to_now: '至今',
  remaining_time: '当前周期的数据将于 [PLACEHOLDER] 天后 ( [PLACEHOLDER] UTC+[PLACEHOLDER]) 重置清零。',
  register_month: '月度注册人数',
  paid_month: '月度付费人数',
  commission_month: '月度佣金',
  number: '人数',
  amount: '金额',
  current_period_total: '当前周期总计'
}

// 待审核
chart.verify = {
  title: '信息正在审核中',
  tip_01: '需要3个工作日内审核完毕',
  tip_02: '审核通过后可查看更多',
  customer_serivce: common.customer_serivce
}

export default chart
