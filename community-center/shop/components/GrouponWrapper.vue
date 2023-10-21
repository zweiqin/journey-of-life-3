<template>
	<view style="min-height: 200rpx;">
		<view v-if="grouponList && grouponList.length">
			<scroll-view
				refresher-background="#3f3d3d" scroll-y style="max-height: 85vh;min-height: 400rpx;"
				@scrolltolower="handleScrolltolower"
			>
				<tui-waterfall :list-data="grouponList" :type="2">
					<template #left="{ entity }">
						<BrandGoods
							:rule-id="entity.rule_id" :groupon-price="entity.groupon_price"
							:groupon-member="entity.groupon_member" :goods-data="entity.goods"
							@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${e.id}&rulesId=${e.ruleId}`)"
							@add="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${e.id}&rulesId=${e.ruleId}`)"
						>
						</BrandGoods>
					</template>
					<template #right="{ entity }">
						<BrandGoods
							:rule-id="entity.rule_id" :groupon-price="entity.groupon_price"
							:groupon-member="entity.groupon_member" :goods-data="entity.goods"
							@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${e.id}&rulesId=${e.ruleId}`)"
							@add="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${e.id}&rulesId=${e.ruleId}`)"
						>
						</BrandGoods>
					</template>
				</tui-waterfall>
			</scroll-view>
		</view>
		<LoadMore v-show="grouponList.length" :status="status"></LoadMore>
		<view v-if="grouponList && !grouponList.length && loadingStatus !== 'loading'" class="no-data">
			该店铺暂无团购商品~
		</view>
	</view>
</template>

<script>
import { getGrouponListGoodsApi } from '../../../api/user'
export default {
	name: 'GrouponWrapper',
	props: {
		brandDetail: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			totalPages: 0,
			status: 'none',
			loadingStatus: 'noMore',
			grouponQuery: {
				page: 1,
				size: 10,
				brandId: '',
				sort: 'add_time',
				order: 'desc'
			},
			grouponList: []
		}
	},

	created() {
		this.getGrouponList()
	},
	methods: {
		getGrouponList(isLoadmore) {
			if (!this.brandDetail.id) return this.$showToast('缺少商家信息')
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getGrouponListGoodsApi({ ...this.grouponQuery, brandId: this.brandDetail.id })
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.grouponList.push(...data.data)
					} else {
						this.grouponList = data.data
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		handleScrolltolower() {
			if (this.grouponQuery.page >= this.totalPages) {
				this.status = 'no-more'
				return
			}
			if (this.grouponQuery.size > this.grouponList.length) {
				return
			}
			this.grouponQuery.page++
			this.getGrouponList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.no-data {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 180upx;
	color: #999999;
	font-size: 36upx;
	letter-spacing: 2px;
}
</style>
