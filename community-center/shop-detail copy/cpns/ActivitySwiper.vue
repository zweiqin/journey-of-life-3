<template>
  <view class="vip-container">
    <swiper indicator-dots autoplay indicator-color="#fff" indicator-active-color="#fdb96c"
      style="height: 320upx; width: 100%;">
      <swiper-item @click="handleToVipDetail(item.url)" v-for="(item, index) in vipBarConfig" :key="index">
        <image class="vip-banner" :src="item.img">
        </image>
      </swiper-item>
    </swiper>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { vipBarConfig } from '../../../pages/community-center/config'
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
.vip-container {
  display: flex;
  justify-content: center;
  height: 320upx;
  box-sizing: border-box;

  .vip-banner {
    height: 100%;
    width: 100%;
  }
}
</style>