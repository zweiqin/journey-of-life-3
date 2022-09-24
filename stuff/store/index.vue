<template>
  <view class="store-home-container">
    <view class="info">
      <img
        class="bgm"
        src="https://img2.baidu.com/it/u=2113609285,1938081570&fm=253&fmt=auto&app=120&f=JPEG?w=751&h=500"
        alt=""
      />

      <img
        class="back"
        @click="handleBack"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1676ilbo4t26udpy067z.png"
        alt=""
      />

      <view class="store-info">
        <img
          class="avatar"
          src="https://img2.baidu.com/it/u=3949966856,2992083594&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />

        <view class="wrapper">
          <view class="name">团蜂家具材料店</view>
          <view class="rate">
            综合体验分<Rate :rate="4"></Rate>粉丝数102.5万
          </view>
          <view class="tags">
            <view class="tag">热销门店</view>
            <view class="tag">热销门店</view>
            <view class="order">订阅</view>
          </view>
        </view>
      </view>
    </view>

    <view class="main">
      <view class="about-me">
        <view class="title">店铺介绍</view>
        <view class="my-info">
          团蜂家具材料成立于2009年，主要经营材料供应和采购，
          目前位于佛山顺德区，开店以来一直诚信经营，品质保证，
          店内产品数量众多，欢迎采购！

          <view class="address">
            <view>地址：顺德区龙江镇亚洲国际材料交易城团蜂家具材料店</view>
            <view class="mobile"
              >电话：13800138000
              <view class="ops">
                <view>
                  在线咨询
                  <img
                    class="icon"
                    src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ediomt05zf5jzbowsrk2.png"
                    alt=""
                  />
                </view>

                <view>
                  到这里去
                  <img
                    class="icon"
                    src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
                    alt=""
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="navs2" ref="navs2Ref">
        <view
          class="item"
          :class="{ active: item.value === currentTab }"
          v-for="item in navs2"
          :key="item.label"
          @click="switchTab(item.value)"
          >{{ item.label }}</view
        >

        <view class="modal" ref="modalRef">
          <view
            class="item"
            :class="{ active: item.value === currentTab }"
            v-for="item in navs2"
            :key="item.label"
            @click="switchTab(item.value)"
            >{{ item.label }}</view
          >
        </view>
      </view>

      <Carousel
        height="311"
        :list="[
          'https://img1.baidu.com/it/u=934539030,2839442749&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
          'https://img0.baidu.com/it/u=2897486836,2967666712&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=786',
          'https://img0.baidu.com/it/u=3303379795,1457228468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        ]"
      ></Carousel>

      <view class="split-title-wrapper">
        <view class="split-title">热销产品</view>
      </view>

      <view class="goods-wrapper">
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
        <Goods></Goods>
      </view>
    </view>
  </view>
</template>

<script>
import Rate from "../../components/rate";
import { navs2 } from "../../pages/stuff/config";
import Carousel from "../../components/carousel";
import Goods from "../../components/goods";

export default {
  components: {
    Rate,
    Carousel,
    Goods,
  },

  data() {
    return {
      currentTab: 0,
      navs2,
    };
  },

  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },

    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.store-home-container {
  .info {
    position: relative;
    width: 100%;
    height: 376upx;
    padding: 74upx 20upx 20upx 20upx;
    box-sizing: border-box;

    .bgm {
      position: absolute;
      width: 100%;
      height: 376upx;
      top: 0;
      left: 0;
      object-fit: cover;
      z-index: -1;
    }

    .back {
      width: 16upx;
    }

    .store-info {
      .flex();
      margin-top: 60upx;

      .avatar {
        .img(100upx, 50%);
        margin-right: 32upx;
      }

      .wrapper {
        flex: 1;
        color: @cw;
        .name {
          font-size: @f14;
          font-weight: bold;
        }

        .rate {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin: 10px 0;
        }
      }

      .tags {
        display: flex;
        align-items: center;

        .tag {
          font-size: 10px;
          padding: 4upx 20upx;
          background: linear-gradient(
            90deg,
            #ff0000 0%,
            rgba(255, 140, 0, 0) 100%
          );
          border-radius: @r5;
        }

        .order {
          background: #fff;
          color: #3662ec;
          padding: 4upx 16upx;
          font-size: 10px;
          border-radius: 10px;
          margin-left: 30px;
        }
      }
    }
  }

  .main {
    padding: 30upx;
    box-sizing: border-box;

    .about-me {
      font-size: @f12;
      color: @c3d;
      margin-bottom: 10px;

      .title {
        margin-bottom: 20upx;
      }

      .my-info {
        padding: 16upx 24upx;
        box-sizing: border-box;
        border: 1upx solid @c9;
        border-radius: 10upx;
        line-height: 1.5;

        .address {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1upx solid @c9;
        }

        .mobile {
          .flex();
          .ops {
            .flex();
            .icon {
              width: 28upx;
              vertical-align: -2px;
              margin-left: 12upx;

              &:first-child {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }

    .split-title-wrapper {
      position: relative;
      width: 50%;
      height: 1px;
      border-bottom: 1upx solid #000;
      margin: 60upx auto 28upx;

      .split-title {
        position: absolute;
        top: -16upx;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: @c3d;
        background-color: #fff;
        font-weight: bold;
        padding: 0 30upx;
      }
    }

    .goods-wrapper {
      .flex();
      flex-wrap: wrap;
    }
  }

  .navs2 {
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: scroll;

    .modal {
      position: fixed;
      width: 375px;
      left: 0;
      background-color: rgb(255, 255, 255);
      transform: scaleY(0);
      transform-origin: top center;
      transition: all 200ms;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 20upx;
      box-sizing: border-box;
      z-index: 300;

      .item {
        border: none;
        width: 24%;

        .active {
        }
      }
    }

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
}
</style>