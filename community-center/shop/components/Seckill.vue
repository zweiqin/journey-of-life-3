<template>
	<view style="min-height: 200rpx;">
		<view v-if="seckillList && seckillList.length">
			<view v-if="seckillList && seckillList.length">
				<view style="font-weight: bold;">最近秒杀活动：</view>
				<view
					style="display: flex;flex-wrap: wrap;margin-top: 20upx;max-height: 14vh;border: 1upx solid #bcbcbc;overflow-y: auto;"
				>
					<view v-for="item in seckillList" :key="item.id">
						<view
							style="padding: 0 28upx;margin: 10upx;border: 4upx solid #ee8d05;color: #fa5151;"
							:style="{ backgroundColor: item.id === currentSeckill ? '#fabd69' : 'transparent' }"
							@click="handleClickSeckill(item)"
						>
							<view>{{ item.name }}</view>
							<view>将于{{ item.endTime }}结束</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="currentGoods && currentGoods.length" style="margin-top: 20upx;">
				<scroll-view refresher-background="#3f3d3d" scroll-y style="max-height: 85vh;min-height: 400rpx;">
					<tui-waterfall :list-data="currentGoods" :type="2">
						<template #left="{ entity }">
							<BrandGoods
								:goods-data="entity.originGoods" :seckill-good-id="entity.id" :seckill-price="entity.price"
								@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?goodsId=${e.id}`)"
								@add="(e) => (currentSeckillGoodId = entity.id) && $refs.refJSpecificationScreen.open(e.id)"
							>
							</BrandGoods>
						</template>
						<template #right="{ entity }">
							<BrandGoods
								:goods-data="entity.originGoods" :seckill-good-id="entity.id" :seckill-price="entity.price"
								@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?goodsId=${e.id}`)"
								@add="(e) => (currentSeckillGoodId = entity.id) && $refs.refJSpecificationScreen.open(e.id)"
							>
							</BrandGoods>
						</template>
					</tui-waterfall>
				</scroll-view>
			</view>
			<view v-else class="no-data">
				该活动暂无商品~
			</view>
		</view>
		<LoadMore v-show="seckillList.length" :status="status"></LoadMore>
		<view v-if="seckillList && !seckillList.length && loadingStatus !== 'loading'" class="no-data">
			该店铺暂无秒杀活动~
		</view>

		<JSpecificationScreen
			ref="refJSpecificationScreen" :max-number="1" show-select-btn btn-text="秒杀"
			@select="handleSeckill"
		></JSpecificationScreen>
	</view>
</template>

<script>
import { getSeckillListActivitiesApi, getSeckillListGoodsApi, buildSeckillActionApi, getSeckillChkOrderStatusApi } from '../../../api/user'
import { getUserId, getBrandId } from '../../../utils'
export default {
	name: 'Seckill',
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
			status: 'none',
			loadingStatus: 'noMore',
			seckillList: [],
			currentSeckill: 3,
			currentGoods: [],
			currentSeckillGoodId: '',
			seckillTimer: ''
		}
	},

	created() {
		this.getSeckillList()
	},
	beforeDestroy() {
		this.seckillTimer && clearTimeout(this.seckillTimer)
	},
	methods: {
		getSeckillList(isLoadmore) {
			if (!this.brandDetail.id) return this.$showToast('缺少商家信息')
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getSeckillListActivitiesApi({
				brandId: this.brandDetail.id,
				startTime: `${new Date().toJSON()
					.substring(0, 10)} 00:00:00`,
				endTime: `${new Date(Date.now() + 259200000).toJSON()
					.substring(0, 10)} 00:00:00`
			})
				.then(({ data }) => {
					console.log(data)
					this.seckillList = data
					this.seckillList && this.seckillList.length && (this.currentSeckill = this.seckillList[0].id) && this.handleClickSeckill({ id: this.currentSeckill })
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		handleClickSeckill(e) {
			this.currentSeckill = e.id
			uni.showLoading()
			getSeckillListGoodsApi({ brandId: this.brandDetail.id, secKillId: e.id })
				.then(({ data }) => {
					this.currentGoods = data || []
					uni.hideLoading()
				})
		},
		handleSeckill(e) {
			if (!getUserId()) return
			uni.showLoading({
				title: '秒杀中...'
			})
			buildSeckillActionApi({
				userId: getUserId(),
				secKillGoodId: this.currentSeckillGoodId,
				originGoodId: e.goodsId,
				brandId: e.brandId,
				productId: e.productId,
				amount: e.number
			})
				.then(({ data }) => {
					this.currentSeckillGoodId = ''
					this.checkSeckillResult(data)
				})
		},
		checkSeckillResult(taskId) {
			uni.showLoading({
				title: '秒杀中...'
			})
			this.seckillTimer && clearTimeout(this.seckillTimer)
			this.seckillTimer = setTimeout(() => {
				getSeckillChkOrderStatusApi({ taskId })
					.then(({ data }) => {
						if (data && data.orderResp && data.orderResp.data && data.orderResp.data.orderId && data.orderResp.data.orderSn) {
							this.$showToast('秒杀成功')
							this.seckillTimer && clearTimeout(this.seckillTimer)
							uni.hideLoading()
						} else {
							this.checkSeckillResult(taskId)
						}
					})
					.catch(() => {
						this.seckillTimer && clearTimeout(this.seckillTimer)
						uni.hideLoading()
					})
			}, 1500)
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
