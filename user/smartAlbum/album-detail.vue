<template>
	<view class="travel-body">
		<view style="position: absolute;top: 20upx;left: 30upx;">
			<tui-button width="90rpx" height="70rpx" type="white" plain shape="circle" @click="handleBack">
				<tui-icon name="home" :size="48" unit="rpx" color="#fff"></tui-icon>
			</tui-button>
		</view>
		<view style="position: absolute;top: 20upx;right: 30upx;">
			<tui-button width="90rpx" height="70rpx" type="white" plain shape="circle" @click="popupShow = true">
				<tui-icon name="share-fill" :size="48" unit="rpx" color="#fff"></tui-icon>
			</tui-button>
		</view>
		<view class="travel-wrapper">
			<view class="travel-slider">
				<!-- Rotating Planet -->
				<view class="travel-slider-planet" :style="[ planetStyle ]">
					<image class="planet-image" src="../../static/images/user/album/earth.svg" mode="heightFix" />
					<view class="travel-slider-cities" :class="[ `travel-slider-cities-${imgList.length > 4 ? '8' : '4'}` ]">
						<image class="cities-image" src="../../static/images/new-user/default-user-avatar.png" />
						<image class="cities-image" src="../../static/images/new-user/star.png" />
						<image class="cities-image" src="../../static/images/new-user/default-user-avatar.png" />
						<image class="cities-image" src="../../static/images/new-user/star.png" />
						<block v-if="imgList.length > 4">
							<image class="cities-image" src="../../static/images/new-user/default-user-avatar.png" />
							<image class="cities-image" src="../../static/images/new-user/star.png" />
							<image class="cities-image" src="../../static/images/new-user/default-user-avatar.png" />
							<image class="cities-image" src="../../static/images/new-user/star.png" />
						</block>
					</view>
				</view>
				<!-- Swiper -->
				<z-swiper ref="zSwiper" v-model="imgList" :options="options" @init="init">
					<z-swiper-item v-for="(item, index) in imgList" :key="index">
						<image :src="item.url" class="travel-slider-bg-image" />
						<view class="travel-slider-content">
							<view class="travel-slider-title">{{ item.title }}</view>
							<view class="travel-slider-subtitle">{{ item.subTitle }}</view>
						</view>
					</z-swiper-item>
				</z-swiper>
			</view>
		</view>

		<!-- 底部分享弹窗 -->
		<tui-bottom-popup
			background-color="#f6f6f6" :z-index="2" :mask-z-index="1" :show="popupShow"
			@close="popupShow = false"
		>
			<view class="tui-share">
				<view class="tui-share-title">分享到</view>
				<scroll-view :show-scrollbar="false" scroll-x style="padding-right:20rpx">
					<view class="tui-share-top">
						<view
							v-for="(item, index) in shareList[0].share" :key="index" class="tui-share-item"
							:class="[ shareList[0].share.length - 1 === index ? 'tui-item-last' : '' ]" @tap="handlePopup(item)"
						>
							<view class="tui-share-icon" hover-class="tui-hover" :hover-stay-time="150">
								<tui-icon :name="item.icon" :color="item.color" :size="item.size ? item.size : 36"></tui-icon>
							</view>
							<view class="tui-share-text">{{ item.name }}</view>
						</view>
						<view class="tui-empty">!</view>
					</view>
				</scroll-view>

				<scroll-view :show-scrollbar="false" scroll-x class="tui-mt">
					<view class="tui-share-bottom">
						<view
							v-for="(item, index) in shareList[1].operate" :key="index" class="tui-share-item"
							:class="[ shareList[1].operate.length - 1 === index ? 'tui-item-last' : '' ]" @tap="handlePopup(item)"
						>
							<view class="tui-share-icon" hover-class="tui-hover" :hover-stay-time="150">
								<tui-icon :name="item.icon" color="#404040" :size="item.size" :bold="index === 2"></tui-icon>
							</view>
							<view class="tui-share-text">{{ item.name }}</view>
						</view>
					</view>
				</scroll-view>
				<view class="tui-btn-cancle" @tap="popupShow = false">取消</view>
			</view>
		</tui-bottom-popup>

		<!-- #ifdef H5 -->
		<PointShare :show="showPointVisible" @close="showPointVisible = false"></PointShare>
		<!-- #endif -->

		<!-- 分享海报 -->
		<PosterPopup ref="posterPopupRef"></PosterPopup>

		<!-- 生成二维码 -->
		<uqrcode
			ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + id"
			@complete="handleCompleteCode"
		></uqrcode>

		<tui-toast ref="toast"></tui-toast>

	</view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import { getUserCrmSlbumSelectId } from '../../api/user'
