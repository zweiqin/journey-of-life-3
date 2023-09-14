<template>
  <view class="pay-page">
    <Header bgc="#e95d20" title="订单支付"></Header>
    <view class="item">
      <span class="label">需支付:</span>
      <span class="value money">￥{{ payMoney }}</span>
    </view>
    <view class="item">
      <span class="label">订单号:</span>
      <span class="value" @click="copyOrderNo">{{ orderNo }}</span>
    </view>

    <Button type="error" @click="handlePay">支付</Button>
  </view>
</template>

<script>
import Button from './components/button.vue';
import { payOrderForEndApi, payOrderForBeeStewadAPPApi } from '../api/community-center';
import { getUserId, useCopy } from '../utils';
import Header from './components/header.vue';

export default {
  components: { Button, Header },
  data() {
    return {
      orderNo: '',
      payMoney: '',
      status: false
    };
  },

  methods: {
    async handlePay() {
      if (this.$store.state.app.isInMiniProgram) {
        const payAppesult = await payOrderForBeeStewadAPPApi({
          userId: getUserId(),
          orderNo: this.orderNo
        });

        if (payAppesult.statusCode === 20000) {
          let query = '';
          for (const key in payAppesult.data) {
            query += key + '=' + payAppesult.data[key] + '&';
          }

          wx.miniProgram.navigateTo({
            url: '/pages/loading/loading?' + query + 'orderNo=' + this.orderNo + '&userId=' + getUserId(),
            fail: () => {
              // uni.redirectTo({
              //   url: `/community-center/order`,
              // });

              uni.switchTab({
                url: '/pages/order/order'
              });
            }
          });
        }
      } else {
        // #ifdef H5
        payOrderForEndApi({
          orderNo: this.orderNo,
          userId: getUserId()
        }).then((res) => {
          res = JSON.parse(res.data);
          const form = document.createElement('form');
          form.setAttribute('action', res.url);
          form.setAttribute('method', 'POST');

          const data = JSON.parse(res.data);
          let input;
          for (const key in data) {
            input = document.createElement('input');
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
          }

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        });
        // #endif

        // #ifdef APP
        const payAppesult = await payOrderForBeeStewadAPPApi({
          userId: getUserId(),
          orderNo: this.orderNo
        });

        if (payAppesult.statusCode === 20000) {
          let query = '';
          for (const key in payAppesult.data) {
            query += key + '=' + payAppesult.data[key] + '&';
          }

          plus.share.getServices(
            function (res) {
              let sweixin = null;
              for (let i in res) {
                if (res[i].id == 'weixin') {
                  sweixin = res[i];
                }
              }
              console.log(sweixin);
              if (sweixin) {
                sweixin.launchMiniProgram({
                  id: 'gh_e64a1a89a0ad',
                  type: 0,
                  path: 'pages/orderDetail/orderDetail?' + query
                });
              }
            },
            function (e) {
              console.log('获取分享服务列表失败：' + e.message);
            }
          );
        }
        // #endif
      }
    },

    // 拷贝
    copyOrderNo() {
      useCopy(this.orderNo);
    }
  },

  onLoad(option) {
    this.orderNo = option.orderNo;
    this.payMoney = option.price;
  }
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
