<template>
  <view class="order-status">
    <view class="top">
      <view class="title-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
          alt=""
          class="return"
          @click="handleToOrderList"
        />
        <view class="title">订单状态</view>
      </view>
      <view class="mid">
        <view class="mid-main">
          <view class="first">等待师傅报价</view>
          <view class="second">
            <view class="distance">距离报价截止还剩</view>
            <view class="countdown">24:00:00</view>
          </view>
          <view class="third">
            <view class="third-main">
              <view class="left-type">
                <view class="number-name">订单编号</view>
                <view class="type-name">服务类型</view>
                <view class="time-name">下单时间</view>
              </view>
              <view class="right-info">
                <view class="number-list">
                  <view class="number">123456789</view>
                  <view class="copy">复制</view>
                </view>
                <view class="service-name">柜类安装</view>
                <view class="time">2022-11-24 24.00</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="main"> </view>
  </view>
</template>

<script>
export default {
  name: "Order-status",
  props: {},
  data() {
    return {};
  },
  methods: {
    handleToOrderList() {
      uni.navigateTo({ url: `../community-center/order` });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.order-status {
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(245, 190, 134, 0.42) 2%,
    rgba(246, 190, 134, 0) 103%
  );
  .top {
    .title-list {
      padding: 40upx 34upx 20upx 26upx;
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
    .mid {
      padding: 50upx 30upx 34upx 30upx;
      .mid-main {
        border-radius: 20upx;
        background: #ffffff;
        .first {
          padding-top: 30upx;
          text-align: center;
          font-size: 36upx;
          font-weight: 500;
          color: #3d3d3d;
        }
        .second {
          padding-top: 24upx;
          font-size: 28upx;
          display: flex;
          justify-content: center;
          .distance {
            color: #3d3d3d;
          }
          .countdown {
            padding-left: 12upx;
            color: #e95d20;
          }
        }
        .third {
          padding: 40upx 28upx 64upx 28upx;
          .third-main {
            padding: 32upx 60upx 30upx 32upx;
            border-radius: 20upx;
            background: #fef8f1;
            display: flex;
            justify-content: space-between;
            .left-type {
              font-size: 28upx;
              font-weight: 500;
              color: #3d3d3d;
              .number-name {
                padding-bottom: 32upx;
              }
              .type-name {
                padding-bottom: 32upx;
              }
              .time-name {
              }
            }
            .right-info {
              width: 58%;
              font-size: 28upx;
              font-weight: 500;
              color: #3d3d3d;
              .number-list {
                display: flex;
                justify-content: space-between;
                padding-bottom: 32upx;
                .number {
                }
                .copy {
                  color: #e95d20;
                }
              }
              .service-name {
                padding-bottom: 32upx;
              }
              .time {
              }
            }
          }
        }
      }
    }
  }
}
</style>
