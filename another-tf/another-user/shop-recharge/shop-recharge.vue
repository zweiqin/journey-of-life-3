<template>
  <view class="shop-recharge-container">
    <view class="total-pane">
      <view class="pane-1">
        <view>当前余额</view>
        <view class="account"> **** <image class="eye-icon"
            src="../../../static/images/new-user/shop-serve/eye-close.png"></image>
        </view>
        <view class="total-account">当前总余额： ****元</view>
      </view>
      <view class="pane-2">
        <view class="item" @click="go('/another-tf/another-user/shop-recharge/recharge-list')">
          <view class="item-title">充值商家(家)</view>
          <view class="item-value">
            ***
          </view>
        </view>
        <view class="item">
          <view class="item-title">充值记录(元)</view>
          <view class="item-value">
            ***
          </view>
        </view>
        <view class="item">
          <view class="item-title">支出记录(元)</view>
          <view class="item-value">
            ***
          </view>
        </view>
      </view>
    </view>

    <view class="tab-wrapper">
      <tui-tabs backgroundColor="#fff" sliderBgColor="#EF530E" sliderRadius="0" unlined color="#222229"
        selectedColor="#222229" :tabs="tabs" itemWidth="50%" :currentTab="currentTab" @change="handleChnage"></tui-tabs>
    </view>

    <view class="recharge-pane">
      <view class="title-wrapper" v-show="currentTab == 1">
        <view class="sub-title">请选择充值商家</view>
      </view>

      <view class="search-shop" v-show="currentTab == 1">
        <input type="text" class="input" placeholder="请选择充值商家">
        <button class="uni-btn search-shop-btn" @click="handleSearchSop">查找</button>
      </view>

      <view class="title-wrapper">
        <view class="sub-title">余额充值</view>
        <view class="tip">充值送代金券</view>
      </view>

      <view class="price-list">
        <view @click="handleChangePrice(item.value)" class="item" :class="{ active: currentRechargeType === item.value }"
          v-for="item in rechargePriceList" :key="item.value">
          <view class="price-text">{{ item.label }}</view>
          <view class="voucher">{{ item.tip || '自定义金额' }}</view>
        </view>
      </view>

      <button class="recharge-button uni-btn" :style="{ opacity: currentRechargeCount ? 1 : 0.6 }"
        @click="handleRecharge"> {{ currentRechargeCount ? `${currentRechargeCount} 立即充值` : '请输入充值金额' }} </button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { rechargePriceList } from './config'

export default {
  data() {
    return {
      currentTab: 0,
      tabs: [{
        name: "平台充值"
      }, {
        name: "商家充值"
      }],
      rechargePriceList: Object.freeze(rechargePriceList),
      currentRechargeType: 50,
      currentRechargeCount: 50,
      searchShopValue: ""
    }
  },

  methods: {
    handleChnage({ index }) {
      this.currentTab = index
    },

    handleChangePrice(price) {
      this.currentRechargeType = price
      if (price != -1) {
        this.currentRechargeCount = price
      } else {
        this.currentRechargeCount = 0
      }
    },

    handleRecharge() {
      if (!this.currentRechargeCount) {
        this.ttoast({
          type: "fail",
          title: '请输入要充值的金额'
        })

        return
      }

      console.log("来了老弟");


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
.shop-recharge-container {
  .total-pane {
    position: relative;
    width: 100%;
    height: 413upx;
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
      background: url('../../../static/images/new-user/shop-serve/accoount-bg.png') no-repeat;
      background-size: contain;
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
        margin: 20upx 0;
      }

      .total-account {
        font-size: 28upx;
        color: #f6a07a;
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
      justify-content: space-between;
      flex-wrap: wrap;

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