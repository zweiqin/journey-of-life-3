<template>
	<view class="qaBox">
		<JHeader title="提问" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="qaTopInfo">
			<view class="qaTopInfoBox">
				<image :src="common.seamingImgUrl(qudata.images)"></image>
				<view class="qaInfoText">
					<h3>{{ qudata.productName }}</h3>
					<span>共{{ qudata.questionNumber }}个问题</span>
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
import { addProblemAnswerApi } from '../../../api/anotherTFInterface'
export default {
	name: 'QADetail',
	data() {
		return {
			anonymous: false,
			qudata: {},
			questionText: '',
			ifAnonymous: 0
		}
	},
	onLoad(params) {
		this.qudata = this.$getJumpParam(params)
	},
	methods: {
		seeAllFn() {
			uni.navigateTo({
				url: 'qADetail'
			})
		},
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

<style lang="scss" scoped>
.qaBox {
	padding: 0 30upx;

	.qaTopInfo {
		margin-top: 20upx;
		margin-bottom: 30upx;

		.qaTopInfoBox {
			display: flex;
			align-items: center;
			padding: 15upx 20upx;
			margin-bottom: 55upx;

			image {
				width: 120upx;
				height: 120upx;
				margin-right: 20upx;
				border: 2rpx solid #E4E5E6;
			}

			.qaInfoText {
				h3 {
					font-size: 30upx;
					font-weight: 500;
					color: #333333;
				}

				span {
					font-size: 24upx;
					color: #CCCCCC;
					margin-top: 20rpx;
				}
			}
		}
	}

	.questionCent {
		width: 100%;

		textarea {
			padding: 30upx;
			box-sizing: border-box;
			min-height: 300upx;
			background: #FFFFFF;
			border: 2upx solid #EEEEEE;
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
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			background: #333333;
			display: block;
			margin: 0 auto 70upx auto;
			color: #FFEBC4;
			font-size: 28rpx;
		}
	}
}
</style>
