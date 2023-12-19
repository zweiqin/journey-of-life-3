<template>
	<view class="user-upgrade-application-container">
		<FieldPaneUUA
			ref="refFieldPaneUUA" v-model="form.basicInfo" :fields="applyUserUpgradeOne" title="申请表单"
			:user-info="userInfo" @Unlock="handleUnlock"
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
		<view
			style="z-index: 99999;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0, 0, 0, 0.7);transition: all 0.3s ease-in-out;opacity: 0;visibility: hidden;"
			:style="{ opacity: displayBadgesMsg.isShowBadges ? 1 : 0, visibility: displayBadgesMsg.isShowBadges ? 'visible' : 'hidden' }"
			@click.prevent="$switchTab('/pages/user/user')"
		>
			<view>
				<image style="position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);width: 576rpx;height: 576rpx;" :src="displayBadgesMsg.topUrl" mode="" />
				<view style="margin-top: 5rpx;position: fixed;top: 42%;left: 50%;transform: translate(-50%, -50%);float: left;width: 50%;">
					<view style="border-radius: 15rpx;width: 196rpx;height: 220rpx;overflow: hidden;margin: 0 auto;transform: rotate(120deg);">
						<view style="border-radius: 15rpx;width: 196rpx;height: 220rpx;overflow: hidden;margin: 0 auto;transform: rotate(-60deg);">
							<view style="border-radius: 15rpx;width: 196rpx;height: 220rpx;overflow: hidden;margin: 0 auto;transform: rotate(-60deg);">
								<image
									style="width: 196rpx;height: 210rpx;"
									:src="common.seamingImgUrl(userInfo.headImage) || require('../../../static/images/new-user/default-user-avatar.png')"
								>
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view
				style="position: fixed;top: 58%;left: 50%;transform: translateX(-50%);width: 304rpx;height: 74rpx;line-height: 74rpx;color: #fff;font-weight: bold;text-align: center;background-color: #ef4714;border-radius: 50rpx;"
			>
				恭喜你成为{{ displayBadgesMsg.name }}
			</view>
		</view>
	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../../constant'
import FieldPaneUUA from './components/field-pane-uua.vue'
import { addPlatformRelationshipApplyApi } from '../../../api/anotherTFInterface'

export default {
	name: 'UserUpgradeApplication',
	components: {
		FieldPaneUUA
	},
	onLoad(options) {
		this.userInfo = uni.getStorageSync(T_STORAGE_KEY) || {}
		this.form.basicInfo.phone = this.userInfo.phone || ''
	},
	data() {
		return {
			userInfo: {},
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
				topUrl: require('../../../static/images/user/displayBadges/tuantop.png'),
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
