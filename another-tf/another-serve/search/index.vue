<template>
	<view>
		<JHeader title="购买宝贝" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<!-- 搜索商品 -->
		<view>
			<view class="flex-items-plus flex-row mar-top-20">
				<view class="searchImg-box flex-items-plus">
					<!-- <image class="searchImg" src="../../../static/images/origin/searchImg.png"></image> -->
					<input
						v-model="keyWord" class="search-box" maxlength="20" placeholder-class="searchboxPlace"
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
				<!-- <image
					v-if="isSee" class="seeIcon hotSearchListSee-icon" src="../../../static/images/origin/see.png"
					@click="changeHotSearchListIsSee"
					></image>
					<image
					v-else class="seeIcon hotSearchListNotSee-icon" src="../../../static/images/origin/notSee.png"
					@click="changeHotSearchListIsSee"
					></image> -->
			</view>
			<view>
				<view v-if="isSee" class="flex-wrap-1 flex-row">
					<view
						v-for="(item, index) in hotSearchList" :key="index"
						class="historySearDel-box flex-items-plus mar-right-30"
					>
						<view class="boxContent" @click="historyKeyword(item)">{{ item }}</view>
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
				<!-- <image class="historyDel-icon" src="../../../static/images/origin/historyDel_icon.png" @click="historyDelAll">
					</image> -->
			</view>
			<view class="historySear-box flex-wrap-1 flex-row">
				<view
					v-for="(item, index) in historyList" :key="item.searchId"
					class="historySearDel-box flex-items-plus flex-sp-between mar-right-30"
				>
					<view class="boxContent historyText line1" @click="historyKeyword(item.search)">{{ item.search }}</view>
					<label class="font-color-DDD fs22 pad-topbot-10 text-align">|</label>
					<view class="historyIconBox" @click="historyDelOne(item.searchId)">
						<!-- <image class="historySearDel-icon text-align" src="../../../static/images/origin/historySearDel_icon.png">
							</image> -->
					</view>
				</view>
			</view>
		</view>

	</view>
	</view>
</template>

<script>
// const NET = require('../../../utils/request')
// const API = require('../../../config/api')
export default {
	data() {
		return {
			keyWord: '',
			historyList: [],
			hotSearchList: [],
			list: [],
			isSee: true
		}
	},
	onLoad() {

	},
	onShow() {
		this.findSearchHistory()
		this.findHotSearch()
	},
	methods: {
		searchTextDel() {
			this.keyWord = ''
		},
		getList() {
			if (!this.keyWord) {
				uni.showToast({
					title: '请输入要搜索内容！',
					duration: 2000,
					icon: 'none'
				})
			} else {
				uni.navigateTo({
					url: '../../goodsModule/goodsList?keyWord=' + this.keyWord
				})
			}
		},
		historyKeyword(keyWord) {
			uni.navigateTo({
				url: '../../goodsModule/goodsList?keyWord=' + keyWord
			})
		},
		// 热门搜索
		findHotSearch() {
			NET.request(API.SelectHotSearch, {}, 'GET').then((res) => {
				this.hotSearchList = res.data
			})
		},
		changeHotSearchListIsSee() {
			this.isSee = !this.isSee
		},
		// 历史记录
		findSearchHistory() {
			NET.request(API.SearchHistory, {}, 'GET').then((res) => {
				this.historyList = res.data
			})
				.catch((res) => {

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
					} else if (res.cancel) {
					}
				}
			})
		},
		deleteAllSearch() {
			NET.request(API.DeleteAllSearch, {}, 'POST').then((res) => {
				this.historyList = res.data
			})
				.catch((res) => {

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
						NET.request(API.DeleteSearch, {
							searchId
						}, 'POST').then((res) => {
							this.findSearchHistory()
						})
							.catch((res) => { })
					} else if (res.cancel) {
					}
				}
			})
		}
	}
}
</script>

<style lang='scss' scoped>
input {
	padding-left: 80upx;
}

.searchImg-box {
	.searchImg {
		width: 36upx;
		height: 36upx;
		position: absolute;
		left: 60upx;
	}

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

	.hotSearchListSee-icon {
		height: 24upx;
	}

	.hotSearchListNotSee-icon {
		height: 36upx;
	}

	.seeIcon {
		width: 40upx;
		position: absolute;
		right: 30upx;
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

	.historyDel-icon {
		width: 30upx;
		height: 30upx;
		position: absolute;
		right: 30upx;
	}

	.historyIconBox {
		width: 50upx;

		.historySearDel-icon {
			position: relative;
			width: 16upx;
			height: 16upx;
		}
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
