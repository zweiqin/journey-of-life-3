<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'bank'">
				<view class="item">
					<view
						class="input-wrapper" :style="{
							'flex-direction': item.type === 'textarea' ? 'column' : '',
							'align-items': item.type === 'textarea' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title">{{ item.label }}</view>
						<view
							v-if="item.type === 'select' && item.field === 'bank'" style="flex: 1" :style="{
								color: form.bank ? '' : '#999'
							}" @click="isShowBankListSelect = true"
						>
							{{ bankName || (form.bank ? `已选 ID：${form.bank}` : "请选择所属银行") }}
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="item.field === 'code'" class="item">
				<template>
					<view
						class="input-wrapper" :style="{
							'flex-direction': item.type === 'textarea' ? 'column' : '',
							'align-items': item.type === 'textarea' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title">{{ item.label }}</view>
						<view class="input">
							<ATFGraphicVerificationCode
								type="code" :phone="form.phone"
								input-type="number" input-padding="0 20rpx 0 0"
								countdown-width="144rpx" @input="e => handleInput(item.field, e)"
							></ATFGraphicVerificationCode>
						</view>
					</view>
				</template>
			</view>
			<view v-else class="item">
				<template>
					<view
						class="input-wrapper" :style="{
							'flex-direction': item.type === 'textarea' ? 'column' : '',
							'align-items': item.type === 'textarea' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title">{{ item.label }}</view>
						<input
							v-if="item.type === 'input'" :value="form[item.field]" class="input" :disabled="false"
							:type="item.field === 'cardNumber' || item.field === 'phone' ? 'number' : 'text'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>
					</view>
				</template>
			</view>
		</view>
		<!-- 银行 -->
		<tui-select
			:list="bankList" reverse :show="isShowBankListSelect" @confirm="handleSelectBankList"
			@close="isShowBankListSelect = false"
		></tui-select>

	</view>
</template>

<script>
import { getSelectDictApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'FieldPaneRA',
	props: {
		fields: {
			type: Array,
			required: true
		},
		value: {
			type: Object,
			required: true
		},
		title: String
	},

	data() {
		return {
			form: {
				phone: ''
			},
			bankList: [],
			isShowBankListSelect: false,
			checkCard: {
				bankLog: '',
				cardName: '',
				abbreviation: ''
			},
			bankName: ''
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'select' && item.field === 'bank') this.getBankList()
					}
					this.form = form
				}
			},
			immediate: true,
			deep: true
		},

		form: {
			handler(value) {
				this.$emit('input', value)
			},
			immediate: true,
			deep: true
		}
	},
	created() {
	},

	mounted() {
		// console.log(this.$refs)
	},

	methods: {
		getBankList() {
			getSelectDictApi({ dictName: '所属银行' })
				.then((res) => {
					this.bankList = res.data.map((item) => ({
						...item,
						value: item.dictId,
						text: `${item.dictName}${item.dictDescribe ? '（' + item.dictDescribe + '）' : ''}`
					}))
				})
				.catch(() => {
					this.$showToast('银行列表获取失败')
				})
		},
		handleSelectBankList(e) {
			this.isShowBankListSelect = false
			this.bankName = e.options.text
			this.form.bank = e.options.dictId
		},
		handleInput(field, e) {
			console.log(field, e)
			if (field === 'cardName' || field === 'cardNumber' || field === 'phone') {
				this.form[field] = e.detail.value
			} else if (field === 'code') {
				this.form[field] = e
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../../style/var.less";
@import "../../../../style/mixin.less";

.field-pane-container {
	margin-top: 30upx;

	.title {
		font-size: @f14;
		color: #fa5151;
		font-weight: bold;
	}

	.item {
		padding: 20upx 0;
		border-bottom: 1upx solid #d8d8d8;
		margin-top: 20upx;

		.input-wrapper {
			.flex();
			font-size: @f12;
			color: @c3d;

			.sub-title {
				margin-right: 20upx;
			}

			/deep/ .uni-input-placeholder,
			/deep/ .uni-textarea-placeholder {
				font-size: @f12;
				color: @c9;
			}

			.input {
				flex: 1;
				font-size: @f12;
			}

			.textarea {
				margin-top: 20upx;
				width: 100%;
				height: 100px;
				font-size: 24upx;
			}
		}
	}
}
</style>
