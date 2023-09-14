<template>
  <view class="no-data-container">
    <image class="no-icon" mode="widthFix" src="../../../static/images/new-community/home/no-order.png"></image>
    <text class="text">暂无订单</text>
    <view class="tip" v-show="isSeach">试试清空搜索条件？<button class="uni-btn" @click="$emit('clear')">清空搜索</button></view>
  </view>
</template>

<script>
export default {
  props: {
    isSeach: Boolean
  }
};
</script>

<style lang="less" scoped>
.no-data-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ccc;

  .no-icon {
    width: 100upx;
  }

  .text {
    margin-top: 50upx;
    letter-spacing: 0.3em;
  }

  .tip {
    display: flex;
    align-items: center;
    margin-top: 20upx;
    font-size: 24upx;

    .uni-btn {
      font-size: 28upx;
      font-weight: 500;
      color: rgb(239, 86, 19);
    }
  }
}
</style>
