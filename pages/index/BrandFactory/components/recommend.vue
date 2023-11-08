<template>
  <view class="recommend-container">
    <!-- <line-title background="#fff" title="网红爆款"></line-title> -->

    <tui-divider :size="28" bold dividerColor="#3662ec" color="#3662ec" width="60%">网红爆款</tui-divider>
    <view class="goods-wrapper" v-if="hot.length">
      <goods
        isShowBrand
        v-for="item in hot"
        :key="item.id"
        :name="item.name"
        :sname="item.goodsSn"
        :price="item.counterPrice"
        :id="item.id"
        :url="item.picUrl"
        :payNumber="item.trafficVolume || 0"
      ></goods>
    </view>

    <view class="no-data">
      暂无爆款~
    </view>

    <!-- <line-title background="#fff" title="新品发布"></line-title> -->

    <tui-divider  :size="28" bold dividerColor="#3662ec" color="#3662ec" width="60%">新品发布</tui-divider>

    <view class="goods-wrapper" v-if="newGoods.length">
      <goods
        isShowBrand
        v-for="item in newGoods"
        :key="item.id"
        :name="item.name"
        :sname="item.goodsSn"
        :price="item.counterPrice"
        :id="item.id"
        :url="item.picUrl"
        :payNumber="item.trafficVolume || 0"
      ></goods>
    </view>

    <view class="no-data">
      暂无新品~
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

.no-data{
  height: 400upx;
  display: flex;
  margin-bottom: 40upx;
  align-items: center;
  justify-content: center;
  font-size: 28upx;
  color: #ccc;
}
</style>
