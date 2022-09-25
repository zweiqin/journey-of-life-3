<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 17:02:23
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 09:10:15
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\orderForm\order-form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- 标题页 -->
    <view class="order-form-title">
      <view class="order-form-title-left-view">
        <img
          @click="back"
          class="order-form-title-left-img"
          src="../../static/images/store/chevron-states.png"
          alt=""
        />
        <view class="order-form-title-text">我的订单</view>
      </view>
      <view class="order-form-title-right-view">
        <img
          class="order-form-title-right-img"
          src="../../static/images/lqb/orderform/search.png"
          alt=""
        />
      </view>
    </view>
    <!-- 订单选择卡 -->
    <view class="order-form-chose">
      <view class="order-form-chose-text">
        <view
          @click="changeTab(0)"
          :class="{ active: currentTab === 0 }"
          class="item"
          >全部</view
        >
        <view
          @click="changeTab(1)"
          :class="{ active: currentTab === 1 }"
          class="item"
          >待付款</view
        >
        <view
          @click="changeTab(2)"
          :class="{ active: currentTab === 2 }"
          class="item"
          >待发货</view
        >
        <view
          v-if="collectiontype == 0"
          @click="changeTab(3)"
          :class="{ active: currentTab === 3 }"
          class="item"
          >待安装</view
        >
        <view
          v-if="collectiontype == 1"
          @click="changeTab(3)"
          :class="{ active: currentTab === 3 }"
          class="item"
          >待收货</view
        >
        <view
          @click="changeTab(4)"
          :class="{ active: currentTab === 4 }"
          class="item"
          >待评价</view
        >
      </view>
    </view>
    <!-- 分界线 -->
    <view class="order-form-boundary"> </view>
    <!-- 商品详情 + 状态判断 0 = 全部 1 = 待付款  2 = 待发货  3= 待安装 4 = 待评价 -->
    <view
      v-for="(item, id) in orderList"
      :key="id"
      @click="bindtapdetail"
      :data-orderdetail="item"
    >
      <view
        v-for="(item1, id1) in item.goodsList"
        :key="id1"
        :data-goodsDetail="item1"
        @click="bindgoodsdetail"
        class="order-form-goods"
      >
        <view class="goods-left">
          <img class="goods-left-img" :src="item1.picUrl" alt="" />
        </view>
        <view class="goods-middle">
          <view class="goods-name"> {{ item1.goodsName }}</view>
          <view class="goods-detail">
            <view class="detail-text">规格：</view>
            <view
              class="goods-size"
              v-for="(item2, id2) in item1.specifications"
              :key="id2"
              >{{ item2 }}</view
            >
          </view>
          <view class="goods-number">数量：{{ item1.number }}</view>
          <view class="goods-money">￥{{ item1.price }}</view>
        </view>
        <view class="goods-right"
          ><view class="right-top">{{ item.orderStatusText }} </view>
          <view
            class="right-bottom"
            @click="bindCancel"
            :data-cancelDetail="item1"
            v-if="currentTab === 1"
            >取消订单</view
          >
          <view
            class="right-bottom"
            @click="bindRefund"
            :data-cancelDetail="item1"
            v-if="currentTab === 2"
            >申请退款</view
          >
          <view
            class="right-bottom"
            @click="bindConfirm"
            :data-cancelDetail="item1"
            v-if="currentTab === 3"
            >确认收货</view
          >
          <view
            class="right-bottom"
            @click="bindDelete"
            :data-cancelDetail="item1"
            v-if="currentTab === 4"
            >删除订单</view
          >
        </view>
      </view>
    </view>

    <view class="bottom"></view>
  </view>
</template>

