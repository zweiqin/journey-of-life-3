<template>
  <AuthForm
    @submit="submit"
    btn-text="确定"
    :btn-top="100"
    type="reset"
  ></AuthForm>
</template>

<script>
import AuthForm from '../../components/auth-form'
import { resetPasswodApi } from '../../api/auth'

export default {
  components: {
    AuthForm,
  },

  data() {
    return {
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
      console.log(form)

      const res = await resetPasswodApi({
        mobile: form.mobile,
        password: form.password,
      })

      if (res.errno === 0) {
        uni.showToast({
          title: '密码重置成功',
          duration: 2000,
        })

        setTimeout(() => {
          if (this.to) {
            uni.navigateTo({
              url: '/pages/login/login?code=' + this.to,
            })
          } else {
            uni.navigateTo({
              url: '/pages/login/login',
            })
          }
        }, 2000)
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
          icon: 'none',
        })
      }
    },
  },
}
</script>
