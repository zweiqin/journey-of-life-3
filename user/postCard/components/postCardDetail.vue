<template>
  <view class="postcardDetail">
    <view class="time">{{ "2022-10月" || time }}</view>
    <view class="border">
      <view class="detail">
        <img
          src="../../../static/logo.png"
          alt=""
          class="leftImg"
        />
        <view class="rightText">
          <view class="top">
            <view class="topLeft">{{ "莎士比亚·代斯基二世" || name }}</view>
					<view class="topRight"><tui-icon name="share" :size="36" unit="rpx" color="#a8a8a8" margin="0"></tui-icon></view>
					</view>
          <view class="middle">{{ "营销策划师" || identity }}</view>
          <view class="bottom">{{ "广东团蜂科技有限公司" || address }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.postcardDetail {
    margin: 30upx 0;
  .time {
    color: #999999;
    font-size: 28upx;
    font-weight: 500;
    margin-bottom: 10upx;
  }
  .border {
    width: 100%;
    height: 220upx;
    border-radius: 20upx;
    background: white;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    .detail {
      padding: 50upx 30upx;
      display: flex;
      .leftImg {
        width: 120upx;
        height: 120upx;
        margin-right: 26upx;
      }
      .rightText {
        .top {
          display: flex;
          width: 100%;
          .topLeft {
            font-size: 32upx;
            font-weight: 600;
          }
          .topRight {
            width: 36upx;
            height: 36upx;
            position: relative;
            right: -130upx;
            bottom: -10px;
          }
        }
        .middle {
          font-size: 26upx;
          font-weight: 500;
          margin: 5upx 0;
        }
        .bottom {
          font-size: 26upx;
          font-weight: 500;
        }
      }
    }
  }
}
</style>