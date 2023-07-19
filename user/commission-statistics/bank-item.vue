<template>
  <view class="bank-item-container">
    <TuanPageHead :title="isEdit ? '修改银行卡' : '添加银行卡'" padding="10upx">
      <tui-icon @click="handleBack" slot="left" name="arrowleft" color="#3d3d3d"></tui-icon>
    </TuanPageHead>

    <tui-form ref="form" :showMessage="false">
      <tui-input
        @click="$refs.chooseOpenBnakRef && $refs.chooseOpenBnakRef.show(handleSelectOpenBank)"
        :labelSize="28"
        :size="28"
        label="开户银行"
        readonly
        disabled
        v-model="form.openCardBank"
        :lineLeft="false"
        placeholder="请选择您的开户银行"
      ></tui-input>
      <tui-input :labelSize="28" :size="28" label="支行名称" :lineLeft="false" placeholder="请输入您的支行名称" v-model="form.bankName"></tui-input>
      <tui-input :labelSize="28" :size="28" label="银行卡号" :lineLeft="false" placeholder="请输入您的银行卡号" v-model="form.cardNo"></tui-input>

      <button @click="handleAddBandCard" :loading="isLoading" class="uni-btn">{{ isEdit ? '确认修改' : '确认添加' }}</button>
    </tui-form>

    <ChooseOpenBank ref="chooseOpenBnakRef"></ChooseOpenBank>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { USER_INFO } from 'constant';
import { addCommannderBankCardApi, editCommanderBnakCardApi } from '../../api/user';
import ChooseOpenBank from './components/ChooseOpenBnak/ChooseOpenBank.vue';

const rules = [
  {
    name: 'openCardBank',
    rule: ['required'],
    msg: ['请选择您的开户银行']
  },
  {
    name: 'bankName',
    rule: ['required'],
    msg: ['请输入您的银行名称']
  },
  {
    name: 'cardNo',
    rule: ['required'],
    msg: ['请输入您的银行卡号']
  }
];
export default {
  components: {
    ChooseOpenBank
  },
  onLoad(params) {
    this.isEdit = !!params.id;
    if (this.isEdit) {
      this.form.openCardBank = params.openCarBank;
      this.form.bankName = params.bankName;
      this.form.cardNo = params.cardNo;
      this.form.id = params.id;
      uni.setNavigationBarTitle({ title: '修改银行卡信息' });
    }

    this.isBack = params.type;

    this.userInfo = uni.getStorageSync(USER_INFO);
    if (!this.userInfo.phone) {
      this.ttoast({
        type: 'fail',
        title: '获取您的电话失败'
      });

      this.timer = setTimeout(() => {
        this.clearTimer();
        this.handleBack();
      }, 2000);
    } else {
      this.form.mobile = this.userInfo.phone;
    }
  },
  data() {
    return {
      form: {
        bankName: '',
        cardNo: '',
        openCardBank: '',
        mobile: ''
      },
      isLoading: false,
      userInfo: null,
      timer: null,
      isEdit: false,
      isBack: false
    };
  },

  methods: {
    handleBack() {
      this.clearTimer();
      if (this.isBack) {
        uni.navigateBack();
        return;
      }
      uni.redirectTo({
        url: '/user/commission-statistics/bank-list'
      });
    },
    handleSelectOpenBank(data) {
      this.form.openCardBank = data;
    },

    // 添加银行卡
    handleAddBandCard() {
      const _this = this;
      const api = _this.isEdit ? editCommanderBnakCardApi : addCommannderBankCardApi;
      try {
        this.isLoading = true;
        this.$refs.form
          .validate(this.form, rules)
          .then(async () => {
            await api(_this.form);
            _this.ttoast(_this.isEdit ? '修改成功' : '添加成功');
            if (_this.timer) {
              _this.clearTimer();
            } else {
              _this.timer = setTimeout(() => {
                _this.handleBack();
              }, 1000);
            }
          })
          .catch((errors) => {
            let errorMsg = typeof errors === 'object' ? errors.errorMsg : errors;
            this.ttoast({
              type: 'fail',
              content: '添加失败',
              title: errorMsg
            });
          });
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style lang="less" scoped>
.bank-item-container {
  .uni-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    position: fixed;
    left: 25upx;
    right: 25upx;
    bottom: 30upx;
    width: 700upx;
    height: 80upx;
    background-color: #fe751a;
    border-radius: 20upx;
    margin: 0 auto;
    color: #fff;
    transition: all 350ms;

    &:active {
      background-color: #ff8a3c;
    }
  }
}
</style>
