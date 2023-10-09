<template>
  <view class="case-presentation-container">
    <view class="pane-title">
      <view class="title">案例展示</view>
      <view class="more">
        <text>共12条</text>
        <tui-icon color="#8F8D85" :size="20" name="arrowright"></tui-icon>
      </view>
    </view>

    <view class="product-wrapper">
      <image class="left" :src="data[0]" mode="" />
      <view class="right">
        <image :src="data[1]" mode="" />
        <image :src="data[2]" mode="" />
      </view>
    </view>

    <image class="bototm-img" :src="data[3]" mode="" />
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
}
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
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      width: 479upx;
      height: 318upx;
      border-radius: 16upx;
      flex-shrink: 0;
      margin-right: 20upx;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 318upx;

      image {
        width: 100%;
        height: 151upx;
        border-radius: 16upx;
        object-fit: cover;
      }
    }
  }

  .bototm-img {
    width: 100%;
    height: 318upx;
    border-radius: 16upx;
    margin-top: 16upx;
  }
}
</style>
