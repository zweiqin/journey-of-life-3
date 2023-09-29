<template>
  <view class="page-header-container">
    <TuanAppShim bg="#fff"></TuanAppShim>

    <view class="container">
      <TuanLocation>
        <view class="location-wrapper">
          {{ $store.getters.currentCity || '定位失败' }}
        </view>
      </TuanLocation>
      <view class="search-container">
        <input class="input" placeholder="社区商圈" type="text">
        <button class="uni-btn">搜索</button>
      </view>
      <view class="more">
        <view class="bar-wrapper">
          <view class="bar-item"></view>
          <view class="bar-item"></view>
          <view class="bar-item"></view>
          <view class="bar-item"></view>
        </view>

        <text class="more-text">更多</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@keyframes rotate-bar {
  0% {
    transform: rotate(90deg) scale(1);
    opacity: 0.8;

  }

  50% {
    opacity: 1;
    transform: scale(0.9);
  }

  100% {
    transform: rotate(0deg) scale(1);
    opacity: 0.8;
  }
}

.page-header-container {
  .container {
    display: flex;
    align-items: center;

    .location-wrapper {
      position: relative;
      width: 150upx;
      padding-right: 25upx;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;


      &::after {
        position: absolute;
        top: 28%;
        right: 0;
        content: '';
        display: block;
        border: 16upx solid #3d3d3d;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }

    }

    .search-container {
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0 18upx;
      height: 72upx;
      border: 1upx solid #EF5511;
      border-radius: 100upx;
      padding: 9upx 11upx;
      box-sizing: border-box;

      .input {
        flex: 1;
        font-size: 28upx;
      }

      .uni-btn {
        width: 112upx;
        height: 100%;
        background: linear-gradient(270deg, #EF530E 0%, #EE6C33 100%);
        border-radius: 100px;
        font-size: 24upx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .more {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 2upx;

      .bar-wrapper {
        width: 36upx;
        height: 36upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .bar-item {
          width: 16upx;
          height: 16upx;
          background-color: #000;
          margin-bottom: 6upx;
          border-radius: 4upx;
          flex-shrink: 0;

          &:nth-child(2) {
            background-color: #EE6C33;
            animation: rotate-bar 1s ease-in-out infinite reverse 4s;
          }
        }
      }

      .more-text {
        font-size: 24upx;
        color: #222229;
      }
    }
  }
}
</style>