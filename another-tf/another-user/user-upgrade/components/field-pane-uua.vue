<template>
	<view class="field-pane-container">
		<view style="position: relative;">
			<JHeader
				:title="hasType ? typeMap[form.levelType] : title" width="50" height="50" :dark="false"
				style="position: absolute;top: 0;left: 0;z-index: 1;width: 100%;padding: 24upx 0 0;color: #ffffff;"
			>
				<template #ftFn>
					<text v-if="hasType" style="padding-right: 18upx;" @click="$emit('change-form') || resetTypeField()">切换</text>
				</template>
			</JHeader>
			<image
				src="../../../../static/images/user/activity/upgrade-pic.png"
				style="width: 750upx;height: 413upx;vertical-align: bottom;"
			>
			</image>
			<view style="position: absolute;top: 260upx;left: 64upx;">
				<view v-if="form.levelType === 2">
					<view style="font-size: 48upx;color: #ffffff;">升级团长</view>
					<view style="margin-top: 10upx;font-size: 28upx;color: #BBBABF;">购买指定商品</view>
				</view>
				<view v-else>
					<view style="font-size: 48upx;color: #ffffff;">升级</view>
					<view style="margin-top: 10upx;font-size: 28upx;color: #BBBABF;">填写表单</view>
				</view>
			</view>
		</view>
		<view style="padding: 36upx 24upx;background-color: #ffffff;">
			<view style="padding: 20upx 18upx;background-color: #f5f4fb;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="display: flex;align-items: center;">
						<BeeIcon :size="30" :src="userInfo.headImage"></BeeIcon>
						<view style="margin-left: 20upx;color: #222229;">{{ userInfo.wechatName || '--' }}</view>
					</view>
					<view style="font-size: 28upx;color: #533A23;">
						<text v-if="canUpgrade === true">可进行{{ typeMap[form.levelType] }}</text>
						<text v-else-if="canUpgrade === false">不可进行{{ typeMap[form.levelType] }}</text>
						<text v-else>获取信息失败</text>
					</view>
				</view>
				<view style="margin-top: 20upx;font-size: 24upx;color: #9E9E9E;">
					<text v-if="canUpgrade === true">已满足申请条件</text>
					<text v-else-if="canUpgrade === false">未满足申请条件</text>
					<text v-else>无法获取信息，请重试！</text>
				</view>
			</view>
			<view style="font-weight: bold;margin-top: 36upx;">填写申请信息</view>
			<view style="padding: 0 10upx;">
				<view v-for="item in fields" :key="item.label">
					<view v-if="item.field === 'id'"></view>
					<view v-else-if="item.field === 'manageArea'">
						<view v-if="!hasType" class="item">
							<view
								class="input-wrapper" :style="{
									'flex-direction': item.type === 'textarea' ? 'column' : '',
									'align-items': item.type === 'textarea' ? 'flex-start' : ''
								}"
							>
								<view class="sub-title">{{ item.label }}</view>
								<view v-if="item.type === 'area'" style="flex: 1;" class="region-select">
									<JCity
										v-if="item.type === 'area' && item.field === 'manageArea'" style="flex: 1;"
										:text="manageAreaName" :placeholder="item.placeholder" @confirm="handleSelectManageAreaCity"
									></JCity>
								</view>
							</view>
						</view>
					</view>
					<view v-else-if="item.field === 'levelType'">
						<view v-if="!hasType" class="item">
							<view
								class="input-wrapper" :style="{
									'flex-direction': item.type === 'textarea' ? 'column' : '',
									'align-items': item.type === 'textarea' ? 'flex-start' : ''
								}"
							>
								<view class="sub-title">{{ item.label }}</view>
								<view v-if="item.type === 'select'" style="flex: 1;">
									<view v-if="form.manageArea">
										<view
											v-if="item.type === 'select' && item.field === 'levelType'" :style="{
												color: form.levelType ? '' : '#999'
											}" @click="isShowLevelTypeSelect = true"
										>
											{{ levelTypeName || (form.levelType ? `已选 ID：${form.levelType}` : item.placeholder) }}
										</view>
									</view>
									<view v-else style="color: #999999;text-align: right;" @click="$showToast('请先选择会员类型所属区域')">{{ item.placeholder }}</view>
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
							<view v-if="item.type === 'area'" style="flex: 1;">
								<view v-if="form.levelType" class="region-select">
									<!-- 区代理：三级任何。团长：四级最后。其它：四级任何 -->
									<!-- 5区代理，4加盟商，3合伙人，2团长，1会员 -->
									<JAnyCity
										v-if="item.type === 'area' && item.field === 'region' && form.levelType === 5"
										style="flex: 1;" :text="regionName" :placeholder="item.placeholder" @confirm="handleSelectRegionCity"
									>
									</JAnyCity>
									<JArea
										v-else-if="item.type === 'area' && item.field === 'region' && form.levelType === 2"
										style="flex: 1;" :text="regionName" :placeholder="item.placeholder" @confirm="handleSelectRegionArea"
									>
									</JArea>
									<JAnyArea
										v-else-if="item.type === 'area' && item.field === 'region'" style="flex: 1;"
										:text="regionName" :placeholder="item.placeholder" @confirm="handleSelectRegionArea"
									></JAnyArea>
								</view>
								<view v-else style="color: #999999;text-align: right;" @click="$showToast('请先选择会员类型')">{{ item.placeholder }}</view>
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
									:type="item.field === 'phone' ? 'number' : 'text'" :placeholder="item.placeholder"
									placeholder-style="text-align: right;" @input="handleInput(item.field, $event)"
								/>
								<textarea
									v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
									:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
								></textarea>
							</view>
						</template>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员类型 -->
		<tui-select
			:list="levelTypeList" reverse :show="isShowLevelTypeSelect" @confirm="handleSelectLevelTypeList"
			@close="isShowLevelTypeSelect = false"
		></tui-select>

	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../../../constant'
