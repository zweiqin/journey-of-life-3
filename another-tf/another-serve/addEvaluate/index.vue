<template>
	<view class="container">
		<JHeader title="追加评价" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
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

<style lang="scss" scoped>
.container {
	background-color: #F7F7F7;
	min-height: 100vh;
	box-sizing: border-box;

	.addEvaluate-box {
		margin-top: 20upx;

		.addEvaluate {
			width: 690upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
			padding-bottom: 30upx;

			.addEvaluateText {
				font-weight: bold;
			}

			.addEvaluateTitle-box {
				.title-img {
					width: 90upx;
					height: 90upx;
					border-radius: 4upx;
				}

				.title-textbox {
					width: 530upx;
					margin-left: 20upx;
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
				width: 610upx;
				height: 200upx;
				background-color: #FFFFFF;
				font-size: 26upx;
				padding: 20upx 20upx;
				border: 2rpx solid #E4E5E6;
			}
		}

		.addPicture-box {
			background-color: #F5F5F5;
			width: 40upx;
			height: 40upx;
			margin-top: 100upx;
			margin-left: 100upx;
			border-radius: 10upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #BBBBBB;
		}
	}

	.butBox {
		position: absolute;
		bottom: 40upx;

		.submitbut {
			height: 100upx;
			width: 690upx;
			background: #333333;
			color: #FFEBC4;
			font-size: 28upx;
			text-align: center;
			line-height: 100upx;
		}
	}
}
</style>
