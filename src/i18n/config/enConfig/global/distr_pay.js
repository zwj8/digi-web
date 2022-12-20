import common from '@/i18n/config/common/common.en'
import dc from './distr_chart'
const pay = {
  label_total_amount: 'Total commission',
  label_my_comm_amount: 'My commission',
  label_withdraw: 'Withdrawan commission',
  label_applied: 'Applied withdrawal commission',
  label_surplus: 'Withdrawable balance',
  btn: {
    withdraw: 'withdraw'
  },
  table: {
    label_duid: dc.table.label_duid,
    label_company: dc.table.label_company,
    label_comm: 'Commission',
    label_withdraw: 'Withdrawal amount',
    label_apply_date: 'Application time',
    label_verify: 'Verification time',
    label_pay: 'Payment time',
    label_state: 'Status',
    no_data: common.no_data
  },
  msg: {
    apply_success: 'The application is complete, please wait for verification. '
  }
}

export default pay
