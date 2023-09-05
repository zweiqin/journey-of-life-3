<template>
	<view class="delivery-install">
		<Header
			title="配送安装"
			redirect="/pages/community-center/community-center"
		></Header>
		<view class="person-info">
			<view class="icon">
				<view class="icon-item start">起</view>
				<view class="line"></view>
				<view class="icon-item end">终</view>
			</view>
			<view class="main-info">
				<view
					v-for="user in userInfo"
					:key="user.label"
					class="info-item"
					@click="handleCollect(user)"
				>
					<view class="left">
						<view class="main-title">{{ user.label }}</view>
						<view class="desc">
							{{
								user.key === "delivery"
									? deliveryStr || user.desc
									: consigneeStr || user.desc
							}}
						</view>
					</view>
					<view class="right">信息簿</view>
				</view>
			</view>
		</view>
		<view class="goods-info">
			<view
				v-for="item in goodsInfo"
				:key="item.label"
				class="item"
				@click="handleCollect(item)"
			>
				<view class="main-title" style="margin-right: 33upx">
					{{ item.label }}
				</view>
				<view
					v-if="item.route"
					class="placeholder"
					v-html="statisticsStr || item.placeholder"
				/>

				<view v-else class="placeholder" @click="handleSelect">
					<template v-if="item.field === 'installTime'">
						<DatetimePicker ref="datetimeRef" @confirm="handleSelectTime">
							<view :style="{ color: orderInfo.serveTime ? '#4395ff' : '' }">
								{{
									orderInfo.serveTime ? orderInfo.serveTime : "请选择安装时间"
								}}
							</view>
						</DatetimePicker>
					</template>

					<template v-if="item.field === 'deliveryType'">
						<picker
							:range="deliveryTypeList"
							style="width: 100%; height: 100%"
							@change="handleChooseDelivery"
						>
							<view style="color: #4395ff">
								{{ mapDeliveryTypeFilter(orderInfo.deliveryType) }}
							</view>
						</picker>
					</template>
				</view>
				<img
					src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8jef23u4szet1cnjuec5.png"
					alt=""
				/>
			</view>
		</view>

		<DRemarks v-model="totalRemarks"></DRemarks>

		<QuotedPrice
			v-if="orderPrice && orderPrice.sumPrice"
			:data="orderPrice"
			:distance-fee="distanceFee"
		></QuotedPrice>
		<Button :type="isOffer ? 'error' : ''" @click="handleNextStep">
			{{
				isOffer ? "报价中..." : "提交"
			}}
		</Button>
	</view>
</template>

<script>
import {
	getOrderOfferApi,
	getDistancePriceApi,
	createOrderPabApi,
	getOrderDetailApi
} from '../api/community-center'
import { getUserId, removeCache } from '../utils'
import DRemarks from './components/remarks'
import Button from './components/button.vue'
import DatetimePicker from '../components/datetime-picker/index.vue'
import QuotedPrice from './components/quoted-price.vue'
import Header from './components/header.vue'
import {
	deliveryTypeList,
	mapDeliveryTypeFilter,
	getOrderSetting
} from './config'

const deleteCache = [
	'DELIVERY_INFO',
	'CONSIGNEE_INFO',
	'ORDER_GOODS_LIST',
	'INSTALL_TIME',
	'DELIVERY_TYPE',
	'EDIT_DELVERY_INSTALL_ORDERDERNO',
	'DELIVERY_INSTALL_EDIT_ID'
]

