<template>
	<view class="store-skus-cart-container">
		<view>
			<tui-drawer
				mode="bottom" :visible="visibleDrawer" :mask-z-index="993" :z-index="994"
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
						<text
							style="flex: 1;margin-left: -104rpx;text-align: center;font-size: 38rpx;font-weight: bold;"
						>
							{{ title }}
						</text>
					</view>
					<view v-if="showBtn" style="padding: 16rpx 26rpx 0 32rpx;">
						<tui-button
							v-if="data && data.length"
							type="blue" width="180rpx" height="58rpx" style="border-radius: 50rpx;"
							:size="28" margin="0 0 0 auto"
							@click="$emit('empty', skusCartObj)"
						>
							清空购物车
						</tui-button>
					</view>

					<view v-if="data && data.length" style="padding: 0 26rpx 0 32rpx;">
						<view
							v-for="(skuItem, cIndex) in data" :key="cIndex" style="padding: 8rpx 0;"
						>
							<view
								style="display: flex;padding: 30rpx 0;"
								@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${skuItem.shopId}&productId=${skuItem.productId}&skuId=${skuItem.skuId}`)"
							>
								<image
									:src="common.seamingImgUrl(skuItem.image)"
									style="width: 180rpx;height: 180rpx;border-radius: 10rpx;margin: 0 30rpx;"
									class="default-img"
								></image>
								<view
									style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;font-size: 26rpx;color: #333;"
								>
									<view
										style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
									>
										{{ skuItem.productName }}
									</view>
									<view
										style="width: fit-content;padding: 0 0 0 10rpx;border-radius: 4rpx;font-size: 24rpx;color: #999;border: 2rpx solid #E4E5E6;padding: 2rpx 10rpx;"
									>
										<text v-if="skuItem.value">{{ skuItem.value }}</text>
										<text v-else>默认规格</text>
									</view>
									<view style="display: flex;align-items: center;justify-content: space-between;">
										<view style="font-size: 36rpx;color: #333333;">
											<text style="font-size: 24rpx;">￥</text>
											<text>{{ skuItem.price }}</text>
										</view>
										<view @click.stop="() => { }">
											<tui-numberbox
												:value="skuItem.number" :min="0" :max="999"
												:disabled="numberDisabled" icon-bg-color="#eeeeee"
												@change="handleChangeSkuNumber($event, skuItem)"
											></tui-numberbox>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else style="padding-bottom: 45rpx;">
						<tui-no-data :fixed="false" style="padding-top: 60rpx;">购物车空空如也~</tui-no-data>
					</view>
				</view>
			</tui-drawer>
		</view>
		<view
			style="position: fixed;bottom: 0;z-index: 995;width: 100%;padding: 20rpx;background-color: #ffffff;box-sizing: border-box;"
		>
			<view
				style="display: flex;justify-content: flex-end;align-items: flex-end;font-size: 28rpx;"
				@click="visibleDrawer = !visibleDrawer"
			>
				<view
					style="position: absolute;left: 46rpx;bottom: 26rpx;padding: 16rpx;background-color: #f6760a;border-radius: 50%;"
				>
					<tui-icon name="notice-fill" :size="56" unit="rpx" color="#fbfbfb"></tui-icon>
				</view>
				<text style="color: #949494;padding-right: 12rpx;">共{{ skusCartObj.allNum }}件</text>
				<text>合计：</text>
				<text style="padding-right: 20rpx;font-weight: bold;font-size: 42rpx;color: #ff1111;">
					￥{{ skusCartObj.checkMoney }}
				</text>
				<view v-if="showBtn">
					<tui-button
						type="danger" width="180rpx" height="58rpx" style="border-radius: 50rpx;"
						:size="28"
						@click="handleBtnTap()"
					>
						{{ buttonTitle }}
					</tui-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: 'ATFStoreSkusCart',
	components: {},
	props: {
		data: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: '产品购物车'
		},
		buttonTitle: {
			type: String,
			default: '立即下单'
		},
		numberDisabled: {
			type: Boolean,
			default: false
		},
		showBtn: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			visibleDrawer: false,

			skusCartObj: {
				allNum: 0,
				checkMoney: 0
			}
		}
	},

	watch: {
		data: {
			handler(newValue, oldValue) {
				if (newValue && newValue.length) {
					const money = newValue.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.number, 0)
					this.skusCartObj.checkMoney = money.toFixed(2)
					this.skusCartObj.allNum = newValue.reduce((previousValue, currentValue) => previousValue + currentValue.number, 0)
				}
			},
			immediate: true,
			deep: true
		}
	},

	methods: {
		handleChangeSkuNumber(e, skuItem) {
			console.log(e)
			if (e.type === 'plus') {
				this.$emit('sku-add', skuItem.skuId)
			} else if (e.type === 'reduce') {
				this.$emit('sku-sub', skuItem.skuId)
			}
		},
		handleBtnTap() {
			this.$emit('click-btn', this.skusCartObj)
		}
	}
}
</script>

<style lang="less" scoped>
.store-skus-cart-container {
	/deep/ .tui-drawer-container {
		height: 100vh !important;
	}
}
</style>
