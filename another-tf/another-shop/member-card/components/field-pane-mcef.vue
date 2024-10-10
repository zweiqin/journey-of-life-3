<template>
	<view class="field-pane-container" :style="{ padding }">
		<view style="font-size: 34rpx;font-weight: bold;">{{ title }}</view>
		<view
			style="margin-top: 20rpx;padding: 30rpx 28rpx 2rpx;background-color: #ffffff;"
			:style="{ borderRadius: formBorderRadius }"
		>
			<view v-for="item in fields" :key="item.label">
				<view v-if="item.field === 'equityId'"></view>
				<view v-else class="item">
					<template>
						<view class="input-wrapper">
							<view style="margin-bottom: 24rpx;">{{ item.label }}</view>
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
					<view style="padding: 40rpx 0 0;background-color: #eeeeee;">
						<view style="padding: 18rpx 20rpx 0;">
							<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
								<text style="font-size: 30rpx;">会员卡名称</text>
								<view style="flex: 1;margin-left: 16rpx;">
									<tui-input
										v-model="queryInfo.cardName" placeholder="根据会员卡名称搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
										background-color="transparent"
									>
										<template #right>
											<tui-button
												type="warning" width="120rpx" height="50rpx" shape="circle"
												@click="(queryInfo.page = 1) && getMemberCardSearchList()"
											>
												搜索
											</tui-button>
										</template>
									</tui-input>
								</view>
							</view>
							<tui-radio-group
								:value="queryInfo.memberCardType"
								@change="(e) => (queryInfo.memberCardType !== e.detail.value) && ((queryInfo.memberCardType = e.detail.value) || true) && (queryInfo.page = 1) && getMemberCardSearchList()"
							>
								<view style="display: flex;flex-wrap: wrap;align-items: center;">
									<text style="font-size: 30rpx;">类型：</text>
									<tui-label
										v-for="(item, index) in [{ name: '全部', value: '' }, { name: '消费卡', value: '1' }, { name: '次数卡', value: '2' }]"
										:key="index"
									>
										<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
											<tui-radio
												:checked="queryInfo.memberCardType === item.value" :value="item.value"
												color="#ef530e" border-color="#ef5511" :scale-ratio="0.8"
											>
											</tui-radio>
											<text style="padding: 0 0 0 4rpx;">{{ item.name }}</text>
										</view>
									</tui-label>
								</view>
							</tui-radio-group>
							<tui-radio-group
								:value="queryInfo.memberCardState"
								@change="(e) => queryInfo.memberCardState !== e.detail.value && ((queryInfo.memberCardState = e.detail.value) || true) && (queryInfo.page = 1) && getMemberCardSearchList()"
							>
								<view style="display: flex;flex-wrap: wrap;align-items: center;">
									<text style="font-size: 30rpx;">状态：</text>
									<tui-label
										v-for="(item, index) in [{ name: '全部', value: '' }, { name: '已发行', value: '1' }, { name: '未发行', value: '2' }, { name: '已下架', value: '3' }]"
										:key="index"
									>
										<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
											<tui-radio
												:checked="queryInfo.memberCardState === item.value" :value="item.value"
												color="#ef530e" border-color="#ef5511" :scale-ratio="0.8"
											>
											</tui-radio>
											<text style="padding: 0 0 0 4rpx;">{{ item.name }}</text>
										</view>
									</tui-label>
								</view>
							</tui-radio-group>
						</view>
						<view v-if="memberCardList && memberCardList.length" style="margin: 10rpx 0 0;">
							<view v-for="(item, index) in memberCardList" :key="index" style="padding: 0 20rpx 35rpx;">
								<ATFMemberCardInfo
									:data="item" :is-show-shop="false" :is-shop-operation="false" is-show-select
									@select="(e) => (form.cardId = e.cardId) && (cardName = e.cardName) && (isShowMemberCardPopup = false)"
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
				pageSize: 20,
				cardName: '',
				memberCardType: '',
				memberCardState: ''
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

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
