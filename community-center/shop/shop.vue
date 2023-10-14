<template>
	<view class="shop-container">
		<!-- 顶部栏 -->
		<view class="shop-header-container">
			<image class="back-icon" src="../../static/images/new-business/list/back.png" @click="back"></image>
			<view class="search-container">
				<text style="font-weight: bold;font-size: 36upx;">{{ transformation[currentType] }}</text>
				<tui-input
					v-if="ownSearchBar.includes(currentType)" v-model="queryInfo.search" label="" placeholder="社区商圈"
					clearable is-fillet padding="6upx 10upx 6upx 26upx"
					style="flex: 1;margin-left: 16upx;;border: 2upx solid #EF5511;"
				>
					<template #right>
						<tui-button
							type="warning" width="120rpx" height="50rpx" shape="circle"
							style="background: #ee692f!important;"
							@click="queryInfo.search && getNearByShopList(true)"
						>
							搜索
						</tui-button>
					</template>
				</tui-input>
			</view>
		</view>

		<!-- 菜单栏 -->
		<view
			v-if="ownMenuBar.includes(currentType)"
			style="display: flex;align-items: center;flex-wrap: wrap;margin: 14upx 26upx 0;padding: 22upx 22upx 2upx;background-color: #ffffff;border-radius: 20upx;"
		>
			<view
				v-for="item in menuBarArr" :key="item.id" style="width: 25%;margin-bottom: 20upx;text-align: center;"
				@click="go(`/community-center/shop/delicacy/delicacy?id=${item.id}`)"
			>
				<view>
					<TuanIcon :size="34" :src="item.url || require('../../static/images/index/design.png')"></TuanIcon>
				</view>
				<view style="margin-top: 6upx;font-size: 28upx;">{{ item.name }}</view>
			</view>
		</view>

		<!-- 限时秒杀 -->
		<view
			v-if="ownLimitedTimeSeckill.includes(currentType)"
			style="margin: 14upx 26upx 0;padding: 22upx;background: linear-gradient(122deg, #FDF3F1 2%, #FEEAEC 6%, #FFFBEF 12%, #FFFFFF 64%);border-radius: 20upx;"
		>
			<view style="display: flex;align-items: center;">
				<text style="font-size: 34upx;font-weight: bold;">限时秒杀</text>
				<view
					style="display: flex;align-items: center;margin-left: 18upx;background-color: #fce5df;border-radius: 20upx;"
				>
					<view
						style="width: 110upx;height: 36upx;padding: 6upx 12upx;font-size: 28upx;color: #ffffff;text-align: center;background-color: #f15d43;border-radius: 20upx 0 26upx 20upx;clip-path: polygon(0upx 0upx, 134upx 0, 124upx 8upx, 124upx 48upx, 0 48upx);"
					>
						<text style="margin-left: -10upx;">距结束</text>
					</view>
					<view style="font-size: 26upx;font-weight: bold;color: #f84715;padding: 0 14upx 0;">01:02:15</view>
				</view>
			</view>
			<view style="margin-top: 20upx;">
				<swiper autoplay vertical style="width: 100%;height: 160upx;">
					<swiper-item
						v-for="(item, index) in limitedTimeSeckillArr" :key="index"
						style="display: flex;justify-content: space-between;align-items: center;"
					>
						<view
							v-for="(part, count) in item" :key="count"
							style="display: flex;align-items: center;justify-content: space-between;width: 49%;height: 100%;overflow: hidden;"
							@click="go(`/?id=${part.id}`)"
						>
							<view>
								<TuanIcon
									width="180upx" height="150upx" style="width: fit-content;border-radius: 22upx;overflow: hidden;"
									:src="item.url || require('../../static/images/index/explosion.webp')"
								>
								</TuanIcon>
								<view style="height: 10upx;margin: 0 20upx;background-color: #c8c9b7;border-radius: 0 0 20upx 20upx;">
								</view>
							</view>
							<view
								style="flex: 1;display: flex;flex-direction: column;justify-content: space-around;width: 0;height: 100%;margin-left: 20upx;"
							>
								<view style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ part.name }}</view>
								<view
									style="font-size: 26upx;color: #9e9e9e;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
								>
									{{ part.typeName }}
								</view>
								<view style="display: flex;flex-wrap: wrap;color: #ef530e;">
									<text>
										<text style="font-size: 24upx;">￥</text>
										<text style="font-weight: bold;">{{ part.price }}</text>
									</text>
									<text
										style="padding: 4upx 14upx;margin-left: 10upx;;font-size: 24upx;border: 1upx solid #f9c1a6;border-radius: 16upx;"
									>
										{{ part.discount }}折
									</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 类别选择框 -->
		<view v-if="ownSelectionBox.includes(currentType)" style="margin: 14upx 26upx 0;">
			<tui-tab
				:tabs="selectionBoxArr" :current="selectionBoxNum" scroll background-color="transparent"
				:size="36" bold
				color="#222229" selected-color="#222229" slider-bg-color="#ef530e" slider-height="4px"
				@change="(e) => selectionBoxNum = e.index"
			></tui-tab>
		</view>

		<!-- 首要标签筛选框 -->
		<view v-if="ownPrimaryFilterBox.includes(currentType)" style="margin: 14upx 26upx 0;">
			<StorePrimaryFilterBox :type="currentType" @select="handleSelectPrimaryFilter"></StorePrimaryFilterBox>
		</view>

		<!-- 次要排序筛选框 -->
		<view v-if="ownSecondaryFilterBox.includes(currentType)" style="margin: 14upx 26upx 0;">
			<StoreSecondaryFilterBox @select="handleSelectSecondaryFilter"></StoreSecondaryFilterBox>
		</view>

		<!-- 特殊中间结构 -->
		<view v-if="ownSpecialHotelBox.includes(currentType)" style="margin: 14upx 26upx 0;">
			特殊酒店中间结构
			<view>搜索筛选框</view>
			<view>超低一口价商品框</view>
		</view>

		<view v-if="nearbyShopList.length" style="margin: 14upx 26upx 0;background-color: aquamarine;">
			<CommonShop v-for="shop in nearbyShopList" :key="shop.id" :shop-info="shop"></CommonShop>
		</view>
		<view v-show="!nearbyShopList.length && !isLoading" class="no-data"> 暂无门店~ </view>
		<PageLoading v-show="isLoading"></PageLoading>
		<LoadingMore v-show="loadingStatus !== 'more'" style="margin-top: 20upx" :status="loadingStatus"></LoadingMore>
	</view>
