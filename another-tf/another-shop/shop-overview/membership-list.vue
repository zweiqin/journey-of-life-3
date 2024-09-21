<template>
	<view class="membership-list-container">
		<JHeader title="会员列表" width="50" height="50"></JHeader>
		<TimeInfoFilterBox @confirm="handleSelectTimeInfoFilter"></TimeInfoFilterBox>

		<view v-if="membershipList && membershipList.length" style="padding: 20rpx 28rpx 0;">
			<view
				v-for="item in membershipList" :key="item.buyerUserId"
				style="padding: 30rpx 28rpx;margin: 0 0 32rpx;border-radius: 20rpx;background-color: #ffffff;"
			>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<view style="margin-right: 20rpx;">
							<tui-lazyload-img
								width="100rpx" height="100rpx" mode="aspectFit" radius="50%"
								background-color="#ffffff"
								:src="common.seamingImgUrl(item.headImage) || require('../../../static/images/new-user/default-user-avatar.png')"
							></tui-lazyload-img>
						</view>
						<view>
							<view>
								<text style="font-weight: bold;">{{ item.name || '--' }}</text>
								<text v-if="item.userGrade" style="margin-left: 20rpx;font-size: 26rpx;">等级：{{ item.userGrade }}</text>
							</view>
							<view style="margin-top: 8rpx;font-size: 28rpx;color: #666666;">手机号：{{ item.phone || '--' }}</view>
						</view>
					</view>
					<view v-if="item.phone">
						<BeeMakePhone :phone="item.phone">
							<view style="padding: 12rpx;background: linear-gradient(135deg, #FF9D72 0%, #EA5C1E 100%);border-radius: 50%;line-height: 1;">
								<tui-icon name="voipphone" :size="34" unit="rpx" color="#ffd1bd" margin="0"></tui-icon>
							</view>
						</BeeMakePhone>
					</view>
				</view>
				<view style="margin-top: 12rpx;padding: 26rpx 20rpx 0;font-size: 28rpx;color: #000000;background-color: #f5f5f5;border-radius: 12rpx;">
					<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
						<view style="min-width: 162rpx;color: #939393">消费总额</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.total }}</view>
					</view>
					<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
						<view style="min-width: 162rpx;color: #939393">下单总数</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.frequency }}</view>
					</view>
					<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
						<view style="min-width: 162rpx;color: #939393">最近消费时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.lastTime || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
						<view style="min-width: 162rpx;color: #939393">成为客户时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.time || '--' }}</view>
					</view>
					<view v-if="item.labelName" style="display: flex;align-items: center;padding-bottom: 18rpx;">
						<view style="min-width: 162rpx;color: #939393">客户关联标签</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;word-break: break-all;">
							<text
								v-for="(section, count) in item.labelName.split(',')" :key="count"
								style="margin-right: 12rpx;white-space: nowrap;"
							>
								{{ section || '--' }}
							</text>
						</view>
					</view>
					<!-- <view style="display: flex;align-items: center;padding-bottom: 18rpx;">
						<view style="min-width: 162rpx;color: #939393">注册ip</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.registerIp || '--' }}</view>
						</view>
						<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
						<view style="min-width: 162rpx;color: #939393">上次登录的ip</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.lastLoginIp || '--' }}</view>
						</view> -->
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !membershipList.length
					? 'loading' : !isEmpty && membershipList.length && (membershipList.length >= membershipTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无会员~</tui-no-data>
		</view>
	</view>
</template>

<script>
import TimeInfoFilterBox from './components/TimeInfoFilterBox.vue'
import { getShopMemberListApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MembershipList',
	components: { TimeInfoFilterBox },
	data() {
		return {
			isEmpty: false,
			membershipList: [
				// {
				// 	buyerUserId: '', // 客户id
				// 	name: '', // 客户昵称
				// 	headImage: '', // 客户头像
				// 	phone: '', // 手机号
				// 	frequency: '', // 消费次数
				// 	total: '', // 累计消费金额
				// 	lastTime: '', // 上次消费时间
				// 	time: '', // 成为客户时间
				// 	labelName: '', // 客户关联标签
				// 	labelIds: '', // 标签id数组
				// 	ids: '', // 标签id拼接字符串
				// 	registerIp: '', // 注册ip
				// 	lastLoginIp: '', // 上次登录的ip
				// 	userGrade: '' // 客户等级
				// }
			],
			membershipTotal: 0,
			queryInfo: {
				dates: [],
				lastTimes: [],
				phone: '',
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		this.getMembershipPageList()
	},
	methods: {
		getMembershipPageList(isLoadmore) {
			uni.showLoading()
			getShopMemberListApi(this.queryInfo).then((res) => {
				this.membershipTotal = res.data.total
				if (isLoadmore) {
					this.membershipList.push(...res.data.list)
				} else {
					this.membershipList = res.data.list
				}
				this.isEmpty = this.membershipList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleSelectTimeInfoFilter(e) {
			this.queryInfo.dates = e.dates
			this.queryInfo.lastTimes = e.lastTimes
			this.queryInfo.phone = e.phone
			this.queryInfo.page = 1
			this.getMembershipPageList()
		}
	},
	onReachBottom() {
		if (this.membershipList.length < this.membershipTotal) {
			++this.queryInfo.page
			this.getMembershipPageList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.membership-list-container {
	min-height: 100vh;
	background-color: #f1f1f1;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 10rpx 10rpx;
		background-color: #ffffff;

		.title {
			color: #222229;
		}
	}

	/deep/ .tui-lazyload__box {
		vertical-align: bottom;
	}
}
</style>
