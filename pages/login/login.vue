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
      isBind: false,
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

        if (this.isBind) {
          uni.switchTab({
            url: "/pages/user/user",
          });

          uni.setStorageSync("BIND_ID", this.params.userId);
          return;
        } else {
          if (this.redirect) {
            console.log(this.redirect);
            uni.redirectTo({
              url: _this.redirect,
            });
          } else {
            uni.switchTab({
              url: "/pages/community-center/community-centerr",
            });
          }
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
    this.params = options;

    this.isBind = !!(options.type === "bind");

    const userId = uni.getStorageSync(USER_ID);
    if (userId) {
      if (this.isBind) {
        uni.switchTab({
          url: "/pages/user/user?bindId=" + options.userId,
        });
        return;
      }
      uni.switchTab({
        url: "/",
      });
    }
  },
};
</script>