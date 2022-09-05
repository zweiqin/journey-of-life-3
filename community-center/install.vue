<template>
  <view class="install">
    <view class="top-header">
      <view class="bg">
        <img class="img" src="../static/images/con-center/bg.png" alt="" />
      </view>
      <PageHeader title="上门安装服务"></PageHeader>
      <view class="icons">
        <view class="item">
          <img
            class="img"
            src="../static/images/con-center/zhunyeshifu.png"
            alt=""
          />
          <view class="text">专业师傅</view>
        </view>

        <view class="item">
          <img
            class="img"
            src="../static/images/con-center/yijianxiangying.png"
            alt=""
          />
          <view class="text">一键响应</view>
        </view>
        <view class="item">
          <img
            class="img"
            src="../static/images/con-center/shouhoubaozhang.png"
            alt=""
          />
          <view class="text">售后保障</view>
        </view>
      </view>
    </view>

    <view class="mian">
      <view class="address">
        <img class="img" src="../static/images/index/location.png" alt="" />
        <view class="selected">佛山</view>
        <view class="desc">（请输入安装服务地址）</view>
      </view>

      <view class="item">
        <view class="title">家电安装</view>

        <view class="goods-item">
          <img
            class="img"
            src="https://img1.baidu.com/it/u=2598413426,3301528904&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"
            alt=""
          />
          <view class="info">
            <view class="name">洗衣机安装</view>
            <view>
              <text class="desc">佛山</text>
              <text class="desc">已服务20564+用户</text>
            </view>
            <view class="tag">
              <text class="time">随叫随到</text>
              <text class="time">最快2小时上门</text>
            </view>
            <view class="price-start">
              <text>￥ <text class="price-">400</text> 起</text>
              <text class="number">1台</text>
            </view>
          </view>
        </view>

        <view class="goods-item">
          <img
            class="img"
            src="https://img2.baidu.com/it/u=72695031,1506149842&fm=253&fmt=auto&app=120&f=PNG?w=600&h=406"
            alt=""
          />
          <view class="info">
            <view class="name">空调安装</view>
            <view>
              <text class="desc">佛山</text>
              <text class="desc">已服务20112+用户</text>
            </view>
            <view class="tag">
              <text class="time">随叫随到</text>
              <text class="time">最快2小时上门</text>
            </view>
            <view class="price-start">
              <text>￥ <text class="price-">300</text> 起</text>
              <text class="number">1台</text>
            </view>
          </view>
        </view>

        <view class="goods-item">
          <img
            class="img"
            src="https://img0.baidu.com/it/u=3109450738,2857295278&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
          <view class="info">
            <view class="name">油烟机安装</view>
            <view>
              <text class="desc">佛山</text>
              <text class="desc">已服务19871+用户</text>
            </view>
            <view class="tag">
              <text class="time">随叫随到</text>
              <text class="time">最快2小时上门</text>
            </view>
            <view class="price-start">
              <text>￥ <text class="price-">300</text> 起</text>
              <text class="number">1台</text>
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="title">家具安装</view>

        <view class="goods-item" @click="handleToDetail">
          <img
            class="img"
            src="https://img2.baidu.com/it/u=63874429,829045450&fm=253&fmt=auto&app=138&f=PNG?w=585&h=500"
            alt=""
          />
          <view class="info">
            <view class="name">沙发安装</view>
            <view>
              <text class="desc">佛山</text>
              <text class="desc">已服务20564+用户</text>
            </view>
            <view class="tag">
              <text class="time">随叫随到</text>
              <text class="time">最快2小时上门</text>
            </view>
            <view class="price-start">
              <text>￥ <text class="price-">400</text> 起</text>
              <text class="number">1张</text>
            </view>
          </view>
        </view>

        <view class="goods-item">
          <img
            class="img"
            src="https://img1.baidu.com/it/u=608264098,785252734&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
          <view class="info">
            <view class="name">餐桌安装</view>
            <view>
              <text class="desc">佛山</text>
              <text class="desc">已服务20112+用户</text>
            </view>
            <view class="tag">
              <text class="time">随叫随到</text>
              <text class="time">最快2小时上门</text>
            </view>
            <view class="price-start">
              <text>￥ <text class="price-">300</text> 起</text>
              <text class="number">1张</text>
            </view>
          </view>
        </view>

        <view class="goods-item">
          <img
            class="img"
            src="https://img0.baidu.com/it/u=3109450738,2857295278&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
          <view class="info">
            <view class="name">书柜安装</view>
            <view>
              <text class="desc">佛山</text>
              <text class="desc">已服务19871+用户</text>
            </view>
            <view class="tag">
              <text class="time">随叫随到</text>
              <text class="time">最快2小时上门</text>
            </view>
            <view class="price-start">
              <text>￥ <text class="price-">300</text> 起</text>
              <text class="number">1张</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import PageHeader from "../components/page-header";
