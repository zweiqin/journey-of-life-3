<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-19 15:31:46
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-26 16:27:34
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\digital-store\performance.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-19 15:31:46
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-20 10:31:48
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\digital-store\performance.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- 标题栏 -->
    <view class="header">
      <img
        src="../../static/images/lqb/site/back.png"
        class="back"
        alt=""
        @click="back"
      />
      <h2>业绩哨兵</h2>
    </view>
    <!-- 业绩管理选择栏 -->
    <view class="performance-chose-top">
      <view
        @click="changeTab(0)"
        :class="{ active: currentTab === 0 }"
        class="item"
        >月</view
      >
      <view
        @click="changeTab(1)"
        :class="{ active: currentTab === 1 }"
        class="item"
        >周</view
      >
      <view
        @click="changeTab(2)"
        :class="{ active: currentTab === 2 }"
        class="item"
        >日</view
      >
    </view>
    <view class="add" @click="bindtapaddperformance">+</view>
    <view class="performance-chose-bottom">
      <view
        @click="changeTab1(1)"
        :class="{ active: currentTab1 === 1 }"
        class="item"
        >门店业绩</view
      >
      <view
        @click="changeTab1(2)"
        :class="{ active: currentTab1 === 2 }"
        class="item"
        >个人业绩</view
      >
      <view
        @click="changeTab1(3)"
        :class="{ active: currentTab1 === 3 }"
        class="item"
        >活动业绩</view
      >
    </view>
    <!-- 数据展示 -->
    <view v-for="(item, id) in monthList" :key="id" v-show="currentTab == 0">
      <view class="performance-detail">
        <view class="month">{{ item.month }}月</view>
        <view class="countData">共{{ item.countData }}条</view>
        <view class="countPrice">{{ item.countPrice }}元</view>
        <view class="img"> > </view>
      </view>
    </view>
    <view
      v-for="(item, index) in weekList"
      :key="index"
      v-show="currentTab == 1"
    >
      <view class="performance-detail">
        <view class="month">{{ item.month }}月{{ item.week }}周</view>
        <view class="countData">共{{ item.countData }}条</view>
        <view class="countPrice">{{ item.countPrice }}元</view>
        <view class="img"> > </view>
      </view>
    </view>
    <view
      v-for="(item, dayId) in dayList"
      :key="dayId"
      v-show="currentTab == 2"
    >
      <view class="performance-detail">
        <view class="month">{{ item.month }}月{{ item.day }}日</view>
        <view class="countData">共{{ item.countData }}条</view>
        <view class="countPrice">{{ item.countPrice }}元</view>
        <view class="img"> > </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserId, request } from "../../utils";
