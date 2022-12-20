import axios from '@/api/axios'

// 获取短接
export const getShareLink = link => { return axios.post('/comm/share/encode', { link }) }

// 解码短链
export const getOriginLink = link => { return axios.post('/comm/share/decode', { link }) }
