<template>
	<view class="service-sort-container">
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
				<scroll-view style="height: 100%;" :scroll-top="scrollTop" scroll-x scroll-y>
					<view
						style="display: flex;align-items: center;justify-content: center;padding: 8rpx 6rpx;"
						:style="{ backgroundColor: currentTab === 0 ? '#c70000' : 'transparent' }"
						@click="(currentTab = 0) || (currentName = '') || (currentService = {})"
					>
						<image style="width: 48rpx;" src="../../static/images/icon/fire-orange.png" mode="widthFix" />
						<text style="font-weight: bold;" :style="{ color: currentTab === 0 ? '#ffffff' : '#000000' }">
							当期热门
						</text>
					</view>
					<view style="padding: 2rpx 0 0;">
						<view
							v-for="item in serviceSortData" :key="item.serverNameOne" style="padding: 26rpx 6rpx 0;"
							@click="handleClickOneLevel(item)"
						>
							<view style="font-size: 36rpx;font-weight: bold;">{{ item.serverNameOne }}</view>
							<view v-if="item.children && item.children.length">
								<view
									v-for="section in item.children" :key="section.serverNameTwo" style="padding: 20rpx 0 0;"
									:class="`scroll-current-tab-${section.id}`" @click.stop="handleClickTwoLevel(section)"
								>
									<view style="font-size: 24rpx;">
										<text
											style="padding-bottom: 4rpx;"
											:style="{
												borderBottom: currentTab === section.id ? '4rpx solid #ed7a49' : '4rpx solid #ffffff',
												color: currentTab === section.id ? '#ed7a49' : '#000000'
											}"
										>
											{{ section.serverNameTwo }}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view style="flex: 1;height: 100%;padding: 14rpx 0 0 14rpx;overflow-y: auto;box-sizing: border-box;">
				<view style="height: 100%;padding: 40rpx 10rpx 0;background-color: #ffffff;">
					<view v-if="currentTab === 0" style="padding: 0 10rpx 0 14rpx;">
						<view v-if="serviceSortData && serviceSortData.length">
							<view
								style="display: flex;margin-bottom: 16rpx;padding: 0 0 20rpx;border-bottom: 2rpx solid #d8d8d8;"
								@click="handleSelectTab('装修服务', 579)"
							>
								<view style="background-color: #d8d8d8;border-radius: 18rpx;">
									<image
										style="width: 136rpx;height: 136rpx;"
										src="../../static/images/new-community/home/quanwuzhengzhuang.png" mode="scaleToFill"
									/>
								</view>
								<view style="margin: 10rpx 0 0 18rpx;font-weight: bold;">
									<view style="font-size: 36rpx;">全屋装修</view>
									<view style="margin-top: 16rpx;font-size: 28rpx;">让您的生活空间焕然一新尽享舒适与品质</view>
								</view>
							</view>
							<view
								style="display: flex;margin-bottom: 16rpx;padding: 0 0 20rpx;border-bottom: 2rpx solid #d8d8d8;"
								@click="handleSelectTab('局部改造', 14)"
							>
								<view style="background-color: #d8d8d8;border-radius: 18rpx;">
									<image
										style="width: 136rpx;height: 136rpx;"
										src="../../static/images/new-community/home/weishengjiangaizao.png" mode="scaleToFill"
									/>
								</view>
								<view style="margin: 10rpx 0 0 18rpx;font-weight: bold;">
									<view style="font-size: 36rpx;">卫生间改造</view>
									<view style="margin-top: 16rpx;font-size: 28rpx;">空间再释放</view>
								</view>
							</view>
							<view
								style="display: flex;margin-bottom: 16rpx;padding: 0 0 20rpx;border-bottom: 2rpx solid #d8d8d8;"
								@click="handleSelectTab('局部改造', 14)"
							>
								<view style="background-color: #d8d8d8;border-radius: 18rpx;">
									<image
										style="width: 136rpx;height: 136rpx;"
										src="../../static/images/new-community/home/yangtaigaizao.png" mode="scaleToFill"
									/>
								</view>
								<view style="margin: 10rpx 0 0 18rpx;font-weight: bold;">
									<view style="font-size: 36rpx;">阳台改造</view>
									<view style="margin-top: 16rpx;font-size: 28rpx;">阳台换新颜</view>
								</view>
							</view>
							<view
								style="display: flex;margin-bottom: 16rpx;padding: 0 0 20rpx;border-bottom: 2rpx solid #d8d8d8;"
								@click="handleSelectTab('窗帘衣架', 289)"
							>
								<view style="background-color: #d8d8d8;border-radius: 18rpx;">
									<image
										style="width: 136rpx;height: 136rpx;"
										src="../../static/images/new-community/home/chuanglianshengji.png" mode="scaleToFill"
									/>
								</view>
								<view style="margin: 10rpx 0 0 18rpx;font-weight: bold;">
									<view style="font-size: 36rpx;">窗帘升级</view>
									<view style="margin-top: 16rpx;font-size: 28rpx;">设计更时尚</view>
								</view>
							</view>
							<view
								style="display: flex;margin-bottom: 16rpx;padding: 0 0 20rpx;border-bottom: 2rpx solid #d8d8d8;"
								@click="handleSelectTab('家具维保', 2)"
							>
								<view style="background-color: #d8d8d8;border-radius: 18rpx;">
									<image
										style="width: 136rpx;height: 136rpx;"
										src="../../static/images/new-community/home/jiajufanxin.png" mode="scaleToFill"
									/>
								</view>
								<view style="margin: 10rpx 0 0 18rpx;font-weight: bold;">
									<view style="font-size: 36rpx;">家具翻新</view>
									<view style="margin-top: 16rpx;font-size: 28rpx;">焕新如初见</view>
								</view>
							</view>
						</view>
						<view style="padding-bottom: 45upx;">
							<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
							<view v-if="!isLoading && !serviceSortData.length">
								<tui-no-data :fixed="false" style="padding-top: 60upx;">暂无数据</tui-no-data>
							</view>
						</view>
					</view>
					<view v-else style="height: 100%;overflow-y: auto;">
						<view
							v-if="currentService && currentService.children && currentService.children.length"
							style="display: flex;align-items: center;flex-wrap: wrap;margin: 0 -15rpx;"
						>
							<view
								v-for="serve in currentService.children" :key="serve.id"
								style="width: 150rpx;margin: 0 15rpx 40rpx;text-align: center;" @click="handleToServiceDetail(serve)"
							>
								<view>
									<image
										style="width: 138rpx;height: 138rpx;"
										:src="common.seamingImgUrl(serve.serverImageUrl.split(',').find((item) => item) || require('../../static/images/new-user/default-user-avatar.png'))"
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
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getServiceSortApi, getIsOpenServerAreaApi } from '../../api/community-center'
import { getAdressDetailByLngLat, getUserId } from '../../utils'
export default {
	name: 'ServiceSort',
	props: {},
	data() {
		return {
			serviceSortData: [],
			isLoading: false,
			scrollTop: 0,
			currentTab: 0,
			currentName: '',
			currentService: {},

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
			const _this = this
			// #ifdef H5
			uni.getLocation({
				type: 'gcj02',
				success(result) {
					getAdressDetailByLngLat(result.latitude, result.longitude).then(async (res) => {
						if (res.status === '1') {
							_this.addressDetail = res.regeocode.addressComponent.township
							_this.address =
								res.regeocode.addressComponent.province +
								res.regeocode.addressComponent.city +
								res.regeocode.addressComponent.district
							const resResult = await getIsOpenServerAreaApi({
								address: this.address
							})
							this.tips = resResult.data
						}
					})
				}
			})
			// #endif
			// #ifdef APP
			const locationInfo = this.$store.state.location
			this.address = locationInfo.locationInfo.province + locationInfo.locationInfo.city + locationInfo.locationInfo.district
			this.addressDetail = locationInfo.locationInfo.township
			const resResult = await getIsOpenServerAreaApi({
				address: this.address
			})
			this.tips = resResult.data
			// #endif
		},

		handleClickOneLevel(item) {
			if (item.children && item.children.length) {
				if (item.children[0] && item.children[0].children && item.children[0].children.length) {
					this.currentTab = item.children[0].id
					this.currentName = item.children[0].serverNameTwo
					this.currentService = item.children[0] || {}
				} else {
					this.$showToast('该分类缺少服务')
				}
			} else {
				this.$showToast('该分类缺少项目')
			}
		},
		handleClickTwoLevel(section) {
			this.currentTab = section.id
			this.currentName = section.serverNameTwo
			this.currentService = section || {}
		},
		handleSelectTab(name, value) {
			if (name) {
				this.serviceSortData.forEach((item, index) => {
					if (item.serverNameOne === name) {
						this.handleClickOneLevel(item)
						return true
					} else if (item.children && item.children.length) {
						return item.children.some((section, index) => {
							if (section.serverNameTwo === name) {
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
						this.handleClickOneLevel(item)
						return true
					} else if (item.children && item.children.length) {
						return item.children.some((section, index) => {
							if (section.id === value) {
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
