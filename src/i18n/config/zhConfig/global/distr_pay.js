import common from '@/i18n/config/common/common.zh'
import dc from './distr_chart'
const pay = {
  label_total_amount: '总佣金',
  label_my_comm_amount: '我的佣金',
  label_withdraw: '已提现佣金',
  label_applied: '已申请提现佣金',
  label_surplus: '可提现余额',
  btn: {
    withdraw: '提现'
  },
  table: {
    label_duid: dc.table.label_duid,
    label_company: dc.table.label_company,
    label_comm: '佣金',
    label_withdraw: '提现金额',
    label_apply_date: '申请时间',
    label_verify: '审核时间',
    label_pay: '打款时间',
    label_state: '状态',
    no_data: common.no_data
  },
  msg: {
    apply_success: '申请完成，请等待审核。'
  }
}

export default pay
