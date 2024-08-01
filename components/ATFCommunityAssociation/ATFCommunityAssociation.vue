<template>
	<view class="community-association-container">
		<!-- 先判断有无绑定加盟商 -->
		<view v-if="benefitinFranchiseesPhone" :style="{ margin, padding }">
			<view
				style="display: flex;align-items: center;justify-content: space-between;background-color: #ffffff;"
				:style="{ padding: paddingIn, borderRadius: radius }" @click="isShowPopup = true"
			>
				<view style="font-size: 26rpx;color: #333333;">所属小区</view>
				<view style="display: flex;align-items: center;">
					<view v-if="selectedCommunityStore && selectedCommunityStore.id" style="color: #C5AA7B;">
						<text>{{ selectedCommunityStore.communityName || '--' }}</text>
					</view>
					<view v-else-if="!communityStoreList || !communityStoreList.length" style="font-size: 26rpx;color: #333333;">
						暂无可选
					</view>
					<view v-else style="font-size: 26rpx;color: #333333;">点击选择</view>
					<tui-icon name="arrowright" :size="30" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
				</view>
			</view>
			<tui-bottom-popup :show="isShowPopup" @close="isShowPopup = false">
				<view>
					<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
						<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShowPopup = false"></tui-icon>
					</view>
					<view>
						<scroll-view scroll-y style="height: 900rpx;" @scrolltolower="handleScrolltolower">
							<view style="padding: 30rpx;">
								<view class="search-btn" style="display: flex;align-items: center;padding: 20rpx 0 12rpx;">
									<text style="font-size: 34rpx;">搜索词</text>
									<view style="flex: 1;margin-left: 16rpx;">
										<tui-input
											v-model="queryInfo.keyWord" placeholder="根据搜索词筛选" is-fillet
											padding="6rpx 10rpx 6rpx 26rpx" background-color="transparent"
										>
											<template #right>
												<tui-button
													type="warning" width="120rpx" height="50rpx" shape="circle"
													@click="(selectedCommunityStore = { id: '', communityName: '', communitySn: '', communityAccount: { account: '' } }) &&
														((queryInfo.pageNo = 1) && getAllCommunityList())"
												>
													搜索
												</tui-button>
											</template>
										</tui-input>
									</view>
								</view>
								<!-- <view
									style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 0 12rpx;"
									>
									<text style="font-size: 34rpx;">是否社区账号</text>
									<view style="flex: 1;">
									<tui-radio-group
									:value="queryInfo.isCommunityAccount"
									@change="(e) => (selectedCommunityStore = { id: '', communityName: '', communitySn: '', communityAccount: { account: '' } }) &&
									(((queryInfo.isCommunityAccount = e.detail.value) || true) && (queryInfo.pageNo = 1) && getAllCommunityList())"
									>
									<view style="display: flex;flex-wrap: wrap;align-items: center;">
									<tui-label
									v-for="(item, index) in [{ name: '全部', value: '' }, { name: '否', value: '0' }, { name: '是', value: '1' }]"
									:key="index"
									>
									<tui-list-cell padding="0 16rpx">
									<view>
									<tui-radio
									:checked="queryInfo.isCommunityAccount === item.value" :value="item.value"
									color="#07c160" border-color="#999"
									>
									</tui-radio>
									<text>{{ item.name }}</text>
									</view>
									</tui-list-cell>
									</tui-label>
									</view>
									</tui-radio-group>
									</view>
									</view> -->

								<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 16rpx;">
									<view style="font-size: 34rpx;font-weight: bold;color: #333333;">选择关联社区店：</view>
									<view v-if="selectedCommunityStore.id" style="text-align: right;">
										<tui-radio-group
											:value="String(selectedCommunityStore.id)"
											@change="(e) => (selectedCommunityStore.id = e.detail.value) || (isShowPopup = false)"
										>
											<tui-label>
												<tui-list-cell padding="0 16rpx">
													<view>
														<text style="padding-right: 10rpx;">取消选择</text>
														<tui-radio value="" color="#e98166" border-color="#999"></tui-radio>
													</view>
												</tui-list-cell>
											</tui-label>
										</tui-radio-group>
									</view>
								</view>
								<view v-if="communityStoreList && communityStoreList.length" style="margin-top: 10rpx;">
									<view
										v-for="(item, index) in communityStoreList" :key="index"
										style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 30rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;"
										@click="handleCommunityStoreItemTap(item)"
									>
										<view>
											<view>{{ item.communityName }}</view>
											<view style="font-size: 26rpx;color: #999999;">
												{{ item.areaAddress || `编号：${item.communitySn || '--'}` }}
											</view>
										</view>
										<tui-icon
											v-if="selectedCommunityStore.id === item.id" name="circle-fill" :size="40" unit="rpx"
											color="#c5aa7b" margin="0"
										></tui-icon>
									</view>
								</view>
							</view>
							<view style="padding-bottom: 45rpx;">
								<LoadingMore
									:status="!isEmpty && !communityStoreList.length
										? 'loading' : !isEmpty && communityStoreList.length && (communityStoreList.length >= communityListTotal) ? 'no-more' : ''"
								>
								</LoadingMore>
								<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
							</view>
						</scroll-view>
					</view>
				</view>
			</tui-bottom-popup>
		</view>
	</view>
