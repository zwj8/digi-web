import axios from '@/api/axios'

const COMBO = {}

// 获取套餐列表
COMBO.GetPricingList = () => { return axios.get('/combo/query/list') }
// COMBO.GetPricingList = () => { return axios.get('/config/options/trade/combo') }

// checkout接口
COMBO.Checkout = params => { return axios.post('/trade/checkout', params) }

// 创建订单
COMBO.CreateOrder = params => { return axios.post('/trade/order/create', params) }

// 取消订单
COMBO.CloseOrder = params => { return axios.post(`/trade/order/close/${params}`) }

// 收银台
COMBO.Cashier = params => { return axios.get(`/payment/cashier/${params}`) }

// 获取支付状态
COMBO.GetPaymentState = params => { return axios.get(`/payment/state/${params}`) }

export default COMBO
