<template>
	<view class="memberCenter">
		<JHeader title="会员签到" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="avatarTop">
			<view class="avatarBox">
				<image :src="common.seamingImgUrl($store.getters.userInfo.headImage)"></image>
			</view>
			<view class="nameBox">
				<view class="name fs36">{{ $store.getters.userInfo.name }}</view>
				<view class="level">
					<image :src="common.seamingImgUrl(levelInfo.memberLevelIcon)"></image>
				</view>
			</view>
		</view>
		<view class="signInfoBox">
			<view class="accumulate flex-items flex-sp-between">
				<view class="accumulateTit">
					<label class="fs6">已累计签到</label>
					<text class="fs6">{{ historyTotal }}天</text>
				</view>
				<view class="toSignBtn fs24" :class="{ active: currentData === upDate }" @click="signInFn">
					{{ currentData === upDate ? '已签到' : '立即签到' }}
				</view>
			</view>
			<view class="points">
				<label>
					{{ currentData === upDate ? '明' : '今' }}日签到可获得<text>
						{{ recordList.length === 0 ? '10积分' : '' }}
					</text>
				</label>
				<text v-if="recordList.length === 1">20积分</text>
				<text v-if="recordList.length === 2">30积分</text>
				<text v-if="recordList.length === 3">40积分</text>
				<text v-if="recordList.length === 4">50积分</text>
				<text v-if="recordList.length === 5">60积分</text>
				<text v-if="recordList.length === 6">100积分</text>
			</view>
			<view class="signDateList">
				<view v-for="(item, index) in recordList" :key="item.signinId" class="signItem">
					<view class="topIcon">
						<tui-icon name="member-fill" :size="60" unit="upx" color="#fdbc3d"></tui-icon>
					</view>
					<view class="dateInfo">{{ index + 1 }}天</view>
				</view>
				<view v-for="index in noSign" :key="index" class="signItem">
					<view class="topIcon">
						<tui-icon name="circle-selected" :size="60" unit="upx" color="#b0b0b0"></tui-icon>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view class="dateInfo">{{ recordList.length + index + 1 }}天</view>
					<!-- #endif -->

					<!-- #ifdef H5 -->
					<view class="dateInfo">{{ recordList.length + index }}天</view>
					<!-- <view class="dateInfo">{{index+1}}天</view> -->
					<!-- #endif -->
				</view>
			</view>
			<view class="fs24 font-color-71521B">连续签到可获得超额奖励哦～</view>
		</view>
		<view class="signInList">
			<view class="signTit fs30 font-color-333">签到明细</view>
			<view v-if="historyList && historyList.length" class="signInBox">
				<view v-for="item in historyList" :key="item.signinId" class="signItem flex-items flex-sp-between">
					<view class="itemLeft flex-items">
						<view class="leftInfo">
							<label class="fs28 font-color-333">签到</label>
							<view class="fs24 font-color-999">{{ item.createTime }}</view>
						</view>
					</view>
					<view class="rightBtn">+{{ item.growth }}</view>
				</view>
			</view>
			<view style="padding-bottom: 45upx;">
				<LoadingMore
					:status="!isEmpty && !historyList.length
						? 'loading' : !isEmpty && historyList.length && (historyList.length >= historyTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无签到记录~</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getMemberByMemberLevelIdApi, getSelectSigninRecordListApi, getSelectSigninHistoryApi, updateMemberSignInApi } from '../../../api/anotherTFInterface'

