<template>
  <view class="pane">
    <view class="vip-title">{{ text }}</view>
    <view class="icon">
      <image
        src="../../../../static/images/center/userUp/vip-icon.png"
        mode=""
      />
    </view>

    <view class="tip"> 会员升级权益 </view>

    <Tabs :size="40" :data="equity"></Tabs>

    <button class="uni-btn" @click="$emit('click', price)">
      <text>￥</text> <text>{{ price }}</text> <text>{{ text }}</text>
    </button>

    <view class="attention">放心开通，不会自动续费</view>
  </view>
</template>

<script>
export default {
  props: {
    equity: {
      type: Array,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.pane {
  width: 95%;
  margin: 40upx auto;
  background-color: #fff;
  padding: 24upx 30upx 76upx;
  box-sizing: border-box;
  border-radius: 20upx;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20upx 0;
    width: 100%;
    height: 180upx;
    background: linear-gradient(
      180deg,
      #fff8c6 0%,
      rgba(255, 248, 198, 0) 100%
    );
    border-radius: 20upx;
    border: 1upx solid #ffc300;

    image {
      width: 142upx;
      height: 128.4upx;
    }
  }

  .tip {
    font-size: 24upx;
    color: #3d3d3d;
    margin-bottom: 20upx;
  }

  .uni-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 140upx auto 20upx;
    border-radius: 10px;
    background: linear-gradient(90deg, #ff8f1f 13%, #ffc300);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
    width: 90%;
    height: 60px;
    color: #fff;

    text {
      color: #fff;

      &:nth-child(1) {
        font-size: 36upx;
        padding-top: 20upx;
      }

      &:nth-child(2) {
        font-size: 72upx;
        font-weight: 500;
      }

      &:nth-child(3) {
        font-size: 36upx;
        font-weight: bold;
        margin-left: 30upx;
      }
    }
  }

  .attention {
    margin-top: 26upx;
    padding-top: 20upx;
    border-top: 1upx solid #d8d8d8;
    text-align: center;
    color: #a0a0a0;
    font-weight: 20upx;
  }
}
</style>
