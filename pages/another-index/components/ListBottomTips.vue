<template>
	<view class="bottom_tips_content">
		<view class="line_inner_row" :class="[ loading ? 'is_loading' : '' ]">
			<view class="text_box">
				<view
					v-for="(item, index) in type === 0 ? onBottomText : loadingText" :key="index" class="text_item"
					:class="[loading ? 'text_loading' : '', `delay-${index % 10}`]"
				>
					{{ item }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ListBottomTips',
	props: {
		loadingText: {
			type: String,
			default: '加载中...'
		},
		onBottomText: {
			type: String,
			default: '已经到达底部了~'
		},
		type: {
			type: Number,
			default: 0 // 0底部1加载
		},
		loading: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {}
	},
	methods: {}
}
</script>

<style
    lang="scss"
    scoped
>
.bottom_tips_content {
	padding: 20rpx 30rpx;
	box-sizing: border-box;

	.line_inner_row {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-weight: bold;

		.text_box {
			display: flex;

			.text_item {
				animation-delay: calc(.1s * var(--jumpTime))
			}

			.delay-0 {
				animation-delay: calc(0s)
			}

			.delay-1 {
				animation-delay: calc(.1s)
			}

			.delay-2 {
				animation-delay: calc(.2s)
			}

			.delay-3 {
				animation-delay: calc(.3s)
			}

			.delay-4 {
				animation-delay: calc(.4s)
			}

			.delay-5 {
				animation-delay: calc(.5s)
			}

			.delay-6 {
				animation-delay: calc(.6s)
			}

			.delay-7 {
				animation-delay: calc(.7s)
			}

			.delay-8 {
				animation-delay: calc(.8s)
			}

			.delay-9 {
				animation-delay: calc(.9s)
			}

		}

		&:before,
		&:after {
			flex-shrink: 0;
			flex-grow: 0;
			content: '';
			width: 20%;
			height: 5rpx;
			border-radius: 8rpx;
			background-color: #898989;
		}
	}

	.is_loading {
		animation: breathe 1s ease-in-out 0s infinite alternate;
	}

	.text_loading {
		animation: jump 2s ease-in-out infinite;
	}
}

@keyframes breathe {
	from {
		opacity: 1;
	}

	to {
		opacity: .5;
	}
}

@keyframes jump {

	30% {
		transform: translateY(-12rpx)
	}

	60% {
		transform: translateY(12rpx)
	}

	0%,
	100% {
		transform: translateY(0rpx)
	}
}
</style>
