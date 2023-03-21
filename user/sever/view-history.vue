<template>
  <view class="view-history-container">
    <!-- <JHeader
      width="50"
      height="50"
      tabbar="/pages/user/user"
      :title="currentPageInfo.title"
    ></JHeader> -->

    <view class="navs">
      <tui-icon
        @click="handleBack"
        color="#000"
        :size="28"
        name="arrowleft"
      ></tui-icon>

      <view
        class="item"
        @click="handleSwitchTab(item.value)"
        :class="{ 'item-active': currentPage === item.value }"
        v-for="item in labelList"
        :key="item.label"
        >{{ item.name }}</view
      >

      <!-- <view class="edit">
				<view class="shu"></view>
				<view class="edit-text" @click="$store.commit('shopCar/CHANGE_SHOP_CAR_MODE')">
					{{ currentMode === ON_EDIT ? '编辑' : '完成' }}
				</view>
			</view> -->
    </view>

    <view class="list-wrapper">
      <FootPrint
        v-show="currentPage === 'history'"
        ref="footerPrintRef"
      ></FootPrint>

      <Collections
        @delete="getCollections"
        v-show="currentPage === 'collection'"
        :data="collectionInfo.data"
      >
      </Collections>

      <FollowStore
        @delete="getFollowStoreList"
        :data="followStore.data"
        v-show="currentPage === 'follow'"
      ></FollowStore>

      <uni-load-more
        v-show="loadingStatus !== 'hidden'"
        :status="loadingStatus"
      ></uni-load-more>

      <JNoData v-show="showNoData" type="empty"></JNoData>
    </view>
  </view>
</template>

<script>
import { getUserViewHistoryApi, getUserCollectionListApi } from '../../api/user'
import { getUserId } from '../../utils'
import FootPrint from './components/FootPrint.vue'
import Collections from './components/Collections.vue'
import FollowStore from './components/FollowStore.vue'
import { mapGetters } from 'vuex'
import { ON_EDIT, ON_CONFIRM } from '../../store/modules/shopCar'
const mapCurrentInfo = {
  history: {
    title: '',
    api: 'getFootPrint',
    data: 'historyInfo',
  },

  collection: {
    title: '',
    api: 'getCollections',
    data: 'collectionInfo',
  },

  follow: {
    title: '',
    api: 'getFollowStoreList',
    data: 'followStore',
  },
}

