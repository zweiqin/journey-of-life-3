<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-15 16:03:19
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-19 14:19:52
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\sever\userUp.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="background">
      <!-- 标题 -->
      <view class="userup-title">
        <view class="left-view">
          <img
            @click="back"
            class="left-img"
            src="../../static/images/lqb/userUp/whiteback.png"
            alt=""
          />
        </view>
        <view class="middle-view">
          <view class="text">会员升级</view>
        </view>
        <view class="right-view"> </view>
      </view>
      <!-- 会员卡标题 -->
      <view class="userup-text"> 我的会员卡 </view>
      <!-- 会员详情 -->
      <view class="userup-detail">
        <view class="detail-orange">
          <view class="detail-text"> 会员时间: 2022.07.22-2023.07.22 </view>
          <view class="detail-white">
            <view class="detail-top">
              <view class="detail-username"> 团蜂家居会员 </view>
              <img
                src="../../static/images/lqb/userUp/huangguan .png"
                alt=""
                class="top-img"
              />
              <view class="up-text">升级</view>
            </view>
            <view class="detail-bottom">
              <view class="user-type">
                <view class="type-text">会员状态</view>
                <view class="type-number">会员</view>
              </view>
              <view class="mycoupon">
                <view class="coupon-text">我的优惠券</view>
                <view class="coupon-number">10</view>
              </view>
              <view class="shopmoney">
                <view class="shopmoney-text">购物金</view>
                <view class="shopmoney-number">10</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 会员升级介绍 -->
      <view class="userup-say">
        <view class="say-text"> 会员升级 </view>
        <view class="say-img">
          <img
            class="img"
            src="../../static/images/lqb/userUp/huangguan .png"
            alt=""
          />
        </view>
        <view class="userup-good">
          <view class="good-title">
            <view class="left-view">会员升级权益 </view>
            <view class="right-view">
              <view class="right-text">更多权益了解详情</view>
              <img
                @click="window"
                src="../../static/images/lqb/userUp/goods-detail.png"
                alt=""
                class="right-img"
            /></view>
          </view>
          <view class="good-detail">
            <img
              src="../../static/images/lqb/userUp/user-detail.png"
              alt=""
              class="detail-img"
            />
          </view>
          <view class="bottom-button">
            <view class="button-background">
              <view class="button-text">
                <text
                  style="
                    font-size: 36upx;
                    padding-left: 150upx;
                    padding-top: 28upx;
                  "
                  >￥</text
                >
                <text style="font-size: 72upx">99</text>
                <view>
                  <text
                    style="
                      font-size: 36upx;
                      padding-left: 38upx;
                      font-weight: 700;
                    "
                    >会员升级</text
                  >
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 分界线 -->
        <view class="fenjiexian"></view>
        <!-- 底部说明 -->
        <view class="bottom-text">放心开通，不会自动续费</view>
      </view>

      <!-- 详情弹窗 -->
      <view>
        <uni-popup ref="popup" :type="bottom">
          <view class="detail-window">
            会员升级权益
            <text class="window-text">
              <br />
              <br />
              什么是VIP会员？  历时6个多月 累计整理8000+篇案例素材
              秉承： 不是干货不分享 的理念， 过滤掉
              过时的，不实用的，不落地的内容， 精心挑细选出
              600+实体店营销精品案例 没有大而复杂的理论；
              只有看完立马可以借鉴落地实操案例 无论你是线下什么行业的实体店
              只要有目标人群， 只要你需要客源方法都值得借鉴。 等级介绍一、
              VIP会员（1年期限） 1年内可以学习800+个实体店营销案例解析
              成为我们的VIP会员后， 你可以一年365天内学习营销宝库的案例
              可以得到一个属于自己的线上门店 不用但心产品的问题
              我们就是你最好的供应链
            </text>
          </view>
        </uni-popup>
      </view>
    </view>
  </view>
</template>

