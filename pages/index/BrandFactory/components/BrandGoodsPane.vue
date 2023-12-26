<template>
  <view class="brand-goods-pane" v-if="goods"
    @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${goods.shopId}&productId=${goods.productId}&skuId=${goods.skuId}`)">
    <image class="brand-goods-img" :src="goods.image">
    </image>

    <view class="detail-info">
      <view class="goods-name">{{ goods.productName }}</view>
      <view class="tags">
        <view class="item">品牌家居</view>
        <view class="item">质量保证</view>
      </view>

      <view class="price-text">
        <text class="icon">￥</text>
        {{ goods.price }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-goods-pane {
  width: 266upx;
  height: 456upx;
  margin-bottom: 24upx;

  .brand-goods-img {
    width: 266upx;
    height: 266upx;
    border-radius: 8upx;
    background-color: #f3f3f3;
  }

  .detail-info {
    .goods-name {
      font-size: 26upx;
      color: #000;
      line-height: 1.5;
      margin: 10upx 0;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .tags {
      display: flex;
      align-items: center;

      .item {
        font-size: 16upx;
        color: #000;
        padding: 3upx 9upx;
        line-height: 1.5;
        border: 0.8upx solid #868686;
        border-radius: 4.8upx;
        margin-right: 9.8upx
      }
    }

    .price-text {
      color: #E02208;
      font-size: 32upx;
      font-weight: 500;
      margin-top: 11upx;

      .icon {
        font-size: 24upx;
      }
    }
  }
}
</style>