<template>
	<view class="partner-apply-container">

		<image v-if="currentApplyType === 'partner'" src="../../../static/images/user/bg1.png" mode="" class="background" />
		<image
			v-if="currentApplyType === 'sup-partner'" src="../../../static/images/user/bg2.png" mode=""
			class="background"
		/>
		<view class="return">
			<tui-icon
				name="arrowleft" :size="48" unit="rpx"
				color="#ffffff" margin="0" @click="handleBack"
			></tui-icon>
		</view>

		<view class="main-area">
			<ApplyType v-model="currentApplyType"></ApplyType>

			<ApplyForm v-model="partnerForm" :type="currentApplyType" @chooseCity="handlChooseCity"></ApplyForm>

			<!-- <EquityList></EquityList> -->
			<view class="foot">
				<view class="btn" @click="handlePay">
					<text>立即支付</text>
					<text>
						￥<text>{{ currentApplyType === 'partner' ? 2000 : 5000 }}</text>
					</text>
				</view>
			</view>
		</view>

		<!-- <FixedFooter :height="206">
			<button class="uni-btn" @click="handlePay">
			<text class="pay-text">立即支付</text>
			<text class="cost-text">
			￥<text>{{ currentApplyType === 'partner' ? 2000 : 5000 }}</text>/年
			</text>
			</button>
			<view class="tip">放心开通，不会自动续费</view>
			</FixedFooter> -->
	</view>
</template>

<script>
import ApplyType from './cpns/apply-type.vue'
import ApplyForm from './cpns/apply-form.vue'
import EquityList from './cpns/equity-list.vue'
import { partnerApplyApi } from '../../../api/user'
import { getUserId, tradeOrderNo, payFn } from '../../../utils'

export default {
	name: 'PartnerAppay',
	components: {
		ApplyType,
		ApplyForm,
		EquityList
	},
	data() {
		return {
			partnerForm: {
				area: '',
				personLiable: '',
				username: '',
				password: ''
			},
			currentApplyType: 'partner',
			selectCode: null
		}
	},

	methods: {
		handlePay() {
			if (!this.selectCode) {
				uni.showToast({
					title: '请选择区域',
					icon: 'none'
				})
				return
			}
			if (!this.partnerForm.personLiable) {
				uni.showToast({
					title: '请选择业务责任人',
					icon: 'none'
				})
				return
			}
			const tempData = {
				orderNo: tradeOrderNo(),
				userId: getUserId(),
				payType: 5,
				isPartner: this.currentApplyType === 'partner' ? 1 : 2,
				partnerApplyInfo: {
					userId: getUserId(),
					applicationType: this.currentApplyType === 'partner' ? 6 : 7,
					referrerName: this.partnerForm.personLiable,
					// referrerName: '17633721125',
					regionCode: this.selectCode * 1
				}
			}
			if (this.currentApplyType === 'sup-partner') {
				if (this.partnerForm.username.length < 6) {
					uni.showToast({
						title: '帐号不能少于6位',
						icon: 'none'
					})
					return
				}
				if (this.partnerForm.password.length < 6) {
					uni.showToast({
						title: '密码不能少于6位',
						icon: 'none'
					})
					return
				}
				tempData.partnerApplyInfo.username = this.partnerForm.username
				tempData.partnerApplyInfo.password = this.partnerForm.password
			}
			uni.showLoading({
				title: '加载中',
				mask: false
			})
			try {
				partnerApplyApi(tempData).then((data) => {
					payFn({ ...tempData, orderSn: tempData.orderNo }, tempData.payType, false, tempData)
				})
			} catch (error) {
				console.log(error)
				uni.hideLoading()
				uni.showToast({
					title: error,
					icon: 'none'
				})
			}
		},

		handlChooseCity(cityData) {
			this.selectCode = cityData.county.id
		},

		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		}
	},

	onLoad(params) {
		this.currentApplyType = params.type || 'partner'
	}
}
</script>

<style lang="less" scoped>
.partner-apply-container {
	// background-color: #f6f6f6;
	// position: relative;
	width: 100%;
	min-height: 100vh;
	// padding-top: 440upx;
	// padding-bottom: 206upx;
	background: linear-gradient(180deg, #FF9E0E 0%, #FFC117 17%, rgba(255, 193, 23, 0.00) 100%);

	.background {
		position: absolute;
		width: 100%;
		min-height: 1448upx;
	}

	.return {
		width: 48upx;
		height: 48upx;
		position: absolute;
		top: 36upx;
		left: 40upx;
		// padding: 36upx 0 0 40upx;
	}

	.main-area {
		// width: 100%;
		// padding: 24upx;
		min-height: 1028upx;
		top: 440upx;
		position: relative;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 24upx;
		margin: 0 20upx;
		padding-bottom: 108upx;

		.foot {
			width: 100%;
			height: 88upx;
			// margin: 60upx 32upx 0upx 32upx;
			// padding-bottom: 48upx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 20upx;
			display: flex;
			justify-content: center;

			.btn {
				width: 87%;
				height: 88upx;
				border-radius: 44upx;
				background: #FFCB05;
				font-size: 32upx;
				font-weight: 500;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;

			}
		}
	}

	.vip-container {
		width: 100%;
		padding: 32upx;
		box-sizing: border-box;
		// background-color: #fff;
		// border-radius: 20upx;
		// margin: 20upx 0;

		/deep/ .pane-title {
			color: #141000;
			font-size: 32upx;
			font-weight: 500;
		}
	}

	/deep/ .fixed-footer-container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.tip {
			font-size: 24upx;
			color: #777;
			margin-top: 6upx;
		}

		.uni-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90%;
			height: 102upx;
			border-radius: 100px;
			background: linear-gradient(270deg, #fd8b1f 0%, #ea6020 100%);

			.pay-text {
				font-size: 32upx;
				font-weight: bold;
				color: #fff;
			}

			.cost-text {
				font-size: 24upx;
				font-weight: 400;
				color: #fff;
				margin-left: 30upx;

				text {
					color: #fff;
					font-size: 48upx;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
