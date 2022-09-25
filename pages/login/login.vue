<template>
  <AuthForm @submit="submit"></AuthForm>
</template>

<script>
import AuthForm from "../../components/auth-form";
import { userLoginApi } from "../../api/auth";
import { USER_ID, USER_TOKEN, user_INFO } from "../../constant";

export default {
  components: {
    AuthForm,
  },

  data() {
    return {
      redirect: "",
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
      const res = await userLoginApi({
        username: form.mobile,
        password: form.password,
      });

      const _this = this;

      if (res.errno === 0) {
        uni.showToast({
          title: "登陆成功",
          duration: 2000,
        });

        uni.setStorageSync(user_INFO, res.data.userInfo);
        uni.setStorageSync(USER_ID, res.data.userInfo.userId);
        uni.setStorageSync(USER_TOKEN, res.data.token);

        if (this.redirect) {
          uni.redirectTo({
            url: _this.redirect,
          });
        } else {
          uni.switchTab({
            url: "/pages/stuff/stuff",
          });
        }
      } else {
        uni.showToast({
          title: res.errmsg,
          duration: 2000,
          icon: "none",
        });
      }
    },
  },

  onLoad(options) {
    this.redirect = options.to;
  },
};
</script>