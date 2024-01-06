<template>
	<view class="footprint-box-container">
		<JHeader title="浏览足迹" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view v-if="footprintList && footprintList.length">
			<view class="wid function-box">
				<view v-if="allCheckShow" class="finishbox" @click="allCheckShow = false">完成</view>
				<view v-else class="flex-row-plus editicon-box flex-items fs28" @click="editClick">
					<tui-icon name="edit" :size="40" unit="upx" color="#333333"></tui-icon>
					<label class="mar-left-10">编辑</label>
				</view>
			</view>
			<view v-for="(ditem, findex) in footprintList.filter((item) => item.isReady !== 1)" :key="findex" class="swipe-box">
				<view class="daytime-fillet">
					<label class="mar-left-30">{{ ditem.createTime }}</label>
				</view>

				<tui-swipe-action
					v-for="(item, index) in ditem.products" :key="item.footprintId" :params="{ findex, index }"
					:open="item.show" :forbid="allCheckShow" :actions="options" :closable="false"
					class="listItem"
					@click="delFootProduction"
				>
					<template #content>
						<view class="itemBox">
							<view class="item wid flex-display">
								<view v-if="allCheckShow" class="selectIconBox">
									<tui-icon
										v-if="item.selected == 1" name="circle-fill" :size="40" unit="upx"
										color="#c5aa7b"
										margin="0 30upx 0 0" @click="footItemSel(index, findex, 0)"
									></tui-icon>
									<tui-icon
										v-else name="circle" :size="40" unit="upx"
										color="#cccccc" margin="0 30upx 0 0"
										@click="footItemSel(index, findex, 1)"
									></tui-icon>
								</view>
								<view
									class="flex-items"
									@click.stop="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
								>
									<image class="product-img default-img" mode="aspectFill" :src="common.seamingImgUrl(item.image)" />
									<view class="title-wrap mar-left-20">
										<text
											class="title fs28"
											style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
										>
											{{
												item.productName }}
										</text>
										<view class="flex-items">
											<ATFActivityImage :type="item.activityType"></ATFActivityImage>
											<label class="fs40 mar-right-20 font-color-C83732">¥{{ item.price }}</label>
											<label class="font-color-CCC discountsPriceLine fs24">¥{{ item.originalPrice }}</label>
										</view>
									</view>
								</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>

			</view>
			<view v-show="allCheckShow" class="allcheck-box flex-row-plus flex-sp-between flex-items">
				<view class="left">
					<tui-icon
						v-if="isAllCheck" name="circle-fill" :size="40" unit="upx"
						color="#c5aa7b" margin="0 30upx 0 0"
						@click="allSel(0)"
					></tui-icon>
					<tui-icon
						v-else name="circle" :size="40" unit="upx"
						color="#cccccc" margin="0 30upx 0 0"
						@click="allSel(1)"
					></tui-icon>
					<text>全选</text>
				</view>
				<view class="right">
					<view class="btn-delete" @click="showCardModal">删除</view>
				</view>
			</view>
			<view v-if="allCheckShow" class="pad-bot-140"></view>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !footprintList.length
					? 'loading' : !isEmpty && footprintList.length && (footprintList.length >= footprintTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
		</view>

		<!-- 删除确认弹窗 -->
		<tui-modal :show="cardModal" :custom="true" :fadein="true">
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					温馨提示
				</view>
				<view class="mar-top-40 text-align">
					是否删除该浏览足迹？
				</view>
				<view class="btn submit" @click="footprintDel">确定</view>
			</view>
			<view v-if="cardModal" class="cancelDel" @click="cardModal = false">
				<tui-icon name="close" :size="60" unit="upx" color="#f0f0f0"></tui-icon>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { deleteFootprintApi, getAllFootprintApi } from '../../../api/anotherTFInterface'
export default {
	name: 'FootprintList',
	data() {
		return {
			footprintList: [],
			isEmpty: false,
			footprintTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			options: [ {
				name: '删除',
				color: '#fff',
				fontsize: 32,
				width: 80,
				background: '#F15C48'
			} ],
			allCheckShow: false,
			isAllCheck: false,
			newTimeArr: [],
			cardModal: false, // 删除弹窗显示
			ids: []
		}
	},
	onShow() {
		this.queryInfo.page = 1
		this.getFootprintList()
	},
	methods: {
		getFootprintList(isLoadmore) {
			uni.showLoading()
			getAllFootprintApi(this.queryInfo).then((res) => {
				this.footprintTotal = res.data.total
				if (isLoadmore) {
					this.footprintList.push(...res.data.list)
				} else {
					this.footprintList = res.data.list
				}
				this.isEmpty = this.footprintList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 滑动删除单个商品足迹
		delFootProduction(e) {
			if (e.index == 0) {
				uni.showLoading()
				deleteFootprintApi({
					ids: [ this.footprintList[e.item.findex].products[e.item.index].productId ],
					times: [ this.footprintList[e.item.findex].createTime ]
				}).then((res) => {
					uni.hideLoading()
					this.$showToast('删除成功')
					setTimeout(() => {
						this.queryInfo.page = 1
						this.getFootprintList()
					}, 2000)
				})
					.catch((e) => {
						uni.hideLoading()
					})
			}
		},
		// 删除方法
		footprintDel() {
			uni.showLoading()
			this.isAllCheck = false
			deleteFootprintApi({
				ids: this.ids,
				times: this.newTimeArr
			}).then((res) => {
				this.cardModal = false
				this.ids = []
				this.newTimeArr = []
				uni.hideLoading()
				this.$showToast('删除成功')
				setTimeout(() => {
					this.queryInfo.page = 1
					this.getFootprintList()
				}, 2000)
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		footItemSel(index, findex, state) {
			this.footprintList[findex].products[index].selected = state
			let footSelectNum = 0
			let footprintListlen = 0
			const footDataTime = []
			this.footprintList.forEach((value, index1) => {
				value.products.forEach((value2, index2) => {
					if (value2.selected == 0) {
						this.isAllCheck = false
					} else {
						footSelectNum++
						footDataTime[index1] = this.footprintList[index1].createTime
					}
				})
			})
			this.newTimeArr = footDataTime.filter((d) => d)
			this.footprintList.forEach((value, index1) => {
				value.products.forEach((value2, index3) => {
					footprintListlen++
				})
			})
			if (footprintListlen == footSelectNum) {
				this.isAllCheck = true
			}
		},
		// 点击编辑底下删除按钮
		showCardModal() {
			this.footprintList.forEach((value, index) => {
				value.products.forEach((value1, index1) => {
					if (value1.selected == 1) {
						this.ids.push(value1.productId)
					}
					if (!this.ids.length) {
						this.$showToast('请选择要删除的足迹商品！')
					} else {
						this.cardModal = true
					}
				})
			})
		},
		// 全选
		allSel(type) {
			this.isAllCheck = !this.isAllCheck
			this.footprintList.forEach((value, index1) => {
				value.products.forEach((value2, index2) => {
					value2.selected = type
					if (type == 1) {
						this.newTimeArr[index1] = this.footprintList[index1].createTime
					}
				})
			})
		},
		editClick() {
			this.allCheckShow = true
			this.footprintList.forEach((item) => {
				item.products = item.products.map((item) => ({ ...item, selected: 0 }))
			})
		}
	},
	onReachBottom() {
		if (this.footprintList.length < this.footprintTotal) {
			++this.queryInfo.page
			this.getFootprintList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.footprint-box-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #f7f7f7;

	.function-box {
		background-color: #FFFFFF;
	}

	.editicon-box {
		display: flex;
		justify-content: flex-end;
		position: relative;
		left: -30rpx;
		padding: 16rpx 0;
	}

	.finishbox {
		display: flex;
		justify-content: flex-end;
		position: relative;
		left: -30rpx;
		padding: 16rpx 0;
	}

	.swipe-box {
		padding: 0 24rpx;

		.listItem {
			//padding: 0 24rpx;
			background: #F8F8F8;
			margin-bottom: 20rpx;
		}

		.item {
			display: flex;
			padding: 20rpx;
			background: #FFFFFF;

			.selectIconBox {
				margin-right: 14upx;
				display: flex;
				align-items: center;
			}
		}

		.product-img {
			width: 200rpx;
			flex: 0 0 200rpx;
			height: 200rpx;
		}

		.title {
			text-align: left;
			color: #333333;
			height: 150rpx;
		}
	}

	.allcheck-box {
		background-color: #FFFFFF;
		padding: 10rpx 0;
		width: 100%;
		position: fixed;
		bottom: 0upx;

		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 28upx;
			color: #666;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
		}

		.btn-delete {
			width: 232rpx;
			height: 100rpx;
			background: #C83732;
			line-height: 100rpx;
			text-align: center;
			font-size: 28upx;
			color: #FFFFFF;
		}
	}

	.Put-box1 {
		.btn {
			text-align: center;
			margin-top: 40rpx;
			border: 1px solid #333333;
			height: 80upx;
			line-height: 80upx;
			width: 100%;
			color: #333333;
		}

		.submit {
			background-color: #333333;
			color: #FFEBC4;
		}
	}

	.cancelDel {
		position: absolute;
		bottom: -50px;
		left: 45%;
	}
}
</style>
