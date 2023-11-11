<template>
  <view class="page-header-wrapper">
    <view class="search-container">
      <TuanLocation>
        <view class="address-wrapper">
          <text class="address-text">{{ currentAddress }}</text>
          <image class="arrow-icon" src="../../../static/images/new-index/arrow-1.png"></image>
        </view>
      </TuanLocation>
      <view @click="go('/pages/search-page/search-page')" class="input-view">{{ placeholder }}</view>
      <button v-if="showSearchBtn" class="search-input-btn uni-btn">搜索</button>
    </view>
    <button class="uni-btn page-header-right" style="flex-shrink: 0;"
      @click="go('/user/sever/customer-service/customer-service')">
      <image class="message-icon" src="../../../static/images/new-index/message-1.png"></image>
    </button>
  </view>
</template>

<script>
export default {
  props: {
    showSearchBtn: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入您想搜索的商品"
    }
  },
  computed: {
    currentAddress() {
      const currentAddress = this.$store.getters.currentCity + ''
      if (!currentAddress) {
        return '定位失败'
      } else {
        return currentAddress.length > 4 ? currentAddress.slice(0, 4) + '...' : currentAddress
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper {
  width: 100vw;
  padding: 30upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #ebebf5;
  position: relative;
  z-index: 99999;

  .search-container {
    flex: 1;
    display: flex;
    align-items: center;
    border: 2upx solid #EF5511;
    padding: 10upx 15upx;
    box-sizing: border-box;
    height: 72upx;
    border-radius: 100px;
    margin-right: 15upx;
    background-color: #fff;


    .address-wrapper {
      display: flex;
      align-items: center;
      padding-right: 6upx;
      margin-right: 16upx;
      border-right: 4upx solid #F6F6F8;

      .arrow-icon {
        width: 36upx;
        height: 36upx;
        flex-shrink: 0;
      }

      .address-text {
        font-size: 28upx;
        color: #222229;
        margin-right: 8upx;
      }
    }

    .input-view {
      font-size: 28upx;
      color: #3d3d3d;
      flex: 1;
    }

    .search-input-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 106upx;
      height: 55upx;
      background-color: #EF5511;
      color: #fff;
      font-size: 24upx;
      border-radius: 100px;
    }
  }

  .message-icon {
    width: 68upx;
    height: 72upx;
    flex-shrink: 0;
  }
}
</style>