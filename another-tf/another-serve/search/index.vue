<template>
	<view>
		<JHeader title="搜索" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<!-- 搜索商品 -->
		<view>
			<view class="flex-items-plus flex-row mar-top-20">
				<view class="searchImg-box flex-items-plus">
					<tui-icon
						style="position: absolute;left: 38upx;" name="search" :size="65" unit="upx"
						color="#d1d1d1"
					></tui-icon>
					<input
						v-model="search" class="search-box" maxlength="20" placeholder-class="searchboxPlace"
						placeholder="请输入您想要的宝贝"
					/>
				</view>
				<view class="mar-left-40 fs26" @click="getList">搜索</view>
			</view>
		</view>

		<!-- 热门搜索 -->
		<view class="hotSearchBox tipsBox">
			<view v-if="hotSearchList.length > 0" class="boxTitle mar-leftgetList-30">
				<label class="fs30 font-color-999 fs-weight-300">热门搜索</label>
				<tui-icon
					v-if="isSee" name="seen" color="#393939" :size="40"
					unit="upx" style="position: absolute;right: 30upx;"
					@click="isSee = !isSee"
				></tui-icon>
				<tui-icon
					v-else name="unseen" color="#393939" :size="40"
					unit="upx" style="position: absolute;right: 30upx;"
					@click="isSee = !isSee"
				></tui-icon>
			</view>
			<view>
				<view v-if="isSee" class="flex-wrap-1 flex-row">
					<view
						v-for="(item, index) in hotSearchList" :key="index"
						class="historySearDel-box flex-items-plus mar-right-30"
					>
						<view class="boxContent" @click="historySearch(item)">{{ item }}</view>
					</view>
				</view>
				<view v-else class="notSeeContent">当前热门搜索已隐藏</view>
			</view>
		</view>
		<view class="line" color="#F3F4F5" />

		<!-- 历史搜索 -->
		<view class="historyBox tipsBox">
			<view v-if="historyList.length > 0" class="boxTitle mar-leftgetList-30">
				<label class="fs30 font-color-999 fs-weight-300 ">历史搜索</label>
				<tui-icon name="delete" color="#333333" :size="30" unit="upx" style="position: absolute;right: 30upx;" @click="historyDelAll"></tui-icon>
			</view>
			<view class="historySear-box flex-wrap-1 flex-row">
				<view
					v-for="(item, index) in historyList" :key="item.searchId"
					class="historySearDel-box flex-items-plus flex-sp-between mar-right-30"
				>
					<view class="boxContent historyText line1" @click="historySearch(item.search)">{{ item.search }}</view>
					<label class="font-color-DDD fs22 pad-topbot-10 text-align">|</label>
					<view class="historyIconBox" @click="historyDelOne(item.searchId)">
						<tui-icon name="shut" color="#9e9e9e" :size="16" unit="upx"></tui-icon>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import { getSelectHotSearchApi, getSearchHistoryApi, deleteProductAllSearchApi, deleteSearchRecordApi } from '../../../api/anotherTFInterface'

export default {
	name: 'Search',
	data() {
		return {
			searchType: 'goods', // goods或shop
			search: '',
			historyList: [],
			hotSearchList: [],
			isSee: true
		}
	},
	onLoad(option) {
		this.searchType = option.searchType || 'goods'
	},
	onShow() {
		this.findSearchHistory()
		this.findHotSearch()
	},
	methods: {
		getList() {
			if (!this.search) return this.$showToast('请输入要搜索内容！')
			if (this.searchType === 'goods') this.go(`/another-tf/another-serve/goodsList/index?search=${this.search}&shopType=1`)
			else if (this.searchType === 'shop') this.go(`/another-tf/another-user/shop-commodity/index?search=${this.search}`)
		},
		historySearch(search) {
			if (this.searchType === 'goods') this.go(`/another-tf/another-serve/goodsList/index?search=${search}&shopType=1`)
			else if (this.searchType === 'shop') this.go(`/another-tf/another-user/shop-commodity/index?search=${search}`)
		},
		// 热门搜索
		findHotSearch() {
			getSelectHotSearchApi({}).then((res) => {
				this.hotSearchList = res.data
			})
		},
		// 历史记录
		findSearchHistory() {
			getSearchHistoryApi({}).then((res) => {
				this.historyList = res.data
			})
		},
		historyDelAll() {
			uni.showModal({
				title: '温馨提示',
				content: '您确定要清空搜索记录吗？',
				confirmText: '确定清空',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						this.deleteAllSearch()
					}
				}
			})
		},
		deleteAllSearch() {
			deleteProductAllSearchApi({}).then((res) => {
				this.historyList = res.data
			})
		},
		historyDelOne(searchId) {
			uni.showModal({
				title: '温馨提示',
				content: '您确定要删除这一条记录吗？',
				confirmText: '确定删除',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						deleteSearchRecordApi({ searchId })
							.then((res) => {
								this.findSearchHistory()
							})
					}
				}
			})
		}
	}
}
</script>

<style lang='less' scoped>
input {
	padding-left: 80upx;
}

.searchImg-box {

	.search-box {
		background-color: #F1F1F1;
		width: 530upx;
		height: 66upx;
	}

	.searchboxPlace {
		font-size: 26upx;
		color: #A9A9A9;
		padding-right: 30upx;
	}

	.searchClose-icon {
		width: 30upx;
		height: 30upx;
		margin-left: -50upx;
		z-index: 99999;
	}
}

// 热门搜索
.hotSearchBox {
	padding: 0 36upx;

	.historyText {
		flex: 1;
	}

	.notSeeContent {
		margin-top: 20upx;
		text-align: center;
		font-size: 24upx;
		color: #CCCCCC;
	}
}

.line {
	margin: 70upx 0;
	height: 2upx;
	background: #F3F4F5;
}

// 历史搜索
.historyBox {
	padding: 0 36upx;

	.historySear-box {
		width: 100%;
	}

	.historyIconBox {
		width: 50upx;
	}
}

.tipsBox {
	padding: 15rpx 24rpx;
}

.boxTitle {
	margin: 30rpx 0;
}

.historySearDel-box {
	height: 54upx;
	line-height: 54upx;
	margin: 15rpx 15rpx;
	background-color: #F1F1F1;
	text-align: center;
	overflow: hidden;

	.boxContent {
		font-size: 28rpx;
		padding: 0 30rpx;
	}
}
</style>
