<template>
  <view
    class="twice-order"
    :style="{ background: listData.length ? '' : '#fff' }"
  >
    <view class="navs">
      <image
        src="../static/images/user/back.png"
        alt=""
        class="back"
        @click="handleBack"
      >
      </image>

      <view class="list">
        <view
          class="item"
          :class="{ active: currentNav === item.value }"
          v-for="item in shequTwiceOrder"
          :key="item.name"
          @click="handleSwitchStatus(item.value)"
          >{{ item.name }}</view
        >
      </view>
    </view>

    <view class="order-list">
      <AdditionalAmountOrder
        @refresh="getData"
        v-for="order in listData"
        :key="order.id"
        :orderData="order"
      ></AdditionalAmountOrder>
      <JNoData
        v-if="loadingStatus === 'hidden' && !listData.length"
        text="无追加记录"
        type="order-shop"
      ></JNoData>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { shequTwiceOrder } from "../pages/user/data";
import { getTwicePayOrderListApi } from "../api/community-center";
import { getUserId } from "utils";
import AdditionalAmountOrder from "./components/AdditionalAmountOrder.vue";
export default {
  components: { AdditionalAmountOrder },
  data() {
    return {
      shequTwiceOrder: Object.freeze(shequTwiceOrder),
      currentNav: 0,
      orderList: [],
      awaitPayOrderList: [],
      payedOrderList: [],
      refusedOrderList: [],
      loadingStatus: "loading",
    };
  },
  onLoad(params) {
    this.currentNav = params.type * 1;
    this.getData();
  },
  methods: {
    handleSwitchStatus(value) {
      this.currentNav = value;
    },

    async getData() {
      this.awaitPayOrderList = [];
      this.payedOrderList = [];
      this.refusedOrderList = [];
      this.orderList = [];
      this.loadingStatus = "loading";
      try {
        const res = await getTwicePayOrderListApi({
          userId: getUserId(),
        });

        if (res.statusCode === 20000) {
          this.orderList = res.data;
          if (res.data && res.data.length) {
            for (const order of this.orderList) {
              if (order.status === 0) {
                this.awaitPayOrderList.push(order);
              }
              if (order.status === 1) {
                this.payedOrderList.push(order);
              }
              if (order.status === 2) {
                this.refusedOrderList.push(order);
              }
            }
          }
        }
      } catch (error) {
        this.ttoast({
          type: "fail",
          title: "出错了！！！",
        });
      } finally {
        this.loadingStatus = "hidden";
      }
    },

    handleBack() {
      uni.navigateBack();
    },
  },

  computed: {
    listData() {
      return this.currentNav === 0
        ? this.awaitPayOrderList
        : this.currentNav === 1
        ? this.payedOrderList
        : this.refusedOrderList;
    },
  },

  onPullDownRefresh() {
    this.currentNav = 0;
    this.orderList = [];
    this.awaitPayOrderList = [];
    this.payedOrderList = [];
    this.refusedOrderList = [];
    this.loadingStatus = "loading";
    this.getData();
    uni.stopPullDownRefresh();
  },
};
</script>

<style lang="scss" scoped>
.twice-order {
  height: 100vh;
  width: 100%;
  background: #f6f6f5;
  transition: all 350ms;

  .navs {
    display: flex;
    align-items: center;
    padding: 34upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0 0 40upx 40upx;

    .back {
      width: 24upx;
      height: 48upx;
    }

    .list {
      display: flex;
      align-items: center;
      line-height: 1;

      .item {
        position: relative;
        margin-left: 46upx;
        color: #8f8d85;
        font-size: 32upx;

        &::after {
          position: absolute;
          content: "";
          display: block;
          width: 0;
          height: 8upx;
          background-color: #ffc117;
          border-radius: 100px;
          left: 50%;
          transform: translateX(-50%);
          bottom: -18upx;
          transition: all 350ms;
        }

        &.active {
          &::after {
            width: 40upx;
          }
        }

        &:nth-of-type(1) {
          margin-left: 67upx;
        }
      }
    }
  }
}
</style>
