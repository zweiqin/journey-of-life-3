<template>
	<view class="container">
		<JHeader title="评价详情" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<!-- 评论详情 -->
		<view class="evaluate-contentbox">
			<view class="evaluate-content flex-items flex-row flex-sp-between">
				<view class="flex-items">
					<image
						v-if="detailsCommentVOData.headImage" class="user-headSmallImg"
						:src="common.seamingImgUrl(detailsCommentVOData.headImage)"
					></image>
					<image v-else class="user-headSmallImg" src="../../../static/images/new-user/default-user-avatar.png"></image>
					<label v-if="detailsCommentVOData.name" class="fs28 mar-left-20">{{ detailsCommentVOData.name }}</label>
					<label v-else class="fs28 mar-left-20">匿名</label>
				</view>
				<label class="font-color-999 fs22">{{ detailsCommentVOData.createTime }}</label>
			</view>
			<view class="fs22 font-color-999 mar-top-10">
				{{ detailsCommentVOData.value }}
			</view>
			<view class="fs26 pad-topbot-20">{{ detailsCommentVOData.comment }}</view>
			<view v-if="detailsCommentVOData.image" class="evaluateImg-box">
				<view v-for="(cItem, index) in imageList" :key="index" @click="previewImg(1, index)">
					<image class="evaluate-Img" :src="common.seamingImgUrl(cItem)"></image>
				</view>
			</view>
			<view v-if="detailsCommentVOData.addComment" class="addComments-box flex-column-plus">
				<label class="font-color-C5AA7B mar-top-30">用户追评</label>
				<label class="mar-top-20">{{ detailsCommentVOData.addComment }}</label>
				<view v-if="detailsCommentVOData.addImage" class="evaluateImg-box mar-top-20">
					<view v-for="(dItem, index) in imgDataResult" :key="index" @click="previewImg(2, index)">
						<image class="evaluate-Img" :src="common.seamingImgUrl(dItem)"></image>
					</view>
				</view>
			</view>
			<view class="goodsDes-box flex-column-plus mar-top-30">
				<view class="flex-row-plus" @click="goGoodsDetails">
					<image class="goodsDes-img" :src="common.seamingImgUrl(detailsCommentVOData.productImage)"></image>
					<view class="goodsDesText-box">
						<label class="fs26 goodsDes-text">{{ detailsCommentVOData.productName }}</label>
						<view class="mar-top-70">
							<label>¥ {{ detailsCommentVOData.productPrice }}</label>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="linkBox">
			<view v-if="detailsCommentVOData.addComment != ''" class="butBox flex-row-plus">
				<view class="addPraise-box1 flex-items-plus" @click="zanTap">
					<tui-icon
						v-if="detailsCommentVOData.ifLike" :size="30" color="#c5aa7b" name="agree"
					></tui-icon>
					<tui-icon
						v-else :size="30" color="#cccccc" name="agree"
					></tui-icon>
					<label class="mar-left-10" :class="[ detailsCommentVOData.ifLike ? 'font-color-FFEBC4' : 'font-color-DDD' ]">点赞</label>
				</view>
			</view>
			<view v-else class="butBox flex-row-plus">
				<view class="addComments-box flex-items-plus" @click="addCommentsClick()">
					<tui-icon :size="30" color="#333333" name="edit"></tui-icon>
					<label class="mar-left-10 font-color-333">追加评价</label>
				</view>
				<view class="addPraise-box flex-items-plus" @click="zanTap">
					<tui-icon
						v-if="detailsCommentVOData.ifLike" :size="30" color="#c5aa7b" name="agree"
					></tui-icon>
					<tui-icon
						v-else :size="30" color="#cccccc" name="agree"
					></tui-icon>
					<label class="mar-left-10" :class="[ detailsCommentVOData.ifLike ? 'font-color-FFEBC4' : 'font-color-DDD' ]">点赞</label>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { updateLikeOrUnLikeCommentApi } from '../../../api/anotherTFInterface'
