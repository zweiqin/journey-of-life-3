<template>
  <view class="incomeHead">
    <view class="top">
      <view class="thisStatus">
        <view class="nowText">全部订单</view>
        <image
          class="nowImg"
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xec14lqq91bfk158rd7n.png "
          mode="scaleToFill"
        />
      </view>
      <view class="choseStatus"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "incomeHead",
  props: {},
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

<style scoped>
.incomeHead {
  .top {
    .thisStatus {
      .nowText {
      }
      .nowImg {
        width: 32upx;
        height: 32upx;
      }
    }
  }
}
</style>