import share from '../../utils/share'
import PointShare from '../../components/BeeWxShare/point-share'
import PosterPopup from './cpns/PosterPopup.vue'
import { isInWx } from '../../utils'

export default {
	name: 'AlbumDetail',
	components: {
		PointShare,
		PosterPopup
	},
	data() {
		return {
			showPointVisible: false,
			options: {
				speed: 600,
				grabCursor: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				spaceBetween: 24,
				watchSlidesProgress: true
			},
			planetStyle: {},
			id: '',
			imgList: [],
			popupShow: false,
			shareList: [{
				share: [
					{
						// 	name: 'QQ',
						// 	icon: 'qq',
						// 	color: '#07BDFD',
						// 	size: 34
						// }, {
						name: '微信',
						icon: 'wechat',
						color: '#80D640'
					}, {
						name: '朋友圈',
						icon: 'moments',
						color: '#80D640',
						size: 32
						// }, {
						// 	name: '支付宝',
						// 	icon: 'alipay',
						// 	color: '#00AAEE'
						// }, {
						// 	name: '新浪微博',
						// 	icon: 'sina',
						// 	color: '#F9C718'
						// }, {
						// 	name: '小程序',
						// 	icon: 'applets',
						// 	color: '#2BA348'
						// }, {
						// 	name: '钉钉',
						// 	icon: 'dingtalk',
						// 	color: '#2DA0F1'
						// }, {
						// 	name: '浏览器打开',
						// 	icon: 'explore-fill',
						// 	color: '#1695F7'
						// }, {
						// 	name: '邮件',
						// 	icon: 'mail-fill',
						// 	color: '#2868E5'
					}
				]
			}, {
				operate: [
					{
						// 	name: '投诉',
						// 	icon: 'warning',
						// 	size: 30
						// }, {
						name: '复制链接',
						icon: 'link',
						size: 28
					}, {
						name: '生成分享码',
						icon: 'qrcode',
						size: 30
						// }, {
						// 	name: '刷新',
						// 	icon: 'refresh',
						// 	size: 30
						// }, {
						// 	name: '搜索内容',
						// 	icon: 'search-2',
						// 	size: 28
					}
				]
			}],
			imgInfo: {},
			qrcodeUrl: `${A_TF_MAIN}/#/user/smartAlbum/album-detail?id=`,
			shareCode: ''
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getUserCrmSlbumSelectId()
	},
	methods: {
		init() {
			this.$refs.zSwiper.swiper.on('progress', (s, progress) => {
				const max =
					s.slides.length > 4 ? 360 - (8 - s.slides.length + 1) * 45 : 270
				this.$set(this.planetStyle, 'transform', `translate(-50%, -50%) rotate(${max * -progress
				}deg)`)
			})
			this.$refs.zSwiper.swiper.on('setTransition', (s, duration) => {
				const max =
					s.slides.length > 4 ? 360 - (8 - s.slides.length + 1) * 45 : 270
				this.$set(this.planetStyle, 'transitionDuration', `${duration}ms`)
			})
		},

		handleBack() {
			uni.switchTab({ url: '/pages/index/index' })
		},

		async getUserCrmSlbumSelectId() {
			const res = await getUserCrmSlbumSelectId({ slbumId: this.id })
			if (res.errno === 0) {
				this.imgInfo = res.data
				this.imgList = [
					{ url: res.data.bookFace },
					...res.data.imageUrl.substring(1, res.data.imageUrl.length - 1)
						.split(',')
						.map((section) => ({ url: section.substring(1, section.length - 1) })),
					{ url: res.data.bookEnd }
				]
			}
			console.log(res.data, this.imgList)
		},

		async handlePopup(obj) {
			console.log(obj)
			if (obj.icon === 'wechat') {
				// #ifdef H5
				if (isInWx()) {
					await share({
						data: {
							title: `${this.imgInfo.userName}分享的图册`,
							desc: `${this.imgInfo.atlasType}-${this.imgInfo.atlasName}`,
							link: `${A_TF_MAIN}/#/user/smartAlbum/album-detail?id=${this.id}`,
							imageUrl: this.imgInfo.bookFace
						},
						successCb: () => { }
					})
					this.showPointVisible = true
				} else {
					this.ttoast({
						title: '请在微信公众号中打开',
						type: 'fail'
					})
				}
				// #endif
				// #ifdef APP
				await share({
					data: {
						title: `${this.imgInfo.userName}分享的图册`,
						desc: `${this.imgInfo.atlasType}-${this.imgInfo.atlasName}`,
						link: `${A_TF_MAIN}/#/user/smartAlbum/album-detail?id=${this.id}`,
						imageUrl: this.imgInfo.bookFace
					},
					successCb: () => { uni.showToast({ title: '分享成功', icon: 'success', duration: 2000 }); this.popupShow = false },
					failCb: () => { uni.showToast({ title: '分享失败', icon: 'none', duration: 2000 }); this.popupShow = false }
				}, 'WXSceneSession')
				// #endif
			} else if (obj.icon === 'moments') {
				// #ifdef H5
				if (isInWx()) {
					await share({
						data: {
							title: `${this.imgInfo.userName}分享的图册`,
							desc: `${this.imgInfo.atlasType}-${this.imgInfo.atlasName}`,
							link: `${A_TF_MAIN}/#/user/smartAlbum/album-detail?id=${this.id}`,
							imageUrl: this.imgInfo.bookFace
						},
						successCb: () => { }
					})
					this.showPointVisible = true
				} else {
					this.ttoast({
						title: '请在微信公众号中打开',
						type: 'fail'
					})
				}
				// #endif
				// #ifdef APP
				await share({
					data: {
						title: `${this.imgInfo.userName}分享的图册`,
						desc: `${this.imgInfo.atlasType}-${this.imgInfo.atlasName}`,
						link: `${A_TF_MAIN}/#/user/smartAlbum/album-detail?id=${this.id}`,
						imageUrl: this.imgInfo.bookFace
					},
					successCb: () => { uni.showToast({ title: '分享成功', icon: 'success', duration: 2000 }); this.popupShow = false },
					failCb: () => { uni.showToast({ title: '分享失败', icon: 'none', duration: 2000 }); this.popupShow = false }
				}, 'WXSenceTimeline')
				// #endif
			} else if (obj.icon === 'link') {
				uni.setClipboardData({
					data: `${A_TF_MAIN}/#/user/smartAlbum/album-detail?id=${this.id}`,
					success() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						})
					}
				})
			} else if (obj.icon === 'qrcode') {
				this.handleShare()
			}
		},

		// 点击分享分享码
		handleShare() {
			uni.showLoading({
				title: '分享码生成中...'
			})
			const _this = this
			this.$refs.uqrcode.make({
				success: () => {
					uni.hideLoading()
					_this.$refs.posterPopupRef.show({
						shareCode: this.shareCode,
						logo: this.imgInfo.bookFace,
						desc: `${this.imgInfo.atlasName} - ${this.imgInfo.atlasType}`
					})
				}
			})
		},
		// 完成
		handleCompleteCode(e) {
			const _this = this
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						if (!_this.shareCode) {
							_this.shareCode = res.tempFilePath
						}
					}
				})
			}
		}

	}
}
</script>

