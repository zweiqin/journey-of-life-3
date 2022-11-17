<template>
  <view class="discount-container" v-show="value">
    <view class="mask-wrapper">
      <view
        class="main-container animate__animated animate__bounceIn"
        :style="{
          transform: `translateY(${value ? 0 : '-100%'})`,
        }"
      >
        <image
          class="top-img"
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/dhhnb4dom2odxgkpuvf0.png"
          mode="aspectFit"
        />
        <view class="main">
          <view class="item" v-for="serve in serveList" :key="serve.name">
            <view class="item-left">
              <view
                ><text class="item-price">{{ serve.price }}元</text>/年</view
              >
              <view>含{{ serve.serveCount }}项服务</view>
            </view>
            <view class="item-right">
              <view class="vip-name">{{ serve.label }}</view>
              <view class="desc">{{ serve.desc }}</view>
            </view>
          </view>

          <button class="uni-btn" @click="handleToViewDetail">
            <img
              class="img"
              src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/4acgbw7ipm2pjoa9dvix.png"
              alt=""
            />
          </button>

          <view class="desc">服务明细使用说明</view>

          <JIcon type="prices" class="icon"></JIcon>
        </view>
      </view>

      <JIcon
        @click="$emit('input', false)"
        style="margin-top: 30upx"
        type="mask-close"
        width="100"
        height="100"
      ></JIcon>
    </view>
  </view>
</template>

<script>
import { serveList } from "./config";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      serveList,
    };
  },

  methods: {
    handleToViewDetail() {
      uni.navigateTo({
        url: "/community-center/vip-center/vip-detail",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.discount-container {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 28upx;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-color: rgba($color: #626262, $alpha: 0.74);
  /* box-sizing: border-box; */
  z-index: 1000;
  overflow: scroll;
  padding-bottom: 100upx;
  box-sizing: border-box;

  .mask-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-top: 50upx;
  }

  .main-container {
    width: 660upx;
    margin: 0 auto;
    background-color: #fa5151;
    border-radius: 20upx;
    margin-bottom: 20px;
    transform: translateY(-100%);
    transition: all 350ms -20ms;

    .top-img {
      width: 100%;
    }

    .main {
      position: relative;
      padding: 0 40upx;
      /* padding-bottom: 20upx; */
      box-sizing: border-box;
      top: -66upx;
      margin-bottom: -40upx;

      .item {
        width: 100%;
        height: 180upx;
        background-color: #ffffff;
        border-radius: 10upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30upx;

        &-left {
          position: relative;
          width: 208upx;
          height: 100%;
          /* background-color: #51fa6d; */
          border-right: 2px dotted #f6be86;
          /* padding: 36upx 28upx 36upx 30upx; */
          /* box-sizing: border-box; */
          display: flex;
          flex-direction: column;
          justify-content: center;

          &::before {
            position: absolute;
            content: "";
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #fa5151;
            top: -6px;
            right: -7px;
          }

          &::after {
            position: absolute;
            content: "";
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #fa5151;
            bottom: -6px;
            right: -7px;
          }
          view {
            &:nth-child(1) {
              margin-bottom: 10upx;
            }
          }

          .item-price {
            font-size: 38upx;
            color: #fa5151;
            font-weight: 500;
          }
        }

        &-right {
          flex: 1;
          height: 100%;
          /* background-color: aqua; */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .vip-name {
            font-size: 38upx;
            font-weight: bold;
          }

          .desc {
            color: #999;
            margin-top: 10upx;
          }
        }
      }

      .uni-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(
          360deg,
          #fff8c6 0%,
          #ffd100 0%,
          #fff8c6 81%
        );
        height: 96upx;
        border-radius: 100px;

        .img {
          height: 50upx;
        }
      }

      .desc {
        color: #fff;
        margin-top: 30upx;
        text-align: center;
      }

      .icon {
        position: absolute;
        bottom: -116upx;
        right: 10px;
        width: 114upx;
        height: 155upx;
      }
    }
  }
}
</style>
