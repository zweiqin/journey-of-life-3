<template>
	<div class="content">
		<view class="evaQaTab flex-items flex-sp-around">
			<view :class="{ active: activeTab === 1 }" class="evaBtn" @click="activeTab = 1">
				<view class="tabTit">宝贝评价（{{ commentList.length }}）</view>
			</view>
			<view :class="{ active: activeTab === 2 }" class="qaBtn" @click="activeTab = 2">
				<view class="tabTit">商品问答（{{ problemsTotal }}）</view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="borRig-line-20"></view>
		<view v-show="activeTab === 1" class="evaluate-box flex-start flex-column">
			<view v-if="commentList.length > 0" class="evaluateTag-box">
				<view class="evaluateTag-text">
					全部({{ commentList.length }})
				</view>
			</view>
			<view
				v-for="(commentItem, commentIndex) in commentList.slice(0, 2)" :key="commentIndex"
				class="evaluate-contentbox mar-top-30"
			>
				<view class="evaluate-content flex-items flex-row flex-sp-between">
					<view class="flex-items">
						<image class="user-headSmallImg" :src="commentItem.headImage"></image>
						<label class="fs28 mar-left-20">{{ commentItem.name }}</label>
					</view>
					<label class="font-color-999 fs22">{{ commentItem.createTime }}</label>
				</view>
				<view class="evaluateDes-box">
					<label class="evaluateDes">{{ commentItem.comment }}</label>
				</view>
				<view v-if="commentItem.image" class="item-image-box">
					<view v-for="(imgItem, imgIndex) in (commentItem.image.split(',') || [])" :key="imgIndex">
						<image
							class="img-item" :src="imgItem"
							@click="handlePreviewImage(commentList[commentIndex].images, imgIndex)"
						>
						</image>
					</view>
				</view>
				<view class="item-line"></view>
				<view v-if="commentItem.addComment !== ''" class="item-like-box">
					<view class="addEvaluate">
						<view>追加评价：{{ commentItem.addComment }}</view>
						<view v-if="commentItem.addImages" class="item-image-box">
							<view v-for="(itemAddImg, imgIndex) in commentItem.addImages" :key="imgIndex">
								<image
									class="img-item" :src="itemAddImg"
									@click="handlePreviewImage(commentList[commentIndex].addImages, imgIndex)"
								>
								</image>
							</view>
						</view>
					</view>
				</view>
				<view class="like-box">
					<tui-icon
						v-if="commentItem.ifLike === 1" :size="24" color="#c5aa7b" name="agree"
						@click="handlePraise(commentItem, 0)"
					></tui-icon>
					<tui-icon v-else :size="24" color="#cccccc" name="agree" @click="handlePraise(commentItem, 1)"></tui-icon>
					<view class="like-num">{{ commentItem.likes }}</view>
				</view>
			</view>
			<view
				v-if="commentList.length > 0" class="moreBox"
				@click="go('/another-tf/another-serve/evaluateList/index', commentList)"
			>
				<label class="fs24">查看全部</label>
				<tui-icon :size="24" color="#baa174" name="arrowright" margin="0 0 0 10upx"></tui-icon>
			</view>
		</view>
		<!-- 问答 -->
		<view class="borRig-line-20"></view>
		<view v-show="activeTab === 2" class="questions">
			<view class="questionInfo flex-items flex-row flex-sp-between">
				<view class="infoTit">宝贝好不好，问问已买过的人</view>
				<view class="putQuestion" @click="handleJumpToQuestion">
					<text>去提问</text>
					<tui-icon :size="30" color="#d9c9a8" name="arrowright"></tui-icon>
				</view>
			</view>
			<view class="listBox">
				<QuestionsAndAnswersList :product-info="productInfo" :problems-list="problemsList" />
				<view v-if="problemsList.length > 0" class="moreBox" @click="handleJumpAllAnswer">
					<label class="fs24">查看全部</label>
					<tui-icon :size="24" color="#baa174" name="arrowright" margin="0 0 0 10upx"></tui-icon>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
