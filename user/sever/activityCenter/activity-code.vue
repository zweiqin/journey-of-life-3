<template>
	<view class="code-container">
		<view class="main-area">
			<view class="back" @click="handleBack">
				<tui-icon name="arrowleft" color="#fff" :size="30"></tui-icon>
			</view>
			<view class="text-code">
				<image class="logo" src="../../../static/images/user/code/logo.png" mode="" />

				<view class="copy-code">
					<view class="code-wrapper">
						{{ activityCode || tempActivityCode }}
					</view>
					<button v-if="activityCode" class="uni-btn" @click="handleCopyCode">
						复制活动邀请码
					</button>
				</view>
			</view>

			<view class="qr-code-wrapper">
				<button class="uni-btn" @click="handleFillCode">填写活动邀请码</button>
			</view>
		</view>

		<!-- 分享活动邀请码 -->
		<PosterPopup ref="posterPopupRef"></PosterPopup>
		<!-- 生成二维码 -->
		<view v-if="activityCode">
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + activityCode"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>
		<view v-if="qrcodeUrl && activityCode">
			<Share :code="qrcodeUrl + activityCode" class="share-pane" @click="handleItemClick"></Share>
		</view>
		<FillCode v-model="fillCodeVisible"></FillCode>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import Share from './cpns/share.vue'
import FillCode from './cpns/FillCode.vue'
import { getUserId } from '../../../utils'
import {
	getPurchaseRecordApi,
	getPurchaseRecord2Api,
	getIsPurchaseApi,
	getCreateCodeApi
} from '../../../api/user'
import PosterPopup from './cpns/PosterPopup.vue'

export default {
	name: 'ActivityCode',
	components: {
		Share,
		FillCode,
		PosterPopup
	},

	data() {
		return {
			campaignsType: '',
			qrcodeUrl: '',
			shareCode: '',
			fillCodeVisible: false,
			activityCode: '',
			tempActivityCode: '--'
		}
	},

	async onLoad(options) {
		if (options.campaignsType) {
			this.campaignsType = options.campaignsType * 1
			this.qrcodeUrl = `${A_TF_MAIN}/#/pages/jump/jump?userId=&type=bindActivityUser&code=`
			if (this.campaignsType === 0 || this.campaignsType === 3) {
				let res
				if (this.campaignsType === 0) {
					res = await getPurchaseRecordApi({
						userId: getUserId(),
						price: 299
					})
				} else if (this.campaignsType === 3) {
					res = await getPurchaseRecord2Api({
						userId: getUserId(),
						price: 399
					})
				}
				if (res.data) {
					this.getCode()
				} else {
					this.tempActivityCode = '获取我的活动邀请码失败'
				}
			} else if (this.campaignsType === 1) {
				const res = await getIsPurchaseApi({ userId: getUserId() })
				if (res.data) {
					this.getCode()
				} else {
					// uni.showToast({
					// 	title: '未满足分享条件！',
					// 	icon: 'none'
					// })
					this.tempActivityCode = '获取我的活动邀请码失败'
				}
			}
		}
	},

	methods: {
		handleBack() {
			uni.navigateBack()
		},

		// 点击复制邀请码
		handleCopyCode() {
			uni.setClipboardData({
				data: this.activityCode,
				success: () => {
					uni.showToast({
						title: '活动邀请码复制成功',
						duration: 2000
					})
				}
			})
		},

		// 获取活动码
		getCode() {
			getCreateCodeApi({
				userId: getUserId()
			}).then((res) => {
				this.activityCode = res.data
			})
		},

		handleFillCode() {
			this.fillCodeVisible = true
		},
		// 点击分享
		handleShare() {
			uni.showLoading({
				title: '活动邀请码生成中...'
			})
			const _this = this
			this.$refs.uqrcode.make({
				success: () => {
					uni.hideLoading()
					_this.$refs.posterPopupRef.show({
						shareCode: this.shareCode,
						logo: require('../../../static/images/user/code/header.png'),
						desc: `活动邀请码分享`
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
		},
		// 点击图标
		handleItemClick(e) {
			if (e === 'image') {
				this.handleShare()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.code-container {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	background: linear-gradient(138deg, #FFFCE7 13%, #F7EBDF 54%);
	background-size: cover;

	&::after {
		position: absolute;
		content: '';
		width: 20upx;
		height: 40upx;
		border-radius: 0 100px 100px 0;
		background-color: #ffcb05;
		top: 564upx;
		left: 62upx;
	}

	&::before {
		position: absolute;
		content: '';
		width: 20upx;
		height: 40upx;
		border-radius: 100px 0 0 100px;
		background-color: #ffcb05;
		top: 564upx;
		right: 62upx;
		z-index: 10;
	}

	.wrapper {
		height: 100%;
		text-align: center;
		overflow: scroll;
		margin-bottom: 160upx;
		// background-color: #fff;
	}

	.main-area {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		width: 622upx;
		// height: 1160upx;
		margin: 0 auto;
		margin-top: 154upx;
		background-color: #fff;
		border-radius: 30upx;

		// &::after {
		// 	top: 430upx;
		// 	position: absolute;
		// 	content: '';
		// 	width: 574upx;
		// 	height: 1px;
		// 	background-image: linear-gradient(to right,
		// 			#ccc 0%,
		// 			#ccc 50%,
		// 			transparent 50%);
		// 	background-size: 8px 1px;
		// 	background-repeat: repeat-x;
		// }

		.text-code {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-direction: column;

			.logo {
				height: 245upx;
				width: 162upx;
				margin-top: -72upx;
				margin-bottom: 40upx;
			}

			.copy-code {
				width: 462upx;
				height: 88upx;
				background-color: #f6f6f5;
				border-radius: 24upx;

				.code-wrapper {
					text-align: center;
					line-height: 88upx;
					font-size: 38upx;
					font-weight: bold;
				}

				.uni-btn {
					color: #ffcb05;
					font-size: 26upx;
					font-weight: 400;
					margin-top: 32upx;
				}
			}
		}

		.qr-code-wrapper {
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-bottom: 80upx;

			// .qr-code-img {
			// 	width: 320upx;
			// 	height: 320upx;
			// 	padding: 14upx;
			// 	border: 2upx solid #f1f1f0;
			// 	border-radius: 24upx;
			// }

			// .tip {
			// 	font-size: 26upx;
			// 	color: #9e9e9e;
			// 	object-fit: cover;
			// 	margin-top: 32upx;
			// }

			.uni-btn {
				width: 462upx;
				height: 88upx;
				background-color: #ffcb05;
				border-radius: 100px;
				line-height: 88upx;
				font-size: 28upx;
				font-weight: bold;
				margin-top: 108upx;
			}
		}
	}

	.back {
		position: absolute;
		top: -116upx;
		left: -40upx;
	}

	.share-pane {
		margin-bottom: 80upx;
	}

	.generate-code-container {
		position: absolute;
		top: -10000upx;
	}
}
</style>
