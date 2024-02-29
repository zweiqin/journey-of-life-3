<template>
	<view class="search-container">
		<view class="search-wrapper" :class="{ fixed: scrollTop > 100 }">
			<tui-icon name="arrowleft" @click="handleBack"></tui-icon>

			<view class="wrapper">
				<view class="search-icon">
					<tui-icon name="search" :size="40" unit="rpx" color="#000000" margin="0"></tui-icon>
				</view>
				<input confirm-type="search" @confirm="handleSearchServe" v-model="searchValue" type="text"
					placeholder="请输入您想要的服务" />
			</view>

			<button class="uni-btn" :style="{ color: searchValue ? '#f40' : '' }" @click="handleSearchServe">搜索</button>
		</view>

		<view class="search-list item-pane">
			<view class="loading-container" v-show="loading"> 搜索中... </view>
			<view class="no-data" v-show="searchValue && !searchResult.length && !loading">暂无该服务</view>

			<view class="serach-result-item" v-for="result in searchResult" :key="result.serverTypeId" @click="
				hanldeChoose(
					result.serverTypeName,
					result.serverTypeId,
					result.serverImageUrl
				)
			">
				<text> {{ result.serverTypeName }} </text>
				<tui-icon :size="20" color="#ccc" name="arrowright"></tui-icon>
			</view>
		</view>

		<view class="hot-key item-pane">
			<view class="title">热门搜索</view>
			<view class="list">
				<view class="list-item" @click="hanldeChoose(item.name, item.code, item.url)" v-for="item in hotKey"
					:key="item.code">
					{{ item.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	getHotSearchKeyApi,
	searchServeApi,
} from '../api/community-center/index'
const { debounce } = require('../utils/util')
export default {
	data() {
		return {
			searchValue: '',
			hotKey: [],
			searchResult: [],
			scrollTop: 0,
			loading: false,
			a: null
		}
	},

	onLoad() {
		this.getHotSearchKey()
		this.a = debounce(this.handleSearchServe, 500)
	},

	methods: {
		handleSearchServe() {
			const _this = this
			if (!this.searchValue) {
				uni.showToast({
					title: '请输入要搜索的服务名称',
					duration: 2000,
					icon: 'none',
				})

				this.searchResult = []

				return
			}

			this.loading = true
			searchServeApi({
				searchName: this.searchValue,
			}).then(res => {
				if (res.statusCode === 20000) {
					_this.loading = false
					_this.searchResult = res.data
				}
			})
		},
		getHotSearchKey() {
			const _this = this
			getHotSearchKeyApi().then(({ data }) => {
				_this.hotKey = data
			})
		},

		// 选中搜索
		hanldeChoose(name, id, url) {
			uni.navigateTo({
				url: `/community-center/community-detail?id=${id}&serverNameThree=${name}&serverImageUrl=${url}`,
			})
		},

		// 返回
		handleBack() {
			uni.redirectTo({ url: '/community-center/service-sort?value=1' })
		},
	},

	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},

	watch: {
		searchValue(val) {
			if (val) {
				this.a()
			}
		}
	}
}
</script>

<style lang="less" scoped>
.search-container {
	width: 100vw;
	min-height: 100vh;
	background-color: #f3f3f3;

	.search-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		background-color: #fff;
		padding: 20upx 10upx;
		box-sizing: border-box;

		&.fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #fff;
		}

		.wrapper {
			flex: 1;
			display: flex;
			align-items: center;
			background-color: #f1f2f6;
			padding: 20upx;
			border-radius: 100px;

			.search-icon {
				flex-shrink: 0;
				margin-right: 16upx;
				padding-right: 16upx;
				border-right: 1upx solid #000;
			}

			input {
				font-size: 28upx;
			}
		}

		.uni-btn {
			width: 80upx;
			height: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
			color: #ccc;
		}
	}

	.hot-key {
		padding: 20upx;
		box-sizing: border-box;

		.title {
			font-size: 32upx;
			font-weight: 500;
			margin-bottom: 20upx;
		}

		.list {
			display: flex;
			flex-wrap: wrap;

			.list-item {
				font-size: 28upx;
				padding: 10upx 20upx;
				background-color: #f1f2f6;
				border-radius: 10upx;
				margin: 0 20upx 20upx 0;
				transition: all 350ms;
				color: #3d3d3d;

				&:active {
					background-color: rgb(216, 216, 216);
				}
			}
		}
	}

	.item-pane {
		margin-top: 20upx;
		// height: calc(100vh - 148upx);
		background-color: #fff;
		box-sizing: border-box;
		// padding: 20upx;

		.loading-container,
		.no-data {
			text-align: center;
			padding: 20upx 0;
			font-size: 28upx;
			color: #ccc;
			letter-spacing: 2px;
		}

		.serach-result-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80upx;
			border-bottom: 1upx solid #f0f0f0;
			transition: all 350ms;
			padding: 10upx 20upx;

			&:active {
				background-color: rgb(216, 216, 216);
			}

			text {
				font-size: 28upx;
			}
		}
	}
}
</style>
