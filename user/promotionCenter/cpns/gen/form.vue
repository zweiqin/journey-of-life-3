<template>
  <view class="form-item">
    <view class="item-erapper">
      <view class="item">
        <view class="title">新零售</view>
        <view>
          <text>订单：0</text>
          <text>收益：0</text>
        </view>
      </view>
      <view class="item">
        <view class="title">新媒体</view>
        <view>
          <text>订单：0</text>
          <text>收益：0</text>
        </view>
      </view>
    </view>

    <view class="item-erapper">
      <view class="item">
        <view class="title">供应链</view>
        <view>
          <text>订单：0</text>
          <text>收益：0</text>
        </view>
      </view>
      <view class="item">
        <view class="title">社区</view>
        <view>
          <text>订单：0</text>
          <text>收益：0</text>
        </view>
      </view>
    </view>

    <view class="item-erapper">
      <view class="item">
        <view class="title">材料</view>
        <view>
          <text>订单：0</text>
          <text>收益：0</text>
        </view>
      </view>
      <view class="item">
        <view class="title">物流</view>
        <view>
          <text>订单：0</text>
          <text>收益：0</text>
        </view>
      </view>
    </view>

    <view class="item-erapper">
      <view class="item">
        <view class="title">会员</view>
        <view>
          <text>订单：0</text>
          <text>收益：0</text>
        </view>
      </view>
       <view class="item">
        <view class="title"></view>
        <view>
          <text></text>
          <text></text>
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.item-erapper {
  display: flex;
  padding: 12upx 0;
  border-bottom: 1upx solid #d8d8d8;

  .item {
    padding: 20upx;
    box-sizing: border-box;
    flex: 1;
    box-sizing: border-box;
    color: #777;
    &:nth-child(1) {
      border-right: 1upx solid #d8d8d8;
    }

    .title {
      margin-bottom: 10upx;
      color: #000;
      font-weight: 500;
    }

    view {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>