<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'manageArea'" class="item">
				<view
					class="input-wrapper" :style="{
						'flex-direction': item.type === 'textarea' ? 'column' : '',
						'align-items': item.type === 'textarea' ? 'flex-start' : ''
					}"
				>
					<view class="sub-title">{{ item.label }}</view>
					<view v-if="item.type === 'area'" style="flex: 1">
						<JCity
							v-if="item.type === 'area' && item.field === 'manageArea'" style="flex: 1"
							:text="manageAreaName" :placeholder="item.placeholder" @confirm="handleSelectManageAreaCity"
						></JCity>
					</view>
				</view>
			</view>
			<view v-else-if="item.field === 'levelType'">
				<view class="item">
					<view
						class="input-wrapper" :style="{
							'flex-direction': item.type === 'textarea' ? 'column' : '',
							'align-items': item.type === 'textarea' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title">{{ item.label }}</view>
						<view v-if="item.type === 'select'" style="flex: 1">
							<view v-if="form.manageArea">
								<view
									v-if="item.type === 'select' && item.field === 'levelType'" :style="{
										color: form.levelType ? '' : '#999'
									}" @click="isShowLevelTypeSelect = true"
								>
									{{ levelTypeName || (form.levelType ? `已选 ID：${form.levelType}` : item.placeholder) }}
								</view>
							</view>
							<view v-else style="color: #999999;" @click="$showToast('请先选择会员类型所属区域')">{{ item.placeholder }}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="item.field === 'region'" class="item">
				<view
					class="input-wrapper" :style="{
						'flex-direction': item.type === 'textarea' ? 'column' : '',
						'align-items': item.type === 'textarea' ? 'flex-start' : ''
					}"
				>
					<view class="sub-title">{{ item.label }}</view>
					<view v-if="item.type === 'area'" style="flex: 1">
						<view v-if="form.levelType">
							<!-- 区代理：三级任何。团长：四级最后。其它：四级任何 -->
							<!-- 5区代理，4加盟商，3合伙人，2团长，1会员 -->
							<JAnyCity
								v-if="item.type === 'area' && item.field === 'region' && levelTypeName === '区代理'" style="flex: 1"
								:text="regionName" :placeholder="item.placeholder" @confirm="handleSelectRegionCity"
							></JAnyCity>
							<JArea
								v-else-if="item.type === 'area' && item.field === 'region' && levelTypeName === '团长'" style="flex: 1"
								:text="regionName" :placeholder="item.placeholder" @confirm="handleSelectRegionArea"
							></JArea>
							<JAnyArea
								v-else-if="item.type === 'area' && item.field === 'region'" style="flex: 1" :text="regionName"
								:placeholder="item.placeholder" @confirm="handleSelectRegionArea"
							></JAnyArea>
						</view>
						<view v-else style="color: #999999;" @click="$showToast('请先选择会员类型')">{{ item.placeholder }}</view>
					</view>
				</view>
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
						<textarea
							v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						></textarea>

					</view>
				</template>
			</view>
		</view>
		<!-- 银行 -->
		<tui-select
			:list="levelTypeList" reverse :show="isShowLevelTypeSelect" @confirm="handleSelectLevelTypeList"
			@close="isShowLevelTypeSelect = false"
		></tui-select>

	</view>
</template>

<script>
import { getPlatformRelationshipLevelApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'FieldPaneUUA',
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
			form: {},
			manageAreaName: '',
			levelTypeList: [],
			isShowLevelTypeSelect: false,
			levelTypeName: '',
			regionName: ''
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						// if (item.type === 'select' && item.field === 'levelType') this.getPlatformRelationshipLevelList()
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
		handleSelectManageAreaCity(e) {
			this.manageAreaName = e.area
			this.form.manageArea = e.county.id || ''
			this.levelTypeName = ''
			this.form.levelType = ''
			this.regionName = ''
			this.form.region = ''
			this.getPlatformRelationshipLevelList(this.form.manageArea)
		},
		getPlatformRelationshipLevelList(manageArea) {
			uni.showLoading({
				title: '加载中'
			})
			getPlatformRelationshipLevelApi({ manageArea })
				.then((res) => {
					this.levelTypeList = res.data.filter((item) => item.levelName !== '会员').map((item) => ({
						...item,
						value: item.levelNum,
						text: item.levelName
					}))
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleSelectLevelTypeList(e) {
			console.log(e)
			this.isShowLevelTypeSelect = false
			this.levelTypeName = e.options.text
			this.form.levelType = e.options.value
			this.regionName = ''
			this.form.region = ''
		},
		handleSelectRegionCity(e) {
			this.regionName = e.area
			this.form.region = (e.county.id || e.city.id || e.province.id) + ''
		},
		handleSelectRegionArea(e) {
			this.regionName = e.area
			this.form.region = e.county.id || e.city.id || e.province.id
		},
		handleInput(field, e) {
			console.log(field, e)
			if (field === 'address' || field === 'phone' || field === 'name') {
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
	margin-top: 30upx;

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
