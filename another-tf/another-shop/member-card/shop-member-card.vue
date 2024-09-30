<template>
	<view class="shop-member-card-container">
		<JHeader title="商家会员卡列表" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: flex-end;flex-wrap: wrap;padding: 0 20rpx;">
			<tui-button
				type="blue" width="220rpx" height="60rpx" margin="10rpx 0 0 20rpx"
				shape="circle"
				@click="go('/another-tf/another-shop/member-card/shop-member-card-form')"
			>
				新增会员卡
			</tui-button>
			<tui-button
				type="blue" width="220rpx" height="60rpx" margin="10rpx 0 0 20rpx"
				shape="circle"
				@click="go('/another-tf/another-shop/member-card/member-card-equity')"
			>
				会员卡权益
			</tui-button>
			<tui-button
				type="blue" width="180rpx" height="60rpx" margin="10rpx 0 0 20rpx"
				shape="circle"
				@click="go('/another-tf/another-shop/member-card/settlement-review')"
			>
				结算审核
			</tui-button>
			<tui-button
				type="blue" width="180rpx" height="60rpx" margin="10rpx 0 0 20rpx"
				shape="circle"
				@click="go('/another-tf/another-user/member-card/user-purchased?type=shop')"
			>
				用户已购
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
								@click="(queryInfo.page = 1) && getMemberCardSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<tui-radio-group
				:value="queryInfo.memberCardType"
				@change="(e) => (queryInfo.memberCardType !== e.detail.value) && ((queryInfo.memberCardType = e.detail.value) || true) && (queryInfo.page = 1) && getMemberCardSearchList()"
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
			<tui-radio-group
				:value="queryInfo.memberCardState"
				@change="(e) => queryInfo.memberCardState !== e.detail.value && ((queryInfo.memberCardState = e.detail.value) || true) && (queryInfo.page = 1) && getMemberCardSearchList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<text style="font-size: 30rpx;">状态：</text>
					<tui-label
						v-for="(item, index) in [{ name: '全部', value: '' }, { name: '已发行', value: '1' }, { name: '未发行', value: '2' }, { name: '已下架', value: '3' }]"
						:key="index"
					>
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="queryInfo.memberCardState === item.value" :value="item.value"
								color="#07c160" border-color="#999" :scale-ratio="0.8"
							>
							</tui-radio>
							<text>{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
		</view>

		<view v-if="memberCardList && memberCardList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in memberCardList" :key="index" style="padding: 0 20rpx 35rpx;">
				<ATFMemberCardInfo
					:data="item"
					@off-shelf="handleMemberCardOffShelf" @issue="handleMemberCardIssue"
				></ATFMemberCardInfo>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !memberCardList.length
					? 'loading' : !isEmpty && memberCardList.length && (memberCardList.length >= memberCardTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无商家会员卡内容~</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getPageAllShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ShopMemberCard',
	data() {
		return {
			isEmpty: false,
			memberCardList: [],
			memberCardTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				cardName: '',
				memberCardType: '',
				memberCardState: ''
			}
		}
	},
	onShow() {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.getMemberCardSearchList()
			}
		})
	},
	methods: {
		getMemberCardSearchList(isLoadmore) {
			uni.showLoading()
			getPageAllShopMemberCardApi(this.queryInfo).then((res) => {
				this.memberCardTotal = res.data.total
				if (isLoadmore) {
					this.memberCardList.push(...res.data.list)
				} else {
					this.memberCardList = res.data.list
				}
				this.isEmpty = this.memberCardList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleMemberCardOffShelf() {
			setTimeout(() => {
				this.queryInfo.page = 1
				this.getMemberCardSearchList()
			}, 2000)
		},
		handleMemberCardIssue() {
			setTimeout(() => {
				this.queryInfo.page = 1
				this.getMemberCardSearchList()
			}, 2000)
		}
	},
	onReachBottom() {
		if (this.memberCardList.length < this.memberCardTotal) {
			++this.queryInfo.page
			this.getMemberCardSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.shop-member-card-container {
	min-height: 100vh;
	background-color: #eeeeee;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
