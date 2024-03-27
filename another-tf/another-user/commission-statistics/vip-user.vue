<template>
	<view class="vip-user-container">
		<TuanPageHead :scroll-top="scrollTop" fixed title="会员列表" bacokground="#fff">
			<tui-icon slot="left" name="arrowleft" color="#3d3d3d" @click="handleBack"></tui-icon>
		</TuanPageHead>

		<view class="search-btn" style="display: flex;align-items: center;padding: 0 40rpx 12rpx;">
			<text style="font-weight: bold;font-size: 34rpx;">手机号</text>
			<view style="flex: 1;margin-left: 16rpx;">
				<tui-input
					v-model="phoneQuery" placeholder="根据手机号筛选" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
					background-color="transparent"
				>
					<template #right>
						<tui-button type="warning" width="120rpx" height="50rpx" shape="circle" @click="handleFansListFilter">
							筛选
						</tui-button>
					</template>
				</tui-input>
			</view>
		</view>
		<view class="search-btn" style="display: flex;align-items: center;padding: 0 40rpx 12rpx;">
			<text style="font-weight: bold;font-size: 34rpx;">用户名</text>
			<view style="flex: 1;margin-left: 16rpx;">
				<tui-input
					v-model="userNameQuery" placeholder="根据用户名筛选" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
					background-color="transparent"
				>
					<template #right>
						<tui-button type="warning" width="120rpx" height="50rpx" shape="circle" @click="handleFansListFilter">
							筛选
						</tui-button>
					</template>
				</tui-input>
			</view>
		</view>

		<view class="list">
			<LoadingMore v-show="loading !== 'none'" :status="loading"></LoadingMore>
			<view v-if="fansShowList.length" class="list-container">
				<FansPane v-for="item in fansShowList" :key="item.id" :fans-info="item" @view="handleViewFans"></FansPane>
			</view>
			<view v-if="!fansShowList.length && loading != 'loading'" class="no-data"> 暂无数据... </view>
		</view>

		<!-- 查看会员列表 -->
		<tui-bottom-popup
			:z-index="1002" :mask-z-index="1001" :show="subFansListVisible"
			@close="subFansListVisible = false"
		>
			<view class="fans-list">
				<view class="fans-header">
					<view class="fans-title"><text class="user-name">{{ subFansInfo.phone }}</text> 的粉丝列表</view>
					<tui-icon
						class="close-icon" :size="20" name="close" color="#ccc"
						@click="subFansListVisible = false"
					></tui-icon>
				</view>
				<FansPane v-for="item in subFansInfo.paramLists" :key="item.id" :fans-info="item"></FansPane>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getFansListApi } from '../../../api/anotherTFInterface'
import FansPane from './components/FansPane.vue'
export default {
	name: 'VipUser',
	components: {
		FansPane
	},
	data() {
		return {
			phoneQuery: '',
			userNameQuery: '',
			scrollTop: 0,
			fansDataList: [],
			fansShowList: [],
			loading: '',
			subFansListVisible: false,
			subFansInfo: {
				paramLists: []
			}
		}
	},
	onLoad(params) {
		this.getCommanderVipUserList(params.date === 'now')
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},

		async getCommanderVipUserList(isToday) {
			try {
				this.loading = 'loading'
				const res = await getFansListApi({
					today: isToday ? 1 : 0
				})
				this.fansDataList = res.data.paramLists
				this.fansShowList = this.fansDataList
			} catch (error) {
				this.ttoast({
					type: 'fail',
					title: '会员列表获取失败',
					content: error
				})
			} finally {
				this.loading = 'more'
				uni.stopPullDownRefresh()
			}
		},
		// 查看粉丝列表
		handleViewFans(currentFansInfo) {
			const { paramLists } = currentFansInfo
			if (paramLists && paramLists.length) {
				this.subFansInfo = currentFansInfo
				this.subFansListVisible = true
			} else {
				this.$showToast('该用户暂无粉丝')
			}
		},

		handleFansListFilter() {
			this.fansShowList = this.fansDataList.filter((item) => {
				if (item.phone.includes(this.phoneQuery) && item.userName.includes(this.userNameQuery)) {
					return true
				}
				if (item.paramLists && item.paramLists.length) {
					return item.paramLists.some((section) => section.phone.includes(this.phoneQuery) && section.userName.includes(this.userNameQuery))
				}
				return false
			})
		}
	},

	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},

	onPullDownRefresh() {
		this.getCommanderVipUserList()
	}
}
</script>

<style lang="less" scoped>
.vip-user-container {
	min-height: 100vh;
	padding: 0 0 40rpx;
	background-color: #f6f6f5;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	.list {
		.list-container {
			display: flex;
			align-items: center;
			flex-direction: column;

			.item {
				margin-top: 30rpx;
				padding: 20rpx;
				box-sizing: border-box;
				width: 700rpx;
				background-color: #fff;
				border-radius: 10rpx;
				display: flex;
				align-items: flex-start;

				.avatar-wrapper {
					position: relative;
					border-radius: 10rpx;
					overflow: hidden;

					.mask {
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						width: 100%;
						height: 40rpx;
						background-color: rgba(0, 0, 0, 0.5);
						font-size: 24rpx;
						color: #fff;
						text-align: center;
						line-height: 40rpx;
					}
				}

				.avatar {
					flex-shrink: 0;
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;
					display: block;
				}

				.info {
					flex: 1;
					margin-left: 20rpx;

					.name {
						display: flex;
						align-items: center;
						justify-content: space-between;

						font-size: 28rpx;
						font-weight: 500;

						.add-time {
							font-size: 24rpx;
						}
					}

					.phone {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 24rpx;
						margin-top: 16rpx;

						.uni-btn {
							display: flex;
							align-items: center;
							color: #ccc;
							font-size: 24rpx;

							.icon {
								margin-right: 10rpx !important;
							}
						}
					}
				}
			}
		}
	}
}

.no-data {
	height: 600rpx;
	width: 100vw;
	text-align: center;
	line-height: 600rpx;
	color: #929292;
	font-size: 28rpx;
	letter-spacing: 1em;
}

.fans-list {
	background-color: #f4f4f4;
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 800rpx;
	overflow: auto;

	.fans-header {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		position: relative;
		height: 90rpx;
		margin-bottom: -20rpx;

		.user-name {
			color: orange;
		}

		.close-icon {
			position: absolute;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>
