<template>
  <view class="vip-package-container" :class="{ active: isStart }">
    <!-- 限时钜惠 -->
    <view v-if="XIAN && XIAN.name" class="package package-1"
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
    </view>

    <view v-else class="package package-1" @click="
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
    </view>

    <view class="other-package">
      <view class="package whole-package" @click="go('/community-center/vip-center/vip-detail?type=2')">
        <view class="package-title"> 家庭小卫士 </view>
        <view class="title"><text class="vip-price">399</text>全年套餐</view>
        <button class="uni-btn">立省1500</button>

        <image class="li" src="../../../static/images/new-community/home/li.png"></image>
        <image class="king" src="../../../static/images/new-community/home/king.png"></image>
      </view>

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

      <view class="package ilo-package server" style="background: linear-gradient(270deg, #1F67FD 0%, #2E70FC 66%);"
        @click="handleToOrder">
        <view class="package-title"
          style="position: relative; z-index: 10; background: linear-gradient(270deg, #2E45DA 0%, #1548D4 97%);"> 企业服务
        </view>
        <view class="content" style="z-index: 10; color: #fff; margin-top: 10upx; margin-left: 24upx;">
          <view>助力企业降本增效</view>
        </view>
        <button style="z-index: 10; background-color: #fff; color: #2E45DA; font-size: 22upx; border: none;"
          class="uni-btn">立即申请</button>

        <view class="additional-dom">
          <view class="dot-1"></view>
          <view class="dot-2"></view>
          <view class="dot-3"></view>
        </view>
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
        console.log('找到了', target);

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

  .package-1 {
    width: 326upx;
    height: 342upx;
    background: url('../../../static/images/new-community/home/vip-1.png') no-repeat;
    background-size: cover;

    .package-title {
      background: linear-gradient(270deg, #1172fd 0%, #188ef7 97%);
    }

    .content {
      margin-top: 114upx;
      margin-left: 18upx;

      .title-1 {
        font-size: 32upx;
        color: #222229;
        line-height: 1.5;

        .vip-price {
          color: #eb2006;
          font-size: 36upx;
          font-weight: bold;
          vertical-align: text-top;
        }
      }

      .title-2 {
        font-size: 24upx;
        color: #0d79ff;
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
      color: #eb2006;
      border: 1upx solid #eb2006;
      font-size: 28upx;
      border-radius: 100upx;
      bottom: 30upx;
      right: 23upx;
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

  .server {
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 292upx;
      height: 131upx;
      background: url('../../../static/images/new-community/home/qiye.png') no-repeat;
      background-size: cover;
      right: -22upx;
      bottom: 0;
    }

    .additional-dom {
      .dot-1 {
        position: absolute;
        top: 74upx;
        left: -80upx;
        width: 130upx;
        height: 130upx;
        border-radius: 1000px;
        background: linear-gradient(90deg, #397BFF 0%, #0856FB 99%);
        z-index: 0;
      }

      .dot-2 {
        position: absolute;
        top: 2upx;
        left: 6upx;
        width: 50upx;
        height: 50upx;
        border-radius: 1000px;
        background: linear-gradient(90deg, #397BFF 0%, #0856FB 99%);
        z-index: 0;
      }

      .dot-3 {
        position: absolute;
        top: 85upx;
        left: 52upx;
        width: 287.8upx;
        height: 91.30upx;
        background: url('../../../static/images/new-community/home/path.png') no-repeat;
        background-size: cover;
        z-index: 0;
      }
    }
  }
}
</style>
