<template>
	<div class="content">
		<view class="listBox">
			<view v-for="(problemItem, problemIndex) in problemsList" :key="problemIndex" class="itemBox">
				<view class="itemAsk">
					<i>问</i><span>{{ problemItem.problem }}</span>
				</view>
				<view v-if="problemItem.answers.length > 0">
					<view v-for="(answerItem, answerIndex) in (problemItem.answers.slice(0, 1))" :key="answerIndex" class="answer">
						<view class="answerBox">
							<i>答</i><span>{{ answerItem.answer }}</span>
						</view>
						<view
							v-if="problemItem.ifAnswer === 1" class="answerBtn"
							@click="handleJumpAnswerByProblemId(problemItem.problemId)"
						>
							立即回答
						</view>
					</view>
				</view>
				<view v-else>
					<view class="answer">
						<view class="answerBox">
							<i>答</i><span>暂无答复</span>
						</view>
						<view
							v-if="problemItem.ifAnswer === 1" class="answerBtn"
							@click="handleJumpAnswerByProblemId(problemItem.problemId)"
						>
							立即回答
						</view>
					</view>
				</view>
				<view
					v-if="problemItem.answers.length > 1" class="seeAll"
					@click="handleJumpAnswerByProblemId(problemItem.problemId)"
				>
					查看全部答复
				</view>
			</view>
		</view>
	</div>
</template>

<script>
export default {
	name: 'QuestionsAndAnswersList',
	props: {
		problemsList: {
			type: Array,
			default: () => []
		},
		productInfo: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {}
	},
	methods: {

		/**
		 * 跳转到问题的所有回答
		 * @param problemId 问答ID
		 */

		handleJumpAnswerByProblemId(problemId) {
			const paramObj = Object.assign({}, this.productInfo, {
				questionlength: this.problemsList.length,
				problemId,
				img: this.productInfo.images[0]
			})
			this.go('/another-tf/another-serve/qADetail/index', paramObj)
		}
	}
}
</script>

<style lang="scss" scoped>
.listBox {
	padding: 0 30upx;

	.itemBox {
		padding-bottom: 30upx;
		border-bottom: 1upx solid #EEEEEE;
		margin-bottom: 30upx;

		&:last-child {
			border-bottom: none;
		}

		.itemAsk {
			display: flex;
			align-items: center;
			margin-bottom: 42upx;

			i {
				font-style: normal;
				width: 38upx;
				height: 38upx;
				line-height: 38upx;
				background: #C5AA7B;
				display: block;
				margin-right: 30upx;
				font-size: 24upx;
				color: #FFFFFF;
				text-align: center;
			}

			span {
				font-size: 28upx;
				color: #333333;
			}
		}

		.answer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30upx;

			.answerBox {
				display: flex;
				align-items: center;

				i {
					font-style: normal;
					width: 38upx;
					height: 38upx;
					line-height: 38upx;
					background: #C5AA7B;
					display: block;
					text-align: center;
					margin-right: 30upx;
					font-size: 24rpx;
					color: #FFFFFF;
				}

				span {
					font-size: 26upx;
					color: #666666;
				}
			}

			.answerBtn {
				width: 130upx;
				height: 50upx;
				line-height: 50upx;
				border: #333333 2rpx solid;
				text-align: center;
				color: #333;
				font-size: 24upx;
			}
		}

		.seeAll {
			margin-left: 68upx;
			font-size: 28upx;
			color: #C5AA7B;
		}
	}
}
</style>
