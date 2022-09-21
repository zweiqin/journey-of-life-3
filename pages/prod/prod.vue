<template>
  <view class="prod-wrapper">
    <view class="carousel">
      <Carousel
        :list="[goodsInfo.info.picUrl]"
        :height="370"
        :top="0"
        :radius="0"
      ></Carousel>
      <img
        @click="back"
        class="back"
        src="../../static/images/store/chevron-states.png"
        alt=""
      />
    </view>

    <view class="promotion">
      <view class="left">
        <view class="top">
          ￥<text class="number">{{ goodsInfo.info.retailPrice }}</text>
          <!-- <view class="tag">
            新人价 <view class="price">￥<text class="number">1900</text></view>
          </view> -->
        </view>

        <view class="bottom">
          <view class="tag">厂家直销</view>
          <view class="tag">会员促销</view>
          <view class="tag">团蜂家具商城</view>
        </view>
      </view>
      <view class="right">
        <view class="fast">
          <img
            class="text"
            src="../../static/images/goods/maiosha.png"
            alt=""
          />
          <img
            class="icon"
            src="../../static/images/goods/miaosha.png"
            alt=""
          />
        </view>

        <view class="time">
          <view class="item">1</view>
          <view class="item">8</view>
          <view class="item">:</view>
          <view class="item">3</view>
          <view class="item">0</view>
        </view>

        <view class="on-time">准时开抢</view>
      </view>
    </view>

    <view class="main">
      <view class="line">
        <view class="left">
          <img
            class="img"
            src="../../static/images/goods/dingdanman.png"
            alt=""
          />
          <text class="coupons">订单满100-10</text>
        </view>
        <view class="right">
          <img class="img" src="../../static/images/goods/xinren.png" alt="" />
          <text class="coupons">新人 满1000-100</text>
        </view>

        <text class="coupons-btn">领劵</text>
      </view>

      <view class="info">
        <view class="left">
          <view class="name">{{ goodsInfo.info.name }}</view>
          <view class="style">家庭餐桌带椅子，白色/灰色</view>
          <view class="ranking"> 第二名 | 家具餐桌热销榜 </view>
        </view>
        <view class="right">
          <div class="item" @click="handleCollect">
            <img
              class="img"
              src="../../static/images/goods/shoucang.png"
              alt=""
            />
            <text class="text">收藏</text>
          </div>
          <div class="item">
            <img
              class="img"
              src="../../static/images/goods/fenxiang.png"
              alt=""
            />
            <text class="text">分享</text>
          </div>
        </view>
      </view>

      <view class="selects">
        <view class="item">
          <view class="title">已选</view>
          <view class="value">灰色 1件 可选套餐</view>
        </view>

        <view class="item">
          <view class="title">服务</view>
          <view class="value">
            <view class="tags-wrapper">
              <view class="tags">
                <img
                  class="img"
                  src="../../static/images/goods/fufei.png"
                  alt=""
                />
                <view class="text">付费组装服务</view>
              </view>
              <view class="tags">
                <img
                  class="img"
                  src="../../static/images/goods/tuihuo.png"
                  alt=""
                />
                <view class="text">退货政策</view>
              </view>
              <view class="tags">
                <img
                  class="img"
                  src="../../static/images/goods/shejizixun.png"
                  alt=""
                />
                <view class="text">设计咨询</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <view class="item">
        <img class="kefu" src="../../static/images/goods/kefu.png" alt="" />
        <text class="text">客服</text>
      </view>
      <view class="item">
        <img class="car" src="../../static/images/goods/gouwuche.png" alt="" />
        <text class="text">购物车</text>
      </view>
      <view class="btns">
        <button>加入购物车</button>
        <button>立即购买</button>
      </view>
    </view>
  </view>
</template>

<script>
import Carousel from "../../components/carousel";
import { getGoodsDetailApi, collectionApi } from "../../api/goods";
import { getUserId } from "../../utils";

export default {
  components: {
    Carousel,
  },
  data() {
    return {
      goodsId: "",
      goodsInfo: {},
    };
  },
  methods: {
    back() {
      uni.navigateBack();
    },

    async getGoodsDetail() {
      const res = await getGoodsDetailApi(this.goodsId);

      if (res.errno === 0) {
        this.goodsInfo = res.data;
        console.log(res.data);
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
        });
      }
    },

    async handleCollect() {
      const res = await collectionApi({
        userId: getUserId(),
        type: 0,
        valueId: this.goodsId,
      });

      console.log(res);
    },
  },

  onLoad(options) {
    this.goodsId = options.goodsId;
    this.getGoodsDetail();
  },
};
</script>

