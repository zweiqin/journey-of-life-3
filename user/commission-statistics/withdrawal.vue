<template>
  <view class="bank-list-page">
    <tui-icon @click="handleBack" margin="0 0 0 -20upx" color="#3d3d3d" name="arrowleft"></tui-icon>

    <view class="main">
      <view class="name">提现金额</view>
      <view class="account-wrapper">￥{{ form.money || 0 }}</view>
    </view>

    <view class="main">
      <view class="name">提现到</view>
      <view class="bank-card" @click="handleChooseBnakCard" v-if="bankList.length">
        <view class="title">银行卡</view>
        <view class="value">{{ selectBank.bankName }}({{ selectBank.cardNo.slice(-4) }})</view>
        <tui-icon name="arrowright" :size="20"></tui-icon>
      </view>

      <view class="bank-card" v-else @click="go('/user/commission-statistics/bank-item?type=1')">您还没有绑定银行卡，请先去绑定银行卡
        <tui-icon :size="20" name="toright"></tui-icon>
      </view>
    </view>

    <view class="btn-wrapper">
      <button class="uni-btn" :loading="isLoading" @click="handleWithdraw">确认提现</button>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <tui-select :list="bankList" reverse :show="chooseBankVisible" @confirm="handleSelect" @close="onClose2"></tui-select>
    <tui-modal :show="showModal" title="提示" content="您还未实名认证，请先去认证" @click="handleOpmodal
      "></tui-modal>
  </view>
</template>

<script>
import { USER_INFO } from 'constant';
import { getCommanderBankCardListApi, commanderWithdrawApi, getIdentityAuthenticationInfoApi } from '../../api/user';
export default {
  data() {
    return {
      bankList: [],
      loading: false,
      showModal: false,
      form: {
        money: '', // 提现金额
        mobile: '',
        accountBankId: '' // 银行卡id
      },

      selectBank: null,
      chooseBankVisible: false,
      timer: null
    };
  },

  onLoad(params) {
    this.form.money = params.account;
  },

  onShow() {
    this.userInfo = uni.getStorageSync(USER_INFO);
    if (this.userInfo) {
      this.form.mobile = this.userInfo.phone;
      this.getCommanderBankCardList();
    }
  },

  methods: {
    handleBack() {
      uni.redirectTo({
        url: '/user/commission-statistics/commission-statistics'
      });
    },
    async getCommanderBankCardList() {
      try {
        this.loading = 'loading';
        const res = await getCommanderBankCardListApi({
          mobile: this.userInfo.phone
        });

        this.bankList = res.map((item) => {
          item.text = item.openCardBank + '-' + item.bankName;
          item.value = item.id;
          return item;
        });
        this.selectBank = this.bankList[0];
        this.form.accountBankId = this.selectBank.id;
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '银行卡列表获取失败',
          content: error
        });

        this.bankList = [];
      } finally {
        this.loading = 'more';
        uni.stopPullDownRefresh();
      }
    },

    // 点击修改
    handleEditBankInfo(data) {
      uni.navigateTo({
        url: `/user/commission-statistics/bank-item?openCarBank=${data.openCardBank}&bankName=${data.bankName}&id=${data.id}&cardNo=${data.cardNo}`
      });
    },

    // 选择银行卡
    handleChooseBnakCard() {
      this.chooseBankVisible = true;
    },

    handleSelect(data) {
      this.form.accountBankId = data.options.id;
      this.selectBank = data.options;
      this.chooseBankVisible = false;
    },

    // 点击提现
    async handleWithdraw() {
      if (!this.form.accountBankId) {
        this.ttoast({
          type: 'fail',
          title: '请选择要提现的银行卡'
        });

        this.chooseBankVisible = true;

        return;
      }

      try {
        this.isLoading = true
        const authInfo = await getIdentityAuthenticationInfoApi({
          mobile: this.userInfo.phone
        })

        if (authInfo) {
          await commanderWithdrawApi(this.form);
          this.ttoast('提现审核提交成功！');

          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.timer = null;
            uni.navigateBack();
          }, 2000);
        } else {
          this.showModal = true
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '提现失败',
          content: error
        });
      } finally {
        this.isLoading = false
      }
    },

    handleOpmodal(e) {
      if (e.index) {
        uni.navigateTo({
          url: '/user/commission-statistics/identity-authentication',
        })
      }

      this.showModal = false
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onPullDownRefresh() {
    this.getCommanderBankCardList();
  }
};
</script>

<style lang="less" scoped>
.bank-list-page {
  width: 100vw;
  padding: 42upx;
  box-sizing: border-box;

  .main {
    margin-top: 43upx;
    margin-bottom: 64upx;

    .name {
      color: #b3b2ad;
      font-size: 32upx;
    }

    .item {
      height: 80upx;
      margin-top: 40upx;
      line-height: 80upx;
    }

    .account-wrapper {
      font-size: 42upx;
      color: #3a3629;
      font-weight: bold;
      padding: 32upx 0;
      border-bottom: 1upx solid #d5d4d1;
    }

    .bank-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50upx;
      font-size: 28upx;

      .title,
      .value {
        color: #141000;
        font-weight: 500;
        font-size: 28upx;
      }

      .value {
        flex: 1;
        margin-left: 30upx;
      }
    }
  }

  .btn-wrapper {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120upx;
    width: 100vw;
    border: 1px solid #e5e5e5;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80upx;
      width: 90vw;
      background-color: #fe751a;
      font-size: 28upx;
      color: #fff;
      border-radius: 40upx;
    }
  }
}
</style>
