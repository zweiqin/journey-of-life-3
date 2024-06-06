<template>
	<view class="share-spell-container">
		<tui-bottom-popup :show="shareShow" @close="(shareShow = false) || $emit('shareCancel')">
			<view class="share">
				<text class="h3">邀请好友</text>
				<view class="share-list">
					<view class="ul">
						<!-- #ifdef APP -->
						<view class="li" @click="handleShare('weixin')">
							<tui-icon :size="92" color="#00c800" name="wechat" unit="rpx" margin="0"></tui-icon>
							<view style="padding-top: 22rpx;font-size: 24rpx;color: #333333;">微信</view>
						</view>
						<view class="li" @click="handleShare('weixinpyq')">
							<tui-icon :size="92" color="#00c800" name="moments" unit="rpx" margin="0"></tui-icon>
							<view style="padding-top: 22rpx;font-size: 24rpx;color: #333333;">朋友圈</view>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="li">
							<button
								open-type="share" :data-obj="{ url }" style="padding: 0;line-height: 1;"
								@share="onShareAppMessage"
							>
								<tui-icon :size="92" color="#f5aa15" name="partake" unit="rpx" margin="0"></tui-icon>
								<view style="padding-top: 22rpx;font-size: 24rpx;color: #333333;">好友</view>
							</button>
						</view>
						<view class="li" @click="handleShare('weixinpyq')">
							<tui-icon :size="92" color="#00c800" name="moments" unit="rpx" margin="0"></tui-icon>
							<view style="padding-top: 22rpx;font-size: 24rpx;color: #333333;">朋友圈</view>
						</view>
						<!-- #endif -->
						<view class="li" @click="handleShare('lianjie')">
							<tui-icon :size="92" color="#00b5b8" name="applets" unit="rpx" margin="0"></tui-icon>
							<view style="padding-top: 22rpx;font-size: 24rpx;color: #333333;">链接</view>
						</view>
					</view>
				</view>
				<view class="operation-btn" style="text-align: center;">
					<tui-button
						type="black" width="220rpx" height="60rpx" margin="0"
						plain link
						@click="(shareShow = false) || $emit('shareCancel')"
					>
						取消
					</tui-button>
				</view>
			</view>
		</tui-bottom-popup>

		<tui-bottom-popup :show="wapShow" @close="wapShow = false">
			<view>
				<view style="display: flex;align-items: center;padding: 20rpx;font-size: 30rpx;">
					<text>点击浏览器下方</text>
					<tui-icon :size="28" color="#333333" name="more-fill" margin="0 6rpx"></tui-icon>
					<text>即可进行分享</text>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../config/index'

export default {
	name: 'ShareSpell',
	props: {
		img: {
			type: String,
			default: ''
		},
		url: {
			type: String,
			dafault: ''
		},
		title: {
			type: String,
			dafault: ''
		}
	},
	onShareAppMessage(e) {
		if (e.from == 'button') {
			// 点击button
		}
		if (e.from == 'menu') {
			// 点击右上角按钮
		}
		// 获取按钮传进来的参数 data 中的item值
		const params = e.target.dataset.obj// 获取的为 data 中定义的item值
		return {
			path: `/another-tf/another-serve/inviteSpell/index?${params.url}`
		}
	},
	data() {
		return {
			shareShow: false,
			wapShow: false
		}
	},
	computed: {
		longUrl() {
			return A_TF_MAIN + '/#' + this.url
		}
	},
	methods: {
		wxShare(type) {
			// #ifdef APP
			uni.share({
				provider: 'weixin',
				type: 0,
				title: this.title,
				scene: type, // WXSceneSession会话 WXSceneTimeline朋友圈
				imageUrl: this.img,
				href: this.longUrl,
				success: () => {
				},
				fail: (err) => {
					throw Error(err)
				}
			})
			// #endif
			// #ifdef MP-WEIXIN
			uni.showToast({
				title: '请点击右上角打开菜单进行朋友圈分享',
				icon: 'none'
			})
			// #endif
		},
		handleShare(key) {
			switch (key) {
				case 'weixin':
					this.wxShare('WXSceneSession')
					break
				case 'weixinpyq':
					this.wxShare('WXSceneTimeline')
					break
				case 'qq':
					break
				case 'weibo':
					break
				case 'lianjie':
					uni.setClipboardData({
						data: this.title + this.longUrl,
						success: () => {
							uni.showToast({
								title: '复制成功'
							})
						}
					})
					break
			}
		},
		// 重写分享方法
		overShare() {
			// 监听路由切换
			// 间接实现全局设置分享内容
			wx.onAppRoute(function (res) {
				// 获取加载的页面
				const pages = getCurrentPages()
				// 获取当前页面的对象
				const view = pages[pages.length - 1]
				let data
				if (view) {
					data = view.data
					if (!data.isOverShare) {
						data.isOverShare = true
						view.onShareAppMessage = function () {
							// 你的分享配置
							return {
								title: '标题',
								path: '/pages/xxxxx'
							}
						}
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.share-spell-container {
	box-sizing: border-box;

	uni-button::after {
		border: none;
	}

	.operation-btn {
		/deep/ .tui-btn {
			display: inline-block;
		}
	}

	.share {
		text-align: center;

		.h3 {
			font-size: 30rpx;
			color: #333333;
			padding: 30rpx 0;
			border-bottom: 2px solid #F0F0F0;
			display: block;
		}

		.share-list {
			padding: 40rpx 0 54rpx;
			background-color: #F8F8F8;

			.ul {
				display: flex;
				justify-content: space-around;

				.li {
					&::after {
						border: none;
					}

					.icon {
						display: block;
						width: 92rpx;
						height: 92rpx;
					}
				}
			}
		}
	}
}
</style>
