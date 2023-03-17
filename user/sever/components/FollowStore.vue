<template>
	<view class="foloow-container">
		<view class="follow-store-item" @click="go('/stuff/brand-detail/brand-detail?brandId=' + item.valueId)"
			v-for="item in data" :key="item.id">
			<image class="store-logo" :src="item.picUrl" mode="" />
			<view class="detail-info">
				<view class="wrapper">
					<view class="store-name">{{ item.name }}</view>
					<button @click.stop="handleUnfollow(item)" class="uni-btn">
						取消关注
					</button>
				</view>
				<view class="follow-time">关注时间：{{ item.subscribeTime }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { collectionApi } from '../../../api/goods'
import { getUserId } from '../../../utils'

export default {
	props: {
		data: {
			type: Array,
			required: true,
		},
	},

	methods: {
		handleUnfollow(item) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '是否取消对' + item.name + '的关注',
				success: function (res) {
					if (res.confirm) {
						collectionApi({
							userId: getUserId(),
							type: 2,
							valueId: item.valueId,
						}).then(() => {
							_this.$showToast('取消关注成功', 'success')
							_this.$emit('delete')
						})
					}
				},
			})
		},
	},
}
</script>

<style lang="less" scoped>
.foloow-container {
	width: 100%;

	.follow-store-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		margin: 20upx;
		padding: 32upx;
		border-bottom: 1upx solid #ececec;
		border-radius: 24upx;
		background: #FFFFFF;

		&:last-child {
			border-bottom: none;
		}

		.store-logo {
			width: 160upx;
			height: 160upx;
			border-radius: 16upx;
			flex-shrink: 0;
			margin-right: 16upx;
		}

		.detail-info {
			flex: 1;
		}

		.wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.store-name {
				width: 340upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 32upx;
				font-weight: 500;
			}

			.uni-btn {
				width: 120upx;
				height: 48upx;
				text-align: center;
				line-height: 48upx;
				border: 1upx solid #8F8D85;
				border-radius: 10upx;
				font-size: 24upx;
				color: #8F8D85;
			}
		}

		.follow-time {
			color: #3d3d3d;
			font-size: 28upx;
			margin-top: 30upx;
		}
	}
}
</style>
