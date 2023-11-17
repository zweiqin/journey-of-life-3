<template>
  <view class="brand-performance-container">
    <view class="header">
      经营表现
    </view>


    <scroll-view scroll-x>
      <view class="list">
        <view class="list-item">
          <view class="value">优秀</view>
          <view class="label">工厂等级</view>
        </view>

        <view class="list-item">
          <view class="value">700 <text class="text">+万元</text> </view>
          <view class="label">定制合约交易</view>
        </view>

        <view class="list-item">
          <view class="value">50<text class="text">%</text></view>
          <view class="label">回头率</view>
        </view>

        <view class="list-item">
          <view class="value">100<text class="text">%</text></view>
          <view class="label">准时履约率</view>
        </view>

        <view class="list-item">
          <view class="value">0</view>
          <view class="label">评论</view>
        </view>
      </view>
    </scroll-view>

    <view class="comment-pane" @click="handleShowCommentList">
      <view class="title">卖家评论</view>

      <view class="link">全部评论 <image class="arrow" src="../../../../static/images/new-index/brandFactory/right-arrow.png">
        </image>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
export default {
  methods: {
    handleShowCommentList() {
      this.ttoast({
        type: 'info',
        title: "暂无评论~"
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.brand-performance-container {
  background-color: #fff;
  border-radius: 20upx;


  .header {
    padding: 36upx 0 40upx 30upx;
    box-sizing: border-box;
    font-size: 32upx;
    font-weight: 500;
    margin-top: 24upx;
  }

  .list {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding-left: 30upx;
    padding-right: 30upx;
  }

  .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 24upx;
    color: #9E9E9E;
    margin-right: 54upx;

    &:nth-child(1) {
      .value {
        color: #185BCC;
      }
    }

    &:nth-child(5) {
      padding-right: 30upx;
    }

    .value {
      font-size: 30upx;
      color: #222229;
      margin-bottom: 12upx;

      .text {
        font-size: 24upx;
      }
    }
  }

  .comment-pane {
    position: relative;
    height: 80upx;
    padding: 20upx 30upx;
    box-sizing: border-box;
    margin-top: 20upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 640upx;
      height: 1upx;
      background-color: #D8D8D8;
    }


    .title {
      font-size: 28upx;
      font-weight: 500;

    }

    .link {
      font-size: 26upx;
      color: #888889;
      display: flex;
      align-items: center;

      .arrow {
        width: 20upx;
        height: 20upx;
        flex-shrink: 0;
        margin-left: 4upx;
      }
    }
  }
}
</style>