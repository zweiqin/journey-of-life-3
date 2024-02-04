<template>
	<view class="container">
		<view class="TotalRevenue">
			<view v-if="showType === 'income'" class="amountText">
				总收益 &nbsp;(元) &nbsp;:&nbsp; {{ acountNumbers['总收益'] }}
			</view>
			<view v-else-if="showType === 'expenditure'" class="amountText">
				总支出 &nbsp;(元) &nbsp;:&nbsp; {{ acountNumbers['总支出'] }}
			</view>
		</view>
		<view class="MakeMoneyRecordsList">
			<scroll-view scroll-y="true" class="scrollY" @scrolltolower="getMore">
				<view v-for="(item, index) in dataList" :key="index" class="listItem">
					<view
						class="itemIcon"
						:style="{ background: showType === 'income' ? '#FF380C' : showType === 'expenditure' ? '#3982F1' : '' }"
					>
						<image class="Iconimg" src="../../../../static/images/user/zengsong.png"></image>
					</view>
					<text class="txt2" style="display: flex;"> <text v-if="showType == 'income' && item.type != 2 && item.type != 4">+</text>  <text v-else>-</text> {{ item.number }}</text>
					<view class="itemDetails">
						<text class="txt1">
							代金卷
							<text v-if="item.type === 1">充值</text>
							<text v-else-if="item.type === 2">转赠</text>
							<text v-else-if="item.type === 3">签到</text>
							<text v-else-if="item.type === 4">抵扣</text>
							<text v-else-if="item.type === 5">核销</text>
							<text v-else-if="item.type === 6">抽奖</text>
							<text v-else-if="item.type === 7">退款</text>
							<text v-else-if="item.type === 8">充值赠送</text>
							<text v-else-if="item.type === 9">下单</text>
							<text v-else>--</text>
						</text>
						<text class="txt3">{{ item.typeStrName }} ID : {{ item.id }}</text>
						<text class="txt3">{{ item.createTime }}</text>
					</view>
					<view
						v-if="showType === 'income'"
						style="display: flex; flex-direction: column; margin-left: 50upx; align-items: center;"
					>
						<image
							style="width: 56upx; height: 56upx; border-radius: 50%; border: 1upx solid #f3f3f3;"
							:src="common.seamingImgUrl(item.imgOne)"
						></image>
						<text class="userName">{{ item.userNameOne }}</text>
						<!-- <text style="font-size: 24upx;">（ID：{{ item.holdId }}）</text> -->
					</view>
					<view
						v-else-if="showType === 'expenditure'"
						style="display: flex; flex-direction: column; margin-left: 50upx; align-items: center;"
					>
						<image
							style="width: 56upx; height: 56upx; border-radius: 50%; border: 1upx solid #f3f3f3;"
							:src="common.seamingImgUrl(item.userLogs)"
						></image>
						<text class="userName">{{ item.username }}</text>
						<!-- <text style="font-size: 24upx; color: rgb(26, 26, 26);">（ID：{{ item.userId }}）</text> -->
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { getTransferLogsVoucherShopHoldApi } from '../../../../api/anotherTFInterface'
export default {
	name: 'RecordsEvery',
	props: {
		showType: {
			type: String,
			required: true
		},
		condition: {
			type: [Number, String],
			default: 5
		},
		acountNumbers: {
			type: Object,
			default: () => ({
				'总收益': 0,
				'总收入': 0,
				'总支出': 0,
				'总充值': 0
			})
		}
	},
	data() {
		return {
			queryList: {
				page: 1,
				pageSize: 20
			},
			dataList: []
		}
	},
	watch: {
		condition(newVlaue, oldVlaue) {
			this.dataList = []
			this.queryList.page = 1
			this.queryList.pageSize = 20
			this.getListData()
		},
		showType(newValue, oldVlaue) {
			this.queryList = {
				page: 1,
				pageSize: 20
			}
			this.getListData()
		}
	},
	created() {
		this.getListData()
		// console.log(this.showType);
	},
	methods: {
		getListData(isAdd = false) {
			getTransferLogsVoucherShopHoldApi({
				...this.queryList,
				type: this.showType === 'income' ? 3 : this.showType === 'expenditure' ? 2 : '',
				condition: this.condition
			}).then((res) => {
				if (res.data.records.length <= 0) {
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})
				}
				if (isAdd) {
					for (let index = 0; index < res.data.records.length; index++) {
						this.dataList.push(res.data.records[index])
					}
				} else {
					this.dataList = res.data.records
				}
				// this.dataList = res.data.records;
				// console.log(res);
			})
				.catch((err) => {
					console.log(err)
				})
		},
		getMore() {
			this.queryList.page++
			this.getListData(true)
		}
	}
}
</script>

<style lang="scss" scoped>
.userName {
	margin-top: 15rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 24upx;
	width:120rpx;
	text-align: center;
}
.TotalRevenue {
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 10rpx;

	/* height: 38rpx; */
	.amountText {
		/* display: flex;
        align-items: center; */
		margin: 20rpx 0rpx;
		font-size: 32rpx;
		font-weight: normal;
		line-height: 32rpx;
		font-feature-settings: "kern" on;
		color: #222229;
	}
}

.scrollY {
	height: 100%;
}

.container {
	box-sizing: border-box;
	padding-bottom: 216rpx;
}

.MakeMoneyRecordsList {
	height: 59vh;
	overflow: hidden auto;

	.listItem {
		margin-top: 50rpx;
		/* margin: 50rpx 0rpx; */
		width: 100%;
		height: 120rpx;
		display: flex;
		position: relative;

		.itemIcon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 68rpx;
			height: 68rpx;
			border-radius: 8rpx;
			background: #49CE8B;

			.Iconimg {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.txt2 {
			position: absolute;
			right: 20rpx;
			top: 30rpx;
			font-size: 42rpx;
			line-height: 5rpx;
			color: #222229;
		}

		.itemDetails {
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			font-size: 24rpx;

			.txt1 {
				font-size: 28rpx;
				font-weight: normal;
				line-height: 32rpx;
				color: #222229;
			}

			.txt3 {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-weight: normal;
				line-height: 32rpx;
				color: #888889;
			}
		}
	}
}
</style>
