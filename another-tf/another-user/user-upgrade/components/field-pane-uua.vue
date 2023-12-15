<template>
	<view class="field-pane-container">
		<view style="position: relative;">
			<JHeader
				:title="relationLevelName ? `${relationLevelName}升级` : title" width="50" height="50" :dark="false"
				style="position: absolute;top: 0;left: 0;z-index: 1;width: 100%;padding: 24upx 0 0;color: #ffffff;"
			>
			</JHeader>
			<image
				src="../../../../static/images/user/activity/upgrade-pic.png"
				style="width: 750upx;height: 413upx;vertical-align: bottom;"
			>
			</image>
			<view style="position: absolute;top: 260upx;left: 64upx;">
				<view v-if="[1, 2, 3, 4].includes(upgradeLevelType) && relationshipLevelName">
					<view style="font-size: 48upx;color: #ffffff;">升级{{ relationshipLevelName }}</view>
					<view style="margin-top: 10upx;font-size: 28upx;color: #BBBABF;">
						<text v-if="relationshipLevelName === '团长'">购买指定商品</text>
						<text v-else-if="relationshipLevelName === '合伙人'">邀请团长</text>
						<text v-else>填写表单</text>
					</view>
				</view>
				<view v-else-if="[ 0 ].includes(upgradeLevelType)">
					<!-- 已经是合伙人 -->
					<view style="font-size: 48upx;color: #ffffff;">合伙人</view>
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
						<text v-if="[1, 2, 3, 4].includes(upgradeLevelType) && relationshipLevelName">
							{{ relationshipLevelName }}升级
						</text>
						<view v-else-if="[ 0 ].includes(upgradeLevelType)">-</view><!-- 已经是合伙人 -->
						<text v-else>不可升级</text>
					</view>
				</view>
				<view style="margin-top: 20upx;font-size: 24upx;color: #9E9E9E;">
					<text v-if="[2, 4].includes(upgradeLevelType)">已满足申请条件</text>
					<text v-else-if="[ 0 ].includes(upgradeLevelType)">恭喜您已经是合伙人</text><!-- 已经是合伙人 -->
					<text v-else-if="[0, 1, 3].includes(upgradeLevelType)">不满足角色的升级条件</text>
					<text v-else>无法获取信息，请重试！</text>
				</view>
			</view>
			<view v-if="isShowLock" style="margin-top: 76upx;">
				<view v-if="[1, 2, 3, 4].includes(upgradeLevelType)" style="text-align: center;">
					<tui-button
						type="warning" width="680upx" height="104upx" margin="20upx 0"
						style="display: inline-block;font-weight: bold;color: #F5CEA8;background: #2C2B30!important;border-radius: 10upx;"
						@click="handleClickUnlock"
					>
						{{ relationLevelName ? '立即升级' : '立即解锁' }}
					</tui-button>
				</view>
			</view>
			<view v-else>
				<view style="font-weight: bold;margin-top: 36upx;">填写申请信息</view>
				<view style="padding: 0 10upx;">
					<view v-for="item in fields" :key="item.label">
						<view v-if="item.field === 'id'"></view>
						<view v-else-if="item.field === 'region'" class="item">
							<view
								class="input-wrapper" :style="{
									'flex-direction': item.type === 'textarea' ? 'column' : '',
									'align-items': item.type === 'textarea' ? 'flex-start' : ''
								}"
							>
								<view class="sub-title">{{ item.label }}</view>
								<view class="region-select" style="flex: 1;">
									<!-- 区代理：三级任何。团长：四级最后。其它：四级任何 -->
									<!-- 5区代理，4加盟商，3合伙人，2团长，1会员 -->
									<JArea
										v-if="item.type === 'area' && item.field === 'region'" style="flex: 1;"
										:text="regionName || (form.region ? `已选 ID：${form.region}` : '')" :placeholder="item.placeholder"
										@confirm="handleSelectRegionArea"
									>
									</JArea>
								</view>
							</view>
						</view>
						<view v-else-if="item.field === 'relationshipLevelId'" class="item">
							<view
								class="input-wrapper" :style="{
									'flex-direction': item.type === 'textarea' ? 'column' : '',
									'align-items': item.type === 'textarea' ? 'flex-start' : ''
								}"
							>
								<view class="sub-title">{{ item.label }}</view>
								<view v-if="item.type === 'select'" style="flex: 1;text-align: right;">
									<view v-if="form.region">
										<view
											v-if="item.type === 'select' && item.field === 'relationshipLevelId'" :style="{
												color: form.relationshipLevelId ? '' : '#999'
											}" @click="isShowRelationshipLevelSelect = true"
										>
											{{ relationshipLevelName || (form.relationshipLevelId ? `已选 ID：${form.relationshipLevelId}`
												: item.placeholder) }}
										</view>
									</view>
									<view v-else :style="{ color: relationshipLevelName ? '' : '#999' }" @click="$showToast('请先选择所在区域')">
										{{ relationshipLevelName || item.placeholder }}
									</view>
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
		</view>
		<!-- 会员类型 -->
		<tui-select
			:list="relationshipLevelList" reverse :show="isShowRelationshipLevelSelect"
			@confirm="handleSelectRelationshipLevelList" @close="isShowRelationshipLevelSelect = false"
		></tui-select>

	</view>
