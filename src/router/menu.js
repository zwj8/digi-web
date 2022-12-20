/** 导航配置 */

// 导航组件
const ZH_MENU_CONFIG = [
  {
    // 广告
    name: 'TikTok 广告',
    children: [
      {
        // TikTok广告搜索
        name: 'TikTok 广告搜索',
        path: '/ad/list'
      },
      {
        // 广告主榜单
        name: '广告主榜单',
        path: '/adver/list'
      }
    ]
  },
  {
    // 收藏
    name: '收藏',
    path: '/collect/list'
  },
  {
    // 套餐
    name: '套餐',
    path: '/combo/list'
  },
  {
    // 一站式解决
    name: '一站式解决',
    children: [
      // CP 浏览器
      {
        name: 'Cp 免费浏览器',
        path: 'https://www.closphere.com/?code=7866'
      },
      // 广告开户
      {
        name: '广告开户',
        path: 'https://www.adseasy.cn'
      },
      // 电商启动流程
      {
        name: '电商启动流程',
        path: '/apply/e-business'
      },
      // 物流申请
      {
        name: '物流申请',
        path: '/apply/logistics'
      }
    ]
  },
  {
    // 课程
    name: '课程',
    path: '/course/index'
  },
  {
    // 服务商申请
    single: true, // 是否只显示单个
    children: [
      // 服务商申请
      {
        name: '服务商申请',
        path: '/apply/distrbutor'
      },
      // 分销商管理
      {
        name: '分销管理后台',
        path: '/distr/account/chart'
      }
    ]
  },
  {
    // 关于我们
    name: '关于我们',
    path: '/about'
  }
]

const US_MENU_CONFIG = [
  // 广告搜索
  {
    name: 'Our Suite',
    children: [
      // 广告搜索
      {
        name: 'TikTok Ads Search',
        path: '/us/ad/list'
      }
      // // 广告主榜单
      // {
      //   name: 'TikTok Ads Ranking',
      //   path: '/us/adver/list'
      // },
      // {
      //   name: 'Data Intelligence(Dashboard)',
      //   path: '/us/xxx'
      // }
    ]
  },
  // 套餐
  {
    name: 'Pricing',
    path: '/us/combo/list'
  },
  // 收藏
  {
    name: 'Collection',
    path: '/us/collect/list'
  },
  // 成功案例展示
  // {
  //   name: 'Case Studies',
  //   path: '/us/xxxx'
  // }
  // 博客 & 教程
  {
    name: 'Resources',
    children: [
      // Blogs
      {
        name: 'Blogs',
        path: '/us/insight/blogs'
      },
      // 教程视频
      {
        name: 'Tutorial Videos',
        path: '/us/insight/tutorial'
      }
    ]
  },
  // 关于我们
  {
    name: 'About Us',
    path: '/us/about'
  }
]

export { ZH_MENU_CONFIG, US_MENU_CONFIG }
