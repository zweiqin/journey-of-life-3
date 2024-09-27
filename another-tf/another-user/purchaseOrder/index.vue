<template>
  <view class="purchaseOrder">
    <view class="search-box">
      <view class="sarch">
        <tui-input
          placeholder="搜索订单"
          :inputBorder="false"
          :radius="160"
          padding="12rpx 10rpx"
          backgroundColor="#F8F8F8"
          :borderBottom="false"
          color="#B9B9B9"
          :size="28"
        >
          <template #left>
            <view class="left">
              <tui-icon name="search" :size="24" color="#B9B9B9"></tui-icon>
            </view>
          </template>
        </tui-input>
      </view>
    </view>
    <view class="state-list">
      <view
        class="state-item"
        v-for="(item, index) in stateList"
        :key="index"
        :class="{ act: queryData.state == item.state }"
        @click="changeState(item.state)"
        >{{ item.title }}</view
      >
    </view>
    <view class="order-list" v-if="orderList.length > 0">
      <view class="order-item" v-for="(item,index) in orderList" :key="index" @click="go(`/another-tf/another-serve/orderDetails/index?orderId=${item.orderId}&isProcure=1`)"">
        <view class="item-top">
          <view>订单编号：{{ item.orderFormid }}</view>
          <!-- '订单状态 1-待付款 2-待发货 3-待收货 4-已完成 5-已完成 6-已完成 7-已完成 8-已完成 9-待核销已付款 10-已核销 11-未付款核销', -->
          <view v-if="item.state == 1">待付款</view>
          <view v-else-if="item.state == 2">待发货</view>
          <view v-else-if="item.state == 3">待收货</view>
          <view v-else-if="item.state == 4">已完成</view>
          <view v-else-if="item.state == 5">已完成</view>
          <view v-else-if="item.state == 6">已完成</view>
          <view v-else-if="item.state == 7">已完成</view>
          <view v-else-if="item.state == 8">已完成</view>
          <view v-else-if="item.state == 9">待核销已付款</view>
          <view v-else-if="item.state == 10">已核销</view>
          <view v-else-if="item.state == 11">未付款核销</view>
          <!-- <view>{{ item.orderFormid }}</view> -->
        </view>
        <view class="item-container" v-for="(item2,index2) in item.skus" :key="index2">
          <view class="container">
            <view class="image-box">
              <image
                class=""
                :src="item2.image"
              />
            </view>
            <view class="item-text">
              <view class="title">{{ item2.productName }}</view>
              <view class="order-id">订单ID：<text>{{ item.orderId }}</text></view>
              <view class="voucher">
                <view class="voucher-left">代金券：<text>{{ item2.price }}</text></view>
                <view class="voucher-right">x{{ item2.number }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="item-bottom">
          <view class="bottom-btn">再来一单</view>
          <view class="bottom-btn">详情</view>
        </view>
      </view>
    </view>
    <view class="empty" v-else>
        <image class="" src="@/static/images/user/empty.png" />
        <view>暂无采购单定订单</view>
    </view>
  </view>
</template>

<script>
// import { getAllOrderListApi } from "../../../api/anotherTFInterface";
import { getAllOrderListApi } from "../../../api/anotherTFInterface";
export default {
  onLoad() {
    this.getAllOrderList();
  },
  data() {
    return {
      stateList: [
        {
          title: "全部",
          state: "",
        },
        {
          title: "待发货",
          state: 2,
        },
        {
          title: "已发货",
          state: 3,
        },
        {
          title: "已完成",
          state: 4,
        },
        {
          title: "已关闭",
          state: 5,
        },
      ],
      //  订单列表查询参数
      queryData: {
        page: 1,
        pageSize: 10,
        orderType: 1,
        procureType: 1,
        state: "",
      },
      orderList: [],
      total:""
    };
  },
  methods: {
    //  获取所有订单
    async getAllOrderList(flag) {
      uni.showLoading({
        title: "加载中...",
      });
      try {
        let {data} = await getAllOrderListApi(this.queryData);
        this.total = data.total;
        if (flag) {
          this.orderList = data.list;
        } else {
          this.orderList = [...this.orderList, ...data.list];
        }
      } finally {
        uni.hideLoading();
      }
    },
    //  tab切换
    changeState(state){
        this.queryData.state = state;
        this.queryData.page = 1
        this.getAllOrderList(true)
    }
  },
  onReachBottom() {
    if (this.orderList.length >= this.total) {
      this.$showToast("暂无更多数据");
      return;
    }
    this.queryData.page++;
    this.getAllOrderList();
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
