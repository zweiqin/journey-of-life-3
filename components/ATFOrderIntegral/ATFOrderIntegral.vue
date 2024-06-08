<template>
	<!-- 积分支付 -->
	<view class="shop-skus-container" :style="{ margin }">
		<view v-if="integralNum" style="margin: 20rpx 0 0;">
			<view
				style="padding: 28rpx 20rpx;display: flex;justify-content: space-between;align-items: center;font-size: 26rpx;background-color: #ffffff;"
			>
				<view>可用 {{ integralNum }} 积分抵扣 {{ (integralNum * integralRatio).toFixed(2) }} 元</view>
				<view>
					<checkbox-group style="width: 50rpx" @change="$emit('change')">
						<checkbox style="transform:scale(0.7);" color="#C5AA7B" value="1" :checked="selectIntegral" />
					</checkbox-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: 'ATFShopSkus',
	props: {
		margin: {
			type: String,
			default: '0'
		},
		integralNum: {
			type: Number,
			default: 0
		},
		integralRatio: {
			type: [Number, String],
			default: ''
		},
		selectIntegral: {
			type: Boolean,
			default: true
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
.shop-skus-container {}
</style>
