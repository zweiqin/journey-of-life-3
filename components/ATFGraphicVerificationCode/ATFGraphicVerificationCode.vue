<template>
	<view class="graphic-verification-code-container">
		<view v-if="type === 'code'">
			<tui-input
				:value="inpuValue" :type="inputType" :padding="inputPadding" :placeholder-style="inputStyle"
				background-color="transparent" :border-top="inputBorderTop" :border-color="inputBorderColor" :label="inputLabel"
				:label-color="inputLabelColor" :placeholder="placeholder" :color="inputColor" @input="handleValueInput"
			>
				<template #right>
					<tui-countdown-verify
						ref="refVerify" :width="countdownWidth" :height="countdownHeight"
						:border-width="countdownborderWidth" :text="countdownText" :size="countdownSize" :color="countdownColor"
						@send="handleGainVerify"
					></tui-countdown-verify>
				</template>
			</tui-input>
		</view>
		<view v-else-if="type === 'other'">
			<slot name="other" :phone="phone"></slot>
		</view>

		<tui-dialog style="position: relative;z-index: 888;" :buttons="[]" :show="isShowGraphicVerificationDialog" title="">
			<template #content>
				<view v-if="verificationType === 'imageText'">
					<view style="font-size: 34rpx;font-weight: bold;color: #000000;margin-top: 38rpx;">图文码验证</view>
					<view>
						<tui-input
							:value="inputText" label="" type="text" placeholder="请输入图文码"
							padding="26rpx 0 4rpx"
							@input="handleCodeInput"
						>
							<template #right>
								<image
									v-if="generateUrl" style="width: 256rpx;height: 64rpx;" :src="generateUrl" mode="scaleToFill"
									@click="handleGenerateCode()"
								/>
								<text v-else>图文码生成中...</text>
							</template>
						</tui-input>
						<view style="text-align: right;color: #0000ff;" @click="handleGenerateCode()">点击刷新</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 28rpx;">
						<tui-button
							type="gray" width="47%" height="86rpx" margin="0"
							:size="28"
							@click="isShowGraphicVerificationDialog = false"
						>
							取 消
						</tui-button>
						<tui-button type="warning" width="47%" height="86rpx" margin="0" :size="28" @click="handleConfirmText">
							确 认
						</tui-button>
					</view>
				</view>
				<view v-if="verificationType === 'sliding'">
					<view style="font-size: 34rpx;font-weight: bold;color: #000000;margin-top: 38rpx;">滑动码验证</view>
					<view style="margin: 28rpx -40rpx 0;">
						<SliderCaptcha
							v-model="slideVisible"
							:options="slideOptions"
							:loading="slideLoading"
							@check="handleConfirmSlide"
							@close="isShowGraphicVerificationDialog = false"
							@refresh="getSliderOptions"
							@error="getSliderOptions"
						>
							<template #title>安全验证</template>
							<template #successText>验证通过</template>
							<template #errorText>
								<text style="color: #dc362e;">是不是太难了，换一个</text>
							</template>
							<template #tips>拖动下方滑块完成拼图</template>
							<!-- <template #question>自定义提示</template> -->
						</SliderCaptcha>
					</view>
					<!-- <view style="display: flex;justify-content: center;margin-top: 28rpx;">
						<tui-button
						type="gray" width="60%" height="66rpx" margin="0"
						:size="28"
						@click="isShowGraphicVerificationDialog = false"
						>
						取 消
						</tui-button>
						</view> -->
				</view>
			</template>
		</tui-dialog>

		<GraphicPoster ref="refGraphicPoster" @success="(e) => generatedCode = e"></GraphicPoster>
	</view>
</template>

