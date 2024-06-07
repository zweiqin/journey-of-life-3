<template>
	<view class="container">
		<JHeader title="添加银行卡" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="upload-bank-card">
			<view class="image-wrapper">
				<view class="uploader" @click="handleUploadImg">{{ uploadBandCard ? '重新上传' : '上传照片' }}</view>
				<image v-if="uploadBandCard" class="bank-img" :src="uploadBandCard"></image>
				<view v-else class="tip">上传图片银行卡图片自动识别~</view>
			</view>
		</view>
		<view class="addressBack-box">
			<view class="consignee-box bor-line-F7F7F7">
				<input v-model="username" maxlength="20" class="fs28" placeholder-class="consignee" placeholder="请填写真实姓名" />
			</view>
			<view class="iphoneNum-box bor-line-F7F7F7">
				<input
					v-model="phone" type="number" maxlength="11" class="fs28"
					placeholder-class="iphoneNum"
					placeholder="请填写手机号码"
				/>
			</view>
			<view class="consignee-box bor-line-F7F7F7">
				<input v-model="bankName" maxlength="20" class="fs28" placeholder-class="consignee" placeholder="请填写银行名称" />
			</view>
			<view class="cardnum">
				<input
					v-model="cardNum" type="number" class="fs28" maxlength="20"
					placeholder-class="detailAddress"
					placeholder="请填写卡号"
				/>
			</view>
		</view>
		<view v-if="bankcardId" class="deleteBankcard-box">
			<label class="font-color-C5AA7B" @click="delBankcard">删除银行卡</label>
		</view>
		<view class="saveAddress-box">
			<view v-if="bankcardId" class="saveAddress" @click="saveBankcardClick">保存</view>
			<view v-else class="saveAddress" @click="saveBankcardClick">添加银行卡</view>
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getByIdUserBankcardApi, addUserBankcardApi, updateUserBankcardApi, deleteUserBankcardApi } from '../../../api/anotherTFInterface'
import { bankCardAnalysisApi } from '../../../api/community-center'
import { USER_INFO, T_STORAGE_KEY } from '../../../constant'
import { ANOTHER_TF_UPLOAD } from '../../../config'

export default {
	name: 'AddBankcard',
	data() {
		return {
			cardNum: '',
			bankcardId: '',
			bankName: '',
			username: '',
			phone: '',
			uploadBandCard: null
		}
	},
	onLoad(options) {
		const userInfo = uni.getStorageSync(USER_INFO)
		if (userInfo) {
			this.phone = userInfo.phone
		}
		this.bankcardId = options.id || ''
		if (this.bankcardId) {
			getByIdUserBankcardApi({ bankId: this.bankcardId })
				.then((res) => {
					const bankCard = res.data
					this.username = bankCard.name
					this.phone = bankCard.phone
					this.bankName = bankCard.bankName
					this.cardNum = bankCard.bankCard
				})
		}
	},
	methods: {
		// 新增或更新银行卡
		saveBankcardClick() {
			if (!this.username) return this.$showToast('请输入姓名！')
			if (!this.phone) return this.$showToast('请输入手机号！')
			if (!/^[1][3-9][0-9]{9}$/.test(this.phone)) return this.$showToast('请输入正确的手机号！')
			if (!this.bankName) return this.$showToast('请填写银行名称！')
			if (!this.cardNum) return this.$showToast('请输入卡号！')
			if ((this.cardNum.length != 16) && (this.cardNum.length != 19)) return this.$showToast('请输入正确的卡号！')
			if (this.bankcardId) {
				updateUserBankcardApi({
					bankId: this.bankcardId,
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
			} else {
				addUserBankcardApi({
					name: this.username,
					phone: this.phone,
					bankName: this.bankName,
					bankCard: this.cardNum
				}).then((res) => {
					this.$showToast('添加成功')
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
		},

		handleUploadImg() {
			const _this = this
			uni.chooseImage({
				success: (chooseImageRes) => {
					const imgPath = chooseImageRes.tempFiles[0].path
					if (!imgPath) return
					uni.showLoading({
						title: '上传中...'
					})
					uni.uploadFile({
						url: ANOTHER_TF_UPLOAD,
						filePath: imgPath,
						name: 'file',
						header: {
							Authorization: (uni.getStorageSync(T_STORAGE_KEY) || {}).token
						},
						formData: {
							'folderId': -1
						},
						success: (uploadFileRes) => {
							uni.hideLoading()
							const imgUrl = JSON.parse(uploadFileRes.data).data.url
							_this.uploadBandCard = imgUrl
							_this.bankCardAnalysis(imgUrl)
						},
						fail: (error) => {
							uni.hideLoading()
							_this.ttoast({
								type: 'fail',
								title: '图片上传失败',
								content: error
							})
						}
					})
				},
				fail: (fail) => {
					console.log(fail)
				}
			})
		},

		async bankCardAnalysis(imageUrl) {
			if (!imageUrl) {
				this.ttoast({
					type: 'fail',
					title: '银行卡解析失败',
					content: '请填写银行卡信息'
				})
				return
			}
			try {
				uni.showLoading({
					title: '银行卡解析中...'
				})
				const data = await bankCardAnalysisApi({
					imageUrl
				})
				this.bankName = (data.cardName + '').replaceAll(' ', '')
				this.cardNum = (data.cardNum + '').replaceAll(' ', '')
			} catch (err) {
				this.ttoast({
					type: 'fail',
					title: '银行卡解析失败',
					content: '请填写银行卡信息'
				})
				this.uploadBandCard = ''
			} finally {
				uni.hideLoading()
			}
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

	.upload-bank-card {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 670upx;
		height: 408upx;
		background-color: #F7FBFF;
		margin: 30upx auto;

		.image-wrapper {
			width: 585upx;
			height: 375upx;
			background-color: #fff;
			position: relative;

			.bank-img {
				width: 100%;
				height: 100%;
			}

			.uploader {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 143upx;
				height: 143upx;
				border-radius: 100px;
				background: rgba(4, 3, 33, 0.6);
				transform: translate(-50%, -50%);
				color: #fff;
				font-size: 28upx;
				line-height: 143upx;
				text-align: center;
				transition: all 350ms;
				z-index: 10;

				&:active {
					opacity: 0.8;
				}
			}

			.tip {
				font-size: 24upx;
				letter-spacing: 0.4em;
				margin-top: 300upx;
				text-align: center;
				color: #ccc;
			}
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
