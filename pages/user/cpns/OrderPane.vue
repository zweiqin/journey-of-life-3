<template>
  <view class="order-pane">
    <view class="title-wrapper">
      <view
        @click="currentMenu = 0"
        class="title-item"
        :class="{ active: currentMenu === 0 }"
        >商城订单</view
      >
      <view
        class="title-item"
        @click="currentMenu = 1"
        :class="{ active: currentMenu === 1 }"
        >社区订单</view
      >
    </view>

    <view class="menus-container">
      <swiper
        @change="handleSwitchSwiper"
        :current="currentMenu"
        class="swiper"
      >
        <swiper-item class="swiper-item">
          <view
            class="menu-item"
            v-for="item in shopOrderMneus"
            :key="item.name"
            @click="$emit('handleNavigate', item)"
          >
            <image class="menu-icon" :src="item.icon" mode="" />
            <text class="menu-title">{{ item.name }}</text>
          </view>
        </swiper-item>

        <swiper-item class="swiper-item">
          <view
            class="menu-item"
            @click="$emit('handleNavigate', item)"
            v-for="item in shequOrderMenus"
            :key="item.name"
          >
            <image class="menu-icon" :src="item.icon" mode="" />
            <text class="menu-title">{{ item.name }}</text>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { shequOrderMenus, shopOrderMneus } from '../data'
export default {
  data() {
    return {
      currentMenu: 0,
      shequOrderMenus: Object.freeze(shequOrderMenus),
      shopOrderMneus: Object.freeze(shopOrderMneus),
    }
  },

  methods: {
    handleSwitchSwiper(e) {
      this.currentMenu = e.detail.current
    },
  },
}
</script>

<style lang="less" scoped>
view,text{
  line-height: 1.5 !important;
}
.order-pane {
  padding: 32upx 24upx;
  background-color: #fff;
  border-radius: 24upx;

  .title-wrapper {
    display: flex;
    align-items: center;
    color: #b3b2ad;
    font-size: 28upx;
    padding-bottom: 24upx;
    border-bottom: 1upx solid #f1f1f0;

    .title-item {
      margin-right: 24upx;
      font-weight: 500;

      &.active {
        color: #141000;
      }
    }
  }

  .swiper {
    margin-top: 28upx;
    height: 120upx;
    .swiper-item {
      padding: 28upx 30upx 32upx 30upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
