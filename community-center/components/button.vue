<template>
  <view class="confirm-btn">
    <button
      :loading="loading"
      :style="{
        background: type === 'error' ? '#e95d20' : bgc ? bgc : '',
        'border-color': type === 'error' ? '#f90' : bgc ? bgc : ''
      }"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    },

    bgc: String,
    loading: Boolean
  }
}
</script>

<style lang="less" scoped>
.confirm-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20upx 30upx;
  box-sizing: border-box;
  background-color: #fff;

  button {
    width: 100%;
    border-radius: 10upx;
    border: 1px solid #0083e7;
    background-color: #0090ff;
    color: #fff;
    font-size: 36upx;
  }
}
</style>
