<template>
	<view class="charge">
		<!-- <view class="top-list">
			<view class="item" v-for="item in items" :key="item.id" :class="{ active: item.id === currentTab }"
				@click="switchTab(item)">{{ item.name }}</view>
		</view> -->
		<view class="project">
			<view class="repair" v-for="(project, index) in data" :key="index">
				<view class="top">
					<text>{{ project.parentName }}</text>
					<view @click="togglebox">
						<image src="../../static/images/a1.png" mode="" v-if="isSpread" />
						<image src="../../static/images/a2.png" mode="" v-if="!isSpread" />
					</view>
				</view>
				<transition>
					<view class="main" v-show="boxshow">
						<view class="sub" v-for="sub in project.children" :key="sub.id">
							<view class="first">
								<text>{{ sub.projectName }}</text>
								<view class="range">￥<text>{{ sub.lowestPrice }}</text>~<text>{{ sub.highestPrice }}</text>/{{ sub.unit }}
								</view>
							</view>
							<view class="second">{{ sub.contentDescription }}</view>
						</view>
					</view>
				</transition>
			</view>
		</view>
	</view>
</template>

<script>
import { items } from './data'
export default {
	name: "Charge",
	props: {
		data: Array
	},
	data() {
		return {
			items,
			currentTab: 1,
			a: '',
			isSpread: true,
			boxshow: true,
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
		togglebox() {
			this.boxshow = !this.boxshow
			this.isSpread = !this.isSpread
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
			margin-bottom: 20upx;

			.top {
				width: 100%;
				// height: 96upx;
				border-radius: 16upx 16upx 16upx 16upx;
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

						.range {
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
