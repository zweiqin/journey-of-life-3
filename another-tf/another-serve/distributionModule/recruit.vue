<template>
	<view class="recruit-container">
		<JHeader title="分销员招募令" width="50" height="50"></JHeader>
		<!-- 申请分销员 -->
		<view class="topBackImg flex-items flex-column">
			<view class="content mar-top-36">
				<view class="topColor"></view>
				<view class="text-box mar-left-30">
					<label class="fs-bold">分销员是什么？</label>
					<view class="fs24 font-color-656 mar-top-20">
						分销员是我们为拥有推广能力的用户推出的运营计划。你只需将高品质商品分享推荐给他人，收获他人的感谢的同时，挣得属于自己的利润。
					</view>
				</view>
				<view class="text-box mar-top-20 mar-left-30">
					<label class="fs-bold">我该怎么成为分销员？</label>
					<view class="fs24 font-color-656 mar-top-20">
						<view>
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">点击本页面的【我要成为分销员】，即可完成申请。</label>
						</view>
						<view class="flex-row-plus mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20 textDes">点击拥有分销员活动标识的分享按钮，将商品分享给好友或朋友圈。</label>
						</view>
						<view class="mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">朋友通过您的链接进入并购买一件商品。</label>
						</view>
						<view class="flex-row-plus textDes mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">我们收到已完成的订单时，会将本订单的佣金结算给您。</label>
						</view>
						<view class="mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">返回个人中心-分销中心，查看您的。</label>
						</view>
					</view>
				</view>
				<view class="text-box mar-top-20 mar-left-30">
					<label class="fs-bold">其他说明</label>
					<view class="fs24 font-color-656 mar-top-20">
						<view>
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">客户只有通过您的链接成交，才能返佣给您。</label>
						</view>
						<view class="flex-row-plus mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20 textDes"> 若订单发生退款，我们将去除本订单的佣金。</label>
						</view>
						<view class="mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">商品的售后问题，由本商店处理。</label>
						</view>
						<view class="flex-row-plus textDes mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">不传播任何违法违规信息，一经发现，即被清退，本商城不负任何责任。</label>
						</view>
						<view class="mar-top-20">
							<label class="fs-bold"> · </label>
							<label class="mar-left-20">以上内容解释权归本商城所有。</label>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view
			class="butBox flex-items-plus" :style="{ 'padding-bottom': (isIphone === true ? 20 : 0) + 'rpx' }"
			@click="informationShowClick"
		>
			<view class="submitbut">我要成为分销员</view>
		</view>
		<!-- 填写信息弹窗 -->
		<tui-popup :show="informationShowFalg" mode="fade" style="background-color: rgba(0,0,0,0.4);">
			<view class="informationShow-box">
				<view class="flex-items flex-column informationShow-centent">
					<view class="mar-top-60">
						<label class="fs-bold fs36">请填写相关信息</label>
					</view>
					<view class="flex-items flex-row mar-top-60">
						<view class="fs26 font-color-656">真实姓名<label class="font-color-red">*</label></view>
						<input v-model="userName" class="recruitName mar-left-20 fs26" maxlength="20" />
					</view>
					<view class="flex-items flex-row mar-top-30 phoneStyle">
						<label class="fs26 font-color-656">联系电话<label class="font-color-red">*</label></label>
						<input
							v-model="mobile" class="recruitIphone mar-left-20 fs26" disabled="disabled" type="number"
							maxlength="11"
						/>
					</view>
					<view class="flex-items flex-row mar-top-30 mar-left-40">
						<label class="fs26 font-color-656">邀请码</label>
						<input v-model="inviteId" class="recruitIphone mar-left-20 fs26" maxlength="6" />
					</view>
					<view class="flex-row-plus massageDes-but fs28">
						<view class="exitBut" @click="exitButClick">取消</view>
						<view class="submitbut" @click="submitbut">提交</view>
					</view>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../../constant'
import { addDistributorApplyApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Recruit',
	data() {
		return {
			informationShowFalg: false,
			item: '',
			userName: '',
			mobile: '',
			inviteId: '',
			shopId: 0,
			isIphone: false
		}
	},
	onLoad(options) {
		this.isIphone = getApp().globalData.isIphone
		this.shopId = parseInt(options.shopId)
	},
	methods: {
		informationShowClick() {
			this.informationShowFalg = true
			const res = uni.getStorageSync(T_STORAGE_KEY)
			this.mobile = res.phone
			if (!this.mobile) {
				uni.showToast({
					title: '请先绑定手机号!',
					icon: 'none'
				})
				this.$switchTab('/pages/community-center/community-centerr')
			}
		},
		exitButClick() {
			this.informationShowFalg = false
		},
		submitbut() {
			this.applyForRecruit()
		},
		// 申请为分销员
		applyForRecruit() {
			var regphone = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
			if (this.userName == '') {
				uni.showToast({
					title: '真实姓名不能为空',
					icon: 'none'
				})
			} else if (this.mobile == '') {
				uni.showToast({
					title: '手机号不能为空',
					icon: 'none'
				})
			} else if (!regphone.test(this.mobile)) {
				uni.showToast({
					title: '手机格式不正确',
					icon: 'none'
				})
			} else {
				addDistributorApplyApi({
					shopId: this.shopId,
					distributorPhone: this.mobile,
					distributorName: this.userName,
					invitationCode: this.inviteId
				}).then((res) => {
					this.informationShowFalg = false
					uni.showToast({
						title: '请等候审核...'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				})
					.catch((res) => {
						uni.showToast({
							title: '申请失败',
							icon: 'none'
						})
					})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.recruit-container {
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.topBackImg {
		width: 100%;
		height: 260rpx;
		background-color: #373737;
		background-size: 100% 260rpx;

		.content {
			width: 690rpx;
			background-color: #FFFFFF;

			.topColor {
				height: 60rpx;
			}

			.text-box {
				width: 622rpx;

				.textDes {
					width: 598rpx;
					line-height: 40rpx;
				}
			}
		}

	}

	.butBox {
		height: 130rpx;
		width: 100%;
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		background-color: #FFFFFF;
		box-shadow: 0rpx 3rpx 12rpx #999999;

		.submitbut {
			height: 80rpx;
			width: 690rpx;
			background: #333333;
			font-size: 28rpx;
			text-align: center;
			line-height: 80rpx;
			color: #FFEBC4;
		}
	}

	.informationShow-box {
		position: relative;
		background-color: #ffffff;
		border-radius: 14rpx;

		.flex-items {
			input {
				padding-left: 16rpx;
			}
		}

		.phoneStyle {
			input {
				background: #EEEEEE;
				color: #999999;
			}
		}

		.informationShow-centent {
			width: 520rpx;
			height: 550rpx;

			.recruitName {
				border: 2rpx solid #DDDDDD;
				width: 300rpx;
				height: 48rpx;
			}

			.recruitIphone {
				border: 2rpx solid #DDDDDD;
				width: 300rpx;
				height: 48rpx;
			}

			.massageDes-but {
				position: absolute;
				bottom: 0;
			}

			.exitBut {
				border: 1rpx solid #E5E5E5;
				width: 260rpx;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
			}

			.submitbut {
				background-color: #333333;
				width: 260rpx;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
				color: #FFFFFF;
			}
		}
	}
}
</style>
