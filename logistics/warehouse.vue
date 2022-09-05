<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">落货点列表</view>
    </view>

    <view class="list">
      <view class="item">
        <view class="name">万马奔腾物流</view>
        <view class="text">联系人：宋绍循</view>
        <view class="text"
          >地 址：广东省佛山市顺德区乐从镇富饶物流园E座6-7仓</view
        >
      </view>

      <view class="item">
        <view class="name">万马奔腾物流</view>
        <view class="text">联系人：宋绍循</view>
        <view class="text"
          >地 址：广东省佛山市顺德区乐从镇富饶物流园E座6-7仓</view
        >
      </view>

      <view class="item">
        <view class="name">万马奔腾物流</view>
        <view class="text">联系人：宋绍循</view>
        <view class="text"
          >地 址：广东省佛山市顺德区乐从镇富饶物流园E座6-7仓</view
        >
      </view>

      <view class="item">
        <view class="name">万马奔腾物流</view>
        <view class="text">联系人：宋绍循</view>
        <view class="text"
          >地 址：广东省佛山市顺德区乐从镇富饶物流园E座6-7仓</view
        >
      </view>
    </view>
  </view>
</template>



<script>
export default {
  methods: {
    back() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  .text {
    color: #3d3d3d;
    font-size: 24upx;
    line-height: 40upx;
  }

  .header {
    display: flex;
    align-items: center;
    background-color: #3662ec;
    padding: 60upx 24upx 40upx;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }

  .list {
    padding: 20upx 56upx;

    .item {
      padding: 40upx 0;
      border-bottom: 1upx solid #d8d8d8;

      .name {
        font-size: 28upx;
        margin-bottom: 20upx;
      }
    }
  }
}
</style>