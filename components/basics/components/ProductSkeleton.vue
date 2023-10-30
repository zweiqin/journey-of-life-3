<template>
	<view v-if="isFirst">
		<Skeleton :loading="isFirst && loading" :animation="true" bg-color="#FFF" />
		<view class="skeleton_content u-skeleton">
			<view class="empty_row"></view>
			<view class="product_box">
				<view v-for="item in 40" class="product_item ">
					<view class="image u-skeleton-fillet"></view>
					<view class="text_box ">
						<view v-for="item in 2" class="text u-skeleton-fillet"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Skeleton from '@/components/Skeleton'
export default {
	name: 'ProductSkeleton',
	components: { Skeleton },
	props: {
		isFirst: {
			type: Boolean,
			default: () => true
		},
		loading: {
			type: Boolean,
			default: () => true
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
.skeleton_content {
	width: 100%;
	height: calc(100vh - 50px);
	padding: 30rpx 30rpx;
	box-sizing: border-box;

	.product_box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.product_item {
			margin: 10rpx 0;
			width: 49%;
			height: 500rpx;

			//padding: 30rpx 30rpx;
			//box-sizing: border-box;
			.image {
				width: 100%;
				height: 70%;
			}

			.text_box {
				padding: 0 20rpx;

				.text {
					margin-top: 15rpx;
					width: 100%;
					height: 60rpx;
				}
			}
		}
	}
}
</style>
