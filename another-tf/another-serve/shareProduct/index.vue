<template>
	<view>
		<tui-popup :show="show" mode="fade" style="background-color: rgba(0,0,0,0.4);">
			<view class="warp">
				<view class="rect" @tap.stop>
					<!-- 关闭按钮 -->
					<view class="guanbiView">
						<!-- #ifdef MP-WEIXIN -->
						<tui-icon
							name="close" :size="30" color="#ffffff" margin="0 0 0 -23upx"
							style="position: absolute;top: -80rpx;left: 50%;" @click="showcos"
						></tui-icon>
						<!-- #endif -->
						<!-- #ifdef H5 || APP-PLUS -->
						<tui-icon
							name="close" :size="30" color="#ffffff" margin="0 0 0 -23upx"
							style="position: absolute;top: -80rpx;left: 50%;" @click="showcos"
						></tui-icon>
						<!-- #endif -->
					</view>
					<!-- 内容 -->
					<view class="imgBox">
						<view
							v-if="shareType == 1" class="boxInner imgBoxShop"
							:style="{ 'backgroundImage': 'url(' + erweima + ')' }"
						></view>
						<view v-else class="boxInner imgBoxProduct" :style="{ 'backgroundImage': 'url(' + erweima + ')' }">
						</view>
					</view>
					<!-- 分享 -->
				</view>
			</view>
			<view class="fenx" :style="{ 'height': (isIphone === true ? 140 : 130) + 'rpx' }">
				<view class="shareBox" :class="{ 'width100': noMp }" hover-class="btn-click" @click="WXfenx">
					<view style="flex: 1;text-align: center;display: flex;align-items: center;">
						<view v-if="noMp" style="margin-left: 120rpx;">
							<tui-icon name="pic-fill" :size="32" color="#7dc932"></tui-icon>
						</view>
						<view v-else style="margin-left: 35%;">
							<tui-icon name="pic-fill" :size="64" color="#7dc932"></tui-icon>
						</view>
						<view style="margin-left: 10rpx;font-size: 28rpx;color: #333333">保存到本地</view>
					</view>
				</view>
				<view v-if="noMp" class="linkBtnBox" hover-class="btn-click" @click="FZlianj">
					<view style="flex: 1;text-align: center;display: flex;align-items: center;">
						<view class="linkBox" style="width: fit-content;height: fit-content;padding: 14upx;background-color: #f3b44b;border-radius: 50%;line-height: 1;">
							<tui-icon name="link" :size="18" color="#ffffff"></tui-icon>
						</view>
						<view style="margin-left: 10rpx;">
							复制链接
						</view>
					</view>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
