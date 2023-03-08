<template>
  <view class="view-history-container">
    <JHeader
      width="50"
      height="50"
      tabbar="/pages/user/user"
      :title="currentPageInfo.title"
    ></JHeader>
    <view class="navs">
      <view
        class="item"
        @click="handleSwitchTab(item.value)"
        :class="{ active: currentPage === item.value }"
        v-for="item in labelList"
        :key="item.label"
        >{{ item.name }}</view
      >
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
      ></Collections>

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

const mapCurrentInfo = {
  history: {
    title: '我的足迹',
    api: 'getFootPrint',
    data: 'historyInfo',
  },

  collection: {
    title: '我的收藏',
    api: 'getCollections',
    data: 'collectionInfo',
  },

  follow: {
    title: '我的订阅',
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
  data() {
    return {
      currentPage: '',
      currentPageInfo: '',

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
          name: '历史',
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
    // 切换nav
    handleChangeCurrentPane(index) {
      this.currentActive = index
    },

    handleSwitchTab(currentPage) {
      this.currentPage = currentPage
      this.currentPageInfo = mapCurrentInfo[this.currentPage]

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
  padding: 50upx 32upx;
  box-sizing: border-box;

  .navs {
    .flex();
    font-size: 24upx;
    padding: 34upx 0 30upx 0;
    border-bottom: 1upx solid #d8d8d8;

    .active {
      color: #fa5151ff;
    }
  }
}
</style>
