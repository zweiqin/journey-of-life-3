<template>
  <view class="new-goods-pane-container" v-if="goods" @click="go('/pages/prod/prod?goodsId=' + goods.id)">
    <view class="goods-logo">
      <view class="level-1  level"></view>
      <view class="level-2  level"></view>
      <view class="level-3 level"></view>
      <tui-lazyload-img :style="{ background: `url(${common.seamingImgUrl(goods.picUrl)})`, filter: 'blur(10ox)' }" mode="aspectFit"
        :src="common.seamingImgUrl(goods.picUrl)"></tui-lazyload-img>
    </view>

    <view class="goods-info">
      <view class="goods-name">{{ goods.name }}</view>
      <view class="wrapper">
        <view class="price-wrapper">
          ￥<text class="price-text">{{ goods.counterPrice }}</text>
        </view>
        <view v-if="goods.supportVoucher" class="is-suppot-voucher">可使用{{ Math.ceil(Number(goods.counterPrice)) }}代金券抵扣</view>
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

<style lang="less" scoped>
.new-goods-pane-container {
  // height: 540upx;
  width: 333upx;
  background-color: #fff;
  margin-bottom: 23upx;
  border-radius: 20upx;
  // overflow: hidden;

  .goods-logo {
    position: relative;
    width: 333upx;
    height: 374upx;
    overflow: hidden;


    .level-1 {
      width: 258upx;
      height: 100%;
      background-color: #d0d0d01a;
      border-radius: 20upx;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }

    .level-2 {
      width: 285upx;
      height: 100%;
      background-color: #E1E2E5;
      border-radius: 20upx;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 4upx;
      z-index: 2;
    }


    .level-3 {
      width: 306upx;
      height: 100%;
      background-color: #F0F0F0;
      border-radius: 20upx;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 6upx;
      z-index: 3;
    }



  }

  /deep/ .tui-lazyload__box {
    position: relative;
    width: 333upx !important;
    height: 358upx !important;
    border-radius: 20upx !important;
    overflow: hidden;
    z-index: 10;
  }

  .goods-info {
    padding: 20upx 22upx 18upx;
    box-sizing: border-box;

    .goods-name {
      font-size: 32upx;
      // font-weight: 500;
      color: #222229;
      width: 288upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .wrapper {
      display: flex;
      align-items: center;
			flex-wrap: wrap;
      margin-top: 8upx;


      .price-wrapper {
        font-size: 22upx;
        color: #E24747;
        margin-right: 12upx;

        .price-text {
          font-size: 38upx;
          font-weight: 500;
        }
      }

      .is-suppot-voucher {
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        // margin: 20rpx;
				width: fit-content;
        // border: 1upx solid #e247478c;
        box-shadow: 0px 0px 0px 0.5px #e247478c;
        color: #E24747;
        font-size: 22upx;
        border-radius: 8upx;
        padding: 2upx 8upx;
      }

    }
  }
}
</style>