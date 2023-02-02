<template>
  <Pane
    style="border-radius: 40upx 40upx 0 0"
    type="fans"
    text="我的粉丝"
    data="（0）"
  >
    <block slot="right">
      <image class="icon" src="../../../static/images/index/back.png" mode="" />
    </block>

    <view class="data-wrapper">
      <view class="item">
        <view>超级合伙人</view>
        <view class="data">0</view>
      </view>
      <view class="item">
        <view>合伙人</view>
        <view class="data">0</view>
      </view>
      <view class="item">
        <view>普通会员</view>
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
.icon {
  width: 28upx;
  height: 28upx;
  transform: rotate(180deg);
}

/deep/ .data {
  font-size: 36upx;
  font-weight: 500;
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

    &::after {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1upx;
      height: 50%;
      background-color: #d8d8d8;
    }
  }
}
</style>