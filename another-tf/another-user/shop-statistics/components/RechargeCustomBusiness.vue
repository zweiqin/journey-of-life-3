<template>
	<view style="width: 100%;height: 100%;">
		<scroll-view
			scroll-y style="height: 100%;" @scrolltolower="handleScrolltolower"
		>
			<view v-if="rechargeList && rechargeList.length">
				<view v-for="(item, index) in rechargeList" :key="index">
					<tui-collapse
						:index="index" :current="currentIndexRecharge" hd-bg-color="#ffffff"
						@click="changeCurrentRecharge"
					>
						<template #title>
							<tui-list-cell background-color="transparent" padding="26upx 80upx 26upx 30upx">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view>ID：{{ item.id }}</view>
									<view style="font-size: 26upx;color: #605D52;text-align: right;">
										<view>客户余额：{{ item.buyerUserBalance }}</view>
										<view>充值余额：{{ item.recharge }}</view>
									</view>
								</view>
							</tui-list-cell>
						</template>
						<template #content>
							<view style="margin: 0 24upx;background-color: #ebebea;">
								<view v-if="item.orderList && item.orderList.length">
									<tui-list-view title="">
										<tui-list-cell
											v-for="part in item.orderList" :key="part.orderFormid"
											background-color="transparent"
										>
											<view style="display: flex;justify-content: space-between;align-items: center;padding-left: 16upx;">
												<text>订单ID：{{ part.orderFormid || '--' }}</text>
												<text>状态：{{ orderTypeEnum[part.state] || '--' }}</text>
											</view>
											<view style="display: flex;justify-content: space-between;align-items: center;padding-left: 16upx;">
												<text style="color: red;">总价：￥{{ part.orderPrice || '0' }}</text>
												<text style="color: red;">支付：￥{{ part.price || '0' }}</text>
											</view>
										</tui-list-cell>
									</tui-list-view>
								</view>
								<view v-else style="padding: 28upx 0;text-align: center;">
									客户消费订单列表空空如也~
								</view>
							</view>
						</template>
					</tui-collapse>
				</view>
			</view>
			<view style="padding-bottom: 45upx;">
				<LoadingMore
					:status="!isEmpty && !rechargeList.length
						? 'loading' : !isEmpty && rechargeList.length && (rechargeList.length >= rechargeTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无客户充值数据</tui-no-data>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { orderTypeEnum } from '../../../../pages/order/config'
import { getbBusinessByRechargeCustomApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'RechargeCustomBusiness',
	props: {},

	data() {
		return {
			queryInfo: {
				page: 1,
				pageSize: 10
			},
			rechargeTotal: 0,
			isEmpty: false,
			rechargeList: [],
			currentIndexRecharge: 0,
			orderTypeEnum
		}
	},

	created() {
		// console.log(this.$refs)
		// this.getShopRechargeCustom()
	},

	methods: {
		getShopRechargeCustom(isLoadmore) {
			uni.showLoading()
			getbBusinessByRechargeCustomApi({ ...this.queryInfo })
				.then((res) => {
					this.rechargeTotal = res.data.total
					if (isLoadmore) {
						this.rechargeList.push(...res.data.records)
					} else {
						this.rechargeList = res.data.records
					}
					this.isEmpty = this.rechargeList.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		changeCurrentRecharge(e) {
			// 可关闭自身
			this.currentIndexRecharge = this.currentIndexRecharge == e.index ? -1 : e.index
		},
		handleScrolltolower() {
			if (this.rechargeList.length < this.rechargeTotal) {
				++this.queryInfo.page
				this.getShopRechargeCustom(true)
			}
		}
	}

}
</script>

<style lang="less" scoped></style>
