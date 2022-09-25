<template>
  <view class="stuff-container">
    <!-- 搜索 -->
    <view class="search-bar">
      <view class="local-wrapper">
        <img
          class="location"
          src="../../static/images/index/location.png"
          alt=""
        />
        <text class="locale">佛山市</text></view
      >
      <input type="text" />
      <img class="location" src="../../static/images/store/search.png" alt="" />
    </view>

    <!-- 轮播 -->
    <view class="banner">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img
            src="https://img0.baidu.com/it/u=281212525,3135931031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://img2.baidu.com/it/u=2075742647,1178517082&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=428"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://img2.baidu.com/it/u=3592206539,1858276708&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=354"
            alt=""
          />
        </swiper-item>
      </swiper>
    </view>

    <!-- nav -->
    <view class="navs">
      <view class="item" v-for="item in navs" :key="item.label">
        <view
          :style="{
            background: item.bgc,
          }"
          class="icon-wrapper"
        >
          <img :src="item.icon" class="icon" :alt="item.label" />
        </view>
        <view class="name">{{ item.label }}</view>
      </view>
    </view>

    <!-- main -->
    <view class="main">
      <view class="navs2">
        <view
          class="item"
          :class="{ active: item.value === currentTab }"
          v-for="item in navs2"
          :key="item.label"
          @click="switchTab(item.value)"
          >{{ item.label }}</view
        >
      </view>

      <view class="block">
        <view class="title">供求信息</view>
        <viiew class="block-main">
          <view class="navs3">
            <view class="item" :class="{ active: currentForOfferTab === 0 }"
              >采购列表</view
            >
            <view class="item" :class="{ active: currentForOfferTab === 1 }"
              >供应列表</view
            >
          </view>

          <view class="table">
            <table>
              <tr class="header">
                <th>类别</th>
                <th>地区</th>
                <th>颜色</th>
                <th>数量</th>
                <th>联系</th>
                <th>时间</th>
              </tr>
              <tr>
                <td>五金</td>
                <td>广东</td>
                <td>无</td>
                <td>1000</td>
                <td>19877665544</td>
                <td>08:12</td>
              </tr>
              <tr>
                <td>五金</td>
                <td>广东</td>
                <td>无</td>
                <td>1000</td>
                <td>19877665544</td>
                <td>08:12</td>
              </tr>
              <tr>
                <td>五金</td>
                <td>广东</td>
                <td>无</td>
                <td>1000</td>
                <td>19877665544</td>
                <td>08:12</td>
              </tr>
              <tr>
                <td>五金</td>
                <td>广东</td>
                <td>无</td>
                <td>1000</td>
                <td>19877665544</td>
                <td>08:12</td>
              </tr>
            </table>
          </view>
        </viiew>
      </view>

      <view class="block">
        <view class="title">价格指数</view>
      </view>

      <view class="block">
        <view class="title">行业信息</view>
      </view>

      <view class="block">
        <view class="title">店铺推荐</view>
      </view>
    </view>
  </view>
</template>

<script>
import { navs, navs2 } from "./config";
export default {
  data() {
    return {
      navs,
      navs2,
      currentTab: 0,
      currentForOfferTab: 0,
    };
  },

  methods: {
    switchTab(index) {
      this.currentTab = index;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.stuff-container {
  position: relative;
  background-color: #efefef;

  // 表格
  .table {
    border: 1upx solid #999999;
    border-radius: 10upx;
    padding: 10upx;
    box-sizing: border-box;

    .header {
      th {
        font-size: @f12;
        color: @c9;
        border-bottom: 1upx solid;
      }
    }
  }

  // 搜索
  .search-bar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 95%;
    height: 72upx;
    top: 54upx;
    left: 50%;
    padding: 16upx 24upx;
    transform: translateX(-50%);
    background-color: #fff;
    color: #000000;
    font-size: 24upx;
    border-radius: 50upx;
    z-index: 200;

    .local-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .locale {
        padding: 0 10upx;
        border-right: 1px solid #ccc;
      }
    }

    .location {
      width: 40upx;
    }

    input {
      flex: 1;
      padding: 0 30upx;
    }
  }
  // 轮播
  .banner {
    width: 100%;
    height: 552upx;
    border-radius: 0 0 20upx 20upx;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 552upx;

      /deep/ .uni-swiper-dot-active {
        border-radius: 0;
        width: 40upx !important;
      }

      /deep/ .uni-swiper-dot {
        border-radius: 0px;
        height: 4upx;
        width: 4upx;
        margin-right: 6upx;
      }

      img {
        width: 100%;
        height: 552upx;
      }
    }
  }

  .navs {
    padding: 32upx 26upx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    background-color: @cw;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 20%;
      box-sizing: border-box;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80upx;
        height: 80upx;
        border-radius: 10px;

        .icon {
          width: 40upx;
        }
      }

      .name {
        font-size: @f12;
        color: @c3d;
        margin: 20upx auto 30upx auto;
      }
    }
  }

  .main {
    width: 100%;
    margin-top: 14upx;
    padding: 20upx 26upx;
    box-sizing: border-box;
    background-color: @cw;

    .navs2 {
      display: flex;
      align-items: center;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        font-size: @f12;
        color: @c3d;
        margin-right: 60upx;
        white-space: nowrap;
        padding: 10upx 0;
        border-bottom: 4upx solid transparent;
        transition: all 350ms;

        &.active {
          color: #3662ec;
          border-bottom-color: #3662ec;
        }
      }
    }

    .block {
      .title {
        margin: 32upx auto 28upx 0;
        font-size: @f14;
        color: @c3d;
        font-weight: bold;
        padding-left: 14upx;
        border-left: 4upx solid #fa5151;
      }

      .block-main {
        .navs3 {
          display: flex;
          font-size: @f10;

          .item {
            margin-right: 20px;
            &.active {
              color: #3662ec;
            }
          }
        }
      }
    }
  }
}
</style>