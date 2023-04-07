<template>
  <view class="search-page-container">
    <view class="search-container">
      <TuanBack>
        <tui-icon name="arrowleft"></tui-icon>
      </TuanBack>
      <view class="search-wrapper">
        <tui-icon name="search" :size="20" class="search-icon"></tui-icon>
        <input v-model="searchValue" type="text" confirm-type="search" placeholder="请输入您要搜索的商品"
          @confirm="handelSearch(searchValue)" />
        <tui-icon v-show="searchValue" name="close" :size="20" class="close-icon" @click="searchValue = ''"></tui-icon>
      </view>

      <button class="uni-btn search-btn" @click="handelSearch(searchValue)">
        搜索
      </button>
    </view>

    <view class="search-history" v-if="searchData && userId">
      <view class="title-container">
        <view class="search-title">搜索历史</view>
        <view class="delete" @click="handleClearSearchHostory">
          <tui-icon :size="15" name="delete"></tui-icon>
          <text style="font-size: 28upx; color: #605d52">清空搜索</text>
        </view>
      </view>

      <view class="keywords-wraper" v-if="searchData && searchData.historyKeywordList.length">
        <view class="item" @click="handelSearch(item.keyword)" v-for="item in searchData.historyKeywordList"
          :key="item.id">{{ item.keyword }}</view>
      </view>

      <view class="keywords-wraper" v-else>
        <view class="no-data">暂无搜索记录</view>
      </view>
    </view>

    <view class="hot-search" v-if="searchData">
      <view class="search-title"> 热门搜索 </view>

      <view class="keywords-wraper">
        <view class="item" @click="handelSearch(item.keyword)" v-for="item in searchData.hotKeywordList" :key="item.id">{{
          item.keyword }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { USER_ID } from 'constant'
import { getUserId } from '../../utils'
import {
  getUserSearchHistoryApi,
  clearSearchSearchHistoryApi,
} from '../../api/goods'
export default {
  data() {
    return {
      searchValue: '',
      keywordsList: ['沙发', '床', '儿童床', '办公椅', '茶几', '餐桌'],
      searchData: null,
      userId: uni.getStorageSync(USER_ID),
    }
  },

  onShow() {
    this.getUserSearchHistory()
  },

  methods: {
    async getUserSearchHistory() {
      const { data } = await getUserSearchHistoryApi({
        userId: uni.getStorageSync(USER_ID),
      })

      this.searchData = data
    },

    handelSearch(keywords) {
      if (!keywords) {
        uni.showToast({
          title: '请输入搜索的商品',
          icon: 'none',
        })

        return
      }

      uni.navigateTo({
        url: '/pages/search-page/search-result?keywords=' + keywords,
      })
    },

    handleBack() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },

    handleClearSearchHostory() {
      const _this = this
      clearSearchSearchHistoryApi({
        userId: getUserId(),
      }).then(() => {
        uni.showToast({
          title: '清除成功',
        })

        _this.getUserSearchHistory()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.search-page-container {
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

  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .no-data {
    flex: 1;
    text-align: center;
    padding: 30upx 0;
    color: #9e9e9e;
    font-size: 28upx;
  }

  .hot-search,
  .search-history {
    padding: 20upx;
    box-sizing: border-box;
  }

  .search-title {
    color: #9e9e9e;
    font-size: 28upx;
    margin-bottom: 20upx;
  }

  .keywords-wraper {
    padding: 10upx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
      padding: 7upx 32upx;
      background-color: #f6f6f5;
      border-radius: 100px;
      margin-right: 20upx;
      margin-bottom: 20upx;
      color: #3a3629;
      font-size: 28upx;
    }
  }
}
</style>
