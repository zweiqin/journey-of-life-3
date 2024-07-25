<template>
	<view class="service-sort-container">
    <TuanAppShim bg="#ffff"></TuanAppShim>
		<JHeader title="社区服务分类" width="50" height="50"></JHeader>

		<view style="display: flex;align-items: center;padding: 8rpx 14rpx 22rpx 18rpx;background-color: #ffffff;">
			<TuanLocation>
				<view style="display: flex;align-items: center;line-height: 1;">
					<text style="max-width: 130rpx;font-size:32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
						{{ $store.getters.currentShopCity || '定位失败' }}
					</text>
					<BeeIcon :size="26" name="turningdown" color="#222229"></BeeIcon>
				</view>
			</TuanLocation>
			<view style="flex: 1;margin-left: 10rpx;">
				<tui-input
					placeholder="搜索社区服务，一站式解决家居问题" placeholder-style="color: #666666;font-size: 24rpx;" clearable
					is-fillet padding="14rpx 10rpx 12rpx 24rpx" background-color="#e7e7e7"
					@click="go('/community-center/search')"
				>
					<template #left>
						<tui-icon :size="34" unit="rpx" color="#000000" name="search" margin="0 16rpx 0 0"></tui-icon>
						<view style="margin-right: 14rpx;width: 4rpx;height: 38rpx;background-color: #D8D8D8;"></view>
					</template>
				</tui-input>
			</view>
		</view>
		<view style="flex: 1;height: 0;display: flex;">
			<view
				style="max-width: 196rpx;height: 100%;padding: 28rpx 0 0;text-align: center;white-space: nowrap;background-color: #ffffff;box-sizing: border-box;"
			>
				<scroll-view style="height: 100%;" :scroll-top="scrollTop" scroll-y>
					<view
						style="display: flex;align-items: center;justify-content: center;padding: 8rpx 6rpx;"
						:style="{ backgroundColor: currentTab === 0 ? '#c70000' : '#c70000' }"
						@click="(currentTab = 0) || (currentName = '') || (currentTwoService = {})"
					>
						<image style="width: 48rpx;" src="../../static/images/icon/fire-orange.png" mode="widthFix" />
						<text style="font-weight: bold;" :style="{ color: currentTab === 0 ? '#ffffff' : '#efefef' }">
							当期热门
						</text>
					</view>
					<view style="padding: 2rpx 0 0;">
						<view v-for="(item, index) in serviceSortData" :key="item.serverNameOne" style="padding: 62rpx 6rpx 0;">
							<tui-collapse
								:index="index" :current="currentIndexMain" hd-bg-color="#ffffff" :arrow="false"
								@click="changeCurrentMain"
							>
								<template #title>
									<view
										style="font-size: 30rpx;font-weight: bold;"
										@click="(currentIndexMain !== index) && handleClickOneLevel(item)"
									>
										{{ item.serverNameOne }}
									</view>
								</template>
								<template #content>
									<view v-if="item.children && item.children.length">
										<view
											v-for="section in item.children" :key="section.serverNameTwo"
											style="display: flex;justify-content: center;padding: 20rpx 0 0;overflow-x: auto;"
											:class="`scroll-current-tab-${section.id}`" @click.stop="handleClickTwoLevel(section, item)"
										>
											<view
												style="padding-bottom: 4rpx;font-size: 24rpx;" :style="{
													borderBottom: currentTab === section.id ? '4rpx solid #ed7a49' : '4rpx solid #ffffff',
													color: currentTab === section.id ? '#ed7a49' : '#000000'
												}"
											>
												<text>{{ section.serverNameTwo }}</text>
											</view>
										</view>
									</view>
									<view
										v-else
										style="padding: 2rpx 0 6upx;text-align: center;background-color: #ebebea;font-size: 24rpx;"
									>
										缺少项目
									</view>
								</template>
							</tui-collapse>
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="flex: 1;height: 100%;padding: 14rpx 0 0 14rpx;overflow-y: auto;box-sizing: border-box;">
				<view style="height: 100%;padding: 40rpx 10rpx 0;background-color: #ffffff;">
					<view v-if="currentTab === 0" style="padding: 0 10rpx 0 6rpx;">
						<view v-if="serviceSortData && serviceSortData.length">
							<view
								style="height: 158rpx;margin-bottom: 26rpx;"
								:style="{ background: `url(${common.seamingImgUrl('1711110318930-quanwuzhuangxiu.png')}) no-repeat center top/contain` }"
								@click="go('/community-center/service-detail/index?id=1')"
							>
							</view>
							<view
								style="height: 158rpx;margin-bottom: 26rpx;"
								:style="{ background: `url(${common.seamingImgUrl('1711110325036-weishengjiangaizao.png')}) no-repeat center top/contain` }"
								@click="go('/community-center/service-detail/index?id=2')"
							>
							</view>
							<view
								style="height: 158rpx;margin-bottom: 26rpx;"
								:style="{ background: `url(${common.seamingImgUrl('1711110334485-yangtaigaizao.png')}) no-repeat center top/contain` }"
								@click="go('/community-center/service-detail/index?id=3')"
							>
							</view>
							<view
								style="height: 158rpx;margin-bottom: 26rpx;"
								:style="{ background: `url(${common.seamingImgUrl('1711110346711-chuanglianshengji.png')}) no-repeat center top/contain` }"
								@click="go('/community-center/service-detail/index?id=4')"
							>
							</view>
							<view
								style="height: 158rpx;margin-bottom: 26rpx;"
								:style="{ background: `url(${common.seamingImgUrl('1711110357485-jiajufanxin.png')}) no-repeat center top/contain` }"
								@click="go('/community-center/service-detail/index?id=5')"
							>
							</view>
							<!-- <view
								style="display: flex;margin-bottom: 16rpx;padding: 0 0 20rpx;border-bottom: 2rpx solid #d8d8d8;"
								@click="handleSelectTab('装修服务', 579)"
								>
								<view style="background-color: #d8d8d8;border-radius: 18rpx;">
								<image
								style="width: 136rpx;height: 136rpx;"
								:src="common.seamingImgUrl('1710932967442-quanwuzhuangxiu.png')" mode="scaleToFill"
								/>
								</view>
								<view style="margin: 10rpx 0 0 18rpx;font-weight: bold;">
								<view style="font-size: 36rpx;">全屋装修</view>
								<view style="margin-top: 16rpx;font-size: 28rpx;">让您的生活空间焕然一新尽享舒适与品质</view>
								</view>
								</view> -->
						</view>
						<view style="padding-bottom: 45upx;">
							<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
							<view v-if="!isLoading && !serviceSortData.length">
								<tui-no-data :fixed="false" style="padding-top: 60upx;">暂无数据~</tui-no-data>
							</view>
						</view>
					</view>
					<view v-else style="height: 100%;">
						<view v-if="currentOneService && currentOneService.children && currentOneService.children.length" style="height: 100%;">
							<scroll-view style="height: 100%;" :scroll-top="scrollServeTop" scroll-y>
								<view v-for="section in currentOneService.children" :key="section.serverNameTwo">
									<view :class="`scroll-current-serve-${section.id}`" style="padding: 0 0 0 28rpx;font-size: 34rpx;">{{ section.serverNameTwo }}</view>
									<view
										v-if="section && section.children && section.children.length"
										style="display: flex;align-items: center;flex-wrap: wrap;margin: 0 -15rpx;padding: 20rpx 0 0;"
									>
										<view
											v-for="serve in section.children" :key="serve.id"
											style="width: 150rpx;margin: 0 15rpx 40rpx;text-align: center;"
											@click="handleToServiceDetail(serve)"
										>
											<view>
												<image
													style="width: 138rpx;height: 138rpx;"
													:src="common.seamingImgUrl(serve.serverImageUrl.split(',').find((item) => item)) || require('../../static/images/new-user/default-user-avatar.png')"
													mode="aspectFit"
												/>
											</view>
											<view style="font-size: 28rpx;">{{ serve.serverNameThree }}</view>
										</view>
									</view>
									<view v-else style="padding-bottom: 45upx;">
										<tui-no-data :fixed="false" style="padding-top: 60upx;">这里空空如也～</tui-no-data>
									</view>
								</view>
							</scroll-view>
						</view>
						<view v-else style="padding-bottom: 45upx;">
							<tui-no-data :fixed="false" style="padding-top: 60upx;">该分类缺少项目</tui-no-data>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getServiceSortApi, getIsOpenServerAreaApi } from '../../api/community-center'
