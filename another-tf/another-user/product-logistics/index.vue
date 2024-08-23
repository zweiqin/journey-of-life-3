<!-- 物流详情 -->
<template>
	<view class="product-logistics-container">
		<JHeader title="产品物流信息" width="50" height="50"></JHeader>
		<view class="product-logistics_info">
			<view class="texts">快递商家：{{ orderDetail.info.name || '--' }}</view>
			<view class="texts">快递单号：{{ orderDetail.info.no || '--' }}</view>
			<view class="texts">快递备注：{{ orderDetail.info.remark || '--' }}</view>
		</view>
		<view class="product_logistics_List">
			<view v-for="(item, index) in orderDetail.list" :key="index" class="timeline__item">
				<view class="timeline__item-header">
					<view class="icon_body_content" :class="{ isOpen: item.isOpenDetail }" @click="openDetails($event, index)">
						<view class="timeline__arrow-icon" :aria-expanded="item.isOpenDetail">
							<tui-icon name="arrowright" :size="40" unit="rpx" color="#272636" margin="0 20rpx 0 0"></tui-icon>
						</view>
					</view>
					<!-- <button class="timeline__arrow" type="button" id="item1" aria-labelledby="item1-name" aria-controls="item1-ctrld" aria-haspopup="true" data-item="1">
						<svg class="timeline__arrow-icon">
						<use href="#arrow" />
						</svg>
						</button> -->
					<span class="timeline__dot"></span>
					<span id="item1-name" class="timeline__meta">
						<time class="timeline__date" datetime="1970-01-01">
							{{ `${String(new
								Date(Number(item.time) * 1000).getFullYear())}-${String(new Date(Number(item.time) * 1000).getMonth() + 1).padStart(2,
								'0')}-${String(new Date(Number(item.time) * 1000).getDate()).padStart(2, '0')}` }}
						</time><br>
						<strong class="timeline__title">{{ item.source }}</strong>
					</span>
				</view>
				<view
					:id="`item${index + 1}-ctrld`" class="timeline__item-body"
					:class="{ 'timeline__item-body--expanded': item.isOpenDetail }" role="region" aria-labelledby="item1"
					aria-hidden="true"
				>
					<view class="timeline__item-body-content">
						<p class="timeline__item-p">{{ item.message }}</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getBanziDileveryOrderApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ProductLogistics',
	data() {
		return {
			// temps: {
			// 	'--hue': 223,
			// 	'--bg': rgb(227, 228, 232),
			// 	'--fg': rgb(23, 24, 28),
			// 	'--primary': rgb(13, 78, 242),
			// 	'--trans-dur': '0.3s',
			// 	'--trans-timing': 'cubic-bezier(0.65,0,0.35,1)',
			// },
			orderId: '',
			skuId: '',
			orderDetail: { info: {}, list: [] }
		}
	},
	onLoad(options) {
		this.orderId = options.orderId
		this.skuId = options.skuId
		getBanziDileveryOrderApi({
			orderId: this.orderId,
			skuId: this.skuId
		}).then((res) => {
			this.orderDetail = Object.assign(this.orderDetail, res.data)
			this.orderDetail.list = this.orderDetail.list.map((item) => ({
				...item,
				isOpenDetail: true
			}))
			// this.orderDetail.list = orderDetail.list.map((item, index) => ({
			// 	...item,
			// 	isOpenDetail: true
			// }))
		})
			.catch((err) => {
				this.orderDetail = { info: {}, list: [] }
				uni.showToast({
					title: err,
					cion: 'none'
				})
			})
	},
	methods: {
		// 获取产品物流信息
		getProductLogisticsMsg() {
			getBanziDileveryOrderApi({
				orderId: this.orderId,
				skuId: this.skuId
			}).then((res) => {
				console.log(res)
			})
		},
		openDetails(ev, index) {
			const animOptions = {
				duration: 300,
				easing: 'cubic-bezier(0.65,0,0.35,1)'
			}
			this.orderDetail.list[index].isOpenDetail = !this.orderDetail.list[index].isOpenDetail
			const ctrld = document.querySelector(`#item${index + 1}-ctrld`)
			const contentHeight = ctrld.firstElementChild?.offsetHeight
			if (this.orderDetail.list[index].isOpenDetail) {
				this.animation = ctrld.animate([
					{ height: '0px' },
					{ height: `${contentHeight}px` }
				], animOptions)
			} else {
				this.animation = ctrld.animate([
					{ height: `${contentHeight}px` },
					{ height: `${contentHeight}px` },
					{ height: '0px' }
				], animOptions)
			}
		}
	}
}
</script>

