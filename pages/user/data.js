/**
import { status } from './../../user/digital-store/newBusiness/config';
 * external: 跳转外部网页， 跳转路径：/user/view
 * type: 用于区分不同逻辑
 * name: 用于区分不同样式
 */

import { ANOTHER_TF_SETTLE } from './../../config'

export const shequTwiceOrder = [
	{
		name: '待支付',
		numberKey: '',
		value: 0
	},
	{
		name: '已付款',
		numberKey: '',
		value: 1
	},
	{
		name: '拒绝',
		numberKey: '',
		value: 2
	}
]

export const myFunction = [
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
		name: '活动中心',
		icon: require('../../static/images/new-user/menu-icon/huodongzhongxin.png'),
		url: '/user/sever/activityCenter/index'
	},
	{
		name: '足迹',
		icon: require('../../static/images/new-user/menu-icon/zuji.png'),
		// url: '/user/sever/view-history?page=history',
		url: '/another-tf/another-serve/footprintList/index'
	},
	{
		name: '电子名片',
		icon: require('../../static/images/new-user/menu-icon/dingyue.png'),
		type: 'electronicCard'
	},
	{
		name: '我的账本',
		icon: require('../../static/images/new-user/menu-icon/wodezhangben.png'),
		// url: '/user/account-book/index', // 老的
		url: '/another-tf/another-user/commission-statistics/commission-statistics'
		// url: '/another-tf/another-user/small-ledger/index'
	},
	{
		name: '联系客服',
		icon: require('../../static/images/new-user/menu-icon/lianxikefu.png'),
		// url: '/user/sever/service-center/service-center',
		type: 'flyToService'
	},
	{
		name: '地址管理',
		icon: require('../../static/images/new-user/menu-icon/dizhiguanli.png'),
		// url: '/user/site/site-manage',
		url: '/another-tf/another-serve/address/index'
	},
	{
		name: '我的推广',
		icon: require('../../static/images/new-user/menu-icon/wodetuiguang.png'),
		type: 'userInvitation'
	},
	{
  	name: '质保卡',
  	icon: require('../../static/images/new-user/menu-icon/quality-assurance-card.png'),
  	url: '/user/quality-assurance-card/quality-assurance-card'
	}
	// {
	// 	name: '我的推广',
	// 	icon: require('../../static/images/new-user/menu-icon/wodetuiguang.png'),
	// 	url: '/another-tf/another-user/commission-statistics/vip-user'
	// },
	// {
	// 	name: '会员升级',
	// 	icon: require('../../static/images/new-user/menu-icon/wodezhangben.png'),
	// 	url: '/another-tf/another-user/user-upgrade/user-upgrade-application'
	// },
	// {
	//   name: "会员升级", // 老团蜂的
	//   icon: require("../../static/images/new-user/menu-icon/wodezhangben.png"),
	//   url: "/user/sever/userUp/partner-appay",
	// },
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
	},
	{
		name: '商家收款码',
		icon: require('../../static/images/new-user/menu-icon/shangjiashoukuanma.png'),
		url: '/another-tf/another-user/collection-code/index',
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
		url: 'https://www.zhult.com/shifu/'
	},
	{
		name: '店长端',
		icon: require('../../static/images/new-user/menu-icon/dianzhangduan.png'),
		type: 'external',
		url: 'https://www.zhult.com/zhanzhang/#/login'
	},
	{
		name: '选品中心',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-user/selection-center/index',
		showRole: ['regimentalcommander', 'copartner']
	}
]

export const myPreferential = [
	{
		name: '签到积分',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/integral/index'
	},
	// #ifndef APP
	{
		name: '我的拼团',
		icon: require('../../static/images/new-user/menu-icon/shenqingtuanzhang.png')
	},
	// #endif
	{
		name: '我的抽奖',
		icon: require('../../static/images/new-user/menu-icon/zhinenghuace.png'),
		type: 'participateLottery'
	},
	// #ifndef APP
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
	// #endif
]

export const otherFunction = [
	{
		name: '便民服务',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/pages/user/kuai-di/index'
	},
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
		icon: require('../../static/images/new-user/menu-icon/shenqingkaidian.png'),
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
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/afterSale/index'
	},
	{
		name: '加盟统计',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-user/franchisee-statistics/index',
		showRole: [ 'franchisee' ]
	},
	{
		name: '银行卡',
		icon: require('../../static/images/new-user/menu-icon/yinhangka.png'),
		// url: '/user/sever/bank-card/index',
		url: '/another-tf/another-serve/bankcard/index'
	},
	{
		name: '我的卡券',
		icon: require('../../static/images/new-user/menu-icon/shenqingkaidian.png'),
		url: '/another-tf/another-serve/coupon/index'
	},
	{
		name: '组合活动',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-user/combination-activities/index'
	},
	// shopServe
	{
		name: '商品类别',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-user/product-category/index'
	},
	{
		name: '选品管理',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-user/product-selection-management/index'
	},
	{
		name: '秒杀专区',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/discount/spikeList'
	},
	{
		name: '拼团专区',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/discount/groupBuy'
	},
	{
		name: '平台折扣',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/discount/platformDiscount?discountId=60'
	},
	{
		name: '商家折扣',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-serve/discount/discount?shopId=186&shopDiscountId=43'
	},
	{
		name: '套壳链接',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		type: 'outsideLink',
		url: ''
	},
	{
		name: 'mm链接',
		icon: require('../../static/images/new-user/menu-icon/fensitongji.png'),
		url: '/another-tf/another-user/1ILoveMorningMeeting/index'
	}
]
