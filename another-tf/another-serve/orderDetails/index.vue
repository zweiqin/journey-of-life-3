<template>
	<view class="order-details-container">
		<view v-if="showType === 'writeOff'">
			<!-- 核销相关 -->
			<JHeader title="订单核销码" width="50" height="50" style="padding: 24rpx 0 18rpx;background-color: #ffffff;"></JHeader>
			<view style="position: relative;padding: 90rpx 28rpx 0;" class="write-off-bg">
				<view style="position: absolute;top: 0;left: 0;width: 100%;height: 580rpx;background-color: #ef5613;overflow: hidden;">
					<view
						style="position: absolute;top: 6%;left: 34%;width: 80rpx;height: 80rpx;background: linear-gradient(141deg, #f27842 30%, #ef5a18 70%);border-radius: 50%;"
					>
					</view>
					<view
						style="position: absolute;top: 15%;left: -7%;width: 280rpx;height: 240rpx;background: linear-gradient(141deg, #f27842 30%, #ef5a18 70%);border-radius: 50%;"
					>
					</view>
					<view
						style="position: absolute;top: -8%;left: 50%;width: 800rpx;height: 920rpx;background-color: #f16527;border-radius: 50%;"
					>
					</view>
					<view
						style="position: absolute;top: -4%;left: 65%;width: 608rpx;height: 838rpx;background: linear-gradient(101deg, #FFFFFF 26%, rgba(255, 255, 255, 0.0001) 154%);border-radius: 50%;opacity: 0.1;"
					>
					</view>
				</view>
				<view style="position: relative;text-align: center;color: #ffffff;">
					<view style="font-size: 38rpx;font-weight: bold;">
						<text v-if="verificationStatus == '0'">待核销-待付款</text>
						<text v-else-if="verificationStatus == '1'">待核销-已付款</text>
						<text v-else-if="verificationStatus == '2'">已核销</text>
						<text v-else-if="verificationStatus == '3'">已过期</text>
						<text v-else-if="verificationStatus == '4'">已取消</text>
						<text v-else>--</text>
					</view>
					<view style="margin: 30rpx 0 58rpx;font-size: 28rpx;">{{ dataList.createTime || '--' }}</view>
				</view>
				<view style="position: relative;min-height: 40vh;background-color: #ffffff;border-radius: 28rpx;">
					<view>
						<!-- <view
							style="position: absolute;top: 160rpx;left: 0;width: 0rpx;height: 0rpx;border: 17rpx solid #ef5613;border-left-color: transparent;border-radius: 0% 50% 50% 0%;box-sizing: content-box;"
							>
							</view> -->
						<view
							style="position: absolute;top: 160rpx;left: 0;width: 34rpx;height: 34rpx;background-color: #ef5613;clip-path: ellipse(50% 50% at 10% 50%)"
						>
						</view>
						<view
							style="position: absolute;top: 160rpx;right: 0;width: 34rpx;height: 34rpx;background-color: #ef5613;clip-path: ellipse(50% 50% at 90% 50%)"
						>
						</view>
					</view>
					<view v-if="verificationCodeUrl" style="padding: 82rpx 40rpx 0;font-weight: bold;">
						<view style="display: flex;justify-content: center;padding-bottom: 34rpx;font-size: 32rpx;">
							<view style="color: #222229;">核销码：{{ verificationCode || '--' }}</view>
							<view style="margin-left: 28rpx;color: #ef5613;" @click="$copy(verificationCode)">复制</view>
						</view>
						<view style="text-align: center;">
							<image
								style="width: 420rpx;border: 2rpx solid #222229;border-radius: 28rpx;" mode="widthFix"
								:src="verificationCodeUrl"
							/>
						</view>
						<view style="padding: 32rpx 0 42rpx;font-size: 28rpx;text-align: center;">
							<view style="color: #222229;">向商家出示核销码进行核销</view>
							<view style="margin-top: 32rpx;color: #888889;">长按保存二维码</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-else-if="showType === 'detail'">
			<JHeader title="订单详情" width="50" height="50" style="padding: 24rpx 0 18rpx;background-color: #ffffff;"></JHeader>
			<view>
				<view class="content" style="padding-bottom:200rpx;">
					<view style="margin: 24rpx 30rpx 0;">
						<view v-if="dataList.afterState" style="color: #222229;font-size: 34rpx;font-weight: bold;">
							<view v-if="[5, 6, 9].includes(dataList.afterState)">
								{{ `【退】${afterConditionEnum(dataList.afterState)}-${orderPatternEnum[[ 5 ].includes(dataList.state) && dataList.collageId ? 5.5 : dataList.state].text}` }}
							</view>
							<view v-else>
								{{ `【退】${afterConditionEnum(dataList.afterState)}` }}
							</view>
						</view>
						<view v-else>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<text style="color: #222229;font-size: 34rpx;font-weight: bold;">
									● {{ orderPatternEnum[[ 5 ].includes(dataList.state) && dataList.collageId ? 5.5 : dataList.state].text }}
								</text>
								<text style="color: #1A66FF;font-size: 26rpx;">
									{{ orderPatternEnum[[ 5 ].includes(dataList.state) && dataList.collageId ? 5.5 : dataList.state].message }}
								</text>
							</view>
						</view>
					</view>

					<view class="order-details-info-box">
						<view v-if="dataList.orderType === 1" class="address-box">
							<tui-icon name="position" :size="70" unit="rpx" color="#333333" margin="0 20rpx 0 0"></tui-icon>
							<view class="address-r">
								<view class="address-name-box">
									<text>{{ dataList.receiveName }}</text>
									<text class="phone">{{ dataList.receivePhone }}</text>
								</view>
								<view class="address-info">
									<text>{{ dataList.receiveAdress }} {{ dataList.address }}</text>
								</view>
							</view>
						</view>
					</view>

					<view
						v-if="!dataList.shopName.startsWith('团蜂')"
						style="padding: 30rpx 40rpx;margin: 24rpx 30rpx 0;background-color: #ffffff;border-radius: 20rpx;"
					>
						<view style="display: flex;align-items: center;">
							<view
								style="flex: 1;display: flex;align-items: stretch;"
								@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${dataList.shopId}`)"
							>
								<image
									style="width: 200rpx;height: 200rpx;margin-right: 18rpx;border-radius: 20rpx"
									:src="common.seamingImgUrl(brandDetail.shopLogo)"
								>
								</image>
								<view style="flex: 1;display: flex;flex-direction: column;justify-content: flex-start;width: 0;">
									<text style="font-size: 30rpx;color: #333;font-weight: bold;">{{ dataList.shopName }}</text>
									<view style="margin-top: 6rpx;">
										<tui-rate active="#EF530E" :current="brandDetail.score" :size="14" disabled></tui-rate>
										<text style="font-size: 24rpx;color: #ef530e;margin-left: 4rpx;">{{ brandDetail.score }}</text>
									</view>
									<view
										v-if="brandDetail.startTime"
										style="width: fit-content;margin-top: 12rpx;padding: 4rpx 18rpx;font-size: 20rpx;color: #EF530E;border: 2rpx solid #EF530E;border-radius: 20rpx;"
									>
										{{ brandDetail.startTime }}营业
									</view>
									<view style="margin-top: 12rpx;display: flex;align-items: center;">
										<tui-icon name="gps" :size="14" color="#222229"></tui-icon>
										<text style="margin-left: 4rpx;font-size: 24rpx;">{{ brandDetail.distance || 0 }}Km</text>
										<text
											style="margin-left: 30rpx;flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
										>
											{{ brandDetail.shopAdress || '--' }}
										</text>
									</view>
								</view>
							</view>
							<view>
								<BeeMakePhone :phone="brandDetail.chargePersonPhone">
									<BeeIcon
										:size="18" color="#e02208" name="voipphone"
										style="padding: 12rpx;background-color: #fbeeee;border-radius: 50%;line-height: 1;"
									></BeeIcon>
								</BeeMakePhone>
							</view>
						</view>
					</view>

					<view style="padding: 30rpx 40rpx;margin: 24rpx 30rpx 0;background-color: #ffffff;border-radius: 20rpx;">
						<view style="margin-left: -12rpx;font-size: 28rpx;font-weight: bold;">
							<text style="color: #e02208;">●</text>
							<text style="color: #222229;margin-left: 8rpx;">订单信息</text>
						</view>
						<view style="font-size: 24rpx;">
							<view>
								<view style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">下单时间</text>
									<text style="margin-left: 32rpx;color: #222229;">{{ dataList.createTime || '--' }}</text>
								</view>
								<view v-if="[ 3 ].includes(dataList.state)" style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">付款时间</text>
									<text style="margin-left: 32rpx;color: #222229;">{{ dataList.paymentTime || '--' }}</text>
								</view>
								<view v-if="[8, 9, 10].includes(dataList.state)" style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">核销人和核销账号</text>
									<text style="margin-left: 32rpx;color: #222229;">{{ dataList.writePhone || '--' }}</text>
								</view>
								<view v-if="[3, 4].includes(dataList.state)" style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">发货时间</text>
									<text style="margin-left: 32rpx;color: #222229;">{{ dataList.dileveryTime || '--' }}</text>
								</view>
								<view v-if="[ 4 ].includes(dataList.state)" style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">成交时间</text>
									<text style="margin-left: 32rpx;color: #222229;">{{ dataList.receiveTime || '--' }}</text>
								</view>
								<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 32rpx;">
									<view>
										<text style="color: #8F8F8F;">订单编号</text>
										<text style="margin-left: 32rpx;color: #222229;">{{ dataList.orderFormid || '--' }}</text>
									</view>
									<view style="color: #EF530E;" @click="$copy(dataList.orderFormid)">复制</view>
								</view>
								<view
									v-if="[1, 8, 5, 6].includes(dataList.state) || dataList.afterState"
									style="display: flex;align-items: center;justify-content: space-between;padding-top: 32rpx;"
								>
									<view>
										<text style="color: #8F8F8F;">需付金额</text>
										<text style="margin-left: 32rpx;color: #222229;">
											￥{{ Number.parseFloat(Number(dataList.price || 0)).toFixed(2) }}
										</text>
									</view>
									<view v-if="[1, 6].includes(dataList.state)">
										<view style="display: flex;align-items: center;color: #1A66FF;">
											<text>剩余时间：</text>
											<tui-countdown
												:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
												border-color="transparent" :time="remainingTime"
											></tui-countdown>
										</view>
									</view>
								</view>
								<view style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">商品总价</text>
									<text style="margin-left: 32rpx;color: #222229;">
										￥{{ Number.parseFloat(Number(dataList.orderPrice || 0)).toFixed(2) }}
									</text>
								</view>
								<view v-if="[2, 3, 4, 9, 10].includes(dataList.state)" style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">实付金额</text>
									<text style="margin-left: 32rpx;color: #222229;">
										￥{{ Number.parseFloat(Number(dataList.price || 0)).toFixed(2) }}
									</text>
								</view>
								<view style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">快递运费</text>
									<text style="margin-left: 32rpx;color: #222229;">
										￥{{ Number.parseFloat(Number(dataList.logisticsPrice || 0)).toFixed(2) }}
									</text>
								</view>
								<view style="padding-top: 32rpx;">
									<text style="color: #8F8F8F;">平台优惠</text>
									<text style="margin-left: 32rpx;color: #222229;">
										￥{{ Number.parseFloat(Number(dataList.discountPrice || 0)).toFixed(2) }}
									</text>
								</view>
							</view>
							<view v-if="[3, 4].includes(dataList.state)" style="padding-top: 32rpx;">
								<view
									style="display: flex;align-items: center;"
									@click="isShowWuLiu = !isShowWuLiu"
								>
									<view>物流信息</view>
									<tui-icon
										:name="isShowWuLiu ? 'arrowup' : 'arrowdown'" :size="26" unit="rpx" margin="0 30rpx 0 6rpx"
										color="#b7b7b7"
									></tui-icon>
								</view>
								<view v-if="isShowWuLiu">
									<view v-if="steps.length">
										<tui-steps direction="column" :items="steps" spacing="180rpx" :active-steps="0"></tui-steps>
									</view>
									<view v-else style="padding-bottom: 45rpx;">
										<tui-no-data :fixed="false" style="padding-top: 60rpx;">这里空空如也～</tui-no-data>
									</view>
								</view>
							</view>
							<view
								style="display: flex;align-items: center;justify-content: space-between;margin-top: 24rpx;padding-top: 24rpx;font-size: 26rpx;border-top: 2rpx solid #D8D8D8;"
							>
								<view
									style="flex: 1;display: flex;align-items: center;justify-content: center;color: #EF530E;"
									@click="handleClickShare"
								>
									<tui-icon name="share" :size="42" unit="rpx" margin="0 20rpx 0 0" color="#EF530E"></tui-icon>
									一键分享
								</view>
								<view
									v-if="[2, 3, 4, 9, 10].includes(dataList.state) && [0, 6].includes(Number(dataList.afterState)) && (dataList.skus[0].ifAdd !== 1) && dataList.skus.some(i => i.classifyId != 1439)"
									style="flex: 1;display: flex;align-items: center;justify-content: center;color: #8F8F8F;"
									@click="handleApplyTap"
								>
									<tui-icon name="kefu" :size="42" unit="rpx" margin="0 20rpx 0 0" color="#8F8F8F"></tui-icon>
									申请售后
								</view>
								<view
									v-if="[2, 3, 9].includes(dataList.state) && dataList.skus.every(i => i.classifyId != 1439)"
									style="flex: 1;display: flex;align-items: center;justify-content: center;color: #8F8F8F;"
									@click="applyMoneyAllTap"
								>
									<tui-icon name="offline" :size="42" unit="rpx" margin="0 20rpx 0 0" color="#8F8F8F"></tui-icon>
									申请退款
								</view>
							</view>
						</view>
					</view>

					<view
						style="padding: 30rpx 40rpx;margin: 24rpx 30rpx 0;font-size: 28rpx;color: #222229;background-color: #ffffff;border-radius: 20rpx;"
					>
						<view style="margin-left: -12rpx;font-size: 28rpx;font-weight: bold;">
							<text style="color: #e02208;">●</text>
							<text style="color: #222229;margin-left: 8rpx;">商品信息</text>
						</view>
						<ATFOrderSkus :data="dataList.skus">
							<template #rightFoot="obj">
								<view style="display: flex;align-items: center;justify-content: space-between;">
									<view
										v-if="[3, 4].includes(dataList.state) && !obj.proItem.afterState && !obj.proItem.returnType"
									>
										<view
											v-if="(!obj.proItem.returnStatus || (!obj.proItem.canApplyIntervention && (obj.proItem.returnStatus == 2))) && (obj.proItem.classifyId != 1439)"
											class="item-applay-btn" @click.stop="applayItemTap(obj.proItem)"
										>
											退款
										</view>
									</view>
									<view v-if="obj.proItem.returnType == 1">
										<view
											v-if="!obj.proItem.returnStatus || (obj.proItem.returnStatus == 1) || (obj.proItem.returnStatus == 3) || (obj.proItem.returnStatus == 4)"
											class="item-applay-btn" @click="goApplyTap(obj.proItem.returnType)"
										>
											退款中
										</view>
										<view
											v-if="obj.proItem.returnStatus == 4" class="item-applay-btn"
											@click="goApplyTap(obj.proItem.returnType)"
										>
											已退款
										</view>
										<view
											v-if="obj.proItem.returnStatus == 5" class="item-applay-btn"
											@click="goApplyTap(obj.proItem.returnType)"
										>
											退款失败
										</view>
										<view
											v-if="obj.proItem.canApplyIntervention" class="item-applay-btn"
											@click="goApplyTap(obj.proItem.returnType)"
										>
											客服介入
										</view>
									</view>
									<view v-if="obj.proItem.returnType == 2">
										<view
											v-if="!obj.proItem.returnStatus || (obj.proItem.returnStatus == 1) || (obj.proItem.returnStatus == 3) || (obj.proItem.returnStatus == 4)"
											class="item-applay-btn" @click="goApplyTap(obj.proItem.returnType)"
										>
											退货中
										</view>
										<view
											v-if="obj.proItem.returnStatus == 6" class="item-applay-btn"
											@click="goApplyTap(obj.proItem.returnType)"
										>
											已退款
										</view>
										<view
											v-if="obj.proItem.returnStatus == 7" class="item-applay-btn"
											@click="goApplyTap(obj.proItem.returnType)"
										>
											退款中
										</view>
										<view
											v-if="(obj.proItem.returnStatus == 5) || (obj.proItem.returnStatus == 8)"
											class="item-applay-btn" @click="goApplyTap(obj.proItem.returnType)"
										>
											退款失败
										</view>
										<view
											v-if="obj.proItem.canApplyIntervention" class="item-applay-btn"
											@click="goApplyTap(obj.proItem.returnType)"
										>
											客服介入
										</view>
									</view>
									<view
										v-if="dataList.skus.every(i => !(i.productPay === 1))"
										style="display: flex;justify-content: flex-end;flex-wrap: wrap;"
									>
										<tui-button
											v-if="[3, 4].includes(dataList.state) && (obj.proItem.commentId === 0) && obj.proItem.additionalComment"
											type="blue" plain width="150rpx" height="48rpx"
											margin="20rpx 12rpx 0 0" :size="24"
											@click="go(`/another-tf/another-user/product-logistics/index?orderId=${dataList.orderId}&skuId=${obj.proItem.skuId}`)"
										>
											查看物流
										</tui-button>
										<tui-button
											v-if="[4, 10].includes(dataList.state) && (obj.proItem.commentId === 0)" type="blue" plain
											width="150rpx" height="48rpx" margin="20rpx 12rpx 0 0"
											@click="go(`/another-tf/another-serve/evaluate/index?orderId=${dataList.orderId}&skuId=${obj.proItem.skuId}`)"
										>
											立即评价
										</tui-button>
										<tui-button
											v-if="[4, 10].includes(dataList.state) && (obj.proItem.commentId !== 0) && (dataList.skus[0].ifAdd !== 1)"
											type="blue" plain width="150rpx" height="48rpx"
											margin="20rpx 12rpx 0 0"
											@click="handleAddEvaluate(obj.proItem)"
										>
											追加评价
										</tui-button>
									</view>
								</view>
							</template>
						</ATFOrderSkus>
					</view>
				</view>

				<view class="order-details-btn" :style="{ 'padding-bottom': (isIphone == true ? 40 : 0) + 'rpx' }">
					<tui-button
						v-if="dataList.skus.every(i => !(i.productPay === 1)) && [1, 6, 8].includes(dataList.state)" type="gray" width="48%" height="82rpx"
						plain
						margin="20rpx 0 0" style="border-radius: 8rpx;" @click="cancelOrder"
					>
						取消订单
					</tui-button>
					<tui-button
						v-if="[1, 8].includes(dataList.state)"
						type="warning" width="48%" height="82rpx" margin="20rpx 0 0"
						style="background: #ef530e!important;border-radius: 8rpx;" @click="showPayTypePopup = true"
					>
						提交支付
					</tui-button>
					<tui-button
						v-if="dataList.skus.every(i => !(i.productPay === 1)) && [ 3 ].includes(dataList.state)"
						type="warning" width="48%" height="82rpx"
						margin="20rpx 0 0"
						style="background: #ef530e!important;border-radius: 8rpx;" @click="confirmReceiptTap"
					>
						确认完成
					</tui-button>
					<tui-button
						v-if="dataList.skus.every(i => !(i.productPay === 1)) && [ 6 ].includes(dataList.state)"
						type="warning" width="48%" height="82rpx"
						margin="20rpx 0 0"
						style="background: #ef530e!important;border-radius: 8rpx;"
						@click="goInviteSpll(dataList.collageId, dataList.orderId, dataList.skus[0].productId, dataList.skus[0].skuId, dataList.shopGroupWorkId)"
					>
						邀请拼单
					</tui-button>
					<tui-button
						v-if="dataList.skus.every(i => !(i.productPay === 1)) && [5, 4, 10].includes(dataList.state)"
						type="warning" width="48%" height="82rpx"
						margin="20rpx 0 0" style="background: #ef530e!important;border-radius: 8rpx;"
						@click="againCollage(dataList.skus[0].productId, dataList.shopId, dataList.skus[0].skuId, true, dataList)"
					>
						再次开团
					</tui-button>
					<tui-button
						v-if="dataList.skus.every(i => !(i.productPay === 1)) && [ 5 ].includes(dataList.state)"
						type="warning" width="48%" height="82rpx"
						margin="20rpx 0 0"
						style="background: #ef530e!important;border-radius: 8rpx;" @click="delOrder"
					>
						删除订单
					</tui-button>
					<tui-button
						v-if="dataList.skus.every(i => !(i.productPay === 1)) && [5, 4, 10].includes(dataList.state)"
						type="warning" width="100%" height="82rpx"
						margin="20rpx 0 0" style="min-width: 100%;background: #ef530e!important;border-radius: 8rpx;"
						@click="againCollage(dataList.skus[0].productId, dataList.shopId, dataList.skus[0].skuId, false, dataList)"
					>
						再下一单
					</tui-button>
				</view>

				<tui-bottom-popup :show="showPayTypePopup" @close="showPayTypePopup = false">
					<view v-if="showPayTypePopup" style="padding: 60rpx 0 128rpx;">
						<CashierList
							:price-pay="dataList.price" show
							:hui-shi-bao-pay="dataList.skus.every((b) => !b.platformCurrencyId) && dataList.price ? dataList.shopId : 0"
							:show-commission-pay="dataList.skus.every((b) => !b.platformCurrencyId) && !!dataList.price"
							:show-platform-pay="dataList.skus.every((b) => !b.platformCurrencyId) && !!dataList.price"
							:show-transaction-pay="dataList.skus.every((b) => !b.platformCurrencyId) && !!dataList.price"
							:shop-id-pay="dataList.skus.every((b) => !b.platformCurrencyId) && dataList.price ? dataList.shopId : 0"
							@change="(e) => payInfo = e"
						/>
						<tui-button
							type="warning" width="168rpx" height="64rpx" margin="30rpx auto 0"
							shape="circle"
							@click="handleShopGoPay"
						>
							确认支付
						</tui-button>
					</view>
				</tui-bottom-popup>

				<tui-bottom-popup :show="isShowCustomerServicePopup" @close="isShowCustomerServicePopup = false">
					<ATFCustomerService :shop-id="dataList.shopId" :data="customerServiceList"></ATFCustomerService>
				</tui-bottom-popup>
			</view>
		</view>

		<DragButton text="联系客服" is-dock exist-tab-bar @btnClick="handleOpenCustomerService"></DragButton>
	</view>
</template>

<script>
import { afterConditionEnum, orderPatternEnum } from '../../../components/ATFOrderInfo/config'
import { handleDoPay } from '../../../utils/payUtil'
import {
	getOrderDetailApi,
	getIndexShopDetailApi,
	getOrderVerificationHxCodeApi,
	getOrderDileveryShippingTraceApi,
	deleteShopOrderApi,
	cancelShopOrderApi,
	getOrderRefundApi,
	updateOrderConfirmApi
} from '../../../api/anotherTFInterface'
import { T_SKU_ITEM_MSG_LIST, T_REFUND_APPLY_ITEM, T_AFTER_SALE_APPLY_REFUND } from '../../../constant'
import { resolveShowCanNotBuyMsg } from '../../../utils'
import { A_TF_MAIN } from '../../../config'

export default {
	name: 'OrderDetails',
	data() {
		return {
			orderPatternEnum,
			isIphone: false,
			orderId: 0,
			noticeId: 0,
			showType: '',

			// 核销相关
			verificationCode: '',
			verificationCodeUrl: '',
			verificationStatus: '',

			// 订单相关
			brandDetail: {},
			dataList: {
				afterState: '',
				state: '',
				orderType: '',
				shopName: '',
				orderFormid: null,
				createTime: null,
				price: 0,
				orderPrice: 0,
				logisticsPrice: 0,
				discountPrice: 0,
				skus: []
			},
			steps: [],
			isShowWuLiu: false,
			orderRefundList: [],
			remainingTime: null, // 倒计时剩余时间

			// 支付
			showPayTypePopup: false,
			payInfo: {},

			// 客服
			isShowCustomerServicePopup: false,
			customerServiceList: []
		}
	},
	onLoad(options) {
		this.isIphone = getApp().globalData.isIphone
		this.orderId = parseInt(options.orderId)
		this.noticeId = options.noticeId || 0
		this.showType = options.showType || 'detail'
		if (this.showType === 'writeOff') {
			getOrderVerificationHxCodeApi({
				url: `${A_TF_MAIN}/#/pages/jump/jump?orderId=${this.orderId}&type=verification&code=${this.orderId}~`
			}).then((res) => {
				// if (res.errno === -1) return
				this.verificationCode = res.data.code
				this.verificationCodeUrl = res.data.hxCode
				this.verificationStatus = res.data.status
			})
		} else if (this.showType === 'detail') {
			getOrderRefundApi({ orderId: this.orderId })
				.then((res) => {
					this.orderRefundList = res.data
				})
		}
	},
	onShow() {
		this.getOrderDetailData(this.orderId)
	},
	methods: {
		afterConditionEnum,
		// 去商品详情
		againCollage(productId, shopId, skuId, isStartAGroup, item) {
			if (isStartAGroup) {
				this.go(`/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${productId}&skuId=${skuId}`)
			} else {
				this.handleGoBuyAgain(item) // 跳转详情
			}
		},
		handleClickShare() {
			uni.navigateTo({
				url: '/another-tf/another-user/share-shop-and-commodity/index?isSharer=1',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendShareShopAndCommodityMsg', { shopId: this.dataList.shopId, goods: JSON.stringify(this.dataList.skus.map((i) => `${i.productId}~${i.skuId}`)) })
					}, 400)
				}
			})
		},
		async handleGoBuyAgain(orderItem) {
			const { canNotBuySkuList, canNotSaleSkuList } = await resolveShowCanNotBuyMsg(orderItem.skus)
			if (canNotBuySkuList.length || canNotSaleSkuList.length) return
			// 制造数据
			uni.setStorageSync(T_SKU_ITEM_MSG_LIST, [ {
				ifWork: orderItem.ifWork,
				shopId: orderItem.shopId,
				shopName: orderItem.shopName,
				shopDiscountId: orderItem.shopDiscountId,
				shopSeckillId: orderItem.shopSeckillId,
				skus: orderItem.skus
			} ])
			this.go('/another-tf/another-serve/paymentOrderConfirm/index?type=1')
		},

		handleAddEvaluate(skuItem) {
			uni.navigateTo({
				url: '/another-tf/another-serve/addEvaluate/index?type=1',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendAddEvaluateMsg', { addCommentVOData: this.dataList, commentId: skuItem.commentId })
					}, 100)
				}
			})
		},

		goInviteSpll(collageId, orderId, productId, skuId, shopGroupWorkId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/inviteSpell/index?collageId=' + collageId + '&orderId=' + orderId + '&type=1' +
					'&productId=' + productId + '&skuId=' + skuId + '&shopGroupWorkId=' + shopGroupWorkId
			})
		},
		getOrderDetailData(orderId) {
			uni.showLoading()
			getOrderDetailApi({
				orderId,
				noticeId: this.noticeId
			}).then((res) => {
				const data = res.data
				this.remainingTime = Math.floor(res.data.time / 1000)
				this.dataList = data
				this.dataList.receivePhone = this.dataList.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2')
				uni.hideLoading()
				this.getShippingTrace(this.dataList.express, this.dataList.deliverFormid)
				if (!this.brandDetail.shopId) {
					getIndexShopDetailApi({
						shopId: this.dataList.shopId,
						longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
						latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
					})
						.then((res) => {
							this.brandDetail = res.data || {}
						})
				}
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 物流信息
		getShippingTrace(express, deliverFormid) {
			getOrderDileveryShippingTraceApi({ express, deliverFormid })
				.then((res) => {
					for (let i = 0; i < res.data.length; i++) {
						const item = res.data[i]
						this.steps.push({
							title: item.reason,
							desc: item.time
						})
					}
					this.steps = this.steps.reverse()
				})
		},
		// 取消订单
		cancelOrder() {
			uni.showModal({
				title: '',
				content: '取消订单将不保存你的内容，\n确认取消订单吗？',
				confirmText: '是',
				cancelText: '否',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							mask: true,
							title: '取消中...'
						})
						cancelShopOrderApi({
							orderId: this.orderId
						}).then((result) => {
							uni.hideLoading()
							uni.showToast({
								title: '取消成功'
							})
							this.getOrderDetailData(this.orderId)
						})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		// 删除订单
		delOrder() {
			uni.showModal({
				title: '温馨提示',
				content: '您确定要删除该订单吗？',
				confirmText: '确定删除',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							mask: true,
							title: '删除中...'
						})
						deleteShopOrderApi({
							orderId: this.orderId
						}).then((result) => {
							uni.hideLoading()
							uni.showToast({
								title: '删除成功'
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/order/order'
								})
							}, 1500)
						})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},

		// 退款
		applayItemTap(proItem) {
			uni.setStorageSync(T_REFUND_APPLY_ITEM, proItem)
			uni.navigateTo({
				url: '/another-tf/another-serve/afterSaleApplyRefund/index?orderId=' + this.orderId + '&isAllSelect=' + (this.dataList.skus.length > 1) ? '0' : '1' // isAllSelect 是否为拆单售后
			})
		},
		// 去退款详情
		goApplyTap(type) {
			if (type == 1) {
				uni.navigateTo({
					url: `/another-tf/another-serve/refundDetails/index?orderId=${this.dataList.orderId}&afterId=${this.dataList.afterId}}`
				})
			} else if (type == 2) {
				uni.navigateTo({
					url: `/another-tf/another-serve/returnDetails/index?orderId=${this.dataList.orderId}&afterId=${this.dataList.afterId}`
				})
			}
		},

		// 申请退款
		applyMoneyAllTap() {
			let isAllSelect = 1
			if (this.dataList.skus.some((item) => item.afterState)) isAllSelect = 0
			if (this.orderRefundList.length === 0) return this.$showToast('您所有商品已经申请退款，请勿重复申请')
			uni.setStorageSync(T_AFTER_SALE_APPLY_REFUND, this.orderRefundList)
			uni.navigateTo({
				url: `/another-tf/another-serve/afterSaleApplyRefund/index?orderId=${this.orderId}&isAllSelect=${isAllSelect}`
			})
		},
		confirmReceiptTap() {
			uni.showModal({
				title: '温馨提示',
				content: '确定您已经收到货物，否则会造成财产损失',
				confirmText: '确定收到',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							title: '确认中...'
						})
						updateOrderConfirmApi({
							orderId: this.dataList.orderId
						}).then((res) => {
							uni.hideLoading()
							uni.showToast({
								title: '确认成功'
							})
							this.getOrderDetailData(this.orderId)
						})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		// 申请售后
		handleApplyTap() {
			if (this.orderRefundList.length === 0) return this.$showToast('您所有商品已经申请退款，请勿重复申请')
			uni.navigateTo({
				url: `/another-tf/another-serve/afterSaleApply/index?orderId=${this.dataList.orderId}`
			})
		},

		async handleShopGoPay() {
			await handleDoPay({
				collageId: this.dataList.collageId,
				money: this.dataList.price,
				orderId: this.dataList.orderId,
				orderFormid: this.dataList.orderFormid,
				orderSn: this.dataList.orderFormid,
				type: 2,
				...this.payInfo
			}, 1, '')
		},

		// 打开客服
		async handleOpenCustomerService() {
			const res = await this.$store.dispatch('app/getCustomerServiceAction', {
				shopId: '' // this.dataList.shopId
			})
			this.customerServiceList = res.data
			if (!this.customerServiceList.length) this.$showToast('暂无客服')
			else this.isShowCustomerServicePopup = true
		}
	}
}
</script>

<style lang="less" scoped>
.order-details-container {
	min-height: 100vh;
	background: #f5f4f6;
	box-sizing: border-box;

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.write-off-bg {
		// background: url('../../../static/xxx') no-repeat center top/contain;
	}

	.content {
		padding: 0 0 160rpx 0;

		.order-details-info-box {
			padding: 0 30rpx;
			box-sizing: border-box;
			margin-top: 24rpx;

			.address-box {
				margin-top: 20rpx;
				background: #fff;
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				align-items: center;

				.address-r {
					flex: 1;
					display: flex;
					flex-direction: column;
					font-size: 28rpx;
					color: #333;

					.address-name-box {
						font-size: 30rpx;
						color: #333;

						.phone {
							font-size: 24rpx;
							color: #999;
							margin-left: 20rpx;
						}
					}

					.address-info {
						font-size: 28rpx;
						color: #333;
						margin-top: 15rpx;
					}
				}
			}

		}

		.item-applay-btn {
			margin-top: 20rpx;
			height: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			padding: 0 30rpx;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(187, 187, 187, 1);
			border-radius: 25rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

	}

	.order-details-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0 30rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		background: #ffffff;
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.1);
		z-index: 10;
		box-sizing: border-box;
	}
}
</style>
