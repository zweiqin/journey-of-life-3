<template>
	<view class="shop-deep-container">

		<BeeBack style="padding: 20upx 0;">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<BeeIcon name="arrowleft" :size="34" color="#222229" style="width: fit-content;"></BeeIcon>
				<view style="flex: 1;display: flex;align-items: center;" @click.stop="() => {}">
					<text style="font-weight: bold;font-size: 36upx;">{{ title }}</text>
					<tui-input
						v-model="queryInfo.search" placeholder="社区商圈"
						clearable is-fillet padding="6upx 10upx 6upx 26upx"
						style="flex: 1;margin-left: 16upx;border: 2upx solid #EF5511;"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								style="background: #ee692f!important;"
								@click="queryInfo.search && (queryInfo.page = 1) && getNearByShopList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
		</BeeBack>

		<!-- 菜单栏 -->
		<view
			v-if="menuBarArr && menuBarArr.length"
			style="display: flex;align-items: center;flex-wrap: wrap;margin: 14upx 26upx 0;padding: 22upx 22upx 2upx;background-color: #ffffff;border-radius: 20upx;"
		>
			<view
				v-for="item in menuBarArr" :key="item.id" style="width: 20%;margin-bottom: 20upx;text-align: center;"
				@click="getNearByShopList(false, item.id)"
			>
				<view>
					<BeeIcon
						:size="34"
						:src="item.picUrl ? common.seamingImgUrl(item.picUrl) : require('../../../static/images/new-user/default-user-avatar.png')"
					>
					</BeeIcon>
				</view>
				<view style="margin-top: 6upx;font-size: 26upx;white-space: nowrap;">{{ item.storeName }}</view>
			</view>
		</view>

		<view v-if="nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<ATFCommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22upx 0"
				radius="20upx"
			></ATFCommonShop>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !nearbyShopList.length
					? 'loading' : !isEmpty && nearbyShopList.length && (nearbyShopList.length >= nearbyTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">{{ `${title} 类目暂无商家认证` }}</tui-no-data>
		</view>

	</view>
</template>

<script>
import { getShopCategorySonApi, getHomeBrandListApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ShopDeep',
	data() {
		return {
			title: '',
			nearbyShopList: [],
			nearbyTotal: 0,
			isEmpty: false,
			queryInfo: {
				page: 1,
				pageSize: 10,
				search: '',
				classifyId: '',
				distance: '9999999999'
			},
			menuBarArr: []
		}
	},
	async onLoad(options) {
		this.title = options.name || ''
		this.queryInfo.classifyId = options.id || ''
		this.getNearByShopList(true)
		const res = await getShopCategorySonApi({ pid: this.queryInfo.classifyId })
		this.menuBarArr = res.data || []
	},
	methods: {
		getNearByShopList(isLoadmore, classifyId) {
			uni.showLoading()
			getHomeBrandListApi({
				...this.queryInfo,
				areaId: this.$store.state.location.locationInfo.adcode,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				classifyId: classifyId || this.queryInfo.classifyId
			})
				.then((res) => {
					this.nearbyTotal = res.data.total
					if (isLoadmore) {
						this.nearbyShopList.push(...res.data.list)
					} else {
						this.nearbyShopList = res.data.list
					}
					this.isEmpty = this.nearbyShopList.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.nearbyShopList.length < this.nearbyTotal) {
			++this.queryInfo.page
			this.getNearByShopList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.shop-deep-container{
	min-height: 100vh;
	background-color: #f6f6f8;
	box-sizing: border-box;
}

</style>
