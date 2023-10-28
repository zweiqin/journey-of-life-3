<template>
	<div class="banner" :class="'terminal' + terminal">
		<swiper
			class="swiper" :circular="true" :indicator-dots="false" :autoplay="true"
			:style="{ 'height': bannerHeight + 'rpx' }" @change="swiperChange"
		>
			<swiper-item
				v-for="(item, index) in bannerList" :key="index" class="banner-item"
				:style="{ backgroundImage: 'url(' + item.bannerUrl + ')' }" @click="jumpLink(item.linkObj)"
			>
				<!--        <div class="a-link" @click="jumpLink(item.linkObj)"><img class="img" :src="item.bannerUrl" v-show="item.bannerUrl" mode="widthFix"></div> -->
			</swiper-item>
		</swiper>
		<view v-if="bannerList && bannerList.length > 1" class="swiper-dots">
			<text
				v-for="(dot, index) in bannerList.length" :key="index" class="dot"
				:class="index === swiperCurrent && 'dot-active'"
			></text>
		</view>
	</div>
</template>

<script>
import { funMixin } from '../config/mixin'
export default {
	name: 'ShopBanner',
	mixins: [ funMixin ],
	props: {
		terminal: {
			type: Number,
			default: 4
		},
		componentContent: {
			type: Object
		}
	},
	data() {
		return {
			bannerHeight: 0,
			swiperCurrent: 0
		}
	},
	computed: {
		bannerList() {
			return this.componentContent.bannerData.filter(function (item) {
				return item.bannerUrl
			})
		}
	},
	mounted() {
		this.bannerHeight = this.componentContent.height
		this.$forceUpdate() // 刷新轮播图
	},
	methods: {
		swiperChange(e) {
			this.swiperCurrent = e.detail.current
		}
	}
}
</script>

<style lang="scss" scoped>
.banner {
	position: relative;

	.banner-item {
		width: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: auto 100%;

		img {
			display: none;
		}
	}

	&.terminal4 {
		::v-deep .el-carousel {
			height: 100%;

			.el-carousel__container {
				height: 100%;
			}
		}

		.banner-item {
			background-repeat: no-repeat;
			background-position: center;
			background-size: auto 100%;

			img {
				display: none;
			}
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20upx;
		z-index: 200;

		.dot {
			width: 12upx;
			height: 12upx;
			background: #FFFFFF;
			border-radius: 6upx;
			opacity: 0.2;
			margin: 0 10upx;
		}

		.dot-active {
			opacity: 1;
			width: 24upx;
		}
	}

}
</style>
