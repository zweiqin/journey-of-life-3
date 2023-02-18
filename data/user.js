export const topMenus = [
  {
    label: '收藏',
    icon: require('../static/images/center/collection.png'),
    url: '/user/sever/view-history?page=collection',
  },
  {
    label: '足迹',
    icon: require('../static/images/center/footprint.png'),
    url: '/user/sever/view-history?page=history',
  },
  {
    label: '订阅店铺',
    icon: require('../static/images/center/order.png'),
    url: '/user/sever/view-history?page=follow',
  },
  {
    label: '我的钱包',
    icon: require('../static/images/center/wallet.png'),
  },
]

export const shopMenus = [
  {
    label: '待付款',
    icon: require('../static/images/center/awaiPay.png'),
    url: '/user/orderForm/order-form?type=1',
  },
  {
    label: '待发货',
    icon: require('../static/images/center/awaitRec.png'),
    url: '/user/orderForm/order-form?type=2',
  },
  {
    label: '待收货',
    icon: require('../static/images/center/awaitCollection.png'),
    url: '/user/orderForm/order-form?type=3',
  },
  {
    label: '待评价',
    icon: require('../static/images/center/awaitComment.png'),
    url: '/user/orderForm/order-form?type=4',
  },
  {
    label: '所有订单',
    icon: require('../static/images/center/all.png'),
    url: '/user/orderForm/order-form?type=0',
  },
]

export const communityMenus = [
  {
    label: '待付款',
    icon: require('../static/images/center/awaiPay.png'),
    url: '/community-center/order',
  },
  {
    label: '待接单',
    icon: require('../static/images/center/awaitRec.png'),
    url: '/community-center/order',
  },
  {
    label: '已分配',
    icon: require('../static/images/center/fen.png'),
    url: '/community-center/order',
  },
  {
    label: '配送中',
    icon: require('../static/images/center/awaitCollection.png'),
    url: '/community-center/order',
  },
  {
    label: '所有订单',
    icon: require('../static/images/center/all.png'),
    url: '/community-center/order',
  },
]

export const normalMenus = {
  title: '我的服务',
  menus: [
    {
      label: '购物车',
      icon: require('../static/images/center/shopping-cart-2-fill.png'),
      url: '/user/sever/shop-car',
    },
    {
      label: '优惠劵',
      icon: require('../static/images/center/coupon-2-fill.png'),
    },
    {
      label: '每日签到',
      icon: require('../static/images/center/calendar-check-fill.png'),
    },
    {
      label: '会员升级',
      icon: require('../static/images/center/vip-crown-2-fill.png'),
      url: '/user/sever/userUp/index',
      role: [6, 5],
    },
    {
      label: '申请开店',
      icon: require('../static/images/center/brand-apply.png'),
      url: '/user/sever/applyStore/index',
      role: [7, 1],
    },
    {
      label: '商品收藏',
      icon: require('../static/images/center/star-smile-fill.png'),
      url: '/user/sever/view-history?page=collection',
    },
    {
      label: '联系客服',
      icon: require('../static/images/center/customer-service-2-fill.png'),
    },
    {
      label: '我的拼团',
      icon: require('../static/images/center/group-fill.png'),
    },
    {
      label: '地址管理',
      icon: require('../static/images/center/map-pin-fill.png'),
      url: '/user/site/site-manage',
    },
  ],
}

export const myEquity = {
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
      icon: require('../static/images/center/book-open-fill.png'),
      url: '/user/account-book/index',
      role: [6, 7],
      isExistence: true,
    },
    {
      label: '微店',
      icon: require('../static/images/center/store-3-fill.png'),
      role: [6, 7],
      isExistence: true,
      Url: '/user/sever/microstore/microstore',
    },
  ],
}

export const vipEquity = {
  title: '营销管理',
  menus: [
    {
      label: '信息哨兵',
      icon: require('../static/images/center/user-voice-fill.png'),
      url: '/user/digital-store/information-sentry',
    },
    {
      label: '业务管理',
      icon: require('../static/images/center/user-settings-fill.png'),
      url: '/user/digital-store/newBusiness/index',
    },
    {
      label: '业绩哨兵',
      icon: require('../static/images/center/team-fill.png'),
      url: '/user/digital-store/performance',
    },
    {
      label: '推广中心',
      icon: require('../static/images/center/webcam-fill 1.png'),
    },
  ],
}

export const hehuoWq = [
  {
    icon: require('../static/images/center/userUp/copper-diamond-fill.png'),
    label: '一年会员',
  },
  {
    icon: require('../static/images/center/userUp/book-2-fill.png'),
    label: '800+营销案例',
  },
  {
    icon: require('../static/images/center/userUp/alarm-fill.png'),
    label: '营销宝库',
  },
  {
    icon: require('../static/images/center/userUp/store-fill.png'),
    label: '线上门店',
  },
]

export const useTypeData = {
  collection: '我的收藏',
  footprint: '我的足迹',
  subscribe: '我的订阅',
}
