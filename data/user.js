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
  // {}
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


export const useTypeData = {
  collection: '我的收藏',
  footprint: '我的足迹',
  subscribe: '我的订阅',
}
