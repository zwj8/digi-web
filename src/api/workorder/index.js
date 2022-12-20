import axios from '@/api/axios'

const WORK = {}

// 新建工单
WORK.New = params => { return axios.post('/work-order/new', params) }

export default WORK
