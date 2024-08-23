<!-- 退货/退款填写物流信息 -->
<template>
	<view class="add-logistics-container">
		<JHeader title="填写退货物流" width="50" height="50"></JHeader>
		<view class="content">
			<view class="afterSale-select-box mt20">
				<view class="item" @click="openWaySelect">
					<view class="l">物流公司</view>
					<view class="r-box">
						<text>{{ SendReturnQuery.logisticsName }}</text>
						<tui-icon name="arrowright" :size="24" unit="rpx" color="#999999" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</view>

				<view class="item item-start">
					<view class="l">物流编号：</view>
					<view class="r-box r-box2">
						<input
							v-model="SendReturnQuery.logisticsNum" maxlength="20" type="text" placeholder-class="fs28"
							placeholder="请填写" class="r-box-input"
						></input>
					</view>
				</view>
			</view>
			<view class="afterSale-select-box mt20">
				<view class="item item-start">
					<view class="l">退款说明：</view>
					<view class="r-box r-box2">
						<input
							v-model="SendReturnQuery.returnGoodsDesc" maxlength="200" type="text" placeholder-class="fs28"
							placeholder="选填" class="r-box-input"
						></input>
					</view>
				</view>
			</view>

			<view class="afterSale-select-box mt20">
				<view class="upload-title">上传凭证</view>
				<view class="mar-left-10 mar-top-10 evaluateImg">
					<ATFMoreUpload :imgs="fileList" @upload="handleSaveImg" @delete="handleDeleteImg"></ATFMoreUpload>
				</view>
			</view>
		</view>

		<view class="order-confirm-box">
			<text class="btn" @click="subimtTap">提交</text>
		</view>
		<!-- 物流公司 -->
		<view>
			<tui-picker
				:show="logisticsTagShowFalg" :picker-data="companyList" @hide="logisticsTagShowFalg = false"
				@change="change"
			>
			</tui-picker>
		</view>
	</view>
</template>

<script>
import { getExpressSelectShippingCompanyApi, updateSendGoodsReturnExpressApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AddLogistics',
	data() {
		return {
			item: {},
			shippinglist: [],
			shippingCompanyNamelist: [],
			shippingCompanyName: '',
			shippingitem: '',
			SendReturnQuery: {
				'goodsReturnId': 0,
				'logisticsId': 0,
				'logisticsName': '',
				'logisticsNum': '',
				'returnGoodsDesc': '',
				'returnImgs': '',
				'shipperCode': ''
			},
			commentImgs: '',
			fileList: [],
			companyList: [],
			logisticsTagShowFalg: false
		}
	},
	onLoad(options) {
		this.item = {
			orderId: options.orderId,
			afterId: options.afterId
		}
		this.getShippingCompany()
	},
	methods: {
		getShippingCompany() {
			getExpressSelectShippingCompanyApi({}).then((res) => {
				this.shippinglist = res.data
				this.shippinglist.forEach((el) => {
					this.companyList.push({ text: el.dictName, value: String(el.dictId) })
				})
			})
		},
		handleSaveImg(imgUrl) {
			this.fileList.push(imgUrl)
			this.$forceUpdate()
		},
		handleDeleteImg(imgUrl) {
			this.fileList.splice(this.fileList.findIndex((item) => item === imgUrl), 1)
			this.$forceUpdate()
		},
		subimtTap() {
			if (this.fileList.length) {
				for (let i = 0; i < this.fileList.length; i++) {
					this.commentImgs += this.fileList[i] + ','
				}
			}
			this.getSendReturnGoods()
		},
		getSendReturnGoods() {
			uni.showLoading({
				mask: true,
				url: '物流信息提交中...'
			})
			updateSendGoodsReturnExpressApi({
				orderId: this.item.orderId,
				afterId: this.item.afterId,
				express: this.SendReturnQuery.logisticsId,
				deliverFormid: this.SendReturnQuery.logisticsNum,
				reason: this.SendReturnQuery.returnGoodsDesc,
				image: this.commentImgs
			}).then((res) => {
				uni.hideLoading()
				if (res.code == 200) {
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					})
					uni.navigateTo({
						url: `/another-tf/another-serve/afterSale/index`
					})
				}
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		openWaySelect() {
			this.logisticsTagShowFalg = true
		},
		change(e) {
			this.SendReturnQuery.logisticsId = this.SendReturnQuery.shipperCode = e.value
			this.SendReturnQuery.logisticsName = e.text
		}
	}
}
</script>

<style lang="less" scoped>
.add-logistics-container {
	background-color: #F7F7F7;
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
}

.content {
	padding: 0 0 120rpx;
	box-sizing: border-box;
}

.afterSale-select-box {
	width: 100%;
	background: #fff;
	padding: 0 30rpx;
	box-sizing: border-box;
}

.afterSale-select-box .item {
	height: 100rpx;
	border-bottom: 1px solid #e5e5e5;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-size: 28rpx;
	color: #333;
}

.afterSale-select-box .item:last-of-type {
	border-bottom: none;
}

.afterSale-select-box .item.item-start {
	justify-content: flex-start;
}

.afterSale-select-box .item .l {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.afterSale-select-box .item .r-box {
	display: flex;
	flex-direction: row;
	align-items: center;
	color: #999;
}

.afterSale-select-box .item .r-box2 {
	width: 100%;
	flex: 1;
}

.mt20 {
	margin-top: 20rpx;
}

.r-box-input {
	text-align: left;
	flex: 1;
	z-index: 0;
}

.upload-title {
	font-size: 28rpx;
	color: #333;
	padding: 30rpx 0;
}

.order-confirm-box {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 120rpx;
	background: #fff;
	box-shadow: 0px 0px 10px 0px rgba(87, 69, 9, 0.3);
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.order-confirm-box .btn {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	background: #333333;
	font-size: 28rpx;
	color: #F5DEB2;
	text-align: center;
}
</style>
