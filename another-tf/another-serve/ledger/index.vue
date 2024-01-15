<template>
	<view class="ledger-container">
		<JHeader title="推广中心" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="top-bg"></view>
		<view class="top-bar">
			<text class="textCenter">佣金明细</text>
			<text class="linkRight">提现记录</text>
		</view>
		<!-- 主体 -->
		<view class="container">
			<!-- 帐号 -->
			<view v-if="userType == '0'" class="account">
				<image class="avatar" :src="common.seamingImgUrl(userInfo.headImage)" alt=""></image>
				<view class="name">
					<text class="UserName">{{ platformShopData.shopName }}</text>
					<span class="UserAccount">商家代号：{{ platformShopData.shopCode }}</span>
				</view>
			</view>
			<view v-else class="account">
				<image class="avatar" :src="common.seamingImgUrl(userInfo.headImage)" alt=""></image>
				<view class="name">
					<text class="UserName">{{ platformUserData.name }}</text>
					<span class="UserAccount">策划师代号：{{ platformUserData.username }}</span>
				</view>
			</view>
			<!-- 信息面板 -->
			<view class="info-panel">
				<view class="infoBox">
					<view class="infoItem">
						<p>
							粉丝人数
						</p>
						<span>
							{{ userListData.userNum || '0.00' }}<span v-if="userListData.toDayCount > 0" class="todayCount">
								+{{
									userListData.toDayCount }}
							</span>
						</span>
						<a href="#">查看详情</a>
					</view>
					<view class="infoItem">
						<p>
							佣金余额
						</p>
						<!-- <span v-if="commissionData.commissionToday > 0 && typeOf(commissionData) !== 'object'" class="todayCount">+{{ commissionData.commissionToday  }}</span> -->
						<span>{{ commissionData.userCommission.totalAmount || '0.00' }}</span>
						<a href="#">去提现</a>
					</view>
					<view class="infoItem">
						<p>
							今日收入(元)
						</p>
						<span>{{ typeof commissionData.commissionToday === 'object' ? 0.00 : commissionData.commissionToday }}</span>
					</view>
					<view class="infoItem">
						<p>
							累计收入(元)
						</p>
						<span>{{ commissionData.userCommission.remainAmount }}</span>
					</view>
				</view>
			</view>
			<!-- 图表 -->
			<view class="chart">
				<view class="now">{{ new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString("en-GB") }}</view>
				<view class="type">
					<span :class="type == 1 ? 'on' : ''" @click="type = 1">佣金流水</span>
					<span :class="type == 2 ? 'on' : ''" @click="type = 2">粉丝列表</span>
				</view>
				<view id="chart" class="Records">
					<view v-if="type == 1" class="RecordsTbaleOne">
						<tui-time-axis>
							<tui-timeaxis-item v-for="item in commissionData.commissionRecord" :key="item.orderSn">
								<template #content>
									<view>
										<view class="order-title">订单编号: {{ item.orderSn }}</view>
										<view class="order-desc">来源: {{ getTpye(item.type) }}, 入账额度: + {{ item.amount }}</view>
										<view class="order-time">{{ item.createTime }}</view>
									</view>
								</template>
							</tui-timeaxis-item>
						</tui-time-axis>
					</view>
					<!-- 预留给echarts图表的位置，需要兼容性，后续开发 -->
					<tui-list-view v-if="type == 2">
						<tui-list-cell
							v-for="item in userListData.userList" :key="item" :arrow="false"
							@click="giftVoucher(item.platformUserId)"
						>
							<view slot="label" class="userName">
								{{ item.name }}
							</view>
							<view slot="right-icon" class="rightArrow">
								<span>赠送代金卷 ></span>
							</view>
						</tui-list-cell>
					</tui-list-view>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="share">
				<button @click="getInfoCodeImage">立即邀请会员，赚取现金奖励</button>
			</view>
			<tui-popup :show="modelShow" mode="fade" style="background-color: rgba(0,0,0,0.4);">
				<view class="invitationCode">
					<span class="headerText">微信扫一扫</span>
					<image class="codeImage" :src="codeImage" mode=""></image>
					<view class="myname">
						<view class="myInfo">
							<view v-if="userType == '0'" class="info">昵称: {{ platformShopData.shopName }}</view>
							<view v-else class="info">昵称: {{ platformUserData.name }}</view>
							<view class="info">推广码: {{ codeData.invitationCode }}</view>
						</view>
					</view>
				</view>
			</tui-popup>
			<tui-popup :show="inputShow" mode="fade" style="background-color: rgba(0,0,0,0.4);">
				<view class="inputBox">
					<view class="shurukuang" style="margin-top: 45rpx;">
						<u-input v-model="giftNumber" type="number" :border="true" />
						<button class="giftButton" @click="qnmdVoucher">点击赠送</button>
					</view>
				</view>
			</tui-popup>
		</view>
	</view>
