<template>
	<view class="tabs-nav-warp">
		<scroll-view class="tabs-nav" scroll-x="true">
			<view class="ul">
				<view class="li" :class="{ 'on': activeTab === 0 }" @click="tabChange(0)">首页</view>
				<view
					v-for="(item, index) in categoryList" :key="index" class="li" :class="{ 'on': activeTab === index + 1 }"
					@click="tabChange(index + 1, item.classifyId)"
				>
					{{ item.classifyName }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getFirstClassifyApi } from '../../../api/anotherTFInterface'
export default {
	name: 'CategoryList',
	data() {
		return {
			activeTab: 0,
			categoryList: []
		}
	},
	mounted() {
		this.getCategoryData()
	},
	methods: {
		tabChange(index, id) {
			this.activeTab = index
			this.$emit('tabChange', index, id)
		},
		getCategoryData() {
			uni.showLoading({
				title: '加载中...'
			})
			getFirstClassifyApi({
			}).then((res) => {
				this.categoryList = res.data
				uni.hideLoading()
			})
				.catch((res) => {
					uni.hideLoading()
				})
		}
	}

}
</script>

<style lang="scss" scoped>
.tabs-nav-warp {
	//margin-top: 20rpx;
	padding: 0 30rpx;

	.tabs-nav {
		.ul {
			display: flex;

			.li {
				flex: 1 0 auto;
				margin-left: 36rpx;
				font-size: 30rpx;
				color: #999999;
				position: relative;
				padding: 18rpx 0;
				box-sizing: border-box;

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

					font-weight:bold;
				}
			}
		}
	}
}
</style>
