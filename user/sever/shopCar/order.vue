<template>
  <view order-wrapper>
    <view class="order-container">
      <view class="title-wrapper">
        <tui-icon @click="handleBack" color="#000" :size="28" name="arrowleft"></tui-icon>
        <text>确认订单</text>
      </view>

      <view class="address-container">
        <view class="bas-info">
          <view class="info" v-if="defaultAddress"> 收货人：{{ defaultAddress.name }} {{ defaultAddress.mobile }}</view>
          <view class="" v-else> 请选择收货地址 </view>
          <view class="right" @click="go('/user/site/site-manage?appoint=true')">
            <text>{{ defaultAddress ? '更换' : '去选择' }}</text>
            <tui-icon :size="20" name="arrowright"></tui-icon>
          </view>
        </view>

        <view class="address" v-if="defaultAddress"> 地址： {{ defaultAddress.detailedAddress }}</view>
      </view>

      <view class="coupon-container" @click="couponPopupVisible = true">
        <text class="title">优惠劵</text>
        <view class="choose-coupon">
          <text v-if="couponPrice">-{{ couponPrice }}</text>
          <tui-icon name="arrowright" :size="20"></tui-icon>
        </view>
      </view>

      <view class="coupon-container">
        <text class="title">代金券</text>
        <view class="choose-coupon">
          <text style="margin-right: 10upx">持有： {{ currentHoldVoucher }}</text>
          <tui-switch :scaleRatio="0.6" color="rgb(248, 112, 64)" :checked="useVoucher" @change="handleChangeUseVoucher"></tui-switch>
        </view>
      </view>

      <view class="goods-container">
        <view class="goods-info" v-for="(item, index) in goodsInfo" :key="index">
          <view class="brand-title">
            <tui-icon :size="20" color="#f87040" name="shop-fill"></tui-icon>
            <text class="brand-name">{{ item.brandName }}</text>
          </view>

          <view class="goods-item" v-for="(goods, index) in item.cartList" :key="index">
            <image class="goods-icon" :src="goods.picUrl" mode="" />
            <view class="wrapper">
              <view class="goods-name">{{ goods.goodsName }}</view>
              <view class="selected-str">已选：{{ goods.specifications.join(',') }}</view>
              <view>
                <text class="goods-price">￥{{ goods.price }}</text> x
                {{ goods.number }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <RecommendGoods v-if="goodsInfo && goodsInfo.length" :id="goodsInfo[0].id"></RecommendGoods>
    </view>

    <view class="footer">
      <view class="tip"
        >待支付：<text>￥{{ actualPrice }}</text></view
      >
      <button class="uni-btn" @click="handleToPay">去支付</button>
    </view>

    <CouponPopup @confirm="handleChooseCoupon" v-model="couponPopupVisible" :cartId="0"></CouponPopup>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAddressListApi } from '../../../api/address';
import { refrshUserInfoApi } from '../../../api/user';
import { getCartCheckoutApi } from '../../../api/cart';
import { submitOrderApi, payOrderGoodsAPPApi } from '../../../api/goods';
import { getSybOrderPayH5 } from '../../../api/order';
import { SELECT_ADDRESS } from '../../../constant';
import { getUserId, payFn } from '../../../utils';
const PAY_SHORT_ORDER_NO = 'PAY_SHORT_ORDER_NO';
import RecommendGoods from '../../../components/recommend-goods/index.vue';

