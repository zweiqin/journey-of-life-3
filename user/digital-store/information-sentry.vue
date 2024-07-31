<template>
	<view class="information-sentry-container">
		<div class="header">
			<tui-icon name="arrowleft" color="#767676" :size="48" unit="rpx" @click="handleBack"></tui-icon>
			<h2
				:style="{
					flex: searchActive ? 'none' : 1
				}"
			>
				信息哨兵
			</h2>
			<view class="search" :class="{ active: searchActive }">
				<tui-icon
					name="search" color="#767676" :size="32" unit="rpx"
					margin="0 10rpx 0 0"
					@click="handleSearch"
				></tui-icon>

				<input
					ref="inputRef" class="search-input" placeholder="输入手机号昵称搜索" type="text"
					:value="query.search"
					@input="handleSearchFn"
				/>
			</view>
		</div>

		<view class="navs">
			<view
				v-for="item in navs" :key="item.label" class="item" :class="{ active: query.status === item.value }"
				@click="changeCurrentTab(item.value)"
			>
				{{ item.label }}
			</view>
		</view>

		<view v-show="list.length" class="main">
			<view v-show="query.status === 1">
				<CollectPane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess"></CollectPane>
			</view>

			<view v-show="query.status === 2">
				<ConversionPane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess">
				</ConversionPane>
			</view>

			<view v-show="query.status === 3">
				<PursueSalePane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess">
				</PursueSalePane>
			</view>

			<view v-show="query.status === 4">
				<StanPane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess"></StanPane>
			</view>
		</view>

		<view v-show="!list.length">
			<tui-no-data :fixed="false" style="padding-top: 100rpx;">暂无数据</tui-no-data>
		</view>

		<tui-icon
			v-show="query.status !== 4" name="add-fill" color="#4d70cc" :size="60"
			unit="px" class="add-icon"
			@click="handleToAdd"
		></tui-icon>

		<AddPopup ref="addPopupRef" :words="words" :type="query.status" :list="list"></AddPopup>
	</view>
</template>

<script>
import { informationSentryNavs } from './config'
import CollectPane from './components/collect-pane.vue'
import ConversionPane from './components/conversion-pane.vue'
import PursueSalePane from './components/pursue-sale-pane.vue'
import StanPane from './components/stan-pane.vue'
import { getMsgSentryListApi, getWordsApi } from '../../api/user'
import { getUserId } from '../../utils'
import AddPopup from './components/add-popup.vue'
const { debounce } = require('../../utils/util')

export default {

	components: {
		CollectPane,
		ConversionPane,
		PursueSalePane,
		StanPane,
		AddPopup
	},
	data() {
		return {
			searchActive: false,
			navs: informationSentryNavs,
			currentTab: 1,
			query: {
				userId: getUserId(),
				status: 1,
				search: ''
			},
			list: [],
			popupVisiable: false,
			words: '',
			handleSearchFn: null
		}
	},

	created() {
		this.getListData()
		this.handleSearchFn = debounce(this.search, 500)
	},

	methods: {
		// 点击搜索icon
		handleSearch() {
			this.searchActive = true
		},

		// 点击切换tab
		changeCurrentTab(tab) {
			this.query.status = tab
			this.getListData()
			this.getWordsList()
			this.$refs.addPopupRef.clear()
		},

		// 回退
		handleBack() {
			uni.navigateBack()
		},

		// 获取列表数据
		async getListData() {
			uni.showLoading({
				title: '加载中'
			})
			const res = await getMsgSentryListApi(this.query)

			if (res.errno === 0) {
				this.list = res.data
			} else {
				uni.showToast({
					title: '您还不是业务员，无法访问',
					duration: 2000,
					icon: 'none'
				})

				setTimeout(() => {
					uni.switchTab({
						url: '/pages/user/user'
					})
				}, 2000)
			}

			uni.hideLoading()
		},

		// 转化成功
		handleConversionSuccess() {
			this.getListData()
		},

		// 获取话术列表
		async getWordsList() {
			const res = await getWordsApi(this.query.status)
		},

		handleToAdd() {
			if (this.query.status === 1) {
				uni.navigateTo({
					url: '/user/digital-store/add'
				})
			} else {
				this.$refs.addPopupRef.open()
			}
		},

		search(e) {
			this.query.search = e.detail.value
			this.getListData()
		}
	},

	onShow() {
		this.words = ''
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.information-sentry-container {
	padding: 40rpx 34rpx;
	box-sizing: border-box;

	.header {
		.flex();

		h2 {
			flex: 1;
			font-weight: normal;
			font-size: 32rpx;
			color: @c0;
			margin-left: 34rpx;
			flex-shrink: 0;
		}

		.search {
			position: relative;
			width: 32rpx;
			display: flex;
			align-items: center;
			margin-left: 10px;
			transition: all 350ms;
			overflow: hidden;

			&.active {
				background-color: #efefef;
				padding: 2px 10px;
				border-radius: 20px;
				overflow: auto;
				flex: 1;

				.search-input {
					flex: 1;
				}
			}

			.search-input {
				width: 0;
			}
		}
	}

	.navs {
		padding: 34rpx;
		.flex();
		color: @c9;
		font-size: 28rpx;

		.item {
			transition: all 350ms;

			&.active {
				color: #ff8f1f;
			}
		}
	}

	.add-icon {
		position: fixed;
		right: 30px;
		bottom: 30px;
	}
}
</style>
