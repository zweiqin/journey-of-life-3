<template>
    <view class="sub-navs-container">
      <view
        class="nav-item"
        @click="$emit('change-sub', nav)"
        :class="{ active: activeValue === nav.value }"
        v-for="nav in navs"
        :key="nav.label"
        >{{ nav.label }}</view
      >
    </view>
</template>

<script>
export default {
  props: {
    navs: {
      type: Array,
      required: true
    },

    activeValue: {
      type: Number,
      required: true
    }
  },


};
</script>

<style lang="less" scoped>
.sub-navs-container {
  display: flex;
  align-items: center;
  margin: 20upx 0 30upx 0;
  position: relative;
  z-index: 1000;

  .nav-item {
    padding: 10upx 34upx;
    border-radius: 20upx;
    color: #222229;
    font-size: 26upx;
    line-height: 1.5;

    &.active {
      background-color: #fff;
      color: #ef5613;
    }
  }
}
</style>
