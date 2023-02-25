import { USER_INFO } from '../../constant'

/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 16:17:05
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-27 17:20:32
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\pages\user\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const tools = [
  {
    value: 1,
    icon: require('../../static/images/user/erweima.png'),
  },
  {
    value: 2,
    icon: require('../../static/images/user/shezhi.png'),
  },
  {
    value: 3,
    icon: require('../../static/images/user/xinxi.png'),
  },
]

export const one = {
  title: null,
  menus: [
    {
      label: '待付款',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6oy1doklr6qy59uida1r.png ',
      url: '/user/orderForm/order-form?type=1',
      showType: 1,
    },
    {
      label: '待发货',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zufcag92apxavgddfdx1.png ',

      url: '/user/orderForm/order-form?type=2',
      showType: 2,
    },
    {
      label: '待收货',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qb8dsznp8mkh5f5oumi8.png ',
      url: '/user/orderForm/order-form?type=3',
      showType: 3,
    },
    {
      label: '待评价',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/g5stm4mlnteyf71nnedx.png ',
      url: '/user/orderForm/order-form?type=4',
      showType: 4,
    },
    {
      label: '所有订单',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tj750f4yk1bv8z972ubf.png ',
      url: '/user/orderForm/order-form?type=0',
      showType: 0,
    },
  ],
}
export const two = {
  title: null,
  menus: [
    {
      label: '待付款',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6oy1doklr6qy59uida1r.png ',
      url: '/community-center/order',
    },
    {
      label: '待发货',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zufcag92apxavgddfdx1.png ',
      url: '/community-center/order',
    },
    {
      label: '待安装',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/kx30q97obt0wxhy6qk9f.png ',
      url: '/community-center/order',
    },
    {
      label: '评价',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/g5stm4mlnteyf71nnedx.png ',
      url: '/community-center/order',
    },
    {
      label: '所有订单',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/tj750f4yk1bv8z972ubf.png ',
      url: '/community-center/order',
    },
  ],
}
export const three = {
  title: null,
  menus: [
    {
      label: '待付款',
      icon: require('../../static/images/user/daifukuan.png'),
      url: '/user/orderForm/order-form',
      showType: 1,
    },
    {
      label: '待发货',
      icon: require('../../static/images/user/daifahuo.png'),
      url: '/user/orderForm/order-form',
      showType: 2,
    },
    {
      label: '待收货',
      icon: require('../../static/images/user/daishouhuo.png'),
      url: '/user/orderForm/order-form',
      showType: 3,
    },
    {
      label: '待评价',
      icon: require('../../static/images/user/daipingjia.png'),
      url: '/user/orderForm/order-form',
      showType: 4,
    },
    {
      label: '所有订单',
      icon: require('../../static/images/user//suoyoudingdan.png'),
      url: '/user/orderForm/order-form',
      showType: 0,
    },
  ],
}
export const serve = {
  title: '我的服务',
  menus: [
    {
      label: '商品收藏',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/v5yond28i8fx4lyu5ulv.png',
      url: '/user/Collection/Goods-Collection',
    },
    {
      label: '我的拼团',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/amhee3jrsp4gvj52s7gj.png ',
    },
    {
      label: '地址管理',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/r76h31omvpyz32bqpfs6.png ',
      url: '/user/site/site-manage',
    },
    {
      label: '购物车',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/j75unnyxcbtnf3wwfsrs.png ',
      url: '/user/sever/shop-car',
    },
    {
      label: '优惠劵',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4u948ko5bu56bbw0v0cd.png ',
      // url: "/user/sever/coupon",
    },
    {
      label: '联系客服',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1wtntegtsfarlxi4e1p1.png ',
    },
    {
      label: '社区管家',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8bqv4rk32snko0cncwr6.png ',
      url: '/user/sever/userUp',
    },
    {
      label: '推广码',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qreq9r6so29qkurcjeoc.png ',
      // url: "/pages/stuff/brand/index",
      type: 'extension',
    },
  ],
}
export const digitalStore = {
  title: '数字化营销门店',
  menus: [
    {
      label: '营销画像',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ovt68z4ewzdqba6l8yte.png ',
      url: '/user/digital-store/marketing-portrait',
    },
    {
      label: '信息哨兵',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/uyp6zsta1v2iookr5af9.png ',
      url: '/user/digital-store/information-sentry',
    },
    {
      label: '业绩哨兵',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ct6nqpua5ttw22rvr4ih.png ',
      url: '/user/digital-store/performance',
    },
    {
      label: '业务管理',
      icon: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/eptx81v81fqd4xggfagx.png',
      url: '/user/digital-store/newBusiness/index',
    },
  ],
}
export const marketingTools = {
  title: '营销工具',
  menus: [
    {
      label: '门店申请',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/dmr04pozfeiw33qvoqgq.png',
      url: '/user/sever/shopUp',
    },
    {
      label: '我的名片',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/exu48rqu12mmp283gf7u.png',
      url: '/user/marketing-tools/contact-guide/index',
    },
    {
      label: '每日签到',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/z9sw8wqqfm3pw67z1yce.png ',
    },
    {
      label: '门店看板',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4fbzhcn6vvipxzta6fs8.png ',
    },
    {
      label: '智能画册',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gd7fnlasc89w4bwgo7ox.png ',
    },
    {
      label: '秒杀活动',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zbi9v1dns5mb7uyzyhkx.png ',
    },
    {
      label: '分享券',
      icon: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/kyzqtejrqt0lxme20rc7.png',
    },
    {
      label: '推广中心',
      icon: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/gox9z18bukb6ws0l2595.png',
      url: '/user/promotionCenter/index',
    },
  ],
}
export const communityServices = {
  title: '社区服务',
  menus: [
    {
      label: '师傅',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/xypr9jh25oftnzjd7m22.png',
      url: '/pages/otherUrl/otherUrl?url=https://www.zhult.com/shifu/#/login',
    },
    {
      label: '城市合伙人',
      icon: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/nbpf99anaovw4jivc085.png',
      url: '/pages/otherUrl/otherUrl?url=https://www.zhult.com/zhanzhang/#/login',
    },
    {
      label: '',
      icon: '',
      url: '',
    },
    {
      label: '',
      icon: '',
      url: '',
    },
  ],
}
export const otherServe = {
  title: '其他服务',
  menus: [
    {
      label: '进销存',
      icon: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/a0xirky4ux574y6frenu.png',
    },
    {
      label: '关注物流',
      icon: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/bi9sucikii11iub2k811.png',
      url: '/logistics/appoint',
    },
    {
      label: '',
      icon: '',
      url: '',
    },
    {
      label: '',
      icon: '',
      url: '',
    },
    // {
    //   label: "代金券充值",
    //   icon: require("../../static/images/user/daijinjuanchongzhi.png"),
    // },
    // {
    //   label: "代金券转赠",
    //   icon: require("../../static/images/user/daijinjuanzhuanzeng.png"),
    // },
  ],
}

