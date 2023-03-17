<template>
	<view class="add-site-container">
		<view class="header">
			<!-- <JBack dark width="50" height="50"></JBack> -->
			<!-- <h2>添加新的地址</h2> -->
			<image src="../../static/images/user/back.png" mode="scaleToFill" class="return" @click="handleBack" />
		</view>

		<view class="add-site-content">
			<view class="item-wrapper">
				<view class="add-site-title">收货人</view>
				<view class="add-site-value"><input v-model="form.name" type="text" class="common-text" placeholder="请填写收货人姓名" style="padding-bottom: 32upx"/>
				</view>
			</view>

			<view class="item-wrapper">
				<view class="add-site-title">手机号码</view>
				<view class="add-site-value"><input v-model="form.mobile" type="text" class="common-text"
						placeholder="请填写收货人电话" style="padding-bottom: 32upx"/></view>
			</view>

			<view class="item-wrapper">
				<view class="add-site-title">所在地区</view>
				<view class="add-site-value" style="display: flex;
					    		justify-content: space-between;">
					<JCity :text="area" @confirm="handleChooseCity"></JCity>
					<JIcon style="margin-top: 18upx" type="fill-down-triangle" width="24" height="12"></JIcon>
				</view>


			</view>

			<view class="item-wrapper">
				<view class="add-site-title">详细地址</view>
				<view class="add-site-value" style="display: flex;justify-content: space-between;"><textarea v-model="form.address" class="common-text"
						placeholder="请填写收货人详细地址" style="padding-right: 40upx;"/>
					<JIcon type="locale" width="32" height="32"></JIcon>
				</view>


			</view>

			<view class="item-wrapper" style="align-items: center">
				<view class="add-site-title add-site-title-checked">设为默认收货地址</view>

				<switch style="transform: scale(0.5) translateX(50%)" :checked="!!form.isDefault"
					@change="handleChangeIsDefaultAddress" />
			</view>
		</view>
		<view class="foot">
			<button class="btn" @click="handleAddSite">保存</button>
		</view>
	</view>
</template>

<script>
import { getAddressSaveApi, getAddressDetailApi } from '../../api/address';
import { getUserId } from '../../utils';
export default {
	data() {
		return {
			form: {
				name: '',
				mobile: '',
				address: '',
				provinceId: '',
				cityId: '',
				areaId: '',
				userId: getUserId(),
				isDefault: 0,
				id: ''
			},
			area: '',
			timer: null,
			editId: null
		};
	},

	onLoad(options) {
		this.editId = options.editId;
		if (this.editId) {
			this.getAddressDetail();
		}
	},

	methods: {
		handleBack() {
			uni.navigateBack();
		},

		// 点击确定选择地区
		handleChooseCity(area) {
			this.area = area.area;
			this.form.provinceId = area.province.id;
			this.form.cityId = area.city.id;
			this.form.areaId = area.county.id;
		},

		// 点击提交
		handleAddSite() {
			if (!this.form.name) {
				this.$showToast('请填写收货人姓名');
				return;
			}

			if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.form.mobile)) {
				this.$showToast('收货人电话格式错误');
				return;
			}

			if (!this.area) {
				this.$showToast('请选择收获地区');
				return;
			}

			if (!this.form.address) {
				this.$showToast('请填写收获详细地址');
				return;
			}

			const _this = this;
			const data = JSON.parse(JSON.stringify(this.form));
			getAddressSaveApi(data).then(res => {
				_this.$showToast(_this.form.id ? '修改成功' : '添加成功', 'success');
				this.form = {
					name: '',
					mobile: '',
					address: '',
					provinceId: '',
					cityId: '',
					areaId: '',
					userId: getUserId(),
					isDefault: 0
				};
				this.area = '';
				_this.timer = setTimeout(() => {
					uni.navigateBack();
				}, 2000);
			});
		},

		// 切换是否是默认地址
		handleChangeIsDefaultAddress(e) {
			this.form.isDefault = e.detail.value ? 1 : 0;
		},

		// 获取地址详情
		getAddressDetail() {
			const _this = this;
			getAddressDetailApi({
				userId: getUserId(),
				id: this.editId
			}).then(({ data }) => {
				_this.form.name = data.name;
				_this.form.mobile = data.mobile;
				_this.form.address = data.address;
				_this.area = data.provinceName + data.cityName + data.areaName;
				_this.form.provinceId = data.provinceId;
				_this.form.cityId = data.cityId;
				_this.form.areaId = data.areaId;
				_this.form.id = data.id;
			});
		}
	}
};
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';

.add-site-container {
	// padding: 72upx 96upx 44upx 56upx;
	box-sizing: border-box;
	// .flex(flex-start, flex-start);
	// flex-direction: column;
	// height: 100%;
	background-color: #f6f6f6;
	width: 100vw;
	min-height: 100vh;

	.header {
		padding-top: 36upx;
		padding-left: 40upx;

		// .flex(center, flex-start);
		.return {
			width: 24upx;
			height: 48upx;
		}

		// .j-back-container {
		// 	margin-top: 10upx;
		// }

		// h2 {
		// 	font-size: 36upx;
		// 	font-weight: bold;
		// 	margin-left: 34upx;
		// }
	}

	.add-site-content {
		// flex: 1;
		// width: 100%;
		background: #FFFFFF;
		border-radius: 24upx;
		margin: 36upx 20upx 0 20upx;
		padding: 32upx 32upx 0 32upx;

		.item-wrapper {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			// margin-top: 46upx;
			// width: 100%;
			// height: 74upx;
			padding-bottom: 32upx;

			.add-site-title {
				flex: 0 0 140upx;
				text-align: left;
				font-size: 28upx;
				color: #141000;

				// font-weight: bold;
				// height: 100%;
				&.add-site-title-checked {
					white-space: nowrap;
					width: auto;
				}
			}

			.uni-input-placeholder {
				font-size: 28upx;
			}

			.common-text {
				color: #141000;
				font-size: 28upx;
				// padding-bottom: 20upx;
			}

			.add-site-value {
				flex: 1;
				// max-width: 340upx;
				// margin-right: 96upx;
				width: 100%;
				// height: 100%;
				border-bottom: 1px solid #F1F1F0;

			}

			textarea {
				width: 100%;
				height: 140upx;
			}

			.j-city {
				/deep/ .value {
					font-size: 28upx;
				}
			}
		}
	}

	/deep/ .uni-switch-input {
		&::before {
			background-color: #bebebe;
		}
		
	}
	/deep/.uni-switch-input.uni-switch-input-checked{
			background-color: #FFCB05 !important;
			border-color: #FFCB05 !important;
		}

	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-radius: 24upx 24upx 0upx 0upx;
		background: #FFFFFF;
		height: 120upx;

		.btn {
			// width: 380upx;
			// height: 73upx;
			.flex(center, center);
			font-size: 32upx;
			font-weight: 500;
			color: #fff;
			background-color: #FFCB05;
			border-radius: 44upx;
			margin: 0 32upx;
			margin-top: 18upx;
		}
	}
}
</style>
