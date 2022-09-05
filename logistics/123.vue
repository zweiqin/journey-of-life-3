<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">取件</view>
    </view>
  </view>
</template>



<script>
export default {};
</script>

<style lang="less" scoped>
.value-added-services {
  background: linear-gradient(180deg, #3662ec 0%, rgba(205, 225, 253, 0) 99%);

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }
}
</style>