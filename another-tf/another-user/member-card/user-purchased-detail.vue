<template>
	<view class="user-purchased-detail-container">
		<JHeader title="用户购买会员卡详情" width="50" height="50"></JHeader>

		<view style="padding: 10rpx 20rpx 35rpx;">
			<ATFCardPurchasedInfo
				:data="cardPurchasedInfo" :is-show-write-off="showType === 'user'" detail-type=""
			></ATFCardPurchasedInfo>
		</view>
	</view>
</template>

<script>
import { getByIdShopMemberCardUserApi, getPageCardUserIdShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'UserPurchasedDetail',
	components: {
	},
	data() {
		return {
			showType: '',
			cardPurchasedInfo: {
				cardOrderId: '',
				promoterUserId: '', // 推广用户Id
				buyerUserId: '', // 用户ID
				shopId: '', // 店铺id
				cardId: '', // 关联会员卡Id
				cardAmount: '', // 会员卡余额
				cardNum: '', // 会员卡编号
				cardUrl: '', // 核销码
				startTime: '', // 有效期开始日期
				endTime: '', // 有效期结束日期
				jsonRemark: '', // 备注
				status: '', // 会员卡状态：1-开启 2-禁用
				createTime: '', // 创建时间
				updateTime: '', // 更新时间
				purchaseName: '', // 购买用户名称
				promotionName: '', // 推广用户名称
				promotionPhone: '', // 推广用户号码
				promotionHeadImage: '', // 推广用户头像
				promotionCommission: '', // 推广用户佣金
				phone: '', // 用户号码
				headImage: '', // 用户头像
				name: '', // 用户呢称
				cardEntryList: [], // 入账记录
				cardOutgoingList: [], // 出账记录
				cardPromoter: '', // 推广用户数据
				shopName: '', // 商家名称
				cardName: '', // 会员卡名称
				cardDiscountedPrice: '', // 售价
				memberCardType: '', // 会员卡类型：1-消费卡 2-次数卡
				memberCardChannel: '' // 发行渠道：1-app 2-H5 3-支付宝小程序 4-线下渠道 5-微信小程序 6-代理发行
			}
		}
	},
	onLoad(options) {
		this.showType = options.type || 'user'
		this.cardPurchasedInfo.cardOrderId = options.id || ''
		uni.showLoading()
		let _url
		let params
		if (this.showType === 'user') {
			_url = getByIdShopMemberCardUserApi
			params = { id: this.cardPurchasedInfo.cardOrderId }
		} else if (this.showType === 'shop') {
			_url = getPageCardUserIdShopMemberCardApi
			params = { cardOrderId: this.cardPurchasedInfo.cardOrderId }
		}
		_url(params)
			.then((res) => {
				uni.hideLoading()
				this.cardPurchasedInfo = res.data
			})
			.catch((e) => {
				uni.hideLoading()
			})
	}
}
</script>

<style lang="less" scoped>
.user-purchased-detail-container {
	min-height: 100vh;
	background-color: #eeeeee;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
