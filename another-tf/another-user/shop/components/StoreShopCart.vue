<template>
	<view>
		<view>
			<tui-drawer
				mode="bottom" :visible="visibleDrawer" :mask-z-index="996" :z-index="998"
				@close="visibleDrawer = false"
			>
				<view style="padding-bottom: 102upx;">
					<view style="padding: 20upx 0;display: flex;align-items: center;justify-content: space-between;">
						<BeeIcon
							name="arrowleft" :size="34" color="#222229"
							style="width: fit-content;padding: 1upx;margin-left: 30upx;border: 1upx solid #eeeeee;border-radius: 50%;line-height: 1;z-index: 1;"
							@click="visibleDrawer = false"
						>
						</BeeIcon>
						<text style="flex: 1;margin-left: -104upx;text-align: center;font-size: 38upx;font-weight: bold;">商家购物车</text>
					</view>
					<ATFShopCartList
						ref="refATFShopCartList" type="single" :shop-id="brandId" is-sub-delete
						@update-msg="handleUpdateMoneyAndNum"
					></ATFShopCartList>
				</view>
			</tui-drawer>
		</view>
		<view
			style="position: fixed;bottom: 0;z-index: 999;width: 100%;padding: 20upx;background-color: #ffffff;box-sizing: border-box;"
		>
			<view
				style="display: flex;justify-content: flex-end;align-items: flex-end;font-size: 28upx;"
				@click="visibleDrawer = !visibleDrawer"
			>
				<view
					style="position: absolute;left: 46upx;bottom: 26upx;padding: 28upx;background-color: #ff973f;border-radius: 50%;"
				>
					<tui-icon name="cart" :size="56" unit="upx" color="#fbfbfb"></tui-icon>
				</view>
				<text style="color: #949494;padding-right: 12upx;">共{{ cartMsgObj.allNum }}件</text>
				<text>合计：</text>
				<text style="padding-right: 20upx;font-weight: bold;font-size: 42upx;color: #ff1111;">
					￥{{ cartMsgObj.checkMoney }}
				</text>
				<view>
					<tui-button
						type="danger" width="180rpx" height="58rpx" style="border-radius: 50rpx;"
						:size="28" @click="handleSettlementTap()"
					>
						立即结算
					</tui-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	getSettlementOrderApi
} from '../../../../api/anotherTFInterface'
import { T_SKU_ITEM_MSG_LIST } from '../../../../constant'

export default {
	name: 'StoreShopCart',
	components: {},
	props: {
		brandId: {
			type: Number,
			required: true
		}
	},

	data() {
		return {
			visibleDrawer: false,

			cartMsgObj: {
				allNum: 0,
				checkNum: 0,
				checkMoney: 0,
				isAllCheck: false
			}
		}
	},

	mounted() {
	},

	methods: {
		async handleUpdateMoneyAndNum(cartData) {
			uni.showLoading()
			let allNumber = 0
			let checkNumber = 0
			let isAllCheck = true
			const addCartSelectedList = []
			for (let i = 0; i < cartData.length; i++) {
				const shopCurrentObj = cartData[i]
				const shopObj = { shopId: cartData[i].shopId, skus: [] }
				for (let j = 0; j < shopCurrentObj.skus.length; j++) {
					const good = cartData[i].skus[j]
					allNumber += good.number
					if (good.selected === 1) {
						shopObj.skus.push({ ifLogistics: good.ifLogistics, number: good.number, selected: good.selected, skuId: good.skuId })
						checkNumber += good.number
					} else if (isAllCheck) {
						isAllCheck = false
					}
				}
				if (shopObj.skus.length > 0) addCartSelectedList.push(shopObj)
			}
			try {
				const res = await getSettlementOrderApi({
					type: 2,
					shopId: this.brandId, // '购物车结算'的'商家购物车结算'对应的商家
					shops: addCartSelectedList,
					voucherTotalAll: 0,
					isVoucher: false,
					voucherId: 0
				})
				const money = res.data.shops.reduce((previousValue, currentValue) => previousValue + currentValue.total, 0) // 根据选中的购物车数据获取价格
				this.cartMsgObj.checkMoney = money.toFixed(2)
				this.cartMsgObj.isAllCheck = isAllCheck
				this.cartMsgObj.allNum = allNumber
				this.cartMsgObj.checkNum = checkNumber
			} finally {
				uni.hideLoading()
			}
		},

		// 去结算
		handleSettlementTap() {
			if (this.$refs.refATFShopCartList) {
				const shopCartList = this.$refs.refATFShopCartList.getShopCartListData()
				if (this.cartMsgObj.checkNum) {
					const addCartSelectedList = []
					for (let i = 0; i < shopCartList.length; i++) {
						const shopObj = { shopId: shopCartList[i].shopId, skus: [] }
						for (let j = 0; j < shopCartList[i].skus.length; j++) {
							const theCurrentSku = shopCartList[i].skus[j]
							if (theCurrentSku.selected) shopObj.skus.push({ ifLogistics: theCurrentSku.ifLogistics, number: theCurrentSku.number, selected: theCurrentSku.selected, skuId: theCurrentSku.skuId })
						}
						if (shopObj.skus.length > 0) addCartSelectedList.push(shopObj)
					}
					uni.setStorageSync(T_SKU_ITEM_MSG_LIST, addCartSelectedList)
					this.go(`/another-tf/another-serve/paymentOrderConfirm/index?type=2&brandId=${this.brandId}`)
				} else {
					this.$showToast('请先勾选商品')
				}
			} else {
				this.$showToast('获取购物车数据失败')
			}
		}
	}
}
</script>

<style lang="less" scoped>

/deep/ .tui-drawer-container {
		height: 100vh !important;
	}
</style>
