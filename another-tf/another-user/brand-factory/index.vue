<template>
	<view class="brand-factory-container">
		<BeeBack style="padding: 20rpx 0;">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<BeeIcon name="arrowleft" :size="34" color="#222229" style="width: fit-content;"></BeeIcon>
				<view
					class="search-btn" style="flex: 1;display: flex;align-items: center;"
					@click.stop="() => {}"
				>
					<text style="font-weight: bold;font-size: 36rpx;">品牌搜索</text>
					<tui-input
						v-model="$data._query.search" placeholder="品牌工厂" clearable is-fillet
						padding="6rpx 10rpx 6rpx 26rpx" style="flex: 1;margin-left: 16rpx;border: 2rpx solid #EF5511;"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="$data._query.search && ($data._query.page = 1) && _loadData()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
		</BeeBack>

		<view>
			<scroll-view
				scroll-with-animation :scroll-into-view="currentBrandTypeId" scroll-x
				style="background-color: #eff3f6;"
			>
				<view style="display: flex;align-items: flex-end;padding: 0 19rpx;box-sizing: border-box;">
					<view
						v-for="item in categoryList" :id="'item_' + item.id" :key="item.id" style="position: relative;"
						@click="handleChangeSecondClass(item)"
					>
						<image
							style="width: 175rpx;height: 200rpx;"
							:src="item.localPic ? item.localPic : common.seamingImgUrl(item.picUrl)"
						>
						</image>
						<view v-if="currentBrandType === item.id">
							<view
								style="position: absolute;left: 50%;bottom: 8.5%;transform: translateX(-50%);width: 48rpx;height: 24rpx;border-radius: 0 0 50rpx 50rpx;"
								:style="{ backgroundColor: categoryList.findIndex(i => i.id === currentBrandType) === (categoryList.length - 1) ? '#4e3d3d' : { '品牌建材': '#9bc4b9', '品牌家具': '#f2dfdf', '品牌饰品': '#efe1d4', '品牌定制': '#c1cadb', '品牌窗帘': '#d0dddd', '品牌灯饰': '#ecd2c7', '全部品牌': '#4e3d3d' }[item.storeName] }"
							>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-x>
				<view style="display: flex;align-items: center;padding: 22rpx 18rpx 24rpx;">
					<view
						style="display: flex;align-items: center;color: #000000;font-size: 24rpx;background-color: #EFF3F6;padding: 6rpx 8rpx;margin-right: 12rpx;"
					>
						<JSubArea :code="0" :text="areaName" placeholder="请选择所在地" @confirm="handleSelectArea"></JSubArea>
						<tui-icon name="arrowdown" :size="32" unit="rpx" color="#767676" margin="0"></tui-icon>
					</view>
					<view
						v-for="item in nextCategoryList" :key="item.id"
						style="font-size: 24rpx;background-color: #EFF3F6;padding: 6rpx 8rpx;margin-right: 12rpx;"
						:style="{ color: currentNextBrandType === item.id ? '#000000' : '#888889' }"
						@click="handleChangeNextCategory(item.id)"
					>
						{{ item.storeName }}
					</view>
				</view>
			</scroll-view>
		</view>

		<view v-if="$data._list && $data._list.length">
			<view
				v-for="item in $data._list" :key="item.id" style="margin: 0 0 12rpx;padding: 0 24rpx;"
				@click="go(`/another-tf/another-user/brand-factory/detail?shopId=${item.shopId}`)"
			>
				<view>
					<tui-lazyload-img
						width="100%" height="352rpx" mode="scaleToFill" radius="20rpx 20rpx 0 0"
						:src="common.seamingImgUrl(item.advertisement.split(',')[0])"
					></tui-lazyload-img>
				</view>
				<view
					style="padding: 18rpx 16rpx 20rpx;margin: 2rpx 0 0;border: 1rpx solid #DFDFDF;border-radius: 0 0 20rpx 20rpx;overflow: hidden;"
				>
					<view style="font-weight: bold;">{{ item.shopName }}</view>
					<view style="display: flex;align-items: center;margin-top: 12rpx;font-size: 26rpx;">
						<image src="../../../static/images/icon/v-icon.png" mode="widthFix" style="width: 30rpx;" />
						<text style="padding: 0 14rpx;color: #222229;border-right: 2rpx solid #D8D8D8;">品牌工厂</text>
						<text style="padding: 0 14rpx;color: #9E9E9E;border-right: 2rpx solid #D8D8D8;">
							{{ item.annualLimit ? `${item.annualLimit}年` : '经典老店' }}
						</text>
						<text
							v-if="item.shopAdress"
							style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin: 0 0 0 12rpx;color: #222229;"
						>
							{{ item.shopAdress || '' }}
						</text>
					</view>
					<view style="margin-top: 12rpx;font-size: 28rpx;color: #9E9E9E;">
						<text style="padding: 0 12rpx 0 0;margin: 6rpx 12rpx;border-right: 2rpx solid #D8D8D8;">
							销量 {{ item.monthlySales > 1000 ? '1000+' : item.monthlySales > 100 ? '100+' : item.monthlySales }}
						</text>
						<text style="padding: 0 12rpx 0 0;margin: 6rpx 12rpx;border-right: 2rpx solid #D8D8D8;">
							人均{{ item.perCapita || '：--' }}
						</text>
						<text style="padding: 0 12rpx 0 0;margin: 6rpx 12rpx;">
							{{ item.fansNumber ? `粉丝数${item.fansNumber}` : '高回头率' }}
						</text>
					</view>
					<view>
						<view v-if="item.label" style="display: flex;flex-wrap: wrap;margin-top: 10upx;">
							<view
								v-for="(part, count) in item.label.split(',')" :key="count"
								style="padding: 6rpx 12rpx;margin-right: 12rpx;font-size: 24rpx;color: #9E9E9E;background-color: #EFF3F6;"
							>
								{{ part }}
							</view>
						</view>
						<view v-else style="display: flex;flex-wrap: wrap;margin-top: 10upx;">
							<view
								v-for="(part, count) in ['支持定制', '批量采购', '品牌正品']" :key="count"
								style="padding: 6rpx 12rpx;margin-right: 12rpx;font-size: 24rpx;color: #9E9E9E;background-color: #EFF3F6;"
							>
								{{ part }}
							</view>
						</view>
					</view>
					<!-- <view style="display: flex; align-items: center;margin-top: 12rpx;">
						<view style="margin-left: 6rpx;">
						<tui-rate active="#EF530E" :size="16" disabled :current="item.score || 0"></tui-rate>
						</view>
						<text v-if="item.score" style="margin-left: 6rpx;font-size: 26rpx;color: #EF530E;">
						{{ item.score }}星工厂
						</text>
						<tui-icon name="arrowright" :size="32" unit="rpx" color="#EF530E" margin="0 0 0 6rpx"></tui-icon>
						</view> -->
					<view
						class="middle-btn"
						style="display: flex; align-items: center;justify-content: space-between;margin-top: 6rpx;"
					>
						<view style="display: flex; align-items: center;margin-top: 12rpx;">
							<image style="width: 36rpx;" mode="widthFix" src="../../../static/images/icon/recommend.png"></image>
							<text style="padding: 6rpx 8rpx;margin-right: 12rpx;font-size: 24rpx;color: #9E9E9E;">
								多款品牌家具
							</text>
							<text style="margin-left: 2rpx;color: #D8D8D8;">· · ·</text>
						</view>
						<tui-button
							type="warning" width="130rpx" height="60rpx" shape="circle"
							@click="go(`/another-tf/another-user/brand-factory/detail?shopId=${item.shopId}`)"
						>
							去了解
						</tui-button>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!$data._isEmpty && !$data._list.length
					? 'loading' : !$data._isEmpty && $data._list.length && ($data._list.length >= $data._listTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="$data._isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getFactoryListApi, getFactoryClassApi, getFactoryNextClassApi } from '../../../api/anotherTFInterface'
import loadData from '../../../mixin/loadData'

export default {
	name: 'BrandFactory',

	mixins: [
		loadData({
			api: getFactoryListApi,
			mapKey: {
				list: 'list',
				listTotal: 'total',
				pageSize: 'pageSize'
			}
		})
	],
	data() {
		return {
			areaName: '所在地',
			currentBrandType: '',
			currentNextBrandType: '',
			categoryList: [], // 二级分类
			nextCategoryList: [] // 三级分类
		}
	},

	onLoad() {
		this.$data._query.pageSize = 10
		this.getFactoryClassList()
	},

	computed: {
		currentBrandTypeId() {
			return 'item_' + this.currentBrandType
		}
	},

	methods: {
		// 获取一级分类
		async getFactoryClassList() {
			const res = await getFactoryClassApi({ levelId: 1 })
			if (res.data && res.data.length) {
				const tempBrandClass = res.data.find((item) => item.storeName === '品牌工厂')
				this.getSecondClassList(tempBrandClass ? tempBrandClass.id : '0', true)
			} else {
				this.getSecondClassList('0', true)
			}
		},

		// 获取二级分类，或三级分类
		getSecondClassList(pid, isSecondClass) {
			getFactoryNextClassApi({ pid })
				.then((res) => {
					if (isSecondClass) {
						this.mapLocalToNetData([...res.data, {
							id: '',
							storeName: '全部品牌',
							pid,
							level: '2',
							sort: 0,
							localPic: require('../../../static/images/new-index/brandFactory/quanbupinpai.png')
						}])
					} else {
						this.nextCategoryList = res.data
						this.currentNextBrandType = res.data[0] ? res.data[0].id : ''
						this.handleChangeNextCategory(this.currentNextBrandType)
					}
				})
		},

		// 映射active数据
		mapLocalToNetData(classList) {
			if (this.categoryList.length) return
			if (classList && classList.length) {
				this.categoryList = classList.sort((a, b) => {
					if (a.storeName === '品牌家具') return -1
					return 0
				})
			} else {
				this.categoryList = []
			}
			this.handleChangeSecondClass(this.categoryList[0])
		},

		// 切换二级分类
		handleChangeSecondClass(category) {
			if (this.currentBrandType === category.id) return
			this.currentBrandType = category.id
			this.getSecondClassList(category.id)
		},

		// 切换三级分类
		handleChangeNextCategory(id) {
			this.$data._query.page = 1
			this.$data._list = []
			this.$data._listTotal = 0
			this.$data._isEmpty = false
			if (!id) {
				this.$data._query.classifyId = this.currentBrandType
				this._loadData()
			} else {
				// if (this.currentNextBrandType === id) return
				this.currentNextBrandType = id
				this.$data._query.classifyId = id
				this._loadData()
			}
		},
		handleSelectArea(e) {
			this.areaName = (e.areaInfo[e.areaInfo.length - 1] && e.areaInfo[e.areaInfo.length - 1].text) || ''
			this.$data._query.areaId = (e.areaInfo[e.areaInfo.length - 1] && e.areaInfo[e.areaInfo.length - 1].id) || ''
			this.$data._query.page = 1
			this.$data._list = []
			this.$data._listTotal = 0
			this.$data._isEmpty = false
			this._loadData()
		}
	}
}
</script>

<style lang="less" scoped>
.brand-factory-container {
	min-height: 100vh;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-btn {
			background: #ee692f !important;
		}
	}

	.middle-btn {
		/deep/ .tui-btn {
			background: #ef530e !important;
		}
	}
}
</style>