</template>

<script>
import { getPlatformShopUserApi, getPlatformUserUserApi, getCommissionUserApi, getUserListUserApi, getUserInfoCodeApi, updateTransferVoucherShopHoldApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Ledger',
	data() {
		return {
			modelShow: false,
			inputShow: false,
			transferId: '',
			giftNumber: 0,
			codeData: {},
			codeImage: '',
			type: 1,
			userType: 0,
			userInfo: {},
			platformShopData: {},
			platformUserData: {},
			commissionData: {
				userCommission: {}
			},
			userListData: {}
		}
	},
	onLoad() {
		this.userInfo = this.$store.getters.userInfo
		this.userType = this.userInfo.type
		if (this.userType == '0') {
			getPlatformShopUserApi({ platformUserId: this.userInfo.platformUserId }).then((res) => { // 获取绑定的商家信息
				this.platformShopData = res.data
			})
				.catch((err) => {
					console.log(err)
				})
		} else {
			getPlatformUserUserApi({ platformUserId: this.userInfo.platformUserId }).then((res) => { // 绑定的策划师或分公司角色信息
				this.platformUserData = res.data
			})
				.catch((err) => {
					console.log(err)
				})
		}

		getCommissionUserApi({ // 用户佣金统计+记录
			platformUserId: this.userInfo.platformUserId,
			type: this.userType
		}).then((res) => {
			this.commissionData = res.data
		})
			.catch((err) => {
				console.log(err)
			})

		getUserListUserApi({ // 用户粉丝统计+列表
			platformUserId: this.userInfo.platformUserId,
			type: this.userType
		}).then((res) => {
			this.userListData = res.data
		})
			.catch((err) => {
				console.log(err)
			})
	},
	methods: {
		getTpye(typeNumber) { 	// (0代金券，1现金，2会员升级)
			const arr = ['代金卷', '现金', '会员升级']
			return arr[typeNumber]
		},
		getInfoCodeImage() {
			this.modelShow = true
			getUserInfoCodeApi({
				type: this.userType
			}).then((res) => {
				this.codeData = res.data
				this.codeImage = this.codeData.urlCode
			})
		},
		giftVoucher(ID) {
			this.inputShow = true
			this.transferId = ID
		},
		qnmdVoucher() {
			updateTransferVoucherShopHoldApi({
				buyerUserId: this.transferId,
				voucherNum: this.giftNumber
			}).then((res) => {
				this.giftNumber = 0
				console.log(res)
			})
			this.inputShow = false
		}
	}
}
</script>

<style lang="less" scoped>
* {
	text-decoration: none;
}