export default {
	components: {
		FootPrint,
		Collections,
		FollowStore,
	},
	computed: {
		...mapGetters(['currentMode']),
	},
	data() {
		return {
			currentPage: '',
			currentPageInfo: '',
			ON_EDIT,
			ON_CONFIRM,
			historyInfo: {
				query: {
					page: 1,
					size: 20,
				},

				data: {},
				totalPage: 0,
			},

			collectionInfo: {
				query: {
					page: 1,
					size: 20,
				},
				data: [],
				totalPage: 0,
			},

			followStore: {
				query: {
					page: 1,
					size: 20,
				},

				data: [],
				totalPage: 0,
			},

			labelList: [
				{
					name: '收藏',
					value: 'collection',
				},
				{
					name: '足迹',
					value: 'history',
				},
				{
					name: '订阅',
					value: 'follow',
				},
			],
			currentActive: 0,
			info: {
				range: true,
				insert: false,
				selected: [],
			},
			currentTime: '',

			loadingStatus: 'loading',
			showNoData: false,
		}
	},
	onLoad(options) {
		this.currentPage = options.page
		this.currentPageInfo = mapCurrentInfo[this.currentPage]
		if (this.currentPageInfo.api) {
			this[this.currentPageInfo.api]()
		} else {
			this.loadingStatus = 'hidden'
			this.showNoData = true
		}
	},

	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user',
			})
		},

		// 切换nav
		handleChangeCurrentPane(index) {
			this.currentActive = index
		},

		handleSwitchTab(currentPage) {
			this.currentPage = currentPage
			this.currentPageInfo = mapCurrentInfo[this.currentPage]
			this.showNoData =
				JSON.stringify(this[this.currentPageInfo.data].data) === '[]' ||
				JSON.stringify(this[this.currentPageInfo.data].data) === '{}'
			if (
				JSON.stringify(this[this.currentPageInfo.data].data) === '[]' ||
				JSON.stringify(this[this.currentPageInfo.data].data) === '{}'
			) {
				this.currentPageInfo.api
					? this[this.currentPageInfo.api]()
					: (this.showNoData = true)
			}
		},

		// 获取足迹数据
		getFootPrint() {
			const _this = this
			this.loadingStatus = 'loading'

			getUserViewHistoryApi({
				...this.historyInfo.query,
				userId: getUserId(),
			}).then(({ data }) => {
				_this.historyInfo.totalPage = data.totalPages
				for (const item of data.footprintList) {
					const key = item.addTime.split(' ')[0]
					const data = _this.historyInfo.data
					if (!data[key]) {
						data[key] = [item]
					} else {
						data[key].push(item)
					}
				}

				this.loadingStatus = 'hidden'
				this.$refs.footerPrintRef.setData(this.historyInfo.data)
				this.showNoData = JSON.stringify(this.historyInfo.data) === '{}'
			})
		},

		// 获取收藏数据
		getCollections() {
			const _this = this
			this.loadingStatus = 'loading'
			getUserCollectionListApi({
				...this.collectionInfo.query,
				userId: getUserId(),
				type: 0,
			}).then(({ data }) => {
				_this.collectionInfo.totalPage = data.totalPages
				_this.collectionInfo.data = data.collectList
				_this.loadingStatus = 'hidden'
				this.showNoData = this.collectionInfo.data.length == 0
			})
		},

		// 获取订阅店铺
		getFollowStoreList() {
			const _this = this
			this.loadingStatus = 'loading'
			getUserCollectionListApi({
				...this.followStore.query,
				userId: getUserId(),
				type: 2,
			}).then(({ data }) => {
				_this.followStore.totalPage = data.totalPages
				_this.followStore.data = data.collectList
				_this.loadingStatus = 'hidden'
				this.showNoData = this.followStore.data.length == 0
			})
		},
	},

	onReachBottom() {
		switch (this.currentPage) {
			case 'history':
				if (this.historyInfo.data.length < this.historyInfo.query.size) {
					return
				}

				if (this.historyInfo.query.page >= this.historyInfo.totalPage) {
					this.loadingStatus = 'noMore'
					return
				}

				if (this.historyInfo.query.page < this.historyInfo.totalPage) {
					this.historyInfo.query.page++
					this.getFootPrint()
				}
				break

			case 'collection':
				if (this.collectionInfo.data.length < this.collectionInfo.query.size) {
					return
				}

				if (this.collectionInfo.query.page >= this.collectionInfo.totalPage) {
					this.loadingStatus = 'noMore'
					return
				}

				if (this.collectionInfo.query.page < this.collectionInfo.totalPage) {
					this.collectionInfo.query.page++
					this.getCollections()
				}
				break

			case 'follow':
				if (this.followStore.data.length < this.followStore.query.size) {
					return
				}

				if (this.followStore.query.page >= this.followStore.totalPage) {
					this.loadingStatus = 'noMore'
					return
				}

				if (this.followStore.query.page < this.followStore.totalPage) {
					this.followStore.query.page++
					this.getCollections()
				}
				break
		}
	},
}
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';

.view-history-container {
  // padding: 50upx 32upx;
  // box-sizing: border-box;
  background-color: #f6f6f6;
  width: 100vw;
  min-height: 100vh;

  .navs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 36upx 160upx 36upx 32upx;
    border-radius: 0upx 0upx 24upx 24upx;
    background: #ffffff;

    // .active {
    // 	color: #fa5151ff;
    // }

    .item {
      display: flex;
      justify-content: center;
      position: relative;
      width: 96upx;
      height: 56upx;
      transition: all 350ms;
      font-size: 32upx;
      color: #8f8d85;
      padding-top: 14upx;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 8upx;
        border-radius: 10upx;
        background-color: #ffc117;
        transition: all 350ms ease-in;
      }

      &.item-active {
        color: #3a3629;
        font-weight: 500;

        // color: #ff8f1f;
        &::after {
          width: 40upx;
        }
      }
    }

    .edit {
      display: flex;
      align-items: center;

      .shu {
        width: 2upx;
        height: 24upx;
        background-color: #d5d4d1;
      }

      .edit-text {
        font-size: 28upx;
        color: #3a3629;
        margin-left: 32upx;
      }
    }
  }
}
</style>
