<template>
  <view class="shop-footer-container" v-if="shopInfo" :class="{ show: !!shopInfo }">
    <view class="left">
      <view class="item" @click="$emit('follow', shopInfo.follow)">
        <image
          class="icon"
          :src="
            shopInfo.follow
              ? require('../../../static/images/new-community/shop/follow-active.png')
              : require('../../../static/images/new-community/shop/follow.png')
          "
        ></image>
        <view class="op-name">收藏</view>
      </view>

      <TuanWxShare ref="tuanWxShareRef" @click="handleShareGoods">
        <view class="item">
          <image class="icon" src="../../../static/images/new-community/shop/share.png"></image>
          <view class="op-name">分享</view>
        </view>
      </TuanWxShare>

      <view class="item" v-if="shopInfo.shopAddress" @click="handleNavigateTo(shopInfo.shopAddress)">
        <image class="icon" src="../../../static/images/new-community/shop/to.png"></image>
        <view class="op-name">导航</view>
      </view>
    </view>

    <view class="right">
      <button @click="handleMakePhone(shopInfo.contactsTel)" class="uni-btn" :style="{ background: shopInfo.contactsTel ? '' : '#ccc' }">
        <image class="call-icon" src="../../../static/images/new-community/shop/call.png"></image>
        {{ shopInfo.contactsTel ? '拨打电话' : '商家失联了' }}
      </button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getLngLatByAddress, navigationAddress } from '../../../utils/localtion';

export default {
  props: {
    shopInfo: Object
  },

  methods: {
    handleNavigateTo(shopAddress) {
      if (shopAddress) {
        getLngLatByAddress(shopAddress)
          .then((res) => {
            navigationAddress(res.geocodes[0].location);
          })
          .then((err) => {
            this.ttoast({
              type: 'fail',
              title: '导航失败',
              content: err
            });
          });
      }
    },

    handleMakePhone(phone) {
      if (phone) {
        uni.makePhoneCall({
          phoneNumber: phone
        });
      }
    },

    handleShareGoods() {
      const _this = this;
      const data = {
        data: {
          title: '我在团蜂开店啦-' + _this.shopInfo.shopName,
          desc: _this.shopInfo.mainBusiness || _this.shopInfo.elegantDemeanour || '快来进店看看吧',
          link: 'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/community-center/shop/shop-detail?shopId=' + _this.shopInfo.shopId,
          imageUrl: _this.shopInfo.shopLogo || 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/8stwtn8hbay7amo0u6hb.png'
        },
        successCb: () => {},
        failCb: () => {}
      };

      this.$refs.tuanWxShareRef.share(data, true, '/community-center/shop/shop-detail?shopId=' + _this.shopInfo.shopId);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes show-footer {
  0% {
    bottom: -154upx;
  }

  100% {
    bottom: 0upx;
  }
}

.shop-footer-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 38upx 0 45upx;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 154upx;
  width: 100%;
  background-color: #fff;
  z-index: 10;

  &.show {
    animation: show-footer 500ms ease-in;
  }

  .left {
    display: flex;
    align-items: center;
    flex: 1;
    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-right: 58upx;

      .icon {
        width: 40upx;
        height: 40upx;
      }

      .op-name {
        color: #222229;
        font-size: 24upx;
        margin-top: 8upx;
        white-space: nowrap;
      }
    }
  }

  .uni-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 271upx;
    height: 90upx;
    background-color: #ef530e;
    border-radius: 100upx;
    color: #f5f5f7;
    font-weight: 500;
    font-size: 32upx;
    transition: all 350ms;

    &:active {
      opacity: 0.8;
    }

    .call-icon {
      width: 48upx;
      height: 48upx;
      flex-shrink: 0;
      margin-right: 12upx;
    }
  }
}
</style>
