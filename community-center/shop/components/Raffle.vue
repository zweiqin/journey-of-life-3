<template>
	<view style="min-height: 200rpx;">
		<view v-if="rafflePrizeList && rafflePrizeList.length">
			<scroll-view refresher-background="#3f3d3d" scroll-y style="max-height: 85vh;min-height: 400rpx;">
				<view style="padding: 44upx;background-color: #e23d3d;border-radius: 28upx;">
					<view
						style="padding: 30upx;background-color: #fa5151;border-radius: 28upx;box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);"
					>
						<view
							style="padding: 28upx 34upx;background-color: #ff8f1f;border-radius: 28upx;box-shadow: inset 0px 2px 5px 2px #FFF8C6;"
						>
							<view style="display: flex;justify-content: space-between;margin-bottom: 14upx;">
								<view
									v-for="(item, index) in 10" :key="index" style="width: 20upx;height: 20upx;border-radius: 50%;"
									:style="{ 'backgroundColor': index % 2 === 0 ? '#fdffff' : '#fa5151' }"
								></view>
							</view>

							<view v-if="topPrize.length" style="display: flex;justify-content: space-between;">
								<view style="display: flex;flex-direction: column;justify-content: space-evenly;">
									<view style="width: 20upx;height: 20upx;background-color: #fa5151;border-radius: 50%;"></view>
									<view style="width: 20upx;height: 20upx;background-color: #fdffff;border-radius: 50%;"></view>
								</view>
								<view style="flex: 1;box-sizing: border-box;">
									<view
										style="width: 100%;display: flex;flex-wrap: wrap;justify-content: space-evenly;"
									>
										<view
											v-for="(item, index) in topPrize" :key="index"
											style="width: 28%;padding: 20upx 0upx 8upx;margin: 10upx 0upx;text-align: center;border-radius: 28upx;box-sizing: border-box;"
											:style="{ 'backgroundColor': index % 2 === 0 ? '#fbddad' : '#ffffff' }"
										>
											<view>
												<BeeAvatar :width="28" :height="28" radius="10upx" :src="common.seamingImgUrl(item.url)"></BeeAvatar>
											</view>
											<view style="font-size: 26upx;color: #FF2626;white-space: nowrap;overflow-x: auto;">
												{{ item.name }}
											</view>
										</view>
									</view>
								</view>
								<view style="display: flex;flex-direction: column;justify-content: space-evenly;">
									<view style="width: 20upx;height: 20upx;background-color: #fdffff;border-radius: 50%;"></view>
									<view style="width: 20upx;height: 20upx;background-color: #fa5151;border-radius: 50%;"></view>
								</view>
							</view>

							<view v-if="middlePrize" style="display: flex;justify-content: space-between;">
								<view style="display: flex;flex-direction: column;justify-content: space-evenly;">
									<view style="width: 20upx;height: 20upx;background-color: #fa5151;border-radius: 50%;"></view>
									<view style="width: 20upx;height: 20upx;background-color: #fdffff;border-radius: 50%;"></view>
								</view>
								<view style="flex: 1;box-sizing: border-box;">
									<view
										style="width: 100%;display: flex;flex-wrap: wrap;justify-content: space-evenly;"
									>
										<view
											v-if="middlePrize[0]"
											style="width: 28%;padding: 20upx 0upx 8upx;margin: 10upx 0upx;text-align: center;background-color: #ffffff;border-radius: 28upx;box-sizing: border-box;"
										>
											<view>
												<BeeAvatar :width="28" :height="28" radius="10upx" :src="common.seamingImgUrl(middlePrize[0].url)"></BeeAvatar>
											</view>
											<view style="font-size: 26upx;color: #FF2626;white-space: nowrap;overflow-x: auto;">
												{{ middlePrize[0].name }}
											</view>
										</view>
										<view
											style="width: 28%;padding: 20upx 0upx;margin: 10upx 0upx;text-align: center;background-color: #fa5151;border-radius: 28upx;box-sizing: border-box;"
										>
											<view style="font-size: 32upx;color: #FFF8C6;" @click="handleClickRaffle">
												<view>立即</view>
												<view>抽奖</view>
											</view>
										</view>
										<view
											v-if="middlePrize[1]"
											style="width: 28%;padding: 20upx 0upx 8upx;margin: 10upx 0upx;text-align: center;background-color: #ffffff;border-radius: 28upx;box-sizing: border-box;"
										>
											<view>
												<BeeAvatar :width="28" :height="28" radius="10upx" :src="common.seamingImgUrl(middlePrize[1].url)"></BeeAvatar>
											</view>
											<view style="font-size: 26upx;color: #FF2626;white-space: nowrap;overflow: auto;">
												{{ middlePrize[1].name }}
											</view>
										</view>
									</view>
								</view>
								<view style="display: flex;flex-direction: column;justify-content: space-evenly;">
									<view style="width: 20upx;height: 20upx;background-color: #fdffff;border-radius: 50%;"></view>
									<view style="width: 20upx;height: 20upx;background-color: #fa5151;border-radius: 50%;"></view>
								</view>
							</view>

							<view v-if="bottomPrize.length" style="display: flex;justify-content: space-between;">
								<view style="display: flex;flex-direction: column;justify-content: space-evenly;">
									<view style="width: 20upx;height: 20upx;background-color: #fa5151;border-radius: 50%;"></view>
									<view style="width: 20upx;height: 20upx;background-color: #fdffff;border-radius: 50%;"></view>
								</view>
								<view style="flex: 1;box-sizing: border-box;">
									<view
										style="width: 100%;display: flex;flex-wrap: wrap;justify-content: space-evenly;"
									>
										<view
											v-for="(item, index) in bottomPrize" :key="index"
											style="width: 28%;padding: 20upx 0upx 8upx;margin: 10upx 0upx;text-align: center;border-radius: 28upx;box-sizing: border-box;"
											:style="{ 'backgroundColor': index % 2 === 0 ? '#fbddad' : '#ffffff' }"
										>
											<view>
												<BeeAvatar :width="28" :height="28" radius="10upx" :src="common.seamingImgUrl(item.url)"></BeeAvatar>
											</view>
											<view style="font-size: 26upx;color: #FF2626;white-space: nowrap;overflow-x: auto;">
												{{ item.name }}
											</view>
										</view>
									</view>
								</view>
								<view style="display: flex;flex-direction: column;justify-content: space-evenly;">
									<view style="width: 20upx;height: 20upx;background-color: #fdffff;border-radius: 50%;"></view>
									<view style="width: 20upx;height: 20upx;background-color: #fa5151;border-radius: 50%;"></view>
								</view>
							</view>

							<view style="display: flex;justify-content: space-between;margin-top: 14upx;">
								<view
									v-for="(item, index) in 10" :key="index" style="width: 20upx;height: 20upx;border-radius: 50%;"
									:style="{ 'backgroundColor': index % 2 === 0 ? '#fdffff' : '#fa5151' }"
								></view>
							</view>
						</view>
						<view style="margin-top: 30upx;">
							<view style="font-size: 30upx;color: #FFC300;text-align: center;">活动规则</view>
							<view style="margin-top: 26upx;font-size: 26upx;color: #FFD593;">
								<view style="margin-top: 5upx;">1、每日有5次抽奖机会每日有5次抽奖机会每日有5次抽奖机会</view>
								<view style="margin-top: 5upx;">2、有机会抽到代金券有机会抽到代金券有机会抽到代金券有机会抽到代金券有机会抽到代金券有机会抽到代金券有机会抽到代金券有机会抽到代金券</view>
								<view style="margin-top: 5upx;">3、商家享有解释权利有机会抽到代金券有机会抽到代金券有机会抽到代金券有机会抽到代金券</view>
								<view style="margin-top: 5upx;">4、分享立得一次抽奖机会有机会抽到代金券有机会抽到代金券</view>
								<view style="margin-top: 5upx;">5、所得优惠券直接发到该账户哈哈哈有机会抽到代金券</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<LoadMore v-show="rafflePrizeList.length" :status="status"></LoadMore>
		<view v-if="rafflePrizeList && !rafflePrizeList.length && loadingStatus !== 'loading'" class="no-data">
			该店铺暂无抽奖活动~
		</view>
		<tui-landscape
			:show="showRaffleLandscape" :position="2" :mask-closable="false" icon-left="50rpx"
			icon-right="50rpx" @close="showRaffleLandscape = false"
		>
			<view style="max-height: 75vh;min-height: 25vh;width: 680upx;padding: 68upx 28upx;background-color: #e23d3d;box-sizing: border-box;overflow-y: auto;">
				<view v-if="raffleInfo.type">
					<view v-if="raffleInfo.type === 4" style="margin-top: 70upx;font-size: 54upx;font-weight: bold;color: #ffaa00;text-align: center;letter-spacing: 25upx;">
						谢谢参与
					</view>
					<view v-else style="text-align: center;">
						<view style="margin-top: 20upx;font-size: 54upx;font-weight: bold;color: #FFE500;">恭喜你，中奖啦</view>
						<view style="color: #FFC300;">
							<view style="margin-top: 24upx;font-size: 44upx;font-weight: bold;">
								<text v-if="raffleInfo.type === 1">红包金额：{{ raffleInfo.value }}</text>
								<text v-else-if="raffleInfo.type === 2">积分数量：{{ raffleInfo.value }}</text>
								<text v-else-if="raffleInfo.type === 3">体验金数量：{{ raffleInfo.value }}</text>
								<text v-else>--</text>
							</view>
							<view style="margin-top: 28upx;">
								<text v-if="raffleInfo.type === 1">红包</text>
								<text v-else-if="raffleInfo.type === 2">积分</text>
								<text v-else-if="raffleInfo.type === 3">体验金</text>
								<text v-else-if="raffleInfo.type === 4">谢谢惠顾</text>
								<text v-else>--</text>
								<text>已发放到您的账户，请注意查收</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</tui-landscape>
	</view>
