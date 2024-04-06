<template>
	<view class="brand-header-container" v-if="brand">
		<view class="op-container" :class="{ fixed: scrollTop > 200 }">
			<tui-icon class="back" @click="handleBack" name="arrowleft" color="#fff"></tui-icon>
			<view class="search-container">
				<image class="search-icon" src="../../../static/images/new-brand/index/search-icon.png" mode="" />
				<input type="text" @confirm="$emit('search', searchKey)" v-model="searchKey" placeholder="请输入搜索内容" style="flex: 1"
					confirm-type="search" />
			</view>
			<view class="home" @click="handleToIndex">
				<tui-icon
					name="home" :size="40" unit="rpx"
					color="#ffffff" margin="0"
				></tui-icon>
			</view>

			<view class="follow-wrapper">
				<tui-icon
					name="service" :size="40" unit="rpx"
					color="#ffffff" margin="0" @click="handleFollowStore"
				></tui-icon>
			</view>
		</view>

		<view class="brand-info-detail">
			<image :src="brand.picUrl" mode="" class="logo" />

			<view class="info">
				<view class="brand-name">{{ brand.name }}</view>
				<view class="tags">
					<view class="tag">
						<view class="img-wrapper">
							<tui-icon
								name="people-fill" :size="26" unit="rpx"
								color="#ffffff" margin="0"
							></tui-icon>
						</view>
						<text style="background-color: #fff;">实名认证</text>
					</view>

					<view class="tag">
						<view class="img-wrapper">
							<tui-icon
								name="member-fill" :size="26" unit="rpx"
								color="#ffffff" margin="0"
							></tui-icon>
						</view>
						<text style="background-color: #fff;">品质保证</text>
					</view>
				</view>
			</view>

			<view class="numbers">
				<text>{{ brand.collectVolume || 0 }}人关注</text>
				<text>{{ brand.clickVolume || 0 }}人点击</text>
			</view>
		</view>

		<image class="brand-bg" :src="brand.picUrl" mode="" />
	</view>
</template>

<script>
import { collectionApi } from '../../../api/goods'
import { getUserId } from '../../../utils'
export default {
	props: {
		brand: {
			type: Object,
			required: true,
		},

		scrollTop: {
			type: Number,
			default: 0,
		},
	},

	data() {
		return {
			searchKey: '',
		}
	},

	watch: {
		searchKey(value) {
			if (!value) {
				this.$emit('search', '')
			}
		},
	},

	methods: {
		handleBack() {
			uni.navigateTo({
				url: '/stuff/brand-materials/brand-materials',
			})
		},

		handleToIndex() {
			uni.navigateTo({
				url: '/pages/stuff/stuff',
			})
		},

		// 点击关注
		async handleFollowStore() {
			try {
				const { data } = await collectionApi({
					userId: getUserId(
						'/stuff/brand-detail/brand-detail?brandId=' + this.brand.id
					),
					type: 2,
					valueId: this.brand.id,
				})

				uni.showToast({
					title: data.type === 'add' ? '关注成功' : '取消关注成功',
					duration: 2000,
				})
			} catch (err) {
				uni.showToast({
					title: '操作失败',
					duration: 2000,
					icon: 'none',
				})
			}
		},
	},
}
</script>

<style lang="less" scoped>
.brand-header-container {
	position: relative;

	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(20, 16, 0, 0.6);
	}

	.op-container {
		padding: 0 20upx 0 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		height: 120upx;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		box-sizing: border-box;

		&.fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #565656a0;
		}

		.back {
			position: relative;
			z-index: 10000;
		}

		.home {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 72upx;
			height: 72upx;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.2);
			border: 1px solid rgba(255, 255, 255, 0.2);

			image {
				width: 40upx;
				height: 40upx;
			}
		}

		.follow-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 72upx;
			height: 72upx;
			border-radius: 50%;
			border: 1px solid rgba(255, 255, 255, 0.2);
			background: #ffc117;
			margin-left: 24upx;

			.follow-icon {
				width: 40upx;
				height: 40upx;
			}
		}

		.search-container {
			display: flex;
			align-items: center;
			flex: 1;
			height: 72upx;
			border-radius: 100px;
			background: rgba(245, 245, 244, 0.8);
			padding: 20upx 24upx;
			box-sizing: border-box;
			margin: 0 32upx;

			.search-icon {
				width: 32upx;
				height: 32upx;
				padding-right: 16upx;
				margin-right: 16upx;
				border-right: 1upx solid #8f8d85;
			}

			input {
				color: #8f8d85;
				font-size: 28upx;
			}
		}
	}

	.brand-info-detail {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		// background-color: aqua;
		// height: 100px;
		z-index: 12;
		padding: 20upx;
		box-sizing: border-box;

		.logo {
			position: relative;
			top: 20px;
			width: 160upx;
			height: 160upx;
			border-radius: 16upx;
			border: 2upx solid #f6f6f5;
			margin-right: 16upx;
			flex-shrink: 0;
		}

		.info {
			flex: 1;
			margin-top: 34upx;

			.brand-name {
				font-size: 34upx;
				color: #fff;
				font-weight: bold;
				text-align: left;
				margin-bottom: 22upx;
				width: 380upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.tags {
				display: flex;
				align-items: center;
				// margin: 14upx 0 24upx 0;

				.tag {
					display: flex;
					align-items: center;
					box-sizing: border-box;

					.img-wrapper {
						text-align: center;
						line-height: 40upx;
						width: 40upx;
						height: 40upx;
						border-radius: 8upx 0 0 8upx;
						overflow: hidden;
					}

					.icon {
						width: 24upx;
						height: 24upx;
					}

					text {
						height: 40upx;
						line-height: 38upx;
						font-size: 22upx;
						box-sizing: border-box;
						padding: 0 6upx;
						border-radius: 0 8upx 8upx 0;
						overflow: hidden;
						// background-color: #fff;
					}

					&:nth-child(1) {
						margin-right: 9upx;

						.img-wrapper {
							background-color: #ffc117;
						}

						text {
							border: 2upx solid #ffc117;
							color: #ffc117;
						}
					}

					&:nth-child(2) {
						.img-wrapper {
							background-color: #81e19e;
						}

						text {
							border: 2upx solid #81e19e;
							color: #81e19e;
						}
					}
				}
			}
		}

		.numbers {
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			text {
				position: relative;
				font-size: 24upx;
				color: #fff;

				&:nth-child(1) {
					padding-bottom: 12upx;
					margin-bottom: 12upx;

					&::after {
						content: '';
						display: block;
						position: absolute;
						width: 46upx;
						height: 1upx;
						background-color: #dfdfdf;
						right: 0;
						bottom: 0;
					}
				}
			}
		}
	}

	.brand-bg {
		width: 100%;
		height: 280upx;
		object-fit: cover;
		filter: blur(4px);
	}
}
</style>
