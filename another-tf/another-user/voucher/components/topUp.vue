<template>
	<view class="topUpContainer">
		<VoucherBalance :user-acount="userAcount"></VoucherBalance>
		<view v-show="isGift" class="selectAcount">
			<tui-form ref="giftForm">
				<tui-input v-model="findUserId" :border-bottom="false" label="转增账号" placeholder="请输入用户ID / 手机号">
					<button slot="right" class="selectBtn" @click="getUserInfo">查询</button>
				</tui-input>
				<view v-if="findUserInfo" class="selectUserInfo">
					<image v-if="findUserInfo.oldTF.avatarUrl" class="userAvatar" :src="findUserInfo.oldTF.avatarUrl"></image>
					<image v-else class="userAvatar" src="../../../../static/images/new-user/default-user-avatar.png"></image>
					<text class="userName">{{ findUserInfo.oldTF.nickName }}</text>
				</view>
				<!-- <tui-input @input="getCustomValue(amountData.length-1)" @focus="customNumber" type="number" :borderBottom="false" label="转增金额" min="0" max="20000" placeholder="请输入金额" v-model="amountData[amountData.length-1].value">
					<button class="selectBtn" slot="right">充值</button>
					</tui-input> -->
			</tui-form>
			<!-- <view class="moneys">
				可用金额：{{ userAcount.number || '0.00' }} 元
				</view> -->
		</view>
		<AmountSelection ref="AmountSelection" v-bind="$props" :amount-data="amountData" @getCustomValue="getCustomValue">
		</AmountSelection>
		<view class="VoucherService" style="display: none;">
			<p class="title">代金卷服务</p>
			<view class="VoucherServiceBox">
				<view class="VoucherServiceItem">
					<image class="icons" src="../../../../static/images/user/qianbao.png"></image>
					<text class="texts">充值记录</text>
				</view>
				<view class="VoucherServiceItem">
					<image class="icons" src="../../../../static/images/user/zhuanzheng.png"></image>
					<text class="texts">支出记录</text>
				</view>
				<view class="VoucherServiceItem">
					<image class="icons" src="../../../../static/images/user/shouyi.png"></image>
					<text class="texts">收益记录</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="titles">
				<text>使用规则</text>|<text>常见问题</text>|<text>联系客服</text>
			</view>
			<view class="titles2">
				本服务由广东团蜂生活服务有限公司提供
			</view>
		</view>
		<view class="footerButton">
			<button v-if="!isGift" class="fuckBtn" @click="amount && (isShowModalRecharge = true)">
				￥{{ amount
				}}&nbsp;立即充值
			</button>
			<button
				v-else class="fuckBtn" :loading="isLoding" :disabled="isLoding"
				@click="giveAmount && (isShowModalRecharge = true)"
			>
				&nbsp;立即转赠
			</button>
		</view>

		<tui-modal
			:show="isShowModalRecharge" custom fadein :button="[]"
			:z-index="995" :mask-z-index="994"
			@cancel="isShowModalRecharge = false"
		>
			<view style="padding: 28upx 0;text-align: center;">
				<view>
					<image style="width: 435upx;height: 337upx;" src="../../../../static/images/common/modal-show.png"></image>
				</view>
				<view style="margin-top: 24upx;font-size: 40upx;color: #333333;">
					<text v-if="isGift">确定要转赠 {{ giveAmount }} 代金券吗？</text>
					<text v-else>确定要充值 {{ amount * 2 }} 代金券吗？</text>
				</view>
				<view style="margin-top: 22upx;font-size: 36upx;color: #687383;">
					<text v-if="isGift">价值 {{ amount }} 元</text>
					<text v-else>共需支付 {{ amount }} 元</text>
				</view>
				<view>
					<tui-button
						v-if="isGift" type="warning" width="238rpx" height="108rpx"
						margin="32upx 0 0" :size="40"
						shape="circle"
						style="display: inline-block;background: #ef530e!important;box-shadow: 0px 12px 20px 0px #f1ac8e;"
						@click="giftVouchers"
					>
						确定
					</tui-button>
					<tui-button
						v-else type="warning" width="238rpx" height="108rpx"
						margin="32upx 0 0" :size="40" shape="circle"
						style="display: inline-block;background: #ef530e!important;box-shadow: 0px 12px 20px 0px #f1ac8e;"
						@click="showPayTypePopup = true"
					>
						确定
					</tui-button>
				</view>
			</view>
		</tui-modal>
		<tui-bottom-popup :show="showPayTypePopup" @close="showPayTypePopup = false">
			<view v-if="showPayTypePopup" style="padding: 60upx 0 128upx;">
				<CashierList :price-pay="amount" show show-platform-pay @change="(e) => payInfo = e" />
				<tui-button
					type="warning" width="168upx" height="64upx" margin="30upx auto 0"
					shape="circle"
					@click="submitVouchers"
				>
					确认支付
				</tui-button>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { submitVoucherOrderApi, updateTransferVoucherShopHoldApi, getBandUserInfoApi } from '../../../../api/anotherTFInterface'
import VoucherBalance from '../cpns/VoucherBalance.vue'
import AmountSelection from '../cpns/AmountSelection.vue'
import { handleDoPay } from '../../../../utils/payUtil'

