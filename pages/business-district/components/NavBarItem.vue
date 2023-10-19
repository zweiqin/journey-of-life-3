<template>
	<view class="menu-item" @click="$emit('click', data)">
		<image class="menu-icon" :src="data.labelUrl || data.iconUrl"></image>
		<text>{{ data.labelName }}</text>
		<img v-if="data.tag && data.tag === 'phone-bill'" class="phone-bil" :src="data.tagUrl" alt="">
		<img v-else-if="data.tag && data.tag === 'fix'" class="fix" :src="data.tagUrl" alt="">
		<img v-else-if="data.tag && data.tag === 'sheng'" class="sheng" :src="data.tagUrl" alt="">
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
