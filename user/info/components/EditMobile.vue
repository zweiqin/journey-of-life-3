<template>
  <view>
    <tui-bottom-popup backgroundColor="transparent" :height="700" :show="editMobileVisible" @close="handleClosePopup">
      <view class="nickname">
        <tui-divider :size="32" bold backgroundColor="#f0f0f0" color="#fc8c07" dividerColor="#fc8c07">修改手机号码</tui-divider>
        <tui-form ref="editMobileForm" :showMessage="false">
          <view class="input-wrapper">
            <tui-input label="原手机号" readonly disabled :lineLeft="false" placeholder="请输入手机号" v-model="editMobileForm.oldMobile"></tui-input>
          </view>
          <view class="input-wrapper">
            <tui-input label="新手机号" :lineLeft="false" placeholder="请输入新手机号" v-model="editMobileForm.newMobile"></tui-input>
          </view>

          <view class="input-wrapper">
            <tui-input label="验证码" :lineLeft="false" placeholder="请输入验证码" v-model="editMobileForm.validcode">
              <block slot="right">
                <button class="uni-btn send-code" :calss="{ active: awaitSecond !== 60 }" @click="handleGetCode">{{ awaitSecond !== 60 ? `${awaitSecond}s` : '验证码' }}</button>
              </block></tui-input
            >
          </view>
        </tui-form>

        <button class="uni-btn" :loading="isLoading" @click="handleConfirmEditMobile">确认</button>
      </view>
    </tui-bottom-popup>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getUserId } from '../../../utils';
import { getCodeApi, changeMobileApi } from '../../../api/auth';

const rules = [
  {
    name: 'oldMobile',
    rule: ['required'],
    msg: ['原手机号码获取失败']
  },
  {
    name: 'newMobile',
    rule: ['required', 'isMobile'],
    msg: ['请输入新手机号', '请输入正确的新手机号']
  },
  {
    name: 'validcode',
    rule: ['required'],
    msg: ['请输入验证码']
  }
];

export default {
  data() {
    return {
      editMobileVisible: false,
      isFocus: false,
      awaitSecond: 60,
      editMobileForm: {
        oldMobile: '',
        newMobile: '',
        validcode: '',
        userId: getUserId()
      },
      isLoading: false
    };
  },

  methods: {
    show(oldMobile) {
      if (!oldMobile) {
        return;
      }

      this.editMobileForm.oldMobile = oldMobile;
      this.editMobileVisible = true;
    },

    // 获取验证码
    async handleGetCode() {
      if (this.timer) {
        return;
      }

      if (this.editMobileForm.newMobile.length !== 11) {
        this.ttoast({
          type: 'fail',
          title: '请输入合法的手机号码'
        });
        return;
      }

      uni.showLoading({
        title: '加载中...'
      });

      try {
        await getCodeApi({
          phone: this.editMobileForm.newMobile,
          flag: 2
        });

        this.timer = setInterval(() => {
          this.awaitSecond--;

          if (this.awaitSecond === 0) {
            this.awaitSecond = 60;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '验证码发送失败',
          content: '请稍后重试'
        });
      } finally {
        uni.hideLoading();
      }
    },

    // 关闭popup
    handleClosePopup() {
      this.isLoading = false;
      this.editMobileForm.oldMobile = '';
      this.editMobileForm.newMobile = '';
      this.editMobileForm.validate = '';
      this.editMobileVisible = false;
    },

    // 确认修改
    async handleConfirmEditMobile() {
      try {
        if (this.isLoading) return;
        this.isLoading = true;
        const _this = this;
        await this.$refs.editMobileForm.validate(this.editMobileForm, rules);
        await changeMobileApi(this.editMobileForm);
        this.ttoast('手机号更换成功');
        this.$store.dispatch('auth/refrshUserInfo', (userInfo) => {
          _this.editMobileVisible = false;
          _this.$emit('success', userInfo);
        });
      } catch (error) {
        const errorMsg = typeof error === 'object' ? error.errorMsg || error.userId || error.oldMobile || error.newMobile || error.validate : error;
        this.ttoast({
          type: 'fail',
          title: errorMsg,
          content: '修改失败'
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.nickname {
  // @include flex(space-around, column);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 700upx;
  background-color: #f0f0f0;
  padding: 30upx;
  box-sizing: border-box;

  .popup-title {
    font-size: 32upx;
    font-weight: bold;
  }

  .input-wrapper {
    margin-bottom: 20upx;
  }

  /deep/ .tui-input__wrap {
    border-radius: 10upx;
  }

  .uni-btn {
    width: 90%;
    background-color: #fc8c07;
    color: #fff;
    padding: 30upx 0;
    border-radius: 100px;

    &.send-code {
      width: 120upx !important;
      height: 60upx;
      font-size: 28upx;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10upx;

      &.active {
        opacity: 0.7;
      }
    }
  }
}
</style>
