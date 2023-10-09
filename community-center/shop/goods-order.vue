<template>
  <view class="order-detail">
    <!-- <JHeader title="" width="50" height="50"></JHeader> -->
    <view class="back">
      <image src="../../static/images/user/back.png" alt="" class="back-img" @click="handleBack" />
    </view>
    <view class="main-area">
      <view class="address container" @click="go('/user/site/site-manage?appoint=true')">
        <!-- <JIcon width="26" height="34" type="locale"></JIcon> -->
        <view v-if="!defaultAddress" class="address-text">请选择收货地址</view>
        <view v-else class="address-detail">
          <view class="detailedAddress">
            {{ defaultAddress.detailedAddress }}
          </view>
          <view class="contact">{{ defaultAddress.name }} {{ defaultAddress.mobile }}</view>
        </view>
        <view class="location">
          <image src="../../static/images/icon/location-logo.png" alt="" class="location-logo" />
        </view>
        <!-- <JIcon type="right-arrow" width="34" height="40"></JIcon> -->
      </view>

      <view v-if="orderInfo" class="order container">
        <view class="store-name"> <text class="title"></text>{{ orderInfo.brand.name }} </view>
        <view class="goods">
          <image class="goods-img" :src="orderInfo.currentGoodsImg" mode="" />

          <view class="info">
            <view class="goods-name">{{ orderInfo.info.name }}</view>
            <view class="spa">{{ orderInfo.currentSpecification }}</view>
            <view class="dan-price">￥{{ orderInfo.currentPrice }}</view>
          </view>
        </view>

        <view class="number-wrapper" style="display: flex; justify-content: space-between; margin-bottom: 20upx;">
          <view class="title">数量</view>
          <tui-numberbox :value="calcOrderCostQuery.number" :min="1" @change="handleChangeNumber"></tui-numberbox>
        </view>

        <view class="voucher-wrapper">
          <view class="top">
            <view class="title">代金券</view>
            <view class="voucher-hold">
              持有：<text style="color: #ef5613">{{ currentHoldVoucher }}</text>
              <tui-switch @change="handleChangeSwitchVoucherStatus" color="#ef5613" style="margin-left: 20upx;"
                :scaleRatio="0.7" :checked="isUseVoucher"></tui-switch>
            </view>
          </view>

          <!-- <view class="tip" v-show="isUseVoucher">
            <view class="tip-title">使用代金券数量：</view>
            <input type="text" class="input" v-model="calcOrderCostQuery.price">
          </view> -->
        </view>

        <view class="words">
          <view class="title">留言</view>
          <textarea id="" v-model.trim="payGoodsForm.remarks" placeholder="可在此给留言给商家" cols="2" maxlength="20"
            placeholder-class="input-text"></textarea>
        </view>
      </view>
      <view class="line-list" v-if="calcOrderMsg">
        <view class="line">
          <view class="title">商品金额</view>
          <view class="value">￥{{ calcOrderMsg.totalAmount }}</view>
        </view>

        <view class="line">
          <view class="title">代金券抵扣</view>
          <view class="value">￥{{ calcOrderMsg.deductionAmount || 0 }}</view>
        </view>

        <view class="line">
          <view class="title">运费</view>
          <view class="value">￥{{ calcOrderMsg.freightPrice || 0 }}</view>
        </view>

        <!-- <view class="line" @click="handleChooseCoupon">
          <view class="title">优惠劵</view>
          <text class="coupon-wrapper">
            <text v-if="couponPrice">-{{ couponPrice }}</text>
            <tui-icon name="arrowright" :size="20"></tui-icon>
          </text>
        </view> -->

        <!-- <view class="line-end">
          <view class="title">合计：</view>
          <view class="value">￥{{ calcOrderMsg.actualPrice }}</view>
        </view> -->
      </view>
    </view>
    <!-- <view class="prder-cost container" v-if="calcOrderMsg">
			<view class="line">
			<view class="title">订单总金额：</view>
			<view class="value">￥{{ calcOrderMsg.actualPrice }}</view>
			</view>

			<view class="line">
			<view class="title">总运费：</view>
			<view class="value">￥0</view>
			</view>
			</view> -->

    <view class="footer">
      <text v-if="calcOrderMsg" class="footer-text">￥{{ calcOrderMsg.actualAmount }}</text>
      <button class="uni-btn" @click="handleToPay">{{ isGetPrice ? "报价中..." : "提交订单" }}</button>
    </view>


    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getAddressListApi } from '../../api/address';
