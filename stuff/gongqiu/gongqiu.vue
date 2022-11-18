<template>
  <view class="gongqiu">
    <Ttitle :title="title" :search="search" v-model="inputDetail"></Ttitle>
    <view class="choseType">
      <view
        class="information"
        v-for="item in information"
        :key="item.value"
        :class="{ active: item.value == choseTab }"
        @click="touch(item.value)"
        >{{ item.lable }}</view
      >
    </view>
    <view class="nowTime">
      <view class="nowText">时间</view>
      <view class="timeDetail">{{ nowTime }}</view>
    </view>
    <view class="detailTitle" v-if="choseTab == 0">
      <view class="flex">
        <view
          class="text"
          v-for="item in detail"
          :key="item.id"
          :style="{ width: item.width }"
          >{{ item.title }}</view
        ></view
      >
      <view
        class="supply"
        v-for="(item1, index) in PcToday"
        :key="item1.id"
        @click="mydetail(item1)"
      >
        <view class="no">{{ index + 1 }}</view>
        <view class="category">{{ item1.materialsCategory }}</view>
        <view class="address">{{ item1.materialsRegion }}</view>
        <view class="color">{{ "无" || item1.materialsColor }}</view>
        <view class="phone">{{ item1.materialsPhone | replacestar }}</view>
        <view class="time">{{ item1.addTime | formatTime }}</view>
        <view class="else">无</view>
      </view>
    </view>
    <view class="detailTitle" v-if="choseTab == 1">
      <view class="flex">
        <view
          class="text"
          v-for="item in pcTodayDetail"
          :key="item.id"
          :style="{ width: item.width }"
          >{{ item.title }}</view
        >
      </view>

      <view
        class="Pctoday"
        v-for="(item1, index) in supplyList"
        :key="item1.id"
        @click="thisDetail(item1)"
      >
        <view class="no1">{{ index + 1 }}</view>
        <view class="category1">{{ item1.materialsCategory }}</view>
        <view class="address1">{{ item1.materialsRegion }}</view>
        <view class="material">{{ item1.materialsTexture }}</view>
        <view class="number">{{ item1.sales }}</view>
        <view class="much">{{ item1.referenceMoney }}元</view>
        <view class="phone1">{{ item1.materialsPhone | replacestar }}</view>
      </view>
    </view>
    <view>
      <uni-popup ref="popup" type="center">
        <view class="whiteBackground">
          <!-- <view>序号：{{ id }}</view> -->
          <view>类别：{{ materialsCategory }}</view>
          <view>地区：{{ materialsRegion }}</view>
          <view>颜色：{{ materialsColor }}</view>
          <view>手机号：{{ materialsPhone }}</view>
          <view>发布时间：{{ addTime }}</view></view
        >
      </uni-popup>
      <uni-popup ref="popup1" type="center">
        <view class="whiteBackground">
          <!-- <view>序号：{{ id }}</view> -->
          <view>类别：{{ materialsCategory }}</view>
          <view>地区：{{ materialsRegion }}</view>
          <view>材质：{{ materialsTexture }}</view>
          <view>销量：{{ sales }}</view>
          <view>参考价：{{ referenceMoney }}</view>
          <view>手机号：{{ materialsPhone }}</view></view
        >
      </uni-popup>
    </view>
    <!-- <view class="seeMore">查看更多</view> -->
  </view>
</template>

