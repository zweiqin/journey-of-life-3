<template>
  <view class="community-order-pane-container" v-if="orderDeatil">
    <view class="order-header">
      <view class="order-no"> 订单编号： {{ orderDeatil.orderNo }} </view>
      <view class="order-status">{{ setOrderStatus(orderDeatil.orderStatus) }}</view>
    </view>

    <view class="order-base-info">
      <view class="item">
        <view class="title">服务类型</view>
        <view class="value">{{ orderDeatil.goodsVo.goodsName }}</view>
      </view>

      <view class="item">
        <view class="title">上门地址</view>
        <view class="value">{{ orderDeatil.customerAddress }}-{{ orderDeatil.customerAddressDetail }}</view>
      </view>
    </view>

    <view class="order-op-btns">
      <button class="uni-btn detail"
        @click="go('/order/b-order-form/b-order-form?orderNo=' + orderDeatil.orderNo)">详情</button>
      <view v-for="btn in businessOrderOPButtons" :key="btn.label">
        <button :style="{
          background: btn.color,
          color: '#fff'
        }" @click="$emit('op-order', { orderDeatil, key: btn.key })" class="uni-btn"
          v-if="btn.show(orderDeatil, 'business')">
          {{ btn.label }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { getOrderStatusList, businessOrderOPButtons } from '../config';
export default {
  props: {
    orderDeatil: {
      type: Object,
      required: true
    }
  },

  mounted() {
    this.orderStatusList = getOrderStatusList();
  },

  data() {
    return {
      orderStatusList: [],
      cancelOrderReasonList: [],
      businessOrderOPButtons: Object.freeze(businessOrderOPButtons)
    };
  },

  methods: {
    //  设置订单状态
    setOrderStatus(status) {
      status = Number(status);
      const orderStatusInfo = this.orderStatusList.find((item) => item.value === status);
      if (orderStatusInfo) {
        return orderStatusInfo.label;
      } else {
        return '';
      }
    },

    // 支付订单、
    handleToPayOrder() {
      uni.navigateTo({
        url: '/community-center/pay?price=' + this.orderInfo.actualPrice + '&orderNo=' + this.orderInfo.orderNo
      });
    },

    // 修改订单
    handleEditOrder() {
      let url = this.orderInfo.deliveryType === 4 ? '/community-center/repair' : '/community-center/delivery-install';
      uni.navigateTo({
        url: url + '?orderNo=' + this.orderInfo.orderNo
      });
    }
  }
};
</script>

<style lang="less" scoped>
.community-order-pane-container {
  width: 100%;
  padding: 32upx 34upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20upx;
  margin-bottom: 24upx;

  .order-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28upx;
    color: #222229;
    margin-bottom: 24upx;
    padding-bottom: 24upx;
    border-bottom: 1upx solid #d8d8d8;

    .order-status {
      color: #ef5613;
    }
  }

  .order-base-info {
    .item {
      display: flex;
      align-items: center;
      font-size: 28upx;
      align-items: flex-start;
      margin-bottom: 14upx;
      line-height: 1.5;

      .title {
        white-space: nowrap;
        color: #888889;
        margin-right: 38upx;
      }
    }
  }

  .order-op-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 44upx;

    .uni-btn {
      line-height: 1.5;
      padding: 4upx 22upx;
      background-color: #f5f5f7;
      color: #222229;
      font-size: 28upx;
      border-radius: 10upx;
      margin-left: 24upx;

      &.cancel {
        color: #888889;
      }

      &.pay {
        background-color: #0fab6b;
        color: #fff;
      }
    }
  }
}
</style>
