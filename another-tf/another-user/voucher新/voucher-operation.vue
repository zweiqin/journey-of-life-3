<template>
	<view class="voucher-operation-container">
		<JHeader title="代金券" width="50" height="50"></JHeader>
		<VoucherChoose padding="20rpx 0 0" @change="(e) => (voucherChooseInfo = e) && getVoucherData()"></VoucherChoose>
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
					<view class="top-btn" style="text-align: right;">
						<tui-button
							type="white" plain link :size="36"
							width="184rpx" height="68rpx" margin="0"
							@click="go('/another-tf/another-user/voucher/voucher-record')"
						>
							收支明细
						</tui-button>
					</view>
					<view style="margin-top: -32rpx;">
						<view
							style="padding: 6rpx 22rpx 12rpx;margin: 0 auto;width: fit-content;font-size: 76rpx;color: #ef530e;background-color: #ffffff;border-radius: 12rpx;"
						>
							券
						</view>
						<view style="margin-top: 44rpx;font-size: 28rpx">总代金券</view>
						<view style="margin-top: 36rpx;font-size: 64rpx">
							￥{{ Number.parseFloat(voucherAcount.chongzhiRechargeTotal + voucherAcount.duihuanRechargeTotal).toFixed(2) }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view
			style="display: flex;justify-content: space-evenly;align-items: stretch;flex-wrap: wrap;padding-top: 42rpx;text-align: center;"
		>
			<view style="margin-top: 30rpx;">
				<view
					style="display: flex;align-items: center;justify-content: center;"
					@click="(isShowTipsModal = true) && (showTipsType = '1')"
				>
					<text>充值代金券</text>
					<tui-icon name="explain" color="#3D3D3D" size="26" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
				</view>
				<view style="margin-top: 20rpx;font-size: 50rpx;font-weight: bold;">
					￥{{ typeof voucherAcount.chongzhiRechargeTotal === 'number'
						? Number.parseFloat(Number(voucherAcount.chongzhiRechargeTotal)).toFixed(2)
						: '--' }}
				</view>
			</view>
			<view style="margin: 40rpx 0 10rpx;width: 2rpx;background-color: #979797;"></view>
			<view style="margin-top: 30rpx;">
				<view
					style="display: flex;align-items: center;justify-content: center;"
					@click="(isShowTipsModal = true) && (showTipsType = '2')"
				>
					<text>兑换代金券</text>
					<tui-icon name="explain" color="#3D3D3D" size="26" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
				</view>
				<view style="margin-top: 20rpx;font-size: 50rpx;font-weight: bold;">
					￥{{ typeof voucherAcount.duihuanRechargeTotal === 'number'
						? Number.parseFloat(Number(voucherAcount.duihuanRechargeTotal)).toFixed(2)
						: '--' }}
				</view>
			</view>
		</view>

		<view
			class="operation-btn"
			style="display: flex;flex-direction: column;align-items: center;margin-top: 100rpx;padding-bottom: 148rpx;"
		>
			<view style="padding-top: 60rpx;">
				<tui-button
					v-if="$store.state.auth.identityInfo.type.includes(13) || $store.state.auth.identityInfo.type.includes(14) || $store.state.auth.identityInfo.type.includes(15)"
					type="warning" :size="36" width="280rpx" height="78rpx"
					margin="0"
					@click="(isShowVoucherPopup = true) && (showType = 'recharge')"
				>
					充值
				</tui-button>
			</view>
			<view style="padding-top: 18rpx;">
				<tui-button
					type="gray" :size="36" width="280rpx" height="78rpx"
					margin="0"
					@click="(isShowVoucherPopup = true) && (showType = 'transfer')"
				>
					转赠
				</tui-button>
			</view>
			<view style="padding-top: 18rpx;">
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

		<tui-bottom-popup
			:z-index="993" :mask-z-index="992" :show="isShowVoucherPopup"
			@close="(isShowVoucherPopup = false) || (showType = '')"
		>
			<view style="padding: 26rpx 20rpx;">
				<view style="position: relative;padding: 0 36rpx;color: #222229;text-align: center;">
					<text v-if="showType === 'recharge'">代金券充值</text>
					<text v-else-if="showType === 'transfer'">代金券转赠</text>
					<view style="position: absolute;top: -14rpx;right: -16rpx;">
						<tui-icon
							name="close" color="#767676" size="46" unit="rpx"
							@click="(isShowVoucherPopup = false) || (showType = '')"
						></tui-icon>
					</view>
				</view>
				<view v-if="showType === 'transfer'" style="padding: 0 36rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 0 12rpx;">
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
				<view v-if="showType === 'recharge'" style="padding: 0 36rpx;">
					<view
						style="display: flex;align-items: center;flex-wrap: wrap;margin: 0 -12rpx;padding: 12rpx 0 0;text-align: center;"
					>
						<view
							v-for="(item, index) in rechargeAmountsList" :key="index"
							style="position: relative;width: 192rpx;margin: 16rpx 12rpx 0;padding: 48rpx 0;background-color: #f4f4f4;border-radius: 20rpx;"
							:style="{ border: currentRechargeIndex === index ? '2rpx solid #ef520e' : '2rpx solid #f4f4f4' }"
							@click="handleClickCurrentRecharge(item, index)"
						>
							<view>
								<view
									style="font-size: 42rpx;font-weight: bold;"
									:style="{ color: currentRechargeIndex === index ? '#ef520e' : '#222229' }"
								>
									{{ item.number }}
								</view>
								<view
									v-if="voucherChooseInfo.purchaseRatio"
									style="margin-top: 20rpx;font-size: 28rpx;"
									:style="{ color: currentRechargeIndex === index ? '#222229' : '#888889' }"
								>
									售价{{ item.number / voucherChooseInfo.purchaseRatio || '' }}
								</view>
							</view>
							<view
								v-if="currentRechargeIndex === index"
								style="position: absolute;right: 0;bottom: 0;padding: 2rpx;border-radius: 60% 0 14rpx;background-color: #ef520e;overflow: hidden;"
							>
								<tui-icon name="check" color="#FFFFFF" size="34" unit="rpx"></tui-icon>
							</view>
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<view style="color: #222229;">自定义代金券：</view>
						<view style="border-bottom: 2upx solid #bebebe;">
							<tui-input
								v-model="customRecharge" type="number" label="券" :label-size="48"
								label-color="#000000"
								:label-width="80" placeholder="输入自定义代金券" :border-bottom="false" padding="18rpx 2rpx 10rpx"
								placeholder-style="color: #979797;font-size: 30rpx;" @focus="handleSelectRechargeCustom"
							>
								<template #right>
									<text
										v-if="voucherChooseInfo.purchaseRatio"
										style="font-size: 30rpx;color: #979797;"
									>
										售价{{ customRecharge / voucherChooseInfo.purchaseRatio || '' }}
									</text>
								</template>
							</tui-input>
						</view>
					</view>
					<view style="padding: 32rpx 0 38rpx;text-align: center;">
						<tui-button
							type="warning" width="100%" height="84rpx" margin="0"
							style="display: inline-block;background: linear-gradient(287deg, #EF530E 31%, #F77A42 104%)!important;border-radius: 16rpx;box-shadow: 0px 2px 2px 0px #FA6842,0px 5px 20px 0px rgba(250, 104, 66, 0.8);"
							@click="handleShowModal"
						>
							立即充值
						</tui-button>
					</view>
				</view>
				<view v-else-if="showType === 'transfer'" style="padding: 0 36rpx;">
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
									{{ item.voucherNum }}
								</view>
								<view
									v-if="voucherChooseInfo.purchaseRatio"
									style="margin-top: 20rpx;font-size: 28rpx;"
									:style="{ color: currentTransferIndex === index ? '#222229' : '#888889' }"
								>
									价值{{ item.voucherNum / voucherChooseInfo.purchaseRatio || '' }}
								</view>
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
						<view style="border-bottom: 2upx solid #bebebe;">
							<tui-input
								v-model="customTransfer" type="number" label="券" :label-size="48"
								label-color="#000000"
								:label-width="80" placeholder="输入自定义代金券" :border-bottom="false" padding="18rpx 2rpx 10rpx"
								placeholder-style="color: #979797;font-size: 30rpx;" @focus="handleSelectTransferCustom"
								@input="handleSelectTransferCustom"
							>
								<template #right>
									<text v-if="voucherChooseInfo.purchaseRatio" style="font-size: 30rpx;color: #979797;">
										价值{{ customTransfer / voucherChooseInfo.purchaseRatio || '' }}
									</text>
								</template>
							</tui-input>
						</view>
					</view>
					<view style="margin-top: 42rpx;color: #222229;">
						<view class="search-btn" style="display: flex;align-items: center;">
							<text style="font-size: 28rpx;">转赠账号</text>
							<view style="flex: 1;margin-left: 16rpx;">
								<tui-input
									v-model="userQueryForm.value" placeholder="请输入用户ID / 手机号" is-fillet
									padding="6rpx 10rpx 6rpx 26rpx" background-color="transparent" :size="42"
									placeholder-style="color: #979797;font-size: 30rpx;"
								>
									<template #right>
										<tui-button
											type="danger" :size="28" width="80rpx" height="40rpx"
											shape="circle"
											@click="getTransferUserInfo"
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
									:src="common.seamingImgUrl(transferForm.buyerUserObj.headImage) || require('../../../static/images/new-user/default-user-avatar.png')"
								>
								</image>
								<text style="margin-left: 36rpx;font-size: 42rpx;">
									{{ transferForm.buyerUserObj.nickName ||
										transferForm.buyerUserObj.wechatName || transferForm.buyerUserObj.phone }}
								</text>
							</view>
							<view v-else style="height: 84rpx;"></view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="font-size: 28rpx">转赠代金券</view>
							<view style="margin-left: 20rpx;font-size: 42rpx">{{ transferForm.voucherNum || '--' }}</view>
						</view>
						<view style="font-size: 28rpx;text-align: right;">
							可用代金券：
							<text v-if="transferForm.voucherType === '1'">{{ voucherAcount.chongzhiRechargeTotal }}</text>
							<text v-else-if="transferForm.voucherType === '2'">{{ voucherAcount.duihuanRechargeTotal }}</text>
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

		<tui-modal
			:show="isShowVoucherModal" custom fadein :button="[]"
			:z-index="995" :mask-z-index="994"
			@cancel="isShowVoucherModal = false"
		>
			<view v-if="showType === 'recharge'" style="padding: 28rpx 0;text-align: center;">
				<view>
					<image style="width: 435rpx;height: 337rpx;" src="../../../static/images/common/modal-show.png"></image>
				</view>
				<view style="margin-top: 24rpx;font-size: 40rpx;color: #333333;">
					<text>
						确定要充值 {{ rechargeForm.number }} 代金券吗？
					</text>
				</view>
				<view style="margin-top: 22rpx;font-size: 36rpx;color: #687383;">
					<text>
						共需支付 {{ rechargeForm.number / 2 }} 元
					</text>
				</view>
				<view>
					<tui-button
						type="warning" width="238rpx" height="108rpx" margin="32rpx 0 0"
						:size="40" shape="circle"
						style="display: inline-block;background: #ef530e!important;box-shadow: 0px 12px 20px 0px #f1ac8e;"
						@click="showPayTypePopup = true"
					>
						确定
					</tui-button>
				</view>
			</view>
			<view v-else-if="showType === 'transfer'" style="padding: 28rpx 0;text-align: center;">
				<view>
					<image style="width: 435rpx;height: 337rpx;" src="../../../static/images/common/modal-show.png"></image>
				</view>
				<view style="margin-top: 24rpx;font-size: 40rpx;color: #333333;">
					<text>
						确定要转赠 {{ transferForm.voucherNum }} 代金券吗？
					</text>
				</view>
				<view
					v-if="voucherChooseInfo.purchaseRatio"
					style="margin-top: 22rpx;font-size: 36rpx;color: #687383;"
				>
					价值 {{ transferForm.voucherNum / voucherChooseInfo.purchaseRatio }} 元
				</view>
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
		<tui-bottom-popup :show="showPayTypePopup" @close="showPayTypePopup = false">
			<view v-if="showPayTypePopup" style="padding: 60upx 0 128upx;">
				<CashierList
					:price-pay="rechargeForm.number / 2" show :show-commission-pay="!!rechargeForm.number"
					:show-platform-pay="!!rechargeForm.number" :hui-shi-bao-pay="!!rechargeForm.number"
					@change="(e) => payInfo = e"
				/>
				<tui-button
					type="warning" width="168upx" height="64upx" margin="30upx auto 0"
					shape="circle"
					@click="handleRecharge"
				>
					确认支付
				</tui-button>
			</view>
		</tui-bottom-popup>

	</view>
</template>

<script>
import VoucherChoose from './components/VoucherChoose.vue'
import { getByUserOrderVoucherOrderApi, getBuyerTotalVoucherEntryRecordApi, submitBuyerVoucherOrderApi, updateTransferVoucherOrderApi, updateByUserVoucherEntryRecordApi, getBandUserInfoApi } from '../../../api/anotherTFInterface'
import { handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'VoucherOperation',
	components: { VoucherChoose },
	data() {
		return {
			// 选择的代金券种类
			voucherChooseInfo: {
				platformVoucherId: '',
				purchaseRatio: ''
			},
			// 账户数据
			voucherAcount: {
				chongzhiRechargeTotal: 0,
				duihuanRechargeTotal: 0
			},
			// 提示弹框展示
			isShowTipsModal: false,
			showTipsType: '',
			isShowVoucherPopup: false,
			isShowVoucherModal: false,
			showType: '', // recharge，transfer
			// 充值
			rechargeAmountsList: [
				{ number: 50 },
				{ number: 100 },
				{ number: 200 },
				{ number: 1000 },
				{ number: 2000 }
			],
			currentRechargeIndex: 0,
			customRecharge: '',
			rechargeForm: {
				voucherId: '',
				number: 50,
				payGrade: ''
			},
			showPayTypePopup: false,
			payInfo: {},
			// 转赠
			transferAmountsList: [
				{ voucherNum: 50 },
				{ voucherNum: 100 },
				{ voucherNum: 200 },
				{ voucherNum: 1000 },
				{ voucherNum: 2000 }
			],
			currentTransferIndex: 0,
			customTransfer: '',
			transferForm: {
				voucherType: '1', // 后端无需
				buyerUserObj: { // 后端无需
					buyerUserId: ''
				},
				voucherId: '',
				buyerUserId: '',
				voucherNum: 50
			},
			userQueryForm: {
				value: '',
				type: ''
			}
		}
	},
	onShow() {
		if (this.voucherChooseInfo.platformVoucherId) {
			this.getVoucherData()
		} else {
			this.voucherAcount = { chongzhiRechargeTotal: 0, duihuanRechargeTotal: 0 }
		}
	},
	methods: {
		getVoucherData() {
			uni.showLoading()
			getByUserOrderVoucherOrderApi({})
				.then((res) => {
					this.voucherAcount.chongzhiRechargeTotal = Number(res.data.rechargeTotal)
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
			getBuyerTotalVoucherEntryRecordApi({}).then((res) => {
				this.voucherAcount.duihuanRechargeTotal = Number(res.data.rechargeTotal)
			})
		},
		handleClickCurrentRecharge(item, index) {
			this.customRecharge = ''
			this.currentRechargeIndex = index
			this.rechargeForm.number = item.number
		},
		handleSelectRechargeCustom() {
			this.currentRechargeIndex = ''
			this.rechargeForm.number = this.customRecharge
		},
		handleClickCurrentTransfer(item, index) {
			this.customTransfer = ''
			this.currentTransferIndex = index
			this.transferForm.voucherNum = item.voucherNum
		},
		handleSelectTransferCustom() {
			this.currentTransferIndex = ''
			this.transferForm.voucherNum = this.customTransfer
		},
		getTransferUserInfo() {
			if (!this.userQueryForm.value) return this.$showToast('缺少查询条件')
			const regExp = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
			if (regExp.exec(this.userQueryForm.value)) { // 手机号
				this.userQueryForm.type = 2
			} else {
				this.userQueryForm.type = 1
			}
			uni.showLoading()
			getBandUserInfoApi(this.userQueryForm)
				.then((res) => {
					uni.hideLoading()
					if (!res.data.buyerUserId) {
						this.transferForm.buyerUserObj = {}
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
			if (this.showType === 'recharge') {
				if (this.voucherChooseInfo.platformVoucherId) {
					this.rechargeForm.voucherId = this.voucherChooseInfo.platformVoucherId
				} else {
					return this.$showToast('缺少代金券种类')
				}
				if (typeof this.currentRechargeIndex === 'number') {
					if (!this.rechargeForm.number) return this.$showToast('缺少代金券数量')
				} else {
					if (Number(this.customRecharge) < 1) return this.$showToast('充值代金券数量不能少于1')
					this.rechargeForm.number = this.customRecharge
				}
				this.isShowVoucherModal = true
			} else if (this.showType === 'transfer') {
				if (this.voucherChooseInfo.platformVoucherId) {
					this.transferForm.voucherId = this.voucherChooseInfo.platformVoucherId
				} else {
					return this.$showToast('缺少代金券种类')
				}
				if (!this.transferForm.voucherType) return this.$showToast('缺少转赠类型')
				if (!this.transferForm.buyerUserObj.buyerUserId) return this.$showToast('缺少赠送对象')
				if (typeof this.currentTransferIndex === 'number') {
					if (!this.transferForm.voucherNum) return this.$showToast('缺少代金券数量')
				} else {
					if (Number(this.customTransfer) < 0.1) return this.$showToast('转赠代金券数量不能少于0.1')
					this.transferForm.voucherNum = this.customTransfer
				}
				this.isShowVoucherModal = true
			}
		},

		handleRecharge() {
			uni.showLoading()
			this.rechargeForm.payGrade = this.rechargeForm.number / this.voucherChooseInfo.purchaseRatio
			submitBuyerVoucherOrderApi({ ...this.rechargeForm })
				.then(async (res) => {
					await handleDoPay({ ...res.data, ...this.payInfo }, 4, '')
					uni.hideLoading()
					this.isShowVoucherModal = false
					this.isShowVoucherPopup = false
					this.showType = ''
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleTransfer() {
			uni.showLoading()
			let _url
			if (this.transferForm.voucherType === '1') {
				_url = updateTransferVoucherOrderApi
			} else if (this.transferForm.voucherType === '2') {
				_url = updateByUserVoucherEntryRecordApi
			}
			this.transferForm.buyerUserId = this.transferForm.buyerUserObj.buyerUserId
			_url({ ...this.transferForm })
				.then((res) => {
					uni.hideLoading()
					this.$showToast('转赠成功')
					setTimeout(() => {
						this.isShowVoucherModal = false
						this.isShowVoucherPopup = false
						this.showType = ''
						this.getVoucherData()
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
.voucher-operation-container {
	min-height: 100vh;
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.top-btn {
		/deep/ .tui-btn {
			display: inline-block;
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

		/deep/ .tui-btn-gray {
			background-color: #979797 !important;
		}

		/deep/ .tui-btn-primary {
			background-color: #258cf4 !important;
		}
	}

	.search-btn {
		/deep/ .tui-btn {
			display: inline-block;
			background-color: #ff502a !important;
		}
	}
}
</style>
