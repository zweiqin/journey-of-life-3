<template>
	<view class="questions-and-answers-list-container">
		<view
			v-for="(problemItem, problemIndex) in problemsList" :key="problemIndex"
			style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 24rpx;font-size: 26rpx;"
			@click="go(`/another-tf/another-serve/qADetail/index?productId=${productInfo.productId}&problemId=${problemItem.problemId}`)"
		>
			<view style="flex: 1;display: flex;align-items: center;">
				<view
					style="padding: 8rpx 14rpx 8rpx 10rpx;font-size: 22rpx;color: #ffffff;font-style: italic;background-color: #ea5c1e;border-radius: 12rpx 12rpx 0 12rpx;"
				>
					问
				</view>
				<view style="flex: 1;width: 0;margin-left: 14rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
					{{ problemItem.problem }}
				</view>
			</view>
			<view style="margin: 0 0 0 16rpx;">
				<view v-if="problemItem.answers.length" style="color: #999999;">
					<!-- {{ problemItem.answers[0].answer }} -->
					{{ problemItem.answers.length }}条回答
				</view>
				<view v-else>
					<tui-button
						v-if="problemItem.ifAnswer === 1" type="black" width="140rpx" height="46rpx"
						margin="0" plain
						:size="26"
						@click="go(`/another-tf/another-serve/qADetail/index?productId=${productInfo.productId}&problemId=${problemItem.problemId}`)"
					>
						立即回答
					</tui-button>
				</view>
			</view>
		</view>
	</view>
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
	}
}
</script>

<style lang="scss" scoped>
.questions-and-answers-list-container {
	box-sizing: border-box;
}
</style>