export default {
	name: 'MemberSign',
	data() {
		return {
			levelInfo: {},
			recordList: {},
			noSign: 7,
			currentData: '',
			upDate: '',
			isEmpty: false,
			historyList: [],
			historyTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		this.getDate()
		this.$store.dispatch('auth/refrshUserInfoAction', () => {
			getMemberByMemberLevelIdApi({ memberLevelId: this.$store.getters.userInfo.memberLevelId })
				.then((res) => {
					this.levelInfo = res.data
				})
		})
		this.getSelectSigninRecordList()
		this.getSelectSigninHistory()
	},
	methods: {
		getDate() {
			const year = new Date().getFullYear()
			const month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
			const date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
			this.currentData = year + '-' + month + '-' + date
		},
		getSelectSigninRecordList() {
			this.noSign = 7
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			getSelectSigninRecordListApi({}).then((res) => {
				uni.hideLoading()
				this.recordList = res.data
				this.noSign = this.noSign - this.recordList.length
				const newDate = this.recordList[this.recordList.length - 1]
				this.upDate = newDate.createTime.slice(0, 10)
			})
		},
		getSelectSigninHistory(isLoadmore) {
			uni.showLoading()
			getSelectSigninHistoryApi(this.queryInfo).then((res) => {
				this.historyTotal = res.data.total
				if (isLoadmore) {
					this.historyList.push(...res.data.list)
				} else {
					this.historyList = res.data.list
				}
				this.isEmpty = this.historyList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 签到
		signInFn() {
			if (this.upDate !== this.currentData) {
				uni.showLoading({
					mask: true,
					title: '请稍等...'
				})
				updateMemberSignInApi({}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '签到成功！',
						icon: 'none'
					})
					this.getSelectSigninRecordList()
					this.getSelectSigninHistory()
				})
			}
		}
	},
	onReachBottom() {
		if (this.historyList.length < this.historyTotal) {
			++this.queryInfo.page
			this.getSelectSigninHistory(true)
		}
	}
}
</script>

<style lang="less" scoped>
.memberCenter {
	min-height: 100vh;
	padding: 0 20rpx;
	background: #F8F8F8;
	background-size: contain;
	box-sizing: border-box;

	.avatarTop {
		text-align: center;
		margin-top: 30rpx;
	}

	.avatarBox {
		margin-bottom: 20rpx;

		image {
			width: 110rpx;
			height: 110rpx;
			border: 5rpx solid #FFFFFF;
			border-radius: 50%;
		}
	}

	.nameBox {
		.name {
			font-size: 36rpx;
			color: #FFFFFF;
			font-weight: bold;
		}

		.level {
			image {
				width: 172rpx;
				height: 50rpx;
			}
		}
	}

	.signInList {
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;

		.signTit {
			font-weight: bold;
			height: 92rpx;
			line-height: 92rpx;
		}

		.signInBox {
			.signItem {
				border-top: 2rpx solid #F3F4F5;
				padding: 30rpx 0;

				.itemLeft {
					image {
						width: 92rpx;
						height: 92rpx;
						margin-right: 30rpx;
					}
				}
			}

			.rightBtn {
				width: 160rpx;
				height: 58rpx;
				line-height: 58rpx;
				background: #F6EEDB;
				border-radius: 10rpx;
				color: #C5AA7B;
				text-align: center;
			}
		}
	}

	.signInfoBox {
		height: 366rpx;
		border: 2rpx solid rgba(0, 0, 0, 0);
		background: linear-gradient(88deg, #D8BD8D 0%, #EFD8AB 100%);
		border-radius: 10rpx;
		margin-top: 40rpx;
		padding: 30rpx 40rpx;
		box-sizing: border-box;

		.accumulate {
			.points {
				margin-top: 15rpx;
				margin-bottom: 30rpx;
			}

			label {
				color: #71521B;
			}

			text {
				color: #C83732;
				margin-left: 20rpx
			}

			.toSignBtn {
				width: 160rpx;
				height: 58rpx;
				line-height: 58rpx;
				background: #333333;
				border-radius: 10rpx;
				color: #FFEBC4;
				text-align: center;
			}

			.active {
				opacity: 0.8;
			}

			.accumulateTit {
				font-weight: bold;
			}
		}

		.signDateList {
			display: flex;
			flex-flow: wrap;
			justify-content: space-around;
			margin: 20rpx 0;

			.signItem {
				text-align: center;
			}
		}
	}
}
</style>
