<template>
	<view class="activity-image-container">
		<image v-if="type === 1" class="iconImg" src="../../static/images/new-business/shop/groupBuyIcon.png" alt="拼团icon">
		</image>
		<image v-else-if="type === 2" class="iconImg" src="../../static/images/new-business/shop/spikeIcon.png" alt="秒杀活动">
		</image>
		<image
			v-else-if="type === 3" class="iconImg discountIcon"
			src="../../static/images/new-business/shop/xianshizhekou.png" alt="限时折扣活动"
		></image>
		<image v-else-if="type === 4" class="iconImg" src="../../static/images/new-business/shop/spikeIcon.png" alt="平台秒杀">
		</image>
		<image
			v-else-if="type === 5" class="iconImg" src="../../static/images/new-business/shop/discountListIcon.png"
			alt="平台折扣"
		></image>
		<image v-else-if="type === 8" class="iconImg" src="../../static/images/new-business/shop/jierizhekou.png" alt="场景营销">
		</image>
		<image
			v-else-if="type === 9" class="iconImg" src="../../static/images/new-business/shop/memberCenterIcon.png"
			alt="会员价"
		></image>
	</view>
</template>

<script>

export default {
	name: 'ATFActivityImage',
	props: {
		type: {
			type: Number,
			require: true
		}
	},
	data() {
		return {
		}
	},
	created() {
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.activity-image-container {
	display: inline-block;
	width: fit-content;
	line-height: 1;
	box-sizing: border-box;

	.iconImg {
		width: 58rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}

	.discountIcon {
		width: 100rpx;
	}
}
</style>
