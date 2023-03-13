<template>
	<view class="shop-car-header" v-if="shopCarInfo">
		<view class="all-check">
			<tui-icon @click="handleChangeAllGoodsStatus" v-show="currentMode === ON_EDIT" :color="isAllCheck ? '#FFC117' : ''"
				:size="25" :name="isAllCheck ? 'circle-fill' : 'circle'"></tui-icon>
			<text v-show="isAllCheck && currentMode === ON_EDIT">全选</text>
			<!-- <text v-if="!isAllCheck && currentMode === ON_EDIT">已选({{ shopCarInfo.cartTotal.checkedGoodsCount }})</text> -->
			<text v-if="!isAllCheck && currentMode === ON_EDIT">全选</text>
			<text v-if="currentMode === ON_CONFIRM">已选({{ deleteList.length }})</text>
		</view>
		<view class="money" v-show="currentMode === ON_EDIT">
			<view class="total">合计：
				<text class="text1">￥</text>
				<text class="text2">{{ shopCarInfo.cartTotal.checkedGoodsAmount }}</text>
			</view>
			<view class="discount">优惠:
				<text class="text3">￥</text>
				<text class="text4">0</text>
			</view>
		</view>
		<view v-show="currentMode === ON_EDIT" class="info-wrapper">

			<button @click="handleToPay" class="uni-btn" :style="{
				background: shopCarInfo.cartTotal.checkedGoodsCount
					? '#FFCB05'
					: '#777',
			}">
				去结算
			</button>
		</view>

		<view v-show="currentMode === ON_CONFIRM" class="info-wrapper">
			<button @click="handleDelete" :style="{ background: deleteList.length ? 'red' : '#777' }" class="uni-btn delete">
				删除
			</button>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { ON_EDIT, ON_CONFIRM } from '../../../../store/modules/shopCar'
export default {
	data() {
		return {
			ON_EDIT,
			ON_CONFIRM,
		}
	},
	methods: {
		handleToPay() {
			if (!this.shopCarInfo.cartTotal.checkedGoodsCount) {
				uni.showToast({
					title: '请选择要下单的商品',
					icon: 'none',
				})
				return
			}

			uni.navigateTo({ url: '/user/sever/shopCar/order' })
		},

		// 点击删除
		handleDelete() {
			if (!this.deleteList.length) {
				uni.showToast({
					title: '请选择要删除的商品',
					icon: 'none',
				})
				return
			}

			this.$store.dispatch('shopCar/deleteSelectedGoods')
		},

		// 点击全选购物车商品
		handleChangeAllGoodsStatus() {
			console.log(this.shopCarInfo.brandCartgoods)

			if (!this.shopCarInfo.brandCartgoods.length) {
				uni.showToast({
					title: '购物车没有商品',
					icon: 'none',
				})
				return
			}

			const productIds = this.shopCarInfo.brandCartgoods.map(item => {
				return item.cartList
					.map(item => {
						if (item.checked === this.isAllCheck) {
							return item.productId
						} else {
							return undefined
						}
					})
					.filter(item => !!item)
			})

			this.$store.dispatch('shopCar/changeGoodsStatus', {
				isChecked: !this.isAllCheck ? 1 : 0,
				productIds: productIds.flat(Infinity),
			})
		},
	},
	computed: {
		...mapGetters(['currentMode', 'shopCarInfo', 'deleteList']),
		isAllCheck() {
			if (
				!this.shopCarInfo ||
				!this.shopCarInfo.cartTotal ||
				!this.shopCarInfo.cartTotal.checkedGoodsCount
			) {
				return false
			}

			return (
				this.shopCarInfo.cartTotal.goodsCount ===
				this.shopCarInfo.cartTotal.checkedGoodsCount
			)
		},

		isAllDelete() {
			return this.shopCarInfo.cartTotal.goodsCount === this.deleteList.length
		},
	},
}
</script>

<style lang="less" scoped>
@import '../../../../style/mixin.less';

.shop-car-header {
	width: 100%;
	height: 120upx;
	padding: 0 32upx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #FFFFFF;
	border-radius: 24upx 24upx 0upx 0upx;
	.all-ch {
		.h-flex();
	}

	.money {
		padding-left: 32upx;

		.total {
			font-size: 28upx;
			color: #605D52;

			.text1 {
				font-size: 26upx;
				font-weight: bold;
				color: #FC4023;
			}

			.text2 {
				color: #FC4023;
				font-size: 42upx;
				font-weight: bold;
			}
		}

		.discount {
			font-size: 24upx;
			color: #B3B2AD;

			.text3 {
				padding-left: 30upx;
			}

			.text4 {}
		}
	}

	.info-wrapper {
		.h-flex();



		.uni-btn {
			padding: 20upx 60upx;
			border-radius: 100upx;
			margin-left: 30upx;
			color: #fff;
			background: linear-gradient(to right, #ed374d, #fa793f);

			&.delete {
				background: #f40;
			}
		}
	}

	.all-check {
		.h-flex();

		text {
			color: #777;
			margin-left: 20upx;
		}
	}
}
</style>
