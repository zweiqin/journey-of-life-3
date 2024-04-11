<template>
	<view class="nav-bar-container">
		<swiper indicator-dots :style="{ height: swiperHeight }" @change="handleSwiperChange">
			<!-- <swiper @change="handleSwiperChange" indicator-dots style="height: 360upx;"> -->
			<swiper-item class="nav-item">
				<view class="item">
					<NavBarItem v-for="(item, index) in navbarOne" :key="index" :data="item" @click="$emit('view', item)">
					</NavBarItem>
				</view>
				<view class="item">
					<NavBarItem v-for="(item, index) in navbarTwo" :key="index" :data="item" @click="$emit('view', item)">
					</NavBarItem>
				</view>
				<view class="item">
					<NavBarItem v-for="(item, index) in navbarThree" :key="index" :data="item" @click="$emit('view', item)">
					</NavBarItem>
				</view>
			</swiper-item>

			<swiper-item class="nav-item">
				<view class="item">
					<NavBarItem v-for="(item, index) in navbarOne" :key="index" :data="item" @click="$emit('view', item)">
					</NavBarItem>
				</view>
				<view class="item">
					<NavBarItem v-for="(item, index) in navbarFour" :key="index" :data="item" @click="$emit('view', item)">
					</NavBarItem>
				</view>
				<view class="item">
					<NavBarItem v-for="(item, index) in navbarFive" :key="index" :data="item" @click="$emit('view', item)">
					</NavBarItem>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import NavBarItem from './NavBarItem.vue'
import { getShopCategoryLevelApi } from '../../../api/anotherTFInterface'
import { navbarAll } from '../config'
export default {
	name: 'NavBar',
	components: { NavBarItem },
	data() {
		return {
			classificationOneList: [],
			navbarOne: navbarAll.slice(0, 5),
			navbarTwo: navbarAll.slice(5, 10),
			navbarThree: navbarAll.slice(10, 15),
			navbarFour: navbarAll.slice(15, 20),
			navbarFive: navbarAll.slice(20, 25),
			swiperHeight: '512upx'
		}
	},
	created() {
	},

	methods: {
		async handleGetShopCategory() {
			const res = await getShopCategoryLevelApi({ levelId: 1 })
			this.classificationOneList = res.data || []
			if (this.classificationOneList.length) {
				this.navbarOne = this.classificationOneList.slice(0, 5).map((item) => {
					const tempIconObj = navbarAll.find((i) => i.storeName === item.storeName)
					return tempIconObj ? { ...item, ...tempIconObj } : { ...item, iconUrl: '', type: 0 }
				})
			}
			if (this.classificationOneList.length > 5) {
				this.navbarTwo = this.classificationOneList.slice(5, 10).map((item) => {
					const tempIconObj = navbarAll.find((i) => i.storeName === item.storeName)
					return tempIconObj ? { ...item, ...tempIconObj } : { ...item, iconUrl: '', type: 0 }
				})
			}
			if (this.classificationOneList.length > 10) {
				this.navbarThree = this.classificationOneList.slice(10, 15).map((item) => {
					const tempIconObj = navbarAll.find((i) => i.storeName === item.storeName)
					return tempIconObj ? { ...item, ...tempIconObj } : { ...item, iconUrl: '', type: 0 }
				})
			}
			if (this.classificationOneList.length > 15) {
				this.navbarFour = this.classificationOneList.slice(15, 20).map((item) => {
					const tempIconObj = navbarAll.find((i) => i.storeName === item.storeName)
					return tempIconObj ? { ...item, ...tempIconObj } : { ...item, iconUrl: '', type: 0 }
				})
			}
			if (this.classificationOneList.length > 20) {
				this.navbarFive = this.classificationOneList.slice(20, 25).map((item) => {
					const tempIconObj = navbarAll.find((i) => i.storeName === item.storeName)
					return tempIconObj ? { ...item, ...tempIconObj } : { ...item, iconUrl: '', type: 0 }
				})
			}
		},
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
	margin: 24upx 0 0;
	border-radius: 20upx;

	.nav-item {
		padding: 15upx 20upx;
		box-sizing: border-box;

		.item {
			display: flex;
			align-items: center;
			padding-bottom: 20upx;
		}

		.item:last-child {
			padding-bottom: 0;
		}
	}
}
</style>