export default {
	name: 'EvaluateDetails',
	data() {
		return {
			detailsCommentVOData: {},
			actionType: true,
			imgDataResult: [],
			imageList: []
		}
	},
	onLoad() {
		uni.$on('sendEvaluateDetailsMsg', (data) => {
			if (data.detailsCommentVOData) {
				this.detailsCommentVOData = data.detailsCommentVOData
				this.commentImgData(this.detailsCommentVOData.image)
				this.imgDataResultData(this.detailsCommentVOData.addImage)
			}
		})
	},
	methods: {
		goGoodsDetails() {
			const shopId = this.detailsCommentVOData.shopId
			const productId = this.detailsCommentVOData.productId
			const skuId = this.detailsCommentVOData.skuId
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		},
		commentImgData(imgData) {
			this.imageList = imgData.split(',')
		},
		imgDataResultData(imgData) {
			this.imgDataResult = imgData.split(',')
		},
		// 点赞
		zanTap() {
			uni.showLoading()
			this.actionType = this.detailsCommentVOData.ifLike == 1 ? 0 : 1
			updateLikeOrUnLikeCommentApi({
				commentId: this.detailsCommentVOData.commentId,
				ifLike: this.actionType
			}).then((res) => {
				uni.hideLoading()
				this.detailsCommentVOData.ifLike = !this.detailsCommentVOData.ifLike
				this.detailsCommentVOData.likes = this.detailsCommentVOData.ifLike ? this.detailsCommentVOData.likes + 1 : this.detailsCommentVOData.likes - 1
				if (this.actionType == 1) {
					uni.showToast({
						title: '点赞成功'
					})
				} else {
					uni.showToast({
						title: '已取消点赞',
						icon: 'none'
					})
				}
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 追加评论
		addCommentsClick() {
			uni.redirectTo({
				url: '/another-tf/another-serve/addEvaluate/index?type=2',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendAddEvaluateMsg', { addCommentVOData: this.detailsCommentVOData, commentId: '' })
					}, 400)
				}
			})
		},
		// 预览图片多张
		previewImg(type, index) {
			const imgsArray = []
			if (type === 1) {
				for (let i = 0; i < this.imageList.length - 1; i++) {
					imgsArray.push(this.imageList[i])
				}
			} else {
				for (let i = 0; i < this.imgDataResult.length - 1; i++) {
					imgsArray.push(this.imgDataResult[i])
				}
			}
			uni.previewImage({
				current: index,
				urls: imgsArray
			})
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	padding-bottom: 30upx;

	.evaluate-contentbox {
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 30upx 30upx;
		background-color: #FFFFFF;

		.evaluate-content {
			width: 670upx;
			display: flex;
			justify-content: space-between;

			.user-headSmallImg {
				width: 46upx;
				height: 46upx;
				border-radius: 50%;
			}
		}

		.evaluateImg-box {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: -9upx;

			.evaluate-Img {
				width: 224upx;
				height: 224upx;
				border-radius: 10upx;
				margin-left: 9upx;
				margin-top: 9upx;
			}
		}

		.goodsDes-box {
			background-color: #F7F7F7;
			padding: 20upx 44upx 20upx 20upx;

			.goodsDes-img {
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
			}

			.goodsDesText-box {
				width: 416upx;
				margin-left: 30upx;
			}
		}

		.addComments-box {
			border-top: 1upx solid #EEEEEE;
			margin-top: 35upx;
		}
	}

	.butBox {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;

		.addComments-box {
			height: 100upx;
			width: 330upx;
			background-color: #FFFFFF;
			color: #333333;
			border: 2rpx solid #333333;
		}

		.addPraise-box {
			height: 100upx;
			width: 330upx;
			background: #333333;
			color: #FFFFFF;
		}

		.addPraise-box1 {
			height: 100upx;
			width: 690upx;
			background: #333333;
			color: #FFFFFF;
		}

	}

	.linkBox {
		position: absolute;
		bottom: 20upx;
		width: 100%;
	}
}
</style>
