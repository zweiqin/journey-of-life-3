<template>
  <view class="order-pane">
    <view class="title-wrapper">
      <view class="title-item">我的服务</view>
    </view>

    <view class="menus-container">
      <view class="swiper-item">
        <view
          class="menu-item"
          @click="$emit('handleNavigate', item)"
          v-for="item in myServe"
          :key="item.name"
        >
          <image class="menu-icon" :src="item.icon" mode="" />
          <text class="menu-title">{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { myServe } from '../data'
export default {
  data() {
    return {
      myServe: Object.freeze(myServe),
    }
  },
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5 !important;
}
.order-pane {
  padding: 32upx 24upx;
  background-color: #fff;
  border-radius: 24upx;

  .title-wrapper {
    color: #b3b2ad;
    font-size: 28upx;
    padding-bottom: 24upx;
    border-bottom: 1upx solid #f1f1f0;

    .title-item {
      margin-right: 24upx;
      font-weight: 500;
      color: #141000;
    }
  }

  .menus-container {
    height: 120upx;
    .swiper-item {
      padding: 28upx 0 32upx 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .menu-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    }
  }
}
</style>
