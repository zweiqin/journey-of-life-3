<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="payMethodVisible" @close="handleClosePayMethod">
    <view class="add-serve-main">
      <PopupHeader @cancel="handleClosePayMethod" @confirm="handleChoosePayMethod">
        <view class="popup-title">支付方式</view>
      </PopupHeader>

      <view class="shop-site-list">
        <scroll-view scroll-y class="scroll-view">
          <view class="site-item" :style="{ color: currentPayType == 2 ? '#EF530E' : '#DCDDDD' }"
            @click="handleChoose(2)">
            微信支付
            <tui-icon class="check" :size="20" name="circle-fill" :color="currentPayType == 2 ? '#EF530E' : '#DCDDDD'">
            </tui-icon>
          </view>

          <view class="site-item" @click="handleChoose(1)"
            :style="{ color: currentPayType == 1 ? '#EF530E' : '#DCDDDD' }">
            余额
            <tui-icon class="check" :size="20" name="circle-fill" :color="currentPayType == 1 ? '#EF530E' : '#DCDDDD'">
            </tui-icon>
          </view>
        </scroll-view>
      </view>
    </view>
  </tui-bottom-popup>
</template>

<script>
import PopupHeader from './PopupHeader.vue'
export default {
  components: {
    PopupHeader
  },

  data() {
    return {
      payMethodVisible: false,
      currentPayType: ''
    }
  },

  methods: {
    show(payType) {
      this.currentPayType = payType
      this.payMethodVisible = true
    },

    handleClosePayMethod() {
      this.payMethodVisible = false
    },

    // 确认选择服务
    handleChoosePayMethod() {
      this.$emit('confirm', this.currentPayType)
      this.handleClosePayMethod()
    },

    // 选择支付方式
    handleChoose(payType) {
      this.currentPayType = payType
    }
  },
}
</script>

<style lang="less" scoped>
.add-serve-main {
  background-color: #fff;
  height: 300upx;

  .popup-title {
    color: #222229;
    font-size: 32upx;
  }

  .shop-site-list {
    height: 200upx;

    .scroll-view {
      height: 200upx;

      .site-item {
        position: relative;
        width: 100%;
        height: 96upx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #DCDDDD;

        transition: all 350ms;

        &:active {
          background-color: #f3f3f3;
        }

        .check {
          position: absolute;
          right: 32upx;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>