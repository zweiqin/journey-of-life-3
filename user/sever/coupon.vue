<template>
  <view class="coupon-container">
    <view class="header">
      <img
        @click="handleBack"
        class="back"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/eo1rayuh8vu1qtnbdj0l.png"
        alt=""
      />
      <view class="title">优惠劵</view>
    </view>

    <view class="main">
      <view class="item price">
        <img
          class="bgm"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ewdlelo9lhksbegaaytf.png"
          alt=""
        />

        <view class="info">
          <view class="price-numer">
            100<view class="tag"> 优惠劵 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.coupon-container {
  min-height: 100vh;
  width: 100%;
  background-color: #fa5151;
  font-size: @f14;
  color: @cw;

  .header {
    text-align: center;
    padding: 40upx 24upx;

    .back {
      width: 16upx;
      height: 28upx;
      object-fit: cover;
      float: left;
    }
  }

  .main {
    padding: 10upx;
    box-sizing: border-box;

    .item {
      width: 100%;
      display: flex;
      background-color: @cw;
      box-sizing: border-box;
      border-radius: @r5;
    }

    .price {
      position: relative;
      padding: 4upx;
      box-sizing: border-box;

      .bgm {
        width: 100%;
        height: 140upx;
        margin: auto;
      }

      .info {
        display: flex;
        align-items: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 100%;

        .price-numer {
          position: relative;
          font-size: 80upx;
          color: @cw;
          font-weight: bold;
          margin-left: 80upx;

          .tag {
            position: absolute;
            font-size: @f12;
            color: @cw;
            top: -40upx;
            right: -36upx;
            padding: 4upx 6upx;
            background-color: #07b9b9;
            border-radius: 4upx;

            &::after {
              position: absolute;
              bottom: -8upx;
              left: 20px;
              content: "";
              display: block;
              width: 16upx;
              height: 16upx;
              background-color: #07b9b9;
              transform: rotate(45deg);
            }
          }
        }
      }
    }
  }
}
</style>