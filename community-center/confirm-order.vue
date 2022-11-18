<template>
  <view class="confirm-order">
    <view class="title-list">
      <img
        src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
        alt=""
        class="return"
        @click="handleBack"
      />
      <view class="title">确认订单</view>
    </view>

    <view class="main">
      <view class="service-list">
        <view class="text">安装服务</view>
        <view class="name">{{ this.name1 }}</view>
      </view>
      <view class="order-list">
        <view class="text">订单编号</view>
        <view class="name">{{ data }}</view>
      </view>
      <view class="install-list">
        <view class="text">安装费用</view>

        <view class="price-list1" v-if="pricingType == 1">
          <view class="logo">￥</view>
          <view class="number">{{ this.oughtPrice }}</view>
          <view class="point"></view>
        </view>
        <view class="price-list2" v-if="pricingType == 2">
          <!-- <view class="logo">￥</view>
          <view class="number">{{ this.oughtPrice }}</view>
          <view class="point">.00</view> -->
          <view class="text">人工报价</view>
        </view>
      </view>
      <view class="pay-list">
        <view class="text">支付方式</view>
        <view class="name">微信支付</view>
      </view>
      <view class="name-list">
        <view class="text">收款方</view>
        <view class="name">团蜂社区</view>
      </view>
    </view>

    <view class="foot1" v-if="pricingType == 1">
      <view class="pay">
        <view class="logo">￥</view>
        <view class="number">{{ this.oughtPrice }}</view>
        <view class="point"></view>
      </view>
      <view class="on-pay" @click="getServiceOrderPay">确定支付</view>
    </view>

    <view class="foot2" v-if="pricingType == 2">
      <view class="on-pay" @click="handleToOrderList">确认订单</view>
    </view>
  </view>
</template>





<script>
import { getServiceOrderApi } from "../api/community-center";
import { getServiceOrderPayApi } from "../api/community-center";
import { payOrderGoodsApi } from "../api/goods";
import { getUserId } from "../utils";
export default {
  name: "Confirm-order",
  props: {},
  data() {
    return {
      orderType: 1,
      paymentMethod: 1,
      deliveryType: 4,
      oughtPrice: "",
      consigneeName: "",
      consigneeMobile: "",
      consigneeAddress: "",
      consigneeAddressDetail: "",
      content: "",
      installDate: "",
      data: "",
      dataUrl: "",
      pricingType: "",
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },

    handleToOrderList(){
      uni.navigateTo({ url: `../community-center/order` });
    },

    //新建社区订单
    async getServiceOrder() {
      const res = await getServiceOrderApi({
        userId: getUserId(),
        orderType: this.orderType,
        pricingType: this.pricingType,
        paymentMethod: this.paymentMethod,
        deliveryType: this.deliveryType,
        price: this.oughtPrice,
        actualPrice: this.oughtPrice,
        consigneeName: this.consigneeName,
        consigneeMobile: this.consigneeMobile,
        consigneeAddress: this.consigneeAddress,
        consigneeAddressDetail: this.consigneeAddressDetail,
        remarks: this.content,
        installDate: this.installDate,
        dictName: this.name1,
      });
      this.data = res.data;
      console.log("订单号", this.data);
    },

    //订单支付
    async getServiceOrderPay() {
      let res = await getServiceOrderPayApi({
        orderNo: this.data,
        userId: getUserId(),
      });

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
    },
  },
  created() {},
  onLoad(options) {
    console.log(options);
    this.name1 = options.name1;
    this.oughtPrice = options.oughtPrice;
    this.content = options.content;
    this.consigneeName = options.consigneeName;
    this.consigneeMobile = options.consigneeMobile;
    this.consigneeAddress = options.consigneeAddress;
    this.consigneeAddressDetail = options.consigneeAddressDetail;
    this.installDate = options.installDate;
    this.pricingType = options.pricingType;
    console.log("报价类型", this.pricingType);

    this.getServiceOrder();
  },
};
</script>

<style lang="less" scoped>
.confirm-order {
  .title-list {
    padding: 40upx 34upx 36upx 26upx;
    display: flex;
    .return {
      width: 48upx;
      height: 48upx;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }
  .main {
    padding: 56upx 34upx 0upx 34upx;
    .service-list {
      display: flex;
      width: 100%;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .order-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .install-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .price-list1 {
        display: flex;
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
        .logo {
        }
        .number {
        }
        .point {
        }
      }
      .price-list2 {
        .text {
          font-size: 32upx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }

    .pay-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .name-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;
      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }
      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  .foot1 {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 168upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26upx 20upx;
    box-sizing: border-box;
    border-top: 4upx solid #f1f2f6;
    .pay {
      // margin-top: 290upx;
      display: flex;
      justify-content: center;
      font-size: 48upx;
      font-weight: 500;
      color: #fa5151;
      .logo {
      }
      .number {
      }
      .point {
      }
    }
    .on-pay {
      // margin: 86upx auto;
      width: 310upx;
      height: 80upx;
      border-radius: 100upx;
      background: linear-gradient(90deg, #00b578 0%, #079a9a 100%);
      font-size: 32upx;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      line-height: 80upx;
    }
  }

  .foot2 {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 168upx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26upx 20upx;
    box-sizing: border-box;
    border-top: 4upx solid #f1f2f6;

    .on-pay {
      // margin: 86upx auto;
      width: 310upx;
      height: 80upx;
      border-radius: 100upx;
      background: linear-gradient(90deg, #00b578 0%, #079a9a 100%);
      font-size: 32upx;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      line-height: 70upx;
    }
  }
}
</style>
