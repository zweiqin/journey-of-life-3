<template>
  <view class="voucher-detail-goods-pane" v-if="goodsInfo" @click="go('/pages/prod/prod?goodsId=' + goodsInfo.id)">
    <tui-lazyload-img :style="{ background: `url(${goodsInfo.picUrl})` }" mode="aspectFit"
      :src="goodsInfo.picUrl"></tui-lazyload-img>

    <view class="goods-info">
      <view class="goods-name">{{ goodsInfo.name }}</view>
      <view class="preice-wrapper">
        <view class="current-price">￥{{ goodsInfo.counterPrice }}</view>
        <!-- <view class="origin-price">￥123</view> -->
      </view>
      <view class="tag-wrapper">
        <view class="tag-text">券</view>
        <view class="tag-price">{{ goodsInfo.voucherAmount || 0 }}</view>
      </view>
      <view class="footer">
        <view class="shop-name">团蜂科技</view>
        <view class="salsed">{{ goodsInfo.sales }}人购买</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goodsInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.voucher-detail-goods-pane {
  padding: 14upx 23upx 14upx 14upx;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 20upx;
  margin-bottom: 24upx;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .goods-info {
    flex: 1;

    .goods-name {
      color: #222229;
      font-size: 28upx;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-bottom: 24upx;
    }

    .preice-wrapper {
      display: flex;
      align-items: flex-end;
      font-size: 24upx;
      color: #979797;

      .current-price {
        color: #E24747;
        font-size: 32upx;
        font-weight: 500;
        margin-right: 12upx;
      }
    }

    .tag-wrapper {
      display: flex;
      align-items: center;
      width: 127upx;
      height: 34upx;
      border: 1upx solid #E24747;
      box-sizing: border-box;
      margin: 12upx 0 15upx 0;

      .tag-text {
        width: 42upx;
        height: 100%;
        text-align: center;
        line-height: 30upx;
        font-size: 24upx;
        background-color: #E24747;
        color: #fff;
      }

      .tag-price {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24upx;
        color: #E24747;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #888889;
      font-size: 20upx;
    }
  }
}

/deep/ .tui-lazyload__box {
  position: relative;
  width: 219upx !important;
  height: 220upx !important;
  border-radius: 20upx !important;
  overflow: hidden;
  z-index: 10;
  margin-right: 19upx;

  .tui-lazyload__img {
    width: 219upx !important;
    height: 220upx !important;
  }
}
</style>