<style lang="scss" scoped>
.travel-body {
	position: relative;
	height: 100vh;
	margin: 0;
	padding: 0;
	background: #ccc;
	color: #000;
	line-height: 1.5;
	font-family: -apple-system, system-ui, 'Helvetica Neue', Helvetica, Arial,
		'Segoe UI', Roboto, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-image: linear-gradient(to bottom, #6c08ca, #fff);
}

.travel-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.travel-slider {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	margin: 0 auto;

	::v-deep .swiper {
		height: 300px;
		padding-top: 64px;
		padding-bottom: 64px;
	}

	::v-deep .swiper-slide {
		width: calc(100vw * 0.8);
		max-width: 640px;
		box-sizing: border-box;
		position: relative;
	}

	&-bg-image {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		left: 0;
		top: 0;
		border-radius: 16px;
		box-sizing: border-box;
		box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5),
			0px -1px 0px rgba(255, 255, 255, 0.5);
	}

	&-content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 32px;
		box-sizing: border-box;
		color: #fff;
		text-shadow: 1px 1px 1px #000;
		line-height: 1.25;
		border-radius: 0 0 16px 16px;
		background-image: linear-gradient(to top,
				rgba(0, 0, 0, 0.5),
				rgba(0, 0, 0, 0));
	}

	&-title {
		font-weight: bold;
		font-size: 32px;
	}

	&-subtitle {
		font-size: 18px;
	}

	&-planet {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 100%;

		>.planet-image {
			display: block;
			width: auto;
			height: 100%;
			margin: 0 auto;
		}
	}

	&-cities {
		.cities-image {
			--travel-slider-planet-size: calc(300px + 64px * 2);
			--travel-slider-image-rotate: 0deg;
			--travel-slider-image-scale: 1;
			position: absolute;
			bottom: 95%;
			left: 50%;
			transform: translateX(-50%) scale(var(--travel-slider-image-scale)) rotate(var(--travel-slider-image-rotate));
			transform-origin: center calc(var(--travel-slider-planet-size) / 2 * 0.95 * 0.95 + 120px * 1);
			height: 120px;
			width: 120px;
			object-position: center bottom;
			object-fit: contain;
		}

		&-8 {
			.cities-image:nth-child(2) {
				--travel-slider-image-rotate: 45deg;
			}

			.cities-image:nth-child(3) {
				--travel-slider-image-rotate: 90deg;
			}

			.cities-image:nth-child(4) {
				--travel-slider-image-rotate: 135deg;
			}

			.cities-image:nth-child(5) {
				--travel-slider-image-rotate: 180deg;
			}

			.cities-image:nth-child(6) {
				--travel-slider-image-rotate: 225deg;
			}

			.cities-image:nth-child(7) {
				--travel-slider-image-rotate: 270deg;
			}

			.cities-image:nth-child(8) {
				--travel-slider-image-rotate: 315deg;
			}
		}

		&-4 {
			.cities-image:nth-child(2) {
				--travel-slider-image-rotate: 90deg;
			}

			.cities-image:nth-child(3) {
				--travel-slider-image-rotate: 180deg;
			}

			.cities-image:nth-child(4) {
				--travel-slider-image-rotate: 270deg;
			}
		}
	}
}

