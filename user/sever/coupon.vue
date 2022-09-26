<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-16 11:42:13
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-21 19:20:14
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\sever\coupon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="background">
      <!-- 标题栏 -->
      <view class="coupon-title">
        <view class="title-img">
          <img
            @click="back"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1676ilbo4t26udpy067z.png"
            alt=""
            class="img"
          />
        </view>
        <view class="title-text">优惠券</view>
      </view>
      <!-- 优惠券上部分 -->
      <view class="coupon-top">
        <view class="first">
          <image
            src="../../static/images/lqb/coupon/first.png"
            alt=""
            class="first-img"
          >
            <view class="second">
              <view class="second-left">
                <view class="left-text">100</view>
              </view>
              <view class="second-right">
                <view class="right-top">订单满200-100</view>
                <view class="right-bottom">立即使用</view>
              </view>
            </view>
            <view class="thire">
              <img
                class="thire-img"
                src="../../static/images/lqb/coupon/first-blue.png"
                alt=""
              />
              <view class="thire-text">优惠券</view>
              <view class="rmb">RMB</view>
            </view>
          </image>
        </view>
      </view>
      <!-- 优惠券剩下部分 -->
      <view class="coupon-else">
        <view class="else-top">
          <img
            src="../../static/images/lqb/coupon/people-text .png"
            alt=""
            class="top-img"
          />
          <view class="coupon-middle">
            <image
              class="middle"
              src="../../static/images/lqb/coupon/coupon-white.png"
              mode=""
            >
            </image>
            <view class="middle-first">
              <view class="middle-left">
                <view class="left-english">RMB</view>
                <view class="left-number">50</view>
              </view>
              <view class="middle-middle">
                <view class="top">每满500使用 上不封顶</view>
                <view class="bottom">（可跨店使用）</view>
              </view>
              <view class="middle-right">
                <view class="right-text">下单立减</view>
              </view>
            </view>
            <view class="middle-second">
              <view class="second-left">
                <view class="left-background">
                  <img
                    src="../../static/images/lqb/coupon/gouwujin.png"
                    alt=""
                    class="left-img"
                  />
                  <view class="left-right">
                    <view class="shop-money">购物金</view>
                    <view class="shopmoney-detail">拼团领取购物金</view>
                    <view class="background-text">去拼团</view>
                  </view>
                </view>
              </view>
              <view class="second-left">
                <view class="left-background">
                  <img
                    src="../../static/images/lqb/coupon/fenxiang.png"
                    alt=""
                    class="left-img"
                  />
                  <view class="left-right">
                    <view class="shop-money">分享券</view>
                    <view class="shopmoney-detail">分享领取优惠券</view>
                    <view class="background-text">去分享</view>
                  </view>
                </view>
              </view>
            </view>
            <!-- <view class="middle-thire">
              <view class="background">
                <view class="left-view">享半价</view>
                <view class="right-view">
                  <view class="right-top">全店前10名付款</view>
                  <view class="right-bottom">
                    <view class="thire">9月15日 18：00开启</view>
                    <view class="first"> <view class="second"> </view></view>
                  </view>
                </view>
              </view>
            </view> -->
            <!-- <view class="blue-off">
              <img
                src="../../static/images/lqb/coupon/bigbule.png"
                alt=""
                class="img"
              />
              <view class="off-text">50%OFF</view>
            </view>
          </view>
          <view class="else-bottom">
            <img
              src="../../static/images/lqb/coupon/好物推荐 直降100.png"
              alt=""
              class="title"
            />
      
    
          </view>
                    <view>
              <Goods></Goods>
          </view> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Goods from "../../components/goods/coupon";
