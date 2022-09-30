<template>
  <view class="order-panel">
    <PageHeader title="订单详情"></PageHeader>
    <view class="status" :style="statusStyles">
      {{ status ? "交易完成" : "交易待完成" }}
    </view>
    <!-- 客户信息 -->
    <view class="item" style="margin: 0" v-if="defaultAddress">
      <view class="line" v-for="item in baseInfo" :key="item.id">
        <img class="icon" :src="item.icon" alt="" />
        <view class="text">{{ item.label }}</view>
        <view class="text-value">
          <template v-if="item.id === 0">
            {{ defaultAddress.name }} {{ defaultAddress.mobile }}
          </template>
          <template v-if="item.id === 1">
            <view style="color: #ff8f1f" class="text"
              >08月18日（周四）19：00
            </view>
          </template>
          <template v-if="item.id === 2">
            <view class="text" style="color: #07b9b9">{{
              defaultAddress ? defaultAddress.detailedAddress : "请选择地址"
            }}</view>
          </template>
        </view>
      </view>

      <view class="change" @click="handleChooseAddress">更改收货信息</view>

      <!-- 订单信息 -->
      <view class="order-info">
        <view class="item">
          <img class="goods-img" :src="orderInfo.currentGoodsImg" alt="" />
          <view class="info">
            <view class="name">{{ orderInfo.info.name }}</view>
            <view>{{ goodsInfoStr }}</view>
          </view>
        </view>
      </view>
    </view>

    <view
      v-else
      class="item flex"
      @click="handleChooseAddress"
      style="justify-content: space-between"
      >请选择收货地址
      <img src="../../static/images/common/chevron-states.png" alt="" />
    </view>

    <!-- 评价 -->
    <!-- <view class="item aftermarket">
      <view class="flex">
        <view class="text"> 满意 </view>

        <view class="stars">
          <img
            class="star"
            src="../../static/images/con-center/star-active.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star-active.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star-active.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star.png"
            alt=""
          />
          <img
            class="star"
            src="../../static/images/con-center/star.png"
            alt=""
          />
        </view>
        <button class="pub">发布</button>
      </view>

      <view class="flex">
        <view class="text">评论</view>
        <view class="text-value">师傅上门速度很快，安装很到位，非常满意!</view>
      </view>

      <view class="flex">
        <view class="text">晒图</view>
        <view class="text-value">师傅上门速度很快，安装很到位，非常满意!</view>
      </view>
    </view> -->

    <!-- 订单疑问 -->
    <view
      class="item flex"
      style="justify-content: space-between; margin-bottom: 10px"
      @click="handleInputRemarks"
    >
      <view class="text" style="margin: 0">订单备注</view>
      <view class="text" style="margin-left: 10px; flex: 1">{{
        orderForm.message
      }}</view>
      <img src="../../static/images/common/chevron-states.png" alt="" />
    </view>

    <!-- 详细信息 -->
    <!-- <view class="item detail">
      <view class="title" style="fontsize: 14px">详细信息</view>
      <view class="flex">
        <view class="text">订单编号</view>
        <view class="text-value">1492587554125547864</view>
      </view>
      <view class="flex">
        <view class="text">订单编号</view>
        <view class="text-value">1492587554125547864</view>
      </view>
    </view> -->

    <!-- 猜你喜欢 -->
    <view class="guess">
      <view class="title">猜你喜欢</view>
      <view class="guess-goods">
        <RecommendGoods
          :showTitle="false"
          :padding="0"
          :id="12"
        ></RecommendGoods>
      </view>
    </view>

    <!-- 底部两个按钮 -->
    <view class="footer">
      <view
        >总计：<text style="color: red">{{
          "￥" + orderInfo.info.retailPrice * orderInfo.number
        }}</text></view
      >
      <!-- <button class="btn">取消订单</button> -->
      <button class="btn" @click="handlePay">去支付</button>
    </view>

    <!-- 输入备注 -->
    <uni-popup ref="orderRemarksRef">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        type="input"
        title="请输入订单备注"
        :value="orderForm.message"
        @confirm="handleConfirmOrderRemarks"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import PageHeader from "../page-header";
import LineBar from "../line-bar";
import Goods from "../goods";
import { PAY_GOODS, SELECT_ADDRESS } from "../../constant";
import { getBaseInfo } from "./config";
import { getAddressListApi } from "../../api/address";
import { submitOrderApi, firstAddCar, payOrderGoodsApi } from "../../api/goods";
import { getUserId } from "../../utils";
import RecommendGoods from "../recommend-goods";

