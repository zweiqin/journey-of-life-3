<template>
	<view class="invite-spell-container">
		<JHeader title="邀请好友拼单" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="grouped">
			<view class="fs32 font-color-FFF">{{ remainPerson !== 0 ? '等待成团' : '已成团' }}</view>
			<view class="fs26 number">{{ inviteSpell.person }}人团</view>
		</view>
		<view class="topBox">
			<view class="title-box flex-row-plus">
				<image class="pro-img" :src="common.seamingImgUrl(inviteSpell.image)"></image>
				<view class="flex-column-plus mar-left-30">
					<view class="title-lab fs28">{{ inviteSpell.productName }}</view>
					<view class="flex-row-plus flex-sp-between">
						<view class="flex-column-plus">
							<view class="flex-row-plus mar-top-30 flex-items">
								<label class="font-color-C83732 fs24">¥</label>
								<label class="font-color-C83732 fs36 mar-left-5">{{ inviteSpell.price }}</label>
								<label class="font-color-CCC discountsPriceLine fs26 mar-left-20">
									¥{{ inviteSpell.originalPrice }}
								</label>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="spellpersonnel-box">
			<view class="bgBox flex-items-plus flex-column">
				<view class="flex-items flex-sp-around flex-row-plus mar-right-20">
					<view
						v-for="(item, index) in inviteSpell.personList" :key="index"
						class="flex-column flex-items-plus mar-left-20"
					>
						<image v-if="index == 0" class="head-icon border-FF7 z-index-0" :src="common.seamingImgUrl(item.headImage)"></image>
						<image v-else class="head-icon " :src="common.seamingImgUrl(item.headImage)"></image>
						<view v-if="index == 0" class="fs18 colonel-box">团长</view>
					</view>
					<view v-for="ritem in remainPerson">
						<view class="replenish-icon flex-items-plus mar-left-20">?</view>
					</view>
				</view>
				<view v-if="remainPerson !== 0">
					<view class="mar-top-50 font-color-333">
						还差<label class="font-color-C5AA7B">
							{{ remainPerson }}
						</label>人成团，距结束还剩
						<tui-countdown
							:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
							border-color="transparent" :time="remainingTime"
						></tui-countdown>
					</view>
					<view v-if="type == 1" class="offered-but font-color-FFF flex-items-plus mar-top-60" @click="$refs.shareSpell.shareShow = true">
						邀请好友拼单
					</view>
					<view v-if="type == 0" class="offered-but font-color-FFF flex-items-plus mar-top-60" @click="goosDetailshowFlag = true">
						立即参团
					</view>
					<view v-if="type == 1" class="poster-but flex-items-plus mar-top-40" @click="goinvitePoster">
						生成邀请海报
					</view>
				</view>
			</view>
		</view>
		<view class="spellrule flex-items-plus flex-column mar-top-20">
			<view class="flex-row-plus">
				<view class="flex-row-plus flex-items-plus text-align">
					<view class="dot1"></view>
					<view class="dot2"></view>
					<view class="dot3"></view>
				</view>
				<label class="fs28 mar-left-20">拼团玩法</label>
				<view class="flex-row-plus flex-items-plus text-align mar-left-10">
					<view class="dot3"></view>
					<view class="dot2"></view>
					<view class="dot1"></view>
				</view>
			</view>
			<view class="mar-top-40">
				<tui-steps :items="numList" :type="2" :active-steps="-1"></tui-steps>
			</view>
		</view>
		<!-- 商品详情 -->
		<tui-bottom-popup v-model="goosDetailshowFlag" class="goosDetailshow-box" radius @close="goosDetailshowFlag = false">
			<view>
				<view class="detailImg-box flex-row-plus">
					<image class="detailImg" :src="common.seamingImgUrl(skuImg)"></image>
					<view class="flex-column-plus mar-left-40">
						<view class="font-color-C5AA7B">
							<label class="fs24">¥</label>
							<label class="fs36 mar-left-10">{{ skuPrice }}</label>
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
								<label
									class="colorName" :class="{ 'colorName-on': subIndex[index] == resIndex }"
									@click="colorActiveClick(attrRes, index, resIndex)"
								>
									{{ attrRes.skuValue }}
								</label>
							</view>
						</view>
					</view>
				</view>
				<view class="goodsNum-box flex-row-plus flex-sp-between">
					<label class="font-color-999 fs24">数量</label>
					<view class="goodsNum">
						<label class="subtract" @click="numSub">-</label>
						<label class="goodsNumber">{{ buyNum }}</label>
						<label class="add" @click="numAdd">+</label>
					</view>
				</view>
				<view
					class="flex-items-plus" style="padding-bottom: 50rpx;"
				>
					<view class="joinbuyBut" @click="getGroupSettlement(2)">确定</view>
				</view>
			</view>
		</tui-bottom-popup>
		<ShareSpell
			ref="shareSpell" :url="url" :url-parms="urlParms" :img="inviteSpell.image"
			title="好友邀请您来拼单啦"
			@shareCancel="$refs.shareSpell.shareShow = false"
		>
		</ShareSpell>
	</view>
