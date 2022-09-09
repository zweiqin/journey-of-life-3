<template>
  <!-- <view class="user-panel" :style="{ 'box-shadow': showShadow ? '' : 'none' }"> -->
  <view class="user-panel">
    <view class="title">{{ data.title }}</view>
    <slot></slot>
    <view
      class="icons"
      :style="{
        padding: showShadow ? '' : 0,
      }"
    >
      <view
        class="item"
        :style="{
          width: 100 / row - 4 + '%',
        }"
        v-for="item in data.menus"
        :key="item.label"
      >
        <img class="icon" :src="item.icon" alt="" />
        <view class="name">{{ item.label }}</view>
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
    row: Number,
    showShadow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
.user-panel {
  margin-top: 20rpx;
  box-sizing: border-box;
  width: 100%;
  // box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.302);
  // border-radius: 10px 10px 10px 10px;
  padding: 16upx 20upx 36upx 20upx;
  border: 1upx solid #dcdcdc;
  border-radius: 20upx;

  .title {
    color: #3d3d3d;
    font-size: 30upx;
    font-weight: bold;
  }

  .icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12upx;
    flex-wrap: wrap;

    .item {
      display: flex;
      align-items: center;
      align-content: center;
      flex-direction: column;
      margin-top: 30upx;

      .icon {
        width: 50upx;
      }

      .name {
        color: #3d3d3d;
        font-size: 24upx;
        margin-top: 10rpx;
      }
    }
  }
}
</style>