<template>
  <view class="btns" @click="handleCHnageViewType">
    <button
      data-type="chart"
      class="uni-btn"
      :class="{ active: value === 'chart' }"
    >
      图表
    </button>
    <button
      class="uni-btn"
      data-type="form"
      :class="{ active: value === 'form' }"
    >
      表单
    </button>
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
    handleCHnageViewType(e) {
      this.$emit("input", e.target.dataset.type);
    },
  },
};
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  align-items: center;
  .uni-btn {
    width: 70upx;
    height: 32upx;
    font-size: 24upx;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      color: #e95d20;
      border: 1upx solid #e95d20;

      border-radius: 2px;
    }
  }
}
</style>