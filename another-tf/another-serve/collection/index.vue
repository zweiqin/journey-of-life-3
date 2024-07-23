<template>
	<view class="collection-container">
		<JHeader title="我的收藏" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view class="tabsbox">
			<tui-tabs
				style="width: 750rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="60" :padding="0"
				item-width="375rpx" selected-color="#333333" bold slider-bg-color="#cccccc"
				:tabs="[{ name: '商品' }, { name: '店铺' }]" :current-tab="collectionTypeFlag"
				@change="collectionTypeActive"
			></tui-tabs>
		</view>
		<view v-if="collectionTypeFlag == 0">
			<view v-if="productInfo.data.length > 0">
				<view class="wid function-box">
					<view v-if="allCheckShow" class="finishbox" @click="allCheckShow = false">完成</view>
					<view v-else class="flex-row-plus editicon-box flex-items fs28" @click="editClick">
						<tui-icon name="edit" :size="40" unit="rpx" color="#333333"></tui-icon>
						<text class="mar-left-10">编辑</text>
					</view>
				</view>
				<view class="swipe-box">
					<view v-for="(item, index) in productInfo.data" :key="item.collectId" class="actionBox">
						<tui-swipe-action
							:key="item.collectId" :params="{ index }" :open="item.show" :forbid="allCheckShow"
							:actions="options" :closable="false" @click="productActionClick"
						>
							<template #content>
								<view class="flex-item">
									<view class="item wid flex-row-plus flex-display">
										<view v-show="allCheckShow" class="flex-items selctBtn">
											<tui-icon
												v-if="item.selected == 1" name="circle-fill" :size="40" unit="rpx"
												color="#c5aa7b"
												margin="0 30rpx 0 0" @click="productItemSel(index, 0)"
											></tui-icon>
											<tui-icon
												v-else name="circle" :size="40" unit="rpx"
												color="#cccccc" margin="0 30rpx 0 0"
												@click="productItemSel(index, 1)"
											></tui-icon>
										</view>
										<view
											class="infoCent flex-items"
											@click.stop="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
										>
											<image class="product-img default-img" mode="aspectFill" :src="common.seamingImgUrl(item.image)" />
											<view class="title-wrap mar-left-20 priceBox">
												<text
													class="title fs28 font-color-333"
													style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
												>
													{{ item.productName }}
												</text>
												<view class="flex-items">
													<ATFActivityImage :type="item.activityType"></ATFActivityImage>
													<text class="fs40 font-color-C83732">¥</text>
													<text class="fs40 font-color-C83732 mar-right-20">{{ item.price }}</text>
													<text class="font-color-CCC discountsPriceLine fs24">
														¥{{ item.originalPrice }}
													</text>
												</view>
											</view>
										</view>
									</view>
								</view>
							</template>
						</tui-swipe-action>
					</view>

				</view>
				<view v-if="allCheckShow" class="pad-bot-140"></view>
				<view v-show="allCheckShow" class="allcheck-box flex-row-plus flex-sp-between flex-items">
					<view class="left">
						<tui-icon
							v-if="isAllProCheck" name="circle-fill" :size="40" unit="rpx"
							color="#c5aa7b" margin="0 30rpx 0 0"
							@click="allProductSel(0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="rpx"
							color="#cccccc" margin="0 30rpx 0 0"
							@click="allProductSel(1)"
						></tui-icon>
						<text>全选</text>
					</view>
					<view class="right">
						<view class="btn-delete" @click="showCardModalProductDel">删除</view>
					</view>
				</view>
				<view v-if="allCheckShow" class="pad-bot-140"></view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!productInfo.isEmpty && !productInfo.data.length
						? 'loading' : !productInfo.isEmpty && productInfo.data.length && (productInfo.data.length >= productInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="productInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无收藏</tui-no-data>
			</view>
		</view>
		<view v-if="collectionTypeFlag == 1">
			<view v-if="storeInfo.data.length > 0">
				<view v-if="allCheckShow" class="finishbox" @click="allCheckShow = false">完成</view>
				<view v-else class="flex-row-plus editicon-box flex-items fs28" @click="editClick">
					<tui-icon name="edit" :size="40" unit="rpx" color="#333333"></tui-icon>
					<text class="mar-left-10">编辑</text>
				</view>
				<view class="swipe-box swipeBox">
					<view v-for="(item, index) in storeInfo.data" :key="item.collectId" class="shopBox" :index="index">
						<tui-swipe-action
							:key="item.collectId" :params="{ index }" :open="item.show" :forbid="allCheckShow"
							:actions="options" :closable="false" @click="storeActionClick"
						>
							<template #content>
								<view class="item wid flex-row-plus flex-display">
									<view v-show="allCheckShow" class="selctBtn flex-items">
										<tui-icon
											v-if="item.selected == 1" name="circle-fill" :size="40" unit="rpx"
											color="#c5aa7b"
											margin="0 30rpx 0 0" @click="storeItemSel(index, 0)"
										></tui-icon>
										<tui-icon
											v-else name="circle" :size="40" unit="rpx"
											color="#cccccc" margin="0 30rpx 0 0"
											@click="storeItemSel(index, 1)"
										></tui-icon>
									</view>
									<view class="infoCent">
										<view class="flex-row-plus flex-sp-between flex-items-plus wid">
											<view class="flex-items-plus flex-row pad-topbot-10">
												<image class="head-img" mode="aspectFill" :src="common.seamingImgUrl(item.shopLogo)" />
												<view class="title-wrap mar-left-20">
													<text
														class="title shopName"
														style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
													>
														{{
															item.shopName }}
													</text>
													<text class="font-color-CCC fs24">{{ item.person }}人关注</text>
												</view>
											</view>
											<view
												class="toStore flex-items-plus fs24"
												@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${item.shopId}`)"
											>
												进入店铺 >
											</view>
										</view>
										<view v-if="item.productList.length > 0" class="shopImgBox">
											<view
												v-for="(sItem, sIndex) in item.productList" :key="sIndex" class="itemImgBox"
												@click.stop="go(`/another-tf/another-serve/goodsDetails/index?shopId=${sItem.shopId}&productId=${sItem.productId}&skuId=${sItem.skuId}`)"
											>
												<image :src="common.seamingImgUrl(sItem.image)" class="pic-img default-img"></image>
											</view>
										</view>
									</view>
								</view>
							</template>
						</tui-swipe-action>
					</view>
				</view>
				<view v-show="allCheckShow" class="allcheck-box flex-row-plus flex-sp-between flex-items">
					<view class="left">
						<tui-icon
							v-if="isAllStoreCheck" name="circle-fill" :size="40" unit="rpx"
							color="#c5aa7b" margin="30rpx"
							@click="allStoreSel(0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="rpx"
							color="#cccccc" margin="30rpx"
							@click="allStoreSel(1)"
						></tui-icon>
						<text>全选</text>
					</view>
					<view class="right">
						<view class="btn-delete" @click="showCardModalshopDel">删除</view>
					</view>
				</view>
				<view v-if="allCheckShow" class="pad-bot-140"></view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!storeInfo.isEmpty && !storeInfo.data.length
						? 'loading' : !storeInfo.isEmpty && storeInfo.data.length && (storeInfo.data.length >= storeInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="storeInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无收藏</tui-no-data>
			</view>
		</view>

		<!-- 删除确认弹窗 -->
		<tui-modal :show="delshow" :custom="true" :fadein="true">
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					温馨提示
				</view>
				<view v-if="collectionTypeFlag === 0" class="mar-top-40 text-align">
					是否删除该商品？
				</view>
				<view v-if="collectionTypeFlag === 1" class="mar-top-40 text-align">
					是否删除该店铺？
				</view>
				<view class="flex-display flex-sp-between">
					<view v-if="collectionTypeFlag === 0" class="btn submit" @click="handleProductDel">确定</view>
					<view v-if="collectionTypeFlag === 1" class="btn submit" @click="handleShopDel">确定</view>
				</view>
			</view>
			<view v-if="delshow" class="cancelDel" @click="delshow = false">
				<tui-icon name="close" :size="60" unit="rpx" color="#f0f0f0"></tui-icon>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { deleteCollectToCollectApi, getAllProductCollectApi, getAllShopStoreCollectApi, updateCollectCancelApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Collection',
	data() {
		return {
			collectionTypeFlag: 0,
			options: [ {
				name: '删除',
				color: '#fff',
				fontsize: 32,
				width: 80,
				background: '#F15C48'
			} ],
			isAllProCheck: false,
			isAllStoreCheck: false,
			allCheckShow: false,
			delshow: false,
			deleteType: '',
			ids: null,

			productInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			storeInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0, // 列表数据总数
				isEmpty: false // 列表是否为空
			}
		}
	},
	onShow() {
		if (this.collectionTypeFlag === 0) {
			this.productInfo.query.page = 1
			this.getProductCollectList()
		} else if (this.collectionTypeFlag === 1) {
			this.storeInfo.query.page = 1
			this.getStoreCollectList()
		}
	},
	methods: {
		collectionTypeActive(e) {
			this.collectionTypeFlag = e.index
			// 缓存每个tab里的数据
			if (this.collectionTypeFlag === 0) {
			} else if (this.collectionTypeFlag === 1) {
				if (!this.storeInfo.isEmpty && !this.storeInfo.data.length) this.getStoreCollectList()
			}
			// 每点一个tab就重新进行对它的请求
			// if (this.collectionTypeFlag === 0) {
			// 	this.productInfo.query.page = 1
			// 	this.productInfo.data = []
			// 	this.productInfo.listTotal = 0
			// 	this.productInfo.isEmpty = false
			// 	this.getProductCollectList()
			// } else if (this.collectionTypeFlag === 1) {
			// 	this.storeInfo.query.page = 1
			// 	this.storeInfo.data = []
			// 	this.storeInfo.listTotal = 0
			// 	this.storeInfo.isEmpty = false
			// 	this.getStoreCollectList()
			// }
		},
		// 收藏商品查询
		getProductCollectList(isLoadmore) {
			uni.showLoading()
			getAllProductCollectApi({ ...this.productInfo.query })
				.then((res) => {
					this.productInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.productInfo.data.push(...res.data.list.map((i) => ({ ...i, show: false, selected: 0 })))
					} else {
						this.productInfo.data = res.data.list.map((i) => ({ ...i, show: false, selected: 0 }))
					}
					this.productInfo.isEmpty = this.productInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 收藏店铺查询
		getStoreCollectList(isLoadmore) {
			uni.showLoading()
			getAllShopStoreCollectApi({ ...this.storeInfo.query })
				.then((res) => {
					this.storeInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.storeInfo.data.push(...res.data.list.map((i) => ({ ...i, show: false, selected: 0 })))
					} else {
						this.storeInfo.data = res.data.list.map((i) => ({ ...i, show: false, selected: 0 }))
					}
					this.storeInfo.isEmpty = this.storeInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		editClick() {
			this.allCheckShow = true
			this.productInfo.data = this.productInfo.data.map((item) => ({ ...item, show: false }))
			this.storeInfo.data = this.storeInfo.data.map((item) => ({ ...item, show: false }))
		},

		// 打开删除层
		productActionClick(e) {
			this.deleteType = 'one'
			this.delshow = true
			if (e.index == 0) {
				this.ids = this.productInfo.data[e.item.index].collectId
			}
		},
		storeActionClick(e) {
			this.deleteType = 'one'
			this.delshow = true
			if (e.index == 0) {
				this.ids = this.storeInfo.data[e.item.index].collectId
			}
		},
		handleProductDel() {
			if (this.deleteType === 'one') {
				uni.showLoading()
				updateCollectCancelApi({ ids: [ this.ids ] })
					.then((res) => {
						this.delshow = false
						this.ids = null
						uni.hideLoading()
						this.$showToast('删除成功')
						setTimeout(() => {
							this.productInfo.query.page = 1
							this.getProductCollectList()
						}, 2000)
					})
					.catch((e) => {
						uni.hideLoading()
					})
			} else {
				const tempArr = []
				this.productInfo.data.forEach((value, index) => {
					if (value.selected == 1) tempArr.push(value.collectId)
				})
				deleteCollectToCollectApi({ ids: tempArr }).then((res) => {
					this.delshow = false
					uni.hideLoading()
					this.$showToast('删除成功')
					setTimeout(() => {
						this.productInfo.query.page = 1
						this.getProductCollectList()
					}, 2000)
				})
					.catch((res) => {
						this.delshow = false
						uni.hideLoading()
					})
			}
		},
		handleShopDel() {
			if (this.deleteType === 'one') {
				uni.showLoading()
				updateCollectCancelApi({ ids: [ this.ids ] })
					.then((res) => {
						this.delshow = false
						this.ids = null
						uni.hideLoading()
						this.$showToast('删除成功')
						setTimeout(() => {
							this.storeInfo.query.page = 1
							this.getStoreCollectList()
						}, 2000)
					})
					.catch((e) => {
						uni.hideLoading()
					})
			} else {
				uni.showLoading()
				const tempArr = []
				this.storeInfo.data.forEach((value, index) => {
					if (value.selected == 1) tempArr.push(value.collectId)
				})
				deleteCollectToCollectApi({ ids: tempArr }).then((res) => {
					this.delshow = false
					uni.hideLoading()
					this.$showToast('删除成功')
					setTimeout(() => {
						this.storeInfo.query.page = 1
						this.getStoreCollectList()
					}, 2000)
				})
					.catch((res) => {
						this.delshow = false
						uni.hideLoading()
					})
			}
		},

		// 批量删除
		showCardModalProductDel() {
			let isShowProoductDelSubmit = false
			// 商品
			this.productInfo.data.forEach((value, index) => {
				if (value.selected == 1) {
					isShowProoductDelSubmit = true
				}
			})
			if (isShowProoductDelSubmit === true) {
				this.deleteType = 'quantity'
				this.delshow = true
			} else {
				this.$showToast('请先选择要删除的收藏宝贝！')
			}
		},
		showCardModalshopDel() {
			let isShowShopDelSubmit = false
			// 店铺
			this.storeInfo.data.forEach((value, index) => {
				if (value.selected == 1) {
					isShowShopDelSubmit = true
				}
			})
			if (isShowShopDelSubmit === true) {
				this.delshow = true
			} else {
				this.$showToast('请先选择要删除的收藏店铺！')
			}
		},

		// 商品选中
		productItemSel(index, state) {
			this.productInfo.data[index].selected = state
			let proSelectNum = 0
			this.productInfo.data.forEach((value, index) => {
				if (this.productInfo.data[index].selected == 0) {
					this.isAllProCheck = false
				} else {
					proSelectNum++
				}
			})
			if (this.productInfo.data.length == proSelectNum) {
				this.isAllProCheck = true
			}
		},
		// 店铺选中
		storeItemSel(index, state) {
			this.storeInfo.data[index].selected = state
			let storeSelectNum = 0
			this.storeInfo.data.forEach((value, index) => {
				if (this.storeInfo.data[index].selected == 0) {
					this.isAllStoreCheck = false
				} else {
					storeSelectNum++
				}
			})
			if (this.storeInfo.data.length == storeSelectNum) {
				this.isAllStoreCheck = true
			}
		},
		// 全选
		allProductSel(type) {
			this.isAllProCheck = !this.isAllProCheck
			this.productInfo.data.forEach((value, index) => {
				this.productInfo.data[index].selected = type
			})
		},
		allStoreSel(type) {
			this.isAllStoreCheck = !this.isAllStoreCheck
			this.storeInfo.data.forEach((value, index) => {
				this.storeInfo.data[index].selected = type
			})
		}
	},
	onReachBottom() {
		if (this.collectionTypeFlag === 0) {
			if (this.productInfo.data.length < this.productInfo.listTotal) {
				++this.productInfo.query.page
				this.getProductCollectList(true)
			}
		} else if (this.collectionTypeFlag === 1) {
			if (this.storeInfo.data.length < this.storeInfo.listTotal) {
				++this.storeInfo.query.page
				this.getStoreCollectList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.collection-container {
	min-height: 100vh;
	background-color: #F7F7F7;
	box-sizing: border-box;

	.function-box {
		background-color: #F7F7F7;
	}

	.tabsbox {
		margin-top: 4rpx;
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
		padding: 0 20rpx;

		.actionBox {
			margin-bottom: 20rpx;
		}

		.item {
			display: flex;

			.infoCent {
				padding: 20rpx;
			}

			.selctBtn {
				background: #F7F7F7;
			}
		}

		.shopImgBox {
			display: flex;
			justify-content: end;
			margin-left: 90rpx;
			padding-bottom: 20rpx;
			margin-top: 20rpx;

			.itemImgBox {
				margin-right: 15rpx;
				margin-left: 5rpx;

				image {
					width: 120rpx;
					height: 120rpx;
					border: 2rpx solid #F3F4F5;
				}
			}
		}

		.product-img {
			width: 220rpx;
			flex: 0 0 220rpx;
			height: 220rpx;
		}

		.head-img {
			width: 80rpx;
			flex: 0 0 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}

		.title {
			text-align: left;
			font-size: 28rpx;
			color: #606266;
			height: 165rpx;
			padding-right: 20rpx;
		}

		.shopName {
			height: auto;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			width: 340rpx;
		}

		.toStore {
			width: 100px;
			color: #FFEBC4;
			padding: 0rpx 20rpx;
			height: 52rpx;
			background: #333333;
			margin-right: 15rpx;
		}

		.shopBox {
			margin-bottom: 20rpx;
		}
	}

	.allcheck-box {
		background-color: #FFFFFF;
		width: 100%;
		position: fixed;
		bottom: 0rpx;

		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 28rpx;
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
			height: 104rpx;
			line-height: 104rpx;
			text-align: center;
			font-size: 28rpx;
			color: #FFFFFF;
			background: #C83732;
		}
	}

	.Put-box1 {
		.btn {
			text-align: center;
			margin-top: 40rpx;
			border: 1px solid #333333;
			height: 80rpx;
			line-height: 80rpx;
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

