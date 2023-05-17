<template>
	<view class="main-wrapper">
		<!-- 白色区域 -->
		<view class="menu-container">
			<!-- 两个标题 -->
			<view class="text-wrapper">
				<!-- <TuanImage :width="72" :height="22" radius="0"
          :src="require('../../../static/images/con-center/new-home/text-1.png')"></TuanImage>
        <TuanImage :width="72" :height="22" radius="0"
          :src="require('../../../static/images/con-center/new-home/text-2.png')"></TuanImage> -->
				<text>专业性强</text>
				<text>及时服务</text>
			</view>

			<!-- 三个人 -->
			<view class="three-person">
				<view class="image-wrapper" @click="handleToServiceListType(item)" v-for="(item, index) in serviceType"
					:key="index">
					<TuanImage radius="0" :width="92" :height="107" :src="item.a">
					</TuanImage>
					<view class="serve-name">{{ item.label }}</view>
					<TuanImage class="shadow" :width="75" :height="22" :src="item.round"></TuanImage>
				</view>
			</view>

			<!-- 四个服务项 -->
			<view class="serve-list">
				<view class="serve-item" @click="handleToServiceListType(item)" v-for="(item, index) in serveList" :key="index
					">
					<view class="image-wrapper">
						<TuanImage radius="0" :size="40" :src="item.icon"></TuanImage>
						<!-- <TuanImage class="shadow" :width="30" :height="7"
							src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/1zouc764aorxikm72g6u.png">
						</TuanImage> -->
					</view>
					<text class="name">{{ item.label }}</text>
					<image :src="item.logo" mode="" class="animate__animated animate__heartBeat" />
					<image :src="item.flash" mode="" class="animate__animated animate__flash" />
					<image :src="item.water2" mode="" class="water-down"
						style="width: 16upx;height: 22upx;top: 18upx;right: 40upx;" />
				</view>
			</view>

			<!-- 更多服务 -->
			<view class="more-serve" @click="handleToServiceListType({ value: 2 })">
				<text class="more">更多服务</text>
				<TuanIcon :size="20"
					src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/nsez71tgcrlgpeu93h2s.png"></TuanIcon>
			</view>
		</view>

		<!-- 统计 -->
		<view class="count-container">
			<view class="count-item" v-for="item in   countList" :key="item.name">
				<view class="value">{{ item.value }}</view>
				<view class="title">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { serviceType, list, countList } from '../config'
export default {
	data() {
		return {
			serviceType: Object.freeze(serviceType),
			serveList: Object.freeze(list),
			countList: Object.freeze(countList)
		}
	},

	methods: {
		handleToServiceListType(item) {
			uni.navigateTo({
				url: `/community-center/service-sort?value=${item.value}`,
			})
		},
	},
}
</script>

<style lang="less" scoped>
// #abc {
// 	animation-duration: 10000ms;
// }

.main-wrapper {
	position: relative;
}

.menu-container {
	position: relative;
	padding: 28upx 34upx;
	background-color: #fff;
	box-sizing: border-box;
	border-radius: 20upx;
	margin-top: 36upx;
	z-index: 10;
	box-shadow: 0px 5px 2px 0px #fff6ea;

	.text-wrapper {
		padding: 0 150upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		text {
			font-size: 36upx;
			font-weight: bold;
			color: #3D3D3D;
		}
	}

	.more-serve {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 14upx;
		color: #999999;
	}
}

.three-person {
	margin-top: 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.image-wrapper {
		position: relative;

		.shadow {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: -26upx;
		}

		.serve-name {
			position: absolute;
			bottom: 8upx;
			left: 50%;
			transform: translateX(-50%);
			line-height: 1.5;
			text-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
			font-size: 32upx;
			font-weight: bold;
			color: #fff;
		}
	}
}

.serve-list {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 36upx;
	gap: 24upx 0upx;

	.serve-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 130upx;
		position: relative;

		.image-wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.name {
			font-weight: 500;
			font-size: 28upx;
			padding-top: 4upx;
		}

		.animate__animated.animate__heartBeat {
			width: 32upx;
			height: 32upx;
			position: absolute;
			top: -14upx;
			right: 14upx;
			animation-iteration-count: infinite;
		}

		.animate__animated.animate__flash {
			animation-iteration-count: infinite;
			width: 60upx;
			height: 30upx;
			position: absolute;
			top: 52upx;
			left: 51%;
			transform: translateX(-50%);
			animation-duration: 2s;
		}

		.animate__animated.animate__slideInDown {
			position: absolute;
			animation-iteration-count: infinite;
		}

	}
}

.count-container {
	position: absolute;
	width: 100%;
	bottom: -166upx;
	height: 572upx;
	padding: 428upx 52upx 30upx;
	box-sizing: border-box;
	background: linear-gradient(to bottom, #fff2e1, #fff6ea, #fff6ea, #fff5ea, #fff);
	border-radius: 0 0 20upx 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.count-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.value {
			color: #E95D20;
			font-size: 44upx;
			font-weight: bolder;
		}

		.title {
			color: #999999;
			font-size: 28upx;
			margin-top: 6upx;
		}
	}
}

.water-down {
	position: absolute;
	transition: all 350ms;
	animation: water-down-ani 1.2s ease-in infinite ;
}

@keyframes water-down-ani {
	0% {
		transform: translateY(0) scale(0.4);
		opacity: 1;
	}

	100% {
		transform: translateY(40upx) scale(1);
		opacity: 0;
	}
}</style>