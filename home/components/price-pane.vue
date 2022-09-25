<template>
  <ul class="hot-container">
    <li :class="{ active: select === '' }" @click="handleSelectTag('')">
      默认
    </li>
    <li :class="{ active: select === 'asc' }" @click="handleSelectTag('asc')">
      从低到高
    </li>
    <li :class="{ active: select === 'desc' }" @click="handleSelectTag('desc')">
      从高到底
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    select: String,
  },
  data() {
    return {};
  },

  methods: {
    handleSelectTag(tag) {
      this.$emit("change", tag);
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
