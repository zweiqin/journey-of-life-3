<template>
	<view>
		<tui-input
			:value="inpuCode" type="text" :padding="inputPadding"
			:placeholder-style="inputStyle" background-color="transparent" :border-top="inputBorderTop"
			:border-color="inputBorderColor" :label-color="inputLabelColor" placeholder="请输入图文码" :color="inputColor"
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

		<GraphicPoster ref="refGraphicPoster" @success="(e) => generatedCode = e"></GraphicPoster>
	</view>
</template>

<script>
import GraphicPoster from './GraphicPoster.vue'

export default {
	name: 'ATFGraphicVerificationCode',
	components: { GraphicPoster },
	props: {
		inputPadding: {
			type: String,
			default: '26rpx 30rpx'
		},
		inputStyle: {
			type: String,
			default: ''
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
		inputColor: {
			type: String,
			default: '#333'
		}
	},
	data() {
		return {
			inpuCode: '',
			generatedCode: '',
			generateUrl: ''
		}
	},
	mounted() {
		this.handleGenerateCode()
	},
	methods: {
		async handleGenerateCode() {
			if (this.$refs.refGraphicPoster) {
				const generateUrl = await this.$refs.refGraphicPoster.handleGenerateCode()
				this.generateUrl = generateUrl
			}
		},
		handleCodeInput(e) {
			console.log(e)
			this.inpuCode = e
			if (this.inpuCode === this.generatedCode) this.$emit('verify', true)
		},
		handleVerify() {
			if (this.inpuCode === this.generatedCode) {
				return true
			}
			return false
		},
		handleResetData() {
			this.inpuCode = ''
			this.handleGenerateCode()
		}
	}
}
</script>

<style lang="scss" scoped>
.graphic-verification-code-container {
	box-sizing: border-box;
}
</style>
