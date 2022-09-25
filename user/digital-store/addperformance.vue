<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-20 10:32:00
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 11:28:12
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\digital-store\addperformance.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="all">
    <view class="header">
      <img
        src="../../static/images/lqb/site/back.png"
        class="back"
        alt=""
        @click="back"
      />
      <h2>业绩哨兵</h2>
    </view>
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
    <!-- 选择时间 -->
    <view class="addtimechose">
      <view class="chose-text">选择日期类型 </view>
      <view class="detail">
        <view class="chose-detail-month"
          ><text style="color: #fa5151; padding-right: 10upx">{{ month }}</text
          >月</view
        >
        <view class="chose-detail-week"
          ><text style="color: #fa5151; padding-right: 10upx">{{ week }}</text
          >周</view
        >
        <view class="chose-detail-day"
          ><text style="color: #fa5151; padding-right: 10upx">{{ day }}</text
          >日</view
        ></view
      >
    </view>
    <view class="chose-weekday">
      <view
        @click="changeTab2(0)"
        :class="{ active: currentTab2 === 0 }"
        class="item"
        >周</view
      >
      <view
        @click="changeTab2(1)"
        :class="{ active: currentTab2 === 1 }"
        class="item"
        >日</view
      >
      <view class="example-body">
        <!-- <uni-datetime-picker
          v-model="targetTime"
          @change="targetTimechange"
          :border="false"
          :clear-icon="false"
          class="targetTime"
          ><view class="targetTime-view">{{ targetTime }}</view></uni-datetime-picker
        > -->
        <view class="example-body">
          <uni-datetime-picker
            type="date"
            :clear-icon="false"
            :border="false"
            v-model="targetTime"
            @change="targetTimechange"
            class="targetTime"
          />
        </view>
      </view>
    </view>
    <view class="add-detail">
      <view class="border"></view>
      <view class="headName1">
        <view class="headName-text">负责人姓名：</view>
        <input
          class="input"
          @input="bindheadNameinput"
          placeholder="请输入负责人姓名"
          type="text"
          name=""
          id=""
        />
      </view>

      <view class="headName">
        <view class="headName-text">业绩目标：</view>
        <input
          class="input"
          @input="targetMoneyinput"
          placeholder="请输入业绩目标"
          type="text"
          name=""
          id=""
        />
      </view>
      <view class="headName">
        <view class="headName-text">报警时间：</view>
        <view class="example-body">
          <uni-datetime-picker
            v-model="currentTime"
            @change="timechange"
          ></uni-datetime-picker>
        </view>
      </view>
      <view class="headName">
        <view class="headName-text">报警金额：</view>
        <input
          class="input"
          @input="bindalarmMoneyinput"
          placeholder="请输入报警金额"
          type="text"
          name=""
          id=""
        />
      </view>
    </view>
    <view class="performance-detail">
      <view class="detail-title"
        >业绩详情<text
          style="font-size: 12px; font-weight: normal; color: #999999"
          >(提交即可查看业绩)</text
        ></view
      >
      <view class="detail-background">
        <view class="chose-time">选择日期：1月1周1日</view>
        <view class="chose-time">负责人姓名：代亚腾</view>
        <view class="chose-time">业绩目标：10万</view>
        <view class="chose-time">报警时间：2022-08-09 18:00</view>
        <view class="chose-time">报警金额：5万</view>
        <view class="close-window" @click="closeWindow">
          <view>收起</view
          ><img
            src="../../static/images/lqb/digital-store/double-close.png"
            alt=""
            class="double-close"
          />
        </view>
      </view>
    </view>
    <view class="sumbit" @click="sumbit">
      提交
    </view>
  </view>
</template>

