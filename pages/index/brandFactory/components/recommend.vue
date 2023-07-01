<template>
  <view class="recommend-container">
    <line-title background="#fff" title="网红爆款"></line-title>
    <view class="goods-wrapper">
      <goods
        isShowBrand
        v-for="item in hot"
        :key="item.id"
        :name="item.name"
        :sname="item.goodsSn"
        :price="item.retailPrice"
        :id="item.id"
        :url="item.picUrl"
        :payNumber="item.trafficVolume || 0"
      ></goods>
    </view>

    <line-title background="#fff" title="新品发布"></line-title>
    <view class="goods-wrapper">
      <goods
        isShowBrand
        v-for="item in newGoods"
        :key="item.id"
        :name="item.name"
        :sname="item.goodsSn"
        :price="item.retailPrice"
        :id="item.id"
        :url="item.picUrl"
        :payNumber="item.trafficVolume || 0"
      ></goods>
    </view>
  </view>
</template>

<script>
import Goods from '../../../../components/goods'
export default {
  props: {
    hot: {
      type: Array,
      required: true,
    },

    newGoods: {
      type: Array,
      required: true,
    },
  },

  components: { Goods },
}
</script>

<style lang="less" scoped>
.recommend-container {
  /deep/ .title {
    font-size: 32upx;
    color: #000;
    font-weight: 500;
  }

  .goods-wrapper {
    padding: 24upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20upx;
  }
}
</style>
