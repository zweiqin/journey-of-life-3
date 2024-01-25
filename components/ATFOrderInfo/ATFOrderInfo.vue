<template>
	<view class="order-info-container">
		<view style="color: #666666;">订单编号：{{ data.orderFormid }}</view>
		<!-- <view style="margin-top: 20upx;padding: 20upx;font-size: 26upx;background-color: #eeeeee;">
			<view>收货人：{{ data.consignee }}-{{ data.mobile }}</view>
			<view>{{ data.address }}</view>
			<view v-if="data.message">留言：{{ data.message }}</view>
			</view> -->
		<view style="margin-top: 20upx;padding: 0 20upx;">
			<view v-if="data.state">
				订单状态：
				{{ orderTypeEnum[data.state] || '--' }}
			</view>
			<view v-if="data.shopName">商户：{{ data.shopName }}</view>
			<view v-if="data.logisticsPrice">快递运费：￥{{ data.logisticsPrice }}</view>
			<view v-if="data.discountPrice">平台优惠：-￥{{ data.discountPrice }}</view>
		</view>
		<view style="padding: 0 20upx;">
			<view style="display: flex;justify-content: space-between;">
				<view v-if="typeof data.orderPrice === 'number'">商品总价：<text style="color: red;">￥{{ data.orderPrice }}</text></view>
				<view v-if="typeof data.price === 'number'">实付款：<text style="color: red;">￥{{ data.price }}</text></view>
			</view>
			<view style="margin-top: 12upx;padding-top: 12upx;;border-top: 1px solid #dddddd;">
				<view style="display: flex;justify-content: space-between;font-size: 26upx;color: #999999;">
					<text>创建时间：</text>
					<text>{{ data.createTime }}</text>
				</view>
			</view>
		</view>
		<ATFOrderSkus :data="data.skus"></ATFOrderSkus>
	</view>
</template>

<script>
import { orderTypeEnum } from './config'

export default {
	name: 'ATFOrderInfo',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			orderTypeEnum
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.order-info-container {
}
</style>
