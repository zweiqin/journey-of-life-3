<template>
	<view class="wid bor-line-F7F7F7">
		<JHeader title="全部问答" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
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
.qaBox {
	padding-bottom: 140upx;

	.qaTopInfo {
		margin-top: 20upx;
		margin-bottom: 30upx;
		padding: 0 40upx;

		.qaTopInfoBox {
			border-radius: 10upx;
			display: flex;
			align-items: center;
			padding: 15upx 20upx;
			margin-bottom: 55upx;
			background: #F6F6F6;

			image {
				width: 60upx;
				height: 60upx;
				border-radius: 5upx;
				margin-right: 20upx;
			}

			.qaInfoText {
				h3 {
					font-size: 30upx;
					font-weight: 500;
					color: #333333;
				}

				span {
					font-size: 24upx;
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
		width: 421upx;
		height: 67upx;
		line-height: 67upx;
		text-align: center;
		background: #333333;
		border-radius: 5upx;
		display: block;
		margin: 35rpx auto 35rpx auto;
		color: #FFEBC4;
	}
}
</style>
