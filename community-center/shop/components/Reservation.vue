<template>
	<view>
		<scroll-view refresher-background="#3f3d3d" :scroll-y="isOverflowY" style="max-height: 85vh;min-height: 400rpx;">
			<view class="orders-container">
				<!-- <view>
					<tui-button
					type="danger" style="margin: 0 auto;" bold shape="circle"
					width="60%" height="64rpx"
					@click="handleToReservation"
					>
					去预约
					</tui-button>
					</view> -->

				<view v-if="appointmentList && appointmentList.length" style="font-size: 30upx;">
					<view v-if="appointmentList && appointmentList.length" style="display: flex;box-sizing: border-box;">
						<view style="padding-bottom: 20upx;background-color: #f3f3f3;">
							<view
								v-for="item in appointmentList" :key="item.serverNameOne"
								style="max-width: 144upx;padding: 20upx 28upx;word-break: break-all;box-sizing: border-box;"
								:style="{ backgroundColor: item.id === currentTab ? '#ffffff' : 'transparent' }"
								@click="handleClickAppointment(item)"
							>
								{{ item.name }}
							</view>
						</view>
						<view style="flex: 1;padding: 20upx;">
							<view v-if="currentGoods && currentGoods.length">
								<view v-for="item in currentGoods" :key="item.id">
									<StoreGoods
										:goods-data="item" pic-height="210rpx" pic-mode="aspectFit"
										:show-icon="false" :show-tag="false"
										@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=2&goodsId=${e.id}`)"
									>
										<template #button>
											<tui-button
												type="warning" width="120rpx" height="50rpx" shape="circle"
												@click="$refs.refJSpecificationScreen.open(item.id)"
											>
												预约
											</tui-button>
										</template>
									</StoreGoods>
								</view>
							</view>
							<view v-else style="margin: 40upx 0;text-align: center;">
								暂无商品~
							</view>
						</view>
					</view>

					<uni-load-more
						v-if="loadingStatus !== 'hidden'" style="background: #fff"
						:status="loadingStatus"
					></uni-load-more>
				</view>

				<view v-if="loadingStatus === 'hidden' && !appointmentList.length" class="no-data f-center">
					<view>
						<text>商家暂无预约项目</text>
					</view>
					<BeeAvatar
						radius="0upx" :width="179" :height="156"
						:src="require('../../../static/images/index/design.png')"
					>
					</BeeAvatar>
				</view>
			</view>
		</scroll-view>

		<JSpecificationScreen ref="refJSpecificationScreen" show-select-btn btn-text="去预约" @select="handleReservation"></JSpecificationScreen>
	</view>
</template>

<script>
import { getBrandAppointmentCategoryApi, getBrandAppointmentSelectGoodsApi } from '../../../api/user'
import { J_RESERVATION_PAY_GOODS } from '../../../constant'
export default {
	name: 'Reservation',
	props: {
		brandDetail: {
			type: Object,
			default() {
				return {}
			}
		},
		isOverflowY: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			appointmentList: [],
			loadingStatus: 'loading',
			currentTab: '',
			currentGoods: []
		}
	},

	created() {
		this.getAppointmentList()
	},

	methods: {
		// handleToReservation() {
		// 	uni.showLoading()
		// 	getShopCarApi({
		// 		userId: getUserId(),
		// 		brandId: this.brandDetail.id,
		// 		type: 2
		// 	})
		// 		.then(({ data }) => {
		// 			console.log(data)
		// 			uni.hideLoading()
		// 			if (data.cartList && data.cartList.length) {
		// 				this.go(`/user/sever/shop-car?isBack=1&orderType=2`)
		// 			} else {
		// 				this.$showToast('请先添加该店铺的商品到购物车')
		// 			}
		// 		})
		// 		.catch(() => {
		// 			uni.hideLoading()
		// 		})
		// },
		handleReservation(e) {
			uni.setStorageSync(J_RESERVATION_PAY_GOODS, {
				cardsInfo: [ {
					brandCartgoods: [ {
						brandId: e.brandId,
						goodsId: e.goodsId,
						goodsName: e.goodsName,
						goodsSn: e.goodsSn,
						number: e.number,
						picUrl: e.picUrl,
						productId: e.productId,
						price: e.price,
						specifications: e.specifications,
						brandName: e.brandName
					} ],
					brandId: e.brandId,
					brandName: e.brandName
				} ],
				pay: e.pay
			})
			this.go('/user/otherServe/pay-reservation/index')
		},
		getAppointmentList() {
			uni.showLoading()
			this.loadingStatus = 'loading'
			getBrandAppointmentCategoryApi({
				brandId: this.brandDetail.id
			}).then(({ data }) => {
				this.appointmentList = data || []
				this.appointmentList && this.appointmentList.length && (this.currentTab = this.appointmentList[0].id) && this.handleClickAppointment({ id: this.currentTab })
				this.loadingStatus = 'hidden'
				uni.hideLoading()
			})
		},
		handleClickAppointment(e) {
			this.currentTab = e.id
			this.currentGoods = []
			uni.showLoading()
			getBrandAppointmentSelectGoodsApi({
				appointmentId: e.id
			}).then(({ data }) => {
				this.currentGoods = (data && data.filter((item) => !!item)) || []
				uni.hideLoading()
			})
		}
	}
}
</script>

<style lang="less" scoped>
.orders-container {
	// font-size: 28upx;
	color: #3d3d3d;
	padding: 10upx 0 60upx;
	// margin: 0 16upx;
	background-color: #ffffff;

	.no-data {
		min-height: 200upx;
		color: #ccc;
		padding: 20upx 0;
		flex-direction: column;
	}
}
</style>
