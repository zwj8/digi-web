import routerView from '@/views/RouterView'
// 前台layout
import FrontLayout from '@/layouts/front/FrontLayout'
// 分销商管理layout
import DistrLayout from '@/layouts/distr/DistrLayout'
// 北美版
import UsLayout from '@/layouts/us/UsLayout'

// 旧路由重定向
const oldRouter = [
  {
    path: '/ad-search',
    redirect: { name: 'adList' }
  }
]

const frameIn = [
  // 前台 /
  {
    path: '/',
    name: 'index',
    redirect: { name: 'home' },
    component: FrontLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView'),
        meta: {
          auth: false // 不用鉴权
        }
      },
      // 隐私政策页面
      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('@/views/PrivacyView'),
        meta: {
          auth: false // 不用鉴权
        }
      },
      // TikTok 广告
      {
        path: 'ad',
        name: 'ad',
        redirect: { name: 'adList' },
        component: routerView,
        children: [
          {
            path: 'list',
            name: 'adList',
            component: () => import('@/views/ad/AdList')
          },
          {
            path: 'detail',
            name: 'adDetail',
            component: () => import('@/views/ad/AdDetail')
          }
        ]
      },
      // 广告主
      {
        path: 'adver',
        name: 'adver',
        redirect: { name: 'adverList' },
        component: routerView,
        children: [
          {
            path: 'list',
            name: 'adverList',
            component: () => import('@/views/adver/AdverList')
          },
          {
            path: 'detail',
            name: 'adverDetail',
            component: () => import('@/views/adver/AdverDetail')
          }
        ]
      },
      // 收藏
      {
        path: 'collect',
        name: 'collect',
        redirect: { name: 'collectList' },
        component: routerView,
        children: [
          {
            path: 'list',
            name: 'collectList',
            component: () => import('@/views/collect/CollectList')
          }
        ]
      },
      // 申请
      {
        path: 'apply',
        name: 'apply',
        redirect: { name: 'account' },
        component: routerView,
        children: [
          // 广告开户
          {
            path: 'ad-account',
            name: 'adAccount',
            component: () => import('@/views/apply/AdAccountView')
          },
          // 电商启动流程
          {
            path: 'e-business',
            name: 'e-business',
            component: () => import('@/views/apply/EBusinessView')
          },
          // 物流申请
          {
            path: 'logistics',
            name: 'logistics',
            component: () => import('@/views/apply/LogisticsView')
          },
          // 服务商申请
          {
            path: 'distrbutor',
            name: 'distrbutor',
            component: () => import('@/views/apply/DistrbutorView')
          }
        ]
      },
      // 个人中心
      {
        path: 'personal',
        name: 'personal',
        redirect: { name: 'personalDetail' },
        component: routerView,
        children: [
          {
            path: 'detail',
            name: 'personalDetail',
            component: () => import('@/views/personal/PersonalDetail')
          }
        ]
      },
      // 套餐
      {
        path: 'combo',
        name: 'combo',
        redirect: { name: 'comboList' },
        component: routerView,
        children: [
          // 选择套餐
          {
            path: 'list',
            name: 'comboList',
            component: () => import('@/views/combo/ComboList')
          },
          // 下单页面
          {
            path: 'checkout',
            name: 'checkout',
            component: () => import('@/views/combo/ComboCheckout')
          }
        ]
      },
      // 付费课程
      {
        path: 'course',
        name: 'course',
        redirect: { name: 'courseIndex' },
        component: () => import('@/views/course/CourseHome'),
        children: [
          // 课程首页
          {
            path: 'index',
            name: 'courseIndex',
            component: () => import('@/views/course/CourseIndex')
          },
          // 课程播放页
          {
            path: 'video',
            name: 'courseVideo',
            component: () => import('@/views/course/CourseVideo')
          }
        ]
      },
      // 关于我们
      {
        path: 'about',
        name: 'about',
        props: true,
        component: () => import('@/views/AboutView'),
        meta: {
          auth: false // 不用鉴权
        }
      }
    ]
  },
  // 后台 /distr
  {
    path: '/distr',
    name: 'distr',
    redirect: { name: 'account' },
    component: DistrLayout,
    children: [
      // 联盟计划（账号）
      {
        path: 'account',
        name: 'account',
        redirect: { name: 'accountChart' },
        component: routerView,
        children: [
          // 账号列表（合作伙伴管理）
          {
            path: 'list',
            name: 'accountList',
            component: () => import('@/views/distr/account/AccountList')
          },
          // 新建 / 编辑（合作伙伴）
          {
            path: 'detail',
            name: 'accountDetail',
            component: () => import('@/views/distr/account/AccountDetail')
          },
          // 图表
          {
            path: 'chart',
            name: 'accountChart',
            component: () => import('@/views/distr/account/AccountChart')
          },
          // 分销商个人信息
          {
            path: 'info',
            name: 'distrInfo',
            component: () => import('@/views/distr/account/DistrInfo')
          }
        ]
      },
      // 款项
      {
        path: 'payment',
        name: 'payment',
        redirect: { name: 'commission' },
        component: routerView,
        children: [
          // 佣金
          {
            path: 'commission',
            name: 'commission',
            component: () => import('@/views/distr/payment/CommissionView')
          },
          // 提现记录
          {
            path: 'log',
            name: 'log',
            component: () => import('@/views/distr/payment/LogView')
          }
        ]
      }

    ]
  },
  // 北美版
  {
    path: '/us',
    name: 'us',
    redirect: { name: 'usHome' },
    component: UsLayout,
    children: [
      // 首页
      {
        path: '/us',
        name: 'usHome',
        component: () => import('@/views/us/HomeView')
      },
      // 广告搜索
      {
        path: 'ad',
        name: 'usAd',
        redirect: { name: 'usAdList' },
        component: routerView,
        children: [
          {
            path: 'list',
            name: 'usAdList',
            component: () => import('@/views/ad/AdList')
          },
          {
            path: 'detail',
            name: 'usAdDetail',
            component: () => import('@/views/ad/AdDetail')
          }
        ]
      },
      // 广告主
      {
        path: 'adver',
        name: 'usAdver',
        redirect: { name: 'usAdverList' },
        component: routerView,
        children: [
          {
            path: 'list',
            name: 'usAdverList',
            component: () => import('@/views/adver/AdverList')
          },
          {
            path: 'detail',
            name: 'usAdverDetail',
            component: () => import('@/views/adver/AdverDetail')
          }
        ]
      },
      // 套餐
      {
        path: 'combo',
        name: 'usCombo',
        redirect: { name: 'usComboList' },
        component: routerView,
        children: [
          // 选择套餐
          {
            path: 'list',
            name: 'usComboList',
            component: () => import('@/views/us/combo/ComboList')
          },
          // 下单页面
          {
            path: 'checkout',
            name: 'usCheckout',
            component: () => import('@/views/us/combo/ComboOrder')
          }
        ]
      },
      // 收藏
      {
        path: 'collect',
        name: 'usCollect',
        redirect: { name: 'usCollectList' },
        component: routerView,
        children: [
          {
            path: 'list',
            name: 'usCollectList',
            component: () => import('@/views/collect/CollectList')
          }
        ]
      },
      // 成功案例展示
      // 博客 & 教程
      {
        path: 'insight',
        name: 'usInsight',
        redirect: { name: 'usBlogs' },
        component: routerView,
        children: [
          // 博客列表
          {
            path: 'blogs',
            name: 'usBlogs',
            component: () => import('@/views/us/resources/blogs/BlogsList')
          },
          // 博客详情
          {
            path: 'blog/:blogId',
            name: 'usBlogDetail',
            component: () => import('@/views/us/resources/blogs/BlogsDetail')
          },
          // 教程
          {
            path: 'tutorial',
            name: 'usTutorial',
            component: () => import('@/views/us/resources/videos/VideoList')
          }
        ]
      },
      // 美版个人中心
      {
        path: 'personal',
        name: 'usPersonal',
        redirect: { name: 'usPersonalDetail' },
        component: routerView,
        children: [
          {
            path: 'detail',
            name: 'usPersonalDetail',
            component: () => import('@/views/us/personal/PersonalDetail')
          }
        ]
      },
      // 关于我们
      {
        path: 'about',
        name: 'usAbout',
        props: true,
        component: () => import('@/views/us/AboutView'),
        meta: {
          auth: false // 不用鉴权
        }
      }
    ]
  }
]

const frameOut = [
  // aid获取
  {
    path: '/share/:aid',
    name: 'share',
    component: FrontLayout,
    redirect: { name: 'home' }
  },
  // 认证回调页面
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/views/system/CallbackView'),
    meta: {
      auth: false // 不用鉴权
    }
  },
  // 北美认证回调页面
  {
    path: '/us/callback',
    name: 'usCallback',
    component: () => import('@/views/system/UsCallbackView'),
    meta: {
      auth: false // 不用鉴权
    }
  }
]
/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: 'page404',
    component: () => import('@/views/system/error/NotFound'),
    meta: {
      auth: false // 不用鉴权
    }
  },
  {
    path: '/403',
    name: 'page403',
    component: () => import('@/views/system/error/Forbidden'),
    meta: {
      auth: false // 不用鉴权
    }
  }
]

export default [...frameIn, ...frameOut, ...errorPage, ...oldRouter]
