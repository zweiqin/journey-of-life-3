<template>
	<view class="service-center-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="客服中心"></JHeader>
		</view>

		<view v-if="customerCategoryData && customerCategoryData.length">
			<view
				v-for="(item, index) in JSON.parse(JSON.stringify(customerCategoryData)).sort((a, b) => Number(b.sortOrder) - Number(a.sortOrder))"
				:key="index" style="margin-bottom: 20upx;"
			>
				<tui-card :title="{ text: item.name || '--' }" :image="{ url: common.seamingImgUrl(item.picUrl), width: 58 }">
					<template #body>
						<view v-if="item.children && item.children.length">
							<view style="display: flex;flex-wrap: wrap;padding: 10upx 18upx;">
								<view
									v-for="(part, count) in JSON.parse(JSON.stringify(item.children)).sort((a, b) => Number(b.sortOrder) - Number(a.sortOrder))"
									:key="count"
									style="display: flex;align-items: center;margin: 10upx;padding: 4upx 24upx;background-color: #fff5f4;border-radius: 28upx;"
									@click="handleLevelTwoCategory(part)"
								>
									<TuanIcon :src="common.seamingImgUrl(part.picUrl)" :size="26"></TuanIcon>
									<view style="font-size: 28upx;">{{ part.name }}</view>
								</view>
							</view>
						</view>
						<view v-else style="padding: 28upx 0;text-align: center;">
							该类目下暂无数据~
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无分类问题！</tui-no-data>
		</view>

		<view style="position: fixed;bottom: 0;width: 100%;padding: 4upx 0;background-color: #ffffff;">
			<view
				style="text-align: center;"
				@click="go('/user/sever/chat/chat-detail?chat=serviceAssistant')"
			>
				<tui-icon name="message" size="36" color="#4b4b4b"></tui-icon>
				<view style="font-size: 30upx;color: #bcb5b2;">客服助手</view>
			</view>
		</view>

		<!-- 答案显示 -->
		<tui-bottom-popup :show="isShowAnswerPopup" @close="isShowAnswerPopup = false">
			<view
				v-if="questionSelect && questionSelect.id"
				style="max-height: 100%;padding: 94upx 38upx 142upx;overflow-y: auto;box-sizing: border-box;"
			>
				<view style="font-size: 38upx;">{{ questionSelect.name }}</view>
				<view style="margin-top: 50upx;color: #aaaeae;">{{ answer.describe || '暂无描述~' }}</view>
				<view v-if="answer.picUrl" style="margin-top: 50upx;text-align: center;">
					<Avatar :width="192" :height="192" radius="10upx" :src="common.seamingImgUrl(answer.picUrl)"></Avatar>
				</view>
				<view style="display: flex;justify-content: space-evenly;margin-top: 50upx;">
					<tui-button
						width="260rpx" height="72rpx" :size="28" plain
						:type="statisticsSelect === 0 ? 'danger' : 'gray'"
						shape="circle" @click="handleClickStatistics(0)"
					>
						<view>
							<tui-icon name="agree" :size="18" :color="statisticsSelect === 0 ? '#eb0909' : '#999999'"></tui-icon>
							<text style="margin-left: 10upx;">有用（{{ answer.statistics ? answer.statistics.split(':')[0] : '0' }}）</text>
						</view>
					</tui-button>
					<tui-button
						width="260rpx" height="72rpx" :size="28" plain
						:type="statisticsSelect === 1 ? 'danger' : 'gray'"
						shape="circle" @click="handleClickStatistics(1)"
					>
						<view>
							<tui-icon name="oppose" :size="18" :color="statisticsSelect === 1 ? '#eb0909' : '#999999'"></tui-icon>
							<text style="margin-left: 10upx;">无用（{{ answer.statistics ? answer.statistics.split(':')[1] : '0' }}）</text>
						</view>
					</tui-button>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无查询结果~</tui-no-data>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getCustomerCategoryApi, getCustomerSelectAnswerApi, getCustomerAnswerStatisticsApi } from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
	name: 'ServiceCenter',
	data() {
		return {
			customerCategoryData: '',
			isShowAnswerPopup: false,
			questionSelect: {},
			answer: {},
			statisticsSelect: ''
		}
	},
	onLoad(options) {
		uni.showLoading({
			title: '加载中'
		})
		getCustomerCategoryApi()
			.then((res) => {
				uni.hideLoading()
				this.customerCategoryData = res.data
			})
			.catch((e) => {
				uni.hideLoading()
			})
	},

	methods: {
		handleLevelTwoCategory(obj) {
			this.questionSelect = obj
			this.answer = {}
			this.statisticsSelect = ''
			uni.showLoading({
				title: '加载中'
			})
			getCustomerSelectAnswerApi({ categoryId: this.questionSelect.id })
				.then((res) => {
					uni.hideLoading()
					this.answer = res.data || {}
					this.isShowAnswerPopup = true
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleClickStatistics(type) {
			getCustomerAnswerStatisticsApi({ feedbackId: this.answer.id, type })
				.then((result) => {
					this.statisticsSelect = type
					getCustomerSelectAnswerApi({ categoryId: this.questionSelect.id })
						.then((res) => {
							this.answer = res.data || {}
						})
				})
		}
	}
}
</script>

<style lang="less" scoped>
.service-center-container {
	position: relative;
	min-height: 100vh;
	padding-bottom: 140upx;
	box-sizing: border-box;
	background-color: #f5f5f5;
	word-break: break-all;

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

}
</style>
