<template>
  <view class="switch-container" @click="handleChangeDataType">
    <view data-type="order">订单</view>
    <view data-type="fans">粉丝</view>
    <view class="bar" :style="switchStyle"></view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true,
    },
  },

  methods: {
    handleChangeDataType(e) {
      this.$emit("input", e.target.dataset.type);
    },
  },

  computed: {
    switchStyle() {
      return {
        left: this.value === "order" ? "6upx" : 'inherit',
        right: this.value === "order" ? 'inherit' : "6upx",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.switch-container {
  position: relative;
  width: 176upx;
  height: 50upx;
  padding: 4upx;
  box-sizing: border-box;
  background-color: #d8d8d8;
  border-radius: 10upx;
  display: flex;
  align-items: center;

  view {
    position: relative;
    z-index: 10;
    flex: 1;
    text-align: center;
  }

  .bar {
    width: 84upx;
    height: 36upx;
    position: absolute;
    left: 6upx;
    top: 6upx;
    background-color: #fff;
    z-index: 1;
    border-radius: 2px;
  }
}
</style>