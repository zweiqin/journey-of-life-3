<template>
  <view class="activity-package-container">
    <view class="vip-399" @click="go('/community-center/vip-center/vip-detail?type=2')">
      <view class="tag-title">
        家庭小卫士
      </view>

      <view class="content-wrapper">
        <view class="price-wrapper">
          仅需：<text class="price-text">399</text>元
        </view>

        <view class="tip">
          送980元超级大礼包
        </view>
      </view>

      <view class="gift-wrapper">
        <image src="../../../static/images/new-business/home/vip-gift.png" class="gift-img"></image>
        <button class="uni-btn">立即抢购</button>

        <image class="line-1" src="../../../static/images/new-business/home/line-1.png">
        </image>
        <image class="line-2" src="../../../static/images/new-business/home/line-2.png">
        </image>
        <image class="line-3" src="../../../static/images/new-business/home/line-3.png"></image>
        <image class="line-4" src="../../../static/images/new-business/home/line-4.png"></image>
        <image class="line-5" src="../../../static/images/new-business/home/line-5.png"></image>
      </view>
    </view>

    <view class="right-container">
      <view class="right-item" @click="empty()">
        <view class="item-title">充话费享折扣</view>
        <image class="zhe" src="../../../static/images/new-business/home/zhe.png"></image>
        <view class="button-wrapper">
          <button class="item-btn uni-btn">立即体验</button>
          <image class="bao" src="../../../static/images/new-business/home/bao.png"></image>
        </view>
      </view>

      <view class="right-item oli" @click="empty()">
        <view class="title-wrapper">
          <view class="title">加油券</view>
          <view class="count">100+领取</view>
        </view>
        <image src="../../../static//images//new-business/home/car.png" class="car"></image>
        <image src="../../../static//images//new-business/home/cao.png" class="cao"></image>
        <view class="button-wrapper">
          <button class="item-btn uni-btn">立即体验</button>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
export default {
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.activity-package-container {
  height: 517upx;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item-btn {
    width: 153upx;
    height: 43upx;
    border-radius: 100px;
    border: 2upx solid #EF530E;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #EF530E;
    font-size: 24upx;
  }

  .vip-399 {
    position: relative;
    height: 517upx;
    width: 355upx;
    background: radial-gradient(131% 131% at 50% 45%, #FF6A6A 0%, #EF5612 31%);
    border-radius: 20upx;
    overflow: hidden;

    .tag-title {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      font-size: 32upx;
      color: #fff;
      font-weight: bold;
      width: 226upx;
      height: 66upx;
      border: 2upx solid #FFFFFF;
      box-sizing: border-box;
      background-color: #2B7FF3;
      border-radius: 0 0 20upx 20upx;
    }

    .content-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      position: absolute;
      top: 68upx;
      left: 0;
      right: 0;
      font-size: 32upx;
      color: #fff;
      font-weight: bold;

      .price-text {
        font-size: 60upx;
      }
    }

    .gift-wrapper {
      position: relative;

      .line-1 {
        position: absolute;
        bottom: -450upx;
        left: 36upx;
      }

      .line-2 {
        position: absolute;
        bottom: -554upx;
        left: 64upx;
      }

      .line-3 {
        position: absolute;
        bottom: -692upx;
        left: 64upx;
      }

      .line-4 {
        position: absolute;
        bottom: -384upx;
        left: -360upx;
      }

      .line-5 {
        position: absolute;
        bottom: -554upx;
        left: -360upx;
      }

      .gift-img {
        position: absolute;
        width: 317.13upx;
        height: 400upx;
        bottom: -604upx;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
      }

      .uni-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -494upx;
        width: 318upx;
        height: 70upx;
        border-radius: 100px;
        box-sizing: border-box;
        border: #FB4407 2upx solid;
        box-shadow: 0px 0px 20px 0px rgba(62, 5, 5, 0.5), inset 0px 0px 20px 0px #FFFFFF;
        background: linear-gradient(181deg, #FFFFFF -20%, #FFFFFF -20%, #F8A435 146%);
        font-size: 32upx;
        color: #87361B;
        font-weight: bold;
        z-index: 1;
      }
    }


  }

  .right-container {
    height: 517upx;
    width: 316upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .right-item {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 28upx 23upx;
      box-sizing: border-box;
      position: relative;
      width: 316upx;
      height: 248upx;
      background: linear-gradient(180deg, #FCE8B4 0%, #FFFFFF 45%);
      border-radius: 20upx;
      overflow: hidden;



      .zhe {
        position: absolute;
        right: -28upx;
        bottom: -40upx;
        width: 184upx;
        height: 227upx;


      }

      .item-title {
        color: #222229;
        font-size: 32upx;
        font-weight: 500;
      }

      .button-wrapper {
        position: relative;

        .bao {
          width: 153.86upx;
          height: 84.94upx;
          position: absolute;
          top: -84upx;
          left: 10upx;
        }
      }
    }

    .oli {
      background: linear-gradient(180deg, #FCDECC 0%, #FFFFFF 52%);

      .car {
        position: absolute;
        width: 257.34upx;
        height: 172.58upx;
        top: 57upx;
        right: -96upx;
      }

      .cao {
        position: absolute;
        width: 191upx;
        height: 84upx;
        top: 94upx;
        left: -20upx;
      }

      .title-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #222229;


        .title {
          font-size: 32upx;
          font-weight: 500;
        }

        .count {
          font-size: 24upx;
        }
      }
    }
  }
}
</style>