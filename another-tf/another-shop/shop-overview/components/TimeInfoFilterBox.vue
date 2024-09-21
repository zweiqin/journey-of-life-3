<template>
	<view class="time-info-filter-box-container" :style="{ margin }">
		<view
			style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 22rpx 20rpx 60rpx;font-size: 28rpx;background-color: #ffffff;"
			@click="isShowPopup = true"
		>
			<view
				style="display: flex;align-items: center;"
				:style="{ color: formData.datesStart && formData.datesEnd ? '#ff4b10' : '#666666' }"
			>
				<text>成为客户时间</text>
				<tui-icon
					name="turningdown"
					:color="formData.datesStart && formData.datesEnd ? '#ff4b10' : '#666666'"
					:size="22" margin="0 0 0 2rpx"
				></tui-icon>
			</view>
			<view
				style="display: flex;align-items: center;"
				:style="{ color: formData.lastTimesStart && formData.lastTimesEnd ? '#ff4b10' : '#666666' }"
			>
				<text>最近消费时间</text>
				<tui-icon
					name="turningdown"
					:color="formData.lastTimesStart && formData.lastTimesEnd ? '#ff4b10' : '#666666'"
					:size="22" margin="0 0 0 2rpx"
				></tui-icon>
			</view>
			<view
				style="display: flex;align-items: center;" :style="{ color: formData.phone ? '#ff4b10' : '#666666' }"
			>
				<tui-icon
					name="search"
					:color="formData.phone ? '#ff4b10' : '#666666'" :size="22"
					margin="0 0 0 2rpx"
				></tui-icon>
			</view>
		</view>

		<tui-bottom-popup
			:z-index="boxZIndex" :mask-z-index="boxMaskZIndex"
			:show="isShowPopup" @close="isShowPopup = false"
		>
			<scroll-view scroll-y style="height: 100%;max-height: 70vh;">
				<view :style="{ padding: boxPadding }">
					<view>
						<view style="margin-bottom: 42rpx;">
							<view>成为客户开始时间：</view>
							<view style="border-bottom: 2rpx solid #bebebe;">
								<tui-input
									v-model="formData.datesStart"
									placeholder="请选择成为客户开始时间" disabled :border-bottom="false"
									padding="18rpx 2rpx 10rpx" @click="$refs.dateTimeDatesStart.show()"
								>
									<template #right>
										<tui-button
											v-if="formData.datesStart" type="danger" :size="28" width="80rpx"
											height="40rpx" shape="circle" @click="formData.datesStart = ''"
										>
											重置
										</tui-button>
									</template>
								</tui-input>
							</view>
						</view>
						<view style="margin-bottom: 42rpx;">
							<view>成为客户结束时间：</view>
							<view style="border-bottom: 2rpx solid #bebebe;">
								<tui-input
									v-model="formData.datesEnd"
									placeholder="请选择成为客户结束时间" disabled :border-bottom="false"
									padding="18rpx 2rpx 10rpx" @click="$refs.dateTimeDatesEnd.show()"
								>
									<template #right>
										<tui-button
											v-if="formData.datesEnd" type="danger" :size="28" width="80rpx"
											height="40rpx" shape="circle" @click="formData.datesEnd = ''"
										>
											重置
										</tui-button>
									</template>
								</tui-input>
							</view>
						</view>
						<view style="margin-bottom: 42rpx;">
							<view>最近消费开始时间：</view>
							<view style="border-bottom: 2rpx solid #bebebe;">
								<tui-input
									v-model="formData.lastTimesStart"
									placeholder="请选择成为最近消费开始时间" disabled :border-bottom="false"
									padding="18rpx 2rpx 10rpx" @click="$refs.dateTimeLastTimesStart.show()"
								>
									<template #right>
										<tui-button
											v-if="formData.lastTimesStart" type="danger" :size="28" width="80rpx"
											height="40rpx" shape="circle" @click="formData.lastTimesStart = ''"
										>
											重置
										</tui-button>
									</template>
								</tui-input>
							</view>
						</view>
						<view style="margin-bottom: 42rpx;">
							<view>最近消费结束时间：</view>
							<view style="border-bottom: 2rpx solid #bebebe;">
								<tui-input
									v-model="formData.lastTimesEnd"
									placeholder="请选择成为最近消费结束时间" disabled :border-bottom="false"
									padding="18rpx 2rpx 10rpx" @click="$refs.dateTimeLastTimesEnd.show()"
								>
									<template #right>
										<tui-button
											v-if="formData.lastTimesEnd" type="danger" :size="28" width="80rpx"
											height="40rpx" shape="circle" @click="formData.lastTimesEnd = ''"
										>
											重置
										</tui-button>
									</template>
								</tui-input>
							</view>
						</view>
						<view style="margin-bottom: 42rpx;border-bottom: 2rpx solid #bebebe;">
							<tui-input
								v-model="formData.phone" label="手机号" :border-bottom="false"
								padding="18rpx 2rpx 10rpx" type="number" placeholder="请输入手机号"
							></tui-input>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 28rpx;">
						<tui-button type="gray" width="47%" height="86rpx" margin="0" :size="28" @click="handleCancle">
							取 消
						</tui-button>
						<tui-button type="warning" width="47%" height="86rpx" margin="0" :size="28" @click="handleConfirm">
							确 认
						</tui-button>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
		<tui-datetime
			ref="dateTimeDatesStart" :type="7" radius :end-year="new Date().getFullYear()"
			@confirm="(e) => formData.datesStart = e.result"
		></tui-datetime>
		<tui-datetime
			ref="dateTimeDatesEnd" :type="7" radius :end-year="new Date().getFullYear()"
			@confirm="(e) => formData.datesEnd = e.result"
		></tui-datetime>
		<tui-datetime
			ref="dateTimeLastTimesStart" :type="7" radius :end-year="new Date().getFullYear()"
			@confirm="(e) => formData.lastTimesStart = e.result"
		></tui-datetime>
		<tui-datetime
			ref="dateTimeLastTimesEnd" :type="7" radius :end-year="new Date().getFullYear()"
			@confirm="(e) => formData.lastTimesEnd = e.result"
		></tui-datetime>
	</view>
