<template>
	<view class="invite-spell-container">
		<JHeader title="邀请好友拼单" :dark="false" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="grouped">
			<view class="fs32 font-color-FFF">
				{{ (inviteSpell.person - inviteSpell.personList.length) !== 0 ? '等待成团' : '已成团' }}
			</view>
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
								<label class="font-color-C83732 fs24">￥</label>
								<label class="font-color-C83732 fs36 mar-left-5">{{ inviteSpell.price }}</label>
								<label class="font-color-CCC discountsPriceLine fs26 mar-left-20">
									￥{{ inviteSpell.originalPrice }}
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
						<image v-if="index == 0" class="head-icon border-FF7 z-index-0" :src="common.seamingImgUrl(item.headImage)">
						</image>
						<image v-else class="head-icon " :src="common.seamingImgUrl(item.headImage)"></image>
						<view v-if="index == 0" class="fs18 colonel-box">团长</view>
					</view>
					<view v-for="ritem in (inviteSpell.person - inviteSpell.personList.length)" :key="ritem">
						<view class="replenish-icon flex-items-plus mar-left-20">?</view>
					</view>
				</view>
				<view v-if="(inviteSpell.person - inviteSpell.personList.length) !== 0">
					<view class="mar-top-50 font-color-333">
						还差<label class="font-color-C5AA7B">
							{{ inviteSpell.person - inviteSpell.personList.length }}
						</label>人成团，距结束还剩
						<tui-countdown
							:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
							border-color="transparent"
							:time="Math.floor(inviteSpell.time / 1000)"
						></tui-countdown>
					</view>
					<view
						v-if="inviteSpell.personList.some((item) => item.buyerUserId === $store.getters.userInfo.buyerUserId)"
						class="offered-but font-color-FFF flex-items-plus mar-top-60" @click="$refs.shareSpell.shareShow = true"
					>
						邀请好友拼单
					</view>
					<view
						v-if="!inviteSpell.personList.some((item) => item.buyerUserId === $store.getters.userInfo.buyerUserId)"
						class="offered-but font-color-FFF flex-items-plus mar-top-60" @click="isShowDetails = true"
					>
						立即参团
					</view>
					<view
						v-if="inviteSpell.personList.some((item) => item.buyerUserId === $store.getters.userInfo.buyerUserId)"
						class="poster-but flex-items-plus mar-top-40" @click="goInvitePoster"
					>
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
				<tui-steps
					:items="[{ name: '选择商品 完成下单' }, { name: '支付开团 或参团' }, { name: '邀请好友 参与拼团' }, { name: '人满成团 失败退款' }]"
					:type="2" :active-steps="-1"
				></tui-steps>
			</view>
		</view>
		<!-- 商品详情 -->
		<tui-bottom-popup :show="isShowDetails" @close="isShowDetails = false">
			<view class="goosDetailshow-box">
				<view class="detailImg-box flex-row-plus">
					<image class="detailImg default-img" :src="common.seamingImgUrl(selectedSku.image)"></image>
					<view class="flex-column-plus mar-left-40">
						<view class="font-color-C5AA7B">
							<label class="fs24">¥</label>
							<label
								class="fs36 mar-left-10"
								v-text="goodsDetail.activityType == 1 ? selectedSku.originalPrice : selectedSku.price"
							></label>
						</view>
						<label class="fs24 font-color-999 mar-top-20">库存 {{ selectedSku.stockNumber }} 件</label>
						<label class="fs24 mar-top-20">已选</label>
					</view>
				</view>

				<view style="flex: 1;height: 0;overflow: hidden;padding: 30rpx;font-size: 26rpx;">
					<scroll-view scroll-y style="height: 100%;max-height: 50vh;">
						<view v-for="nameItem in goodsDetail.names" :key="nameItem.nameCode" style="padding-bottom: 30rpx;">
							<view v-if="nameItem.nameCode" style="color: #333333;">
								{{ nameItem.skuName }}
							</view>
							<view style="display: flex;flex-wrap: wrap;align-items: center;margin: 0 -15rpx;">
								<view
									v-for="tag in nameItem.values" :key="tag.valueCode"
									style="background-color: #FFFFFF;margin: 24rpx 15rpx 0;padding: 10rpx 32rpx;" :style="{
										boxShadow: selectedAttr[nameItem.nameCode] === tag.valueCode ? '0 0 20rpx rgba(0, 0, 0, 0.1)' : 'none',
										color: selectedAttr[nameItem.nameCode] === tag.valueCode ? '#C5AA7B' : tag.ifEnable ? '#cccccc' : '#333333',
										border: selectedAttr[nameItem.nameCode] === tag.valueCode ? '2rpx solid #ffffff' : '2rpx solid #E4E5E6'
									}" @click="handleClickSkuItem(nameItem.nameCode, tag)"
								>
									{{ tag.skuValue }}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="goodsNum-box flex-row-plus flex-sp-between">
					<label class="font-color-999 fs24">数量</label>
					<view class="goodsNum">
						<text class="subtract" @click="handleNumSub()">-</text>
						<text class="goodsNumber">{{ number }}</text>
						<text class="add" @click.stop="handleNumAdd()">+</text>
					</view>
				</view>

				<view style="padding: 0 18rpx 30rpx;">
					<view style="display: flex;align-items: center;justify-content: center;">
						<tui-button
							type="black" width="190rpx" height="80rpx" margin="0"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8rpx;" @click="getGroupSettlement(2)"
						>
							确定
						</tui-button>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
		<ShareSpell
			ref="shareSpell"
			:url="`/another-tf/another-serve/inviteSpell/index?collageId=${collageId}&orderId=${orderId}&productId=${productId}&skuId=${skuId}&shopGroupWorkId=${shopGroupWorkId}`"
			:img="inviteSpell.image" title="好友邀请您来拼单啦" @shareCancel="$refs.shareSpell.shareShow = false"
		>
		</ShareSpell>
	</view>
