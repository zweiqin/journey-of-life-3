<template>
	<view class="container">
		<JHeader title="添加银行卡" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="addressBack-box">
			<view class="consignee-box bor-line-F7F7F7">
				<input v-model="username" maxlength="20" class="fs28" placeholder-class="consignee" placeholder="姓名" />
			</view>
			<view class="iphoneNum-box bor-line-F7F7F7">
				<input
					v-model="phone" type="number" maxlength="11" class="fs28"
					placeholder-class="iphoneNum"
					placeholder="手机号码"
				/>
			</view>
			<view class="consignee-box bor-line-F7F7F7">
				<input v-model="bankName" maxlength="20" class="fs28" placeholder-class="consignee" placeholder="银行名称" />
			</view>
			<view class="cardnum">
				<input
					v-model="cardNum" type="number" class="fs28" maxlength="20"
					placeholder-class="detailAddress"
					placeholder="卡号"
				/>
			</view>
		</view>
		<view v-if="type == 2" class="deleteBankcard-box">
			<label class="font-color-C5AA7B" @click="delBankcard">删除银行卡</label>
		</view>
		<view class="saveAddress-box">
			<view v-if="type == 1" class="saveAddress" @click="saveBankcardClick">添加银行卡</view>
			<view v-else class="saveAddress" @click="saveBankcardClick">保存</view>
		</view>

	</view>
</template>

<script>
import { getByIdUserBankcardApi, addUserBankcardApi, updateUserBankcardApi, deleteUserBankcardApi } from '../../../api/anotherTFInterface'

export default {
	name: 'AddBankcard',
	data() {
		return {
			show: false,
			type: 1, // 1.添加银行卡 2.编辑银行卡
			cardNum: '',
			bankcardId: '',
			bankCode: '',
			bankName: '',
			username: '',
			phone: '',
			id: ''
		}
	},
	onLoad(options) {
		if (options.type) {
			this.type = options.type
		}
		if (this.type == 2) {
			this.bankcardId = options.id
			this.renderBankcard(this.bankcardId)
		}
	},
	methods: {
		renderBankcard(bankcardId) {
			getByIdUserBankcardApi({ bankId: bankcardId }).then((res) => {
				const bankCard = res.data
				this.id = bankcardId
				this.username = bankCard.name
				this.phone = bankCard.phone
				this.bankName = bankCard.bankName
				this.bankCode = bankCard.bankCode
				this.cardNum = bankCard.bankCard
			})
		},
		// 新增或更新银行卡
		saveBankcardClick() {
			const _ = this
			const phoneCodeVerification = /^[1][3-9][0-9]{9}$/
			if (this.username == '') {
				uni.showToast({
					title: '请输入姓名！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.phone == '') {
				uni.showToast({
					title: '请输入手机号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (!phoneCodeVerification.test(this.phone)) {
				uni.showToast({
					title: '请输入正确的手机号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.bankName == '') {
				uni.showToast({
					title: '请填写银行名称！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.cardNum == '') {
				uni.showToast({
					title: '请输入卡号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.cardNum.length != 16 && this.cardNum.length != 19) {
				uni.showToast({
					title: '请输入正确的卡号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.type == 1) {
				addUserBankcardApi({
					name: this.username,
					phone: this.phone,
					bankName: this.bankName,
					bankCard: this.cardNum
				}).then((res) => {
					uni.showToast({
						title: '添加成功',
						duration: 2000,
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				})
			} else {
				updateUserBankcardApi({
					bankId: this.id,
					name: this.username,
					phone: this.phone,
					bankName: this.bankName,
					bankCard: this.cardNum
				}).then((res) => {
					this.$showToast('操作成功')
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				})
			}
		},
		// 删除银行卡
		delBankcard() {
			uni.showModal({
				title: '温馨提示',
				content: '确认删除该银行卡？',
				confirmText: '确定',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm) {
						deleteUserBankcardApi({
							bankId: this.bankcardId
						}).then((res) => {
							this.$showToast('删除成功')
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	background-color: #F7F7F7;
	min-height: 100vh;
	box-sizing: border-box;

	.addressBack-box {
		padding: 30upx 30upx;

		.consignee-box {
			padding-bottom: 36upx;
			width: 690upx;
			margin-top: 20upx;

			.consignee {
				color: #999999;
				font-size: 28upx;
			}
		}

		.iphoneNum-box {
			padding-bottom: 36upx;
			width: 690upx;
			margin-top: 36upx;

			.iphoneNum {
				color: #999999;
				font-size: 28upx;
			}
		}

		.cardnum {
			margin-top: 19px;
		}
	}

	.saveAddress-box {
		position: fixed;
		bottom: 50upx;
		left: 30upx;

		.saveAddress {
			width: 690upx;
			height: 100upx;
			color: #FFEBC4;
			text-align: center;
			line-height: 100upx;
			background: #333333;
		}
	}
}

.deleteBankcard-box {
	background-color: #FFFFFF;
	padding: 30upx 30upx;
	margin-top: 20upx;
	text-align: center;
}
</style>
