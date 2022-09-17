<template>
  <view class="size-container">
    <view class="wrapper" ref="wrapperRef">
      <view class="item active"> 不限 </view>
      <view class="item"> 60*100cm </view>
      <view class="item"> 80*100cm </view>
      <view class="item"> 60*120cm </view>
      <view class="item"> 90*100cm </view>
      <view class="item"> 90*200cm </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.size-container {
  width: 100%;
  height: auto;

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 28%;
      padding: 10upx 48upx;
      box-sizing: border-box;
      font-size: @f10;
      color: @c3d;
      border-radius: @r20;
      background-color: #f5f5f5;
      margin-bottom: 30upx;
      text-align: center;

      &.active {
        box-sizing: border-box;
        .border(@c0);
      }
    }
  }
}
</style>