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

export const myFunction = [
	{
		name: '邀请码',
		icon: require('../../static/images/new-user/menu-icon/yaoqingma.png'),
		type: 'userInvitation'
	},
	{
		name: '会员升级',
		icon: require('../../static/images/new-user/menu-icon/huiyuanshengji.png'),
		url: '/another-tf/another-user/user-upgrade/user-upgrade-application'
	},
	{
		name: '我的推广',
		icon: require('../../static/images/new-user/menu-icon/wodetuiguang.png'),
		url: '/another-tf/another-user/commission-statistics/vip-user'
	},
	// {
	//   name: "会员升级", // 老团蜂的
	//   icon: require("../../static/images/new-user/menu-icon/huiyuanshengji.png"),
	//   url: "/user/sever/userUp/partner-appay",
	// },
	{
		name: '小账本',
		icon: require('../../static/images/new-user/menu-icon/xiaozhangben.png'),
		// url: '/user/account-book/index', // 老的
		url: '/another-tf/another-user/commission-statistics/commission-statistics'
		// url: '/another-tf/another-user/small-ledger/index'
	},
	{
		name: '活动中心',
		icon: require('../../static/images/new-user/menu-icon/huodongzhongxin.png'),
		url: '/user/sever/activityCenter/index'
	},
	{
		name: '电子名片',
		icon: require('../../static/images/new-user/menu-icon/dingyue.png')
	},
	{
		name: '购物车',
		icon: require('../../static/images/new-user/menu-icon/gouwuche.png'),
		url: '/another-tf/another-serve/shopCar/shopCar'
	},
	{
		name: '收藏',
		icon: require('../../static/images/new-user/menu-icon/shoucang.png'),
		// url: '/user/sever/view-history?page=collection',
		url: '/another-tf/another-serve/collection/index'
	},
	{
		name: '足迹',
		icon: require('../../static/images/new-user/menu-icon/zuji.png'),
		// url: '/user/sever/view-history?page=history',
		url: '/another-tf/another-serve/footprintList/index'
	}
	// {
	// 	name: '我的推广', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/wodetuiguang.png'),
	// 	url: '/user/sever/group-code/group-code'
	// },
	// {
	// 	name: '订阅', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/dingyue.png'),
	// 	url: '/user/sever/view-history?page=follow'
	// },
	// {
	// 	name: '微店', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/weidian.png'),
	// 	role: [1, 6, 7],
	// 	url: '/user/sever/microstore/microstore'
	// },
	// {
	// 	name: '申请团长', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/shenqingtuanzhang.png'),
	// 	url: '/user/sever/regimental-commander/regimental-commander',
	// 	type: 'regimentalCommander'
	// },
	// {
	// 	name: '区代理', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/qudaili.png'),
	// 	url: '/user/sever/regional-agent/regional-agent'
	// },
	// {
	// 	name: '申请开店', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/shenqingkaidian.png'),
	// 	url: '/user/sever/applyStore/index',
	// 	role: [1, 6, 7]
	// },
	// {
	// 	name: '智能画册', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/zhinenghuace.png'),
	// 	url: '/user/smartAlbum/index'
	// },
	// {
	// 	name: '股东看板', // 老团蜂的
	// 	icon: require('../../static/images/new-user/menu-icon/gudongkanban.png'),
	// 	url: '/user/shareholder/shareholder'
	// },
]

export const myServe = [
	{
		name: '地址管理',
		icon: require('../../static/images/new-user/menu-icon/dizhiguanli.png'),
		// url: '/user/site/site-manage',
		url: '/another-tf/another-serve/address/index'
	},
	{
		name: '银行卡',
		icon: require('../../static/images/new-user/menu-icon/yinhangka.png'),
		// url: '/user/sever/bank-card/index',
		url: '/another-tf/another-serve/bankcard/index'
	},
	{
		name: '卡包',
		icon: require('../../static/images/new-user/menu-icon/shenqingkaidian.png'),
		url: '/another-tf/another-serve/coupon/index'
	},
	{
		name: '联系客服',
		icon: require('../../static/images/new-user/menu-icon/lianxikefu.png'),
		// url: '/user/sever/service-center/service-center',
		type: 'flyToService'
	}
]

