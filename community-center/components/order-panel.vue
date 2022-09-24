<template>
  <view class="order-panel">
    <view class="header">
      <view class="orderNo">订单号：{{ data.orderNo }}</view>
      <view class="status">{{ mapStatus(data.status) }}</view>
    </view>

    <view class="main">
      <view class="info">
        <view class="base">
          <text class="text">{{ data.consigneeName }}</text>
          <text class="text">{{ data.consigneeMobile }}</text>
        </view>
        <view class="address">
          {{ data.consigneeAddress }}{{ data.consigneeAddressDetail }}
        </view>
      </view>
      <img class="icon" :src="receiveBase64Source" alt="" />
    </view>

    <view class="bts" v-if="data.status <= 2">
      <view>
        <button
          type="primary"
          style="
            margin-right: 5px;
            margin-bottom: 5px;
            margin-top: 5px;
            background: #015cb7;
          "
          size="mini"
          @click.stop="toEdit"
        >
          编辑
        </button>
      </view>
      <view>
        <button
          type="primary"
          style="
            margin-right: 5px;
            margin-bottom: 5px;
            margin-top: 5px;
            background: #d2691e;
          "
          size="mini"
          @click.stop="handleCancel"
        >
          取消
        </button>
      </view>
      <view>
        <button
          v-if="data.status === 0 && data.deliveryType !== 4"
          type="primary"
          style="margin-bottom: 5px; margin-top: 5px; background: #015cb7"
          size="mini"
          @click.stop="handlePay"
        >
          支付
        </button>
      </view>
    </view>

    <CancelOrderPopup ref="CancelOrderPopup"></CancelOrderPopup>
  </view>
</template>

<script>
import CancelOrderPopup from "./CancelOrderPopup.vue";
import { receiveBase64Source, mapStatus } from "../config";

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
    };
  },
  methods: {
    /**
     * @description 映射订单状态
     */
    mapStatus,

    /**
     * @description 去编辑
     */
    toEdit() {
      const _this = this;
      let url =
        this.data.deliveryType === 4
          ? "/community-center/repair"
          : "/community-center/delivery-install";
      uni.navigateTo({
        url: url + "?orderNo=" + _this.data.orderNo,
      });
    },

    /**
     * @description 取消订单
     */
    async handleCancel() {
      const _this = this;
      this.$refs.CancelOrderPopup.show({
        data: _this.data,
        onSuccess: () => {
          _this.$emit("success");
        },
      });
    },

    /**
     * @description
     */
    handlePay() {
      console.log(this.data);
      const _this = this;
      uni.navigateTo({
        url:
          "/community-center/pay?price=" +
          _this.data.actualPrice +
          "&orderNo=" +
          _this.data.orderNo,
      });
    },
  },
};
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
    border-bottom: 1upx dashed #ddd;
    font-size: 28upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .orderNo {
      color: #888;
    }

    .status {
      color: #148aff;
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    padding: 28upx 0 48upx 0;

    .icon {
      width: 50upx;
      height: 60upx;
    }

    .info {
      color: #060606;
      font-size: 28upx;
      .base {
        margin-bottom: 20upx;

        .text {
          color: #060606;
          font-size: 28upx;

          &:nth-child(1) {
            margin-right: 20upx;
          }
        }
      }
      .address {
        color: #8b8b8b;
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