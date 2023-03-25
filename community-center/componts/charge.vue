<template>
	<view class="charge">
		<view class="top-list">
			<view class="item" v-for="item in items" :key="item.id" :class="{ active: item.id === currentTab }"
				@click="switchTab(item)">{{ item.name }}</view>
		</view>
		<view class="project">
			<view class="repair">
				<view class="top">
					<text>维修项目</text>
					<view @click="a = !a">
						<image src="../../static/images/组1.png" mode="" v-if="!a" />
						<image src="../../static/images/组2.png" mode="" v-if="a" />
					</view>
					<!-- <view @click="choice(1)" :class="{ active: currentAble === 1 }">
						<image src="../../static/images/组2.png" mode="" v-if="currentAble == 1"/>
					</view> -->
				</view>
				<view class="main" :style="{ height: a ? 0 : '', margin: a ? '6upx' : '' }">
					<view class="sub" v-for="sub in subs" :key="sub.id">
						<view class="first">
							<text>{{ sub.title }}</text>
							<text>{{ }}</text>
						</view>
						<view class="second">{{ sub.text }}</view>
					</view>
				</view>
			</view>
			<view class="special">
				<text>特殊项目</text>
				<image src="../../static/images/组2.png" mode="" />
			</view>
			<view class="add">
				<text>附加项目</text>
				<image src="../../static/images/组2.png" mode="" />
			</view>
		</view>
	</view>
</template>

<script>
import { items, subs } from './data'
export default {
	name: "Charge",
	props: {

	},
	data() {
		return {
			items,
			subs,
			currentTab: 1,
			a: false
		}
	},
	methods: {
		switchTab(item) {
			console.log(item);
			this.currentTab = item.id
		},
		choice(index) {
			this.current = index
			console.log(this.current)
		},
	},
	created() { }
}
</script>

<style lang="less" scoped>
.charge {
	.top-list {
		padding: 30upx 80upx 0 80upx;
		display: flex;
		justify-content: space-between;

		.item {
			font-size: 32upx;
			color: #B3B2AD;
			position: relative;

			&.active {
				font-size: 32upx;
				font-weight: bold;
				color: #E95D20;

				&::after {
					width: 56upx;
				}
			}

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -12upx;
				width: 0;
				height: 4upx;
				border-radius: 10upx;
				background-color: #E95D20;
				transition: all 350ms ease-in;
			}
		}
	}

	.project {
		padding: 0 30upx;
		padding-top: 40upx;

		.repair {
			width: 100%;
			// height: 622upx;
			border-radius: 16upx;
			box-sizing: border-box;
			border: 2upx solid #E95D20;

			.top {
				width: 100%;
				// height: 96upx;
				border-radius: 16upx 16upx 0upx 0upx;
				background: #FEF7F4;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 28upx 20upx;
				box-sizing: border-box;

				text {
					font-size: 28upx;
					font-weight: bold;
					line-height: 42upx;
					color: #E95D20;
				}

				image {
					width: 32upx;
					height: 32upx;
				}
			}

			.main {
				margin: 30upx 20upx;
				display: flex;
				flex-direction: column;
				gap: 48upx;
				overflow: hidden;

				.sub {

					.first {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-bottom: 20upx;

						text {
							font-size: 28upx;
							color: #141000;
						}
					}

					.second {
						font-size: 28upx;
						color: #8F8D85;
						line-height: 42upx;
					}
				}
			}
		}

		.special {
			width: 100%;
			// height: 96upx;
			border-radius: 16upx;
			border: 2upx solid #E95D20;
			background: #FEF7F4;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 28upx 20upx;
			box-sizing: border-box;
			margin: 20upx 0;

			text {
				font-size: 28upx;
				font-weight: bold;
				line-height: 42upx;
				color: #E95D20;
			}

			image {
				width: 32upx;
				height: 32upx;
			}
		}

		.add {
			width: 100%;
			// height: 96upx;
			border-radius: 16upx;
			border: 2upx solid #E95D20;
			background: #FEF7F4;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 28upx 20upx;
			box-sizing: border-box;

			text {
				font-size: 28upx;
				font-weight: bold;
				line-height: 42upx;
				color: #E95D20;
			}

			image {
				width: 32upx;
				height: 32upx;
			}
		}
	}
}
</style>