export const shopServe = [
	{
		name: '商家认证',
		icon: require('../../static/images/new-user/menu-icon/shangjiaruzhu.png'),
		type: 'settle',
		url: ANOTHER_TF_SETTLE
	},
	{
		name: '商家订单',
		icon: require('../../static/images/new-user/menu-icon/shangjiadingdan.png'),
		url: '/another-tf/another-user/shop-orders/index',
		showRole: ['shop', 'merchantStaff']
	},
	{
		name: '商家充值',
		icon: require('../../static/images/new-user/menu-icon/shangjiachongzhi.png'),
		// url: '/another-tf/another-user/shop-recharge/shop-recharge'
		url: '/another-tf/another-user/shop-recharge/selectMerchant',
		showRole: [ 'shop' ]
	},
	{
		name: '商品管理',
		icon: require('../../static/images/new-user/menu-icon/shangpinguanli.png'),
		showRole: [ 'shop' ]
	},
	{
		name: '商家统计',
		icon: require('../../static/images/new-user/menu-icon/shangjiatongji.png'),
		url: '/another-tf/another-user/shop-statistics/index',
		showRole: ['shop', 'merchantStaff']
	},
	{
		name: '商家营销',
		icon: require('../../static/images/new-user/menu-icon/shoukuanzhanghu.png'),
		showRole: [ 'shop' ]
	},
	{
		name: '商家码',
		icon: require('../../static/images/new-user/menu-icon/shangjiama.png'),
		type: 'shopInvitation',
		showRole: [ 'shop' ]
	},
	{
		name: '收款账户',
		icon: require('../../static/images/new-user/menu-icon/shoukuanzhanghu.png'),
		url: '/another-tf/another-user/receiving-account/index',
		showRole: ['shop', 'merchantStaff']
	}
]

export const additionalFunction = [
	{
		name: '找材料',
		icon: require('../../static/images/new-user/menu-icon/zhaocailiao.png'),
		url: '/pages/stuff/stuff'
	},
	{
		name: '找物流',
		icon: require('../../static/images/new-user/menu-icon/zhaowuliu.png'),
		url: '/pages/logistics/logistics'
	},
	{
		name: '寄快递',
		icon: require('../../static/images/new-user/menu-icon/jikuaidi.png'),
		url: '/pages/user/kuai-di/index'
	},
	{
		name: '加油站',
		icon: require('../../static/images/new-user/menu-icon/jiayouzhan.png'),
		url: '/pages/serviceoil/serviceoil'
	},
	{
		name: '师傅端',
		icon: require('../../static/images/new-user/menu-icon/shifuduan.png'),
		type: 'external',
		url: 'https://www.zhult.com/shifu/#/login'
	},
	{
		name: '店长端',
		icon: require('../../static/images/new-user/menu-icon/dianzhangduan.png'),
		type: 'external',
		url: 'https://www.zhult.com/zhanzhang/#/login'
	}
]

export const myPreferential = [
	{
		name: '签到积分',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/integral/index'
	},
	{
		name: '我的拼团',
		icon: require('../../static/images/new-user/menu-icon/shenqingtuanzhang.png')
	},
	{
		name: '我的抽奖',
		icon: require('../../static/images/new-user/menu-icon/zhinenghuace.png'),
		type: 'participateLottery'
	},
	{
		name: '我的红包',
		icon: require('../../static/images/new-user/menu-icon/wodehongbao.png')
	},
	{
		name: '秒杀',
		icon: require('../../static/images/new-user/menu-icon/miaosha.png')
	},
	{
		name: '满减',
		icon: require('../../static/images/new-user/menu-icon/weidian.png')
	},
	{
		name: '同城卡',
		icon: require('../../static/images/new-user/menu-icon/qudaili.png')
	}
]

export const otherFunction = [
	// myFunction
	{
		name: '会员中心',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/memberCenter/index'
	},
	{
		name: '分销中心',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/distributionModule/index'
	},
	{
		name: '推广中心',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/ledger/index'
	},
	{
		name: '优惠券',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/coupon/list'
	},
	{
		name: '粉丝统计',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-user/fan-statistics/index'
	},
	// {
	// 	name: '加盟商',
	// 	icon: require('../../static/images/new-user/menu-icon/shenqingtuanzhang.png'),
	// 	url: '/another-tf/another-user/advanced-role-application/index?type=4',
	// },
	// {
	// 	name: '区代理',
	// 	icon: require('../../static/images/new-user/menu-icon/qudaili.png'),
	// 	url: '/another-tf/another-user/advanced-role-application/index?type=5'
	// },
	{
		name: '我的售后',
		icon: require('../../static/images/new-user/menu-icon/shangjiatongji.png'),
		url: '/another-tf/another-serve/afterSale/index'
	},
	{
		name: '加盟统计',
		icon: require('../../static/images/new-user/menu-icon/shangjiatongji.png'),
		url: '/another-tf/another-user/franchisee-statistics/index',
		showRole: [ 'franchisee' ]
	}
	// shopServe
]
