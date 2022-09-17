<template>
  <view class="collect-package">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">查件</view>
    </view>

    <view class="main">
      <view class="search">
        <input
          class="search-input"
          type="text"
          placeholder="发货人姓名/订单号/收货人姓名/收货人手机号"
          @input="search"
        />
        <img class="img" src="../static/images/store/search.png" alt="" />
      </view>

      <view class="order-list">
        <view class="navs">
          <view
            v-for="item in collectPages"
            :key="item.label"
            @click="switchTab(item.value)"
            :class="{ active: query.status === item.value }"
            class="nav-item"
          >
            {{ item.label }}
          </view>
        </view>

        <view v-if="list && list.length" class="orders">
          <view v-for="item in list" :key="item.id" class="order-wrapper">
            <view class="order-item" @click="toDetail(item.orderNo)">
              <!-- <img
                class="img"
                src="https://t7.baidu.com/it/u=2978830395,2475392084&fm=193&f=GIF"
                alt=""
              /> -->
              <view class="info hidden">
                <view class="text">运单号：{{ item.orderNo }}</view>
                <view class="text"
                  >{{ item.consigneeName }}
                  <text class="call-phone">{{
                    item.consigneeMobile
                  }}</text></view
                >
                <view
                  >{{ item.consigneeAddress
                  }}{{ item.consigneeAddressDetail }}</view
                >
                <view class="text">下单时间：{{ item.createTime }}</view>
              </view>
            </view>

            <view class="status">
              <view class="btns" v-if="item.status <= 10">
                <button class="btn">支付</button>
                <button class="btn" @click="editOrder(item)">编辑</button>
                <button class="btn" @click="handleCancelOrder(item)">
                  取消
                </button>
              </view>
              <view>
                状态：<text class="status-text">{{
                  item.status | filterOrderStaus
                }}</text>
              </view>
            </view>
          </view>
        </view>

        <NoData v-else></NoData>
      </view>
    </view>

    <CancelPopup
      :cancelList="cancelList"
      v-model="cancelPopupVisiable"
      @confirm="handleConfirmOrderCancel"
    ></CancelPopup>
  </view>
</template>

<script>
const { debounce } = require("../utils/util");
import {
  collectPages,
  mapDeliveryType,
  cancelList,
  mapCategoryControlType,
} from "./config";
import {
  expressInquiryApi,
  cancelOrderApi,
  getOrderDetailApi,
} from "../api/logistics";
import NoData from "../components/no-data";
import CancelPopup from "../components/cancel-popup";
import { getUserId } from "../utils";
import {
  jiSenderInfo,
  jiconsigneeInfo,
  VALUE_ADDED_SERVICES,
  jiOrderGoodsList,
  jiRemarks,
  JI_EDIT_ORDER_ID,
} from "../constant";

