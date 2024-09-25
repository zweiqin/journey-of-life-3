<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'equityId'"></view>
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
							:type="item.field === '' ? 'number' : 'text'" :placeholder="item.placeholder"
							@input="handleInput(item.field, $event)"
						/>

						<textarea
							v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						></textarea>

						<view
							v-if="item.type === 'picker' && item.field === 'cardId'" style="flex: 1" :style="{
								color: form.cardId ? '' : '#999'
							}" @click="(isShowMemberCardPopup = true) && !isEmpty && !memberCardList.length && getMemberCardSearchList()"
						>
							{{ cardName || form.cardId ? `已选 ID：${form.cardId}` : "请选择关联会员卡" }}
						</view>

					</view>
				</template>
			</view>
		</view>
		<!-- 会员卡选择 -->
		<tui-bottom-popup
			:z-index="997" :mask-z-index="996" :show="isShowMemberCardPopup"
			@close="() => {}"
		>
			<scroll-view scroll-y style="height: 100%;" @scrolltolower="handleScrolltolower">
				<view>
					<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
						<tui-icon
							name="close" :size="50" unit="rpx" color="#999999"
							@click="isShowMemberCardPopup = false"
						></tui-icon>
					</view>
					<view style="padding: 40rpx 0 0;">
						<view v-if="memberCardList && memberCardList.length" style="margin: 10rpx 0 0;">
							<view v-for="(item, index) in memberCardList" :key="index" style="padding: 0 20rpx 35rpx;">
								<ATFMemberCardInfo
									:data="item" :is-show-shop="false" :is-shop-operation="false" is-show-select
									@select="(e) => (form.cardId = e.id) && (cardName = e.cardName) && (isShowMemberCardPopup = false)"
								>
								</ATFMemberCardInfo>
							</view>
						</view>
						<view style="padding-bottom: 45rpx;">
							<LoadingMore
								:status="!isEmpty && !memberCardList.length
									? 'loading' : !isEmpty && memberCardList.length && (memberCardList.length >= memberCardTotal) ? 'no-more' : ''"
							>
							</LoadingMore>
							<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无商家会员卡内容~</tui-no-data>
						</view>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>

	</view>
</template>

<script>
import { getPageAllShopMemberCardApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'FieldPaneMCEF',
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
				equityId: '',
				cardId: '',
				equityName: '',
				equityRemark: ''
			},
			isShowMemberCardPopup: false,
			isEmpty: false,
			memberCardList: [],
			memberCardTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			cardName: ''
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
		getMemberCardSearchList(isLoadmore) {
			uni.showLoading()
			getPageAllShopMemberCardApi(this.queryInfo).then((res) => {
				this.memberCardTotal = res.data.total
				if (isLoadmore) {
					this.memberCardList.push(...res.data.list)
				} else {
					this.memberCardList = res.data.list
				}
				this.isEmpty = this.memberCardList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleScrolltolower() {
			if (this.memberCardList.length < this.memberCardTotal) {
				++this.queryInfo.page
				this.getMemberCardSearchList(true)
			}
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'equityName' || field === 'equityRemark') {
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

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

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
