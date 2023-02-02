<template>
  <view class="fixed-footer-container" :style="styles">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#fff',
    },

    bottom: {
      type: Number,
      default: 0,
    },

    height: {
      type: Number,
      default: 100,
    },
  },

  computed: {
    styles() {
      return {
        backgroundColor: this.backgroundColor,
        bottom: this.bottom + 'upx',
        height: this.height + 'upx',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fixed-footer-container {
  position: fixed;
  left: 0;
  right: 0;
}
</style>
