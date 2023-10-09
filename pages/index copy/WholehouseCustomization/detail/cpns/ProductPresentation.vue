<template>
  <view class="case-presentation-container">
    <view class="pane-title">
      <view class="title">产品展示</view>
      <view class="more">
        <text>共12条</text>
        <tui-icon color="#8F8D85" :size="20" name="arrowright"></tui-icon>
      </view>
    </view>

    <view class="product-wrapper">
      <view class="item">
        <image class="product-img" :src="data[2]" mode="" />

        <view class="product-info">
          <view class="name">德式实木沙发组合现代简约小户型胡...</view>
          <view class="time">2023-02-15</view>
        </view>
      </view>

      <view class="item">
        <image class="product-img" :src="data[0]" mode="" />

        <view class="product-info">
          <view class="name"
            >德式实木沙发组合现代简约小户型胡...</view
          >
          <view class="time">2023-02-15</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
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
    .item {
      width: 100%;
      margin-bottom: 30upx;

      .product-img {
        width: 100%;
        height: 318upx;
        border-radius: 16upx;
      }
    }

    .product-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        width: 497upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #3a3629;
        font-size: 28upx;
      }

      .time {
        font-size: 24upx;
        color: #8f8d85;
      }
    }
  }
}
</style>
