<template>
	<view>
		<view>
			<tui-drawer
				mode="bottom" :visible="visibleDrawer" :mask-z-index="996" :z-index="998"
				@close="visibleDrawer = false"
			>
				<view class="shop-car-container" style="padding-top: 0;">

					<view class="shop-list" style="max-height: 60vh;overflow-y: auto;">
						<view v-for="store in shopCarList" :key="store.id" class="shop-car-list">
							<view class="shop-card-name">
								<JIcon class="icon" width="30" height="30" type="full-store"></JIcon>
								{{ store.brandName }}
							</view>

							<view class="shop-goods-list">
								<view v-for="(item, index) in store.cartList" :key="item.productId" class="goods-item">
									<JIcon
										v-show="opStatus === 'EDIT'" class="icon"
										:type="item.checked ? 'active-choose' : 'active-default'"
										@click="handleChangeGoodsStatus(item, index, store)"
									></JIcon>

									<ShopCarGoods ref="refShopCarGoods" :goods="item" :store="store" @success="getShopList"></ShopCarGoods>

								</view>
							</view>
						</view>

						<view v-if="shopCarList && !shopCarList.length && loadingStatus !== 'loading'" class="no-data">
							暂无商品，快去添加吧~
						</view>
					</view>

				</view>
			</tui-drawer>
		</view>
		<view
			style="position: fixed;bottom: 0;z-index: 2;width: 100%;padding: 20upx;background-color: #ffffff;box-sizing: border-box;"
		>
			<view
				style="display: flex;justify-content: flex-end;align-items: flex-end;font-size: 28upx;"
				@click="visibleDrawer = !visibleDrawer"
			>
				<view
					style="position: absolute;left: 46upx;bottom: 26upx;padding: 28upx;background-color: #ff973f;border-radius: 50%;"
				>
					<BeeIcon :src="require('../../../static/brand/detail/spCar.png')" :size="28"></BeeIcon>
				</view>
				<text style="color: #949494;padding-right: 20upx;">共{{ carTotalInfo.goodsCount }}件</text>
				<text>合计：</text>
				<text style="padding-right: 20upx;font-weight: bold;font-size: 46upx;color: #ff1111;">￥{{ totalPrice }}</text>
				<view>
					<tui-button
						type="danger" width="180rpx" height="58rpx" style="border-radius: 50rpx;"
						@click="handleToPay()"
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
	changeShopCarStatusApi
} from '../../../api/cart'
import { getShopCarApi } from '../../../api/goods'
import { getUserId, fomartNumber } from '../../../utils'
import { J_TWO_PAY_GOODS } from '../../../constant'

const EDIT = 'EDIT'

export default {
	name: 'StoreShopCart',
	components: {},

	filters: {
		getDesc(specifications) {
			if (!specifications || !specifications.length) {
				return ''
			}
			let str = ''
			for (const item of specifications) {
				str += item + ' '
			}
			return str
		}
	},

	props: {
		brandId: {
			type: [String, Number],
			required: true
		},
		brandName: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			visibleDrawer: false,

			opStatus: EDIT,
			opList: [],
			shopCarList: [],
			carTotalInfo: {
				checkedGoodsAmount: '',
				checkedGoodsCount: '',
				goodsAmount: '',
				goodsCount: '',
				tabMallNum: '',
				tabStoreNum: ''
			},
			loadingStatus: 'noMore',
			isChangeNumber: false,
			opGoodsList: [],
			isBack: '0',
			currentTab: 1
		}
	},

	computed: {
		totalPrice() {
			let price = 0
			for (const shop of this.shopCarList) {
				for (const item of shop.cartList) {
					if (item.checked) {
						price += item.number * item.price
					}
				}
			}
			return fomartNumber(price)
		}
	},

	created() {
		this.getShopList()
	},

	methods: {
		// 改变商品勾选状态
		handleChangeGoodsStatus(goods, index, store) {
			changeShopCarStatusApi({
				userId: getUserId(),
				productIds: [ goods.productId ],
				isChecked: goods.checked ? 0 : 1,
				brandId: store.brandId
			}).then(() => {
				store.cartList[index].checked = !store.cartList[index].checked
			})
		},

		// 获取购物车列表
		getShopList() {
			this.loadingStatus = 'loading'
			getShopCarApi({
				userId: getUserId(),
				brandId: this.brandId,
				type: 1
			})
				.then(({ data }) => {
					this.shopCarList = [ { brandId: this.brandId, brandName: this.brandName, cartList: data.cartList } ]
					this.carTotalInfo.checkedGoodsAmount = data.cartTotal.checkedGoodsAmount
					this.carTotalInfo.checkedGoodsCount = data.cartTotal.checkedGoodsCount
					this.carTotalInfo.goodsAmount = data.cartTotal.goodsAmount
					this.carTotalInfo.goodsCount = data.cartTotal.goodsCount
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
		},

		// 去结算
		handleToPay() {
			uni.showLoading()
			const op = []
			for (const item of this.shopCarList) {
				if (item.cartList.filter((item) => item.checked).length) {
					op.push({
						brandId: item.brandId,
						brandName: item.brandName,
						brandCartgoods: item.cartList.filter((item) => item.checked)
					})
				}
			}
			// if (op.filter((item) => item.brandCartgoods && item.brandCartgoods.length).length > 1) {
			// 	return this.$showToast('只能选择一家店铺的商品')
			// }
			if (op.length < 1) {
				return this.$showToast('请先选择商品')
			}
			if (this.currentTab === 2) {
				if (op.find((item) => item.brandId === 1001079)) {
					return this.$showToast('无法预约巨蜂自营的商品')
				}
			}
			uni.setStorageSync(J_TWO_PAY_GOODS, {
				cardsInfo: op,
				pay: this.totalPrice
			})
			uni.hideLoading()
			uni.navigateTo({
				url: `/user/sever/pay-shop-card?orderType=${this.currentTab}`
			})
		}
	}
}
</script>

<style lang="less" scoped>
.shop-car-container {
	padding: 72upx 32upx;
	padding-bottom: 130upx;
	box-sizing: border-box;

	.icon {
		width: 34upx;
		height: 34upx;
		flex-shrink: 0;
		margin-right: 24upx;
	}

	.shop-list {

		.shop-car-list {
			margin-bottom: 20px;
		}

		.shop-card-name {
			font-size: 24upx;
			padding: 20upx 0;
			margin-top: 30upx;
			font-weight: bold;
			border-bottom: 1upx solid #cdcdcd;
			display: flex;
			align-items: center;

			.icon {
				margin-right: 10upx
			}
		}

		.goods-item {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			margin-top: 30upx;

		}

		.no-data {
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 180upx;
			color: #999999;
			font-size: 36upx;
			letter-spacing: 2px;
		}
	}
}
</style>
