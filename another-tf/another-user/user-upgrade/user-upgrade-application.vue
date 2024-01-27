<template>
	<view class="user-upgrade-application-container">
		<FieldPaneUUA
			ref="refFieldPaneUUA" v-model="form.basicInfo" :fields="applyUserUpgradeOne" title="申请表单"
			@unlock="handleUnlock"
		></FieldPaneUUA>
		<view
			v-if="isShowBottomBtn"
			style="position: fixed;bottom: 0;z-index: 1;display: flex;justify-content: space-between;width: 100%;padding: 18upx;background-color: #ffffff;box-sizing: border-box;"
		>
			<tui-button
				type="black" width="330upx" height="104upx" margin="20upx 0"
				plain
				style="font-weight: bold;border-radius: 10upx;" @click="handleBack"
			>
				点击取消
			</tui-button>
			<tui-button
				type="warning" width="330upx" height="104upx" margin="20upx 0"
				style="font-weight: bold;color: #F5CEA8;background: #2C2B30!important;border-radius: 10upx;" @click="submit"
			>
				确认升级
			</tui-button>
		</view>

		<tui-landscape
			:show="displayBadgesMsg.isShowBadges" :position="1" mask mask-closable
			:icon-size="28"
			icon-color="#FFFFFF" @close="handleCloseBadges"
		>
			<view style="position: relative;">
				<view v-if="displayBadgesMsg.name" class="rotation-box"></view>
				<view style="position: relative;max-height: 75vh;overflow-y: auto;">
					<image
						style="position: absolute;top: 180upx;left: 50%;transform: translateX(-50%);width: 174upx;height: 174upx;border-radius: 40upx;"
						:src="common.seamingImgUrl($store.getters.userInfo.headImage) || require('../../../static/images/new-user/default-user-avatar.png')"
					>
					</image>
					<image src="../../../static/images/user/displayBadges/glory-frame.png" mode="widthFix" style="width: 500upx;" />
					<view
						style="width: 304upx;margin: 4upx auto 0;padding: 18upx;color: #fff;font-weight: bold;text-align: center;vertical-align: bottom;background: linear-gradient(180deg, #feb623 0%, #e8120c 100%);border: 2upx solid #FFDBAB;border-radius: 50upx;"
					>
						<text>恭喜你成为{{ displayBadgesMsg.name }}</text>
					</view>
				</view>
			</view>
		</tui-landscape>
	</view>
</template>

<script>
import FieldPaneUUA from './components/field-pane-uua.vue'
import { addPlatformRelationshipApplyApi } from '../../../api/anotherTFInterface'

export default {
	name: 'UserUpgradeApplication',
	components: {
		FieldPaneUUA
	},
	onLoad(options) {
	},
	data() {
		return {
			applyUserUpgradeOne: [
				{
					label: '区域',
					field: 'region',
					type: 'area',
					placeholder: '选择您的区域 ＞'
				},
				{
					label: '详细地址（门牌号）',
					type: 'textarea',
					field: 'address',
					placeholder: '请填写详细地址'
				},
				{
					label: '姓名',
					field: 'name',
					type: 'input',
					placeholder: '填写您的姓名'
				},
				{
					label: '手机号',
					type: 'input',
					field: 'phone',
					placeholder: '请填写您的手机号'
				},
				{
					label: '会员类型：',
					field: 'relationshipLevelId', // 5-区代理 4-加盟商 3-合伙人 2-团长 1-会员
					type: 'select',
					placeholder: '请选择会员类型'
				}
			],
			form: {
				basicInfo: {
					relationshipLevelId: '',
					region: '',
					address: '',
					name: '',
					phone: ''
				}
			},
			isShowBottomBtn: false,
			displayBadgesMsg: {
				name: '',
				isShowBadges: false
			}
		}
	},

	methods: {
		// 点击提交按钮
		submit() {
			console.log(this.$refs.refFieldPaneUUA)
			const data = {
				...this.form.basicInfo
			}
			if (!data.region) {
				this.$showToast('请选择所在区域')
				return
			}
			if (!data.relationshipLevelId) {
				this.$showToast('缺少会员类型')
				return
			}
			if (!data.name) {
				this.$showToast('请填写姓名')
				return
			}
			if (
				!/^1[3456789]\d{9}$/.test(data.phone)
			) {
				this.$showToast('手机号码格式错误')
				return
			}
			if (!data.address) {
				this.$showToast('请填写详细地址')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交会员升级申请？',
				success: (res) => {
					if (res.confirm) {
						addPlatformRelationshipApplyApi(data).then((res) => {
							// this.$showToast('升级成功，恭喜你！')
							this.displayBadgesMsg.name = this.$refs.refFieldPaneUUA.relationshipLevelName
							this.displayBadgesMsg.isShowBadges = true
							// setTimeout(() => {
							// 	// uni.navigateBack()
							// 	this.$switchTab('/pages/user/user')
							// }, 3000)
						})
					}
				}
			})
		},
		handleCloseBadges() {
			this.displayBadgesMsg.isShowBadges = false
			this.displayBadgesMsg.name = ''
			this.form.basicInfo.relationshipLevelId = ''
			this.form.basicInfo.region = ''
			this.form.basicInfo.address = ''
			this.form.basicInfo.name = ''
			this.isShowBottomBtn = false
			this.$refs.refFieldPaneUUA.relationshipLevelName = ''
			this.$refs.refFieldPaneUUA.relationLevelName = ''
			this.$refs.refFieldPaneUUA.upgradeLevelType = ''
			this.$refs.refFieldPaneUUA.isShowLock = true
			this.$refs.refFieldPaneUUA.relationshipLevelList = []
			this.$refs.refFieldPaneUUA.isShowRelationshipLevelSelect = false
			this.$refs.refFieldPaneUUA.regionName = ''
			this.$refs.refFieldPaneUUA.handleInitUpgradeInfo()
		},
		handleBack() {
			uni.navigateBack()
		},
		handleUnlock() {
			this.isShowBottomBtn = true
		}
	}
}
</script>

<style lang="less" scoped>
.rotation-box {
	position: absolute;
	top: -45vh;
	left: 50%;
	margin-left: -60vh;
	display: block;
	width: 120vh;
	height: 120vh;
	opacity: 0.4;
	background: repeating-conic-gradient(from 0deg, white 0deg 19deg, transparent 15deg 53deg);
	mask-image: radial-gradient(rgb(0, 0, 0), rgb(0, 0, 0) 50%);
	animation: rotate 20s linear infinite;
}

@keyframes rotate {
	to {
		transform: rotate(1turn)
	}
}

.user-upgrade-application-container {
	width: 100%;
	min-height: 100vh;
	// padding: 40upx 40upx 140upx 40upx;
	padding-bottom: 184upx;
	background-color: #f5f4f9;
	box-sizing: border-box;
	position: relative;

	.buts {
		position: fixed;
		bottom: -1px;
		z-index: 2;
		padding: 20upx 40upx;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		margin-top: 272upx;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 72upx;
		width: 306upx;
		font-size: 32upx;
		color: #fff;
		margin: 0;
		background-color: #07b9b9;
		border-radius: 100px;

		&:last-child {
			background-color: #fa5151;
		}
	}
}
</style>
