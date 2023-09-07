<template>
  <view class="title-wrapper">
    <view class="left"><tui-icon @click="back" :size="24" name="arrowleft"></tui-icon></view>
    <view class="center">团蜂社区</view>
    <view class="right"></view>
  </view>
</template>

<script>
export default {
  methods: {
    back() {
      uni.navigateBack()
    }
  },
}
</script>

<style lang="less" scoped>
.title-wrapper {
  height: 88upx;
  display: flex;
  align-items: center;
  padding: 0 10upx;
  box-sizing: border-box;

  .center {
    flex: 1;
    text-align: center;
    font-size: 36upx;
    color: #1C2023;
    font-weight: 500;
  }

  .left,
  .right {
    width: 120upx;
  }
}
</style>