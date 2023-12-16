<template>
	<view class="wx-share-container">
		<view class="view-ui" @click.stop="$emit('click')">
			<slot></slot>
		</view>
		<tui-bottom-popup
			background-color="transparent" :z-index="100000033" :show="showSharePopupVisible"
			@close="showSharePopupVisible = false"
		>
			<view class="main-wrapper">
				<view class="share-header"> 分享到 </view>

				<view class="container">
					<view class="item">
						<view class="icon-wrapper" @click="handleShareApp('WXSceneSession')">
							<tui-icon color="#80d640" :size="34" name="wechat"></tui-icon>
						</view>
						<text>微信</text>
					</view>

					<view class="item">
						<view class="icon-wrapper" @click="handleShareApp('WXSceneTimeline')">
							<tui-icon color="#80d640" :size="34" name="moments"></tui-icon>
						</view>
						<text>朋友圈</text>
					</view>
				</view>

				<button class="uni-btn" @click="showSharePopupVisible = false">取消</button>
			</view>
		</tui-bottom-popup>

		<!-- #ifdef H5 -->
		<PointShare :show="showPointVisible" @close="showPointVisible = false"></PointShare>
		<!-- #endif -->

		<tui-toast ref="toast"></tui-toast>

		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', backUrl)"
		></tui-modal>
	</view>
</template>

<script>
import share from 'utils/share'
import PointShare from './point-share'
import { isInWx } from '../../utils'
import { T_STORAGE_KEY } from '../../constant'
import showModalMixin from '../../mixin/showModal'

export default {
	name: 'BeeWxShare',
	components: {
		PointShare
	},
	data() {
		return {
			showSharePopupVisible: false,
			showPointVisible: false,
			shareData: null,
			backUrl: null
		}
	},

	mixins: [ showModalMixin() ],

	methods: {
		async share(data, quiet, backUrl) {
			this.shareData = data
			this.backUrl = backUrl
			if (!uni.getStorageSync(T_STORAGE_KEY) || !(uni.getStorageSync(T_STORAGE_KEY) && !uni.getStorageSync(T_STORAGE_KEY).token)) {
				if (!quiet) {
					this.$data._isShowTuiModel = true
				}
				return
			}

			// #ifdef H5
			if (quiet) {
				await share(data)
				return
			}
			if (isInWx()) {
				this.showPointVisible = true
				await share(data)
				return
			}
			this.ttoast({
				title: '请在微信公众号中打开',
				type: 'fail'
			})
			return
			// #endif

			// #ifdef APP
			if (!quiet) {
				this.showSharePopupVisible = true
			}
			// #endif
		},

		handleShareApp(shareType) {
			share(this.shareData, shareType)
		}
	}
}
</script>

<style lang="less" scoped>
.main-wrapper {
	background-color: #fff;
	height: 444upx;

	background-color: #e8e8e8;

	.share-header {
		padding: 30upx 30upx 0;
		box-sizing: border-box;
	}

	.container {
		height: auto;
		display: flex;
		align-items: center;
		margin-top: 30upx;
		padding: 30upx;
		box-sizing: border-box;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-right: 30upx;

			.icon-wrapper {
				width: 134upx;
				height: 134upx;
				background-color: #fff;
				border-radius: 34upx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 20upx;

				transition: all 350ms;

				&:active {
					background-color: #ccc;
				}
			}
		}
	}

	.uni-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 38upx;
		height: 106upx;
		text-align: center;
		line-height: 40upx;
		background-color: #f6f6f6;
		color: #5c5c5c;
	}
}
</style>
