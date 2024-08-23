<template>
	<view class="advanced-role-application-container">
		<JHeader
			:dark="false" title="" width="50" height="50"
		></JHeader>
		<view class="main-area">
			<view class="title">
				<text v-if="form.relationshipLevelId === 4">加盟商</text>
				<text v-else-if="form.relationshipLevelId === 5">区代理</text>
				<text v-else>未知角色</text>
				申请
			</view>
			<view class="item">
				<view class="item-title">区域</view>
				<view class="field-wrapper">
					<JArea style="flex: 1;" :text="regionName" @confirm="handleSelectRegionArea"></JArea>
					<tui-icon name="arrowdown" :size="24"></tui-icon>
				</view>
			</view>

			<view class="item">
				<view class="item-title">详细地址</view>
				<view class="field-wrapper">
					<input v-model.trim="form.address" type="text" placeholder="请填写您的详细地址" />
				</view>
			</view>

			<view class="item">
				<view class="item-title">姓名</view>
				<view class="field-wrapper">
					<input v-model.trim="form.name" type="text" placeholder="请填写您的姓名" />
				</view>
			</view>

			<view class="item">
				<view class="item-title">手机号</view>
				<view class="field-wrapper">
					<input v-model.trim="form.phone" type="number" placeholder="请填写您的手机号" />
				</view>
			</view>

			<button class="uni-btn" @click="submit">确定申请</button>
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../../constant'
import { addPlatformRelationshipApplyApi, getSelectApplyPlatformRelationApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AdvancedRoleApplication',
	data() {
		return {
			userInfo: {},
			form: {
				relationshipLevelId: '',
				region: '',
				address: '',
				name: '',
				phone: ''
			},
			regionName: ''
		}
	},

	onLoad(options) {
		this.userInfo = uni.getStorageSync(T_STORAGE_KEY) || {}
		this.form.phone = this.userInfo.phone || ''
		this.form.relationshipLevelId = Number(options.type)
		if (this.form.relationshipLevelId) this.getPlatformRelationApplyMsg()
	},

	methods: {
		handleSelectRegionArea(e) {
			this.regionName = e.area
			this.form.region = e.county.id || e.city.id || e.province.id
		},

		// 提交申请
		submit() {
			if (!this.form.region) {
				this.$showToast('请选择所在区域')
				return
			}
			if (!this.form.relationshipLevelId) {
				this.$showToast('缺少升级的角色类型')
				return
			}
			if (!this.form.name) {
				this.$showToast('请填写姓名')
				return
			}
			if (
				!/^1[3456789]\d{9}$/.test(this.form.phone)
			) {
				this.$showToast('手机号码格式错误')
				return
			}
			if (!this.form.address) {
				this.$showToast('请填写详细地址')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交申请？',
				success: (res) => {
					if (res.confirm) {
						addPlatformRelationshipApplyApi(this.form).then((res) => {
							this.$showToast('提交成功')
							setTimeout(() => {
								this.$switchTab('/pages/user/user')
							}, 3000)
						})
					}
				}
			})
		},

		getPlatformRelationApplyMsg() {
			getSelectApplyPlatformRelationApi({})
				.then((res) => {
					if (res.data && res.data.applyId) {
						// this.$showToast('已存在申请')
						this.form.region = res.data.region
						this.form.address = res.data.address
						this.form.name = res.data.name
						this.form.phone = res.data.phone
					}
				})
		}
	}
}
</script>

<style lang="less" scoped>
.advanced-role-application-container {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: #ffdb52;
	background: url('../../../static/images/user/daili/bg.png') no-repeat;
	background-size: cover;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 40rpx 210rpx;
		background-color: transparent;
	}

	.main-area {
		position: relative;
		width: 622rpx;
		min-height: 500px;
		background-color: #fff;
		margin: 0 auto;
		padding: 112rpx 32rpx 40rpx;
		box-sizing: border-box;
		border-radius: 24rpx;

		.title {
			position: absolute;
			color: #fff;
			width: 502rpx;
			height: 112rpx;
			background: url('../../../static/images/user/daili/title-wrapper.png') no-repeat;
			background-size: cover;
			top: -26rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 42rpx;
			font-weight: bold;
			text-align: center;
			line-height: 112rpx;
		}

		.item {
			margin-bottom: 30rpx;

			.item-title {
				color: #3a3629;
				font-size: 28rpx;
				margin-bottom: 18rpx;
			}

			.field-wrapper {
				width: 100%;
				background-color: #f6f6f5;
				height: 96rpx;
				border-radius: 16rpx;
				padding: 27rpx 24rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					flex: 1;
					font-size: 28rpx;
				}
			}
		}

		.uni-btn {
			border-radius: 100px;
			height: 96rpx;
			background-color: #ffd152;
			margin-top: 68rpx;
			font-size: 28rpx;
			color: #fff;
			line-height: 96rpx;
			font-weight: 500;
		}
	}
}
</style>
