<template>
	<view class="share-shop-and-commodity-container">
		<view v-if="!shopId && !goodsArr.length">
			<JHeader title="我的分享" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
			<view style="padding-bottom: 45upx;">
				<tui-no-data :fixed="false" style="padding-top: 60upx;">分享已失效</tui-no-data>
			</view>
		</view>
		<view v-else>
			<JHeader v-if="isSharer" title="我的分享" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
			<view v-else style="height: 100upx;"></view>
			<view style="padding: 42upx 40upx 0;">
				<view
					style="position: relative;min-height: 500upx;padding: 54upx 40upx;border-radius: 20upx;background-color: #ef530e;overflow: hidden;"
					class="my-share-bg"
				>
					<view>
						<view
							style="position: absolute;top: -4%;left: -6%;width: 180upx;height: 180upx;background: linear-gradient(91deg, #f27842 30%, #ef5a18 70%);border-radius: 50%;"
						>
						</view>
						<view
							style="position: absolute;top: -3%;left: 28%;width: 66upx;height: 66upx;background: linear-gradient(141deg, #f27842 30%, #ef5a18 70%);border-radius: 50%;"
						>
						</view>
						<view
							style="position: absolute;top: -8%;left: 32%;width: 800upx;height: 1920upx;background-color: #f16527;border-radius: 50%;"
						>
						</view>
						<view
							style="position: absolute;top: -4%;left: 60%;width: 608upx;height: 1838upx;background: linear-gradient(101deg, #FFFFFF 26%, rgba(255, 255, 255, 0.0001) 154%);border-radius: 50%;opacity: 0.1;"
						>
						</view>
					</view>
					<view style="position: relative;">
						<tui-icon
							v-if="!isSharer" name="close" :size="25" color="#F5F4F6"
							style="position: absolute;top: 0;right: 40upx;" @click="$switchTab('/pages/index/index')"
						></tui-icon>
						<view style="margin-top: 10upx;font-size: 36upx;font-weight: bold;color: #ffffff;">
							来自{{ fromSharerName }}的分享
						</view>
						<view style="padding: 30upx 28upx;margin: 45upx 0 0;background-color: #ffffff;border-radius: 20upx;">
							<view @click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)">
								<view style="display: flex;align-items: stretch;">
									<image
										style="width: 96upx;height: 96upx;margin-right: 24upx;border-radius: 50%"
										:src="common.seamingImgUrl(brandDetail.shopLogo)"
									>
									</image>
									<view style="flex: 1;display: flex;flex-direction: column;justify-content: flex-start;width: 0;">
										<text style="font-size: 30upx;color: #333;font-weight: bold;">{{ brandDetail.shopName }}</text>
										<view style="font-size: 24upx;color: #969699;">
											<view style="margin-top: 4upx;">
												<tui-icon name="card-fill" :size="20" color="#ff6619"></tui-icon>
												<view style="margin-left: 10upx;display: inline-block;line-height: 40upx;vertical-align: top;">
													实名认证
												</view>
											</view>
											<view style="margin-top: 16upx;">
												<text style="color: #969699;">店铺评分：</text>
												<text style="color: #303030;">{{ brandDetail.score }}</text>
												<text style="margin-left: 42upx;color: #969699;">月售：</text>
												<text style="color: #303030;">{{ brandDetail.monthlySales }}</text>
											</view>
										</view>
									</view>
								</view>
								<view style="margin-top: 12upx;display: flex;align-items: center;font-size: 24upx;">
									<tui-icon name="gps" :size="14" color="#222229"></tui-icon>
									<text v-if="!$store.getters.obtainLocationCount" style="margin-left: 4upx;">
										定位中
									</text>
									<text v-else style="margin-left: 4upx;">{{ brandDetail.distance || 0 }}Km</text>
									<text
										style="margin-left: 30upx;flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
									>
										{{ brandDetail.shopAdress || '--' }}
									</text>
									<text style="margin-left: 64upx;font-weight: bold;color: #EF530E;" @click.stop="handleNavigate">
										导航
									</text>
								</view>
							</view>

							<view style="margin: 58upx 0 30upx;font-size: 28upx;color: #222229;">
								<view style="font-weight: bold;">
									<text style="color: #e02208;">●</text>
									<text style="margin-left: 8upx;">商品信息（{{ goodsArr.length }}）</text>
								</view>
								<view style="max-height: 40vh;margin-top: 24upx;overflow-y: auto;">
									<view
										v-for="(item, index) in goodsDetailsArr" :key="item.productId"
										style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 24upx;"
										@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
									>
										<view style="flex: 1;display: flex;align-items: center;">
											<image
												:src="common.seamingImgUrl(item.image || item.images[0])"
												style="width: 90upx;height: 90upx;border-radius: 10upx;margin-right: 30upx;"
											></image>
											<view style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
												{{ item.productName }}
											</view>
										</view>
										<view style="margin-left: 16upx;">￥{{ item.price }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
			<view v-if="!isSharer" style="margin-top: 20upx;">
				<tui-divider :size="24" color="#979797" divider-color="#D8D8D8" background-color="#f5f4f6" width="80%">
					截图可保存到相册
				</tui-divider>
			</view>
		</view>

		<view
			v-if="isSharer"
			style="position: fixed;bottom: 0;left: 0;width: 100%;padding: 0 30upx 20upx;display: flex;flex-wrap: wrap;align-items: center;justify-content: space-between;background: #ffffff;z-index: 1;box-sizing: border-box;"
		>
			<tui-button
				type="warning" width="48%" height="82rpx" plain
				margin="20upx 0 0"
				style="color: #EF530E!important;border-radius: 8upx;" @click="handleShare"
			>
				生成海报
			</tui-button>
			<tui-button
				type="warning" width="48%" height="82rpx" margin="20upx 0 0"
				style="background: #ef530e!important;border-radius: 8upx;" @click="handleClickShare()"
			>
				一键分享
			</tui-button>
		</view>

		<!-- 生成二维码 -->
		<view v-if="qrcodeUrl && paramsCode">
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + paramsCode"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>

		<BeeWxShare ref="beeWxShareRef"> </BeeWxShare>
		<ShopCommodityPoster ref="refShopCommodityPoster"></ShopCommodityPoster>
	</view>

	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import ShopCommodityPoster from './components/ShopCommodityPoster.vue'
import { mapGetters } from 'vuex'
import { getIndexShopDetailApi, getProductDetailsByIdApi } from '../../../api/anotherTFInterface'
import { navigationAddress } from '../../../utils'

export default {
	name: 'ShareShopAndCommodity',
	components: { ShopCommodityPoster },
	data() {
		return {
			isSharer: false,
			fromSharerName: '',
			shopId: '',
			goodsArr: [],
			brandDetail: {},
			goodsDetailsArr: [],
			shareCode: '',
			qrcodeUrl: `${A_TF_MAIN}/#/another-tf/another-user/share-shop-and-commodity/index`,
			paramsCode: ''
		}
	},
	onLoad(options) {
		uni.$on('sendShareShopAndCommodityMsg', (data) => {
			this.isSharer = true
			this.fromSharerName = this.$store.getters.userInfo.name || '无名氏'
			if (data.shopId) this.shopId = Number(data.shopId)
			if (data.goods) this.goodsArr = JSON.parse(data.goods)
			this.handleInitData()
		})
		if (!options.isSharer) {
			this.isSharer = false
			this.fromSharerName = decodeURI(options.fromSharerName)
			if (options.shopId) this.shopId = Number(options.shopId)
			if (options.goods) this.goodsArr = JSON.parse(decodeURI(options.goods))
			this.handleInitData()
		}
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'another-tf/another-user/share-shop-and-commodity/index') this.getBrandDetail()
		}
	},
	beforeDestroy() {
		uni.$off('sendShareShopAndCommodityMsg')
	},

	methods: {
		handleInitData() {
			uni.showLoading()
			getIndexShopDetailApi({
				shopId: this.shopId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			})
				.then(async (res) => {
					uni.hideLoading()
					this.brandDetail = res.data || {}
					try {
						uni.showLoading()
						for (let index = 0; index < this.goodsArr.length; index++) {
							await getProductDetailsByIdApi({
								shopId: this.shopId,
								productId: this.goodsArr[index].split('~')[0],
								skuId: this.goodsArr[index].split('~')[1],
								terminal: 1
							}).then((res) => {
								this.goodsDetailsArr.push(res.data)
							})
						}
						uni.hideLoading()
					} catch (error) {
						console.log(error)
						uni.hideLoading()
					}
					this.$nextTick(async () => {
						// #ifdef H5
						await this.handleClickShare(true, true)
						// #endif
						if (this.isSharer) {
							uni.showLoading({ mask: true })
							this.paramsCode = `?fromSharerName=${encodeURI(this.fromSharerName)}&shopId=${this.shopId}&goods=${encodeURI(JSON.stringify(this.goodsArr))}`
							console.log(this.qrcodeUrl + this.paramsCode)
						}
					})
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		async getBrandDetail() {
			try {
				uni.showLoading()
				const { data } = await getIndexShopDetailApi({
					shopId: this.shopId,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
				})
				console.log(data)
				this.brandDetail = data || {}
				uni.hideLoading()
			} catch (error) {
				console.log(error)
				uni.hideLoading()
			}
		},
		handleNavigate() {
			if (!this.brandDetail.shopAdress) return this.$showToast('商家地址有误，导航失败')
			navigationAddress(`${this.brandDetail.longitude},${this.brandDetail.latitude}`)
		},

		handleShare() {
			uni.showLoading({
				title: '海报生成中...'
			})
			this.$refs.uqrcode.make({
				success: () => {
					uni.hideLoading()
					if (this.shareCode) {
						if (this.brandDetail.shopId) {
							if (this.goodsDetailsArr && this.goodsDetailsArr.length) {
								const nickName = this.fromSharerName
								this.$refs.refShopCommodityPoster.show({
									headerTitle: nickName ? `来自${nickName}的分享` : '商家商品分享',
									brandDetail: {
										shopId: this.brandDetail.shopId,
										shopName: this.brandDetail.shopName,
										shopLogo: this.brandDetail.shopLogo,
										score: this.brandDetail.score,
										monthlySales: this.brandDetail.monthlySales,
										distance: this.brandDetail.distance,
										shopAdress: this.brandDetail.shopAdress
									},
									goodsList: this.goodsDetailsArr.map((item) => ({
										productId: item.productId,
										image: item.image || item.images[0],
										productName: item.productName,
										price: item.price
									})),
									shareCode: this.shareCode
								})
							} else {
								return this.$showToast('缺少商品数据')
							}
						} else {
							return this.$showToast('缺少商家数据')
						}
					} else {
						return this.$showToast('请稍后重试！')
					}
				}
			})
		},

		async handleClickShare(isQuit, isParamsCode) {
			uni.showLoading({ mask: true })
			try {
				await this.$refs.beeWxShareRef.share(
					{
						data: {
							title: '订单分享',
							desc: `商家和商品分享`,
							link: `${A_TF_MAIN}/#/another-tf/another-user/share-shop-and-commodity/index?fromSharerName=${encodeURI(this.fromSharerName)}&shopId=${this.shopId}&goods=${encodeURI(JSON.stringify(this.goodsArr))}`,
							imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo)
						},
						successCb: () => { },
						failCb: () => { }
					},
					isQuit
				)
				uni.hideLoading()
			} catch (error) {
				uni.hideLoading()
			}
		},
		// 完成
		handleCompleteCode(e) {
			uni.hideLoading()
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						if (!this.shareCode) {
							this.shareCode = res.tempFilePath
						}
					}
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.share-shop-and-commodity-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #f5f4f6;

	.generate-code-container {
		position: absolute;
		top: -10000upx;
	}

	.my-share-bg {
		// background: url('../../../static/xxx') no-repeat center top/cover;
	}
}
</style>