</template>

<script>
import CommonShop from '../../pages/community-center/cpns/CommonShop.vue'
import PageLoading from '../../pages/order/components/Loading.vue'
import StorePrimaryFilterBox from './components/StorePrimaryFilterBox.vue'
import StoreSecondaryFilterBox from './components/StoreSecondaryFilterBox.vue'
import { getNearByShopListApi } from '../../api/community-center'
import { getCurrentLocation } from '../../utils'

export default {
	name: 'Shop',
	components: { CommonShop, PageLoading, StorePrimaryFilterBox, StoreSecondaryFilterBox },
	data() {
		return {
			transformation: {
				6: '美食团购',
				8: '超市便利',
				9: '养车用车',
				11: '酒店民宿'
			},
			currentType: '',

			// 判断每个类板块是否拥有某个页面结构
			ownSearchBar: ['6', '8', '9'],
			ownMenuBar: ['6', '8', '9'],
			menuBarArr: [],
			ownLimitedTimeSeckill: [ '6' ],
			limitedTimeSeckillArr: [],
			ownSelectionBox: ['6', '9'],
			selectionBoxArr: [],
			selectionBoxNum: 0,
			ownPrimaryFilterBox: [ '6' ],
			primaryFilterBoxObj: {
				quanbumeishi: '',
				fujin: '',
				zhinengpaixu: '',
				shaixuan: {
					yingyeshijian: '',
					cantingfuwu: ''
				}
			},
			ownSecondaryFilterBox: [ '8' ],
			ownSpecialHotelBox: [ '11' ],

			nearbyShopList: [],
			nearbyTotalPages: 0,
			loadingStatus: 'more',
			isLoading: false,
			queryInfo: {
				search: '',
				pageNo: 1,
				pageSize: 20,
				address: ''
			}
		}
	},
	watch: {
		'queryInfo.search'(value) {
			if (!value) {
				this.getNearByShopList(true)
			}
		}
	},
	onLoad(options) {
		this.currentType = options.type
		if (this.currentType === '6') {
			this.menuBarArr = [{ id: 1, name: '火锅', url: '' }, { id: 2, name: '火锅', url: '' }, { id: 3, name: '火锅', url: '' }, { id: 4, name: '火锅', url: '' }, { id: 5, name: '火锅', url: '' }, { id: 6, name: '火锅', url: '' }, { id: 7, name: '火锅', url: '' }, { id: 8, name: '火锅', url: '' }, { id: 9, name: '火锅', url: '' }]
			const seckillGoodsArr = [{ url: '', name: '菜a菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜b菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜c菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜d菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜e菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }]
			this.limitedTimeSeckillArr = seckillGoodsArr.flatMap((item, index) => (index % 2 ? [] : [ seckillGoodsArr.slice(index, index + 2) ]))
			this.selectionBoxArr = ['美食餐厅', '精选团购', '单人餐', '精选团购', '精选团购', '精选团购', '精选团购']
		} else if (this.currentType === '8') {
			this.menuBarArr = [{ id: 1, name: '超市卖场', url: '' }, { id: 2, name: '便利店', url: '' }, { id: 3, name: '生鲜/菜市场', url: '' }, { id: 4, name: '水果/果切', url: '' }, { id: 5, name: '鲜花绿植', url: '' }, { id: 6, name: '零食饮料', url: '' }, { id: 7, name: '买酒', url: '' }, { id: 8, name: '美妆/服饰', url: '' }, { id: 9, name: '宠物用品', url: '' }, { id: 9, name: '买药', url: '' }]
		} else if (this.currentType === '9') {
			this.menuBarArr = [{ id: 1, name: '洗车', url: '' }, { id: 2, name: '美容', url: '' }, { id: 3, name: '保养', url: '' }, { id: 4, name: '租车', url: '' }, { id: 5, name: '维修', url: '' }, { id: 6, name: '改装', url: '' }, { id: 7, name: '补胎', url: '' }, { id: 8, name: '喷漆', url: '' }, { id: 9, name: '四轮定位', url: '' }, { id: 9, name: '贴膜', url: '' }, { id: 9, name: '内饰清洁', url: '' }, { id: 9, name: '抛光', url: '' }, { id: 9, name: '打蜡', url: '' }, { id: 9, name: '镀晶', url: '' }]
			this.selectionBoxArr = ['加油站', '充电桩', '停车场', '代办点', '年检站']
		}
		this.getNearByShopList(true)
	},
	methods: {
		back() {
			uni.switchTab({
				url: '/pages/business-district/business-district'
			})
		},
		handleSelectPrimaryFilter(e) {
			console.log(e)
		},
		handleSelectSecondaryFilter(e) {
			console.log(e)
		},
		async getNearByShopList(isClear) {
			if (isClear) {
				this.queryInfo.pageNo = 1
				// this.isLoading = true
				this.nearbyShopList = []
			} else {
				this.loadingStatus = 'loading'
			}
			try {
				const currentAddress = await getCurrentLocation()
				this.queryInfo.address = currentAddress + ''
				const res = await getNearByShopListApi(this.queryInfo)
				if (res.statusCode === 20000) {
					if (res.data) {
						this.nearbyShopList = [...this.nearbyShopList, ...res.data.data]
						this.nearbyTotalPages = res.data.pages
					} else {
						this.nearbyShopList = []
						this.nearbyTotalPages = 0
					}
				}
			} catch (error) {
				console.log(error)
			} finally {
				this.isLoading = false
				this.loadingStatus = 'more'
			}
		}
	},

	onReachBottom() {
		if (this.nearbyShopList.length < this.queryInfo.pageSize) return
		if (this.queryInfo.pageNo >= this.nearbyTotalPages) return this.loadingStatus = 'no-more'
		this.queryInfo.pageNo++
		this.getNearByShopList()
	}
}
</script>

<style lang="less" scoped>
.shop-container {
	min-height: 100vh;
	background-color: #f6f6f8;
	box-sizing: border-box;
	padding: 108upx 0 0;

	.shop-header-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 108upx;
		width: 100vw;
		background-color: #fff;
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		z-index: 998;

		.back-icon {
			width: 48upx;
			height: 48upx;
			flex-shrink: 0;
		}

		.search-container {
			flex: 1;
			display: flex;
			align-items: center;
		}
	}

	.tui-scroll__view {
		/deep/ .tui-tabs__line {
			margin-left: -26upx;
			clip-path: inset(0% 30% 0% 30% round 4upx 4upx 4upx 4upx);
			// background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 20%, #ef530e 20%, #ef530e 80%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)!important;
			// clip-path: polygon(20% 0, 80% 0, 80% 100%, 20% 100%);
		}
	}

	.no-data {
		width: 100%;
		height: 500upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		letter-spacing: 0.2em;
		color: #ccc;
	}
}
</style>
