<template>
	<view class="menu-item" @click="$emit('click', data)">
		<image class="menu-icon" :src="data.picUrl ? common.seamingImgUrl(data.picUrl) : data.iconUrl"></image>
		<text>{{ data.storeName }}</text>
		<tui-badge
			v-if="data.tag && data.tag === 'phone-bill'"
			type="danger" absolute :scale-ratio="0.9" translate-x="26%"
			top="-12rpx"
		>
			<view style="padding: 2rpx;">
				充值9折
			</view>
		</tui-badge>
		<tui-badge
			v-else-if="data.tag && data.tag === 'sheng'"
			type="danger" absolute translate-x="22%"
			top="-12rpx"
		>
			<view>
				省
			</view>
		</tui-badge>
		<tui-badge
			v-else-if="data.tag && data.tag === 'fix'"
			type="danger" absolute translate-x="12%"
			top="-12rpx"
		>
			<view>
				火
			</view>
		</tui-badge>
	</view>
	</view>
</template>

<script>
export default {
	name: 'NavBarItem',
	props: {
		data: {
			type: Object,
			required: true
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
.menu-item {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 20%;
	font-size: 28upx;
	color: #222229;

	.menu-icon {
		width: 80upx;
		height: 80upx;
		margin-bottom: 15upx;
	}

	.phone-bil {
		position: absolute;
		width: 80upx;
		height: 28upx;
		top: -4upx;
		right: -26upx;
	}

	.fix {
		position: absolute;
		width: 38upx;
		height: 38upx;
		top: -14upx;
		right: 14upx;
	}

	.sheng {
		position: absolute;
		width: 42upx;
		height: 42upx;
		top: -14upx;
		right: -14upx;
	}
}
</style>
