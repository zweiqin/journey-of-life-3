<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="showCancelOrderPopup" @close="showCancelOrderPopup = false">
    <!-- 取消订单 -->
    <view class="cancel-order-container" v-if="orderInfo">
      <view class="order-info">
        <view class="item">订单号：{{ orderInfo.orderNo }}</view>
        <view class="item">服务内容：{{ orderInfo.dictName }}</view>
        <view class="item">期望上门时间：{{ orderInfo.installDate || '未指定' }}</view>
      </view>

      <view class="tip">请选择取消订单原因</view>

      <view class="reason-list">
        <view class="rason-item">
          <view class="item-wrapper" @click="handleChooseReason('订单下错了')">
            <tui-icon
              size="26"
              :color="currentReason === '订单下错了' ? '#ef5613' : ''"
              :name="currentReason === '订单下错了' ? 'circle-fill' : 'circle'"
            ></tui-icon>
            <view class="reason-text">订单下错了</view>
          </view>
        </view>

        <view class="rason-item">
          <view class="item-wrapper" @click="handleChooseReason('订单取消了')">
            <tui-icon
              size="26"
              :color="currentReason === '订单取消了' ? '#ef5613' : ''"
              :name="currentReason === '订单取消了' ? 'circle-fill' : 'circle'"
            ></tui-icon>
            <view class="reason-text">订单取消了</view>
          </view>
        </view>

        <view class="rason-item">
          <view class="item-wrapper" @click="handleChooseReason('其他')">
            <tui-icon size="26" :color="currentReason === '其他' ? '#ef5613' : ''" :name="currentReason === '其他' ? 'circle-fill' : 'circle'"></tui-icon>
            <view class="reason-text">其他</view>
          </view>

          <tui-textarea
            v-model.trim="otherReason"
            v-if="currentReason === '其他'"
            isCounter
            placeholder="请输入订单取消原因"
            :size="28"
            backgroundColor="#f6f6f6"
          ></tui-textarea>
        </view>
      </view>

      <button class="uni-btn" @click="handleCancelOrder" :loading="isLoading">确认取消</button>

      <tui-toast ref="toast"></tui-toast>
    </view>
  </tui-bottom-popup>
</template>

<script>
import { cancelOrderApi } from '../../../api/community-center';
import { getUserId } from '../../../utils';

export default {
  data() {
    return {
      showCancelOrderPopup: false,
      orderInfo: null,
      currentReason: '订单下错了',
      isLoading: false,
      otherReason: '',
      timer: null
    };
  },

  methods: {
    show(data) {
      if (!data) return;
      this.orderInfo = data;
      this.showCancelOrderPopup = true;
    },

    handleChooseReason(reason) {
      this.currentReason = reason;
    },

    // 取消订单
    async handleCancelOrder() {
      try {
        this.isLoading = true;
        const query = {
          userId: getUserId(),
          id: this.orderInfo.id
        };

        if (this.currentReason === '其他') {
          if (!this.otherReason) {
            this.ttoast({
              type: 'info',
              title: '请输入取消订单原因'
            });

            return;
          } else {
            query.cancelRemarks = this.otherReason;
          }
        } else {
          query.cancelRemarks = this.currentReason;
        }

        const res = await cancelOrderApi({ ...query });
        if (res.statusCode === 20000) {
          this.ttoast({
            title: '订单取消成功'
          });
          this.timer = setTimeout(() => {
            this.$emit('success');
            this.showCancelOrderPopup = false;
          }, 1000);
        } else {
          this.ttoast({
            type: 'fail',
            title: res.statusMsg || '订单取消失败'
          });
        }
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: error || '订单取消失败'
        });
      } finally {
        this.isLoading = true;
      }
    },

    // 清空status
    clearStatus() {
      this.orderInfo = null;
      this.isLoading = false;
      this.otherReason = '';
      this.currentReason = '订单下错了';
      clearTimeout(this.timer);
      this.timer = null;
    }
  },

  watch: {
    showCancelOrderPopup(visible) {
      if (!visible) {
        this.clearStatus();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cancel-order-container {
  min-height: 800upx;
  width: 100vw;
  background-color: #fff;
  border-radius: 20upx 20upx 0 0;
  padding: 40upx;
  box-sizing: border-box;

  .order-info {
    padding: 10upx 20upx;
    border-radius: 20upx;
    box-sizing: border-box;
    background-color: #f6f6f6;
    margin: 20upx 0;

    .item {
      color: #ccc;
      font-size: 28upx;
      color: #999999;
      line-height: 2;
    }
  }

  .tip {
    padding: 20upx 0;
    margin-top: 20upx;
    font-size: 28upx;
    color: #000;
    font-weight: 500;
  }

  .reason-list {
    .rason-item {
      .item-wrapper {
        height: 100upx;
        display: flex;
        align-items: center;
        border-top: 1upx solid #f6f6f6;
        font-size: 28upx;
        color: #000;

        .reason-text {
          margin-left: 10upx;
        }
      }
    }
  }

  .uni-btn {
    width: 100%;
    height: 80upx;
    background-color: #ef5613;
    margin-top: 40upx;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 28upx;
    justify-content: center;
  }
}

/deep/ .tui-textarea__wrap {
  border-radius: 20upx;
  overflow: hidden;
}
</style>