export default {
  components: {
    NoData,
    CancelPopup,
  },
  data() {
    return {
      search: null,
      collectPages,
      cancelList,
      currentTab: 0,
      totalData: 0,

      // TODO 换UserId
      query: {
        pageNo: 1,
        pageSize: 10,
        userId: 150,
        keyword: undefined,
        status: undefined,
      },

      list: [],
      cancelPopupVisiable: false,
      cancelOrderId: null,
    };
  },

  mounted() {
    this.search = debounce(this.searchWuliu, 500);
    this.getOrders();
  },

  filters: {
    filterOrderStaus(status) {
      const item = collectPages.find((item) => item.value === status);
      if (item && item.value) {
        return item.label;
      } else {
        return "运输中";
      }
    },
  },

  methods: {
    back() {
      uni.switchTab({
        url: "/pages/logistics/logistics",
      });
    },

    mapDeliveryType,

    /**
     * @description 搜索
     */
    searchWuliu(e) {
      const searchKey = e.target.value;
      this.query.keyword = searchKey ? searchKey : undefined;
      this.getOrders();
    },

    /**
     * @description 切换nav
     */
    switchTab(tab) {
      this.query.status = tab;
      this.query.pageNo = 1;
      this.getOrders();
    },

    /**
     * @description 查看详情
     */
    toDetail(orderNo) {
      uni.navigateTo({
        url: "/logistics/collect-package-detail?orderNo=" + orderNo,
      });
    },

    // 加载数据
    async getOrders(isLoadMore) {
      try {
        const res = await expressInquiryApi(this.query);
        if (res.statusCode === 20000) {
          this.list = isLoadMore ? [...this.list, ...res.data] : res.data;
          this.totalData = res.total;
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: "订单获取失败",
          duration: 2000,
          icon: "none",
        });
      } finally {
        uni.hideLoading();
      }
    },

    // 取消订单
    handleCancelOrder(orderInfo) {
      this.cancelOrderId = orderInfo.id;
      this.cancelPopupVisiable = true;
    },

    // 点击确定取消订单
    async handleConfirmOrderCancel(cancelRemarks) {
      try {
        uni.showLoading({
          title: "订单取消中",
        });
        const res = await cancelOrderApi({
          orderId: this.cancelOrderId,
          cancelRemarks,
          userId: getUserId(),
        });

        if (res.statusCode === 20000) {
          uni.showToast({
            title: "订单取消成功",
            duration: 2000,
          });
          this.query.pageNo = 1;
          this.query.keyword = undefined;
          this.getOrders();
        } else {
          uni.showToast({
            title: res.statusMsg,
            duration: 2000,
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: "订单取消失败",
          duration: 2000,
          icon: "none",
        });
      } finally {
        uni.hideLoading();
      }
    },

    // 点击修改订单
    async editOrder(orderInfo) {
      const res = await getOrderDetailApi(orderInfo.orderNo);
      console.log(res.data);
      uni.setStorageSync(jiSenderInfo, {
        senderName: res.data.senderName,
        senderMobile: res.data.senderMobile,
        senderAddress: "广东省佛山市顺德区",
        senderAddressDetail: res.data.senderAddressDetail,
        microInsuranceAmount: res.data.microInsuranceAmount,
      });

      uni.setStorageSync(jiconsigneeInfo, {
        consigneeName: res.data.consigneeName,
        consigneeMobile: res.data.consigneeMobile,
        consigneeAddress: res.data.consigneeAddress,
        consigneeAddressDetail: res.data.consigneeAddressDetail,
        isHasElevator: 1,
        consigneeFloor: res.data.consigneeFloor,
      });

      uni.setStorageSync(VALUE_ADDED_SERVICES, {
        controlGoods: mapCategoryControlType(res.data.cargoControlType),
        delivery: mapDeliveryType(res.data.deliveryType),
        take: res.data.isPickUp ? "上门提货" : "不提货",
        valuation: res.data.pricingType === 1 ? "系统计价" : "物流报价",
        payType: res.data.paymentMethod === 1 ? "现付" : "到付",
      });

      uni.setStorageSync(jiOrderGoodsList, res.data.orderGoodsList);
      uni.setStorageSync(jiRemarks, res.data.remarks);
      uni.setStorageSync(JI_EDIT_ORDER_ID, orderInfo.id);

      uni.navigateTo({
        url: "/logistics/mail",
      });
    },
  },

  onReachBottom() {
    if (this.list.length < this.totalData) {
      this.query.pageNo++;
      this.getOrders(true);
      uni.showLoading({
        title: "加载更多",
      });
      return;
    }

    if (this.list.length < this.query.pageSize) {
      return;
    }
    uni.showToast({
      title: "没有更多了",
      duration: 2000,
    });
  },
};
</script>

<style lang="less" scoped>
// .hidden {
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }

.collect-package {
  padding: 68upx 40upx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #00b578 0%, #ffffff 100%);
  min-height: 100vh;

  .header {
    display: flex;
    align-items: center;

    .back {
      width: 16upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 32upx;
    }
  }

  .main {
    width: 100%;
    border-radius: 20upx;
    background-color: #fff;
    padding: 20upx;
    min-height: 100vh;
    margin-top: 34upx;
    box-sizing: border-box;

    .search {
      position: relative;
      width: 100%;
      height: 60upx;
      box-sizing: border-box;
      padding: 10upx 20upx 10upx 60upx;
      background-color: #efefef;
      border-radius: 30upx;

      .search-input {
        width: 100%;
        height: 100%;
      }

      .img {
        position: absolute;
        left: 16upx;
        top: 50%;
        transform: translateY(-50%);
        width: 32upx;
      }
    }

    .order-list {
      width: 100%;
      box-sizing: border-box;
      padding: 40upx 26upx;

      .navs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000000;
        font-size: 28upx;

        .nav-item {
          position: relative;
          padding-bottom: 6upx;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          transition: all 350ms;

          &.active {
            border-bottom-color: #3662ec;
          }
        }
      }

      .orders {
        .order-wrapper {
          margin-top: 30upx;
          border-bottom: 1px solid #d8d8d8;

          &:last-child {
            border: none;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            flex: 1;
            line-height: 1.5;

            .img {
              width: 254upx;
              height: 166upx;
              border-radius: 20upx;
            }

            .info {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: space-around;
              // margin: 0 28upx;
              color: #3d3d3d;
              font-size: 24upx;
            }
          }

          .status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 18upx 0;
            color: #3d3d3d;
            font-size: 28upx;
            font-weight: bold;
            .btns {
              display: flex;
              .btn {
                font-size: 12px;
                padding: 0px 18upx;
                margin: 0 10px;
                color: #fff;
                background-color: #3662ec;

                &:first-child {
                  margin-left: 0;
                }

                &:nth-child(2) {
                  background-color: rgb(210, 105, 30);
                }
              }
            }

            .status-text {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
}
</style>
