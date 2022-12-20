import axios from '@/api/axios'

const TTAD = {}

// 获取TT广告列表
TTAD.GetList = parmas => { return axios.post('/ads/query/tt/search', parmas) }

// 获取广告详情
TTAD.GetDetail = parmas => { return axios.get(`/ads/query/tt/detail/${parmas}`) }

export default TTAD
