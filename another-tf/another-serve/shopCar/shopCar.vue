<template>
	<view class="content">
		<BeeBack style="padding: 10upx 0;">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<BeeIcon name="arrowleft" :size="34" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40upx;text-align: center;">购物车</text>
			</view>
		</BeeBack>
		<!-- 骨架屏 -->
		<tui-skeleton
			v-if="loadingSkeleton" skeleton-bg-color="#efefef" background-color="#fff"
			:is-loading="loadingSkeleton" active
		></tui-skeleton>
		<!-- 购物车 -->
		<view class="tui-skeleton">
			<view v-if="cartMsgObj.allNum" class="cart-bg tui-skeleton-fillet">
				<view class="cart-num-box">
					<view>
						<text class="num-box tui-skeleton-fillet">
							共<text class="num">{{ cartMsgObj.allNum }}</text>件宝贝
						</text>
					</view>
					<text v-if="!showManage" class="btn-box " @click="showManage = !showManage">
						管理
					</text>
					<text v-if="showManage" class="btn-box" @click="showManage = !showManage">
						完成
					</text>
				</view>
			</view>

			<ATFShopCartList ref="refATFShopCartList" is-to-shop @update-msg="handleUpdateMoneyAndNum">
				<!-- 购物车为空 -->
				<template #empty>
					<view style="padding-bottom: 45upx;">
						<tui-no-data :fixed="false" style="padding-top: 60upx;">
							<view>
								<view>你的购物车还没有宝贝哦</view>
								<view style="margin-top: 20rpx;">快去首页选一个吧～</view>
								<view style="margin-top: 20rpx;">
									<tui-button
										type="black" width="280rpx" height="96rpx"
										margin="0 auto" @click="$switchTab('/pages/index/index')"
									>
										选择
									</tui-button>
								</view>
							</view>
						</tui-no-data>
					</view>
				</template>
			</ATFShopCartList>

			<view class="cart-bottom-box">
				<view class="cart-bottom">
					<view class="left">
						<tui-icon
							v-if="cartMsgObj.isAllCheck" name="circle-fill" :size="40" unit="upx"
							color="#c5aa7b"
							margin="40upx" @click="$refs.refATFShopCartList && $refs.refATFShopCartList.handleSelectAll(0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="upx"
							color="#cccccc" margin="40upx"
							@click="$refs.refATFShopCartList && $refs.refATFShopCartList.handleSelectAll(1)"
						></tui-icon>
						<text>全选</text>
					</view>
					<view v-if="!showManage" class="right">
						<view class="price-box">
							<text>合计：</text>
							<text class="price">¥{{ cartMsgObj.checkMoney }}</text>
						</view>
						<view class="btn-confirm" @click="handleSettlementTap">
							结算（{{ cartMsgObj.checkNum }}）
						</view>
					</view>
					<view v-if="showManage" class="right">
						<view class="btn-delete" @click="handleOpenDelete">
							删除
						</view>
					</view>
				</view>
			</view>

			<!-- 热门推荐 -->
			<!-- <ATFHoteRecommed class="tui-skeleton-fillet"></ATFHoteRecommed> -->

			<!-- 删除确认弹窗 -->
			<DeleteModal :show-tip.sync="showDeleteModal" @confirm="handleDoDelete"></DeleteModal>
		</view>
	</view>
</template>

<script>
import DeleteModal from './components/DeleteModal'
import { T_SKU_ITEM_MSG_LIST } from '../../../constant'
import {
	getSettlementOrderApi
} from '../../../api/anotherTFInterface'

