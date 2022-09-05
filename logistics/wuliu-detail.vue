<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="title">物流详情</view>
    </view>

    <view class="main">
      <img
        class="wuliu-img"
        src="https://img1.baidu.com/it/u=1015643622,1928101130&fm=253&fmt=auto&app=138&f=JPEG?w=947&h=500"
        alt=""
      />

      <view class="main-info">
        <view class="info">
          <view class="info-item">
            <img
              class="icon"
              src="../static/images/wuliu/user-blue.png"
              alt=""
            />
            <view class="text">联系人：</view>
            <view class="text">蔡智</view>
          </view>

          <view class="info-item">
            <img
              class="icon"
              src="../static/images/wuliu/phone-blue.png"
              alt=""
            />
            <view class="text">电话：</view>
            <view class="text" style="color: #3662ec">19877665544</view>
          </view>

          <view class="info-item">
            <img
              class="icon"
              src="../static/images/wuliu/local-blue.png"
              alt=""
            />
            <view class="text">地址：</view>
            <view class="text" style="color: #3662ec"
              >广东省佛山市顺德区乐从镇富饶
              物流园E座6物流园E座6物流园E座6-7仓</view
            >
          </view>
        </view>

        <button class="view-btn" @click="viewWarehouse">
          落货点（点击查看）
        </button>

        <view class="lines">
          <view class="title">专线</view>
          <view class="line">
            <text class="city">沈阳市</text>
            <text class="city">乌鲁木齐市乌鲁木齐市乌鲁木齐市乌鲁木齐市</text>
            <text class="city">辽宁市</text>
            <text class="city">曹县</text>
            <text class="city">北京</text>
            <text class="city">呼和浩特</text>
          </view>
        </view>

        <button class="order-btn" @click="toOrder">下单</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    back() {
      uni.navigateBack();
    },

    /**
     * 下单
     */
    toOrder() {
      uni.navigateTo({
        url: "/logistics/mail",
      });
    },

    /**
     * 查看落货点
     */
    viewWarehouse() {
      uni.navigateTo({
        url: "/logistics/warehouse",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  .text {
    color: #3d3d3d;
    font-size: 24upx;
    flex-shrink: 0;
    max-width: 440upx;
  }

  padding: 66upx 0;
  .header {
    display: flex;
    align-items: center;
    padding: 0 24upx;

    .back {
      width: 48upx;
    }

    .title {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      font-size: 32upx;
      font-weight: bold;
    }
  }

  .main {
    .wuliu-img {
      height: 420upx;
      width: 100%;
      margin-top: 40upx;
    }

    .main-info {
      padding: 0 22upx;

      .info {
        position: relative;
        width: 100%;
        background-color: #fff;
        box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.302);
        padding: 54upx 40upx;
        border-radius: 20upx;
        box-sizing: border-box;
        margin-top: -70upx;

        .info-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 32upx;

          &:last-child {
            margin: 0;
          }

          .icon {
            width: 36upx;
            margin-right: 20upx;
          }
        }
      }

      .view-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 72upx;
        margin: 26upx 0 60upx 0;
        border-radius: 20upx;
        background-color: #3662ec;
        color: #fff;
        font-size: 32upx;
      }

      .lines {
        .title {
          text-align: center;
          font-weight: bold;
          margin-bottom: 30upx;
        }

        .line {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          font-size: 0;

          .city {
            box-sizing: border-box;
            padding: 0 8upx;
            text-align: center;
            flex-shrink: 0;
            flex-wrap: wrap;
            width: 160upx;
            height: 64upx;
            line-height: 64upx;
            border: 1upx solid #999999;
            color: #000000;
            font-size: 24upx;
            border-radius: 10upx;
            margin: 10upx 4upx 10upx 4upx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .order-btn {
        width: 414upx;
        height: 80upx;
        margin-top: 120upx;
        background-color: #3662ec;
        color: #fff;
        font-size: 36upx;
        line-height: 80upx;
        border-radius: 40upx;
      }
    }
  }
}
</style>