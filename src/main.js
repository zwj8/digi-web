import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Filters
import Filters from './libs/filters/index'
// Directives
import Directives from './libs/directives/index'
// 多语言模块
import i18n from './i18n'
// 自定义公共组件
import CommonComponents from '@/components/common'

// OSS前缀
import { OSS_PREFIX } from '@/constants'
// 设置为全局变量
Vue.prototype.OSS_PREFIX = OSS_PREFIX

process.env.VUE_APP_MODE !== 'production' && require('@/mock')

// element-ui 多语言切换
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })

// 加载自定义 Filter
Object.keys(Filters).forEach(function (key) {
  Vue.filter(key, Filters[key])
})
// 加载自定义指令
Object.keys(Directives).forEach(function (key) {
  Vue.directive(key, Directives[key])
})

// 加载自定义公共组件
Vue.use(CommonComponents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
