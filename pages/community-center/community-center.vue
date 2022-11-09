<template>
  <view class="community-center">
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

    <!-- main-nav -->
    <view class="main-nav" style="margin-top: 20px">
      <view
        class="item"
        v-for="item in mainNav"
        :key="item.label"
        @click="handleToPage(item.route)"
      >
        <view class="img-wrapper" :style="{ background: item.background }">
          <img class="img" :src="item.icon" alt="" />
        </view>
        <text class="title">{{ item.label }}</text>
      </view>
    </view>

    <!-- sub-nav -->
    <view class="sub-nav">
      <view class="item" v-for="item in navs.slice(0, 5)" :key="item.label">
        <view class="img-wrapper" :style="{ background: item.background }">
          <img class="img" :src="item.icon" alt="" />
        </view>
        <text class="title">{{ item.label }}</text>
      </view>
    </view>

    <view class="sub-nav">
      <view class="item" v-for="item in navs.slice(5)" :key="item.label">
        <view class="img-wrapper" :style="{ background: item.background }">
          <img class="img" :src="item.icon" alt="" />
        </view>
        <text class="title">{{ item.label }}</text>
      </view>
    </view>

    <view class="wrapper">
      <!-- 附近服务站 -->
      <Panel
        title="团蜂家居社区服务站"
        route="/community-center/site/more-site"
        routeText="更多站点"
      >
        <img
          @click="handleToPage('/community-center/site/home')"
          class="store-img"
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/lzip9yu31ezatbbti7h8.png"
          alt=""
        />
      </Panel>

      <!-- 联盟商家 -->
      <Panel
        title="附近联盟商家"
        route="/community-center/site/union"
        routeText="查看全部"
      >
        <view class="body">
          <view class="business-wrapper">
            <view class="item">
              <img
                class="img"
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/4ioqj3035qm3wdcv2kcc.png"
                alt=""
              />
              <view class="info">
                <view class="title">团蜂家居社区...（龙江店）</view>
                <!-- <view class="price"> ￥<text class="text">400</text> </view> -->
                <view class="sign">
                  <view class="show">官方直营</view>
                  <view class="show">品牌老店</view>
                </view>
                <view class="footer">
                  <!-- <view class="left">
                  <img
                    class="avatar"
                    src="https://img1.baidu.com/it/u=556380733,746692031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889"
                    alt=""
                  />
                  <view class="name">团蜂社区服务站</view>
                </view> -->
                  <view class="right">
                    <img
                      class="views"
                      src="../../static/images/con-center/visited.png"
                      alt=""
                    />
                    <view class="numbers">10w+</view>
                  </view>
                </view>
              </view>
            </view>

            <view class="item">
              <img
                class="img"
                src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/vvnjnrc2edczp0depm3t.png"
                alt=""
              />
              <view class="info">
                <view class="title">团蜂家居社区...（龙江店）</view>
                <!-- <view class="price"> ￥<text class="text">400</text> </view> -->
                <view class="sign">
                  <view class="show">官方直营</view>
                  <view class="show">品牌老店</view>
                </view>
                <view class="footer">
                  <!-- <view class="left">
                  <img
                    class="avatar"
                    src="https://img1.baidu.com/it/u=556380733,746692031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889"
                    alt=""
                  />
                  <view class="name">团蜂社区服务站</view>
                </view> -->
                  <view class="right">
                    <img
                      class="views"
                      src="../../static/images/con-center/visited.png"
                      alt=""
                    />
                    <view class="numbers">10w+</view>
                  </view>
                </view>
              </view>
            </view>

            <view class="item">
              <img
                class="img"
                src="	https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/xdokj5x4h29bka31rf7a.png"
                alt=""
              />
              <view class="info">
                <view class="title">团蜂家居社区...（龙江店）</view>
                <!-- <view class="price"> ￥<text class="text">400</text> </view> -->
                <view class="sign">
                  <view class="show">官方直营</view>
                  <view class="show">品牌老店</view>
                </view>
                <view class="footer">
                  <!-- <view class="left">
                  <img
                    class="avatar"
                    src="https://img1.baidu.com/it/u=556380733,746692031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889"
                    alt=""
                  />
                  <view class="name">团蜂社区服务站</view>
                </view> -->
                  <view class="right">
                    <img
                      class="views"
                      src="../../static/images/con-center/visited.png"
                      alt=""
                    />
                    <view class="numbers">10w+</view>
                  </view>
                </view>
              </view>
            </view>

            <view class="item">
              <img
                class="img"
                src="	https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/9yq1bskgb9z6j6zythwp.png"
                alt=""
              />
              <view class="info">
                <view class="title">团蜂家居社区...（龙江店）</view>
                <!-- <view class="price"> ￥<text class="text">400</text> </view> -->
                <view class="sign">
                  <view class="show">官方直营</view>
                  <view class="show">品牌老店</view>
                </view>
                <view class="footer">
                  <!-- <view class="left">
                  <img
                    class="avatar"
                    src="https://img1.baidu.com/it/u=556380733,746692031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889"
                    alt=""
                  />
                  <view class="name">团蜂社区服务站</view>
                </view> -->
                  <view class="right">
                    <img
                      class="views"
                      src="../../static/images/con-center/visited.png"
                      alt=""
                    />
                    <view class="numbers">10w+</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </Panel>
    </view>
  </view>
