<template>
  <view class="recommend-panel">
    <view class="header" v-if="newType">
      <view class="tag">新品发布</view>
      <img class="img" src="../../../../static/images/store/bar.png" alt="" />
    </view>
    <view class="main">
      <view class="goods-item">
        <img
          class="goods-img"
          src="https://img0.baidu.com/it/u=1164982935,3514796448&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
        <view class="info">
          <view>
            <view class="name">
              雅兰头层真皮床架1.8m床意式 轻奢现代1.5米双人主卧床实木...
            </view>

            <view class="tag">本店皮艺床热销第一名</view>
          </view>

          <view class="footer">
            <view class="left">￥<text class="price">400</text> </view>
            <view class="right"> 1000+人付款 </view>
          </view>
        </view>
      </view>

      <view class="goods-item">
        <img
          class="goods-img"
          src="https://img0.baidu.com/it/u=1164982935,3514796448&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
        <view class="info">
          <view>
            <view class="name">
              雅兰头层真皮床架1.8m床意式 轻奢现代1.5米双人主卧床实木...
            </view>

            <view class="tag">本店皮艺床热销第一名</view>
          </view>

          <view class="footer">
            <view class="left">￥<text class="price">400</text> </view>
            <view class="right"> 1000+人付款 </view>
          </view>
        </view>
      </view>

      <view class="goods-item">
        <img
          class="goods-img"
          src="https://img0.baidu.com/it/u=1164982935,3514796448&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
        <view class="info">
          <view>
            <view class="name">
              雅兰头层真皮床架1.8m床意式 轻奢现代1.5米双人主卧床实木...
            </view>

            <view class="tag">本店皮艺床热销第一名</view>
          </view>

          <view class="footer">
            <view class="left">￥<text class="price">400</text> </view>
            <view class="right"> 1000+人付款 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    newType: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
.recommend-panel {
  width: 100%;
  background-color: #0a6363;
  border-radius: 20upx;
  padding: 34upx 12upx;
  box-sizing: border-box;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tag {
      width: 270upx;
      height: 52upx;
      line-height: 48upx;
      text-align: center;
      box-sizing: border-box;
      line-height: 52upx;
      border: 1upx solid #fff;
      color: #fff;
      font-weight: bold;
      font-size: 28upx;
      border-radius: 20upx;
      margin-bottom: 10upx;
    }

    .img {
      width: 444upx;
      margin-bottom: 10upx;
    }
  }

  .main {
    .goods-item {
      display: flex;
      width: 100%;
      padding: 52upx 88upx 52upx 16upx;
      background-color: #fff;
      box-sizing: border-box;

      .goods-img {
        width: 184upx;
        border-radius: 10upx;
        flex-shrink: 0;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 88upx;

        .name {
          color: #3d3d3d;
          font-size: 24upx;
          font-weight: 100;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-bottom: 14upx;
        }

        .tag {
          color: #ff8f1f;
          font-size: 16upx;
          transform: scale(0.9);
          margin-left: -20upx;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            color: #fa5151;
            font-size: 20upx;

            .price {
              font-size: 36upx;
              color: #fa5151;
              padding: 0;
            }
          }

          .right {
            color: #999999;
            font-size: 10upx;
          }
        }
      }
    }
  }
}
</style>