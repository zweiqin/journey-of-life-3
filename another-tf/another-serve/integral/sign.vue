<template>
	<view class="integral-container">
		<JHeader title="签到领积分" width="50" height="50"></JHeader>
		<view class="signBg">
			<view style="font-size: 44rpx;font-weight: bold;text-align: center;">每日签到送积分</view>
			<view
				v-if="signList && signList.length && signList[signList.length - 1].continueDay"
				class="signDayNumBox flex-center"
			>
				<view class="signDayNum fs28">
					当前周期已连续签到
					<text class="fs40">{{ signList[signList.length - 1].continueDay || 0 }}</text>
					天
				</view>
			</view>
			<view
				v-if="isSignIn"
				class="signState flex-center mar-top-30"
			>
				<view class="signStateBg flex-items flex-center noSign">
					<text class="fs48">已签到</text>
				</view>
			</view>
			<view v-else class="signState flex-center mar-top-30" @click="handleSignIn">
				<view class="signStateBg flex-items flex-center">
					<text class="fs48">未签到</text>
				</view>
			</view>
			<view class="calendarBox">
				<view class="calendarBg">
					<view class="calendar-box">
						<view class="month">
							<tui-icon name="arrowleft" :size="48" unit="rpx" color="#C5AA7B" @click="handleLastMonth"></tui-icon>
							<view>{{ yearShow }}年{{ monthShow }}月</view>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#C5AA7B" @click="handleNextMonth"></tui-icon>
							<picker
								class="picker" mode="date" fields="month"
								@change="(e) => (yearShow = Number(e.detail.value.split('-')[0])) && (monthShow = Number(e.detail.value.split('-')[1])) && getSignData()"
							/>
						</view>
						<view class="week">
							<view
								v-for="(weeks, index) in ['日', '一', '二', '三', '四', '五', '六']" :key="weeks"
								:style="'color:' + (index === new Date().getDay() ? '#C5AA7B' : '') + ';'"
							>
								{{ weeks }}
							</view>
						</view>
						<view class="day">
							<view v-for="(days, index) in dayArr" :key="index" class="dayItem">
								<view
									:class="[
										{ 'checkday': days.date === '' },
										{ 'choose': days.date === currentDay },
										{ 'select': days.select === 1 }
									]" class="dayValue"
								>
									{{ days.day }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="redEnvelope mar-top-20">
				<view class="redEnvelopeBg flex-items flex-center">
					<view>
						<view class="fs32 font-color-333">积分兑换红包优惠券</view>
						<view class="fs24 font-color-999 mar-top-10">各种大额红包等你兑换哦</view>
						<view
							class="fs24 font-color-FFF exchangeBtn mar-top-20"
							@click="go('/another-tf/another-serve/integral/index?tabActive=2')"
						>
							马上兑换
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 签到弹窗 -->
		<tui-modal :show="signTips" custom fadein>
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					签到成功
				</view>
				<view class="mar-top-40 text-align">
					今日签到成功，签到积分可以在我的积分内兑换商品
				</view>
				<view class="flex-display flex-sp-between">
					<view class="btn" @click="signTips = false">
						取消
					</view>
					<view class="btn submit" @click="signTips = false">
						确定
					</view>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { updateCreditSignInApi, updateCreditSelectByMonthApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Sign',
	data() {
		return {
			signList: [],
			yearShow: new Date().getFullYear(), // 当前年
			monthShow: new Date().getMonth() + 1, // 当前月
			currentDay: `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
			isSignIn: true,
			dayArr: [], // 当前月每日
			signTips: false
		}
	},
	onLoad() {
		this.getSignData()
	},
	methods: {
		// 签到
		handleSignIn() {
			uni.showLoading({
				mask: true,
				title: '签到中...'
			})
			updateCreditSignInApi({}).then((res) => {
				uni.hideLoading()
				this.getSignData()
				this.signTips = true
			})
		},
		// 上一个月
		handleLastMonth() {
			if (this.monthShow === 1) {
				this.yearShow -= 1
				this.monthShow = 12
			} else {
				this.monthShow -= 1
			}
			this.getSignData()
		},
		// 下一个月
		handleNextMonth() {
			if (this.monthShow === 12) {
				this.yearShow += 1
				this.monthShow = 1
			} else {
				this.monthShow += 1
			}
			this.getSignData()
		},
		getSignData() {
			uni.showLoading({
				mask: true,
				title: '请稍等...'
			})
			updateCreditSelectByMonthApi({ month: `${this.yearShow}-${String(this.monthShow).padStart(2, '0')}` })
				.then((res) => {
					uni.hideLoading()
					this.initDate()
					this.signList = res.data
					if (`${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}` === `${this.yearShow}-${String(this.monthShow).padStart(2, '0')}`) {
						this.isSignIn = !!(this.signList && this.signList.length && (this.currentDay === this.signList[this.signList.length - 1].createTime.substring(0, 10)))
					}
					this.signList.forEach((item) => {
						item.day = Number(item.createTime.slice(8, 10))
						for (let j = 0; j < this.dayArr.length; j++) {
							if ((item.day === this.dayArr[j].day) && this.dayArr[j].date) {
								this.dayArr[j].select = 1
							}
						}
					})
				})
		},
		// 初始化日期
		initDate() {
			this.dayArr = []
			const totalDay = new Date(this.yearShow, this.monthShow, 0).getDate() // 当前月总天数
			// 遍历总天数将日期逐个添加至数组
			for (let i = 1; i <= totalDay; i++) {
				// 得到需补充天数
				const value = new Date(this.yearShow, this.monthShow - 1, i).getDay()
				// 补充前面空白日期
				if ((i === 1) && (value !== 0)) {
					const totalDay = new Date(this.yearShow, this.monthShow - 1, 0).getDate()
					for (let k = 0; k < value; k++) {
						const obj = {}
						obj.date = ''
						obj.day = totalDay - (value - k) + 1
						this.dayArr.push(obj)
					}
				}
				// 添加本月日期
				const obj = {}
				obj.date = `${this.yearShow}-${String(this.monthShow).padStart(2, '0')}-${String(i).padStart(2, '0')}`
				obj.day = i
				obj.select = 0
				this.dayArr.push(obj)
				// 补充后面空白日期
				if ((i === totalDay) && (value !== 6)) {
					for (let k = 0; k < (6 - value); k++) {
						const obj = {}
						obj.date = ''
						obj.day = k + 1
						this.dayArr.push(obj)
					}
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
.integral-container {
	min-height: 100%;
	background-color: #F8F8F8;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.signBg {
		background-size: contain;
		min-height: 100vh;
		padding-top: 40rpx;

		.signDayNumBox {
			width: 100%;

			.signDayNum {

				text {
					margin: 0 10rpx;
				}
			}
		}

		.signState {
			.signStateBg {
				width: 300rpx;
				height: 300rpx;
				background-color: #fddd99;
				background-size: contain;

				text {
					color: #C83732;
				}
			}

			.noSign {
				background-color: #cccccc;
				background-size: contain;

				text {
					color: #FFFFFF;
				}
			}
		}

		.calendarBox {
			padding: 0 20rpx;
			min-height: 300rpx;

			.calendarBg {
				border-radius: 16rpx;
				background: #FFFFFF;
				box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.05);
				overflow: hidden;
			}
		}
	}

	.redEnvelope {
		padding: 0 20rpx;

		.redEnvelopeBg {
			height: 230rpx;
			background-color: #fff9f6;
			background-size: contain;
			padding-right: 50rpx;

			.exchangeBtn {
				width: 160rpx;
				height: 56rpx;
				line-height: 56rpx;
				background: #C83732;
				border-radius: 8rpx;
				text-align: center;
			}
		}
	}
}

.calendar-box {
	width: 100%;
	flex-direction: column;
	justify-content: center;
}

.calendar-box,
.month,
.week,
.day {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.month,
.week,
.day {
	width: 100%;
}

.month {
	height: 96rpx;
	padding: 0 50rpx;
	position: relative;
	background: #FAF6ED;
}

.picker {
	width: 160rpx;
	height: 40rpx;
	position: absolute;
	top: 20rpx;
	left: 50%;
	transform: translate(-50%, -50%);
}

.day {
	flex-wrap: wrap;
}

.week>view,
.day>view.dayItem {
	width: 100rpx;
	height: 100rpx;
	position: relative;
	line-height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.dayValue {
	width: 60rpx;
	height: 60rpx;
	text-align: center;
	position: relative;
	line-height: 60rpx;
}

.checkday {
	color: #999;
}

.select {
	background: #FAF6ED;
	color: #C5AA7B;
	border-radius: 50%;
}

.choose {
	color: #FFFFFF;
	background: #C5AA7B;
	border-radius: 50%;
}

.Put-box1 {
	.btn {
		text-align: center;
		margin-top: 40rpx;
		border: 2rpx solid #333333;
		height: 80rpx;
		line-height: 80rpx;
		width: 240rpx;
		color: #333333;
	}

	.submit {
		background-color: #333333;
		color: #FFEBC4;
	}
}
</style>
