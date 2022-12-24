<template>
  <view class="order-detail" v-if="calcOrderMsg">
    <JHeader title="商品订单详情" width="50" height="50"></JHeader>
    <view
      class="address container"
      @click="go('/user/site/site-manage?appoint=true')"
    >
      <JIcon width="26" height="34" type="locale"></JIcon>
      <view class="address-text" v-if="!defaultAddress">请选择收货地址</view>
      <view class="address-detail" v-else>
        <view
          >收件人：{{ defaultAddress.name }} {{ defaultAddress.mobile }}</view
        >
        <view>{{ defaultAddress.detailedAddress }}</view>
      </view>

      <JIcon type="right-arrow" width="34" height="40"></JIcon>
    </view>

    <view class="order container" v-if="orderInfo">
      <view class="store-name">
        <text class="title">店铺名称</text>：{{ orderInfo.brand.name }}
      </view>
      <view class="goods">
        <image class="goods-img" :src="orderInfo.currentGoodsImg" mode="" />

        <view class="info">
          <view class="goods-name">{{ orderInfo.info.name }}</view>
          <view class="spa">{{ orderInfo.currentSpecification }}</view>
          <view class="dan-price">￥{{ orderInfo.currentPrice }}</view>
        </view>
      </view>

      <view class="words">
        <view class="title">买家留言：</view>
        <textarea
          v-model.trim="opForm.message"
          placeholder="50字以内（选填）"
          id=""
          cols="2"
          maxlength="50"
        ></textarea>
      </view>

      <view class="line">
        <view class="title">商品金额：</view>
        <view class="value">￥{{ calcOrderMsg.goodsTotalPrice }}</view>
      </view>

      <view class="line">
        <view class="title">运费：</view>
        <view class="value">￥{{ calcOrderMsg.freightPrice }}</view>
      </view>
    </view>

    <view class="prder-cost container" v-if="calcOrderMsg">
      <view class="line">
        <view class="title">订单总金额：</view>
        <view class="value">￥{{ calcOrderMsg.actualPrice }}</view>
      </view>

      <view class="line">
        <view class="title">总运费：</view>
        <view class="value">￥0</view>
      </view>
    </view>

    <view v-if="calcOrderMsg" class="footer">
      合计：<text class="footer-text">￥{{ calcOrderMsg.actualPrice }}</text>
      <button class="uni-btn" @click="handleToPay">提交订单</button>
    </view>
  </view>
</template>