</template>

<script>
import { getPlatformRelationshipLevelApi, getSelectLevelPlatformRelationApi, getSelectApplyPlatformRelationApi } from '../../../../api/anotherTFInterface'

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
		userInfo: {
			type: Object,
			default: () => ({})
		}
	},

	data() {
		return {
			form: {},
			upgradeLevelType: '',
			relationLevelName: '', // 如果有值则一定满足条件，空字符串则不满足任何条件（默认），null则为请求失败
			isShowLock: true,
			relationshipLevelList: [],
			isShowRelationshipLevelSelect: false,
			relationshipLevelName: '', // 如果有值，但不一定满足条件
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
		uni.showLoading()
		getSelectLevelPlatformRelationApi({})
			.then((res) => {
				this.upgradeLevelType = res.data ? res.data.levelType : ''
				if (res.data && res.data.levelType === 1) {
					this.relationshipLevelName = '团长'
				} else if (res.data && res.data.levelType === 2) {
					this.relationLevelName = '团长'
					this.relationshipLevelName = '团长'
				} else if (res.data && res.data.levelType === 3) {
					this.relationshipLevelName = '合伙人'
				} else if (res.data && res.data.levelType === 4) {
					this.relationLevelName = '合伙人'
					this.relationshipLevelName = '合伙人'
				} else if (res.data && res.data.levelType === 0) { // 已经是合伙人
					this.relationLevelName = ''
				} else if (res.data && res.data.levelType === 0) {
					this.relationLevelName = ''
				}
				// this.upgradeLevelType = 0
				// this.relationLevelName = ''
				// this.relationshipLevelName = ''
				uni.hideLoading()
			})
			.catch((e) => {
				this.relationLevelName = null
				uni.hideLoading()
			})
	},

	methods: {
		handleClickUnlock() {
			if (this.relationLevelName) {
				this.$emit('Unlock')
				this.isShowLock = false
				if (this.upgradeLevelType === 2) {
					// if (this.$store.state.location.locationInfo.towncode) {
					// 	this.form.address = this.$store.state.location.detailAddress || ''
					// 	this.form.region = this.$store.state.location.locationInfo.towncode || ''
					// 	this.form.regionName = (this.$store.state.location.locationInfo.province + this.$store.state.location.locationInfo.city + this.$store.state.location.locationInfo.district + this.$store.state.location.locationInfo.township) || ''
					// }
				} else if (this.upgradeLevelType === 4) {
					getSelectApplyPlatformRelationApi({})
						.then((res) => {
							if (res.data && res.data.applyId) {
								// this.$showToast('已存在申请')
								this.form.region = res.data.region
								this.form.address = res.data.address
								this.form.name = res.data.name
								this.form.phone = res.data.phone
								this.getPlatformRelationshipLevelList(this.form.region)
							}
						})
				}
			} else if (this.upgradeLevelType === 1) {
				this.go('/another-tf/another-user/user-upgrade/purchase-chain-products')
			} else if (this.upgradeLevelType === 3) {
				uni.showModal({
					title: '您当前合伙人条件未达到！',
					content: '仅需名下有3名团长，\n即可升级合伙人！',
					showCancel: false,
					confirmText: '确定',
					success: (res) => {
					}
				})
			} else {
				// this.$showToast('其它情况')
			}
		},
		handleSelectRegionArea(e) {
			this.regionName = e.area
			this.form.region = e.county.id || e.city.id || e.province.id
			this.getPlatformRelationshipLevelList(this.form.region)
		},
		getPlatformRelationshipLevelList(manageArea) {
			uni.showLoading()
			getPlatformRelationshipLevelApi({ manageArea })
				.then((res) => {
					this.relationshipLevelList = res.data.filter((item) => item.levelName !== '会员').map((item) => ({
						...item,
						value: item.levelNum,
						text: item.levelName
					}))
					if (!this.relationshipLevelList.length) {
						this.relationLevelName = ''
						this.relationshipLevelName = ''
						this.form.relationshipLevelId = ''
					} else {
						this.relationshipLevelName = this.relationshipLevelList[0].levelName
						this.form.relationshipLevelId = this.relationshipLevelList[0].relationshipLevelId
					}
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleSelectRelationshipLevelList(e) {
			console.log(e)
			this.isShowRelationshipLevelSelect = false
			this.relationshipLevelName = e.options.text
			this.form.relationshipLevelId = e.options.value
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
				height: 40px;
				font-size: 24upx;
			}
		}
	}
}
</style>
