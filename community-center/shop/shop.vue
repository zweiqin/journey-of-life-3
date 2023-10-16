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
				v-for="item in menuBarArr" :key="item.id" style="width: 20%;margin-bottom: 20upx;text-align: center;"
				@click="go(`/community-center/shop/delicacy/delicacy?id=${item.id}`)"
			>
				<view>
					<TuanIcon :size="34" :src="item.labelUrl || require('../../static/images/index/design.png')"></TuanIcon>
				</view>
				<view style="margin-top: 6upx;font-size: 26upx;white-space: nowrap;">{{ item.labelName }}</view>
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

		<!-- 类别选择框（额外的同‘一级分类’的分类） -->
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

		<view v-if="ownShopCardBox.includes(currentType) && nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<CommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22upx 0"
				radius="20upx" :show-logo="false"
			></CommonShop>
		</view>
		<view v-if="ownShopCardWithLineBox.includes(currentType) && nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<CommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22upx 0"
				radius="20upx" :show-logo="false"
			>
				<view style="padding: 20upx 0">
					<view
						v-for="item in [{ id: 1, price: 288.88, originPrice: 444.44, name: '主题小包尊享休闲3小时gfgdfnbfngmhgmhgmghnh' }, { id: 2, price: 299.88, originPrice: 444.44, name: '主题小包尊享' }]"
						:key="item.id" style="display: flex;padding-left: 26upx;padding-right: 26upx;" class="shop-card-line"
					>
						<view style="text-align: right;padding-right: 26upx;">
							<view style="color: #EF530E;">￥{{ item.price }}</view>
							<view style="font-size: 28upx;color: #979797;">门市价:￥{{ item.originPrice }}</view>
						</view>
						<view style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
							<text
								style="padding: 2upx 6upx;margin-right: 16upx;font-size: 24upx;color: #ffffff;background-color: #ef5613;"
							>
								商
							</text>
							<text style="font-size: 28upx;color: #a2a2a2;">{{ item.name }}</text>
						</view>
					</view>
				</view>
			</CommonShop>
		</view>
		<view v-if="ownShopCardWithGoodsBox.includes(currentType) && nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<CommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22upx 0"
				radius="20upx" :show-logo="false"
			>
				<view style="padding: 20upx 26upx">
					<scroll-view scroll-x="true">
						<view style="display: flex;">
							<view
								v-for="item in [{ id: 1, price: 66.44, originPrice: 144.44, picUrl: 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/a9cbbfdbf277431aba5be3a5f84d47d3.jpg', name: '无穷盐焗鸡30g/包' }, { id: 2, price: 299.88, originPrice: 444.44, picUrl: 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/a9cbbfdbf277431aba5be3a5f84d47d3.jpg', name: 'vsvfxdvdf' }, { id: 3, price: 66.44, originPrice: 144.44, picUrl: 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/a9cbbfdbf277431aba5be3a5f84d47d3.jpg', name: '无穷盐焗鸡30g/包' }, { id: 4, price: 66.44, originPrice: 144.44, picUrl: 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/a9cbbfdbf277431aba5be3a5f84d47d3.jpg', name: '无穷盐焗鸡30g/包' }, { id: 5, price: 66.44, originPrice: 144.44, picUrl: 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/a9cbbfdbf277431aba5be3a5f84d47d3.jpg', name: '无穷盐焗鸡30g/包' }, { id: 6, price: 66.44, originPrice: 144.44, picUrl: 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/a9cbbfdbf277431aba5be3a5f84d47d3.jpg', name: '无穷盐焗鸡30g/包' }]"
								:key="item.id" style="display: flex;flex-direction: column;justify-content: space-between;padding-right: 18upx;"
							>
								<view style="width: 160upx;">
									<tui-lazyload-img
										width="100%" height="170upx" mode="scaleToFill" radius="20upx"
										:src="item.picUrl"
									></tui-lazyload-img>
									<view style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text style="font-size: 28upx;color: #a2a2a2;">{{ item.name }}</text>
									</view>
								</view>
								<view>
									<view style="color: #EF530E;">￥{{ item.price }}</view>
									<view style="font-size: 28upx;color: #979797;">￥{{ item.originPrice }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</CommonShop>
		</view>
		<view v-show="!nearbyShopList.length && loadingStatus !== 'loading'" class="no-data"> 暂无门店~ </view>
		<LoadingMore v-show="loadingStatus !== 'more'" style="margin-top: 20upx" :status="loadingStatus"></LoadingMore>
	</view>
</template>

<script>
import CommonShop from '../../pages/community-center/cpns/CommonShop.vue'
import StorePrimaryFilterBox from './components/StorePrimaryFilterBox.vue'
import StoreSecondaryFilterBox from './components/StoreSecondaryFilterBox.vue'
import { getNearByShopListApi, getSecondLevelShopLabelListApi } from '../../api/community-center'
import { getCurrentLocation } from '../../utils'

export default {
	name: 'Shop',
	components: { CommonShop, StorePrimaryFilterBox, StoreSecondaryFilterBox },
	data() {
		return {
			transformation: {
				1: '品牌家居',
				2: '建材',
				3: '找师傅',
				4: '找家政',
				5: '中介公司',
				6: '美食团购',
				7: '蔬菜生鲜',
				8: '超市便利',
				9: '养车用车',
				// 10: '便民服务',
				11: '酒店民宿',
				12: '美容理发',
				13: '休闲娱乐',
				14: '培训室',
				15: '广告礼品',
				16: '母婴店',
				17: '儿童乐园',
				18: '摄影室',
				19: '花店',
				20: '宠物',
				21: '电影院',
				22: '创意策划'
			},
			currentType: '',
			parentId: '',

			// 判断每个类板块是否拥有某个页面结构
			ownSearchBar: ['1', '2', '3', '4', '6', '7', '8', '9', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
			ownMenuBar: ['5', '6', '7', '8', '9', '13', '16'],
			menuBarArr: [],
			ownLimitedTimeSeckill: [ '6' ],
			limitedTimeSeckillArr: [],
			ownSelectionBox: ['1', '2', '3', '4', '6', '9', '12', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
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
			ownSecondaryFilterBox: ['7', '8'],
			ownSpecialHotelBox: [ '11' ],
			ownShopCardBox: ['1', '2', '3', '4', '6', '12', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
			ownShopCardWithLineBox: [ '13' ],
			ownShopCardWithGoodsBox: ['7', '8'],
			ownBrandCardBox: [ '5' ],
			ownBrandCardWithPriceBox: [ '11' ],

			nearbyShopList: [],
			nearbyTotalPages: 0,
			loadingStatus: 'more',
			queryInfo: {
				search: '',
				pageNo: 1,
				pageSize: 10,
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
	async onLoad(options) {
		this.currentType = options.type
		this.parentId = options.id
		if (this.ownLimitedTimeSeckill.includes(this.currentType)) {
			const seckillGoodsArr = [{ url: '', name: '菜a菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜b菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜c菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜d菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜e菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }]
			this.limitedTimeSeckillArr = seckillGoodsArr.flatMap((item, index) => (index % 2 ? [] : [ seckillGoodsArr.slice(index, index + 2) ]))
		} else if (this.ownSelectionBox.includes(this.currentType)) {
			this.selectionBoxArr = ['美食餐厅', '精选团购', '单人餐', '精选团购', '精选团购', '精选团购', '精选团购'] || ['加油站', '充电桩', '停车场', '代办点', '年检站']
		}
		if (this.ownMenuBar.includes(this.currentType)) {
			try {
				const res = await getSecondLevelShopLabelListApi({ parentId: this.parentId })
				if (res.statusCode === 20000) {
					if (res.data) {
						this.menuBarArr = res.data
					} else {
						this.menuBarArr = []
					}
				} else {
					res.statusMsg ? this.$showToast(res.statusMsg) : ''
				}
			} catch (error) {
				this.$showToast(error || '未知错误')
			}
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
				uni.showLoading()
				this.loadingStatus = 'loading'
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
				uni.hideLoading()
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

	.shop-card-line:not(:last-child) {
		padding-bottom: 24upx;
		margin-bottom: 24upx;
		border-bottom: 1upx solid #D8D8D8;
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
