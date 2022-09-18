<template>
  <!-- 头部 -->
  <view class="header">
    <img class="img" src="../../static/images/index/location.png" alt="定位" />

    <text class="loaction">佛山市</text>
    <view class="search">
      <img src="../../static/images/icon/search.png" alt="" />
      <input type="text" @focus="$emit('focus')" />
    </view>
    <img class="img" src="../../static/images/index/ling.png" alt="响铃" />
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72upx;
  background-color: #fff;

  &.header-fixed {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;

    z-index: 100;
    padding: 26upx;
  }

  .img {
    width: 32upx;
    height: 40upx;
  }

  .loaction {
    margin: 0 20upx 0 10upx;
    font-size: 24upx;
  }

  .search {
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 12upx;
    height: 100%;
    border-radius: 100px;
    padding: 0 34upx;
    background-color: #efefef;

    img {
      width: 32upx;
      height: 32upx;
      margin-right: 30upx;
    }
  }
}
</style>