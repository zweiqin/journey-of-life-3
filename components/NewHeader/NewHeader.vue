<template>
  <view
    class="header-container"
    :style="{
      padding: padding,
      textAlign: position,
      display: position === 'center' ? 'block' : 'flex',
      background: backgroundColor,
    }"
  >
    <view
      @click="$emit('back')"
      class="back p-center"
      :style="{
        left: left * 2 + 'upx',
        top: top,
      }"
    >
      <slot>
        <tui-icon :color="color" name="arrowleft"></tui-icon>
      </slot>
    </view>
    <h1 class="title" :style="{ color: color }">{{ title }}</h1>
    <view class="right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      default: '0',
    },

    left: {
      type: Number,
      default: 5,
    },

    top: {
      type: String,
      default: '50%',
    },

    color: {
      type: String,
      default: '#00',
    },

    title: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      default: 'center',
    },

    tabbar: {
      type: String,
    },

    url: String,

    redirect: {
      type: Boolean,
      default: false,
    },

    backgroundColor: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.header-container {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 32upx;
    font-weight: normal;
  }

  .back{
    z-index: 10000;
  }
}
</style>