import { getAdressDetailByLngLat, getUserId } from '../../utils'
import { T_SELECTED_ADDRESS } from '../../constant'
export default {
	name: 'ServiceSort',
	props: {},
	data() {
		return {
			serviceSortData: [],
			isLoading: false,
			scrollTop: 0,
			scrollServeTop: 0,
			currentTab: 0,
			currentName: '',
			currentOneService: {},
			currentTwoService: {},
			currentIndexMain: 0,

			addressDetail: '',
			address: '',
			tips: ''
		}
	},
	async onLoad(options) {
		await this.getServiceSortData()
		this.handleSelectTab(options.name || '', Number(options.value) || 0)
		this.$nextTick(() => {
			uni.createSelectorQuery().in(this)
				.select(`.scroll-current-tab-${this.currentTab}`)
				.boundingClientRect((res) => {
					const top = (res && res.top && (res.top - 200)) || 0
					if (top > 0) this.scrollTop = top
				})
				.exec()
		})
		// this.getIsOpenServerArea()
	},
	methods: {
		// 查询社区服务分类接口
		async getServiceSortData() {
			this.isLoading = true
			await getServiceSortApi({})
				.then((res) => {
					this.serviceSortData = res.data
					this.isLoading = false
				})
				.catch(() => {
					this.isLoading = false
				})
		},
		// 根据用户地址判断该区域是否开通了站长
		async getIsOpenServerArea() {
			this.addressDetail = '定位中...'
			// #ifdef APP
			const lastAddress = uni.getStorageSync(T_SELECTED_ADDRESS) || { data: {} }
			const currentAddress = (lastAddress.data.province || '') + (lastAddress.data.city || '') + (lastAddress.data.district || '')
			this.address = currentAddress
			this.addressDetail = lastAddress.data.town || ''
			const resResult = await getIsOpenServerAreaApi({
				address: this.address
			})
			this.tips = resResult.data
			// #endif
			// #ifndef APP
			await this.$store.dispatch('location/getCurrentLocation', async (data) => {
				this.addressDetail = data.town
				this.address = data.province + data.city + data.district
				const resResult = await getIsOpenServerAreaApi({
					address: this.address
				})
				this.tips = resResult.data
			})
			// #endif
		},

		handleClickOneLevel(item) {
			if (item.children && item.children.length) {
				if (item.children[0] && item.children[0].children && item.children[0].children.length) {
					this.handleClickTwoLevel(item.children[0], item)
				} else {
					this.$showToast('该分类缺少服务')
				}
			} else {
				this.$showToast('该分类缺少项目')
			}
		},
		handleClickTwoLevel(section, item) {
			this.currentTab = section.id
			this.currentName = section.serverNameTwo
			this.currentOneService = item || {}
			this.currentTwoService = section || {}
			this.scrollServeTop = 0
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this)
					.select(`.scroll-current-serve-${this.currentTab}`)
					.boundingClientRect((res) => {
						this.$nextTick(() => {
							const top = (res && res.top && (res.top - 130)) || 0
							if (top > 0) this.scrollServeTop = top
						})
					})
					.exec()
			})
		},
		handleSelectTab(name, value) {
			if (name) {
				this.serviceSortData.forEach((item, index) => {
					if (item.serverNameOne === name) {
						this.currentIndexMain = index
						this.handleClickOneLevel(item)
						return true
					} else if (item.children && item.children.length) {
						return item.children.some((section, index) => {
							if (section.serverNameTwo === name) {
								this.currentIndexMain = index
								this.handleClickTwoLevel(section)
								return true
							}
							return false
						})
					}
					return false
				})
			}
			if (!this.currentTab && value) {
				this.serviceSortData.forEach((item, index) => {
					if (item.id === value) {
						this.currentIndexMain = index
						this.handleClickOneLevel(item)
						return true
					} else if (item.children && item.children.length) {
						return item.children.some((section, index) => {
							if (section.id === value) {
								this.currentIndexMain = index
								this.handleClickTwoLevel(section)
								return true
							}
							return false
						})
					}
					return false
				})
			}
		},

		handleToServiceDetail(serve) {
			if (getUserId()) {
				if (this.$store.getters.currentCity === '定位失败') {
					this.$showToast('获取定位失败')
				} else {
					uni.navigateTo({
						url: `/community-center/community-detail?id=${serve.id}&serverNameThree=${serve.serverNameThree}&serverImageUrl=${serve.serverImageUrl}`
					})
				}
			}
		},
		changeCurrentMain(e) {
			this.currentIndexMain = this.currentIndexMain == e.index ? -1 : e.index
		}

	}
}
</script>

<style lang="less" scoped>
.service-sort-container {
	height: 100vh;
	background-color: #e7e7e7;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding: 0 0 14rpx;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #ffffff;

		.title {
			font-size: 28rpx;
			color: #222229;
			font-weight: bold;
		}
	}
}
</style>
