<template>
  <view class="confirm-order">
    <PageHeader
      style="margin: 0 auto; position: inherit"
      title="确认订单"
    ></PageHeader>

    <view class="order-item order-info">
      <view class="item">
        <view class="tag">团蜂家居社区</view>
        <view class="text">空调安装</view>
      </view>

      <view class="item size">
        <view class="size-item">
          <view class="name">空调品牌</view>
          <view class="value">某格</view>
        </view>
        <view class="size-item">
          <view class="name">尺寸</view>
          <view class="value">正一匹</view>
        </view>
        <view class="size-item">
          <view class="name">安装数量</view>
          <view class="value">某格</view>
        </view>
      </view>

      <LineBar v-for="item in confirmConfig" :key="item.label" :data="item">
        <template v-if="item.id === 0">
          <view class="desc" style="color: #07b9b9"
            >佛山市顺德区龙江镇亚洲国际材料交易中心 五栋三楼团蜂科技</view
          >
        </template>
        <template v-if="item.id === 1">
          <view class="desc" style="color: #ff8f1f"
            >08月18日（周四）19：00</view
          >
        </template>
        <template v-if="item.id === 2">
          <view class="desc">可填写特殊需求</view>
        </template>
      </LineBar>

      <view class="tip">
        <view class="title">温馨提示:</view>
        <view
          >订单可在服务2小时前取消，超过服务时间2小时后
          取消将扣取服务费50元</view
        >
      </view>
    </view>

    <LineBar
      v-for="item in otherConfirm"
      :key="item.label"
      :data="item"
    ></LineBar>

    <view class="footer">
      <view class="app-price"> ￥<text class="number">300</text>明细 </view>
      <button @click="handleAppoint" class="btn">预约并支付</button>
    </view>

    <view
      class="modal-wrapper"
      v-show="isShowModal"
      :class="{ active: isShowModal }"
    >
      <view class="modal" @click.stop="handleClose"> </view>
      <view class="main">
        <view class="item order-name">
          <view class="type">安装服务</view>
          <view class="value">空调服务</view>
        </view>

        <view class="item">
          <view class="type">订单编号</view>
          <view class="value">63764758671526</view>
        </view>

        <view class="item">
          <view class="type">安装服务</view>
          <view class="value">300元</view>
        </view>

        <view class="item">
          <view class="type">支付方式</view>
          <view class="value">微信</view>
        </view>

        <view class="item">
          <view class="type">收款方</view>
          <view class="value">团蜂家居</view>
        </view>

        <view class="op">
          <view class="order-price"> ￥300</view>
          <button class="btn" @click="handleToPay">确定支付</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from "../components/page-header";
import LineBar from "../components/line-bar";
import { getConfirmConfig, getConfirmOther } from "./config";
export default {
  components: {
    PageHeader,
    LineBar,
  },
  data() {
    return {
      confirmConfig: getConfirmConfig(),
      otherConfirm: getConfirmOther(),
      isShowModal: false,
    };
  },

  onShow() {
    this.isShowModal = false;
  },

  methods: {
    /**
     * @description 关闭modal
     */
    handleClose() {
      this.isShowModal = !this.isShowModal;
    },

    /**
     * @description 点击预约与支付按钮
     */
    handleAppoint() {
      this.isShowModal = true;
    },

    /**
     * @description 点击确定支付
     */
    handleToPay() {
      uni.navigateTo({
        url: "/community-center/order",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.confirm-order {
  padding: 60upx 20upx;
  background: linear-gradient(183deg, #07b9b9 0%, rgba(7, 185, 185, 0) 100%);
  height: 100%;

  .desc {
    color: #999999;
    font-size: 20upx;
  }

  .order-item {
    margin: 0 auto;
    border-radius: 20upx;
    background-color: #fff;
    padding: 18upx;

    .tip {
      display: flex;
      font-size: 24upx;
      margin-top: 20upx;
      .title {
        flex-shrink: 0;
        margin-right: 2upx;
      }
    }

    &.order-info {
      margin-top: 60upx;

      .item {
        display: flex;

        .tag {
          background-color: #ff8f1f;
          border-radius: 20upx;
          font-size: 20upx;
          transform: scale(0.9);
          padding: 12upx 24upx;
        }

        .text {
          color: #3d3d3d;
          font-size: 36upx;
        }
      }

      .size {
        &-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #3d3d3d;

          .name {
            font-size: 20upx;
            transform: scale(0.9);
            margin: 36upx 0 24upx;
          }

          .value {
            font-size: 24upx;
            font-weight: bold;
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    padding: 0 46upx;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 112upx;
    box-sizing: border-box;

    .app-price {
      color: #999999;
      font-size: 20upx;
      flex: 1;

      .number {
        color: #fa5151;
        font-size: 32upx;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 256upx;
      height: 72upx;
      background-color: #fa5151;
      color: #fff;
      font-size: 36upx;
      float: right;
    }
  }

  .modal-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;

    &.active {
      .modal {
        opacity: 1;
        z-index: 10;
      }

      .main {
        transform: translateY(0);
      }
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(239, 239, 239, 0.5);
      transition: all 350ms;
      opacity: 0;
      z-index: -1;
    }

    .main {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      border-radius: 20upx 20upx 0 0;
      padding: 100upx 80upx;
      box-shadow: 0px 0px 0px #07b9b9;
      box-sizing: border-box;
      box-shadow: 0px -4px 5px 0px rgba(0, 0, 0, 0.1);
      transform: translateY(100%);
      z-index: 100;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20upx 0;
      }

      .type,
      .value {
        color: #999999;
        font-size: 28upx;
      }

      .value {
        color: #3d3d3d;
      }

      .order-name {
        padding-bottom: 20upx;
        border-bottom: 1upx solid #d8d8d8;
      }

      .op {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        width: 100%;
        .order-price {
          color: #fa5151;
          font-size: 48upx;
          margin-bottom: 20upx;
        }

        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 256upx;
          height: 72upx;
          background-color: #07b9b9;
          color: #fff;
          font-size: 36upx;
          float: right;
        }
      }
    }
  }
}
</style>