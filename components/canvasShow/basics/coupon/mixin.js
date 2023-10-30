import api from '../../config/api'
import { updateTakeCouponReceiveApi } from '../../../../api/anotherTFInterface'
import { funMixin } from '../../config/mixin'

export const commonMixin = {
	name: 'textComponent',
	mixins: [ funMixin ],
	data() {
		return {
			couponsData: []
		}
	},
	props: {
		terminal: {
			type: Number,
			default: 4
		},
		typeId: {
			type: Number,
			default: 1
		},
		shopId: {
			type: Number,
			default: 0
		},
		componentContent: {
			type: Object
		}
	},
	watch: {
		'componentContent': {
			handler(newVal, oldVal) {
				this.getData()
			},
			deep: true
		}
	},
	created() {
		this.getData()
	},
	methods: {
		getData() {
			const _ = this
			if (_.componentContent.selectedCoupon && _.componentContent.selectedCoupon.length > 0) {
				let _url = ''
				if (_.typeId === 1) {
					_url = `${api.getCoupons}?page=1&pageSize=99&ids=${_.componentContent.selectedCoupon}`
				} else if (_.typeId === 3) {
					_url = `${api.getShopCoupons}?page=1&pageSize=99&shopId=${_.shopId}&ids=${_.componentContent.selectedCoupon}`
				}
				const params = {
					method: 'GET',
					url: _url
				}
				this.sendReq(params, (res) => {
					_.couponsData = res.data.list
					if (_.typeId === 1) {
						_.couponsData.forEach((item) => {
							item.couponName = item.activityName
							item.effectiveStart = item.activityStartTime
							item.effectiveEnd = item.activityEndTime
						})
					}
					if (JSON.stringify(_.componentContent.couponList) !== JSON.stringify(_.couponsData)) {
						_.componentContent.couponList = _.couponsData
					}
				})
			} else {
				_.couponsData = []
			}
		},
		// 领取优惠券
		receiveCoupon(item) {
			var paramsData = {}
			if (this.typeId === 1) {
				paramsData.couponId = item.couponId
			} else if (this.typeId === 3) {
				paramsData.shopCouponId = item.shopCouponId
				paramsData.shopId = this.shopId
			}
			updateTakeCouponReceiveApi(paramsData).then((res) => {
				this.getData()
				uni.showToast({
					title: '领取成功',
					icon: 'success'
				})
			})
		}
	}
}
