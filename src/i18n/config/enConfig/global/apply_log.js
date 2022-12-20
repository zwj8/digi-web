import common from '@/i18n/config/common/common.zh'
import { recursion } from '@/libs/util.i18n'

const log = {
  title: 'Logistics Application',
  sub_title: 'Logistics Application',
  text_qr_code: 'Customer QR code',
  btn: {
    submit: 'Submit application'
  },
  form: {},
  placeholder: {},
  msg: {
    submit_success: 'The work order form submission is complete. '
  }
}

log.form = {
  company_name: 'Company name',
  contact_name: 'Contact name',
  phone: 'Contact phone',
  wechat: 'Contact WeChat',
  catalog: 'Product category',
  consignment_address: 'shipping address',
  day_order: 'Average daily order volume',
  to_home_service: 'If pickup service is needed',
  package_service: 'If packing service is needed',
  remark: 'Other notes'
}

// Recursively log.form to get log.placeholder
recursion(log.form, log.placeholder, common.placeholder_input_prefix)

for (const key of ['catalog', 'to_home_service', 'package_service']) {
  log.placeholder[key] = common.placeholder_select_prefix + log.form[key]
}

export default log
