<template>
  <view class="fields-wrapper">
    <view class="wrapper">
      <view class="select item">
        <view class="title">户型</view>

        <view class="value">
          <view class="select">
            <view class="value-text">全部户型</view>
            <tui-icon name="arrowdown" :size="20"></tui-icon>
          </view>
        </view>
      </view>

      <view class="item input">
        <view class="title">面积</view>

        <view class="value">
          <view class="input">
            <input type="text" placeholder="0" />
            <text class="value-text">㎡</text>
          </view>
        </view>
      </view>
    </view>

    <view class="wrapper">
      <view class="select item">
        <view class="title">风格</view>

        <view class="value">
          <view class="select">
            <view class="value-text">全部风格</view>
            <tui-icon name="arrowdown" :size="20"></tui-icon>
          </view>
        </view>
      </view>

      <view class="item input">
        <view class="title">预算</view>

        <view class="value">
          <view class="input">
            <input type="text" placeholder="0" />
            <text class="value-text">元</text>
          </view>
        </view>
      </view>
    </view>

    <button class="uni-btn">智能匹配</button>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.fields-wrapper {
  padding: 20upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 0 0 24upx 24upx;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20upx;

    .item {
      display: flex;
      align-items: center;
      height: 96upx;
      background-color: #f6f6f5;
      border-radius: 16upx;
      padding: 24upx;
      box-sizing: border-box;

      .title {
        color: #8f8d85;
        font-size: 28upx;
        padding-right: 24upx;
        margin-right: 24upx;
        border-right: 1upx solid #d5d4d1;
      }

      .value {
        flex: 1;

        .select,
        .input {
          display: flex;
          align-items: center;
          justify-content: space-between;

          input {
            text-align: right;
            margin-right: 8upx;
          }

          .value-text {
            color: #8f8d85;
            font-size: 28upx;
          }
        }
      }

      &.select {
        width: 384upx;
      }

      &.input {
        width: 300upx;
      }
    }
  }

  .uni-btn {
    width: 100%;
    border-radius: 100px;
    background-color: #ffc117;
    color: #fff;
    font-size: 32upx;
    line-height: 48upx;
    padding: 24upx 0;
    margin: 24upx 0 20upx 0;
  }
}
</style>
