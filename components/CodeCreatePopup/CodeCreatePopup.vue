<template>
	<view
		class="code-mask" :style="{
			'opacity': codePicUrl ? '1' : '0',
			'z-index':
				codePicUrl ? '99' : '-1'
		}"
	>
		<view
			class="code-wrapper" :style="{
				transform: codePicUrl ? 'scale(1)' : 'scale(0)'
			}"
		>
			<view class="header">
				<view style="display: flex;justify-content: center;align-items: center;">
					<image
						class="header-icon"
						:src="common.seamingImgUrl(userInfo.headImage) || require('../../static/images/new-user/default-user-avatar.png')" mode=""
					/>
					<text>
						<text v-if="type === 'userInvitation'">我的邀请码：</text>
						<text v-if="type === 'franchiseeInvitation'">我的加盟商码：</text>
						<text v-else-if="type === 'shopInvitation'">我的商家码：</text>
						<text v-else-if="type === 'teamMembersInvitation'">我的社区邀请码：</text>
					</text>
					<text>
						<text v-if="type === 'userInvitation' || type === 'franchiseeInvitation' || type === 'shopInvitation' || type === 'teamMembersInvitation'">
							<text>{{ createCode }}</text>
							<text style="margin-left: 12rpx;font-size: 26rpx;color: #0061C8;" @click="$copy(createCode)">复制</text>
						</text>
						<text v-else></text>
					</text>
				</view>
				<view style="margin-top: 20rpx;">
					昵称：{{ userInfo.name || userInfo.wechatName }}&nbsp;&nbsp;&nbsp;&nbsp;用户ID：{{ userInfo.buyerUserId }}
				</view>
			</view>

			<view class="big-wrapper">
				<image src="../../static/images/new-user/ju-logo.jpg" class="big-icon" />
			</view>

			<view class="images">
				<view class="zhiwen">
					<tui-icon
						name="fingerprint" :size="128" unit="rpx"
						color="#767676"
						margin="0 0 12rpx 0"
					></tui-icon>
					<text>长按扫码</text>
				</view>
				<view style="text-align: center;">
					<image class="code" :src="codePicUrl" alt="" />
					<view
						v-if="type === 'userInvitation'" style="font-size: 26rpx;color: #06a6f0;"
						@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${userInfo.buyerUserId}&type=bindingUser&code=${createCode}`)"
					>
						复制链接
					</view>
					<view
						v-else-if="type === 'franchiseeInvitation'" style="font-size: 26rpx;color: #06a6f0;"
						@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${userInfo.buyerUserId}&type=bindingUser&code=${createCode}`)"
					>
						复制链接
					</view>
					<view
						v-else-if="type === 'shopInvitation'" style="font-size: 26rpx;color: #06a6f0;"
						@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${userInfo.buyerUserId}&type=bindingShop&code=${$store.state.auth.identityInfo.shopInfo.shopId || ''}~${createCode}`)"
					>
						复制链接
					</view>
					<view
						v-else-if="type === 'teamMembersInvitation'" style="font-size: 26rpx;color: #06a6f0;"
						@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${userInfo.buyerUserId}&type=bindingTeamMembers&code=${userInfo.phone}`)"
					>
						复制链接
					</view>
				</view>
			</view>

			<button class="uni-btn" @click="(type = '') || (createCode = '') || (qrcodeUrl = '') || (codePicUrl = '')">
				取消
			</button>
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
import { T_STORAGE_KEY } from '../../constant'
import { getUserInfoCodeApi, getPlatformRelationshipCodeApi } from '../../api/anotherTFInterface'
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
			this.userInfo = uni.getStorageSync(T_STORAGE_KEY)
			uni.showLoading({
				title: '生成中...'
			})
			if (type === 'userInvitation') {
				getPlatformRelationshipCodeApi({})
					.then((res) => {
						this.createCode = res.data.invitationCode || ''
						this.qrcodeUrl = `${this.rootUrl}/#/pages/jump/jump?userId=${this.userInfo.buyerUserId}&type=bindingUser&code=`
					})
			} else if (type === 'franchiseeInvitation') {
				getPlatformRelationshipCodeApi({})
					.then((res) => {
						this.createCode = res.data.invitationCode || ''
						this.qrcodeUrl = `${this.rootUrl}/#/pages/jump/jump?userId=${this.userInfo.buyerUserId}&type=bindingFranchisee&code=`
					})
			} else if (type === 'shopInvitation') {
				this.createCode = `${this.userInfo.phone}`
				this.qrcodeUrl = `${this.rootUrl}/#/pages/jump/jump?userId=${this.userInfo.buyerUserId}&type=bindingShop&code=${this.$store.state.auth.identityInfo.shopInfo.shopId || ''}~`
				// this.$refs.uqrcode.make({})
			} else if (type === 'teamMembersInvitation') {
				getUserInfoCodeApi({
					type: 1
				}).then((res) => {
					this.createCode = res.data.invitationCode || ''
					this.qrcodeUrl = `${this.rootUrl}/#/pages/jump/jump?userId=${this.userInfo.buyerUserId}&type=bindingTeamMembers&code=`
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

	.generate-code-container {
		position: absolute;
		top: -10000rpx;
	}

	.code-wrapper {
		width: 600rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
		transform: scale(0);
		transition: all 350ms;

		.images {
			display: flex;
			margin: 30rpx 0;
			justify-content: space-around;

			.zhiwen {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #999999;
			}

			image {
				width: 200rpx;
				height: 200rpx;
				object-fit: cover;
			}
		}

		.header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.header-icon {
				width: 60rpx;
				height: 60rpx;
				margin-right: 10px;
				border-radius: 50%;
			}
		}

		.big-wrapper {
			width: 100%;
			margin-top: 20rpx;
			justify-content: center;
			display: flex;

			.big-icon {
				width: 280rpx;
				height: 280rpx;
				object-fit: cover;
			}
		}

		.code {
			width: 540rpx;
			height: 540rpx;
			object-fit: cover;
			// border-radius: 54rpx;
		}

		.uni-btn {
			padding-top: 20rpx;
			border-top: 1rpx solid #ccc;
			font-size: 32rpx;
			letter-spacing: 1em;
			color: #ccc;
		}
	}
}
</style>
