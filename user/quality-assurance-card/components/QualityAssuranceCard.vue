<template>
  <view
    class="quality-assurance-card-component-container"
    v-if="info"
    :style="{ background: cardStatusInfo.color }"
    @click="jump && go('/user/quality-assurance-card/quality-assurance-card-detail?id=' + info.id)"
  >
    <view class="item-header flex-items flex-sp-between">
      <image class="card-title" src="../../../static/images/new-user/quality-assurance-card/card-light.png"></image>
      <image class="status-icon" :src="cardStatusInfo.icon"></image>
    </view>
    <view class="sub-title">保修期至</view>
    <view class="time">{{ info.expireDate }}</view>
    <view class="info-wrapper flex-items flex-sp-between">
      <view class="info-item">
        <view class="label">质保服务类型</view>
        <view class="value">{{ info.type }}</view>
      </view>
      <view class="info-item">
        <view class="label">保修周期</view>
        <view class="value">{{ info.validityPeriod }} 天</view>
      </view>
      <view class="info-item">
        <view class="label">质保编号</view>
        <view class="value">{{ info.serialNumber }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCurrentStatusInfo } from '../config'
export default {
  props: {
    info: {
      type: Object,
      required: true
    },

    jump: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cardStatusInfo() {
      const res = getCurrentStatusInfo(this.info ? this.info.status : 1)
      this.$emit('set-btn', res)
      return res
    }
  }
}
</script>

<style lang="less" scoped>
.quality-assurance-card-component-container {
  width: 100%;
  height: 270rpx;
  padding: 18rpx 15rpx 17rpx 26rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  margin-top: 30rpx;

  .item-header {
    .card-title {
      width: 111rpx;
      height: 40rpx;
    }

    .status-icon {
      width: 111rpx;
      height: 54rpx;
    }
  }

  .sub-title {
    text-align: center;
    font-size: 24rpx;
    color: #fff;
    margin: 10rpx 0;
    line-height: 1.1;
  }

  .time {
    text-align: center;
    font-size: 32rpx;
    color: #fff;
    font-weight: 700;
    line-height: 1.1;
  }

  .info-wrapper {
    margin-top: 30rpx;
    .info-item {
      flex: 1;
      color: #fff;
      font-size: 20rpx;
      text-align: center;

      &:nth-child(1) {
        text-align: left;
      }

      .value {
        font-size: 24rpx;
        font-weight: blod;
        margin-top: 11rpx;
      }
    }
  }
}
</style>
