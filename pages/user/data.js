/**
import { status } from './../../user/digital-store/newBusiness/config';
 * external: 跳转外部网页， 跳转路径：/user/view
 * type: 用于区分不同逻辑
 * name: 用于区分不同样式
 */

import { ANOTHER_TF_SETTLE } from './../../config'

export const shopOrderMneus = [
	{
		name: '待付款',
		icon: require('../../static/images/new-user/orders/await-pay.png'),
		url: '/user/orderForm/order-form?type=1'
	},
	{
		name: '待发货',
		icon: require('../../static/images/new-user/orders/await-fa.png'),
		url: '/user/orderForm/order-form?type=2'
	},
	{
		name: '待收货',
		icon: require('../../static/images/new-user/orders/await-shou.png'),
		url: '/user/orderForm/order-form?type=3'
	},
	{
		name: '待评价',
		icon: require('../../static/images/new-user/orders/await-ping.png'),
		url: '/user/orderForm/order-form?type=4'
	},
	{
		name: '所有订单',
		icon: require('../../static/images/new-user/orders/all.png'),
		url: '/user/orderForm/order-form?type=0'
	}
]

export const shequOrderMenus = [
	{
		name: '待付款',
		icon: require('../../static/images/new-user/orders/await-pay.png'),
		url: '/community-center/order',
		numberKey: 'WAIT_PAY'
	},
	{
		name: '服务中',
		icon: require('../../static/images/new-user/orders/await-fa.png'),
		url: '/community-center/order',
		numberKey: 'DISTRIBUTION'
	},
	{
		name: '已完成',
		icon: require('../../static/images/new-user/orders/await-jie.png'),
		url: '/community-center/order',
		numberKey: ''
	},
	{
		name: '待评价',
		icon: require('../../static/images/new-user/orders/await-fen.png'),
		url: '/community-center/order',
		numberKey: '',
		navigate() {
			uni.navigateTo({
				url: '/community-center/comment-order/comment-order'
			})
		}
	},

	{
		name: '所有订单',
		icon: require('../../static/images/new-user/orders/all.png'),
		url: '/community-center/order'
	}
]

export const shequTwiceOrder = [
	{
		name: '待支付',
		icon: require('../../static/images/user/await-pay.png'),
		url: '/community-center/twice-order?type=0',
		numberKey: '',
		value: 0
	},
	{
		name: '已付款',
		icon: require('../../static/images/user/payed.png'),
		url: '/community-center/twice-order?type=1',
		numberKey: '',
		value: 1
	},
	{
		name: '拒绝',
		icon: require('../../static/images/user/refused.png'),
		url: '/community-center/twice-order?type=2',
		numberKey: '',
		value: 2
	}
]

export const mapGroupStatus = (status) => ({ 1: '待审核', 2: '开始审核', 3: '审核通过', 4: '审核不通过', 5: '冻结', 6: '审核不通过', 7: '打款失败' }[status])

export const myEquity = [
	{
		name: '小账本',
		icon: require('../../static/images/new-user/equity/account-book.png'),
		// url: '/user/account-book/index' // 老的
		url: '/user/commission-statistics/commission-statistics'
	},
	{
		name: '微店',
		icon: require('../../static/images/new-user/equity/microstore.png'),
		role: [1, 6, 7],
		url: '/user/sever/microstore/microstore'
	},
	// {
	//   name: "会员升级",
	//   icon: require("../../static/images/new-user/equity/apply-store.png"),
	//   url: "/user/sever/userUp/partner-appay",
	// },
	{
		name: '申请团长',
		icon: require('../../static/images/new-user/equity/group.png'),
		url: '/user/sever/regimental-commander/regimental-commander',
		type: 'regimentalCommander'
	},
	{
		name: '区域代理',
		icon: require('../../static/images/new-user/equity/regional-agent.png'),
		url: '/user/sever/regional-agent/regional-agent'
	},
	{
		name: '我的推广',
		icon: require('../../static/images/new-user/equity/popularize.png'),
		url: '/user/sever/group-code/group-code'
	},
	{
		name: '申请开店',
		icon: require('../../static/images/new-user/equity/apply-for.png'),
		url: '/user/sever/applyStore/index',
		role: [1, 6, 7]
	},
	{
		name: '智能画册',
		icon: require('../../static/images/new-user/equity/smart-album.png'),
		url: '/user/smartAlbum/index'
	},
	{
		name: '活动中心',
		icon: require('../../static/images/new-user/equity/sharing-activities.png'),
		url: '/user/sever/activityCenter/index'
	},
	{
		name: '股东看板',
		icon: require('../../static/images/new-user/equity/gudong.png'),
		url: '/user/shareholder/shareholder'
	}
]

export const myFunction = [
	{
		name: '购物车',
		icon: require('../../static/images/new-user/function/shop-car.png'),
		url: '/user/sever/shopCar/shopCar'
	},
	{
		name: '收藏',
		icon: require('../../static/images/new-user/function/collection.png'),
		url: '/user/sever/view-history?page=collection'
	},
	{
		name: '足迹',
		icon: require('../../static/images/new-user/function/foot-print.png'),
		url: '/user/sever/view-history?page=history'
	},
	{
		name: '订阅',
		icon: require('../../static/images/new-user/function/follow.png'),
		url: '/user/sever/view-history?page=follow'
	}
]

export const myServe = [
	{
		name: '商家入驻',
		icon: require('../../static/images/new-user/serve/zz.png'),
		type: 'settle',
		url: ANOTHER_TF_SETTLE
	},
	{
		name: '银行卡',
		icon: require('../../static/images/new-user/serve/yinhangka.png'),
		url: '/user/sever/bank-card/index'
	},
	{
		name: '地址管理',
		icon: require('../../static/images/new-user/serve/address.png'),
		url: '/user/site/site-manage'
	},
	{
		name: '联系客服',
		icon: require('../../static/images/new-user/serve/chat.png'),
		url: '/user/sever/service-center/service-center'
	},
	{
		name: '师傅端',
		icon: require('../../static/images/new-user/serve/sf.png'),
		type: 'external',
		url: 'https://www.zhult.com/shifu/#/login'
	},
	{
		name: '店长端',
		icon: require('../../static/images/new-user/serve/zz.png'),
		type: 'external',
		url: 'https://www.zhult.com/zhanzhang/#/login'
	}
]

export const shopServe = [
	{
		name: '商家码',
		icon: require('../../static/images/new-user/serve/zz.png'),
		type: 'shopInvitation'
	},
	{
		name: '商家订单',
		icon: require('../../static/images/new-user/serve/zz.png'),
		url: '/another-tf/another-user/shop-orders/index'
	},
	{
		name: '商家统计',
		icon: require('../../static/images/new-user/serve/zz.png'),
		url: '/another-tf/another-user/shop-statistics/index'
	}
]

export const additionalFunction = [
	{
		name: '找材料',
		icon: require('../../static/images/tabbar/stuff.png'),
		url: '/pages/stuff/stuff'
	},
	{
		name: '找物流',
		icon: require('../../static/images/tabbar/logistics.png'),
		url: '/pages/logistics/logistics'
	},
	{
		name: '寄快递',
		icon: require('../../static/images/tabbar/kuaidi.png'),
		url: '/pages/user/kuai-di/index'
	},
	{
		name: '加油站',
		icon: require('../../static/images/tabbar/jiayouqi.png'),
		url: '/pages/serviceoil/serviceoil'
	}
]
