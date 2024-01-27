<template>
  <view class="vip-package-container" :class="{ active: isStart }">
    <!-- 限时钜惠 -->
    <!-- <view v-if="XIAN && XIAN.name" class="package package-1"
      @click="go('/community-center/vip-center/vip-detail?type=1')">
      <view class="package-title"> {{ XIAN.name }} </view>

      <view class="content">
        <view class="title-1">清凉套餐仅需<text class="vip-price">{{ XIAN.price }}</text></view>
        <view class="title-2">多项套餐选择</view>
      </view>

      <button class="uni-btn">立省300</button>

      <image class="gift" src="../../../static/images/new-community/home/gift.png"></image>
      <image class="left-package" src="../../../static/images/new-community/home/left-package.png"></image>
      <image class="right-top" src="../../../static/images/new-community/home/right-top.png"></image>
      <image class="money" src="../../../static/images/new-community/home/money.png"></image>
      <image class="bi-1" src="../../../static/images/new-community/home/bi-1.png"></image>
      <image class="bottom-right" src="../../../static/images/new-community/home/bottom-right.png"></image>
    </view> -->

    <view class="package package-1" @click="handleToOrder">
      <view style="background: linear-gradient(270deg, #1648D5 -3%, #2B45D9 112%);" class="package-title"> 企业服务 </view>
      <view class="content">
        <view class="title-1">家具工厂<text class="vip-price">{{ XIAN.price }}</text></view>
        <view class="title-2">维修专项入口</view>
      </view>
      <button class="uni-btn">立即申请</button>
    </view>

    <!-- <view v-else class="package package-1" @click="
      go(
        '/community-center/community-detail?id=357&serverNameThree=洗衣机清洗服务&serverImageUrl=https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2F0ambqkerlcm244oyheu9.png,https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2Fqe5otzuj908ndz5mo0iw.png,https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2Fush1q9ne9d4ob28dt0b9.png,https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2Frg4tzjcv9clnokxa7wew.pngg'
      )
      ">
      <view class="package-title"> 限时钜惠 </view>

      <view class="content">
        <view class="title-1">洗衣机清洗服务</view>
        <view class="title-1"><text class="vip-price">￥98/台起</text></view>
      </view>

      <button class="uni-btn">立即抢购</button>
      <image class="gift" src="../../../static/images/new-community/home/gift.png"></image>
      <image class="left-package" src="../../../static/images/new-community/home/left-package.png"></image>
      <image class="right-top" src="../../../static/images/new-community/home/right-top.png"></image>
      <image class="money" src="../../../static/images/new-community/home/money.png"></image>
      <image class="bi-1" src="../../../static/images/new-community/home/bi-1.png"></image>
      <image class="bottom-right" src="../../../static/images/new-community/home/bottom-right.png"></image>
    </view> -->

    <view class="other-package">

      <!-- 399会员 -->
      <!-- <view class="package whole-package" @click="go('/community-center/vip-center/vip-detail?type=2')">
        <view class="package-title"> 家庭小卫士 </view>
        <view class="title"><text class="vip-price">399</text>全年套餐</view>
        <button class="uni-btn">立省1500</button>

        <image class="li" src="../../../static/images/new-community/home/li.png"></image>
        <image class="king" src="../../../static/images/new-community/home/king.png"></image> 
      </view>-->

      <!-- 499会员 -->
      <view class="package whole-package v-499" @click="$emit('view499')"></view>

      <!-- <view class="package ilo-package" @click="empty()">
        <view class="package-title"> 加油劵 </view>
        <view class="content">
          <view>加油</view>
          <view class="title-2">立省</view>
          <view class="arrow-container">
            <image class="arrow" src="../../../static/images/new-community/home/arrow.png"></image>
          </view>
        </view>
        <button class="uni-btn">立即体验</button>

        <image class="car" src="../../../static/images/new-community/home/car.png"></image>
        <image class="car car-2" src="../../../static/images/new-community/home/car.png"></image>
      </view> -->

      <view class="package ilo-package server"
        @click="go('/community-center/community-detail?id=313&serverNameThree=空调清洗服务&serverImageUrl=https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2F5ub5gxq8btzj41dyewdk.png,https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2Fcbcl11hwac3imq3pm9bc.png,https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2Fk2y9voxtnik637lqk059.png,https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2F9clf6yvvfnwf9ltbh0p6.png')">
        <!-- <view class="package-title"
          style="position: relative; z-index: 10; background: linear-gradient(270deg, #178AF8 0%, #1175FC 97%);"> 限时钜惠
        </view>

        <view class="title" style="color: #222229; font-size: 24upx; margin-left: 20upx; margin-top: 7upx;">空调清洗仅需<text
            style="font-size: 32upx; font-weight: 500; color: #E02208;">58</text></view>

        <button
          style="z-index: 10; background-color: #fff; color: #1175FC; font-size:22upx; border: none; border:1upx solid #1175FC;"
          class="uni-btn">立即下单</button> -->
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
      @click="_handleClickTuiModel($event, 'login', '')"></tui-modal>
  </view>
