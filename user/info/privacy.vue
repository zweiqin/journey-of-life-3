<template>
  <view class="privacy-container">
    <!-- <image
      src="../../static/images/user/back.png"
      mode="scaleToFill"
      class="return"
      @click="handleBack"
    /> -->

    <view class="main-area">
      <tui-list-cell arrow>
        <view
          class="privacy-item"
          @click="go('/pages/service-agreement/service-agreement')"
        >
          <view class="title">团蜂家居服务协议</view>
        </view>
      </tui-list-cell>

      <tui-list-cell arrow>
        <view
          class="privacy-item"
          @click="go('/pages/service-agreement/privacy-policy')"
        >
          <view class="title">团蜂家居隐私政策</view>
        </view>
      </tui-list-cell>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.privacy-container {
  padding: 36upx 40upx;
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;

  .return {
    width: 24upx;
    height: 48upx;
    padding: 36upx 0 56upx 0;
  }

  .main-area {
    border-radius: 20upx;
    background-color: #fff;
    width: 100%;
    overflow: hidden;
  }
}
</style>
