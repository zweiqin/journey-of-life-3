<template>
	<view class="shop-container">
		<!-- 顶部栏 -->
		<view class="shop-header-container">
			<tui-icon name="arrowleft" :size="60" unit="rpx" margin="0" color="#222229" bold @click="back"></tui-icon>
			<view class="search-container">
				<text style="font-weight: bold;font-size: 36rpx;">
					{{ transformation[currentType] || `出错了${currentType}~${queryInfo.classifyId}` }}
				</text>
				<tui-input
					v-if="ownSearchBar.includes(currentType)" v-model="queryInfo.search" placeholder="社区商圈" clearable
					is-fillet padding="6rpx 10rpx 6rpx 26rpx" style="flex: 1;margin-left: 16rpx;border: 2rpx solid #EF5511;"
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

		<!-- 菜单栏 -->
		<view
			v-if="ownMenuBar.includes(currentType)"
			style="display: flex;align-items: center;flex-wrap: wrap;margin: 14rpx 26rpx 0;padding: 22rpx 22rpx 2rpx;background-color: #ffffff;border-radius: 20rpx;"
		>
			<view
				v-for="item in menuBarArr" :key="item.id" style="width: 20%;margin-bottom: 20rpx;text-align: center;"
				@click="go(`/another-tf/another-user/shop/shop-deep?id=${item.id}&name=${item.storeName}`)"
			>
				<view>
					<BeeIcon
						:size="34"
						:src="item.picUrl ? common.seamingImgUrl(item.picUrl) : require('../../../static/images/new-user/default-user-avatar.png')"
					>
					</BeeIcon>
				</view>
				<view style="margin-top: 6rpx;font-size: 26rpx;white-space: nowrap;">{{ item.storeName }}</view>
			</view>
		</view>

		<!-- 特殊显示菜单栏 -->
		<view v-if="ownSpecialLineMenuBar.includes(currentType)" style="margin: 14rpx 26rpx 0;">
			<view
				v-if="menuBarArr.slice(0, -5).length"
				style="display: flex;align-items: center;flex-wrap: wrap;margin-bottom: 14rpx;padding: 22rpx 22rpx 2rpx;background-color: #ffffff;border-radius: 20rpx;"
			>
				<view
					v-for="item in menuBarArr.slice(0, -5)" :key="item.id"
					style="width: 20%;margin-bottom: 20rpx;text-align: center;"
					@click="go(`/another-tf/another-user/shop/shop-deep?id=${item.id}&name=${item.storeName}`)"
				>
					<view>
						<BeeIcon
							:size="34"
							:src="item.picUrl ? common.seamingImgUrl(item.picUrl) : require('../../../static/images/new-user/default-user-avatar.png')"
						>
						</BeeIcon>
					</view>
					<view style="margin-top: 6rpx;font-size: 26rpx;white-space: nowrap;">{{ item.storeName }}</view>
				</view>
			</view>
			<view v-if="menuBarArr.length" style="display: flex;overflow-x: auto;">
				<view
					v-for="item in menuBarArr.slice(-5)" :key="item.id"
					style="display: flex;align-items: center;margin-right: 24rpx;padding: 12rpx 20rpx;background-color: #ffffff;"
					@click="go(`/another-tf/another-user/shop/shop-deep?id=${item.id}&name=${item.storeName}`)"
				>
					<view>
						<BeeIcon
							:size="18" style="line-height: 1;"
							:src="item.picUrl ? common.seamingImgUrl(item.picUrl) : require('../../../static/images/new-user/default-user-avatar.png')"
						>
						</BeeIcon>
					</view>
					<view style="margin-left: 12rpx;font-size: 26rpx;white-space: nowrap;">{{ item.storeName }}</view>
				</view>
			</view>
		</view>

		<!-- 限时秒杀 -->
		<view
			v-if="ownLimitedTimeSeckill.includes(currentType) && limitedTimeSeckillArr && limitedTimeSeckillArr.length"
			style="margin: 14rpx 26rpx 0;padding: 2rpx 22rpx 22rpx;background: linear-gradient(122deg, #FDF3F1 2%, #FEEAEC 6%, #FFFBEF 12%, #FFFFFF 64%);border-radius: 20rpx;"
		>
			<view style="display: flex;flex-wrap: wrap;align-items: center;">
				<text style="margin: 20rpx 18rpx 0 0;font-size: 34rpx;font-weight: bold;white-space: nowrap;">
					{{ limitedTimeSeckillArr[seckillSwiperCurrent].seckillName || '限时秒杀' }}
				</text>
				<view
					style="display: flex;align-items: center;margin: 20rpx 0 0;background-color: #fce5df;border-radius: 20rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
				>
					<view
						style="width: 110rpx;height: 36rpx;padding: 6rpx 12rpx;font-size: 28rpx;color: #ffffff;text-align: center;background-color: #f15d43;border-radius: 20rpx 0 26rpx 20rpx;clip-path: polygon(0rpx 0rpx, 134rpx 0, 124rpx 8rpx, 124rpx 48rpx, 0 48rpx);"
					>
						<text style="margin-left: -10rpx;">
							<text v-if="Date.now() >= Date.parse(limitedTimeSeckillArr[seckillSwiperCurrent].endTime)">已结束</text>
							<text
								v-else-if="Date.now() >= Date.parse(limitedTimeSeckillArr[seckillSwiperCurrent].startTime)"
							>
								距结束
							</text>
							<text
								v-else-if="Date.now() < Date.parse(limitedTimeSeckillArr[seckillSwiperCurrent].startTime)"
							>
								即将开始
							</text>
						</text>
					</view>
					<view style="font-size: 26rpx;font-weight: bold;color: #f84715;padding: 0 14rpx 0;">
						<text v-if="Date.now() >= Date.parse(limitedTimeSeckillArr[seckillSwiperCurrent].endTime)">
							{{ limitedTimeSeckillArr[seckillSwiperCurrent].endTime }}
						</text>
						<view v-else-if="Date.now() >= Date.parse(limitedTimeSeckillArr[seckillSwiperCurrent].startTime)">
							<tui-countdown
								:size="24" :colon-size="24" colon-color="#f84715" color="#f84715"
								border-color="transparent" background-color="transparent"
								:time="Math.floor((Date.parse(limitedTimeSeckillArr[seckillSwiperCurrent].endTime) - Date.now()) / 1000)"
							></tui-countdown>
						</view>
						<text v-else-if="Date.now() < Date.parse(limitedTimeSeckillArr[seckillSwiperCurrent].startTime)">
							{{ limitedTimeSeckillArr[seckillSwiperCurrent].startTime }}
						</text>
					</view>
				</view>
			</view>
			<swiper style="height: 208rpx;" @change="(e) => seckillSwiperCurrent = e.detail.current">
				<swiper-item v-for="(item, index) in limitedTimeSeckillArr" :key="index">
					<view v-if="item && item.products" style="margin-top: 20rpx;">
						<swiper autoplay vertical style="height: 160rpx;">
							<swiper-item
								v-for="(section, count) in item.products" :key="count"
								style="display: flex;justify-content: space-between;align-items: center;"
							>
								<view
									v-for="(part, number) in section" :key="number"
									style="display: flex;align-items: center;justify-content: space-between;width: 49%;height: 100%;overflow: hidden;"
									@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${part.shopId}&productId=${part.productId}&skuId=${part.skuId}`)"
								>
									<view>
										<BeeIcon
											width="180rpx" height="150rpx"
											style="width: fit-content;border-radius: 22rpx;overflow: hidden;"
											:src="part.image ? common.seamingImgUrl(part.image) : require('../../../static/images/con-center/hongbao.png')"
										>
										</BeeIcon>
										<view
											style="height: 10rpx;margin: 0 20rpx;background-color: #c8c9b7;border-radius: 0 0 20rpx 20rpx;"
										>
										</view>
									</view>
									<view
										style="flex: 1;display: flex;flex-direction: column;justify-content: space-around;width: 0;height: 100%;margin-left: 20rpx;"
									>
										<view style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
											{{ part.productName }}
										</view>
										<view
											style="font-size: 26rpx;color: #9e9e9e;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
										>
											剩{{ part.stockNumber }}件
										</view>
										<view style="display: flex;flex-wrap: wrap;color: #ef530e;">
											<text>
												<text style="font-size: 24rpx;">￥</text>
												<text style="font-weight: bold;">{{ part.price }}</text>
											</text>
											<text
												style="padding: 4rpx 14rpx;margin-left: 10rpx;font-size: 24rpx;border: 1rpx solid #f9c1a6;border-radius: 16rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
											>
												降{{ item.seckillMoney }}元
											</text>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
					<view v-else style="padding-bottom: 45rpx;">
						<tui-no-data :fixed="false" style="padding-top: 60rpx;">该活动暂无商品～</tui-no-data>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 类别选择框（额外的同‘一级分类’的分类） -->
		<view v-if="ownSelectionBox.includes(currentType)" style="margin: 14rpx 26rpx 0;" class="selection-box-tab">
			<tui-tab
				:tabs="selectionBoxArr" :current="selectionBoxNum" scroll background-color="transparent"
				:size="32" bold
				bottom="6rpx" color="#222229" selected-color="#222229" slider-bg-color="#ef530e"
				slider-height="4px"
				@change="(e) => selectionBoxNum = e.index"
			></tui-tab>
		</view>

		<!-- 首要标签筛选框 -->
		<view v-if="ownPrimaryFilterBox.includes(currentType)" style="margin: 14rpx 26rpx 0;">
			<StorePrimaryFilterBox
				:parent-classify-id="queryInfo.classifyId" :default-class-text="currentType === '6' ? '全部美食' : ''"
				padding="0 30rpx" @select="handleSelectPrimaryFilter"
			></StorePrimaryFilterBox>
		</view>

		<!-- 次要排序筛选框 -->
		<view v-if="ownSecondaryFilterBox.includes(currentType)" style="margin: 14rpx 26rpx 0;">
			<StoreSecondaryFilterBox @select="handleSelectSecondaryFilter"></StoreSecondaryFilterBox>
		</view>

		<!-- 酒店特殊中间结构 -->
		<view v-if="ownSpecialHotelBox.includes(currentType)">
			<view
				style="padding: 200rpx 26rpx 0;"
				:style="{ background: `url(${common.seamingImgUrl('1714981334756-hotel-img.png')}) no-repeat center top/contain` }"
			>
				<view style="padding: 28rpx 22rpx;background-color: #ffffff;border-radius: 24rpx;">
					<view class="special-hotel-tab">
						<tui-tab
							:tabs="['国内', '民宿公寓', '钟点房']" :current="specialHotelBoxObj.tabIndex" scroll
							background-color="transparent" :size="32" bold bottom="6rpx"
							color="#222229" selected-color="#222229"
							slider-bg-color="#ef530e" slider-height="3px"
							@change="(e) => specialHotelBoxObj.tabIndex = e.index"
						></tui-tab>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 18rpx;">
						<TuanLocation free style="flex: 1;font-size: 38rpx;font-weight: bold;">
							{{ currentShopCity || '定位失败' }}
						</TuanLocation>
						<view style="display: flex;align-items: center;padding-left: 16rpx;border-left: 1rpx solid #CDCDCD;">
							<BeeIcon
								:size="16" name="gps" color="#EF5613"
								style="padding: 2rpx;border: 1rpx solid #EF5613;border-radius: 50%;line-height: 1;"
							></BeeIcon>
							<text style="margin-left: 14rpx;font-size: 30rpx;color: #EF5613;">我的位置</text>
						</view>
					</view>
					<view style="margin-top: 18rpx;">
						<view
							style="display: flex;justify-content: space-between;align-items: center;"
							@click="$refs.refSpecialHotelBoxCalendar && $refs.refSpecialHotelBoxCalendar.show()"
						>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="padding-right: 24rpx;border-right: 1rpx solid #D8D8D8;">
									<view style="display: flex;align-items: center;font-size: 24rpx;">
										<BeeIcon :size="20" name="card-fill" color="#ef5613" style="margin-right: 6rpx;"></BeeIcon>
										{{ specialHotelBoxObj.startDate === `${String(new Date().getFullYear())}-${String(new
											Date().getMonth() + 1)}-${String(new Date().getDate())}`
											? '今日' : '' }}入住
									</view>
									<view style="padding-top: 16rpx;">
										<text style="color: #ef5613;">
											{{ specialHotelBoxObj.startDate.substring(5).replace(/-/g, '月') }}日
										</text>
										<text v-if="specialHotelBoxObj.startWeek" style="padding-left: 8rpx;font-size: 24rpx;">
											{{ specialHotelBoxObj.startWeek.replace('星期', '周') }}
										</text>
									</view>
								</view>
								<view style="padding-left: 24rpx;">
									<view style="display: flex;align-items: center;font-size: 24rpx;">
										<BeeIcon :size="20" name="friendadd-fill" color="#ef5613" style="margin-right: 6rpx;"></BeeIcon>
										{{ specialHotelBoxObj.endDate === `${String(new Date(Date.now() + 24 * 60 * 60 *
											1000).getFullYear())}-${String(new Date(Date.now() + 24 * 60 * 60 * 1000).getMonth() +
											1)}-${String(new Date(Date.now() + 24 * 60 * 60 * 1000).getDate())}` ? '明日' : '' }}离店
									</view>
									<view style="padding-top: 16rpx;">
										<text>{{ specialHotelBoxObj.endDate.substring(5).replace(/-/g, '月') }}日</text>
										<text v-if="specialHotelBoxObj.endWeek" style="padding-left: 8rpx;font-size: 24rpx;">
											{{ specialHotelBoxObj.endWeek.replace('星期', '周') }}
										</text>
									</view>
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<text style="margin-right: 6rpx;font-size: 28rpx;color: #014BB8;">
									共{{
										(Date.parse(specialHotelBoxObj.endDate.replace(/-/g, '/')) -
											Date.parse(specialHotelBoxObj.startDate.replace(/-/g, '/'))) / (24 * 60 * 60 * 1000) }}晚
								</text>
								<BeeIcon :size="20" name="arrowright" color="#3D3D3D" style="line-height: 1;"></BeeIcon>
							</view>
						</view>
						<tui-calendar
							ref="refSpecialHotelBoxCalendar" :type="2" is-fixed
							:min-date="`${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1)}-${String(new Date().getDate())}`"
							:max-date="`${String(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).getFullYear())}-${String(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).getMonth() + 1)}-${String(new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).getDate())}`"
							@change="handleSelectSpecialHotelBoxCalendar"
						></tui-calendar>
					</view>
					<view>
						<tui-input
							v-model="queryInfo.search" placeholder="搜索酒店/地名/关键词" clearable padding="14rpx 0rpx"
							:margin-top="20"
							style="border-top: 1rpx solid rgba(216, 216, 216, 0.5);border-bottom: 1rpx solid rgba(216, 216, 216, 0.5);"
						>
						</tui-input>
					</view>
					<view style="margin-top: 20rpx;">
						<tui-button
							type="warning" width="100%" height="82rpx"
							style="background: #ef5613!important;border-radius: 10rpx;"
						>
							查找酒店
						</tui-button>
					</view>
				</view>
			</view>
		</view>

		<!-- 平台限时折扣显示框 -->
		<view v-if="ownPlatformDiscountBox.includes(currentType)" style="margin: 14rpx 26rpx 0;">
			<PlatformDiscountGoods></PlatformDiscountGoods>
		</view>

		<view v-if="ownShopCardBox.includes(currentType) && nearbyShopList.length" style="margin: 14rpx 26rpx 0;">
			<ATFCommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22rpx 0" radius="20rpx"
			></ATFCommonShop>
		</view>
		<view v-if="ownShopCardWithLineBox.includes(currentType) && nearbyShopList.length" style="margin: 14rpx 26rpx 0;">
			<ATFCommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22rpx 0" radius="20rpx"
			>
				<view style="padding: 20rpx 0">
					<view
						v-for="item in [{ id: 1, price: 288.88, originPrice: 444.44, name: '主题小包尊享休闲3小时gfgdfnbfngmhgmhgmghnh' }, { id: 2, price: 299.88, originPrice: 444.44, name: '主题小包尊享' }]"
						:key="item.id" style="display: flex;padding-left: 26rpx;padding-right: 26rpx;" class="shop-card-line"
					>
						<view style="text-align: right;padding-right: 26rpx;">
							<view style="color: #EF530E;">￥{{ item.price }}</view>
							<view style="font-size: 28rpx;color: #979797;">门市价:￥{{ item.originPrice }}</view>
						</view>
						<view style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
							<text
								style="padding: 2rpx 6rpx;margin-right: 16rpx;font-size: 24rpx;color: #ffffff;background-color: #ef5613;"
							>
								商
							</text>
							<text style="font-size: 28rpx;color: #a2a2a2;">{{ item.name }}</text>
						</view>
					</view>
				</view>
			</ATFCommonShop>
		</view>
		<view v-if="ownShopCardWithGoodsBox.includes(currentType) && nearbyShopList.length" style="margin: 14rpx 26rpx 0;">
			<ATFCommonShop
				v-for="shop in nearbyShopList" :key="shop.shopId" :shop-info="shop" bottom-type="brief"
				margin="22rpx 0" radius="20rpx"
			>
				<view style="padding: 20rpx 26rpx">
					<scroll-view scroll-x="true">
						<view style="display: flex;">
							<view
								v-for="item in [{ id: 1, price: 4.00, originPrice: 7.44, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1699437546378-微信图片_20231108164901.jpg', name: '黄瓜一根约300g' }, { id: 2, price: 4.00, originPrice: 44.44, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700214488615-粤盐 加碘精制盐500克袋，3.5元.jpg', name: '粤盐 加碘精制盐500克袋' }, { id: 3, price: 5.00, originPrice: 14.74, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700214401740-茉莉香米500g，4.86元.jpg', name: '茉莉香米500g' }, { id: 4, price: 5.00, originPrice: 11.02, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700214433330-太太乐 鸡精调味料40克包，4.5元.jpg', name: '太太乐 鸡精调味料40克/包' }, { id: 5, price: 6.00, originPrice: 73.44, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700213979774-烧烤料（品牌随机），5.5.png', name: '烧烤料（品牌随机）' }, { id: 6, price: 6.00, originPrice: 99.20, picUrl: 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1700214245309-国产 绿心猕猴桃一个约120克【维C】5.5元.jpg', name: '国产 绿心猕猴桃一个约120克【维C】' }]"
								:key="item.id"
								style="display: flex;flex-direction: column;justify-content: space-between;padding-right: 18rpx;"
							>
								<view style="width: 160rpx;">
									<tui-lazyload-img
										width="100%" height="168rpx" mode="scaleToFill" radius="20rpx"
										:src="common.seamingImgUrl(item.picUrl)"
									></tui-lazyload-img>
									<view
										style="line-height: 1;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
									>
										<text style="font-size: 24rpx;">{{ item.name }}</text>
									</view>
								</view>
								<view style="margin-top: 14rpx;display: flex;align-items: center;flex-wrap: wrap;">
									<view style="font-size: 28rpx;font-weight: bold;color: #E02208;margin-right: 10rpx;">
										<text style="font-size: 26rpx;">￥</text>
										{{ item.price }}
									</view>
									<view style="font-size: 24rpx;color: #979797;text-decoration: line-through;">
										￥{{ item.originPrice }}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</ATFCommonShop>
		</view>
		<view v-if="ownBrandCardBox.includes(currentType) && nearbyShopList.length" style="margin: 14rpx 26rpx 0;">
			<tui-waterfall :list-data="nearbyShopList" :type="2" :page-size="queryInfo.pageSize">
				<template #left="{ entity }">
					<view style="width: 338rpx;">
						<BrandShop :brand-info="entity" bottom-type="brief" :show-logo="false"></BrandShop>
					</view>
				</template>
				<template #right="{ entity }">
					<view style="width: 338rpx;">
						<BrandShop :brand-info="entity" bottom-type="brief" :show-logo="false"></BrandShop>
					</view>
				</template>
			</tui-waterfall>
		</view>
		<view v-if="ownBrandCardWithPriceBox.includes(currentType) && nearbyShopList.length" style="margin: 14rpx 26rpx 0;">
			<tui-waterfall :list-data="nearbyShopList" :type="2" :page-size="queryInfo.pageSize">
				<template #left="{ entity }">
					<view style="width: 338rpx;">
						<BrandShop :brand-info="entity" bottom-type="brief" show-price :show-logo="false"></BrandShop>
					</view>
				</template>
				<template #right="{ entity }">
					<view style="width: 338rpx;">
						<BrandShop :brand-info="entity" bottom-type="brief" show-price :show-logo="false"></BrandShop>
					</view>
				</template>
			</tui-waterfall>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !nearbyShopList.length
					? 'loading' : !isEmpty && nearbyShopList.length && (nearbyShopList.length >= nearbyTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import BrandShop from '../../../pages/business-district/components/BrandShop.vue'
import StorePrimaryFilterBox from './components/StorePrimaryFilterBox.vue'
import StoreSecondaryFilterBox from './components/StoreSecondaryFilterBox.vue'
import PlatformDiscountGoods from './components/PlatformDiscountGoods.vue'
import { getShopCategorySonApi, getHomeBrandListApi, getPlatformSeckillsCanvasApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ShopEnter',
	components: { BrandShop, StorePrimaryFilterBox, StoreSecondaryFilterBox, PlatformDiscountGoods },
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
				24: '就医买药',
				25: '金融财务',
				26: '辅材超市'
			},
			currentType: '',

			// 判断每个类板块是否拥有某个页面结构
			ownSearchBar: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'],
			ownMenuBar: ['1', '2', '3', '4', '5', '6', '7', '8', '13', '16', '26'],
			ownSpecialLineMenuBar: [ '9' ],
			menuBarArr: [],
			ownLimitedTimeSeckill: [ '6' ],
			limitedTimeSeckillArr: [],
			seckillSwiperCurrent: 0,
			// ownSelectionBox: ['2', '3', '4', '6', '9', '12', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
			ownSelectionBox: [],
			selectionBoxArr: [],
			selectionBoxNum: 0,
			ownPrimaryFilterBox: [ '6' ],
			ownSecondaryFilterBox: ['7', '8'],
			ownSpecialHotelBox: [ '11' ],
			specialHotelBoxObj: {
				tabIndex: 0,
				startDate: `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1)}-${String(new Date().getDate())}`,
				endDate: `${String(new Date(Date.now() + 24 * 60 * 60 * 1000).getFullYear())}-${String(new Date(Date.now() + 24 * 60 * 60 * 1000).getMonth() + 1)}-${String(new Date(Date.now() + 24 * 60 * 60 * 1000).getDate())}`,
				startWeek: '',
				endWeek: ''
			},
			ownPlatformDiscountBox: [ '11' ],
			ownShopCardBox: ['0', '1', '2', '3', '4', '6', '9', '12', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
			ownShopCardWithLineBox: ['13', '26'],
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
				classifyId: '',
				distance: '9999999999',
				type: '',
				volume: ''
			},
			// 来自筛选功能
			currentClassifyId: ''
		}
	},
	// watch: {
	// 	'queryInfo.search'(value) {
	// 		if (value) {
	// 			this.getNearByShopList(true)
	// 		}
	// 	}
	// },
	async onLoad(options) {
		this.currentType = Number(options.type) ? options.type : '0'
		this.queryInfo.classifyId = options.id || ''
		if (this.ownLimitedTimeSeckill.includes(this.currentType)) {
			const res = await getPlatformSeckillsCanvasApi({ seckillId: '' })
			this.limitedTimeSeckillArr = res.data.map((item) => {
				item.products = item.products.flatMap((section, index) => (index % 2 ? [] : [ item.products.slice(index, index + 2) ]))
				return item
			})
		}
		if (this.ownSelectionBox.includes(this.currentType)) {
			if (this.currentType === '2') this.selectionBoxArr = ['全部', '品牌专卖', '独立大店', '企业连锁', '家居专卖']
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
		if (this.ownShopCardBox.includes(this.currentType) || this.ownShopCardWithLineBox.includes(this.currentType) || this.ownShopCardWithGoodsBox.includes(this.currentType) || this.ownBrandCardBox.includes(this.currentType) || this.ownBrandCardWithPriceBox.includes(this.currentType)) {
			this.getNearByShopList()
		}
		if (this.ownMenuBar.includes(this.currentType) || this.ownSpecialLineMenuBar.includes(this.currentType)) {
			const res = await getShopCategorySonApi({ pid: this.queryInfo.classifyId })
			this.menuBarArr = res.data || []
		}
	},
	computed: {
		...mapGetters([ 'currentShopCity' ])
	},
	methods: {
		back() {
			uni.switchTab({
				url: '/pages/business-district/business-district'
			})
		},
		handleSelectPrimaryFilter(e) {
			console.log(e)
			this.currentClassifyId = e.currentClassifyId || ''
			this.queryInfo.distance = e.distance * 1000 || '9999999999'
			this.queryInfo.type = e.type || ''
			this.queryInfo.volume = e.volume || ''
			this.queryInfo.page = 1
			this.getNearByShopList()
		},
		handleSelectSecondaryFilter(e) {
			this.queryInfo.type = e.type || ''
			this.queryInfo.volume = e.volume || ''
			this.queryInfo.page = 1
			this.getNearByShopList()
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
				classifyId: this.currentClassifyId || this.queryInfo.classifyId,
				areaId: this.$store.state.location.locationInfo.adcode,
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
.shop-container {
	position: relative;
	min-height: 100vh;
	background-color: #f6f6f8;
	box-sizing: border-box;
	padding: 108rpx 0 0;

	.shop-header-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 108rpx;
		width: 100vw;
		background-color: #fff;
		padding: 0 30rpx 0 14rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		z-index: 997;

		.search-container {
			flex: 1;
			display: flex;
			align-items: center;
		}
	}

	.selection-box-tab {
		.tui-scroll__view {
			/deep/ .tui-tabs__line {
				margin-left: -26rpx;
				clip-path: inset(0% 30% 0% 30% round 4rpx 4rpx 4rpx 4rpx);
				// background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 20%, #ef530e 20%, #ef530e 80%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)!important;
				// clip-path: polygon(20% 0, 80% 0, 80% 100%, 20% 100%);
			}
		}
	}

	.special-hotel-tab {
		.tui-scroll__view {
			/deep/ .tui-tabs__item {
				padding: 0 60rpx 0 0;
			}

			/deep/ .tui-tabs__line {
				margin-left: -48rpx;
			}
		}
	}

	.shop-card-line:not(:last-child) {
		padding-bottom: 24rpx;
		margin-bottom: 24rpx;
		border-bottom: 1rpx solid #D8D8D8;
	}
}
</style>
