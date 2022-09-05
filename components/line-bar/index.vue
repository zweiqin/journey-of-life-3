<template>
  <view
    class="line-bar"
    :style="{
      padding: `${padding}px 0`,
      ...data.style
    }"
  >
    <view class="left">
      <img class="icon" :src="data.icon" alt="" />
      <view class="title">{{ data.label }}</view>
    </view>
    <view class="main">
      <slot></slot>
    </view>
    <img
      class="right-arrow"
      src="../../static/images/common/chevron-states.png"
      alt=""
    />
  </view>
</template>

<script>
export default {
  props: {
    data: Object,
    padding: {
      type: Number,
      default: 16,
    },
  },
};
</script>

<style lang="less" scoped>
.line-bar {
  display: flex;
  align-items: flex-start;
  border-bottom: 1upx solid #d8d8d8;

  .left {
    display: flex;
    align-items: center;
    .icon {
      width: 32upx;
    }
    .title {
      color: #3d3d3d;
      font-size: 28upx;
      font-weight: bold;
      margin-left: 14upx;
    }
  }

  .main {
    flex: 1;
    text-align: right;
    padding: 0 34upx;
  }

  .right-arrow {
    width: 28upx;
    height: 28upx;
  }
}
</style>