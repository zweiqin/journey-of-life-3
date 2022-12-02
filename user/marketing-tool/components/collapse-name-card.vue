<template>
  <view class="collapse-name-card">
    <view class="collapse-header" @click="handleCollapse">
      <view class="title">{{ title }}</view>
      <JIcon
        :class="{
          isCollapse: isCollapse,
        }"
        width="36"
        height="44"
        type="right-arrow"
      ></JIcon>
    </view>

    <view
      ref="mainContentRef"
      class="collapse-wrapper"
      id="collapse-wrapper"
      :style="{
        overflow: collapse ? 'hidden' : 'none',
        height: !isCollapse ? height + 'px' : 0,
      }"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      height: "",
    };
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    collapse: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    if (this.collapse) {
      this.$nextTick(() => {
        this.setCollapseHeight();
      });
    }
  },
  methods: {
    handleCollapse() {
      if (!this.collapse) return;
      this.isCollapse = !this.isCollapse;
    },

    setCollapseHeight() {
      const _this = this;

      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this);
        query
          .select("#collapse-wrapper")
          .boundingClientRect((data) => {
            _this.height = data.height;
          })
          .exec();
      });

      // this.$nextTick(() => {
      //   const location = this.$refs.mainContentRef.$el.getBoundingClientRect();
      //   this.height = location.height;
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.collapse-name-card {
  width: 100%;
  padding-bottom: 20upx;

  .collapse-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: rgb(206, 206, 206);
    width: 100%;
    font-size: 28upx;
    color: #3d3d3d;
    font-weight: bold;

    .j-icon {
      transition: all 350ms;
    }

    .isCollapse {
      transform: rotate(90deg);
    }
  }

  .collapse-wrapper {
    transition: all 350ms;
    // background-color: aqua;
    overflow: hidden;
  }
}
</style>