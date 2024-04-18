<template>
  <view class="order-channel">
    <view class="section-title">订单渠道</view>

    <view class="list">
      <view class="item">
        <view class="left">
					<view style="background-color: #ffc117;padding: 10rpx;border-radius: 50%;">
						<tui-icon name="bag-fill" color="#ffffff" size="50" unit="rpx" margin="0"></tui-icon>
					</view>
          <text class="item-title">商城金额(元)</text>
          <text class="price-text">{{ data.mallOrderPriceTotal }}</text>
        </view>

        <view class="right">
          <text class="sub-title">占比</text>
          <view class="percentage">{{ percentageData.mallOrderPriceTotal }}%</view>
        </view>
      </view>

      <view class="item">
        <view class="left">
					<view style="background-color: #409eff;padding: 10rpx;border-radius: 50%;">
						<tui-icon name="transport-fill" color="#ffffff" size="50" unit="rpx" margin="0"></tui-icon>
					</view>
          <text class="item-title">物流金额(元)</text>
          <text class="price-text">{{ data.logisticsOrderPriceTotal }}</text>
        </view>

        <view class="right">
          <text class="sub-title">占比</text>
          <view class="percentage">{{ percentageData.logisticsOrderPriceTotal }}%</view>
        </view>
      </view>

      <view class="item">
        <view class="left">
					<view style="background-color: #00b578;padding: 10rpx;border-radius: 50%;">
						<tui-icon name="home-fill" color="#ffffff" size="50" unit="rpx" margin="0"></tui-icon>
					</view>
          <text class="item-title">材料金额(元)</text>
          <text class="price-text">{{ data.materialOrderPriceTotal }}</text>
        </view>

        <view class="right">
          <text class="sub-title">占比</text>
          <view class="percentage">{{ percentageData.materialOrderPriceTotal }}%</view>
        </view>
      </view>

      <view class="item">
        <view class="left">
					<view style="background-color: #ff8c00;padding: 10rpx;border-radius: 50%;">
						<tui-icon name="service-fill" color="#ffffff" size="50" unit="rpx" margin="0"></tui-icon>
					</view>
          <text class="item-title">社区金额(元)</text>
          <text class="price-text">{{ data.communityOrderPriceTotal }}</text>
        </view>

        <view class="right">
          <text class="sub-title">占比</text>
          <view class="percentage">{{ percentageData.communityOrderPriceTotal }}%</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      percentageData: {}
    }
  },

  watch: {
    data: {
      handler(value) {
        if (JSON.stringify(value) !== '{}') {
          this.calcPercentage(value)
        }
      },

      immediate: true,
      deep: true
    }
  },

  methods: {
    calcPercentage(value) {
      const totalPrice = value.mallOrderPriceTotal + value.materialOrderPriceTotal + value.logisticsOrderPriceTotal + value.communityOrderPriceTotal
      this.percentageData = {
        mallOrderPriceTotal: ((value.mallOrderPriceTotal / totalPrice) * 100).toFixed(2),
        materialOrderPriceTotal: ((value.materialOrderPriceTotal / totalPrice) * 100).toFixed(2),
        logisticsOrderPriceTotal: ((value.logisticsOrderPriceTotal / totalPrice) * 100).toFixed(2),
        communityOrderPriceTotal: ((value.communityOrderPriceTotal / totalPrice) * 100).toFixed(2),
      }
    }
  },
}
</script>

<style lang="less" scoped>
.order-channel {
  .section-title {
    font-size: 24upx;
    font-weight: 500;
    padding-left: 20upx;
    position: relative;
    margin-bottom: 42upx;

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 10upx;
      height: 10upx;
      border-radius: 100px;
      left: 0;
      transform: translateY(-50%);
      top: 50%;
      background-color: #00B578;
    }
  }

  .list {
    .item {
      padding: 8upx 17upx;
      box-sizing: border-box;
      height: 84upx;
      border-radius: 20upx;
      background-color: #F5F7FB;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24upx;
      color: #606972;
      margin-bottom: 30upx;

      &:nth-of-type(4) {
        margin-bottom: 0;
      }

      .left,
      .right {
        display: flex;
        align-items: center;
      }

      .left {
        flex: 1;
      }

      .item-title {
        margin: 0 31upx 0 23upx;
      }

      .price-text {
        font-size: 32upx;
        font-weight: 500;
        color: #000;
      }

      .icon {
        height: 68upx;
        width: 68upx;
        border-radius: 50%;
      }

      .sub-title {
        margin-right: 30upx;
      }

      .percentage {
        color: #000;
      }
    }
  }
}
</style>