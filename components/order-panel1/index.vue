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
          <view v-for="(item, id) in this.goodsDetail" :key="id">
            <view class="detail-top">
              <view class="brandName"> {{ item.brandName }} </view>
            </view>
            <view
              class="detail-bottom"
              v-for="(item1, id1) in item.cartList"
              :key="id1"
            >
              <img :src="item1.picUrl" alt="" class="goods-img" />
              <view>
                <view class="name"> {{ item1.goodsName }} </view>
                <view
                  class="goodsDetail"
                  v-for="(item2, id2) in item1.specifications"
                  :key="id2"
                >
                  {{ item2 }}
                </view>
                <view> 数量:{{ item1.number }}</view>
              </view>
            </view>
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
        >总计：<text style="color: red"> ￥{{ allmoney }} </text></view
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
import { getSybOrderPayH5 } from "../../api/order";
import Goods from "../goods";
import { PAY_GOODS, SELECT_ADDRESS, PAY_ORDER } from "../../constant";
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
      goodsDetail: [],
      orderForm: {
        message: "",
      },
      defaultAddress: null,
      goodsAll: [],
      allMoney: "",
      orderSn: "",
      cartId: [],
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
    this.goodsDetail = uni.getStorageSync("CAR_GOODS_DETAIL");
    this.goodsAll = uni.getStorageSync("CAR_GOODS_DETAIL_ALL");

    console.log(this.orderInfo);
    this.getAddressList();
    const res = uni.getStorageSync(SELECT_ADDRESS);
    this.defaultAddress = res;
    console.log("goodsdetail", this.goodsDetail);
    console.log("goodsAll", this.goodsAll);
    this.allmoney();
    this.cleanCartId();
    this.cartid();
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
    allmoney() {
      this.allmoney = this.goodsAll.goodsTotalPrice;
    },
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
    //购物车id处理
    cartid() {
      const cartId = [];
      let goodsAll = this.goodsAll.brandCartgoods;
      const goodlist = [];
      //找到订单列表
      for (let i = 0; i < goodsAll.length; i++) {
        goodlist.push(...goodsAll[i].cartList);
        // console.log("goodlist", goodlist);
      }
      // 抽出列表id
      for (let j = 0; j < goodlist.length; j++) {
        cartId.push(goodlist[j].id);
        // console.log("cartId", cartId);
      }
      console.log(cartId);
      this.cartId = cartId;
    },
    cleanCartId() {
      this.cartId = [];
    },
    // 点击支付
    async handlePay() {
      // console.log(this.defaultAddress);
      const _this = this;
      // return;

      let carId = null;
      console.log(this.cartId);

      const submitData = {
        userId: getUserId(),
        cartId: this.cartId,
        // cartId: 0,
        addressId: _this.defaultAddress.id,
        couponId: 0,
        message: _this.message || undefined,
        useVoucher: false,
        grouponRulesId: "",
        grouponLinkId: "",
        // userId: 277,
        // cartId: 0,
        // addressId: 96,
        // couponId: 0,
        // message: "测试",
        // grouponRulesId: "",
        // grouponLinkId: "",
        // useVoucher: false,
      };

      const submitRes = await submitOrderApi(submitData);
      // console.log("下单",submitRes.data.orderSn);
      this.orderSn = submitRes.data.orderSn;
      // console.log('订单号',this.orderSn);
      if (submitRes.errno === 0) {
        console.log(submitRes);
        getSybOrderPayH5({
          orderNo: this.orderSn,
          userId: getUserId(),
          payType: 1,
        }).then((res) => {
          const form = document.createElement("form");
          form.setAttribute("action", res.h5PayUrl);
          form.setAttribute("method", "POST");
          uni.removeStorageSync(PAY_ORDER);
          uni.setStorageSync(PAY_ORDER, res.orderNo);
          // uni.navigateTo({ url: '../../pages/payAccomplish/index' })
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
        // justify-content: space-between;
        align-items: center;
        font-size: 14upx;
        .detail-top {
          padding: 20upx 0;
          .brandName {
            font-size: 28upx;
            font-weight: bold;
          }
        }
        .detail-bottom {
          display: flex;
          .name {
            margin-bottom: 20upx;
          }
          .goodsDetail {
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