export default {
  components: {
    Goods,
  },

  methods: {
    back() {
      uni.switchTab({
        url: "/pages/user/user",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.background {
  background-color: #fa5151;
  width: 100%;
  .coupon-title {
    display: flex;
    color: white;
    align-items: center;

    padding-top: 74upx;
    padding-bottom: 56upx;
    .title-img {
      padding-left: 48upx;
      .img {
        height: 32upx;
        width: 22upx;
      }
    }
    .title-text {
      font-size: 32upx;
      padding-left: 248upx;
    }
  }
  .coupon-top {
    margin-bottom: 30upx;
    .first {
      border-radius: 20upx;
      background: #efefef;
      height: 210upx;
      width: 95%;
      margin: 0 auto;
      z-index: 10;
      .first-img {
        padding-top: 10upx;
        height: 200upx;
        width: 100%;
      }
    }
    .second {
      display: flex;
      position: absolute;
      top: 212upx;
      left: 90upx;

      .second-left {
        .left-text {
          font-size: 100upx;
          font-weight: 500;
          color: white;
        }
      }
      .second-right {
        padding-left: 44upx;
        padding-top: 20upx;
        .right-top {
          font-size: 28upx;
          font-weight: 500;
          padding-bottom: 16upx;
          color: linear-gradient(
            180deg,
            #492504 0%,
            rgba(0, 0, 0, 0) 100%,
            rgba(226, 18, 18, 0) 100%
          );
        }
        .right-bottom {
          text-align: center;
          font-size: 24upx;
          font-weight: 350;
          color: white;
          background-color: black;
          border-radius: 20upx;
          padding: 6upx 20upx;
        }
      }
    }
    .thire {
      .thire-img {
        width: 100upx;
        height: 75upx;
        position: absolute;
        top: 172upx;
        left: 212upx;
      }
      .thire-text {
        position: absolute;
        color: white;
        font-size: 24upx;
        font-weight: 500;
        top: 182upx;
        left: 226upx;
      }
      .rmb {
        color: white;
        position: absolute;
        top: 260upx;
        left: 242upx;
        font-size: 20upx;
        font-weight: 500;
        background: linear-gradient(90deg, #fa885f 30%, #fa875f 50%);
        border-radius: 10upx;
        padding: 5upx;
      }
    }
  }
  .coupon-else {
    background: #efefef;
    width: 92%;
    padding: 6upx;
    border-radius: 20upx;
    margin: 0 auto;
    .else-top {
      background: linear-gradient(180deg, #f49b00 -90%, #f97676 99%);
      height: 688.3px;
      border-radius: 20upx;
      width: 100%;
      .top-img {
        width: 520upx;
        padding-left: 88upx;
        padding-top: 32upx;
        margin: 0 auto;
        padding-bottom: 28upx;
      }
      .coupon-middle {
        width: 650upx;
        margin: 0 auto;

        .middle {
          width: 650upx;
          height: 174upx;
        }
        .middle-first {
          display: flex;
          position: absolute;
          top: 303px;
          left: 36px;

          .middle-left {
            display: flex;
            padding-right: 22upx;
            .left-english {
              width: 34upx;
              transform: rotate(90deg);
              font-size: 20upx;
              font-weight: 700;
              margin-right: 50upx;
              margin-bottom: 35px;
            }
            .left-number {
              font-size: 110upx;
              font-weight: 500;
            }
          }
          .middle-middle {
            padding-right: 76upx;
            padding-top: 20upx;
            .top {
              width: 170upx;
              text-align: center;
              font-size: 28upx;
              font-weight: 500;
              padding-bottom: 10upx;
            }
            .bottom {
              font-size: 24upx;
              font-size: 350;
              color: #fa5151;
            }
          }
          .middle-right {
            .right-text {
              font-size: 24upx;
              width: 38upx;
              height: 148upx;
              color: white;
              padding-top: 8upx;
              padding-left: 8upx;
              border-radius: 40upx;
              background: linear-gradient(
                180deg,
                #07b9b9 0%,
                rgba(7, 185, 185, 0) 136%
              );
            }
          }
        }
      }
      .middle-second {
        display: flex;
        justify-content: space-around;
        .second-left {
          display: flex;
          .left-background {
            background: linear-gradient(180deg, #fefcfc 0%, #f0dede 100%);
            height: 170upx;
            width: 300upx;
            border-radius: 20upx;
            display: flex;
            .left-img {
              width: 52upx;
              height: 52upx;
              margin: 16upx 18upx 0upx 22upx;
            }
            .left-right {
              .shop-money {
                font-size: 32upx;
                font-weight: 600;
                margin: 28upx 0 6upx 0;
              }
              .shopmoney-detail {
                font-size: 24upx;
                font-weight: 400;
                margin: 0 0 6upx 0;
              }
              .background-text {
                border-radius: 40upx;
                background: linear-gradient(
                  360deg,
                  #07b9b9 1%,
                  rgba(7, 185, 185, 0) 143%
                );
                box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
                width: 132upx;
                height: 35upx;
                color: white;
                font-size: 24upx;
                font-weight: 500;
                padding-top: 5upx;
                text-align: center;
              }
            }
          }
        }
      }
      .middle-thire {
        margin-top: 30upx;
        .background {
          border-radius: 20upx;
          background: linear-gradient(180deg, #fdfbfb 0%, #f0dfdf 100%);
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
          width: 635upx;
          height: 172upx;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          .left-view {
            width: 180upx;
            font-size: 60upx;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            background: linear-gradient(180deg, #f78150 0%, #fa5151 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 70upx 0 0 40upx;
          }
          .right-view {
            margin-top: 46upx;
            margin-right: 20upx;
            .right-top {
              font-size: 40upx;
              color: #3d3d3d;
            }
            .right-bottom {
              margin-right: 42upx;

              .thire {
                font-size: 20upx;
                font-weight: 350;
                color: white;
                position: absolute;
                margin-top: 3upx;
                z-index: 200;
                margin-left: 50upx;
              }
              .first {
                left: 141px;
                top: 39px;
                width: 143px;
                height: 20px;
                border-radius: 50px;
                background: linear-gradient(
                  180deg,
                  #000000 37%,
                  rgba(135, 132, 132, 0) 200%
                );
                .second {
                  position: relative;
                  left: 20upx;
                  top: 10upx;
                  width: 58upx;
                  height: 18upx;
                  border-radius: 40upx;
                  background: #82d8d9;
                  box-sizing: border-box;
                  border: 1px solid #ffffff;
                }
              }
            }
          }
        }
      }
      .blue-off {
        position: relative;
        top: -144upx;
        left: 160upx;
        .img {
          width: 132upx;
          height: 46upx;
        }
        .off-text {
          font-size: 24upx;
          color: white;
          position: relative;
          top: -54upx;
          left: 14upx;
        }
      }
      .else-bottom {
        display: flex;
        .title {
          width: 480upx;
          height: 66upx;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>