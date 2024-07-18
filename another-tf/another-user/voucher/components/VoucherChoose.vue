<template>
	<view class="voucher-choose-container">
		<view
			style="display: flex;align-items: center;justify-content: flex-end;background-color: #ffffff;"
			:style="{ padding: paddingIn, borderRadius: radius }" @click="isShowPopup = true"
		>
			<!-- <view style="font-size: 26rpx;color: #333333;">代金券种类</view> -->
			<view style="display: flex;align-items: center;">
				<view v-if="chosenVoucher && chosenVoucher.platformVoucherId" style="color: #C5AA7B;">
					<text>{{ chosenVoucher.voucherName || '--' }}</text>
				</view>
				<view v-else-if="!platformVoucherList || !platformVoucherList.length" style="font-size: 26rpx;color: #333333;">
					暂无可选
				</view>
				<view v-else style="font-size: 26rpx;color: #333333;">点击选择代金券种类</view>
				<tui-icon name="arrowright" :size="30" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
			</view>
		</view>
		<tui-bottom-popup :show="isShowPopup" @close="isShowPopup = false">
			<view>
				<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
					<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShowPopup = false"></tui-icon>
				</view>
				<view>
					<scroll-view scroll-y style="height: 900rpx;" @scrolltolower="handleScrolltolower">
						<view style="padding: 30rpx;">
							<view class="search-btn" style="display: flex;align-items: center;padding: 20rpx 0 12rpx;">
								<text style="font-size: 34rpx;">代金券名称</text>
								<view style="flex: 1;margin-left: 16rpx;">
									<tui-input
										v-model="queryInfo.voucherName" placeholder="根据代金券名称筛选" is-fillet
										padding="6rpx 10rpx 6rpx 26rpx" background-color="transparent"
									>
										<template #right>
											<tui-button
												type="warning" width="120rpx" height="50rpx" shape="circle"
												@click="(chosenVoucher = JSON.parse(JSON.stringify(chosenVoucherOrign))) &&
													((queryInfo.page = 1) && getAllPlatformVoucherList())"
											>
												搜索
											</tui-button>
										</template>
									</tui-input>
								</view>
							</view>

							<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 16rpx;">
								<view style="font-size: 34rpx;font-weight: bold;color: #333333;">选择代金券种类：</view>
								<view v-if="chosenVoucher.platformVoucherId" style="text-align: right;">
									<tui-radio-group
										:value="String(chosenVoucher.platformVoucherId)"
										@change="(e) => handleVoucherItemTap(JSON.parse(JSON.stringify(chosenVoucherOrign)))"
									>
										<tui-label>
											<tui-list-cell padding="0 16rpx">
												<view>
													<text style="padding-right: 10rpx;">取消选择</text>
													<tui-radio value="" color="#e98166" border-color="#999"></tui-radio>
												</view>
											</tui-list-cell>
										</tui-label>
									</tui-radio-group>
								</view>
							</view>
							<view v-if="platformVoucherList && platformVoucherList.length" style="margin-top: 10rpx;">
								<view
									v-for="(item, index) in platformVoucherList" :key="index"
									style="padding: 10rpx 30rpx 10rpx 40rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;"
									@click="handleVoucherItemTap(item)"
								>
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view>
											<view>{{ item.voucherName }}</view>
											<view style="font-size: 26rpx;color: #999999;">
												{{ item.desc || `创建于：${item.createTime || '--'}` }}
											</view>
										</view>
										<view style="display: flex;justify-content: space-between;align-items: center;">
											<view v-if="item.enabled" style="color: #dc362e;">停用</view>
											<tui-icon
												v-if="chosenVoucher.platformVoucherId === item.platformVoucherId" name="circle-fill" :size="40" unit="rpx"
												color="#c5aa7b" margin="0 0 0 10rpx"
											></tui-icon>
										</view>
									</view>
									<view style="display: flex;justify-content: space-between;align-items: center;font-size: 26rpx;">
										<view style="margin: 0 10rpx 0 0;">购买比例：{{ item.purchaseRatio }}：1</view>
										<view>抵扣比例：{{ item.paymentRatio }}：1</view>
									</view>
								</view>
							</view>
						</view>
						<view style="padding-bottom: 45rpx;">
							<LoadingMore
								:status="!isEmpty && !platformVoucherList.length
									? 'loading' : !isEmpty && platformVoucherList.length && (platformVoucherList.length >= platformVoucherTotal) ? 'no-more' : ''"
							>
							</LoadingMore>
							<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据</tui-no-data>
						</view>
					</scroll-view>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getAllPlatformVoucherApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'VoucherChoose',
	props: {
		margin: {
			type: String,
			default: '0'
		},
		padding: {
			type: String,
			default: '0'
		},
		paddingIn: {
			type: String,
			default: '28rpx 20rpx'
		},
		radius: {
			type: String,
			default: '0'
		}
	},
	data() {
		return {
			// 平台代金券列表
			isShowPopup: false,
			queryInfo: {
				voucherName: '',
				page: 1,
				pageSize: 20
			},
			isEmpty: false,
			platformVoucherList: [],
			platformVoucherTotal: 0,
			chosenVoucherOrign: { platformVoucherId: '', voucherCode: '', voucherName: '', desc: '', purchaseRatio: '', paymentRatio: '', enabled: '', operatorId: '', createTime: '', updateTime: '' },
			chosenVoucher: {
				platformVoucherId: '',
				voucherCode: '', // 代金券代码（唯一）
				voucherName: '', // 代金券名称
				desc: '', // 代金券描述
				purchaseRatio: '', // 代金券购买比例(与现金比例)
				paymentRatio: '', // 代金券抵扣比例(与现金比例)
				enabled: '', // 启停：0-为启用  1-为停用
				operatorId: '', // 平台操作者ID
				createTime: '',
				updateTime: ''
			}
		}
	},

	async created() {
		await this.getAllPlatformVoucherList()
		if (this.platformVoucherList && this.platformVoucherList.length) {
			this.handleVoucherItemTap(this.platformVoucherList[0])
		}
	},
	methods: {
		async getAllPlatformVoucherList(isLoadmore) {
			uni.showLoading()
			await getAllPlatformVoucherApi({ ...this.queryInfo })
				.then((res) => {
					this.platformVoucherTotal = res.data.total
					if (isLoadmore) {
						this.platformVoucherList.push(...res.data.list)
					} else {
						this.platformVoucherList = res.data.list
					}
					this.isEmpty = this.platformVoucherList.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		// 平台代金券选择
		handleVoucherItemTap(item) {
			if (this.chosenVoucher.platformVoucherId === item.platformVoucherId) return
			this.chosenVoucher = item
			this.isShowPopup = false
			this.$emit('change', {
				platformVoucherId: this.chosenVoucher.platformVoucherId,
				purchaseRatio: this.chosenVoucher.purchaseRatio
			})
		},
		handleScrolltolower() {
			if (this.platformVoucherList.length < this.platformVoucherTotal) {
				++this.queryInfo.page
				this.getAllPlatformVoucherList(true)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.voucher-choose-container {
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}
}
</style>
