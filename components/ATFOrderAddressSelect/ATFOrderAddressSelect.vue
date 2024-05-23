<template>
	<view class="order-address-select-container" :style="{ margin }">
		<view
			style="background: #ffffff;border-radius: 10rpx;padding: 30rpx;display: flex;align-items: center;font-size: 28rpx;color: #333;"
			@click="go(`/another-tf/another-serve/address/index?isSelect=1`)"
		>
			<tui-icon name="position" :size="66" unit="rpx" color="#333333" margin="0 20rpx 0 0"></tui-icon>
			<view v-if="data.receiveId" style="flex: 1;display: flex;flex-direction: column;">
				<view style="font-size: 30rpx;">
					<text>{{ data.receiveName }}</text>
					<text style="font-size: 24rpx;color: #999999;margin-left: 20rpx;">{{ data.receivePhone }}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>{{ data.receiveAdress }} {{ data.address }}</text>
				</view>
			</view>
			<view v-else style="flex: 1;">
				<text>你还没有收货地址哦，点击这里添加</text>
			</view>
			<tui-icon name="arrowright" :size="62" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
		</view>
	</view>
</template>

<script>

export default {
	name: 'ATFOrderAddressSelect',
	props: {
		margin: {
			type: String,
			default: ''
		},
		data: {
			type: Object,
			default: () => ({ receiveId: '' })
		}
	},
	data() {
		return {
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.order-address-select-container {}
</style>
