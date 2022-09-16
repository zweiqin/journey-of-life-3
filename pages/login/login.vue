<template>
  <AuthForm @submit="submit"></AuthForm>
</template>

<script>
import AuthForm from "../../components/auth-form";
import { userLoginApi } from "../../api/auth";
export default {
  components: {
    AuthForm,
  },

  methods: {
    async submit(form) {
      const res = await userLoginApi({
        username: form.mobile,
        password: form.password,
      });
      console.log(res);
    },
  },
};
</script>