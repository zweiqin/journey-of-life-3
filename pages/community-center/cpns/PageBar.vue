<template>
  <view class="page-bar-container" :style="{ 'background-color': isStart ? '#ef530e' : '#f6f6f8' }" :class="{ active: isStart }">
    团蜂社区

    <view class="dot"></view>
    <view class="dot2"></view>
    <image src="../../../static/images/new-community/home/lamp.png" class="lamp"></image>
    <image src="../../../static/images/new-community/home/person-1.png" class="person-1"></image>
    <image src="../../../static/images/new-community/home/gui-1.png" class="gui-1"></image>
    <image src="../../../static/images/new-community/home/women.png" class="women"></image>
    <image src="../../../static/images/new-community/home/icon1.png" class="icon1"></image>
    <image src="../../../static/images/new-community/home/bag.png" class="bag"></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isStart: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.startAnimation();
    }, 500);
  },
  methods: {
    startAnimation() {
      this.isStart = true;
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes spare {
  0,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 205, 131, 0.178);
  }

  50% {
    box-shadow: 0 0 0 20upx rgba(255, 205, 131, 0.178);
  }
}

.page-bar-container {
  position: relative;
  height: 150upx;
  width: 100%;
  background-color: #ef530e;
  padding: 30upx 30upx 0;
  box-sizing: border-box;
  font-size: 32upx;
  color: #fff;
  transition: all 350ms ease-in;
  // border-bottom: 1upx solid #f1f1f1;

  &.active {
    .lamp {
      top: -84upx;
    }

    .person-1 {
      right: 108.4upx;
      z-index: 10;
    }

    .gui-1 {
      transform: perspective(800px) rotateY(360deg);
      transform-origin: left center;
    }

    .women {
      top: 28upx;
    }

    .icon1 {
      opacity: 1;
      animation: spare ease-in-out 3s infinite 300ms;
    }

    .bag {
      top: 100upx;
      right: 504upx;
    }

    .dot {
      opacity: 1;
      top: 20upx;
      // animation: dot1 2s ease-in infinite;
    }

    .dot2 {
      opacity: 1;
      top: 40upx;
      left: 532upx;
    }
  }

  .lamp {
    position: absolute;
    left: 20upx;
    width: 46.34upx;
    height: 194.16upx;
    transition: all 350ms ease-in-out 400ms;
    top: -200upx;
  }

  .person-1 {
    position: absolute;
    right: -150.4upx;
    top: 28upx;
    width: 134.54upx;
    height: 306.58upx;
    transition: right 350ms ease-in-out;
  }

  .gui-1 {
    position: absolute;
    right: 226upx;
    top: 28upx;
    width: 134.54upx;
    height: 306.58upx;
    transition: all 350ms ease-in-out 100ms;
    transform: perspective(800px) rotateY(270deg);
    transform-origin: left center;
  }

  .women,
  .bag {
    position: absolute;
    right: 226upx;
    top: 168upx;
    width: 334.14upx;
    height: 302.06upx;
    transition: top 350ms ease-in-out 200ms;
  }

  .bag {
    width: 56.46upx;
    height: 56.6upx;
    right: 50upx;
  }

  .icon1 {
    opacity: 0;
    position: absolute;
    right: 256upx;
    top: 30upx;
    width: 65.42upx;
    height: 66.8upx;
    transition: all 350ms ease-in-out 200ms;
    border-radius: 50%;
  }

  .dot {
    opacity: 0;
    position: absolute;
    top: 20upx;
    left: 354upx;
    top: 200upx;
    width: 8upx;
    height: 8upx;
    border-radius: 50%;
    transition: all 350ms ease-in-out 500ms;
    background: linear-gradient(180deg, #ffb798 0%, #ff6f9a 100%);
  }

  .dot2 {
    opacity: 0;
    position: absolute;
    top: 20upx;
    left: 354upx;
    top: 200upx;
    width: 18upx;
    height: 18upx;
    border-radius: 50%;
    background: linear-gradient(198deg, #68d7fa 12%, #7ef1b3 95%);
    transition: all 400ms ease-in-out 600ms;
  }
}
</style>