.travel-slider:after {
	content: '';
	position: absolute;
	height: 50vh;
	top: 50%;
	width: 100%;
	left: 0;
	background-image: linear-gradient(to bottom,
			rgba(255, 255, 255, 0),
			#b0a5d1 50%);
}

/* 隐藏scroll-view滚动条*/
::v-deep .uni-scroll-view::-webkit-scrollbar {
	display: block;
	width: 0 !important;
	height: 0 !important;
	color: transparent !important;
	overflow-x: scroll;
}

.tui-share-box {
	padding: 0 50rpx;
	box-sizing: border-box;
}

.tui-share {
	background: #e8e8e8;
	position: relative;
}

.tui-share-title {
	font-size: 26rpx;
	color: #7E7E7E;
	text-align: center;
	line-height: 26rpx;
	padding: 20rpx 0 50rpx 0;
}

.tui-share-top,
.tui-share-bottom {
	min-width: 101%;
	padding: 0 20rpx 0 30rpx;
	white-space: nowrap;
}

.tui-mt {
	margin-top: 30rpx;
	padding-bottom: 150rpx;
}

.tui-share-item {
	width: 126rpx;
	display: inline-block;
	margin-right: 24rpx;
	text-align: center;
}

.tui-item-last {
	margin: 0;
}

.tui-empty {
	display: inline-block;
	width: 30rpx;
	visibility: hidden;
}

.tui-share-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	background: #fafafa;
	height: 126rpx;
	width: 126rpx;
	border-radius: 32rpx;
}

.tui-share-text {
	font-size: 24rpx;
	color: #7E7E7E;
	line-height: 24rpx;
	padding: 20rpx 0;
	white-space: nowrap;
}

.tui-btn-cancle {
	width: 100%;
	height: 100rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	background: #f6f6f6;
	font-size: 36rpx;
	color: #3e3e3e;
	display: flex;
	align-items: center;
	justify-content: center;
}

.generate-code-container {
	position: absolute;
	top: -10000upx;
}
</style>