</template>

<script>
import { getOrderAssociatedBeneficiaryApi, getCommunityListApi, getAreaDetailInfoApi, getCounCodeByDetailAddressApi, getFranchiseesCommissionApi, getCommunityCommissionApi } from '../../api/community-center'
import { getReceiveAddressByIdApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFCommunityAssociation',
	props: {
		margin: {
			type: String,
			default: '0'
		},
		padding: {
			type: String,
			default: '0'
		},
		paddingIn: {
			type: String,
			default: '28rpx 20rpx'
		},
		radius: {
			type: String,
			default: '0'
		},
		communityAddressInfo: {
			type: Object,
			default: () => ({ receiveId: '' })
		}
	},
	data() {
		return {
			benefitinFranchiseesPhone: '', // 受益人（加盟商）号码
			commissionSharingRatio: ['', '', ''], // 小区店和加盟商分佣比例。对于不同订单类型，顺序分别是：communityRatio社区订单分佣比例，有加盟商分佣才有社区店分佣。shoppingMallRatio商城订单分佣比例。businessDistrictRatio商圈订单分佣比例
			// 社区列表
			isShowPopup: false,
			queryInfo: {
				counCode: '', // 区编码。次序1
				franchiseesPhone: '', // 加盟商手机号。次序2。另外次序3为相关次序字段传空
				isCommunityAccount: '1', // ""-全部，"0"-否，"1"-是
				keyWord: '',
				pageNo: 1,
				pageSize: 20
			},
			isEmpty: false,
			communityStoreList: [],
			communityListTotal: 0,
			selectedCommunityStore: {
				id: '',
				communityName: '',
				communitySn: '',
				// areaId: '',
				// shopId: '',
				// franchiseesShopId: '',
				// bindFranchiseesTime: '',
				// commissionRate: '',
				communityAccount: {
					account: ''
					// mobile: '',
					// 	id: '',
					// 	openid: '',
					// 	payId: '',
					// 	password: '',
					// 	headUrl: '',
					// 	salt: '',
					// 	typ: '',
					// 	status: 1,
					// 	isCertification: '',
					// 	createTime: '',
					// 	updateTime: '',
					// 	verCode: null,
					// 	graphCode: null,
					// 	accountType: '',
					// 	shopId: '',
					// 	bindShopTime: ''
				}
			}
		}
	},

	watch: {
		benefitinFranchiseesPhone: { // 理论只会在首次加载时变化一次
			handler(newValue, oldValue) {
				if (newValue && this.communityAddressInfo.receiveId && !this.communityAddressInfo.receiveAdress) {
					uni.showLoading()
					getReceiveAddressByIdApi({ receiveId: this.communityAddressInfo.receiveId }).then((res) => {
						uni.hideLoading()
						this.getCounCodeByDetailAddress(res.data.receiveAdress)
					})
				} else if (newValue && this.communityAddressInfo.receiveId && this.communityAddressInfo.receiveAdress) { // 优先根据地址获取社区店列表
					this.getCounCodeByDetailAddress(this.communityAddressInfo.receiveAdress)
				} else if (newValue && !this.communityAddressInfo.receiveId) {
					// this.queryInfo.franchiseesPhone = newValue
					// this.getAllCommunityList()
				} else if (!this.benefitinFranchiseesPhone) { // 没有绑定加盟商的情况就没有社区店分佣，无需获取社区店列表
				}
			},
			immediate: false
		},
		communityAddressInfo: {
			handler(newValue, oldValue) {
				this.queryInfo.counCode = ''
				this.queryInfo.franchiseesPhone = ''
				this.communityStoreList = []
				this.selectedCommunityStore = { id: '', communityName: '', communitySn: '', communityAccount: { account: '' } }
				if (this.benefitinFranchiseesPhone && newValue.receiveId && !newValue.receiveAdress) {
					uni.showLoading()
					getReceiveAddressByIdApi({ receiveId: newValue.receiveId }).then((res) => {
						uni.hideLoading()
						this.getCounCodeByDetailAddress(res.data.receiveAdress)
					})
				} else if (this.benefitinFranchiseesPhone && newValue.receiveId && newValue.receiveAdress) { // 优先根据地址获取社区店列表
					this.getCounCodeByDetailAddress(newValue.receiveAdress)
				} else if (this.benefitinFranchiseesPhone && !newValue.receiveId) {
					// this.queryInfo.franchiseesPhone = this.benefitinFranchiseesPhone
					// this.getAllCommunityList()
				} else if (!this.benefitinFranchiseesPhone) { // 没有绑定加盟商的情况就没有社区店分佣，无需获取社区店列表
				}
			},
			immediate: false,
			deep: true
		}
	},

	created() {
		getOrderAssociatedBeneficiaryApi({ consumerPhone: this.$store.getters.userInfo.phone })
			.then((res) => {
				this.benefitinFranchiseesPhone = res.data.franchisees || ''
				this.$emit('change', {
					benefitinFranchiseesPhone: this.benefitinFranchiseesPhone,
					communityPhone: this.selectedCommunityStore.communityAccount.account,
					commissionSharingRatio: JSON.parse(JSON.stringify(this.commissionSharingRatio))
				})
				if (this.benefitinFranchiseesPhone) {
					getFranchiseesCommissionApi({ franchiseesPhone: this.$store.getters.userInfo.phone })
						.then((res) => {
							if (res && res.version) {
								if (res.statusCode === 20000) {
									this.commissionSharingRatio = ['', Number(res.data[1]), Number(res.data[2])]
									this.$emit('change', {
										benefitinFranchiseesPhone: this.benefitinFranchiseesPhone,
										communityPhone: this.selectedCommunityStore.communityAccount.account,
										commissionSharingRatio: JSON.parse(JSON.stringify(this.commissionSharingRatio))
									})
								} else {
									console.log('接口报错', res)
									this.$showToast(res.statusMsg)
								}
							} else {
								this.$showToast(`请求错误`)
							}
						})
						.catch((e) => {
							this.$showToast(`请求失败：${e.errMsg}`)
						})
				}
			})
	},
	methods: {
		getCounCodeByDetailAddress(detailAddress) {
			uni.showLoading()
			getCounCodeByDetailAddressApi({ detailAddress: detailAddress.replaceAll('-', '') })
				.then((res) => {
					uni.hideLoading()
					if (res && res.version) {
						if (res.statusCode === 20000) {
							this.queryInfo.counCode = res.data || ''
							this.getAllCommunityList()
						} else {
							console.log('接口报错', res)
							this.$showToast(res.statusMsg)
						}
					} else {
						this.$showToast(`请求错误`)
					}
				})
				.catch((e) => {
					uni.hideLoading()
					this.$showToast(`请求失败：${e.errMsg}`)
				})
		},
		getAllCommunityList(isLoadmore) {
			uni.showLoading()
			getCommunityListApi(this.queryInfo)
				.then((res1) => {
					uni.hideLoading()
					if (res1 && res1.version) {
						if (res1.statusCode === 20000) {
							this.communityListTotal = res1.data.total
							// 获取查询出的社区的地址
							uni.showLoading()
							getAreaDetailInfoApi({
								codeTownsStr: res1.data.records.map((item) => item.areaId).join(','),
								pageNo: 1,
								pageSize: 9999
							})
								.then((res2) => {
									uni.hideLoading()
									if (res2 && res2.version) {
										if (res2.statusCode === 20000) {
											if (res2.data.records && res2.data.records.length) {
												res1.data.records.forEach((item) => {
													const areaData = res2.data.records.find((section) => section.areaId == item.codeTown)
													if (areaData) {
														item.areaAddress = areaData.nameProv + areaData.nameCity + areaData.nameCoun + areaData.nameTown
													}
												})
											}
											if (isLoadmore) {
												this.communityStoreList.push(...res1.data.records)
											} else {
												this.communityStoreList = res1.data.records
											}
											this.isEmpty = this.communityStoreList.length === 0
										} else {
											console.log('接口报错', res2)
											this.$showToast(res2.statusMsg)
										}
									} else {
										this.$showToast(`请求错误`)
									}
								})
								.catch((e) => {
									uni.hideLoading()
									this.$showToast(`请求失败：${e.errMsg}`)
								})
						} else {
							console.log('接口报错', res1)
							this.$showToast(res1.statusMsg)
						}
					} else {
						this.$showToast(`请求错误`)
					}
				})
				.catch((e) => {
					uni.hideLoading()
					this.$showToast(`请求失败：${e.errMsg}`)
				})
		},

		// 社区店选择
		handleCommunityStoreItemTap(item) {
			if (this.selectedCommunityStore.id === item.id) return
			this.selectedCommunityStore = { ...item, communityAccount: item.communityAccount || { account: '' } }
			this.$emit('change', {
				benefitinFranchiseesPhone: this.benefitinFranchiseesPhone,
				communityPhone: this.selectedCommunityStore.communityAccount.account,
				commissionSharingRatio: JSON.parse(JSON.stringify(this.commissionSharingRatio))
			})
			uni.showLoading()
			getCommunityCommissionApi({ communityId: this.selectedCommunityStore.id })
				.then((res) => {
					uni.hideLoading()
					if (res && res.version) {
						if (res.statusCode === 20000) {
							this.commissionSharingRatio = [Number(res.data), this.commissionSharingRatio[1], this.commissionSharingRatio[2]]
							this.isShowPopup = false
							this.$emit('change', {
								benefitinFranchiseesPhone: this.benefitinFranchiseesPhone,
								communityPhone: this.selectedCommunityStore.communityAccount.account,
								commissionSharingRatio: JSON.parse(JSON.stringify(this.commissionSharingRatio))
							})
						} else {
							console.log('接口报错', res)
							this.$showToast(res.statusMsg)
						}
					} else {
						this.$showToast(`请求错误`)
					}
				})
				.catch((e) => {
					uni.hideLoading()
					this.$showToast(`请求失败：${e.errMsg}`)
				})
		},
		handleScrolltolower() {
			if (this.communityStoreList.length < this.communityListTotal) {
				++this.queryInfo.pageNo
				this.getAllCommunityList(true)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.community-association-container {
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}
}
</style>
