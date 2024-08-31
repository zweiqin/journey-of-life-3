<template>
	<!-- 所属活动 0-常规商品 1-拼团活动 2-秒杀活动 3-限时折扣活动 4-平台秒杀 5-平台折扣 6-定价捆绑 7-组合捆绑 8-场景营销 9-会员价 10-平台消费金活动 11-组合活动 -->
	<view class="activity-image-container" :style="{ fontSize, color, fontWeight: bold ? 'bold' : 'normal' }">
		<view v-if="type === 0">
			<!-- 常规商品 -->
		</view>
		<view v-else-if="type === 1" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 拼团icon -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="friendadd" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '拼团价' }}</text>
		</view>
		<view v-else-if="type === 2" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 秒杀活动 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="offline" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '秒杀价' }}</text>
		</view>
		<view v-else-if="type === 3" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 限时折扣活动，折扣价 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="label" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '限时折扣' }}</text>
		</view>
		<view v-else-if="type === 4" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 平台秒杀 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="offline" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '秒杀价' }}</text>
		</view>
		<view v-else-if="type === 5" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 平台折扣 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="label" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '折扣价' }}</text>
		</view>
		<view v-else-if="type === 6" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 定价捆绑 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="service" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '定价捆绑' }}</text>
		</view>
		<view v-else-if="type === 7" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 组合捆绑，组合销售？ -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="service" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '组合捆绑' }}</text>
		</view>
		<view v-else-if="type === 8" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 场景营销 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="service" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '节日折扣' }}</text>
		</view>
		<view v-else-if="type === 9" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 会员价 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="member" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '会员价' }}</text>
		</view>
		<view v-else-if="type === 10" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 平台消费金活动 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="service" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '消费金活动' }}</text>
		</view>
		<view v-else-if="type === 11" class="activity-wrapper" :style="{ backgroundColor }">
			<!-- 组合活动 -->
			<tui-icon
				v-if="showIcon" :size="iconSize" unit="rpx" :color="iconColor"
				name="service" margin="0 4rpx 0 0"
			></tui-icon>
			<text :style="{ fontStyle: italic ? 'italic' : 'normal' }">{{ text || '组合活动' }}</text>
		</view>
	</view>
</template>

<script>

export default {
	name: 'ATFActivityImage',
	props: {
		type: {
			type: Number,
			require: true
		},
		showIcon: {
			type: Boolean,
			default: false
		},
		backgroundColor: {
			type: String,
			default: '#333333'
		},
		text: {
			type: String,
			default: ''
		},
		fontSize: {
			type: String,
			default: '24rpx'
		},
		color: {
			type: String,
			default: '#cfb587'
		},
		bold: {
			type: Boolean,
			default: false
		},
		italic: {
			type: Boolean,
			default: false
		},
		iconSize: {
			type: Number,
			default: 46
		},
		iconColor: {
			type: String,
			default: '#dbc296'
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
	width: fit-content;
	box-sizing: border-box;

	.activity-wrapper {
		display: flex;
		align-items: center;
		// width: fit-content;
		margin-right: 10rpx;
		padding: 4rpx 8rpx;
		border-radius: 6rpx;
	}
}
</style>
