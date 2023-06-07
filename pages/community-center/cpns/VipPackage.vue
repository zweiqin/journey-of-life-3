<template>
  <view>
    <view class="store-name">
      <view class="item active">热销套餐</view>
    </view>
    <view class="vip-container">
      <swiper indicator-dots autoplay indicator-color="#fff" indicator-active-color="#fdb96c"
        style="height: 320upx; width: 100%;">
        <!-- <swiper-item>
          <view class="vip-wrapper vip-type-1" @click="handleToVipDetail(finalVipBarPackage[1].url)">
            <image class="vip-banner" :src="finalVipBarPackage[1].img"></image>
            <view class="text">
              <view class="price-text">{{ finalVipBarPackage[1].price }}</view>
              <view class="title-text">{{ finalVipBarPackage[1].name }}</view>
            </view>
          </view>
        </swiper-item> -->

        <swiper-item>
          <view class="vip-wrapper vip-type-1" @click="handleToVipDetail(finalVipBarPackage[0].url)">
            <image class="vip-banner" :src="finalVipBarPackage[0].img"></image>
            <view class="text">
              <view class="price-text">￥{{ finalVipBarPackage[0].price }}</view>
              <view class="title-text">{{ finalVipBarPackage[0].name }}</view>
            </view>
          </view>
        </swiper-item>

        <swiper-item>
          <view class="vip-wrapper vip-type-1" @click="handleToVipDetail(finalVipBarPackage[1].url)">
            <image class="vip-banner" :src="finalVipBarPackage[1].img"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { vipBarConfig } from '../config'
export default {
  data() {
    return {
      vipBarConfig: []
    }
  },

  mounted() {
    this.getDZPersonalizationConfig()
  },

  methods: {
    handleToVipDetail(url) {
      if (url) {
        this.go(url)
      } else {
        this.empty('套餐升级中')
      }
    },

    // 获取自定义属性
    async getDZPersonalizationConfig() {
      // const currentDetail = this.$store.getters.detailAddress
      // await this.$store.dispatch('community/getVipPackageList', currentDetail)
      const vipPackageList = this.$store.getters.dzVipList
      if (vipPackageList.length) {
        for (const item of vipPackageList) {
          if (item.serverType === 1) {
            vipBarConfig[item.serverType - 1].name = item.serverName
            vipBarConfig[item.serverType - 1].price = item.serverPrice
          }
        }
      }

      this.vipBarConfig = vipBarConfig
    }
  },

  computed: {
    finalVipBarPackage() {
      if (this.$store.getters.dzVipList.length) {
        for (const item of this.$store.getters.dzVipList) {
          vipBarConfig[item.serverType - 1].name = item.serverName
          vipBarConfig[item.serverType - 1].price = item.serverPrice
        }
      }

      return vipBarConfig
    }
  }
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

.vip-wrapper {
  width: 100%;
  height: 320upx;
}


.vip-wrapper {
  position: relative;

  .text {
    position: absolute;
    top: 50upx;
    left: 58upx;
    font-size: 48upx;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
  }
}
</style>