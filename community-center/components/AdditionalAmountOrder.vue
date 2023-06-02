<template>
  <view class="additional-amount-order-container" v-if="orderData">
    <view class="item-1">
      <view class="title">订单号：{{ orderData.orderNo }}</view>
      <view class="staus">{{ orderData.status | filterOrderStatus }}</view>
    </view>

    <view class="from item-1">
      <view class="from-name"> 追加人：{{ orderData.extraName }} </view>
      <view class="from-role">
        追加来源：{{ orderData.sourceType ? "师傅" : "店长" }}
      </view>
    </view>

    <view class="time">发起追加时间：{{ orderData.createTime }}</view>

    <view class="desc">追加原因：{{ orderData.extraRemark }}</view>

    <view class="item-footer">
      <view class="price-text"> 追加金额: ￥{{ orderData.extraPrice }} </view>
      <button class="uni-btn" @click="handlePayOrder" v-if="!orderData.status">
        去支付
      </button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getUserId } from "utils";
import {
  payAdditionalOrderApi,
  payOrderForBeeStewadAPPApi,
} from "../../api/community-center";
export default {
  props: {
    orderData: {
      type: Object,
      required: true,
    },
  },

  filters: {
    filterOrderStatus(value) {
      return { 0: "待付款", 1: "已付款", 2: "已拒绝" }[value];
    },
  },

  methods: {
    async handlePayOrder() {
      if (this.$store.state.app.isInMiniProgram) {
        try {
          const payAppesult = await payOrderForBeeStewadAPPApi({
            userId: getUserId(),
            orderNo: this.orderData.extraNo,
          });

          if (payAppesult.statusCode === 20000) {
            let query = "";
            for (const key in payAppesult.data) {
              query += key + "=" + payAppesult.data[key] + "&";
            }

            // console.log(payAppesult);

            wx.miniProgram.navigateTo({
              url:
                "/pages/loading/loading?" +
                query +
                "orderNo=" +
                this.orderData.extraNo +
                "&userId=" +
                getUserId(),
              fail: () => {
                uni.redirectTo({
                  url: `/community-center/order`,
                });
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // #ifdef H5
        let res = await payAdditionalOrderApi({
          orderNo: this.orderData.extraNo,
          userId: getUserId(),
        });

        console.log(res);

        if (res.statusCode === 20000) {
          res = JSON.parse(res.data);

          const form = document.createElement("form");
          form.setAttribute("action", res.url);
          form.setAttribute("method", "POST");

          const data1 = JSON.parse(res.data);
          let input;
          for (const key in data1) {
            input = document.createElement("input");
            input.name = key;
            input.value = data1[key];
            form.appendChild(input);
          }

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        } else {
          this.ttoast({
            type: "fail",
            title: "支付失败",
            content: res.statusMsg,
          });
        }
        // #endif

        // #ifdef APP
        const payAppesult = await payOrderForBeeStewadAPPApi({
          userId: getUserId(),
          orderNo: this.orderData.extraNo,
        });

        if (payAppesult.statusCode === 20000) {
          let query = "";
          for (const key in payAppesult.data) {
            query += key + "=" + payAppesult.data[key] + "&";
          }

          plus.share.getServices(
            function (res) {
              let sweixin = null;
              for (let i in res) {
                if (res[i].id == "weixin") {
                  sweixin = res[i];
                }
              }
              
              if (sweixin) {
                sweixin.launchMiniProgram({
                  id: "gh_e64a1a89a0ad",
                  type: 0,
                  path: "pages/orderDetail/orderDetail?" + query,
                });
              }
            },
            function (e) {
              console.log("获取分享服务列表失败：" + e.message);
            }
          );
        }
        // #endif
      }
    },
  },
};
</script>

<style lang="less" scoped>
.additional-amount-order-container {
  box-sizing: border-box;
  background-color: #fff;
  padding: 30upx;
  border-radius: 24upx;
  margin: 20upx 20upx 0;
  font-size: 28upx;

  .item-1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10upx;

    .status {
      font-weight: 500;
      color: #000;
    }
  }

  .item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20upx;
    margin-top: 20upx;
    border-top: 1upx dotted #ccc;

    .price-text {
      color: #141000;
      font-weight: 500;
    }

    .uni-btn {
      width: 160upx;
      height: 64upx;
      border-radius: 100px;
      background-color: #ffc117;
      color: #fff;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28upx;
      transition: all 350ms;

      &:active {
        background-color: #ffe18e;
      }
    }
  }

  .desc {
    color: #8f8d85;
  }
}
</style>
