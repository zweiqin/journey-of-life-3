<template>
	<view class="collection-payment-code-container">
		<JHeader title="商家收款" width="50" height="50"></JHeader>
		<view style="padding: 40upx 0 0;text-align: center;">
			<view>临时商家点单码</view>
			<image
				:src="codePicUrl" style="width: 400rpx;margin-top: 20upx;" mode="widthFix"
				@click="handlePreviewImage(codePicUrl)"
			/>
		</view>

		<!-- 生成二维码 -->
		<view>
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'

export default {
	name: 'CollectionPaymentCode',
	data() {
		return {
			collageId: '',
			money: '',
			orderId: '',
			shopType: '',
			qrcodeUrl: '',
			codePicUrl: ''
		}
	},
	onLoad(options) {
		this.collageId = options.collageId || ''
		this.money = options.money || ''
		this.orderId = options.orderId || ''
		this.shopType = options.shopType || ''
		this.getCode()
	},

	methods: {
		getCode() {
			uni.showLoading({
				title: '生成中...'
			})
			this.qrcodeUrl = `${A_TF_MAIN}/#/pages/jump/jump?type=tempCollection&code=orderId=${this.orderId}~money=${this.money}~collageId=${this.collageId}`
		},
		// 完成
		handleCompleteCode(e) {
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						console.log(res)
						this.codePicUrl = res.tempFilePath
						uni.hideLoading()
					}
				})
			}
		},

		handlePreviewImage(url) {
			uni.previewImage({
				urls: [ url ],
				current: 0
			})
		}
	}
}
</script>

<style lang="less" scoped>
.generate-code-container {
	position: absolute;
	top: -10000upx;
}

.collection-payment-code-container {
	min-height: 100vh;
	padding-bottom: 216upx;
	background-color: #f4f4f4;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 18rpx 0 16rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
