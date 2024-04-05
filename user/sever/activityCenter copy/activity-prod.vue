<template>
	<view v-if="goodsDetail" class="goods-detail-container">
		<tui-toast ref="toast"></tui-toast>
		<!-- 轮播图 -->
		<view class="carousel-wrapper">
			<Carousel
				:list="
					goodsDetail.info.gallery.length
						? goodsDetail.info.gallery
						: [ goodsDetail.info.picUrl ]
				" :height="390" :top="0" :radius="0"
			></Carousel>

			<view class="header-top" :style="{ opacity: !showTopNav ? 1 : 0 }">
				<view style="padding: 10rpx;border-radius: 50%;background-color: rgba(0, 0, 0, 0.28);">
					<tui-icon name="arrowleft" color="#ffffff" size="48" unit="rpx" margin="0" @click="handleBack"></tui-icon>
				</view>

				<view style="display: flex;">
					<BeeWxShare ref="beeWxShareRef" @click="handleShareGoods">
					</BeeWxShare>
					<view style="height: 64upx;padding: 0 20upx;display: flex;align-items: center;font-weight: 700;background-color: #bdbbb9;border-radius: 32upx;" @click="handleShareActivity">活动分享</view>
				</view>
			</view>
		</view>

		<view class="product-box-top">
			<image src="../../../static/images/user/activity/product-bottom.png" mode="widthFix" />
			<view style="position: absolute;top: 44%;left: 4%;color: #FFFFFF;" :class="{ normalPrice: vipPrice }">
				<text style="font-size: 24upx;">￥</text>
				<text style="font-size: 35upx;">{{ goodsDetail.info.counterPrice }}</text>
				<text style="font-size: 24upx;">起</text>
			</view>
			<view style="position: absolute;top: 34%;left: 43%;color: #FF1D1D;" @click="handleWatchVipPrice">
				<view v-if="vipPrice">
					<text style="font-size: 24upx;">￥</text>
					<text style="font-size: 35upx;font-weight: 700;">{{ vipPrice || '--' }}</text>
					<text style="font-size: 24upx;">起</text>
				</view>
				<view v-else style="padding-left: 1upx;padding-top: 2upx;font-size: 32upx;font-weight: 700;">查看补贴价</view>
			</view>
		</view>

		<view class="pane goods-info">

			<view style="padding: 20upx;border-radius: 20upx;background-color: #ffffff;">
				<view style="width: 100%;" @click="go('/community-center/vip-center/vip-detail?type=2')">
					<image style="width: 100%;" src="../../../static/images/user/activity/activity-member.png" mode="widthFix" />
				</view>
				<view class="goods-name">{{ goodsDetail.info.name }}</view>
				<view class="salsed">
					<text>月销100+</text>
				</view>
			</view>

			<view class="buy-info">
				<view v-for="(item, index) in goodsDetail.attribute" :key="index" style="margin-bottom: 16upx;;display: flex;justify-content: space-between;border-radius: 22upx;background-color: #ffffff;" @click="handleClickAttribute(item)">
					<view>
						<view style="width: fit-content;padding: 10upx 25upx;font-size: 24upx;color: #FFFFFF;border-top-left-radius: 22upx;border-bottom-right-radius: 22upx;background-color: #3a52ee;">{{ item.attribute }}</view>
						<view style="margin-top: 28upx;margin-left: 24upx;font-weight: 700;"> {{ item.value }} </view>
					</view>
					<view style="width: 25%;">
						<image style="width: 100%;" :src="goodsDetail.info.picUrl" mode="widthFix" />
					</view>
				</view>
			</view>

		</view>

		<!-- 宝贝详情 -->
		<view v-if="goodsDetail.info.detail" id="goods-detail" class="goods-detail">
			<view style="width: 10upx;height: 10upx;background-color: #ffc117;border-radius: 50%;margin-right: 28upx;"></view>
			<view style="width: 14upx;height: 14upx;background-color: #ffc117;border-radius: 50%;margin-right: 28upx;"></view>
			<view style="width: 18upx;height: 18upx;background-color: #ffc117;border-radius: 50%;margin-right: 28upx;"></view>
			<text style="margin-right: 28upx;">商品详情</text>
			<view style="width: 18upx;height: 18upx;background-color: #ffc117;border-radius: 50%;margin-right: 28upx;"></view>
			<view style="width: 14upx;height: 14upx;background-color: #ffc117;border-radius: 50%;margin-right: 28upx;"></view>
			<view style="width: 10upx;height: 10upx;background-color: #ffc117;border-radius: 50%;"></view>
		</view>

		<UParse v-if="goodsDetail.info.detail" :content="goodsInfoDetail"></UParse>

		<view class="footer">
			<view class="icon-wrapper">
				<view class="item" @click="go('/user/sever/shopCar/shopCar')">
					<tui-icon name="cart" color="#e95d20" size="40" unit="rpx" margin="0"></tui-icon>
					<text>购物车</text>
					<view v-if="shopCarNumber" class="number">{{ shopCarNumber }}</view>
				</view>

				<view class="item" @click="go('/user/sever/customer-service/customer-service')">
					<tui-icon name="kefu" color="#777777" size="40" unit="rpx" margin="0"></tui-icon>
					<text>客服</text>
				</view>

				<view class="item">
					<tui-icon v-if="isCollect" name="star-fill" color="#e95d20" size="40" unit="rpx" margin="0" @click="handleCollect"></tui-icon>
					<tui-icon v-else name="star" color="#777777" size="40" unit="rpx" margin="0" @click="handleCollect"></tui-icon>
					<text>收藏</text>
				</view>
			</view>

			<view class="buttons">
				<button class="uni-btn" @click="addShopCar(selectInfo)">
					加入购物车
				</button>
				<button class="uni-btn" @click="fastBuy(selectInfo)">立即购买</button>
			</view>
		</view>

		<TSpecification
			ref="specificationRef" v-model="showSpecification" :btn-text="btnStatus" :data="goodsDetail"
			:bottom="0" @confirm="handleChooseSp"
		></TSpecification>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import Carousel from '../../../components/carousel'
