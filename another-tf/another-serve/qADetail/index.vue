<template>
	<view>
		<JHeader title="问答详情" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view v-if="ifShow" class="qaBox">
			<view class="qaTopInfo">
				<view class="qaTopInfoBox" @click="goGoodsDetails">
					<image :src="common.seamingImgUrl(detailList.image)"></image>
					<view class="qaInfoText">
						<h3>{{ detailList.productName }}</h3>
						<span>共{{ detailList.count }}个问题</span>
					</view>
				</view>
				<view class="qaTitBox">
					<view class="qaTit">
						<i>问</i>
						<h3>{{ detailList.problem }}</h3>
					</view>
					<view class="qaTitTime">
						<img :src="common.seamingImgUrl(detailList.headImage)" />
						<span class="qaName">{{ detailList.name }}</span>
						<span class="qaTimeInfo">{{ detailList.createTime }}</span>
					</view>
				</view>
			</view>
			<view class="answerListBox">
				<view class="answerNum">共{{ answerslength }}条回答</view>
				<view v-for="item in detailList.answers" :key="item.answerId" class="answerList">
					<view class="answerItem">
						<view class="itemTit">
							<view class="itemAvatarBox">
								<img :src="common.seamingImgUrl(item.headImage)" alt="">
								<span class="answerName">{{ item.name }}</span>
							</view>
							<view class="answerTime">{{ item.createTime }}</view>
						</view>
						<view class="answerInfo">{{ item.answer }}</view>
					</view>
				</view>
			</view>
			<view v-if="detailList.ifExhibition == 1" class="pad-bot-100"></view>
			<view
				v-if="detailList.ifExhibition == 1" class="answerBtn"
				:style="{ 'padding-bottom': (isIphone == true ? 50 : 0) + 'rpx' }"
			>
				<view class="uni-form-item uni-column answerBtnBox">
					<input v-model="answerText" class="uni-input" maxlength="200" focus placeholder="被邀请的用户才能回答" />
					<view class="answerButton" @click="answer">
						回答
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getProblemDetailApi, addAnswerProblemApi } from '../../../api/anotherTFInterface'

export default {
	name: 'QADetail',
	data() {
		return {
			detailList: {}, // 商品问答详情
			productId: '',
			images: '',
			productName: '',
			problemsData: {},
			answerText: '',
			answerslength: 0,
			num: 0,
			isIphone: getApp().globalData.isIphone,
			ifShow: false
		}
	},
	onLoad(options) {
		this.problemsData.productId = options.productId
		this.problemsData.problemId = options.problemId
		this.getProblems()
	},
	methods: {
		goGoodsDetails() {
			const shopId = this.detailList.shopId
			const productId = this.detailList.productId
			const skuId = this.detailList.skuId
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		},
		// 商品问答数据
		getProblems() {
			getProblemDetailApi({
				problemId: this.problemsData.problemId,
				productId: this.problemsData.productId
			}).then((res) => {
				this.detailList = res.data
				this.ifShow = true
				this.answerslength = this.detailList.answers.length
			})
		},
		// 回答
		answer() {
			addAnswerProblemApi({
				productId: this.problemsData.productId,
				answer: this.answerText,
				problemId: this.problemsData.problemId
			}).then((res) => {
				this.getProblems()
				this.answerText = ''
				uni.showToast({
					title: '回答成功',
					icon: 'success'
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.qaBox {
	padding: 0 30upx;

	.qaTopInfo {
		margin-top: 20upx;

		.qaTopInfoBox {
			border-radius: 10upx;
			display: flex;
			align-items: center;
			padding: 15upx 20upx;
			margin-bottom: 55upx;

			image {
				border: 2px solid #E4E5E6;
				width: 120upx;
				height: 120upx;
				margin-right: 20upx;
			}

			.qaInfoText {
				h3 {
					font-size: 30upx;
					font-weight: 500;
					color: #333333;
					margin-bottom: 20rpx;
				}

				span {
					font-size: 24upx;
					color: #999999;
				}
			}
		}

		.qaTitBox {
			padding-bottom: 30upx;
			border-bottom: 1upx solid #EEEEEE;

			.qaTit {
				display: flex;
				align-items: center;
				margin-bottom: 35upx;

				i {
					width: 38upx;
					height: 38upx;
					background: #C83732;
					font-style: normal;
					text-align: center;
					color: #FFFFFF;
					font-size: 20upx;
					margin-right: 30upx;
				}

				h3 {
					font-size: 28upx;
					font-weight: 500;
					color: #333333;
				}
			}

			.qaTitTime {
				display: flex;
				align-items: center;

				img {
					width: 44upx;
					height: 44upx;
					margin-right: 20upx;
				}

				.qaName {
					font-size: 28upx;
					color: #666666;
					margin-right: 35upx;
				}

				.qaTimeInfo {
					color: #CCCCCC;
					font-size: 22upx;
				}
			}
		}
	}

	.answerListBox {
		.answerNum {
			font-size: 24upx;
			color: #CCCCCC;
			margin-bottom: 40upx;
			margin-top: 30upx;
		}

		.answerList {
			padding-bottom: 50upx;

			.answerItem {
				margin-bottom: 10upx;

				.itemTit {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.itemAvatarBox {
						display: flex;

						img {
							width: 46upx;
							height: 46upx;
							margin-right: 20upx;
						}

						.answerName {
							font-size: 26upx;
							color: #333333;
							font-weight: bold;
						}
					}

					.answerTime {
						color: #CCCCCC;
						font-size: 20upx;
					}
				}

				.answerInfo {
					color: #333333;
					font-size: 28upx;
					margin-top: 20upx;
					font-weight: 400;
				}
			}
		}
	}

	.answerBtn {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;

		.answerBtnBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 30upx;
			background: #FFFFFF;

			input {
				margin-right: 30upx;
				width: 530upx;
				background: #F1F1F1;
				min-height: 84upx;
				padding-left: 30upx;
				font-size: 28upx;
				color: #999999;
			}

			.answerButton {
				width: 152upx;
				height: 84upx;
				background: #333333;
				text-align: center;
				line-height: 84upx;
				font-size: 30upx;
				color: #FFEBC4;
			}
		}
	}
}
</style>
