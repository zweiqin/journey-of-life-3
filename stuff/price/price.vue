<template>
  <div>
    <view class="price">
      <img
        src="../../static/images/stuff/chevron-states 2.png"
        alt=""
        class="fanhui"
        @click="handleBack"
      />
      <view class="top-title">价格指数</view>

      <img src="../../static/images/stuff/Vector4.png" alt="" class="search" />

      <view class="title-list">
        <view class="text1">价格浮动指数</view>
        <view class="red"></view>
        <view class="text2">昨日</view>
        <view class="green"></view>
        <view class="text3">今日</view>
        <view class="blue"></view>
        <view class="text4">整体增幅</view>
      </view>

      <view class="zhixian"></view>
      <view class="zhixian0"></view>
      <view class="zhixian0"></view>
      <view class="zhixian0"></view>
      <view class="zhixian0"></view>
      <view class="zhixian0"></view>
      <view class="zhixian0"></view>
      
    </view>
  </div>
</template>







<script>
export default {
  name: "Price",
  props: {},
  data() {
    return {};
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
  created() {},
};
</script>










<style lang="scss" scoped>
.price {
  width: 100%;

  .fanhui {
    position: absolute;
    margin-top: 66upx;
    margin-left: 20upx;
    margin-right: 0upx;
    width: 48upx;
    height: 48upx;
  }

  .top-title {
    margin-top: 72upx;
    text-align: center;
    font-size: 32upx;
    color: #3d3d3d;
  }

  .search {
    position: absolute;
    right: 34upx;
    margin-top: -50upx;
    width: 40upx;
    height: 40upx;
  }

  .title-list {
    display: flex;
    font-size: 20upx;
    margin-left: 38upx;
    justify-content: flex-start;
    .text1 {
      color: #3d3d3d;
      margin-right: 24upx;
      margin-top: 20upx;
    }
    .red {
      width: 24upx;
      height: 16upx;
      margin-right: 12upx;
      margin-top: 24upx;
      background: #fa5151;
    }
    .text2 {
      margin-right: 14upx;
      margin-top: 18upx;
      color: #3d3d3d;
    }
    .green {
      width: 24upx;
      height: 16upx;
      margin-right: 12upx;
      margin-top: 24upx;
      background: #00b578;
    }
    .text3 {
      margin-right: 12upx;
      margin-top: 18upx;
      color: #3d3d3d;
    }
    .blue {
      width: 24upx;
      height: 16upx;
      margin-right: 12upx;
      margin-top: 24upx;
      background: #3662ec;
    }
    .text4 {
      margin-top: 18upx;
      color: #3d3d3d;
    }
  }
  .zhixian {
    width: auto;
    height: 0upx;
    border: 1upx solid #d8d8d8;
    margin-top: 18upx;
    margin-left: 44upx;
    margin-right: 42upx;
  }
  .zhixian0{
    width: auto;
    height: 0upx;
    border: 1upx solid #d8d8d8;
    margin-top: 76upx;
    margin-left: 44upx;
    margin-right: 42upx;
  }
}
</style>
