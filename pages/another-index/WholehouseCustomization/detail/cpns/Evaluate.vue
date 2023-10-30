<template>
  <view class="case-presentation-container">
    <view class="pane-title">
      <view class="title">评价</view>
      <view class="more">
        <text>共0条</text>
        <tui-icon color="#8F8D85" :size="20" name="arrowright"></tui-icon>
      </view>
    </view>

    <view class="product-wrapper">
      <view>暂无评价</view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.case-presentation-container {
  padding: 24upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 16upx;

  .pane-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20upx;

    .title {
      font-size: 28upx;
      color: 141000;
      font-weight: 500;
    }

    .more {
      display: flex;
      align-items: center;
      color: #8f8d85;
      font-size: 24upx;
    }
  }

  .product-wrapper {
    color: #ccc;
    font-size: 24upx;
    text-align: center;
  }
}
</style>
