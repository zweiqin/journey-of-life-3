<template>
	<view class="orders-container">
		<JHeader title="商家订单" width="50" height="50" style="padding: 24upx 0;background-color: #ffffff;">
			<template #ftFn>
				<view style="text-align: right;">
					<tui-button
						type="blue" width="220rpx" height="60rpx" margin="0 30upx 0 0"
						style="display: inline-block;border-radius: 30rpx;" @click="isShowVerificationCodeDialog = true"
					>
						订单核销 →
					</tui-button>
				</view>
			</template>
		</JHeader>

		<view class="navs">
			<view
				v-for="item in businessSubNavs" :key="item.value" class="nav-item"
				:class="{ 'nav-item-active': queryInfo.state === item.value }" @click="handleSwitchStatus(item.value)"
			>
				{{ item.label }}
			</view>
		</view>

		<view v-if="orderList && orderList.length" style="margin-top: 10px;">
			<view
				v-for="item in orderList" :key="item.id"
				style="padding: 30upx 40upx;margin: 0 30upx 24upx;font-size: 28upx;color: #222229;background-color: #ffffff;border-radius: 20upx;"
			>
				<view style="margin-left: -12upx;font-size: 28upx;font-weight: bold;">
					<text style="color: #e02208;">●</text>
					<text style="color: #222229;margin-left: 8upx;">商品信息</text>
				</view>
				<view>
					<view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view>
								<text>订单编号：</text>
								<text>{{ item.orderFormid || '--' }}</text>
							</view>
							<view>
								<text>{{ orderTypeEnum[item.state] || '--' }}</text>
							</view>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view>
								<text>用户手机号：</text>
								<text>{{ item.buyerPhone || '--' }}</text>
							</view>
							<view>
								<text v-if="item.paymentState">已支付</text>
								<text v-else>未支付</text>
							</view>
						</view>
						<view style="margin-top: 8upx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view>
									<text>收货人姓名：</text>
									<text>{{ item.receiveName || '--' }}</text>
								</view>
								<view>
									<text>手机号：</text>
									<text>{{ item.receivePhone || '--' }}</text>
								</view>
							</view>
							<view>
								<text>收货人地址：</text>
								<text>{{ item.receiveAdress || '--' }}</text>
							</view>
							<view>
								<text>详细地址：</text>
								<text>{{ item.address || '--' }}</text>
							</view>
						</view>
						<view v-if="item.logisticsName || item.deliverFormid" style="margin-top: 8upx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view>
									<text>物流方案名称：</text>
									<text>{{ item.logisticsName || '--' }}</text>
								</view>
								<view>
									<text>费用：</text>
									<text style="font-size: 32upx;color: #eb0909;">￥{{ item.logisticsPrice || '--' }}</text>
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view>
									<text>单号：</text>
									<text>{{ item.deliverFormid || '--' }}</text>
								</view>
								<view>
									<text>公司：</text>
									<text>{{ item.express || '--' }}</text>
								</view>
							</view>
						</view>
						<view
							style="padding: 12upx 0;margin-top: 12upx;border-top: 2upx solid #eeeeee;border-bottom: 2upx solid #eeeeee;"
						>
							<ATFOrderSkus :data="item.products"></ATFOrderSkus>
							<view style="margin-top: 8upx;display: flex;justify-content: space-between;align-items: center;">
								<view>
									<text>商品总价：</text>
									<text style="font-size: 32upx;color: #eb0909;">￥{{ item.orderPrice }}</text>
								</view>
								<view>
									<text>支付金额：</text>
									<text style="font-size: 32upx;color: #eb0909;">￥{{ item.price }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding: 18upx 15upx 0;">
						<view style="display: flex;justify-content: space-between;">
							<text>下单时间：</text>
							<text>{{ item.createTime || '--' }}</text>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<text>支付时间：</text>
							<text>{{ item.paymentTime || '--' }}</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view>
								<text>下单账户：</text>
								<text>{{ item.customerName || '--' }}</text>
							</view>
							<view>
								<text>下单总数：</text>
								<text>{{ item.total || '--' }}</text>
							</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<text>下单备注：</text>
							<text>{{ item.remark || '--' }}</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<text>售后单号：</text>
							<text>{{ item.afterFormIds || '--' }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !orderList.length
					? 'loading' : !isEmpty && orderList.length && (orderList.length >= orderTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
		</view>

		<!-- 订单核销dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确认核销', color: '#586c94' }]"
			:show="isShowVerificationCodeDialog" title="订单核销" @click="handleVerificationDialog"
		>
			<template #content>
				<view>
					<tui-input v-model="verificationCode" padding="26upx 0" label="核销码" placeholder="请填写核销码"></tui-input>
				</view>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { businessSubNavs } from '../../../pages/order/config'
import { orderTypeEnum } from '../../../components/ATFOrderInfo/config'
import { getShopOrderAllApi, updateSetHxCodeApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ShopOrders',
	data() {
		return {
			orderList: [],
			orderTotal: 0,
			isEmpty: false,
			queryInfo: {
				searchType: 1, // "搜索类型  1-订单ID 2-买家账户 3-收件人姓名 4-收件人手机号 5-商品ID"
				search: '',
				state: 0,
				afterState: '',
				dates: [],
				page: 1,
				pageSize: 10
			},
			businessSubNavs,
			orderTypeEnum,
			isShowVerificationCodeDialog: false,
			verificationCode: ''
		}
	},

	onLoad() {
		this.getOrderList()
	},
	// onShow() {
	// 	this.queryInfo.page = 1
	// 	this.getOrderList()
	// },

	methods: {
		// 获取订单信息
		getOrderList(isLoadmore) {
			uni.showLoading()
			getShopOrderAllApi({ ...this.queryInfo, state: this.queryInfo.state || '' })
				.then((res) => {
					this.orderTotal = res.data.total
					if (isLoadmore) {
						this.orderList.push(...res.data.list)
					} else {
						this.orderList = res.data.list
					}
					this.isEmpty = this.orderList.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		// 切换状态
		handleSwitchStatus(status) {
			this.queryInfo.state = status
			this.queryInfo.page = 1
			this.getOrderList()
		},

		async handleVerificationDialog(e) {
			console.log(e)
			if (e.index === 0) {
			} else if (e.index === 1) {
				if (!this.verificationCode) return this.$showToast('请填写核销码')
				await updateSetHxCodeApi({ orderId: this.verificationCode, noticeId: 0 })
					.then((res) => {
						this.$showToast('核销成功', 'success')
						this.queryInfo.page = 1
						this.getOrderList()
					})
			}
			this.verificationCode = ''
			this.isShowVerificationCodeDialog = false
		}
	},

	onReachBottom() {
		if (this.orderList.length < this.orderTotal) {
			++this.queryInfo.page
			this.getOrderList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.orders-container {
	font-size: 28upx;
	padding: 0 0 60upx;
	background-color: #f5f4f6;
	box-sizing: border-box;

	.navs {
		width: 100%;
		display: flex;
		margin: 18upx 0 0;
		padding: 0 8upx;
		white-space: nowrap;
		overflow-x: auto;

		.nav-item {
			width: fit-content;
			padding: 0 26upx;
			transition: all 350ms;

			&.nav-item-active {
				color: #ff8f1f;
			}
		}
	}
}
</style>
