<template>
  <view>
    <view class="newBusiness">
      <Ttitle :title="'业务管理'"></Ttitle>
      <view style="margin-top: 20upx"></view>
      <businessSearch></businessSearch>
      <view class="head">
        <view
          class="headDetail"
          v-for="item in businessHead"
          :key="item.value"
          :style="{ width: item.width }"
        >
          {{ item.label }}
        </view>
        <image
          @click="addUser(2)"
          src="./image/plus.png"
          mode="scaleToFill"
          class="addImg"
        />
      </view>
      <businessUser
        v-for="item in bussinessList"
        :key="item.id"
        :id="item.id"
        :value="value"
        :userName="item.userName"
        :userTel="item.userTel"
        :userGender="item.userGender"
        :professional="item.professional"
        :data="item"
      ></businessUser>
    </view>
    <view class="bottom">
      <view class="status">
        <view
          class="item"
          :class="{ active: item.value == value }"
          v-for="item in status"
          :key="item.value"
          @click="switchTab(item.value)"
        >
          {{ item.label }}
        </view>
      </view></view
    ></view
  >
</template>

<script>
import {
  queryMsgSentryListApi,
  saveMsgSentryApi,
  upbussinessApi,
} from "../../../api/user";
import { getUserId } from "../../../utils";
import businessSearch from "./businessSearch";
import businessUser from "./businessUser";
import { status, businessHead } from "./config.js";
export default {
  name: "newBusiness",
  components: { businessSearch, businessUser },
  props: {},
  data() {
    return { status, businessHead, value: 5, bussinessList: [] };
  },
  computed: {},
  methods: {
    addUser(e) {
      // uni.navigateTo({ url: `./addUser/index?type=${e}` });
      uni.navigateTo({ url: `./addUser/index` });
    },
    switchTab(tab) {
      this.value = tab;
      this.queryMsgSentryList();
    },
    async queryMsgSentryList() {
      const res = await queryMsgSentryListApi({
        userId: getUserId(),
        // userId: 269,
        status: this.value,
      });
      if (res.errno == 780) {
        uni.showToast({
          title: res.errmsg,
          icon: "none",
          mask: true,
        });
        setTimeout(() => {
          uni.switchTab({ url: "/pages/user/user" });
        }, 2000);
      } else {
        this.bussinessList = res.data;
      }
      console.log(res);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.queryMsgSentryList();
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
.newBusiness {
  padding: 0 10upx;
  .head {
    display: flex;
    border-bottom: 1px solid #d8d8d8;
    justify-content: space-between;
    padding-bottom: 10upx;
    margin: 20upx 0;
    .headDetail {
      text-align: center;
      font-size: 28upx;
    }
    .addImg {
      height: 40upx;
      width: 40upx;
      padding: 0 20upx;
      margin: 0 10upx;
      margin-right: 10px;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  height: 80upx;
  line-height: 80upx;
  background: white;
  width: 100%;
  .status {
    display: flex;
    justify-content: space-around;
    font-size: 28upx;
    .item {
      &.active {
        color: #fa5151;
        font-weight: 600;
      }
    }
  }
}
</style>