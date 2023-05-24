<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="show" @close="handleClose">
    <view class="popup-container">
      <view class="close-container" @click="handleClose">
        <tui-icon :size="24" name="close"></tui-icon>
      </view>

      <view class="pay-price">
        <text class="tag">￥</text>
        <text>459</text>
      </view>

      <tui-list-view unlined="all">
        <tui-list-cell unlined padding="20rpx 0" :hover="false" :arrow="false">
          <view class="item">
            <view class="title">用户id</view>
            <view class="value">{{ userId }}</view>
          </view>
        </tui-list-cell>

        <tui-list-cell unlined padding="20rpx 0" :hover="false" :arrow="false">
          <view class="item">
            <view class="title">订单号</view>
            <view class="value">{{ orderNo }}</view>
          </view>
        </tui-list-cell>

        <tui-list-cell unlined padding="20rpx 0" :hover="false" :arrow="false">
          <view class="item">
            <view class="title">支付方式</view>
            <view class="value">微信支付</view>
          </view>
        </tui-list-cell>
      </tui-list-view>
      <!-- <wx-open-launch-weapp id="lauch-btn" class="uni-btn" username="gh_e64a1a89a0ad" type="0" :path="path">
				<script type="text/wxtag-template">
					<style> .btn{color: #fff; font-size: 12px;} </style>
              <button class="btn">确认支付</button>
              </script>
			</wx-open-launch-weapp> -->

      <button class="uni-btn" @click="handleToMiniprogram">确认支付</button>
    </view>
  </tui-bottom-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      payPrice: 0,
      userId: 0,
      orderNo: 0,
      type: 'shop',
      path: ''
    }
  },

  methods: {
    // 点击打开
    showPopup({
      payPrice,
      userId,
      orderNo,
      type,
      path
    }) {
      this.show = true
      this.payPrice = payPrice
      this.userId = userId
      this.orderNo = orderNo
      this.type = type
      this.path = path

      console.log(this.path);
    },

    // 点击关闭
    handleClose() {
      // this.$emit('close', () => {
      // 	this.show = false
      // })

      this.show = false
    },

    // 点击去支付
    handleToMiniprogram() {
      wx.miniProgram.postMessage({ data: this.path })
      wx.miniProgram.navigateTo({ url: '/pages/loading/loading?path=' + this.path.replace('?', 'dwh') })
    }
  },
}
</script>

<style lang="less" scoped>
.popup-container {
  padding: 20upx 30upx;
  background-color: #fff;

  .close-container {
    text-align: right;
  }

  .pay-price {
    text-align: center;
    margin: 40upx 0;
    font-size: 80upx;
    font-weight: bold;

    .tag {
      font-size: 60upx;
    }
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 28upx;
      color: #6a6a6a;
    }
  }

  .uni-btn {
    height: 92upx;
    line-height: 92upx;
    width: 100%;
    border-radius: 10upx;
    background-color: #ffcb05;
    font-size: 28upx;
    color: #fff;
    transition: all 350ms;
    margin-top: 90upx;
    display: block;
    text-align: center;

    &:active {
      opacity: 0.6;
    }
  }
}
</style>