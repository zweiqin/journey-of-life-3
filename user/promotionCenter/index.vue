<template>
  <view>
    <view class="promotionCenter">
      <Ttitle :title="'推广中心'"></Ttitle>
      <view class="last"></view>
      <promotionUser></promotionUser>
      <view class="last"></view>
      <promotionBrokerage></promotionBrokerage>
      <view class="last"></view>
      <view style="display: flex; justify-content: space-evenly">
        <view
          class="item"
          :class="{ active: currentTab == 0 }"
          @click="chose(0)"
          >收入动态</view
        >
        <view
          class="item"
          :class="{ active: currentTab == 1 }"
          @click="chose(1)"
          >收入占比</view
        ></view
      >
      <view class="last"></view>
      <view class="income">
        <view v-if="currentTab == 0">
          <incomeDetail :showTime="showTime"></incomeDetail>
        </view>
        <view v-if="currentTab == 1">
          <incomeProportion></incomeProportion>
        </view>
        <view class="incomeDetail">
          <view
            class="incomeBackground"
            v-for="item in incomeInfotmation"
            :key="item.value"
            :style="{ background: item.color }"
          >
            <view class="incomeText">{{ item.label }}</view>
            <image class="incomeImg" :src="item.url" mode="scaleToFill" />
          </view>
        </view>
      </view>
      <view class="last"></view>

      <view class="jurisdiction">
        <view
          class="item"
          v-for="item in jurisdictionDetail"
          :key="item.value"
          :class="{ active: jurisdictionTab == item.value }"
          @click="jurisdictionChose(item.value)"
          >{{ item.label }}</view
        >
      </view>
      <view class="last"></view>

      <jurisdiction :type="jurisdictionTab"></jurisdiction>
      <view class="last"></view>
      <view class="last"></view>

      <view class="fans">
        <view
          class="item"
          v-for="item in fansTitle"
          :key="item.value"
          :class="{ active: fansTab == item.value }"
          @click="fansChose(item.value)"
          >{{ item.label }}</view
        >
      </view>

      <view class="fans-border">
        <view v-if="fansTab == 0">
          <fans :showTime="showTime"></fans>
          <view class="fansData">
            <view v-for="item in fansData" :key="item.value" class="fansborder">
              <view>
                <view class="fansNumber" :style="{ color: item.color }">{{
                  item.quantity
                }}</view>
                <view class="fansTitle">{{ item.label }} </view>
              </view>
            </view></view
          >
        </view>
        <view v-else-if="fansTab == 1">
          <fansChange :showTime="showTime"></fansChange>
          <view class="fansData">
            <view
              v-for="item in fansChangeData"
              :key="item.value"
              class="fansborder"
            >
              <view>
                <view class="fansNumber" :style="{ color: item.color }">{{
                  item.quantity
                }}</view>
                <view class="fansTitle">{{ item.label }} </view>
              </view>
            </view></view
          >
        </view></view
      >
      <view class="last"></view>

      <view class="other">
        <view v-for="item in otherIncome" :key="item.value">
          <view class="otherbackground" :style="{ background: item.color }">
            <img class="otherImg" :src="item.img" alt="" />
            <view class="otherText">{{ item.label }}</view>
          </view>
        </view>
      </view>
      <view class="last"></view>
    </view>
    <view class="promotion">
      <view
        class="item"
        v-for="item in promotion"
        :key="item.value"
        :class="{ active: promotionTab == item.value }"
        @click="promotionChose(item.value)"
        >{{ item.label }}</view
      ></view
    >

    <view v-if="promotionTab == 0">
      <promotionOrder v-for="item in 5" :key="item"></promotionOrder>
    </view>
    <view v-else-if="promotionTab == 1"> <promotionFans></promotionFans> </view
  ></view>
</template>

<script>
import {
  incomeInfotmation,
  jurisdictionDetail,
  fansTitle,
  fansData,
  fansChangeData,
  otherIncome,
  promotion,
} from "./config";
import promotionFans from "./promotionFans";
import promotionOrder from "./promotionOrder";
import promotionUser from "./promotionUser";
import promotionBrokerage from "./promotionBrokerage";
import incomeDetail from "./incomeDetail";
import incomeProportion from "./incomeProportion";
import jurisdiction from "./jurisdiction";
import fans from "./fans";
import fansChange from "./fansChange";
export default {
  name: "promotionCenter",
  components: {
    promotionUser,
    promotionBrokerage,
    incomeDetail,
    incomeProportion,
    jurisdiction,
    fans,
    fansChange,
    promotionOrder,
    promotionFans,
  },
  props: {},
  data() {
    return {
      currentTab: 0,
      showTime: [],
      incomeInfotmation,
      jurisdictionDetail,
      jurisdictionTab: 0,
      fansTitle,
      fansTab: 0,
      fansData,
      fansChangeData,
      otherIncome,
      promotion,
      promotionTab: 0,
    };
  },
  computed: {},
  methods: {
    promotionChose(e) {
      this.promotionTab = e;
    },
    fansChose(e) {
      this.fansTab = e;
    },
    jurisdictionChose(e) {
      this.jurisdictionTab = e;
    },
    chose(e) {
      this.currentTab = e;
    },
    getDayTime() {
      const aaa = [];
      var dayjs = require("dayjs");
      // import dayjs from 'dayjs' // ES 2015
      dayjs().format();
      for (let index = 0; index < 15; index++) {
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
.last {
  padding-top: 30upx;
}
.promotionCenter {
  padding: 18upx;

  .income {
    .incomeDetail {
      display: flex;
      justify-content: space-between;
      margin-top: 40upx;
      .incomeBackground {
        height: 250upx;
        width: 340upx;
        border-radius: 20upx;
        display: flex;
        align-items: center;
        flex-direction: column;
        .incomeText {
          margin-top: 40upx;
          margin-bottom: 20upx;
          font-size: 28upx;
          color: white;
        }
        .incomeImg {
          width: 120upx;
          height: 120upx;
        }
      }
    }
  }
  .jurisdiction {
    display: flex;
    justify-content: space-evenly;
  }
  .fans {
    display: flex;
    justify-content: space-evenly;
  }

  .fans-border {
    border: 1px solid #d8d8d8;
    padding: 20upx 0;
    margin: 20upx 0;
    border-radius: 20upx;
    
  }
  .fansData {
    display: flex;
    justify-content: space-around;

    .fansborder {
      border-right: 1px solid #d8d8d8;
      padding: 0 30upx;
      &:last-child {
        border: none;
      }
    }
    .fansNumber {
      font-size: 24upx;
      text-align: center;
      margin-bottom: 18upx;
    }
    .fansTitle {
      text-align: center;
      font-size: 26upx;
    }
  }
  .other {
    display: flex;
    justify-content: space-between;
    .otherbackground {
      height: 170upx;
      width: 140upx;
      border-radius: 20upx;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .otherImg {
        margin-top: 20upx;
        height: 80upx;
        width: 80upx;
      }
      .otherText {
        color: white;
        font-size: 26upx;
      }
    }
  }
}
.promotion {
  display: flex;
  justify-content: space-evenly;
  margin: 20upx 0;
}
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
</style>