// - center 2.0 ---------------------------------------------------------------------------------------------------
export const topMenuData = [
  {
    label: '收藏',
    icon: require('../../static/images/center/collection.png'),
    url: '/user/Collection/Goods-Collection',
    showType: 1,
  },
  {
    label: '足迹',
    icon: require('../../static/images/center/footprint.png'),
    url: '/user/sever/view-history?page=history',
    showType: 1,
  },
  {
    label: '订阅店铺',
    icon: require('../../static/images/center/order.png'),
    url: '/user/sever/view-history?page=follow',
    showType: 1,
  },
  {
    label: '我的钱包',
    icon: require('../../static/images/center/wallet.png'),
    url: '',
    showType: 1,
  },
]

export const myServe = {
  title: '我的服务',
  menus: [
    {
      label: '购物车',
      icon: require('../../static/images/center/shopping-cart-2-fill.png'),
    },
    {
      label: '优惠劵',
      icon: require('../../static/images/center/coupon-2-fill.png'),
    },
    {
      label: '每日签到',
      icon: require('../../static/images/center/calendar-check-fill.png'),
    },
    {
      label: '会员升级',
      icon: require('../../static/images/center/vip-crown-2-fill.png'),
    },
    {
      label: '商品收藏',
      icon: require('../../static/images/center/star-smile-fill.png'),
    },
    {
      label: '联系客服',
      icon: require('../../static/images/center/customer-service-2-fill.png'),
    },
    {
      label: '我的拼团',
      icon: require('../../static/images/center/group-fill.png'),
    },
    {
      label: '地址管理',
      icon: require('../../static/images/center/map-pin-fill.png'),
    },
  ],
}

export const otherIcons = {
  title: '我的权益',
  menus: [
    {
      label: '余额',
      name: 'count',
    },
    {
      label: '优惠劵',
      name: 'voucher',
    },
    {},
    {},
  ],
}

export const getMenus = userLevel => {
  const myEquity = {
    title: '我的权益',
    menus: [
      {
        label: '余额',
        slotName: 'count',
      },
      {
        label: '优惠劵',
        slotName: 'coupon',
      },
      {
        label: '小账本',
        icon: require('../../static/images/center/book-open-fill.png'),
        url: '/user/account-book/index',
        role: [1, 6, 7],
      },
      {
        label: '微店',
        icon: require('../../static/images/center/store-3-fill.png'),
        role: [1, 6, 7],
        url: '/user/sever/microstore/microstore',
      }
    ],
  }

  const normalMenus = {
    title: '我的服务',
    menus: [
      {
        label: '购物车',
        icon: require('../../static/images/center/shopping-cart-2-fill.png'),
        url: '/user/sever/shopCar/shopCar',
      },
      {
        label: '我的推广',
        icon: require('../../static/images/user/code.png'),
        url: '/user/sever/code/code',
        role: [1, 6, 7],
      },
      {
        label: '每日签到',
        icon: require('../../static/images/center/calendar-check-fill.png'),
      },
      {
        label: '会员升级',
        icon: require('../../static/images/center/vip-crown-2-fill.png'),
        url: '/user/sever/userUp/index',
      },
      {
        label: '商品收藏',
        icon: require('../../static/images/center/star-smile-fill.png'),
        url: '/user/sever/view-history?page=collection',
      },
      {
        label: '联系客服',
        icon: require('../../static/images/center/customer-service-2-fill.png'),
      },
      {
        label: '我的拼团',
        icon: require('../../static/images/center/group-fill.png'),
      },
      {
        label: '地址管理',
        icon: require('../../static/images/center/map-pin-fill.png'),
        url: '/user/site/site-manage',
      },
      {},{}
    ],

  }

  if ([7, 1].includes(userLevel)) {
    normalMenus.menus.splice(3, 0, {
      label: '申请开店',
      icon: require('../../static/images/center/brand-apply.png'),
      url: '/user/sever/applyStore/index',
    })
  }

  return {
    myEquity,
    normalMenus,
  }
}
