<template>
	<view class="data-statistics-container">
		<JHeader :dark="false" title="数据统计" width="50" height="50"></JHeader>
		<view style="width: 100%;height: 166rpx;background-color: #ff611b;"></view>
		<view style="margin-top: -100rpx;padding-bottom: 80rpx;">
			<view
				style="margin: 0 30rpx 40rpx;padding: 0 30rpx 34rpx;background-color: #ffffff;color: #666666;font-size: 24rpx;border-radius: 16rpx;"
			>
				<view style="display: flex;align-items: center;">
					<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
							<view style="margin-left: 8rpx;">累计营业额</view>
						</view>
						<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							{{ typeof financialData.turnover === 'number' ? financialData.turnover : '--' }}
						</view>
					</view>
					<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
						<view style="display: flex;align-items: center;">
							<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
							<view style="margin-left: 8rpx;">订单总量</view>
						</view>
						<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							{{ typeof financialData.orderTotal === 'number' ? financialData.orderTotal : '--' }}
						</view>
					</view>
				</view>
			</view>

			<view style="margin-bottom: 40rpx;">
				<view style="display: flex;align-items: center;margin-bottom: 16rpx;padding: 0 30rpx;">
					<view style="font-weight: bold;" @click="flowDropdownShow = !flowDropdownShow">流水统计</view>
					<view>
						<tui-dropdown-list
							:show="flowDropdownShow" :top="55" background-color="#ffffff"
							@close="flowDropdownShow = false"
						>
							<template #selectionbox>
								<view
									style="height: auto;padding: 10rpx 16rpx;color: #222229;background-color: #eeeeee;border-radius: 8rpx;"
									@click="flowDropdownShow = !flowDropdownShow"
								>
									<text v-if="flowDropdownName" style="margin-right: 10rpx;font-size: 26rpx;">{{ flowDropdownName || '' }}</text>
									<tui-icon :name="flowDropdownShow ? 'turningup' : 'turningdown'" :size="14" color="#606060" margin="00"></tui-icon>
								</view>
							</template>
							<template #dropdownbox>
								<view style="width: fit-content;box-sizing: border-box;">
									<tui-list-view
										color="#777" margin-top="2rpx"
										style="width: fit-content;min-width: 342rpx;max-height: 38vh;overflow-y: auto;"
									>
										<tui-list-cell
											v-for="item in [{ name: '全部', value: '0' }, { name: '通联支付统计', value: '4' }, { name: '平台余额支付统计', value: '5' }, { name: '佣金支付统计', value: '7' }, { name: '交易金支付统计', value: '8' }, { name: '惠市宝支付统计', value: '9' }, { name: '代金券抵扣支付统计', value: '11' }, { name: '商家代金券抵扣支付统计', value: '12' }]"
											:key="item.name" padding="20rpx 0" color="#666666"
											style="text-align: center;"
											@click="handleFlowDropdownSelect(item)"
										>
											{{ item.name }}
										</tui-list-cell>
									</tui-list-view>
								</view>
							</template>
						</tui-dropdown-list>
					</view>
				</view>
				<view
					style="margin: 0 30rpx;padding: 0 0 18rpx;background-color: #ffffff;color: #666666;font-size: 24rpx;border-radius: 16rpx;"
				>
					<view style="margin-bottom: 20rpx;" class="middle-tabs">
						<tui-tabs
							style="width: 690rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="66" :padding="30"
							item-width="230rpx" selected-color="#333333" bold slider-bg-color="#ff611b"
							background-color="transparent"
							:tabs="[{ name: '今日' }, { name: '本月' }, { name: '本年' }]"
							:current-tab="currentFlowTab"
							@change="(e) => ((currentFlowTab = e.index) || true) && (flowQuery.timeType = e.index + 1) && getFlowStatistics()"
						></tui-tabs>
					</view>
					<view style="display: flex;align-items: center;">
						<view style="flex:1;width: 0;padding: 26rpx 0 0 32rpx;">
							<view style="display: flex;align-items: center;">
								<view style="width: 6rpx;height: 16rpx;background-color: #fa6d2c;"></view>
								<view style="margin-left: 8rpx;">流水收入</view>
							</view>
							<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof flowStatistics.income === 'number' ? flowStatistics.income : '--' }}
							</view>
						</view>
						<view style="flex:1;width: 0;padding: 26rpx 0 0 32rpx;">
							<view style="display: flex;align-items: center;">
								<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
								<view style="margin-left: 8rpx;">提现流水</view>
							</view>
							<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof flowStatistics.withdrawalTotal === 'number' ? flowStatistics.withdrawalTotal : '--' }}
							</view>
						</view>
						<view style="flex:1;width: 0;padding: 26rpx 0 0 32rpx;">
							<view style="display: flex;align-items: center;">
								<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
								<view style="margin-left: 8rpx;">订单量</view>
							</view>
							<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
								{{ typeof flowStatistics.orderTotal === 'number' ? flowStatistics.orderTotal : '--' }}
							</view>
						</view>
					</view>
					<view v-if="isShowFlowOrder" style="position: relative;">
						<scroll-view scroll-y style="max-height: 80vh;" @scrolltolower="handleScrolltolower">
							<view>
								<view v-if="flowOrderList && flowOrderList.length">
									<view
										v-for="item in flowOrderList" :key="item.id"
										style="margin: 20rpx 26rpx;padding: 26rpx 20rpx 0;font-size: 28rpx;color: #000000;background-color: #f5f5f5;border-radius: 8rpx;"
									>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">订单编号</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.orderFormid || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">订单金额</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.price }}元</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">订单状态</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ orderTypeEnum[item.state] || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">支付方式</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ paymentModeEnum[item.paymentMode] || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">创建时间</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.createTime || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">支付时间</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.paymentTime || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">下单人姓名</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.customerName || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">下单人手机号</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.customerPhone || '--' }}</view>
										</view>
										<view v-if="item.remark" style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">订单备注</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.remark }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">总赠送代金券</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.presenterVoucher || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">商家补贴代金券</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.shopVoucherPrice || '--' }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;color: #939393">平台补贴代金券</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;">{{ item.platformVoucherPrice || '--' }}</view>
										</view>
									</view>
								</view>
								<view style="padding-bottom: 45rpx;">
									<LoadingMore
										:status="!isEmpty && !flowOrderList.length
											? 'loading' : !isEmpty && flowOrderList.length && (flowOrderList.length >= flowOrderTotal) ? 'no-more' : ''"
									>
									</LoadingMore>
									<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无订单数据~</tui-no-data>
								</view>
							</view>
						</scroll-view>
						<view style="margin-top: 14rpx;position: sticky;bottom: 2rpx;z-index: 1;background-color: #ffffff;">
							<tui-button
								type="warning" width="168rpx" height="52rpx" margin="0 auto"
								plain link :size="26"
								@click="isShowFlowOrder = false"
							>
								<view style="display: flex;align-items: center;line-height: 1;">
									<text>收起</text>
									<tui-icon name="up" color="#ea5c1e" :size="24" unit="rpx" margin="0 0 0 14rpx"></tui-icon>
								</view>
							</tui-button>
						</view>
					</view>
					<view v-else style="margin-top: 14rpx;">
						<tui-button
							type="warning" width="168rpx" height="52rpx" margin="0 auto"
							plain link :size="26"
							@click="(isShowFlowOrder = true) && !isEmpty && !flowOrderList.length && getFlowOrderList()"
						>
							<view style="display: flex;align-items: center;line-height: 1;">
								<text>展开</text>
								<tui-icon name="down" color="#ea5c1e" :size="24" unit="rpx" margin="0 0 0 14rpx"></tui-icon>
							</view>
						</tui-button>
					</view>
				</view>
			</view>

			<view style="padding: 0 30rpx;">
				<view style="margin-bottom: 40rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 16rpx;">
						<view style="font-weight: bold;">会员统计</view>
						<tui-button
							type="warning" plain width="122rpx" height="44rpx"
							link :size="24"
							@click="go('/another-tf/another-shop/shop-overview/membership-list')"
						>
							会员列表
						</tui-button>
					</view>
					<view style="padding: 0 0 34rpx;background-color: #ffffff;color: #666666;font-size: 24rpx;border-radius: 16rpx;">
						<view style="display: flex;align-items: center;">
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
									<view style="margin-left: 8rpx;">会员总数</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof membershipStatistics.memberTotal === 'number' ? membershipStatistics.memberTotal : '--' }}
								</view>
							</view>
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
									<view style="margin-left: 8rpx;">今日会员总数</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof membershipStatistics.todayMemberTotal === 'number' ? membershipStatistics.todayMemberTotal : '--' }}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-bottom: 40rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 16rpx;">
						<view>
							<tui-dropdown-list
								:show="tradeDropdownShow" :top="55" background-color="#ffffff"
								@close="tradeDropdownShow = false"
							>
								<template #selectionbox>
									<view
										style="height: auto;padding: 10rpx 16rpx;color: #222229;background-color: #eeeeee;border-radius: 8rpx;"
										@click="tradeDropdownShow = !tradeDropdownShow"
									>
										<text style="font-weight: bold;">{{ tradeDropdownName || '' }}</text>
										<tui-icon :name="tradeDropdownShow ? 'turningup' : 'turningdown'" :size="14" color="#606060" margin="0 0 0 14rpx"></tui-icon>
									</view>
								</template>
								<template #dropdownbox>
									<view style="width: fit-content;box-sizing: border-box;">
										<tui-list-view
											color="#777" margin-top="2rpx"
											style="width: fit-content;min-width: 342rpx;max-height: 38vh;overflow-y: auto;"
										>
											<tui-list-cell
												v-for="item in [{ name: '营业统计', value: '0' }, { name: '通联支付统计', value: '4' }, { name: '平台余额支付统计', value: '5' }, { name: '佣金支付统计', value: '7' }, { name: '消费金支付统计', value: '8' }, { name: '惠市宝支付统计', value: '9' }, { name: '代金券抵扣支付统计', value: '11' }, { name: '商家代金券抵扣支付统计', value: '12' }]"
												:key="item.name" padding="20rpx 0" color="#666666"
												style="text-align: center;"
												@click="(tradeQuery.paymentMode !== item.value) && (((tradeQuery.paymentMode = item.value) && (tradeDropdownName = item.name) && (tradeDropdownShow = false)) || getTradeStatistics())"
											>
												{{ item.name }}
											</tui-list-cell>
										</tui-list-view>
									</view>
								</template>
							</tui-dropdown-list>
						</view>
						<view style="display: flex;align-items: center;color: #222229;">
							<view style="padding: 10rpx;background-color: #ffffff;font-size: 28rpx;" @click="handleSelectTimeType">
								<text v-if="tradeQuery.timeType === 1">日</text>
								<text v-else-if="tradeQuery.timeType === 2">月</text>
								<text v-else-if="tradeQuery.timeType === 3">年</text>
							</view>
							<view
								style="margin-left: 6rpx;padding: 10rpx 16rpx;background-color: #ffffff;"
								:class="{ 'date-time-hide': tradeQuery.timeType === 3 }"
							>
								<view @click="$refs.dateTimeFinance.show()">
									<tui-icon name="calendar" :size="14" color="#222229"></tui-icon>
									<text style="margin-left: 10rpx;font-size: 26rpx;">{{ tradeQuery.dateStr || '选择日期' }}</text>
								</view>
								<tui-datetime
									ref="dateTimeFinance" :type="tradeQuery.timeType === 3 ? 3 : tradeQuery.timeType + 1"
									radius :end-year="new Date().getFullYear()"
									@confirm="handleConfirmTime"
								></tui-datetime>
							</view>
						</view>
					</view>
					<view style="padding: 0 0 34rpx;background-color: #ffffff;color: #666666;font-size: 24rpx;border-radius: 16rpx;">
						<view style="display: flex;align-items: center;">
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
									<view style="margin-left: 8rpx;">累计营业额</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.turnoverTotal === 'number' ? tradeStatistics.turnoverTotal : '--' }}
								</view>
							</view>
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
									<view style="margin-left: 8rpx;">累计订单数</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.orderTotal === 'number' ? tradeStatistics.orderTotal : '--' }}
								</view>
							</view>
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
									<view style="margin-left: 8rpx;">累计实收金额</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.netReceipts === 'number' ? tradeStatistics.netReceipts : '--' }}
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #fa6d2c;"></view>
									<view style="margin-left: 8rpx;">累计未核销金额</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.didNotWrite === 'number' ? tradeStatistics.didNotWrite : '--' }}
								</view>
							</view>
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
									<view style="margin-left: 8rpx;">累计提现中的金额</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.withdrawingIn === 'number' ? tradeStatistics.withdrawingIn : '--' }}
								</view>
							</view>
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #fa6d2c;"></view>
									<view style="margin-left: 8rpx;">总赠送代金券</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.orderVoucher === 'number' ? tradeStatistics.orderVoucher : '--' }}
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
									<view style="margin-left: 8rpx;">消费人数</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.consumptionTotal === 'number' ? tradeStatistics.consumptionTotal : '--' }}
								</view>
							</view>
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #fa6d2c;"></view>
									<view style="margin-left: 8rpx;">退款金额</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.refundAmount === 'number' ? tradeStatistics.refundAmount : '--' }}
								</view>
							</view>
							<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
								<view style="display: flex;align-items: center;">
									<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
									<view style="margin-left: 8rpx;">退款订单数</view>
								</view>
								<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{ typeof tradeStatistics.refundOrderNum === 'number' ? tradeStatistics.refundOrderNum : '--' }}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-bottom: 40rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 16rpx;">
						<view style="font-weight: bold;">盈亏红线</view>
						<tui-button
							type="warning" plain width="122rpx" height="44rpx"
							link :size="24"
							@click="go('/another-tf/another-shop/shop-overview/lunation-line')"
						>
							设置盈亏线
						</tui-button>
					</view>
					<view style="padding: 40rpx 0;background-color: #ffffff;color: #666666;font-size: 24rpx;border-radius: 16rpx;">
						<view style="display: flex;align-items: center;">
							<view v-if="lunationStatistics.profitAndLossPrice" style="position: relative;margin-left: 24rpx;width: 200rpx;height: 200rpx;">
								<view
									style="position: absolute;z-index: 1;top: 50%;left: 50%;display: flex;justify-content: center;align-items: center;flex-direction: column;width: 172rpx;height: 172rpx;background-color: #ffffff;border-radius: 50%;transform: translate(-50%, -50%);"
								>
									<view style="margin-bottom: 12rpx;color: #ef530e;font-size: 38rpx;font-weight: bold;">
										{{ `${Number.parseFloat((lunationStatistics.profitAndLossPrice - lunationStatistics.differPrice) / lunationStatistics.profitAndLossPrice).toFixed(2) * 100}%` }}
									</view>
									<view style="font-size: 22rpx;">达成率</view>
								</view>
								<tui-charts-pie ref="refLunationPie" title="盈亏" :diam="200" :legend="{ show: false }"></tui-charts-pie>
							</view>
							<view style="flex:1;width: 0;display: flex;align-items: center;">
								<view style="flex:1;width: 0;padding: 0 0 0 32rpx;">
									<view style="margin-left: 8rpx;">盈亏平衡点（元）</view>
									<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
										{{ typeof lunationStatistics.profitAndLossPrice === 'number' ? lunationStatistics.profitAndLossPrice : '--' }}
									</view>
								</view>
								<view style="flex:1;width: 0;padding: 0 0 0 32rpx;">
									<view style="display: flex;align-items: center;">
										<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
										<view style="margin-left: 8rpx;">离盈利还差数额</view>
									</view>
									<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
										{{ typeof lunationStatistics.differPrice === 'number' ? lunationStatistics.differPrice : '--' }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- <view>
				<view style="padding: 0 30rpx;font-weight: bold;">消费金统计</view>
				<view style="margin-bottom: 20rpx;padding: 0 30rpx;" class="bottom-tabs">
				<tui-tabs
				style="width: 690rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="138" :padding="30"
				item-width="138rpx" selected-color="#333333" bold slider-bg-color="#cccccc"
				background-color="transparent"
				:tabs="[{ name: '普通订单' }, { name: '消费金' }, { name: '代金券' }, { name: '余额' }, { name: '佣金' }]"
				:current-tab="activeModeTab"
				@change="(e) => ((activeModeTab = e.index) || true) && (queryInfo.paymentMode = e.index + 1) && getFinanceStatistics()"
				></tui-tabs>
				</view>
				<view
				style="margin: 0 30rpx;padding: 0 0 34rpx;background-color: #ffffff;color: #666666;font-size: 24rpx;border-radius: 16rpx;"
				>
				<view style="display: flex;align-items: center;">
				<view style="flex:1;padding: 34rpx 0 0 32rpx;">
				<view style="display: flex;align-items: center;">
				<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
				<view style="margin-left: 8rpx;">营业额消费金</view>
				</view>
				<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;">
				{{ typeof financeStatisticsData.beeTurnover === 'number' ? financeStatisticsData.beeTurnover : '--' }}
				</view>
				</view>
				<view style="flex:1;padding: 34rpx 0 0 32rpx;">
				<view style="display: flex;align-items: center;">
				<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
				<view style="margin-left: 8rpx;">可提现消费金</view>
				</view>
				<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;">
				{{ typeof financeStatisticsData.beeWithdrawal === 'number' ? financeStatisticsData.beeWithdrawal : '--' }}
				</view>
				</view>
				</view>
				<view style="display: flex;align-items: center;">
				<view style="flex:1;padding: 34rpx 0 0 32rpx;">
				<view style="display: flex;align-items: center;">
				<view style="width: 6rpx;height: 16rpx;background-color: #fa6d2c;"></view>
				<view style="margin-left: 8rpx;">待到账消费金</view>
				</view>
				<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;">
				{{ typeof financeStatisticsData.beeFreeze === 'number' ? financeStatisticsData.beeFreeze : '--' }}
				</view>
				</view>
				<view style="flex:1;padding: 34rpx 0 0 32rpx;">
				<view style="display: flex;align-items: center;">
				<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
				<view style="margin-left: 8rpx;">消费金提现比例</view>
				</view>
				<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;">
				{{ typeof financeStatisticsData.beeCoinRatio === 'number' ? financeStatisticsData.beeCoinRatio : '--' }}
				</view>
				</view>
				</view>
				</view>
				</view> -->

		</view>
	</view>
</template>

<script>
import { orderTypeEnum } from '../../../components/ATFOrderInfo/config'
import { paymentModeEnum } from '../../../utils/payUtil'
import { getShopFinanceCountDataApi, getShopTotalFinanceCountApi, getShopOrderListApi, getAllShopMemberApi, getShopBusinessDataApi, getShopProfitAndLossApi, getShopFinanceCountApi } from '../../../api/anotherTFInterface'

export default {
	name: 'DataStatistics',
	data() {
		return {
			// 统计数据
			financialData: {
				turnover: 0, // 累计营业额
				orderTotal: 0 // 订单总量
			},
			// 流水统计
			orderTypeEnum,
			paymentModeEnum,
			flowDropdownShow: false,
			flowDropdownName: '',
			currentFlowTab: 0,
			flowQuery: {
				timeType: 1, // 时间条件：1-今日 2-今月 3-今年
				paymentMode: '0', // 订单支付方式
				page: 1,
				pageSize: 10
			},
			flowStatistics: {
				income: 0, // 收入
				withdrawalTotal: 0, // 提现
				orderTotal: 0 // 订单
			},
			isShowFlowOrder: false,
			isEmpty: false,
			flowOrderList: [
				// {
				// 	orderFormid: '', // 订单编号
				// 	price: '', // 订单金额
				// 	state: '', // 订单状态
				// 	paymentMode: '', // 订单支付方式
				// 	createTime: '', // 创建时间
				// 	paymentTime: '', // 支付时间
				// 	customerName: '', // 下单人姓名
				// 	customerPhone: '', // 下单人手机号
				// 	remark: '', // 订单备注
				// 	presenterVoucher: '', // 总赠送代金券
				// 	shopVoucherPrice: '', // 商家补贴代金券
				// 	platformVoucherPrice: '' // 平台补贴代金券
				// }
			],
			flowOrderTotal: 0,
			// 会员统计
			membershipStatistics: {
				memberTotal: 0, // 会员总数
				todayMemberTotal: 0 // 今日会员总数
			},
			// 营业统计
			tradeDropdownShow: false,
			tradeDropdownName: '营业统计',
			tradeQuery: {
				timeType: 2,
				dateStr: `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
				paymentMode: '0'
			},
			tradeStatistics: {
				turnoverTotal: 0, // 累计营业额
				orderTotal: 0, // 累计订单数
				netReceipts: 0, // 累计实收金额
				didNotWrite: 0, // 累计未核销金额
				withdrawingIn: 0, // 累计提现中的金额
				orderVoucher: 0, // 总赠送代金券
				consumptionTotal: 0, // 消费人数
				refundAmount: 0, // 退款金额
				refundOrderNum: 0 // 退款订单数
			},
			// 盈亏红线
			lunationStatistics: {
				profitAndLossPrice: 0, // 盈利平衡点
				differPrice: 0 // 盈利差
			},

			// 消费金统计
			financeStatisticsData: {
				turnover: '',
				frozenMoney: '',
				alreadyArrived: '',
				withdrawableMoney: '',
				withdrawableStayMoney: '',
				presenterVoucher: '',
				beeWithdrawal: '',
				beeFreeze: '',
				beeTurnover: '',
				beeCoinRatio: '',
				finances: []
			},
			queryInfo: {
				paymentMode: 1,
				condition: 2,
				time: ''
			},
			activeModeTab: 0
		}
	},

	onShow() {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.getData()
			}
		})
	},

	methods: {
		getData() {
			uni.showLoading()
			getShopFinanceCountDataApi()
				.then((res) => {
					this.financialData = res.data
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
			this.getFlowStatistics()
			getAllShopMemberApi()
				.then((res) => {
					this.membershipStatistics = res.data
				})
			this.getTradeStatistics()
			getShopProfitAndLossApi()
				.then((res) => {
					this.lunationStatistics = res.data
					this.$nextTick(() => {
						this.$refs.refLunationPie && this.$refs.refLunationPie.draw([
							{
								value: this.lunationStatistics.profitAndLossPrice - this.lunationStatistics.differPrice,
								color: '#ff6a27',
								name: '盈利平衡点-盈利差'
							},
							{
								value: this.lunationStatistics.differPrice,
								color: '#ffdccc',
								name: '盈利差'
							}
						])
					})
				})
			// this.getFinanceStatistics()
		},

		handleFlowDropdownSelect(item) {
			if (this.flowQuery.paymentMode !== item.value) {
				this.flowQuery.paymentMode = item.value
				if (item.value === '0') {
					this.flowDropdownName = ''
				} else {
					this.flowDropdownName = item.name
				}
				this.flowDropdownShow = false
				this.getFlowStatistics()
			}
		},
		getFlowStatistics() {
			uni.showLoading()
			getShopTotalFinanceCountApi({
				timeType: this.flowQuery.timeType,
				paymentMode: this.flowQuery.paymentMode
			})
				.then((res) => {
					this.flowStatistics = res.data
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
			if (this.isShowFlowOrder) this.getFlowOrderList()
		},
		getFlowOrderList(isLoadmore) {
			uni.showLoading()
			getShopOrderListApi(this.flowQuery).then((res) => {
				this.flowOrderTotal = res.data.total
				if (isLoadmore) {
					this.flowOrderList.push(...res.data.list)
				} else {
					this.flowOrderList = res.data.list
				}
				this.isEmpty = this.flowOrderList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleScrolltolower() {
			if (this.flowOrderList.length < this.flowOrderTotal) {
				++this.flowQuery.page
				this.getFlowOrderList(true)
			}
		},

		handleSelectTimeType() {
			uni.showActionSheet({
				title: '* 请选择时间条件 *',
				itemList: ['日', '月', '年'],
				itemColor: '#2c3e50',
				success: (result) => {
					this.tradeQuery.timeType = result.tapIndex + 1
					if (this.tradeQuery.timeType === 1) {
						this.tradeQuery.dateStr = `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
					} else if (this.tradeQuery.timeType === 2) {
						this.tradeQuery.dateStr = `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
					} else if (this.tradeQuery.timeType === 3) {
						this.tradeQuery.dateStr = `${String(new Date().getFullYear())}`
					}
					this.getTradeStatistics()
				}
			})
		},
		handleConfirmTime(e) {
			console.log(e)
			if (this.tradeQuery.timeType === 3) {
				this.tradeQuery.dateStr = e.result.substring(0, 4)
			} else {
				this.tradeQuery.dateStr = e.result
			}
			this.getTradeStatistics()
		},
		getTradeStatistics() {
			uni.showLoading()
			getShopBusinessDataApi({ ...this.tradeQuery })
				.then((res) => {
					this.tradeStatistics = res.data
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		getFinanceStatistics() {
			uni.showLoading()
			getShopFinanceCountApi({ ...this.queryInfo })
				.then((res) => {
					this.financeStatisticsData = res.data
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.data-statistics-container {
	box-sizing: border-box;
	min-height: 100vh;
	background-color: #f1f1f1;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #ff611b;
	}

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: 2rpx;
		box-shadow: 0px 10px 24px 0px rgba(63, 63, 63, 0.2);
	}

	.date-time-hide {
		/deep/ .tui-datetime-picker {
			.uni-picker-view-wrapper {
				uni-picker-view-column {
					&:nth-child(2) {
						display: none;
					}
				}
			}
		}
	}

	.middle-tabs {
		.tui-tabs-view {
			/deep/ .tui-tabs-slider {
				margin-left: -30rpx;
			}
		}
	}

	.bottom-tabs {
		.tui-tabs-view {
			/deep/ .tui-tabs-slider {
				margin-left: -30rpx;
			}
		}
	}
}
</style>

