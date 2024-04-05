<template>
	<view class="claasify-products-container">
		<JHeader
			:title="transformation[currentType]" width="50" height="50"
			style="padding: 24upx 0 18upx;background-color: #ffffff;"
		></JHeader>
		<view v-if="ownSearchBar.includes(currentType)" style="padding: 0 0 12upx;background-color: #ffffff;">
			<view style="display: flex;align-items: center;margin: 0 28upx;border: 2upx solid #EF5511;border-radius: 50upx;">
				<TuanLocation
					free event-name="sendChooseAddressSuccessMsg"
					style="display: flex;align-items: center;padding-left: 18upx;line-height: 1;"
				>
					<text style="max-width: 130upx;font-size:28upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
						{{ $store.getters.currentShopCity || '定位失败' }}
					</text>
					<BeeIcon :size="26" name="turningdown" color="#222229"></BeeIcon>
				</TuanLocation>
				<view style="width: 4upx;height: 28upx;background-color: #f6f6f8;"></view>
				<tui-input
					v-model="queryInfo.search" :placeholder="transformation[currentType]" clearable
					:border-bottom="false" padding="6upx 10upx 6upx 2upx" placeholder-style="color: #222229;font-size: 28upx;"
					background-color="transparent" style="flex: 1;margin-left: 14upx;"
				>
					<template #right>
						<tui-button
							type="warning" width="120rpx" height="50rpx" shape="circle"
							style="background: #ee692f!important;"
							@click="queryInfo.search ? (queryInfo.page = 1) && getGoodsSearchList() : (queryInfo.search = transformation[currentType]) && (queryInfo.page = 1) && getGoodsSearchList()"
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
			style="display: flex;align-items: center;flex-wrap: wrap;margin: 14upx 26upx 0;padding: 24upx 22upx 2upx;color: #222229;background-color: #ffffff;border-radius: 20upx;"
		>
			<view
				v-for="item in menuBarArr" :key="item.id" style="width: 20%;margin-bottom: 22upx;text-align: center;"
				@click="go(`/another-tf/another-serve/goodsList/index?classifyId=${item.classifyId}`)"
			>
				<view>
					<BeeIcon
						:size="38"
						style="width: fit-content;margin: 0 auto;border-radius: 50%;line-height: 1;overflow: hidden;"
						:src="item.classifyImage ? common.seamingImgUrl(item.classifyImage) : require('../../../static/images/index/design.png')"
					>
					</BeeIcon>
				</view>
				<view style="margin-top: 6upx;font-size: 26upx;white-space: nowrap;">{{ item.classifyName }}</view>
			</view>
		</view>

		<view
			v-if="ownGoodsCardBox.includes(currentType) && goodsList.length"
			style="margin: 14upx 26upx 0;box-sizing: border-box;"
		>
			<tui-waterfall :list-data="goodsList" :type="2">
				<template #left="{ entity }">
					<ATFShopGoods
						:shop-id="entity.shopId" :c-item="entity" pic-padding="16upx" price-color="#333333"
						:show-icon="false" show-brief
					>
					</ATFShopGoods>
				</template>
				<template #right="{ entity }">
					<ATFShopGoods
						:shop-id="entity.shopId" :c-item="entity" pic-padding="16upx" price-color="#333333"
						:show-icon="false" show-brief
					>
					</ATFShopGoods>
				</template>
			</tui-waterfall>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !goodsList.length
					? 'loading' : !isEmpty && goodsList.length && (goodsList.length >= goodsTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getFirstClassifyApi, getClaasifyProductsApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ClaasifyProducts',
	components: {
	},
	data() {
		return {
			transformation: {
				all: '分类商品',
				auxiliaryMaterials: '普材超市'
			},
			currentType: '',

			// 判断每个类板块是否拥有某个页面结构
			ownSearchBar: ['all', 'auxiliaryMaterials'],
			ownMenuBar: [ 'auxiliaryMaterials' ],
			menuBarArr: [],
			ownGoodsCardBox: ['all', 'auxiliaryMaterials'],

			isEmpty: false,
			goodsList: [],
			goodsTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				search: '',
				classifyId: '',
				type: 0,
				volume: 0
			}
		}
	},
	async onLoad(options) {
		this.currentType = options.type || 'all'
		this.queryInfo.classifyId = options.id || ''
		if (this.ownGoodsCardBox.includes(this.currentType)) {
			this.getGoodsSearchList()
		}
		if (this.ownMenuBar.includes(this.currentType)) {
			const res = await getFirstClassifyApi({ classifyId: this.queryInfo.classifyId })
			this.menuBarArr = res.data || []
		}
	},
	methods: {
		getGoodsSearchList(isLoadmore) {
			uni.showLoading()
			getClaasifyProductsApi(this.queryInfo).then((res) => {
				this.goodsTotal = res.data.total
				if (isLoadmore) {
					this.goodsList.push(...res.data.list)
				} else {
					this.goodsList = res.data.list
				}
				this.isEmpty = this.goodsList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.goodsList.length < this.goodsTotal) {
			++this.queryInfo.page
			this.getGoodsSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.claasify-products-container {
	min-height: 100vh;
	background-color: #f5f4f6;
	box-sizing: border-box;

	/deep/ .j-header-container .title {
		font-size: 36upx;
		color: #222229;
	}
}
</style>
