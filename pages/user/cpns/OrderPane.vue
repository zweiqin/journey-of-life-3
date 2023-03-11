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
            <tui-badge
              type="danger"
              absolute
              :scaleRatio="0.8"
              translateX="40%"
              top="-6rpx"
              v-show="conOrderNumbers[item.numberKey]"
            >
              {{ conOrderNumbers[item.numberKey] }}
            </tui-badge>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { shequOrderMenus, shopOrderMneus } from '../data'
import { getOrderNumberApi } from '../../../api/community-center'
import { USER_ID } from '../../../constant'
export default {
  data() {
    return {
      currentMenu: 0,
      shequOrderMenus: Object.freeze(shequOrderMenus),
      shopOrderMneus: Object.freeze(shopOrderMneus),
      conOrderNumbers: {},
      userId: null,
    }
  },

  mounted() {
    this.userId = uni.getStorageSync(USER_ID)
  },

  methods: {
    handleSwitchSwiper(e) {
      this.currentMenu = e.detail.current
      if (
        e.detail.current === 1 &&
        JSON.stringify(this.conOrderNumbers) === '{}' &&
        this.userId
      ) {
        this.getOrderNumbers()
      }
    },

    async getOrderNumbers() {
      const res = await getOrderNumberApi({
        userId: this.userId,
      })

      if (res.statusCode === 20000) {
        this.conOrderNumbers = res.data
      }
    },
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

      .menu-item {
        position: relative;
      }
    }
  }
}
</style>
