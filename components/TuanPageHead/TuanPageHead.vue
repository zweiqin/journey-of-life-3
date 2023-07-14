<template>
  <view
    class="page-head"
    :class="{ fixed: fixed && scrollTop > fiexdHeight }"
    :style="{
      height: height + 'rpx',
      background: bacokground,
      padding: padding,
      color: scrollTop > fiexdHeight ? fixedColor : color
    }"
  >
    <view class="left">
      <slot name="left"></slot>
    </view>
    <view
      class="center"
      :style="{
        color: titleColor
      }"
    >
      {{ title }}
    </view>
    <view class="right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 100
    },
    bacokground: {
      type: String
    },
    padding: {
      type: String,
      default: '0 24rpx'
    },

    title: {
      type: String,
      required: true
    },

    titleColor: {
      type: String
    },

    fixed: {
      type: Boolean,
      default: false
    },

    scrollTop: {
      type: Number,
      default: 0
    },

    fiexdHeight: {
      type: Number,
      default: 300
    },

    color: String,
    fixedColor: String
  }
};
</script>

<style lang="less" scoped>
@keyframes silder {
  0% {
    top: -100upx;
  }

  100% {
    top: 0upx;
    // box-shadow: 0 0 0 #f40;
  }
}

.page-head {
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &.fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: #fff;
    z-index: 10000000;
    animation: silder 200ms ease-in-out;
    box-shadow: 0 0 10px 2px #cdcdcd;
  }

  .left,
  .right {
    width: 120upx;
    height: 100%;
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
