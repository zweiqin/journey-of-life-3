<template>
  <view class="shop-goods-container">
    <!-- 服务分类 start -->
    <scroll-view scroll-x="true" v-if="category && category.length">
      <view class="serve-list">
        <button
          @click="$emit('change', item.id, 2)"
          class="uni-btn"
          :class="{ active: item.id === current }"
          v-for="item in category"
          :key="item.goodsTypeName"
        >
          {{ item.goodsTypeName }}
        </button>
      </view>
    </scroll-view>
    <!-- 服务分类 end -->

    <view class="shop-goods">
      <view class="goods-pane" @click="go('/community-center/shop/goods-detail?id=' + item.id + '&shopId=' + item.shopId)" v-for="item in cdata" :key="item.id">
        <view class="goods-img">
          <tui-lazyload-img :src="item.goodsLogo"></tui-lazyload-img>
        </view>

        <view class="goods-info">
          <view class="goods-name">{{ item.goodsName }}</view>
          <view class="price-wrapper">
            ￥
            <text class="price-num"> {{ item.preferentialPrice && item.preferentialPrice < item.goodsPrice ? item.preferentialPrice : item.goodsPrice }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="no-data" v-show="!cdata.length"> 暂无商品上架 ~ </view>
  </view>
</template>

<script>
export default {
  props: {
    category: Array,
    current: {
      type: Number,
      default: -1
    },
    cdata: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
.serve-list {
  display: flex;
  white-space: nowrap;
  margin: 20upx 0;

  .uni-btn {
    color: #9e9e9e;
    font-size: 24upx;
    flex-shrink: 0;
    border-radius: 0;
    margin-right: 38upx;
    line-height: 1.5;
    transition: all 350ms;
    border-radius: 8upx;
    padding: 5upx 11upx;

    &.active {
      background-color: #fff5e5;
      color: #ef530e;
    }
  }
}
.shop-goods {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .goods-pane {
    margin-top: 32upx;
    /deep/ .tui-lazyload__box {
      width: 316upx !important;
      height: 310upx !important;
      align-items: center;
      background-color: #f9f9f9 !important;
      overflow: hidden;
    }

    .goods-info {
      padding: 30upx 20upx;
      box-sizing: border-box;
      width: 284upx;
      box-sizing: border-box;

      .goods-name {
        color: #101010;
        font-size: 28upx;
        width: 274upx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10upx;
        line-height: 1.5;
        margin-right: 0;
      }

      .price-wrapper {
        color: #ff0000;
        font-size: 24upx;

        .price-num {
          font-size: 32upx;
          font-weight: 7000;
        }
      }
    }
  }
}
.no-data {
  width: 100%;
  height: 400upx;
  color: #ccc;
  font-size: 28upx;
  letter-spacing: 0.7em;
  text-align: center;
  line-height: 400upx;
}
</style>
