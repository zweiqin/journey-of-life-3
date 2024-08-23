<template>
	<view class="container">
		<JHeader title="追加评价" width="50" height="50"></JHeader>
		<!-- 追加评论 -->
		<view class="addEvaluate-box flex-items-plus flex-column-plus">
			<view class="addEvaluate flex-column-plus">
				<view class="addEvaluateTitle-box flex-row-plus mar-top-20 mar-left-20">
					<image class="title-img" :src="common.seamingImgUrl(productImage)"></image>
					<view class="title-textbox overflow">
						<label class="fs28 title-text">{{ orderProductVO.productName }}</label>
						<view v-if="orderProductVO.value" class="fs24 mar-top-10 sukValue">
							{{ orderProductVO.value }}
						</view>
						<view v-else class="font-color-999 fs24 mar-top-10">
							默认规格
						</view>
					</view>
				</view>
				<view class="fs26 mar-top-40 mar-left-20 addEvaluateText">追加评价</view>
				<view class="textarea-box mar-top-20 mar-left-20">
					<textarea
						v-model="commentText" class="textarea-text" maxlength="200" placeholder-style="color:#BBBBBB"
						placeholder="亲，有什么需要追加的吗"
					/>
				</view>
				<view class="mar-left-10 mar-top-10 evaluateImg">
					<ATFMoreUpload :imgs="fileList" @upload="handleSaveImg" @delete="handleDeleteImg"></ATFMoreUpload>
				</view>
			</view>
		</view>
		<view class="butBox flex-items-plus mar-left-30">
			<view class="submitbut" @click="submitTap">追加评论</view>
		</view>
	</view>
</template>

<script>
import { addToCommentOrderAdditionalApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AddEvaluate',
	data() {
		return {
			type: '',
			addCommentVOData: {},
			orderProductVO: {},
			productImage: '',
			commentId: '',
			commentText: '',
			fileList: [],
			commentImgs: ''
		}
	},
	onLoad(options) {
		this.type = Number(options.type)
		uni.$on('sendAddEvaluateMsg', (data) => {
			if (data.addCommentVOData) {
				if (this.type == 1) { // 针对一个订单下面的每个产品的评论
					this.addCommentVOData = data.addCommentVOData
					this.orderProductVO = this.addCommentVOData.skus[0]
					this.productImage = this.orderProductVO.image
					if (options.commentId) this.commentId = options.commentId
				} else if (this.type == 2) { // 针对一个产品的评论
					this.addCommentVOData = data.addCommentVOData
					this.orderProductVO = this.addCommentVOData
					this.productImage = this.orderProductVO.productImage
					this.commentId = this.addCommentVOData.commentId
				}
			}
		})
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
		submitTap() {
			if (!this.commentText) {
				uni.showToast({
					title: '请先说点什么吧',
					icon: 'none'
				})
				return
			}
			uni.showLoading({
				title: '提交中...'
			})
			if (this.fileList.length) {
				for (let i = 0; i < this.fileList.length; i++) {
					this.commentImgs += this.fileList[i] + ','
				}
			}
			let data = []
			if (this.type) {
				data = [ {
					commentId: this.commentId,
					image: this.commentImgs,
					comment: this.commentText
				} ]
			}
			addToCommentOrderAdditionalApi({ params: data }).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '追评成功'
				})
				setTimeout(() => {
					uni.redirectTo({
						url: `/another-tf/another-serve/userEvaluate/index`
					})
				}, 1500)
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	background-color: #F7F7F7;
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.addEvaluate-box {
		margin-top: 20rpx;

		.addEvaluate {
			width: 690rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding-bottom: 30rpx;

			.addEvaluateText {
				font-weight: bold;
			}

			.addEvaluateTitle-box {
				.title-img {
					width: 90rpx;
					height: 90rpx;
					border-radius: 4rpx;
				}

				.title-textbox {
					width: 530rpx;
					margin-left: 20rpx;
					font-weight: bold;

					.sukValue {
						color: #CCCCCC;
						font-weight: 400;
					}
				}

			}
		}

		.textarea-box {
			.textarea-text {
				width: 610rpx;
				height: 200rpx;
				background-color: #FFFFFF;
				font-size: 26rpx;
				padding: 20rpx 20rpx;
				border: 2rpx solid #E4E5E6;
			}
		}

		.addPicture-box {
			background-color: #F5F5F5;
			width: 40rpx;
			height: 40rpx;
			margin-top: 100rpx;
			margin-left: 100rpx;
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #BBBBBB;
		}
	}

	.butBox {
		position: absolute;
		bottom: 40rpx;

		.submitbut {
			height: 100rpx;
			width: 690rpx;
			background: #333333;
			color: #FFEBC4;
			font-size: 28rpx;
			text-align: center;
			line-height: 100rpx;
		}
	}
}
</style>