<script>
import {
  addperformanceApi,
  performanceListApi,
  getPerformanceInfoApi,
} from "../../api/user";
const { formatTime } = require("../../utils/util");
import { getUserId } from "../../utils";
export default {
  data() {
    return {
      single: "",
      currentTab: 0,
      currentTab1: 1,
      currentTab2: 0,
      month: "",
      status: 1,
      week: "",
      year: "",
      day: "",
      headName: "",
      alarmMoney: "",
      targetMoney: "",
      alarmTime: "",
      dayinfo: 1,
      currentTime: "",
      targetTime: "",
      timestatus: 0,
    };
  },
  methods: {
    back(){
      uni.navigateBack();
    },
    sumbit(){
      this.addperformance()
    },
    targetTimechange(e) {
      this.targetTime = e;
      console.log(e);
      this.thistime()
      if (this.timestatus == 0) {
        this.day = "";
      }
    },
    timechange(e) {
      this.currentTime = e;
      this.alarmTime =e
    },
    bindheadNameinput: function (event) {
      this.headName = event.target.value;
      console.log(event.target.value);
    },
    targetMoneyinput: function (event) {
      this.targetMoney = event.target.value;
      console.log(event.target.value);
    },
    bindalarmMoneyinput: function (event) {
      this.alarmMoney = event.target.value;
      console.log(event.target.value);
    },
    thistime() {
      this.currentTime = formatTime(new Date());
      // this.targetTime = formatTime(new Date());

      //注释一
      // split通过空格分隔，随后取出第一位，接着通过-分隔
      this.single = this.currentTime.split(" ")[0];
      let alltime = this.currentTime.split(" ")[0].split("-");
      this.day = alltime[2];
      // console.log(alltime);
      this.year = alltime[0];
      this.month = alltime[1];

      this.week = ((alltime[2] * 1) / 7 + "".split("."))[0];
    },
    cleartime() {
      this.month = "";
      this.week = "";
      this.day = "";
    },
    changeTab1(tab1) {
      this.currentTab1 = tab1;
      this.status = tab1;
    },
    changeTab2(tab2) {
      this.currentTab2 = tab2;
      this.timestatus = tab2;
    },
    async addperformance() {
      const res = await addperformanceApi({
        month: this.month,
        status: this.status*1,
        week: this.week,
        year: this.year,
        day: this.day,
        headName: this.headName,
        alarmMoney: this.alarmMoney,
        targetMoney: this.targetMoney,
        alarmTime: this.alarmTime,
        userId:getUserId()
        

        // // 传输的数据
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
  },
  onLoad() {
    this.thistime();
  },
};
</script>

<style lang="less" scoped>
.all{
  padding-bottom: 200upx;
}
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
    margin-left: -40upx;
  }
}
.performance-chose-bottom {
  display: flex;
  margin-top: 20upx;
  margin-bottom: 10upx;
  background-color: white;
  width: 750upx;
  height: 110upx;
  font-size: 28upx;
  line-height: 110upx;
  text-align: center;
  justify-content: space-between;
  padding-left: 122upx;
  padding-right: 122upx;
  box-sizing: border-box;
  .item {
    &.active {
      font-weight: bold;
      color: #ff8f1f;
    }
  }
}
.addtimechose {
  display: flex;
  font-size: 24upx;
  margin-left: 60upx;

  .chose-text {
    margin-left: 42upx;
    margin-right: 72upx;
  }

  .detail {
    display: flex;

    .chose-detail-month {
      margin-right: 72upx;
    }

    .chose-detail-week {
      margin-right: 72upx;
    }
    .chose-detail-day {
    }
  }
}
.chose-weekday {
  display: flex;
  padding-top: 20upx;
  padding-left: 100upx;
  padding-bottom: 20upx;
  .item {
    padding: 0 20upx;
    font-size: 24upx;
    margin-top: 20upx;
    &.active {
      font-weight: bold;
      color: #ff8f1f;
    }
  }
}
.performance-detail {
  font-size: 24upx;
  .detail-title {
    margin-top: 50upx;
    margin-left: 38upx;
    margin-bottom: 24upx;
  }
  .detail-background {
    background-color: #f5f5f5;
    width: 90%;
    margin: 0 auto;
    border-radius: 20upx;
    padding: 78upx 0upx 24upx 54upx;
    margin-bottom: 180upx;
    .chose-time {
      padding-bottom: 52upx;
    }
    .close-window {
      display: flex;
      font-size: 20upx;
      align-items: center;
      justify-content: center;
      .double-close {
        margin-left: 12upx;
        width: 16upx;
        height: 19upx;
      }
    }
  }
}
.add-detail {
  font-size: 24upx;
  .border {
    border: 0.3px solid #e9e9e9;
    width: 92%;
    margin: 0 auto;
  }
  .headName {
    padding: 32upx 38upx;
    display: flex;
    align-items: center;

    .headName-text {
      width: 25%;
    }
    .input {
      font-size: 24upx;
    }
  }
  .headName1 {
    padding: 20upx 38upx;
    display: flex;
    .headName-text {
      width: 25%;
    }
    .input {
      font-size: 24upx;
    }
  }
  .targetMoney {
  }
  .alarmTime {
  }
  .alarmMoney {
  }
}
.targetTime {
  padding-top: 0upx;
  padding-left: 70upx;

  .targetTime-view {
    border: 1px solid #909090;
    border-radius: 10upx;
    padding: 0upx;
  }
}
.sumbit{
width: 380upx;
height: 72upx;
line-height: 72upx;
border-radius: 100upx;
color: white;
background-color: #FF8F1F;
text-align: center;
margin: 0 auto;
}
</style>