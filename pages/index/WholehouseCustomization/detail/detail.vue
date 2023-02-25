<template>
  <view class="detail-container">
    <view class="bg">
      <OpContainer></OpContainer>
    </view>
  </view>
</template>

<script>
import OpContainer from './cpns/OpCntainer.vue'
export default {
  components: { OpContainer },
}
</script>

<style lang="less" scoped>
.detail-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;

  .bg {
    position: relative;
    width: 100%;
    height: 336upx;
    background-size: cover;
    background: url(https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00624-707.jpg)
      no-repeat;

    .op-container {
      position: absolute;
    }
  }
}
</style>