const { formatTime } = require("../../utils/util");
import {
  addperformanceApi,
  performanceListApi,
  getPerformanceInfoApi,
} from "../../api/user";
export default {
  data() {
    return {
      single: "",
      currentTab: 0,
      currentTab1: 1,
      month: "",
      status: 1,
      week: "",
      year: "",
      day: "",
      headName: "",
      alarmMoney: "",
      targetMoney: "",
      alarmTime: "",
      dayinfo: "",
      currentTime: "",
      monthList: "",
      weekList: "",
      dayList: "",
      timeList: [],
    };
  },
  methods: {
    back() {
      uni.switchTab({
        url: "/pages/user/user",
      });
    },
    getrepetitionMonth() {
      var arr = this.timeList;
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.month]) {
          dest.push({
            id: ai.id,
            month: ai.month,
            countData: ai.countData,
            countPrice: ai.countPrice,
          });
          map[ai.month] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.month == ai.month) {
              dj.month = parseFloat(dj.month).toString();
              break;
            }
          }
        }
      }
      // console.log(dest);
      this.monthList = dest;
    },
    getrepetitionWeek() {
      var arr1 = this.timeList;
      var map1 = {},
        dest1 = [];

      for (var i1 = 0; i1 < arr1.length; i1++) {
        var ai1 = arr1[i1];
        let month = arr1[i1].month;
        let week = arr1[i1].week;

        if (i1 + 1 == arr1.length) {
          continue;
        }

        if (month == arr1[i1 + 1].month && week == arr1[i1 + 1].week) {
        } else {
          dest1.push({
            id: ai1.id,
            month: ai1.month,
            week: ai1.week,
            countData: ai1.countData,
            countPrice: ai1.countPrice,
          });
        }
      }

      let j3 = dest1.length - 2;
      // console.log(j3);
      // console.log(dest1[j3]);
      for (const item of dest1) {
        if (item.month == dest1[j3].month && item.week == dest1[j3].week) {
          dest1.pop();
          continue;
        } else {
        }
      }
      console.log(dest1);
      this.weekList = dest1;
    },

    //判断天----------------------------------------------------------------------------------
    getrepetitionDay() {
      var arr2 = this.timeList;
      var map1 = {},
        dest2 = [];

      for (var i2 = 0; i2 < arr2.length; i2++) {
        var ai2 = arr2[i2];
        let month = arr2[i2].month;
        let day = arr2[i2].day;

        if (i2 + 1 == arr2.length) {
          continue;
        }

        if (month == arr2[i2 + 1].month && day == arr2[i2 + 1].day) {
        } else {
          dest2.push({
            id: ai2.id,
            month: ai2.month,
            day: ai2.day,
            countData: ai2.countData,
            countPrice: ai2.countPrice,
          });
        }
      }

      let j3 = dest2.length - 2;
      // console.log(j3);
      // console.log(dest2[j3]);
      for (const item of dest2) {
        if (item.month == dest2[j3].month && item.day == dest2[j3].day) {
          dest2.pop();
          continue;
        } else {
        }
      }

      this.dayList = dest2;
      console.log(dest2);
    },

    thistime() {
      this.currentTime = formatTime(new Date());
      //注释一
      // split通过空格分隔，随后取出第一位，接着通过-分隔
      this.single = this.currentTime.split(" ")[0];
      let alltime = this.currentTime.split(" ")[0].split("-");
      // console.log(alltime);
      this.year = alltime[0];
      this.month = alltime[1];
      this.day = alltime[2];
      this.week = ((alltime[2] * 1) / 7 + "".split("."))[0];
    },
    cleartime() {
      this.month = "";
      this.week = "";
      this.day = "";
    },
    bindtapaddperformance() {
      uni.navigateTo({
        url: "../digital-store/addperformance",
      });
    },
    changeTab(tab) {
      this.currentTab = tab;
      let alltime = this.currentTime.split(" ")[0].split("-");
      this.year = alltime[0];
      // console.log(tab);
      if (tab == 0) {
        this.cleartime();
        this.month = alltime[1];
      } else if (tab == 1) {
        this.cleartime();
        this.week = ((alltime[2] * 1) / 7 + "".split("."))[0];
      } else if (tab == 2) {
        this.cleartime();
        this.day = alltime[2];
      }
      this.performanceList();
      this.getrepetitionMonth();
      this.getrepetitionWeek();
      this.getrepetitionDay();
    },
    changeTab1(tab1) {
      this.currentTab1 = tab1;
      this.status = tab1;
      this.performanceList();
    },
    // 增加用户
    async addperformance() {
      const res = await addperformanceApi({
        month: this.month,
        status: this.status,
        week: this.week,
        year: this.year,
        day: this.day,
        headName: this.headName,
        alarmMoney: this.alarmMoney,
        targetMoney: this.targetMoney,
        alarmTime: this.alarmTime,

        // 传输的数据
        // alarmMoney: "333",
        // alarmTime: "2022-09-19 16:37:37",
        // day: "19",
        // headName: "123",
        // month: "09",
        // status: 1,
        // targetMoney: "223",
        // userId: 200,
        // week: "3",
        // year: "2022",
      });
    },
    // 查询业绩列表
    async performanceList() {
      const res = await performanceListApi({
        // userId: 200,
        userId: getUserId(),
        month: this.month * 1,
        status: this.status,
        week: this.week * 1,
        year: this.year * 1,
        day: this.day * 1,
      });
      this.timeList = res;
      console.log(this.timeList);
      this.getrepetitionMonth();
      if (res.errno === 0) {
        this.info = res.data;
      } else {
        uni.showToast({
          title: "您还不是业务员",
          duration: 1500,
          icon: "none",
        });

        setTimeout(() => {
          uni.switchTab({
            url: "/pages/user/user",
          });
        }, 2000);
      }
    },
    // 查询业绩明细
    async getPerformanceInfo() {
      const res = await getPerformanceInfoApi({
        userId: getUserId(),
        brandDate: this.dayinfo,
      });
    },
  },
  onLoad() {
    this.thistime();
    this.week = "";
    this.day = "";
    this.performanceList();
    this.getrepetitionMonth();
  },
  onShow() {
    this.thistime();
    this.week = "";
    this.day = "";
    this.performanceList();
    this.getrepetitionMonth();
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  text-align: center;
  margin-top: 30upx;
  padding-top: 30upx;
  .back {
    float: left;
    width: 16upx;
    margin-top: 6upx;
    padding-left: 30upx;
  }

  h2 {
    font-size: 34upx;
    display: inline;
    font-weight: normal;
  }
}
.performance-chose-top {
  display: flex;
  margin-top: 20upx;
  margin-bottom: 30upx;
  margin-left: 100upx;
  margin-right: 100upx;
  .item {
    margin: 0 auto;
    font-size: 24upx;

    &.active {
      font-weight: bold;
      color: #3d3d3d;
    }
  }
}
.add {
  position: absolute;
  top: 83upx;
  right: 36upx;
  font-size: 38upx;
  font-weight: bolder;
}
.performance-chose-bottom {
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  padding-top: 20upx;
  margin-top: 20upx;
  background-color: white;
  width: 750upx;
  height: 90upx;
  font-size: 28upx;
  text-align: center;
  .item {
    margin: 0 auto;

    &.active {
      font-weight: bold;
      color: #ff8f1f;
    }
  }
}
.performance-detail {
  display: flex;
  justify-content: space-between;
  border-radius: 20upx;
  background: #ffffff;
  text-align: center;
  box-shadow: 0px 8upx 20upx 0px rgba(0, 0, 0, 0.3);
  width: 90%;
  margin: 30upx auto;
  padding: 20upx;
}
</style>