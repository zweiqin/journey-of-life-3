<template>
	<view class="container">
		<view class="TotalRevenue">
			<view class="amountText">
				总充值 &nbsp;(元) &nbsp;:&nbsp; {{ acountNumbers['总充值'] }}
			</view>
		</view>
		<view class="MakeMoneyRecordsList">
			<scroll-view scroll-y="true" class="scrollY" @scrolltolower="getMore">
				<view v-for="(item, index) in dataList" :key="index" class="listItem">
					<view class="itemIcon" style="background: #FF380C;">
						<tui-icon
							name="friendadd" :size="50" unit="rpx"
							color="#ffffff"
							margin="0"
						></tui-icon>
					</view>
					<text class="txt2">{{ item.number }}<text class="texts">({{ statusData[item.status] }})</text></text>
					<!-- <text class="txt2">{{ item.number }}<text class="">({{ statusData[item.status] }})</text></text> -->
					<view class="itemDetails">
						<text class="txt1">代金券{{ item.typeStrName }}</text>
						<text class="txt3">{{ item.typeStrName }} ID : {{ item.id }}</text>
						<text class="txt3">{{ item.createTime }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { getAllVoucherOrderApi } from '../../../../api/anotherTFInterface'
export default {
	name: 'IncrementRecord',
	props: {
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
				pageSize: 20,
				type: 1,
				status: ''
			},
			statusData: ['未付款', '取消', '已付款', '未发放', '已发放', '支付失败'], // 状态(0未付款,1取消2已付款3代金券未发放4代金券已发放，5支付失败)
			dataList: []
		}
	},
	watch: {
		condition(newVlaue, oldVlaue) {
			this.dataList = []
			this.queryList.page = 1
			this.queryList.pageSize = 20
			this.getListData()
		}
	},
	created() {
		this.getListData()
	},
	methods: {
		getListData() {
			getAllVoucherOrderApi({
				...this.queryList,
				condition: this.condition
			}).then((res) => {
				if (res.data.records.length <= 0) {
					uni.showToast({
						title: '没有更多了',
						icon: 'none'
					})
				}
				for (let index = 0; index < res.data.records.length; index++) {
					this.dataList.push(res.data.records[index])
				}
				// this.dataList = res.data.records;
				// console.log(res);
			})
				.catch((err) => {
					console.log(err)
				})
			// getAllVoucherOrderApi({
			//     ...this.queryList,
			//     condition: this.condition
			// }).then(res => {
			//     if (res.data.records.length <= 0) {
			//         uni.showToast({
			//             title: '没有更多了',
			//             icon: 'none'
			//         });
			//     }
			//     for (let index = 0; index < res.data.records.length; index++) {
			//         this.dataList.push(res.data.records[index])
			//     }
			//     // this.dataList = res.data.records;
			//     // console.log(res);
			// }).catch(err => {
			//     console.log(err);
			// })
		},
		getMore() {
			this.queryList.page++
			this.getListData()
		}
	}
}
</script>

<style lang="scss" scoped>
.texts {
	margin-left: 10rpx;
	font-size: 28rpx;
	letter-spacing: 2rpx;
	color: #878899c9;
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
