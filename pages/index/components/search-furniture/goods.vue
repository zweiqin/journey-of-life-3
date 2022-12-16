<template>
  <view class="goods-wrapper">
    <image
      class="good-img"
      src="https://img0.baidu.com/it/u=1234459922,450400833&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750"
      mode=""
    />
    <view class="goods-info">
      <view class="goods-name">
        <view class="icon-wrapper"
          ><image
            class="icon"
            src="../../../../static/images/index/miaosha.png"
            mode=""
        /></view>
        <view class="name">话函数定义回复于亚化石阅读</view>
      </view>

      <view class="tags">
        <view class="tag">旗舰店</view>
        <view class="tag">官方正品</view>
      </view>

      <view class="goods-price">
        <view class="text">劵后￥12</view>
        <view class="salsed">100+付款</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.goods-wrapper {
  width: 350upx;
  border-radius: 10upx;
  overflow: hidden;
  font-size: 28upx;
  margin-bottom: 20upx;

  .good-img {
    width: 100%;
    height: 320upx;
    object-fit: cover;
  }

  .goods-info {
    background-color: #fff;
    padding: 20upx;
    box-sizing: border-box;

    .goods-name {
      display: flex;
      align-items: center;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50upx;
        height: 28upx;
        background-color: #fa5151;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 10upx;
        margin-top: 4upx;

        .icon {
          width: 38upx;
          height: 16upx;
        }
      }
      .name {
        width: 256upx;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .tags {
      display: flex;
      align-items: center;

      .tag {
        font-size: 20upx;
        color: #fa5151;
        line-height: 1.5;
        padding: 0 18upx;
        border: 1upx solid #fa5151;
        margin: 22upx 0 12upx 0;
        border-radius: 4upx;

        &:nth-child(1) {
          margin-right: 16upx;
        }
      }
    }
  }

  .goods-price{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text{
      font-size: 24upx;
      color: #FA5151;
      font-weight: 500;
    }

    .salsed{
      font-size: 20upx;
      color: #999999;
    }
  }
}
</style>