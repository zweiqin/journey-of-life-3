<template>
	<view class="customer-service-container" style="height: 100%;padding: 20rpx;box-sizing: border-box;">
		<scroll-view scroll-y style="height: 100%;">
			<view v-if="data && data.length">
				<view
					v-for="(item, index) in data" :key="index"
					style="display: flex;justify-content: space-between;align-items: center;margin-top: 30rpx;"
				>
					<view style="flex: 1;display: flex;justify-content: space-between;align-items: center;">
						<JAvatar :src="common.seamingImgUrl(item.headImg)" :size="80" style="margin: 0 24rpx 0 0;line-height: 1;">
						</JAvatar>
						<view style="flex: 1;display: flex;justify-content: space-between;">
							<view>{{ item.name }}</view>
							<view>
								<text v-if="item.state">在线</text>
								<!-- <text v-else>已下线</text> -->
							</view>
						</view>
					</view>
					<view style="margin-left: 46rpx;">
						<tui-button
							type="warning" width="120rpx" height="50rpx" shape="circle"
							@click="handleFlyToService(item.openKfId)"
						>
							选择
						</tui-button>
					</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无客服</tui-no-data>
			</view>
		</scroll-view>
	</view>
</template>

<script>

export default {
	name: 'ATFCustomerService',
	props: {
		shopId: {
			type: [Number, String],
			default: ''
		},
		data: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
		}
	},
	created() {
	},
	methods: {
		handleFlyToService(openKfId) {
			this.$store.dispatch('app/flyToServiceAction', {
				shopId: '', // this.shopId
				openKfId
			})
		}
	}
}
</script>

<style lang="less" scoped>
.customer-service-container {}
</style>
