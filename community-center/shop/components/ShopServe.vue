<template>
  <div class="shop-serve-container">
    <!-- 服务分类 start -->
    <scroll-view scroll-x="true" v-if="category && category.length">
      <view class="serve-list">
        <button
          @click="$emit('change', item.id, 1)"
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

    <!-- 服务列表 start -->
    <view class="serve-list-container" v-show="cdata.length">
      <view class="serve-pane" v-for="item in cdata" :key="item.id" @click="go('/community-center/shop/serve-detail?id=' + item.id + '&shopId=' + item.shopId)">
        <tui-lazyload-img class="serve-img" :src="item.goodsLogo || require('../../../static/images/new-user/fee.icon.png')"></tui-lazyload-img>
        <view class="serve-info">
          <view class="serve-name">{{ item.goodsName }}</view>
          <view class="serve-count">服务{{ item.serviceVolume || 0 }}次</view>
          <view class="price-text"> ￥<text class="price-num">{{ item.preferentialPrice && item.preferentialPrice < item.goodsPrice ? item.preferentialPrice : item.goodsPrice }}</text> </view>
        </view>
        <button class="uni-btn">预约</button>
      </view>
    </view>

    <view class="no-data" v-show="!cdata.length"> 商家暂无服务 ~ </view>
    <!-- 服务列表 end -->
  </div>
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
  },
  data() {
    return {
      currentCategoryId: 0
    };
  }
};
</script>

<style lang="less" scoped>
.shop-serve-container {
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

  .serve-list-container {
    .serve-pane {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22upx 0;
      width: 100%;
      box-sizing: border-box;

      &:nth-child(1) {
        padding-top: 0;
      }

      /deep/ .tui-lazyload__box {
        width: 140upx !important;
        height: 140upx !important;
        align-items: center;
        background-color: #f9f9f9 !important;
        margin-right: 27upx;
        border-radius: 14upx;
        overflow: hidden;
      }

      .serve-info {
        flex: 1;

        .serve-name {
          color: #222229;
          line-height: 44upx;
          font-size: 32upx;
          font-weight: 500;
          overflow: hidden;
          width: 380upx;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .serve-count {
          color: #9e9e9e;
          font-size: 24upx;
          margin: 8upx 0;
        }

        .price-text {
          font-weight: 500;
          color: #ff0000;

          .price-num {
            font-size: 44upx;
          }
        }
      }

      .uni-btn {
        border-radius: 8upx;
        background-color: #ef530e;
        color: #f5f5f7;
        font-size: 28upx;
        padding: 8upx 30upx;
        line-height: 1.5;
        margin-left: 20upx;
        transition: all 200ms;

        &:active {
          opacity: 0.8;
        }
      }
    }
  }

  .no-data{
    width: 100%;
    height: 400upx;
    color: #ccc;
    font-size: 28upx;
    letter-spacing: 0.7em;
    text-align: center;
    line-height: 400upx;
  }
}
</style>
