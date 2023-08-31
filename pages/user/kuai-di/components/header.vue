<template>
	<view class="navgationTop">
		<img class="back" @click="(ev) => { BindClick(ev) }" src="../image/fanhui.png" alt="">
		<slot name="body">
			<view class="defaultBody">
				欢迎使用团蜂快递服务
			</view>
		</slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			BindClick: {
				type: Function,
				default: () => uni.navigateBack()
			},
			pathUrl: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss">
.navgationTop {
	position: fixed;
	top: 0;
	left: 0;
	box-sizing: border-box;
	width: 100vw;
	height: 88rpx;
	padding: 0 34rpx;
	display: flex;
	align-items: center;
	background-color: #327ee4;
	z-index: 999;
	.back {
		width: 40rpx;
		height: 50rpx;
	}
	.defaultBody {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-size: 34rpx;
		color: white;
		font-weight: 550;
	}
}
</style>
