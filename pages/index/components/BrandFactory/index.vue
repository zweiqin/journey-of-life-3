<template>
  <div>
    <view class="banner">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img src="../../../../static/images/index/banner1.webp" alt="" />
        </swiper-item>
        <swiper-item>
          <img src="../../../../static/images/index/banner1.webp" alt="" />
        </swiper-item>
        <swiper-item>
          <img src="../../../../static/images/index/banner1.webp" alt="" />
        </swiper-item>
      </swiper>
    </view>

    <view class="navs">
      <view class="item">综合排序</view>
      <view class="item">销售为先</view>
      <view class="item">信用</view>
      <view class="item">品类</view>
      <view class="item">
        筛选
        <img
          class="img"
          src="../../../../static/images/index/screen.png"
          alt=""
        />
      </view>
    </view>

    <Panel></Panel>
    <Panel1></Panel1>
    <Panel2></Panel2>
  </div>
</template>

<script>
import Panel from "./components/Panel";
import Panel1 from "./components/Panel1";
import Panel2 from "./components/Panel2";

export default {
  data(){
    return{
    }
  },
  components: {
    Panel,
    Panel1,
    Panel2,

  },

  methods:{

  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 284upx;
  border-radius: 20upx;
  overflow: hidden;
  margin-top: 28upx;
  border: 1upx solid #999999;

  .swiper {
    width: 100%;
    height: 284upx;

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
      height: 284upx;
    }
  }
}

.navs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20upx 0 34upx 0;

  .item {
    .img {
      width: 26upx;
      margin-left: 4upx;
      vertical-align: -4rpx;
    }
  }
}
</style>