export default {
	name: 'TopUp',
	components: {
		VoucherBalance,
		AmountSelection
	},
	props: {
		userAcount: {
			type: Object,
			default: () => ({})
		},
		userInfo: {
			type: Object,
			default: () => ({})
		},
		isGift: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			amountData: [{ value: 50, price: 25 },
				{ value: 100, price: 50 },
				{ value: 200, price: 100 },
				{ value: 2000, price: 1000 },
				{ value: 4000, price: 2000 },
				{ value: 0, price: 0 }],
			amount: 25,
			giveAmount: 50,
			findUserId: '',
			findUserInfo: null,
			isShowKeyboard: false,
			isLoding: false,
			isShowModalRecharge: false,
			showPayTypePopup: false,
			payInfo: {}
		}
	},
	methods: {
		getCustomValue(index, valueNum) {
			console.log(index, valueNum)
			if (valueNum) this.amountData[index].value = valueNum
			this.amountData[index].price = this.amountData[index].value / 2
			this.amount = this.amountData[index].price
			this.giveAmount = this.amountData[index].value
		},
		submitVouchers() {
			submitVoucherOrderApi({
				voucherId: '1',
				number: this.amount * 2,
				payGrade: this.amount
			}).then((res) => {
				handleDoPay({ ...res.data, ...this.payInfo }, 4)
			})
				.catch((err) => {
					console.log(err)
				})
		},
		getUserInfo() {
			const regExp = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
			if (regExp.exec(this.findUserId)) { // 手机号
				getBandUserInfoApi({
					type: 2,
					value: this.findUserId
				}).then((res) => {
					this.findUserInfo = {
						oldTF: {
							avatarUrl: res.data.headImage,
							nickName: res.data.phone
						},
						newTF: res.data
					}
				})
					.catch((err) => {
						this.findUserInfo = null
					})
			} else {
				getBandUserInfoApi({
					type: 1,
					value: this.findUserId
				}).then((res) => {
					this.findUserInfo = {
						oldTF: {
							avatarUrl: res.data.headImage,
							nickName: res.data.phone
						},
						newTF: res.data
					}
				})
					.catch((err) => {
						this.findUserInfo = null
					})
			}
		},
		customNumber() {
			this.$refs.AmountSelection.active = this.amountData.length - 1
		},
		giftVouchers() {
			if (!this.findUserInfo) return this.$showToast('请选择赠送对象')
			if (!this.amount || this.amount <= 0) return this.$showToast('赠送金额大于需大于0')
			this.isLoding = true
			updateTransferVoucherShopHoldApi({
				'buyerUserId': this.findUserInfo.newTF.buyerUserId,
				'voucherNum': this.giveAmount
			}).then((res) => {
				this.isLoding = false
				uni.showToast({
					title: '转增成功',
					icon: 'none'
				})
				this.$emit('getVouvher')
				uni.navigateTo({
					url: `/another-tf/another-user/voucher/orderStatus?istopUp=${0}&orderStatus=${1}&count=${0 - this.giveAmount}`
				})
				console.log(res)
			})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.selectUserInfo {
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;

	.userAvatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.userName {
		margin-left: 36rpx;
		font-size: 42rpx;
	}
}

.selectBtn {
	width: 92rpx;
	height: 47rpx;
	border-radius: 50rpx;
	background: rgba(255, 56, 12, 0.8784);
	display: flex;
	justify-content: center;
	font-size: 28rpx;
	line-height: 47rpx;
	white-space: nowrap;
	color: #FFFFFF;
}

.topUpContainer {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;

	.VoucherService {
		margin-top: 24rpx;
		box-sizing: border-box;
		padding: 21rpx 30rpx 32rpx 30rpx;
		width: 690rpx;
		height: 238rpx;
		border-radius: 20rpx;
		background: #FFFFFF;

		.title {
			font-size: 32rpx;
			font-weight: 600;
			font-feature-settings: "kern" on;
			color: #222229;
		}

		.VoucherServiceBox {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-around;

			.VoucherServiceItem {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				.icons {
					width: 48rpx;
					height: 48rpx;
				}

				.texts {
					margin-top: 10rpx;
					font-size: 28rpx;
					color: #222229;
				}
			}
		}
	}

	.selectAcount {
		box-sizing: border-box;
		padding-top: 6rpx;
		padding-bottom: 30rpx;
		margin-top: 24rpx;
		width: 690rpx;
		/* height: 322rpx; */
		border-radius: 20rpx;
		background-color: #fff;
		overflow: hidden;

		.moneys {
			margin-top: 56rpx;
			float: right;
			margin-right: 30rpx;
			font-size: 32rpx;
			line-height: 32rpx;
			color: #222229;
		}
	}

	.footer {
		width: 690rpx;
		height: 196rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.titles {
			margin-top: 54rpx;
			width: 432rpx;
			height: 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #D8D8D8;

			>text {
				/* margin-top: 4rpx; */
				font-size: 24rpx;
				font-weight: 350;
				line-height: 30rpx;
				color: #222229;
			}
		}

		.titles2 {
			margin-top: 24rpx;
			position: relative;
			font-size: 24rpx;
			font-weight: 350;
			line-height: 32rpx;
			color: #888889;

			&::before {
				content: '';
				width: 93rpx;
				height: 2rpx;
				position: absolute;
				background-color: #888889;
				left: -110rpx;
				top: 50%;
			}

			&::after {
				content: '';
				width: 93rpx;
				height: 2rpx;
				position: absolute;
				background-color: #888889;
				right: -110rpx;
				top: 50%;
			}
		}
	}

	.footerButton {
		/* position: fixed;
        bottom: 0;
        left: 0; */
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		padding-bottom: 40rpx;

		.fuckBtn {
			width: 690rpx;
			height: 88rpx;
			border-radius: 16rpx;
			padding: 20rpx 48rpx;
			gap: 19.999998092651367rpx;
			background: #FF380C;
			font-size: 32rpx;
			line-height: 48rpx;
			color: #FFFFFF;
		}
	}
}
</style>