</template>

<script>
import showModal from "../../../mixin/showModal.js";

export default {
  props: {
    scrollTop: {
      type: Number,
      default: 0
    }
  },

  mixins: [showModal()],

  data() {
    return {
      isStart: false
    };
  },

  computed: {
    carDistance() {
      return this.scrollTop / 5;
    }
  },

  mounted() {
    setTimeout(() => {
      this.startAnimation();
    }, 500);
  },

  methods: {
    startAnimation() {
      this.isStart = true;
    },

    handleToOrder() {
      if (this.isLogin()) {
        this.go('/community-center/enterprise-orders/home')
      } else {
        console.log(1);
        this.$data._isShowTuiModel = true;
      }
    }
  },

  computed: {
    XIAN() {
      const data = this.$store.getters.dzVipList;
      if (data && Array.isArray(data) && data.length) {
        const target = data.find((item) => item.serverType === 2);
        return {
          name: target.serverName,
          price: target.serverPrice
        };
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes gift {
  0% {
    transform: translateX(-50%) scaleY(0.7);
  }

  100% {
    transform: translateX(-50%) scaleY(1);
  }
}

@keyframes king {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-16upx);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes car {
  0% {
    transform: translateX(150upx);
    opacity: 0;
  }

  50% {
    transform: translateX(100upx);
  }

  75% {
    transform: translateX(50upx);
    opacity: 0.8;
  }

  100% {
    transform: translateX(-100upx);
    opacity: 0;
  }
}

.vip-package-container {
  width: 100%;
  margin-top: 24upx;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.active {
    .package-1 {
      .gift {
        bottom: -176upx;
        animation: gift 100ms ease-in 200ms;
      }

      .left-package {
        bottom: -26upx;
        left: -24upx;
      }

      .right-top {
        left: 202upx;
        bottom: 66upx;
      }

      .money {
        bottom: -30upx;
        left: 230upx;
      }

      .bi-1 {
        bottom: 72upx;
        left: 2upx;
      }

      .bottom-right {
        left: 264upx;
        bottom: -36upx;
      }
    }

    .car {
      animation: car linear 8s infinite;
    }

    .car-2 {
      // animation: car linear 2s infinite 6s;
    }
  }

  .package {
    position: relative;
    border-radius: 20upx;
    overflow: hidden;

    .package-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 128upx;
      height: 42upx;
      border-radius: 0px 0px 20upx 0px;
      color: #fff;
      font-size: 24upx;
      text-align: center;
      line-height: 42upx;
    }
  }

  .v-499 {
    background: url('../../../static/images/new-community/home/fucaicaoshi.png') no-repeat !important;
    background-size: cover !important;
  }

  .package-1 {
    position: relative;
    width: 326upx;
    height: 342upx;
    background: url('../../../static/images/new-community/home/bg-v.png') no-repeat;
    background-size: cover;


    .package-title {
      background: linear-gradient(270deg, #1172fd 0%, #188ef7 97%);
    }

    .content {
      position: relative;
      z-index: 11;
      margin-top: 83upx;
      margin-left: 16upx;

      .title-1 {
        font-size: 48upx;
        color: #fff;
        line-height: 1.5;
        font-weight: bold;
      }

      .title-2 {
        font-size: 32upx;
        color: #fff;
      }
    }

    .gift {
      position: absolute;
      bottom: 240upx;
      left: 50%;
      transform: translateX(-50%);
      width: 378upx;
      height: 322upx;
      transition: all 100ms ease-in;
      z-index: 10;
    }

    .left-package {
      position: absolute;
      width: 100upx;
      height: 100upx;
      bottom: -100upx;
      left: 40upx;
      transition: all 350ms ease-in 130ms;
    }

    .right-top {
      position: absolute;
      width: 100upx;
      height: 100upx;
      bottom: -100upx;
      left: 40upx;
      transition: all 350ms ease-in 300ms;
    }

    .money {
      position: absolute;
      width: 100upx;
      height: 100upx;
      bottom: -100upx;
      left: 40upx;
      transition: all 350ms ease-in 240ms;
      z-index: 12;
    }

    .bi-1 {
      position: absolute;
      width: 70upx;
      height: 70upx;
      bottom: -100upx;
      left: 120upx;
      transition: all 350ms ease-in 400ms;
    }

    .bottom-right {
      position: absolute;
      width: 100upx;
      height: 100upx;
      bottom: -100upx;
      left: 120upx;
      transition: all 350ms ease-in 130ms;
    }

    .uni-btn {
      position: absolute;
      padding: 14upx 20upx;
      color: #1748D5;
      border: 1upx solid #1748D5;
      font-size: 28upx;
      border-radius: 100upx;
      bottom: 60upx;
      left: 16upx;
      padding-right: 60upx;
      background-color: #fff;
      z-index: 100;

      &::after {
        position: absolute;
        content: '';
        display: block;
        width: 30upx;
        height: 30upx;
        background: url('../../../static/images/new-community/home/to.png') no-repeat;
        background-size: cover;
        left: 134upx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .other-package {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 342upx;

    .uni-btn {
      color: #ef530e;
      font-size: 24upx;
      position: absolute;
      padding: 6upx 15upx;
      border: 1upx solid #ef530e;
      left: 20upx;
      bottom: 20upx;
      border-radius: 100upx;
    }

    .whole-package {
      position: relative;
      width: 340upx;
      height: 160upx;
      background: linear-gradient(86deg, #ffc1ba -3%, #fff1e8 96%);

      .package-title {
        background: linear-gradient(270deg, #fa664f 0%, #ff9554 97%);
      }

      .title {
        font-size: 24upx;
        color: #222229;
        margin-top: 50upx;
        margin-left: 20upx;
      }

      .vip-price {
        font-size: 32upx;
        color: #ef530e;
        font-weight: 500;
      }

      .li {
        position: absolute;
        width: 184upx;
        height: 234upx;
        top: 20upx;
        right: -14upx;
      }

      .king {
        position: absolute;
        width: 120upx;
        height: 90upx;
        top: 10upx;
        right: 0;
        animation: king 2s linear infinite;
      }
    }

    .ilo-package {
      width: 340upx;
      height: 158upx;
      background: linear-gradient(270deg, #fff0d9 0%, #fefaef 98%);

      &.server {
        background: url('../../../static/images/new-community/home/taocanzhuanqu.png') no-repeat;
        background-size: cover;
        position: relative;
      }

      .package-title {
        background: linear-gradient(270deg, #ff9554 0%, #fdbc75 97%);
      }

      .car {
        position: absolute;
        width: 257.34upx;
        height: 172.58upx;
        top: 0;
        right: -64upx !important;
      }

      .content {
        position: relative;
        color: #222229;
        font-size: 26upx;
        margin-top: 44upx;
        margin-left: 23upx;

        .title-2 {
          margin-left: 80upx;
          margin-top: -16upx;
        }

        .arrow-container {
          position: absolute;
          left: 10upx;
          top: 10upx;
          width: 100upx;
          height: 34upx;

          .arrow {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
