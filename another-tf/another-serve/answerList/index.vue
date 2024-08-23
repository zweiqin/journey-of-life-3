<template>
	<view class="answer-list-container">
		<JHeader title="全部问答" width="50" height="50"></JHeader>
		<view class="qaBox">
			<view class="qaTopInfo">
				<view class="qaTopInfoBox">
					<image :src="common.seamingImgUrl(productInfo.images[0])"></image>
					<view class="qaInfoText">
						<h3>{{ productInfo.productName }}</h3>
						<span>共{{ problemsList.length }}个问题</span>
					</view>
				</view>
			</view>
			<QuestionsAndAnswersList :product-info="productInfo" :problems-list="problemsList" />
			<view class="putQuestionsBox">
				<view
					class="putQuestionsBtn"
					@click="go(`/another-tf/another-serve/putQuestions/index?shopId=${productInfo.shopId}&productId=${productInfo.productId}&skuId=${productInfo.skuId}&questionNumber=${problemsList.length}`)"
				>
					去提问
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getProblemsSeckillApi, getProductDetailsByIdApi } from '../../../api/anotherTFInterface'
import QuestionsAndAnswersList from '../goodsDetails/components/QuestionsAndAnswersList'

export default {
	name: 'AnswerList',
	components: { QuestionsAndAnswersList },
	data() {
		return {
			productId: 0,
			isEmpty: false,
			problemsList: [], // 商品问答数据
			problemsTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			productInfo: {
				images: []
			}
		}
	},
	onLoad(options) {
		this.productId = options.productId
		uni.showLoading()
		getProductDetailsByIdApi({
			shopId: options.shopId,
			productId: this.productId,
			skuId: options.skuId,
			terminal: 1
		}).then((res) => {
			uni.hideLoading()
			this.productInfo = res.data
		})
			.catch((res) => {
				uni.hideLoading()
			})
		this.getProblemsList()
	},
	methods: {
		// 商品问答数据
		getProblemsList(isLoadmore) {
			uni.showLoading()
			getProblemsSeckillApi({ ...this.queryInfo, productId: this.productId }).then((res) => {
				this.problemsTotal = res.data.total
				if (isLoadmore) {
					this.problemsList.push(...res.data.list)
				} else {
					this.problemsList = res.data.list
				}
				this.isEmpty = this.problemsList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		onReachBottom() {
			if (this.problemsList.length < this.problemsTotal) {
				++this.queryInfo.page
				this.getProblemsList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.answer-list-container {
	min-height: 100vh;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.qaBox {
		padding-bottom: 140rpx;

		.qaTopInfo {
			margin-top: 20rpx;
			margin-bottom: 30rpx;
			padding: 0 40rpx;

			.qaTopInfoBox {
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				padding: 15rpx 20rpx;
				margin-bottom: 55rpx;
				background: #F6F6F6;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 5rpx;
					margin-right: 20rpx;
				}

				.qaInfoText {
					h3 {
						font-size: 30rpx;
						font-weight: 500;
						color: #333333;
					}

					span {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}

		.putQuestionsBox {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #FFFFFF;
		}

		.putQuestionsBtn {
			width: 421rpx;
			height: 67rpx;
			line-height: 67rpx;
			text-align: center;
			background: #333333;
			border-radius: 5rpx;
			display: block;
			margin: 35rpx auto 35rpx auto;
			color: #FFEBC4;
		}
	}
}
</style>
