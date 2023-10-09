<template>
  <view>
    <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="cancelOrderPopupVisible" @close="handleCancel">
      <view class="cancel-order-popup-container">
        <view class="cancel-order-header">
          <view class="title">取消订单</view>
          <tui-icon @click="handleCancel" :size="26" name="close"></tui-icon>
        </view>

        <view class="order-info">
          <tui-textarea v-model="cancelOrderForm.cancelMessage" :radius="20" isCounter backgroundColor="#f6f6f6"
            :borderTop="false" :borderBottom="false" :size="28" placeholder="请输入取消订单原因"></tui-textarea>

          <button class="uni-btn cancel-btn" :loading="isCancelLoading" @click="handleCancelOrder">确定取消</button>
        </view>
      </view>
    </tui-bottom-popup>

    <tui-toast ref="toast"></tui-toast>

  </view>
</template>

<script>
import { cancelBOrderApi } from '../../../api/community-center'
export default {
  data() {
    return {
      cancelOrderPopupVisible: false,
      orderDteail: null,
      isCancelLoading: false,
      cancelOrderForm: {
        orderNo: "",
        cancelMessage: ""
      }
    }
  },

  methods: {
    show(orderDteail) {
      if (!orderDteail) {
        this.ttoast({
          type: "info",
          title: "数据错误",
          content: '请稍后重试'
        })
        return
      }

      this.orderDteail = orderDteail
      this.cancelOrderForm.orderNo = this.orderDteail.orderNo
      this.cancelOrderPopupVisible = true
    },
    handleCancel() {
      this.orderDteail = null
      this.cancelOrderForm.cancelMessage = ''
      this.cancelOrderForm.orderNo = undefined
      this.cancelOrderPopupVisible = false
    },

    // 取消订单
    async handleCancelOrder() {
      if (this.isCancelLoading) {
        this.ttoast({
          type: 'info',
          title: "订单取消中",
          content: "请勿重复操作"
        })
        return
      }
      if (!this.cancelOrderForm.cancelMessage) {
        this.ttoast({
          type: 'fail',
          title: "请输入订单取消原因"
        })
        return
      }
      try {
        this.isCancelLoading = true

        await cancelBOrderApi(this.cancelOrderForm)
        this.ttoast('订单取消成功')
        this.handleCancel()
        this.$emit('success')
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: "订单取消失败",
          content: error
        })
      } finally {
        this.isCancelLoading = false
      }
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .tui-textarea__wrap {
  border-radius: 20upx;
}

.cancel-order-popup-container {
  padding: 20UPX;
  box-sizing: border-box;

  .cancel-order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30upx;

    .title {
      font-size: 32upx;
      font-weight: 500;

    }
  }

  .cancel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80upx;
    background-color: rgb(255, 193, 23);
    margin-top: 40upx;
    color: #fff;
    font-size: 28upx;
  }
}
</style>