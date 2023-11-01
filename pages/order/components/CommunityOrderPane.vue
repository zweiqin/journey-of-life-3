<template>
  <view class="community-order-pane-container" v-if="orderInfo" @click="handleViewOrderDetail">
    <view class="order-header">
      <view class="order-no"> 订单编号： {{ orderInfo.orderNo }} </view>
      <view class="order-status">{{ setOrderStatus(orderInfo.status) }}</view>
    </view>

    <view class="order-base-info">
      <view class="item">
        <view class="title">服务类型</view>
        <view class="value">{{ orderInfo.dictName }}</view>
      </view>

      <view class="item">
        <view class="title">上门地址</view>
        <view class="value">{{ orderInfo.consigneeAddress }}-{{ orderInfo.consigneeAddressDetail }}</view>
      </view>
    </view>

    <view class="order-op-btns">
      <button class="uni-btn detail">详情</button>
      <button class="uni-btn pay" v-if="orderInfo.status === 0" @click.stop="handleToPayOrder">去付款</button>
      <button class="uni-btn cancel" v-if="orderInfo.status <= 2" @click.stop="$emit('cancel', orderInfo)">取消</button>
      <button class="uni-btn edit" v-if="orderInfo.status <= 2" @click.stop="handleEditOrder">修改</button>
    </view>
  </view>
</template>

<script>
import { communityOrderStatusList } from '../config';
export default {
  props: {
    orderInfo: {
      type: Object,
      required: true
    }
  },

  mounted() {
    this.orderStatusList = communityOrderStatusList;
  },

  data() {
    return {
      orderStatusList: [],
      cancelOrderReasonList: []
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

    // 点击查看详情
    handleViewOrderDetail() {
      uni.navigateTo({
        url: `/community-center/order-status?orderNo=${this.orderInfo.orderNo}`
      });
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