<script>
import uniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
export default {
  components: { uniPopup },
  data() {
    return {};
  },
  methods: {
    window() {
      this.$refs.popup.open("bottom");
    },
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
  background: url("../../static/images/lqb/userUp/background.png");
  height: 100%;
  padding-bottom: 44upx;
  .userup-title {
    display: flex;
    color: white;
    padding-top: 74upx;
    .left-view {
      .left-img {
        margin-left: 34upx;
        width: 16upx;
        height: 28upx;
      }
    }
    .middle-view {
      .text {
        margin-left: 260upx;
        font-size: 32upx;
        font-weight: 500;
      }
    }
  }
  .userup-text {
    color: white;
    padding-top: 22upx;
    margin-left: 62upx;
    font-size: 28upx;
    font-weight: 500;
    padding-bottom: 22upx;
  }
  .userup-detail {
    margin-bottom: 22upx;
    .detail-orange {
      background: linear-gradient(180deg, #ff8f1f 2%, #ffc300 50%);
      width: 95%;
      margin: 0 auto;
      border-radius: 20upx;
      padding-top: 14upx;

      .detail-text {
        color: white;
        padding-bottom: 6upx;
        font-size: 20upx;
        padding-left: 35upx;
      }
      .detail-white {
        padding-top: 34upx;
        background-color: white;
        padding-left: 35upx;
        padding-right: 35upx;
        border-radius: 20upx;
        .detail-top {
          display: flex;
          align-items: center;
          padding-bottom: 22upx;
          .detail-username {
            font-size: 32upx;
            font-weight: 400;
          }
          .top-img {
            widows: 36upx;
            height: 36upx;
            margin-left: 14upx;
            margin-right: 14upx;
          }
          .up-text {
            border-radius: 10upx;
            background: #ff8f1f;
            font-size: 24upx;
            font-weight: 400;
            color: white;
            padding: 5upx 20upx;
          }
        }
        .detail-bottom {
          display: flex;
          .user-type {
            margin-right: 88upx;
            .type-text {
              color: #999999;
              font-size: 24upx;
              font-weight: 400;
              margin-bottom: 16upx;
            }
            .type-number {
              font-size: 28upx;
              font-weight: 400;
            }
          }
          .mycoupon {
            margin-right: 88upx;
            .coupon-text {
              color: #999999;
              font-size: 24upx;
              font-weight: 400;
              margin-bottom: 16upx;
            }
            .coupon-number {
              font-size: 28upx;
              font-weight: 400;
            }
          }
          .shopmoney {
            .shopmoney-text {
              color: #999999;
              font-size: 24upx;
              font-weight: 400;
              margin-bottom: 16upx;
            }
            .shopmoneyo-number {
              font-size: 28upx;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .userup-say {
    background-color: white;

    margin: 0 auto;
    border-radius: 20upx;
    width: 95%;
    .say-text {
      font-size: 28upx;
      font-weight: 500;
      padding-top: 24upx;
      padding-left: 45upx;
      padding-bottom: 38upx;
    }
    .say-img {
      text-align: center;
      width: 87%;
      height: 180upx;
      border-radius: 20upx;
      border: 2upx solid#FFC300;
      background: linear-gradient(
        180deg,
        #fff8c6 0%,
        rgba(255, 248, 198, 0) 104%
      );
      line-height: 180upx;

      margin: 0 auto;
      .img {
        width: 143upx;
        height: 130upx;
        padding: 26upx;
      }
    }
    .userup-good {
      padding-top: 60upx;

      .good-title {
        display: flex;
        justify-content: space-between;
        align-content: center;
        padding: 0 40upx;
        .left-view {
          font-size: 24upx;
          font-weight: 350;
          color: #3d3d3d;
        }
        .right-view {
          display: flex;
          align-items: center;
          .right-text {
            font-size: 20upx;
            font-weight: 350;
            color: #999999;
          }
          .right-img {
            width: 13upx;
            height: 20upx;
            margin-left: 15upx;
          }
        }
      }
      .good-detail {
        .detail-img {
          padding-top: 44upx;
          padding-left: 44upx;
          padding-bottom: 180upx;
        }
      }
      .bottom-button {
        padding-bottom: 32upx;
        .button-background {
          margin: 0 auto;
          border-radius: 20upx;
          background: linear-gradient(90deg, #ff8f1f 13%, #ffc300 100%);
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
          width: 83%;
          height: 104upx;
          .button-text {
            color: white;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .fenjiexian {
      border: 0.5px solid #d8d8d8;
      width: 82%;
      margin: 0 auto;
    }
    .bottom-text {
      padding-top: 24upx;
      padding-bottom: 76upx;
      font-size: 20upx;
      font-weight: 350;
      color: #999999;
      text-align: center;
    }
  }
  .detail-window {
    position: fixed;
    height: 1000upx;
    width: 95%;
    background-color: white;
    margin: 0 auto;
    border-radius: 20upx;
    z-index: 100;
    bottom: 0;
    left: 2.5%;
    text-align: center;
    font-weight: 700;
    .window-text {
    }
  }
}
</style>