</template>

<script>

export default {
	name: 'TimeInfoFilterBox',
	props: {
		margin: {
			type: String,
			default: '0'
		},
		boxPadding: {
			type: String,
			default: '30rpx 46rpx 28rpx'
		},
		boxZIndex: {
			type: Number,
			default: 996
		},
		boxMaskZIndex: {
			type: Number,
			default: 995
		}
	},
	data() {
		return {
			isShowPopup: false,
			formData: {
				datesStart: '',
				datesEnd: '',
				lastTimesStart: '',
				lastTimesEnd: '',
				phone: ''
			}
		}
	},
	methods: {
		handleCancle() {
			this.isShowPopup = false
		},
		handleConfirm() {
			if ((this.formData.datesStart && !this.formData.datesEnd) || (!this.formData.datesStart && this.formData.datesEnd)) {
				return this.$showToast('请选择完整的成为客户时间')
			}
			if (this.formData.datesStart && this.formData.datesEnd && (Date.parse(this.formData.datesStart) >= Date.parse(this.formData.datesEnd))) {
				return this.$showToast('成为客户结束时间要大于成为客户开始时间')
			}
			if ((this.formData.lastTimesStart && !this.formData.lastTimesEnd) || (!this.formData.lastTimesStart && this.formData.lastTimesEnd)) {
				return this.$showToast('请选择完整的最近消费时间')
			}
			if (this.formData.lastTimesStart && this.formData.lastTimesEnd && (Date.parse(this.formData.lastTimesStart) >= Date.parse(this.formData.lastTimesEnd))) {
				return this.$showToast('最近消费结束时间要大于最近消费开始时间')
			}
			if (this.formData.phone && !/^1[3-9]\d{9}$/.test(this.formData.phone)) {
				return this.$showToast('请输入正确的手机号')
			}
			this.$emit('confirm', {
				dates: [this.formData.datesStart, this.formData.datesEnd],
				lastTimes: [this.formData.lastTimesStart, this.formData.lastTimesEnd],
				phone: this.formData.phone
			})
			this.isShowPopup = false
		}
	}
}
</script>

<style lang="scss" scoped>
.time-info-filter-box-container {
	box-sizing: border-box;
}
</style>