</template>

<script>
import { mainNav, navs } from "./config";
import Goods from "../../components/goods";
import Panel from "../../components/panel/index.vue";
import { removeCache } from "../../utils";
import { checkWhoami } from "../../utils";

export default {
  components: {
    Panel,
    Goods,
  },
  data() {
    return {
      mainNav,
      navs,
    };
  },
  methods: {
    handleToPage(route) {
      uni.navigateTo({
        url: route,
      });
    },
  },

  mounted() {
    // checkWhoami();
  },

  onShow() {
    const deleteCache = [
      "DELIVERY_INFO",
      "CONSIGNEE_INFO",
      "ORDER_GOODS_LIST",
      "INSTALL_TIME",
      "DELIVERY_TYPE",
      "EDIT_DELVERY_INSTALL_ORDERDERNO",
      "DELIVERY_INSTALL_EDIT_ID",
    ];

    const repairCache = [
      "REPAIR_INFO",
      "REPAIR_TIME",
      "REPAIR_GOODS",
      "EDIT_REPAIR_ORDER",
      "EDIT_REPAIR_ID",
      "REPAIR_REMARKS",
      "REPAIR_SERVE_TYPE",
    ];

    removeCache(deleteCache);
    removeCache(repairCache);
  },
};
</script>

<style lang="less" scoped>
.community-center {
  position: relative;
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

  // main-nav
  .main-nav,
  .sub-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 26upx;
    margin-top: 20upx;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .title {
        font-size: 24upx;
        color: #3d3d3d;
        font-weight: 400;
      }

      .img-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80upx;
        height: 80upx;
        border-radius: 20upx;
        margin-bottom: 10upx;

        .img {
          width: 50%;
        }
      }
    }
  }

  .wrapper {
    padding: 42upx 22upx 22upx 22upx;

    .store-img {
      width: 100%;
      height: 160upx;
      border-radius: 20upx;
      margin-top: 14upx;
      margin-bottom: 14upx;
    }
    .body {
      margin: 0upx 0upx 100upx 0upx;
      .business-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .item {
          width: 348upx;
          padding-top: 14upx;

          .img {
            width: 100%;
            height: 208upx;
            border-radius: 20upx 20upx 0 0;
          }

          .info {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            padding: 8upx 18upx 10upx 20upx;

            .title {
              width: 284upx;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #3d3d3d;
              font-size: 24upx;
            }
            .sign {
              padding-top: 12upx;
              width: 90%;
              display: flex;
              justify-content: space-between;
              .show {
                text-align: center;
                font-size: 20upx;
                font-weight: 350;
                width: 126upx;
                height: 36upx;
                color: #fa5151;
                border-radius: 20upx;
                // box-sizing: border-box;
                border: 1upx solid #fa5151;
              }
            }

            .price {
              color: #fa5151;
              font-size: 20upx;
              padding: 0;
              line-height: 1.5;

              .text {
                font-size: 32upx;
              }
            }

            .footer {
              padding-top: 18upx;
              justify-content: flex-end;
              width: 100%;
              display: flex;
              // justify-content: space-between;
              align-items: center;
              .left {
                display: flex;
                align-items: center;
                .avatar {
                  width: 40upx;
                  height: 40upx;
                  border-radius: 50%;
                }

                .name {
                  width: 150upx;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  color: #999999;
                  font-size: 20upx;
                  transform: scale(0.9);
                }
              }

              .right {
                display: flex;
                align-items: center;

                .views {
                  width: 22upx;
                  height: 18upx;
                }

                .numbers {
                  color: #999999;
                  font-size: 20upx;
                  transform: scale(0.9);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>