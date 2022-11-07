<template>
  <view class="community-detail">
    <view class="head">
      <view class="title-list">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ishr7aqz6vm8if80if92.png"
          alt=""
          class="return"
          @click="handleBack"
        />
        <view class="title">木制品维修</view>
        <view class="location">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/iglo65306wogezn1kjmf.png"
            alt=""
            class="icon"
          />
          <view class="address">佛山市</view>
        </view>
      </view>
      <view class="goods">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/wjor6av7ldr00pua8b6q.png"
          alt=""
          class="img"
        />
      </view>
      <view class="name-list">
        <view class="name">木制品维修</view>
        <view class="a">
          <view class="share">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/mi4jzqbzsb31mge61s18.png"
              alt=""
              class="image"
            />
            <view class="text">分享</view>
          </view>
        </view>
      </view>
      <view class="price-list">
        <view class="logo">￥</view>
        <view class="number">150.00</view>
        <view class="unit">/台</view>
      </view>
      <view class="brief">
        <view class="introduce">服务内容介绍</view>
        <view class="content"
          >对木质家具、木门、木地板等产品的划伤、破损、开裂、
          断裂等问题进行修复，恢复其外观，延长使用寿命。
        </view>
      </view>
    </view>
    <view class="mid">
      <view class="text-list">
        <view class="ensure">保障</view>
        <view class="poster">售后质保·服务专业·极速退款·意外承包</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/cofcgw5ox0ctbtqn1txr.png"
          alt=""
          class="more"
        />
      </view>
    </view>
    <view class="body">
      <view class="top">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/e6r4nzkriag797mchd56.png"
          alt=""
          class="top-img"
        />
      </view>
      <view class="middle">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zyxgv8d3eblx5y6kanh4.png"
          alt=""
          class="mid-img"
        />
      </view>
      <view class="process">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/alfwfqtuvrwg4xjacanj.png"
          alt=""
          class="process-img"
        />
      </view>
      <view class="tips">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/iftnzg3gb548iy7p7n5b.png"
          alt=""
          class="img-tips"
        />
      </view>
      <view class="case-show">
        <view class="text">
          <view class="text1">案例</view>
          <view class="text2">展示</view>
        </view>
        <view class="show-img">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/6h2p8u4uktb8gbhwauw8.png"
            alt=""
            class="img1"
          />
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/q2rf6x9hlytiuo53urkx.png"
            alt=""
            class="img2"
          />
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/chkivuapm9jn8z8bz29k.png"
            alt=""
            class="img3"
          />
        </view>
      </view>
    </view>
    <view class="other">
      <view class="other-service">
        <view class="text">其他服务</view>
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/63apnwjyguuyva9itx9k.png"
          alt=""
          class="show"
          @click="handleToServiceListHome"
        />
      </view>
    </view>
    <view class="foot">
      <view class="list">
        <view class="online">
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/aivl8ag811bco1skdda2.png"
            alt=""
            class="seek"
          />
          <view class="name">在线咨询</view>
        </view>
        <view class="order-list">
          <view class="join">加入需求清单</view>
          <view class="order" @click="handleToServiceOrderHome">立即下单</view>
        </view>
      </view>
    </view>
  </view>
</template>






<script>
export default {
  name: "Community-detail",
  props: {},
  data() {
    return {};
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    handleToServiceListHome() {
      console.log("服务分类列表");
      uni.navigateTo({ url: "../community-center/service-sort" });
    },
    handleToServiceOrderHome() {
      console.log("服务订单");
      uni.navigateTo({ url: "../community-center/community-order" });
    },
  },
  created() {},
};
</script>







