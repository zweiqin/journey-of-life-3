<template>
	<view class="delivey-info">
		<Header redirect="/community-center/vip-center/vip-detail" bgc="#e95d20" title="完善服务信息"></Header>
		<!-- redirect="/pages/community-center/community-center" -->
		<view class="info">
			<view class="title">客户信息</view>
			<!-- {{ consigneeForm }} -->
			<view class="main-wrapper">
				<Field v-model="consigneeForm[item['field']]" v-for="item in userInfo" :key="item.label" :data="item"
					class="field">
					<template v-if="item.select && item.field === 'consigneeAddress'">
						<pick-regions visibleMuti @getRegion="handleGetRegionEnd">
							<input type="text" class="uni-input" disabled v-model="consigneeForm.consigneeAddress" placeholder="请选择目的地"
								adjust-position cursor-spacing="180" />
						</pick-regions>
					</template>

					<template v-if="item.select && item.field === 'isElevator'">
						<picker @change="handleChooseElevator" :range="columns" style="width: 100%; height: 100%">
							<view class="elevator">{{ consigneeForm.isElevator }}</view>
						</picker>
					</template>
				</Field>

				<view class="tip-wrapper" v-show="showTip">
					<tui-alerts type="info" title="注意：你选择的区域不在接单范围内,只可享受网络服务"></tui-alerts>
				</view>

				<view class="remarks-container">
					<textarea v-model="consigneeForm.remarks" cols="30" rows="10" placeholder="请输入订单备注"></textarea>
				</view>
			</view>
		</view>

		<view class="info">
			<view class="title">已选服务</view>

			<view class="serve-name">
				<view class="serve-item-name" v-for="(item, index) in serveData.serverContent.split(',')" :key="index">
					<tui-icon margin="0 10rpx 0 0" color="rgb(255, 153, 0)" name="label-fill" :size="20"></tui-icon> {{ item }}
				</view>
			</view>
		</view>

		<Remarks style="margin-top: 20px" @distinguish="handleDistinguish" :isDistinguish="true"
			:distinguish="'输入姓名，电话，地址自动识别\n粘贴地址信息例如：马*明，135467****，广东省佛山市顺德区xxxxx'"></Remarks>

		<Button type="error" @click="confirm">确定</Button>
	</view>
</template>

