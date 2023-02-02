<template>
  <view class="switch-container" :class="type">
    <button
      :class="{ active: value === 0 }"
      @click="changeBtn(0)"
      class="uni-btn"
    >
      {{ btns[0] }}
    </button>
    <button
      @click="changeBtn(1)"
      :class="{ active: value === 1 }"
      class="uni-btn"
    >
      {{ btns[1] }}
    </button>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      default: 'legend',
    },

    btns: {
      type: Array,
      required: true,
    },
  },

  methods: {
    // 切换按钮
    changeBtn(index) {
      this.$emit('input', Number(index))
    },
  },
}
</script>

<style lang="less" scoped>
.switch-container {
  display: flex;
  align-items: center;

  &.legend {
    .uni-btn {
      height: 32upx;
      width: 70upx;
      border: 1upx solid transparent;
      font-size: 24upx;
      border-radius: 10upx;
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0 8upx;
      color: #777;

      &.active {
        color: #fe9f21;
        border-color: #fe9f21;
      }
    }
  }

  &.category {
    padding: 4upx;
    box-sizing: border-box;
    background-color: #d8d8d8;
    width: 176upx;
    height: 50upx;
    border-radius: 10upx;

    .uni-btn {
      flex: 1;
      height: 100%;
      font-size: 24upx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10upx;
      color: #3d3d3d;
      transition: all 350ms;

      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>
