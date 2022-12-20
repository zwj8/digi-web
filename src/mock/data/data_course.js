import { apiResult, costTemplate } from '@/mock/common'
import Mock from 'mockjs'

const cource = {}

// 课程信息
cource.getInfo = {
  ...apiResult,
  value: {
    desc: '课程介绍：零基础，手把手，提供 TikTok 账号搭建、运营、变现全流程出海方案，赋能跨境企业，助力商家共建跨境生态。',
    coverUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/default/digiads_index.jpg',
    lessonHour: '17',
    'duration|1-1000': 1,
    lecturer: '这是讲师占位',
    price () {
      return costTemplate('CNY')
    },
    bought: '@boolean',
    id: 1,
    subject: 'TikTok 入门课程'
  }
}

// 每课详情
cource.getLesson = {
  ...apiResult,
  value: {
    coverURL: 'https://dk-front.oss-accelerate.aliyuncs.com/default/digiads_index.jpg',
    'duration|1-120': 1,
    'score|1-100': 1,
    nextLessonSn: '@natural',
    lastPlayAt: new Date().getTime(),
    sn: '@natural',
    title: '@name',
    chapter: '@name',
    'order|1-100': 1
  }
}

// 课程目录
cource.getIndex = {
  ...apiResult,
  value: [
    {
      sn: '@natural',
      title: 'TikTok 的认知及未来趋势',
      chapter: 'TikTok 基础篇',
      order: 1
    },
    {
      sn: '@natural',
      title: '收集数据清除与一键式环境搭建',
      chapter: 'TikTok 基础篇',
      order: 2
    },
    {
      sn: '@natural',
      title: '轻松搞定海外苹果ID和谷歌账号',
      chapter: 'TikTok 基础篇',
      order: 3
    },
    {
      sn: '@natural',
      title: '手机安装 TikTok 及账号注册',
      chapter: 'TikTok 基础篇',
      order: 4
    },
    {
      sn: '@natural',
      title: 'TikTok 推荐的底层逻辑与雷区禁忌',
      chapter: 'TokTok 运营篇',
      order: 5
    },
    {
      sn: '@natural',
      title: 'TikTok 爆款视频素材的挖掘',
      chapter: 'TokTok 运营篇',
      order: 6
    },
    {
      sn: '@natural',
      title: '视频文案、配乐、标签的技巧',
      chapter: 'TokTok 运营篇',
      order: 7
    },
    {
      sn: '@natural',
      title: '剪映常用功能实操讲解',
      chapter: 'TokTok 运营篇',
      order: 8
    },
    {
      sn: '@natural',
      title: 'TikTok 快速起号的万能公式',
      chapter: 'TikTok 投流变现篇',
      order: 9
    },
    {
      sn: '@natural',
      title: 'TikTok 引流私域如何变现',
      chapter: 'TikTok 投流变现篇',
      order: 10
    },
    {
      sn: '@natural',
      title: '暴力项目拆解技巧及分享课',
      chapter: 'TikTok 投流变现篇',
      order: 11
    },
    {
      sn: '@natural',
      title: 'shopline 在当下趋势及开店要求',
      chapter: 'TikTok 投流变现篇',
      order: 12
    },
    {
      sn: '@natural',
      title: 'shopline 店铺注册与后台基础设置',
      chapter: 'TikTok 投流变现篇',
      order: 13
    },
    {
      sn: '@natural',
      title: 'shopline 店铺装修及手动上传产品',
      chapter: 'TikTok 投流变现篇',
      order: 14
    },
    {
      sn: '@natural',
      title: 'shopline 选品及批量产品上架玩法',
      chapter: 'TikTok 投流变现篇',
      order: 15
    },
    {
      sn: '@natural',
      title: 'TikTok 团队如何搭建',
      chapter: '加餐一',
      order: 16
    }
  ]
}

