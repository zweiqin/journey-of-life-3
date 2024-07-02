<template>
  <view class="voucherPay">
    <view class="top-tab">
      <view class="back" @click="back">
        <tui-icon name="arrowleft" :size="32" color="#000"></tui-icon>
      </view>
      代金券结算
    </view>
    <view class="container">
      <view class="product-box">
        <view class="shop">
          <tui-icon name="shop" :size="20"></tui-icon>
          <text>{{ shopInfo.shopName }}</text>
        </view>
        <view class="product-detail">
          <view class="detail-image">
            <image :src="shopInfo.skus[0].image" />
          </view>
          <view class="detail-text">
            <view class="text-title">{{ shopInfo.skus[0].productName }}</view>
            <view class="spec-text"></view>
            <view class="price-text">
              ￥{{ shopInfo.skus[0].price }}.00
              <text>x {{ shopInfo.skus[0].number }}</text>
            </view>
          </view>
        </view>
        <view class="product-mode">
          <view class="mode">
            <text>配送方式</text>
            <text>到店自取</text>
          </view>
          <view class="all-price">
            <text class="text">共1件 总计</text>
            <view class="all"
              >￥{{ shopInfo.skus[0].price * shopInfo.skus[0].number }}.00</view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="footer-box">
      <view class="surplus"> 剩余代金券余额：{{ balanceCoupon }} </view>
      <view class="all-number">
        <view class="number">共{{ shopInfo.skus[0].number }}件</view>
        <view class="number-price"
          >合计<text
            >￥{{ shopInfo.skus[0].price * shopInfo.skus[0].number }}.00</text
          ></view
        >
      </view>

      <view class="btn" @click="submitOrder">立即兑换</view>
    </view>
  </view>
</template>

<script>
import {
  getPricePlatformAllApi,
  updatePlaceOrderSubmitApi,
  getVoucherApiExchange,
} from "@/api/anotherTFInterface/index";
export default {
  created() {
    // 获取本地存储的数据
    this.shopInfo = uni.getStorageSync("T_SKU_ITEM_MSG_LIST")[0];
    console.log(this.shopInfo);
    this.allPrice = this.shopInfo.skus[0].price * this.shopInfo.skus[0].number;
    this.getCoupon();
  },
  data() {
    return {
      shopInfo: {},
      balanceCoupon: "",
      //  地址 id
      receiveId: null,
      allPrice: "",
    };
  },
  methods: {
    //  获取当前登录账户的代金券信息
    async getCoupon() {
      let res = await getPricePlatformAllApi();
      this.balanceCoupon = res.data.voucherPrice.toFixed(2);
    },
    // 提交订单
    async submitOrder() {
      let obj = {
        shopDiscountId: null,
        collageId: 0,
        type: "",
        shopGroupWorkId: 0,
        receiveId: 485,
        areaId: "",
        communityId: "",
        couponId: 0,
        price: this.allPrice, // 自己计算
        remark: "",
        shops: [],
        discountPrice: 0,
        shopSeckillId: null,
        voucherTotalAll: 24,
        isVoucher: true,
        voucherId: 1,
        franchiseePhone: "",
        communityPhone: "",
        franchiseeRule: ["", "", ""],
        paymentMode: 11,
        _isShowToast: false,
        procureType:2
      };
      obj.shops[0] = {
        distribution: {
          distributionPrice: 0,
          distributionName: "结算类型-拼团商品单独立即购买",
        },
        shopId: this.shopInfo.shopId,
        skus: this.shopInfo.skus,
      };
      if (this.balanceCoupon < this.allPrice) {
        uni.showToast({
          title: "您没有足够的代金券，请前往商城获取代金券",
          duration: 2000,
        });
        return;
      }
      uni.showLoading({
        title: "正在支付...",
      });
      try {
        let res = await updatePlaceOrderSubmitApi(obj);
        let res2 = await getVoucherApiExchange({ parentId: res.data.orderId });
        if (res2.code == "200") {
          uni.redirectTo({
            url: "/user/otherServe/payment-completed/index",
          });
        }
      } finally {
        uni.hideLoading();
      }

      console.log(res2);
    },
    back() {
      uni.navigateBack();
    },
  },
  //  离开页面
  onUnload() {
    uni.removeStorageSync("T_SKU_ITEM_MSG_LIST");
  },
};
</script>

<style lang="scss" scoped>
.voucherPay {
  /*  安全区域 */
  padding-top: constant(safe-area-inset-top); //兼容 IOS<11.2
  padding-top: env(safe-area-inset-top); //兼容 IOS>11.2
  min-height: 100vh;
  background-color: #e9e9e973;
  .top-tab {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    font-weight: 700;
    font-size: 32rpx;
    position: relative;
    .back {
      position: absolute;
      top: 50%;
      left: 40rpx;
      transform: translateY(-50%);
    }
  }
  .container {
    padding: 0 30rpx;
    margin-top: 20rpx;
    .product-box {
      width: 100%;
      background-color: #ffffff;
      padding: 20rpx;
      box-sizing: border-box;
      border-radius: 5rpx;
      .shop {
        display: flex;
        align-items: center;
        margin: 20rpx 0;
        font-size: 30rpx;
        gap: 25rpx;
        color: #000;
        font-weight: 700;
        text {
          margin-bottom: 5rpx;
        }
      }
      .product-detail {
        display: flex;
        gap: 15rpx;
        .detail-image {
          image {
            width: 200rpx;
            height: 200rpx;
          }
        }
        .detail-text {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: 15rpx;
          .text-title {
            font-size: 26rpx;
            color: rgb(51, 51, 51);
          }
          .spec-text {
            font-size: 22rpx;
            color: rgb(153, 153, 153);
          }
          .price-text {
            color: rgb(200, 55, 50);
            text {
              color: rgb(153, 153, 153);
              margin-left: 15rpx;
              font-size: 28rpx;
            }
          }
        }
      }
      .product-mode {
        margin-top: 15rpx;
        .mode {
          box-sizing: border-box;
          padding: 20rpx;
          border: 2rpx solid rgb(228, 229, 230);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 26rpx;
        }
        .all-price {
          margin-top: 20rpx;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: #000;
          font-size: 28rpx;
          color: rgb(51, 51, 51);
          .text {
            margin-top: 8rpx;
          }
          .all {
            font-size: 42rpx;
          }
        }
      }
    }
  }
  .footer-box {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 25rpx 25rpx 20rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    .all-number {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .number {
        font-size: 30rpx;
        color: rgb(153, 153, 153);
      }
      .number-price {
        font-size: 32rpx;
        color: rgb(51, 51, 51);
        text {
          color: rgb(255, 121, 17);
          font-weight: 700;
        }
      }
    }
    .surplus {
      font-size: 36rpx;
      color: red;
      font-weight: 600;
      margin: 20rpx 0;
    }
    .btn {
      width: 680rpx;
      margin: 20rpx auto 0;
      height: 90rpx;
      text-align: center;
      line-height: 90rpx;
      background-color: #333;
      color: #ffffff;
    }
  }
}
</style>
