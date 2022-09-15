<template>
  <view class="logistics-page">
    <Search></Search>
    <Carousel :height="152"></Carousel>

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
        @click="switchTab(0)"
        :class="{ active: currentTab === 0 }"
        class="item"
        >收件 <text class="number">3</text>
      </view>

      <view
        @click="switchTab(1)"
        :class="{ active: currentTab === 1 }"
        class="item"
        >寄件 <text class="number">3</text></view
      >
    </view>

    <!-- <view class="views" v-show="currentTab === 0">
      <view class="item"> 待取件 <text class="number">3</text> </view>
      <view class="item"> 派送中 <text class="number">3</text> </view>
      <view class="item"> 运输中 <text class="number">3</text> </view>
    </view> -->

    <view class="orders">
      <img class="banner" src="../../static/images/wuliu/banner.png" alt="" />
      <view class="main">
        <view class="order-item">
          <img
            class="goods-img"
            src="https://img1.baidu.com/it/u=3208752480,3743723251&fm=253&fmt=auto&app=138&f=JPEG?w=690&h=461"
            alt=""
          />

          <view class="info">
            <view class="text op"
              >欧式家具实木欧式家具实木欧式家具实木欧式家具实木</view
            >
            <view class="text">送货上门</view>
            <view class="text">入库时间：2022.05.22</view>
          </view>
        </view>

        <view class="order-item">
          <img
            class="goods-img"
            src="https://img1.baidu.com/it/u=3208752480,3743723251&fm=253&fmt=auto&app=138&f=JPEG?w=690&h=461"
            alt=""
          />

          <view class="info">
            <view class="text op"
              >欧式家具实木欧式家具实木欧式家具实木欧式家具实木</view
            >
            <view class="text">送货上门</view>
            <view class="text">入库时间：2022.05.22</view>
          </view>
        </view>

        <view class="order-item">
          <img
            class="goods-img"
            src="https://img1.baidu.com/it/u=3208752480,3743723251&fm=253&fmt=auto&app=138&f=JPEG?w=690&h=461"
            alt=""
          />

          <view class="info">
            <view class="text op"
              >欧式家具实木欧式家具实木欧式家具实木欧式家具实木</view
            >
            <view class="text">送货上门</view>
            <view class="text">入库时间：2022.05.22</view>
          </view>
        </view>

        <view class="order-item">
          <img
            class="goods-img"
            src="https://img1.baidu.com/it/u=3208752480,3743723251&fm=253&fmt=auto&app=138&f=JPEG?w=690&h=461"
            alt=""
          />

          <view class="info">
            <view class="text op"
              >欧式家具实木欧式家具实木欧式家具实木欧式家具实木</view
            >
            <view class="text">送货上门</view>
            <view class="text">入库时间：2022.05.22</view>
          </view>
        </view>
      </view>
    </view>

    <Panel title="历史签收包裹" routeText="查看更多">
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
    </Panel>

    <view class="kefu">
      <img class="img" src="../../static/images/wuliu/kefu.png" alt="" />
    </view>
  </view>
</template>

<script>
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
} from "../../constant";
import { removeCache } from "../../utils/DWHutils";

export default {
  components: {
    Search,
    Carousel,
    Menus,
    Panel,
  },
  data() {
    return { menus, currentTab: 0 };
  },
  methods: {
    /**
     * @description 切换nav
     */
    switchTab(tab) {
      this.currentTab = tab;
    },
    handleToPage(route) {
      if (!route) {
        return;
      }

      location.href = route;
    },
  },

  onShow() {
    // removeCache([jiSenderInfo, jiRemarks, jiconsigneeInfo, jiOrderGoodsList]);
  },
};
</script>

<style lang="less" scoped>
.logistics-page {
  padding: 54upx 30upx;

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
      background-color: #fff;
      padding: 24upx 0 24upx 0;

      .order-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-shrink: 0;
        margin-bottom: 48upx;

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