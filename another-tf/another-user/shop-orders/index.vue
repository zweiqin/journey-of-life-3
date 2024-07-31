<template>
	<view class="orders-container">
		<JHeader title="商家订单" width="50" height="50" style="padding: 24rpx 0;background-color: #ffffff;">
			<template #ftFn>
				<text
					style="padding-right: 18rpx;font-size: 26rpx;color: #222229;"
					@click="isShowVerificationCodeDialog = true"
				>
					订单核销
				</text>
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
				v-for="(item, index) in orderList" :key="item.id"
				style="padding: 30rpx 40rpx;margin: 0 30rpx 24rpx;font-size: 24rpx;color: #222229;background-color: #ffffff;border-radius: 20rpx;"
			>
				<view>
					<view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-left: -12rpx;font-size: 28rpx;"
						>
							<view>
								<text style="color: #e02208;">●</text>
								<text style="margin-left: 8rpx;">订单编号：{{ item.orderFormid || '--' }}</text>
							</view>
							<view style="color: #EF530E;" @click="$copy(item.orderFormid)">复制</view>
						</view>
						<view style="padding-top: 18rpx;">
							<text style="color: #8F8F8F;">手机号码</text>
							<text style="margin-left: 32rpx;">{{ item.buyerPhone || '--' }}</text>
						</view>
						<view style="padding-top: 18rpx;">
							<text style="color: #8F8F8F;">下单时间</text>
							<text style="margin-left: 32rpx;">{{ item.createTime || '--' }}</text>
						</view>
						<view style="padding-top: 18rpx;display: flex;justify-content: space-between;align-items: center;">
							<view>
								<text style="color: #8F8F8F;">支付金额</text>
								<text style="margin-left: 32rpx;color: #EF530E;">￥{{ item.price }}</text>
							</view>
							<!-- <view style="margin-left: 32rpx;color: #EF530E;">
								<text v-if="item.paymentState">已支付</text>
								<text v-else>未支付</text>
								</view> -->
						</view>
						<view style="padding-top: 18rpx;">
							<text style="color: #8F8F8F;">订单状态</text>
							<text style="margin-left: 32rpx;color: #EF530E;">{{ orderTypeEnum[item.state] || '--' }}</text>
						</view>
						<view style="padding-top: 18rpx;">
							<text style="color: #8F8F8F;">扣除活动佣金</text>
							<text style="margin-left: 32rpx;color: #EF530E;">￥{{ item.activityPrice }}</text>
						</view>
						<view style="padding-top: 18rpx;">
							<text style="color: #8F8F8F;">备注</text>
							<text style="margin-left: 32rpx;word-break: break-all;">{{ item.remark || '--' }}</text>
						</view>
					</view>
					<view style="margin-top: 32rpx;">
						<view style="margin-left: -12rpx;font-size: 28rpx;">
							<text style="color: #e02208;">●</text>
							<text style="margin-left: 8rpx;">商品信息</text>
						</view>
						<ATFOrderSkus :data="item.products"></ATFOrderSkus>
					</view>
					<view style="margin-top: 16rpx;">
						<tui-collapse :index="index" :current="currentIndexMain" hd-bg-color="#ffffff" @click="changeCurrentMain">
							<template #title>
								<view style="margin-left: -12rpx;font-size: 28rpx;">
									<text style="color: #e02208;">●</text>
									<text style="margin-left: 8rpx;">其它信息</text>
								</view>
							</template>
							<template #content>
								<view>
									<view style="padding-top: 18rpx;display: flex;justify-content: space-between;align-items: center;">
										<view>
											<text style="color: #8F8F8F;">下单账户</text>
											<text style="margin-left: 32rpx;">{{ item.customerName || '--' }}</text>
										</view>
										<view>
											<text style="color: #8F8F8F;">下单总数</text>
											<text style="margin-left: 32rpx;">{{ item.total || '--' }}</text>
										</view>
									</view>
									<view>
										<view
											style="padding-top: 18rpx;display: flex;justify-content: space-between;align-items: center;"
										>
											<view style="padding-top: 18rpx;">
												<text style="color: #8F8F8F;">核销人和核销账号</text>
												<text style="margin-left: 32rpx;">{{ item.writePhone || '--' }}</text>
											</view>
											<view v-if="item.writePhone" style="color: #EF530E;" @click="$copy(item.writePhone)">复制</view>
										</view>
										<view style="padding-top: 18rpx;">
											<text style="color: #8F8F8F;">商品总价</text>
											<text style="margin-left: 32rpx;color: #EF530E;">￥{{ item.orderPrice }}</text>
										</view>
										<view v-if="!$store.state.auth.identityInfo.type.includes(8) && !$store.state.auth.identityInfo.type.includes(9)">
											<view style="padding-top: 18rpx;display: flex;justify-content: space-between;align-items: center;">
												<view>
													<text style="color: #8F8F8F;">收货人姓名</text>
													<text style="margin-left: 32rpx;">{{ item.receiveName || '--' }}</text>
												</view>
												<view>
													<text style="color: #8F8F8F;">手机号</text>
													<text style="margin-left: 32rpx;">{{ item.receivePhone || '--' }}</text>
												</view>
											</view>
											<view style="padding-top: 18rpx;">
												<text style="color: #8F8F8F;">收货人地址</text>
												<text style="margin-left: 32rpx;">{{ item.receiveAdress || '--' }}</text>
											</view>
											<view style="padding-top: 18rpx;">
												<text style="color: #8F8F8F;">详细地址</text>
												<text style="margin-left: 32rpx;">{{ item.address || '--' }}</text>
											</view>
										</view>
									</view>
									<view v-if="item.logisticsName || item.deliverFormid">
										<view style="padding-top: 18rpx;display: flex;justify-content: space-between;align-items: center;">
											<view>
												<text style="color: #8F8F8F;">物流方案名称</text>
												<text style="margin-left: 32rpx;">{{ item.logisticsName || '--' }}</text>
											</view>
											<view>
												<text style="color: #8F8F8F;">费用</text>
												<text style="margin-left: 32rpx;color: #eb0909;">￥{{ item.logisticsPrice || '--' }}</text>
											</view>
										</view>
										<view style="padding-top: 18rpx;display: flex;justify-content: space-between;align-items: center;">
											<view>
												<text style="color: #8F8F8F;">单号</text>
												<text style="margin-left: 32rpx;">{{ item.deliverFormid || '--' }}</text>
											</view>
											<view>
												<text style="color: #8F8F8F;">公司</text>
												<text style="margin-left: 32rpx;">{{ item.express || '--' }}</text>
											</view>
										</view>
									</view>
									<view style="padding-top: 18rpx;display: flex;justify-content: space-between;">
										<text style="color: #8F8F8F;">支付时间</text>
										<text style="margin-left: 32rpx;">{{ item.paymentTime || '--' }}</text>
									</view>
									<view style="padding-top: 18rpx;display: flex;justify-content: space-between;align-items: center;">
										<text style="color: #8F8F8F;">售后单号</text>
										<text style="margin-left: 32rpx;">{{ item.afterFormIds || '--' }}</text>
									</view>
								</view>
							</template>
						</tui-collapse>
					</view>

				</view>
			</view>
		</view>

		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !orderList.length
					? 'loading' : !isEmpty && orderList.length && (orderList.length >= orderTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
		</view>

		<!-- 订单核销dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确认核销', color: '#586c94' }]"
			:show="isShowVerificationCodeDialog" title="订单核销" @click="handleVerificationDialog"
		>
			<template #content>
				<view>
					<tui-input v-model="verificationCode" padding="26rpx 0" label="核销码" placeholder="请填写核销码"></tui-input>
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
			currentIndexMain: 0,
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
		},

		changeCurrentMain(e) {
			this.currentIndexMain = this.currentIndexMain == e.index ? -1 : e.index
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
	font-size: 28rpx;
	padding: 0 0 60rpx;
	background-color: #f5f4f6;
	box-sizing: border-box;

	.navs {
		width: 100%;
		display: flex;
		margin: 18rpx 0 0;
		padding: 0 8rpx;
		white-space: nowrap;
		overflow-x: auto;

		.nav-item {
			width: fit-content;
			padding: 0 26rpx;
			transition: all 350ms;

			&.nav-item-active {
				color: #ff8f1f;
			}
		}
	}
}
</style>
