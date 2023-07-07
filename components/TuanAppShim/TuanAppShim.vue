<template>
  <view
    class="shim"
    :style="{
      height: $store.getters.statusBarHeight + add * 1 + 'px',
      background: bg
    }"
    style="width: 100%"
  ></view>
</template>
$store.getters.statusBarHeight
<script>
export default {
  props: {
    add: {
      type: [Number, String],
      default: 0,
    },

    bg: {
      type: String,
      default: "#fff"
    }
  },
};
</script>

<style lang="less">
</style>
