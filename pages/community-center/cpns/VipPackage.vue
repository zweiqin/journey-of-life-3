<template>
  <view>
    <view class="store-name">
      <view class="item active">热销套餐</view>
    </view>
    <view class="vip-container">
      <swiper indicator-dots autoplay indicator-color="#fff" indicator-active-color="#fdb96c"
        style="height: 320upx; width: 100%;">
        <swiper-item @click="handleToVipDetail(item.url)" v-for="(item, index) in vipBarConfig" :key="index">
          <image class="vip-banner" :src="item.img">
          </image>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { vipBarConfig } from '../config'
export default {
  data() {
    return {
      vipBarConfig: Object.freeze(vipBarConfig)
    }
  },

  methods: {
    handleToVipDetail(url) {
      if (url) {
        this.go(url)
      } else {
        this.empty('套餐升级中')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.store-name {
  margin-top: 246upx;
  position: relative;
  display: flex;
  gap: 0upx 60upx;
  padding-left: 54upx;
  padding-top: 36upx;
  margin-bottom: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 42upx;
    left: 30upx;
    width: 8upx;
    height: 40upx;
    border-radius: 4upx;
    background: linear-gradient(180deg, #FFD556 0%, #E95D20 100%);
  }



  .item {
    color: #000000;
    font-size: 36upx;

    &.active {
      font-weight: bold;
    }
  }
}


.vip-container {
  padding: 0 17px 0;
  box-sizing: border-box;
  width: 100%;

  .vip-banner {
    height: 100%;
    width: 100%;
  }
}
</style>