<template>
  <div class="payAccomplish">
    <view class="title"> 支付结果</view>
    <view class="all">
      <view class="background"> <view class="payColor">羊</view></view></view
    >
  </div>
</template>

<script>
import { PAY_ORDER } from "../../constant";
import { getSybGetIsPaySucceedApi } from "../../api/order";
export default {
  name: "payAccomplish",
  components: {},
  props: {},
  data() {
    return {
      orderId: "",
      orderType: "",
      orderNo: "",
    };
  },
  computed: {},
  methods: {
    getOrderNo() {
      this.orderId = uni.getStorageSync(PAY_ORDER);
      console.log(this.orderId);
    },
    async getSybGetIsPaySucceed() {
      const res = await getSybGetIsPaySucceedApi({
        payOrderNo: this.orderId,
      });
      this.orderType = res.errmsg;
      this.orderNo = res.errno;
      uni.showToast({
        title: res.errmsg,
        icon: "none",
        mask: true,
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getOrderNo();
    this.getSybGetIsPaySucceed();
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.all {
  display: flex;
  align-items: center;
  justify-content: center;
  .background {
    background: red;
    width: 140upx;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140upx;
    .payColor {
      color: white;
      font-size: 72upx;
      font-weight: 800;
    }
  }
}
</style>