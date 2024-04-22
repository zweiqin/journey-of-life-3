<template>
  <view class="performance-pane">
    <view class="section-title">经营状况</view>
    <view class="pane-1">
      <view class="item">
        <view class="item-title">累计订单金额(元)</view>
        <view class="price-text">{{ accumulativeOrderPrice || 0 }}</view>
				<view style="position: absolute;right: 0;bottom: 0;line-height: 1;">
					<tui-icon name="attestation" color="#ef8d62" size="110" unit="rpx" margin="0"></tui-icon>
				</view>
      </view>

      <view class="item">
        <view class="item-title">累计订单量
        </view>
        <view class="price-text">{{ accumulativeOrderTotal || 0 }}</view>
				<view style="position: absolute;right: 0;bottom: 0;line-height: 1;">
					<tui-icon name="polygonal" color="#4c9df1" size="110" unit="rpx" margin="0"></tui-icon>
				</view>
      </view>
    </view>

    <view class="pane-2">
      <view class="item">
        <view class="item-title">今日订单金额(元)</view>
        <view class="count-text">{{ toDayOrderPriceTotal || 0 }}</view>
				<view style="position: absolute;top: 0;left: 0;line-height: 1;padding: 12rpx;background: linear-gradient(180deg, #F98833 0%, #FFC117 100%);border-radius: 7upx 0px 30upx 0px;">
					<tui-icon name="wealth" color="#ffffff" size="30" unit="rpx" margin="0"></tui-icon>
				</view>
      </view>

      <view class="item">
        <view class="item-title">今日订单量</view>
        <view class="count-text">{{ toDayOrderTotal || 0 }}</view>
				<view style="position: absolute;top: 0;left: 0;line-height: 1;padding: 12rpx;background: linear-gradient(180deg, #F98833 0%, #FFC117 100%);border-radius: 7upx 0px 30upx 0px;">
					<tui-icon name="feedback" color="#ffffff" size="30" unit="rpx" margin="0"></tui-icon>
				</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    accumulativeOrderTotal: Number,
    accumulativeOrderPrice: Number,
    toDayOrderPriceTotal: Number,
    toDayOrderTotal: Number
  }
}
</script>

<style lang="less" scoped>
.performance-pane {
  .section-title {
    font-size: 24upx;
    font-weight: 500;
    padding-left: 20upx;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 8upx;
      height: 28upx;
      border-radius: 100px;
      left: 0;
      transform: translateY(-50%);
      top: 50%;
      background-color: #f40;
    }
  }

  .pane-1 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30upx 0 40upx 0;

    .item {
      position: relative;
      width: 310upx;
      height: 154upx;
      background-color: #f40;
      border-radius: 14upx;
      padding: 16upx 36upx;
      box-sizing: border-box;
      line-height: 1.5;
      color: #fff;
      overflow: hidden;

      .item-title {
        font-size: 26upx;
      }

      .price-text {
        font-size: 36upx;
        font-weight: bold;
      }

      &:nth-of-type(1) {
        background-color: #E95D20;
        box-shadow: 0px 4px 10px 0px rgba(217, 66, 0, 0.5);
      }

      &:nth-of-type(2) {
        background-color: #0074EB;
        box-shadow: 0px 4px 10px 0px rgba(32, 105, 177, 0.5);
      }
    }
  }

  .pane-2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 310upx;
      height: 156upx;
      padding: 17upx 0;
      box-shadow: 0px 0px 10px 0px #EAEBED;

      .item-title {
        font-size: 26upx;
        color: #141000;
      }

      .count-text {
        color: #141000;
        font-size: 36upx;
        font-weight: 500;
        margin-top: 10upx;
      }
    }
  }
}
</style>