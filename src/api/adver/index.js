import axios from '@/api/axios'

const ADVER = {}

// 获取广告主列表
ADVER.GetList = parmas => { return axios.post('/advertiser/search', parmas) }

// 获取广告主详情
ADVER.GetDetail = parmas => { return axios.get(`/advertiser/detail/${parmas}`) }

export default ADVER
