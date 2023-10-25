<template>
	<view class="another-index-conatiner">
		<TuanAppShim bg="transparent"></TuanAppShim>
		<PageHeader></PageHeader>

		<view class="goods">
			<view @confirm="handleConfirmType" @select-distance="handleSelectDistance">dfvnbgnbvnghb</view>
			<view class="goods-list-wrapper">
				<view v-if="$data._list && $data._list.length">
					<view v-for="item in $data._list" :key="item.id" :is-positioning="isPositioning" :brand-info="item">
					</view>
				</view>
				<!-- <view style="margin-top: 20upx;">
					<tui-waterfall :list-data="$data._list" :type="2">
					<template #left="{ entity }">
					<view style="width: 345upx;">
					<view :brand="entity"></view>
					</view>
					</template>
					<template #right="{ entity }">
					<view style="width: 345upx;">
					<view :brand="entity"></view>
					</view>
					</template>
					</tui-waterfall>
					</view> -->
				<view style="padding-bottom: 45upx;">
					<LoadingMore
						:status="!$data._isEmpty && !$data._list.length
							? 'loading' : !$data._isEmpty && $data._list.length && ($data._list.length >= $data._listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="$data._isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import xxxx from './cpns/xxxx.vue'
import loadData from '../../mixin/loadData'
import { getClassifyProducts2Api, getCanvasApi } from '../../api/anotherTFInterface'
// import { xxx } from './config'

export default {
	name: 'AnotherIndex',
	components: {
		// xxxx,
	},

	data() {
		return {
			queryParam: {
				dressing: '',
				distance: ''
			}
		}
	},
	mixins: [
		loadData({
			api: getHomeBrandListApi,
			mapKey: {
				list: 'list',
				listTotal: 'total',
				pageSize: 'pageSize'
			},
			callingcb: true,
			dataFn(data) {
				const ignoreBrandList = [ 'xxx' ]
				return data.filter((item) => !ignoreBrandList.includes(item.name))
			}
		})
	],

	onLoad(options) {
		this._loadData()
	},

	methods: {
		handleConfirmType(e) {
			this.queryParam.dressing = e.id
			this.$data._query.page = 1
			this.$data._list = []
			this.$data.listTotal = 0
			this.$data._isEmpty = false
			this.getBrandList()
		},

		handleSelectDistance(e) {
			this.queryParam.distance = e
			this.$data._query.page = 1
			this.$data._list = []
			this.$data.listTotal = 0
			this.$data._isEmpty = false
			this.getBrandList()
		}
	},
	onPullDownRefresh() {
		this.$data._query.page = 1
		this.$data._list = []
		this.$data._listTotal = 0
		this.$data._isEmpty = false
		this._loadData()
		uni.stopPullDownRefresh()
	}
}
</script>

<style lang="less" scoped>
.another-index-conatiner {
	min-height: 100vh;
	background: linear-gradient(95deg, #ebebf5 47%, #f9e9f3 96%);

}
</style>
