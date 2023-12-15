<template>
  <view class="voucher-container">
    <view class="main">
      <view class="page-header">
        <tui-icon @click="handleBack" :size="28" name="arrowleft" color="#fff" class="item back-icon"></tui-icon>
        <button @click="go('/user/voucher/transfer-history')" class="uni-btn item">代金券流水</button>
      </view>

      <view class="account-wrapper">
        <view class="tip">我的代金券</view>
        <view class="count"> ￥{{ currentHoldVoucher || 0 }} <text class="icon">元</text> </view>
      </view>
    </view>

    <view class="pane">
      <view class="pane-title-wrapper">
        <view class="title"> <tui-icon :size="26" color="#000" name="bankcard"></tui-icon> 代金券充值</view>
        <button class="uni-btn" @click="handleToViewVoucher">代金券充值记录 <tui-icon :size="20" color="#ccc" name="arrowright"></tui-icon></button>
      </view>

      <view class="btn-content">
        <view class="price-wrapper" @click="handlePay(item)" v-for="(item, index) in rechargeList" :key="index">
          <view class="count">{{ item }}</view>
          <view v-if="typeof item === 'number'" class="desc">售价{{ typeof item === 'number' ? item / 2 : item }}元</view>
        </view>
      </view>
    </view>

    <view class="pane">
      <view class="pane-title-wrapper">
        <view class="title"> <tui-icon :size="20" color="#000" name="applets"></tui-icon> 代金券转赠</view>
      </view>

      <view class="btn-content">
        <view class="price-wrapper" @click="handleVoucherTranfer(item)" v-for="(item, index) in rechargeList" :key="index">
          <view class="count">{{ item }}</view>
        </view>
      </view>
    </view>

    <!-- 充值 -->
    <RechargeCustomPopup ref="rechargeCustomPopupRef"></RechargeCustomPopup>
    <!-- 转赠 -->
    <TransferVoucher @refresh="getUserHoldVoucher" ref="transferVoucherRef"></TransferVoucher>
    <!-- toast -->
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { rechargeList } from './config';
import RechargeCustomPopup from './components/RechargeCustomPopup.vue';
import TransferVoucher from './components/TransferVoucher.vue';
import { getVoucherTypeListApi } from '../../api/goods';
import { refrshUserInfoApi } from '../../api/user';
import { getUserId } from '../../utils';

export default {
  components: {
    RechargeCustomPopup,
    TransferVoucher
  },
  data() {
    return {
      rechargeList: Object.freeze(rechargeList),
      currentVoucherRecharge: [],
      currentHoldVoucher: 0
    };
  },

  onLoad() {
    this.getVoucherTypeList();
    this.getUserHoldVoucher();
  },

  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user'
      });
    },
    // 代金券购买
    handlePay(item) {
      console.log(this.$store.getters.userInfo.userMap);
      const userLevelMap = this.$store.getters.userInfo.userMap;
      if (userLevelMap) {
        const { isGd, isHhr, isMd, isTz } = userLevelMap;
        if ((!isGd, !isHhr, !isMd, !isTz)) {
          this.ttoast({
            type: 'fail',
            title: '您的等级不够',
            content: '无法购买代金券'
          });
          return;
        }
        this.$refs.rechargeCustomPopupRef && this.$refs.rechargeCustomPopupRef.show(item, this.currentVoucherRecharge);
      } else {
        this.ttoast({
          type: 'fail',
          title: '您的等级不够',
          content: '无法购买代金券'
        });
      }
    },

    // 代金券转增
    handleVoucherTranfer(item) {
      this.$refs.transferVoucherRef && this.$refs.transferVoucherRef.show(item);
    },

    // 去查看代金券充值记录
    handleToViewVoucher() {
      uni.navigateTo({ url: '/user/voucher/recharge-history' });
    },

    // 获取代金券类型列表
    async getVoucherTypeList() {
      const { data } = await getVoucherTypeListApi();
      if (data && Array.isArray(data) && data.length) {
        this.currentVoucherRecharge = data[0];
      }
    },

    // 获取我的代金券数量
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

  async onPullDownRefresh() {
    await this.getUserHoldVoucher();
    await this.getVoucherTypeList();
    uni.stopPullDownRefresh();
  }
};
</script>

<style lang="less" scoped>
.back-icon {
  width: 64upx;
  height: 64upx;
}

.voucher-container {
  min-height: 100vh;
  background-color: #f6f6f6;

  .main {
    background: #ef530e;
    padding: 20upx 20upx;
    box-sizing: border-box;
    .page-header {
      height: 60upx;
      width: 100%;
      display: flex;
      align-items: center;

      .page-titel {
        width: 300upx;
        text-align: center;
      }

      .item {
        width: 200upx;
        height: 100upx;
        flex: 1;
        display: flex;
        align-items: center;
      }

      .page-title {
        font-size: 32upx;
        font-weight: 500;
        color: #fff;
      }

      .uni-btn {
        color: #fff;
        font-size: 28upx;
        justify-content: flex-end;
        padding-right: 20upx;
        box-sizing: border-box;
      }

      .back-icon {
        justify-content: flex-start;
      }
    }

    .account-wrapper {
      padding: 70upx 0;
      display: flex;
      align-items: center;
      flex-direction: column;

      .tip {
        font-size: 28upx;
        color: #fff;
      }
    }

    .count {
      text-align: center;
      font-size: 80upx;
      font-weight: bold;
      color: #fff;

      .icon {
        font-size: 32upx;
        font-weight: normal;
        margin-left: 0.2em;
      }
    }
  }

  .pane {
    padding: 30upx 30upx 0;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 30upx;

    .pane-title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 28upx;
        font-weight: 500;
        display: flex;
        align-items: center;
      }

      .uni-btn {
        display: flex;
        align-items: center;
        font-size: 28upx;
        color: #ccc;
      }

      /deep/ .tui-icon {
        margin-right: 6upx !important;
      }
    }

    .btn-content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20upx;

      .price-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 200upx;
        height: 200upx;
        background-color: #fff;
        margin-bottom: 40upx;
        font-size: 24upx;
        color: #ef530e;
        border-radius: 20upx;
        border: 1upx solid #ef530e;

        .count {
          font-size: 40upx;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
