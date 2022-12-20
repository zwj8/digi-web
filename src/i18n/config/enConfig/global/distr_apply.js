import common from '@/i18n/config/common/common.en'
import { recursion } from '@/libs/util.i18n'

const disy = {
  label_business_info: 'Business information',
  label_address: 'Contact address',
  label_charge_type: 'Payment method',
  text_agreement: 'I have read and agree',
  text_partnership_agreement: 'Partnership Program Agreement',
  msg: {
    allow: common.message.need_agreement,
    apply_success: 'The application is complete, please wait for review',
    create_success: 'Creation complete',
    change_success: 'Modification complete'
  },
  btn: {
    confirm: common.btn.confirm,
    cancel: common.btn.cancel
  },
  valid: {
    required: common.valid.required,
    email_error: common.valid.email_error,
    phone_error: common.valid.phone_error,
    post_code_error: 'Postal code should be purely numeric',
    comm_rate: 'The commission rate must be a positive integer',
    comm_rate_limit: 'The commission rate range is 0%~100%'
  },
  form: {},
  placeholder: {},
  payment_type: {}
}

disy.dialog = {
  title_show: 'Distributor Personal Information',
  account_type: 'Account type',
  account: 'Payment account',
  create_date: 'Registration time',
  updated_date: 'Update time'
}

disy.form = {
  business_name: 'Business name',
  site: 'Website (optional)',
  name: 'Contact',
  email: 'Business email',
  phone: 'Mobile phone number',
  region: 'Country/region',
  province: 'Province/city',
  address: 'Detailed address',
  post_code: 'Postal code',
  distr_type: 'Application type',
  aid: 'Inviter DUID',
  comm_rate: 'Commission rate',
  // Bank card
  card: {
    name: 'Name',
    card_number: 'Card number',
    card_bank: 'Account bank'
  },
  // WeChat
  wechat: {
    account: 'WeChat account number',
    account_contact: 'WeChat owner\'s full name'
  },
  // Alipay
  alipay: {
    account: 'Alipay account',
    account_contact: 'Account owner\'s full name'
  },
  // Sky Cloud
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
    account: 'Account name (email)'
  }
}

// Recursively disy.form to get disy.placeholder
recursion(disy.form, disy.placeholder, common.placeholder_input_prefix)

// province/city is select
disy.placeholder.placeholder_province = common.placeholder_select_prefix + disy.form.province

// Payment Types
disy.payment_type = {
  cur_rmb: 'RMB (CNY)',
  cur_usd: 'US dollar (USD)',
  type_card: 'Bank debit card (domestic)',
  type_wechat: 'WeChat payment',
  type_alipay: 'Alipay payment',
  type_airwallex: 'Airwallex',
  type_payoneer: 'Payoneer'
}

// Distributor type
disy.distr_type = {
  channel_sales: 'Channel Manager',
  direct_sales: 'Direct customer sales',
  primary: 'Primary distributor'
}

export default disy
