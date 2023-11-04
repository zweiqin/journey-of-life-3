<template>
	<view class="warp">
		<!-- #ifdef MP-WEIXIN -->
		<send-coupon
			v-if="cParams" :send_coupon_params="cParams.send_coupon_params" :sign="cParams.sign"
			:send_coupon_merchant="cParams.send_coupon_merchant" @sendcoupon="sendcoupon" @userconfirm="userconfirm"
		>
			<slot></slot>
		</send-coupon>
		<view v-else @click.stop="receiveCoupon">
			<slot></slot>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view @click.stop="receiveCoupon">
			<slot></slot>
		</view>
		<!-- #endif -->

		<!-- 优惠券领取 -->
		<tui-modal :show="confirmVisible" :custom="true" :fadein="true">
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					是否领取此优惠券
				</view>
				<view class="flex-display flex-sp-between">
					<view class="btn" @click="confirmVisible = false">
						取消
					</view>
					<view class="btn submit" @click="receive">
						确定
					</view>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { updateCouponBuildParam4PlugApi, updateCreditExchangeCouponApi, addTakeBatchCouponApi } from '../../api/anotherTFInterface'

export default {
	name: 'WXSendCoupon',
	props: {
		couponList: {
			type: Array,
			default: () => []
		},
		isExchange: {
			type: Boolean,
			default: false
		}
		// 卡券无法加询问
		// isConfirm: {
		//     type: Boolean,
		//     default: false
		// }
	},
	data() {
		return {
			cParams: '',
			confirmVisible: false,
			successList: []
		}
	},
	mounted() {
		// console.log(this.couponList,'couponList')
		const ids = []
		this.couponList.forEach((item) => {
			if (item.cardId) {
				ids.push(item.cardId)
			}
			// else {
			//                 this.successList.push(item)
			//             }
			// 解除app h5不能领券问题
			this.successList.push(item)
		})
		// console.log(this.successList,'successList')
		// #ifdef MP-WEIXIN
		if (ids && ids.length > 0) {
			this.buildParam4Plug(ids)
		}
		// #endif
	},
	methods: {
		// 获取微信卡券参数
		buildParam4Plug(ids) {
			updateCouponBuildParam4PlugApi(ids).then((res) => {
				this.cParams = res.data
			})
		},
		// 领取优惠券
		receiveCoupon() {
			if (this.successList.length > 0) {
				if (this.isExchange) {
					// 积分兑换
					const paramsData = {
						couponId: this.couponList[0].couponId,
						source: 3
					}
					updateCreditExchangeCouponApi(paramsData).then((res) => {
						this.$emit('success')
					})
				} else if (this.couponList.length === 1 && this.couponList[0].ifCredit) {
					// 单个积分兑换的卡券去积分中心兑
					uni.navigateTo({
						url: `/another-tf/another-serve/exchangeDetail/index?data=${JSON.stringify(this.couponList[0])}`
					})
				} else {
					const params = []
					this.successList.forEach((item) => {
						params.push({
							couponId: item.couponId,
							couponCode: item.couponCode,
							source: 1
						})
					})
					// 领取优惠卷
					addTakeBatchCouponApi(params).then((res) => {
						if (res.code === '200') {
							uni.showToast({
								title: '领取成功'
							})
							this.$emit('success')
							if (!this.cParams) {
								this.$emit('closeAd')
							}
						}
					})
						.catch((res) => {
							if (res.data.code !== '200') {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
							}
						})
				}
			} else {
				this.$emit('closeAd')
			}
		},
		// 领取优惠券回调
		sendcoupon(e) {
			const errcode = e.detail.errcode; const resultList = e.detail.send_coupon_result
			switch (errcode) {
				case 'OK':
					break
				case 'PARAM_ERROR':
					console.error('参数错误，请开发者查看msg中具体的错误信息并进行修复处理')
					break
				case 'USER_NOT_EXISTS':
					console.error('登录态获取失效')
					break
				case 'USER_GET_FAILED':
					console.error('登录态获取失败')
					break
				case 'SIGN_ERROR':
					console.error('签名错误')
					break
				case 'SYSTEMERROR':
					console.error('发券超时')
					break
				case 'FREQUENCY_LIMITED':
					console.error('发券频率过高')
					break
			}
			if (errcode === 'OK') {
				resultList.forEach((item) => {
					let cName = ''
					this.couponList.forEach((citem) => {
						if (item.stock_id === citem.cardId) {
							cName = citem.activityName
							if (item.code === 'SUCCESS') {
								citem.couponCode = item.coupon_code
								this.successList.push(citem)
							}
						}
					})
					switch (item.code) {
						case 'FAILED':
							console.error('该张券发券失败，查看message中的具体错误信息')
							break
						case 'NOTENOUGH':
							uni.showToast({
								title: cName + '优惠券已被领取完',
								icon: 'none'
							})
							console.error('总预算用完')
							break
						case 'DAYLIMIT':
							uni.showToast({
								title: cName + '优惠券领取张数已达到上限',
								icon: 'none'
							})
							console.error('用户达到单天限领')
							break
						case 'NATURELIMIT':
							uni.showToast({
								title: cName + '优惠券领取张数已达到上限',
								icon: 'none'
							})
							console.error('用户自然人限领')
							break
						case 'MAXQUOTA':
							uni.showToast({
								title: cName + '优惠券领取张数已达到上限',
								icon: 'none'
							})
							console.error('用户领取张数达到上限')
							break
						case 'DUPREQUEST':
							uni.showToast({
								title: cName + '优惠券领取张数已达到上限',
								icon: 'none'
							})
							console.error('已通过该发券凭证给用户发券')
							break
						case 'NOTRUNNING':
							console.error('批次状态非运营中')
							break
						case 'EXPIRED':
							uni.showToast({
								title: cName + '优惠券已过期',
								icon: 'none'
							})
							console.error('该批次已过期')
							break
						case 'NOTMONEY':
							console.error('账户余额不足')
							break
						case 'USERLIMIT':
							console.error('用户已超限领额度')
							break
						case 'FREQUENCYLIMIT':
							console.error('超过频率限制')
							break
					}
				})
				this.receiveCoupon()
			} else {
				this.$emit('closeAd')
			}
		},
		// 用户确认领券事件
		userconfirm(e) {
			this.$emit('closeAd')
		}
	}
}
</script>
