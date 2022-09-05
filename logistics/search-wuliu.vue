<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">查找物流</view>
    </view>

    <view class="main" v-if="false">
      <view class="item">
        <img class="img" src="../static/temp/矩形 179.png" alt="" />
        <view class="info">
          <view class="name">顺吉平物流</view>
          <view class="address"
            >地 址:广东省佛山市顺德区乐从镇 富饶物流园E座6-7仓</view
          >
        </view>
      </view>

      <view class="item">
        <img class="img" src="../static/temp/矩形 179.png" alt="" />
        <view class="info">
          <view class="name">顺吉平物流</view>
          <view class="address"
            >地 址:广东省佛山市顺德区乐从镇 富饶物流园E座6-7仓</view
          >
        </view>
      </view>

      <view class="item">
        <img class="img" src="../static/temp/矩形 179.png" alt="" />
        <view class="info">
          <view class="name">顺吉平物流</view>
          <view class="address"
            >地 址:广东省佛山市顺德区乐从镇 富饶物流园E座6-7仓</view
          >
        </view>
      </view>

      <view class="item">
        <img class="img" src="../static/temp/矩形 179.png" alt="" />
        <view class="info">
          <view class="name">顺吉平物流</view>
          <view class="address"
            >地 址:广东省佛山市顺德区乐从镇 富饶物流园E座6-7仓</view
          >
        </view>
      </view>

      <view class="item">
        <img class="img" src="../static/temp/矩形 179.png" alt="" />
        <view class="info">
          <view class="name">顺吉平物流</view>
          <view class="address"
            >地 址:广东省佛山市顺德区乐从镇 富饶物流园E座6-7仓</view
          >
        </view>
      </view>
    </view>

    <view class="no-data"> 未搜到该线路的物流公司 </view>
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
  background: linear-gradient(180deg, #07b9b9 0%, #ffffff 100%);
  padding: 60upx 24upx;
  box-sizing: border-box;
  height: 100vh;

  .header {
    display: flex;
    align-items: center;

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

  .main {
    padding: 32upx 10upx;
    border-radius: 20upx;
    background-color: #fff;
    margin-top: 26upx;
    height: 100%;

    .item {
      display: flex;
      margin-top: 36upx;

      .img {
        width: 244upx;
        height: 110upx;
      }

      .info {
        display: flex;
        flex-direction: column;
        margin: 0 38upx;

        .name {
          color: #3d3d3d;
          font-size: 28upx;
          font-weight: bold;
        }

        .address {
          font-size: 24upx;
        }
      }
    }
  }

  .no-data{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 40upx;
    background-color: #fff;
    padding: 40upx;
    box-sizing: border-box;
    border-radius: 30upx;
    color: gray;
    letter-spacing: 4upx;

  }
}
</style>