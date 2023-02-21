<template>
  <view class="login-containter">
    <AuthForm :to="redirect" @submit="submit"></AuthForm>

    <view class="argument" @click="go('/pages/service-agreement/service-agreement')">《团蜂服务平台协议》</view>
  </view>
</template>

<script>
import AuthForm from '../../components/auth-form'
import { NEW_BIND_ID, USER_ID, USER_INFO } from '../../constant'
import { bindLastUserApi, checkBindApi } from '../../api/user'

const tabbarList = [
  '/pages/user/user',
  '/pages/community-center/community-center',
  '/pages/index/index',
  '/pages/stuff/stuff',
]

export default {
  components: {
    AuthForm,
  },

  data() {
    return {
      redirect: '',
      isBind: false,
      bindId: null,
      userId: null,
    }
  },

  methods: {
    async submit(form) {
      const _this = this
      if (form.mobile.length !== 11) {
        uni.showToast({
          title: '手机号格式错误',
          duration: 2000,
          icon: 'none',
        })

        return
      }

      const res = await this.$store.dispatch('auth/loginAction', {
        username: form.mobile,
        password: form.password,
      })

      if (uni.getStorageSync(NEW_BIND_ID) && !this.bindId) {
        try {
          await this.checkBind({ userId: res.userInfo.userId })
        } catch (error) {
          this.bindId = uni.getStorageSync(NEW_BIND_ID)
          await this.binding(res.userInfo.userId, () => {
            uni.switchTab({
              url: '/',
            })
          })
        }
      }

      if (this.bindId) {
        await this.binding(res.userInfo.userId, () => {
          uni.switchTab({
            url: '/',
          })
        })
        return
      } else {
        if (this.redirect) {
          if (tabbarList.includes(this.redirect)) {
            uni.switchTab({
              url: this.redirect,
            })
          } else {
            uni.redirectTo({
              url: _this.redirect,
            })
          }
        } else {
          uni.switchTab({
            url: '/pages/community-center/community-centerr',
          })
        }
      }
    },

    // 绑定
    binding(userId, cb) {
      const _this = this
      return new Promise((resolve, reject) => {
        bindLastUserApi({
          userId,
          userCode: this.bindId,
        })
          .then(res => {
            _this.timer = setTimeout(() => {
              cb && typeof cb === 'function' && cb()
            }, 1000)
            resolve()
          })
          .catch(err => {
            uni.removeStorageSync(NEW_BIND_ID)
            _this.timer = setTimeout(() => {
              cb && typeof cb === 'function' && cb()
            }, 1000)
            reject()
          })
      })
    },

    // 校验绑定
    checkBind(data) {
      return new Promise((reslove, reject) => {
        checkBindApi(data)
          .then(() => {
            reslove(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },
  },

  async onLoad(options) {
    this.redirect = options.to
    this.params = options
    this.bindId = options.bindId
    if (this.bindId) {
      uni.setStorageSync(NEW_BIND_ID, this.bindId)
    }

    const userId = uni.getStorageSync(USER_ID)
    const userInfo = uni.getStorageSync(USER_INFO)

    if (uni.getStorageSync(NEW_BIND_ID) && userId && !this.bindId) {
      this.bindId = uni.getStorageSync(NEW_BIND_ID)

      try {
        await this.checkBind({ userId: userId })
      } catch (error) {
        await this.binding(userId, () => {
          uni.switchTab({
            url: '/',
          })
        })
      }
    }

    // return
    if (userId && userInfo.userId) {
      if (this.bindId) {
        await this.binding(userId, () => {
          uni.switchTab({
            url: '/',
          })
        })
      } else {
        uni.switchTab({
          url: '/',
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
.login-containter {
  position: relative;

  .argument {
    position: absolute;
    bottom: 30upx;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28upx;
    color: #ff8f1f;

  }
}
</style>
