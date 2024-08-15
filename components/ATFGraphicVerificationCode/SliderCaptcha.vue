<template>
	<!-- 源插件ID：kkokk-slider-captcha -->
	<view class="slider-captcha-container">
		<view v-if="dialogVisible" class="lang-dialog">
			<view class="lang-dialog__header">
				<view class="lang-dialog__title">
					<slot name="title">{{ title }}</slot>
				</view>
				<view type="button" class="lang-dialog-header-btn" @click="close"> <i class="lang-icon-close"></i> </view>
			</view>
			<view class="lang-dialog__body">
				<view v-show="failed" class="tips">
					<slot name="errorText">{{ errorText }}</slot>
				</view>
				<view v-show="!failed" class="tips">
					<slot name="tips">{{ tips }}</slot>
				</view>
				<view class="slider-body" :class="{ 'slider-shock': shock }">
					<view v-show="mask" class="loading-transparent-mask"></view>
					<view v-if="loading" class="loading-body">
						<view class="loading slider-loading"></view>
					</view>
					<view
						v-show="!loading" class="slider-bg slider-img"
						:style="{ 'background-image': 'url(data:image/png;base64,' + shadeImage + ')' }"
					>
					</view>
					<view
						v-show="!loading" class="slider-draw slider-move-draw slider-img"
						:style="{ 'background-image': 'url(data:image/png;base64,' + cutoutImage + ')', 'top': sliderY + 'px', 'left': sliderMoveDrawLeft }"
						@touchstart.stop="sliderTouchStart" @touchmove.stop="sliderTouchMove" @touchend.stop="sliderEnd"
						@mousedown="sliderDown"
					>
					</view>
					<view class="slider-progress"></view>
					<view v-show="success" class="slider-success">
						<view class="slider-success-icon">
							<tui-icon name="circle-fill" :size="60" unit="px" color="#2cd000" margin="0"></tui-icon>
						</view>
						<view class="slider-success-text">
							<slot name="successText">{{ successText }}</slot>
						</view>
					</view>
					<view
						class="slider-btn slider-move-btn" :style="{ 'left': sliderMoveLeft }"
						:class="{ 'slider-shock': shock }" @touchstart.stop="sliderTouchStart" @touchmove.stop="sliderTouchMove"
						@touchend.stop="sliderEnd" @mousedown="sliderDown"
					>
						<i>&nbsp;</i>
						<tui-icon name="more-fill" :size="34" unit="px" color="#ffffff" margin="0"></tui-icon>
					</view>
				</view>
				<view style="position:relative;display: flex;align-items: center;width: 280px;margin: 0 auto;">
					<view class="slider-refresh" @click.stop="questionMessage = !questionMessage">
						<tui-icon name="explain" :size="28" unit="px" color="#999999" margin="0"></tui-icon>
					</view>
					<view class="slider-refresh" @click.stop="refresh">
						<tui-icon name="refresh" :size="28" unit="px" color="#999999" margin="0"></tui-icon>
					</view>
				</view>
				<view v-if="questionMessage">
					<slot name="question">
						<view v-if="question">{{ question }}</view>
						<view v-else>无注意事项</view>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'SliderCaptcha',
	props:
		{
			value: {
				type: Boolean,
				defalut: false
			},
			loading: {
				type: Boolean,
				defalut: false
			},
			title: {
				type: String,
				default: '滑块安全验证'
			},
			tips: {
				type: String,
				default: '拖动下方滑块完成拼图'
			},
			successText: {
				type: String,
				default: '验证成功'
			},
			errorText: {
				type: String,
				default: '是不是太难了，咱换一个'
			},
			question: {
				type: String,
				default: ''
			},
			options: {
				type: Object,
				default() {
					return {
						cutoutImage: '',
						shadeImage: '',
						sliderKey: '',
						sliderY: ''
					}
				}
			}
		},
	data() {
		return {
			dialogVisible: false,
			mask: false,
			success: false,
			failed: false,
			cutoutImage: '',
			shadeImage: '',
			sliderKey: '',
			sliderX: 26,
			sliderY: '',
			sliderMoveDrawLeft: '26px',
			sliderMoveLeft: '20px',
			shock: false,
			tipEvents: {},
			sliderMoveX: 0,
			questionMessage: false
		}
	},
	watch: {
		value: {
			handler(val) {
				this.init(val)
			},
			immediate: true
		},
		options: {
			handler(option) {
				this.clear()
				this.cutoutImage = option.cutoutImage
				this.shadeImage = option.shadeImage
				this.sliderKey = option.sliderKey
				this.sliderY = option.sliderY
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		init(open) {
			this.dialogVisible = open
			if (open) {
				this.clear()
			}
		},
		clear() {
			this.mask = false
			this.success = false
			this.failed = false
			this.cutoutImage = ''
			this.shadeImage = ''
			this.sliderKey = ''
			this.sliderX = 26
			this.sliderMoveDrawLeft = '26px',
			this.sliderMoveLeft = '20px',
			this.sliderY = ''
		},
		check(sliderKey, sliderX) {
			this.$emit('check', { sliderKey, sliderX, done: this.done, error: this.error })
		},
		done() {
			this.success = true
		},
		error() {
			this.failed = true
			this.mask = true
			this.shock = true
			setTimeout(() => {
				this.shock = false
				this.$emit('error')
			}, 1000)
		},
		close() {
			this.dialogVisible = false
			this.$emit('input', this.dialogVisible)
			this.$emit('close')
		},
		refresh() {
			this.$emit('refresh')
		},
		sliderTouchStart(e) {
			// 移动触摸移动
			const that = this
			const slider = e.target
			that.sliderMoveX = e.touches[0].clientX - slider.offsetLeft
			console.log(e, e.touches[0].clientX, slider.offsetLeft)
		},
		sliderTouchMove(e) {
			const that = this
			const left = e.touches[0].clientX - that.sliderMoveX
			if (left >= 20 && left <= 280) {
				that.sliderMoveDrawLeft = 5 + left + 'px'
				that.sliderMoveLeft = left + 'px'
				that.sliderX = 5 + left
			}
		},
		sliderEnd() {
			this.check(this.sliderKey, this.sliderX)
		},
		sliderDown(e) {
			console.log(e)
			const that = this
			const slider = e.target // 获取目标元素
			// 算出鼠标相对元素的位置
			that.sliderMoveX = e.clientX - slider.offsetLeft
			document.onmousemove = (e) => {
				const left = e.clientX - that.sliderMoveX
				if (left >= 20 && left <= 280) {
					//   slider.style.left = left + 'px'
					that.sliderMoveDrawLeft = 5 + left + 'px'
					that.sliderMoveLeft = left + 'px'
					that.sliderX = 5 + left
				}
			}
			document.onmouseup = () => {
				document.onmousemove = null
				document.onmouseup = null
				this.check(this.sliderKey, this.sliderX)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.slider-captcha-container {
	box-sizing: border-box;

	.slider-shock {
		animation-delay: 0s;
		animation-name: shock;
		animation-duration: .1s;
		animation-iteration-count: 5;
		animation-direction: normal;
		animation-timing-function: linear;
	}

	@keyframes shock {
		0% {
			transform: translateX(2px);
		}

		100% {
			transform: translateX(-2px);
		}
	}

	/* 弹窗开始  */
	.lang-dialog {
		position: relative;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 30%);
		box-sizing: border-box;
		background: #FFF;
	}

	.lang-dialog__header {
		padding: 20px 20px 10px;
	}

	.lang-dialog__title {
		line-height: 20px;
		font-size: 18px;
		color: #525252;
	}

	.lang-dialog-header-btn {
		position: absolute;
		top: 20px;
		right: 20px;
		padding: 0;
		background: 0 0;
		border: none;
		outline: 0;
		cursor: pointer;
		font-size: 16px
	}

	.lang-icon-close {
		color: rgba(0, 0, 0, 0.68);
		font-size: 20px;
	}

	.lang-icon-close:before {
		content: '×';
	}

	.lang-icon-close:hover {
		color: rgba(0, 0, 0, 0.88);
	}

	.lang-dialog__body {
		padding: 0 0 6px;
		color: #828282;
		font-size: 14px;
		word-break: break-all;
	}

	.loading-transparent-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		z-index: 999;
	}

	/* 弹窗结束  */
	/* loading start */
	.loading-body {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.6);
		z-index: 999;
	}

	.loading {
		position: relative;
		display: inline-block;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border-top: 2px solid transparent;
		border-bottom: 2px solid transparent;
		border-left: 2px solid #409eff;
		border-right: 2px solid #409eff;
		animation: loading 1s infinite linear;
	}

	@keyframes loading {
		to {
			transform: rotate(360deg);
		}
	}

	.slider-loading {
		position: absolute;
		top: calc(50% - 15px);
		left: calc(50% - 15px);
		z-index: 999;
	}

	/* loading end */
	.lang-dialog__header {
		padding: 20px 10px 10px;
	}

	.tips {
		color: #525252;
		line-height: 36px;
		font-size: 18px;
	}

	.slider-body {
		position: relative;
		width: 280px;
		height: 230px;
		margin: 0 auto;
	}

	.slider-bg {
		position: relative;
		width: 280px;
		height: 171px;
		overflow: hidden;
		background-position: top left;
		// background-size: cover;
		background-size: auto auto;
		background-repeat: no-repeat;
	}

	.slider-draw {
		position: absolute;
		z-index: 1;
		left: 26px;
		width: 50px;
		height: 50px;
		background-position: top left;
		background-size: cover;
		background-repeat: no-repeat;
		cursor: pointer;
		opacity: 1;
		box-shadow: 0px 0px 10px 2px #000000;
	}

	.slider-progress {
		position: relative;
		z-index: 1;
		width: 280px;
		height: 16px;
		margin-top: 22px;
		background-color: #c8c8c8;
		border-radius: 8px;
		opacity: 1;
	}

	.slider-btn {
		position: absolute;
		top: 184px;
		z-index: 1;
		width: 65px;
		height: 35px;
		line-height: 35px;
		background-color: rgb(0, 87, 212);
		box-shadow: rgba(0, 87, 212, 50%) 0px 0px 5.05952px 0.505952px;
		text-align: center;
		border-radius: 999px;
		font-size: 0;
		cursor: pointer;
		opacity: 1;
		-moz-user-select: none;
		/* 禁止双击节点被选中 */
		-o-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-moz-user-drag: none;
		/* 禁止被拖动 */
		-webkit-user-drag: none;
		/* 禁止被拖动 */
		// pointer-events: none;
		// display: inline-block;
		// vertical-align: middle;
	}

	.slider-btn i {
		display: inline-block;
		width: 0;
		vertical-align: middle;
	}

	.slider-success {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 4;
		background: hsla(0, 0%, 100%, .8);
	}

	.slider-success .slider-success-icon {
		width: 64px;
		height: 64px;
		margin: 15px auto 0;
	}

	.slider-success .slider-success-text {
		color: #1bc300;
		text-align: center;
		margin-top: 16px;
		font-size: 18px;
	}

	.slider-refresh {
		margin: 0 16px 0 0;
		cursor: pointer;
		font-size: 30px;
		height: 30px;
		line-height: 30px;
	}
}
</style>
