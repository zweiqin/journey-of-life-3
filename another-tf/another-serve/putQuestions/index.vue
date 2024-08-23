<template>
	<view class="qaBox">
		<JHeader title="提问" width="50" height="50"></JHeader>
		<view class="qaTopInfo">
			<view class="qaTopInfoBox">
				<image :src="common.seamingImgUrl(qudata.images[0])"></image>
				<view class="qaInfoText">
					<h3>{{ qudata.productName }}</h3>
					<span>共{{ questionNumber }}个问题</span>
				</view>
			</view>
		</view>
		<view class="questionCent">
			<view class="uni-textarea">
				<textarea v-model="questionText" maxlength="200" placeholder="请说出你的问题..." auto-height />
			</view>
			<!--      <view class="anonymous"> -->
			<!--		  <view class="flex-row-plus flex-items" @click="changeCheck"> -->
			<!--			 <label>匿名提问</label> -->
			<!--		  </view> -->
			<!--      </view> -->
		</view>
		<view class="putQuestionsBox" @click="addProblem">
			<span class="putQuestionsBtn">发布</span>
		</view>
	</view>
</template>

<script>
import { addProblemAnswerApi, getProductDetailsByIdApi } from '../../../api/anotherTFInterface'
export default {
	name: 'PutQuestions',
	data() {
		return {
			anonymous: false,
			qudata: {
				images: []
			},
			questionText: '',
			ifAnonymous: 0,
			questionNumber: ''
		}
	},
	onLoad(options) {
		this.questionNumber = options.questionNumber
		uni.showLoading()
		getProductDetailsByIdApi({
			shopId: options.shopId,
			productId: options.productId,
			skuId: options.skuId,
			terminal: 1
		}).then((res) => {
			uni.hideLoading()
			this.qudata = res.data
		})
			.catch((res) => {
				uni.hideLoading()
			})
	},
	methods: {
		changeCheck() {
			this.anonymous = !this.anonymous
		},
		addProblem() {
			if (this.questionText === '') return this.$showToast('内容不能为空！')
			uni.showLoading({
				title: '提交中...',
				mask: true
			})
			if (this.anonymous == true) {
				this.ifAnonymous = 1
			} else {
				this.ifAnonymous = 0
			}
			addProblemAnswerApi({
				productId: this.qudata.productId,
				problem: this.questionText,
				ifAnonymous: this.ifAnonymous
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '提问成功',
					icon: 'success'
				})
				setTimeout(() => {
					this.$redirectTo('/another-tf/another-serve/questionList/index')
				}, 2000)
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.qaBox {
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	padding: 0 30rpx;

	.qaTopInfo {
		margin-top: 20rpx;
		margin-bottom: 30rpx;

		.qaTopInfoBox {
			display: flex;
			align-items: center;
			padding: 15rpx 20rpx;
			margin-bottom: 55rpx;

			image {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				border: 2rpx solid #E4E5E6;
			}

			.qaInfoText {
				h3 {
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
				}

				span {
					font-size: 24rpx;
					color: #CCCCCC;
					margin-top: 20rpx;
				}
			}
		}
	}

	.questionCent {
		width: 100%;

		textarea {
			padding: 30rpx;
			box-sizing: border-box;
			min-height: 300rpx;
			background: #FFFFFF;
			border: 2rpx solid #EEEEEE;
			width: 100%;
			color: #666666;
		}
	}

	.putQuestionsBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #FFFFFF;

		.putQuestionsBtn {
			width: 90%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background: #333333;
			display: block;
			margin: 0 auto 70rpx auto;
			color: #FFEBC4;
			font-size: 28rpx;
		}
	}
}
</style>