export default {
	components: {
		DRemarks,
		Button,
		DatetimePicker,
		QuotedPrice,
		Header
	},
	data() {
		return {
			totalRemarks: '',
			installTimeVisiable: false,
			orderInfo: {
				deliveryInfo: {},
				consigneeInfo: {},
				orderDetailList: [],
				serveTime: '',
				deliveryType: 2
			},
			userInfo: [
				{
					label: '提货信息',
					desc: '点击填写提货信息',
					route: '/community-center/delivery',
					key: 'delivery'
				},
				{
					label: '收货信息',
					desc: '复制收件人完整信息,系统可自动识别地址',
					key: 'consignee',
					route: '/community-center/consignee'
				}
			],
			goodsInfo: [
				{
					label: '派送类型',
					placeholder: '请选择派送类型',
					type: 'select',
					field: 'deliveryType'
				},
				{
					label: '商品信息',
					placeholder: '请填写商品信息',
					route: '/community-center/goods'
				},
				{
					label: '安装日期',
					placeholder: '请选择安装日期',
					type: 'select',
					field: 'installTime'
				}
			],
			deliveryStr: '',
			consigneeStr: '',
			showDatePicker: false,
			deliveryTypeList,
			orderPrice: null,
			distanceFee: 0,
			isOffer: false,
			pickerVisible: false
		}
	},

	computed: {
		statisticsStr() {
			let totalPiece = 0
			let totalVolume = 0
			let totalWeight = 0
			if (this.orderInfo.orderDetailList.length) {
				for (const item of this.orderInfo.orderDetailList) {
					totalPiece += item.commodityNumber * 1
					totalVolume += item.volume * 1
					totalWeight += item.weight * 1
				}
			}

			return `
        <span style="color: #4395ff">${totalPiece} </span>套, 
        <span  style="color: #4395ff">${totalVolume} </span>方, 
        <span  style="color: #4395ff">${totalWeight} </span>kg
      `
		}
	},

	mounted() {
		console.log(this.$refs.datetimeRef[0].$children[0].visible)
		getOrderSetting('commodityType')
	},
	methods: {
		handleCollect(userRoute) {
			uni.navigateTo({
				url: userRoute.route
			})
		},

		// 点击遮罩层关闭
		handleCloseDatetimer() {
			this.showDatePicker = false
		},

		// 点击呼起选择
		handleSelect() {
			this.showDatePicker = true
		},

		// 点击确定选择时间
		handleSelectTime(time) {
			this.orderInfo.serveTime = time.value
			uni.setStorageSync('INSTALL_TIME', time.value)
		},

		// 选择派送类型
		handleChooseDelivery(data) {
			this.orderInfo.deliveryType = data.detail.value
			uni.setStorageSync('DELIVERY_TYPE', data.detail.value)
		},

		mapDeliveryTypeFilter,

		// 获取报价
		getOrderOffer() {
			const postDate = JSON.parse(JSON.stringify(this.orderInfo))
			if (
				!postDate.deliveryInfo.deliveryMobile ||
				!postDate.consigneeInfo.consigneeMobile ||
				!(
					postDate.orderDetailList[0] &&
					postDate.orderDetailList[0].categoryName
				)
			) {
				return
			}
			for (const item of postDate.orderDetailList) {
				item.goodsUrl = item.goodsUrl.join(',')
				item.volume = item.volume * 1
				item.weight = item.weight * 1
				item.quantity = item.quantity * 1
				item.commodityNumber = item.commodityNumber * 1
			}
			const data = {
				pricingType: 1,
				orderType: 1,
				deliveryType: postDate.deliveryType + 1,
				senderAddress: postDate.deliveryInfo.deliveryAddress,
				senderAddressDetail: postDate.deliveryInfo.deliveryAddressDetaile,
				consigneeAddress: postDate.consigneeInfo.consigneeAddress,
				consigneeAddressDetail: postDate.consigneeInfo.consigneeAddressDetail,
				isHasElevator: postDate.consigneeInfo.isElevator === '有' ? 1 : 0,
				consigneeFloor: postDate.consigneeInfo.floor * 1,
				orderGoodsList: postDate.orderDetailList
			}
			getOrderOfferApi(data).then((res) => {
				if (res.statusCode === 20000) {
					this.orderPrice = res.data
					this.getDistancePrice()
				} else {
					uni.showToast({
						title: '获取报价失败',
						duration: 2000,
						icon: 'none'
					})
				}
			})
		},

		// 获取超距费
		getDistancePrice() {
			const { deliveryAddress, deliveryAddressDetaile } =
				this.orderInfo.deliveryInfo
			const { consigneeAddress, consigneeAddressDetail } =
				this.orderInfo.consigneeInfo

			if (
				!deliveryAddress ||
				!deliveryAddressDetaile ||
				!consigneeAddress ||
				!consigneeAddressDetail
			) {
				return
			}

			this.isOffer = true
			const _this = this

			getDistancePriceApi({
				senderAddress: deliveryAddress,
				senderAddressDetail: deliveryAddressDetaile,
				consigneeAddress,
				consigneeAddressDetail
			}).then((res) => {
				_this.orderPrice.sumPrice = _this.orderPrice.sumPrice + res.data
				_this.orderPrice.vipPrice = _this.orderPrice.vipPrice + res.data
				_this.orderPrice.exceedDistancePrice = res.data
				_this.isOffer = false
			})
		},

		// 点击下一步
		handleNextStep() {
			const _this = this
			if (this.isOffer) {
				uni.showToast({
					title: '获取报价中...',
					icon: 'none'
				})
				return
			}

			if (!this.orderInfo.deliveryInfo.deliveryMobile) {
				uni.showToast({
					title: '请填写提货信息',
					icon: 'none'
				})
				return
			}

			if (!this.orderInfo.consigneeInfo.consigneeMobile) {
				uni.showToast({
					title: '请填写收货信息',
					icon: 'none'
				})
				return
			}

			// if (!this.orderInfo.serveTime) {
			//   uni.showToast({
			//     title: "请选择安装日期",
			//     icon: "none",
			//   });
			//   return;
			// }

			if (!this.orderInfo.orderDetailList.length) {
				uni.showToast({
					title: '请添加商品',
					duration: 2000,
					icon: 'none'
				})

				return
			}

			for (const item of this.orderInfo.orderDetailList) {
				item.goodsUrl = item.goodsUrl.length && item.goodsUrl.join(',')
				item.volume = item.volume * 1
				item.weight = item.weight * 1
				item.quantity = item.quantity * 1
				item.commodityNumber = item.commodityNumber * 1
			}

			const data = {
				id: uni.getStorageSync('DELIVERY_INSTALL_EDIT_ID'),
				orderType: 1,
				pricingType: 1,
				paymentMethod: 1,
				deliveryType: this.orderInfo.deliveryType * 1 + 1,
				price: this.orderPrice.sumPrice,
				actualPrice: this.orderPrice.vipPrice,
				orderPriceVo: this.orderPrice,
				senderName: this.orderInfo.deliveryInfo.deliveryName,
				senderMobile: this.orderInfo.deliveryInfo.deliveryMobile,
				senderAddress: this.orderInfo.deliveryInfo.deliveryAddress,
				senderAddressDetail: this.orderInfo.deliveryInfo.deliveryAddressDetaile,
				consigneeName: this.orderInfo.consigneeInfo.consigneeName,
				consigneeMobile: this.orderInfo.consigneeInfo.consigneeMobile,
				consigneeAddress: this.orderInfo.consigneeInfo.consigneeAddress,
				consigneeAddressDetail:
					this.orderInfo.consigneeInfo.consigneeAddressDetail,
				isHasElevator: this.orderInfo.consigneeInfo.isElevator === '有' ? 1 : 0,
				consigneeFloor: this.orderInfo.consigneeInfo.floor * 1,
				orderGoodsList: this.orderInfo.orderDetailList,
				remarks: this.totalRemarks,
				installDate: this.orderInfo.serveTime,
				userId: getUserId()
			}

			createOrderPabApi(data).then((res) => {
				if (res.statusCode === 20000) {
					const title = data.id ? '修改成功' : '提交成功'
					uni.showToast({
						title
					})

					removeCache(deleteCache)

					const url = data.id
						? '/community-center/order'
						: '/community-center/pay?price=' +
							_this.orderPrice.vipPrice +
							'&orderNo=' +
							res.data

					setTimeout(() => {
						uni.navigateTo({
							url
						})
					}, 1000)
				} else {
					uni.showToast({
						title: res.statusMsg,
						icon: 'none'
					})
				}
			})
		},

		/**
     * @description 获取详情
     */

		async getOrderDetail(orderNo) {
			const _this = this
			orderNo =
				orderNo || uni.getStorageSync('EDIT_DELVERY_INSTALL_ORDERDERNO')

			if (!orderNo) {
				return
			}

			try {
				const res = await getOrderDetailApi(orderNo)

				if (res.statusCode === 20000) {
					const baseInfo = res.data[0]
					console.log(baseInfo)
					const delivery = {
						deliveryName: baseInfo.senderName,
						deliveryMobile: baseInfo.senderMobile,
						deliveryAddress: baseInfo.senderAddress,
						deliveryAddressDetaile: baseInfo.senderAddressDetail
					}

					const consignee = {
						consigneeName: baseInfo.consigneeName,
						consigneeMobile: baseInfo.consigneeMobile,
						consigneeAddress: baseInfo.consigneeAddress,
						consigneeAddressDetail: baseInfo.consigneeAddressDetail,
						isElevator: baseInfo.isHasElevator,
						floor: baseInfo.consigneeFloor
					}

					const orderGoodsList = []
					console.log(1)
					for (const item of res.data) {
						const good = {
							goodsHostType: '家具',
							goodsType: item.goodsType,
							categoryName: item.categoryName,
							commodityNumber: item.commodityNumber,
							quantity: item.quantity,
							volume: item.volume,
							weight: item.weight,
							goodsUrl: item.goodsUrl ? item.goodsUrl.split(',') : []
						}

						orderGoodsList.push(good)
					}

					console.log(orderGoodsList)

					uni.setStorageSync('DELIVERY_INFO', JSON.stringify(delivery))
					uni.setStorageSync('CONSIGNEE_INFO', consignee)
					uni.setStorageSync(
						'INSTALL_TIME',
						baseInfo.installDate && baseInfo.installDate.split(' ')[0]
					)
					uni.setStorageSync(
						'ORDER_GOODS_LIST',
						JSON.stringify(orderGoodsList)
					)
					uni.setStorageSync('DELIVERY_INSTALL_EDIT_ID', baseInfo.id)
					_this.totalRemarks = baseInfo.remarks
					_this.setData()
				} else {
					uni.showToast({
						title: res.statusMsg,
						duration: 2000
					})
				}
			} catch (error) {}

			// SheQu1Request.laoa_huozhu_get(
			//   "/api/md/order/details",

			//   { orderNo },

			//   function (res) {
			//     console.log(res.data.data);
			//   },
			//   function () {}
			// );
		},

		/**
     * @description 获取缓存数据回填
     */

		setData() {
			// 提货信息
			const deliveryInfo = uni.getStorageSync('DELIVERY_INFO')
			if (deliveryInfo) {
				const data = JSON.parse(deliveryInfo)
				this.orderInfo.deliveryInfo = data
				this.deliveryStr =
					data.deliveryName +
					' ' +
					data.deliveryMobile +
					' ' +
					data.deliveryAddress +
					' ' +
					data.deliveryAddressDetaile
			}

			// 收货信息
			const consigneeInfo = uni.getStorageSync('CONSIGNEE_INFO')
			if (consigneeInfo) {
				this.orderInfo.consigneeInfo = consigneeInfo
				this.consigneeStr =
					consigneeInfo.consigneeName +
					' ' +
					consigneeInfo.consigneeMobile +
					' ' +
					consigneeInfo.consigneeAddress +
					' ' +
					consigneeInfo.consigneeAddressDetail
			}

			const orderDetailList = uni.getStorageSync('ORDER_GOODS_LIST')
			if (orderDetailList) {
				const data = JSON.parse(orderDetailList)
				this.orderInfo.orderDetailList = data
			}

			this.orderInfo.serveTime = uni.getStorageSync('INSTALL_TIME')

			const deliveryType = uni.getStorageSync('DELIVERY_TYPE') * 1
			if ([0, 1, 2].includes(deliveryType)) {
				this.orderInfo.deliveryType = deliveryType
			} else {
				this.orderInfo.deliveryType = 2
			}

			this.getOrderOffer()
		}
	},

	onShow() {
		this.setData()
	},

	onLoad(options) {
		uni.setStorageSync('EDIT_DELVERY_INSTALL_ORDERDERNO', options.orderNo)
		this.getOrderDetail()
	},

	onBackPress() {
		// if (this.$refs.datetimeRef[0].$children[0].visible) {
		//   this.$refs.datetimeRef[0].$children[0].visible = false;
		//   return false;
		// }
		// return true;
	}
}
</script>