<script>
import { information, detail, pcTodayDetail } from "./config";
import { getSupplyListApi, getPcTodayListApi } from "../../api/stuff";
export default {
  data() {
    return {
      information,
      detail,
      pcTodayDetail,
      title: "供求信息",
      search: true,
      choseTab: 0,
      nowTime: "",
      supply: [],
      PcToday: [],
      inputDetail: "",
      id: "",
      materialsCategory: "",
      materialsRegion: "",
      materialsColor: "",
      materialsPhone: "",
      addTime: "",
      materialsTexture: "",
      referenceMoney: "",
      sales: "",
      supplyList: [],
      PcTodayList: [],
      page: 1,
    };
  },
  filters: {
    formatTime(time) {
      const a = time.split(" ")[0].split("-");
      return a[1] + "-" + a[2];
    },
  },

  onLoad(options) {
    this.getNowTime();
    this.getSupplyList();
    this.getPcTodayList();
  },
  methods: {
    thisDetail(item1) {
      this.$refs.popup1.open("center");
      console.log(item1);
      this.id = item1.id;
      this.materialsCategory = item1.materialsCategory;
      this.sales = item1.sales;
      this.materialsRegion = item1.materialsRegion;
      this.materialsTexture = item1.materialsTexture;
      this.referenceMoney = item1.referenceMoney;
      this.materialsPhone = item1.materialsPhone;
    },
    mydetail(item1) {
      console.log(item1);
      this.$refs.popup.open("center");
      this.id = item1.id;
      this.materialsCategory = item1.materialsCategory;
      this.materialsRegion = item1.materialsRegion;
      this.materialsColor = item1.materialsColor;
      this.materialsPhone = item1.materialsPhone;
      this.addTime = item1.addTime;
    },
    // 供应列表
    async getSupplyList() {
      const res = await getSupplyListApi({
        page: this.page,
      });
      if (res.errno === 0) {
      } else {
        uni.showToast({
          title: "供应列表失败",
          duration: 2000,
        });
      }
      this.supplyList = res.data.items;
      // this.supplyList.sort(function (x, y) {
      //   return x.id > y.id ? 1 : -1;
      // });
      // this.supplyList = this.supplyList.slice(0, 5);
      console.log("供应列表", this.supplyList);
      this.supply = res.data;
    },
    // 采购列表
    async getPcTodayList() {
      const res = await getPcTodayListApi({
        page: this.page,
      });
      if (res.errno === 0) {
      } else {
        uni.showToast({
          title: "采购列表失败",
          duration: 2000,
        });
      }
      if (this.PcToday == []) {
        console.log("2b");
        this.Pctoday.push(res.data.items);
      } else {
        console.log("3b");
        this.PcToday = res.data.items;
        console.log("采购列表", res.data);
        this.PcTodayList = res.data;
      }
    },
    touch(item) {
      this.choseTab = item;
      console.log(item);
    },
    bottomHint() {
      uni.showToast({
        title: "数据加载完毕",
        icon: "none",
        mask: true,
      });
    },
    //获取当前时间
    getNowTime() {
      let date = new Date();
      let year = new Date().getFullYear();
      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() + 1;
      //日
      let day = new Date().getDate();
      //时
      let hour = new Date().getHours();
      //分
      let minute = new Date().getMinutes();
      //秒
      let second = new Date().getSeconds();
      let time = year + "-" + month + "-" + day;
      this.nowTime = time;
    },
  },
  onReachBottom() {
    if (this.choseTab == 0) {
      if (this.page * 10 <= this.PcTodayList.total) {
        this.page = this.page + 1;
        this.getPcTodayList();
      } else {
        this.bottomHint();
      }
    } else if (this.choseTab == 1) {
      if (this.page * 10 <= this.supply.total) {
        this.page = this.page + 1;
        this.getSupplyList();
      } else {
        this.bottomHint();
      }
    }
  },
};
</script>

<style lang="less" scoped>
.gongqiu {
  padding: 72upx 24upx 100upx 24upx;
  .whiteBackground {
    background-color: white;
    border-radius: 20upx;
    padding: 40upx 120upx;
    width: 100%;
    box-sizing: border-box;
  }
  .choseType {
    display: flex;
    margin-top: 26upx;
    font-size: 32upx;
    font-weight: 500;
    .information {
      margin-right: 90upx;
      color: #3d3d3d;

      &.active {
        color: #3662ec;
        font-weight: 700;
      }
    }
  }
  .nowTime {
    display: flex;
    font-size: 28upx;
    font-weight: 500;
    margin-top: 22upx;
    .nowText {
      color: black;
      margin-right: 22upx;
    }
    .timeDetail {
      color: #fa5151;
    }
  }
  .detailTitle {
    margin-top: 26upx;
    .flex {
      display: flex;

      .text {
        color: #999999;
        text-align: center;
        font-size: 24upx;
        border-bottom: #d8d8d8 1upx solid;
        padding-bottom: 10upx;
        font-weight: 400;
      }
    }

    .supply {
      display: flex;
      font-size: 24upx;
      text-align: center;
      margin: 20upx 0;
      padding-bottom: 10upx;
      border-bottom: #d8d8d8 1upx solid;
      &:last-child {
        border: none;
      }
      .no {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .category {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .address {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .color {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .phone {
        width: 25%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        color: #3662ec;
      }
      .time {
        width: 15%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        color: #fa5151;
      }
      .else {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .Pctoday {
      margin: 20upx 0;
      display: flex;
      font-size: 24upx;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      padding-bottom: 10upx;
      border-bottom: #d8d8d8 1upx solid;
      text-overflow: ellipsis;
      &:last-child {
        border: none;
      }
      .no1 {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .category1 {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .address1 {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .material {
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .number {
        color: #fa5151;
        width: 12%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .much {
        color: #fa5151;
        width: 15%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .phone1 {
        color: #3662ec;
        width: 25%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .seeMore {
    color: #999999;
    align-items: center;
    text-align: center;
    font-size: 28upx;
    padding-top: 50upx;
  }
}
</style>
