<template>
  <view class="confirm-order">
    <view class="title-list">
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
        alt=""
        class="return"
        @click="handleBack"
      />
      <view class="title">确认订单</view>
    </view>

    <view class="main">
      <view class="service-list">
        <view class="text">安装服务</view>
        <view class="name">空调安装</view>
      </view>
      <view class="order-list">
        <view class="text">订单编号</view>
        <view class="name">1111111</view>
      </view>
      <view class="install-list">
        <view class="text">安装费用</view>
        <view class="price-list">
          <view class="logo">￥</view>
          <view class="number">150</view>
          <view class="point">.00</view>
        </view>
      </view>
      <view class="pay-list">
        <view class="text">支付方式</view>
        <view class="name">微信支付</view>
      </view>
      <view class="name-list">
        <view class="text">收款方</view>
        <view class="name">团蜂社区</view>
      </view>
    </view>

    <view class="pay">
      <view class="logo">￥</view>
      <view class="number">150</view>
      <view class="point">.00</view>
    </view>
    <view class="on-pay">确定支付</view>
  </view>
</template>





<script>
export default {
  name: "Confirm-order",
  props: {},
  data() {
    return {};
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.confirm-order {
  .title-list {
    padding: 88upx 34upx 36upx 26upx;
    display: flex;
    .return {
      width: 48upx;
      height: 48upx;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }
  .main {
    padding: 56upx 34upx 0upx 34upx;
    .service-list {
      display: flex;
      width: 100%;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .order-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .install-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .price-list {
        display: flex;
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
        .logo{}
        .number{}
        .point{}
      }
    }

    .pay-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .name-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  .pay{
    margin-top: 290upx;
    display: flex;
    justify-content: center;
    font-size: 48upx;
    font-weight: 500;
    color: #FA5151;
    .logo{}
    .number{}
    .point{}
  }
  .on-pay{
    margin: 86upx auto;
    width: 310upx;
    height: 80upx;
    border-radius: 100upx;
    background: linear-gradient(90deg, #00B578 0%, #079A9A 100%);
    font-size: 32upx;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 70upx;
  }
}
</style>
