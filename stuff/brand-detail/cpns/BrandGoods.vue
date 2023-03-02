<template>
  <view class="brand-goods-container" @click="go('/pages/prod/prod?goodsId=' + data.id)" v-if="data">
    <image
      class="goods-img"
      :src="data.picUrl"
      mode=""
    />

    <view class="goods-info">
      <view class="goods-name"
        >{{data.name}}</view
      >

      <view class="price-watch">
        <view class="price-text"> ￥<text>{{ data.counterPrice }}</text> </view>
        <view class="watch-text">2.4k人浏览</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.brand-goods-container {
  width: 350upx;
  border-radius: 24upx;
  overflow: hidden;
  margin-bottom: 16upx;

  .goods-img {
    width: 100%;
    height: 348upx;
    display: block;
  }

  .goods-info {
    width: 100%;
    padding: 24upx;
    box-sizing: border-box;
    background-color: #fff;

    .goods-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 300upx;
      font-size: 28upx;
    }

    .price-watch{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16upx;

      .price-text{
        font-weight: bold;
        color: #141000;
        font-size: 26upx;
        text{
          font-size: 36upx;
        }
      }

      .watch-text{
        font-size: 22upx;
        color: #8F8D85;
      }
    }
  }
}
</style>
