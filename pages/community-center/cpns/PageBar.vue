<template>
  <view class="page-bar-container">
    团蜂社区
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
      this.isStart = false;
    }
  }
};
</script>

<style lang="less" scoped>

.page-bar-container {
  position: relative;
  height: 150upx;
  width: 100%;
  // background-color: #ef530e;
  padding: 30upx 30upx 0;
  box-sizing: border-box;
  font-size: 32upx;
  color: #fff;
}
</style>