export default {
	name: 'ShareProduct',
	data() {
		return {
			size: 110, // 二维码大小
			onval: true, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			erweima: '',
			openSettingBtnHidden: true, // 是否授权
			show: true,
			item: {},
			listitem: {},
			skuId: 0,
			FindSalesPromQuery: {
				type: 1,
				tenantCode: ''
			},
			shopId: null,
			salesId: null,
			productId: null,
			noMp: false,
			shareType: 1,
			isIphone: false
		}
	},
	onLoad(options) {
		this.isIphone = getApp().globalData.isIphone
		if (options.productId) {
			this.productId = options.productId
		}
		if (options.skuId) {
			this.skuId = options.skuId
		}
		if (options.shopId) {
			this.shopId = options.shopId
		}
		if (options.salesId) {
			this.salesId = options.salesId
		}
		if (options.shareType) {
			this.shareType = options.shareType
		}
		this.erweima = options.shareImg
		// #ifndef MP
		this.noMp = true
		// #endif
	},
	methods: {
		showcos() {
			uni.navigateBack({
				delta: 1
			})
		},

		// 保存图片到本地
		WXfenx() {
			// #ifdef APP || MP-WEIXIN || MP-ALIPAY
			// uni.showLoading({
			// 	title: '图片保存中...'
			// })
			// #endif

			// #ifdef APP
			uni.downloadFile({
				url: this.erweima,
				success: (res) => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success() {
								uni.hideLoading()
								uni.showToast({
									title: '保存成功'
								})
							},
							fail() {
								uni.hideLoading()
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								})
							}
						})
					}
				}
			})
			// #endif

			// #ifdef MP-WEIXIN || MP-ALIPAY
			uni.getImageInfo({
				src: this.erweima,
				success(image) {
					uni.saveImageToPhotosAlbum({
						filePath: image.path,
						success() {
							uni.hideLoading()
							uni.showToast({
								title: '图片保存成功'
							})
						},
						fail() {
							uni.hideLoading()
							uni.showModal({
								title: '图片保存失败',
								content: '请确认是否已开启授权',
								confirmText: '开启授权',
								success(res) {
									if (res
										.confirm
									) {
										uni.openSetting({
											success(settingdata) {
												if (settingdata
													.authSetting[
														'scope.writePhotosAlbum'
													]
												) {
													uni.showToast({
														title: '授权成功，请重试哦~',
														icon: 'none'
													})
												} else {
													uni.showToast({
														title: '请确定已打开保存权限',
														icon: 'none'
													})
												}
											}
										})
									}
								}
							})
						}
					})
				},
				fail(err) {}
			})
			// #endif
			// #ifdef H5
			var oA = document.createElement('a')
			oA.download = '' // 设置下载的文件名，默认是’下载’
			oA.href = this.erweima
			document.body.appendChild(oA)
			oA.click()
			oA.remove() // 下载之后把创建的元素删除
			// #endif
		},
		// 复制链接
		FZlianj() {
			let link
			if (this.productId) {
				link = `${A_TF_MAIN}/#/another-tf/another-serve/goodsDetails/index?shopId=${this.shopId}&productId=${this.productId}&skuId=${this.skuId}&salesId=${this.salesId}`
			} else {
				link = `${A_TF_MAIN}/#/community-center/shop/shop-detail?storeId=${this.shopId}&salesId=${this.salesId}`
			}
			// #ifdef MP-WEIXIN || MP-ALIPAY || APP-PLUS
			uni.setClipboardData({
				data: link,
				success: (res) => {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
						duration: 2000 // 时间
					})
				}
			})
			// #endif
			// #ifdef H5
			const textarea = document.createElement('textarea')
			textarea.value = link
			textarea.readOnly = 'readOnly'
			document.body.appendChild(textarea)
			textarea.select() // 选中文本内容
			textarea.setSelectionRange(0, link.length) // 设置选定区的开始和结束点
			uni.showToast({
				title: '复制成功'
			})
			const result = document.execCommand('copy') // 将当前选中区复制到剪贴板
			textarea.remove()
			// #endif
		}
	}
}
</script>

<style lang="less" scoped>
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;

}

.rect {
	background-color: #fff;
	position: relative;
	margin-top: -20rpx;

	.imgBox {

		.boxInner {
			display: inline-block;
			background-size: contain !important;
			background-position: center top !important;
			background-repeat: no-repeat !important;
		}

		.imgBoxShop {
			min-height: 814upx;
			min-width: 426upx;
		}

		.imgBoxProduct {
			min-height: 700upx;
			min-width: 426upx;
		}
	}
}

.fenx {
	position: fixed;
	bottom: 101rpx;
	z-index: 10001;
	background-color: #F7F7F7;
	width: 100%;
	display: flex;
	align-items: center;
	color: #343434;

	view {
		line-height: 98rpx;
	}

	image {
		width: 50rpx;
		height: 50rpx !important;
		display: inline-block;
		margin-top: 25rpx;
	}
}

.shareBox {
	width: 100%;
}

.linkBtnBox {
	flex: 1;
	width: 50%;
	text-align: center;
	display: flex;

	.linkBox {
		margin-left: 70rpx;
	}
}

.width100 {
	width: 50%;
}
</style>
