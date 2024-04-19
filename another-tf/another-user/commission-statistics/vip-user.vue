<template>
	<view class="vip-user-container">
		<JHeader title="会员列表" width="50" height="50"></JHeader>

		<view style="display: flex;padding: 0 40rpx;">
			<tui-dropdown-list
				:show="typeDropdownShow" :top="55" background-color="#474747"
				@close="typeDropdownShow = false"
			>
				<template #selectionbox>
					<view style="height: auto;color: #080808;" @click="typeDropdownShow = !typeDropdownShow">
						<text>类型∨</text>
						<text style="margin-left: 10upx;;font-size: 26upx;">
							<text v-if="isToday">今日会员</text>
							<text v-else>累计会员</text>
						</text>
					</view>
				</template>
				<template #dropdownbox>
					<view style="width: fit-content;box-sizing: border-box;">
						<tui-list-view
							color="#777" margin-top="2rpx"
							style="width: fit-content;min-width: 150upx;max-height: 28vh;overflow-y: auto;"
						>
							<tui-list-cell
								padding="20rpx 0" color="#ffffff" background-color="transparent"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="(typeDropdownShow = false) || (isToday = 1) && getCommanderVipUserList()"
							>
								今日会员
							</tui-list-cell>
							<tui-list-cell
								padding="20rpx 0" color="#ffffff" background-color="transparent"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="(typeDropdownShow = false) || (isToday = 0) || getCommanderVipUserList()"
							>
								累计会员
							</tui-list-cell>
						</tui-list-view>
					</view>
				</template>
			</tui-dropdown-list>
		</view>
		<view class="search-btn" style="display: flex;align-items: center;padding: 20rpx 40rpx 12rpx;">
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
			<view v-if="fansShowList.length" class="list-container">
				<FansPane v-for="item in fansShowList" :key="item.id" :fans-info="item" @view="handleViewFans"></FansPane>
			</view>
			<view style="padding-bottom: 45upx;">
				<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
				<view v-if="!isLoading && !fansShowList.length">
					<tui-no-data :fixed="false" style="padding-top: 60upx;">暂无数据...</tui-no-data>
				</view>
			</view>
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
			typeDropdownShow: false,
			isToday: '',
			phoneQuery: '',
			userNameQuery: '',
			fansDataList: [],
			fansShowList: [],
			isLoading: true,
			subFansListVisible: false,
			subFansInfo: {
				phone: '',
				paramLists: []
			}
		}
	},
	onLoad(options) {
		this.isToday = Number(options.today) || 0
		this.getCommanderVipUserList()
	},
	methods: {
		getCommanderVipUserList() {
			uni.showLoading()
			this.isLoading = true
			getFansListApi({
				today: this.isToday
			}).then((res) => {
				this.fansDataList = res.data.paramLists
				this.fansShowList = this.fansDataList
				uni.hideLoading()
				this.isLoading = false
			})
				.catch((e) => {
					uni.hideLoading()
					this.isLoading = false
					this.$showToast('会员列表获取失败')
				})
				.finally((e) => {
					uni.stopPullDownRefresh()
				})
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

	/deep/ .j-header-container {
		padding: 18rpx 0 16rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: 58upx;
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
}
</style>
