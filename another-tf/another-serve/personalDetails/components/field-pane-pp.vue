<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
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
							:type="item.field === 'phone' ? 'number' : 'text'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>
					</view>
				</template>
			</view>
		</view>

	</view>
</template>

<script>

export default {
	name: 'FieldPanePp',
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
			}
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
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
		handleInput(field, e) {
			console.log(field, e)
			if (field === 'pwd' || field === 'phone') {
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
	margin-top: 30rpx;

	.title {
		font-size: @f14;
		color: #fa5151;
		font-weight: bold;
	}

	.item {
		padding: 20rpx 0;
		border-bottom: 1rpx solid #d8d8d8;
		margin-top: 20rpx;

		.input-wrapper {
			.flex();
			font-size: @f12;
			color: @c3d;

			.sub-title {
				margin-right: 20rpx;
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
				margin-top: 20rpx;
				width: 100%;
				height: 100px;
				font-size: 24rpx;
			}
		}
	}
}
</style>
