<template>
  <view class="j-no-data">
    <JIcon :width="width" :height="height" :type="type"></JIcon>
    <view class="text">{{ text || "暂无数据" }}</view>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "empty",
    },

    width: {
      type: [String, Number],
      default: 200,
    },

    height: {
      type: [String, Number],
      default: 200,
    },

    text: String,
  },
};
</script>

<style lang="less" scoped>
.j-no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30upx 0;
  min-height: 300px;
}

.text {
  color: rgb(173, 173, 173);
  font-size: 28upx;
  letter-spacing: 2px;
  margin-top: 20px;
}
</style>