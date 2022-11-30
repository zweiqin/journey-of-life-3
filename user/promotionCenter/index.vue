<template>
  <view class="promotionCenter">
    <Ttitle :title="'推广中心'"></Ttitle>
    <promotionUser></promotionUser>
    <promotionBrokerage></promotionBrokerage>
    <view style="display: flex; justify-content: space-evenly">
      <view class="item" :class="{ active: currentTab == 0 }" @click="chose(0)"
        >收入动态</view
      >
      <view class="item" :class="{ active: currentTab == 1 }" @click="chose(1)"
        >收入占比</view
      ></view
    >
    <view class="income">
      <template v-if="currentTab == 0">
        <incomeDetail :showTime="showTime"></incomeDetail>
      </template>
      <template v-if="currentTab == 1">
        <incomeProportion></incomeProportion> </template
    >
  </view>
  </view>
</template>

<script>
import promotionUser from "./promotionUser";
import promotionBrokerage from "./promotionBrokerage";
import incomeDetail from "./incomeDetail";
import incomeProportion from "./incomeProportion";
export default {
  name: "promotionCenter",
  components: {
    promotionUser,
    promotionBrokerage,
    incomeDetail,
    incomeProportion,
  },
  props: {},
  data() {
    return {
      currentTab: 0,
      showTime: [],
    };
  },
  computed: {},
  methods: {
    chose(e) {
      this.currentTab = e;
    },
    getDayTime() {
      const aaa = [];
      var dayjs = require("dayjs");
      // import dayjs from 'dayjs' // ES 2015
      dayjs().format();
      for (let index = 0; index < 11; index++) {
        let td = dayjs().subtract(index, "day").format("MM-DD");
        const bbb = aaa.unshift(td);
        this.showTime = aaa;
      }
      // for (let index = 1; index < 7; index++) {
      //   let td = dayjs().add(index, "day").format("MM-DD");
      //   const bbb = aaa.push(td);
      //   this.showTime = aaa;
      // }
      console.log(this.showTime);
      let td = dayjs().format("MM-DD");
      const a = td.split("-");
      const b = a[0] + "/" + a[1];
      console.log(b); // 2022-03-03 17:07:11
      // let atd = dayjs().add(-1, 'day').format('YYYY-MM-DD HH:mm:ss')
      let atd = dayjs().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss");
      console.log(atd); // 2022-03-02 17:10:32

      // 未来
      let btd = dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss");
      console.log(btd); // 2022-03-04 17:10:32
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getDayTime();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="less" scoped>
.promotionCenter {
  padding: 18upx;
  .item {
    font-size: 28upx;
    padding-bottom: 4upx;
    &.active {
      font-size: 28upx;
      font-weight: 600;
      padding-bottom: 4upx;
      border-bottom: 4upx solid #ff8f1f;
    }
  }
}
</style>