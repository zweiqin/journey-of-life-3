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
    <view class="text-border"></view>

    <view class="priceDetail" v-for="item in littlepriceList" :key="item.id">
      <view class="list" @click="listDetail(item)">
        <view class="name">{{ item.id }}</view>
        <view class="sname">{{ item.materialsName }}</view>
        <view class="sku">{{ item.materialsSku }}</view>
        <view class="stuff">{{ item.materialsCategory }}</view>
        <view class="quality">{{ item.materialsQuality }}</view>
        <view class="money">{{ item.materialsMoney }}元</view>
        <view class="unit">{{ item.materialsUnit }}</view>
      </view>
      <view class="text-border"></view>
    </view>
    <view class="seeMore" @click="more">查看更多</view>
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
      priceList: [],
      price: [],
      page: 1,
      total: "",
      littlepriceList: [],
    };
  },
  methods: {
    listDetail(item) {
      console.log(item);
    },
    more() {
      const a = this.littlepriceList == this.priceList;
      if (a) {
        uni.showToast({
          title: "已无更多",
          icon: "success",
          mask: true,
        });
      } else {
        this.littlepriceList = this.priceList;
      }
    },
    async getPricesList() {
      const res = await getPricesListApi();
      if (res.errno === 0) {
      } else {
        uni.showToast({
          title: "价格列表失败",
          duration: 2000,
        });
      }
      console.log(res.data);
      this.price = res.data;
      this.total = res.data.total;
      this.priceList = res.data.items;
      this.littlepriceList = res.data.items.slice(0, 10);
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
      this.getPricesList();
    },
    onReachBottom() {
      uni.showToast({
        title: "已无更多",
        icon: "success",
        mask: true,
      });
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
    .title-text {
      font-size: 24upx;
      color: #999999;
      text-align: center;
    }
    .content {
    }
  }
  .text-border {
    border: 0.5px solid #d8d8d8;
    width: 97%;
    margin: 10upx auto;
  }
  .priceDetail {
    font-size: 26upx;
    .list {
      display: flex;
      font-size: 24upx;
      .name {
        width: 12%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sname {
        width: 13%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sku {
        width: 18%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .stuff {
        width: 18%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .quality {
        width: 13%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        color: #fa5151;
        text-overflow: ellipsis;
      }
      .money {
        width: 13%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fa5151;
      }
      .unit {
        width: 13%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .seeMore {
    text-align: center;
    font-size: 28upx;
    color: #999999;
  }
}
</style>