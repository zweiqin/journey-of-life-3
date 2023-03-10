<template>
  <view class="order-panel">
    <view class="header">
      <view class="orderNo">订单号：{{ data.orderNo }}</view>
      <view class="status">{{ mapStatus(data.status) }}</view>
    </view>

    <view class="main">
      <view class="info">
        <view class="base">
          <text v-if="data.consigneeName" class="text">{{
            data.consigneeName
          }}</text>
          <text v-if="data.consigneeName" class="text">{{
            data.consigneeMobile
          }}</text>

          <text v-else style="color: #fa5151" @click.stop="toEdit"
            >请完善上门信息</text
          >

          <view class="edit" @click.stop="toEdit">
            <image
              v-if="data.status <= 2"
              src="../../static/images/con-center/edit.png"
              mode="scaleToFill"
              class="icon"
            ></image>
            <text>修改订单</text>
          </view>
        </view>
        <view class="address-list">
          <text class="name">上门地址:</text>
          <text class="address">
            {{ data.consigneeAddress }}{{ data.consigneeAddressDetail }}
          </text>
        </view>
      </view>
      <!-- <img class="icon" :src="receiveBase64Source" alt="" /> -->
    </view>

    <view class="bts" v-if="data.status <= 6">
      <view>
        <button
          type="primary"
          style="
            margin-right: 5px;
            margin-bottom: 5px;
            margin-top: 5px;
            background: #efefef;
            color: #999999;
            border-radius: 5px;
          "
          size="mini"
          @click.stop="toDetail"
        >
          订单详情
        </button>
      </view>
      <view>
        <button
          v-if="data.status <= 5"
          type="primary"
          style="
            margin-right: 5px;
            margin-bottom: 5px;
            margin-top: 5px;
            background: #07b9b9;
            color: #ffffff;
          "
          size="mini"
          @click.stop="handleCancel"
        >
          取消订单
        </button>
      </view>
      <view>
        <button
          v-if="data.status === 0"
          type="primary"
          style="
            margin-bottom: 5px;
            margin-top: 5px;
            background: #fa5151;
            color: #ffffff;
          "
          size="mini"
          @click.stop="handlePay"
        >
          去支付
        </button>
      </view>
    </view>

    <CancelOrderPopup ref="CancelOrderPopup"></CancelOrderPopup>
  </view>
</template>

<script>
import CancelOrderPopup from './CancelOrderPopup.vue'
import { receiveBase64Source, mapStatus } from '../config'

export default {
  components: {
    CancelOrderPopup,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      receiveBase64Source,
      buttons: [],
      showCancel: false,
    }
  },
  methods: {
    /**
     * @description 映射订单状态
     */
    mapStatus,

    /**
     * @description 去编辑
     */
    //编辑
    toEdit() {
      const _this = this
      let url =
        this.data.deliveryType === 4
          ? '/community-center/repair'
          : '/community-center/delivery-install'
      uni.navigateTo({
        url: url + '?orderNo=' + _this.data.orderNo,
      })
    },

    //订单详情
    toDetail() {
      uni.navigateTo({
        url: `/community-center/order-status?orderNo=${this.data.orderNo}`,
      })
    },

    /**
     * @description 取消订单
     */
    async handleCancel() {
      const _this = this
      this.$refs.CancelOrderPopup.show({
        data: _this.data,
        onSuccess: () => {
          _this.$emit('success')
        },
      })
    },

    /**
     * @description
     */
    handlePay() {
      console.log(this.data)
      const _this = this
      uni.navigateTo({
        url:
          '/community-center/pay?price=' +
          _this.data.actualPrice +
          '&orderNo=' +
          _this.data.orderNo,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.order-panel {
  width: 100%;
  padding: 20upx;
  box-sizing: border-box;
  margin-bottom: 20upx;
  background-color: #fff;

  .header {
    padding-bottom: 20upx;
    border-bottom: 2upx dashed #ddd;
    font-size: 28upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .orderNo {
      color: #888;
    }

    .status {
      color: #fa5151;
    }
  }

  .main {
    // display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28upx 0 48upx 0;

    .edit {
      flex: 1;
      text-align: right;

      .icon {
        width: 40upx;
        height: 40upx;
        vertical-align: bottom;
        margin-right: 6upx;
      }

      text {
        border-bottom: 1upx solid #ccc;
      }
    }

    .info {
      color: #060606;
      font-size: 28upx;
      .base {
        display: flex;
        align-items: center;
        margin-bottom: 20upx;

        .text {
          color: #060606;
          font-size: 28upx;

          &:nth-child(1) {
            margin-right: 20upx;
          }
        }
      }

      .address-list {
        // display: flex;
        .name {
          margin-right: 20upx;
          color: #060606;
          font-size: 28upx;
        }
        .address {
          color: #060606;
          font-size: 28upx;
        }
      }
    }
  }

  .bts {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
