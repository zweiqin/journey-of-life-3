<template>
	<div class="good-evaluate-and-question-container">
		<!-- 评价 -->
		<view style="padding: 30rpx 20rpx;background-color: #ffffff;border-radius: 16rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 0;">
				<view style="font-weight: bold;">宝贝评价</view>
				<view
					style="flex: 1;display: flex;justify-content: flex-end;align-items: center;"
					@click="go(`/another-tf/another-serve/evaluateList/index?shopId=${goodsDetail.shopId}&productId=${goodsDetail.productId}&skuId=${goodsDetail.skuId}`)"
				>
					<view v-if="goodsDetail.comments.length" style="font-size: 24rpx;color: #999999;">
						共{{ goodsDetail.comments.length > 100
							? `${Math.floor(goodsDetail.comments.length / 100) * 100}+`
							: goodsDetail.comments.length }}条评论
					</view>
					<tui-icon :size="22" color="#191919" name="arrowright" margin="0 0 0 4rpx"></tui-icon>
				</view>
			</view>
			<view>
				<view
					v-for="(commentItem, commentIndex) in goodsDetail.comments.slice(0, 2)" :key="commentIndex"
					style="padding-top: 24rpx;"
				>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;align-items: center;">
							<image
								style="width: 50rpx;height: 50rpx;border-radius: 50%;"
								:src="common.seamingImgUrl(commentItem.headImage)"
							></image>
							<view style="margin-left: 20rpx;font-size: 28rpx;">{{ commentItem.name }}</view>
						</view>
						<view style="font-size: 22rpx;color: #999999;">{{ commentItem.createTime }}</view>
					</view>
					<view style="margin-top: 20rpx;font-size: 26rpx;">{{ commentItem.comment }}</view>
					<view v-if="commentItem.image" style="display: flex;flex-wrap: wrap;">
						<view
							v-for="(imgItem, imgIndex) in commentItem.image.split(',').filter(i => i)" :key="imgIndex"
							style="padding: 4rpx;"
						>
							<image
								style="width: 154rpx;height: 154rpx;border-radius: 10rpx;" :src="common.seamingImgUrl(imgItem)"
								@click="handlePreviewImage(goodsDetail.comments[commentIndex].images, imgIndex)"
							>
							</image>
						</view>
					</view>
					<view v-if="commentItem.addComment">
						<view style="padding-top: 10rpx;">
							<view>
								<text style="font-size: 24rpx;color: #666666;">追加评价：</text>
								<text style="font-size: 26rpx;">{{ commentItem.addComment }}</text>
							</view>
							<view v-if="commentItem.addImages && commentItem.addImages.length" style="display: flex;flex-wrap: wrap;">
								<view v-for="(itemAddImg, imgIndex) in commentItem.addImages" :key="imgIndex" style="padding: 4rpx;">
									<image
										style="width: 154rpx;height: 154rpx;border-radius: 10rpx;"
										:src="common.seamingImgUrl(itemAddImg)"
										@click="handlePreviewImage(goodsDetail.comments[commentIndex].addImages, imgIndex)"
									>
									</image>
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: flex-end;padding: 14rpx 14rpx 0 0;">
						<tui-icon
							v-if="commentItem.ifLike === 1" :size="22" color="#c5aa7b" name="agree"
							@click="handlePraise(commentItem.commentId, 0)"
						></tui-icon>
						<tui-icon
							v-else :size="22" color="#cccccc" name="agree"
							@click="handlePraise(commentItem.commentId, 1)"
						></tui-icon>
						<view style="margin-left: 28rpx;font-size: 28rpx;">{{ commentItem.likes }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 问答 -->
		<view style="margin-top: 26rpx;padding: 30rpx 20rpx;background-color: #ffffff;border-radius: 16rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 0 24rpx;">
				<view style="font-weight: bold;">商品问答</view>
				<view
					style="flex: 1;display: flex;justify-content: flex-end;align-items: center;"
					@click="go(`/another-tf/another-serve/answerList/index?shopId=${goodsDetail.shopId}&productId=${goodsDetail.productId}&skuId=${goodsDetail.skuId}`)"
				>
					<view v-if="problemsTotal" style="font-size: 24rpx;color: #999999;">
						共{{ problemsTotal > 100 ? `${Math.floor(problemsTotal / 100) * 100}+` : problemsTotal }}条问题
					</view>
					<tui-icon :size="22" color="#191919" name="arrowright" margin="0 0 0 4rpx"></tui-icon>
				</view>
			</view>
			<QuestionsAndAnswersList :product-info="goodsDetail" :problems-list="problemsList" />
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="font-size: 28rpx;">宝贝好不好，问问已买过的人</view>
				<tui-button
					type="black" width="fit-content" height="60rpx" margin="0 0 0 10rpx"
					@click="go(`/another-tf/another-serve/putQuestions/index?shopId=${goodsDetail.shopId}&productId=${goodsDetail.productId}&skuId=${goodsDetail.skuId}&questionNumber=${problemsList.length}`)"
				>
					<view style="display: flex;align-items: center;padding: 0 20rpx;font-size: 28rpx;line-height: 1;">
						<text>去提问</text>
						<tui-icon name="arrowright" color="#d9c9a8" :size="28" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</tui-button>
			</view>
		</view>
	</div>
</template>

<script>
import QuestionsAndAnswersList from './QuestionsAndAnswersList'
import { getProblemsSeckillApi, updateLikeOrUnLikeCommentApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'GoodEvaluateAndQuestion',
	components: { QuestionsAndAnswersList },
	props: {
		goodsDetail: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			problemsList: [], // 问题列表
			problemsTotal: 0 // 问题总数
		}
	},
	watch: {
		goodsDetail: {
			handler(newValue, oldValue) {
				if (newValue.productId !== oldValue.productId) {
					this.handleGetProblemList()
				}
			},
			immediate: false,
			deep: true
		}
	},
	created() {
		this.handleGetProblemList()
	},
	methods: {
		async handleGetProblemList() {
			if (!this.goodsDetail.productId) return
			const res = await getProblemsSeckillApi({
				productId: this.goodsDetail.productId,
				page: 1,
				pageSize: 2
			})
			this.problemsList = res.data.list
			this.problemsTotal = res.data.total
		},

		/**
		 * 放大查看照片
		 * @param dataList 所有照片
		 * @param currentIndex 选中索引
		 */

		handlePreviewImage(dataList, currentIndex) {
			uni.previewImage({
				current: dataList[currentIndex],
				urls: dataList
			})
		},

		/**
		 * 点赞
		 * @param commentItem 当前评论项
		 * @param action 0取消1点赞
		 */

		async handlePraise(commentId, actionType) {
			uni.showLoading({
				mask: true,
				title: '操作中...'
			})
			try {
				await updateLikeOrUnLikeCommentApi({ commentId, ifLike: actionType })
				this.$emit('success')
				this.$showToast('操作成功')
			} finally {
				uni.hideLoading()
			}
		}
	}
}
</script>

<style lang="less" scoped>
.good-evaluate-and-question-container {
	box-sizing: border-box;
}
</style>
