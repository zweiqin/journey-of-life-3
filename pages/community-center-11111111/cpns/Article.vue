<template>
	<view class="article-list-container">
		<view class="tabs">
			<view class="item" @click="handleSwitch('1')" :class="{ active: currentTab === '1' }">服务项目</view>
			<view class="item" @click="handleSwitch('2')" :class="{ active: currentTab === '2' }">居家分享</view>
		</view>
		<view class="article-list" v-show="currentTab === '1'">
			<!-- <view class="top">
				<TuanImage :width="345" :height="130" radius="20rpx 20rpx 0 0"
					:src="require('../../../static/images/con-center/new-home/f03ebfae94d6e6c55b283abb2e41118.png')"></TuanImage>
			</view> -->
			<view @click="handleToArticleDeatil(item.id, 1)" style="display: flex;justify-content: center;"
				v-for="item in articleList[1]" :key="item.id">
				<view class="article-item">
					<view class="article-info">
						<view class="article-title">{{ item.title }}</view>
						<view class="author">
							<view class="auth">{{ item.author }}</view>
							<view class="auth">{{ item.publishDate.split(' ')[0] }}</view>
						</view>
					</view>
					<TuanImage :width="100" radius="0" :height="70" :src="item.cover">
					</TuanImage>
				</view>
			</view>
		</view>

		<view class="article-list" v-show="currentTab === '2'">
			<!-- <view class="top">
				<TuanImage :width="345" :height="130" radius="20rpx 20rpx 0 0"
					:src="require('../../../static/images/con-center/new-home/f03ebfae94d6e6c55b283abb2e41118.png')"></TuanImage>
			</view> -->
			<view @click="handleToArticleDeatil(item.id, 2)" style="display: flex;justify-content: center;"
				v-for="item in articleList[2]" :key="item.id">
				<view class="article-item">
					<view class="article-info">
						<view class="article-title">{{ item.title }}</view>
						<view class="author">
							<view class="auth">{{ item.author }}</view>
							<view class="auth">{{ item.publishDate.split(' ')[0] }}</view>
						</view>
					</view>
					<TuanImage :width="100" radius="0" :height="70" :src="item.cover">
					</TuanImage>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getArticleListApi } from '../../../api/community-center'
export default {
	data() {
		return {
			currentTab: '1',
			articleList: {
				1: [],
				2: []
			}
		}
	},

	mounted() {
		this.getArticleList()
	},

	methods: {
		handleSwitch(tab) {
			this.currentTab = tab
			this.getArticleList()
		},

		async getArticleList() {
			if (this.articleList[this.currentTab].length) return
			const { data } = await getArticleListApi({
				type: this.currentTab * 1
			})

			this.articleList[this.currentTab] = data
		},

		// 点击跳转详情
		handleToArticleDeatil(id, type) {
			uni.navigateTo({
				url: '/community-center/article-detial?id=' + id + '&type=' + type,
			});
		}
	},


}
</script>

<style lang="less" scoped>
.article-list-container {
	padding-bottom: 140upx;

	.tabs {
		padding-left: 54upx;
		// padding: 0 22upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.item {
			margin-right: 60upx;
			font-size: 36upx;
			position: relative;
			transition: 350ms font-weight;



			&::after {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				content: '';
				display: block;
				background: url('../../../static/images/con-center/new-home/line.png') no-repeat;
				background-size: cover;
				width: 84upx;
				height: 20upx;
				opacity: 0;
				transition: 350ms;
			}

			&.active {
				font-weight: bold;

				&::after {
					opacity: 1;
				}
			}
		}
	}

	.article-list {
		margin-top: 30upx;

		&:nth-child(:last-child) {
			border-bottom: none;
		}

		.top {
			display: flex;
			justify-content: center;
		}

		.article-item {
			position: relative;
			width: 690upx;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			padding: 30upx 24upx 38upx 30upx;
			box-sizing: border-box;
			// border-bottom: 1upx solid #D8D8D8;
			background-color: #fff;
			transition: all 350ms;

			&:active {
				background-color: #e4e4e4;
			}

			&::after {
				content: '';
				position: absolute;
				width: 636upx;
				height: 2upx;
				background-color: #D8D8D8;
				left: 30upx;
				bottom: 0upx;
			}

			.article-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 140upx;

				.author {
					display: flex;
					justify-content: space-between;
					color: #ccc;
					font-size: 28upx;
				}
			}

			.article-title {
				width: 410upx;
				font-weight: 500;
				color: #3d3d3d;
				font-size: 32upx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>