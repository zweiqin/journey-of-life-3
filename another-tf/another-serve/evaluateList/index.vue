<template>
	<view class="container">
		<JHeader title="宝贝评价" width="50" height="50"></JHeader>
		<!-- 查看全部评论 -->
		<view class="evaluateTag-box">
			<view class="evaluateTag-text">
				全部({{ commentList.length }})
			</view>
		</view>
		<view class="flex-column-plus evaluateList-box">
			<view v-for="(item, index) in commentList" :key="index" class="evaluate-contentbox mar-top-20">
				<view class="evaluate-content flex-items flex-row flex-sp-between">
					<view class="flex-items">
						<image class="user-headSmallImg" :src="common.seamingImgUrl(item.headImage)"></image>
						<view class="">
							<text class="fs28 mar-left-20">{{ item.name }}</text>
							<view class="mar-left-20 fs22 font-color-999 mar-top-10">
								<text>{{ item.value }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="fs26 pad-topbot-20 font-color-333">{{ item.comment }}</view>
				<view class="evaluateImg-box">
					<view v-for="(commentItemImg, cindex) in item.images" :key="cindex">
						<image class="img-item" :src="common.seamingImgUrl(commentItemImg)" @click="previewImg(common.seamingImgUrl(commentItemImg))"></image>
					</view>
				</view>
				<view v-if="item.addComment !== ''" class="addEvaluate">
					<view class="fs26 font-color-C5AA7B">用户追加评价</view>
					<view class="addEvaluateText">{{ item.addComment }}</view>
					<view v-if="item.addImages" class="item-image-box">
						<view v-for="(itemAddImg, imgIndex) in item.addImages" :key="imgIndex">
							<image class="img-item" :src="common.seamingImgUrl(itemAddImg)" @click="previewImg(common.seamingImgUrl(itemAddImg))"></image>
						</view>
					</view>
				</view>
				<view class="praisebig-box flex-items mar-top-30 flex-sp-between">
					<text class="font-color-999 fs22">{{ item.createTime }}</text>
					<view class="praise-box flex-items flex-row">
						<tui-icon v-if="item.ifLike == 1" :size="30" color="#c5aa7b" name="agree" @click="zanTap(index, item.commentId, 0)"></tui-icon>
						<tui-icon v-else :size="30" color="#cccccc" name="agree" @click="zanTap(index, item.commentId, 1)"></tui-icon>
						<text class="mar-left-10 font-color-999">{{ item.likes }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { updateLikeOrUnLikeCommentApi, getProductDetailsByIdApi } from '../../../api/anotherTFInterface'

export default {
	name: 'EvaluateList',
	data() {
		return {
			commentList: []
		}
	},
	onLoad(options) {
		uni.showLoading()
		getProductDetailsByIdApi({
			shopId: options.shopId,
			productId: options.productId,
			skuId: options.skuId,
			terminal: 1
		}).then((res) => {
			uni.hideLoading()
			this.commentList = res.data.comments
		})
			.catch((e) => {
				uni.hideLoading()
			})
	},
	methods: {
		previewImg(img) {
			wx.previewImage({
				current: img, // 当前显示图片的http链接
				urls: [ img ] // 需要预览的图片http链接列表
			})
		},
		commentImgData(imgData) {
			let imgDataResult = []
			imgDataResult = imgData.split(',')
			return imgDataResult
		},
		// 点赞
		zanTap(index, likeId, actionType) {
			// uni.showLoading({
			//   mask: true,
			// 	title: '提交中...',
			// })
			updateLikeOrUnLikeCommentApi({
				commentId: likeId,
				ifLike: actionType
			}).then((res) => {
				uni.hideLoading()
				this.commentList[index].ifLike = !this.commentList[index].ifLike
				this.commentList[index].likes = this.commentList[index].ifLike ? this.commentList[index].likes + 1
					: this.commentList[index].likes - 1
			})
				.catch((res) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	min-height: 100vh;
	background-color: #FFFFFF;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.evaluateTag-box {
		margin-top: 10rpx;
		margin-left: 10rpx;
		padding-bottom: 10rpx;
		display: flex;
		flex-wrap: wrap;

		.evaluateTag-text {
			background-color: #333333;
			padding: 16rpx 14rpx;
			color: #FFFFFF;
			margin-left: 20rpx;
			margin-top: 20rpx;
		}
	}

	.img-item {
		width: 223rpx;
		height: 223rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
	}

	.evaluateList-box {
		padding-bottom: 30rpx;

		.evaluate-contentbox {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 30rpx 30rpx;
			background-color: #FFFFFF;

			.evaluate-content {
				width: 670rpx;
				display: flex;
				justify-content: space-between;

				.user-headSmallImg {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}

			.evaluateImg-box {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				margin-left: -9rpx;
			}

			.addEvaluate {
				margin-top: 20rpx;

				.addEvaluateText {
					margin: 25rpx 0;
				}
			}

			.praisebig-box {
				border-top: 1rpx solid #EEEEEE;
				padding-top: 30rpx;
			}
		}
	}

}
</style>
