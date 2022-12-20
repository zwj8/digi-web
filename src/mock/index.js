import Mock from 'mockjs'
import modules from './api'

Mock.setup({
  timeout: '100-2000'
})

for (const item of modules) {
  Mock.mock(item.url, item.mode, item.data)
}

export default Mock
