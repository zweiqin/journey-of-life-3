<template>
	<view class="container">
		<JHeader title="评价" width="50" height="50"></JHeader>
		<!-- 评论商品 -->
		<view class="addEvaluate-box flex-items-plus flex-column-plus">
			<view class="addEvaluate flex-column-plus">
				<view class="addEvaluateTitle-box flex-row-plus mar-top-20 mar-left-20">
					<image class="title-img" :src="common.seamingImgUrl(commentData.image)"></image>
					<view class="title-textbox overflow">
						<label class="fs24 title-text">{{ commentData.productName }}</label>
						<view class="font-color-999 fs22 mar-top-10">
							{{ commentData.value }}
						</view>
					</view>
				</view>
				<view class="fs26 mar-top-50 flex-display flex-sp-around">
					<label>宝贝描述</label>
					<tui-rate :current="commentStar" :size="20" normal="#b2b2b2" active="#C5AA7B" @change="onCommentStarChange"></tui-rate>
					<label v-if="commentStar < 2" style="width: 80rpx;">差</label>
					<label v-else-if="commentStar < 4" style="width: 80rpx;">好</label>
					<label v-else style="width: 80rpx;">非常好</label>
				</view>
				<view class="textarea-box mar-top-40 mar-left-20">
					<textarea
						v-model="commentText" class="textarea-text" maxlength="200" placeholder-style="color:#BBBBBB"
						placeholder="感谢您对宝贝的看法"
					/>
				</view>
				<view class="mar-left-10 evaluateImg">
					<ATFMoreUpload
						:imgs="fileList"
						@upload="handleSaveImg" @delete="handleDeleteImg"
					></ATFMoreUpload>
				</view>
			</view>
		</view>
		<view class="storeEvaluate-box">
			<view class="storeEvaluate flex-start flex-column">
				<view class="fs26 mar-top-30 flex-display flex-sp-around">
					<label>描述相符</label>
					<tui-rate :current="descStar" :size="20" normal="#b2b2b2" active="#C5AA7B" @change="ondescStarChange"></tui-rate>
					<label v-if="descStar < 2" style="width: 80rpx;">差</label>
					<label v-else-if="descStar < 4" style="width: 80rpx;">好</label>
					<label v-else style="width: 80rpx;">非常好</label>
				</view>
				<view class="fs26 mar-top-50 flex-display flex-sp-around">
					<label>物流服务</label>
					<tui-rate :current="logisticsStar" :size="20" normal="#b2b2b2" active="#C5AA7B" @change="onlogisticsStarChange"></tui-rate>
					<label v-if="logisticsStar < 2" style="width: 80rpx;">差</label>
					<label v-else-if="logisticsStar < 4" style="width: 80rpx;">好</label>
					<label v-else style="width: 80rpx;">非常好</label>
				</view>
				<view class="fs26 mar-top-50 flex-display flex-sp-around">
					<label>服务态度</label>
					<tui-rate :current="serviceStar" :size="20" normal="#b2b2b2" active="#C5AA7B" @change="onserviceStarChange"></tui-rate>
					<label v-if="serviceStar < 2" style="width: 80rpx;">差</label>
					<label v-else-if="serviceStar < 4" style="width: 80rpx;">好</label>
					<label v-else style="width: 80rpx;">非常好</label>
				</view>
			</view>
		</view>
		<view class="butBox flex-items-plus">
			<view class="submitbut" @click="submitTap">发表评论</view>
		</view>
	</view>
</template>

<script>
import { addCommentOrderApi, getOrderDetailApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Evaluate',
	data() {
		return {
			commentData: {},
			orderId: 0,
			skuId: 0,
			commentStar: 5,
			descStar: 5,
			logisticsStar: 5,
			serviceStar: 5,
			fileList: [],
			commentText: '',
			commentImgsFlag: false,
			commentImgs: ''
		}
	},
	onLoad(options) {
		this.orderId = Number(options.orderId)
		this.skuId = Number(options.skuId)
		getOrderDetailApi({
			orderId: this.orderId,
			noticeId: 0
		}).then((res) => {
			this.commentData = res.data.skus.find((item) => item.skuId === this.skuId) || {}
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
		onCommentStarChange(e) {
			this.commentStar = e.index
		},
		ondescStarChange(e) {
			this.descStar = e.index
		},
		onlogisticsStarChange(e) {
			this.logisticsStar = e.index
		},
		onserviceStarChange(e) {
			this.serviceStar = e.index
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
				mask: true,
				title: '提交中...'
			})
			if (this.fileList.length > 0) {
				this.commentImgsFlag = true
				for (let i = 0; i < this.fileList.length; i++) {
					this.commentImgs += this.fileList[i] + ','
				}
			}
			const data = [ {
				orderId: this.orderId,
				skuId: this.commentData.skuId,
				productId: this.commentData.productId,
				image: this.commentImgs,
				comment: this.commentText,
				star: this.commentStar,
				des: this.descStar,
				delivery: this.logisticsStar,
				attitude: this.serviceStar
			} ]
			addCommentOrderApi({
				params: data
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '评价成功'
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/another-tf/another-serve/evaSuccessful/index'
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
	min-height: 100vh;
	background-color: #F7F7F7;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.addEvaluate-box {
		margin-top: 20rpx;

		.addEvaluate {
			width: 690rpx;
			height: auto;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding-bottom: 30rpx;

			.addEvaluateTitle-box {
				.title-img {
					width: 90rpx;
					height: 90rpx;
					border-radius: 4rpx;
				}

				.title-textbox {
					width: 530rpx;
					margin-left: 20rpx;
				}

			}
		}

		.textarea-box {
			.textarea-text {
				width: 610rpx;
				height: 200rpx;
				font-size: 26rpx;
				padding: 20rpx 20rpx;
				border: 2rpx solid #E4E5E6;
			}
		}
	}

	.storeEvaluate-box {
		margin-top: 20rpx;
		margin-left: 30rpx;
		height: 440rpx;

		.storeEvaluate {
			background-color: #FFFFFF;
			width: 690rpx;
			height: 270rpx;
			border-radius: 10rpx;
		}
	}

	.butBox {
		position: fixed;
		bottom: 20rpx;
		width: 100%;

		.submitbut {
			height: 100rpx;
			width: 690rpx;
			background: #333333;
			color: #FFEBC4;
			font-size: 28rpx;
			text-align: center;
			line-height: 100rpx;
			margin: 0 auto;
		}
	}
}
</style>
