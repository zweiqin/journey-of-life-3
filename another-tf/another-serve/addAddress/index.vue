<template>
	<!-- 编辑/添加地址 -->
	<view class="add-address-container">
		<JHeader width="50" height="50" title="地址管理" style="padding: 24upx 0;"></JHeader>
		<view class="addressBack-box">
			<view class="consignee-box bor-line-F7F7F7">
				<input
					v-model="addressData.username" maxlength="20" class="fs28" placeholder-class="consignee"
					placeholder="收货人"
				/>
			</view>
			<view class="iphoneNum-box bor-line-F7F7F7">
				<input
					v-model="addressData.phone" type="number" maxlength="11" class="fs28"
					placeholder-class="iphoneNum"
					placeholder="手机号码"
				/>
			</view>
			<view class="location-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items" @click="locationClick">
				<view class="fs28 location">所在地</view>
				<view class="locationBox">
					<JCity :text="addressData.ssqText" placeholder="请选择所在地" @confirm="cityChange"></JCity>
					<tui-icon :size="31" color="#999999" name="arrowright" margin="0 0 0 20upx"></tui-icon>
				</view>
			</view>
			<view class="detailAddress-box">
				<input
					v-model="addressData.address" class="fs28" maxlength="60" placeholder-class="detailAddress"
					placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元等"
				/>
			</view>
		</view>
		<view class="addressTagBack-box">
			<view class="addressTag-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items" @click="addressTagClick">
				<view class="fs28 addressTag">地址标签</view>
				<view class="flex-items">
					<text v-model="tag">{{ tag }}</text>
					<tui-icon :size="31" color="#999999" name="arrowright" margin="0 0 0 20upx"></tui-icon>
				</view>
			</view>
			<view class="defaultState-box flex-row-plus flex-sp-between flex-items">
				<view class="fs28 defaultState">设为默认地址</view>
				<tui-switch
					:scale-ratio="0.6" color="#C5AA7B"
					:checked="!!ifDefault" @change="(e) => ifDefault = Number(e.value)"
				></tui-switch>
			</view>
		</view>
		<view v-if="type == 2" class="deleteAddress-box" @click="delAddress">
			<text class="font-color-C5AA7B">删除收货地址</text>
		</view>
		<view class="saveAddress-box">
			<view v-if="type == 1 || type == 3" class="saveAddress" @click="addAddressClick">保存</view>
			<view v-else class="saveAddress" @click="saveAddressClick">保存</view>
		</view>
		<tui-picker
			:show="addressTagShowFalg" :picker-data="addressTagList" :value="[ tag ]"
			@hide="addressTagShowFalg = false" @change="(e) => tag = e.text"
		>
		</tui-picker>
	</view>
</template>

