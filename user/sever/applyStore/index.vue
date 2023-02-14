<template>
  <view class="apply-staore-container">
    <NewHeader
      @back="handleBack"
      title="申请开店"
      top="61%"
      position="left"
      backgroundColor="#fff"
      padding="30upx 80upx 20upx 10upx"
    >
    </NewHeader>

    <view class="main">
      <tui-alerts
        v-if="userLevel === 1"
        type="warn"
        title="您已申请门店，无需重复申请"
      ></tui-alerts>
      <view class="tip">
        申请需要先注册一个帐号，方便登录后台系统，管理门店，请妥善保管
      </view>
      <tui-form ref="form">
        <tui-input
          :size="28"
          :labelSize="28"
          label="后台账号"
          clearable
          borderTop
          required
          placeholder="请输入后台账号"
          v-model.trim="form.username"
        ></tui-input>
        <tui-input
          :size="28"
          :labelSize="28"
          required
          password
          clearable
          label="登录密码"
          :lineLeft="false"
          placeholder="请输入登录密码"
          v-model.trim="form.password"
        ></tui-input>
        <tui-input
          :size="28"
          :labelSize="28"
          required
          clearable
          password
          label="确认密码"
          :lineLeft="false"
          placeholder="请重新输入密码"
          v-model.trim="form.confirmPassword"
        ></tui-input>

        <tui-form-button
          @click="handleApply"
          class="apply-btn"
          radius="50px"
          margin="80upx 0 0 0"
          :loading="loading"
          background="linear-gradient(to right, #ed374d, #fa793f)"
          >提交申请</tui-form-button
        >
      </tui-form>
    </view>
  </view>
</template>

<script>
import { applyStoreApi } from '../../../api/user'
import { USER_ID, USER_INFO } from '../../../constant'
const rules = [
  {
    name: 'username',
    rule: ['required', 'minLength:6'],
    msg: ['请输入后台帐号', '后台帐号最少6个字符'],
  },
  {
    name: 'password',
    rule: ['required', 'minLength:6'],
    msg: ['请输入登录密码', '登录密码最少6个字符'],
  },
  {
    name: 'confirmPassword',
    rule: ['required', 'minLength:6'],
    msg: ['请确认密码', '登录密码最少6个字符'],
  },
]
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      loading: false,
      userLevel: 5,
    }
  },
  onLoad() {
    const userInfo = uni.getStorageSync(USER_INFO) || {}
    this.userLevel = userInfo.userLevel || 5
  },
  methods: {
    // 点击回退
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },

    // 点击申请
    handleApply() {
      const _this = this

      if (this.userLevel === 1) {
        uni.showToast({
          title: '你已经申请了门店，无需重复申请',
        })
        return
      }

      this.$refs.form.validate(this.form, rules).then(() => {
        if (this.form.password !== this.form.confirmPassword) {
          uni.showToast({
            title: '两次密码输入不一致，请重新输入',
            icon: 'none',
          })

          this.form.confirmPassword = ''
          return
        }

        applyStoreApi({
          userId: uni.getStorageSync(USER_ID),
          applicationType: 1,
          username: _this.form.username,
          password: _this.form.password,
        }).then(res => {
          uni.showToast({
            title: '申请成功，等待管理员审核',
            icon: 'none',
          })

          this.form = {
            username: '',
            password: '',
            confirmPassword: '',
          }
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.apply-staore-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f4f9;

  .main {
    padding: 20upx;
    border-radius: 10upx;
  }

  .tip {
    color: #777;
    font-size: 28upx;
    line-height: 1.5;
    margin: 20upx 0;
  }
}
</style>
