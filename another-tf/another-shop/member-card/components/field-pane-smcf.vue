<template>
	<view class="field-pane-container" :style="{ padding }">
		<view style="font-size: 34rpx;font-weight: bold;">{{ title }}</view>
		<view
			style="margin-top: 20rpx;padding: 30rpx 28rpx 2rpx;background-color: #ffffff;"
			:style="{ borderRadius: formBorderRadius }"
		>
			<view v-for="item in fields" :key="item.label">
				<view v-if="(item.field === 'cardId') || (item.field === 'shopId') || (item.field === 'originMemberCardChannel')"></view>
				<!-- <view v-else-if="item.field === 'startTime' || item.field === 'endTime'" class="item">
					<template>
					<view
					class="input-wrapper" :style="{
					'flex-direction': item.type === 'textarea' ? 'column' : '',
					'align-items': item.type === 'textarea' ? 'flex-start' : ''
					}"
					>
					<view style="margin-right: 20rpx;">{{ item.label }}</view>
					<view v-if="item.type === 'time' && item.field === 'startTime'">
					<input
					:value="form[item.field]" class="input" :disabled="true" type="text"
					:placeholder="item.placeholder" @click="$refs.dateTimeTradeS[0].show()"
					@input="handleInput(item.field, $event)"
					/>
					<tui-datetime
					ref="dateTimeTradeS" :type="7" radius
					@confirm="handleInput(item.field, $event)"
					></tui-datetime>
					</view>
					<view v-if="item.type === 'time' && item.field === 'endTime'">
					<input
					:value="form[item.field]" class="input" :disabled="true" type="text"
					:placeholder="item.placeholder" @click="$refs.dateTimeTradeE[0].show()"
					@input="handleInput(item.field, $event)"
					/>
					<tui-datetime
					ref="dateTimeTradeE" :type="7" radius
					@confirm="handleInput(item.field, $event)"
					></tui-datetime>
					</view>
					</view>
					</template>
					</view> -->
				<view v-else-if="item.field === 'memberCardType'">
					<view class="item">
						<view class="input-wrapper">
							<view style="margin-bottom: 24rpx;">{{ item.label }}</view>
							<view
								style="display: flex;justify-content: space-between;align-items: center;"
								@click="(selectType = 'memberCardTypeList') && (selectList = memberCardTypeList) && (isShowListSelect = true)"
							>
								<view
									v-if="item.type === 'select'" :style="{
										color: form.memberCardType ? '' : '#999'
									}"
								>
									{{ form.memberCardType ? memberCardTypeList.find(i => i.value === String(form.memberCardType)).text : "请选择" }}
								</view>
								<view style="font-size: 28rpx;color: #ef530e;">选择</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else-if="item.field === 'memberCardChannel'">
					<view class="item">
						<view class="input-wrapper">
							<view style="margin-bottom: 24rpx;">{{ item.label }}</view>
							<view
								style="display: flex;justify-content: space-between;align-items: center;"
								@click="(selectType = 'memberCardChannelList') && (selectList = memberCardChannelList.filter(i => (i.value === form.originMemberCardChannel) || ['4', '6'].includes(i.value))) && (isShowListSelect = true)"
							>
								<view
									v-if="item.type === 'select'" :style="{
										color: form.memberCardChannel ? '' : '#999'
									}"
								>
									{{ form.memberCardChannel ? memberCardChannelList.find(i => i.value === String(form.memberCardChannel)).text : "请选择" }}
								</view>
								<view style="font-size: 28rpx;color: #ef530e;">选择</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="item">
					<template>
						<view class="input-wrapper">
							<view style="margin-bottom: 24rpx;">{{ item.label }}</view>
							<input
								v-if="item.type === 'input'" :value="form[item.field]" class="input" :disabled="false"
								:type="
									(item.field === 'memberCardNumber') || (item.field === 'memberCardDays') ||
										(item.field === 'cardPrice') || (item.field === 'cardDiscountedPrice') ||
										(item.field === 'agentPurchasePrice') || (item.field === 'promotionPrice')
										? 'number' : 'text'" :placeholder="item.placeholder"
								@input="handleInput(item.field, $event)"
							/>

							<textarea
								v-else-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
								:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
							></textarea>

							<tui-radio-group
								v-else-if="(item.type === 'radio') && (item.field === 'memberCardLevel')" v-model="form[item.field]"
								style="display: flex;flex-wrap: wrap;" @change="(e) => { }"
							>
								<tui-label
									v-for="(part, index) in [{ name: '全部会员', value: '1' }, { name: '团长', value: '2' }, { name: '合伙人', value: '3' }]"
									:key="index"
								>
									<tui-list-cell padding="0 16rpx 0 0">
										<view>
											<tui-radio :checked="false" :value="part.value" color="#ef530e" border-color="#ef5511">
											</tui-radio>
											<text style="padding: 0 0 0 4rpx;">{{ part.name }}</text>
										</view>
									</tui-list-cell>
								</tui-label>
							</tui-radio-group>

						</view>
					</template>
				</view>
			</view>
		</view>

		<tui-select
			:list="selectList" reverse :show="isShowListSelect" @confirm="handleSelectList"
			@close="isShowListSelect = false"
		></tui-select>
	</view>
</template>

<script>

export default {
	name: 'FieldPaneSMCF',
	props: {
		fields: {
			type: Array,
			required: true
		},
		value: {
			type: Object,
			required: true
		},
		title: String,
		padding: {
			type: String,
			default: '30rpx 0 0'
		},
		formBorderRadius: {
			type: String,
			default: '16rpx'
		}
	},

	data() {
		return {
			form: {
				cardId: '',
				shopId: '',
				cardName: '',
				memberCardType: '',
				memberCardNumber: '',
				// memberCardChannel: '',
				// originMemberCardChannel: '',
				memberCardLevel: '',
				memberCardDays: '',
				cardEquityStatement: '',
				cardPrice: '',
				cardDiscountedPrice: '',
				// agentPurchasePrice: '',
				promotionPrice: ''
				// startTime: '',
				// endTime: ''
			},
			selectType: '',
			selectList: [],
			memberCardTypeList: [{ text: '消费卡', value: '1' }, { text: '次数卡', value: '2' }],
			memberCardChannelList: [{ text: 'app', value: '1' }, { text: 'H5', value: '2' }, { text: '支付宝小程序', value: '3' }, { text: '线下渠道', value: '4' }, { text: '微信小程序', value: '5' }, { text: '代理发行', value: '6' }],
			isShowListSelect: false
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

	mounted() {
		// console.log(this.$refs)
	},

	methods: {
		handleSelectList(e) {
			this.isShowListSelect = false
			if (this.selectType === 'memberCardTypeList') {
				this.form.memberCardType = e.options.value
			} else if (this.selectType === 'memberCardChannelList') {
				this.form.memberCardChannel = e.options.value
			}
		},
		handleInput(field, e) {
			console.log(field, e)
			if (field === 'startTime' || field === 'endTime') {
				this.form[field] = e.result
			} else {
				this.form[field] = e.detail.value
			}
		}
	}
}
</script>

<style lang="less" scoped>
.field-pane-container {
	font-size: 28rpx;

	.item {
		margin: 0 0 30rpx;
		border-bottom: 1rpx solid #e7e7e7;

		.input-wrapper {
			padding: 0 0 28rpx;
			.input {
				font-size: 28rpx;
			}

			.textarea {
				margin-top: 20rpx;
				width: 100%;
				height: 100px;
				font-size: 26rpx;
			}
		}
	}
}
</style>
