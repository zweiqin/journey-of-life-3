<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="chooseBankPopupVisible" @close="closePopup">
    <view class="choose-bank-container">
      <view class="popup-title-container">
        <view class="title">{{ isShowEdit ? '请填写开户银行' : '请选择开户银行' }}</view>
        <tui-icon @click="closePopup" name="close" :size="20"></tui-icon>
      </view>

      <div class="open-bank-container" style="height: 438rpx; width: 100%">
        <scroll-view class="scroll-view" scroll-y="true" style="height: 438rpx" :class="isShowEdit ? 'contract' : 'spare'">
          <view class="bank-list-picker-container">
            <view
              class="bank-item"
              v-for="bank in openBankList"
              :class="{ active: currentChooseOpenBank === bank.text }"
              @click="handleChooseOpenBnak(bank.text)"
              :key="bank.text"
              >{{ bank.text }}</view
            >
            <view class="tip"> 没有找到？<text class="btn" @click="handleEditOpenBank">点我</text>输入开户银行 </view>
          </view>
        </scroll-view>

        <view class="edit-form-container">
          <view class="form">
            <input v-model="editOpenBank" class="input" placeholder="请输入开户银行名称" type="text" />
          </view>

          <view class="tip" @click="isShowEdit = false">
            选择开户银行
            <tui-icon color="#fe751a" :size="24" name="toright"></tui-icon>
          </view>
        </view>
      </div>

      <view class="confirm-container">
        <button @click="handleConfirm" class="s-btn">确定</button>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </tui-bottom-popup>
</template>

<script>
import { openBankList } from './data';
export default {
  data() {
    return {
      chooseBankPopupVisible: false,
      openBankList: Object.freeze(openBankList),
      isShowEdit: false,
      currentChooseOpenBank: '',
      editOpenBank: '',
      onSuccessFn: null
    };
  },

  methods: {
    // 打开选择
    show(onSuccessFn) {
      this.chooseBankPopupVisible = true;
      this.onSuccessFn = onSuccessFn;
    },

    // 关闭
    closePopup() {
      this.isShowEdit = false;
      this.chooseBankPopupVisible = false;
    },

    // 点击输入银行
    handleEditOpenBank() {
      this.isShowEdit = !this.isShowEdit;
    },

    // 选择bank
    handleChooseOpenBnak(bankName) {
      this.currentChooseOpenBank = bankName;
    },

    // 点击确定
    handleConfirm() {
      if (this.isShowEdit) {
        if (!this.editOpenBank.trim()) {
          this.$toast({
            type: 'fail',
            title: '请输入开户银行或者点击选择开户银行'
          });

          return;
        }

        this.onSuccessFn && typeof this.onSuccessFn === 'function' && this.onSuccessFn(this.editOpenBank);
        this.closePopup();
      } else {
        if (!this.currentChooseOpenBank) {
          this.$toast({
            type: 'fail',
            title: '请选择开户银行或者输入开户银行名称'
          });
          return;
        }
        this.onSuccessFn && typeof this.onSuccessFn === 'function' && this.onSuccessFn(this.currentChooseOpenBank);
        this.closePopup();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.choose-bank-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 52upx 40upx 10upx;
  box-sizing: border-box;
  height: 700upx;
  background-color: #fff;
  border-radius: 20upx 20upx 0 0;
  overflow: hidden;

  .popup-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30upx;
    width: 100%;

    .title {
      color: #1c2023;
      font-size: 32upx;
    }
  }

  .open-bank-container {
    height: 438upx;
    width: 100%;
    position: relative;

    .scroll-view {
      position: relative;
      z-index: 2;
      background-color: #fff;
      transition: all 350ms;
    }

    .edit-form-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1;

      .form {
        width: 100%;
        border-bottom: 1upx solid #ccc;

        .input {
          padding-bottom: 20upx;
        }
      }

      .tip {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 28upx;
        margin-bottom: 30upx;
        color: #fe751a;
      }
    }
  }

  .bank-list-picker-container {
    flex: 1;
    width: 100%;

    .tip {
      height: 80upx;
      text-align: center;
      // line-height: 80upx;
      margin-top: 20upx;
      overflow: hidden;
      transition: all 340ms;
      font-size: 28upx;

      .btn {
        color: #fe751a;
      }
    }

    .bank-item {
      height: 104upx;
      line-height: 104upx;
      text-align: center;
      border-bottom: 1upx solid #f1f1f1;
      color: #979797;
      font-size: 28upx;
      transition: all 200ms;

      &.active {
        font-weight: 500;
        color: #1c2023;
        border-bottom-color: #e3e4e5;
        // transform: scale(1.2);
      }

      &:active {
        background-color: #f1f1f1;
      }
    }
  }

  .confirm-container {
    height: 98upx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8upx 0;
    box-sizing: border-box;

    .s-btn {
      width: 100%;
      height: 80upx;
      border-radius: 20upx;
      font-size: 30upx;
      font-weight: 500;
      background-color: #fe751a;
      color: #fff;
      line-height: 80upx;
      transition: all 350ms;
      &:active {
        background-color: #ff9045;
      }
    }
  }
}

.contract {
  transform: translate(-120%);
  opacity: 0;
}

.spare {
  transform: translate(0);
  opacity: 1;
}
</style>
