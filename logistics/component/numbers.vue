<template>
  <view class="numbers">
    <image
      class="op-icon"
      src="../../static/images/wuliu/indeterminate.png"
      mode=""
      @click="$emit('op', -1)"
    />
    <view class="number">{{ number || 1 }}</view>

    <image
      @click="$emit('op', 1)"
      class="op-icon"
      src="../../static/images/wuliu/add.png"
      mode=""
    />
  </view>
</template>

<script>
export default {
  props: {
    number: [Number, String],
  },
};
</script>

<style lang="less" scoped>
.numbers {
  display: flex;

  .number {
    width: 84upx;
    height: 32upx;
    margin: 0 8upx;
    text-align: center;
    line-height: 32upx;
  }

  .op-icon {
    width: 40upx;
    height: 40upx;
  }
}
</style>