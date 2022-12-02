<template>
  <view class="mask-container animate__animated" @click="$emit('click')">
    <JIcon v-bind="$attrs" :type="type"></JIcon>
    <view class="title">{{ text }}</view>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.mask-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 24upx;
  color: #3662ec;
  background-color: #fff;

  .title {
    margin-top: 20upx;
  }
}
</style>