<template>
  <view class="service-station-pane-container">
    <view class="store-name">团蜂家居社区服务中心</view>
    <button class="uni-btn">进店</button>
    <view class="info">
      <view class="tag"> 官方直营 </view>
      <view class="year-wrapper">
        <view class="icon">店</view>
        <view>1年</view>
      </view>
      <view class="rate">
        <tui-icon name="star-fill" :size="14" color="#FFC117"></tui-icon>
        <tui-icon name="star-fill" :size="14" color="#FFC117"></tui-icon>
        <tui-icon name="star-fill" :size="14" color="#FFC117"></tui-icon>
        <tui-icon name="star-fill" :size="14" color="#FFC117"></tui-icon>
        <tui-icon name="star-fill" :size="14" color="#FFC117"></tui-icon>
        <text style="color: #ffc117; margin-left: 2px">5.0星</text>
      </view>
    </view>
    <view class="info2">
      <view class="left">
        <text>5.3k人访问</text>
        <text>1.8k人关注</text>
      </view>
      <view class="right">
        <view>
          <image
            src="../../../static/images/con-center/new-home/mobile.png"
          ></image>
          <text>电话</text>
        </view>

        <view>
          <image
            src="../../../static/images/con-center/new-home/location.png"
          ></image>
          <text> 定位 </text>
        </view>
      </view>
    </view>
    <view class="main-serve"> 主营：维修、清洁、保养 </view>
    <scroll-view scroll-x="true">
      <view class="images">
        <image
          src="../../../static/images/con-center/brand-img/1f18076a681ddb8aabfee22b9e1714b.jpg"
          mode=""
        />
        <image
          src="../../../static/images/con-center/brand-img/237769c6dccf6e85ca264aa383a377c.jpg"
          mode=""
        />
        <image
          src="../../../static/images/con-center/brand-img/4bbccdb1cff4b17e3acdf9ddcb5ec09.jpg"
          mode=""
        />
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.service-station-pane-container {
  position: relative;
  padding: 20upx;
  background-color: #fff;
  border-radius: 20upx;
  margin: 20upx 0 30upx 0;

  .store-name {
    color: #141000;
    font-size: 32upx;
    font-weight: bold;
  }

  .uni-btn {
    position: absolute;
    top: 20upx;
    right: 20upx;
    width: 136upx;
    height: 64upx;
    border-radius: 12upx;
    color: #fff;
    background-color: #e95d20;
    font-size: 28upx;
    line-height: 64upx;
  }

  .info {
    display: flex;
    align-items: center;
    font-size: 24upx;
    margin: 12upx 0 16upx 0;

    .tag {
      color: #e95d20;
      padding: 2upx 12upx;
      background-color: #fef7f4;
      border-radius: 6upx;
    }

    .year-wrapper {
      display: flex;
      align-items: center;
      color: #8f8d85;
      margin: 0 16upx 0 16upx;
      .icon {
        font-size: 20upx;
        width: 32upx;
        height: 32upx;
        text-align: center;
        line-height: 32upx;
        background-color: #e95d20;
        border-radius: 50%;
        color: #fff;
        margin-right: 8upx;
      }
    }
  }

  .info2 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    text {
      color: #8f8d85;
      font-size: 24upx;
    }

    .left {
      text {
        &:nth-child(1) {
          padding-right: 16upx;
          margin-right: 16upx;
          border-right: 1upx solid #b3b2ad;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      view {
        display: flex;
        align-items: center;

        image {
          width: 32upx;
          height: 32upx;
          flex-shrink: 0;
          margin-right: 6upx;
        }

        &:nth-child(1) {
          margin-right: 32upx;
        }
      }
    }
  }

  .main-serve {
    color: #141000;
    margin: 16upx 0 30upx 0;
    font-size: 24upx;
  }

  .images {
    white-space: nowrap;

    image {
      width: 560upx;
      height: 360upx;
      margin-right: 30upx;
      border-radius: 24upx;
    }
  }
}
</style>
