<!-- 退货/退款上传凭证 -->
<template>
	<view class="platform-join-container">
		<JHeader title="平台介入" width="50" height="50"></JHeader>
		<view class="content">
			<view class="afterSale-select-box mt20">
				<view class="item item-start">
					<view class="l"><text class="font-color-C5AA7B">*</text>问题描述</view>
				</view>
				<textarea
					v-model="reason" maxlength="200" class="text-area" placeholder="填写相关问题"
					placeholder-style="color:#bbb;" bindinput="proofRemarkInput"
				></textarea>
			</view>

			<view class="afterSale-select-box mt20">
				<view class="upload-title">举证图片</view>
				<view class="upload-img-box">
					<view class="mar-left-10 mar-top-10 evaluateImg">
						<ATFMoreUpload :imgs="fileList" @upload="handleSaveImg" @delete="handleDeleteImg"></ATFMoreUpload>
					</view>
				</view>
			</view>
		</view>

		<view class="order-confirm-box">
			<text class="btn" bindtap="subimtTap" @click="interventionFn">提交</text>
		</view>
	</view>
</template>

<script>
import { applyAfterPlatformApi } from '../../../api/anotherTFInterface'
export default {
	name: 'PlatformJoin',
	data() {
		return {
			returnImgsList: 1,
			fileList: [],
			commentImgs: '',
			afterId: '',
			orderId: '',
			reason: ''
		}
	},
	onLoad(options) {
		this.afterId = options.afterId
		this.orderId = options.orderId
	},
	methods: {
		handleSaveImg(imgUrl) {
			this.fileList.push(imgUrl)
			this.$forceUpdate()
		},
		handleDeleteImg(imgUrl) {
			this.fileList.splice(this.fileList.findIndex((item) => item === imgUrl), 1)
			this.$forceUpdate()
		},
		interventionFn() {
			if (this.reason === '') {
				uni.showToast({
					title: '请填写问题描述',
					icon: 'none'
				})
				return false
			}
			if (this.fileList.length > 0) {
				for (let i = 0; i < this.fileList.length; i++) {
					this.commentImgs += this.fileList[i] + ','
				}
			}
			uni.showLoading({
				mask: true,
				title: '正在申请介入...'
			})
			applyAfterPlatformApi({
				afterId: this.afterId,
				orderId: this.orderId,
				image: this.commentImgs,
				reason: this.reason
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '申请成功'
				})
				uni.navigateBack({
					delta: 1
				})
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.platform-join-container {
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.content {
		padding: 0 0 120rpx;
		box-sizing: border-box;
	}

	.afterSale-select-box {
		width: 100%;
		background: #fff;
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.afterSale-select-box .item {
		height: 100rpx;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #333;
	}

	.afterSale-select-box .item:last-of-type {
		border-bottom: none;
	}

	.afterSale-select-box .item.item-start {
		justify-content: flex-start;
	}

	.afterSale-select-box .item .l {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.afterSale-select-box .item .afterSale-img {
		width: 26rpx;
		height: 26rpx;
		margin-right: 20rpx;
	}

	.afterSale-select-box .item .r-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #999;
	}

	.mt20 {
		margin-top: 20rpx;
	}

	.upload-title {
		font-size: 28rpx;
		color: #333;
		padding: 30rpx 0;
	}

	.upload-img-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0 0 30rpx;
		align-items: flex-start;
	}

	.order-confirm-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		background: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.order-confirm-box .btn {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background: #333333;
		font-size: 28rpx;
		color: #C5AA7B;
		text-align: center;
	}

	.text-area {
		width: 690rpx;
		background: #F7F7F7;
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}
}
</style>
