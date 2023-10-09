<template>
  <view>
    <tui-top-dropdown :zIndex="1002" :maskZIndex="1001" :height="0" :show="popupVisible" @close="handleHiddenPopup">
      <view class="popup-container">
        <view class="pane-title-wrapper">
          <view class="title">代金券充值</view>
          <tui-icon :size="24" @click="handleHiddenPopup" name="close"></tui-icon>
        </view>

        <view class="input-wrapper">
          <input class="input" v-model="payVoucherForm.payGrade" type="number" placeholder="请输入要购买的代金券的金额" />
        </view>

        <view class="tip" v-if="currentVoucherRecharge && currentVoucherRecharge.ratio && payVoucherForm.payGrade"
          >充值后可获得 {{ payVoucherForm.payGrade * currentVoucherRecharge.ratio }} 代金券</view
        >

        <button :loading="isLoading" class="uni-btn" @click="handleRecharge">确认充值</button>
      </view>
    </tui-top-dropdown>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getUserId, payOrderUtil } from '../../../utils';
import { payVoucherPreApi, commonPayConfig } from '../../../api/goods';

export default {
  data() {
    return {
      popupVisible: false,
      isLoading: false,
      currentVoucherRecharge: null,
      payVoucherForm: {
        payGrade: '',
        userId: getUserId(),
        voucherId: '',
        voucherNum: ''
      }
    };
  },
  methods: {
    show(count, voucherType) {
      if (!voucherType || voucherType.length) {
        this.ttoast({
          title: '没有代金券类型',
          content: '代金券充值失败',
          type: 'fail'
        });

        return;
      }
      if (isNaN(count)) {
        this.payVoucherForm.payGrade = 1;
        this.currentVoucherRecharge = voucherType;
        this.payVoucherForm.voucherId = voucherType.id;
      } else {
        this.payVoucherForm.payGrade = Number(count);
        this.currentVoucherRecharge = voucherType;
        this.payVoucherForm.voucherId = voucherType.id;
      }
      this.popupVisible = true;
    },

    handleHiddenPopup() {
      this.popupVisible = false;
    },

    // 确认充值
    async handleRecharge() {
      try {
        if (!this.payVoucherForm.payGrade || isNaN(this.payVoucherForm.payGrade)) {
          this.ttoast({
            type: 'info',
            title: '请输入合法的金额数字'
          });
          return;
        }
        this.isLoading = true;

        const { data } = await payVoucherPreApi({ ...this.payVoucherForm, voucherNum: this.payVoucherForm.payGrade * this.currentVoucherRecharge.ratio });
        if (data && data.payOrderID) {
          await payOrderUtil({
            userId: getUserId(),
            orderNo: data.payOrderID,
            payType: 2
          }, commonPayConfig, this.$store.state.app.isInMiniProgram || getApp().globalData.isInMiniprogram);
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '支付失败',
          content: error
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.popup-container {
  width: 100%;
  // height: 500px;
  background-color: #fff;
  padding: 30upx;
  box-sizing: border-box;

  .pane-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 32upx;
      color: #000;
      font-weight: 500;
    }
  }

  .input-wrapper {
    padding: 20upx;
    background-color: #f6f6f6;
    margin-top: 40upx;

    .input {
      font-size: 30upx;
    }
  }

  .tip {
    font-size: 24upx;
    color: #ef530e;
    margin-top: 20upx;
  }

  .uni-btn {
    width: 100%;
    height: 90upx;
    background-color: #ef530e;
    margin-bottom: 40upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    color: #fff;
    margin-top: 40upx;
  }
}
</style>
