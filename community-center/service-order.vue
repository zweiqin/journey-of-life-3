<template>
  <view class="service-order">
    <view class="title">填写订单</view>
    <img
      src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/j53rp2zc53n5iz96444l.png"
      alt=""
      class="return"
      @click="handleBack"
    />

    <view class="main">
      <view class="head">
        <view class="customer">
          <view class="text">客户信息</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
            alt=""
            class="jump"
            @click="handleToAddAddress"
          />
        </view>
        <view class="content">{{
          userInfo.trim() || "复制客户完整信息，系统可自动识别地址"
        }}</view>
      </view>
      <view class="middle">
        <view class="text">服务信息</view>
        <view class="service-detail">
          <view class="left">
            <img
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/325eo3pq4k8dkn50xfli.png"
              alt=""
              class="img"
            />
          </view>
          <view class="right">
            <view class="name">木制品维修</view>
            <view class="describe">
              工程师上门后，通过几件器报价， 费用包含交通费、维修费、技术费等
            </view>
          </view>
        </view>
      </view>
      <view class="whiteboard">
        <view class="date">
          <view class="date-text">维修日期</view>
          <view class="time">2022-01-19 下午18:00</view>
          <img
            src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/okx3511yuuh9fsdl290h.png"
            alt=""
            class="jump"
          />
        </view>
      </view>
      <view class="explain">
        <view class="explain-name">维修说明</view>
        <view class="explain-text">（备注说明）</view>
      </view>
      <view class="whiteboard1">
        <view class="place-order" @click="handleToOrder">提交订单</view>
      </view>
    </view>
  </view>
</template>






<script>
export default {
  name: "Service-order",
  props: {},
  data() {
    return {
      userInfo: "",
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    handleToAddAddress() {
      console.log(123);
      uni.navigateTo({ url: "../community-center/add-address" });
    },
    handleToOrder() {
      console.log(123);
      uni.navigateTo({ url: "../community-center/order" });
    },
  },
  created() {},

  onShow() {
    const info = uni.getStorageSync("guawyi8sa");
    console.log(info);
    this.userInfo = info.name + " " + info.mobile;
    console.log(this.userInfo);
  },
};
</script>






<style lang="less" scoped>
.service-order {
  .title {
    margin-top: 60upx;
    text-align: center;
    font-size: 32upx;
    font-weight: 500;
    color: #3d3d3d;
  }
  .return {
    position: absolute;
    top: 0upx;
    left: 18upx;
    width: 48upx;
    height: 48upx;
  }
  .main {
    background: #faf9fc;
    .head {
      // width: 750upx;
      height: 164upx;
      opacity: 1;
      background: #ffffff;
      .customer {
        display: flex;
        justify-content: space-between;
        padding: 32upx 32upx 26upx 44upx;
        .text {
          font-size: 28upx;
          color: #3d3d3d;
        }
        .jump {
          width: 32upx;
          height: 32upx;
        }
      }
      .content {
        font-size: 24upx;
        color: #999999;
        padding-left: 44upx;
      }
    }
    .middle {
      margin-top: 24upx;
      margin-bottom: 30upx;
      // width: 750upx;
      height: 298upx;
      opacity: 1;
      background: #ffffff;

      .text {
        padding-top: 22upx;
        padding-left: 46upx;
        padding-bottom: 44upx;
        font-size: 28upx;
        color: #3d3d3d;
      }
      .service-detail {
        padding-left: 46upx;
        display: flex;

        .left {
          .img {
            width: 160upx;
            height: 160upx;
            border-radius: 10upx;
          }
        }
        .right {
          padding-left: 50upx;
          .name {
            font-size: 28upx;
            font-weight: 500;
            color: #3d3d3d;
          }
          .describe {
            padding-top: 6upx;
            padding-right: 176upx;
            padding-bottom: 80upx;
            font-size: 20upx;
            line-height: 34upx;
            color: #999999;
          }
        }
      }
    }
    .whiteboard {
      // width: 752upx;
      height: 136upx;
      opacity: 1;
      background: #ffffff;
      .date {
        padding-top: 52upx;
        padding-left: 46upx;
        padding-right: 32upx;
        display: flex;
        justify-content: space-between;
        .date-text {
          font-size: 28upx;
          color: #3d3d3d;
        }
        .time {
          font-size: 28upx;
          font-weight: 500;
          color: #ff8f1f;
        }
        .jump {
          width: 32upx;
          height: 32upx;
        }
      }
    }
    .explain {
      margin-top: 58upx;
      // width: 752upx;
      height: 356upx;
      opacity: 1;
      background: #ffffff;
      .explain-name {
        padding-left: 44upx;
        padding-top: 18upx;
        font-size: 28upx;
        color: #3d3d3d;
      }
      .explain-text {
        padding-top: 10upx;
        padding-left: 28upx;
        font-size: 24upx;
        color: #999999;
      }
    }
    .whiteboard1 {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      padding-left: 68upx;
      padding-right: 68upx;
      box-sizing: border-box;
      padding-top: 26upx;
      height: 118upx;
      background: #ffffff;
      .place-order {
        text-align: center;
        padding-top: 8upx;
        width: 100%;
        height: 64upx;
        border-radius: 60upx;
        background: #fa5151;
        font-size: 36upx;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>
