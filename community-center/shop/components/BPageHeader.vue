<template>
  <view class="b-page-header">
    <image class="back" src="../../../static/images/new-business/category/back.png"></image>
    <view class="page-title">{{ title }}</view>
    <view class="search-container">
      <input type="text" class="input" placeholder="请输入关键字">
      <button class="uni-btn search-btn">搜索</button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.b-page-header {
  width: 100vw;
  height: 88upx;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 30upx;
  box-sizing: border-box;

  .back {
    width: 48upx;
    height: 48upx;
    flex-shrink: 0;
  }

  .page-title {
    color: #222229;
    font-size: 42upx;
    font-weight: 500;
    margin-right: 24upx;
  }

  .search-container {
    flex: 1;
    display: flex;
    align-items: center;
    height: 70upx;
    border: 1upx solid #EF5511;
    border-radius: 100px;
    padding: 8upx 11upx;
    box-sizing: border-box;

    .input {
      flex: 1;
      font-size: 28upx;
      margin-right: 20upx;
    }

    .search-btn {
      width: 112upx;
      height: 100%;
      border-radius: 100px;
      background: linear-gradient(270deg, #EF530E 0%, #EE6C33 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28upx;
      color: #fff;



    }
  }
}
</style>