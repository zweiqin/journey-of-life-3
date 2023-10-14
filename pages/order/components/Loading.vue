<template>
  <view class="loading-container">
    <view class="loader">
      <view class="loader-inner ball-grid-pulse">
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
        <view :style="{ 'background-color': color }"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#f87f4b'
    }
  }
};
</script>

<style lang="less" scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 90000;

  @keyframes ball-grid-pulse {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      opacity: 0.7;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  .ball-grid-pulse {
    width: 57px;
  }

  .ball-grid-pulse > view:nth-child(1) {
    -webkit-animation-delay: -0.06s;
    animation-delay: -0.06s;
    -webkit-animation-duration: 0.72s;
    animation-duration: 0.72s;
  }

  .ball-grid-pulse > view:nth-child(2) {
    -webkit-animation-delay: 0.25s;
    animation-delay: 0.25s;
    -webkit-animation-duration: 1.02s;
    animation-duration: 1.02s;
  }

  .ball-grid-pulse > view:nth-child(3) {
    -webkit-animation-delay: -0.17s;
    animation-delay: -0.17s;
    -webkit-animation-duration: 1.28s;
    animation-duration: 1.28s;
  }

  .ball-grid-pulse > view:nth-child(4) {
    -webkit-animation-delay: 0.48s;
    animation-delay: 0.48s;
    -webkit-animation-duration: 1.42s;
    animation-duration: 1.42s;
  }

  .ball-grid-pulse > view:nth-child(5) {
    -webkit-animation-delay: 0.31s;
    animation-delay: 0.31s;
    -webkit-animation-duration: 1.45s;
    animation-duration: 1.45s;
  }

  .ball-grid-pulse > view:nth-child(6) {
    -webkit-animation-delay: 0.03s;
    animation-delay: 0.03s;
    -webkit-animation-duration: 1.18s;
    animation-duration: 1.18s;
  }

  .ball-grid-pulse > view:nth-child(7) {
    -webkit-animation-delay: 0.46s;
    animation-delay: 0.46s;
    -webkit-animation-duration: 0.87s;
    animation-duration: 0.87s;
  }

  .ball-grid-pulse > view:nth-child(8) {
    -webkit-animation-delay: 0.78s;
    animation-delay: 0.78s;
    -webkit-animation-duration: 1.45s;
    animation-duration: 1.45s;
  }

  .ball-grid-pulse > view:nth-child(9) {
    -webkit-animation-delay: 0.45s;
    animation-delay: 0.45s;
    -webkit-animation-duration: 1.06s;
    animation-duration: 1.06s;
  }

  .ball-grid-pulse > view {
    background-color: #f87f4b;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    float: left;
    animation: ball-grid-pulse 1s ease-in-out infinite;
  }
}
</style>
