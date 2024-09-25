<template>
  <view class="shop-recharge-container">
    <view class="total-pane">
      <view class="itemHeader">
        <image :src="common.seamingImgUrl(shopInfo.shopLogo)" mode="" class="avatar"></image>
        <text class="topTitle">{{ shopInfo.shopName }}</text>
      </view>
      <view class="pane-1">
        <!-- <view>当前余额</view> -->
        <view class="account"> {{ shopInfo.balance }}
					<tui-icon name="unseen" color="#FFFFFF" size="34" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
        </view>
        <!-- <view class="total-account">当前赠送余额： {{ shopInfo.giveBalance }}元</view> -->
      </view>
      <view class="pane-2">
        <view class="item">
          <view class="item-title">剩余代金券</view>
          <view class="item-value">
            {{shopInfo.giveBalance}}
          </view>
        </view>
        <view class="item" @click="go('/another-tf/another-user/shop-recharge/historyRecord')">
          <view class="item-title">充值记录(元)</view>
          <view class="item-value">
            {{ shopInfo.balance }}
          </view>
        </view>
        <view class="item">
          <view class="item-title">支出记录(元)</view>
          <view class="item-value">
            0.00
          </view>
        </view>
      </view>
    </view>

    <view class="tab-wrapper">
      <!-- <tui-tabs backgroundColor="#fff" sliderBgColor="#EF530E" sliderRadius="0" unlined color="#222229"
        selectedColor="#222229" :tabs="tabs" itemWidth="50%" :currentTab="currentTab" @change="handleChnage"></tui-tabs> -->
    </view>

    <view class="recharge-pane">
      <!-- <view class="title-wrapper">
        <view class="sub-title">请选择充值商家</view>
      </view> -->

      <view class="search-shop" v-if="!shopId">
        <input type="text" class="input" placeholder="请选择充值商家">
        <button class="uni-btn search-shop-btn" @click="handleSearchSop">查找</button>
      </view>

      <view class="title-wrapper">
        <view class="sub-title">余额充值</view>
        <view class="tip">充值送代金券</view>
      </view>

      <view class="price-list" v-if="rechargePriceList && rechargePriceList.length > 0">
        <view @click="handleChangePrice(item.rechargeAmount, index)" class="item" :class="{ active: currentRechargeType === index }"
          v-for="(item, index) in rechargePriceList" :key="item.updateTime">
          <view class="price-text">{{ item.rechargeAmount }}</view>
          <view class="voucher">{{ '代金券' + item.bonusAmount + '元' || '自定义金额' }}</view>
        </view>
      </view>
      <view class="price-list" v-else>
        <view class="tipsTitle">
            商户暂未开通充值
        </view>
      </view>

      <button v-if="rechargePriceList && rechargePriceList.length > 0" class="recharge-button uni-btn" :style="{ opacity: currentRechargeCount ? 1 : 0.6 }"
        @click="isShowPayTypePopup = true"> {{ currentRechargeCount ? `${currentRechargeCount} 立即充值` : '请输入充值金额' }} </button>
    </view>

		<tui-bottom-popup :show="isShowPayTypePopup" @close="isShowPayTypePopup = false">
			<view v-if="isShowPayTypePopup" style="padding: 60upx 0 128upx;">
				<CashierList
					ref="refCashierList" :price-pay="currentRechargeCount" show
					pay-type-shops
					:hui-shi-bao-pay="!!currentRechargeCount" show-tonglian-pay
					:show-commission-pay="!!currentRechargeCount" :show-platform-pay="!!currentRechargeCount"
					@change="(e) => payInfo = e"
					@password-input="(e) => (payInfo.pwd = e.pwd) && handlePaymentPassword()"
				/>
				<tui-button
					type="warning" width="168upx" height="64upx" margin="30upx auto 0"
					shape="circle"
					@click="handlePaymentPassword"
				>
					确认支付
				</tui-button>
			</view>
		</tui-bottom-popup>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getRechargeSubmitApi, addRechargeSubmitApi, getRechargeTotalCustomersApi, getByShopAllApi, getByRechargeApi, getIndexShopDetailApi } from '@/api/anotherTFInterface'
