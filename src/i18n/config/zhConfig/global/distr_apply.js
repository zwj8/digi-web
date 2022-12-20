import common from '@/i18n/config/common/common.zh'
import { recursion } from '@/libs/util.i18n'

const disy = {
  label_business_info: '企业信息',
  label_address: '联系地址',
  label_charge_type: '收款方式',
  text_agreement: '我已阅读并同意',
  text_partnership_agreement: '合作伙伴计划协议',
  msg: {
    allow: common.message.need_agreement,
    apply_success: '申请完成，请等待审核',
    create_success: '新建完成',
    change_success: '修改完成'
  },
  btn: {
    confirm: common.btn.confirm,
    cancel: common.btn.cancel
  },
  valid: {
    required: common.valid.required,
    email_error: common.valid.email_error,
    phone_error: common.valid.phone_error,
    post_code_error: '邮政编码应为纯数字',
    comm_rate: '佣金比例必须为正整数',
    comm_rate_limit: '佣金比例范围为0%~100%'
  },
  form: {},
  placeholder: {},
  payment_type: {}
}

disy.dialog = {
  title_show: '分销商个人信息',
  account_type: '账号类型',
  account: '收款账号',
  create_date: '注册时间',
  updated_date: '更新时间'
}

disy.form = {
  business_name: '企业名称',
  site: '网站（选填）',
  name: '联系人',
  email: '业务邮箱',
  phone: '手机号',
  region: '国家/地区',
  province: '省/市',
  address: '详细地址',
  post_code: '邮政编码',
  distr_type: '申请类型',
  aid: '邀请人 DUID',
  comm_rate: '佣金比例',
  // 银行卡
  card: {
    name: '姓名',
    card_number: '卡号',
    card_bank: '开户行'
  },
  // 微信
  wechat: {
    account: '微信收款账号',
    account_contact: '微信所有人全名'
  },
  // 支付宝
  alipay: {
    account: '支付宝账号',
    account_contact: '账号所有人全名'
  },
  // 空中云汇
  air: {
    account_name: 'Account Name',
    account_number: 'Bank Account Number',
    bank_code: 'Bank Code',
    branch_code: 'Branch Code',
    switf_code: 'SWITF Code',
    account_location: 'Account Location',
    bank_name: 'Bank Name',
    bank_address: 'Bank Address',
    city: 'City'
  },
  // PAYONEER
  payoneer: {
    account: '账户名（邮箱）'
  }
}

// 递归disy.form 获得 disy.placeholder
recursion(disy.form, disy.placeholder, common.placeholder_input_prefix)

// 省/市是 select
disy.placeholder.placeholder_province = common.placeholder_select_prefix + disy.form.province

// 支付类型
disy.payment_type = {
  cur_rmb: '人民币(CNY)',
  cur_usd: '美金(USD)',
  type_card: '银行卡（国内）',
  type_wechat: '微信支付',
  type_alipay: '支付宝支付',
  type_airwallex: '空中云汇',
  type_payoneer: 'Payoneer'
}

// 分销商类型
disy.distr_type = {
  channel_sales: '渠道经理',
  direct_sales: '直客销售',
  primary: '一级分销商'
}

export default disy
