<template>
  <view class="asd">
    <web-view :src="url" />
  </view>
</template>

<script>
export default {
  onLoad(options) {
    this.url = options.url;
  },
};
</script>

<style lang="less" scoped>
.asd {
    background-color: #f3f3f3;
    height: 100vh;
}
</style>