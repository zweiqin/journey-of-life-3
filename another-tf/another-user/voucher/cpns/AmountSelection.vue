<template>
	<view class="container">
		<p>{{ '代金券' + title[Number(isGift)] }}</p>
		<view class="AmountSelection">
			<view
				v-for="(item, index) in amountData" :key="index" class="selectionItem"
				@click="active = index; $emit('getCustomValue', index)"
			>
				<image v-show="active == index" class="selectIcon" src="../../../../static/images/user/xuanzhong.png"></image>

				<!-- <tui-input type="number" min="0" max="20000" class="numbers" @input="$emit('getCustomValue', index)" v-if="index == amountData.length-1" v-model="amountData[index].value"></tui-input> -->
				<view
					v-if="index == amountData.length - 1" class="numbers"
					@click="(isShowGiveCustomDialog = true) && (customIndex = index)"
				>
					{{ amountData[index].value }}
				</view>
				<p v-else class="numbers">{{ item.value }}</p>

				<p class="title">{{ index != amountData.length - 1 ? title2[Number(isGift)] + item.price : '自定义金额' }}</p>
			</view>
		</view>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowGiveCustomDialog" :title="`自定义${title[Number(isGift)]}数量`" @click="handleClickGiveCustomDialog"
		>
			<template #content>
				<tui-input
					:label="`${title[Number(isGift)]}数量`" type="number" :placeholder="`请输入${title[Number(isGift)]}数量`"
					@input="(e) => $emit('getCustomValue', customIndex, e)"
				>
					<template #right>
						<text>代金券</text>
					</template>
				</tui-input>
			</template>
		</tui-dialog>

	</view>
</template>

<script>
export default {
	name: 'AmountSelection',
	props: {
		amountData: {
			type: Array,
			default: []
		},
		isGift: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			active: 0,
			title: ['充值', '转赠'],
			title2: ['售价', '价值'],
			isShowGiveCustomDialog: false,
			customIndex: ''
		}
	},
	methods: {
		handleClickGiveCustomDialog(e) {
			if (e.index === 0) {
			} else if (e.index === 1) {
			}
			this.isShowGiveCustomDialog = false
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .tui-input__wrap {
	padding: 0 !important;
	background: none !important;
}

/deep/ .tui-input__self {
	padding: 0 !important;
	text-align: center !important;
	min-width: 40rpx !important;
	font-size: 52rpx !important;
	font-weight: 500 !important;
	line-height: 62rpx !important;
	font-feature-settings: "kern" on;
	color: #FF380C !important;
}

.container {
	margin-top: 24rpx;
	box-sizing: border-box;
	padding: 21rpx 30rpx 32rpx 30rpx;
	width: 690rpx;
	border-radius: 20rpx;
	background: #FFFFFF;

	>p {
		font-size: 32rpx;
		font-weight: 600;
		color: #222229;
	}

	.AmountSelection {
		margin-top: 23rpx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;

		.selectionItem {
			position: relative;
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
			background: #ff390c0d;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.selectIcon {
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				top: -10rpx;
				right: 0;
			}

			.numbers {
				display: block;
				text-align: center;
				min-width: 100%;
				height: 73rpx;
				font-size: 52rpx;
				font-weight: 500;
				line-height: 62rpx;
				font-feature-settings: "kern" on;
				color: #FF380C;
			}

			.title {
				/* margin-top: 18rpx; */
				font-size: 28rpx;
				font-weight: normal;
				line-height: 42rpx;
				font-feature-settings: "kern" on;
				color: #9E9E9E;
			}
		}
	}
}
</style>
