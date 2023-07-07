<template>
	<view class="banner" :style="{
		height: height + 'px',
		'border-radius': radius + 'px',
		'margin-top': top + 'px',
	}">
		<swiper class="swiper" :interval="3000" :indicator-dots="indicationPoint" autoplay indicator-color="#fff" indicator-active-color="#fff"
			@change="handleChange">
			<swiper-item v-for="item in list" :key="item">
				<tui-lazyload-img v-if="isLazyLoad" height="100%" mode="widthFix"
					style="height: 100%; width: 100%; 'border-radius':10px" :src="item" alt="" />

				<image v-else height="100%" mode="widthFix" style="height: 100%; width: 100%; 'border-radius':10px" :src="item"
					alt="" />
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
export default {
	props: {
		height: {
			type: Number,
			default: 150
		},
		radius: {
			type: Number,
			default: 10,
		},
		top: {
			type: Number,
			default: 14,
		},
		list: {
			type: Array,
			default: () => [
				'https://img0.baidu.com/it/u=138670212,3825563627&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=248',
				'https://img0.baidu.com/it/u=906034522,1602987140&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=208',
				'https://img2.baidu.com/it/u=3652009798,4006120259&fm=253&fmt=auto&app=138&f=JPEG?w=1024&h=479',
			],
		},
		indicationPoint: {
			type: Boolean,
			default: true,
		},
		isLazyLoad: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			currentIndex: 0
		}
	},

	methods: {
		handleChange(e) {
			this.currentIndex = e.detail.current
			this.$emit('change', e.detail.current)
		},

		// 点击预览
		prev() {
			uni.previewImage({
				current: this.currentIndex,
				urls: this.list
			})
		}
	},
}
</script>

<style lang="less" scoped>
.banner {
	width: 100%;
	height: 284upx;
	border-radius: 20upx;
	overflow: hidden;

	.swiper {
		width: 100%;
		height: 100%;

		/deep/ .uni-swiper-dot-active {
			transition: all 350ms;
			border-radius: 0;
			width: 40upx !important;
		}

		/deep/ .uni-swiper-dot {
			border-radius: 0px;
			transition: all 350ms;
			height: 4upx;
			width: 4upx;
			margin-right: 6upx;
		}

		img {
			width: 100%;
			height: 100%;
		}

		/deep/ uni-image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
