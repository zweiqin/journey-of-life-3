<template>
	<view class="order-page">
		<JHeader
			tabbar="/pages/user/user"
			title="社区订单"
			style="background: #ffffff"
		></JHeader>
		<!-- 搜索 -->
		<SearchBar
			:radius="100"
			placeholder="请输入订单号"
			class="top-search"
			style="background: #ffffff"
			@input="search"
		>
		</SearchBar>

		<!-- nav-bar -->
		<view class="navbar">
			<view
				v-for="item in orders"
				:key="item.label"
				class="item"
				:style="{
					color: query.status === item.value ? '#E95D20' : ''
				}"
				@click="handleChangeStatus(item.value)"
			>
				{{ item.label }}
			</view>
		</view>

		<!-- 列表页 -->
		<main v-if="orderList.length !== 0">
			<OrderPanel
				v-for="item in orderList"
				:key="item.id"
				:data="item"
				@success="handleCancelSuccess"
			></OrderPanel>
		</main>

		<view v-else class="no-data">暂无数据~</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getEndOrderListApi } from '../api/community-center'
import OrderPanel from './components/order-panel.vue'
import { orderStatusList } from './config'
import { getUserId, handleDebounce } from '../utils'
import SearchBar from '../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue'
import { T_COMMUNITY_ORDER_NO } from 'constant'

export default {
	components: {
		OrderPanel,
		SearchBar
	},
	data() {
		return {
			search: () => {},
			orders: orderStatusList(),
			query: {
				pageNo: 1,
				pageSize: 20,
				orderNo: '',
				status: undefined
			},
			orderList: [],
			pages: 0
		}
	},

	mounted() {
		uni.removeStorageSync(T_COMMUNITY_ORDER_NO)
		this.search = handleDebounce(this.searchOrder, 500)
		this.getOrderList()
	},

	methods: {
		/**
     * @description 搜索框搜索
     */

		searchOrder(e) {
			this.query.orderNo = e.trim()
			this.getOrderList()
		},

		/**
     * @description 切换navbar
     */

		handleChangeStatus(status) {
			this.query.status = status
			this.getOrderList()
		},

		/**
     * @description 获取列表
     */

		async getOrderList(reachBottom) {
			const _this = this
			uni.showLoading({
				title: '加载中'
			})

			try {
				// SheQu1Request.laoa_huozhu_post(
				//   "/api/md/order/orderPagelist",
				//   {
				//     ...this.query,
				//   },
				//   function (res) {
				//     _this.pages = res.data.pages;
				//     if (reachBottom) {
				//       _this.orderList.push(...res.data.data);
				//     } else {
				//       _this.orderList = res.data.data;
				//     }
				//   },
				//   function () {}
				// );

				const res = await getEndOrderListApi({
					...this.query,
					userId: getUserId()
				})

				if (res.statusCode === 20000) {
					console.log(res)
					_this.pages = res.pages
					if (reachBottom) {
						_this.orderList.push(...res.data)
					} else {
						_this.orderList = res.data
					}
				} else {
					uni.showToast({
						title: res.statusMsg,
						duration: 2000
					})
				}
			} finally {
				uni.hideLoading()
			}
		},

		/**
     * @description 取消成功
     */

		handleCancelSuccess() {
			this.getOrderList()
			this.ttoast('取消成功')
		}
	},

	onReachBottom() {
		if (this.pages === this.query.pageNo) {
			uni.showToast({
				title: '没有单啦',
				icon: 'fail'
			})
			return
		}
		this.query.pageNo += 1
		this.getOrderList(true)
	},

	onPullDownRefresh() {
		this.orderList = []
		this.pages = 0
		this.query.pageNo = 1
		this.query.pageSize = 20
		this.getOrderList()
		uni.stopPullDownRefresh()
	}
}
</script>

<style lang="less" scoped>
.order-page {
  background: #f1f2f6;

  .navbar {
    display: flex;
    align-items: center;
    overflow: scroll;
    height: 88upx;
    line-height: 88upx;
    background-color: #fff;
    // border-top: 1upx solid rgb(230, 230, 230);

    &::-webkit-scrollbar {
      width: 0 !important;
    }

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 180upx;
      color: #888888;
      font-size: 32upx;
    }
  }

  main {
    // margin: 20upx;
    margin: 20upx 0upx 20upx 0upx;
  }

  .no-data {
    width: 100%;
    height: 400upx;
    text-align: center;
    line-height: 400upx;
    letter-spacing: 1em;
    color: #888888;
  }
}
</style>
