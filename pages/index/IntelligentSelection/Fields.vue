<template>
  <view class="fields-wrapper">
    <view class="selectBox" style="background-color:#fff;">
      <view class="tabNavs">
        <view class="tabItems isActive">
          全屋家具
        </view>
        <view class="tabItems" @click="go('/pages/index/WholeHouseQuickInstallation/WholeHouseQuickInstallation')">
          全屋快装
        </view>
      </view>
      <view class="wrapper" style="margin-top: 20rpx;">
        <view class="select item" @click="pickerShow = true">
          <view class="title">户型</view>

          <view class="value">
            <view class="select">
              <view class="value-text">{{ query.keyword }}</view>
              <tui-picker :show="pickerShow" :pickerData="pickerData" @hide="pickerShow = false" @change="change"></tui-picker>
              <tui-icon name="arrowdown" :size="20"></tui-icon>
            </view>
          </view>
        </view>

        <view class="item input">
          <view class="title">预算</view>

          <view class="value">
            <view class="input">
              <input type="text" placeholder="0" />
              <text class="value-text">元</text>
            </view>
          </view>
        </view>

        <!-- <view class="item input">
          <view class="title">面积</view>

          <view class="value">
            <view class="input">
              <input type="text" placeholder="0" />
              <text class="value-text">㎡</text>
            </view>
          </view>
        </view> -->
      </view>

      <!-- <view class="wrapper">
        <view class="select item">
          <view class="title">风格</view>

          <view class="value">
            <view class="select">
              <view class="value-text">全部风格</view>
              <tui-icon name="arrowdown" :size="20"></tui-icon>
            </view>
          </view>
        </view>

        <view class="item input">
          <view class="title">预算</view>

          <view class="value">
            <view class="input">
              <input type="text" placeholder="0" />
              <text class="value-text">元</text>
            </view>
          </view>
        </view>
      </view> -->
      <button class="uni-btn">智能匹配</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Fields',
  props: {
    query: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pickerShow: false,
      pickerData: [
        {
          text: "公寓",
          value: "001"
        }, {
          text: "一房一厅",
          value: "002"
        }, {
          text: "二房一厅",
          value: "003"
        }, {
          text: "三房一厅",
          value: "004"
        }, {
          text: "四房一厅",
          value: "005"
        }, {
          text: "三房二厅",
          value: "006"
        }, {
          text: "客厅",
          value: "007"
        }, {
          text: "卧室",
          value: "008"
        }, {
          text: "餐厅",
          value: "9"
        }
      ]
    }
  },
  methods: {
    change(value) {
      // console.log(value);
      this.query.keyword = value.text
      this.pickerShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.selectBox {
  overflow: hidden;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding-bottom: 31rpx;
  // padding: 50rpx 26rpx 31rpx 26rpx;
  .tabNavs {
    display: flex;
    .tabItems {
      box-sizing: border-box;
      width: 200rpx;
      height: 68rpx;
      padding: 16rpx 36rpx;
    }
    .isActive {
      background: #EF5511;
      color: #fff;
    }
  }
}
.fields-wrapper {
  // padding: 20upx;
  box-sizing: border-box;
  padding: 31rpx;
  padding-bottom: 0;
  // border-radius: 0 0 24upx 24upx;

  .wrapper {
    box-sizing: border-box;
    padding: 0rpx 26rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    margin-bottom: 20upx;

    .item {
      display: flex;
      align-items: center;
      width: 308rpx;
      height: 74rpx;
      border-radius: 4rpx;
      // background-color: #f6f6f5;
      // border-radius: 16upx;
      padding: 17rpx 14rpx 17rpx 22rpx;
      box-sizing: border-box;
      border: 2rpx solid #979797;

      .title {
        color: #8f8d85;
        font-size: 28upx;
        padding-right: 24upx;
        margin-right: 24upx;
        border-right: 1upx solid #d5d4d1;
      }

      .value {
        flex: 1;

        .select,
        .input {
          display: flex;
          align-items: center;
          justify-content: space-between;

          input {
            text-align: right;
            margin-right: 8upx;
          }

          .value-text {
            color: #8f8d85;
            font-size: 28upx;
          }
        }
      }

      &.select {
        // width: 384upx;
      }

      &.input {
        width: 300upx;
      }
    }
  }

  .uni-btn {
    margin: 0 auto;
    width: 637rpx;
    height: 88rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20rpx 48rpx;
    gap: 19.999998092651367rpx;
    background: #EF530E;
    font-size: 32rpx;
    font-weight: normal;
    line-height: 48rpx;
    text-align: center;
    color: #FFFFFF;
  }
}
</style>
