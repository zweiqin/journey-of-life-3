<template>
	<view class="combinationBox">
		<JHeader title="组合优惠" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="topInfo">
			<view class="topBg">
				<swiper class="swiper" :circular="circular" :autoplay="autoplay" :vertical="vertical" :duration="duration">
					<swiper-item v-for="(item, index) in ruleList" :key="index">
						<view class="swiper-item uni-bg-red">{{ item.price }}元任选{{ item.number }}件</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="combinationList">
			<view
				v-for="(item, index) in productList" :key="index" class="combinationItem"
				@click="goodsDateils(item.shopId, item.productId, item.skuId)"
			>
				<view class="imgBox">
					<image :src="item.image" class="pic-img default-img"></image>
				</view>
				<view class="itemInfoBox">
					<view class="itemTit">{{ item.productName }}</view>
					<view class="itemNum">{{ item.number }}人付款</view>
					<view class="addInfo">
						<view class="price">￥{{ item.price }}</view>
						<view class="selectBtn" @click.stop="showRuleBox(item, index)">
							<!-- <image v-if="item.selected === 0" src="../../static/images/origin/cart1.png"></image>
								<image v-else src="../../static/images/origin/cart2.png"></image> -->
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--     商品详情 -->
		<u-popup v-model="goosDetailshowFlag" mode="bottom" border-radius="14">
			<view class="goosDetailshow-box">
				<view class="detailImg-box flex-row-plus">
					<image class="detailImg default-img" :src="skuImg"></image>
					<view class="flex-column-plus mar-left-40">
						<view class="font-color-C5AA7B">
							<label class="fs24">¥</label>
							<label class="fs36 mar-left-10" v-text="detailList.activityType == 1 ? skuOriginalPrice : skuPrice"></label>
						</view>
						<label class="fs24 font-color-999 mar-top-20">库存 {{ stockNumber }} 件</label>
						<label class="fs24 mar-top-20">已选</label>
					</view>
				</view>
				<view class="color-box flex-column-plus">
					<view v-for="(attritem, index) in skuProdList.names" :key="index">
						<label class="fs24 font-color-999">{{ attritem.skuName }}</label>
						<view class="colorName-box">
							<view v-for="(attrRes, resIndex) in attritem.values" :key="resIndex" class="pad-bot-30">
								<view
									class="colorName" :class="{ 'colorName-on': subIndex[index] == resIndex }"
									@click="colorActiveClick(attrRes, index, resIndex)"
								>
									{{ attrRes.skuValue }}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="goodsNum-box flex-row-plus flex-sp-between">
					<label class="font-color-999 fs24">数量</label>
					<view class="goodsNum">
						<text class="subtract" @click="numSub()">-</text>
						<text v-model="buyNum" class="goodsNumber">{{ buyNum }}</text>
						<text class="add" @click.stop="numAdd()">+</text>
					</view>
				</view>
				<view class="flex-items flex-sp-around btnBox">
					<view class="goosDetailbut-box flex-row-plus" @click="goosDetailshowFlag = false">
						<view class="buyNowBut cancelBtn">取消</view>
					</view>
					<view class="goosDetailbut-box flex-items-plus" @click="goosDetailshowFlag = false">
						<view class="buyNowBut" @click="addCart">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
// const NET = require('../../utils/request')
// const API = require('../../config/api')

