<template>
  <view class="brand-info-container" v-if="data">
    <view class="name-info-wrapper">
      <image class="avatar" :src="data.logo" mode="" />

      <view class="info">
        <view class="name-container">
          <view class="name">{{ data.name }}</view>
          <view class="order">31.7k人已订阅</view>
        </view>

        <view class="desc">
          <text>{{ data.text1 }}</text>
          <text>{{ data.text2 }}</text>
          <text>{{ data.text3 }}</text>
        </view>
      </view>
    </view>

    <view class="merit-container">
      <div class="item" v-for="(item, index) in meritData" :key="index">
        <image class="icon" :src="item.icon" mode="" />
        <text>{{ item.label }}</text>
      </div>
    </view>

    <view class="more">
      查看详情 <tui-icon name="arrowright" :size="20"></tui-icon>
    </view>
  </view>
</template>

<script>
import { meritData } from '../data'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      meritData: Object.freeze(meritData),
    }
  },
}
</script>

<style lang="less" scoped>
.brand-info-container {
  background-color: #fff;
  border-radius: 24upx;
  box-sizing: border-box;
  padding: 20upx;
  margin-top: -152upx;

  .name-info-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .avatar {
      position: relative;
      top: -52upx;
      width: 158upx;
      height: 158upx;
      border-radius: 50%;
      flex-shrink: 0;
      margin-right: 24upx;
      padding: 2upx;
    }

    .info {
      flex: 1;

      .name-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          font-size: 34upx;
          color: #141000;
          font-weight: bold;
        }

        .order {
          font-size: 24upx;
          color: #8f8d85;
        }
      }

      .desc {
        margin-top: 10upx;
        text {
          padding: 0 16upx;
          border-right: 1upx solid #b3b2ad;
          font-size: 24upx;
          color: #3a3629;

          &:nth-child(1) {
            padding-left: 0;
          }

          &:nth-child(3) {
            border-right: none;
          }
        }
      }
    }
  }

  .merit-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .icon {
        width: 48upx;
        height: 48upx;
      }

      text {
        font-size: 24upx;
        margin-top: 20upx;
      }
    }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #8f8d85;
    font-size: 24upx;
    margin-top: 64upx;
  }
}
</style>
