<template>
  <view class="welfare-bar-container">
    <view class="item" @click="empty()">
      <view class="item-title">签到赚钱</view>
      <!-- <view class="content" :class="{ 'one-active': startAnimation1 }">
        <image class="calendar" src="../../../static/images/new-business/home/calendar.png"></image>
        <image class="bi-right" src="../../../static/images/new-business/home/bi-right.png"></image>
        <image class="bi-left" src="../../../static/images/new-business/home/bi-left.png"></image>
      </view> -->
    </view>

    <view class="item" @click="empty()">
      <view class="item-title">天降福利</view>
      <!-- <view class="content" :class="{ 'two-active': startAnimation2 }">
        <image class="lucky" src="../../../static/images/new-business/home/lucky.png"></image>
        <image class="guang" src="../../../static/images/new-business/home/guang.png"></image>
      </view> -->
    </view>

    <view class="item" @click="empty()">
      <view class="item-title">新人免单</view>
    </view>

    <view class="item" @click="empty()">
      <view class="item-title">限时秒杀</view>

    </view>

    <view class="item" @click="empty()">
      <view class="item-title">省钱团购</view>

    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startAnimation1: false,
      startAnimation2: false,
    }
  },

  mounted() {
    this.startAnimation1 = true
    this.startAnimation2 = true
  }
}
</script>

<style lang="less" scoped>
@keyframes one-animate {
  0% {
    bottom: -100upx;
  }

  100% {}
}

@keyframes breath {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.welfare-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item {
    position: relative;
    width: 127upx;
    height: 140upx;
    border-radius: 10upx;
    border: 2upx solid;
    overflow: hidden;



    // .one-active {
    //   .calendar {
    //     animation: one-animate 350ms;
    //   }
    // }

    // .two-active {
    //   .lucky {
    //     animation: one-animate 350ms;
    //   }

    //   .guang {
    //     animation: breath 2s infinite 500ms;
    //   }
    // }

    .item-title {
      color: #222229;
      font-size: 28upx;
      font-weight: 500;
      margin-top: 18upx;
      margin-left: 10upx;
    }

    &:nth-child(1) {
      background: linear-gradient(180deg, #FFFFFF 0%, #FFD8DD 100%);
      border-color: #fb9cae;
      background: url('../../../static/images/new-business/home/qiandao.png') no-repeat;
      background-size: cover;

      .calendar {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 97upx;
        height: 103upx;
        bottom: -24upx;
      }

      .bi-left {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40upx;
        height: 40upx;
      }

      .bi-right {
        position: absolute;
        bottom: 0;
        right: -40upx;
        width: 80upx;
        height: 80upx;
      }
    }

    &:nth-child(2) {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FBE2A0 100%);
      border-color: #fbde91;
      background: url('../../../static/images/new-business/home/tianjiang.png') no-repeat;
      background-size: cover;

      // .lucky {
      //   position: absolute;
      //   width: 75upx;
      //   height: 108upx;
      //   left: 50%;
      //   transform: translateX(-50%);
      //   bottom: -24upx;
      // }

      // .guang {
      //   position: absolute;
      //   width: 188upx;
      //   height: 142upx;
      //   left: 50%;
      //   transform: translateX(-50%);
      //   bottom: 0;
      // }
    }

    &:nth-child(3) {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FAB58D 100%);
      border-color: #fc5747;
      background: url('../../../static/images/new-business/home/maindan.png') no-repeat;
      background-size: cover;
    }

    &:nth-child(4) {
      background: linear-gradient(180deg, #FFFFFF 0%, #FFD8DD 100%);
      border-color: #f7839d;
      background: url('../../../static/images/new-business/home/miaosha.png') no-repeat;
      background-size: cover;
    }

    &:nth-child(5) {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FBE2A0 100%);
      border-color: #fce096;
      background: url('../../../static/images/new-business/home/tuangou.png') no-repeat;
      background-size: cover;
    }
  }
}
</style>