import { paymentModeEnum, handleDoPay } from '@/utils/payUtil'

export default {
	name: 'ShopRecharge',
  data() {
    return {
      shopId: '',
      currentTab: 0,
      shopInfo: {},
      // tabs: [{
      //   name: "平台充值"
      // }, {
      //   name: "商家充值"
      // }],
      rechargePriceList: [],
      currentRechargeType: 0,
      currentRechargeCount: 50,
      searchShopValue: "",
			isShowPayTypePopup: false,
			payInfo: {},
    }
  },
  onLoad(options) {
    this.shopInfo = JSON.parse(options.shopInfo)
    this.shopId = this.shopInfo.shopId
    // getByShopAllApi().then(res => {
    //   this.historyMerchantNumber = res.data.records.length
    // })
    // getIndexShopDetailApi({
    //   shopId: this.shopId
    // }).then(res => {
    //   this.shopInfo = res.data
    // })

    // getByRechargeApi({
    //    "page":"1",
    //    "pageSize":"10"
    // }).then(res => {
    //   console.log(res);
    // })
    
    getRechargeSubmitApi({
      shopId: this.shopId
    }).then(res => {
      this.rechargePriceList = Object.freeze(res.data)
      this.currentRechargeCount = this.rechargePriceList[0].rechargeAmount
      // console.log(res);
    })

    getRechargeTotalCustomersApi({  // 空数据，先不作处理
      shopId: this.shopId
    }).then(res => {
      console.log(res);
    })
  },
  methods: {
    handleChnage({ index }) {
      this.currentTab = index
    },

    handleChangePrice(price, index) {
      this.currentRechargeType = index
      this.currentRechargeCount = price
      console.log(this.currentRechargeType,this.currentRechargeCount);
    },

		handlePaymentPassword() {
			if ((this.payInfo.paymentMode !== 9) && (this.payInfo.paymentMode !== 4) && !this.payInfo.pwd) {
				this.$refs.refCashierList && this.$refs.refCashierList.handleInputPaymentPassword()
			} else {
				if (!this.currentRechargeCount) {
					this.ttoast({
						type: "fail",
						title: '请选择要充值的金额'
					})
					return
				}
				addRechargeSubmitApi({
					shopId: this.shopId,
					amountId: this.rechargePriceList[this.currentRechargeType].amountId,
					rechargeBalance: this.currentRechargeCount,
					remark: 'normal'
				}).then(res => {
					handleDoPay({ ...res.data, ...this.payInfo }, 7, paymentModeEnum[7], { fn: () => (this.payInfo.pwd = '') })
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		},

    handleSearchSop() {
      if (!this.searchShopValue) {
        this.ttoast({
          type: 'info',
          title: '请输入商家名称'
        })
        return
      }
    }
  },
}
</script>

<style lang="less" scoped>
    .itemHeader {
        box-sizing: border-box;
        padding: 32rpx;
        padding-bottom: 0rpx;
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        // margin-bottom: 20rpx;
        /* justify-content: space-between; */
        .avatar {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
        }
        .topTitle {
            margin-left: 20rpx;
            justify-self: flex-start;
            width: 353rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 42rpx;
            font-weight: 600;
            line-height: 40rpx;
            color: #f5f5f5;
        }
        .openMerchanDetail {
            position: absolute;
            right: 0;
            .gotoUse {
                font-size: 38rpx;
                font-weight: normal;
                line-height: 32rpx;
                color: #ffffff;
                margin-right: 10rpx;
            }
            .useMoney {
                width: 18rpx;
                height: 24rpx;
            }
        }
    }
.shop-recharge-container {
	/deep/ .tui-bottom-popup {
		overflow: visible;
		.tui-dialog {
			top: auto;
			bottom: 32vh;
		}
	}
  .total-pane {
    z-index: 1;
    position: relative;
    width: 100%;
    // height: 413upx;
    background: linear-gradient(90deg, #EF530E 0%, #EF530E 100%);
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

    &::after {
      content: '';
      width: 624upx;
      height: 675upx;
      display: block;
      position: absolute;
      left: -344upx;
      top: -100upx;
    }

    .pane-1 {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28upx;
      color: #fff;
      flex-direction: column;

      .eye-icon {
        width: 40upx;
        height: 40upx;
        flex-shrink: 0;
        margin-left: 65upx;
      }

      .account {
        display: flex;
        align-items: center;
        font-size: 64upx;
        font-weight: 500;
        margin-bottom: 10rpx;
        // margin: 20upx 0;
      }

      .total-account {
        font-size: 28upx;
        color: #f6a07a;
        // margin-top: 10rpx;
        margin-bottom: 26rpx;
      }
    }


    .pane-2 {
      display: flex;
      align-items: center;
      width: 100%;
      height: 112upx;

      .item {
        position: relative;
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: linear-gradient(to bottom, #f16426, #ef540f);
        padding: 18upx 56upx 18upx 56upx;
        box-sizing: border-box;
        color: #fff;

        &::after {
          display: block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          width: 1upx;
          height: 48upx;
          background-color: #f6a07a;
          z-index: 10;
        }

        &:nth-child(3) {
          &::after {
            display: none;
          }
        }

        &-title {
          font-size: 24upx;
          color: #f8b598;
        }

        &-value {
          font-size: 28upx;
          margin-top: 4upx;
          line-height: 1.5;
        }
      }
    }
  }

  .tab-wrapper {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20upx;
  }

  .recharge-pane {
    position: relative;
    z-index: 2;
    padding: 30upx 50upx 84upx;
    box-sizing: border-box;

    .search-shop {
      display: flex;
      align-items: center;
      padding: 26upx 0;
      border-bottom: 2upx solid #F3F3F3;
      margin-bottom: 68upx;

      .input {
        flex: 1;
        font-size: 32upx;
      }

      .search-shop-btn {
        position: relative;
        padding-left: 16upx;
        font-size: 28upx;
        color: #EF520E;

        &::after {
          content: '';
          width: 1upx;
          height: 220upx;
          display: block;
          left: 0;
          top: 50%;
          background-color: #F3F3F3;
          transform: translateY(-50%);
        }
      }
    }

    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 32upx;
      color: #222229;
      margin-bottom: 38upx;

      .tip {
        color: #888889;
        font-size: 26upx;
      }
    }

    .price-list {
      display: flex;
      align-items: center;
      gap: 24rpx;
      // justify-content: space-between;
      flex-wrap: wrap;
      .tipsTitle {
        margin-top: 40rpx;
        width: 100%;
        text-align: center;
        font-size: 40rpx;
        color: #888889;
      }
      .item {
        width: 200upx;
        height: 200upx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f4f4f4;
        flex-direction: column;
        margin-bottom: 24upx;
        border-radius: 10upx;
        font-size: 52upx;
        color: #222229;
        font-size: 500;
        box-sizing: border-box;


        .voucher {
          color: #888889;
          font-size: 28upx;
          margin-top: 18upx;
        }

        &.active {
          border: 2upx solid #EF520E;
          color: #EF520E;
          background: #FFF5F3;
        }
      }
    }

    .recharge-button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 120upx;
      height: 88upx;
      border-radius: 16upx;
      font-size: 32upx;
      color: #fff;
      background: linear-gradient(287deg, #EF530E 31%, #F77A42 104%);
      box-shadow: 0px 2px 2px 0px #FA6842, 0px 5px 20px 0px rgba(250, 104, 66, 0.8);
      transition: all 350ms;

      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>