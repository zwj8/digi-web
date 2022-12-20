import axios from '@/api/axios'

const FAVOR = {}

// 添加视频收藏
FAVOR.AddVideo = ({ objectId, groupId = null }) => {
  const params = {
    objectId,
    type: 'TTAD'
  }
  if (groupId !== null) params.groupId = groupId
  return axios.post('/favor/op/do', params)
}

// 添加广告主收藏
FAVOR.AddAdver = ({ objectId, groupId = null }) => {
  const params = {
    objectId,
    type: 'ADVER'
  }
  if (groupId !== null) params.groupId = groupId
  return axios.post('/favor/op/do', params)
}

// 获取视频收藏
FAVOR.GetVideo = params => { return axios.post('/favor/query/ttad/list', params) }

// 获取广告主收藏
FAVOR.GetAdver = params => { return axios.post('/favor/query/adver/list', params) }

// 获取收藏分组
FAVOR.GetGroup = params => { return axios.get(`/favor/query/group/list?type=${params}`) }

// 新增收藏组
FAVOR.AddGroup = params => { return axios.post('/favor/op/group/add', params) }

// 删除收藏组
FAVOR.DelGroup = params => { return axios.post(`/favor/op/group/del/${params}`) }

export default FAVOR