<script>
import loginVue from "../../pages/login/login.vue";
import { getUserId } from "../../utils";
import {
  getOrderListApi,
  getOrderCancelApi,
  getOrderConfirmApi,
  getOrderDeleteApi,
  getOrderRefundApi,
} from "../../api/order";
export default {
  methods: {
    bindRefund(e) {
      this.orderId = e.currentTarget.dataset.canceldetail.orderId;
      this.getOrderRefund();
    },
    bindDelete(e) {
      this.orderId = e.currentTarget.dataset.canceldetail.orderId;
      this.getOrderDelete();
    },
    bindConfirm(e) {
      this.orderId = e.currentTarget.dataset.canceldetail.orderId;
      this.getOrderConfirm();
    },
    bindCancel(e) {
      console.log("cancel", e.currentTarget.dataset.canceldetail.orderId);
      this.orderId = e.currentTarget.dataset.canceldetail.orderId;
      this.getOrderCancel();
    },
    async getOrderRefund() {
      const res = await getOrderRefundApi({
        userId: getUserId(),
        orderId: this.orderId,
      });
      console.log(res);
    },
    async getOrderDelete() {
      const res = await getOrderDeleteApi({
        userId: getUserId(),
        orderId: this.orderId,
      });
      console.log(res);
    },
    async getOrderConfirm() {
      const res = await getOrderConfirmApi({
        userId: getUserId(),
        orderId: this.orderId,
      });
      console.log(res);
    },
    async getOrderCancel() {
      const res = await getOrderCancelApi({
        userId: getUserId(),
        // showType:this.showType,
        orderId: this.orderId,
      });
      // this.orderList = res.data.data;
      console.log(res);
      if (res.errno == 725 || res.errmsg == "订单不能取消") {
        console.log("sb");
      }
    },
    async getOrderList() {
      const res = await getOrderListApi({
        userId: getUserId(),
        // showType:this.showType,
        showType: this.showType,
        page: this.page,
        size: this.size,
      });
      this.orderList = res.data.data;
    },
    back() {
      uni.navigateBack();
    },
    changeTab(tab) {
      this.currentTab = tab;
      console.log(tab);
      this.showType = tab;
      this.getOrderList();
    },
    bindgoodsdetail(e) {
      console.log("goods", e);
    },
    bindtapdetail(e) {
      console.log(e);
      // uni.navigateTo({
      //   url: "../orderForm/order-form-detail",
      // });
    },
  },
  data() {
    return {
      showType: 0,
      collectiontype: "",
      currentTab: 0,
      // goodslist: [
      //   {
      //     id: 1,
      //     name: "空调安装",
      //     size: "正一匹",
      //     number: 2,
      //     money: 300,
      //     type: 1,
      //   },
      //   {
      //     id: 2,
      //     name: "空调安装",
      //     size: "正一匹",
      //     number: 2,
      //     money: 300,
      //     type: 2,
      //   },
      //   {
      //     id: 3,
      //     name: "空调安装",
      //     size: "正一匹",
      //     number: 2,
      //     money: 300,
      //     type: 3,
      //   },
      //   {
      //     id: 4,
      //     name: "空调安装",
      //     size: "正一匹",
      //     number: 2,
      //     money: 300,
      //     type: 4,
      //   },
      //   {
      //     id: 5,
      //     name: "空调安装",
      //     size: "正一匹",
      //     number: 2,
      //     money: 300,
      //     type: 1,
      //   },
      // ],
      orderList: [],
    };
  },
  onLoad(e) {
    this.collectiontype = e.collectiontype;
    this.getOrderList();
  },
};
</script>

<style lang="less" scoped>
.order-form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 74upx;
  .order-form-title-left-view {
    display: flex;
    align-items: center;
    margin-left: 32upx;
    .order-form-title-left-img {
      height: 48upx;
      width: 48upx;
      margin-right: 32upx;
    }
    .order-form-title-text {
      font-size: 32upx;
      font-weight: 500;
    }
  }
  .order-form-title-right-view {
    margin-right: 48upx;
    .order-form-title-right-img {
      height: 33upx;
      width: 33upx;
    }
  }
}
.order-form-chose {
  margin-top: 34upx;
  margin-left: 44upx;
  margin-right: 44upx;

  .order-form-chose-text {
    display: flex;
    justify-content: space-evenly;
    font-size: 24upx;
    color: #999999;
    margin-bottom: 14upx;
    .item {
      &.active {
        font-weight: bold;
        color: #ff8f1f;
      }
    }
  }
}
.order-form-boundary {
  border: 0.5px solid #d8d8d8;
  width: 90%;
  margin: 0 auto;
}
.order-form-goods {
  display: flex;
  margin-top: 22upx;
  justify-content: space-between;
  padding: 0 44upx 0 32upx;
  .goods-left {
    margin-right: 36upx;
    .goods-left-img {
      width: 200upx;
      height: 150upx;
    }
  }
  .goods-middle {
    flex: 1;
    margin-top: 10upx;
    .goods-name {
      font-size: 24upx;
      font-weight: 500;
      width: 320upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .goods-detail {
      font-size: 20upx;
      color: #3d3d3d;
      font-weight: 350;
      overflow: hidden;
      display: flex;

      white-space: nowrap;
      text-overflow: ellipsis;
      .goods-size {
        margin-right: 20upx;
        display: flex;
      }
    }
    .goods-number {
      font-size: 20upx;
      color: #3d3d3d;
      font-weight: 350;
    }
    .goods-money {
      color: #fa5151;
      font-size: 28upx;
      font-weight: 350;
    }
  }
  .goods-right {
    margin: auto 0;
    font-size: 20upx;
    font-weight: 350;
    color: #fa5151;
    .right-top {
    }
    .right-bottom {
      color: black;
      margin-top: 20upx;
    }
  }
}
.bottom {
  padding-top: 50upx;
}
</style>