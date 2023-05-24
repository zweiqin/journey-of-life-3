<template>
  <view class="performance-pane">
    <view class="section-title">经营状况</view>
    <view class="pane-1">
      <view class="item">
        <view class="item-title">累计订单金额(元)</view>
        <view class="price-text">{{ accumulativeOrderPrice || 0 }}</view>
      </view>

      <view class="item">
        <view class="item-title">累计订单量
        </view>
        <view class="price-text">{{ accumulativeOrderTotal || 0 }}</view>
      </view>
    </view>

    <view class="pane-2">
      <view class="item">
        <view class="item-title">今日订单金额(元)</view>
        <view class="count-text">{{ toDayOrderPriceTotal || 0 }}</view>
      </view>

      <view class="item">
        <view class="item-title">今日订单量</view>
        <view class="count-text">{{ toDayOrderTotal || 0 }}</view>
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

      &::after {
        display: block;
        content: '';
        position: absolute;
        width: 108upx;
        height: 108upx;
        bottom: -6upx;
        right: -6upx;
      }

      &:nth-of-type(1) {
        background-color: #E95D20;
        box-shadow: 0px 4px 10px 0px rgba(217, 66, 0, 0.5);

        &::after {
          background: url('../../../static/images/new-user/gudong/up-price.png') no-repeat;
          background-size: cover;
          z-index: 100;
        }
      }

      &:nth-of-type(2) {
        background-color: #0074EB;
        box-shadow: 0px 4px 10px 0px rgba(32, 105, 177, 0.5);

        &::after {
          background: url('../../../static/images/new-user/gudong/line.png') no-repeat;
          background-size: cover;
          z-index: 100;
          bottom: -16upx;
        }
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

      &::after {
        position: absolute;
        width: 50upx;
        height: 50upx;
        display: block;
        content: '';
        top: 0;
        left: 0;
        background: linear-gradient(180deg, #F98833 0%, #FFC117 100%);
        border-radius: 7upx 0px 30upx 0px;
      }

      &::before {
        position: absolute;
        content: '';
        display: block;
        width: 32upx;
        height: 32upx;
        top: 9upx;
        left: 9upx;
      }


      &:nth-of-type(1) {
        &::before {
          background: url('../../../static/images/new-user/gudong/doller-icon.png') no-repeat;
          background-size: cover;
          z-index: 100;
        }

      }

      &:nth-of-type(2) {
        &::before {
          background: url('../../../static/images/new-user/gudong/order.png') no-repeat;
          background-size: cover;
          z-index: 100;
        }

      }

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