<template>
	<view class="share-product-container">
		<tui-popup show mode="fade" style="background-color: rgba(0,0,0,0.4);">
			<view class="warp">
				<view class="rect" @tap.stop>
					<!-- 关闭按钮 -->
					<view>
						<tui-icon
							name="close" :size="30" color="#ffffff" margin="0 0 0 -23upx"
							style="position: absolute;top: -80rpx;left: 50%;" @click="handleBack"
						></tui-icon>
					</view>
					<!-- 内容 -->
					<view>
						<image
							v-if="shareType === 1" mode="widthFix" style="min-width: 426upx;min-height: 814upx;"
							:src="shareImg"
						></image>
						<image
							v-else-if="shareType === 2" mode="widthFix" style="min-width: 426upx;min-height: 700upx;"
							:src="shareImg"
						></image>
						<view v-else>未能获取分享类型</view>
					</view>
				</view>
			</view>

			<view
				style="position: fixed;bottom: 101rpx;z-index: 1;display: flex;align-items: center;width: 100%;background-color: #F7F7F7;"
				:style="{ 'height': (isIphone === true ? 140 : 130) + 'rpx' }"
			>
				<view style="flex: 1;display: flex;align-items: center;justify-content: center;" @click="handleSaveImg">
					<tui-icon name="pic-fill" :size="32" color="#7dc932"></tui-icon>
					<view style="margin-left: 10rpx;font-size: 28rpx;color: #333333">保存到本地</view>
				</view>
				<view style="flex: 1;display: flex;align-items: center;justify-content: center;" @click="handleCopyLink">
					<view
						style="width: fit-content;height: fit-content;padding: 14upx;background-color: #f3b44b;border-radius: 50%;line-height: 1;"
					>
						<tui-icon name="link" :size="18" color="#ffffff"></tui-icon>
					</view>
					<view style="margin-left: 10rpx;">
						复制链接
					</view>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import { saveImg } from '../../../utils'

export default {
	name: 'ShareProduct',
	data() {
		return {
			shareType: '',
			salesId: null,
			shopId: null,
			productId: null,
			skuId: 0,
			isIphone: false,
			shareImg: ''
		}
	},
	onLoad(options) {
		this.isIphone = getApp().globalData.isIphone
		if (options.shareType) {
			this.shareType = Number(options.shareType) // 1店铺（shopId、shareImg），2商品（shopId、productId、skuId、shareImg）
		}
		if (options.salesId) {
			this.salesId = options.salesId
		}
		if (options.productId) {
			this.productId = options.productId
		}
		if (options.skuId) {
			this.skuId = options.skuId
		}
		if (options.shopId) {
			this.shopId = options.shopId
		}
		this.shareImg = options.shareImg
	},
	methods: {
		handleBack() {
			uni.navigateBack({
				delta: 1
			})
		},

		// 保存图片到本地
		handleSaveImg() {
			if (this.$store.state.app.terminal === 6) {
				uni.showToast({
					title: '请长按图片保存',
					icon: 'none'
				})
			} else if (this.$store.state.app.terminal === 3) {
				uni.showToast({
					title: '请长按图片保存',
					icon: 'none'
				})
			} else {
				// #ifdef H5
				saveImg(this.shareImg)
				// #endif
				// #ifdef APP
				uni.downloadFile({
					url: this.shareImg,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success() {
									uni.hideLoading()
									uni.showToast({
										title: '已保存图片'
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
					src: this.shareImg,
					success(image) {
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success() {
								uni.hideLoading()
								uni.showToast({
									title: '已保存图片'
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
													if (settingdata.authSetting['scope.writePhotosAlbum']) {
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
					fail(e) { }
				})
			// #endif
			}
		},
		// 复制链接
		handleCopyLink() {
			let link
			if (this.salesId) {
				link = `${A_TF_MAIN}/#/pages/jump/jump?userId=&type=bindingSalesCustomer&code=${this.shareType}~${this.shopId}~${this.productId}~${this.skuId}~${this.salesId}`
			} else if (this.shareType === 1) {
				link = `${A_TF_MAIN}/#/another-tf/another-user/shop/shop-detail?shopId=${this.shopId}`
			} else if (this.shareType === 2) {
				link = `${A_TF_MAIN}/#/another-tf/another-serve/goodsDetails/index?shopId=${this.shopId}&productId=${this.productId}&skuId=${this.skuId}`
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
.share-product-container {
	box-sizing: border-box;

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
	}
}
</style>
