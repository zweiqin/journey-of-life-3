<template>
  <view class="brand-goods-container">
    <view class="brnad-goods-header">
      <view class="title">工厂店</view>
      <view class="count-wraoper" @click="$emit('changeTab', 1)">
        共{{ totalCount }}件商品
        <image class="arrow" src="../../../../static/images/new-index/brandFactory/right-arrow.png"></image>
      </view>
    </view>

    <view class="goods-list">
      <scroll-view scroll-x v-if="topGoods.length">
        <view class="goods-list-wrapper">

          <view class="goods-item" v-for="item in topGoods" :key="item.id"
            @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}6&productId=${item.productId}&skuId=${item.skuId}`)">
            <image class="goods-img" :src="item.image"></image>
            <view class="salsed-price">￥{{ item.price }}</view>
            <view class="salsed-count">已售100+</view>
          </view>
        </view>
      </scroll-view>

      <scroll-view scroll-x style="margin-top: 40upx;" v-if="bottomGoods.length">
        <view class="goods-list-wrapper">
          <view class="goods-item" v-for="item in bottomGoods" :key="item.id"
            @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}6&productId=${item.productId}&skuId=${item.skuId}`)">
            <image class="goods-img" :src="item.image"></image>
            <view class="salsed-price">￥{{ item.price }}</view>
            <view class="salsed-count">已售100+</view>
          </view>
        </view>
      </scroll-view>

      <view class="no-date" v-if="!topGoods.length" style="font-size: 24upx; color: #ccc; text-align: center;">
        暂无商品~
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    topGoods: {
      type: Array,
      default: () => []
    },

    bottomGoods: {
      type: Array,
      default: () => []
    },

    totalCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.brand-goods-container {
  // padding: 36upx 0 40upx 30upx;
  // box-sizing: border-box;
  background-color: #fff;
  border-radius: 20upx;
  padding-bottom: 40upx;

  .brnad-goods-header {
    width: 100%;
    padding: 36upx 30upx 40upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32upx;
    font-weight: 500;


    .count-wraoper {
      display: flex;
      align-items: center;
      font-size: 26upx;
      color: #888889;


      .arrow {
        width: 20upx;
        height: 20upx;
        flex-shrink: 0;
      }
    }
  }

  .goods-list {
    margin-left: 30upx;

    .goods-list-wrapper {
      display: flex;
      align-items: center;
      white-space: nowrap;


      .goods-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-right: 14upx;

        .goods-img {
          width: 190upx;
          height: 224upx;
          flex-shrink: 0;
          border-radius: 8upx;
        }


        .salsed-price {
          font-size: 28upx;
          color: #E02208;
          margin-top: 24upx;
          margin-bottom: 13upx;
        }



        .salsed-count {
          font-size: 24upx;
          color: #888889;
        }
      }
    }
  }
}
</style>