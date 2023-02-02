<template>
  <AuthForm @submit="submit"></AuthForm>
</template>

<script>
import AuthForm from '../../components/auth-form'
import { USER_ID } from '../../constant'

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

      await this.$store.dispatch('auth/loginAction', {
        username: form.mobile,
        password: form.password,
      })

      if (this.isBind) {
        uni.switchTab({
          url: '/pages/user/user',
        })

        uni.setStorageSync('BIND_ID', this.params.userId)
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
  },

  onLoad(options) {
    this.redirect = options.to
    this.params = options

    this.isBind = !!(options.type === 'bind')

    const userId = uni.getStorageSync(USER_ID)
    if (userId) {
      if (this.isBind) {
        uni.switchTab({
          url: '/pages/user/user?bindId=' + options.userId,
        })
        return
      }
      uni.switchTab({
        url: '/',
      })
    }
  },
}
</script>
