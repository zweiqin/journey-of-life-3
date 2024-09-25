<template>
	<view class="user-purchased-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="arrowleft" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">用户购买会员卡列表</text>
			</view>
		</BeeBack>

		<view v-if="showType === 'user'" style="padding: 18rpx 20rpx 0;">
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">商家名称</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.shopName" placeholder="根据商家名称搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.shopName || true) && (queryInfo.page = 1) && getCardUserPurchasedSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">推广用户手机号</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.phone" placeholder="根据推广用户手机号搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.phone || true) && (queryInfo.page = 1) && getCardUserPurchasedSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
		</view>
		<view v-else-if="showType === 'shop'" style="padding: 18rpx 20rpx 0;">
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">用户电话</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.phone" placeholder="根据用户电话搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.phone || true) && (queryInfo.page = 1) && getCardUserPurchasedSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<tui-radio-group
				:value="queryInfo.status"
				@change="(e) => queryInfo.status !== e.detail.value && ((queryInfo.status = e.detail.value) || true) && (queryInfo.page = 1) && getCardUserPurchasedSearchList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<text style="font-size: 30rpx;">会员卡状态：</text>
					<tui-label
						v-for="(item, index) in [{ name: '全部', value: '' }, { name: '开启', value: '1' }, { name: '禁用', value: '2' }]"
						:key="index"
					>
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="queryInfo.status === item.value" :value="item.value"
								color="#07c160" border-color="#999" :scale-ratio="0.8"
							>
							</tui-radio>
							<text>{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
		</view>

		<view v-if="cardPurchasedList && cardPurchasedList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in cardPurchasedList" :key="index" style="padding: 0 20rpx 35rpx;">
				<ATFCardPurchasedInfo
					:data="item" :is-show-write-off="showType === 'user'" :detail-type="showType"
				></ATFCardPurchasedInfo>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !cardPurchasedList.length
					? 'loading' : !isEmpty && cardPurchasedList.length && (cardPurchasedList.length >= cardPurchasedTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无会员卡订单内容~</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getPageAllShopMemberCardUserApi, getPageCardUserAllShopMemberCardApi } from '../../../api/anotherTFInterface'
import { T_PAY_ORDER } from '../../../constant'

export default {
	name: 'UserPurchased',
	components: {
	},
	data() {
		return {
			showType: '',
			isEmpty: false,
			cardPurchasedList: [],
			cardPurchasedTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				shopName: '',
				phone: '',
				status: ''
			}
		}
	},
	onLoad(options) {
		this.showType = options.type || 'user'
	},
	onShow() {
		if (this.showType === 'user') {
			this.$store.dispatch('auth/unifiedProcessingShopAction', {
				cb: () => {
					this.getCardUserPurchasedSearchList()
				}
			})
		} else if (this.showType === 'shop') {
			// if (uni.getStorageSync(T_PAY_ORDER) && [ 'memberCard' ].includes(uni.getStorageSync(T_PAY_ORDER).type)) {
			// 	this.handleChangeOrderMode(uni.getStorageSync(T_PAY_ORDER).type)
			// } else if ([ 'memberCard' ].includes(getApp().globalData.orderTypeShow)) {
			// 	this.handleChangeOrderMode(getApp().globalData.orderTypeShow)
			// }
			uni.removeStorageSync(T_PAY_ORDER)
			getApp().globalData.orderTypeShow = ''
			this.getCardUserPurchasedSearchList()
		}
	},
	methods: {
		getCardUserPurchasedSearchList(isLoadmore) {
			uni.showLoading()
			let _url
			if (this.showType === 'user') {
				_url = getPageAllShopMemberCardUserApi
			} else if (this.showType === 'shop') {
				_url = getPageCardUserAllShopMemberCardApi
			}
			_url(this.queryInfo).then((res) => {
				this.cardPurchasedTotal = res.data.total
				if (isLoadmore) {
					this.cardPurchasedList.push(...res.data.list)
				} else {
					this.cardPurchasedList = res.data.list
				}
				this.isEmpty = this.cardPurchasedList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.cardPurchasedList.length < this.cardPurchasedTotal) {
			++this.queryInfo.page
			this.getCardUserPurchasedSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.user-purchased-container {
	min-height: 100vh;
	background-color: #eeeeee;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}
}
</style>
