<template>
	<view class="-message-fill-container" :style="{ margin }">
		<view
			style="padding: 28rpx 20rpx;background-color: #ffffff;font-size: 26rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
			:style="{ color: text ? color ? color : '' : '#999', borderRadius: radius }"
			@click="isShowPopup = true"
		>
			{{ text ? text : placeholder || "--" }}
		</view>
		<tui-bottom-popup :show="isShowPopup" @close="isShowPopup = false">
			<scroll-view scroll-y style="height: 100%;max-height: 50vh;">
				<view style="padding: 20rpx 46rpx 28rpx;">
					<view>
						<view style="font-weight: bold;">备注说明</view>
						<view style="margin-top: 28rpx;padding: 26rpx 30rpx;background-color: #f1f1f1;">
							<tui-textarea
								v-model="formData.remark" placeholder="请填写备注说明" height="160rpx" min-height="160rpx"
								padding="0" background-color="transparent" placeholder-style="color: #999999;"
							></tui-textarea>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 28rpx;">
						<tui-button type="gray" width="47%" height="86rpx" margin="0" :size="28" @click="handleReset">
							取 消
						</tui-button>
						<tui-button type="warning" width="47%" height="86rpx" margin="0" :size="28" @click="handleConfirm">
							确 认
						</tui-button>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>

export default {
	name: 'ATFMessageFill',
	props: {
		margin: {
			type: String,
			default: ''
		},
		radius: {
			type: String,
			default: '0'
		},
		placeholder: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isShowPopup: false,
			formData: {
				remark: ''
			}
		}
	},
	methods: {
		handleReset() {
			this.formData = {
				remark: ''
			}
			this.isShowPopup = false
		},
		handleConfirm() {
			this.$emit('confirm', this.formData)
			this.isShowPopup = false
		}
	}
}
</script>

<style lang="scss" scoped>
.-message-fill-container {
	box-sizing: border-box;
}
</style>
