<template>
  <div>
    <view class="background">
      <view class="brand">品牌</view>
      <img
        src="../../static/images/stuff/家具材料排行榜.png"
        alt=""
        class="top-title"
      />
      <img
        src="../../static/images/stuff/lasttitle.png"
        alt=""
        class="lasttitle"
      />
      <img
        src="../../static/images/stuff/Vector7.png"
        alt=""
        class="fanhui"
        @click="handleBack"
      />
      <view class="background1">
        <view class="title-list">
          <view class="text">品牌</view>
          <view class="text">店铺</view>
          <view class="text">销量</view>
          <view class="text">最热</view>
          <view class="text">材料</view>
        </view>
        <view class="title">《家具板十大品牌》</view>
        <view class="fenlei">
          <view class="column1">序号</view>
          <view class="column2">品牌</view>
          <view class="column3">名称</view>
          <view class="column4">评分</view>
        </view>
        <img src="../../static/images/stuff/直线1.png" alt="" class="zhixian" />

        <view class="brand-list">
          <view class="brand-detail">
            <view class="xuhao">1</view>
            <img
              src="../../static/images/stuff/brand.png"
              alt=""
              class="pinpai"
            />
            <view class="name">壮象</view>
            <img src="../../static/images/stuff/star.png" alt="" class="star" />
          </view>
          <img
            src="../../static/images/stuff/直线1.png"
            alt=""
            class="zhixian1"
          />
        </view>

        <view class="title">《家具材料十大品牌》</view>
        <view class="fenlei">
          <view class="column1">序号</view>
          <view class="column2">品牌</view>
          <view class="column3">名称</view>
          <view class="column4">评分</view>
        </view>
        <img src="../../static/images/stuff/直线1.png" alt="" class="zhixian" />

        <view class="brand-list">
          <view class="brand-detail">
            <view class="xuhao">1</view>
            <img
              src="../../static/images/stuff/brand.png"
              alt=""
              class="pinpai"
            />
            <view class="name">壮象</view>
            <img src="../../static/images/stuff/star.png" alt="" class="star" />
          </view>
          <img
            src="../../static/images/stuff/直线1.png"
            alt=""
            class="zhixian1"
          />
        </view>
      </view>
    </view>
  </div>
</template>
<script>
export default {
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
.background {
  width: 750upx;
  height: 3324upx;
  border-radius: 30upx 30upx 0upx 0upx;
  background: #3662ec;
  .brand {
    padding-top: 74upx;
    padding-left: 342upx;
    font-size: 32upx;
    font-weight: 500;
    color: #ffffff;
  }
  .top-title {
    padding-top: 36upx;
    padding-left: 146upx;
  }
  .lasttitle {
    padding-left: 160upx;
  }
  .fanhui {
    position: absolute;
    top: 80upx;
    left: 40upx;
  }
  .background1 {
    position: absolute;
    top: 370upx;
    left: 24upx;
    width: 698upx;
    height: 2900upx;
    border-radius: 10px;
    background: #ffffff;

    .title-list {
      display: flex;
      padding-top: 48upx;
      .text {
        padding-left: 78upx;
        font-size: 24upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .title {
      padding-top: 28upx;
      padding-left: 242upx;
      font-size: 24upx;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }
    .fenlei {
      display: flex;
      font-size: 24upx;
      color: #3d3d3d;
      padding-top: 20upx;
      .column1 {
        padding-left: 78upx;
      }
      .column2 {
        padding-left: 68upx;
      }
      .column3 {
        padding-left: 154upx;
      }
      .column4 {
        padding-left: 128upx;
      }
    }
    .zhixian {
      padding-top: 14upx;
      padding-left: 40upx;
    }
    .brand-list {
      .brand-detail {
        display: flex;
        .xuhao {
          padding-top: 22upx;
          padding-left: 84upx;
          font-size: 24upx;
        }
        .pinpai {
          padding-left: 40upx;
        }
        .name {
          padding-top: 22upx;
          padding-left: 124upx;
          font-size: 24upx;
        }
        .star {
          padding-top: 26upx;
          padding-left: 88upx;
          width: 60.31px;
          height: 12px;
        }
      }
      .zhixian1 {
        padding-top: 14upx;
        padding-left: 40upx;
      }
    }
  }
}
</style>
