<template>
	<!-- 编辑/添加地址 -->
	<view class="add-address-container">
		<JHeader width="50" height="50" title="地址管理" style="padding: 24upx 0;"></JHeader>
		<view class="addressBack-box">
			<view class="consignee-box bor-line-F7F7F7">
				<input
					v-model="addressData.receiveName" maxlength="20" class="fs28" placeholder-class="consignee"
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
			<view class="location-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items">
				<view class="fs28 location">所在地</view>
				<view class="locationBox">
					<JSubArea
						:code="0" :text="addressData.receiveAdress" placeholder="请选择所在地"
						@confirm="handleSelectArea"
					></JSubArea>
					<tui-icon :size="31" color="#999999" name="arrowright" margin="0 0 0 20upx"></tui-icon>
				</view>
			</view>
			<view
				v-if="selectTownshipId && communityList && communityList.length" class="location-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items"
				@click="isShowCommunityListSelect = true"
			>
				<view class="fs28 location">所在小区</view>
				<view :style="{ color: selectTownshipId ? '#999999' : '#000000' }">
					请选择所在小区
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
			<view
				class="addressTag-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items"
				@click="addressTagShowFalg = true"
			>
				<view class="fs28 addressTag">地址标签</view>
				<view class="flex-items">
					<text>{{ addressData.tag }}</text>
					<tui-icon :size="31" color="#999999" name="arrowright" margin="0 0 0 20upx"></tui-icon>
				</view>
			</view>
			<view class="defaultState-box flex-row-plus flex-sp-between flex-items">
				<view class="fs28 defaultState">设为默认地址</view>
				<tui-switch
					:scale-ratio="0.6" color="#C5AA7B" :checked="!!addressData.ifDefault"
					@change="(e) => addressData.ifDefault = Number(e.value)"
				></tui-switch>
			</view>
		</view>
		<view v-if="type == 2" class="deleteAddress-box" @click="delAddress">
			<text class="font-color-C5AA7B">删除收货地址</text>
		</view>
		<view class="saveAddress-box">
			<view v-if="type == 1 || type == 3" class="saveAddress" @click="handleAddressClick">保存</view>
			<view v-else class="saveAddress" @click="handleAddressClick">保存</view>
		</view>
		<tui-picker
			:show="addressTagShowFalg" :picker-data="addressTagList" :value="[ addressData.tag ]"
			@hide="addressTagShowFalg = false" @change="(e) => addressData.tag = e.text"
		>
		</tui-picker>
		<!-- 银行 -->
		<tui-select
			:list="communityList" reverse :show="isShowCommunityListSelect" @confirm="handleSelectCommunityList"
			@close="isShowCommunityListSelect = false"
		></tui-select>
	</view>
</template>

