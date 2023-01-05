<template>
  <view
    class="line-title"
    :style="{ backgroundColor: background, height: height + 'upx' }"
  >
    <view class="title" :style="{ backgroundColor: background }">{{
      title
    }}</view>
  </view>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 60,
    },
    background: {
      type: String,
      default: "#F1F2F6",
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.line-title {
  position: relative;

  &::after {
    position: absolute;
    content: "";
    display: block;
    border-bottom: 1upx solid #d8d8d8;
    width: 300upx;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20upx;
    z-index: 20;
    white-space: nowrap;
    color: #3d3d3d;
  }
}
</style>