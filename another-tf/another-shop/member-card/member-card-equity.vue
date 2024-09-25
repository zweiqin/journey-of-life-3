<template>
	<view class="member-card-equity-container">
		<JHeader title="商家会员卡权益列表" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: flex-end;flex-wrap: wrap;padding: 0 20rpx;">
			<tui-button
				type="blue" width="260rpx" height="60rpx" margin="10rpx 0 0 20rpx"
				shape="circle"
				@click="go('/another-tf/another-shop/member-card/member-card-equity-form')"
			>
				新增会员卡权益
			</tui-button>
		</view>

		<view style="padding: 18rpx 20rpx 0;">
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">会员卡名称</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.cardName" placeholder="根据会员卡名称搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.cardName || true) && (queryInfo.page = 1) && getCardEquitySearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<tui-radio-group
				:value="queryInfo.memberCardType"
				@change="(e) => queryInfo.memberCardType !== e.detail.value && ((queryInfo.memberCardType = e.detail.value) || true) && (queryInfo.page = 1) && getCardEquitySearchList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<text style="font-size: 30rpx;">类型：</text>
					<tui-label
						v-for="(item, index) in [{ name: '全部', value: '' }, { name: '消费卡', value: '1' }, { name: '次数卡', value: '2' }]"
						:key="index"
					>
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="queryInfo.memberCardType === item.value" :value="item.value"
								color="#07c160" border-color="#999" :scale-ratio="0.8"
							>
							</tui-radio>
							<text>{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
		</view>

		<view v-if="cardEquityList && cardEquityList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in cardEquityList" :key="index" style="padding: 0 20rpx 35rpx;">
				<tui-card :title="{ text: `${item.createTime || '--'}` }" :tag="{ text: `ID：${item.equityId || '--'}` }">
					<template #body>
						<view style="padding: 10rpx 20rpx 0;font-size: 30rpx;">
							<view style="display: flex;align-items: center;">
								<view>
									<image
										style="width: 80rpx;height: 80rpx;vertical-align: bottom;"
										:src="common.seamingImgUrl(item.cardCover) || require('../../../static/images/new-user/fee.icon.png')"
									>
									</image>
								</view>
								<view style="margin: 0 0 0 20rpx;">{{ item.equityName || '--' }}</view>
							</view>
							<view
								v-if="item.equityRemark"
								style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx dashed #dddddd;font-size: 26rpx;color: #999999;"
							>
								权益说明：{{ item.equityRemark }}
							</view>
						</view>
					</template>
					<template #footer>
						<view style="display: flex;justify-content: flex-end;align-items: center;padding: 10rpx 20rpx;">
							<tui-button
								v-if="item.cardId"
								type="warning" width="200rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="getMemberCardInfo(item.cardId)"
							>
								关联会员卡
							</tui-button>
							<tui-button
								type="warning" width="120rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="go(`/another-tf/another-shop/member-card/member-card-equity-form?id=${item.id}`)"
							>
								编辑
							</tui-button>
							<tui-button
								type="warning" width="120rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="handleCardEquityDelete(item)"
							>
								删除
							</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !cardEquityList.length
					? 'loading' : !isEmpty && cardEquityList.length && (cardEquityList.length >= cardEquityTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无会员卡权益内容~</tui-no-data>
		</view>

		<tui-bottom-popup
			:z-index="997" :mask-z-index="996" :show="isShowMemberCardPopup"
			@close="() => {}"
		>
			<scroll-view scroll-y style="height: 100%;">
				<view>
					<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
						<tui-icon
							name="close" :size="50" unit="rpx" color="#999999"
							@click="isShowMemberCardPopup = false"
						></tui-icon>
					</view>
					<view style="padding: 40rpx 0 0;">
						<ATFMemberCardInfo :data="memberCardInfo" :is-shop-operation="false"></ATFMemberCardInfo>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getPageAllShopMemberCardEquityApi, deleteByIdShopMemberCardEquityApi, getByIdShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MemberCardEquity',
	data() {
		return {
			isEmpty: false,
			cardEquityList: [],
			cardEquityTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				cardName: '',
				memberCardType: ''
			},
			isShowMemberCardPopup: false,
			memberCardInfo: {}
		}
	},
	onLoad() {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.getCardEquitySearchList()
			}
		})
	},
	methods: {
		getCardEquitySearchList(isLoadmore) {
			uni.showLoading()
			getPageAllShopMemberCardEquityApi(this.queryInfo).then((res) => {
				this.cardEquityTotal = res.data.total
				if (isLoadmore) {
					this.cardEquityList.push(...res.data.list)
				} else {
					this.cardEquityList = res.data.list
				}
				this.isEmpty = this.cardEquityList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleCardEquityDelete(item) {
			if (!item.equityId) {
				return this.$showToast('缺少会员卡权益信息')
			}
			uni.showModal({
				title: '提示',
				content: '确认删除该会员卡权益？',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading()
						deleteByIdShopMemberCardEquityApi({
							id: item.equityId
						})
							.then((res) => {
								uni.hideLoading()
								this.$showToast('删除成功')
								setTimeout(() => {
									this.queryInfo.page = 1
									this.getCardEquitySearchList()
								}, 2000)
							})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		getMemberCardInfo(memberCardId) {
			this.isShowMemberCardPopup = true
			if (!memberCardId) return this.$showToast('缺少会员卡ID')
			uni.showLoading()
			getByIdShopMemberCardApi({ id: memberCardId })
				.then((res) => {
					uni.hideLoading()
					this.memberCardInfo = res.data
					this.isShowMemberCardPopup = true
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.cardEquityList.length < this.cardEquityTotal) {
			++this.queryInfo.page
			this.getCardEquitySearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.member-card-equity-container {
	min-height: 100vh;
	background-color: #eeeeee;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	/deep/ .tui-card {
		margin: 0;

		.tui-card-header {
			padding: 10rpx 20rpx;
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
