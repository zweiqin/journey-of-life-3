<template>
  <view class="pay-page">
    <Header title="订单支付"></Header>
    <view class="item">
      <span class="label">需支付:</span>
      <span class="value money">￥{{ payMoney }}</span>
    </view>
    <view class="item">
      <span class="label">订单号:</span>
      <span class="value" @click="copyOrderNo">{{ orderNo }}</span>
    </view>

    <Button @click="handlePay">支付</Button>
  </view>
</template>

<script>
import Button from "./components/button.vue";
import { payOrderForEndApi } from "../api/community-center";
import { getUserId, useCopy } from "../utils";
import Header from './components/header.vue'

export default {
  components: { Button, Header },
  data() {
    return {
      orderNo: "",
      payMoney: "",
      status: false,
    };
  },

  methods: {
    handlePay() {
      payOrderForEndApi({
        orderNo: this.orderNo,
        userId: getUserId(),
      }).then((res) => {
        res = JSON.parse(res.data);
        const form = document.createElement("form");
        form.setAttribute("action", res.url);
        form.setAttribute("method", "POST");

        const data = JSON.parse(res.data);
        let input;
        for (const key in data) {
          input = document.createElement("input");
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      });
    },

    // 拷贝
    copyOrderNo() {
      useCopy(this.orderNo);
    },
  },

  onLoad(option) {
    this.orderNo = option.orderNo;
    this.payMoney = option.price;
  },
};
</script>

<style lang="less" scoped>
.pay-page {
  overflow: hidden;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20upx 40upx;
    font-size: 36upx;
    background-color: #fff;
    margin: 20upx 0;

    .money {
      font-weight: bold;
      color: #ec6401;
    }
  }
}
</style>