export default {
	name: 'ShopCar',
	components: {
		DeleteModal
	},
	data() {
		return {
			loadingSkeleton: false, // 是否在加载
			showManage: false, // 是否开启管理
			showDeleteModal: false, // 是否展示删除
			// 底部结算条对象
			cartMsgObj: {
				allNum: 0, // 所有sku数量（头部）
				checkNum: 0, // 选中sku的数量
				checkMoney: 0, // 选中sku的总价
				isAllCheck: false // 是否宣布选中
			}
		}
	},
	onShow() {
		if (this.$refs.refATFShopCartList) {
			this.loadingSkeleton = true
			this.$refs.refATFShopCartList.getShopCartData('all', () => {
				this.loadingSkeleton = false
			})
		}
	},
	methods: {

		/**
		 * 更新总价和总数（底部结算栏，头部总数）
		 * @return {Promise<void>}
		 */

		async handleUpdateMoneyAndNum(cartData) {
			uni.showLoading()
			let allNumber = 0 // 根据选中的购物车数据获取购物车数量
			let checkNumber = 0
			let isAllCheck = true
			const addCartSelectedList = [] // 用于结算购物车的post数据
			for (let i = 0; i < cartData.length; i++) { // 遍历店铺，获取选中的sku组装数据
				const shopCurrentObj = cartData[i] // 当前店铺
				const shopObj = { shopId: cartData[i].shopId, skus: [] }
				for (let j = 0; j < shopCurrentObj.skus.length; j++) { // 遍历店铺内部的商品
					const good = cartData[i].skus[j]
					allNumber += good.number
					if (good.selected === 1) {
						shopObj.skus.push({ ifLogistics: good.ifLogistics, number: good.number, selected: good.selected, skuId: good.skuId }) // 如果是选中的才往当前店铺塞
						checkNumber += good.number
					} else if (isAllCheck) {
						isAllCheck = false // 如果商品没有选中，但是又勾选了全选
					}
				}
				if (shopObj.skus.length > 0) addCartSelectedList.push(shopObj) // 过滤掉sku为空的店铺
			}
			try {
				const res = await getSettlementOrderApi({
					type: 2,
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

		// 打开删除弹窗
		handleOpenDelete() {
			if (!this.cartMsgObj.checkNum) {
				return uni.showToast({
					title: '请先选择对应商品',
					icon: 'none'
				})
			}
			this.showDeleteModal = true
		},
		handleDoDelete() {
			this.$refs.refATFShopCartList
				? this.$refs.refATFShopCartList.handleDeleteCartSelected(() => { this.showDeleteModal = false })
				: this.$showToast('获取购物车数据失败')
		},

		/**
		 * 结算购物车
		 * @return {Promise<void>}
		 */

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
					this.go('/another-tf/another-serve/paymentOrderConfirm/index?type=2')
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

<style lang="scss" scoped>
.content {
	box-sizing: border-box;
	padding-bottom: 120upx;

	.cart-bg {
		width: 100%;
		background-color: #fff;

		.cart-num-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.num-box {
				padding: 30rpx 0 30rpx 30rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				color: #C5CACF;
			}

			image {
				width: 286rpx;
				height: 72rpx;
			}

			.btn-box {
				font-size: 30rpx;
				color: #333333;
				padding: 30rpx;
				box-sizing: border-box;
				display: inline-block;
			}
		}

	}

	.emptyCart-box {
		margin: 100rpx 0;

		.emptyCart-img {
			width: 216rpx;
			height: 156rpx;
		}

		.goToShopping {
			width: 282rpx;
			height: 84rpx;
			line-height: 84rpx;
			text-align: center;
			background: #333333;
			margin-top: 40rpx;
			color: #FFEBC4;
			font-size: 28rpx;
		}
	}

	.cart-bottom-box {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		z-index: 99;
	}

	.cart-bottom {
		height: 120rpx;
		background: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #eee;
	}

	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 28rpx;
		color: #666;
	}

	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;

		.price-box {
			font-size: 30rpx;
			color: #333;

			.price {
				font-size: 40rpx;
				color: #C83732;
				font-weight: bold;
			}
		}

		.btn-confirm {
			width: 232rpx;
			height: 120rpx;
			background: #333333;
			margin-left: 18rpx;
			text-align: center;
			line-height: 120rpx;
			font-size: 28rpx;
			color: #FFEBC4;
		}

		.btn-delete {
			width: 232rpx;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			font-size: 28rpx;
			color: #FFFFFF;
			background: #C83732;
		}
	}
}
</style>