import uParse from '../../../components/u-parse/u-parse.vue'
import { marked } from 'marked'
import { T_PAY_GOODS, USER_ID, USER_INFO } from '../../../constant'

import {
	getGoodsDetailApi,
	collectionApi,
	// getShopCarApi,
	addShopCarApi,
	getCarShopNumberApi,
	// goodsListApi,
	watchVipPriceApi
} from '../../../api/goods'
import {
	getIsPurchaseApi
} from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
	name: 'ActivityProd',
	components: {
		Carousel,
		UParse: uParse
	},
	data() {
		return {
			goodsId: null,
			campaignsType: null,
			activityId: null,
			goodsDetail: null,
			showSpecification: false,
			shopCarNumber: 0,
			isCollect: false,
			userId: null,
			showTopNav: false,
			evalPosition: 0,
			detailPosition: 0,
			scrollTop: 0,
			currentMoveTag: 0,
			redirect: '/pages/prod/prod?goodsId=',
			btnStatus: '确定',
			selectInfo: null,
			selectForm: {
				spsStr: ''
			},
			isShowBrand: false,
			vipPrice: null
		}
	},
	onLoad(options) {
		this.isShowBrand = !!options.showBrand
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
		})
		this.goodsId = options.goodsId * 1
		this.campaignsType = options.campaignsType * 1
		this.activityId = options.activityId * 1
		this.redirect += this.goodsId
		this.userId = uni.getStorageSync(USER_ID)
		this.getGoodsDetail()
		if (this.userId) {
			this.getCarShopNumber()
		}
	},

	computed: {
		goodsInfoDetail() {
			return this.goodsDetail.info.detail
				? marked(this.goodsDetail.info.detail)
				: ''
		}
	},

	watch: {
	},

	methods: {
		// 回退
		handleBack() {
			uni.navigateBack()
		},
		// 获取商品详情
		async getGoodsDetail() {
			uni.showLoading()
			const res = await getGoodsDetailApi(this.goodsId, this.userId)
			uni.hideLoading()
			if (res.errno === 0) {
				this.goodsDetail = res.data
				// #ifdef H5
				this.$nextTick(() => {
					this.handleShareGoods(true)
				})
				// #endif
				this.isCollect = !!res.data.userHasCollect
			} else {
				uni.showToast({
					title: '商品不存在',
					duration: 2000,
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 500)
			}
		},

		// 加入购物车
		async addShopCar(selectInfo) {
			this.btnStatus = '确定加入购物车'
			let goodsInfo = null
			if (!selectInfo || !this.selectInfo) {
				goodsInfo = await this.getSpacification()
			} else {
				goodsInfo = selectInfo
			}

			const data = {
				userId: getUserId(),
				goodsId: this.goodsDetail.info.id,
				number: goodsInfo.number,
				productId: goodsInfo.product.id
			}

			const res = await addShopCarApi(data)
			if (res.errno === 0) {
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				})
				this.showSpecification = false
				this.getCarShopNumber()
			} else {
				uni.showToast({
					title: '购物车添加失败',
					icon: 'none'
				})
			}
		},
		// 立即购买
		async fastBuy(selectInfo) {
			this.btnStatus = '立即购买'
			let goodsInfo = null
			if (!selectInfo || !this.selectInfo) {
				goodsInfo = await this.getSpacification()
			} else {
				goodsInfo = selectInfo
			}
			uni.setStorageSync(T_PAY_GOODS, {
				currentGoodsImg: goodsInfo.product.url || this.goodsDetail.info.picUrl,
				currentSpecification: goodsInfo.spStr,
				currentPrice: goodsInfo.product.price,
				number: goodsInfo.number,
				status: 0,
				...this.goodsDetail,
				selectedProduct: goodsInfo,
				brandId: this.goodsDetail.brand.id
			})
			uni.navigateTo({
				url: `/pages/pre-order/pre-order?activityId=${this.activityId}`
			})
		},

		// 获取商品规格参数
		getSpacification() {
			if (!this.userId) {
				uni.showModal({
					title: '提示',
					content: '您还未登录，请先登录',
					success: ({ confirm }) => {
						if (confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})

				return
			}
			return new Promise((resolve, reject) => {
				if (this.showSpecification) {
					const goodsInfo = this.$refs.specificationRef.getVal()
					if (goodsInfo.number > goodsInfo.product.number) {
						this.$showToast('该货品库存为' + goodsInfo.product.number)
						reject()
					}
					resolve(goodsInfo)
				} else {
					this.showSpecification = true
				}
			})
		},

		// 获取购物车数量
		async getCarShopNumber() {
			const res = await getCarShopNumberApi()
			if (res.errno === 0) {
				this.shopCarNumber = res.data
			}
		},

		// 添加收藏
		async handleCollect() {
			if (!this.userId) {
				uni.showModal({
					title: '提示',
					content: '您还未登录，请先登录',
					success: ({ confirm }) => {
						if (confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})

				return
			}

			uni.showLoading()

			const res = await collectionApi({
				userId: getUserId(),
				type: 0,
				valueId: this.goodsId
			})

			uni.hideLoading()

			if (res.errno === 0) {
				uni.showToast({
					title: res.data.type === 'add' ? '收藏成功' : '取消收藏成功',
					duration: 2000
				})

				this.isCollect = !this.isCollect
			} else {
				uni.showLoading({
					title: '操作失败',
					icon: 'none'
				})
			}
		},

		handleKefu() {
			uni.showLoading({
				title: '暂未开放',
				icon: 'none',
				duration: 1000
			})
		},

		// 点击移动到对应的位置
		moveToDetail(tag) {
			const _this = this
			// this.currentMoveTag = tag;
			switch (tag) {
				case 0:
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 200
					})
					break
				case 1:
					uni.pageScrollTo({
						scrollTop: _this.evalPosition,
						duration: 200
					})
					break

				case 2:
					uni.pageScrollTo({
						scrollTop: _this.detailPosition,
						duration: 200
					})
					break
			}
		},

		// 点击
		handleClickAttribute(item) { },

		// 确定选择规格
		async handleChooseSp() {
			const sps = await this.getSpacification()
			// this.showSpecification = false
			// debugger
			if (this.btnStatus === '确定加入购物车') {
				this.addShopCar(sps)
			} else if (this.btnStatus === '立即购买') {
				this.fastBuy(sps)
			} else {
				this.selectInfo = sps
				this.selectForm.spsStr = '已选' + sps.spStr
				this.showSpecification = false
			}
		},

		// 查看会员价
		handleWatchVipPrice() {
			const userInfo = uni.getStorageSync(USER_INFO)
			if (!userInfo || !this.userId) {
				uni.showModal({
					title: '提示',
					content: '登录后方可查看',
					success: ({ confirm }) => {
						if (confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
				return
			}
			if (userInfo.userLevel == 5 && !userInfo.isRegionAgent) {
				uni.showModal({
					title: '提示',
					content: '你还不是会员，是否去升级？',
					success: ({ confirm }) => {
						if (confirm) {
							uni.navigateTo({
								url: '/user/sever/userUp/partner-appay'
							})
						}
					}
				})
				return
			}
			const _this = this
			if (this.vipPrice) {
				this.vipPrice = null
			} else {
				watchVipPriceApi({
					id: this.goodsId
				}).then(({ data }) => {
					_this.vipPrice = data
				})
			}
		},

		// 分享
		handleShareGoods(isQuit) {
			const _this = this
			const data = {
				data: {
					title: _this.goodsDetail.info.name,
					desc: _this.goodsDetail.productList
						.map((item) => item.specifications.join(','))
						.join(','),

					link:
						`${A_TF_MAIN}/#/pages/prod/prod?goodsId=` +
						_this.goodsId,
					imageUrl:
						_this.goodsDetail.shareImage || _this.goodsDetail.info.picUrl
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(
				data,
				isQuit,
				'/pages/prod/prod?goodsId' + this.goodsId
			)
		},

		// 分享活动邀请码
		async handleShareActivity() {
			if (this.campaignsType === 1) {
				const res = await getIsPurchaseApi({ userId: getUserId() })
				if (res.data) {
					uni.navigateTo({
						url: `/user/sever/activityCenter/activity-code?campaignsType=${this.campaignsType}`
					})
				} else {
					uni.showToast({
						title: '购买该商品后即可分享',
						icon: 'none'
					})
				}
			}
		}
	},

	onPullDownRefresh() {
		this.getGoodsDetail()
		if (this.userId) {
			this.getCarShopNumber()
		}
		uni.stopPullDownRefresh()
	},

	onPageScroll(e) {
		this.showTopNav = !!e.scrollTop
		this.scrollTop = e.scrollTop
		if (this.detailPosition) {
			if (e.scrollTop < this.evalPosition - 60) {
				this.currentMoveTag = 0
			} else if (
				e.scrollTop >= this.evalPosition - 60 &&
				e.scrollTop < this.detailPosition - 60
			) {
				this.currentMoveTag = 1
			} else if (e.scrollTop > this.detailPosition - 60) {
				this.currentMoveTag = 2
			}
		} else if (e.scrollTop < this.evalPosition - 60) {
			this.currentMoveTag = 0
		} else if (e.scrollTop >= this.evalPosition - 60) {
			this.currentMoveTag = 1
		}
	}
}
</script>

<style lang="less" scoped>
.goods-detail-container {
	font-size: 28upx;
	padding-bottom: 100upx;
		background-color: #f6f6f5;
}

/deep/ .wxParse {
	image,
	img {
		display: block;
	}
}

.watch-vip-price {
	margin-left: 20upx;
	color: #3d3d3d;
}

.pane {
	padding: 16upx 30upx;
	box-sizing: border-box;
}

.carousel-wrapper {
	position: relative;
	width: 100%;
	height: 780upx;

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		padding: 34upx 20upx;
		box-sizing: border-box;

		image {
			width: 64upx;
			height: 64upx;

			&:last-child {
				margin-left: 20upx;
			}
		}
	}
}

.product-box-top {
	position: relative;
		width: 100%;

		image {
			width: 100%;
		}

.normalPrice {
	color: #3d3d3d;
	font-size: 28upx;
	text-decoration: line-through;
}
	}

// 商品信息
.goods-info {
	// /* #ifdef APP */
	// margin-top: 30upx;
	// /* #endif */

	// /* #ifdef H5 */
	// margin-top: -34upx;
	// /* #endif */

	.goods-name {
		font-weight: bold;
		color: #000;
		font-size: 30upx;
		margin-top: 10upx;
	}

	.salsed {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: #999;
		margin-top: 10upx;

		image {
			width: 40upx;
			height: 40upx;
			object-fit: cover;
		}
	}

	.buy-info {
		// padding: 40upx 28upx;
		box-sizing: border-box;
		margin-top: 20upx;
	}

}

.goods-detail {
	position: relative;
	width: 100%;
	height: 65upx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 26upx;
	font-size: 30upx;
	font-weight: 700;
	background-color: #fff;

	text {
		position: relative;
		z-index: 2;
		padding: 0 4px;
	}
}

.footer {
	left: 0;
	bottom: 0;
	position: fixed;
	width: 100%;
	height: 100upx;
	background-color: #fff;
	padding: 0 20upx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	z-index: 10000000;

	.icon-wrapper {
		display: flex;
		flex: 1;
		justify-content: space-between;

		.item {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-right: 40upx;
			font-size: 24upx;
			white-space: nowrap;

			.number {
				width: 40upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				color: #fff;
				border-radius: 50%;
				position: absolute;
				background-color: #e95d20;
				top: -20upx;
				right: -16upx;
			}
		}

		image {
			width: 40upx;
			height: 40upx;
			object-fit: cover;
		}
	}

	.buttons {
		width: 440upx;
		display: flex;
		align-items: center;
		border-radius: 100px;
		overflow: hidden;

		.uni-btn {
			width: 220upx;
			font-size: 28upx;
			color: #fff;
			font-weight: bold;
			height: 80upx;
			text-align: center;
			line-height: 80upx;
			border-radius: 0;
		}
		.uni-btn:first-child {
			background-color: #ff6958;
		}
		.uni-btn:last-child {
			background-color: #ff0037;
		}
	}
}
</style>
