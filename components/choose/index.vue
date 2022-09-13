<template>
  <view class="choose-container">
    <view
      class="choose flex-center"
      :class="{ active: active }"
      @click="handleClickTitle"
    >
      <view class="title">{{ title }}</view>
      <view class="tag"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      active: false,
    };
  },

  methods: {
    handleClickTitle() {
      this.$emit("input", this.title);

      if (this.active) {
        this.$emit("close");
      }
    },
  },

  watch: {
    value: {
      handler(val) {
        this.active = val === this.title;
      },

      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.choose-container {
  .choose {
    &.active {
      .tag {
        transform: rotate(180deg);
      }
    }

    .title {
      font-size: 24upx;
      color: #000;
      font-weight: 500;
    }

    .tag {
      width: 24upx;
      height: 12upx;
      background: url("../../static/images/common/tag.png");
      background-size: cover;
      margin-left: 10upx;
      transition: all 350ms linear;
    }
  }
}
</style>