<template>
  <AuthForm
    @submit="submit"
    btn-text="确定"
    :btn-top="100"
    type="reset"
    title="重置密码"
  ></AuthForm>
</template>

<script>
import AuthForm from "../../components/auth-form";
import { resetPasswodApi } from "../../api/auth";

export default {
  components: {
    AuthForm,
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
      console.log(form);

      const res = await resetPasswodApi({
        mobile: form.mobile,
        password: form.password,
      });

      if (res.errno === 0) {
        uni.showToast({
          title: "密码重置成功",
          duration: 2000,
        });

        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/login/login",
          });
        }, 3000);
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
          icon: "none",
        });
      }
    },
  },
};
</script>