import lodash from 'lodash-es'
import QuestionsAndAnswersList from './QuestionsAndAnswersList'
import { getProblemsSeckillApi, updateLikeOrUnLikeCommentApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'GoodEvaluateAndQuestion',
	components: { QuestionsAndAnswersList },
	props: {
		commentList: {
			type: Array,
			default: () => []
		},
		productInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			// 当前选中的tab
			activeTab: 1, // 1评价 2问答
			problemsList: [], // 问题列表
			problemsTotal: 0 // 问题总数
		}
	},
	mounted() {
		this.handleGetProblemList()
	},
	methods: {
		/**
		 * 获取问答数据
		 * @return {Promise<void>}
		 */

		async handleGetProblemList() {
			if (!this.productInfo.productId) {
				return
			}
			const res = await getProblemsSeckillApi({
				productId: this.productInfo.productId,
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

		handlePraise: lodash.debounce(async function (commentItem, actionType) {
			uni.showLoading({
				mask: true,
				title: '提交中...'
			})
			try {
				await updateLikeOrUnLikeCommentApi({
					commentId: commentItem.commentId,
					ifLike: actionType
				})
				if (commentItem.ifLike === 1) {
					commentItem.ifLike = 0
					commentItem.likes--
				} else {
					commentItem.ifLike = 1
					commentItem.likes++
				}
			} finally {
				uni.hideLoading()
			}
		}, 500),

		// 跳转到提问
		handleJumpToQuestion() {
			const paramObj = Object.assign({}, this.productInfo, {
				questionNumber: this.problemsList.length,
				images: this.productInfo.images[0]
			})
			this.go('/another-tf/another-serve/putQuestions/index', paramObj)
		},

		// 跳转到该商品下所有问答
		handleJumpAllAnswer() {
			const paramObj = Object.assign({}, this.productInfo, {
				images: this.productInfo.images[0]
			})
			this.gp('/another-tf/another-serve/answerList/index', paramObj)
		}
	}
}
</script>

<style lang="less" scoped>
.evaQaTab {
	height: 82rpx;
	line-height: 82rpx;
	border-bottom: #F3F4F5 solid 2rpx;
	font-size: 30rpx;
	color: #CCCCCC;

	.evaBtn {
		width: 50%;
		position: relative;
		text-align: center;

		&:before {
			content: '';
			width: 2rpx;
			height: 30rpx;
			background: #CCCCCC;
			display: block;
			position: absolute;
			right: 0;
			top: 20rpx;
		}
	}

	.qaBtn {
		width: 50%;
		text-align: center;
	}

	.tabTit {
		display: inline-block;
		height: 82rpx;
		line-height: 82rpx;
	}

	.active {
		color: #333333;

		.tabTit {
			border-bottom: 4rpx solid #444444;
		}
	}
}

.questions {
	.questionInfo {
		padding: 0 30upx;
		min-height: 150upx;

		.infoTit {
			font-size: 28upx;
		}

		.putQuestion {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 140upx;
			height: 60upx;
			background: #333333;
			line-height: 60upx;
			font-size: 24upx;
			color: #FFEBC4;
			padding-left: 20rpx;
			position: relative;
		}
	}

	.listBox {
		padding: 0 30upx;
		border-bottom: 20upx solid #EEEEEE;
	}
}

.evaluate-box {
	background-color: #FFFFFF;
	margin-top: 20upx;

	.evaluateTag-box {
		margin-top: 10upx;
		margin-left: 10upx;
		padding-bottom: 10upx;
		display: flex;
		flex-wrap: wrap;

		.evaluateTag-text {
			background-color: #F4F4F4;
			border-radius: 6upx;
			padding: 16upx 14upx;
			color: #656565;
			margin-left: 20upx;
			margin-top: 20upx;
		}
	}

	.evaluate-contentbox {
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left: 30upx;
		// border-bottom: 1upx solid #EDEDED;
		padding-bottom: 50upx;

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

		.evaluateDes-box {
			width: 670upx;
			margin-top: 30upx;

			.evaluateDes {
				width: 670upx;
			}
		}

		.addEvaluate {
			padding-top: 30upx;
		}
	}
}

.item-image-box {
	width: 700upx;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.img-item {
		width: 223upx;
		height: 223upx;
		border-radius: 10upx;
		margin-right: 10upx;
		margin-top: 10upx;
	}
}

.item-line {
	width: 690upx;
	height: 1px;
	background: rgba(238, 238, 238, 1);
	margin-top: 20upx;
}

.item-like-box {
	display: flex;
	flex-direction: row;
	width: 690upx;
	align-items: center;
	justify-content: space-between;
}

.like-box {
	display: flex;
	flex-direction: row;
	padding-top: 30upx;
	align-items: center;
	justify-content: flex-end;
	margin-right: 50upx;

	.like-num {
		font-size: 28upx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-left: 30upx;
	}
}

.moreBox {
	width: 170rpx;
	height: 54rpx;
	line-height: 54rpx;
	margin: 0 auto 50rpx auto;
	border: 2rpx solid #C5AA7B;
	color: #C5AA7B;
	display: flex;
	align-items: center;
	justify-content: center;

	image {
		width: 10rpx;
		height: 20rpx;
	}
}
</style>
