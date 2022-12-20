import axios from '@/api/axios'

const CONFIG = {}

// 获取国家配置
CONFIG.GetRegion = parmas => { return axios.get('/config/options/region', parmas) }

// 获取分组国家配置
CONFIG.GetRegionGroup = parmas => { return axios.get('/config/options/groupRegion', parmas) }

// 获取建站系统配置
CONFIG.GetSiteFramework = parmas => { return axios.get('/config/options/siteFramework', parmas) }

// 获取建站系统配置
CONFIG.GetClazz = parmas => { return axios.get('/config/options/tt/clazz', parmas) }

// 获取广告按钮配置
CONFIG.GetBtn = parmas => { return axios.get('/config/options/tt/btn', parmas) }

// 获取广告按钮类目配置
CONFIG.GetBtnCatalog = parmas => { return axios.get('/config/options/tt/btn/catalog', parmas) }

// 获取次数配置
CONFIG.GetTimesLevel = parmas => { return axios.get('/config/options/tt/timesLevel', parmas) }

export default CONFIG