export default {
  components: {
    PageHeader,
  },

  methods: {
    handleToDetail(){
      uni.navigateTo({
        url: '/community-center/serve-detail',
      })
    }
  },
};
</script>
<style scoped lang="less">
.install {
  background-color: #f7f7f7;

  .top-header {
    position: relative;
    width: 100%;
    height: 400upx;

    background: linear-gradient(
      227deg,
      #8df3f3 4%,
      rgba(126, 249, 249, 0) 100%
    );

    .bg {
      position: absolute;
      bottom: -8upx;
      .img {
        width: 100%;
      }
    }

    .icons {
      position: absolute;
      top: 176upx;
      left: 74upx;
      display: flex;
      align-items: center;

      .item {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 54upx;

        .img {
          width: 30upx;
          padding: 24upx;
          background: url("../static/images/con-center/duobianxing.png")
            no-repeat center;
          background-size: contain;
        }

        .text {
          color: #3d3d3d;
          font-size: 20upx;
          line-height: 2;
        }
      }
    }
  }

  .mian {
    position: relative;
    margin: -80upx auto 0;
    width: 700upx;
    border-radius: 20upx 20upx 0 0;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 40upx;
    box-sizing: border-box;
    z-index: 11;

    .address {
      display: flex;
      align-items: flex-end;
      margin: 0 auto;
      padding-bottom: 0;
      color: #3d3d3d;

      .img {
        width: 32upx;
        margin-right: 8upx;
      }

      .selected {
        font-size: 28upx;
      }

      .desc {
        font-size: 20upx;
      }
    }

    .item {
      color: #3d3d3d;

      .title {
        font-weight: bold;
        margin: 40upx 0;
      }

      .goods-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 60upx;

        .img {
          width: 200upx;
          height: 216upx;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin: 0 76upx;

          .name {
            color: #3d3d3d;
            font-size: 32upx;
          }

          .desc {
            color: #999999;
            font-size: 20upx;

            &:nth-child(1) {
              padding-right: 16upx;
              border-right: 1upx solid #d8d8d8;
            }

            &:nth-child(2) {
              padding-left: 16upx;
            }
          }

          .tag {
            white-space: nowrap;
            padding: 2upx 24upx;
            font-size: 20upx;
            background: linear-gradient(270deg, rgba(7, 185, 185, 0), #07b9b9);
            border-radius: 30upx;
          }

          .time {
            color: #3d3d3d;

            &:nth-child(1) {
              margin-right: 16upx;
            }
          }

          .price-start {
            font-size: 20upx;

            .price- {
              color: #fa5151;
              font-size: 36upx;
              margin: 0 5upx;
            }

            .number {
              width: 60upx;
              height: 26upx;
              display: inline-block;
              text-align: center;
              line-height: 30upx;
              padding: 2upx 0;
              background: linear-gradient(
                128deg,
                #ffc300 0%,
                rgba(255, 255, 255, 0) 100%
              );
              border-radius: 10upx;
              margin-left: 18upx;
            }
          }
        }
      }
    }
  }
}
</style>