import { getUserId, payOrderUtil } from '../../utils';
import { refrshUserInfoApi } from '../../api/user';
import { PAY_SHOP_GOODS, SELECT_ADDRESS, TUAN_ORDER_SN, B_SHOP_ORDER_NO } from '../../constant';
import { getQuotationApi, payGoodsApi, payBOrderH5, payApiConfig } from '../../api/community-center'

export default {
  name: 'PreOrder',
  onLoad(options) {
    this.activityId = options.activityId || null;
    this.getAddressList();
    this.getOrderInfo();
    this.getUserHoldVoucher()
  },

  onShow() {
    this.getAddressList();
    if (uni.getStorageSync(B_SHOP_ORDER_NO)) {
      uni.switchTab({
        url: '/pages/order/order?type=shop&status=1'
      });
    }
  },

  data() {
    return {
      activityId: null,
      defaultAddress: '', // 收货地址
      orderInfo: null, // 订单相关信息
      cartId: '', // 购物车id
      opForm: {
        message: '',
        useVoucher: false
      },
      calcOrderMsg: null, // 计算现在的费用
      couponId: -1, // 优惠劵id
      couponPrice: null,
      couponPrice: 0,

      // 最新的
      currentHoldVoucher: 0,
      isUseVoucher: false, // 是否使用代金券
      isGetPrice: false,
      calcOrderCostQuery: {
        userId: getUserId(),
        shopId: undefined,
        shopGoodsId: undefined,
        number: 1,
        price: 0
      },

      payGoodsForm: {
        orderNo: undefined,
        shopId: undefined,
        goodsId: undefined,
        number: undefined,
        createUserId: getUserId(),
        pricingType: 1,
        totalAmount: undefined,
        actualAmount: undefined,
        deductionAmount: undefined,
        customerName: undefined,
        customerMobile: undefined,
        customerAddress: undefined,
        customerAddressDetail: undefined,
        remarks: ""
      }
    };
  },

  watch: {
    'calcOrderCostQuery.price'(value) {
      if (value) {
        if (value > this.currentHoldVoucher) {
          this.ttoast({
            type: 'info',
            title: "您没有这么多代金券哦~"
          })

          this.calcOrderCostQuery.price = this.currentHoldVoucher
        }
      }
    }
  },

  methods: {
    handleBack() {
      uni.navigateBack();
    },
    // 获取地址
    getAddressList() {
      const address = uni.getStorageSync(SELECT_ADDRESS);
      if (address) {
        this.defaultAddress = address;
        this.setPayOrderFormData(address)
        return;
      }
      getAddressListApi({
        userId: getUserId()
      }).then(({ data }) => {
        const _this = this;
        data.forEach((address) => {
          if (address.isDefault) {
            _this.defaultAddress = address;
            this.setPayOrderFormData(address)
          }
        });
        if (!this.defaultAddress) {
          this.defaultAddress = data[0];
          this.setPayOrderFormData(data[0])
        }
      });
    },

    // 设置表单地址信息
    setPayOrderFormData(address) {
      if (!address && !address.name) return
      this.payGoodsForm.customerName = address.name
      this.payGoodsForm.customerMobile = address.mobile
      this.payGoodsForm.customerAddress = address.detailedAddress.split(' ')[0]
      this.payGoodsForm.customerAddressDetail = address.detailedAddress.split(' ')[1]
    },

    // 获取订单信息
    async getOrderInfo() {
      this.orderInfo = uni.getStorageSync(PAY_SHOP_GOODS);

      this.calcOrderCostQuery.shopId = this.orderInfo.brand.brandId * 1
      this.calcOrderCostQuery.shopGoodsId = this.orderInfo.goodsId
      this.calcOrderCostQuery.number = this.orderInfo.number
      this.payGoodsForm.shopId = this.orderInfo.brand.brandId * 1
      this.payGoodsForm.goodsId = this.orderInfo.goodsId
      this.payGoodsForm.number = this.orderInfo.number
      this.getQuotation()
    },

    // 计算订单报价
    async getQuotation() {
      try {
        this.isGetPrice = true
        const res = await getQuotationApi(this.calcOrderCostQuery)
        this.calcOrderMsg = res
        this.payGoodsForm.actualAmount = res.actualAmount
        this.payGoodsForm.deductionAmount = res.deductionAmount
        this.payGoodsForm.totalAmount = res.totalAmount
        this.payGoodsForm.orderNo = res.orderNo
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '获取报价失败',
          message: error
        })

        if (error === '代金券只能使用整数！') {
          this.isUseVoucher = false
        }
      } finally {
        this.isGetPrice = false
      }
    },

    // 提交订单支付
    async handleToPay() {
      if (this.isGetPrice) {
        this.ttoast({
          title: '报价中',
          type: "info",
          content: '请稍后'
        })

        return
      }
      if (!this.defaultAddress || !this.defaultAddress.id) {
        this.$showToast('请选择地址');
        return;
      }

      if (!this.payGoodsForm.actualAmount) {
        this.ttoast({
          title: '请先获取报价',
          type: "fail",
          content: '支付失败'
        })
        return
      }

      try {
        const orderNo = await payGoodsApi(this.payGoodsForm)
        uni.setStorageSync(B_SHOP_ORDER_NO, orderNo)
        payOrderUtil({
          orderNo,
          userId: getUserId()
        }, payApiConfig, this.$store.state.app.isInMiniProgram || getApp().globalData.isInMiniprogram)
      } catch (error) {
        console.log("创建订单", error);
        this.ttoast({
          type: 'fail',
          title: '订单创建失败',
          content: error
        })
      }
    },

    // 计数器发生变化
    handleChangeNumber(e) {
      const { value } = e;
      this.calcOrderCostQuery.number = value;
      this.payGoodsForm.number = value
      this.getQuotation()
    },

    // 获取代金券持有
    async getUserHoldVoucher() {
      try {
        const res = await refrshUserInfoApi({
          userId: getUserId()
        });

        if (res.errno == '0') {
          this.currentHoldVoucher = res.data.voucherNumber;
        } else {
          this.ttoast({
            type: 'info',
            title: res.errmsg
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleChangeSwitchVoucherStatus(e) {
      const status = e.detail.value
      this.isUseVoucher = status
      this.calcOrderCostQuery.price = status ? this.currentHoldVoucher : 0
      this.getQuotation()
    },
  }
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
  margin-bottom: 50px;

  padding-bottom: 140upx;

  .container {
    padding: 32upx 32upx;
    box-sizing: border-box;
    background-color: #fff;
  }

  /deep/ .j-header-container {
    padding: 30upx 40upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0upx 0upx 24upx 24upx;
    // border-bottom: 1upx solid #ccc;
  }

  .back {
    padding: 30upx 40upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0upx 0upx 24upx 24upx;

    .back-img {
      width: 24upx;
      height: 48upx;
    }
  }

  .main-area {
    padding: 20upx 20upx 0 20upx;
    box-sizing: border-box;
  }

  .address {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 24upx;
    padding: 20upx;
    margin-top: 20upx;
    box-sizing: border-box;
    width: 100%;

    .address-detail {
      flex: 1;
      line-height: 1.5;
      font-size: 28upx;

      .detailedAddress {
        font-size: 32upx;
        font-weight: 500;
      }

      .contact {
        font-size: 28upx;
        color: #141000;
      }
    }

    /deep/ .j-icon {
      flex-shrink: 0;
      margin-right: 20upx;
    }

    .address-text {
      flex: 1;
      margin-left: 20upx;
    }

    .location {
      width: 64upx;
      height: 64upx;
      border: 2upx solid #605d52;
      border-radius: 40upx;
      display: flex;
      align-items: center;
      justify-content: center;

      .location-logo {
        width: 40upx;
        height: 40upx;
      }
    }
  }

  .coupon-wrapper {
    display: flex;
    align-items: center;
    color: #ef5452;

    /deep/ .tui-icon {
      vertical-align: text-top !important;
    }
  }

  .order {
    margin-top: 20upx;
    border-radius: 24upx;

    .store-name {
      // padding: 20upx 0;
      font-size: 28upx;
      // border-bottom: 1upx solid #dadada;
      color: #605d52;

      .title {
        color: #696969;
      }
    }

    .goods {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      padding: 32upx 0;

      .goods-img {
        width: 200upx;
        height: 200upx;
        flex-shrink: 0;
        margin-right: 24upx;
        border-radius: 16upx;
      }

      .info {
        flex: 1;

        .goods-name {
          font-size: 28upx;
          margin-bottom: 20upx;
        }

        .spa {
          font-size: 24upx;
          color: #8f8d85;
        }

        .dan-price {
          color: #141000;
          margin-top: 10upx;
          font-size: 28upx;
          font-weight: 500;
        }
      }
    }

    .words {
      padding-top: 10upx;
      box-sizing: border-box;
      display: flex;
      // background-color: #f6f6f6;
      // border-radius: 4px;
      height: 70upx;

      .title {
        color: #605d52;
        white-space: nowrap;
        font-size: 28upx;
      }

      textarea {
        color: #696969;
        font-size: 28upx;
        margin-left: 144upx;
      }

      .input-text {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .line-list {
    background: #ffffff;
    margin-top: 20upx;
    border-radius: 24upx;
    padding: 0upx 32upx;

    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20upx 0;

      // margin-top: 20upx;
      .title {
        font-size: 28upx;
        color: #605d52;
      }

      .value {
        color: #141000;
      }
    }

    .line-end {
      font-size: 28upx;
      color: #141000;
      padding: 20upx 0;
      display: flex;
      justify-content: flex-end;

      .title {}

      .value {}
    }
  }

  .prder-cost {
    margin-top: 20upx;
    margin-bottom: 100upx;
    margin-left: 20upx;
    margin-right: 20upx;
    border-radius: 24upx;

    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10upx 0;

      // margin-top: 20upx;
      .title {
        font-size: 28upx;
        color: #605d52;
      }

      .value {
        color: #141000;
      }
    }
  }

  .footer {
    padding: 0upx 32upx;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 120upx;
    display: flex;
    // justify-content: flex-end;
    justify-content: space-between;
    align-items: center;
    font-size: 30upx;
    border-radius: 24upx 24upx 0upx 0upx;

    &-text {
      color: #ef5452;
      font-size: 48upx;
      font-weight: bold;
    }

    .uni-btn {
      font-size: 32upx;
      width: 240upx;
      height: 88upx;
      background-color: #ffcb05;
      padding: 0 20upx;
      color: #fff;
      // line-height: 50px;
      // border-radius: 0;
      // margin-left: 20px;
      border-radius: 44upx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
    }
  }
}

.voucher-wrapper {
  margin: 30upx 0;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .voucher-hold {
    display: flex;
    align-items: center;

  }

  .tip {
    display: flex;
    align-items: center;
    height: 100upx;
    background-color: #f6f6f6;
    margin-top: 15upx;
    border-radius: 10upx;
    padding: 0 20upx;
    box-sizing: border-box;

    .tip-title {
      font-size: 24upx;
      color: #585858;
      margin-right: 30upx;
    }

    .input {
      flex: 1;
      border-bottom: 1upx solid #ccc;
    }
  }
}
</style>
