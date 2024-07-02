<template>
  <view class="payment-container">
    <TuanPageHead title="扫码结算" background="#fff">
      <block slot="left">
        <tui-icon name="arrowleft" :size="64" unit="rpx" color="#222229" margin="0" @click=""></tui-icon>
      </block>
    </TuanPageHead>

    <view class="main">
      <view class="shop-info">
        <image class="shop-avatar" src="https://img2.baidu.com/it/u=560949573,2715140329&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1719594000&t=0781201bb1a033cbc735d0d2d6cf66ad"></image>
        <view class="shop-name-address">
          <view class="shop-name">文化社区店</view>
          <view class="shop-address">USD防护都是国际大厦光大卡户籍卡·1</view>
        </view>
      </view>

      <view class="pay-number-wrapper" style="z-index: 99999; position: relative; transition: box-shadow 300ms" :style="{ 'box-shadow': numberKeyBoardVisible ? '0 0 32rpx #ccc' : '' }">
        <view class="title">输入金额（元）</view>
        <view class="input-wrapper" @click="numberKeyBoardVisible = true">
          <view class="input-false" :class="{ focus: numberKeyBoardVisible, empty: !numberKeyBoardVisible && !payMentForm.payNumber }">
            {{ inputValue }}
          </view>
        </view>
      </view>
    </view>

    <view class="ben-wrapper">
      <button class="uni-btn" :class="{ disabled: !!payMentForm.payNumber }" :loading="isLoading" @click="handleConfirmPay">确认支付</button>
    </view>

    <!-- 数字键盘 -->
    <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="numberKeyBoardVisible" @close="numberKeyBoardVisible = false">
      <view style="background-color: #fff; height: 432rpx">
        <tui-digital-keyboard @confirm="numberKeyBoardVisible = false" @backspace="handleDelete" @click="handleInput" show buttonBackground="#f40" buttonText="确认"></tui-digital-keyboard>
      </view>
    </tui-bottom-popup>

    <!-- toast -->
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      numberKeyBoardVisible: false,
      payMentForm: {
        payNumber: ''
      },
      isLoading: false
    }
  },

  methods: {
    // 输入金额
    handleInput({ value }) {
      const payNumber = this.payMentForm.payNumber
      const hasDecimal = payNumber.includes('.')
      if (value === '.' && hasDecimal) {
        return
      }
      const decimalPart = hasDecimal ? payNumber.split('.')[1] : ''
      if (hasDecimal && decimalPart.length >= 2) {
        this.payMentForm.payNumber = payNumber.slice(0, -1) + value
      } else {
        this.payMentForm.payNumber += value
      }
    },

    handleDelete() {
      this.payMentForm.payNumber = this.payMentForm.payNumber.slice(0, -1)
    },

    handleConfirmPay() {
      if (!this.payMentForm.payNumber) {
        return this.ttoast({
          type: 'fail',
          title: '请输入支付金额'
        })
      }
      this.isLoading = true
    }
  },

  computed: {
    inputValue() {
      if (this.numberKeyBoardVisible) {
        return this.payMentForm.payNumber
      } else {
        return this.payMentForm.payNumber || '请输入支付金额'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes breath {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.payment-container {
  min-height: 100vh;
  background-color: #f6f6f6;

  .main {
    padding: 30rpx;
    box-sizing: border-box;

    .shop-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .shop-avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;
        margin-right: 20rpx;
      }

      .shop-name-address {
        flex: 1;

        .shop-name {
          font-size: 28rpx;
          color: #000;
          font-weight: 500;
          margin-bottom: 10rpx;
        }

        .shop-address {
          font-size: 24rpx;
          color: #3d3d3d;
        }
      }
    }

    .pay-number-wrapper {
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 40rpx;
      border-radius: 20rpx;

      .title {
        font-size: 28rpx;
        color: #000;
        font-weight: bold;
      }

      .input-wrapper {
        position: relative;
        padding-left: 40rpx;
        margin: 30rpx 0;
        border-bottom: 1rpx solid #ccc;
        padding-bottom: 10rpx;
        height: 40rpx;

        .input-false {
          font-size: 30rpx;
          display: inline-flex;
          height: 40rpx;

          &.focus {
            position: relative;

            &::after {
              content: '';
              position: absolute;
              height: 100%;
              width: 1rpx;
              background-color: #f40;
              right: -8rpx;
              // top: -34rpx;
              animation: breath 700ms linear infinite;
            }
          }

          &.empty {
            color: #ccc;
          }
        }

        &::after {
          content: '￥';
          font-size: 28rpx;
          font-weight: 500;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-22rpx);
        }
      }
    }
  }

  .ben-wrapper {
    position: fixed;
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30rpx;
    box-sizing: border-box;

    .uni-btn {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      background-color: #f40;
      color: #fff;
      font-size: 28rpx;
      letter-spacing: 0.1em;

      &.disabled {
        opacity: 0.8;
      }
    }
  }
}
</style>