<script>
import { T_RECEIVE_ITEM } from '../../../constant'
import { getReceiveAddressByIdApi, updateReceiveAddressApi, addReceiveAddressApi, deleteReceiveAddressApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AddAddress',
	data() {
		return {
			show: false,
			type: 1, // 1.添加新地址 2.编辑收货地址
			locationShowFalg: false,
			locationList: [],
			locationName: '',
			provinceName: '',
			cityName: '',
			districtName: '',
			addressTagList: [
				{
					value: '1',
					text: '家'
				},
				{
					value: '2',
					text: '公司'
				},
				{
					value: '3',
					text: '学校'
				}
			],
			addressTagShowFalg: false,
			areaList: [],
			username: '',
			phone: '',
			ssqText: '',
			address: '',
			tag: '',
			ifDefault: 0,
			province: '',
			city: '',
			area: '',
			id: '',
			ordertype: 0,
			editAddress: {},
			// defaultRegion: [],
			addressData: {
				username: '',
				phone: '',
				ssqText: '',
				address: '',
				defaultRegion: [],
				city: '',
				province: ''
			}
		}
	},
	onLoad(options) {
		this.type = options.type
		if (options.ordertype == 1) {
			this.ordertype = 1
		}
		const receiveId = options.receiveId
		this.id = receiveId
		if (this.type == 2) {
			// uni.showLoading({
			//   mask: true,
			//   title: '请稍后...',
			// })
			getReceiveAddressByIdApi({ receiveId }).then((res) => {
				this.editAddress = res.data
				this.addressData.username = this.editAddress.receiveName
				this.addressData.phone = this.editAddress.receivePhone
				this.addressData.ssqText = this.editAddress.receiveAdress
				this.addressData.address = this.editAddress.address
				this.tag = this.editAddress.label
				this.ifDefault = this.editAddress.ifDefault
				this.addressData.defaultRegion = this.addressData.ssqText.split('-')
				this.addressData.province = this.addressData.defaultRegion[0]
				this.addressData.city = this.addressData.defaultRegion[1]
				this.addressData.area = this.addressData.defaultRegion[2]
				this.addressData.id = this.editAddress.receiveId
				uni.hideLoading()
			})
		}
		if (this.type == 3) {
			const obj = JSON.parse(options.wxAddressData)
			this.addressData = obj
			// this.username = obj.username
			// this.phone = obj.phone
			// this.ssqText =  obj.ssqText
			// this.defaultRegion = obj.defaultRegion
			// this.address = obj.address
			// this.province = obj.provinceName
			// this.city = obj.cityName
		}
	},
	methods: {
		cityChange(e) {
			this.addressData.ssqText = e.province.text + '-' + e.city.text + '-' + e.county.text
			this.addressData.province = e.province.text
			this.addressData.city = e.city.text
			this.addressData.area = e.county.text
		},
		locationClick() {
			this.locationShowFalg = true
		},
		locationConfirm(e) {
			this.provinceName = e[0].label
			this.cityName = e[1].label
			this.districtName = e[2].label
			this.locationDot = '·'
		},
		addressTagClick() {
			this.addressTagShowFalg = true
		},
		// 编辑地址
		saveAddressClick() {
			const phoneCodeVerification = /^[1][3-9][0-9]{9}$/
			if (this.addressData.username == '') {
				uni.showToast({
					title: '请输入收货人！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.addressData.phone == '') {
				uni.showToast({
					title: '请输入手机号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (!phoneCodeVerification.test(this.addressData.phone)) {
				uni.showToast({
					title: '请输入正确的手机号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.addressData.province == '' || this.addressData.city == '') {
				uni.showToast({
					title: '所在地不能为空！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.addressData.address == '') {
				uni.showToast({
					title: '请输入详细地址！',
					duration: 2000,
					icon: 'none'
				})
			} else {
				updateReceiveAddressApi({
					receiveId: this.id,
					receiveName: this.addressData.username,
					receivePhone: this.addressData.phone,
					receiveAdress: this.addressData.ssqText,
					address: this.addressData.address,
					label: this.tag,
					ifDefault: this.ifDefault ? 1 : 0
				}).then((res) => {
					uni.navigateBack({
						delta: 1
					})
				})
			}
		},
		// 新增地址
		addAddressClick() {
			const phoneCodeVerification = /^[1][3-9][0-9]{9}$/
			if (this.addressData.username == '') {
				uni.showToast({
					title: '请输入收货人！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.addressData.phone == '') {
				uni.showToast({
					title: '请输入手机号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (!phoneCodeVerification.test(this.addressData.phone)) {
				uni.showToast({
					title: '请输入正确的手机号！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.addressData.province == '' || this.addressData.city == '') {
				uni.showToast({
					title: '所在地不能为空！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.addressData.address == '') {
				uni.showToast({
					title: '请输入详细地址！',
					duration: 2000,
					icon: 'none'
				})
			} else {
				addReceiveAddressApi({
					receiveName: this.addressData.username,
					receivePhone: this.addressData.phone,
					receiveAdress: this.addressData.ssqText,
					address: this.addressData.address,
					label: this.tag,
					ifDefault: this.ifDefault ? 1 : 0
				}).then((res) => {
					if (this.ordertype == 1) {
						uni.setStorageSync(T_RECEIVE_ITEM, res.data)
						uni.navigateBack({
							delta: 2
						})
					} else {
						uni.navigateBack({
							delta: 1
						})
					}
				})
			}
		},
		// 删除地址
		delAddress() {
			uni.showModal({
				title: '温馨提示',
				content: '是否删除此地址？',
				confirmText: '确定',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm) {
						this.subm()
					}
				}
			})
		},
		subm() {
			deleteReceiveAddressApi({
				receiveId: this.id
			}).then((res) => {
				if (res.code === '200') {
					uni.navigateBack({
						delta: 1
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.add-address-container {
	background-color: #F7F7F7;
	min-height: 100vh;
	box-sizing: border-box;

	.addressBack-box {
		background-color: #FFFFFF;
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

		.location-box {
			padding-bottom: 36upx;
			width: 690upx;
			margin-top: 36upx;

			.location {
				color: #999999;
				font-size: 28upx;
			}

			.locationBox {
				display: flex;
				align-items: center;
			}
		}

		.detailAddress-box {
			padding-bottom: 36upx;
			width: 690upx;
			margin-top: 36upx;

			input {
				width: 100%;
			}

			.detailAddress {
				color: #999999;
				font-size: 28upx;
			}
		}
	}

	.addressTagBack-box {
		background-color: #FFFFFF;
		padding: 30upx 30upx;
		margin-top: 20upx;

		.addressTag-box {
			padding-bottom: 36upx;
			width: 690upx;

			.addressTag {
				color: #999999;
				font-size: 28upx;
			}
		}

		.defaultState-box {
			padding-bottom: 10upx;
			width: 690upx;
			margin-top: 36upx;

			.defaultState {
				color: #999999;
				font-size: 28upx;
			}
		}
	}

	.saveAddress-box {
		position: fixed;
		bottom: 50upx;
		left: 30upx;

		.saveAddress {
			width: 690upx;
			height: 100upx;
			text-align: center;
			line-height: 100upx;
			background: #333333;
			color: #FFEBC4;
		}
	}

	.wxAddress {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		color: #999999;

		.wxBtnBox {
			width: 100rpx;
			height: 80rpx;

			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
}

.deleteAddress-box {
	background-color: #FFFFFF;
	padding: 30upx 30upx;
	margin-top: 20upx;
}
</style>
