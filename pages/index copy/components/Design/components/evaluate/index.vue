<template>
  <div class="evaluate-container">
    <view class="user-info flex-center">
      <img
        src="https://img0.baidu.com/it/u=3654907864,3437470714&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360"
        alt=""
        class="avatar"
      />
      <text class="name">李服</text>
    </view>

    <view class="flex-center rate">
      <Rate :rate="2"> </Rate>
      <view class="time">2022-08-15</view>
    </view>

    <view class="text">
      装修非常棒，是我喜欢的风格，强烈推荐这个设计公司。
    </view>

    <ImgPriview
      :imgs="[
        'https://img0.baidu.com/it/u=2013004764,1728721031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
        'https://img0.baidu.com/it/u=2013004764,1728721031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
        'https://img0.baidu.com/it/u=2013004764,1728721031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
        'https://img0.baidu.com/it/u=2013004764,1728721031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
        'https://img0.baidu.com/it/u=2013004764,1728721031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
        'https://img0.baidu.com/it/u=2013004764,1728721031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',
      ]"
      class="img-priview"
      :width="75"
      :span="4"
    ></ImgPriview>

    <view class="product-info font-10 gray-9">
      产品信息：室内设计 软装设计
    </view>

    <view class="answer r-10 b-c f-c-3d font-12">
      <view class="title">【店家回复】</view>
      <view class="value">感谢您的认可，好开心您能满意， 祝您生活愉快!!</view>
    </view>
  </div>
</template>

<script>
import Rate from "../../../../../../components/rate";
import ImgPriview from "../../../../../../components/img-priview";

export default {
  components: {
    ImgPriview,
    Rate,
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.evaluate-container {
  .user-info {
    .avatar {
      width: 48upx;
      height: 48upx;
      border-radius: 50%;
      margin-right: 16upx;
    }

    .name {
      color: #999999;
      font-size: 24upx;
    }
  }

  .rate {
    justify-content: space-between;
    margin: 26upx 0 12upx 0;
    .time {
      font-size: 20upx;
      color: #999999;
    }
  }

  .text {
    line-height: 1.5;
    font-size: 24upx;
  }

  .img-priview {
    margin-top: 20upx;
  }

  .answer {
    padding: 14upx 140upx 14upx 10upx;
    box-sizing: border-box;
    display: flex;
    margin-top: 22upx;

    .title{
      flex-shrink: 0;
      margin-right: 18upx;
    }
  }
}
</style>