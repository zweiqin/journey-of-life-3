<template>
  <view class="regional-agent-container">
    <view class="regional-agent-title">
      <tui-icon @click="handleBack" name="arrowleft" color="#fff"></tui-icon>
    </view>
    <view class="main-area">
      <view class="title">团长申请</view>
      <view class="item">
        <view class="item-title">区域</view>
        <view class="field-wrapper" @click="handleChooseCity">
          <input disabled readonly type="text" :value="applyGroupForm.region" placeholder="请选择您的区域" />
          <tui-icon name="arrowdown" :size="24"></tui-icon>
        </view>
      </view>

      <!-- <view class="item">
        <view class="item-title">详细地址</view>
        <view class="field-wrapper">
          <input v-model.trim="form.companyAddress" type="text" placeholder="请填写您的详细地址" />
        </view>
      </view> -->

      <view class="item">
        <view class="item-title">姓名</view>
        <view class="field-wrapper">
          <input v-model.trim="applyGroupForm.name" type="text" placeholder="请填写您的姓名" />
        </view>
      </view>

      <view class="item">
        <view class="item-title">手机号</view>
        <view class="field-wrapper">
          <input readonly disabled v-model.trim="applyGroupForm.mobile" type="number" placeholder="请填写您的手机号" />
        </view>
      </view>

      <button @click="submit" class="uni-btn">确定申请</button>
    </view>

    <tui-toast ref="toast"></tui-toast>

    <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>

    <TuanWXLoginBindMobile @close="handleResetGlobal" @success="handleBindMobileSuccess" ref="tuanWXLoginBindMobileRef"></TuanWXLoginBindMobile>
  </view>
</template>

<script>
import form from '../../../components/common/tui-validation/tui-validation';
const rules = [
  {
    name: 'region',
    rule: ['required'],
    msg: ['请选择您的区域']
  },
  {
    name: 'name',
    rule: ['require'],
    msg: ['请填写您的姓名']
  },
  {
    name: 'mobile',
    rule: ['required', 'isMobile'],
    msg: ['请输入手机号', '请输入正确的手机号']
  }
];
import { getUserId } from '../../../utils';
import { USER_INFO } from '../../../constant';
import { applyRegimentalCommander } from '../../../api/user';
export default {
  data() {
    return {
      form: {
        userId: getUserId(),
        legalPerson: '',
        legalP: '',
        agentCode: '',
        companyAddress: ''
      },

      // 申请团长
      applyGroupForm: {
        userId: '',
        mobile: '',
        name: '',
        region: ''
      }
    };
  },

  mounted() {
    this.setUserInfo();
  },

  methods: {
    handleChooseCity() {
      this.$refs.TuanCityRef.show();
    },

    handleConfirmAddress(data) {
      this.applyGroupForm.region = data.formatAddress4;
    },

    // 绑定手机号成功
    async handleBindMobileSuccess() {
      await this.$store.dispatch('auth/refrshUserInfo');
      this.setUserInfo();
    },

    // 关闭
    handleResetGlobal() {
      getApp().globalData.isShowedBindMobilePopu = true;
    },

    // 设置用户信息
    setUserInfo() {
      const userInfo = uni.getStorageSync(USER_INFO);
      if (userInfo) {
        if (userInfo.weixinOpenid && !userInfo.phone) {
          this.ttoast({
            type: 'fail',
            title: '请您先绑定手机号'
          });

          this.$refs.tuanWXLoginBindMobileRef.show();
        } else {
          this.applyGroupForm.userId = userInfo.userId;
          this.applyGroupForm.mobile = userInfo.phone;
        }
      }
    },

    // 提交申请
    async submit() {
      const vali = form.validation(this.applyGroupForm, rules);
      if (!vali) {
        try {
          await applyRegimentalCommander(this.applyGroupForm);
          uni.showToast({
            title: '提交申请成功，请等待管理员审核',
            duration: 2000,
            icon: 'none'
          });

          this.applyGroupForm = {};

          setTimeout(() => {
            uni.switchTab({
              url: '/pages/user/user'
            });
          }, 1000);
        } catch (error) {
          uni.showToast({
            title: error,
            duration: 2000,
            icon: 'none'
          });
        }
      } else {
        uni.showToast({
          title: vali,
          duration: 2000,
          icon: 'none'
        });
      }
    },

    handleBack() {
      uni.switchTab({
        url: '/pages/user/user'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.regional-agent-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #ffdb52;
  background: url('../../../static/images/user/daili/bg.png') no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding-top: 200upx;

  .regional-agent-title {
    position: absolute;
    top: 40upx;
    left: 32upx;
  }

  .main-area {
    position: relative;
    width: 622upx;
    min-height: 500px;
    background-color: #fff;
    margin: 0 auto;
    padding: 112upx 32upx 40upx;
    box-sizing: border-box;
    border-radius: 24upx;

    .title {
      position: absolute;
      color: #fff;
      width: 502upx;
      height: 112upx;
      background: url('../../../static/images/user/daili/title-wrapper.png') no-repeat;
      background-size: cover;
      top: -26upx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 42upx;
      font-weight: bold;
      text-align: center;
      line-height: 112upx;
    }

    .item {
      margin-bottom: 30upx;

      .item-title {
        color: #3a3629;
        font-size: 28upx;
        margin-bottom: 18upx;
      }

      .field-wrapper {
        width: 100%;
        background-color: #f6f6f5;
        height: 96upx;
        border-radius: 16upx;
        padding: 27upx 24upx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        input {
          flex: 1;
          font-size: 28upx;
        }
      }
    }

    .uni-btn {
      border-radius: 100px;
      height: 96upx;
      background-color: #ffd152;
      margin-top: 68upx;
      font-size: 28upx;
      color: #fff;
      line-height: 96upx;
      font-weight: 500;
    }
  }
}

/deep/ .diqu {
  height: auto !important;
}

/deep/ .j-city {
  width: 100%;
}

/deep/ .address .value {
  width: 100%;
  font-size: 28upx;
}
</style>
