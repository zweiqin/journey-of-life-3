export const shopOrderMneus = [
  {
    name: '待付款',
    icon: require('../../static/images/new-user/orders/await-pay.png'),
    url: '/user/orderForm/order-form?type=1',
  },
  {
    name: '待发货',
    icon: require('../../static/images/new-user/orders/await-fa.png'),
    url: '/user/orderForm/order-form?type=2',
  },
  {
    name: '待收货',
    icon: require('../../static/images/new-user/orders/await-shou.png'),
    url: '/user/orderForm/order-form?type=3',
  },
  {
    name: '待评价',
    icon: require('../../static/images/new-user/orders/await-ping.png'),
    url: '/user/orderForm/order-form?type=4',
  },
  {
    name: '所有订单',
    icon: require('../../static/images/new-user/orders/all.png'),
    url: '/user/orderForm/order-form?type=0',
  },
]

export const shequOrderMenus = [
  {
    name: '待付款',
    icon: require('../../static/images/new-user/orders/await-pay.png'),
    url: '/community-center/order',
  },
  {
    name: '待接单',
    icon: require('../../static/images/new-user/orders/await-jie.png'),
    url: '/community-center/order',
  },
  {
    name: '已分配',
    icon: require('../../static/images/new-user/orders/await-fen.png'),
    url: '/community-center/order',
  },
  {
    name: '配送中',
    icon: require('../../static/images/new-user/orders/await-fa.png'),
    url: '/community-center/order',
  },
  {
    name: '所有订单',
    icon: require('../../static/images/new-user/orders/all.png'),
    url: '/community-center/order',
  },
]

export const myEquity = [
  {
    name: '小账本',
    icon: require('../../static/images/new-user/equity/account-book.png'),
    role: [1, 6, 7],
    url: '/user/account-book/index',
  },
  {
    name: '微店',
    icon: require('../../static/images/new-user/equity/microstore.png'),
    role: [1, 6, 7],
    url: '/user/sever/microstore/microstore',
  },
  {
    name: '会员升级',
    icon: require('../../static/images/new-user/equity/apply-store.png'),
    url: '/user/sever/userUp/partner-appay',
  },
  {
    name: '区域代理',
    icon: require('../../static/images/new-user/equity/regional-agent.png'),
    url: '',
  },
  {
    name: '我的推广',
    icon: require('../../static/images/new-user/equity/popularize.png'),
    url: '/user/sever/code/code',
    role: [1, 6, 7],
  },
	{
		name: '申请开店',
		icon: require('../../static/images/new-user/equity/apply-for.png'),
		url: '/user/sever/applyStore/index',
		role: [ 1, 6, 7 ],
	},
]

export const myServe = [
  {
    name: '地址管理',
    icon: require('../../static/images/new-user/serve/address.png'),
    url: '/user/site/site-manage',
  },
  {
    name: '联系客服',
    icon: require('../../static/images/new-user/serve/chat.png'),
    url: '/user/sever/customer-service/customer-service',
  },
  // {
  //   name: '我的拼团',
  //   icon: require('../../static/images/new-user/serve/collage.png'),
  // },
  // {
  //   name: '每日签到',
  //   icon: require('../../static/images/new-user/serve/qian.png'),
  // },
]
