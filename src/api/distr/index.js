import axios from '@/api/axios'

const DISTR = {}

// 分销商申请
DISTR.Apply = parmas => { return axios.post('/distr/op/apply/new', parmas) }

// 分销商信息编辑
DISTR.EditInfo = parmas => { return axios.post('/distr/op/edit', parmas) }

// 获取分销商自己的信息
DISTR.GetInfo = () => { return axios.get('/distr/query/info') }

// 获取分销商下属信息
DISTR.GetSubInfo = params => { return axios.get(`/distr/query/info/${params}`) }

// 获取分销商下属列表接口
DISTR.GetSubList = () => { return axios.get('/distr/query/list') }

// 获取分销商下属列表接口（用于下拉选项
DISTR.GetSubListSimple = () => { return axios.get('/distr/query/list/simple') }

// 分销商账号删除
DISTR.DelAccount = params => { return axios.post(`/distr/op/del/${params}`) }

// 佣金流水
DISTR.GetCommTransaction = () => { return axios.get('/distr/comm/query/trans') }

// 获取分销商自己的佣金
DISTR.GetCurrentComm = () => { return axios.get('/distr/comm/query/get') }

// 提现申请
DISTR.ApplyWithdraw = params => { return axios.post('/distr/comm/op/withdraw/apply', params) }

// 获取流水
DISTR.GetWithdrawList = params => { return axios.post('/distr/comm/query/withdraw/list', params) }

// 联盟计划 - 图表
DISTR.GetEchartsData = (params = null) => { return axios.get(`/distr/bi/query/month/${params}`) }

export default DISTR
