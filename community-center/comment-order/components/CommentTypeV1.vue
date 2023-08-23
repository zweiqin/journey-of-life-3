<template>
  <view class="order-item">
    <view class="order-img">
      <tui-lazyload-img
        style="flex-shank: 0"
        webp
        radius="20rpx"
        backgroundColor="#fff"
        :style="{ width: '100rpx !important', height: '100rpx !important' }"
        :src="itemData.serverUrl || ''"
      ></tui-lazyload-img>
    </view>
    <view class="order-detail">
      <view class="serve-name">{{ itemData.serverName }}</view>
      <view class="order-bottom">
        <view class="order-no">{{ itemData.orderNo }}</view>
        <view class="btn-wrapper">
          <button class="uni-btn" @click="$emit('comment', { itemData, isAppend })">{{ isAppend ? '追加评价' : '评价'}}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      required: true
    },

    isAppend: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.order-item {
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  padding: 20upx 20upx 0;
  box-sizing: border-box;
  border-radius: 20upx;
  margin-bottom: 20upx;

  .order-detail {
    flex: 1;
    margin-left: 20upx;
    box-sizing: border-box;
    padding: 20upx 0;

    .serve-name {
      font-size: 32upx;
      font-weight: 500;
      margin-bottom: 20upx;
    }

    .order-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .order-no {
        font-size: 28upx;
        color: #5e5e5e;
      }

      .uni-btn {
        background: linear-gradient(90deg, #ffd100, #fe753f);
        color: #fff;
        font-size: 28upx;
        padding: 20upx 40upx;
        border-radius: 50upx;
        transition: all 350ms;

        &:active {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