.ledger-container {
	background: linear-gradient(180deg, #ffc475 25%, #f5f5f5 36%);
	min-height: 100vh;
	box-sizing: border-box;

	.top-bg {
		// background-image: linear-gradient(#011375, #011375);
		background-size: 100% 100%;
		position: absolute;
		top: 60upx;
		left: 0;
		width: 100%;
		height: 368rpx;
		z-index: 1;
	}

	.top-bar {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		padding: 0 30rpx;
		position: relative;
		z-index: 2;
		padding-top: 30rpx;
	}

	.top-bar .backImg {
		width: 80rpx;
		height: 70rpx;
		font-size: 42rpx;
		font-weight: bold;
	}

	.top-bar .textCenter {
		font-size: 36rpx;
	}

	.top-bar .linkRight {
		height: 88rpx;
		font-size: 28rpx;
	}

	.container {
		width: 100%;
		padding: 0 35rpx 0 35rpx;
		position: relative;
		z-index: 2;
	}

	/* 帐号信息 */
	.account {
		width: 100%;
		display: flex;
		align-items: center;
		padding-top: 40rpx;
	}

	.account .avatar {
		box-sizing: border-box;
		width: 125rpx;
		height: 125rpx;
		padding: 15rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		background-color: #fff;
	}

	.account .name {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		justify-content: center;
		color: #ffffff;
	}

	.account .name .UserName {
		font-size: 38rpx;
	}

	.account .name .UserAccount {
		margin-top: 20rpx;
		font-size: 32rpx;
	}

	/* 信息面板 */
	.info-panel {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 85rpx;
		background: #ffffff;
		border-radius: 15rpx;
		position: relative;
		padding-bottom: .1rpx;
		box-shadow: 0 0 2rpx rgba(0, 0, 0, 10rpx);
		margin-bottom: 65rpx;
	}

	.info-panel::before {
		content: "";
		position: absolute;
		z-index: 3;
		height: 3.05rpx;
		width: .01rpx;
		background: #f4f4f4;
		top: .35rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.info-panel::after {
		content: "";
		position: absolute;
		z-index: 3;
		width: 5.15rpx;
		height: .01rpx;
		background: #f4f4f4;
		left: .35rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.info-panel .infoBox {
		outline: none;
		list-style: none;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.info-panel .infoBox .infoItem {
		width: 50%;
		height: 170rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		padding-top: 38rpx;
		padding-bottom: 5rpx;
	}

	.info-panel .infoBox .infoItem p {
		font-size: 26rpx;
		color: #8a8a8a;
		display: flex;
		align-items: center;
		letter-spacing: 4rpx;
	}

	.info-panel .infoBox .infoItem p .fuckicon {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
		color: #92a9f9;
		position: relative;
	}

	.todayCount {
		position: absolute;
		color: red !important;
		font-size: 12rpx;
		transform: scale(0.8);
		top: 56rpx;
		left: 190rpx;
	}

	.info-panel .infoBox .infoItem span {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		padding: 15rpx 0 5rpx 0;
	}

	.info-panel .infoBox .infoItem a {
		margin-top: 5rpx;
		font-size: 22rpx;
		color: #8a8a8a;
	}

	/* 图表 */
	.chart {
		width: 100%;
		height: auto;
		overflow: hidden;
		position: relative;
		padding-top: 50rpx;
	}

	.chart .Records {
		margin-top: 15rpx;
		border-radius: 15rpx;
		width: 100%;
		min-height: 660rpx;
		max-height: 660rpx;
		background-color: #fff;
		overflow: hidden;
		overflow-y: auto;
	}

	.RecordsTbaleOne {
		padding-left: 28rpx;
		padding-top: 15rpx;
	}

	.avater {
		width: 60rpx;
		height: 60rpx;
	}

	.userName {
		margin-top: 15rpx;
		margin-left: 20rpx;
	}

	.rightArrow {
		display: flex;
		align-items: center;
		color: #909399;
	}

	.arrow {
		width: 60rpx;
		height: 60rpx;
	}

	.chart .now {
		font-size: 28rpx;
		position: absolute;
		right: 0;
		top: 5rpx;
		color: #adadad;
	}

	.chart .type {
		position: absolute;
		left: 40rpx;
		top: 0;
		font-size: 28rpx;
		z-index: 999;
	}

	.chart .type span {
		margin-right: 20rpx;
		position: relative;
		padding: 0 2rpx 10rpx 2rpx;
		color: #8a8a8a;
	}

	.chart .type span.on {
		color: #021375;
	}

	.chart .type span.on::after {
		content: "";
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5rpx;
		background: #ffc475;
	}

	/* 分享 */
	.share {
		position: fixed;
		bottom: 46rpx;
		left: 50%;
		width: 80%;
		transform: translateX(-50%);
	}

	.share button {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
		background: #ffb575;
		color: #ffffff;
		font-size: 30rpx;
		cursor: pointer;
	}

	.order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.order-desc {
		margin-top: 4rpx;
		color: rgb(150, 150, 150);
		font-size: 34rpx;
		margin-bottom: 6rpx;
	}

	.order-time {
		color: rgb(200, 200, 200);
		font-size: 28rpx;
	}

	.invitationCode {
		width: 550rpx;
		// height: 700rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.headerText {
			letter-spacing: 8rpx;
			margin-top: 38rpx;
			font-size: 45rpx;
			font-weight: 600;
			color: #ff8821;
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid #ff8821;
		}
	}

	.codeImage {
		margin-top: 5rpx;
		width: 420rpx;
		height: 420rpx;
	}

	.myname {
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-sizing: content-box;
		width: 80%;
		height: 100rpx;
		padding-bottom: 20rpx;

		.logoimg {
			width: 80rpx;
			height: 80rpx;
		}

		.myInfo {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 10rpx;

			.info {
				color: #535555e0;
				font-size: 30rpx;
				letter-spacing: 2rpx;
			}
		}
	}

	.inputBox {
		width: 500rpx;
		height: 230rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.giftInput {
		height: 40rpx;
		font-size: 32rpx;
	}

	.shurukuang {
		width: 360rpx;
		height: 40rpx;
	}

	/deep/ .uni-input-input {
		font-size: 38rpx;
	}

	.giftButton {
		font-size: 24rpx;
		font-weight: 600;
		margin-top: 20rpx;
		width: 160rpx;
		height: 60rpx;
	}
}
</style>
