<template>
  <view class="pane-container">
    <view class="title-container">
      <view class="title">
        <image class="icon" :src="titleIcon" mode="" />
        <span class="pane-title">{{ title }}</span>
        <slot name="title"></slot>
      </view>

      <slot name="right"></slot>
    </view>

    <view class="content-container">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import { titleIcon } from '../config'
export default {
  props: {
    name: {
      type: String,
      required: true,
      validate: value => {
        return ['profile', 'fans', 'gen', 'analysis'].includes(value)
      },
    },

    title: {
      type: String,
      required: true,
    },
  },

  computed: {
    titleIcon() {
      return titleIcon[this.name]
    },
  },
}
</script>

<style lang="less" scoped>
.pane-container {
  width: 100%;
  color: #000;
  padding: 34upx 24upx 44upx;
  box-sizing: border-box;
  margin-top: 20upx;
  margin-bottom: 20upx;
  border-radius: 20upx;
  background-color: #fff;
  font-size: 28upx;


  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;


    .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .icon {
      width: 48upx;
      height: 48upx;
      margin-right: 20upx;
    }

    .pane-title {
      color: #000;
    }
  }

  .content-container {
    margin-top: 20upx;
  }
}
</style>
