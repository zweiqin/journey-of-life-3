<template>
  <view class="hot-pane-wrapper">
    <view class="title-wrapper">
      <slot name="title"></slot>
      <view class="sub-title">{{ subTitle }}</view>
    </view>

    <view class="pane-content">
      <!-- <view class="item" @click="go('/pages/prod/prod?goodsId=' + goods.id)" v-for="goods in goodsData" :key="goods.id">
        <image :src="common.seamingImgUrl(goods.picUrl)" class="item-image"></image>
        <view class="price-wrapper">
          ￥<text class="price-text">
            {{ goods.counterPrice }}
          </text>
        </view>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
  props: {
    subTitle: {
      type: String,
      required: true
    },

    goodsData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.hot-pane-wrapper {
  width: 273upx;
  height: 250upx;
  flex-shrink: 0;
  border-radius: 20upx;
  background: linear-gradient(180deg, #FFF6D4 0%, #FFFFFF 60%);
  padding: 16upx 15upx 150upx 18upx;
  box-sizing: border-box;

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sub-title {
      transform: scale(0.9);
      font-size: 22upx;
      color: #979797;
    }
  }

  .pane-content {
    display: flex;
    align-items: center;
    width: 237upx;
    height: 164upx;
    margin-top: 13upx;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 117upx;
      height: 164upx;

      .item-image {
        width: 95upx;
        height: 98upx;
        flex-shrink: 0;
        margin-bottom: 5upx;
        border-radius: 10upx;
      }

      .price-wrapper {
        font-size: 24upx;
        color: #E24747;

        .price-text {
          font-size: 28upx;
          font-size: 500;
        }
      }
    }
  }
}
</style>