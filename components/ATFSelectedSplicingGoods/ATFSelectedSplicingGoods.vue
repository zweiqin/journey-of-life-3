<template>
	<view>
		<view>
			<tui-drawer
				mode="bottom" :visible="visibleDrawer" :mask-z-index="996" :z-index="998"
				@close="visibleDrawer = false"
			>
				<view style="padding-bottom: 102rpx;">
					<view style="padding: 20rpx 0;display: flex;align-items: center;justify-content: space-between;">
						<BeeIcon
							name="arrowleft" :size="34" color="#222229"
							style="width: fit-content;padding: 1rpx;margin-left: 30rpx;border: 1rpx solid #eeeeee;border-radius: 50%;line-height: 1;z-index: 1;"
							@click="visibleDrawer = false"
						>
						</BeeIcon>
						<text style="flex: 1;margin-left: -104rpx;text-align: center;font-size: 38rpx;font-weight: bold;">
							拼单-已选商品
						</text>
					</view>
					<view v-if="selectedGoods && selectedGoods.length">
						<view
							v-for="(item, index) in selectedGoods" :key="item.skuId"
							style="display: flex;padding: 0 0 20rpx 20rpx;"
							@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
						>
							<image
								:src="common.seamingImgUrl(item.image)"
								style="width: 180rpx;height: 180rpx;border-radius: 10rpx;margin-right: 30rpx;"
							></image>
							<view
								style="flex: 1;align-items: stretch;display: flex;flex-direction: column;justify-content: space-between;padding: 0 40rpx 8rpx 0;"
							>
								<view style="font-size: 30rpx;">{{ item.productName }}</view>
								<view style="width: fit-content;margin: 6rpx 0 0;padding: 4rpx 8rpx;font-size: 26rpx;color: #999999;border: 2rpx solid #e4e5e6;">
									<text v-if="item.value">{{ item.value }}</text>
									<text v-else>默认规格</text>
								</view>
								<view style="display: flex;align-items: center;justify-content: space-between;margin: 8rpx 0 0;font-size: 30rpx;">
									<view>
										<text>￥</text>
										<text style="font-weight: bold;">{{ item.price }}</text>
									</view>
									<text>x {{ item.number }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
						<view v-if="!isLoading && !selectedGoods.length">
							<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂未选择商品～</tui-no-data>
						</view>
					</view>
				</view>
			</tui-drawer>
		</view>
		<view
			style="position: fixed;bottom: 0;z-index: 999;width: 100%;padding: 20rpx;background-color: #ffffff;box-sizing: border-box;"
		>
			<view
				style="display: flex;justify-content: flex-end;align-items: flex-end;font-size: 28rpx;"
				@click="visibleDrawer = !visibleDrawer"
			>
				<view
					style="position: absolute;left: 46rpx;bottom: 26rpx;padding: 28rpx;background-color: #ff973f;border-radius: 50%;"
				>
					<tui-icon name="people" :size="56" unit="rpx" color="#fbfbfb"></tui-icon>
				</view>
				<text style="color: #949494;padding-right: 12rpx;">共{{ splicingMsgObj.allNum }}件</text>
				<text>合计：</text>
				<text style="padding-right: 60rpx;font-weight: bold;font-size: 42rpx;color: #ff1111;">
					￥{{ splicingMsgObj.checkMoney }}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
import { T_SELECTED_SPLICING } from '../../constant'

export default {
	name: 'ATFSelectedSplicingGoods',
	props: {
		splicingId: {
			type: Number,
			required: true
		}
	},

	data() {
		return {
			visibleDrawer: false,
			splicingMsgObj: {
				allNum: 0,
				checkMoney: 0
			},
			selectedGoods: [],
			isLoading: true
		}
	},

	created() {
		this.getSplicingGoodsData()
	},

	methods: {
		async getSplicingGoodsData() {
			uni.showLoading()
			this.isLoading = true
			try {
				this.selectedGoods = ((uni.getStorageSync(T_SELECTED_SPLICING) || []).find((i) => i.splicingId === this.splicingId) || { data: [] }).data
				this.selectedGoods = [
					{
						'shopId': 268,
						'commentId': 0,
						'ifAdd': 0,
						'productId': 12431,
						'classifyId': 0,
						'skuId': 333497,
						'productName': '七彩捞鸡',
						'originalPrice': 138,
						'price': 128,
						'actualPrice': 0,
						'weight': 0,
						'ifCredit': 0,
						'creditLimit': 0,
						'number': 1,
						'stockNumber': 994,
						'total': 128,
						'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1712653433041-七彩捞鸡.png',
						'value': '一只',
						'values': [
							'一只'
						],
						'ifLogistics': 0,
						'ifOversold': 0,
						'selected': 1,
						'activityType': 0,
						'ifAfter': 0,
						'distribution': 0,
						'afterState': 0,
						'shelveState': 1,
						'shopGroupWorkId': 0,
						'shopSeckillId': 0,
						'shopDiscountId': 0,
						'platformCurrencyId': 0,
						'platformComposeId': 0,
						'platformSeckillId': 0,
						'platformDiscountId': 0,
						'useMember': false,
						'priceId': 0,
						'composeId': 0,
						'composeIdList': [],
						'sceneId': 0,
						'map': {
							'单款项': {
								'valueCodes': '',
								'skuId': 333497,
								'originalPrice': 138,
								'price': 128,
								'salePrice': 0,
								'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1712653433041-七彩捞鸡.png',
								'stockNumber': 994,
								'activityType': 0,
								'shopGroupWorkId': 0,
								'shopSeckillId': 0,
								'shopDiscountId': 0,
								'platformCurrencyId': 0,
								'platformComposeId': 0,
								'platformSeckillId': 0,
								'platformDiscountId': 0,
								'startTime': '',
								'endTime': '',
								'time': 10000,
								'ifEnable': 0,
								'person': 0,
								'collageOrders': [],
								'total': 0,
								'beeCoin': 0,
								'voucherId': 0,
								'voucherPrice': 0,
								'presenterVoucher': 0,
								'platformGuidePrice': 0,
								'platformBasePrice': 0,
								'manufacturerBasePrice': 0,
								'manufacturerGuidePrice': 0
							}
						},
						'ifCouponAdd': 1,
						'markTools': [],
						'shopMarkTools': [],
						'activityId': 0,
						'useCredit': 0,
						'useCreditAmount': 0,
						'logisticsPrice': 0,
						'pricingPrice': 0,
						'discountPrice': 0,
						'shopDiscountPrice': 0,
						'buyerCouponId': 0,
						'buyerShopCouponId': 0,
						'voucherPrice': 0,
						'voucherId': 0,
						'orderType': 0,
						'productPay': 0,
						'splicingId': 0,
						'presenterVoucher': 0,
						'banziSkuId': 0,
						'cartInviteId': 0,
						'userList': [],
						'sku': ''
					},
					{
						'shopId': 268,
						'commentId': 0,
						'ifAdd': 0,
						'productId': 12433,
						'classifyId': 0,
						'skuId': 333499,
						'productName': '生坑皖鱼',
						'originalPrice': 98,
						'price': 88,
						'actualPrice': 0,
						'weight': 0,
						'ifCredit': 0,
						'creditLimit': 0,
						'number': 1,
						'stockNumber': 999,
						'total': 88,
						'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1712654538021-生坑皖鱼.png',
						'value': '一条',
						'values': [
							'一条'
						],
						'ifLogistics': 0,
						'ifOversold': 0,
						'selected': 1,
						'activityType': 0,
						'ifAfter': 0,
						'distribution': 0,
						'afterState': 0,
						'shelveState': 1,
						'shopGroupWorkId': 0,
						'shopSeckillId': 0,
						'shopDiscountId': 0,
						'platformCurrencyId': 0,
						'platformComposeId': 0,
						'platformSeckillId': 0,
						'platformDiscountId': 0,
						'useMember': false,
						'priceId': 0,
						'composeId': 0,
						'composeIdList': [],
						'sceneId': 0,
						'map': {
							'单款项': {
								'valueCodes': '',
								'skuId': 333499,
								'originalPrice': 98,
								'price': 88,
								'salePrice': 0,
								'image': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1712654538021-生坑皖鱼.png',
								'stockNumber': 999,
								'activityType': 0,
								'shopGroupWorkId': 0,
								'shopSeckillId': 0,
								'shopDiscountId': 0,
								'platformCurrencyId': 0,
								'platformComposeId': 0,
								'platformSeckillId': 0,
								'platformDiscountId': 0,
								'startTime': '',
								'endTime': '',
								'time': 10000,
								'ifEnable': 0,
								'person': 0,
								'collageOrders': [],
								'total': 0,
								'beeCoin': 0,
								'voucherId': 0,
								'voucherPrice': 0,
								'presenterVoucher': 0,
								'platformGuidePrice': 0,
								'platformBasePrice': 0,
								'manufacturerBasePrice': 0,
								'manufacturerGuidePrice': 0
							}
						},
						'ifCouponAdd': 1,
						'markTools': [],
						'shopMarkTools': [],
						'activityId': 0,
						'useCredit': 0,
						'useCreditAmount': 0,
						'logisticsPrice': 0,
						'pricingPrice': 0,
						'discountPrice': 0,
						'shopDiscountPrice': 0,
						'buyerCouponId': 0,
						'buyerShopCouponId': 0,
						'voucherPrice': 0,
						'voucherId': 0,
						'orderType': 0,
						'productPay': 0,
						'splicingId': 0,
						'presenterVoucher': 0,
						'banziSkuId': 0,
						'cartInviteId': 0,
						'userList': [],
						'sku': ''
					}
				]
				this.splicingMsgObj.allNum = this.selectedGoods.reduce((previousValue, currentValue) => previousValue + currentValue.number, 0)
				this.splicingMsgObj.checkMoney = this.selectedGoods.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)
			} finally {
				uni.hideLoading()
				this.isLoading = false
			}
		}
	}
}
</script>

<style lang="less" scoped>
.selected-splicingGoods-container {
	/deep/ .tui-drawer-container {
		height: 100vh !important;
	}
}
</style>
