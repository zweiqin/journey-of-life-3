<template>
	<view class="tabbarView">
		<!-- @click="(ev) => BindClick(ev,index)" -->
		<view class="tabbarItem" v-for="(item,index) in tabbarData" :key="item.name" @click="linkTo(item.path)">
			<image :src="currIndex == index ? item.activeImage: item.imgUrl" mode=""></image>
			<text :class="{blueColor: currIndex == index}">{{ item.name }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			BindClick: {
				type: Function,
				default: () => alert("暂时未绑定方法哦！")
			},
			currIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				tabbarData: [{
					name: "查快递",
					path: "/pages/user/kuai-di/index",
					imgUrl: require("../image/bangongbiaoqiantubiaoji_chakuaidi.png"),
					activeImage: require("../image/bangongbiaoqiantubiaoji_chakuaidi_active.png")
				},{
					name: "寄快递",
					path: "/pages/user/kuai-di/DeliveryExpress",
					imgUrl: require("../image/jikuaidi.png"),
					activeImage: require("../image/jikuaidi_active.png")
				}
				// ,{
				// 	name: "我",
				// 	path: "/pages/index/convenient-services/kuai-di/MyExpress",
				// 	imgUrl: require("../image/wode.png"),
				// 	activeImage: require("../image/wode_active.png")
				// }
				]
			};
		},
		methods: {
			linkTo(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss">
.tabbarView {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 113rpx;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tabbarItem {
		width: 78rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		> image {
			width: 60rpx;
			height: 70rpx;
		}
		> text {
			margin-top: 8rpx;
			font-size: 26rpx;
		}
		.blueColor {
			color: #3881d8;
		}
	}
}
</style>
