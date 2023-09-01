<template>
	<view class="kuaiDiForm">
		<NavHeader :bind-click="goBack">
			<template #body>
				<view class="defaultBody">
					{{ option.standing == "Send" ? "寄件人信息" : "收件人信息" }}
				</view>
			</template>
		</NavHeader>
		<view class="tui-modal-custom">
			<TuiForm ref="form">
				<TuiInput v-model="formData.name" label="姓名" placeholder="请输入姓名" clearable required></TuiInput>
				<TuiInput v-model="formData.mobile" label="手机号" :line-left="false" placeholder="请输入手机号" clearable required>
				</TuiInput>
				<TuiInput
					v-model="formData.area" label="地址" class="activeSelect" disabled
					:line-left="false" placeholder="选择地址"
					required @click="getArea"
				>
					<template #right>
						<image style="width: 30rpx;height: 30rpx" src="./image/youjiantou.png" mode=""></image>
					</template>
				</TuiInput>
				<TuiInput v-model="formData.detailedArea" label="详细地址" :line-left="false" placeholder="请输入详细地址" clearable>
				</TuiInput>
			</TuiForm>
			<view class="submitView">
				<!-- <tui-button width="200rpx" height="72rpx" :size="28" type="primary" shape="circle"
					@click="modal = false;" plain>取消</tui-button> -->
				<tui-button width="500rpx" height="72rpx" :size="28" type="primary" shape="circle" @click="submit">
					确定
				</tui-button>
			</view>
		</view>
		<TuiPicker :show="addresSelect" :layer="3" :picker-data="addresData" :params="1" @hide="hide" @change="change">
		</TuiPicker>
	</view>
</template>

<script>
import cityData from '@/utils/picker.city.js'  // 地址选择组件的数据
import tuiPicker from '@/components/thorui/tui-picker/tui-picker.vue'
import tuiForm from '@/components/thorui/tui-form/tui-form.vue'
import tuiInput from '@/components/thorui/tui-input/tui-input.vue'
// import tuiModal from "@/components/thorui/tui-modal/tui-modal.vue"
import NavHeader from './components/header.vue' // 头部导航栏组件
export default {
	components: {
		NavHeader,
		// tuiModal,
		TuiForm: tuiForm,
		TuiInput: tuiInput,
		TuiPicker: tuiPicker
	},
	data() {
		return {
			option: '',
			formData: {
				area: '',
				detailedArea: '',
				name: '',
				mobile: '',
				standing: ''
			},
			rules: [{
				name: 'mobile',
				rule: ['required', 'isMobile'],
				msg: ['请输入手机号', '请输入正确的手机号']
			}, {
				name: 'name',
				rule: [ 'required' ],
				msg: [ '请输入名字' ]
			}, {
				name: 'area',
				rule: [ 'required' ],
				msg: [ '请选择地址' ]
			}, {
				name: 'detailedArea',
				rule: ['required', 'isMobile'],
				msg: [ '请补充详细地址' ]
			}],
			// modal: false,
			addresSelect: false,
			addresData: cityData
		}
	},
	onLoad(option) {
		if (!option.standing) {
			uni.navigateTo({
				url: '/pages/index/convenient-services/kuai-di/DeliveryExpress'
			})
		}
		this.option = option
		this.formData.standing = option.standing
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		// 开启地址选择器
		getArea() {
			this.addresSelect = true
		},
		// 修改地址选择数据
		change(e) {
			this.formData.area = e.result
		},
		// 关闭地址选择器
		hide(e) {
			this.addresSelect = false
		},
		// 将用户的表单数据存入本地
		submit() {
			if (!this.$refs.form) return
			this.$refs.form.validate(this.formData, this.rules).then((res) => {
				// console.log(this.formData)
				uni.setStorage({
					key: `UserExpressInfo${this.option.standing}`,
					data: this.formData,
					success() {
						console.log('success')
						uni.navigateBack()
					}
				})
				// uni.navigateTo({
				// 	url: `/pages/index/convenient-services/kuai-di/DeliveryExpress?standingForm=${JSON.stringify(this.formData)}`
				// })
				// console.log('校验通过！')
				// this.tui.toast 等api 参考 【快手上手】文档使用
				// this.tui.toast('校验通过！')
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.activeSelect:active {
	background: none;
}

.defaultBody {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	font-size: 34rpx;
	color: white;
	font-weight: 550;
}

.tui-modal-custom {
	margin-top: 88rpx;
	box-sizing: border-box;
	padding: 20rpx;
}

.submitView {
	margin-top: 30rpx;
	display: flex;
	justify-content: center;
}
</style>
