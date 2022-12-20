import common from '@/i18n/config/common/common.zh'
import { recursion } from '@/libs/util.i18n'

const log = {
  title: 'Logistics Application',
  sub_title: '物流申请',
  text_qr_code: '客服二维码',
  btn: {
    submit: '提交申请'
  },
  form: {},
  placeholder: {},
  msg: {
    submit_success: '工单提交完成。'
  }
}

log.form = {
  company_name: '企业名称',
  contact_name: '联系人',
  phone: '联系人电话',
  wechat: '联系人微信',
  catalog: '产品类目',
  consignment_address: '发货地址',
  day_order: '日均单量',
  to_home_service: '是否需要上门揽件',
  package_service: '是否需要打包服务',
  remark: '其他备注'
}

// 递归log.form 获得 log.placeholder
recursion(log.form, log.placeholder, common.placeholder_input_prefix)

for (const key of ['catalog', 'to_home_service', 'package_service']) {
  log.placeholder[key] = common.placeholder_select_prefix + log.form[key]
}

export default log
