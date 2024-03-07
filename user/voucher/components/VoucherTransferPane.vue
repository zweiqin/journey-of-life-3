<template>
  <view class="voucher-teansfer-pane-container" v-if="orderData">
    <image class="type-icon" :src="require(`../../../static/images/new-user/transfer-${type}.png`)"></image>
    <view class="order-info">
      <view class="to-user">{{ type === 'out' ? '转给' : '来自' }}：{{ orderData.holdName }}</view>
      <view class="to-id">{{ type === 'out' ? '赠予者' : '转赠者' }}ID：{{ orderData.userId }}</view>
      <view class="transform-time">{{ orderData.addTime }}</view>
    </view>
    <view class="count-wrapper">
			<tui-icon
				name="coupon" :size="30" unit="rpx"
				color="#f5db1b"
				margin="0 4rpx 0 0"
			></tui-icon>
      {{ orderData.number }} 个
    </view>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'out'
    },

    orderData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.voucher-teansfer-pane-container {
  padding: 20upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20upx;
  margin-bottom: 20upx;
  display: flex;
  align-items: flex-start;

  .type-icon {
    width: 50upx;
    height: 50upx;
    flex-shrink: 0;
  }

  .order-info {
    margin: 0 40upx 0 40upx;
    font-size: 24upx;
    line-height: 1.5;
    color: #3d3d3d;
    flex: 1;

    .to-user {
      font-size: 28upx;
      color: #000;
      font-weight: 500;
    }
  }

  .count-wrapper {
    font-size: 32upx;
    font-weight: 500;
  }
}
</style>