export default {
	name: 'Combination',
	data() {
		return {
			page: 1,
			pageSize: 10,
			list: [],
			pricing: {},
			productList: [],
			ruleList: [],
			autoplay: true,
			duration: 2000,
			vertical: true,
			circular: true,
			buyNum: 1,
			goosDetailshowFlag: false, // 规格选择
			shopId: 0,
			skuId: 0,
			terminal: 1,
			skuPrice: '',
			skuOriginalPrice: '',
			attrItemIdArr: [],
			detailList: [],
			subIndex: [],
			selectArr: [], // 存放被选中的值
			skuProdList: [],
			stockNumber: 0,
			skuImg: '',
			currentIndex: null,
			priceId: null
		}
	},
	onLoad(option) {
		this.priceId = option.priceId
		this.getSelectByPriceId() // 获取定价
		this.getSelectProductListByPriceId()
	},
	methods: {
		getSelectByPriceId() {
			// uni.showLoading({
			//   mask: true,
			//   title: '加载中...',
			// })
			NET.request(API.selectByPriceId, {
				priceId: this.priceId
			}, 'GET').then((res) => {
				uni.hideLoading()
				this.ruleList = res.data
			})
				.catch((res) => {
				})
		},
		showRuleBox(item, index) {
			this.shopId = item.shopId
			this.productId = item.productId
			this.skuId = item.skuId
			this.currentIndex = index
			this.goosDetailshowFlag = true
			this.getProductSku()
			this.queryProductDetail()
		},
		getSelectProductListByPriceId() {
			NET.request(API.selectProductListByPriceId, {
				priceId: this.priceId,
				page: this.page,
				pageSize: this.pageSize
			}, 'GET').then((res) => {
				uni.hideLoading()
				// this.productList = res.data.list
				var proList = res.data.list
				proList.forEach((item) => {
					item.selected = 0
					this.productList.push(item)
				})
			})
				.catch((res) => {
				})
		},
		// 商品详情
		goodsDateils(shopId, productId, skuId) {
			uni.navigateTo({
				url: 'goodsDetails?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		},
		// 获取商品详情
		queryProductDetail() {
			NET.request(
				API.QueryProductDetail, {
					shopId: this.shopId,
					productId: this.productId,
					skuId: this.skuId,
					terminal: 1
				},
				'GET'
			).then((res) => {
				this.detailList = res.data
				this.skuPrice = res.data.price
				this.skuOriginalPrice = res.data.originalPrice
				for (let i = 0; i < res.data.attrList.length; i++) {
					this.subIndex[i] = 0
				}
				this.attrItemIdArr[0] = res.data.attrList[0].attrValueList[0].id
				this.$forceUpdate()
			})
				.catch((res) => {
				})
		},
		getProductSku() {
			NET.request(API.QueryProductSku, {
				skuId: this.skuId,
				productId: this.productId
			}, 'GET').then((res) => {
				this.skuProdList = res.data
				this.attrList = res.data.names
				this.attrValueList = res.data.names[0].values
				console.log(this.attrValueList[0], 'arr')
				// 渲染商详之后，默认先选中第一个规格
				this.colorActiveClick(this.attrValueList[0], 0, 0)
				this.skuProdId = this.skuId
				// this.skuImg = res.data.image
				this.skuPrice = res.data.price
				this.skuOriginalPrice = res.data.originalPrice
				this.stockNumber = res.data.stockNumber
				this.detailList.ifHuabei = res.data.ifHuabei
				// this.renderHuabei(this.skuPrice)
				this.$forceUpdate()
			})
				.catch((res) => {
				})
		},
		// 颜色选中事件
		colorActiveClick(res, index, resIndex) {
			const t = this
			t.selectArr[index] = res
			t.subIndex[index] = resIndex
			t.attrItemIdArr[index] = res.valueCode
			t.checkItem()
			t.checkItemDataClick(t.attrItemIdArr)
		},
		checkItemDataClick(attrItemIdArr) {
			let attrkey = ''
			for (let i = 0; i < attrItemIdArr.length; i++) {
				attrkey += attrItemIdArr[i] + ','
			}
			attrkey = attrkey.substring(0, attrkey.length - 1)
			const mapinfo = this.skuProdList.map
			for (var key in mapinfo) {
				if (attrkey == key) {
					this.skuProdId = mapinfo[key].skuId
					this.skuImg = mapinfo[key].skuImg
					this.skuPrice = mapinfo[key].price
					this.skuOriginalPrice = mapinfo[key].originalPrice
					this.stockNumber = mapinfo[key].stockNumber
				}
			}
			// console.log(attrItemIdArr.length, 'num')
			var currentCode = ''
			for (var i = 0; i < attrItemIdArr.length; i++) {
				if (i === 1 && attrItemIdArr.length > 1) {
					currentCode += ',' + attrItemIdArr[i]
				} else {
					currentCode += attrItemIdArr[i]
				}
			}
			for (const key in this.skuProdList.map) {
				if (key == currentCode) {
					this.skuImg = this.skuProdList.map[key].image
					this.detailList.originalPrice = this.skuProdList.map[key].originalPrice
					if (this.skuProdList.map[key].activityType == 1) {
						this.ifGroupPro = true
						return false
					}
					this.ifGroupPro = false
				}
			}
		},
		checkItem() {
			var self = this
			var option = self.attrList
			var result = [] // 定义数组存储被选中的值
			for (const i in option) {
				result[i] = self.selectArr[i] ? self.selectArr[i] : ''
				if (!self.subIndex[i]) {
					self.subIndex[i] = 0
				}
				if (!self.attrItemIdArr[i]) {
					self.attrItemIdArr[i] = option[i].values[0].valueCode
				}
			}
			for (const i in option) {
				var last = result[i] // 把选中的值存放到字符串last去
				for (const k in option[i].item) {
					result[i] = option[i].item[k].name // 赋值，存在直接覆盖，不存在往里面添加name值
				}
				result[i] = last // 还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
			}
			self.$forceUpdate() // 重绘
		},
		// 数量减
		numSub() {
			if (this.buyNum > 1) {
				this.buyNum = this.buyNum - 1
			} else {
				uni.showToast({
					title: '亲！至少一件哦！',
					icon: 'none'
				})
			}
		},
		// 数量加
		numAdd() {
			if (this.buyNum < this.stockNumber) {
				this.buyNum = this.buyNum + 1
			} else {
				uni.showToast({
					title: '库存不足！',
					icon: 'none'
				})
			}
		},
		// 加入购物车
		addCart() {
			// 判断是否登录
			if (this.stockNumber < 1) {
				uni.showToast({
					title: '库存不足',
					icon: 'none'
				})
			} else {
				// uni.showLoading({
				//   mask: true,
				//   title: '添加中...',
				// })
				NET.request(API.ShoppingaddCart, {
					skuId: this.skuProdId,
					number: this.buyNum
				}, 'POST').then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '添加成功',
						icon: 'none'
					})
					setTimeout(() => {
						this.productList[this.currentIndex].selected = 1
						this.goosDetailshowFlag = false
						uni.showModal({
							title: '温馨提示',
							content: '商品已成功加入购物车？',
							confirmText: '去结算',
							cancelText: '继续添加',
							success: (res) => {
								if (res.confirm) {
									uni.switchTab({
										url: '../../pages/tabbar/cart/index'
									})
								} else if (res.cancel) {
								}
							}
						})
					}, 1000)
					this.buyNum = 1
				})
					.catch((res) => {
						uni.hideLoading()
						if (res.data.code == 40005) {
							uni.navigateTo({
								url: '../../pages_category_page2/userModule/login'
							})
						}
					})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
page {
	background: #333333;
}

.combinationBox {
	.topInfo {
		margin: 40rpx 0;

		.topBg {
			margin: 30rpx auto;
			width: 670rpx;
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			// background: url("../../static/images/origin/combinationBg.png") no-repeat center center;
			background-size: contain;
			overflow: hidden;
		}
	}

	.combinationList {
		display: flex;
		flex-flow: wrap;
		justify-content: space-between;
		padding: 0 20rpx;

		.combinationItem {
			margin-bottom: 30rpx;
			background: #FFFFFF;

			.imgBox {
				width: 348rpx;
				height: 314rpx;
				background: #F5F5F5;

				image {
					width: 100%;
					height: 100%;
					object-fit: contain
				}
			}

			.itemInfoBox {
				padding: 20rpx;
				width: 348rpx;

				.itemTit {
					color: #333333;
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-bottom: 15rpx;
				}

				.itemNum {
					color: #C5AA7B;
					font-size: 20rpx;
					font-weight: 400;
					border: 2rpx solid #E4E5E6;
					display: inline;
					padding: 5rpx 10rpx;
				}

				.addInfo {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.price {
						font-size: 40rpx;
						color: #C83732;
					}

					.selectBtn {
						width: 80rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 54rpx;
							height: 54rpx;
						}
					}
				}
			}
		}
	}
}

.goosDetailshow-box {
	padding-bottom: 10upx;

	.detailImg-box {
		margin-top: 30upx;
		margin-left: 30upx;
		border-bottom: 2upx solid #EDEDED;
		padding-bottom: 20upx;
		width: 100%;

		.detailImg {
			width: 180upx;
			height: 180upx;
		}
	}

	.color-box {
		padding: 30upx 30upx;
		border-bottom: 1upx solid #EDEDED;
		width: 100%;

		.colorName-box {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			margin-top: 30upx;
			margin-left: -30upx;

			.colorName {
				background-color: #FFFFFF;
				margin-left: 30upx;
				padding: 10upx 32upx;
				font-size: 26upx;
				border: 2rpx solid #E4E5E6;
				z-index: 2;
				color: #333333;
			}

			.colorName-on {
				box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
				color: #C5AA7B;
				margin-left: 30upx;
				padding: 10upx 32upx;
				font-size: 26upx;
				text-align: center;
				z-index: 1;
				border: none;
			}
		}

	}

	.modelNum-box {
		padding: 30upx 30upx;
		border-bottom: 1upx solid #EDEDED;
		width: 690upx;

		.modelNumName-box {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			margin-top: 30upx;
			margin-left: -30upx;

			.modelNumName-on {
				background-color: #FFE4D0;
				color: #FF7800;
				margin-left: 30upx;
				padding: 10upx 32upx;
				border-radius: 28upx;
				border: 1upx solid #FF7800;
				font-size: 26upx;
				text-align: center;
			}

			.modelNumName {
				background-color: #F5F5F5;
				margin-left: 30upx;
				padding: 10upx 32upx;
				border-radius: 28upx;
				font-size: 26upx;
			}
		}
	}

	.goodsNum-box {
		padding: 30upx 30upx;
		width: 100%;
		padding-bottom: 200upx;

		.goodsNum {
			height: 50upx;

			text {
				display: inline-block;
				width: 50upx;
				height: 50upx;
				border: 1upx solid #999999;
				text-align: center;
				line-height: 50upx;
			}

			.subtract {
				border-right: 0upx;
			}

			.add {
				border-left: 0upx;
			}
		}
	}

	.bottom-line {
		border-bottom: 1upx solid #EDEDED;
	}

	.huabei-box {
		padding: 30upx 30upx;
		width: 690upx;

		.fenqi-box {
			margin-top: 15upx;
			width: 120%;

			.huabei-item {
				display: inline-block;
				background: #f3f3f3;
				padding: 16upx 24upx;
				margin: 5upx 10upx;
				border-radius: 15upx;
				text-align: center;
				font-size: 7upx;

				.huabei-period {
					display: block;
				}
			}

			.fenqi-on {
				border: 1px solid #EF7F93;
				color: #EF7F93;
			}

			.disabled {
				color: #cacaca;
			}
		}
	}

	.goosDetailbut-box {
		justify-content: center;

		.joinShopCartBut {
			width: 343upx;
			height: 80upx;
			border-radius: 40upx 0 0 40upx;
			background-color: #FFC300;
			color: #FFFEFE;
			font-size: 28upx;
			line-height: 80upx;
			text-align: center;
			margin-left: 30upx;
		}

		.buyNowBut {
			width: 343upx;
			height: 80upx;
			background-color: #333333;
			font-size: 28upx;
			line-height: 80upx;
			text-align: center;
			color: #FFEBC4;
		}

		.cancelBtn {
			background-color: #FFFFFF !important;
			border: 2rpx solid #333333;
			color: #333333;
		}
	}

	.btnBox {
		padding-bottom: 20rpx;
	}
}
</style>
