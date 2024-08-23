<template>
	<view class="add-address">
		<JHeader title="添加服务地址" width="50" height="50"></JHeader>


		<view class="main">
			<!-- <view class="contacts">
				<view class="human">联系人</view>
				<input v-model="form.name" type="text" placeholder="（请输入联系人姓名）" class="input" />
			</view>
			<view class="phone">
				<view class="phone-name">手机号码</view>
				<input v-model="form.mobile" type="text" placeholder="（请输入联系人电话）" class="input" />
			</view> -->
			<view class="area" style="
										          position: relative;
										          display: flex;
										          justify-content: space-between;
										          margin-top: 30rpx;
										          border-bottom: 2rpx solid #d8d8d8;
										        ">
				<view class="diqu" style="
										            height: 90rpx;
										            display: flex;
										            align-items: center;
										            font-size: 32rpx;
										            color: #3662ec;
										          ">所在地区</view>
				<JCity @confirm="City($event.area)" :text="form.address" v-model="form.address" style="
										            padding-top: 24rpx;
										            width: 78%;
										            height: 90rpx;
										            border-radius: 20rpx;
										            padding-left: 20rpx;
										            box-sizing: border-box;
										            font-size: 30rpx;
										          ">
				</JCity>
										<tui-icon name="gps" :size="20" color="#3662ec"></tui-icon>
			</view>
			<view class="add-list">
				<view class="detail-address">详细地址</view>
				<view class="addDetail">
					<textarea name="input" class="address" v-model="form.addressDetail" placeholder="(请输入详细地址)"
						placeholder-class="input-placeholder" />
				</view>
								<view style="position: absolute;right: 20rpx;bottom: 30rpx;">
										<tui-icon name="feedback" :size="16" color="#999999"></tui-icon>
								</view>
			</view>
			<!-- <view class="background">
				<textarea name="" id="" cols="30" rows="10" placeholder="粘贴地址信息、电话、姓名可自动识别" class="input"></textarea>
				<view class="shibie">识别</view>
			</view> -->
		</view>
		<view class="foot">
			<view class="save" @click="dianji">保存</view>
		</view>
	</view>
</template>



<script>
import JCity from '../components/JCity/JCity.vue'
export default {
	name: "Add-address",
	props: {},
	components: { JCity },
	data() {
		return {
			form: {
				name: "",
				mobile: "",
				address: "",
				addressDetail: "",
			},
			address: "",
			addressDetail: "",
		};
	},
	methods: {
		handleBack() {
			uni.navigateBack();
		},
		dianji() {
			console.log('form', this.form);

			
			this.address = this.form.address
			this.addressDetail = this.form.addressDetail
			if (this.address && this.addressDetail) {
				uni.setStorageSync("guawyi8sa", this.form);
				uni.navigateBack();
			}else{
				uni.showToast({
					title: '请完善服务信息',
					duration: 2000,
					icon: 'none',
				})
			}

		},
		City(item) {
			console.log(item)
			this.form.address = item
			// this.a()
		},
	},
	created() { },
	onShow() {
		const info = uni.getStorageSync("guawyi8sa");
		// this.form.name = info.name;
		// this.form.mobile = info.mobile;
		this.form.address = info.address;
		this.form.addressDetail = info.addressDetail;

	},
};
</script>







<style lang="less" scoped>
.add-address {
	padding: 60rpx 30rpx;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.title {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #3d3d3d;
	}

	.return {
		position: absolute;
		top: 60rpx;
		left: 18rpx;
		width: 48rpx;
		height: 48rpx;
	}

	.main {
		padding-top: 100rpx;

		.contacts {
			display: flex;

			.human {
				padding-right: 34rpx;
				font-size: 28rpx;
				letter-spacing: 0.5em;
				color: #3d3d3d;
			}

			.input {
				font-size: 28rpx;
				color: #999999;
				flex: 1;
			}
		}

		.phone {
			display: flex;
			padding-top: 80rpx;

			.phone-name {
				padding-right: 46rpx;
				font-size: 28rpx;
				color: #3d3d3d;
			}

			.input {
				font-size: 28rpx;
				color: #999999;
				flex: 1;
			}
		}


		.area {
			.location {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.add-list {
			position: relative;
			display: flex;
			// justify-content: space-between;
			width: 100%;
			height: 140rpx;
			padding-top: 30rpx;
			border-bottom: 2rpx solid #d8d8d8;

			.detail-address {
				height: 100%;
				display: flex;
				margin-top: 10rpx;
				font-size: 32rpx;
				// font-weight: bold;
				color: #3662ec;
			}

			.addDetail {
				margin-left: 0rpx;
				padding-top: 12rpx;
				width: 70%;
				height: 100%;
				// background: #f1f2f6;
				border-radius: 20rpx;

				.address {
					line-height: 40rpx;
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
					// background: #f1f2f6;
					margin-bottom: 0rpx;
					padding-left: 42rpx;
					box-sizing: border-box;
					font-size: 30rpx;
				}

				.input-placeholder {
					// display: flex;
					// align-items: center;
					padding-left: 0rpx;
					box-sizing: border-box;
				}
			}
		}

		.background {
			// margin: 112rpx 32rpx 210rpx 0rpx;
			margin-top: 110rpx;
			width: 100%;
			height: 326rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			border: 1rpx solid #999999;
			position: relative;

			// padding-left: 40rpx;
			// padding-top: 22rpx;
			.input {
				padding: 22rpx 40rpx;
				width: 100%;
				height: 100%;
				font-size: 28rpx;
				font-weight: 350;
				color: #999999;
				box-sizing: border-box;
			}

			.shibie {
				position: absolute;
				right: 20rpx;
				bottom: 24rpx;
				text-align: center;
				width: 78rpx;
				height: 46rpx;
				border-radius: 4rpx;
				background: #cde1fd;
				font-size: 28rpx;
				color: #3662ec;
			}
		}
	}

	.foot {
		position: fixed;
		left: 0;
		bottom: 20rpx;
		width: 100%;
		height: 118rpx;
		box-sizing: border-box;
		padding-right: 68rpx;
		padding-left: 68rpx;
		padding-top: 26rpx;

		.save {
			// padding-top: 8rpx;
			text-align: center;
			width: 100%;
			height: 80rpx;
			border-radius: 60rpx;
			background: linear-gradient(270deg, #e95d20 0%, #ff8f1f 100%);
			font-size: 32rpx;
			font-weight: 500;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