</template>

<script>
import { resolveGoodsDetailSkuSituation, resolveGoodsDetailTagsSituation } from '../../../utils'
import { T_SKU_ITEM_DTO_LIST, T_SKU_ITEM_LIST } from '../../../constant'
import { getProductDetailsByIdApi, getProductsSkuApi, getInviteWorkApi } from '../../../api/anotherTFInterface'

export default {
	name: 'InviteSpell',
	data() {
		return {
			collageId: 0,
			orderId: 0,
			productId: 0,
			skuId: 0,
			shopGroupWorkId: 0,
			inviteSpell: {
				person: 0,
				personList: [],
				time: 0
			},
			shopId: 0,
			isShowDetails: false,
			goodsDetail: {
				activityType: 0,
				names: []
			},
			number: 1,
			selectedSku: {
				image: '',
				price: '',
				originalPrice: '',
				stockNumber: 0
			},
			selectedAttr: {}
		}
	},
	onShareAppMessage(res) {
		// 返回数据
		return {
			title: `【仅剩${this.inviteSpell.person - this.inviteSpell.personList.length}个名额】我${this.inviteSpell.price}元拼了${this.inviteSpell.productName}`,
			path: `/another-tf/another-serve/inviteSpell/index?collageId=${this.collageId}&orderId=${this.orderId}&productId=${this.productId}&skuId=${this.skuId}&shopGroupWorkId=${this.shopGroupWorkId}`,
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
			fail(e) {
				// 转发失败
			}
		}
	},
	onShow() {
		uni.showLoading()
		getInviteWorkApi({
			collageId: this.collageId,
			orderId: this.orderId
		}).then((res) => {
			this.inviteSpell = res.data
			uni.hideLoading()
		})
			.catch((e) => {
				uni.hideLoading()
			})
	},
	onLoad(options) {
		this.collageId = Number(options.collageId)
		this.orderId = Number(options.orderId)
		this.productId = Number(options.productId)
		this.skuId = Number(options.skuId)
		this.shopGroupWorkId = Number(options.shopGroupWorkId)
		getProductsSkuApi({
			skuId: this.skuId,
			productId: this.productId
		}).then((res) => {
			this.shopId = res.data.shopId
			this.handleShowGoodsSkuSelect({ shopId: this.shopId, productId: this.productId, skuId: this.skuId })
		})
	},
	methods: {
		async handleShowGoodsSkuSelect(productItem) {
			this.goodsDetail = { names: [] }
			this.selectedAttr = {}
			uni.showLoading()
			try {
				const res = await getProductDetailsByIdApi({
					shopId: productItem.shopId,
					productId: productItem.productId,
					skuId: productItem.skuId,
					terminal: 1
				})
				this.goodsDetail = res.data
				const skuCollectionListKeys = Object.keys(this.goodsDetail.map)
				if ((skuCollectionListKeys.length === 1) && (skuCollectionListKeys[0] === '单款项')) {
					this.goodsDetail.names[0].values.push({
						skuValue: this.goodsDetail.names[0].skuName,
						valueCode: '单款项'
					})
				}
				skuCollectionListKeys.forEach((skuValueCodeItem) => {
					if (!this.goodsDetail.map[skuValueCodeItem].image) this.goodsDetail.map[skuValueCodeItem].image = this.goodsDetail.images[0]
				})
				this.goodsDetail = await resolveGoodsDetailSkuSituation(this.goodsDetail)
				this.$nextTick(() => {
					if (productItem.skuId) {
						this.handleSelectBySkuId(productItem.skuId)
					} else {
						this.goodsDetail.names.forEach((nameItem) => {
							this.handleClickSkuItem(nameItem.nameCode, nameItem.values[0])
						})
					}
					this.isShowDetails = true
				})
			} finally {
				uni.hideLoading()
			}
		},
		handleSelectBySkuId(skuId) {
			if (!skuId) return
			Object.keys(this.goodsDetail.map).forEach((skuValueCodeItem) => {
				if (this.goodsDetail.map[skuValueCodeItem].skuId === skuId) {
					this.goodsDetail.names.forEach((nameItem) => {
						nameItem.values.some((tag) => {
							if (this.goodsDetail.map[skuValueCodeItem].valueCodes.split(',').includes(tag.valueCode)) {
								this.handleClickSkuItem(nameItem.nameCode, tag)
								return true
							}
							return false
						})
					})
				}
			})
		},
		handleClickSkuItem(nameCode, tagItem) {
			if (tagItem.ifEnable) return
			const { goodsDetail, selectedAttr } = resolveGoodsDetailTagsSituation(this.goodsDetail, this.selectedAttr, nameCode, tagItem)
			this.selectedAttr = selectedAttr
			this.goodsDetail = goodsDetail
			this.selectedSku = Object.values(this.goodsDetail.map).find((skuItem) => skuItem.valueCodes.split(',').every((nameCodeItem) => Object.values(this.selectedAttr).includes(nameCodeItem))) || {}
		},

		handleNumSub() {
			if (this.number > 1) {
				this.number = this.number - 1
			} else {
				uni.showToast({
					title: '亲！至少一件哦！',
					icon: 'none'
				})
			}
		},
		handleNumAdd() {
			if (this.number < this.selectedSku.stockNumber) {
				this.number = this.number + 1
			} else {
				uni.showToast({
					title: '库存不足！',
					icon: 'none'
				})
			}
		},

		// 拼团下单
		getGroupSettlement(type) {
			if (!this.selectedSku.skuId) return this.$showToast('请选择商品')
			if (this.selectedSku.ifEnable) return this.$showToast('该商品不可售')
			if (this.selectedSku.stockNumber < 1) return this.$showToast('该商品库存不足')
			if (this.selectedSku.stockNumber && (this.number > this.selectedSku.stockNumber)) return this.$showToast('已超出最大数量限制')
			uni.removeStorageSync(T_SKU_ITEM_DTO_LIST)
			uni.setStorageSync(T_SKU_ITEM_LIST, {
				collageId: this.collageId,
				number: this.number,
				productId: this.productId,
				shopId: this.shopId,
				skuId: this.selectedSku.skuId,
				shopGroupWorkId: this.shopGroupWorkId,
				type
			})
			this.isShowDetails = false
			uni.navigateTo({
				url: '/another-tf/another-serve/orderConfirm/index?type=3'
			})
		},

		goInvitePoster() {
			uni.navigateTo({
				url: '/another-tf/another-serve/invitePoster/index?data=' + JSON.stringify({
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
				})
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
