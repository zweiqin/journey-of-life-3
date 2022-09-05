<template>
  <view class="order-panel">
    <PageHeader title="订单详情"></PageHeader>
    <view class="status" :style="statusStyles">
      {{ status ? "交易完成" : "交易待完成" }}
    </view>

    <!-- 客户信息 -->
    <view class="item" style="margin: 0">
      <view class="line" v-for="item in baseInfo" :key="item.id">
        <img class="icon" :src="item.icon" alt="" />
        <view class="text">{{ item.label }}</view>
        <view class="text-value">
          <template v-if="item.id === 0"> 蔡大拿 19877665544 </template>
          <template v-if="item.id === 1">
            <view style="color: #ff8f1f" class="text"
              >08月18日（周四）19：00
            </view>
          </template>
          <template v-if="item.id === 2">
            <view class="text" style="color: #07b9b9"
              >佛山市顺德区龙江镇亚洲国际材料交易中心 五栋三楼团蜂科技</view
            >
          </template>
        </view>
      </view>

      <!-- 订单信息 -->
      <view class="order-info">
        <view class="flex">
          <view class="text">服务站</view>
          <view class="text-value">团蜂家居社区服务站</view>
        </view>

        <view class="flex">
          <view class="text">安装进度</view>
          <view class="text-value">
            <view class="tag">师傅已上门</view>
            <view class="text-desc">师傅未上门</view>
          </view>
        </view>

        <view class="flex">
          <view class="text">服务信息</view>
          <view class="text-value">空调安装</view>
        </view>

        <view class="flex">
          <view class="text">支付金额</view>
          <view class="text-value">
            <view class="text-desc">共2件商品</view>
            <view class="text">300元</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 评价 -->
    <view class="item aftermarket">
      <view class="flex">
        <view class="text"> 满意 </view>

        <view class="stars">
          <img
            class="star"
            src="../../static/images/con-center/star-active.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star-active.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star-active.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star.png"
            alt=""
          />
        </view>
        <button class="pub">发布</button>
      </view>

      <view class="flex">
        <view class="text">评论</view>
        <view class="text-value">师傅上门速度很快，安装很到位，非常满意!</view>
      </view>

      <view class="flex">
        <view class="text">晒图</view>
        <view class="text-value">师傅上门速度很快，安装很到位，非常满意!</view>
      </view>
    </view>

    <!-- 订单疑问 -->
    <view class="item flex" style="justify-content: space-between">
      <view class="text" style="margin: 0">订单疑问</view>
      <img src="../../static/images/common/chevron-states.png" alt="" />
    </view>

    <!-- 详细信息 -->
    <view class="item detail">
      <view class="title" style="fontsize: 14px">详细信息</view>
      <view class="flex">
        <view class="text">订单编号</view>
        <view class="text-value">1492587554125547864</view>
      </view>
      <view class="flex">
        <view class="text">订单编号</view>
        <view class="text-value">1492587554125547864</view>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <view class="guess">
      <view class="title">猜你喜欢</view>
      <view class="guess-goods">
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
      </view>
    </view>

    <!-- 底部两个按钮 -->
    <view class="footer">
      <button class="btn">删除订单</button>
      <button class="btn">再次预约</button>
    </view>
  </view>
</template>

<script>
import PageHeader from "../page-header";
import LineBar from "../line-bar";
import Goods from "../goods";

import { getBaseInfo } from "./config";
export default {
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "goods",
    },
  },

  data() {
    return {
      baseInfo: [],
    };
  },

  components: {
    PageHeader,
    LineBar,
    Goods,
  },

  mounted() {
    this.baseInfo = getBaseInfo(this.type);
  },

  computed: {
    statusStyles() {
      return {
        background: this.status
          ? "linear-gradient(270deg,  rgba(0,181,120,0), #07B9B9)"
          : "linear-gradient(270deg,#FFFFFF,  #FA5151)",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.order-panel {
  background-color: #efefef;

  .flex {
    display: flex;
    align-items: center;
  }

  .text {
    color: #3d3d3d;
    font-size: 20upx;
    flex-shrink: 0;
    margin: 0 20upx 0 20upx;
  }

  .text-value {
    font-size: 20upx;
  }

  .status {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 124upx;
    color: #fff;
    font-size: 36upx;
    height: 114upx;
    margin-top: 120upx;

    &::before {
      position: absolute;
      content: "";
      left: 60upx;
      width: 44upx;
      height: 44upx;
      background: url("../../static/images/con-center/status.png");
      background-size: cover;
    }
  }

  .item {
    padding: 34upx 68upx;
    background-color: #fff;
    margin-top: 30upx;

    .flex {
      justify-content: space-between;
      align-items: flex-start;

      .text {
        margin: 0;
      }
    }

    &.detail {
      .flex {
        margin: 16upx 0;
      }
    }

    &.aftermarket {
      .flex {
        margin: 40upx 0;
      }
      .text-value {
        text-align: left;
      }

      .stars {
        flex: 1;
        text-align: right;
        margin-right: 40upx;
        .star {
          width: 40upx;
          margin-right: 10upx;
        }
      }

      .pub {
        width: 108upx;
        height: 40upx;
        line-height: 40upx;
        font-size: 24upx;
        color: #fff;
        background-color: #07b9b9;
      }
    }

    .order-info {
      padding-top: 30upx;
      border-top: 1upx solid #d8d8d8;

      .flex {
        margin: 30upx 0;
      }

      .text-value {
        display: flex;
        justify-content: flex-end;
        .tag {
          padding: 2upx 10upx;
          background-color: #ff9831;
          border-radius: 10upx;
          color: #fff;
          margin-right: 30upx;
        }

        .text-desc {
          color: #999999;
        }
      }
    }

    .line {
      display: flex;
      align-items: flex-start;
      margin: 36upx 0;

      // &:last-of-type(3) {
      //   padding-bottom: 30upx;
      // }

      &:nth-child(1) {
        margin-top: 0upx;
      }

      .icon {
        width: 26upx;
      }
    }
  }

  .guess {
    padding: 26upx;
    background-color: #fff;

    .title {
      color: #3d3d3d;
      font-size: 28upx;
      margin-bottom: 22upx;
    }

    .guess-goods {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 36upx 40upx 36upx 0;
    background-color: #fff;
    box-sizing: border-box;

    .btn {
      width: 180upx;
      height: 68upx;
      box-sizing: border-box;
      color: #3D3D3D;
      font-size: 28upx;
      border: 1upx solid #999999;
      background: #fff;
      margin: 0;
      margin-left: 56upx;
    }
  }
}
</style>