</template>

<script>
import { T_STORAGE_KEY, T_SKU_ITEM_DTO_LIST, T_SKU_ITEM_LIST } from '../../../constant'
import { getProductDetailsByIdApi, getProductsSkuApi, getInviteWorkApi } from '../../../api/anotherTFInterface'

export default {
	name: 'InviteSpell',
	data() {
		return {
			numList: [{
				name: '选择商品 完成下单'
			}, {
				name: '支付开团 或参团'
			}, {
				name: '邀请好友 参与拼团'
			}, {
				name: '人满成团 失败退款'
			}],
			collageId: 0,
			orderId: 0,
			type: 0,
			inviteSpell: {},
			personLen: 0,
			remainPerson: 0,
			goosDetailshowFlag: false,
			remainingTime: null,
			productId: 0,
			skuId: 0,
			shopGroupWorkId: 0,
			buyNum: 1,
			skuProdId: 0,
			skuImg: '',
			skuPrice: 0,
			stockNumber: 0,
			skuProdList: {},
			selectArr: [], // 存放被选中的值
			subIndex: [], // 是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
			attrItemIdArr: [], // 存放被选中的id
			shopId: 0,
			attrList: [],
			productDetail: {},
			url: '',
			shareTitle: '',
			urlParms: ''
		}
	},
	onShareAppMessage(res) {
		var that = this
		// console.log('res=====',res);
		if (res.from === 'button') {
			// console.log('来自页面内转发按钮');
		} else if (res.from === 'menu') {
			// console.log('右上角菜单转发按钮');
		}
		this.url = '/another-tf/another-serve/inviteSpell/index?collageId=' +
			this.collageId + '&orderId=' + this.orderId + '&type=0' + '&productId=' + this.productId + '&skuId=' +
			this.skuId + '&shopGroupWorkId=' + this.shopGroupWorkId
		this.shareTitle = `【仅剩${this.remainPerson}个名额】我${this.inviteSpell.price}元拼了${this.inviteSpell.productName}`
		// 返回数据
		return {
			title: that.shareTitle,
			path: that.url,
			success(res) {
				// 转发成功，可以把当前页面的链接发送给后端，用于记录当前页面被转发了多少次或其他业务
				wx.request({
					url: app.buildUrl('/member/share'),
					data: {
						url: utils.getCurrentPageUrlWithArgs()
					},
					success(res) {
						// console.log('成功');
					}
				})
			},
			fail(res) {
				// 转发失败
			}
		}
	},
	onShow() {
		// 判断是否登录
		let item = {}
		if (uni.getStorageSync(T_STORAGE_KEY)) {
			item = uni.getStorageSync(T_STORAGE_KEY)
		}
		if (JSON.stringify(item) == '{}') {
			this.getInviteSpell()
		} else {
			this.$store.dispatch('auth/refrshUserInfoAction', () => {
				this.getInviteSpell()
			})
		}
	},
	onLoad(options) {
		this.collageId = parseInt(options.collageId)
		this.orderId = parseInt(options.orderId)
		this.productId = parseInt(options.productId)
		this.skuId = parseInt(options.skuId)
		this.shopGroupWorkId = parseInt(options.shopGroupWorkId)

		getProductsSkuApi({
			skuId: this.skuId,
			productId: this.productId
		}).then((res) => {
			this.skuProdList = res.data
			this.attrList = res.data.names
			// 渲染商详之后，默认先选中第一个规格
			this.colorActiveClick(res.data.names[0].values[0], 0, 0)
			this.skuProdId = this.skuId
			this.skuImg = res.data.image
			this.skuPrice = res.data.price
			this.stockNumber = res.data.stockNumber
			this.shopId = res.data.shopId
		})

		getProductDetailsByIdApi({
			shopId: this.shopId,
			productId: this.productId,
			skuId: this.skuId,
			terminal: 1
		}).then((res) => {
			this.productDetail = res.data
			for (let i = 0; i < res.data.attrList.length; i++) {
				this.subIndex[i] = 0
			}
			this.attrItemIdArr[0] = res.data.attrList[0].attrValueList[0].id
		})
		// #ifdef MP-WEIXIN
		this.url = '/another-tf/another-serve/inviteSpell/index?collageId=' +
			this.collageId + '&orderId=' + this.orderId + '&productId=' + this.productId + '&skuId=' + this.skuId +
			'&shopGroupWorkId=' + this.shopGroupWorkId
		this.urlParms = this.collageId + '&orderId=' + this.orderId + '&productId=' + this.productId + '&skuId=' + this
			.skuId + '&shopGroupWorkId=' + this.shopGroupWorkId
		// #endif
		// #ifndef MP-WEIXIN
		this.url = '/another-tf/another-serve/inviteSpell/index?collageId=' +
			this.collageId + '&orderId=' + this.orderId + '&productId=' + this.productId + '&skuId=' + this.skuId +
			'&shopGroupWorkId=' + this.shopGroupWorkId
		// #endif
	},
	methods: {
		// 拼团下单
		getGroupSettlement(type) {
			uni.removeStorageSync(T_SKU_ITEM_DTO_LIST)
			const data = {
				collageId: this.collageId,
				number: this.buyNum,
				productId: this.productId,
				shopId: this.shopId,
				skuId: this.skuProdId,
				shopGroupWorkId: this.shopGroupWorkId,
				type
			}
			uni.setStorageSync(T_SKU_ITEM_LIST, data)
			this.goosDetailshowFlag = false
			this.buyNum = 1
			uni.navigateTo({
				url: '/another-tf/another-serve/orderConfirm/index?type=3'
			})
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
		// 颜色选中事件
		colorActiveClick(res, index, resIndex) {
			this.selectArr[index] = res
			this.subIndex[index] = resIndex
			this.attrItemIdArr[index] = res.valueCode

			const result = [] // 定义数组存储被选中的值
			for (const i in this.attrList) {
				result[i] = this.selectArr[i] ? this.selectArr[i] : ''
				if (!this.subIndex[i]) {
					this.subIndex[i] = 0
				}
				if (!this.attrItemIdArr[i]) {
					this.attrItemIdArr[i] = this.attrList[i].values[0].valueCode
				}
			}
			for (const i in this.attrList) {
				var last = result[i] // 把选中的值存放到字符串last去
				for (const k in this.attrList[i].item) {
					result[i] = this.attrList[i].item[k].name // 赋值，存在直接覆盖，不存在往里面添加name值
				}
				result[i] = last // 还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
			}
			this.$forceUpdate() // 重绘

			let attrkey = ''
			for (let i = 0; i < this.attrItemIdArr.length; i++) {
				attrkey += this.attrItemIdArr[i] + ','
			}
			attrkey = attrkey.substring(0, attrkey.length - 1)
			const mapinfo = this.skuProdList.map
			for (var key in mapinfo) {
				if (attrkey == key) {
					this.skuProdId = mapinfo[key].skuId
					this.skuImg = mapinfo[key].skuImg
					this.skuPrice = mapinfo[key].price
					this.stockNumber = mapinfo[key].stockNumber
				}
			}
		},
		goinvitePoster() {
			const data = {
				image: this.inviteSpell.image,
				headImage: this.inviteSpell.headImage,
				productName: this.inviteSpell.productName,
				person: this.inviteSpell.person,
				originalPrice: this.inviteSpell.originalPrice,
				price: this.inviteSpell.price,
				collageId: this.collageId,
				productId: this.productId,
				skuId: this.skuId,
				orderId: this.orderId
			}
			uni.navigateTo({
				url: '/another-tf/another-serve/invitePoster/index?data=' + JSON.stringify(data)
			})
		},
		getInviteSpell() {
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			getInviteWorkApi({
				collageId: this.collageId,
				orderId: this.orderId
			}).then((res) => {
				this.inviteSpell = res.data
				this.type = 0
				this.inviteSpell.personList.forEach((item) => {
					if (item.buyerUserId === this.$store.getters.userInfo.buyerUserId) {
						this.type = 1
					}
				})
				this.personLen = res.data.personList.length
				this.remainPerson = res.data.person - this.personLen
				this.remainingTime = Math.floor(res.data.time / 1000)
				uni.hideLoading()
			})
				.catch((res) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>

.invite-spell-container {
	background-color: #333333;
	min-height: 100vh;
	box-sizing: border-box;

	.grouped {
		text-align: center;
		padding-top: 40rpx;

		.number {
			display: inline-block;
			color: #FFEBC4;
			height: 48rpx;
			line-height: 48rpx;
			padding: 0 30rpx;
			background: #525252;
			margin-top: 10rpx;
		}
	}

	.z-index-0 {
		z-index: 0;
	}

	.border-FF7 {
		border: 2rpx solid #FFF;
	}

	.colonel-box {
		color: #FFEBC4;
		background-color: #333333;
		width: 86rpx;
		height: 32rpx;
		line-height: 32rpx;
		border-radius: 15rpx;
		text-align: center;
		margin-top: -20rpx;
		z-index: 2;
	}

	.font-color-C5AA7B {
		color: #C5AA7B;
	}

	.topBox {
		padding: 40rpx 20rpx 0 20rpx;
	}

	.title-box {
		padding: 30rpx;
		background: #FFFFFF;

		.title-lab {
			width: 400rpx;
			height: 130rpx;
		}

		.spellNum {
			background-color: #FFEDDF;
			border-radius: 22rpx;
			width: 144rpx;
			height: 44rpx;
		}

		.pro-img {
			width: 222rpx;
			height: 222rpx;
		}
	}

	.spellpersonnel-box {
		margin-top: 20rpx;
		padding: 0 20rpx;

		.bgBox {
			background-color: #FFFFFF;
			padding: 30rpx 0;
		}

		.head-icon {
			width: 102rpx;
			height: 102rpx;
			border-radius: 50%;
		}

		.replenish-icon {
			width: 102rpx;
			height: 102rpx;
			border-radius: 50%;
			border: 1rpx #E5E5E5 dashed;
			font-size: 60rpx;
			color: #DBDBDB;
		}

		.offered-but {
			background-color: #333333;
			border-radius: 5rpx;
			width: 420rpx;
			height: 66rpx;
			color: #FFEBC4;
		}

		.poster-but {
			border: #C5AA7B 1rpx solid;
			border-radius: 5rpx;
			width: 420rpx;
			height: 66rpx;
			color: #C5AA7B;
		}
	}

	.spellrule {
		background-color: #FFFFFF;
		padding: 50rpx 20rpx;

		.dot1 {
			width: 4rpx;
			height: 4rpx;
			background-color: #B6B6C1;
			border-radius: 50%;
			margin-left: 10rpx;
		}

		.dot2 {
			width: 6rpx;
			height: 6rpx;
			background-color: #B6B6C1;
			border-radius: 50%;
			margin-left: 10rpx;
		}

		.dot3 {
			width: 8rpx;
			height: 8rpx;
			background-color: #B6B6C1;
			border-radius: 50%;
			margin-left: 10rpx;
		}
	}

	.goosDetailshow-box {
		.detailImg-box {
			margin-top: 30upx;
			margin-left: 30upx;
			border-radius: 10upx;
			border-bottom: 1upx solid #EDEDED;
			padding-bottom: 20upx;
			width: 690upx;

			.detailImg {
				width: 180upx;
				height: 180upx;
			}
		}

		.color-box {
			padding: 30upx 30upx;
			border-bottom: 1upx solid #EDEDED;
			width: 690upx;

			.colorName-box {
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-top: 30upx;
				margin-left: -30upx;

				.colorName-on {
					background-color: #FFE5D0;
					color: #C5AA7B;
					margin-left: 30upx;
					padding: 10upx 32upx;
					border-radius: 28upx;
					border: 1upx solid #C5AA7B;
					font-size: 26upx;
					text-align: center;
					z-index: 1;
				}

				.colorName {
					background-color: #F5F5F5;
					margin-left: 30upx;
					padding: 10upx 32upx;
					border-radius: 28upx;
					font-size: 26upx;
					z-index: 2;
				}
			}

		}

		.joinbuyBut {
			width: 690upx;
			height: 80upx;
			border-radius: 40upx 40upx;
			background-color: #3D3C3D;
			color: #FFFEFE;
			font-size: 28upx;
			line-height: 80upx;
			text-align: center;
		}

		.goodsNum-box {
			padding: 30upx 30upx;
			width: 690upx;
			padding-bottom: 268upx;

			.goodsNumber {
				border: 1upx solid #999999;
				padding: 3upx 20upx;
			}

			.subtract {
				border: 1upx solid #999999;
				padding: 3upx 20upx;
				margin-right: -1upx;
			}

			.add {
				border: 1upx solid #999999;
				padding: 3upx 20upx;
				margin-left: -1upx;
			}
		}
	}
}
</style>
