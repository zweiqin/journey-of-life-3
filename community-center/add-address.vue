<template>
	<view class="add-address">
		<JHeader title="添加服务地址" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>


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
										          margin-top: 30upx;
										          border-bottom: 2upx solid #d8d8d8;
										        ">
				<view class="diqu" style="
										            height: 90upx;
										            display: flex;
										            align-items: center;
										            font-size: 32upx;
										            color: #3662ec;
										          ">所在地区</view>
				<JCity @confirm="City($event.area)" :text="form.address" v-model="form.address" style="
										            padding-top: 24upx;
										            width: 78%;
										            height: 90upx;
										            border-radius: 20upx;
										            padding-left: 20upx;
										            box-sizing: border-box;
										            font-size: 30upx;
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
								<view style="position: absolute;right: 20upx;bottom: 30upx;">
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
	padding: 60upx 30upx;
	box-sizing: border-box;

	.title {
		text-align: center;
		font-size: 32upx;
		font-weight: bold;
		color: #3d3d3d;
	}

	.return {
		position: absolute;
		top: 60upx;
		left: 18upx;
		width: 48upx;
		height: 48upx;
	}

	.main {
		padding-top: 100upx;

		.contacts {
			display: flex;

			.human {
				padding-right: 34upx;
				font-size: 28upx;
				letter-spacing: 0.5em;
				color: #3d3d3d;
			}

			.input {
				font-size: 28upx;
				color: #999999;
				flex: 1;
			}
		}

		.phone {
			display: flex;
			padding-top: 80upx;

			.phone-name {
				padding-right: 46upx;
				font-size: 28upx;
				color: #3d3d3d;
			}

			.input {
				font-size: 28upx;
				color: #999999;
				flex: 1;
			}
		}


		.area {
			.location {
				width: 40upx;
				height: 40upx;
			}
		}

		.add-list {
			position: relative;
			display: flex;
			// justify-content: space-between;
			width: 100%;
			height: 140upx;
			padding-top: 30upx;
			border-bottom: 2upx solid #d8d8d8;

			.detail-address {
				height: 100%;
				display: flex;
				margin-top: 10upx;
				font-size: 32upx;
				// font-weight: bold;
				color: #3662ec;
			}

			.addDetail {
				margin-left: 0upx;
				padding-top: 12upx;
				width: 70%;
				height: 100%;
				// background: #f1f2f6;
				border-radius: 20upx;

				.address {
					line-height: 40upx;
					width: 100%;
					height: 100%;
					border-radius: 20upx;
					// background: #f1f2f6;
					margin-bottom: 0upx;
					padding-left: 42upx;
					box-sizing: border-box;
					font-size: 30upx;
				}

				.input-placeholder {
					// display: flex;
					// align-items: center;
					padding-left: 0upx;
					box-sizing: border-box;
				}
			}
		}

		.background {
			// margin: 112upx 32upx 210upx 0upx;
			margin-top: 110upx;
			width: 100%;
			height: 326upx;
			border-radius: 10upx;
			box-sizing: border-box;
			border: 1upx solid #999999;
			position: relative;

			// padding-left: 40upx;
			// padding-top: 22upx;
			.input {
				padding: 22upx 40upx;
				width: 100%;
				height: 100%;
				font-size: 28upx;
				font-weight: 350;
				color: #999999;
				box-sizing: border-box;
			}

			.shibie {
				position: absolute;
				right: 20upx;
				bottom: 24upx;
				text-align: center;
				width: 78upx;
				height: 46upx;
				border-radius: 4upx;
				background: #cde1fd;
				font-size: 28upx;
				color: #3662ec;
			}
		}
	}

	.foot {
		position: fixed;
		left: 0;
		bottom: 20upx;
		width: 100%;
		height: 118upx;
		box-sizing: border-box;
		padding-right: 68upx;
		padding-left: 68upx;
		padding-top: 26upx;

		.save {
			// padding-top: 8upx;
			text-align: center;
			width: 100%;
			height: 80upx;
			border-radius: 60upx;
			background: linear-gradient(270deg, #e95d20 0%, #ff8f1f 100%);
			font-size: 32upx;
			font-weight: 500;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