<style lang="less" scoped>
.community-detail {
  background: #f7f8fa;
  .head {
    background: #ffffff;
    .title-list {
      display: flex;
      align-items: center;
      padding: 88upx 34upx 36upx 26upx;
      .return {
        width: 48upx;
        height: 48upx;
      }
      .title {
        flex: 1;
        text-align: center;
        font-size: 36upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .location {
        width: 124upx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
          width: 28upx;
          height: 28upx;
        }
        .address {
          font-size: 28upx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
    .goods {
      // margin: 0upx 82upx;
      width: 100%;
      height: 340upx;
      display: flex;
      justify-content: center;
      .img {
        width: 588upx;
        height: 340upx;
      }
    }
    .name-list {
      display: flex;
      justify-content: space-between;
      padding-left: 36upx;

      .name {
        font-size: 36upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .a {
        width: 120upx;
        height: 80upx;
        display: flex;
        align-items: flex-end;
        .share {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100upx 0upx 0upx 100upx;
          background: #f7f8fa;
          width: 120upx;
          height: 50upx;
          .image {
            width: 40upx;
            height: 40upx;
          }
          .text {
            font-size: 28upx;
            color: #3d3d3d;
          }
        }
      }
    }
    .price-list {
      display: flex;
      align-items: center;
      padding-left: 36upx;
      .logo {
        font-size: 28upx;
        font-weight: 700;
        color: #fa5151;
      }
      .number {
        font-size: 40upx;
        font-weight: bold;
        color: #fa5151;
      }
      .unit {
        font-size: 28upx;
        font-weight: 700;
      }
    }
    .brief {
      padding: 14upx 18upx 58upx 36upx;
      .introduce {
        font-size: 28upx;
        font-weight: 500;
        color: #999999;
      }
      .content {
        padding-top: 14upx;
        font-size: 28upx;
        color: #3d3d3d;
      }
    }
  }
  .mid {
    display: flex;
    align-items: center;
    height: 104upx;
    margin-top: 16upx;
    margin-bottom: 16upx;
    background: #ffffff;
    .text-list {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      padding: 0upx 18upx 0upx 36upx;

      .ensure {
        font-size: 28upx;
        font-weight: bold;
        color: #3d3d3d;
      }
      .poster {
        font-size: 24upx;
        color: #3d3d3d;
      }
      .more {
        width: 40upx;
        height: 40upx;
      }
    }
  }
  .body {
    background: #ffffff;

    .top {
      .top-img {
        // width: 752upx;
        // height: 760upx;
        width: 100%;
      }
    }
    .middle {
      .mid-img {
        // width: 754upx;
        // height: 964px;
        width: 100%;
      }
    }
    .process {
      .process-img {
        width: 100%;
      }
    }
    .tips {
      .img-tips {
        width: 100%;
      }
    }
    .case-show {
      .text {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 74upx;
        .text1 {
          font-size: 48upx;
          font-weight: bold;
          color: #3d3d3d;
        }
        .text2 {
          font-size: 48upx;
          font-weight: bold;
          color: #ea6f3a;
        }
      }
      .show-img {
        padding: 40upx 30upx 54upx 30upx;
        .img1 {
          width: 100%;
          height: 810upx;
        }
        .img2 {
          width: 100%;
          height: 514upx;
        }
        .img3 {
          width: 100%;
          height: 344upx;
        }
      }
    }
  }
  .other {
    margin-top: 20upx;
    background: #ffffff;
    width: 100%;
    height: 280upx;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .other-service {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10upx;
      width: 200upx;
      .text {
        font-size: 32upx;
        color: #3d3d3d;
      }
      .show {
        width: 40upx;
        height: 40upx;
      }
    }
  }
  .foot {
    background: #ffffff;
    padding: 30upx 30upx 30upx 30upx;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 8upx solid #f7f8fa;
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 82upx;
      .online {
        width: 96upx;
        height: 82upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .seek {
          width: 48upx;
          height: 48upx;
        }
        .name {
          font-size: 24upx;
        }
      }
      .order-list {
        display: flex;
        justify-content: space-between;
        width: 75%;
        .join {
          font-size: 32upx;
          width: 270upx;
          height: 80upx;
          border-radius: 100upx;
          border: 2upx solid #999999;
          color: #999999;
          text-align: center;
          line-height: 78upx;
        }
        .order {
          font-size: 32upx;
          color: #ffffff;
          width: 220upx;
          height: 80upx;
          border-radius: 100upx;
          background: linear-gradient(270deg, #e95d20 0%, #ff8f1f 100%);
          text-align: center;
          line-height: 78upx;
        }
      }
    }
  }
}
</style>
