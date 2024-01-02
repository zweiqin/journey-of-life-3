<!-- 物流详情 -->
<template>
	<view class="product-logistics-container">
		<JHeader title="产品物流信息" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view></view>
	</view>
</template>

<script>
import { getBanziDileveryOrderApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ProductLogistics',
	data() {
		return {
			orderId: '',
			skuId: ''
		}
	},
	onLoad(options) {
		this.orderId = options.orderId
		this.skuId = options.skuId
	},
	methods: {
		// 获取产品物流信息
		getProductLogisticsMsg() {
			getBanziDileveryOrderApi({
				orderId: this.orderId,
				skuId: this.skuId
			}).then((res) => {
				console.log(res)
			})
		}
	}
}
</script>

<style lang="less" scoped>
.product-logistics-container {
	min-height: 100vh;
	box-sizing: border-box;
}
</style>