<script>
import Field from './components/field.vue'
import PickRegions from '../components/pick-regions/pick-regions.vue'
import Button from './components/button.vue'
import Remarks from './components/remarks.vue'
import Header from './components/header.vue'
import { consigneeVipInfo, mapBackRoute } from './config'
import { getUserId } from '../utils'
import {
	createRepairOrderApi,
	payOrderForBeeStewadApi,
	getIsOpenServerAreaApi,
} from '../api/community-center'
export default {
	components: {
		Field,
		PickRegions,
		Button,
		Remarks,
		Header,
	},
	data() {
		return {
			consigneeForm: {
				consigneeName: '',
				consigneeMobile: '',
				consigneeAddress: '',
				consigneeAddressDetail: '',
				isElevator: '有',
				floor: '',
				remarks: '',
			},
			userInfo: [],
			columns: ['有', '无'],
			cacheName: 'CONSIGNEE_',
			showTip: false,
		}
	},

	onShow() {
		const consigneeInfo = uni.getStorageSync(`${this.cacheName}INFO`)

		if (consigneeInfo) {
			this.consigneeForm.consigneeName = consigneeInfo.consigneeName
			this.consigneeForm.consigneeMobile = consigneeInfo.consigneeMobile
			this.consigneeForm.consigneeAddress = consigneeInfo.consigneeAddress
			this.consigneeForm.consigneeAddressDetail =
				consigneeInfo.consigneeAddressDetail
			this.consigneeForm.floor = consigneeInfo.floor + ''
			this.consigneeForm.isElevator = consigneeInfo.isElevator ? '有' : '无'
		}
	},
	onLoad(option) {
		this.serveData = option.data
		if (this.serveData) {
			this.serveData = JSON.parse(option.data)
		} else {
			uni.showToast({
				title: '未选择服务，请选择服务',
				duration: 2000,
				icon: 'none',
			})

			setTimeout(() => {
				uni.redirectTo(
					{
						url: '/community-center/vip-center/vip-detail',
					},
					2000
				)
			})
		}

		if (option.repair) {
			this.cacheName = 'REPAIR_'
		}

		this.filterDate()
	},
	methods: {
		// 点击确定
		async confirm() {
			const _this = this

			if (
				!this.consigneeForm.consigneeName ||
				!this.consigneeForm.consigneeMobile ||
				!this.consigneeForm.consigneeAddress ||
				!this.consigneeForm.consigneeAddressDetail
			) {
				uni.showToast({
					title: '请填写完提货信息',
					icon: 'none',
				})

				return
			}

			if (this.consigneeForm.consigneeMobile.length !== 11) {
				uni.showToast({
					title: '手机号不合法',
					icon: 'none',
				})

				return
			}

			const data = {
				isVipSetmeal: 1,
				userId: getUserId(),
				orderType: 1,
				pricingType: 1,
				paymentMethod: 1,
				deliveryType: 4,
				price: this.serveData.serverPrice,
				actualPrice: this.serveData.serverPrice,
				dictName:
					this.serveData.serverType === 1
						? this.serveData.serverName
						: this.serveData.serverContent,
				serverId: this.serveData.id,
				consigneeAddress: this.consigneeForm.consigneeAddress,
				consigneeAddressDetail: this.consigneeForm.consigneeAddressDetail,
				remarks: this.consigneeForm.remarks,
				consigneeName: this.consigneeForm.consigneeName,
				consigneeMobile: this.consigneeForm.consigneeMobile,
			}

			const createOrderRes = await createRepairOrderApi(data)
			if (createOrderRes.statusCode == 20000) {
				const payResult = await payOrderForBeeStewadApi({
					userId: getUserId(),
					orderNo: createOrderRes.data,
				})

				if (payResult.statusCode === 20000) {
					_this.address = ''
					uni.removeStorageSync(`${this.cacheName}INFO`)
					const res = JSON.parse(payResult.data)
					const form = document.createElement('form')
					form.setAttribute('action', res.url)
					form.setAttribute('method', 'POST')

					const data = JSON.parse(res.data)
					let input
					for (const key in data) {
						input = document.createElement('input')
						input.name = key
						input.value = data[key]
						form.appendChild(input)
					}

					document.body.appendChild(form)
					form.submit()
					document.body.removeChild(form)
				} else {
					uni.showToast({
						title: '支付失败',
						duration: 2000,
						icon: 'none',
					})
				}
			} else {
				uni.showToast({
					title: createOrderRes.statusMsg,
					duration: 2000,
					icon: 'none',
				})
			}
		},
		// 选择省市区
		async handleGetRegionEnd(region) {
			this.consigneeForm.consigneeAddress = region
				.map(item => item.name)
				.join('')

			const res = await getIsOpenServerAreaApi({
				address: this.consigneeForm.consigneeAddress,
			})

			this.showTip = !res.data
		},
		// 点击识别
		handleDistinguish(result) {
			this.consigneeForm.consigneeName = result.person
			this.consigneeForm.consigneeMobile = result.phonenum
			this.consigneeForm.consigneeAddress =
				result.province + result.city + result.county
			this.consigneeForm.consigneeAddressDetail = result.detail
		},

		// 点击选择有无电梯
		handleChooseElevator(e) {
			this.consigneeForm.isElevator = e.detail.value + '' == 1 ? '无' : '有'
			console.log(e.detail.value, this.consigneeForm)
		},

		// 过滤列表
		filterDate() {
			let data = consigneeVipInfo
			if (this.cacheName === 'REPAIR_') {
				data = data.filter(item => {
					console.log(item.field !== 'isElevator')
					return item.field !== 'isElevator' && item.field !== 'floor'
				})
			}
			this.userInfo = data
		},
	},
}
</script>

<style lang="less" scoped>
.delivey-info {
	padding-bottom: 170upx;

	.info {
		.title {
			color: #888;
			margin: 47upx auto 12upx 30upx;
			font-size: 26upx;
		}

		.main-wrapper {
			background-color: #fff;
		}

		.field {
			border-bottom: 1upx solid rgb(228, 228, 228);
		}
	}

	.elevator {
		color: #111;
		font-size: 34upx;
	}

	.serve-name,
	.remarks-container {
		padding: 30upx 34upx;
	}

	.serve-item-name {
		color: #3d3d3d;
		font-size: 32upx;
		line-height: 2;


	}

	uni-textarea {
		height: 100upx;
		width: 100%;
	}

	.tip-wrapper {
		padding: 20upx;
		box-sizing: border-box;

		/deep/ .tui-alert__wrap {
			background-color: #bababa !important;
		}
	}
}
</style>
