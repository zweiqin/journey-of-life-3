<template>
	<view
		class="code-mask" :style="{
			'opacity': codePicUrl && userInfo && userInfo.nickName ? '1' : '0',
			'z-index':
				codePicUrl && userInfo && userInfo.nickName ? '99' : '-1'
		}"
	>
		<view
			class="code-wrapper" :style="{
				transform: codePicUrl ? 'scale(1)' : 'scale(0)'
			}"
		>
			<view class="header">
				<view style="display: flex;justify-content: center;align-items: center;">
					<image class="header-icon" src="../../static/images/new-user/default-user-avatar.png" mode="" />
					<text>
						<text v-if="type === 'shopInvitation'">我的商家码：</text>
						<text v-else-if="type === 'teamMembersInvitation'">我的社区邀请码：</text>
					</text>
					<text>
						<text v-if="type === 'shopInvitation' || type === 'teamMembersInvitation'">
							<text>{{ createCode }}</text>
							<text style="margin-left: 12upx;font-size: 26upx;color: #0061C8;" @click="$copy(createCode)">复制</text>
						</text>
						<text v-else></text>
					</text>
				</view>
				<view>
					昵称：{{ userInfo.nickName }}&nbsp;&nbsp;&nbsp;&nbsp;用户ID：{{ userInfo.userId }}
				</view>
			</view>

			<view class="big-wrapper">
				<image src="../../static/images/user/center-logo.png" class="big-icon" />
			</view>

			<view class="images">
				<view class="zhiwen">
					<image src="../../static/images/icon/zhi.png" alt="" />
					<text>长按扫码</text>
				</view>
				<view style="text-align: center;">
					<image class="code" :src="codePicUrl" alt="" />
					<view
						v-if="type === 'shopInvitation'" style="font-size: 26upx;color: #06a6f0;"
						@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${userInfo.userId}&type=bindingShop&code=${createCode}`)"
					>
						复制链接
					</view>
					<view
						v-else-if="type === 'teamMembersInvitation'" style="font-size: 26upx;color: #06a6f0;"
						@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${userInfo.userId}&type=bindingTeamMembers&code=${userInfo.phone}`)"
					>
						复制链接
					</view>
				</view>
			</view>

			<button class="uni-btn" @click="(type = '') || (createCode = '') || (qrcodeUrl = '') || (codePicUrl = '')">取消</button>
		</view>

		<!-- 生成二维码 -->
		<view v-if="qrcodeUrl && createCode">
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + createCode"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>
	</view>
</template>

<script>
// import jsQR from 'jsqr'
import { A_TF_MAIN } from '../../config'
import { USER_INFO } from '../../constant'
import { getUserInfoCodeApi } from '../../api/anotherTFInterface'
export default {
	name: 'CodeCreatePopup',
	props: {
		// type: {
		// 	type: String,
		// 	required: true
		// }
	},
	data() {
		return {
			rootUrl: A_TF_MAIN,
			userInfo: {},
			type: '',
			createCode: '',
			qrcodeUrl: '',
			codePicUrl: ''
		}
	},

	methods: {
		getCode(type) {
			if (!type) return
			this.type = type
			this.userInfo = uni.getStorageSync(USER_INFO)
			uni.showLoading({
				title: '生成中...'
			})
			if (type === 'shopInvitation') {
				this.createCode = this.userInfo.phone || ''
				this.qrcodeUrl = `${this.rootUrl}/#/pages/jump/jump?userId=${this.userInfo.userId}&type=bindingShop&code=`
				// this.$refs.uqrcode.make({})
			} else if (type === 'teamMembersInvitation') {
				getUserInfoCodeApi({
					type: 1
				}).then((res) => {
					this.createCode = res.data.invitationCode || ''
					this.qrcodeUrl = `${this.rootUrl}/#/pages/jump/jump?userId=${this.userInfo.userId}&type=bindingTeamMembers&code=`
				})
			}
		},
		// 完成
		handleCompleteCode(e) {
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						this.codePicUrl = res.tempFilePath
						uni.hideLoading()
					}
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.generate-code-container {
	position: absolute;
	top: -10000upx;
}
.code-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	transition: all 350ms;
	opacity: 0;

	.code-wrapper {
		width: 600upx;
		padding: 30upx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20upx;
		transform: scale(0);
		transition: all 350ms;

		.images {
			display: flex;
			margin: 30upx 0;
			justify-content: space-around;

			.zhiwen {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #999999;

				image {
					width: 120upx;
					height: 120upx;
					margin-bottom: 10upx;
				}
			}

			image {
				width: 200upx;
				height: 200upx;
				object-fit: cover;
			}
		}

		.header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.header-icon {
				width: 60upx;
				height: 60upx;
				margin-right: 10px;
			}
		}

		.big-wrapper {
			width: 100%;
			margin-top: 40upx;
			justify-content: center;
			display: flex;

			.big-icon {
				width: 280upx;
				height: 280upx;
				object-fit: cover;
			}
		}

		.code {
			width: 540upx;
			height: 540upx;
			object-fit: cover;
			// border-radius: 54upx;
		}

		.uni-btn {
			padding-top: 20upx;
			border-top: 1upx solid #ccc;
			font-size: 32upx;
			letter-spacing: 1em;
			color: #ccc;
		}
	}
}
</style>
