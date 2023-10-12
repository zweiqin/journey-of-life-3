<template>
  <view class="container">
    <view class="PageGHeader">
        <image @click="goBack" class="backBtn" src="@/static/images/entryOfMerchants/back.png"></image>
        <text class="PageText">选择服务</text>
    </view>
      234
  </view>
</template>

<script>
  export default {
    name: 'Service',
  }
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .PageGHeader {
    position: relative;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 88rpx;
    .backBtn {
      margin-left: 40rpx;
      width: 20rpx;
      height: 32rpx;
    }
    .PageText {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: Source Han Sans CN;
      font-size: 32rpx;
      font-weight: 600;
      text-align: center;
      display: flex;
      align-items: center;
      letter-spacing: 0.32rpx;
      color: #222229;
    }
  }
}
</style>