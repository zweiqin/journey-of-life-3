<template>
  <view class="serve-list-pane-container">
    <view class="title-wrapper">
      <view class="title">家电问题</view>
      <view class="tip">就近上门 | 价格统一 | 超长质保 </view>
    </view>

    <view class="list">
      <view class="item-wrapper" v-for="item in 9" :key="item">
        <image
          class="goods-image"
          src="https://img2.baidu.com/it/u=761859272,2764609931&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          mode=""
        />
        <text class="serve-name">燃气灶清洗</text>
        <text class="serve-price">￥67元起</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.serve-list-pane-container {
  .title-wrapper {
    padding: 20upx 20upx 40upx 20upx;
    box-sizing: border-box;
    background: linear-gradient(180deg, #ffc0a5 0%, #ffebe3 100%);
    border-radius: 20px 20px 0px 0px;

    .title {
      color: #141000;
      font-size: 32upx;
      font-weight: bold;
    }

    .tip {
      margin-top: 12upx;
      font-size: 24upx;
    }
  }

  .list {
    padding: 20upx;
    box-sizing: border-box;
    border-radius: 20upx;
    background-color: #fff;
    margin-top: -20upx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .goods-image {
        width: 206upx;
        height: 206upx;
        border-radius: 20upx;
      }

      .serve-name {
        font-size: 28upx;
        color: #141000;
        margin: 7upx 0 4upx 0;
      }

      .serve-price {
        font-size: 28upx;
        color: #fc4023;
        font-weight: bold;
      }
    }
  }
}
</style>
