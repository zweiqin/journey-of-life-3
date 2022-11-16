<template>
  <view>
    {{ fullName }} <br />
    {{ firstName }} <br />
    {{ lastName }} <br />
    <view @click="xiugai">修改</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      firstName: "john",
      lastName: "doe",
    };
  },
  computed: {
    //计算属性可以监听不存在的 为空的属性
    //与watch不同的是，可以监听不存在的属性
    fullName: {
      get() {
        return this.firstName + " " + this.lastName;
      },
      set(newValue) {
        [this.firstName, this.lastName] = newValue.split(" ");
      },
    },
  },
  methods: {
    xiugai() {
      // this.lastName = 'sb'
      this.fullName = "12 34"
    },
  },
};
</script>

<style>
</style>