<template>
	<div class="hom-page home_page_content">
		<!-- 头部 -->
		<FixedHead>
			<CategoryList @tabChange="tabChange"></CategoryList>
		</FixedHead>
		<!-- 首页画布骨架屏 -->

		<template v-if="!isFirst">
			<!-- 首页画布 -->
			<view v-if="activeTab === 0" id="home_canvas_page">
				<CanvasPage :components-data="componentsData" :terminal="terminal" :type-id="1" />
			</view>

			<!-- 其他分类 -->
			<CategoryShow v-else ref="categoryShow" :classify-id="classifyId" />

			<ListBottomTips v-if="activeTab === 0 && scrollTop > 400" :loading="false" />

			<Agreement></Agreement>

			<ATFAdWindow ref="refATFAdWindow" :trigger-condition="1"></ATFAdWindow>

		</template>

	</div>
</template>

<script>
import { getCanvasApi } from '../../api/anotherTFInterface'
import CanvasPage from '../../components/canvasShow/canvasShowPage.vue'
import FixedHead from './components/FixedHead.vue'
import CategoryList from './components/categoryList.vue'
import CategoryShow from './components/categoryShow.vue'
import ListBottomTips from './components/ListBottomTips.vue'
import Agreement from './components/Agreement.vue'

export default {
	name: 'Index',
	components: {
		CanvasPage,
		CategoryList,
		CategoryShow,
		FixedHead,
		ListBottomTips,
		Agreement
	},
	data() {
		return {
			terminal: getApp().globalData.terminal,
			isFirst: true,
			classifyId: 0, // 分类ID
			activeTab: 0,
			componentsData: [],
			scrollTop: 0
		}
	},
	onReachBottom() {
		this.HandleLoadMoreProduct()
	},
	onLoad() {
		this.$nextTick(() => {
			uni.showLoading()
			// 读取画布
			getCanvasApi({ terminal: this.terminal, type: 1 }).then((res) => {
				if (JSON.stringify(res.data) !== '{}') {
					this.componentsData = JSON.parse(res.data.json)
					this.isFirst = false
					uni.hideLoading()
					this.$nextTick(() => {
						this.$refs.refATFAdWindow.getAd()
					})
				} else {
					uni.hideLoading()
					this.componentsData = []
				}
			})
				.catch(() => {
					uni.hideLoading()
				})
		})
	},
	mounted() {
		// console.log(this)
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},
	methods: {
		// 分享到朋友圈
		onShareTimeline() {
			return {
				title: this.miniHomeRemark,
				imageUrl: this.miniHomeImg,
				path: 'pages/tabbar/index/index'
			}
		},
		// 分享好友
		onShareAppMessage() {
			return {
				title: this.miniHomeRemark,
				imageUrl: this.miniHomeImg,
				path: 'pages/tabbar/index/index'
			}
		},

		/**
		 * 请求非首页的子组件的下一页
		 * */

		HandleLoadMoreProduct() {
			if (this.activeTab !== 0) {
				const pitchOnPage = this.$refs.categoryShow
				if (pitchOnPage.total !== 0 && pitchOnPage.productList.length < pitchOnPage.total) {
					pitchOnPage.page++
					pitchOnPage.handleGetProductData()
				}
			}
		},

		tabChange(index, id) {
			this.activeTab = index
			this.classifyId = id
		}

	}
}
</script>

<style
    lang="scss"
    scoped
>
.header {
	background: #fff;

	.toLive {
		height: 40px;
		color: #FFF;
		background-color: #333;
	}

	.topBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}

	.logo {
		width: 280rpx;
		height: 100%;
		//margin-top: -40rpx;
		// margin-left: 30rpx;
	}

	.search-btn {
		height: 66rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 33rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 30rpx;

		.search-icon {
			width: 60rpx;
			height: 60rpx;
			// margin-left: 33rpx;
		}

		.search-word {
			font-size: 26rpx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-left: 10rpx;
		}
	}

	.tabs-nav-warp {
		margin-top: 20rpx;
		padding: 0 30rpx;
	}

	.tabs-nav {
		.ul {
			display: flex;

			.li {
				flex: 1 0 auto;
				margin-left: 36rpx;
				font-size: 30rpx;
				color: #999999;
				position: relative;
				padding-bottom: 18rpx;

				&:first-child {
					margin-left: 0;
				}

				&.on {
					&:after {
						content: '';
						width: 100%;
						height: 4rpx;
						background: #C5AA7B;
						position: absolute;
						left: 0;
						bottom: 0;
					}

					font-weight: bold;
				}
			}
		}
	}
}

.weiXinBox {
	width: 100%;
	//position: fixed;
	background: #FFFFFF;
	//z-index: 99;
}

.wxBtnBg {
	padding: 0 20rpx;

	.weiXinBoxBtn {
		display: flex;
		align-items: center;
		padding: 10rpx 0 10rpx 15rpx;
		width: 100%;
		background: #F3F4F5;
		opacity: 1;

		.search-icon {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}

		text {
			color: #999999;
		}
	}
}

.terminal1 {
	.header {
		.topBox {
			// justify-content: left;

			.search-btn {
				.search-icon {
					margin-left: 0rpx;
				}
			}
		}
	}
}

.topTitle {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100rpx;
	width: 100%;

	.topText {
		text-align: center;
		color: #000000;
		font-size: 38rpx;
		font-weight: bold;
	}
}

.topWap {
	padding-top: 30rpx;

	.logo {
		margin-top: 0 !important;
	}
}

.terminal2 {}

.terminal3 {}

// 触底样式
.reachBottom {
	margin-top: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.reach-icon {
		width: 150rpx;
		height: 150rpx;
	}

	.reach-text {
		margin: 20rpx 0;
		color: #CCCCCC;
	}
}

// 优化兼容UI
.home_page_content {
	#home_canvas_page {
		width: 100%;
		position: relative;
	}

}
</style>
