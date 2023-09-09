<template>
  <view class="common-shop-container" v-if="shopInfo" @click="go('/community-center/shop/shop-detail?shopId=' + shopInfo.shopId)">
    <image class="shop-logo" :src="shopInfo.shopLogo || require('../../../static/images/new-user/fee.icon.png')"></image>

    <view class="shop-info">
      <view class="shop-name">
        <image class="icon" src="../../../static/images/new-community/home/tag.png"></image>
        <view class="name">{{ shopInfo.shopName || shopInfo.shopNameSimple || '附近商家' }}</view>
      </view>

      <view class="item">
        <view class="rate">
          <tui-rate active="#EF530E" :current="shopInfo.score" :size="14" disabled></tui-rate>
          <text class="rate-text">{{ shopInfo.score }}</text>
        </view>

        <view class="accept-precentage">接单率{{ shopInfo.acceptanceRate * 100 }}%</view>
      </view>

      <view class="serve-list" v-if="shopInfo.mainBusiness">
        <text class="item" v-for="item in shopInfo.mainBusiness.split(',')">{{ item }} <text class="line"></text> </text>
      </view>

      <view class="op-info">
        <view class="item">
          <image class="icon" src="../../../static/images/new-community/home/follow.png"></image>
          <text class="num">{{ shopInfo.attentionNum || 0 }}</text>
        </view>

        <view class="item">
          <image class="icon" src="../../../static/images/new-community/home/views.png"></image>
          <text class="num">{{ shopInfo.accessNum || 0 }}</text>
        </view>

        <view class="item" v-if="shopInfo.distance">
          <image class="icon" src="../../../static/images/new-community/home/location.png"></image>
          <text class="num">{{ shopInfo.distance || 0 }}km</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    shopInfo: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
.common-shop-container {
  padding: 22upx 17upx;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;

  .shop-info {
    flex: 1;
  }

  .shop-logo {
    width: 140upx;
    height: 140upx;
    flex-shrink: 0;
    border-radius: 14upx;
    margin-right: 30upx;
  }

  .shop-name {
    display: flex;
    align-items: center;

    .icon {
      position: relative;
      top: 2upx;
      width: 32upx;
      height: 32upx;
      flex-shrink: 0;
    }

    .name {
      font-size: 32upx;
      color: #222229;
      margin-left: 5upx;
    }
  }

  .item {
    display: flex;
    align-items: center;

    .rate {
      .rate-text {
        font-size: 24upx;
        color: #ef530e;
        margin-left: 4upx;
      }
    }

    .accept-precentage {
      color: #888889;
      font-size: 24upx;
      margin-left: 15upx;
    }
  }

  .serve-list {
    width: 400upx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 14upx;

    .item {
      position: relative;
      font-size: 24upx;
      color: #9e9e9e;
      flex-shrink: 0;
      display: inline-block;
      margin-right: 8upx;

      .line {
        position: relative;
        top: 4upx;
        width: 1upx;
        height: 22upx;
        background-color: #9e9e9e;
        display: inline-block;
        margin-left: 8upx;
      }
    }
  }

  .op-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {
      .icon {
        width: 44upx;
        height: 44upx;
      }

      .num {
        color: #888889;
        font-size: 24upx;
      }

      &:nth-child(3) {
        .num {
          color: #ef530e;
        }
      }
    }
  }
}
</style>
