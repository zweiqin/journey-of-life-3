<template>
	<!-- 编辑/添加地址 -->
	<view class="add-address-container">
		<JHeader width="50" height="50" title="地址管理"></JHeader>
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
					<JSubArea :code="0" :text="addressData.receiveAdress" placeholder="请选择所在地" @confirm="handleSelectArea">
					</JSubArea>
					<tui-icon :size="31" color="#999999" name="arrowright" margin="0 0 0 20rpx"></tui-icon>
				</view>
			</view>
			<view
				v-if="selectTownshipId && communityList && communityList.length"
				class="location-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items"
				@click="isShowCommunityListSelect = true"
			>
				<view class="fs28 location">所在小区</view>
				<view :style="{ color: addressData.communityId ? '#000000' : '#999999' }">
					{{ addressData.communityName || '请选择所在小区（可选）' }}
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
					<tui-icon :size="31" color="#999999" name="arrowright" margin="0 0 0 20rpx"></tui-icon>
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
		<view v-if="addressData.receiveId" class="deleteAddress-box" @click="delAddress">
			<text class="font-color-C5AA7B">删除收货地址</text>
		</view>
		<view class="saveAddress-box">
			<view class="saveAddress" @click="handleAddressClick">保存</view>
		</view>
		<tui-picker
			:show="addressTagShowFalg"
			:picker-data="[{ value: '1', text: '家' }, { value: '2', text: '公司' }, { value: '3', text: '学校' }]"
			:value="[ addressData.tag ]" @hide="addressTagShowFalg = false" @change="(e) => addressData.tag = e.text"
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
import { getReceiveAddressByIdApi, updateReceiveAddressApi, addReceiveAddressApi, deleteReceiveAddressApi, getCityCommunitySelectApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AddAddress',
	data() {
		return {
			eventName: '',
			addressTagShowFalg: false,
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
			communityList: [],
			isShowCommunityListSelect: false
		}
	},
	onLoad(options) {
		this.eventName = options.eventName || ''
		this.addressData.receiveId = options.receiveId || ''
		if (this.addressData.receiveId) {
			uni.showLoading()
			getReceiveAddressByIdApi({ receiveId: this.addressData.receiveId }).then((res) => {
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
				this.addressData.areaId = res.data.areaId || ''
				this.addressData.communityId = res.data.communityId || ''
				this.addressData.receiveId = res.data.receiveId
				uni.hideLoading()
			})
		}
		if (options.wxAddressData) {
			this.addressData = { ...this.addressData, ...JSON.parse(options.wxAddressData) }
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
			this.addressData.communityId = ''
			this.addressData.communityName = ''
			// if (this.selectTownshipId) this.handleGetCommunityList(this.selectTownshipId)
		},
		handleGetCommunityList(cityId) {
			uni.showLoading()
			getCityCommunitySelectApi({ cityId })
				.then(({ data }) => {
					this.communityList = data.map((item) => ({
						value: item.id,
						text: item.communityName
					}))
					console.log(this.communityList)
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleSelectCommunityList(e) {
			this.isShowCommunityListSelect = false
			this.addressData.communityName = e.options.text
			this.addressData.communityId = e.options.value
		},
		handleAddressClick() {
			if (!this.addressData.receiveName) return this.$showToast('请输入收货人！')
			if (!this.addressData.phone) return this.$showToast('请输入手机号！')
			if (!/^[1][3-9][0-9]{9}$/.test(this.addressData.phone)) return this.$showToast('请输入正确的手机号！')
			if (!this.addressData.province || !this.addressData.city) return this.$showToast('所在地不能为空！')
			if (!this.addressData.address) return this.$showToast('请输入详细地址！')
			// if (this.communityList && this.communityList.length && !this.addressData.communityName) return this.$showToast('请选择所在社区！')
			if (this.addressData.receiveId) {
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
					uni.navigateBack({
						delta: 1,
						success: this.eventName ? uni.$emit(this.eventName) : () => { }
					})
				})
			} else {
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
					uni.navigateBack({
						delta: 1,
						success: this.eventName ? uni.$emit(this.eventName) : () => { }
					})
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
							uni.navigateBack({
								delta: 1,
								success: this.eventName ? uni.$emit(this.eventName) : () => { }
							})
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.add-address-container {
	background-color: #F7F7F7;
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0;
	}

	.addressBack-box {
		background-color: #FFFFFF;
		padding: 30rpx 30rpx;

		.consignee-box {
			padding-bottom: 36rpx;
			width: 690rpx;
			margin-top: 20rpx;

			.consignee {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.iphoneNum-box {
			padding-bottom: 36rpx;
			width: 690rpx;
			margin-top: 36rpx;

			.iphoneNum {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.location-box {
			padding-bottom: 36rpx;
			width: 690rpx;
			margin-top: 36rpx;

			.location {
				color: #999999;
				font-size: 28rpx;
			}

			.locationBox {
				display: flex;
				align-items: center;
			}
		}

		.detailAddress-box {
			padding-bottom: 36rpx;
			width: 690rpx;
			margin-top: 36rpx;

			input {
				width: 100%;
			}

			.detailAddress {
				color: #999999;
				font-size: 28rpx;
			}
		}
	}

	.addressTagBack-box {
		background-color: #FFFFFF;
		padding: 30rpx 30rpx;
		margin-top: 20rpx;

		.addressTag-box {
			padding-bottom: 36rpx;
			width: 690rpx;

			.addressTag {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.defaultState-box {
			padding-bottom: 10rpx;
			width: 690rpx;
			margin-top: 36rpx;

			.defaultState {
				color: #999999;
				font-size: 28rpx;
			}
		}
	}

	.saveAddress-box {
		position: fixed;
		bottom: 50rpx;
		left: 30rpx;

		.saveAddress {
			width: 690rpx;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
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
	padding: 30rpx 30rpx;
	margin-top: 20rpx;
}
</style>
