<template>
  <view class="pane-container">
    <view class="title-wrapper">
      <view class="left">
        <image :src="icon" mode="" />
        <text>{{ text }}</text>
        <view class="data">{{ data }}</view>
      </view>

      <view> <slot name="right"></slot> </view>
    </view>

    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import icons from "./iocns";
export default {
  props: {
    type: {
      type: String,
    },

    text: {
      type: String,
    },

    data: {
      type: String,
    },
  },

  computed: {
    icon() {
      return icons[this.type];
    },
  },
};
</script>

<style lang="less" scoped>
.pane-container {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 34upx 24upx;
  box-sizing: border-box;
  font-size: 28upx;
  color: #000;
  margin-bottom: 20upx;

  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    image {
      width: 48upx;
      height: 48upx;
      margin-right: 12upx;
    }
  }
}
</style>