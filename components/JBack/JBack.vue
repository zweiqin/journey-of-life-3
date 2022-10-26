<template>
  <view class="j-back-container">
    <image
      :style="{
        width: width * 1 + 'upx',
        height: height * 1 + 'upx',
      }"
      @click="handleBack"
      :src="
        dark
          ? 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qt4o7j0jglkweyicy1fw.png'
          : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/eo1rayuh8vu1qtnbdj0l.png'
      "
      mode=""
    />
  </view>
</template>

<script>
export default {
  name: "JBack",
  props: {
    tabbar: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 16,
    },
    height: {
      type: [Number, String],
      default: 28,
    },
    dark: Boolean
  },
  methods: {
    handleBack() {
      if (this.tabbar) {
        uni.switchTab({
          url: this.tabbar,
        });

        return;
      }

      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
.j-back-container {
}
</style>