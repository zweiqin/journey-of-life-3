<template>
  <view class="j-header-container">
    <JBack v-bind="$attrs" :dark="dark"></JBack>
    <view
      class="title"
      :style="{
        color: !dark ? '#fff' : '',
      }"
      >{{ title }}</view
    >
  </view>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.j-header-container {
  .flex(center, flex-start);

  .title {
    font-size: 32upx;
    color: #3d3d3d;
    font-weight: bold;
    margin-top: -8upx;
    flex: 1;
    text-align: center;
    margin-left: -50upx;
  }
}
</style>
