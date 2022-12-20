import axios from '@/api/axios'

const COURSE = {}

// 获取课程目录，因为还没有课程列表，所以 ID 先写死，ID 由汛哥提供
COURSE.getIndex = params => { return axios.get(`/course/query/${params}/list`) }

// 查询课程信息,ID 问题同上
COURSE.getInfo = params => { return axios.get(`/course/query/detail/${params}`) }

// 查询某节课详情信息
COURSE.getLesson = params => { return axios.get(`/course/query/lesson/${params}`) }

// 查询某节课的播放链接
COURSE.getLessonURL = params => { return axios.get(`/course/query/lesson/${params}/play`) }

// 对某节课评分
COURSE.setScore = params => { return axios.post('/course/op/review', params) }

export default COURSE