export default {
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "goods",
    },
  },

  data() {
    return {
      baseInfo: [],
      orderInfo: {},
      orderForm: {
        message: "",
      },
      defaultAddress: null,
    };
  },

  components: {
    PageHeader,
    LineBar,
    Goods,
    RecommendGoods,
  },

  mounted() {
    this.baseInfo = getBaseInfo(this.type);
    this.orderInfo = uni.getStorageSync(PAY_GOODS);
    console.log(this.orderInfo);
    this.getAddressList();
    const res = uni.getStorageSync(SELECT_ADDRESS);
    this.defaultAddress = res;
  },

  computed: {
    statusStyles() {
      return {
        background: this.status
          ? "linear-gradient(270deg,  rgba(0,181,120,0), #07B9B9)"
          : "linear-gradient(270deg,#FFFFFF,  #FA5151)",
      };
    },

    goodsInfoStr() {
      let str = "";
      for (const key in this.orderInfo.currentSpecification) {
        str += "," + this.orderInfo.currentSpecification[key];
      }
      return str.slice(1) + " x " + this.orderInfo.number + "件";
    },
  },

  methods: {
    // 打开输入订单备注popup
    handleInputRemarks() {
      this.$refs.orderRemarksRef.open("center");
    },

    // 确定输入订单备注
    handleConfirmOrderRemarks(e) {
      this.orderForm.message = e;
    },

    // 获取收货地址列表
    async getAddressList() {
      const res = await getAddressListApi({
        userId: getUserId(),
      });

      for (const address of res.data) {
        if (address.isDefault) {
          this.defaultAddress = address;
        }
      }
    },

    //
    handleChooseAddress() {
      uni.navigateTo({
        url: "/user/site/site-manage?appoint=true",
      });
    },

    // 点击支付
    async handlePay() {
      // console.log(this.defaultAddress);
      const _this = this;
      // return;
      const data = {
        userId: getUserId(),
        goodsId: this.orderInfo.info.id,
        productId: this.orderInfo.selectedProduct.id,
        number: this.orderInfo.number,
      };
      let carId = null;
      const res = await firstAddCar(data);
      carId = res.data;
      if (res.errno === 0) {
        const submitData = {
          userId: getUserId(),
          cartId: carId,
          addressId: _this.defaultAddress.id,
          couponId: 0,
          message: _this.message || undefined,
          useVoucher: false,
          grouponRulesId: "",
          grouponLinkId: "",
        };

        const submitRes = await submitOrderApi(submitData);
        if (submitRes.errno === 0) {
          console.log(submitRes);
          payOrderGoodsApi({
            orderNo: submitRes.data.orderSn,
            userId: getUserId(),
            payType: 1
          }).then((res) => {
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
        } else {
          uni.showToast({
            title: "支付错误",
            duration: 2000,
            icon: "none",
          });
        }
      } else {
        uni.showToast({
          title: "支付错误",
          duration: 2000,
          icon: "none",
        });
      }
      return;
    },
  },
};
</script>

<style lang="less" scoped>
.order-panel {
  background-color: #efefef;

  .flex {
    display: flex;
    align-items: center;
  }

  .change {
    color: #3d3d3d;
    text-decoration: underline;
    font-size: 12px;
    text-align: right;
  }

  .text {
    color: #3d3d3d;
    font-size: 20upx;
    flex-shrink: 0;
    margin: 0 20upx 0 20upx;
  }

  .text-value {
    font-size: 20upx;
  }

  .status {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 124upx;
    color: #fff;
    font-size: 36upx;
    height: 114upx;
    margin-top: 120upx;

    &::before {
      position: absolute;
      content: "";
      left: 60upx;
      width: 44upx;
      height: 44upx;
      background: url("../../static/images/con-center/status.png");
      background-size: cover;
    }
  }

  .item {
    padding: 34upx 40upx;
    background-color: #fff;
    margin-top: 30upx;

    .flex {
      justify-content: space-between;
      align-items: flex-start;

      .text {
        margin: 0;
      }
    }

    &.detail {
      .flex {
        margin: 16upx 0;
      }
    }

    &.aftermarket {
      .flex {
        margin: 40upx 0;
      }
      .text-value {
        text-align: left;
      }

      .stars {
        flex: 1;
        text-align: right;
        margin-right: 40upx;
        .star {
          width: 40upx;
          margin-right: 10upx;
        }
      }

      .pub {
        width: 108upx;
        height: 40upx;
        line-height: 40upx;
        font-size: 24upx;
        color: #fff;
        background-color: #07b9b9;
      }
    }

    .order-info {
      padding-top: 30upx;
      border-top: 1upx solid #d8d8d8;

      .item {
        padding: 10upx;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        font-size: 14upx;

        .name {
          margin-bottom: 20upx;
        }

        .goods-img {
          width: 270upx;
          height: 200upx;
          object-fit: cover;
          margin-right: 10px;
        }
      }
    }

    .line {
      display: flex;
      align-items: flex-start;
      margin: 36upx 0;

      // &:last-of-type(3) {
      //   padding-bottom: 30upx;
      // }

      &:nth-child(1) {
        margin-top: 0upx;
      }

      .icon {
        width: 26upx;
      }
    }
  }

  .guess {
    padding: 26upx;
    background-color: #fff;

    .title {
      color: #3d3d3d;
      font-size: 28upx;
      margin-bottom: 22upx;
    }

    .guess-goods {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 36upx 40upx 36upx 0;
    background-color: #fff;
    box-sizing: border-box;

    .btn {
      width: 180upx;
      height: 68upx;
      box-sizing: border-box;
      color: #3d3d3d;
      font-size: 28upx;
      border: 1upx solid #999999;
      background: #fff;
      margin: 0;
      margin-left: 56upx;
    }
  }

  //
  .remarks {
    background-color: #fff;
  }
}
</style>