</template>

<script>
import { getPrizeLotteryDrawListApi, getPrizeLotteryDrawApi } from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
	name: 'Raffle',
	props: {
		brandDetail: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			status: 'none',
			loadingStatus: 'noMore',
			rafflePrizeList: [],
			topPrize: [],
			middlePrize: [],
			bottomPrize: [],
			showRaffleLandscape: false,
			raffleInfo: { }
		}
	},

	created() {
		this.getPrizeLotteryDrawListApi()
	},
	methods: {
		getPrizeLotteryDrawListApi() {
			if (!this.brandDetail.id) return this.$showToast('缺少商家信息')
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getPrizeLotteryDrawListApi({ brandId: this.brandDetail.id })
				.then(({ data }) => {
					this.rafflePrizeList = data || []
					this.rafflePrizeList = this.rafflePrizeList.sort((a, b) => Number(a.position) - Number(b.position))
					if (this.rafflePrizeList.length >= 6) {
						this.topPrize = this.rafflePrizeList.slice(0, 3)
						this.middlePrize = this.rafflePrizeList.slice(3, 5)
						this.bottomPrize = this.rafflePrizeList.slice(5)
					} else if (this.rafflePrizeList.length >= 4) {
						this.topPrize = this.rafflePrizeList.slice(0, 3)
						this.middlePrize = this.rafflePrizeList.slice(3)
					} else if (this.rafflePrizeList.length) {
						this.topPrize = this.rafflePrizeList.slice(0)
					}
					console.log(this.middlePrize)
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		handleClickRaffle() {
			if (!getUserId()) return
			if (!this.brandDetail.id) return this.$showToast('缺少商家信息')
			uni.showLoading({
				title: '抽奖中'
			})
			getPrizeLotteryDrawApi({ brandId: this.brandDetail.id, userId: getUserId() })
				.then(({ data }) => {
					uni.hideLoading()
					this.raffleInfo = data || {}
					this.showRaffleLandscape = true
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.no-data {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 180upx;
	color: #999999;
	font-size: 36upx;
	letter-spacing: 2px;
}
</style>
