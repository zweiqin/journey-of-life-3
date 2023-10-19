<template>
  <view class="serve-shop-container">
    <view class="bar" @click="go('/community-center/shop/shop')">
      <image class="bar-img" src="../../../static/images/new-community/home/ad-bar-1.png"></image>
    </view>

    <view class="shop-list">
      <view class="content">
        <!-- <DirectSaleStore :shopInfo="shopList[0]"></DirectSaleStore> -->
        <CommonShop v-for="(shopData, index) in shopList" :shopInfo="shopData" :key="index"></CommonShop>
        <view class="more" @click="go('/community-center/makeSmallFortune/index')">
          <button class="uni-btn">
            查看更多
            <tui-icon :size="18" name="arrowright"></tui-icon>
          </button>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import DirectSaleStore from './DirectSaleStore.vue';
import CommonShop from './CommonShop.vue';
import { getNearByShopListApi } from '../../../api/community-center';
import { getCurrentLocation } from '../../../utils';

export default {
  components: { DirectSaleStore, CommonShop },
  mounted() {
    this.getNearByShopList();
  },

  data() {
    return {
      shopList: []
    };
  },

  methods: {
    async getNearByShopList() {
      try {
        const currentAddress = await getCurrentLocation();
        const res = await getNearByShopListApi({
          pageNo: 1,
          pageSize: 5,
          address: currentAddress.toString()
        });

        if (res.statusCode === 20000) {
          this.shopList = res.data.data;
        } else {
          this.ttoast({
            type: 'fail',
            title: '附近商家获取失败',
            content: res.statusMsg
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: error || '未知错误'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.serve-shop-container {
  width: 100%;

  .bar {
    height: 257upx;
    background-color: #fffbf4;

    .bar-img {
      width: 100%;
      height: 100%;
    }
  }

  .shop-list {
    margin-top: -114upx;
    padding: 38upx 30upx;
    box-sizing: border-box;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 20upx;
      background-color: #fff;
      padding: 38upx 0;
      box-sizing: border-box;
      z-index: 10;
    }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24upx;

    .uni-btn {
      display: flex;
      align-items: center;
      font-size: 24upx;
      color: #9e9e9e;
    }
  }
}
</style>
