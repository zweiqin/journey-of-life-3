<template>
  <view class="new-goods-pane-container" v-if="goods" @click="goGoodsDetsil(goods)">
    <view class="goods-logo">
      <view class="level-1  level"></view>
      <view class="level-2  level"></view>
      <view class="level-3 level"></view>
      <!-- background: `url(${common.seamingImgUrl(goods.image)})`, -->
      <tui-lazyload-img :style="{ filter: 'blur(10ox)' }" mode="aspectFit"
        :src="common.seamingImgUrl(goods.image)"></tui-lazyload-img>
    </view>

    <view class="goods-info">
      <view class="goods-name">{{ goods.productName }}</view>
      <view class="wrapper">
        <view class="price-wrapper">
          ￥<text class="price-text">{{ goods.price }}</text>
        </view>
        <view v-if="goods.voucherId != 0" class="is-suppot-voucher">可使用代金券抵扣{{ goods.voucherPrice }}元</view>
        <view v-else class="tags">
          <view class="tag">旗舰店</view>
          <view class="tag">官方正品</view>
        </view>
        <!-- <view v-else class="is-suppot-voucher" style="color: #888889;box-shadow: 0px 0px 0px 1rpx #888889;">不支持使用代金卷</view> -->
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
  },
  created() {
    // console.log(this.voucherJudgment(this.goods))
  },
  methods: {
    goGoodsDetsil(shopItem) {
      uni.navigateTo({
        //  url: `/pages/prod/prod?shopInfo=${JSON.stringify(this.goods)}&detailInfo=${JSON.stringify(this.voucherJudgment(this.goods))}`
        url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopItem.shopId}&productId=${shopItem.productId}&skuId=${shopItem.skuId}`
      });
    },
    /* getClassifyProducts2Api这个接口需要这个方法来判断是否支持使用代金卷
     * @param {Object, Array} Item 商品对象
     * @param {String} Item.skuId 商品id
     * @return {Boolean} 是否可使用代金券
     * 判断是否可使用代金券
     */
    voucherJudgment(Item) {
      if (!Item.map || Item.map.length <= 0) {
        return false
      }
      let returnData = null
      for(let Key in Item.map) {
        if(Item.map[Key].skuId == Item.skuId) returnData = Item.map[Key]
      }
      return returnData
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
      flex-wrap: wrap;
      margin-top: 8rpx;
      flex-direction: column;


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
        overflow: hidden;
        // white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        width: fit-content;
        // margin: 20rpx;
				max-width: 94%;
        max-height: 64rpx;
        // border: 1upx solid #e247478c;
        box-shadow: 0px 0px 0px 0.5px #e247478c;
        color: #E24747;
        font-size: 22upx;
        border-radius: 8upx;
        padding: 2upx 8upx;
      }

      .tags {
        display: flex;
        align-items: center;

        .tag {
          font-size: 20upx;
          color: #fa5151;
          line-height: 1.5;
          padding: 0 18upx;
          border: 1upx solid #fa5151;
          margin: 22upx 0 12upx 0;
          border-radius: 4upx;

          &:nth-child(1) {
            margin-right: 16upx;
          }
        }
      }

    }
  }
}
</style>