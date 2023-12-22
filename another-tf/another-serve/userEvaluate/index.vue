<template>
	<view class="container">
		<JHeader title="我的评价" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>
			<!-- 我的评论 -->
			<view class="evaluateTitle-box flex-row-plus flex-sp-around">
				<view class="allEvaluate" :class="{ 'evaluateTitle-on': currentTab == 0 }" @click="handleChangeTab(0)">
					全部评价({{ myCommentListData.total || 0 }})
				</view>
				<view class="centerLine">|</view>
				<view :class="{ 'evaluateTitle-on': currentTab == 1 }" @click="handleChangeTab(1)">
					有图({{ myCommentListData.imageTotal || 0 }})
				</view>
			</view>
			<view v-if="currentTab == 0" class="mar-top-20">

				<view v-if="commentInfo.data && commentInfo.data.length">
					<view
						v-for="(item, index) in commentInfo.data.filter((item) => !item.isLoading)" :key="index"
						class="evaluate-contentbox" @click="commentDetails(index)"
					>
						<view class="evaluate-content flex-items flex-row flex-sp-between ">
							<view class="flex-items">
								<image v-if="item.headImage" class="user-headSmallImg" :src="common.seamingImgUrl(item.headImage)">
								</image>
								<image v-else class="user-headSmallImg" src="../../../static/images/new-user/default-user-avatar.png">
								</image>
								<view class="skuValue">
									<label v-if="item.name" class="fs28">{{ item.name }}</label>
									<label v-else class="fs28">匿名</label>
									<view class="fs22 font-color-999 mar-top-10">
										{{ item.value }}
									</view>
								</view>
							</view>
							<view v-if="item.addComment == ''" class="addCommentsBut" @click.stop="addCommentsClick(index)">追加评价</view>
						</view>
						<view class="fs26 pad-topbot-20" style="margin-top: 10rpx">{{ item.comment }}</view>
						<view v-if="item.image" class="evaluateImg-box">
							<view v-for="(cItem, index) in commentImgData(item.image)" :key="index">
								<image class="evaluate-Img" :src="common.seamingImgUrl(cItem)"></image>
							</view>
						</view>
						<view v-if="item.addComment" class="addComments-box flex-column-plus">
							<label class="font-color-C5AA7B mar-top-30">用户追评</label>
							<label class="mar-top-20">{{ item.addComment }}</label>
							<view v-if="item.addImage" class="evaluateImg-box mar-top-20">
								<view v-for="(dItem, index) in commentImgData(item.addImage)" :key="index">
									<image class="evaluate-Img" :src="common.seamingImgUrl(dItem)"></image>
								</view>
							</view>
						</view>
						<view class="goodsDes-box flex-column-plus mar-top-30">
							<view class="flex-row-plus" @click.stop="goGoodsDetails(item.shopId, item.productId, item.skuId)">
								<image class="goodsDes-img default-img" :src="common.seamingImgUrl(item.productImage)"></image>
								<view class="goodsDesText-box">
									<label class="fs26 goodsDes-text">{{ item.productName }}</label>
									<view class="mar-top-70">
										<label>¥ {{ item.productPrice }}</label>
									</view>
								</view>
							</view>
						</view>
						<view class="flex-items flex-row mar-top-30 flex-sp-between">
							<view class="font-color-999 fs22">{{ item.createTime }}</view>
							<view class="praise-box flex-items flex-row">
								<tui-icon
									v-if="item.ifLike" :size="30" color="#c5aa7b" name="agree"
									@click="zanTap(index, item.commentId, 0)"
								></tui-icon>
								<tui-icon
									v-else :size="30" color="#cccccc" name="agree"
									@click="zanTap(index, item.commentId, 1)"
								></tui-icon>
								<label class="mar-left-10">{{ item.likes }}</label>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45upx;">
					<LoadingMore
						:status="!commentInfo.isEmpty && !commentInfo.data.length
							? 'loading' : !commentInfo.isEmpty && commentInfo.data.length && (commentInfo.data.length >= commentInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="commentInfo.isEmpty" :fixed="false" style="margin-top: 60upx;">你还没有评论哦～</tui-no-data>
				</view>

			</view>
			<view v-if="currentTab == 1" class="mar-top-20">

				<view v-if="commentPicInfo.data && commentPicInfo.data.length">
					<view
						v-for="(item, index) in commentPicInfo.data.filter((item) => !item.isLoading)" :key="index"
						class="evaluate-contentbox"
					>
						<view class="evaluate-content flex-column" @click="commentDetails(index)">
							<view class="flex-items">
								<image v-if="item.headImage" class="user-headSmallImg" :src="common.seamingImgUrl(item.headImage)">
								</image>
								<image v-else class="user-headSmallImg" src="../../../static/images/new-user/default-user-avatar.png">
								</image>
								<label v-if="item.name" class="fs28 mar-left-20">{{ item.name }}</label>
								<label v-else class="fs28 mar-left-20">匿名</label>
							</view>
							<view class="fs22 font-color-999 mar-top-10">
								{{ item.value }}
							</view>
							<view class="fs26 pad-topbot-20">{{ item.comment }}</view>
							<view v-if="item.image" class="evaluateImg-box">
								<view v-for="(cItem, index) in commentImgData(item.image)" :key="index">
									<image class="evaluate-Img" :src="common.seamingImgUrl(cItem)"></image>
								</view>
							</view>
							<view v-if="item.addComment" class="addComments-box flex-column-plus">
								<label class="font-color-C5AA7B mar-top-30">用户追评</label>
								<label class="mar-top-20">{{ item.addComment }}</label>
								<view v-if="item.addImage" class="evaluateImg-box mar-top-20">
									<view v-for="(dItem, index) in commentImgData(item.addImage)" :key="index">
										<image class="evaluate-Img" :src="common.seamingImgUrl(dItem)"></image>
									</view>
								</view>
							</view>
							<view class="flex-items flex-row mar-top-30 flex-sp-between">
								<view class="font-color-999 fs22">{{ item.createTime }}</view>
								<view class="praise-box flex-items flex-row">
									<tui-icon
										v-if="item.ifLike" :size="30" color="#c5aa7b" name="agree"
										@click="zanTap(index, item.commentId, 0)"
									></tui-icon>
									<tui-icon
										v-else :size="30" color="#cccccc" name="agree"
										@click="zanTap(index, item.commentId, 1)"
									></tui-icon>
									<label class="mar-left-10">{{ item.likes }}</label>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45upx;">
					<LoadingMore
						:status="!commentPicInfo.isEmpty && !commentPicInfo.data.length
							? 'loading' : !commentPicInfo.isEmpty && commentPicInfo.data.length && (commentPicInfo.data.length >= commentPicInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="commentPicInfo.isEmpty" :fixed="false" style="margin-top: 60upx;">你还没有评论哦～</tui-no-data>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
import { getAllMyCommentListApi, updateLikeOrUnLikeCommentApi } from '../../../api/anotherTFInterface'
export default {
	name: 'UserEvaluate',
	data() {
		return {
			currentTab: 0,
			commentInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			commentPicInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0, // 列表数据总数
				isEmpty: false // 列表是否为空
			},
			myCommentListData: {}
		}
	},
	onLoad() {
		this.getMyCommentList()
	},
	methods: {
		commentImgData(imgData) {
			let imgDataResult = []
			imgDataResult = imgData.split(',')
			return imgDataResult
		},
		handleChangeTab(index) {
			this.currentTab = index
			// 缓存每个tab里的数据
			if (this.currentTab === 0) {
			} else if (this.currentTab === 1) {
				if (!this.commentPicInfo.isEmpty && !this.commentPicInfo.data.length) this.getMyCommentPicList()
			}
			// 每点一个tab就重新进行对它的请求
			// if (this.currentTab === 0) {
			// 	this.commentInfo.query.page = 1
			// 	this.commentInfo.data = []
			// 	this.commentInfo.listTotal = 0
			// 	this.commentInfo.isEmpty = false
			// 	this.getIntegralList()
			// } else if (this.currentTab === 1) {
			// 	this.commentPicInfo.query.page = 1
			// 	this.commentPicInfo.data = []
			// 	this.commentPicInfo.listTotal = 0
			// 	this.commentPicInfo.isEmpty = false
			// 	this.getMyCommentPicList()
			// }
		},
		// 我的评价列表
		getMyCommentList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getAllMyCommentListApi({ ...this.commentInfo.query, state: this.currentTab ? this.currentTab : '' })
				.then((res) => {
					this.myCommentListData = res.data
					this.commentInfo.listTotal = res.data.page.total
					if (isLoadmore) {
						this.commentInfo.data.push(...res.data.page.list)
					} else {
						this.commentInfo.data = res.data.page.list
					}
					this.commentInfo.isEmpty = this.commentInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getMyCommentPicList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getAllMyCommentListApi({ ...this.commentPicInfo.query, state: this.currentTab ? this.currentTab : '' })
				.then((res) => {
					this.myCommentListData = res.data
					this.commentPicInfo.listTotal = res.data.page.total
					if (isLoadmore) {
						this.commentPicInfo.data.push(...res.data.page.list)
					} else {
						this.commentPicInfo.data = res.data.page.list
					}
					this.commentPicInfo.isEmpty = this.commentPicInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 点赞
		zanTap(index, likeId, actionType) {
			uni.showLoading()
			updateLikeOrUnLikeCommentApi({
				commentId: likeId,
				ifLike: actionType
			}).then((res) => {
				if (this.currentTab === 0) {
					this.commentInfo.data[index].ifLike = !this.commentInfo.data[index].ifLike
					this.commentInfo.data[index].likes = this.commentInfo.data[index].ifLike ? this.commentInfo.data[index].likes + 1 : this.commentInfo.data[index].likes - 1
				} else if (this.currentTab === 1) {
					this.commentPicInfo.data[index].ifLike = !this.commentPicInfo.data[index].ifLike
					this.commentPicInfo.data[index].likes = this.commentPicInfo.data[index].ifLike ? this.commentPicInfo.data[index].likes + 1 : this.commentPicInfo.data[index].likes - 1
				}
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		goGoodsDetails(shopId, productId, skuId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		},
		commentDetails(index) {
			if (this.currentTab === 0) uni.setStorageSync('commentVOList', this.commentInfo.data[index])
			else if (this.currentTab === 1) uni.setStorageSync('commentVOList', this.commentPicInfo.data[index])
			uni.redirectTo({
				url: '/another-tf/another-serve/evaluateDetails/index'
			})
		},
		// 追加评论
		addCommentsClick(index) {
			if (this.currentTab === 0) uni.setStorageSync('addCommentVOList', this.commentInfo.data[index])
			else if (this.currentTab === 1) uni.setStorageSync('addCommentVOList', this.commentPicInfo.data[index])
			uni.redirectTo({
				url: '/another-tf/another-serve/addEvaluate/index?type=2'
			})
		}
	},
	onReachBottom() {
		if (this.currentTab === 0) {
			if (this.commentInfo.data.length < this.commentInfo.listTotal) {
				++this.commentInfo.query.page
				this.getMyCommentList(true)
			}
		} else if (this.currentTab === 1) {
			if (this.commentPicInfo.data.length < this.commentPicInfo.listTotal) {
				++this.commentPicInfo.query.page
				this.getMyCommentPicList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	background-color: #FFFFFF;
	min-height: 100vh;
	box-sizing: border-box;

	.evaluateTitle-box {
		color: #CCCCCC;
		margin-top: 26upx;
		border-bottom: 2rpx solid #F3F4F5;

		.evaluateTitle-on {
			padding-bottom: 20upx;
			border-bottom: 4upx solid #C5AA7B;
			color: #333333;
		}
	}

	.evaluate-contentbox {
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 30upx 30upx;
		margin: 10rpx 10rpx;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #F3F4F5;

		.evaluate-content {
			width: 670upx;
			display: flex;
			justify-content: space-between;

			.user-headSmallImg {
				width: 46upx;
				height: 46upx;
				border-radius: 50%;
			}

			.skuValue {
				text-align: left;
				padding-left: 30rpx;
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

	.addCommentsBut {
		width: 140upx;
		height: 58upx;
		background: #333333;
		font-size: 26upx;
		line-height: 58upx;
		text-align: center;
		color: #C5AA7B;
	}
}
</style>
