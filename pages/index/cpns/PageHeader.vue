<template>
  <view class="page-header-wrapper" :style="pageHeaderStyle">
    <view class="search-container" :style="{ padding: searchPaddding }">
      <TuanLocation free v-if="showLocation">
        <view class="address-wrapper">
          <text class="address-text">{{ currentAddress }}</text>
					<tui-icon name="turningdown" color="#222229" size="48" unit="rpx"></tui-icon>
        </view>
      </TuanLocation>
      <view @click="go(`/another-tf/another-serve/search/index`)" class="input-view">{{ placeholder }}</view>
      <button v-if="showSearchBtn" class="search-input-btn uni-btn">搜索</button>
    </view>
		<!-- /another-tf/another-user/customer-service/customer-service -->
		<tui-icon v-if="showMessage" name="message" color="#222229" size="60" unit="rpx" @click="go('/another-tf/another-serve/messageCenter/index')"></tui-icon>
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
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    showLocation: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#ebebf5'
    },
    padding: {
      type: String,
      default: '30upx'
    },
    searchPaddding: {
      type: String,
      default: '10upx 15upx'
    }
  },
  computed: {
    currentAddress() {
      const currentAddress = this.$store.getters.currentShopCity + ''
      if (!currentAddress) {
        return '定位失败'
      } else {
        return currentAddress.length > 4 ? currentAddress.slice(0, 4) + '...' : currentAddress
      }
    },

    pageHeaderStyle() {
      return {
        background: this.backgroundColor,
        padding: this.padding
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
        margin-right: 2upx;
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