<template>
  <view class="pay-bar">
    <view class="price">
      <text>限时优惠仅需：</text>
      <text class="price-text">{{ price }}</text>
      <text>元</text>
    </view>

    <button @click="$emit('pay')" class="uni-btn">立即抢购</button>
    <image @click="$emit('pay')" src="../../../static/images/con-center/vip/click.png" class="click-icon"></image>
  </view>
</template>

<script>
export default {
  props: {
    price: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5;
}

.pay-bar {
  position: relative;
  width: 100%;
  height: 100upx;
  padding: 24upx 117upx 24upx 27upx;
  box-sizing: border-box;
  background-color: #FE0000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 42upx 42upx;
  font-size: 28upx;


  .price {
    color: #fff;

    .price-text {
      font-weight: bold;
      font-size: 48upx;
    }
  }


  .uni-btn {
    font-size: 36upx;
    font-weight: bold;
    color: #fff;
  }

  .click-icon {
    position: absolute;
    top: 44upx;
    right: 12upx;
    height: 74upx;
    width: 80upx;

  }
}
</style>