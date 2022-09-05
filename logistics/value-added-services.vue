<template>
  <view class="value-added-services">
    <view class="header">
      <img
        class="back"
        @click="back"
        src="../static/images/common/back.png"
        alt=""
      />
      <view class="title">增值服务</view>
    </view>

    <view class="main">
      <view class="item" v-for="item in serveList" :key="item.title.label">
        <view class="title">{{ item.title.label }}</view>
        <view class="body">
          <radio-group
            class="group"
            @change="radioChange(item.title.field, $event)"
          >
            <label v-for="value in item.value" :key="value" class="label">
              <radio
                :value="value"
                :checked="serveForm[item.title.field] === value"
              />
              <view>{{ value }}</view>
            </label>
          </radio-group>
        </view>
      </view>
    </view>

    <button class="btn" @click="confirm">确定</button>
  </view>
</template>

<script>
import { serveList } from "./config";

export default {
  data() {
    return {
      serveList,
      serveForm: {},
    };
  },

  methods: {
    back() {
      uni.navigateBack();
    },

    radioChange(field, $event) {
      this.serveForm[field] = $event.detail.value;
    },

    confirm() {
      uni.setStorageSync("VALUE_ADDED_SERVICES", this.serveForm);
      uni.navigateBack()
    },
  },

  watch: {
    serveList: {
      handler(value) {
        const serve = uni.getStorageSync("VALUE_ADDED_SERVICES") || {
          controlGoods: "不控货",
          delivery: "送货安装",
          take: "不提货",
          valuation: "系统计价",
          payType: "现付",
        };

        if (value && value.length > 1) {
          for (const item of value) {
            this.serveForm[item.title.field] = serve[item.title.field];
          }
        }
      },

      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.value-added-services {
  padding: 60upx 24upx;
  background: linear-gradient(180deg, #3662ec, rgba(205, 225, 253, 0));

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

  .main {
    background-color: #fff;
    width: 99%;
    margin: 34upx auto 0;
    border-radius: 20upx;
    padding: 44upx;
    box-sizing: border-box;

    .item {
      display: flex;
      padding: 48upx 0;
      border-bottom: 1upx solid #d8d8d8;

      &:nth-child(1) {
        margin-top: 0;
      }

      &:last-child {
        border: none;
      }

      .title {
        color: #3d3d3d;
        font-size: 32upx;
        font-weight: bold;
        margin-right: 40upx;
      }

      .body {
        flex: 1;

        .group {
          display: flex;
          flex-wrap: wrap;

          .label {
            width: 50%;
            display: flex;
            text-align: left;
            align-items: center;
            margin: 20upx 0;

            &:nth-child(1),
            &:nth-child(2) {
              margin-top: 0;
            }

            /deep/ .uni-radio-input-checked,
            /deep/ .uni-radio-input.uni-radio-input-checked::before {
              background-color: #557aef !important;
            }
          }
        }
      }
    }
  }

  .btn {
    margin: 120upx auto 20upx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260upx;
    height: 72upx;
    background-color: #3662ec;
    border-radius: 10upx;
    color: #fff;
    font-size: 36upx;
  }
}
</style>