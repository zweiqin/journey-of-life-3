<template>
  <view class="price1">
    <Ttitle :title="title" :search="search"></Ttitle>
    <img
      style="width: 100%; padding-top: 20upx"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gxawxw339ne2sb1isdw8.png "
      alt=""
    />
    <view class="nowTime">
      <view class="nowText">时间</view>
      <view class="timeDetail">{{ nowTime }}</view>
    </view>
    <view class="title">
      <view
        v-for="item in priceTitle"
        :key="item.value"
        :style="{
          width: item.width,
        }"
        class="title-text"
        >{{ item.label }}</view
      >
    </view>
  </view>
</template>

<script>
import * as echarts from "echarts";
import { priceTitle } from "./config";
import { getPricesListApi } from "../../api/stuff";
export default {
  data() {
    return {
      title: "价格指数",
      nowTime: "",
      search: true,
      priceTitle,
    };
  },
  methods: {
    getPricesList(){
      async
    },
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
    onLoad(options) {
      this.getNowTime();
    },
  },
};
</script>

<style lang="less" scoped>
.price1 {
  padding: 72upx 30upx 40upx 30upx;
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
  .title {
    display: flex;
    .title-text{
      font-size: 24upx;
      color: #999999;
      text-align: center;
    }
    .content{
      
    }
  }
}
</style>