// 课程目录
cource.getLessonURL = {
  ...apiResult,
  'value|1': [
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/16551435736e5c555a8e.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/16f01459b5a52c2a8fe8.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/18c1b41b1b0f0b0a8adb.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/199aed2056441584154a.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/1afd540d7876d7cdd5dd.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/2286a286f3cc756d3d71.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/2d3485e75276cf405ef7.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/2fb6837566f8949b23d7.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/3667e59eebd61dc91d0b.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/3820267a3a20e178da14.mp4',
    'https://digiads-tt.oss-cn-guangzhou.aliyuncs.com/video/3e4b230ddbb758749af5.mp4'
  ]
}

// 课程评分
cource.setScore = {
  ...apiResult,
  value: '@boolean'
}

cource.checkout = {
  ...apiResult,
  value: {
    orderSn: '@natural',
    courseInfo: {
      'id|1-100': 1,
      subject: '@name'
    },
    couponCode: '',
    selectedCouponId: null,
    couponDisableTips: null,
    payToolInfoList: [
      {
        paymentChannel: 'WECHATPAY',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/wechatpay-logo.png',
        tips: '...',
        selected: true,
        available: true,
        notAvailableReason: null
      },
      {
        paymentChannel: 'AWX_ALIPAY',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/alipay-logo.png',
        tips: '...',
        selected: false,
        available: true,
        notAvailableReason: null
      },
      {
        paymentChannel: 'ALIPAY',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/alipay-logo.png',
        tips: 'Will support soon',
        selected: false,
        available: false,
        notAvailableReason: 'Will support soon'
      },
      {
        paymentChannel: 'PAYPAL',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/paypal.png',
        tips: 'Will support soon',
        selected: false,
        available: false,
        notAvailableReason: 'Will support soon'
      },
      {
        paymentChannel: 'CREDIT',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/credit.png',
        tips: 'Will support soon',
        selected: false,
        available: false,
        notAvailableReason: 'Will support soon'
      },
      {
        paymentChannel: 'AWX_US_BANK',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/airwallex-logo.png',
        tips: 'Will support soon',
        selected: false,
        available: false,
        notAvailableReason: 'Will support soon'
      },
      {
        paymentChannel: 'AWX_HK_BANK',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/airwallex-logo.png',
        tips: 'Will support soon',
        selected: false,
        available: false,
        notAvailableReason: 'Will support soon'
      },
      {
        paymentChannel: 'CNY_ICBC',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/icbc.png',
        tips: 'Will support soon',
        selected: false,
        available: false,
        notAvailableReason: 'Will support soon'
      },
      {
        paymentChannel: 'CNY_CNCB',
        channelIconUrl: 'https://dk-front.oss-accelerate.aliyuncs.com/pay-tool/cncb.png',
        tips: 'Will support soon',
        selected: false,
        available: false,
        notAvailableReason: 'Will support soon'
      }
    ],
    cur: 'CNY',
    priceInfo: {
      totalAmount: {
        value: 259900,
        unit: 'FEN',
        currency: 'CNY',
        lan: 'EN',
        display: '2599.00',
        displayWithCur: '¥ 2599.00',
        decimalFenValue: 259900,
        decimalYuanValue: 2599,
        yuanValue: 2599,
        fenValue: 259900
      },
      promotionAmount: {
        value: 0,
        unit: 'FEN',
        currency: 'CNY',
        lan: 'EN',
        display: '0.00',
        displayWithCur: '¥ 0.00',
        decimalFenValue: 0,
        decimalYuanValue: 0,
        yuanValue: 0,
        fenValue: 0
      },
      promotionTips: null,
      payTotalAmount: {
        value: 259900,
        unit: 'FEN',
        currency: 'CNY',
        lan: 'EN',
        display: '2599.00',
        displayWithCur: '¥ 2599.00',
        decimalFenValue: 259900,
        decimalYuanValue: 2599,
        yuanValue: 2599,
        fenValue: 259900
      }
    },
    confirmable: true,
    unConfirmableReason: null
  }
}

export default cource