<style lang="less" scoped>
.prod-wrapper {
  padding-bottom: 120upx;

  .carousel {
    position: relative;
    z-index: 10;
    .back {
      position: fixed;
      top: 28upx;
      left: 10upx;
      width: 48upx;
      height: 48upx;
    }
  }

  .promotion {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 28upx;
    background-color: #089a9d;
    box-sizing: border-box;
    border-radius: 20upx 20upx 0 0;
    margin-top: -28upx;
    z-index: 11;

    .left {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      background-color: #09b8b8;
      padding-top: 16upx;
      padding-left: 28upx;
      padding-bottom: 12upx;

      .top {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 24upx;
        margin-bottom: 16upx;
        .number {
          font-size: 36upx;
        }

        .tag {
          color: #3b4a50;
          padding: 14upx 24upx;
          border-radius: 20upx 20upx 20upx 0;
          margin-left: 22upx;
          background: linear-gradient(
            276deg,
            #c7f5f5 53%,
            #ffffff 100%,
            rgba(199, 245, 245, 0) 100%
          );

          .price {
            padding: 0;
          }
        }
      }

      .bottom {
        color: #fff;
        font-size: 16upx;
        display: flex;
        align-items: center;

        .tag {
          padding: 2upx 22upx;
          background-color: #1f9695;
          color: #fff;
          border-radius: 20upx;
          margin-right: 18upx;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: #09b8b8;
      padding-top: 16upx;
      padding-right: 28upx;
      padding-bottom: 12upx;
      box-sizing: border-box;

      .fast {
        .text {
          width: 100upx;
        }

        .icon {
          width: 30upx;
        }
      }

      .time {
        display: flex;
        margin: 6upx 0;

        .item {
          width: 12upx;
          height: 28upx;
          text-align: center;
          line-height: 28upx;
          background-color: #fff;
          padding: 4upx;
          margin-right: 8upx;
          font-size: 20upx;
        }
      }

      .on-time {
        font-size: 20upx;
        color: #fff;
      }
    }
  }

  .main {
    box-sizing: border-box;
    padding: 16upx 22upx;

    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48upx;
      background-color: #f9eeed;
      padding: 0 28upx;

      .left,
      .right {
        position: relative;

        .coupons {
          width: 100%;
          position: absolute;
          top: 4upx;
          left: 50%;
          font-size: 20upx;
          transform: scale(0.8) translateX(-50%);
        }
      }

      .coupons-btn {
        color: #fa5151;
        font-size: 20upx;
        transform: scale(0.8);
      }

      .img {
        width: 228upx;
        height: 28upx;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: 18upx 0;

      .name {
        color: #3d3d3d;
        font-size: 28upx;
        line-height: 32upx;
        font-weight: bold;
        margin-bottom: 16upx;
      }

      .style {
        font-size: 24upx;
        color: #999;
      }

      .ranking {
        color: #aa5b0d;
        padding: 8upx 14upx;
        margin: 12upx auto 0 auto;
        font-size: 24upx;
        background: linear-gradient(
          209deg,
          #ffd54e 0%,
          rgba(255, 195, 0, 0) 100%
        );
        border-radius: 10upx;
        border: 1px solid #ffc300;
      }

      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-right: 34upx;
          &:nth-child(2) {
            margin-right: 0;
          }

          .img {
            width: 34upx;
          }

          .text {
            color: #999;
            font-size: 16upx;
            transform: scale(0.9);
          }
        }
      }
    }

    .selects {
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 24upx 0;
        border-bottom: 1upx solid #d8d8d8;

        .title {
          color: #999999;
          font-size: 24upx;
          margin-right: 52upx;
        }

        .value {
          color: #3d3d3d;
          font-size: 24upx;

          .tags-wrapper {
            width: 100%;
            display: flex;
            align-items: center;

            .tags {
              display: flex;
              align-items: center;
              color: #0256ff;
              margin-right: 50upx;

              .img {
                width: 20upx;
                margin-right: 6upx;
              }
            }
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 116upx;
    display: flex;
    align-items: center;
    padding: 14upx 22upx;
    background-color: #fff;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 20upx;

      .kefu {
        width: 40upx;
      }

      .text {
        color: #3d3d3d;
        font-size: 16uxp;
        transform: scale(0.8);
      }

      .car {
        width: 34upx;
      }
    }

    .btns {
      display: flex;
      margin-top: -20upx;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88upx;
        padding: 20upx 40upx;
        color: #fff;
        font-size: 36upx;
        background-color: #07b9b9;

        &:nth-child(1) {
          border-radius: 40upx 0 0 40upx;
        }

        &:nth-child(2) {
          background-color: #fa5151;
          border-radius: 0 40upx 40upx 0;
        }
      }
    }
  }
}
</style>