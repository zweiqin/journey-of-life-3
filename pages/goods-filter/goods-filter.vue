<template>
  <div class="goods-filter">
    <view class="header-container">
      <view class="header">
        <JBack dark width="50" height="50" style="margin-top: 10upx"></JBack>
        <TLocale :icon="false"></TLocale>
        <view class="search-wrapper">
          <image
            class="search-icon"
            src="../../static/images/index/search.png"
            mode=""
          />
          <text class="text">输入你想搜索的产品</text>
          <image
            class="camera"
            src="../../static/images/index/camera.png"
            mode=""
          />
        </view>
        <image
          class="chat"
          src="../../static/images/user/daipingjia.png"
          mode=""
        />
      </view>

      <view class="tags">
        <view class="tag active">全部</view>
        <view class="tag">客厅家具</view>
        <view class="tag">卧室家具</view>
        <view class="tag">餐厅家具</view>
      </view>

      <view class="filters">
        <view class="filter-item">
          <text>价格</text>
          <image src="../../static/images/common/tag.png" mode="" />
        </view>
        <view class="filter-item">
          <text>风格</text>
          <image src="../../static/images/common/tag.png" mode="" />
        </view>
        <view class="filter-item">
          <text>产地</text>
          <image src="../../static/images/common/tag.png" mode="" />
        </view>
        <view class="filter-item">
          <text>材质</text>
          <image src="../../static/images/common/tag.png" mode="" />
        </view>
      </view>
    </view>

    <view class="filter-pane"> 1 </view>

    <view class="main">
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
    </view>
  </div>
</template>

<script>
import Goods from "../index/components/search-furniture/goods.vue";
export default {
  components: {
    Goods,
  },
};
</script>

<style lang="less" scoped>
.goods-filter {
  background-color: #f1f2f6;
  min-height: 100vh;
  font-size: 28upx;
}

.header-container {
  background-color: #ffffff;
  padding: 32upx 32upx 20upx 32upx;
  box-sizing: border-box;

  .tags {
    display: flex;
    margin: 34upx 0 26upx 0;

    .tag {
      line-height: 1.5;
      padding: 0 20upx;
      background-color: #f1f2f6;
      margin-right: 34upx;

      &:last-child {
        margin-right: 0;
      }

      &.active {
        color: #e95d20;
      }
    }
  }

  .filters {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .filter-item {
      display: flex;
      align-items: center;
    }

    image {
      width: 18upx;
      height: 9upx;
      margin-left: 10upx;
      margin-top: 4upx;
    }
  }
}
.header {
  display: flex;
  align-items: center;

  .local-wrapper {
    position: relative;
    margin-right: 20upx;
    &::after {
      content: "";
      border: 6px solid #000000;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      position: absolute;
      top: 50%;
      right: -10px;
    }
    /deep/ .locale {
      color: #3d3d3d;
      font-size: 36upx;
      font-weight: bold;
    }
  }

  .chat {
    width: 33.2upx;
    height: 30upx;
    object-fit: cover;
  }

  .search-wrapper {
    flex: 1;

    background-color: #f1f2f6;
    height: 74upx;
    margin: 0 20upx;
    border-radius: 100px;
    padding: 0 26upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-icon {
      width: 26.6upx;
      height: 26.6upx;
    }

    .text {
      font-size: 24upx;
      color: #999999;
      margin-left: 20upx;
      padding-left: 20upx;
      border-left: 1upx solid #d8d8d8;
      flex: 1;
    }

    .camera {
      width: 33.2upx;
      height: 30upx;
      object-fit: cover;
    }
  }
}

.filter-pane {
  background-color: #ffffff;
  width: 100%;
  margin-top: 20upx;
}

.main {
  padding: 0 20upx 20upx 20upx;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>