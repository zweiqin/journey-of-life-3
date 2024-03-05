<template>
  <view class="numbers">
		<tui-icon
			name="offline-fill" :size="40" unit="rpx"
			color="#bfbfbf"
			margin="0 20rpx 0 0" @click="$emit('op', -1)"
		></tui-icon>
    <view class="number">{{ number || 1 }}</view>
		<tui-icon
			name="add-fill" :size="40" unit="rpx"
			color="#e95d20"
			margin="0 20rpx 0 0" @click="$emit('op', 1)"
		></tui-icon>
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