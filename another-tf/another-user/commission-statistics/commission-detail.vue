<template>
	<view class="commisions-list">
		<TuanPageHead :scroll-top="$data._scrollTop" fixed title="佣金详情" bacokground="#fff">
			<tui-icon slot="left" name="arrowleft" color="#3d3d3d" @click="handleBack"></tui-icon>
		</TuanPageHead>

		<view class="container">
			<LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
			<view v-if="$data._list.length && $data._status !== 'loading'" class="list">
				<view v-for="item in $data._list" :key="item.id" class="item">
					<view class="item-bar">
						<view class="left">订单总额：￥{{ item.totalAmount }}</view>
						<view class="right">
							分佣金额：￥{{ item.amount }}
							<!-- <text style="color: #fe751a; margin-left: 10upx">({{
								item.proportion * 100 }}%)</text> -->
						</view>
					</view>

					<view class="item-bar gray">
						<view class="left">订单号：{{ item.orderSn }}</view>
						<view class="right" :style="{ color: !item.isTo ? 'red' : 'green' }">
							{{ !item.isTo ? '订单未完成'
								: '订单已完成' }}
						</view>
					</view>

					<view class="item-bar gray">
						<view class="left">创建时间：{{ item.createTime }}</view>

					</view>

					<view
						style="background-color: #f3f2f2; padding: 20upx; box-sizing: border-box;display: flex; border-radius: 10upx;"
					>
						<image style="width: 100upx; height: 100upx; border-radius: 50%; margin-right: 10upx;" :src="item.imgOne">
						</image>
						<view>
							<view style="font-size: 26upx; margin-top: 10upx;">{{ item.userNameOne }}</view>
							<view
								style="padding: 4upx 12upx; background-color: #ff8700; border-radius: 6upx; color: #fff; display: inline-flex; font-size: 24upx; margin-top: 8upx;"
							>
								{{ item.type
									|
									filterType }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="$data._status !== 'loading' && !$data._list.length" class="no-data"> 暂无数据... </view>
		</view>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getCommissionDeatilListApi } from '../../../api/anotherTFInterface'
import loadDataMixin from '../../../mixin/loadMore'

export default {
	mixins: [
		loadDataMixin({
			api: getCommissionDeatilListApi,
			mapKey: { totalPages: 'total', list: 'records', size: 'pageSize' }
		})
	],
	data() {
		return {
			type: 1
		}
	},
	onLoad(params) {
		this.type = params.tag || 1
		this.loadData()
	},
	methods: {
		handleBack() {
			uni.navigateBack({
				delta: 1
			})
		},

		async loadData() {
			try {
				this.$data._query.today = this.type || 1
				await this._loadData()
			} finally {
				uni.stopPullDownRefresh()
			}
		}
	},

	filters: {
		filterType(type) {
			return { 1: '关系链', 2: '商城', 3: '本地', 4: '服务', 5: '支付', 6: '退款' }[type]
		}
	},

	onPullDownRefresh() {
		this.$data._query.page = 1
		this.loadData()
	}
}
</script>

<style lang="less" scoped>
.commisions-list {
	width: 100vw;
	background-color: #f6f6f5;
	min-height: 100vh;

	.container {
		.list {
			.item {
				background-color: #fff;
				padding: 20upx;
				box-sizing: border-boxf;
				margin-top: 30upx;

				.item-bar {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28upx;
					margin-bottom: 20upx;

					&.gray {
						color: #929292;
						font-size: 24upx;
					}
				}
			}
		}
	}

	.no-data {
		height: 600upx;
		width: 100vw;
		text-align: center;
		line-height: 600upx;
		color: #929292;
		font-size: 28upx;
		letter-spacing: 1em;
	}
}
</style>
