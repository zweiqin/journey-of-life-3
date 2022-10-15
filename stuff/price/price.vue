<template>
  <div>
    <view class="price">
      <view class="top-title">价格指数</view>
      <img
        src="../../static/images/stuff/chevron-states 2.png"
        alt=""
        class="fanhui"
        @click="handleBack"
      />
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
      <img src="../../static/images/stuff/直线2.png" alt="" class="zhixian0" />
      <img src="../../static/images/stuff/直线2.png" alt="" class="zhixian" />
      <img src="../../static/images/stuff/直线2.png" alt="" class="zhixian" />
      <img src="../../static/images/stuff/直线2.png" alt="" class="zhixian" />
      <img src="../../static/images/stuff/直线2.png" alt="" class="zhixian" />
      <img src="../../static/images/stuff/直线2.png" alt="" class="zhixian" />
      <img src="../../static/images/stuff/直线2.png" alt="" class="zhixian" />
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
  .top-title {
    padding-top: 72upx;
    padding-left: 310upx;
    font-size: 32upx;
    color: #3d3d3d;
  }
  .fanhui {
    position: absolute;
    top: 78upx;
    left: 40upx;
  }
  .search {
    position: absolute;
    top: 72upx;
    right: 34upx;
  }
  .title-list {
    display: flex;
    font-size: 20upx;
    .text1 {
      padding-top: 18upx;
      padding-left: 38upx;
      color: #3d3d3d;
    }
    .red {
      position: absolute;
      top: 142upx;
      left: 208upx;
      width: 24upx;
      height: 16upx;
      background: #fa5151;
    }
    .text2 {
      padding-top: 18upx;
      padding-left: 50upx;
      color: #3d3d3d;
    }
    .green {
      position: absolute;
      top: 142upx;
      left: 302upx;
      width: 24upx;
      height: 16upx;
      background: #00b578;
    }
    .text3 {
      padding-top: 18upx;
      padding-left: 44upx;
      color: #3d3d3d;
    }
    .blue {
      position: absolute;
      top: 142upx;
      left: 392upx;
      width: 24upx;
      height: 16upx;
      background: #3662ec;
    }
    .text4 {
      padding-top: 18upx;
      padding-left: 44upx;
      color: #3d3d3d;
    }
  }
  .zhixian0 {
    padding-top: 20upx;
    padding-left: 40upx;
  }
  .zhixian{
    padding-top: 60upx;
    padding-left: 40upx;
  }
}
</style>
