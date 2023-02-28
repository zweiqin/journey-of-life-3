<template>
  <view
    class="coupon-item-container"
    :class="{ gray: [1, 2].includes(data.status) }"
    v-if="data"
  >
    <view class="main-info">
      <view class="coupon-container">
        <view class="coupon-title">{{ data.name }}</view>
        <view class="desc">{{ data.desc }}</view>
        <view class="end-time">{{ data.startTime }} 至 {{ data.endTime }}</view>
      </view>
      <view class="status-warpper">
        <view class="price-title"> <text>￥</text> {{ data.discount }} </view>
        <button
          v-if="data.status + '' === 'null'"
          class="uni-btn"
          @click="$emit('receive', data)"
        >
          立即领取
        </button>

        <button
          @click="handleToUseCoupon"
          class="uni-btn"
          v-if="data.status === 0"
        >
          立即使用
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      reuqired: true,
    },
  },

  methods: {
    handleToUseCoupon() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.coupon-item-container {
  background-color: #ffc117;
  height: 188upx;
  border-radius: 24upx;
  margin-bottom: 20upx;

  &.gray {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
  }

  .main-info {
    position: relative;
    display: flex;
    background-color: #fff;
    height: 100%;
    width: calc(100% - 24upx);
    float: right;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -12upx;
      right: 206upx;
      width: 24upx;
      height: 24upx;
      background-color: #f6f6f5;
      border-radius: 50%;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: -12upx;
      right: 206upx;
      width: 24upx;
      height: 24upx;
      background-color: #f6f6f5;
      border-radius: 50%;
    }

    .coupon-container {
      flex: 1;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding-left: 24upx;
      box-sizing: border-box;

      .coupon-title {
        font-size: 32upx;
        font-weight: 500;
      }

      .desc {
        font-size: 26upx;
        color: #605d52;
      }

      .end-time {
        color: #b3b2ad;
        font-size: 24upx;
        margin-top: 12upx;
      }
    }

    .status-warpper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 218upx;
      height: 100%;
      // background-color: #ffc117;
      flex-shrink: 0;
      border-left: 1upx dotted #d8d8d8;
      font-size: 68upx;
      font-weight: bold;
      color: #ffc117;
      border-radius: 0 24upx 24upx 0;

      text {
        font-weight: bold;
        font-size: 42upx;
        color: #ffc117;
      }
    }

    .uni-btn {
      width: 140upx;
      height: 48upx;
      border-radius: 100px;
      background: #ffc117;
      font-size: 24upx;
      color: #fff;
      line-height: 48upx;
    }
  }
}
</style>
