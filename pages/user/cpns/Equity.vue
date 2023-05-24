<template>
  <view class="order-pane">
    <view class="title-wrapper">
      <view class="title-item">我的权益</view>
    </view>

    <view class="menus-container" :style="{height: menu.length > 8 ? '340upx' : ''}">
      <view class="swiper-item">
        <view class="menu-item" :style="{ marginTop: menu.length > 8 ? '10upx' : 0 }"
          @click="$emit('handleNavigate', item)" v-for="item in menu" :key="item.name">
          <image class="menu-icon" :src="item.icon" mode="" />
          <text class="menu-title">{{ item.name }}</text>
          <tui-badge v-if="item.name === '区域代理' && $store.getters.applyRegionAgentStatus
            " type="danger" absolute :scaleRatio="0.8" translateX="40%" top="6rpx" right="44rpx">{{
    $store.getters.applyRegionAgentStatus }}</tui-badge>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true
    }
  }


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
    // overflow: hidden;
    // min-height: 260upx;
    height: auto;

    .swiper-item {
      position: relative;
      // padding: 28upx 20upx 32upx 20upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 280upx;

      // justify-content: space-between;
      .menu-item {
        // flex: 3;
        // margin-right: 0upx;
        width: 25%;
        height: 104upx;

        .menu-icon {}

        .menu-title {}
      }
    }
  }
}
</style>
