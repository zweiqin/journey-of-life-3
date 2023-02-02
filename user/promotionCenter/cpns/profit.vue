<template>
  <Pane style="border-radius: 40upx 40upx 0 0" type="profit" text="我的收益">
    <block slot="right">
      <button class="uni-btn withdraw">去提现</button>
    </block>

    <view class="data-wrapper">
      <view class="item">
        <view>累计收益</view>
        <view class="data">0</view>
      </view>
      <view class="item">
        <view>累计收益</view>
        <view class="data">0</view>
      </view>
      <view class="item">
        <view>累计收益</view>
        <view class="data">0</view>
      </view>
    </view>
  </Pane>
</template>

<script>
import Pane from "./pane.vue";

export default {
  components: {
    Pane,
  },
};
</script>

<style lang="less" scoped>
.withdraw {
  border-radius: 100px;
  font-size: 24upx;
  padding: 8upx 16upx;
  color: #fff;
  background: linear-gradient(90deg, #e95d20 0%, #ff8f1f 100%);
}

.data-wrapper {
  display: flex;

  .item {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 44upx 0 0 0;
    box-sizing: border-box;

    .data {
      font-size: 40upx;
      font-weight: bold;
      margin-top: 10upx;
    }


    &::after{
      content: "";
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1upx;
      height: 50%;
      background-color: #D8D8D8;

    }

    
  }
}
</style>