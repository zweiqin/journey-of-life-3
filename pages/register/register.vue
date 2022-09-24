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
import AuthForm from "../../components/auth-form";
import { userRegisterApi } from "../../api/auth";
export default {
  components: {
    AuthForm,
  },

  data() {
    return {
      timer: null,
    };
  },

  methods: {
    async submit(form) {
      if (form.mobile.length !== 11) {
        uni.showToast({
          title: "手机号格式错误",
          duration: 2000,
          icon: "none",
        });

        return;
      }
      const data = {
        username: form.mobile,
        password: form.password,
        mobile: form.mobile,
      };
      try {
        const res = await userRegisterApi(data);
        if (res.errno === 0) {
          uni.showToast({
            title: "注册成功",
            duration: 2000,
          });

          this.timer = setTimeout(() => {
            uni.navigateTo({
              url: "/pages/login/login",
            });
          }, 1000);
        } else {
          uni.showToast({
            title: res.errmsg,
            duration: 2000,
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: "注册失败",
          duration: 2000,
          icon: "none",
        });
      }
    },
  },

  deactivated() {
    clearTimeout(this.timer);
    this.timer = null;
  },
};
</script>