import { getPlatformRelationshipLevelApi, getSelectLevelPlatformRelationApi } from '../../../../api/anotherTFInterface'

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
		title: String,
		hasType: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			userInfo: uni.getStorageSync(T_STORAGE_KEY) || {},
			typeMap: {
				1: '会员升级',
				2: '团长升级',
				3: '合伙人升级',
				4: '加盟商升级',
				5: '区代理升级'
			},
			canUpgrade: '',
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
				if (value.levelType) {
					getSelectLevelPlatformRelationApi({ relationshipLevelId: value.levelType })
						.then((res) => {
							if (res.data) {
								this.canUpgrade = true
							} else {
								this.canUpgrade = false
							}
						})
						.catch((e) => {
							this.canUpgrade = ''
						})
				}
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
		resetTypeField(e) {
			this.manageAreaName = ''
			this.form.manageArea = ''
			this.levelTypeName = ''
			this.form.levelType = ''
			this.regionName = ''
			this.form.region = ''
		},
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
	// margin-top: 30upx;

	.title {
		font-size: @f14;
		color: #fa5151;
		font-weight: bold;
	}

	.item {
		padding: 20upx 0;
		// border-bottom: 1upx solid #d8d8d8;
		margin-top: 20upx;

		.region-select {
			/deep/ .value {
				text-align: right;
			}
		}

		.input-wrapper {
			.flex();
			font-size: 30upx;
			color: @c3d;

			.sub-title {
				margin-right: 20upx;
				font-weight: bold;
			}

			/deep/ .uni-input-placeholder,
			/deep/ .uni-textarea-placeholder {
				font-size: 30upx;
				color: @c9;
			}

			.input {
				flex: 1;
				font-size: @f12;
			}

			.textarea {
				margin-top: 20upx;
				width: 100%;
				height: 60px;
				font-size: 24upx;
			}
		}
	}
}
</style>
