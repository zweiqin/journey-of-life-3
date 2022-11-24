<template>
  <view class="all">
    <view class="brandTitle">
      <view class="left"></view>
      <view class="text">{{ title }}</view>
      <view class="left"></view>
    </view>
    <view class="goods"> <slot></slot></view>
  </view>
</template>

<script>
import { title } from "../config";

export default {
  name: "brandTitle",
  props: { title: String },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.all {
}
.brandTitle {
  display: flex;
  align-items: center;
  margin: 20upx 0;
  justify-content: center;
  .left {
    border-bottom: 1px solid #d8d8d8;
    height: 1px;
    width: 160upx;
  }
  .text {
    margin: 10upx 40upx;
    font-size: 32upx;
    font-weight: 600;
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>