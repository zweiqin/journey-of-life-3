<template>
  <view class="header">
    <img
      @click="back"
      class="back"
      src="../../static/images/store/chevron-states.png"
      alt=""
    />
    <view class="title" v-if="title">{{ title }}</view>
    <view class="title" @click="toRoute">{{ routeText }}</view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    routeText: String,
    route: String,
  },

  methods: {
    back() {
      wx.navigateBack();
    },

    toRoute() {
      if (!this.route) {
        return;
      }
      uni.navigateTo({
        url: this.route,
      });
    },
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  top: 72upx;
  left: 0;
  padding: 0 40upx;
  width: 100%;
  font-weight: 500;
  box-sizing: border-box;

  .back {
    width: 48upx;
  }

  .title {
    color: #3d3d3d;
    font-size: 36upx;
    font-weight: bold;
  }
}
</style>