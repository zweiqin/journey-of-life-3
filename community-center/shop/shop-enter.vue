<template>
	<view class="shop-container">
		<!-- 顶部栏 -->
		<view class="shop-header-container">
			<image class="back-icon" src="../../static/images/new-business/category/back.png" @click="back"></image>
			<view class="search-container">
				<text style="font-weight: bold;font-size: 36upx;">{{ transformation[currentType] }}</text>
				<tui-input
					v-if="ownSearchBar.includes(currentType)" v-model="queryInfo.search" label="" placeholder="社区商圈"
					clearable is-fillet padding="6upx 10upx 6upx 26upx"
					style="flex: 1;margin-left: 16upx;border: 2upx solid #EF5511;"
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
				@click="go(`/community-center/shop/shop-deep?id=${item.id}`)"
			>
				<view>
					<BeeIcon
						:size="34"
						:src="item.picUrl ? common.seamingImgUrl(item.picUrl) : require('../../static/images/index/design.png')"
					>
					</BeeIcon>
				</view>
				<view style="margin-top: 6upx;font-size: 26upx;white-space: nowrap;">{{ item.storeName }}</view>
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
							@click="go(`/pages/prod/prod?goodsId=${part.id}`)"
						>
							<view>
								<BeeIcon
									width="180upx" height="150upx" style="width: fit-content;border-radius: 22upx;overflow: hidden;"
									:src="item.url || require('../../static/images/index/explosion.webp')"
								>
								</BeeIcon>
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
										style="padding: 4upx 14upx;margin-left: 10upx;font-size: 24upx;border: 1upx solid #f9c1a6;border-radius: 16upx;"
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
		<view v-if="ownSelectionBox.includes(currentType)" style="margin: 14upx 26upx 0;" class="selection-box-tab">
			<tui-tab
				:tabs="selectionBoxArr" :current="selectionBoxNum" scroll background-color="transparent"
				:size="32" bold
				bottom="6upx" color="#222229" selected-color="#222229" slider-bg-color="#ef530e"
				slider-height="4px"
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

		<!-- 酒店特殊中间结构 -->
		<view v-if="ownSpecialHotelBox.includes(currentType)">
			<view
				style="padding: 200upx 26upx 0;background: url('~@/../static/images/new-business/category/hotel-img.png') no-repeat center top/contain;"
			>
				<view style="padding: 28upx 22upx;background-color: #ffffff;border-radius: 24upx;">
					<view class="special-hotel-tab">
						<tui-tab
							:tabs="['国内', '民宿公寓', '钟点房']" :current="specialHotelBoxObj.tabIndex" scroll
							background-color="transparent" :size="32" bold bottom="6upx"
							color="#222229" selected-color="#222229"
							slider-bg-color="#ef530e" slider-height="3px"
							@change="(e) => specialHotelBoxObj.tabIndex = e.index"
						></tui-tab>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 18upx;">
						<TuanLocation style="flex: 1;font-size: 38upx;font-weight: bold;">
							{{ $store.getters.currentCity || '定位失败' }}
						</TuanLocation>
						<view style="display: flex;align-items: center;padding-left: 16upx;border-left: 1upx solid #CDCDCD;">
							<BeeIcon
								:size="16" name="gps" color="#EF5613"
								style="padding: 2upx;border: 1upx solid #EF5613;border-radius: 50%;line-height: 1;"
							></BeeIcon>
							<text style="margin-left: 14upx;font-size: 30upx;color: #EF5613;">我的位置</text>
						</view>
					</view>
					<view style="margin-top: 18upx;">
						<view
							style="display: flex;justify-content: space-between;align-items: center;"
							@click="$refs.refSpecialHotelBoxCalendar && $refs.refSpecialHotelBoxCalendar.show()"
						>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="padding-right: 24upx;border-right: 1upx solid #D8D8D8;">
									<view style="display: flex;align-items: center;font-size: 24upx;">
										<BeeIcon :size="20" name="card-fill" color="#ef5613" style="margin-right: 6upx;"></BeeIcon>
										{{ specialHotelBoxObj.startDate === new Date().toLocaleString().substring(0, 10).replaceAll('/', '-')
											? '今日' : '' }}入住
									</view>
									<view style="padding-top: 16upx;">
										<text style="color: #ef5613;">
											{{ specialHotelBoxObj.startDate.substring(5, 10).replaceAll('-', '月')
											}}日
										</text>
										<text v-if="specialHotelBoxObj.startWeek" style="padding-left: 8upx;font-size: 24upx;">
											{{
												specialHotelBoxObj.startWeek.replace('星期', '周') }}
										</text>
									</view>
								</view>
								<view style="padding-left: 24upx;">
									<view style="display: flex;align-items: center;font-size: 24upx;">
										<BeeIcon :size="20" name="friendadd-fill" color="#ef5613" style="margin-right: 6upx;"></BeeIcon>
										{{ specialHotelBoxObj.endDate === new Date(Date.now() + 24 * 60 * 60 *
											1000).toLocaleString().substring(0, 10).replaceAll('/', '-') ? '明日' : '' }}离店
									</view>
									<view style="padding-top: 16upx;">
										<text>{{ specialHotelBoxObj.endDate.substring(5, 10).replaceAll('-', '月') }}日</text>
										<text v-if="specialHotelBoxObj.endWeek" style="padding-left: 8upx;font-size: 24upx;">
											{{
												specialHotelBoxObj.endWeek.replace('星期', '周') }}
										</text>
									</view>
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<text style="margin-right: 6upx;font-size: 28upx;color: #014BB8;">
									共{{
										(Date.parse(specialHotelBoxObj.endDate.replaceAll('-', '/')) -
											Date.parse(specialHotelBoxObj.startDate.replaceAll('-', '/'))) / (24 * 60 * 60 * 1000) }}晚
								</text>
								<BeeIcon :size="20" name="arrowright" color="#3D3D3D" style="line-height: 1;"></BeeIcon>
							</view>
						</view>
						<tui-calendar
							ref="refSpecialHotelBoxCalendar" :type="2" is-fixed
							:min-date="new Date().toLocaleString().substring(0, 10).replaceAll('/', '-')"
							:max-date="new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleString().substring(0, 10).replaceAll('/', '-')"
							@change="handleSelectSpecialHotelBoxCalendar"
						></tui-calendar>
					</view>
					<view>
						<tui-input
							v-model="queryInfo.search" label="" placeholder="搜索酒店/地名/关键词" clearable
							padding="14upx 0upx"
							:margin-top="20"
							style="border-top: 1upx solid rgba(216, 216, 216, 0.5);border-bottom: 1upx solid rgba(216, 216, 216, 0.5);"
						>
						</tui-input>
					</view>
					<view style="margin-top: 20upx;">
						<tui-button
							type="warning" width="100%" height="82rpx"
							style="background: #ef5613!important;border-radius: 10upx;"
						>
							查找酒店
						</tui-button>
					</view>
				</view>
			</view>
			<view
				style="margin: 14upx 26upx 0;padding: 22upx 22upx 36upx;background: linear-gradient(150deg, #FDF3F1 3%, #FEEAEC 6%, #FFFBEF 10%, #FFFFFF 45%);"
			>
				<view style="display: flex;align-items: center;">
					<text style="font-size: 34upx;font-weight: bold;">超低一口价</text>
					<view
						style="display: flex;align-items: center;margin-left: 18upx;background-color: #fce5df;border-radius: 20upx;"
					>
						<view
							style="width: 110upx;height: 36upx;padding: 6upx 12upx;font-size: 28upx;color: #ffffff;text-align: center;background-color: #f15d43;border-radius: 20upx 0 26upx 20upx;clip-path: polygon(0upx 0upx, 134upx 0, 124upx 8upx, 124upx 48upx, 0 48upx);"
						>
							<text style="margin-left: -10upx;">限时购</text>
						</view>
						<view style="font-size: 26upx;font-weight: bold;color: #f84715;padding: 0 14upx 0;">01:02:15</view>
					</view>
				</view>
				<view style="margin-top: 20upx;">
					<view
						v-for="(item, index) in specialHotelGoodsArr" :key="index" style="display: flex;margin-top: 18upx;"
						@click="go(`/pages/prod/prod?goodsId==${item.id}`)"
					>
						<view>
							<BeeIcon
								width="180upx" height="252upx" style="width: fit-content;border-radius: 22upx;overflow: hidden;"
								:src="item.url || require('../../static/images/index/explosion.webp')"
							>
							</BeeIcon>
						</view>
						<view style="flex: 1;width: 0;margin-left: 20upx;">
							<view
								style="font-size: 34upx;font-weight: bold;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
							>
								{{ item.name }}
							</view>
							<view
								style="margin-top: 6upx;font-size: 26upx;color: #9e9e9e;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
							>
								{{ item.typeName }}
							</view>
							<view style="margin-top: 8upx;">
								<view style="font-size: 26upx;color: #9e9e9e;text-align: right;">已售100+</view>
								<view style="display: flex;justify-content: flex-end;align-items: center;margin-top: 14upx;">
									<view style="margin-right: 12upx;">
										<view style="font-size: 26upx;color: #9e9e9e;text-align: right;">1晚价</view>
										<view style="display: flex;align-items: center;color: #ef530e;">
											<view style="font-size: 24upx;color: #9e9e9e;text-decoration: line-through;">￥444.44</view>
											<text>
												<text style="font-size: 24upx;">￥</text>
												<text style="font-size: 38upx;font-weight: bold;">{{ item.price }}</text>
											</text>
											<text
												style="padding: 2upx 10upx;margin-left: 10upx;font-size: 24upx;border: 1upx solid #f9c1a6;border-radius: 12upx;white-space: nowrap;"
											>
												{{ item.discount }}折
											</text>
										</view>
									</view>
									<tui-button
										type="warning" width="140rpx" height="72rpx" shape="circle"
										style="background: #ee6529!important;" @click="go(`/pages/prod/prod?goodsId==${item.id}`)"
									>
										抢购
									</tui-button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="ownShopCardBox.includes(currentType) && nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<CommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22upx 0"
				radius="20upx"
			></CommonShop>
		</view>
		<view v-if="ownShopCardWithLineBox.includes(currentType) && nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<CommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22upx 0"
				radius="20upx"
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
				radius="20upx"
			>
				<view style="padding: 20upx 26upx">
					<scroll-view scroll-x="true">
						<view style="display: flex;">
							<view
								v-for="item in [{ id: 1, price: 4.44, originPrice: 7.44, picUrl: 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/a9cbbfdbf277431aba5be3a5f84d47d3.jpg', name: '无穷盐就焗鸡30g/包' }, { id: 2, price: 299.88, originPrice: 444.44, picUrl: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/kkxv7rbsfepxe3jss9n7.jpg', name: 'vsvfxdvdf' }, { id: 3, price: 93.44, originPrice: 144.44, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/bpbnfuyunfzye43yffm9.jpg', name: '葵花芝婴童品牌 阿胶红枣蛋白质奶粉' }, { id: 4, price: 66.44, originPrice: 144.44, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/nbz4an1inoycdk949gen.jpg', name: '北京同仁堂健康 青源堂鹿茸' }, { id: 5, price: 66.44, originPrice: 144.44, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/ft4wmckijv2jey1a9t66.jpg', name: '圆形保洁篮带盖双层洗菜筐' }, { id: 6, price: 66.44, originPrice: 144.44, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/ni7q62dqc671jcts0y2o.jpg', name: '美国大牌SUNKTA陶瓷简约时' }]"
								:key="item.id"
								style="display: flex;flex-direction: column;justify-content: space-between;padding-right: 18upx;"
							>
								<view style="width: 160upx;">
									<tui-lazyload-img
										width="100%" height="168upx" mode="scaleToFill" radius="20upx"
										:src="item.picUrl"
									></tui-lazyload-img>
									<view
										style="line-height: 1;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
									>
										<text style="font-size: 24upx;">{{ item.name }}</text>
									</view>
								</view>
								<view style="margin-top: 14upx;display: flex;align-items: center;flex-wrap: wrap;">
									<view style="font-size: 28upx;font-weight: bold;color: #E02208;margin-right: 10upx;">
										<text style="font-size: 26upx;">￥</text>
										{{ item.price }}
									</view>
									<view style="font-size: 24upx;color: #979797;text-decoration: line-through;">
										￥{{ item.originPrice }}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</CommonShop>
		</view>
		<view v-if="ownBrandCardBox.includes(currentType) && nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<tui-waterfall :list-data="nearbyShopList" :type="2" :page-size="queryInfo.pageSize">
				<template #left="{ entity }">
					<view style="width: 338upx;">
						<BrandShop :brand-info="entity" bottom-type="brief" :show-logo="false"></BrandShop>
					</view>
				</template>
				<template #right="{ entity }">
					<view style="width: 338upx;">
						<BrandShop :brand-info="entity" bottom-type="brief" :show-logo="false"></BrandShop>
					</view>
				</template>
			</tui-waterfall>
		</view>
		<view v-if="ownBrandCardWithPriceBox.includes(currentType) && nearbyShopList.length" style="margin: 14upx 26upx 0;">
			<tui-waterfall :list-data="nearbyShopList" :type="2" :page-size="queryInfo.pageSize">
				<template #left="{ entity }">
					<view style="width: 338upx;">
						<BrandShop :brand-info="entity" bottom-type="brief" show-price :show-logo="false"></BrandShop>
					</view>
				</template>
				<template #right="{ entity }">
					<view style="width: 338upx;">
						<BrandShop :brand-info="entity" bottom-type="brief" show-price :show-logo="false"></BrandShop>
					</view>
				</template>
			</tui-waterfall>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !nearbyShopList.length
					? 'loading' : !isEmpty && nearbyShopList.length && (nearbyShopList.length >= nearbyTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import CommonShop from '../../pages/business-district/components/CommonShop.vue'
import BrandShop from '../../pages/business-district/components/BrandShop.vue'
import StorePrimaryFilterBox from './components/StorePrimaryFilterBox.vue'
import StoreSecondaryFilterBox from './components/StoreSecondaryFilterBox.vue'
import { getShopCategorySonApi, getHomeBrandListApi } from '../../api/anotherTFInterface'

export default {
	name: 'ShopEnter',
	components: { CommonShop, BrandShop, StorePrimaryFilterBox, StoreSecondaryFilterBox },
	data() {
		return {
			transformation: {
				0: '全部商家',
				1: '同城家居',
				2: '建材五金',
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
				22: '创意策划',
				23: '酒庄',
				24: '就医买药'
			},
			currentType: '',
			parentId: '',

			// 判断每个类板块是否拥有某个页面结构
			ownSearchBar: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
			ownMenuBar: ['1', '3', '5', '6', '7', '8', '9', '13', '16'], // '1', '2',
			menuBarArr: [],
			ownLimitedTimeSeckill: [ '6' ],
			limitedTimeSeckillArr: [],
			ownSelectionBox: ['1', '2', '3', '4', '6', '9', '12', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
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
			specialHotelGoodsArr: [],
			specialHotelBoxObj: {
				tabIndex: 0,
				startDate: new Date().toLocaleString()
					.substring(0, 10)
					.replaceAll('/', '-'),
				endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
					.substring(0, 10)
					.replaceAll('/', '-'),
				startWeek: '',
				endWeek: ''
			},
			ownShopCardBox: ['0', '1', '2', '3', '4', '6', '9', '12', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
			ownShopCardWithLineBox: [ '13' ],
			ownShopCardWithGoodsBox: ['7', '8'],
			ownBrandCardBox: [ '5' ],
			ownBrandCardWithPriceBox: [ '11' ],

			nearbyShopList: [],
			nearbyTotal: 0,
			isEmpty: false,
			queryInfo: {
				page: 1,
				pageSize: 10,
				search: '',
				classifyId: ''
			}
		}
	},
	watch: {
		'queryInfo.search'(value) {
			if (value) {
				this.getNearByShopList(true)
			}
		}
	},
	// eslint-disable-next-line complexity
	async onLoad(options) {
		this.currentType = options.type || '0'
		this.parentId = options.id || ''
		this.queryInfo.classifyId = options.id || ''
		if (this.ownLimitedTimeSeckill.includes(this.currentType)) {
			const seckillGoodsArr = [{ url: '', name: '菜a菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜b菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜c菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜d菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜e菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }]
			this.limitedTimeSeckillArr = seckillGoodsArr.flatMap((item, index) => (index % 2 ? [] : [ seckillGoodsArr.slice(index, index + 2) ]))
		}
		if (this.ownSelectionBox.includes(this.currentType)) {
			if (this.currentType === '1') this.selectionBoxArr = ['全部', '品牌专卖', '独立大店', '企业连锁', '家居专卖']
			else if (this.currentType === '2') this.selectionBoxArr = ['全部', '品牌专卖', '独立大店', '企业连锁', '家居专卖']
			else if (this.currentType === '3') this.selectionBoxArr = ['水电安装', '家具安装', '家电维修', '招牌安装']
			else if (this.currentType === '4') this.selectionBoxArr = ['全部', '保姆', '月嫂', '保洁', '收纳']
			else if (this.currentType === '6') this.selectionBoxArr = ['美食餐厅', '精选团购', '单人餐']
			else if (this.currentType === '9') this.selectionBoxArr = ['加油站', '充电桩', '停车场', '代办点', '年检站']
			else if (this.currentType === '12') this.selectionBoxArr = ['全部', '理发店', '美甲美睫', '美容SPA', '纹眉锈眉', '医学美容']
			else if (this.currentType === '14') this.selectionBoxArr = ['全部', '商学院', '电商直播', '开店']
			else if (this.currentType === '15') this.selectionBoxArr = ['全部', '广告设计', '广告策划', '营销策划', '营销推广']
			else if (this.currentType === '16') this.selectionBoxArr = ['推荐', '月子中心', '备孕检查', '孕早期检查', '产检']
			else if (this.currentType === '17') this.selectionBoxArr = ['儿童游乐', '益智优教']
			else if (this.currentType === '18') this.selectionBoxArr = [ '还没有' ]
			else if (this.currentType === '19') this.selectionBoxArr = ['全部', '外卖', '到店', '电商包邮']
			else if (this.currentType === '20') this.selectionBoxArr = ['全部', '洗澡', '美容', '疫苗', '体检', '绝育', '驱虫']
			else if (this.currentType === '21') this.selectionBoxArr = ['热映影片', '大剧场', '销量最高', '评分最高']
			else if (this.currentType === '22') this.selectionBoxArr = ['全部', '商学院', '电商直播', '开店']
			else if (this.currentType === '23') this.selectionBoxArr = ['推荐', '酒吧']
		}
		if (this.ownSpecialHotelBox.includes(this.currentType)) {
			this.specialHotelGoodsArr = [{ url: '', name: '爆款】59元住全国 平日酒店晚通兑换券 中秋不加价 全国全国全国全国全国各器官svdsbv', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜b菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐dvfdgbvhjfdbfjbnfdhbu套餐套餐', price: 99.99, discount: 9.9 }, { url: '', name: '菜c菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜菜', typeName: '套餐套餐套餐套餐', price: 99.99, discount: 9.9 }]
		}
		if (this.ownShopCardBox.includes(this.currentType) || this.ownShopCardWithLineBox.includes(this.currentType) || this.ownShopCardWithGoodsBox.includes(this.currentType) || this.ownBrandCardBox.includes(this.currentType) || this.ownBrandCardWithPriceBox.includes(this.currentType)) {
			this.getNearByShopList(true)
		}
		if (this.ownMenuBar.includes(this.currentType)) {
			const res = await getShopCategorySonApi({ pid: this.parentId })
			this.menuBarArr = res.data || []
		}
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
		handleSelectSpecialHotelBoxCalendar(e) {
			console.log(e)
			if (e.startDate === e.endDate) return this.$showToast('不能选择同一天')
			this.specialHotelBoxObj.startDate = e.startDate
			this.specialHotelBoxObj.endDate = e.endDate
			this.specialHotelBoxObj.startWeek = e.startWeek
			this.specialHotelBoxObj.endWeek = e.endWeek
		},
		getNearByShopList(isLoadmore) {
			uni.showLoading()
			getHomeBrandListApi({
				...this.queryInfo,
				areaId: this.$store.state.location.locationInfo.adcode, // this.$store.state.location.shopAndbusinessLocation.shopAndbusinessDetailAddressObj.adcode
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			})
				.then((res) => {
					this.nearbyTotal = res.data.total
					if (isLoadmore) {
						this.nearbyShopList.push(...res.data.list)
					} else {
						this.nearbyShopList = res.data.list
					}
					if (this.nearbyShopList.length === 0) this.isEmpty = true
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

	.selection-box-tab {
		.tui-scroll__view {
			/deep/ .tui-tabs__line {
				margin-left: -26upx;
				clip-path: inset(0% 30% 0% 30% round 4upx 4upx 4upx 4upx);
				// background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 20%, #ef530e 20%, #ef530e 80%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)!important;
				// clip-path: polygon(20% 0, 80% 0, 80% 100%, 20% 100%);
			}
		}
	}

	.special-hotel-tab {
		.tui-scroll__view {
			/deep/ .tui-tabs__item {
				padding: 0 60upx 0 0;
			}

			/deep/ .tui-tabs__line {
				margin-left: -48upx;
			}
		}
	}

	.shop-card-line:not(:last-child) {
		padding-bottom: 24upx;
		margin-bottom: 24upx;
		border-bottom: 1upx solid #D8D8D8;
	}
}
</style>
