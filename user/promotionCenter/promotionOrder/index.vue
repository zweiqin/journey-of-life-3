<template>
  <view class="promotionOrder">
    <view class="top">
      <view class="orderNumber">SN22053018466816C7</view>
      <view class="orderType">已关闭</view>
    </view>
    <view class="bottom">
      <view class="orderTime">2022-05-30 18:46:30</view>
      <view class="right">
        <view class="money">￥9.90 </view>
        <view class="practicalMoney">实付：￥99.00</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "promotionOrder",
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

<style lang="less" scoped>
.promotionOrder {
  margin:10upx 15upx;
  border-bottom: 1px solid #d8d8d8;
  padding: 6upx 20upx;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20upx;
    .orderNumber {
      font-size: 24upx;
    }
    .orderType {
      font-size: 24upx;
    }
  }
  .bottom {
    justify-content: space-between;
    display: flex;
    .orderTime {
      font-size: 24upx;
      color: #999999;
    }
    .right {
      display: flex;
      font-size: 24upx;
      .money {
        color: #999999;
        margin-right: 46upx;
      }
      .practicalMoney {
        color: #fa5151;
      }
    }
  }
}
</style>