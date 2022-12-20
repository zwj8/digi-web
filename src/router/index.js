import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'
import store from '@/store'
import auth from '@/libs/auth'
import com from '@/libs/util'
import { ROUTER_BASE, EXCLUDE_ACTIONS } from '@/constants'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: ROUTER_BASE,
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条-开始
  NProgress.start()

  // 检查登录状态 与 Aid
  store.dispatch('global/auth/check', to.params?.aid || to.query?.aid)

  if (to.name === 'page404') {
    NProgress.done()
    next()
    return
  }

  // 排除的无需认证的资源
  if (EXCLUDE_ACTIONS.includes(to.path)) {
    NProgress.done()
    next()
    return
  }

  if (!auth.isLogined()) {
    // 未登录
    if (!to.matched.some(r => r.meta.auth === false)) {
      // 页面需要认证，跳转登录
      store.dispatch('global/account/login', { toPath: to.fullPath }).then(() => {
        // 进度条-结束
        NProgress.done()
        next(false)
      })
    } else {
      // 不需要身份校验 直接通过
      next()
    }
    return
  }

  // 已登录
  // 检查权限
  const status = await auth.hasPermission(to.path)
  // const redirectPath = await auth.redirect(to.path)
  if (status) {
    if (to.redirect) next(to.redirect.path)
    // else if (redirectPath) next(redirectPath)
    else next()
    return false
  } else {
    // 没权限访问
    store.dispatch('global/account/denied', { routeBack: true }).then(() => {
      // 进度条-结束
      NProgress.done()
      next(false)
    })
  }
})

// 路由跳转后执行
router.afterEach(() => {
  // 跳转后滚动条置顶
  com.top()
})

export default router
