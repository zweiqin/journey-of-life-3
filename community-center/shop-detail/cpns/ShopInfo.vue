<template>
  <view class="shop-info" v-if="data">
    <view class="base-info">
      <image class="avatar"
        src="../../../static/images/new-user/fee.icon.png"></image>
      <view class="info">
        <view class="master-name">{{ data.dzName }}</view>
        <view class="other">
          <view class="tag">区域店长</view>
          <tui-rate class="rate-cpn" :size="20" :current="5"></tui-rate>
          <text class="text-fen">5.0分</text>
        </view>
      </view>
    </view>

    <view class="ship-address">团蜂家居社区服务中心</view>
    <view class="detail-address">
      <view class="address">{{ data.shopName }}</view>
      <view class="No">编号：{{ data.NO }}</view>
    </view>

    <view class="serve-time">
      服务时间：08:30-18:30（周一至周日）
    </view>

    <view class="footer">
      <view class="left">
        <text class="detail-address"><text class="distance">距您8.22km</text>{{ data.address }}</text>
      </view>

      <view class="right">
        <view class="item" @click="handleNavigate">
          <image class="icon" src="../../../static/images/con-center/shop-detail/location.png"></image>
          <text class="icon-title">导航</text>
        </view>

        <view class="item" @click="callDz">
          <image class="icon" src="../../../static/images/con-center/shop-detail/phone.png"></image>
          <text class="icon-title">电话</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getLngLatByAddress, navigationAddress } from '../../../utils/localtion'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    // 给店长打电话
    callDz() {
      uni.makePhoneCall({
        phoneNumber: this.data.mobile
      });
    },

    // 导航
    handleNavigate() {
      getLngLatByAddress(this.data.address)
        .then(res => {
          navigationAddress(res.geocodes[0].location)
        })
        .catch(err => {
          console.log(err)
          uni.showToast({
            title: '导航失败',
            icon: 'none',
          })
        })
    },
  },
}
</script>

<style lang="less" scoped>
.shop-info {
  padding: 33upx 38upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20upx;

  .base-info {
    display: flex;
    align-items: center;
    margin-bottom: 30upx;

    .avatar {
      width: 120upx;
      height: 120upx;
      border-radius: 50%;
      margin-right: 26upx;
      flex-shrink: 0;
    }

    .info {
      .master-name {
        color: #1C2023;
        font-size: 32upx;
      }

      .other {
        display: flex;
        align-items: center;
        margin-top: 10upx;

        .tag {
          line-height: 1.5;
          padding: 0 15upx;
          border-radius: 100px;
          font-size: 20upx;
          color: #fff;
          background: linear-gradient(252deg, #FFC117 19%, #E95D20 63%);
        }

        .rate-cpn {
          margin: 0 22upx 0 22upx;
        }

        .text-fen {
          color: #3D3D3D;
          font-size: 24upx;
        }
      }
    }
  }

  .detail-address .address,
  .ship-address {
    font-size: 32upx;
    color: #000000;
    font-weight: 500;
    margin: 10upx 0;
  }

  .detail-address {
    display: flex;
    align-items: center;
    margin-bottom: 10upx;

    .No {
      font-size: 24upx;
      line-height: 1.5;
      color: #E95D20;
      padding: 5upx 20upx;
      border: 1upx solid #E95D20;
      margin-left: 20upx;
      border-radius: 10upx;
    }
  }

  .serve-time {
    color: #777777;
    font-size: 24upx;
  }

  .footer {
    display: flex;
    align-items: flex-start;
    margin-top: 16upx;
    font-size: 28upx;
    color: #3d3d3d;


    .left {
      flex: 4;
      display: flex;
      align-items: center;
      margin-right: 10upx;

      .distance {
        position: relative;
        margin-right: 12upx;
        padding-right: 12upx;

        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 1upx;
          height: 20upx;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background-color: #3D3D3D;
        }
      }
    }

    .right {
      flex: 1;

      display: flex;
      align-items: center;


      .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &:nth-of-type(1) {
          margin-right: 12upx;
          padding-right: 12upx;

          &::after {
            content: '';
            display: block;
            position: absolute;
            width: 1upx;
            height: 66upx;
            background-color: #B3B2AD;
            right: 0;
            top: 12upx;
          }
        }

        .icon {
          width: 48upx;
          height: 48upx;
        }

        .icon-title {
          color: #777;
          font-size: 24upx;
        }
      }
    }
  }

}
</style>