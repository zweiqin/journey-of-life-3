<template>
	<view class="voucher-transfer-container" :style="{ margin }">
		<view class="operation-btn">
			<tui-button type="brown" :size="36" width="280rpx" height="78rpx" margin="0 auto" @click="isShowPopup = true">
				商家转赠
			</tui-button>
		</view>

		<tui-bottom-popup :z-index="993" :mask-z-index="992" :show="isShowPopup" @close="isShowPopup = false">
			<view style="padding: 26rpx 20rpx;">
				<view style="position: relative;padding: 0 36rpx;color: #222229;text-align: center;">
					<text>代金券转赠</text>
					<view style="position: absolute;top: -14rpx;right: -16rpx;">
						<tui-icon name="close" color="#767676" size="46" unit="rpx" @click="isShowPopup = false"></tui-icon>
					</view>
				</view>
				<view style="padding: 0 36rpx;">
					<!-- <view style="display: flex;justify-content: space-between;align-items: center;padding: 8rpx 0;">
						<text style="font-size: 28rpx;">请选择转赠对象</text>
						<view style="flex: 1;">
						<tui-radio-group
						:value="transferForm.voucherTarget"
						@change="(e) => transferForm.voucherTarget = e.detail.value"
						>
						<view style="display: flex;flex-wrap: wrap;align-items: center;">
						<tui-label
						v-for="(item, index) in [{ name: '用户', value: '1' }, { name: '商家', value: '2' }]"
						:key="index"
						>
						<tui-list-cell padding="6rpx 16rpx">
						<view>
						<tui-radio
						:checked="transferForm.voucherTarget === item.value" :value="item.value"
						color="#07c160" border-color="#999"
						>
						</tui-radio>
						<text>{{ item.name }}</text>
						</view>
						</tui-list-cell>
						</tui-label>
						</view>
						</tui-radio-group>
						</view>
						</view> -->
					<view style="display: flex;justify-content: space-between;align-items: center;padding: 8rpx 0;">
						<text style="font-size: 28rpx;">请选择转赠类型</text>
						<view style="flex: 1;">
							<tui-radio-group
								:value="transferForm.voucherType"
								@change="(e) => transferForm.voucherType = e.detail.value"
							>
								<view style="display: flex;flex-wrap: wrap;align-items: center;">
									<tui-label
										v-for="(item, index) in [{ name: '充值代金券', value: '1' }, { name: '兑换代金券', value: '2' }]"
										:key="index"
									>
										<tui-list-cell padding="6rpx 16rpx">
											<view>
												<tui-radio
													:checked="transferForm.voucherType === item.value" :value="item.value"
													color="#07c160" border-color="#999"
												>
												</tui-radio>
												<text>{{ item.name }}</text>
											</view>
										</tui-list-cell>
									</tui-label>
								</view>
							</tui-radio-group>
						</view>
					</view>
				</view>
				<view style="padding: 0 36rpx;">
					<view
						style="display: flex;align-items: center;flex-wrap: wrap;margin: 0 -12rpx;padding: 12rpx 0 0;text-align: center;"
					>
						<view
							v-for="(item, index) in transferAmountsList" :key="index"
							style="position: relative;width: 192rpx;margin: 16rpx 12rpx 0;padding: 48rpx 0;background-color: #f4f4f4;border-radius: 20rpx;"
							:style="{ border: currentTransferIndex === index ? '2rpx solid #ef520e' : '2rpx solid #f4f4f4' }"
							@click="handleClickCurrentTransfer(item, index)"
						>
							<view>
								<view
									style="font-size: 42rpx;font-weight: bold;"
									:style="{ color: currentTransferIndex === index ? '#ef520e' : '#222229' }"
								>
									{{ item.value }}
								</view>
								<!-- <view
									v-if="purchaseRatio" style="margin-top: 20rpx;font-size: 28rpx;"
									:style="{ color: currentTransferIndex === index ? '#222229' : '#888889' }"
									>
									价值{{ item.value / purchaseRatio || '' }}
									</view> -->
							</view>
							<view
								v-if="currentTransferIndex === index"
								style="position: absolute;right: 0;bottom: 0;padding: 2rpx;border-radius: 60% 0 14rpx;background-color: #ef520e;overflow: hidden;"
							>
								<tui-icon name="check" color="#FFFFFF" size="34" unit="rpx"></tui-icon>
							</view>
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<view style="color: #222229;">自定义代金券：</view>
						<view style="border-bottom: 2rpx solid #bebebe;">
							<tui-input
								v-model="customTransfer" type="number" label="券" :label-size="48"
								label-color="#000000"
								:label-width="80" placeholder="输入自定义代金券" :border-bottom="false" padding="18rpx 2rpx 10rpx"
								placeholder-style="color: #979797;font-size: 30rpx;" @focus="handleSelectTransferCustom"
								@input="handleSelectTransferCustom"
							>
								<!-- <template #right>
									<text v-if="purchaseRatio" style="font-size: 30rpx;color: #979797;">
									价值{{ customTransfer / purchaseRatio || '' }}
									</text>
									</template> -->
							</tui-input>
						</view>
					</view>
					<view style="margin-top: 42rpx;color: #222229;">
						<view v-if="transferForm.voucherTarget === '1'">
							<view class="search-btn" style="display: flex;align-items: center;">
								<text style="font-size: 28rpx;">转赠账号</text>
								<view style="flex: 1;margin-left: 16rpx;">
									<tui-input
										v-model="transferForm.phone" placeholder="请输入用户手机号" is-fillet
										padding="6rpx 10rpx 6rpx 26rpx" background-color="transparent" :size="42"
										placeholder-style="color: #979797;font-size: 30rpx;"
									>
										<template #right>
											<tui-button
												v-if="transferForm.voucherTarget === '1'" type="danger" :size="28" width="80rpx"
												height="40rpx" shape="circle" @click="getTransferUserInfo"
											>
												查询
											</tui-button>
										</template>
									</tui-input>
								</view>
							</view>
							<view>
								<view
									v-if="transferForm.buyerUserObj.buyerUserId"
									style="display: flex;align-items: center;padding: 2rpx 34rpx 0;"
								>
									<image
										style="width: 80rpx;height: 80rpx;border-radius: 50%;"
										:src="common.seamingImgUrl(transferForm.buyerUserObj.headImage) || require('../../../../static/images/new-user/default-user-avatar.png')"
									>
									</image>
									<text style="margin-left: 36rpx;font-size: 42rpx;">
										{{ transferForm.buyerUserObj.nickName ||
											transferForm.buyerUserObj.wechatName || transferForm.buyerUserObj.phone }}
									</text>
								</view>
								<view v-else style="height: 84rpx;"></view>
							</view>
						</view>
						<view v-else-if="transferForm.voucherTarget === '2'" style="margin-bottom: 56rpx;">
							<view style="display: flex;align-items: center;">
								<text style="font-size: 28rpx;">商家手机号</text>
								<view style="flex: 1;margin-left: 16rpx;">
									<tui-input
										v-model="transferForm.phone" placeholder="请输入商家手机号" is-fillet
										padding="6rpx 10rpx 6rpx 26rpx" background-color="transparent" :size="42"
										placeholder-style="color: #979797;font-size: 30rpx;"
									></tui-input>
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="font-size: 28rpx">转赠代金券</view>
							<view style="margin-left: 20rpx;font-size: 42rpx">{{ transferForm.value || '--' }}</view>
						</view>
						<view style="font-size: 28rpx;text-align: right;">
							可用代金券：
							<text v-if="transferForm.voucherType === '1'">{{ cVoucherTotal }}</text>
							<text v-else-if="transferForm.voucherType === '2'">{{ dVoucherTotal }}</text>
						</view>
					</view>
					<view style="padding: 32rpx 0 38rpx;text-align: center;">
						<tui-button
							type="warning" width="100%" height="84rpx" margin="0"
							style="display: inline-block;background: linear-gradient(287deg, #EF530E 31%, #F77A42 104%)!important;border-radius: 16rpx;box-shadow: 0px 2px 2px 0px #FA6842,0px 5px 20px 0px rgba(250, 104, 66, 0.8);"
							@click="handleShowModal"
						>
							立即转赠
						</tui-button>
					</view>
				</view>
			</view>
		</tui-bottom-popup>

		<tui-modal
			:show="isShowVoucherModal" custom fadein :button="[]"
			:z-index="995" :mask-z-index="994"
			@cancel="isShowVoucherModal = false"
		>
			<view style="padding: 28rpx 0;text-align: center;">
				<view>
					<image style="width: 435rpx;height: 337rpx;" src="../../../../static/images/common/modal-show.png"></image>
				</view>
				<view style="margin-top: 24rpx;font-size: 40rpx;color: #333333;">
					<text>
						确定要转赠 {{ transferForm.value }} 代金券吗？
					</text>
				</view>
				<!-- <view v-if="purchaseRatio" style="margin-top: 22rpx;font-size: 36rpx;color: #687383;">
					价值 {{ transferForm.value / purchaseRatio }} 元
					</view> -->
				<view>
					<tui-button
						type="warning" width="238rpx" height="108rpx" margin="32rpx 0 0"
						:size="40" shape="circle"
						style="display: inline-block;background: #ef530e!important;box-shadow: 0px 12px 20px 0px #f1ac8e;"
						@click="handleTransfer"
					>
						确定
					</tui-button>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { updateOrderShopToUserTransferApi, updateShopToUserTransferApi, getBandUserInfoApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'VoucherShopTransfer',
	props: {
		margin: {
			type: String,
			default: '0'
		},
		cVoucherTotal: {
			type: Number,
			default: 0
		},
		dVoucherTotal: {
			type: Number,
			default: 0
		},
		platformVoucherId: {
			type: [Number, String],
			default: ''
		},
		purchaseRatio: {
			type: [Number, String],
			default: ''
		}
	},
	data() {
		return {
			isShowPopup: false,
			isShowVoucherModal: false,
			// 转赠
			transferAmountsList: [
				{ value: 50 },
				{ value: 100 },
				{ value: 200 },
				{ value: 1000 },
				{ value: 2000 }
			],
			currentTransferIndex: 0,
			customTransfer: '',
			transferForm: {
				voucherTarget: '1', // 后端无需
				voucherType: '1', // 后端无需
				buyerUserObj: { // 后端无需
					buyerUserId: ''
				},
				voucherId: '',
				phone: '',
				value: 50
			},
			userQueryForm: {
				value: '',
				type: ''
			}
		}
	},

	methods: {
		handleClickCurrentTransfer(item, index) {
			this.customTransfer = ''
			this.currentTransferIndex = index
			this.transferForm.value = item.value
		},
		handleSelectTransferCustom() {
			this.currentTransferIndex = ''
			this.transferForm.value = this.customTransfer
		},
		getTransferUserInfo() {
			if (!this.transferForm.phone) return this.$showToast('缺少查询条件')
			const regExp = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
			if (regExp.exec(this.transferForm.phone)) { // 手机号
				this.userQueryForm.type = 2
			} else {
				return this.$showToast('请输入正确的手机号')
				// this.userQueryForm.type = 1
			}
			uni.showLoading()
			getBandUserInfoApi({ ...this.userQueryForm, value: this.transferForm.phone })
				.then((res) => {
					uni.hideLoading()
					if (!res.data.buyerUserId) {
						this.transferForm.buyerUserObj = { buyerUserId: '' }
						this.$showToast('该用户不存在')
					} else {
						this.transferForm.buyerUserObj = res.data
					}
				})
				.catch((e) => {
					this.transferForm.buyerUserObj = {}
					uni.hideLoading()
				})
		},
		handleShowModal() {
			if (this.platformVoucherId) {
				this.transferForm.voucherId = this.platformVoucherId
			} else {
				return this.$showToast('缺少代金券种类')
			}
			if (!this.transferForm.voucherTarget) return this.$showToast('缺少转赠对象')
			if (!this.transferForm.voucherType) return this.$showToast('缺少转赠类型')
			if (!this.transferForm.phone) return this.$showToast('缺少手机号')
			if (typeof this.currentTransferIndex === 'number') {
				if (!this.transferForm.value) return this.$showToast('缺少代金券数量')
			} else {
				if (Number(this.customTransfer) < 0.1) return this.$showToast('转赠代金券数量不能少于0.1')
				this.transferForm.value = this.customTransfer
			}
			this.isShowVoucherModal = true
		},

		handleTransfer() {
			uni.showLoading()
			let _url
			if (this.transferForm.voucherTarget === '1') {
				if (this.transferForm.voucherType === '1') {
					_url = updateOrderShopToUserTransferApi
				} else if (this.transferForm.voucherType === '2') {
					_url = updateShopToUserTransferApi
				}
			}
			_url({ ...this.transferForm })
				.then((res) => {
					uni.hideLoading()
					this.$showToast('转赠成功')
					setTimeout(() => {
						this.isShowVoucherModal = false
						this.isShowPopup = false
						this.$emit('success')
					}, 1500)
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.voucher-transfer-container {
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-btn {
			display: inline-block;
			background-color: #ff502a !important;
		}
	}

	.operation-btn {
		/deep/ .tui-btn {
			display: inline-block;
			border-radius: 10rpx;
		}

		/deep/ .tui-btn-gray {
			background-color: #979797 !important;
		}
	}
}
</style>
