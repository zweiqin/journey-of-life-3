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
export default {
  components: {
    AuthForm,
  },

  methods: {
    submit(form) {
      console.log(form);
    },
  },
};
</script>