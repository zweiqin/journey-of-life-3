<template>
  <view class="advertisement-bar-container" @click="go('/community-center/vip-center/vip-detail?type=2')">
    <image class="ad-text" src="../../../static/images/new-business/home/ad-text.png"></image>
    <image src="../../../static/images/new-business/home/lang-1.png" class="lang-1"></image>
    <image src="../../../static/images/new-business/home/lang-2.png" class="lang-2"></image>
    <view class="ad-info-wrapper">买<text class="price-text">399</text>元送<text class="price-text">980</text>元超级大礼包</view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@keyframes lang {
  0% {
    opacity: 0;
    left: 268upx;
  }

  100% {
    opacity: 1;
    left: 768upx;

  }
}


.advertisement-bar-container {
  position: relative;
  height: 164upx;
  background: url('../../../static/images/new-business/home/ad-bar.png') no-repeat;
  background-size: cover;
  margin: 26upx 0 24upx;
  overflow: hidden;

  .ad-text {
    position: absolute;
    left: 126upx;
    top: 29upx;
    width: 394upx;
    height: 60upx;
  }

  .ad-info-wrapper {
    font-size: 24upx;
    color: #222229;
    position: absolute;
    left: 161upx;
    top: 97upx;

    .price-text {
      font-size: 32upx;
      color: #FF5C14;
    }
  }

  .lang-1 {
    position: absolute;
    left: 468upx;
    top: -20upx;
    width: 196upx;
    height: 121upx;
    animation: lang 2s ease-in infinite;
  }

  .lang-2 {
    position: absolute;
    left: 536upx;
    top: -22upx;
    width: 207upx;
    height: 123upx;
    animation: lang 2s ease-in infinite 2s;
  }
}
</style>