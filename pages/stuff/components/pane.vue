<template>
  <view class="pane-container">
    <view class="header">
      <view class="title">{{ title }}</view>
      <view class="more" v-show="showMore" @click="handleViewMore">
        <text class="text">更多</text>
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8jef23u4szet1cnjuec5.png"
          class="icon"
          alt=""
        />
      </view>
    </view>
    <view class="body" style="padding: 10px 0">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    route: String,
    showMore: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleViewMore() {
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
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.pane-container {
  margin: 26upx auto 20upx auto;
}

.header {
  .flex();
  font-size: @f14;
  color: @c0;
  font-weight: bold;
  padding-left: 14upx;
  border-left: 4upx solid #fa5151;
}

.text {
  font-size: @f12;
  font-weight: normal;
  margin-right: 8upx;
}

.icon {
  width: 12upx;
}
</style>