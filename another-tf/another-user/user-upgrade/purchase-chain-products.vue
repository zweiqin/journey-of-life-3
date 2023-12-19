<template>
	<view class="purchase-chain-products-container">
		<view v-if="!isShowUpgrade" :style="{ paddingBottom: selectGoods.productId ? '200upx' : '10upx' }">
			<view style="padding: 0 0 100upx;background: linear-gradient(164deg, #FFC3C3 8%, #FFF5E5 50%, #FFFFFF 78%);">
				<JHeader title="会员升级大礼包" width="50" height="50" style="padding: 24upx 0 0;color: #222229;">
					<template #ftFn>
						<text style="padding-right: 18upx;">规则</text>
					</template>
				</JHeader>
				<view style="margin-top: 40upx;text-align: center;">
					<image
						src="../../../static/images/user/activity/user-upgrade-package.png"
						style="width: 686upx;height: 330upx;border-radius: 20upx;box-shadow: 0 56upx 30upx -30upx rgba(243, 95, 48, 0.6);"
					>
					</image>
				</view>
			</view>
			<view style="padding: 0 28upx;">
				<view style="font-size: 36upx;font-weight: bold;">超值权益多选一</view>
				<view style="display: flex;align-items: center;margin-top: 20upx;">
					<view style="font-size: 34upx;font-weight: bold;">所在区域：</view>
					<JArea :text="manageAreaName" style="flex: 1;" @confirm="handleSelectArea"></JArea>
				</view>
				<!-- 商品列表 -->
				<view
					v-if="goodsList && goodsList.length"
					style="display: flex;justify-content: space-between;flex-wrap: wrap;width: 100%;margin-top: 32upx;"
				>
					<view v-for="(item, index) in goodsList" :key="index" style="width: 47%;">
						<view
							style="position: relative;padding: 4upx;border-radius: 30upx;overflow: hidden;"
							:style="{ backgroundImage: selectGoods.productId === item.productId ? 'linear-gradient(180deg, #FFD5AB 0%, #F52E29 100%)' : 'linear-gradient(212deg, #F3F0F0 4%, #FCDBDB 96%)' }"
						>
							<view
								style="position: absolute;top: 0;left: 0;z-index: 1;width: 110upx;padding: 10upx 16upx;font-size: 30upx;color: #ffffff;text-align: center;background: linear-gradient(270deg, #EE6C33 0%, #F52E29 98%);border-radius: 30upx 0 30upx 0;"
							>
								<text>权益 {{ index + 1 }}</text>
							</view>
							<view
								style="padding: 80upx 0 24upx;background: linear-gradient(212deg, #F3F0F0 4%, #FCDBDB 96%);border-radius: 26upx;overflow: hidden;"
							>
								<view style="padding-left: 14upx;">
									<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: bold;">
										{{
											item.productName }}
									</view>
									<view style="margin-top: 10upx;;color: #824100;">
										<text style="font-size: 26upx;">价值： ￥</text>
										<text style="font-size: 28upx;font-weight: bold;">{{ item.price }}</text>
									</view>
								</view>
								<view style="margin-top: 20upx;;text-align: center;">
									<image :src="common.seamingImgUrl(item.image)" style="width: 276upx;height: 168upx;border-radius: 20upx;"></image>
								</view>
							</view>
						</view>
						<view style="text-align: center;">
							<tui-button
								v-if="selectGoods.productId === item.productId" type="warning" width="276rpx" height="64upx"
								shape="circle" margin="20upx 0"
								style="display: inline-block;background: linear-gradient(90deg, #F52F29 0%, #EF6532 100%)!important;"
								@click="selectGoods = item"
							>
								已选择
							</tui-button>
							<tui-button
								v-else type="black" width="276rpx" height="64upx"
								shape="circle" margin="20upx 0" plain
								style="display: inline-block;" @click="selectGoods = item"
							>
								点击选择
							</tui-button>
						</view>
					</view>
				</view>
				<view v-else>
					<tui-no-data :fixed="false" style="margin-top: 100upx;">{{ queryInfo.manageArea ? '暂无商品' : '暂无数据，请先选择区域' }}</tui-no-data>
				</view>
			</view>

			<view
				v-if="selectGoods.productId"
				style="position: fixed;bottom: 0;z-index: 2;padding: 18upx 0;text-align: center;background-color: #ffffff;"
			>
				<view style="font-size: 24upx;color: #222229;">
					<tui-icon name="about" :size="24" unit="upx" color="#444444"></tui-icon>
					会员套餐同个账号仅可享受一次超值权益
				</view>
				<view style="padding: 20upx 0 18upx;text-align: center;">
					<tui-button
						type="warning" width="680rpx" height="104upx" margin="0 20upx 0"
						style="display: inline-block;background: linear-gradient(90deg, #F52E29 0%, #FA5151 45%, #FF8F1F 97%)!important;border-radius: 16upx;box-shadow: 0px 2px 2px 0px #FA6842,0px 5px 20px 0px rgba(250, 104, 66, 0.8);"
						@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${selectGoods.shopId}&productId=${selectGoods.productId}&skuId=${selectGoods.skuId}`)"
					>
						<text style="font-size: 34upx;font-weight: bold;">
							<text>立即购买</text>
							<text v-if="selectGoods.price" style="color: #FFDD90;">￥{{ selectGoods.price || '--' }}</text>
						</text>
					</tui-button>
				</view>
				<view style="font-size: 24upx;">
					<text style="color: #AEAEAE;">开通会员即表示同意：</text>
					<text style="color: #222229;">升级协议</text>
					<text style="padding: 0 14upx;color: #AEAEAE;">｜</text>
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
					<image src="../../../static/images/user/activity/upgrade-regimental-commander.png" mode="widthFix" style="width: 500upx; max-height: 75vh" />
				</view>
			</tui-landscape>
		</view>
	</view>
</template>

<script>
import { getSelectProductPlatformRelationApi, getSelectLevelPlatformRelationApi } from '../../../api/anotherTFInterface'
export default {
	name: 'PurchaseChainProducts',
	onLoad(options) {
		getSelectLevelPlatformRelationApi({})
			.then((res) => {
				if (res.data && res.data.levelType === 1) {
					this.isShowUpgrade = false
					this.getGoodsList()
				} else if (res.data && res.data.levelType === 2) {
					this.isShowUpgrade = true
				} else if (res.data && (res.data.levelType === 3 || res.data.levelType === 4)) {
					this.isShowUpgrade = false
					this.getGoodsList()
					this.$showToast('您已成为团长')
				} else if (res.data && res.data.levelType === 5) {
					this.isShowUpgrade = false
					this.getGoodsList()
					this.$showToast('您已成为合伙人')
				} else {
					this.isShowUpgrade = false
					this.getGoodsList()
				}
			})
	},
	onShow() {
	},

	data() {
		return {
			isShowUpgrade: false,
			selectGoods: {},
			goodsList: [],
			manageAreaName: '广东省佛山市顺德区',
			queryInfo: {
				manageArea: '440606' // 顺德区
			}
		}
	},
	methods: {
		getGoodsList() {
			if (!this.queryInfo.manageArea) this.$showToast('请先选择区域')
			uni.showLoading()
			getSelectProductPlatformRelationApi(this.queryInfo)
				.then((res) => {
					this.goodsList = res.data
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleSelectArea(e) {
			this.manageAreaName = e.area
			this.queryInfo.manageArea = e.county.id || e.city.id || e.province.id
			this.getGoodsList()
		},
		handleCloseLandscape() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="less" scoped>
.purchase-chain-products-container {
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
}
</style>
