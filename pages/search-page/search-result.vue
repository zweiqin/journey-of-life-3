<template>
  <view class="search-result-container">
    <view class="search-top" :class="{ fixed: scrollTop > 200 }">
      <view class="search-container">
        <tui-icon @click="handleBack" name="arrowleft"></tui-icon>
        <view class="search-wrapper">
          <tui-icon name="search" :size="20" class="search-icon"></tui-icon>
          <input
            v-model="searchValue"
            type="text"
            :adjust-position="false"
            confirm-type="search"
            placeholder="请输入您要搜索的商品"
            @confirm="handelSearch()"
          />
          <tui-icon
            v-show="searchValue"
            name="close"
            :size="20"
            class="close-icon"
            @click="searchValue = ''"
          ></tui-icon>
        </view>

        <button class="uni-btn search-btn" @click="handelSearch()">搜索</button>
      </view>

      <view class="filter">
        <view
          class="item"
          :style="{ color: !query.sort ? '#ffc117' : '' }"
          @click="handleSearchNormal"
          >综合推荐</view
        >

        <view
          class="item"
          :style="{ color: query.sort === 'sales' ? '#ffc117' : '' }"
          @click="handleFilter({ type: 'sales' })"
          >销量</view
        >
        <view
          class="item"
          :style="{ color: query.sort === 'retail_price' ? '#ffc117' : '' }"
          @click="handleFilterPrice({ type: 'retail_price' })"
        >
          价格
          <view class="sort">
            <tui-icon
              :color="
                query.sort === 'retail_price' && query.order === 'asc'
                  ? '#ffc117'
                  : ''
              "
              class="top"
              :size="20"
              name="turningup"
            ></tui-icon>
            <tui-icon
              :color="
                query.sort === 'retail_price' && query.order === 'desc'
                  ? '#ffc117'
                  : ''
              "
              class="bottom"
              :size="20"
              name="turningdown"
            ></tui-icon>
          </view>
        </view>
      </view>
    </view>

    <view class="goods-list">
      <Goods v-for="item in goodsList" :key="item.id" :data="item"></Goods>
      <LoadingMore v-show="loading != 'none'" :status="loading"></LoadingMore>
    </view>

    <view class="no-data" v-show="loading == 'none' && !goodsList.length">
      暂无商品
    </view>
  </view>
</template>

<script>
import { goodsListApi } from 'api/goods'
import { USER_ID } from '../../constant'
import Goods from '../index/cpns/goods.vue'
export default {
  components: { Goods },

  data() {
    return {
      searchValue: '',
      query: {
        page: 1,
        size: 20,
        sort: '',
        order: 'asc',
      },

      totalPages: 0,
      goodsList: [],
      scrollTop: 0,
      loading: 'loading',
    }
  },

  methods: {
    handelSearch() {
      this.query.page = 1
      this.goodsList = []
      this.getGoodsList()
    },

    async getGoodsList(isLoadMore) {
      this.loading = 'loading'
      const { data } = await goodsListApi({
        ...this.query,
        keyword: this.searchValue,
        userId: uni.getStorageSync(USER_ID) || '',
      })
      this.loading = 'none'

      this.totalPages = data.totalPages
      if (isLoadMore) {
        this.goodsList.push(...data.goodsList)
      } else {
        this.goodsList = data.goodsList
      }
    },

    handleFilter(info) {
      this.query.sort = info.type
      // this.query.sort = ''
      this.getGoodsList()
    },

    // 筛选价格
    handleFilterPrice() {
      this.query.sort = 'retail_price'
      this.query.order = this.query.order == 'asc' ? 'desc' : 'asc'
      this.getGoodsList()
    },

    //
    handleSearchNormal() {
      this.query.sort = ''
      this.getGoodsList()
    },

    handleBack() {
      uni.navigateBack()
    },
  },

  onLoad(params) {
    this.searchValue = params.keywords
    this.getGoodsList()
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },

  onReachBottom() {
    if (this.query.size > this.goodsList.length) {
      this.loading = 'none'
      return
    }

    if (this.query.page >= this.totalPages) {
      this.loading = 'no-more'
      return
    }

    this.query.page++
    this.getGoodsList(true)
  },
}
</script>

<style lang="less" scoped>
.search-result-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f5;
  .search-top {
    background-color: #fff;
    border-radius: 0 0 24upx 24upx;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10000;
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20upx 20upx 20upx 0;

      .search-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f6f6f5;
        border-radius: 100px;
        height: 72upx;
        margin-right: 24upx;
        padding: 20upx 24upx;
        box-sizing: border-box;

        .search-icon {
          padding-right: 16upx;
          margin-right: 16upx !important;
          border-right: 1upx solid #ccc;
        }

        input {
          font-size: 28upx;
          color: #3a3629;
          flex: 1;
        }
      }

      .search-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 128upx;
        height: 72upx;
        border-radius: 100px;
        background-color: #ffc117;
        color: #fff;
        font-size: 26upx;
      }
    }

    .filter {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32upx 0;

      .item {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28upx;
      }
    }
  }

  .goods-list {
    padding: 20upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.no-data {
  height: 400upx;
  text-align: center;
  line-height: 400upx;
  text-align: center;
  color: #ccc;
}

.sort {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .top,
  .bottom {
    position: relative;
  }

  .top {
    top: 12upx;
  }

  .bottom {
    top: -12upx;
  }
}
</style>