<script>
import { getAddressListApi } from "../../api/address";
import { firstAddCar, submitOrderApi, payOrderGoodsApi } from "../../api/goods";
import { getUserId } from "../../utils";
import { payShopCarApi } from "../../api/cart";
import { PAY_GOODS, SELECT_ADDRESS } from "../../constant";
export default {
  onLoad() {
    this.getAddressList();
    this.getOrderInfo();
  },

  onShow() {
    this.getAddressList();
  },

  data() {
    return {
      defaultAddress: "", // 收货地址
      orderInfo: null, // 订单相关信息
      cartId: "", // 购物车id
      opForm: {
        message: "",
        useVoucher: false,
      },
      calcOrderMsg: null, // 计算现在的费用
    };
  },

  methods: {
    // 获取地址
    getAddressList() {
      const address = uni.getStorageSync(SELECT_ADDRESS);
      console.log("有", address);
      if (address) {
        this.defaultAddress = address;
        return;
      }
      getAddressListApi({
        userId: getUserId(),
      }).then(({ data }) => {
        console.log(data);
        const _this = this;
        data.forEach((address) => {
          if (address.isDefault) {
            _this.defaultAddress = address;
          }
        });
        if (!this.defaultAddress) {
          this.defaultAddress = data[0];
        }
      });
    },

    // 获取订单信息
    getOrderInfo() {
      this.orderInfo = uni.getStorageSync(PAY_GOODS);
      console.log(this.orderInfo);
      this.getCardId();
    },

    // 计算订单费用
    async getCardId() {
      console.log(this.orderInfo);
      const data = {
        userId: getUserId(),
        goodsId: this.orderInfo.info.id,
        productId: this.orderInfo.selectedProduct.product.id,
        number: this.orderInfo.number,
        useVoucher: this.isUserVoucher,
      };

      const res = await firstAddCar(data);

      if (res.errno === 0) {
        this.cartId = res.data;
        this.calcOrderCost();
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
          icon: "none",
        });
      }
    },

    // 计算订单费用
    calcOrderCost() {
      uni.showLoading();
      const _this = this;
      const data = {
        // addressId: this.defaultAddress.id,
        brandId: this.orderInfo.info.brandId,
        cartId: this.cartId,
        userId: getUserId(),
        couponId: 0,
        grouponRulesId: "",
        useVoucher: this.opForm.useVoucher,
      };
      payShopCarApi(data).then(({ data }) => {
        _this.calcOrderMsg = data;
        uni.hideLoading();
      });
    },

    // 提交订单支付
    handleToPay() {
      if (!this.defaultAddress || !this.defaultAddress.id) {
        this.$showToast("请选择地址");
        return;
      }

      const _this = this;
      const submitData = {
        userId: getUserId(),
        cartId: this.cartId,
        addressId: _this.defaultAddress.id,
        couponId: 0,
        grouponRulesId: "",
        grouponLinkId: "",
        brandId: _this.orderInfo.brandId,
        ..._this.opForm,
      };
      submitOrderApi(submitData).then(({ data }) => {
        payOrderGoodsApi({
          orderNo: data.orderSn,
          userId: getUserId(),
          payType: 1,
        }).then((res) => {
          const payData = JSON.parse(res.h5PayUrl);
          const form = document.createElement("form");
          form.setAttribute("action", payData.url);
          form.setAttribute("method", "POST");
          const data = JSON.parse(payData.data);
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
      });
    },
  },

  computed: {
    // 商品总金额
    sumGoodsPrice() {
      if (this.orderInfo) {
        return this.orderInfo.number * this.orderInfo.selectedProduct.product.price;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail {
  background-color: #f6f6f6;
  width: 100%;
  min-height: 100vh;
  height: auto;
  font-size: 28upx;
  color: #000;
  padding-bottom: 50px;

  .container {
    padding: 20upx 20upx;
    box-sizing: border-box;
    background-color: #fff;
  }

  /deep/ .j-header-container {
    padding: 30upx 40upx;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1upx solid #ccc;
  }

  .address {
    display: flex;
    align-items: center;
    background-color: #fff;

    .address-detail {
      flex: 1;
      line-height: 1.5;
    }

    /deep/ .j-icon {
      flex-shrink: 0;
      margin-right: 20upx;
    }

    .address-text {
      margin-left: 20upx;
    }
  }

  .order {
    margin-top: 20upx;

    .store-name {
      padding: 20upx 0;
      font-size: 24upx;
      border-bottom: 1upx solid #dadada;

      .title {
        color: #696969;
      }
    }

    .goods {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      padding: 20upx 0;

      .goods-img {
        width: 200upx;
        height: 200upx;
        flex-shrink: 0;
        margin-right: 20upx;
      }

      .info {
        flex: 1;
        .goods-name {
          margin-bottom: 20upx;
        }

        .dan-price {
          color: #ef5452;
          margin-top: 10upx;
        }
      }
    }

    .words {
      padding: 20upx;
      box-sizing: border-box;
      display: flex;
      background-color: #f6f6f6;
      border-radius: 4px;
      height: 120upx;

      .title {
        white-space: nowrap;
      }

      textarea {
        color: #696969;
        font-size: 28upx;
      }
    }
  }

  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20upx 0;
    margin-top: 20upx;

    .value {
      color: #ef5452;
    }
  }

  .prder-cost {
    margin-top: 20upx;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 30upx;
    &-text {
      color: #ef5452;
    }

    .uni-btn {
      font-size: 32upx;
      height: 50px;
      background-color: #ef5452;
      padding: 0 20upx;
      color: #fff;
      line-height: 50px;
      border-radius: 0;
      margin-left: 20px;
    }
  }
}
</style>
