<template>
	<view class="purchase-chain-goods-container">
		<view v-if="!isShowUpgrade" :style="{ paddingBottom: selectGoods.productId ? '200rpx' : '10rpx' }">
			<view style="padding: 0 0 100rpx;background: linear-gradient(164deg, #FFC3C3 8%, #FFF5E5 50%, #FFFFFF 78%);">
				<JHeader title="会员升级大礼包" width="50" height="50" style="padding: 24rpx 0 0;">
					<template #ftFn>
						<text style="padding-right: 18rpx;color: #222229;">规则</text>
					</template>
				</JHeader>
				<view style="margin-top: 40rpx;text-align: center;">
					<image
						src="../../../static/images/user/activity/user-upgrade-package.png"
						style="width: 686rpx;height: 330rpx;border-radius: 20rpx;box-shadow: 0 56rpx 30rpx -30rpx rgba(243, 95, 48, 0.6);"
					>
					</image>
				</view>
			</view>
			<view style="padding: 0 28rpx;">
				<view style="display: flex;align-items: center;justify-content: space-around;padding: 10rpx 0;font-size: 26rpx;">
					<view :style="{ color: queryInfo.ifNew === 1 ? '#ff7911' : queryInfo.ifNew === 0 ? '#8dbcbd' : '#000000' }" @click="handleGoodsSortTap(1)">
						<text>新品</text>
					</view>
					<view :style="{ color: sortGoodsIndex === 2 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(2)">
						<text>价格</text>
						<tui-icon
							v-if="[1, 2].includes(queryInfo.type)"
							:name="queryInfo.type === 1 ? 'turningup' : queryInfo.type === 2 ? 'turningdown' : ''"
							color="#666666" :size="16"
						></tui-icon>
					</view>
					<view :style="{ color: sortGoodsIndex === 3 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(3)">
						<text>销量</text>
						<tui-icon
							v-if="[1, 2].includes(queryInfo.volume)"
							:name="queryInfo.volume === 1 ? 'turningup' : queryInfo.volume === 2 ? 'turningdown' : ''"
							color="#666666" :size="16"
						></tui-icon>
					</view>
				</view>
				<view>
					<tui-input
						v-model="queryInfo.search" placeholder="请输入您想要的宝贝"
						clearable is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						style="flex: 1;margin-left: 16rpx;border: 2rpx solid #EF5511;"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								style="background: #ee692f!important;"
								@click="(queryInfo.page = 1) && getShopGoodsTemplate()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
				<view style="font-size: 36rpx;font-weight: bold;margin-top: 20rpx;">超值权益多选一</view>
				<!-- 商品列表 -->
				<view
					v-if="goodsList && goodsList.length"
					style="display: flex;justify-content: space-between;flex-wrap: wrap;width: 100%;margin-top: 32rpx;"
				>
					<view v-for="(item, index) in goodsList" :key="index" style="width: 47%;">
						<view
							style="position: relative;padding: 4rpx;border-radius: 30rpx;overflow: hidden;"
							:style="{ backgroundImage: selectGoods.productId === item.productId ? 'linear-gradient(180deg, #FFD5AB 0%, #F52E29 100%)' : 'linear-gradient(212deg, #F3F0F0 4%, #FCDBDB 96%)' }"
							@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
						>
							<view
								style="position: absolute;top: 0;left: 0;z-index: 1;width: 110rpx;padding: 10rpx 16rpx;font-size: 30rpx;color: #ffffff;text-align: center;background: linear-gradient(270deg, #EE6C33 0%, #F52E29 98%);border-radius: 30rpx 0 30rpx 0;"
							>
								<text>权益 {{ index + 1 }}</text>
							</view>
							<view
								style="padding: 80rpx 0 24rpx;background: linear-gradient(212deg, #F3F0F0 4%, #FCDBDB 96%);border-radius: 26rpx;overflow: hidden;"
							>
								<view style="padding-left: 14rpx;">
									<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bold;">
										{{ item.productName }}
									</view>
									<view style="margin-top: 10rpx;color: #824100;">
										<text style="font-size: 26rpx;">价值： ￥</text>
										<text style="font-size: 28rpx;font-weight: bold;">{{ item.price }}</text>
									</view>
								</view>
								<view style="margin-top: 20rpx;text-align: center;">
									<image :src="common.seamingImgUrl(item.image)" style="width: 276rpx;height: 168rpx;border-radius: 20rpx;"></image>
								</view>
							</view>
						</view>
						<view style="text-align: center;">
							<tui-button
								v-if="selectGoods.productId === item.productId" type="warning" width="276rpx" height="64rpx"
								shape="circle" margin="20rpx 0"
								style="display: inline-block;background: linear-gradient(90deg, #F52F29 0%, #EF6532 100%)!important;"
								@click="selectGoods = item"
							>
								已选择
							</tui-button>
							<tui-button
								v-else type="black" width="276rpx" height="64rpx"
								shape="circle" margin="20rpx 0" plain
								style="display: inline-block;" @click="selectGoods = item"
							>
								点击选择
							</tui-button>
						</view>
					</view>
					<view v-for="(item, index) in combinationProductList" :key="index" style="width: 47%;">
						<view
							style="position: relative;padding: 4rpx;border-radius: 30rpx;overflow: hidden;"
							:style="{ backgroundImage: selectGoods.productId === item.productId ? 'linear-gradient(180deg, #FFD5AB 0%, #F52E29 100%)' : 'linear-gradient(212deg, #F3F0F0 4%, #FCDBDB 96%)' }"
							@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
						>
							<view
								style="position: absolute;top: 0;left: 0;z-index: 1;width: 110rpx;padding: 10rpx 16rpx;font-size: 30rpx;color: #ffffff;text-align: center;background: linear-gradient(270deg, #EE6C33 0%, #F52E29 98%);border-radius: 30rpx 0 30rpx 0;"
							>
								<text>权益 {{ goodsList.length + 1 }}</text>
							</view>
							<view
								style="padding: 80rpx 0 24rpx;background: linear-gradient(212deg, #F3F0F0 4%, #FCDBDB 96%);border-radius: 26rpx;overflow: hidden;"
							>
								<view style="padding-left: 14rpx;">
									<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bold;">
										{{ item.productName }}
									</view>
									<view style="margin-top: 10rpx;color: #824100;">
										<text style="font-size: 26rpx;">价值： ￥</text>
										<text style="font-size: 28rpx;font-weight: bold;">{{ item.price }}</text>
									</view>
								</view>
								<view style="margin-top: 20rpx;text-align: center;">
									<image :src="common.seamingImgUrl(item.image)" style="width: 276rpx;height: 168rpx;border-radius: 20rpx;"></image>
								</view>
							</view>
						</view>
						<view style="text-align: center;">
							<tui-button
								v-if="selectGoods.productId === item.productId" type="warning" width="276rpx" height="64rpx"
								shape="circle" margin="20rpx 0"
								style="display: inline-block;background: linear-gradient(90deg, #F52F29 0%, #EF6532 100%)!important;"
								@click="selectGoods = item"
							>
								已选择
							</tui-button>
							<tui-button
								v-else type="black" width="276rpx" height="64rpx"
								shape="circle" margin="20rpx 0" plain
								style="display: inline-block;" @click="selectGoods = item"
							>
								点击选择
							</tui-button>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!isEmpty && !goodsList.length
							? 'loading' : !isEmpty && goodsList.length && (goodsList.length >= goodsTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无商品</tui-no-data>
				</view>
			</view>

			<view
				v-if="selectGoods.productId"
				style="position: fixed;bottom: 0;z-index: 2;padding: 18rpx 0;text-align: center;background-color: #ffffff;"
			>
				<view style="font-size: 24rpx;color: #222229;">
					<tui-icon name="about" :size="24" unit="rpx" color="#444444"></tui-icon>
					会员套餐同个账号仅可享受一次超值权益
				</view>
				<view style="padding: 20rpx 0 18rpx;text-align: center;">
					<tui-button
						type="warning" width="680rpx" height="104rpx" margin="0 20rpx 0"
						style="display: inline-block;background: linear-gradient(90deg, #F52E29 0%, #FA5151 45%, #FF8F1F 97%)!important;border-radius: 16rpx;"
						@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${selectGoods.shopId}&productId=${selectGoods.productId}&skuId=${selectGoods.skuId}`)"
					>
						<text style="font-size: 34rpx;font-weight: bold;">
							<text>立即购买</text>
							<text v-if="selectGoods.price" style="color: #FFDD90;">￥{{ selectGoods.price || '--' }}</text>
						</text>
					</tui-button>
				</view>
				<view style="font-size: 24rpx;">
					<text style="color: #AEAEAE;">开通会员即表示同意：</text>
					<text style="color: #222229;">升级协议</text>
					<text style="padding: 0 14rpx;color: #AEAEAE;">｜</text>
					<text style="color: #222229;">会员协议</text>
				</view>
			</view>
		</view>
		<view v-else>
			<tui-landscape
				show :position="1" mask mask-closable
				:icon-size="28" icon-color="#FFFFFF"
				@close="handleCloseLandscape"
			>
				<view @click="go('/another-tf/another-user/user-upgrade/user-upgrade-application')">
					<image src="../../../static/images/user/activity/upgrade-regimental-commander.png" mode="widthFix" style="width: 500rpx;max-height: 75vh;" />
				</view>
			</tui-landscape>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getShopProductsApi, getSelectLevelPlatformRelationApi, getPlatformComposeCanvasApi } from '../../../api/anotherTFInterface'
export default {
	name: 'PurchaseChainGoods',
	onLoad(options) {
		getSelectLevelPlatformRelationApi({})
			.then((res) => {
				if (res.data && res.data.levelType === 1) {
					this.isShowUpgrade = false
					this.getShopGoodsTemplate()
					this.getCombinationActivitiesList()
				} else if (res.data && res.data.levelType === 2) {
					this.isShowUpgrade = true
				} else if (res.data && (res.data.levelType === 3 || res.data.levelType === 4)) {
					this.isShowUpgrade = false
					this.getShopGoodsTemplate()
					this.getCombinationActivitiesList()
					this.$showToast('您已成为团长')
				} else if (res.data && res.data.levelType === 5) {
					this.isShowUpgrade = false
					this.getShopGoodsTemplate()
					this.getCombinationActivitiesList()
					this.$showToast('您已成为合伙人')
				} else {
					this.isShowUpgrade = false
					this.getShopGoodsTemplate()
					this.getCombinationActivitiesList()
				}
			})
	},

	data() {
		return {
			isShowUpgrade: false,
			selectGoods: {},
			sortGoodsIndex: 1,
			isEmpty: false,
			goodsList: [],
			goodsTotal: 0,
			queryInfo: {
				shopId: 456,
				groupId: 822,
				search: '',
				ifNew: 1,
				type: '',
				volume: '',
				page: 1,
				pageSize: 20
			},
			combinationActivityList: [],
			combinationProductList: []
		}
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'another-tf/another-user/combination-activities/index') this.getCombinationActivitiesList()
		}
	},
	methods: {
		handleGoodsSortTap(index) {
			this.queryInfo.page = 1
			this.goodsList = []
			this.sortGoodsIndex = index
			if (index === 1) {
				this.queryInfo.ifNew = this.queryInfo.ifNew ? 0 : 1
				this.queryInfo.type = ''
				this.queryInfo.volume = ''
			} else if (index === 2) {
				this.queryInfo.ifNew = ''
				this.queryInfo.type = this.queryInfo.type === 1 ? 2 : 1
				this.queryInfo.volume = ''
			} else if (index === 3) {
				this.queryInfo.ifNew = ''
				this.queryInfo.type = ''
				this.queryInfo.volume = this.queryInfo.volume === 1 ? 2 : 1
			}
			this.getShopGoodsTemplate()
		},
		getShopGoodsTemplate(isLoadmore) {
			uni.showLoading()
			getShopProductsApi(this.queryInfo)
				.then((res) => {
					this.goodsTotal = res.data.page.total
					if (isLoadmore) {
						this.goodsList.push(...res.data.page.list)
					} else {
						this.goodsList = res.data.page.list
					}
					this.isEmpty = this.goodsList.length === 0
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		getCombinationActivitiesList() {
			getPlatformComposeCanvasApi({
				page: 1,
				pageSize: 9999,
				ids: [ 47 ],
				shopId: '',
				stateList: ['0', '1', '2', '3', '4'],
				address: [this.$store.state.location.locationInfo.province, this.$store.state.location.locationInfo.city, this.$store.state.location.locationInfo.district, this.$store.state.location.locationInfo.township].filter((i) => i).join('-')
			})
				.then((res) => {
					this.combinationActivityList = res.data.filter((item) => [ 3 ].includes(item.state))
					this.combinationProductList = this.combinationActivityList.map((i) => i.products).reduce((t, v) => t.concat(v), [])
				})
		},
		handleCloseLandscape() {
			uni.navigateBack()
		}
	},
	onReachBottom() {
		if (this.goodsList.length < this.goodsTotal) {
			++this.queryInfo.page
			this.getShopGoodsTemplate(true)
		}
	}
}
</script>

<style lang="less" scoped>
.purchase-chain-goods-container {
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
	/deep/ .j-header-container .title {
		font-size: 36rpx;
		color: #222229;
	}
}
</style>
