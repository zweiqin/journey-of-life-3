<template>
  <view class="commision-page">
    <view class="back">
      <tui-icon name="arrowleft" color="#000" @click="handleBack" :size="30"></tui-icon>

      <button class="uni-btn" @click="handleToBankList">
        <image class="img" src="../../static/images/new-user/group/849a12e594b7b12ef97bfc363ef95a8.png"></image>
        <text class="btn-text">我的银行卡</text>
      </button>
    </view>

    <!-- 上面三个统计 -->
    <view class="top-pane">
      <view class="item" @click="go('/user/commission-statistics/commission-detail?date=now')">
        <image class="img" src="../../static/images/new-user/group/today-price.png"></image>
        <view class="text">今日佣金</view>
        <view class="value">￥{{ commissionData.toDayCommissionSum || 0 }}</view>
      </view>

      <view class="item" @click="go('/user/commission-statistics/commission-detail?')">
        <image class="img" src="../../static/images/new-user/group/total-price.png"></image>
        <view class="text">累计佣金</view>
        <view class="value">￥{{ commissionData.commissionSum || 0 }}</view>
      </view>
      <view class="item">
        <image class="img" src="../../static/images/new-user/group/lu-price.png"></image>
        <view class="text">途中佣金</view>
        <view class="value">￥{{ commissionData.commissionOnTheWay || 0 }}</view>
      </view>
    </view>

    <!-- 列表统计 -->
    <view class="list">
      <view class="list-wrapper">
        <view class="item" @click="go('/user/commission-statistics/vip-user')">
          <image class="img" src="../../static/images//new-user/group/total-vip-number.png"></image>
          <view class="text">累计会员(个)</view>
          <view class="value">{{ commissionData.memberSum || 0 }}</view>
        </view>

        <view class="item" @click="go('/user/commission-statistics/vip-user?date=now')">
          <image class="img" src="../../static/images//new-user/group/today-vip-number.png"></image>
          <view class="text">今日会员(个)</view>
          <view class="value">{{ commissionData.toDayMemberSum || 0 }}</view>
        </view>

        <view class="item">
          <image class="img" src="../../static/images//new-user/group/can-whith.png"></image>
          <view class="text">可提现(元)</view>
          <view class="value">{{ commissionData.commissionWithdrawable || 0 }}</view>
        </view>

        <view class="item">
          <image class="img" src="../../static/images//new-user/group/has-whitdh.png"></image>
          <view class="text">已提现(元)</view>
          <view class="value">{{ commissionData.commissionWithdrawn || 0 }}</view>
        </view>
      </view>

      <view class="button-wrapper">
        <view class="tip">可提现 ￥{{ commissionData.commissionWithdrawable || 0 }}</view>
        <button
          @click="handleWithdrawal(commissionData.commissionWithdrawable)"
          :class="{ disabled: !commissionData.commissionWithdrawable || commissionData.commissionWithdrawable == 0 }"
          class="uni-btn"
        >
          佣金提现
        </button>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { USER_INFO } from 'constant';
import { getCommissionDatatApi } from '../../api/user';
export default {
  data() {
    return {
      userInfo: null,
      commissionData: {}
    };
  },
  onShow() {
    this.userInfo = uni.getStorageSync(USER_INFO);
    if (this.userInfo) {
      this.getCommissionData();
    }
  },
  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user'
      });
    },

    async getCommissionData() {
      try {
        const res = await getCommissionDatatApi({
          mobile: this.userInfo.phone,
          date: ''
        });

        this.commissionData = res;
      } catch (error) {
        this.ttoast({
          type: 'fail',
          content: error || '获取佣金信息失败',
          title: '获取佣金详情失败'
        });
      } finally {
        uni.stopPullDownRefresh();
      }
    },

    // 去管理银行卡
    handleToBankList() {
      uni.navigateTo({ url: '/user/commission-statistics/bank-list' });
    },

    // 点击提现
    handleWithdrawal(account) {
      if (!account) {
        this.ttoast({
          type: 'fail',
          title: '暂无佣金可提现'
        });
        return;
      }

      uni.navigateTo({
        url: '/user/commission-statistics/withdrawal?account=' + account
      });
    }
  },

  onPullDownRefresh() {
    this.getCommissionData();
  }
};
</script>

<style lang="less" scoped>
.commision-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f7fb;
  display: flex;
  align-items: center;
  flex-direction: column;

  .back {
    position: absolute;
    top: 40upx;
    left: 40upx;
    right: 40upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28upx;
      .img {
        width: 50upx;
        height: 50upx;
        margin-right: 8upx;
      }
    }
  }

  .top-pane {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 206upx 56upx 56upx 56upx;
    box-sizing: border-box;
    width: 100vw;

    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 26upx;
      counter-reset: #3d3d3d;

      .text {
        margin: 16upx 0 12upx 0;
      }

      .value {
        font-weight: 500;
      }
    }
  }

  .list {
    flex: 1;
    width: 100vw;
    background-color: #fff;
    padding-bottom: 56upx;
    border-radius: 80upx 80upx 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .list-wrapper {
      width: 100%;
      padding: 60upx 56upx;
      box-sizing: border-box;
    }

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 46upx;

      .text {
        flex: 1;

        margin-right: 30upx;
        margin-left: 30upx;
      }
    }

    .button-wrapper {
      width: 100%;

      .tip {
        text-align: center;
        margin-bottom: 20upx;
        font-size: 24upx;
      }

      .uni-btn {
        height: 80upx;
        width: 702upx;
        margin: 0 auto;
        background-color: #fe751a;
        color: #fff;
        font-size: 30upx;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 350ms;

        &.disabled {
          opacity: 0.7;
        }

        &:active {
          background-color: #ff8f44;
        }
      }
    }
  }
}

.img {
  width: 80upx;
  height: 80upx;
  flex-shrink: 0;
}
</style>
