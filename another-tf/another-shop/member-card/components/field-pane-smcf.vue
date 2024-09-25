<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="(item.field === 'cardId') || (item.field === 'shopId')"></view>
			<view v-else-if="item.field === 'startTime' || item.field === 'endTime'" class="item">
				<template>
					<view
						class="input-wrapper" :style="{
							'flex-direction': item.type === 'textarea' ? 'column' : '',
							'align-items': item.type === 'textarea' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title">{{ item.label }}</view>
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
							:type="
								(item.field === 'memberCardNumber') || (item.field === 'memberCardDays') ||
									(item.field === 'cardPrice') || (item.field === 'cardDiscountedPrice') ||
									(item.field === 'agentPurchasePrice') || (item.field === 'promotionPrice')
									? 'number' : 'text'" :placeholder="item.placeholder"
							@input="handleInput(item.field, $event)"
						/>

						<textarea
							v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						></textarea>

						<tui-radio-group
							v-if="(item.type === 'radio') && (item.field === 'memberCardType')" v-model="form[item.field]"
							style="display: flex;" @change="(e) => { }"
						>
							<tui-label v-for="(part, index) in [{ name: '消费卡', value: '1' }, { name: '次数卡', value: '2' }]" :key="index">
								<tui-list-cell padding="16rpx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>
						<tui-radio-group
							v-else-if="(item.type === 'radio') && (item.field === 'memberCardState')" v-model="form[item.field]"
							style="flex: 1;display: flex;flex-wrap: wrap;justify-content: flex-end;" @change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '已发行', value: '1' }, { name: '未发行', value: '2' }, { name: '已下架', value: '3' }]"
								:key="index"
							>
								<tui-list-cell padding="16rpx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>
						<tui-radio-group
							v-else-if="(item.type === 'radio') && (item.field === 'memberCardChannel')" v-model="form[item.field]"
							style="flex: 1;display: flex;flex-wrap: wrap;justify-content: flex-end;" @change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: 'app', value: '1' }, { name: 'H5', value: '2' }, { name: '支付宝小程序', value: '3' }, { name: '线下渠道', value: '3' }, { name: '微信小程序', value: '3' }, { name: '代理发行', value: '3' }]"
								:key="index"
							>
								<tui-list-cell padding="16rpx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>
						<tui-radio-group
							v-else-if="(item.type === 'radio') && (item.field === 'memberCardLevel')" v-model="form[item.field]"
							style="flex: 1;display: flex;flex-wrap: wrap;justify-content: flex-end;" @change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '全部会员', value: '1' }, { name: '团长', value: '2' }, { name: '合伙人', value: '3' }]"
								:key="index"
							>
								<tui-list-cell padding="16rpx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>

					</view>
				</template>
			</view>
		</view>

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
		title: String
	},

	data() {
		return {
			form: {
				cardId: '',
				shopId: '',
				cardName: '',
				memberCardType: '',
				memberCardState: '',
				memberCardNumber: '',
				memberCardChannel: '',
				memberCardLevel: '',
				memberCardDays: '',
				cardEquityStatement: '',
				cardPrice: '',
				cardDiscountedPrice: '',
				agentPurchasePrice: '',
				promotionPrice: '',
				startTime: '',
				endTime: ''
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

	mounted() {
		// console.log(this.$refs)
	},

	methods: {
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
@import "../../../../style/var.less";
@import "../../../../style/mixin.less";

.field-pane-container {
	margin-top: 30rpx;

	.title {
		font-size: @f14;
		color: #fa5151;
		font-weight: bold;
	}

	.chooseGender {
		flex: 1;
		text-align: left;
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
