<template>
  <view class="voucher-wrapper" :class="{ active: start }" @click="go('/pages/index/voucher-zone')">
    <view class="voucher-item first-el"></view>
    <view class="voucher-item next-el"></view>
    <view class="voucher-item top-el">
      <view class="title">代金券专区</view>
      <view class="sub-title">免费享好物</view>
      <!-- todo 加动画 -->
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      start: false
    }
  },
  methods: {
    startAnimation() {
      this.start = true
    }
  },
}
</script>

<style lang="less" scoped>
@keyframes top-ani {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes el-ani {
  0% {
    opacity: 0;
    transform: translateX(100%) translateY(-50%);
  }

  100% {
    opacity: 1;
    transform: translateX(0) translateY(-50%);
  }
}


.voucher-wrapper {
  position: relative;
  width: 395upx;
  height: 514upx;
  overflow: hidden;



  .voucher-item {
    background-color: #D8D8D8;
    border-radius: 20upx;
  }

  .first-el,
  .next-el {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 412upx;
    z-index: 1;
    animation: el-ani 500ms 500ms forwards;
    opacity: 0;
  }

  .next-el {
    left: 10upx;
    height: 466upx;
    background-color: #C8C3C3;
    z-index: 2;
    animation: el-ani 500ms 400ms forwards;
  }

  .top-el {
    position: absolute;
    top: 0;
    right: 0;
    width: 377upx;
    height: 514upx;
    background: linear-gradient(147deg, #F09664 1%, #DF489C 31%, #EF9563 123%);
    z-index: 10;
    animation: top-ani 500ms;
    padding-top: 28upx;
    padding-left: 48upx;
    box-sizing: border-box;
    background: url('../../../static/images/new-index/index-1/home-banner.png') no-repeat;
    background-size: cover;

    .title {
      color: #fff;
      font-size: 48upx;
      font-weight: bold;
      margin-bottom: 16upx;
    }

    .sub-title {
      font-size: 32upx;
      color: #fff;
    }
  }

}
</style>