<style lang="less" scoped>
.delivery-install {
  padding-bottom: 170upx;
  .main-title {
    color: #000;
    font-size: 30upx;
  }

  .person-info {
    display: flex;
    margin: 30upx 0 20upx 0;
    background-color: #fff;

    .icon {
      display: flex;
      flex-direction: column;
      padding: 48upx 30upx;

      .icon-item {
        width: 40upx;
        height: 40upx;
        border-radius: 6upx;
        font-size: 26upx;
        color: #fff;
        text-align: center;
        line-height: 40upx;

        &.start {
          background-color: #030303;
        }

        &.end {
          background-color: #d12e41;
        }
      }

      .line {
        flex: 1;
        height: 20upx;
        margin: 4upx 0;
        transform: translateX(50%);
        border-left: 3px dotted #111;
      }
    }

    .main-info {
      flex: 1;

      .info-item {
        display: flex;
        align-items: center;
        padding: 30upx 0;

        &:nth-child(n-1) {
          border-bottom: 1upx solid #dcdcdc;
        }

        .left {
          flex: 1;

          .desc {
            margin-right: 20upx;
            margin-top: 13upx;
            color: #999999;
            font-size: 26upx;
          }
        }

        .right {
          border-left: 1upx solid #e5e5e5;
          padding: 20upx 30upx;
          font-size: 26upx;
          color: #333;
        }
      }
    }
  }

  .goods-info {
    background-color: #fff;
    padding: 0 27upx;

    .item {
      display: flex;
      padding: 30upx 0;
      align-items: center;

      &:nth-child(n-1) {
        border-bottom: 1upx solid #dcdcdc;
      }

      .placeholder {
        flex: 1;
        color: #b2b2b2;
        font-size: 32upx;
      }

      img {
        width: 16upx;
        height: 25upx;
      }
    }
  }
}
</style>
