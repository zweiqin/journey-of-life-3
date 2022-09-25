<template>
  <view class="logistics-page">
    <Search @focus="handleSearch"></Search>
    <Carousel
      :list="[
        'https://img0.baidu.com/it/u=1781395553,1101009469&fm=253&fmt=auto&app=138&f=JPEG?w=540&h=300',
        'https://img0.baidu.com/it/u=3581503522,3128729929&fm=253&fmt=auto&app=138&f=JPEG?w=903&h=500',
        'https://img2.baidu.com/it/u=483246757,1868984082&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=210',
      ]"
      :height="152"
    ></Carousel>

    <view class="tools">
      <img
        class="left"
        @click="handleToPage('/logistics/mail')"
        src="../../static/images/wuliu/jikuaidi.png"
        alt=""
      />
      <view class="right">
        <img
          class="img"
          @click="handleToPage('/logistics/collect-package')"
          src="../../static/images/wuliu/qukuaidi.png"
          alt=""
        />

        <img
          class="img"
          @click="handleToPage('/logistics/find-logistics')"
          src="../../static/images/wuliu/quanguo.png"
          alt=""
        />
      </view>
    </view>

    <Menus :top="15" :menus="menus"></Menus>

    <view class="navs">
      <view
        @click="switchTab(1)"
        :class="{ active: currentTab === 1 }"
        class="item"
        >寄件 <text class="number">{{ mySendsTotal }}</text></view
      >

      <view
        @click="switchTab(0)"
        :class="{ active: currentTab === 0 }"
        class="item"
        >收件 <text class="number">0</text>
      </view>
    </view>

    <!-- <view class="views" v-show="currentTab === 0">
      <view class="item"> 待取件 <text class="number">3</text> </view>
      <view class="item"> 派送中 <text class="number">3</text> </view>
      <view class="item"> 运输中 <text class="number">3</text> </view>
    </view> -->

    <view class="orders">
      <img class="banner" src="../../static/images/wuliu/banner.png" alt="" />
      <view class="main">
        <view v-if="mySends.length">
          <view
            class="order-item"
            @click="handleViewDetail(orderInfo.orderNo)"
            v-for="orderInfo in mySends"
            :key="orderInfo.id"
          >
            <view class="info">
              <view class="text"
                >运单号：{{ orderInfo.orderNo }}
                <text style="color: rgb(255, 143, 31); margin-left: 5px"
                  >({{ orderInfo.status | filterOrderStaus }})</text
                >
              </view>
              <view class="text"
                >{{ orderInfo.consigneeName }}
                <text class="call-phone">{{
                  orderInfo.consigneeMobile
                }}</text></view
              >
              <view
                >{{ orderInfo.consigneeAddress
                }}{{ orderInfo.consigneeAddressDetail }}</view
              >
              <view class="text">下单时间：{{ orderInfo.createTime }}</view>
            </view>
          </view>

          <view class="more" @click="viewAllOrders">查看全部？</view>
        </view>

        <NoData v-else></NoData>
      </view>
    </view>

    <!-- <Panel title="历史签收包裹" routeText="查看更多">
      <view class="packagee-wrapper">
        <img
          class="package"
          src="https://img0.baidu.com/it/u=2996696574,2705500697&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
        <img
          class="package"
          src="https://img0.baidu.com/it/u=2996696574,2705500697&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
        <img
          class="package"
          src="https://img0.baidu.com/it/u=2996696574,2705500697&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
        <img
          class="package"
          src="https://img0.baidu.com/it/u=2996696574,2705500697&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
      </view>
    </Panel> -->

    <!-- <view class="kefu">
      <img class="img" src="../../static/images/wuliu/kefu.png" alt="" />
    </view> -->
  </view>
</template>

<script>
import { expressInquiryApi } from "../../api/logistics";
import Search from "../../components/search";
import Carousel from "../../components/carousel";
import Menus from "../../components/Menus";
import { menus } from "./config";
import Panel from "../../components/panel";
import {
  jiSenderInfo,
  jiRemarks,
  jiconsigneeInfo,
  jiOrderGoodsList,
  VALUE_ADDED_SERVICES,
  JI_EDIT_ORDER_ID,
  APPONIT_WULIU_QIYE_ID,
} from "../../constant";
import { getUserId, removeCache, checkWhoami } from "../../utils/DWHutils";
import { collectPages } from "../../logistics/config";
import NoData from "../../components/no-data";