<style lang="less" scoped>
/* :root {
	--hue: 223;
	--bg: rgb(227, 228, 232);
	--fg: rgb(23, 24, 28);
	--primary: rgb(13, 78, 242);
	--trans-dur: 0.3s;
	--trans-timing: cubic-bezier(0.65,0,0.35,1);
	font-size: calc(16px + (24 - 16) * (100vw - 320px) / (2560 - 320));
} */
// 32倍
.product-logistics-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
}

.product-logistics_info {
	box-sizing: border-box;
	padding: 30rpx;
	line-height: 48rpx;
}

.timeline {
	margin: auto;
	padding: 0 3rpx;
	width: 100%;
	max-width: 36rpx;
}

/* .timeline__arrow {
	margin-top: 10rpx;
	background-color: transparent;
	border-radius: 8rpx;
	cursor: pointer;
	flex-shrink: 0;
	margin-inline-end: 8rpx;
	outline: transparent;
	width: 40rpx;
	height: 40rpx;
	transition:
		background-color calc(var(--trans-dur) / 2) linear,
		color var(--trans-dur);
	-webkit-appearance: none;
	appearance: none;
	-webkit-tap-highlight-color: transparent;
} */
/* .timeline__arrow:focus-visible, */
/* .timeline__arrow:hover {
	background-color: rgba(118, 125, 143, 0.4);
} */
.isOpen {
	background-color: rgb(115, 118, 140)
}

.icon_body_content {
	margin-right: 10rpx;
	transition:
		background-color calc(0.3s / 2) linear,
		color 0.3s;
	border-radius: 8rpx;
	box-sizing: border-box;
	/* padding: 10rpx; */
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60rpx;
	height: 60rpx;
}

.timeline__arrow-icon {
	/* margin-top: 10rpx; */
	display: block;
	/* margin-left: 5rpx; */
	pointer-events: none;
	/* transform: rotate(-90deg); */
	transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
	width: 50rpx;
	height: 40rpx;
	// width: 100%;
	// height: 100%;
}

.timeline__date {
	font-size: 26rpx;
	line-height: 2.4;
}

.timeline__dot {
	background-color: currentColor;
	border-radius: 50%;
	display: inline-block;
	flex-shrink: 0;
	margin: 20rpx 0;
	margin-inline-end: 32rpx;
	position: relative;
	width: 24rpx;
	height: 24rpx;
}

.timeline__item {
	position: relative;
	padding-bottom: 42rpx;
}

.timeline__item:not(:last-child):before {
	background-color: currentColor;
	content: "";
	display: block;
	position: absolute;
	top: 32rpx;
	left: 82rpx;
	width: 4rpx;
	height: 100%;
	transform: translateX(-50%);
	transition: 1.3s;
}

[dir="rtl"] .timeline__arrow-icon {
	transform: rotate(90deg);
}

[dir="rtl"] .timeline__item:not(:last-child):before {
	right: 72rpx;
	left: auto;
	transform: translateX(50%);
}

.timeline__item-header {
	display: flex;
}

.timeline__item-body {
	border-radius: 12rpx;
	overflow: hidden;
	margin-top: 16rpx;
	margin-inline-start: 128rpx;
	height: 0;
}

.timeline__item-body-content {
	word-break: break-all;
	white-space: Pre-line;
	background-color: rgba(115, 122, 140, 0.2);
	opacity: 0;
	padding: 12rpx 24rpx;
	visibility: hidden;
	transition:
		opacity 0.3s cubic-bezier(0.65, 0, 0.35, 1),
		visibility 0.3s steps(1, end);
	transition:
		opacity 0.3s vcubic-bezier(0.65, 0, 0.35, 1),
		visibility 0.3s steps(1, end);
}

.timeline__meta {
	flex: 1;
	/* width: 100%; */
}

.timeline__title {
	font-size: 48rpx;
	line-height: 1.333;
}

/* Expanded state */
.timeline__item-body--expanded {
	height: auto;
}

.timeline__item-body--expanded .timeline__item-body-content {
	opacity: 1;
	visibility: visible;
	transition-delay: 0.3s, 0s;
}

.timeline__arrow-icon[aria-expanded="true"] {
	transform: rotate(90deg);
}

/* Dark theme */
/* @media (prefers-color-scheme: dark) {
	:root {
		--bg: rgb(23, 24, 28);
		--fg: rgb(227, 228, 232);
		--primary: rgb(110, 149, 247);
	}
} */
.product_logistics_List {
	box-sizing: border-box;
	padding: 0rpx 30rpx;
	width: 100vw;
	height: auto;
}
</style>
