import axios from '@/api/axios'

const USER = {}

// 获取用户信息
USER.GetInfo = () => { return axios.get('/user/query/info') }

// 获取用户套餐情况
USER.GetPackage = () => { return axios.get('/order/query/used') }

// 获取用户订单
USER.GetOrder = params => { return axios.post('/order/query/purchesed', params) }

// 更新用户信息
USER.UpdateInfo = params => { return axios.post('/user/op/edit', params) }

// 用户地区定位
USER.Locate = () => { return axios.post('/auth/locate') }

export default USER
