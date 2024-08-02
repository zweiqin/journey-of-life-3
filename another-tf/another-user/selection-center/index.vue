<template>
	<view class="selection-center-container">
		<JHeader title="选品中心" width="50" height="50">
			<template #ftFn>
				<tui-button
					type="primary" width="180rpx" height="58rpx" margin="0 10rpx 0 0 "
					@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${$store.state.auth.identityInfo.shopInfo.shopId}&isSelection=1`)"
				>
					商家选品
				</tui-button>
			</template>
		</JHeader>

		<view
			style="display: flex;align-items: center;justify-content: space-around;padding: 20rpx 0;font-size: 26rpx;"
		>
			<view
				:style="{ color: selectionGoodsInfo.query.ifNew === 1 ? '#ff7911' : selectionGoodsInfo.query.ifNew === 0 ? '#8dbcbd' : '#000000' }"
				@click="handleGoodsSortTap(1)"
			>
				<text>新品</text>
			</view>
			<view :style="{ color: sortGoodsIndex === 2 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(2)">
				<text>价格</text>
				<tui-icon
					v-if="[1, 2].includes(selectionGoodsInfo.query.type)"
					:name="selectionGoodsInfo.query.type === 1 ? 'turningup' : selectionGoodsInfo.query.type === 2 ? 'turningdown' : ''"
					color="#666666" :size="16"
				></tui-icon>
			</view>
			<view :style="{ color: sortGoodsIndex === 3 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(3)">
				<text>销量</text>
				<tui-icon
					v-if="[1, 2].includes(selectionGoodsInfo.query.volume)"
					:name="selectionGoodsInfo.query.volume === 1 ? 'turningup' : selectionGoodsInfo.query.volume === 2 ? 'turningdown' : ''"
					color="#666666" :size="16"
				></tui-icon>
			</view>
			<view
				:style="{ color: selectionGoodsInfo.query.groupId ? '#ff7911' : '#000000' }"
				@click="selectionTagShowFalg = true"
			>
				<text>{{ classifyName || '分类' }}</text>
			</view>
		</view>
		<view v-if="selectionGoodsInfo.data && selectionGoodsInfo.data.length" style="width: 100%;">
			<tui-waterfall :list-data="selectionGoodsInfo.data" :type="2">
				<template #left="{ entity }">
					<ATFShopGoods
						:shop-id="entity.shopId" :c-item="entity" show-sales
						:show-icon="false" show-brief is-selection
					>
						<template #line="obj">
							<tui-button
								v-if="$store.state.auth.identityInfo.type.includes(13) || $store.state.auth.identityInfo.type.includes(14) || $store.state.auth.identityInfo.type.includes(15)"
								type="warning" width="106rpx" height="54rpx"
								margin="0" shape="circle"
								@click="handleSelectSelection(obj.data)"
							>
								选择
							</tui-button>
						</template>
					</ATFShopGoods>
				</template>
				<template #right="{ entity }">
					<ATFShopGoods
						:shop-id="entity.shopId" :c-item="entity" show-sales
						:show-icon="false" show-brief is-selection
					>
						<template #line="obj">
							<tui-button
								v-if="$store.state.auth.identityInfo.type.includes(13) || $store.state.auth.identityInfo.type.includes(14) || $store.state.auth.identityInfo.type.includes(15)"
								type="warning" width="106rpx" height="54rpx"
								margin="0" shape="circle"
								@click="handleSelectSelection(obj.data)"
							>
								选择
							</tui-button>
						</template>
					</ATFShopGoods>
				</template>
			</tui-waterfall>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!selectionGoodsInfo.isEmpty && !selectionGoodsInfo.data.length
					? 'loading' : !selectionGoodsInfo.isEmpty && selectionGoodsInfo.data.length && (selectionGoodsInfo.data.length >= selectionGoodsInfo.listTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="selectionGoodsInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
		</view>

		<tui-picker
			layer="3" :show="selectionTagShowFalg" :picker-data="allTabData"
			@hide="selectionTagShowFalg = false" @change="handleSelectionPickerChange"
		>
		</tui-picker>
	</view>
</template>

<script>
import { getShopClassifyApi, getBuyerSelectionLibraryApi, getBuyerSelectionSelectApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SelectionCenter',
	data() {
		return {
			allTabData: [],
			selectionTagShowFalg: false,
			classifyName: '',
			sortGoodsIndex: '',
			selectionGoodsInfo: {
				query: {
					ifNew: 1,
					type: '',
					volume: '',
					page: 1,
					pageSize: 20,
					groupId: ''
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad() {
		getShopClassifyApi({
			shopId: ''
		}).then((res) => {
			this.allTabData = this.allTabData.concat(res.data.filter((item) => JSON.stringify(item) !== '{}'))
			this.allTabData = [
				{
					classifyId: 0,
					classifyName: '全部',
					depth: 1,
					groupPid: 0,
					classify: []
				},
				...res.data
			].map((item) => {
				item.text = item.classifyName
				item.value = item.classifyId
				item.children = [{
					classifyId: item.classifyId,
					classifyName: '全部',
					depth: 2,
					groupPid: item.groupPid,
					classify: []
				}, ...item.classify || []]
					.map((section) => {
						section.text = section.classifyName
						section.value = section.classifyId
						section.children = [{
							classifyId: section.classifyId,
							classifyName: '全部',
							depth: 3,
							groupPid: section.groupPid,
							classify: []
						}, ...section.classify || []]
							.map((part) => {
								part.text = part.classifyName
								part.value = part.classifyId
								part.children = []
								return part
							})
						return section
					})
				return item
			})
		})
		this.getSelectionGoodsTemplate()
	},
	methods: {
		getSelectionGoodsTemplate(isLoadmore) {
			uni.showLoading()
			getBuyerSelectionLibraryApi(this.selectionGoodsInfo.query)
				.then((res) => {
					this.selectionGoodsInfo.listTotal = res.data.page.total
					if (isLoadmore) {
						this.selectionGoodsInfo.data.push(...res.data.page.list)
					} else {
						this.selectionGoodsInfo.data = res.data.page.list
					}
					this.selectionGoodsInfo.isEmpty = this.selectionGoodsInfo.data.length === 0
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleGoodsSortTap(index) {
			this.selectionGoodsInfo.query.page = 1
			this.selectionGoodsInfo.data = []
			this.sortGoodsIndex = index
			if (index === 1) {
				this.selectionGoodsInfo.query.ifNew = this.selectionGoodsInfo.query.ifNew ? 0 : 1
				this.selectionGoodsInfo.query.type = ''
				this.selectionGoodsInfo.query.volume = ''
			} else if (index === 2) {
				this.selectionGoodsInfo.query.ifNew = ''
				this.selectionGoodsInfo.query.type = this.selectionGoodsInfo.query.type === 1 ? 2 : 1
				this.selectionGoodsInfo.query.volume = ''
			} else if (index === 3) {
				this.selectionGoodsInfo.query.ifNew = ''
				this.selectionGoodsInfo.query.type = ''
				this.selectionGoodsInfo.query.volume = this.selectionGoodsInfo.query.volume === 1 ? 2 : 1
			}
			this.getSelectionGoodsTemplate()
		},
		handleSelectionPickerChange(e) {
			this.selectionGoodsInfo.query.groupId = e.value[e.value.length - 1]
			this.classifyName = e.text.filter((i) => i !== '全部').reverse()[0] || '全部'
			this.getSelectionGoodsTemplate()
		},
		handleSelectSelection(item) {
			uni.showLoading()
			getBuyerSelectionSelectApi({ productId: item.productId })
				.then((res) => {
					this.$showToast('操作成功')
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.selectionGoodsInfo.data.length < this.selectionGoodsInfo.listTotal) {
			++this.selectionGoodsInfo.query.page
			this.getSelectionGoodsTemplate(true)
		}
	}
}
</script>

<style lang="less" scoped>
.selection-center-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
