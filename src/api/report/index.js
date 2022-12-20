import axios from 'axios'
import { API_GATEWAY } from '@/constants'
import auth from '@/libs/auth'

// 创建 axios 实例
const service = axios.create({
  baseURL: API_GATEWAY,
  timeout: 20000
})

service.defaults.withCredentials = true

// 请求拦截
service.interceptors.request.use(
  config => {
    const token = auth.getToken()
    // 在请求之前设置
    config.headers.Authorization = token || ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const REPORT = {}

// 获取视频收藏
REPORT.Behavior = params => { return service.post('/user/report/behavior', params) }

export default REPORT