export default {
  components: {
    RecommendGoods
  },
  data() {
    return {
      defaultAddress: null,
      goodsInfo: null,
      actualPrice: 0,
      couponPopupVisible: false,
      couponId: -1,
      couponPrice: 0,
      currentHoldVoucher: 0,
      useVoucher: false
    };
  },
  onShow() {
    const apponitAddress = uni.getStorageSync(SELECT_ADDRESS);
    if (apponitAddress) {
      this.defaultAddress = apponitAddress;
      this.getData();
    }

    if (uni.getStorageSync(PAY_SHORT_ORDER_NO)) {
      // uni.redirectTo({ url: '/user/orderForm/order-form?type=1' })
      uni.switchTab({
        url: '/pages/order/order?type=shop&status=1'
      });
    }
  },
  methods: {
    // 点击回退
    handleBack() {
      uni.navigateBack();
    },

    // 获取购物车数据
    getData() {
      getCartCheckoutApi({
        userId: getUserId(),
        cartId: 0,
        addressId: this.defaultAddress && this.defaultAddress.id,
        couponId: this.couponId,
        useVoucher: this.useVoucher
      }).then(({ data }) => {
        this.goodsInfo = data.brandCartgoods;
        this.actualPrice = data.actualPrice;
        this.couponPrice = data.couponPrice;
      });
    },

    // 获取地址
    getAddrees() {
      getAddressListApi({
        userId: getUserId()
      }).then(({ data }) => {
        const defaultAddress = data.find((item) => item.isDefault);
        if (defaultAddress) {
          this.defaultAddress = defaultAddress;
        } else {
          this.defaultAddress = data[0];
        }
        this.getData();
      });
    },

    handleChangeUseVoucher(e) {
      if (this.currentHoldVoucher) {
        this.useVoucher = e.detail.value;
        this.getData();
      }
    },

    // 点击去支付
    handleToPay() {
      if (!this.defaultAddress) {
        uni.showToast({
          title: '请选择收货地址',
          duration: 2000,
          icon: 'none'
        });
        return;
      }
      const data = {
        userId: getUserId(),
        // cartId: this.cartId,
        cartId: 0,
        addressId: this.defaultAddress.id,
        couponId: this.couponId,
        useVoucher: this.useVoucher,
        grouponRulesId: '',
        grouponLinkId: ''
      };

      submitOrderApi(data).then(async ({ data }) => {
        uni.setStorageSync(PAY_SHORT_ORDER_NO, data.orderSn);
        if (this.$store.state.app.isInMiniProgram) {
          const payAppesult = await payOrderGoodsAPPApi({
            userId: getUserId(),
            orderNo: data.orderSn,
            payType: 1
          });

          if (payAppesult.errno === 0) {
            let query = '';
            for (const key in payAppesult.data) {
              query += key + '=' + payAppesult.data[key] + '&';
            }

            wx.miniProgram.navigateTo({
              url: '/pages/loading/loading?' + query + 'orderNo=' + lastData.orderSn + '&userId=' + getUserId(),
              fail: () => {
                // uni.redirectTo({ url: '/user/orderForm/order-form?type=1' });
                uni.switchTab({
                  url: '/pages/order/order?type=shop&status=1'
                });
              }
            });
          }
        } else {
          // #ifdef H5
          getSybOrderPayH5({
            orderNo: data.orderSn,
            userId: getUserId(),
            payType: 1
          }).then((res) => {
            payFn(res.data);
          });
          // #endif

          // #ifdef APP
          const payAppesult = await payOrderGoodsAPPApi({
            userId: getUserId(),
            orderNo: data.orderSn,
            payType: 1
          });

          if (payAppesult.errno === 0) {
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
      });
    },

    handleChooseCoupon(couponInfo) {
      this.couponId = couponInfo.id;
      this.getData();
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
    }
  },

  onLoad() {
    this.$store.dispatch('shopCar/getShopCarList');
    this.getAddrees();
    this.getUserHoldVoucher();
    // this.getData()
  },

  computed: {
    ...mapGetters(['shopCarInfo']),
    goodsList() {
      if (!this.shopCarInfo || !this.shopCarInfo.brandCartgoods) {
        return [];
      } else {
        this.shopCarInfo.brandCartgoods.forEach((item) => {
          item.cartList.filter((item) => item.checked);
        });
        return this.shopCarInfo;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../style/mixin.less';

/deep/ .recommend-goods-container {
  padding: 0 !important;
}

.order-container {
  // .h-flex();
  font-size: 28upx;
  width: 100%;
  height: 120upx;
  box-sizing: border-box;
  padding-right: 30upx;
  padding: 40upx 20upx 20upx;
  box-sizing: border-box;

  .uni-btn {
    font-size: 28upx;
  }

  .title-wrapper {
    .h-flex(flex-start);

    text {
      font-weight: 500;
      font-size: 32upx;
    }
  }

  .address-container {
    margin: 30upx;

    .bas-info {
      padding-bottom: 20upx;
      margin-bottom: 20upx;
      border-bottom: 1upx solid #d7d7d7;

      .h-flex();

      .right {
        .h-flex();
      }
    }
  }

  .goods-container {
    padding: 20upx;
    box-sizing: border-box;

    .goods-info {
      .brand-title {
        .h-flex(flex-start);
        padding-bottom: 20upx;
        margin-bottom: 20upx;
        border-bottom: 1upx solid #efefef;
      }

      .goods-item {
        display: flex;
        align-items: center;
        margin-bottom: 30upx;

        .goods-name {
          font-weight: 500;
        }
      }

      .goods-icon {
        width: 140upx;
        height: 140upx;
        border-radius: 10upx;
        flex-shrink: 0;
        margin-right: 20upx;
      }

      .goods-price {
        color: red;
        margin-right: 4upx;
      }

      .wraper {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }

  .coupon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30upx;
    box-sizing: border-box;

    .choose-coupon {
      display: flex;
      align-items: center;

      /deep/ .tui-icon {
        margin-top: 4upx !important;
      }
    }
  }
}

.selected-str {
  width: 540upx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 20upx 0;
  color: #323232;
}

.footer {
  height: 120upx;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1upx solid rgb(231, 231, 231);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20upx;
  box-sizing: border-box;
  background: #fff;

  .tip {
    text {
      color: #f40;
    }
  }

  .uni-btn {
    background-color: #f86e42;
    padding: 20upx 40upx;
    border-radius: 100px;
    color: #fff;
  }
}
</style>
