<template>
  <AuthForm
    :btn-top="185"
    btn-text="提交"
    @submit="submit"
    type="register"
    routeText="已有帐号?"
    route="/pages/login/login"
  ></AuthForm>
</template>

<script>
import AuthForm from '../../components/auth-form'
import { userRegisterApi } from '../../api/auth'
export default {
  components: {
    AuthForm,
  },

  data() {
    return {
      timer: null,
      to: null,
    }
  },

  onLoad(params) {
    this.to = params.to == 'undefined' ? '' : params.to
  },

  methods: {
    async submit(form) {
      if (form.mobile.length !== 11) {
        uni.showToast({
          title: '手机号格式错误',
          duration: 2000,
          icon: 'none',
        })

        return
      }
      const data = {
        username: form.mobile,
        password: form.password,
        mobile: form.mobile,
      }
      await userRegisterApi(data)

      uni.showToast({
        title: '注册成功',
        duration: 2000,
      })

      this.timer = setTimeout(() => {
        if (this.to) {
          uni.navigateTo({
            url: '/pages/login/login?code=' + this.to,
          })
        } else {
          uni.navigateTo({
            url: '/pages/login/login',
          })
        }
      }, 1000)
    },
  },

  deactivated() {
    clearTimeout(this.timer)
    this.timer = null
  },
}
</script>
