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

  methods: {
    async submit(form) {
      console.log(form);
      const data = {
        username: form.mobile,
        password: form.password,
        mobile: form.mobile,
      };
      const res = await userRegisterApi(data);
      console.log(res);
    },
  },
};
</script>