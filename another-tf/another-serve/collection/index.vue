<template>
	<view class="collection-container">
		<JHeader title="我的收藏" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="tabsbox">
			<u-tabs
				:list="collectionTypeList" bar-width="60" :bold="false" active-color="#333333"
				inactive-color="#CCCCCC"
				:is-scroll="false" :current="collectionTypeFlag" @change="collectionTypeActive"
			></u-tabs>
		</view>
		<view v-if="collectionTypeFlag == 0">
			<view v-if="productCollect.length > 0">
				<view class="wid function-box">
					<view v-if="allCheckShow" class="finishbox" @click="finishClick">完成</view>
					<view v-else class="flex-row-plus editicon-box flex-items fs28" @click="editClick">
						<tui-icon name="edit" :size="40" unit="upx" color="#333333"></tui-icon>
						<text class="mar-left-10">编辑</text>
					</view>
				</view>
				<view class="swipe-box">
					<view v-for="(item, index) in productCollect" :key="item.collectId" class="actionBox" :index="index">
						<u-swipe-action
							ref="actionSwipe" :disabled="allCheckShow" :show="item.show" :auto-close="false"
							:options="options" @open="productOpen(index)" @click="productActionClick"
						>
							<view class="flex-item">
								<view class="item wid flex-row-plus flex-display">
									<view v-show="allCheckShow" class="flex-items selctBtn">
										<tui-icon
											v-if="item.selected == 1" name="circle-fill" :size="40" unit="upx"
											color="#c5aa7b"
											margin="0 30upx 0 0" @click="productItemSel(index, 0)"
										></tui-icon>
										<tui-icon
											v-else name="circle" :size="40" unit="upx"
											color="#cccccc" margin="0 30upx 0 0"
											@click="productItemSel(index, 1)"
										></tui-icon>
									</view>
									<view class="infoCent flex-items" @click.stop="toGoodsDetails(item.productId, item.shopId, item.skuId)">
										<image class="product-img default-img" mode="aspectFill" :src="item.image" />
										<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
										<view class="title-wrap mar-left-20 priceBox">
											<text class="title fs28 font-color-333" style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">
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
						</u-swipe-action>
					</view>
				</view>
				<view v-if="allCheckShow" class="pad-bot-140"></view>
				<view v-show="allCheckShow" class="allcheck-box flex-row-plus flex-sp-between flex-items">
					<view class="left">
						<tui-icon
							v-if="isAllProCheck" name="circle-fill" :size="40" unit="upx"
							color="#c5aa7b" margin="0 30upx 0 0"
							@click="allProductSel(0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="upx"
							color="#cccccc" margin="0 30upx 0 0"
							@click="allProductSel(1)"
						></tui-icon>
						<text>全选</text>
					</view>
					<view class="right">
						<view class="btn-delete" @click="showCardModalPaoductDel">删除</view>
					</view>
				</view>
				<view v-if="allCheckShow" class="pad-bot-140"></view>
			</view>
			<view v-if="productCollect.length == 0 && proCollectShow" class="mar-top-60 empty-box">
				<view class="tohome-box flex-items-plus">暂无收藏</view>
			</view>
		</view>
		<view v-if="collectionTypeFlag == 1">
			<view v-if="storeCollect.length > 0">
				<view v-if="allCheckShow" class="finishbox" @click="finishClick">完成</view>
				<view v-else class="flex-row-plus editicon-box flex-items fs28" @click="editClick">
					<tui-icon name="edit" :size="40" unit="upx" color="#333333"></tui-icon>
					<text class="mar-left-10">编辑</text>
				</view>
				<view class="swipe-box swipeBox">
					<view v-for="(item, index) in storeCollect" :key="item.collectId" class="shopBox" :index="index">
						<u-swipe-action
							ref="shopActionSwipe" :disabled="allCheckShow" :show="item.show" :options="options"
							@click="storeActionClick(index)" @open="storeOpen(index)"
						>
							<view class="item wid flex-row-plus flex-display">
								<view v-show="allCheckShow" class="selctBtn flex-items">
									<tui-icon
										v-if="item.selected == 1" name="circle-fill" :size="40" unit="upx"
										color="#c5aa7b"
										margin="0 30upx 0 0" @click="storeItemSel(index, 0)"
									></tui-icon>
									<tui-icon
										v-else name="circle" :size="40" unit="upx"
										color="#cccccc" margin="0 30upx 0 0"
										@click="storeItemSel(index, 1)"
									></tui-icon>
								</view>
								<view class="infoCent">
									<view class="flex-row-plus flex-sp-between flex-items-plus wid">
										<view class="flex-items-plus flex-row pad-topbot-10">
											<image class="head-img" mode="aspectFill" :src="item.shopLogo" />
											<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
											<view class="title-wrap mar-left-20">
												<text class="title shopName" style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">{{ item.shopName }}</text>
												<text class="font-color-CCC fs24">{{ item.person }}人关注</text>
											</view>
										</view>
										<view class="toStore flex-items-plus fs24" @click="toStoreClick(item.shopId)">
											进入店铺 >
										</view>
									</view>
									<view v-if="item.productList.length > 0" class="shopImgBox">
										<view
											v-for="(sItem, sIndex) in item.productList" :key="sIndex" class="itemImgBox"
											@click.stop="goodsDateils(sItem.shopId, sItem.productId, sItem.skuId)"
										>
											<image :src="sItem.image" class="pic-img default-img"></image>
										</view>
									</view>
								</view>
							</view>
						</u-swipe-action>
					</view>
				</view>
				<view v-show="allCheckShow" class="allcheck-box flex-row-plus flex-sp-between flex-items">
					<view class="left">
						<tui-icon
							v-if="isAllStoreCheck" name="circle-fill" :size="40" unit="upx"
							color="#c5aa7b" margin="30upx"
							@click="allStoreSel(0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="upx"
							color="#cccccc" margin="30upx"
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
			<view v-if="storeCollect.length == 0 && storeCollectShow" class="mar-top-60 empty-box">
				<view class="tohome-box flex-items-plus">暂无收藏</view>
			</view>
		</view>

		<!-- 删除确认弹窗 -->
		<tui-modal :show="cardModal" :custom="true" :fadein="true">
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					温馨提示
				</view>
				<view v-if="paoductDelSubmit" class="mar-top-40 text-align">
					是否删除该商品？
				</view>
				<view v-if="shopDelSubmit" class="mar-top-40 text-align">
					是否删除该店铺？
				</view>
				<view class="flex-display flex-sp-between">
					<view v-if="paoductDelSubmit" class="btn submit" @click="paoductDel">确定</view>
					<view v-if="shopDelSubmit" class="btn submit" @click="shopDel">确定</view>
				</view>
			</view>
			<view v-if="cardModal" class="cancelDel" @click="cardModal = false">
				<tui-icon name="close" :size="60" unit="upx" color="#f0f0f0"></tui-icon>
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
			collectionTypeList: [{
				name: '商品'
			}, {
				name: '店铺'
			}],
			collectionTypeFlag: 0,
			disabled: false,
			btnWidth: 180,
			show: false,
			options: [ {
				text: ' ',
				style: {
					backgroundColor: '#F15C48'
				}
			} ],
			isAllProCheck: false,
			isAllStoreCheck: false,
			allCheckShow: false,
			productCollect: [],
			storeCollect: [],
			productPage: 1,
			productPageSize: 10,
			proloadingType: 0,
			storePage: 1,
			storePageSize: 10,
			storeloadingType: 0,
			storeCollectShow: false,
			proCollectShow: false,
			cardModal: false,
			paoductDelSubmit: false,
			shopDelSubmit: false,
			ids: null,
			currentIndex: null,
			currentType: null
		}
	},
	onLoad() {
		this.getProductCollect()
	},
	onReachBottom() {
		if (this.collectionTypeFlag == 0) {
			if (this.proloadingType == 1) {
				uni.stopPullDownRefresh()
			} else {
				this.productPage = this.productPage + 1
				this.getProductCollect()
			}
		} else if (this.collectionTypeFlag == 1) {
			if (this.storeloadingType == 1) {
				uni.stopPullDownRefresh()
			} else {
				this.storePage = this.storePage + 1
				this.getStoreCollect()
			}
		}
	},
	methods: {
		// 批量删除
		showCardModalPaoductDel() {
			let isShowProoductDelSubmit = false
			// 商品
			this.productCollect.forEach((value, index) => {
				if (value.selected == 1) {
					isShowProoductDelSubmit = true
				}
			})
			if (isShowProoductDelSubmit === true) {
				this.cardModal = true
				this.paoductDelSubmit = true
				this.shopDelSubmit = false
			} else {
				this.$showToast('请先选择要删除的收藏宝贝！')
			}
		},
		paoductDel() {
			if (this.currentType === 1) {
				this.cancelCollect(this.ids)
				this.productCollect.splice(this.currentIndex, 1)
			} else {
				const ids = []
				this.productCollect.forEach((value, index) => {
					if (value.selected == 1) {
						ids.push(value.collectId)
					}
				})
				deleteCollectToCollectApi({
					ids
				}).then((res) => {
					this.productCollect = []
					this.cardModal = false
					this.$showToast('删除成功')
					this.productPage = 1
					this.getProductCollect()
				})
					.catch((res) => {
						this.cardModal = false
						this.$showToast('删除失败')
					})
			}
		},
		showCardModalshopDel() {
			let isShowShopDelSubmit = false
			// 店铺
			this.storeCollect.forEach((value, index) => {
				if (value.selected == 1) {
					isShowShopDelSubmit = true
				}
			})
			if (isShowShopDelSubmit === true) {
				this.cardModal = true
				this.shopDelSubmit = true
				this.paoductDelSubmit = false
			} else {
				this.$showToast('请先选择要删除的收藏店铺！')
			}
		},
		shopDel() {
			if (this.currentType === 2) {
				this.cancelCollect(this.ids)
				this.storeCollect.splice(this.currentIndex, 1)
			} else {
				const ids = []
				this.storeCollect.forEach((value, index) => {
					if (value.selected == 1) {
						ids.push(value.collectId)
					}
				})
				deleteCollectToCollectApi({
					ids
				}).then((res) => {
					this.storeCollect = []
					this.cardModal = false
					this.$showToast('删除成功')
					this.storePage = 1
					this.getStoreCollect()
				})
					.catch((res) => {
						this.cardModal = false
						this.$showToast('删除失败')
					})
			}
		},
		// 去店铺
		toStoreClick(storeId) {
			uni.navigateTo({
				url: '../../pages_category_page1/store/index?storeId=' + storeId
			})
		},
		// 去商品详情
		toGoodsDetails(productId, shopId, skuId) {
			uni.navigateTo({
				url: '../../pages_category_page1/goodsModule/goodsDetails?productId=' + productId +
					'&shopId=' + shopId + '&skuId=' + skuId
			})
		},
		collectionTypeActive(index) {
			this.collectionTypeFlag = index
			if (index == 0) {
				this.productPage = 1
				this.productCollect = []
				this.proloadingType = 0
				this.getProductCollect()
			} else if (index == 1) {
				this.storePage = 1
				this.storeCollect = []
				this.storeloadingType = 0
				this.getStoreCollect()
			}
		},
		storeClick(index, index1) {
			if (index1 == 0) {
				this.cardModal = true
				this.shopDelSubmit = true
				this.ids = this.storeCollect[index].collectId
				this.currentIndex = index
				this.currentType = 2
			}
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		productOpen(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.productCollect[index].show = true
			// console.log(this.productCollect,index)

			this.productCollect.map((val, idx) => {
				if (index != idx) this.productCollect[idx].show = false
			})
			// 商品删除参数
			this.ids = this.productCollect[index].collectId
			this.currentIndex = index
			this.currentType = 1
		},
		// 打开删除层
		productActionClick() {
			this.cardModal = true
			this.paoductDelSubmit = true
			this.shopDelSubmit = false
		},
		storeOpen(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.storeCollect[index].show = true
			this.storeCollect.map((val, idx) => {
				if (index != idx) this.storeCollect[idx].show = false
			})

			// 店铺删除参数
			this.ids = this.storeCollect[index].collectId
			this.currentIndex = index
			this.currentType = 2
		},
		// 打开删除层
		storeActionClick() {
			this.cardModal = true
			this.paoductDelSubmit = false
			this.shopDelSubmit = true
		},
		// 商品选中
		productItemSel(index, number) {
			this.productCollect[index].selected = number
			let proSelectNum = 0
			this.productCollect.forEach((value, index) => {
				if (this.productCollect[index].selected == 0) {
					this.isAllProCheck = false
				} else {
					proSelectNum++
				}
			})
			if (this.productCollect.length == proSelectNum) {
				this.isAllProCheck = true
			}
		},
		// 店铺选中
		storeItemSel(index, number) {
			this.storeCollect[index].selected = number
			let storeSelectNum = 0
			this.storeCollect.forEach((value, index) => {
				if (this.storeCollect[index].selected == 0) {
					this.isAllStoreCheck = false
				} else {
					storeSelectNum++
				}
			})
			if (this.storeCollect.length == storeSelectNum) {
				this.isAllStoreCheck = true
			}
		},
		// 全选
		allProductSel(type) {
			this.isAllProCheck = !this.isAllProCheck
			this.productCollect.forEach((value, index) => {
				this.productCollect[index].selected = type
			})
		},
		allStoreSel(type) {
			this.isAllStoreCheck = !this.isAllStoreCheck
			this.storeCollect.forEach((value, index) => {
				this.storeCollect[index].selected = type
			})
		},
		editClick() {
			this.allCheckShow = true
			const actionSwipe = this.$refs.actionSwipe
			const shopActionSwipe = this.$refs.shopActionSwipe
			if (actionSwipe) {
				actionSwipe.forEach((item) => item.close())
			}
			if (shopActionSwipe) {
				shopActionSwipe.forEach((item) => item.close())
			}
		},
		finishClick() {
			this.allCheckShow = false
		},
		// 收藏商品查询
		getProductCollect() {
			// uni.showLoading({
			// 	mask: true,
			// 	title: '加载中...'
			// })
			getAllProductCollectApi({
				page: this.productPage,
				pageSize: this.productPageSize
			}).then((res) => {
				uni.hideLoading()
				if (res.data.list.length == 0) {
					this.proCollectShow = true
					this.proloadingType = 1
					this.productPage = this.productPage
				} else {
					this.productCollect = this.productCollect.concat(res.data.list)

					this.productCollect.forEach((value, index) => {
						value.show = false
						value.selected = 0
					})
				}
			})
				.catch((res) => {
					uni.showToast({
						title: '收藏商品查询失败',
						icon: 'none'
					})
				})
		},
		// 收藏店铺查询
		getStoreCollect() {
			// console.log(111)
			// uni.showLoading({
			// 	mask: true,
			// 	title: '加载中...'
			// })
			getAllShopStoreCollectApi({
				page: this.storePage,
				pageSize: this.storePageSize
			}).then((res) => {
				uni.hideLoading()
				if (res.data.list.length == 0) {
					this.storeCollectShow = true
					this.storeloadingType = 1
					this.storePage = this.storePage
				}
				this.storeCollect = this.storeCollect.concat(res.data.list)

				this.storeCollect.forEach((value, index) => {
					value.show = false
					value.selected = 0
				})
			})
				.catch((res) => {
					uni.showToast({
						title: '失败',
						icon: 'none'
					})
				})
		},
		// 取消收藏
		cancelCollect(ids) {
			updateCollectCancelApi({
				ids: [ ids ]
			}).then((res) => {
				this.$showToast('删除成功')
				this.cardModal = false
				this.currentType = null
				this.currentIndex = null
				this.ids = null
				if (res.code == '200') {
					this.productCollect = []
					this.storeCollect = []
					this.getStoreCollect()
					this.getProductCollect()
				} else {
					this.$showToast(res.message)
				}
			})
				.catch((e) => {
					this.$showToast('失败')
				})
		},
		// 商品详情
		goodsDateils(shopId, productId, skuId) {
			uni.navigateTo({
				url: '/pages_category_page1/goodsModule/goodsDetails?shopId=' + shopId + '&productId=' +
					productId + '&skuId=' + skuId
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.collection-container {
	min-height: 100vh;
	background-color: #F7F7F7;
	box-sizing: border-box;

	.empty-box {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		.tohome-box {
			color: #999999;
			margin-top: 50rpx;
		}

		.collect-empty {
			margin-top: 30%;
			width: 198rpx;
			height: 183rpx;
		}
	}

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
			width: 232upx;
			height: 104upx;
			line-height: 104upx;
			text-align: center;
			font-size: 28upx;
			color: #FFFFFF;
			background: #C83732;
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

.priceBox {
	.iconImg {
		width: 58rpx;
		height: 36rpx;
		margin-right: 10rpx;
	}

	.discountIcon {
		width: 100rpx;
	}
}
</style>

