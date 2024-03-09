<template>
  <view class="m-microstore-container">
    <view class="op-container" :class="{ fixed: scrollTop > 100 }">
      <!-- 搜索区域 -->
      <view class="search-container">
        <tui-icon
          @click="handleBack"
          margin="6upx 0 0 0"
          name="arrowleft"
        ></tui-icon>
        <view class="input-wrapper">
					<view class="search-icon">
						<tui-icon
							name="search" :size="32" unit="rpx"
							color="#b3b2ad"
							margin="0"
						></tui-icon>
					</view>
          <input v-model="searchValue" type="text" placeholder="搜索" />
        </view>
        <view
          @click="handleSearch"
          class="uni-btn search-btn"
          :style="{ background: searchValue ? '#ffc117' : '#ccc' }"
          >搜索</view
        >
      </view>
    </view>

    <view class="main">
      <ShopGoodsList isConsumer :data="goodsList"></ShopGoodsList>
      <LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
    </view>
  </view>
</template>

<script>
import { getMyshopGoodsListApi } from '../../../api/user'
import ShopGoodsList from './cpns/ShopGoodsList.vue'
export default {
  components: {
    ShopGoodsList,
  },
  data() {
    return {
      searchValue: '',
      queryInfo: {
        shopId: null,
        keywords: '',
        page: 1,
        size: 10,
      },

      goodsList: {},
      scrollTop: 0,
      totalPages: 0,
      status: 'none',
    }
  },
  onLoad(params) {
    this.queryInfo.shopId = params.shopId
    this.getGoodsList()
  },
  methods: {
    // 点击回退
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },

    // 获取列表数据
    async getGoodsList(isLoadMore) {
      this.status = 'loading'
      const { data } = await getMyshopGoodsListApi(this.queryInfo)
      this.totalPages = data.totalPages
      if (isLoadMore) {
        this.goodsList.goodsList.push(...data.goodsList)
      } else {
        this.goodsList = data
      }
      this.status = 'none'
    },

    // 点击搜索
    handleSearch() {
      if (!this.searchValue.trim()) {
        uni.showToast({
          title: '请输入搜索内容',
          duration: 2000,
          icon: 'none',
        })
      }

      this.queryInfo.keywords = this.searchValue
      this.queryInfo.page = 1
      this.getGoodsList()
    },
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },

  onReachBottom() {
    if (this.queryInfo.page >= this.totalPages) {
      this.status = 'no-more'
      return
    }

    if (this.queryInfo.size > this.goodsList.goodsList.length) {
      this.status = 'none'
      return
    }

    this.queryInfo.page++
    this.getGoodsList(true)
  },

  watch: {
    searchValue(value) {
      if (!value) {
        this.queryInfo.page = 1
        this.queryInfo.keywords = ''
        this.getGoodsList()
      }
    },
  },
}
</script>

<style lang="less" scoped>
@main-color: #ffc117;

.m-microstore-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;
}

.main {
  padding: 20upx;
  box-sizing: border-box;
}

.op-container {
  padding: 24upx 20upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 0 0 48upx 48upx;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  // 搜索区
  .search-container {
    background-color: #fff;
    display: flex;

    .input-wrapper {
      flex: 1;
      display: flex;
      padding: 16upx 24upx;
      box-sizing: border-box;
      align-items: center;
      background: #fbfbfb;
      border-radius: 100px;
      border: 1px solid #f1f1f0;

      .search-icon {
        width: 32upx;
        height: 32upx;
        padding-right: 16upx;
        margin-right: 16upx;
        border-right: 1upx solid #d5d4d1;
      }

      input {
        flex: 1;
        font-size: 28upx;
      }
    }

    .search-btn {
      flex-shrink: 0;
      margin-left: 24upx;
      width: 148upx;
      height: 72upx;
      border-radius: 100px;
      background-color: @main-color;
      font-size: 26upx;
      text-align: center;
      line-height: 72upx;
      color: #fff;
      transition: all 200ms ease-in-out;
    }
  }
}
</style>
