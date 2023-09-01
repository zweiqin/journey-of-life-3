<template>
  <view class="serve-menus-container">
    <!-- TODO: 加图标动画 -->
    <view class="item" v-for="serve in communityServeMenu" :key="serve.label" @click="handleToServe(serve)">
      <image class="serve-icon" :src="serve.icon"></image>
      <view class="serve-name">{{ serve.label }}</view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { communityServeMenu } from '../config';
export default {
  data() {
    return {
      communityServeMenu: Object.freeze(communityServeMenu)
    };
  },

  methods: {
    handleToServe(item) {
      if (item.url) {
        uni.navigateTo({
          url: item.url
        });
      } else {
        this.empty();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.serve-menus-container {
  width: 100%;
  padding: 20upx 34upx 20upx;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 24upx;
  border-radius: 20upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .item {
    margin-right: 34upx;
    margin-bottom: 20upx;

    &:nth-child(5n) {
      margin-right: 0;
    }

    .serve-icon {
      width: 80upx;
      height: 80upx;
    }

    .serve-name {
      font-size: 24upx;
      color: #222229;
      line-height: 1.5;
      margin-top: 20upx;
    }
  }
}
</style>
