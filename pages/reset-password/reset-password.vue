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