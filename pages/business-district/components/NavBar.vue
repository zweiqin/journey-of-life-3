<template>
	<view class="nav-bar-container">
		<swiper indicator-dots :style="{ height: swiperHeight }" @change="handleSwiperChange">
			<!-- <swiper @change="handleSwiperChange" indicator-dots style="height: 360upx;"> -->
			<swiper-item class="nav-item">
				<view class="item">
					<view v-for="item in navbarOne" :key="item.name" class="menu-item" @click="$emit('view', item)">
						<image class="menu-icon" :src="item.icon"></image>
						<text>{{ item.name }}</text>
						<img v-if="item.tag && item.tag === 'phone-bill'" class="phone-bil" :src="item.tagUrl" alt="">
						<img v-if="item.tag && item.tag === 'fix'" class="fix" :src="item.tagUrl" alt="">
					</view>
				</view>

				<view class="item item-next">
					<view v-for="item in navbarTwo" :key="item.name" class="menu-item" @click="$emit('view', item)">
						<image class="menu-icon" :src="item.icon"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>

				<view class="item item-next">
					<view v-for="item in navbarThree" :key="item.name" class="menu-item" @click="$emit('view', item)">
						<image class="menu-icon" :src="item.icon"></image>
						<text>{{ item.name }}</text>
						<img v-if="item.tag && item.tag === 'sheng'" class="sheng" :src="item.tagUrl" alt="">
					</view>
				</view>
			</swiper-item>
			<swiper-item class="nav-item">
				<view class="item">
					<view v-for="item in navbarOne" :key="item.name" class="menu-item" @click="$emit('view', item)">
						<image class="menu-icon" :src="item.icon"></image>
						<text>{{ item.name }}</text>
						<img v-if="item.tag && item.tag === 'phone-bill'" class="phone-bil" :src="item.tagUrl" alt="">
						<img v-if="item.tag && item.tag === 'fix'" class="fix" :src="item.tagUrl" alt="">
					</view>
				</view>

				<view class="item item-next">
					<view v-for="item in navbarFour" :key="item.name" class="menu-item" @click="$emit('view', item)">
						<image class="menu-icon" :src="item.icon"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>

				<view class="item item-next">
					<view v-for="item in navbarFive" :key="item.name" class="menu-item" @click="$emit('view', item)">
						<image class="menu-icon" :src="item.icon"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { getFirstLevelShopLabelListApi } from '../../../api/community-center'
import { navbarOne, navbarTwo, navbarThree, navbarFour, navbarFive } from '../config'
export default {
	name: 'NavBar',
	data() {
		return {
			classificationOneList: [],
			navbarOne: Object.freeze(navbarOne),
			navbarTwo: Object.freeze(navbarTwo),
			navbarThree: Object.freeze(navbarThree),
			navbarFour: Object.freeze(navbarFour),
			navbarFive: Object.freeze(navbarFive),
			swiperHeight: '512upx'
		}
	},
	async created() {
		try {
			const res = await getFirstLevelShopLabelListApi({})
			if (res.statusCode === 20000) {
				if (res.data) {
					this.classificationOneList = res.data
					if (this.classificationOneList.length) this.navbarOne = this.classificationOneList.slice(0, 5)
					if (this.classificationOneList.length > 5) this.navbarTwo = this.classificationOneList.slice(5, 10)
					if (this.classificationOneList.length > 10) this.navbarThree = this.classificationOneList.slice(10, 15)
					if (this.classificationOneList.length > 15) this.navbarFour = this.classificationOneList.slice(15, 20)
					if (this.classificationOneList.length > 20) this.navbarFive = this.classificationOneList.slice(20, 25)
				} else {
					this.classificationOneList = []
				}
			} else {
				res.statusMsg ? this.$showToast(res.statusMsg) : ''
			}
		} catch (error) {
			this.$showToast(error || '未知错误')
		}
	},

	methods: {
		handleSwiperChange(e) {
			this.swiperHeight = (e.detail.current === 0) || (e.detail.current === 1) ? '512upx' : '360upx'
		}
	}
}
</script>

<style lang="less" scoped>
/deep/ .uni-swiper-dot-active,
/deep/.uni-swiper-dot {
	width: 14upx;
	border-radius: 100px;
	height: 6upx;
	transition: all 350ms;
}

/deep/ .uni-swiper-dot-active {
	width: 47upx;
	background-color: #EF5511;
}

.nav-bar-container {
	width: 100%;
	background-color: #fff;
	margin: 24upx 0;
	border-radius: 20upx;

	.nav-item {
		padding: 15upx 20upx;
		box-sizing: border-box;

		.item {
			display: flex;
			align-items: center;
			// justify-content: space-between;

			&.item-next {
				margin-top: 20upx;
			}

			.menu-item {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 20%;
				font-size: 28upx;
				color: #222229;

				.menu-icon {
					width: 80upx;
					height: 80upx;
					margin-bottom: 15upx;
				}

				.phone-bil {
					position: absolute;
					width: 80upx;
					height: 28upx;
					top: -4upx;
					right: -26upx;
				}

				.fix {
					position: absolute;
					width: 38upx;
					height: 38upx;
					top: -14upx;
					right: -14upx;
				}

				.sheng {
					position: absolute;
					width: 42upx;
					height: 42upx;
					top: -14upx;
					right: -14upx;
				}
			}
		}
	}
}
</style>
