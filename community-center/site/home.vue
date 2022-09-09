<template>
  <view class="site-home">
    <img
      class="back"
      @click="handleBack"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/eo1rayuh8vu1qtnbdj0l.png"
      alt=""
    />
    <img
      class="store-img"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6afwt1bl6u57rco7azmj.png"
      alt=""
    />

    <view class="main">
      <!-- 信息面板 -->
      <view class="info border">
        <view class="qiandao">
          <img
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/y1jkl607hh5zzqdwtny7.png"
            alt=""
          />
          <text class="title">每日签到</text>
        </view>

        <view class="title">
          <text>团蜂家居社区佛山市顺德区龙江镇 亚洲国际家具材料交易城店</text>
          <view class="tag">切换站点</view>
        </view>

        <!-- tags -->
        <view class="tags">
          <view class="tag">上门安装</view>
          <view class="tag">上门维修</view>
          <view class="tag">上门翻新</view>
        </view>

        <view class="time">营业时间：08：00-20：00</view>

        <button class="appoint-btn">预约上门</button>

        <view class="ops">
          <view class="left">
            <text>到这里去</text>
            <img
              class="icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
              alt=""
            />
          </view>
          <view class="right">
            <view class="icon-wrapper">
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/yguaedt1zly5dspzn26h.png"
                alt=""
              />
              <text>地图</text>
            </view>

            <view class="icon-wrapper">
              <img
                class="icon"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/9sirxhexfqq0bkxhfwjk.png"
                alt=""
              />
              <text>电话</text>
            </view>
          </view>
        </view>

        <view class="serves">
          <view class="serve">及时服务</view>
          <view class="serve">专业保障</view>
          <view class="serve">售后无忧</view>
        </view>
      </view>

      <view class="serves border">
        <view class="title">社区服务</view>
        <view class="wrapper">
          <view class="main-nav" style="margin-top: 20px">
            <view
              class="item"
              v-for="item in mainNav"
              :key="item.label"
              @click="handleToPage(item.route)"
            >
              <view
                class="img-wrapper"
                :style="{ background: item.background }"
              >
                <img class="img" :src="item.icon" alt="" />
              </view>
              <text class="title">{{ item.label }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="goods-wrapper">
        <view class="title"> 好物推荐 </view>
        <view class="goods-conainer">
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
  </view>
</template>

<script>
import { mainNav } from "../../pages/community-center/config";
import Goods from "../../components/goods";
export default {
  components: {
    Goods,
  },

  data() {
    return {
      mainNav,
    };
  },
  methods: {
    /**
     * @description 返回上一页
     */
    handleBack() {
      uni.navigateBack();
    },

    handleToPage(route) {
      if (!route) {
        return;
      }

      uni.navigateTo({
        url: route,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.site-home {
  .store-img {
    width: 100%;
    height: 458upx;
    object-fit: cover;
  }

  .back {
    position: absolute;
    width: 16upx;
    top: 84upx;
    left: 46upx;
  }

  .main {
    position: relative;
    z-index: 10;
    padding: 0 26upx;
    margin-top: -120upx;

    .border {
      .border(@c9);
      border-radius: @r5;
      padding: 40upx 40upx 14upx 40upx;
      box-sizing: border-box;
    }

    .info {
      position: relative;
      background-color: #fff;

      .qiandao {
        position: absolute;
        top: -100upx;
        right: 12upx;
        text-align: center;

        .icon {
          .img(40upx);
        }
        .title {
          color: @cw;
          font-size: f10;
        }
      }

      .title {
        font-size: @f14;
        color: @c3d;
        line-height: 40upx;
        .flex(flex-end);

        .tag {
          padding: 8upx 18upx;
          margin-left: 124upx;
          flex-shrink: 0;
          margin-right: -40upx;
          color: #000;
          background-color: #efefef;
          border-radius: 40upx 0 0 40upx;
          font-size: 10px;
        }
      }

      .tags {
        .flex(center, flex-start);
        .margin(16upx, 18upx);

        .tag {
          background-color: #07b9b9;
          border-radius: 4upx;
          font-size: 16upx;
          color: @cw;
          padding: 6upx 12upx;
          margin-right: 32upx;
        }
      }

      .time {
        font-size: @f12;
        color: @c0;
      }

      .appoint-btn {
        background-color: #ff8f1f;
        font-size: @f10;
        color: @cw;
        width: 126upx;
        .margin(28upx, 28upx);
        padding: 0;
      }

      .ops {
        .flex();
        color: @c0;
        font-size: @f10;

        .left {
          color: #3662ec;

          .icon {
            .img(28upx);
          }
        }

        .right {
          .flex();

          .icon-wrapper {
            .flex(center, center);
            flex-direction: column;
            padding-right: 30upx;
            border-right: 1upx solid @c9;

            &:last-child {
              padding-left: 30upx;
              padding-right: 0;
              border: none;
            }
            .icon {
              margin-bottom: 12upx;
              .img(32upx);
            }
          }
        }
      }

      .serves {
        .flex();
        margin-top: 28upx;
        padding-top: 28upx;
        border-top: 1upx solid @c9;

        .serve {
          color: @c9;
          font-size: @f10;
          text-align: center;

          &:nth-child(2) {
            padding: 0 72upx;
            border: 1upx solid @c9;
            border-top: none;
            border-bottom: none;
          }
        }
      }
    }

    .serves {
      margin-top: 32upx;

      .title {
        font-size: @f14;
        color: @c0;
        font-weight: bold;
      }

      .main-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 20upx;

        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .title {
            font-size: 28upx;
            color: #3d3d3d;
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
    }

    .goods-wrapper {
      .title {
        font-size: @f14;
        color: @c0;
        font-weight: bold;
        .margin(44upx, 30upx);
      }

      .goods-conainer {
        .flex();
        flex-wrap: wrap;
      }
    }
  }
}
</style>