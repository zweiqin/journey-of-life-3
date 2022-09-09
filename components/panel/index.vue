<template>
  <view class="panel">
    <view class="header">
      <text class="title">{{ title }}</text>
      <view class="route-wrapper" v-if="routeText" @click="handleToLink">
        <text class="route">{{ routeText }}</text>
        <img src="../../static/images/common/chevron-states.png" alt="icon" />
      </view>
    </view>

    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    routeText: {
      type: String,
    },

    route: {
      type: String,
    },
  },
  methods: {
    handleToLink() {
      if (!this.route) {
        return;
      }
      uni.navigateTo({
        url: this.route,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.panel {
  width: 100%;
  margin-bottom: 40upx;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10upx;

    .title,
    .route {
      line-height: 32upx;
    }

    .title {
      color: #3d3d3d;
      font-size: 24upx;
      font-weight: bold;
    }

    .route-wrapper {
      display: flex;
      align-items: center;

      .route {
        color: #999999;
        font-size: 16upx;
      }
    }
  }
}
</style>