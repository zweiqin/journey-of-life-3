<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <view class="banner">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img
            src="https://img0.baidu.com/it/u=3773662411,3569512847&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=1035"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://img0.baidu.com/it/u=3773662411,3569512847&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=1035"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://img0.baidu.com/it/u=3773662411,3569512847&fm=253&fmt=auto&app=120&f=JPEG?w=690&h=1035"
            alt=""
          />
        </swiper-item>
      </swiper>
    </view>

    <!-- 网红爆款 -->
    <view class="popular-online">
      <view class="header">
        <view class="main-title">网红爆款</view>
        <view class="sub-title">Internet celebrity hot style</view>
      </view>

      <view class="wrapper">
        <view class="left">
          <img
            src="https://img1.baidu.com/it/u=312925832,1369195926&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
            alt=""
          />
          <img
            src="https://img1.baidu.com/it/u=1922047720,1066257576&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
        </view>
        <view class="right">
          <img
            src="https://img1.baidu.com/it/u=1922047720,1066257576&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
          <img
            src="https://img1.baidu.com/it/u=312925832,1369195926&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
            alt=""
          />
        </view>
      </view>
    </view>

    <!-- 其他 -->
    <RecommendPanel style="margin-top: 20px"></RecommendPanel>
    <RecommendPanel1 :newType="false" style="margin-top: 20px"></RecommendPanel1>
  </div>
</template>

<script>
import RecommendPanel from "../recommend-panel/index.vue";
import RecommendPanel1 from "../recommend-panel/index1.vue";

export default {
  components: {
    RecommendPanel,
    RecommendPanel1,

  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.recommend {
  .banner {
    width: 100%;
    height: 800upx;
    border-radius: 20upx;
    overflow: hidden;
    margin-top: 28upx;

    .swiper {
      width: 100%;
      height: 800upx;

      /deep/ .uni-swiper-dot-active {
        border-radius: 0;
        width: 40upx !important;
      }

      /deep/ .uni-swiper-dot {
        border-radius: 0px;
        height: 4upx;
        width: 4upx;
        margin-right: 6upx;
      }

      img {
        width: 100%;
        height: 800upx;
      }
    }
  }

  .popular-online {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #3d3d3d;
      margin: 52upx 0 20upx 0;

      .main-title {
        position: relative;
        font-size: 28upx;
        font-weight: bold;
        font-size: 28upx;

        &::after {
          position: absolute;
          top: 50%;
          right: -85%;
          transform: translateY(-50%);
          content: "";
          width: 80upx;
          height: 2upx;
          background-color: #3d3d3d;
        }

        &::before {
          position: absolute;
          top: 50%;
          left: -100upx;
          transform: translateY(-50%);
          content: "";
          width: 80upx;
          height: 2upx;
          background-color: #3d3d3d;
        }
      }

      .sub-title {
        color: #3d3d3d;
        font-size: 18upx;
        transform: scale(0.8);
      }
    }

    .wrapper {
      width: 100%;
      height: 606upx;
      display: flex;
      justify-content: space-between;

      .left,
      .right {
        width: 324upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>