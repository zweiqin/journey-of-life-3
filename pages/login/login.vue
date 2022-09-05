<template>
  <AuthForm @submit="submit"></AuthForm>
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