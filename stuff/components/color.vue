<template>
  <view class="color-container">
    <view class="item" style="background: #eb2f96"></view>
    <view class="item" style="background: #8a38f5"></view>
    <view class="item" style="background: #3662ec"></view>
    <view class="item" style="background: #07b9b9"></view>
    <view class="item" style="background: #00b578"></view>
    <view class="item" style="background: #ffc300"></view>
    <view class="item" style="background: #ffd7ed"></view>
    <view class="item" style="background: #e7d4ff"></view>
    <view class="item" style="background: #cde1fd"></view>
    <view class="item" style="background: #c7f5f5"></view>
    <view class="item" style="background: #cffeee"></view>
    <view class="item" style="background: #fff8c6"></view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.color-container {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 48upx;
    height: 48upx;
    border-radius: 50%;
    background-color: aqua;
    margin: 0 16upx;
    margin-bottom: 17upx;
  }
}
</style>