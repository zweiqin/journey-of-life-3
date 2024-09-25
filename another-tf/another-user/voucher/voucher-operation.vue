<template>
	<view class="voucher-operation-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="arrowleft" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">代金券</text>
			</view>
		</BeeBack>
		<VoucherChoose
			v-show="!voucherChooseInfo.platformVoucherId"
			@change="(e) => (voucherChooseInfo = e) && handelInitData(true)"
		></VoucherChoose>
		<view
			style="position: relative;padding: 8rpx 0 0;text-align: center;color: #ffffff;background: linear-gradient(90deg, #EF530E 0%, #EF530E 100%);overflow: hidden;"
		>
			<view>
				<view
					style="position: absolute;top: -30%;left: -40%;width: 600rpx;height: 620rpx;background-color: #f16527;border-radius: 50%;"
				>
				</view>
				<view
					style="position: absolute;top: -30%;left: -40%;width: 508rpx;height: 538rpx;background: linear-gradient(101deg, #FFFFFF 26%, rgba(255, 255, 255, 0.0001) 154%);border-radius: 50%;opacity: 0.1;"
				>
				</view>
			</view>
			<view style="position: relative;">
				<view style="padding: 22rpx 20rpx 38rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view>
							<tui-dropdown-list
								v-if="$store.state.auth.identityInfo.type.includes(8) || $store.state.auth.identityInfo.type.includes(9)"
								:show="roleDropdownShow" :top="55" background-color="#ffffff"
								@close="roleDropdownShow = false"
							>
								<template #selectionbox>
									<view
										style="height: auto;padding: 10rpx 16rpx;color: #222229;background-color: #eeeeee;border-radius: 8rpx;"
										@click="roleDropdownShow = !roleDropdownShow"
									>
										<text style="font-size: 26rpx;">{{ roleDropdownName || '' }}</text>
										<tui-icon name="arrowdown" :size="14" color="#222229" margin="0 0 0 14rpx"></tui-icon>
									</view>
								</template>
								<template #dropdownbox>
									<view style="width: fit-content;box-sizing: border-box;">
										<tui-list-view
											color="#777" margin-top="2rpx"
											style="width: fit-content;min-width: 100rpx;max-height: 28vh;overflow-y: auto;"
										>
											<tui-list-cell
												v-for="item in [{ name: '用户', value: '1' }, { name: '商家', value: '2' }]"
												:key="item.name" padding="10rpx 0"
												style="width: fit-content;margin: 0 auto;"
												@click="(roleType !== item.value) && (((roleType = item.value) && (roleDropdownName = item.name) && (roleDropdownShow = false)) || getVoucherData())"
											>
												{{ item.name }}
											</tui-list-cell>
										</tui-list-view>
									</view>
								</template>
							</tui-dropdown-list>
						</view>
						<view class="top-btn">
							<tui-button
								type="white" plain link :size="36"
								width="184rpx" height="68rpx" margin="0"
								@click="go('/another-tf/another-user/voucher/voucher-record')"
							>
								收支明细
							</tui-button>
						</view>
					</view>
					<view style="margin-top: -32rpx;">
						<view
							style="padding: 6rpx 22rpx 12rpx;margin: 0 auto;width: fit-content;font-size: 76rpx;color: #ef530e;background-color: #ffffff;border-radius: 12rpx;"
						>
							券
						</view>
						<view v-if="roleType === '1'">
							<view style="margin-top: 44rpx;font-size: 28rpx">用户总代金券</view>
							<view style="margin-top: 36rpx;font-size: 64rpx">
								￥{{ Number.parseFloat(userVoucherAcount.chongzhiRechargeTotal + userVoucherAcount.duihuanRechargeTotal).toFixed(2) }}
							</view>
						</view>
						<view v-else-if="roleType === '2'">
							<view style="margin-top: 44rpx;font-size: 28rpx">商家总代金券</view>
							<view style="margin-top: 36rpx;font-size: 64rpx">
								￥{{ Number.parseFloat(shopVoucherAcount.chongzhiRechargeTotal + shopVoucherAcount.duihuanRechargeTotal).toFixed(2) }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view
			v-if="roleType === '1'"
			style="display: flex;justify-content: space-evenly;align-items: stretch;flex-wrap: wrap;padding-top: 42rpx;text-align: center;"
		>
			<view style="flex: 1;margin-top: 30rpx;">
				<view
					style="display: flex;align-items: center;justify-content: center;"
					@click="(isShowTipsModal = true) && (showTipsType = '1')"
				>
					<text>充值代金券</text>
					<tui-icon name="explain" color="#3D3D3D" size="26" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
				</view>
				<view style="margin-top: 20rpx;font-size: 50rpx;font-weight: bold;">
					￥{{ typeof userVoucherAcount.chongzhiRechargeTotal === 'number'
						? Number.parseFloat(Number(userVoucherAcount.chongzhiRechargeTotal)).toFixed(2)
						: '--' }}
				</view>
			</view>
			<view style="margin: 40rpx 0 10rpx;width: 2rpx;background-color: #979797;"></view>
			<view style="flex: 1;margin-top: 30rpx;">
				<view
					style="display: flex;align-items: center;justify-content: center;"
					@click="(isShowTipsModal = true) && (showTipsType = '2')"
				>
					<text>兑换代金券</text>
					<tui-icon name="explain" color="#3D3D3D" size="26" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
				</view>
				<view style="margin-top: 20rpx;font-size: 50rpx;font-weight: bold;">
					￥{{ typeof userVoucherAcount.duihuanRechargeTotal === 'number'
						? Number.parseFloat(Number(userVoucherAcount.duihuanRechargeTotal)).toFixed(2)
						: '--' }}
				</view>
			</view>
		</view>

		<view
			v-if="roleType === '2'"
			style="display: flex;justify-content: space-evenly;align-items: stretch;flex-wrap: wrap;padding-top: 42rpx;text-align: center;"
		>
			<view style="flex: 1;margin-top: 30rpx;">
				<view style="display: flex;align-items: center;justify-content: center;">
					商家充值代金券
				</view>
				<view style="margin-top: 20rpx;font-size: 50rpx;font-weight: bold;">
					￥{{ typeof shopVoucherAcount.chongzhiRechargeTotal === 'number'
						? Number.parseFloat(Number(shopVoucherAcount.chongzhiRechargeTotal)).toFixed(2)
						: '--' }}
				</view>
			</view>
			<view style="margin: 40rpx 0 10rpx;width: 2rpx;background-color: #979797;"></view>
			<view style="flex: 1;margin-top: 30rpx;">
				<view style="display: flex;align-items: center;justify-content: center;">
					商家兑换代金券
				</view>
				<view style="margin-top: 20rpx;font-size: 50rpx;font-weight: bold;">
					￥{{ typeof shopVoucherAcount.duihuanRechargeTotal === 'number'
						? Number.parseFloat(Number(shopVoucherAcount.duihuanRechargeTotal)).toFixed(2)
						: '--' }}
				</view>
			</view>
		</view>

		<view style="display: flex;flex-direction: column;align-items: center;margin-top: 100rpx;padding-bottom: 148rpx;">
			<view style="padding-top: 60rpx;">
				<VoucherRecharge
					:platform-voucher-id="voucherChooseInfo.platformVoucherId"
					:purchase-ratio="voucherChooseInfo.purchaseRatio"
				></VoucherRecharge>
			</view>
			<view v-if="roleType === '1'" style="padding-top: 18rpx;">
				<VoucherTransfer
					:platform-voucher-id="voucherChooseInfo.platformVoucherId"
					:purchase-ratio="voucherChooseInfo.purchaseRatio" :c-voucher-total="userVoucherAcount.chongzhiRechargeTotal"
					:d-voucher-total="userVoucherAcount.duihuanRechargeTotal" @success="getVoucherData()"
				></VoucherTransfer>
			</view>
			<view v-if="roleType === '2'" style="padding-top: 18rpx;">
				<VoucherShopTransfer
					:platform-voucher-id="voucherChooseInfo.platformVoucherId"
					:purchase-ratio="voucherChooseInfo.purchaseRatio" :c-voucher-total="shopVoucherAcount.chongzhiRechargeTotal"
					:d-voucher-total="shopVoucherAcount.duihuanRechargeTotal" @success="getVoucherData()"
				></VoucherShopTransfer>
			</view>
			<view class="operation-btn" style="padding-top: 18rpx;">
				<tui-button
					type="primary" :size="36" width="280rpx" height="78rpx"
					margin="0"
					@click="go('/pages/index/voucher-zone')"
				>
					兑换商品
				</tui-button>
			</view>
		</view>

		<view
			style="position: fixed;left: 0;bottom: 0;width: 100%;padding: 10rpx 32rpx 44rpx;font-size: 24rpx;background-color: #ffffff;box-sizing: border-box;"
		>
			<view
				style="width: 60%;margin: 0 auto;display: flex;justify-content: space-between;align-items: stretch;font-size: #222229;"
			>
				<view>使用规则</view>
				<view style="width: 2rpx;background-color: #D8D8D8;"></view>
				<view>常见问题</view>
				<view style="width: 2rpx;background-color: #D8D8D8;"></view>
				<view @click="$store.dispatch('app/getCustomerServiceAction', { isToService: true })">联系客服</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 28rpx;color: #888889;">
				<view style="flex: 1;height: 2rpx;background-color: #D8D8D8;"></view>
				<view style="margin: 0 14rpx">本服务由广东团蜂生活服务有限公司提供</view>
				<view style="flex: 1;height: 2rpx;background-color: #D8D8D8;"></view>
			</view>
		</view>

		<tui-modal :show="isShowTipsModal" custom fadein :button="[]" width="78%" @cancel="isShowTipsModal = false">
			<view v-if="showTipsType === '1'">
				<view style="font-weight: bold;text-align: center;">充值代金券说明</view>
				<view style="margin-top: 40rpx;">充值代金券为您通过充值所获得的代金券金额</view>
				<view style="margin-top: 34rpx;">使用渠道：可在【商城】-【兑换专区】中进行兑换礼品</view>
				<view class="operation-btn" style="margin-top: 34rpx;text-align: center;">
					<tui-button
						type="warning" :size="30" width="182rpx" height="60rpx"
						margin="0"
						@click="isShowTipsModal = false"
					>
						好的
					</tui-button>
				</view>
			</view>
			<view v-else-if="showTipsType === '2'">
				<view style="font-weight: bold;text-align: center;">兑换代金券说明</view>
				<view style="margin-top: 30rpx;">兑换代金券为通过平台消费所获得的代金券，其中包括消费社区服务、商圈商家商品及商城的商品。 以及好友转赠给您的代金券</view>
				<view style="margin-top: 40rpx;">使用渠道：可在【商城】-【兑换专区】中进行兑换礼品</view>
				<view class="operation-btn" style="margin-top: 36rpx;text-align: center;">
					<tui-button
						type="warning" :size="30" width="182rpx" height="60rpx"
						margin="0"
						@click="isShowTipsModal = false"
					>
						好的
					</tui-button>
				</view>
			</view>
		</tui-modal>

	</view>
</template>

<script>
import VoucherChoose from './components/VoucherChoose.vue'
import VoucherRecharge from './components/VoucherRecharge.vue'
import VoucherTransfer from './components/VoucherTransfer.vue'
import VoucherShopTransfer from './components/VoucherShopTransfer.vue'
import { getByUserOrderVoucherOrderApi, getBuyerTotalVoucherEntryRecordApi, getShopRechargeTotalVoucherApi, getShopExchangeTotalVoucherApi } from '../../../api/anotherTFInterface'

export default {
	name: 'VoucherOperation',
	components: { VoucherChoose, VoucherRecharge, VoucherTransfer, VoucherShopTransfer },
	data() {
		return {
			// 选择的代金券种类
			voucherChooseInfo: {
				platformVoucherId: '',
				purchaseRatio: ''
			},
			// 账户数据
			roleDropdownShow: false,
			roleDropdownName: '用户',
			roleType: '1',
			isFirstLoading: true,
			userVoucherAcount: {
				chongzhiRechargeTotal: 0,
				duihuanRechargeTotal: 0
			},
			shopVoucherAcount: {
				chongzhiRechargeTotal: 0,
				duihuanRechargeTotal: 0
			},
			// 提示弹框展示
			isShowTipsModal: false,
			showTipsType: ''
		}
	},
	onShow() {
		this.handelInitData()
	},
	methods: {
		async handelInitData(flag) {
			if (flag) {
				if (this.voucherChooseInfo.platformVoucherId) {
					if (this.isFirstLoading && await this.$store.dispatch('auth/unifiedProcessingShopAction', { isShowModal: false })) {
						this.roleDropdownName = '商家'
						this.roleType = '2'
					}
					this.getVoucherData()
				} else {
					this.userVoucherAcount = { chongzhiRechargeTotal: 0, duihuanRechargeTotal: 0 }
					this.shopVoucherAcount = { chongzhiRechargeTotal: 0, duihuanRechargeTotal: 0 }
				}
			} else if (!this.isFirstLoading) {
				if (this.voucherChooseInfo.platformVoucherId) {
					this.getVoucherData()
				} else {
					this.userVoucherAcount = { chongzhiRechargeTotal: 0, duihuanRechargeTotal: 0 }
					this.shopVoucherAcount = { chongzhiRechargeTotal: 0, duihuanRechargeTotal: 0 }
				}
			}
		},
		getVoucherData() {
			if (this.roleType === '1') {
				this.getUserVoucherData()
			} else if (this.roleType === '2') {
				this.getShopVoucherData()
			}
		},
		getUserVoucherData() {
			uni.showLoading()
			getByUserOrderVoucherOrderApi({})
				.then((res) => {
					this.userVoucherAcount.chongzhiRechargeTotal = Number(res.data)
					this.isFirstLoading = false
					uni.hideLoading()
				})
				.catch((e) => {
					this.isFirstLoading = false
					uni.hideLoading()
				})
			getBuyerTotalVoucherEntryRecordApi({})
				.then((res) => {
					this.userVoucherAcount.duihuanRechargeTotal = Number(res.data.rechargeTotal)
					this.isFirstLoading = false
					uni.hideLoading()
				})
				.catch((e) => {
					this.isFirstLoading = false
					uni.hideLoading()
				})
		},
		getShopVoucherData() {
			uni.showLoading()
			getShopRechargeTotalVoucherApi({})
				.then((res) => {
					this.shopVoucherAcount.chongzhiRechargeTotal = Number(res.data)
					this.isFirstLoading = false
					uni.hideLoading()
				})
				.catch((e) => {
					this.isFirstLoading = false
					uni.hideLoading()
				})
			getShopExchangeTotalVoucherApi({})
				.then((res) => {
					this.shopVoucherAcount.duihuanRechargeTotal = Number(res.data)
					this.isFirstLoading = false
					uni.hideLoading()
				})
				.catch((e) => {
					this.isFirstLoading = false
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.voucher-operation-container {
	min-height: 100vh;
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: 2rpx;
	}

	.top-btn {
		/deep/ .tui-btn {
			border-radius: 10rpx;
			background-color: #f26e34 !important;
		}
	}

	.operation-btn {
		/deep/ .tui-btn {
			display: inline-block;
			border-radius: 10rpx;
		}

		/deep/ .tui-btn-warning {
			background-color: #ef530e !important;
		}

		/deep/ .tui-btn-primary {
			background-color: #258cf4 !important;
		}
	}
}
</style>