<script>
import GraphicPoster from './GraphicPoster.vue'
import SliderCaptcha from './SliderCaptcha.vue'
import { getVerifyCodeApi, getVerificationImageCaptchaApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFGraphicVerificationCode',
	components: { GraphicPoster, SliderCaptcha },
	props: {
		type: {
			type: String,
			default: 'other' // other，code
		},
		phone: {
			type: [Number, String],
			default: ''
		},
		isVerification: {
			type: Boolean,
			default: true
		},
		verificationType: {
			type: String,
			default: 'sliding' // imageText，sliding
		},
		inputType: {
			type: String,
			default: 'text'
		},
		inputPadding: {
			type: String,
			default: '26rpx 30rpx'
		},
		inputStyle: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '请输入验证码'
		},
		inputBorderTop: {
			type: Boolean,
			default: false
		},
		inputBorderColor: {
			type: String,
			default: 'rgba(0, 0, 0, 0.1)'
		},
		inputLabelColor: {
			type: String,
			default: '#333'
		},
		inputLabel: {
			type: String,
			default: ''
		},
		inputColor: {
			type: String,
			default: '#333'
		},
		countdownWidth: {
			type: String,
			default: '182rpx'
		},
		countdownHeight: {
			type: String,
			default: '56rpx'
		},
		countdownText: {
			type: String,
			default: '发送验证码'
		},
		countdownSize: {
			type: Number,
			default: 24
		},
		countdownborderWidth: {
			type: String,
			default: '1px'
		},
		countdownColor: {
			type: String,
			default: '#5677fc'
		}
	},
	data() {
		return {
			inpuValue: '',
			isShowGraphicVerificationDialog: false,
			// 图文码方式
			inputText: '',
			generatedCode: '',
			generateUrl: '',
			// 滑动码方式
			slideVisible: false,
			slideLoading: false,
			slideOptions: {
				cutoutImage: '',
				shadeImage: '',
				sliderKey: '',
				sliderY: ''
			}
		}
	},
	methods: {
		handleValueInput(e) {
			this.inpuValue = e
			this.$emit('input', this.inpuValue)
		},
		// 获取验证码
		handleGainVerify() {
			if (!this.phone) {
				this.$refs.refVerify.reset()
				this.$showToast('请填写手机号')
			} else if (!/^1[3-9]\d{9}$/.test(this.phone)) {
				this.$refs.refVerify.reset()
				this.$showToast('请输入正确的手机号')
			} else if (this.isVerification) {
				this.$refs.refVerify.reset()
				this.isShowGraphicVerificationDialog = true
				this.handleGenerateCode()
			} else {
				return this.handleSendVerify()
			}
		},

		async handleGenerateCode() {
			if (this.verificationType === 'imageText') {
				if (this.$refs.refGraphicPoster) {
					const generateUrl = await this.$refs.refGraphicPoster.handleGenerateText()
					this.generateUrl = generateUrl
				}
			} else if (this.verificationType === 'sliding') {
				this.slideVisible = true
				this.getSliderOptions()
			}
		},

		// 图文码
		handleCodeInput(e) {
			this.inputText = e
			if (this.inputText === this.generatedCode) this.$emit('code-verify', true)
		},
		handleConfirmText() {
			if (this.handleVerify()) {
				this.$emit('success-verify', true)
				if (this.type === 'code') {
					this.handleSendVerify()
				}
			} else {
				return this.$showToast('请输入正确的图文码')
			}
			this.inputText = ''
			this.generatedCode = ''
			this.generateUrl = ''
			this.isShowGraphicVerificationDialog = false
		},

		// 滑动码
		getSliderOptions() {
			uni.showLoading({
				title: '获取中'
			})
			this.slideLoading = true
			getVerificationImageCaptchaApi({ type: 'slide' })
				.then((res) => {
					uni.hideLoading()
					this.slideOptions = {
						cutoutImage: res.data.cutoutImage,
						shadeImage: res.data.shadeImage,
						sliderKey: 'key',
						sliderY: res.data.y
					}
					this.slideLoading = false
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleConfirmSlide({ sliderKey, sliderX, done, error }) {
			this.slideLoading = true
			console.log(sliderX, this.slideOptions.sliderY)
			getVerifyCodeApi({ phone: this.phone, x: sliderX, y: this.slideOptions.sliderY, xxx: sliderKey })
				.then((res) => {
					this.$emit('success-verify', true)
					this.slideLoading = false
					done()
					this.$refs.refVerify.success()
					this.isShowGraphicVerificationDialog = false
					this.$showToast('发送成功，请注意查看手机短信')
				})
				.catch(() => {
					this.slideLoading = false
					error()
				})
		},

		handleSendVerify() {
			if (!this.phone) {
				return this.$showToast('请填写手机号')
			}
			if (!/^1[3-9]\d{9}$/.test(this.phone)) {
				return this.$showToast('请输入正确的手机号')
			}
			uni.showLoading({
				title: '操作中'
			})
			getVerifyCodeApi({ phone: this.phone, x: '0', y: '0' })
				.then((res) => {
					uni.hideLoading()
					this.$refs.refVerify.success()
					this.$showToast('发送成功，请注意查看手机短信')
				})
				.catch(() => {
					this.$refs.refVerify.reset()
					uni.hideLoading()
				})
		},

		handleVerify() {
			if (this.verificationType === 'imageText') {
				if (this.inputText && (this.inputText === this.generatedCode)) {
					return true
				}
				return false
			}
			return false
		},
		handleResetData() {
			if (this.verificationType === 'imageText') {
				this.inputText = ''
				this.generatedCode = ''
				this.generateUrl = ''
			}
			this.handleGenerateCode()
		}
	}
}
</script>

<style lang="scss" scoped>
.graphic-verification-code-container {
	box-sizing: border-box;

	/deep/ .tui-dialog {
		.tui-dialog__hd {
			display: none;
		}

		.tui-dialog__ft {
			display: none;
		}
	}
}
</style>
