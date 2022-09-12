<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">查件</view>
    </view>

    <view class="order-info item">
      <view class="status-item">
        <view class="status active">
          <view class="status-text">已签收</view>
          <view class="time">08-17 10：55</view>
        </view>

        <view>您的快递已签收，签收人：白大拿</view>
        <view
          >快递已送达，如有疑问请联系：13800138000 投诉电话：13800138000</view
        >
      </view>

      <view class="status-item">
        <view class="status">
          <view class="status-text">目的地</view>
          <view class="time">龙江镇亚洲国际材料城团蜂科技</view>
        </view>

        <view>收件人：白大拿 138****3800</view>
      </view>
    </view>

    <view class="wuliu item">
      <view class="info">
        <img
          src="https://img2.baidu.com/it/u=3983407723,1226789869&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
          class="avatar"
        />

        <view class="orderNo">德邦物流 LB1545492521669</view>

        <view class="op">
          <text class="copy" @click="copy">复制</text>
          <a href="javascript:;" @click="call('19877665544')" class="phone">打电话</a>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    // 点击复制
    copy() {
      uni.setClipboardData({
        data: "单号",
        success: function (res) {
          uni.showToast({
            title: "复制成功",
          });
        },
      });
    },

    // 返回
    back() {
      uni.navigateBack();
    },

    /**
     * @description 点击打电话
     */
    call(mobile){
      if(!mobile) return 
      uni.makePhoneCall({
        phoneNumber: mobile,
      })
    }
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  padding: 30upx 26upx;
  height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(180deg, #00b578 0%, #ffffff 100%);

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

  .item {
    width: 100%;
    padding: 38upx 32upx;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 20upx;
    margin-top: 26upx;
  }

  .order-info {
    font-size: 28upx;
    color: #3d3d3d;
    line-height: 40upx;

    .status {
      &-item {
        padding-left: 50upx;
        margin-top: 26upx;

        .status {
          display: flex;
          position: relative;
          margin-bottom: 20upx;
          font-weight: bold;

          &.active {
            color: #fa5151;

            &::before {
              background-color: #fa5151;
              border-color: #fa5151;
            }
          }

          &::before {
            position: absolute;
            content: "";
            display: block;
            left: -54upx;
            width: 32upx;
            height: 32upx;
            border-radius: 50%;
            border: 1upx solid #999999;
          }

          .status-text {
            margin-right: 36upx;
          }
        }
      }
    }
  }

  .wuliu {
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24upx;

      .avatar {
        width: 50upx;
        height: 50upx;
        border-radius: 50%;
        margin-right: 26upx;
      }

      .orderNo {
        flex: 1;
      }
    }
  }

  .op {
    .copy {
      padding-right: 20upx;
      border-right: 1upx solid #999999;
      margin-right: 20upx;
    }

    .phone {
      color: #3d3d3d;
      text-decoration: none;
    }
  }
}
</style>