<template>
  <view class="op-container">
    <view class="container">
      <view class="item" @click="$emit('call')">
        <image src="../../../static/images/new-brand/detail/chat.png" mode="" />
        <text>联系</text>
      </view>
      <view class="item" @click="$emit('navigate')">
        <image
          src="../../../static/images/new-brand/detail/locale.png"
          mode=""
        />
        <text>导航</text>
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style lang="less" scoped>
.op-container {
  height: 144upx;
  padding: 20upx;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  .container {
    position: relative;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 24upx;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1upx;
      height: 32upx;
      background-color: transparent;
      border-left: 1upx solid #d5d4d1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
        width: 56upx;
        height: 56upx;
      }

      text {
        color: #3a3629;
        font-size: 28upx;
        margin-left: 16upx;
      }
    }
  }
}
</style>
