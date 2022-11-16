<template>
  <view class="tabbar-container">
    <view
      class="item"
      :class="{ active: item.title === '首页' }"
      v-for="item in tabbarConfig"
      :key="item.title"
    >
      <img :src="item.active" alt="" />
      <text>{{ item.title }}</text>
    </view>
  </view>
</template>

<script>
import { tabbarConfig } from "../config";
export default {
  data() {
    return {
      tabbarConfig,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabbar-container {
  position: fixed;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 110upx;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60upx;
  box-sizing: border-box;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    &.active {
      text {
        color: #fa5151;
      }
    }

    text {
      font-size: 24upx;
    }
  }
}
</style>