<script>
import { T_RECEIVE_ITEM } from '../../../constant'
import { getReceiveAddressByIdApi, updateReceiveAddressApi, addReceiveAddressApi, deleteReceiveAddressApi, getCityCommunitySelectApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AddAddress',
	data() {
		return {
			type: 1, // 1.添加新地址 2.编辑收货地址
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
			ordertype: 0,
			addressData: {
				receiveId: '',
				receiveName: '',
				phone: '',
				receiveAdress: '',
				address: '',
				ifDefault: 0,
				defaultRegion: [],
				province: '',
				city: '',
				area: '',
				township: '',
				communityName: '',
				areaId: '',
				communityId: '',
				tag: ''
			},
			selectTownshipId: '',
			selectCommunityId: '',
			communityList: [],
			isShowCommunityListSelect: false
		}
	},
	onLoad(options) {
		this.type = options.type
		if (options.ordertype == 1) this.ordertype = 1
		this.addressData.receiveId = options.receiveId
		if (this.type == 2) {
			uni.showLoading()
			getReceiveAddressByIdApi({ receiveId: options.receiveId }).then((res) => {
				this.addressData.receiveName = res.data.receiveName
				this.addressData.phone = res.data.receivePhone
				this.addressData.receiveAdress = res.data.receiveAdress
				this.addressData.address = res.data.address
				this.addressData.tag = res.data.label
				this.addressData.ifDefault = res.data.ifDefault
				this.addressData.defaultRegion = res.data.receiveAdress.split('-')
				this.addressData.province = this.addressData.defaultRegion[0] || ''
				this.addressData.city = this.addressData.defaultRegion[1] || ''
				this.addressData.area = this.addressData.defaultRegion[2] || ''
				this.addressData.township = this.addressData.defaultRegion[3] || ''
				this.addressData.communityName = this.addressData.defaultRegion[4] || ''
				this.addressData.areaId = this.addressData.areaId || ''
				this.addressData.communityId = this.addressData.communityId || ''
				this.addressData.receiveId = res.data.receiveId
				uni.hideLoading()
			})
		}
		if (this.type == 3) {
			const obj = JSON.parse(options.wxAddressData)
			this.addressData = { ...this.addressData, ...obj }
		}
	},
	methods: {
		handleSelectArea(e) {
			this.addressData.receiveAdress = e.areaInfo.reduce((total, value, index, arr) => `${index ? total + '-' : ''}${value.text}`, '')
			this.addressData.province = e.areaInfo[0].text
			this.addressData.city = e.areaInfo[1].text
			this.addressData.area = (e.areaInfo[2] && e.areaInfo[2].text) || ''
			this.addressData.township = (e.areaInfo[3] && e.areaInfo[3].text) || ''
			this.addressData.areaId = (e.areaInfo[e.areaInfo.length - 1] && e.areaInfo[e.areaInfo.length - 1].id) || ''
			this.selectTownshipId = (e.areaInfo[3] && e.areaInfo[3].id) || ''
			if (this.selectTownshipId) this.handleGetCommunityList(this.selectTownshipId)
		},
		handleGetCommunityList(cityId) {
			uni.showLoading()
			getCityCommunitySelectApi({ cityId })
				.then(({ data }) => {
					this.communityList = data.map((item) => ({
						...item,
						value: item.id,
						text: item.communityName
					}))
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleSelectCommunityList(e) {
			this.isShowCommunityListSelect = false
			this.addressData.communityName = e.options.text
			this.selectCommunityId = e.options.value
		},
		handleAddressClick() {
			const phoneCodeVerification = /^[1][3-9][0-9]{9}$/
			if (!this.addressData.receiveName) {
				this.$showToast('请输入收货人！')
			} else if (!this.addressData.phone) {
				this.$showToast('请输入手机号！')
			} else if (!phoneCodeVerification.test(this.addressData.phone)) {
				this.$showToast('请输入正确的手机号！')
			} else if (!this.addressData.province || !this.addressData.city) {
				this.$showToast('所在地不能为空！')
			} else if (!this.addressData.address) {
				this.$showToast('请输入详细地址！')
			} else if (this.communityList && this.communityList.length && !this.addressData.communityName) {
				this.$showToast('请选择所在社区！')
			} else if ((this.type == 1) || (this.type == 3)) {
				addReceiveAddressApi({
					receiveName: this.addressData.receiveName,
					receivePhone: this.addressData.phone,
					receiveAdress: this.addressData.communityName ? `${this.addressData.receiveAdress}-${this.addressData.communityName}` : `${this.addressData.receiveAdress}`,
					areaId: this.addressData.areaId,
					communityId: this.addressData.communityId,
					address: this.addressData.address,
					label: this.addressData.tag,
					ifDefault: this.addressData.ifDefault
				}).then((res) => {
					if (this.ordertype == 1) {
						uni.setStorageSync(T_RECEIVE_ITEM, res.data)
						uni.navigateBack({
							delta: 2
						})
					} else {
						uni.navigateBack()
					}
				})
			} else {
				updateReceiveAddressApi({
					receiveId: this.addressData.receiveId,
					receiveName: this.addressData.receiveName,
					receivePhone: this.addressData.phone,
					receiveAdress: this.addressData.communityName ? `${this.addressData.receiveAdress}-${this.addressData.communityName}` : `${this.addressData.receiveAdress}`,
					areaId: this.addressData.areaId,
					communityId: this.addressData.communityId,
					address: this.addressData.address,
					label: this.addressData.tag,
					ifDefault: this.addressData.ifDefault
				}).then((res) => {
					uni.navigateBack()
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
						deleteReceiveAddressApi({
							receiveId: this.addressData.receiveId
						}).then((res) => {
							if (res.code === '200') {
								uni.navigateBack()
							}
						})
					}
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
