<template>
  <view class="shop-detail tui-skeleton">
    <view class="page-title" :class="{ fix: scrollTop >= 300 }">
      <image @click="handleBack" class="back-icon" src="../../static/images/new-community/shop/order-detail-back.png"></image>
      <view class="location" :style="{ width: isSearch ? '0' : '', color: isSearch ? '#ef530e' : '' }"> {{ queryInfo.address }} </view>
      <view class="search-container">
        <input v-model="queryInfo.search" :style="{ flex: isSearch ? 1 : 0 }" class="input" type="text" placeholder="请输入要搜索的门店" />
        <tui-icon :size="20" :color="isSearch ? '#f40' : ''" @click="handleSearchShop" name="search"></tui-icon>
      </view>
    </view>

    <view class="content">
      <view class="shop-list-wrapper">
        <CommonShop v-for="shopData in shopList" :shopInfo="shopData" :key="index"></CommonShop>
      </view>
      <LoadingMore v-show="isLoading" :status="loadingStatus"></LoadingMore>
    </view>

    <view class="no-data" v-show="!isLoading && !shopList.length"> 附近暂无门店~ </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getNearByShopListApi } from '../../api/community-center';
import CommonShop from '../../pages/community-center/cpns/CommonShop.vue';
import { getCurrentLocation } from '../../utils';

export default {
  components: { CommonShop },
  data() {
    return {
      isSearch: false,
      queryInfo: {
        pageNo: 1,
        pageSize: 10,
        search: null,
        address: ''
      },
      loadingStatus: 'loading',
      totalCount: 0,
      totalPages: 0,
      shopList: [],
      isLoading: false,
      scrollTop: 0
    };
  },

  mounted() {
    this.getShopDataList(true);
  },

  onShow() {},

  methods: {
    // 点击搜索
    handleSearchShop() {
      if (this.isSearch) {
        this.getShopDataList(true);
      } else {
        this.isSearch = true;
      }
    },

    handleBack() {
      uni.switchTab({
        url: '/'
      });
    },

    //  请求数据
    async getShopDataList(isClear) {
      try {
        this.isLoading = true;
        this.queryInfo.address = (await getCurrentLocation()) + '';
        if (isClear) {
          this.totalCount = 0;
          this.totalPages = 0;
          this.shopList = [];
        }
        this.loadingStatus = 'loading';
        const res = await getNearByShopListApi(this.queryInfo);
        if (res.statusCode === 20000) {
          const data = res.data;
          this.totalCount = data.total;
          this.totalPages = data.pages;
          this.shopList = [...this.shopList, ...data.data];
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '附近商家获取失败',
          content: error
        });
      } finally {
        this.isLoading = false;
      }
    }
  },

  onReachBottom() {
    if (this.shopList.length < this.queryInfo.pageSize) {
      this.isLoading = false;
      return;
    }

    if (this.shopList.length >= this.totalCount) {
      this.loadingStatus = 'no-more';
      this.isLoading = true;
      return;
    }

    this.queryInfo.pageNo++;
    this.getShopDataList();
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
    this.isSearch = false;
  }
};
</script>

<style lang="less" scoped>
@keyframes fix-head {
  0% {
    top: -110upx;
  }

  100% {
    top: 0;
  }
}

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shop-detail {
  min-height: 100vh;
  background-color: #f5f5f7;
  .page-title {
    width: 100%;
    height: 100upx;
    background-color: #fff;
    padding: 0 31upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    &.fix {
      position: fixed;
      left: 0;
      right: 0;
      animation: fix-head 500ms;
      z-index: 100;
    }

    .back-icon {
      width: 64upx;
      height: 64upx;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .location {
      width: 500upx;
      font-size: 32upx;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 20upx 0 0;
      direction: rtl;
      transition: all 250ms;
      text-align: left;
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;

      .input {
        flex: 1;
        transition: all 250ms;
        margin-left: 8upx;
        padding-left: 8upx;
        font-size: 28upx;
        border-bottom: 1upx solid #ef530e;
        padding-bottom: 10upx;
        padding-top: 10upx;
      }
    }
  }

  .shop-list-wrapper {
    padding: 20upx 40upx 0;
    box-sizing: border-box;

    /deep/ .common-shop-container {
      background-color: #fff;
      margin-bottom: 24upx;
      border-radius: 20upx;
    }
  }

  .no-data {
    height: 400upx;
    line-height: 400upx;
    font-size: 28upx;
    color: #ccc;
    letter-spacing: 0.1em;
    text-align: center;
  }
}
</style>