export default {
  components: {
    Search,
    Carousel,
    Menus,
    Panel,
    NoData,
  },
  data() {
    return { menus, currentTab: 1, mySends: [], mySendsTotal: 0 };
  },
  created() {
    this.getData();
    // checkWhoami();
  },
  methods: {
    /**
     * @description 切换nav
     */
    switchTab(tab) {
      this.currentTab = tab;
      if (this.currentTab === 0) {
        this.mySends = [];
      } else {
        this.getData();
      }
    },
    handleToPage(route) {
      if (!route) {
        return;
      }

      uni.navigateTo({
        url: route,
      });
    },

    // 获取寄件列表
    async getData() {
      const res = await expressInquiryApi({
        pageNo: 1,
        pageSize: 5,
        userId: getUserId(),
      });

      this.mySends = res.data;
      this.mySendsTotal = res.total;
    },

    // 点击查看详情
    handleViewDetail(orderNo) {
      if (!orderNo) {
        uni.showToast({
          title: "订单异常",
          duration: 2000,
          icon: "none",
        });
        return;
      }

      uni.navigateTo({
        url: "/logistics/collect-package-detail?orderNo=" + orderNo,
      });
    },

    // 点击查看全部
    viewAllOrders() {
      uni.navigateTo({
        url: "/logistics/collect-package",
      });
    },

    // 点击搜索去搜索物流
    handleSearch() {
      uni.navigateTo({
        url: "/logistics/find-logistics",
      });
    },
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

  onShow() {
    removeCache([
      jiSenderInfo,
      jiRemarks,
      jiconsigneeInfo,
      jiOrderGoodsList,
      JI_EDIT_ORDER_ID,
      VALUE_ADDED_SERVICES,
      APPONIT_WULIU_QIYE_ID,
    ]);
  },
};
</script>

<style lang="less" scoped>
.logistics-page {
  padding: 54upx 30upx 80upx 30upx;

  .tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 360upx;
    margin-top: 24upx;

    .left {
      width: 308upx;
      height: 100%;
    }

    .right {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      padding-left: 20upx;

      .img {
        width: 100%;

        &:nth-child(1) {
          height: 220upx;
          flex: 1;
          box-sizing: border-box;
          padding-bottom: 20upx;
        }

        &:nth-child(2) {
          height: 108upx;
        }
      }
    }
  }

  .navs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #3d3d3d;
    font-size: 32upx;
    font-weight: bold;
    line-height: 44upx;
    margin-top: 40upx;
    margin-bottom: 32upx;

    .item {
      position: relative;
      margin-right: 74upx;
      &::before {
        content: "";
        transition: all 350ms;
      }

      .number {
        margin-left: 4upx;
        color: #3662ec;
      }

      &.active {
        &::before {
          position: absolute;
          display: block;
          content: "";
          width: 50%;
          height: 4upx;
          bottom: -25%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #3662ec;
        }
      }
    }
  }

  .views {
    display: flex;
    align-items: center;
    margin-bottom: 22upx;

    .item {
      margin-right: 72upx;
      color: #999999;
      font-size: 24upx;

      .number {
        color: #000000;
      }
    }
  }

  .orders {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 48upx;
    border-radius: 20upx;
    margin-bottom: 36upx;
    background: linear-gradient(133deg, #2748b4 0%, rgba(39, 72, 180, 0) 100%);

    .banner {
      width: 70%;
      display: block;
      padding: 40upx 0 20upx 20upx;
    }

    .main {
      width: 95%;
      margin: 0 auto;
      background-color: linear-gradient(
        133deg,
        #2748b4 0%,
        rgba(39, 72, 180, 0) 100%
      );
      padding: 24upx 0 24upx 0;

      .order-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-shrink: 0;
        padding: 0 30upx;
        margin-bottom: 48upx;
        border: 1upx dotted #999;
        background-color: #fff;
        border-radius: 5px;

        .info {
          height: 100%;
          .text {
            color: #3d3d3d;
            font-size: 24upx;
            margin: 16upx 0;

            &.op {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              max-width: 280upx;
            }
          }
        }

        .goods-img {
          width: 254upx;
          height: 166upx;
          border-radius: 20upx;
        }
      }

      .more {
        text-align: center;
        color: #3662ec;
      }
    }
  }

  .packagee-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20upx;

    .package {
      width: 120upx;
      border-radius: 20upx;
      margin-right: 30upx;
    }
  }

  .kefu {
    position: fixed;
    top: 60%;
    right: 10upx;
    width: 80upx;
    height: 80upx;
    border-radius: 50%;
    background-color: #ff8f1f;
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
      width: 54upx;
    }
  }
}
</style>