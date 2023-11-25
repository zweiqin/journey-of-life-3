<template>
  <view class="popup-header-container">
    <button class="uni-btn cancel" @click="$emit('cancel')">取消</button>
    <view class="center-content">
      <slot></slot>
    </view>
    <button @click="$emit('confirm')" class="uni-btn confirm">确认</button>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.popup-header-container {
  width: 100%;
  height: 96upx;
  padding: 28upx 32upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .center-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .uni-btn {
    font-size: 32upx;
    color: #EF530E;

    &.cancel {
      color: #222229;
    }
  }
}
</style>