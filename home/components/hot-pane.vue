<template>
  <ul class="hot-container">
    <li :class="{ active: isNew }" @click="handleSelectTag('新品专区')">
      新品专区
    </li>
    <li :class="{ active: isHot }" @click="handleSelectTag('爆款专区')">
      爆款专区
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    hot: false,
    new: false,
  },
  data() {
    return {
      isHot: false,
      isNew: false,
    };
  },

  methods: {
    handleSelectTag(tag) {
      this.$emit("change", tag);
    },
  },

  watch: {
    hot: {
      handler(value) {
        this.isHot = value;
      },

      immediate: true,
    },

    new: {
      handler(value) {
        this.isNew = value;
      },

      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

ul {
  padding: 0;

  li {
    font-size: @f12;
    color: @c3d;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 12px;

    &.active {
      color: #ff8f1f;
    }
  }
}
</style>
