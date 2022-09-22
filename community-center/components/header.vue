<template>
  <view class="header-container">
    <img
      @click="back"
      class="back"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/eo1rayuh8vu1qtnbdj0l.png"
      alt=""
    />
    <view>{{ title }}</view>
  </view>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    back() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 100upx;
  background-color: #0090ff;
  line-height: 100upx;
  padding: 0 20upx;
  box-sizing: border-box;
  text-align: center;
  color: #fff;

  .back {
    width: 16upx;
    float: left;
    margin-top: 40upx;
  }
}
</style>
