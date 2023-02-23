<template>
  <tui-popup
    :duration="500"
    :modeClass="['fade']"
    style="background: rgba(0, 0, 0, 0.8); z-index: 100000"
    :show="value"
    @click="$emit('input', false)"
  >
    <view class="popup-container">
      <view class="title">团蜂家居服务协议与隐私政策</view>
      <view class="text">
        感谢您使用团蜂家居APP，在您使用本软件过程中，我们可能会对您的部分个人信息进行收集、使用和共享。请您仔细阅读
        <text
          style="color: #ffc117"
          @click="go('/pages/service-agreement/service-agreement?from=/pages/index/index')"
          >《团蜂服务平台协议》</text
        >
        ，并确定完全了解我们对您个人信息的处理规则。如您同意《团蜂服务平台协议》，请点击“同意”开始使用，我们会尽全力保护您的个人信息安全。
      </view>
      <view class="btns">
        <button class="uni-btn cancel" @click="$emit('input', false)">不同意</button>
        <button class="uni-btn confirm" @click="$emit('input', false)">同意</button>
      </view>
    </view>
  </tui-popup>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      transShow: false,
      styles: {
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'background-color': 'rbga(0, 0, 0, 0.8)',
      },
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .tui-popup__transition {
  background-color: rgba(0, 0, 0, 0.8);
}
.popup-container {
  width: 600upx;
  height: 800upx;
  background-color: #fff;
  padding: 20upx 0;
  border-radius: 20upx;

  .title {
    height: 80upx;
    text-align: center;
    line-height: 80upx;
    font-size: 32upx;
    margin-bottom: 40upx;
  }

  .text {
    text-indent: 2em;
    width: 100%;
    height: 560upx;
    overflow: auto;
    padding: 0 30upx;
    box-sizing: border-box;
    line-height: 2;
    font-size: 28upx;
  }

  .btns {
    height: 140upx;
    padding: 20upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .uni-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
      border: 1upx solid rgb(255, 193, 23);
      color: rgb(255, 193, 23);
      font-size: 28upx;
      padding: 20upx 0;


      &.cancel{
        margin-right: 20upx;
        color: #ccc;
        border-color: #ccc;
      }
    }
  }
}
</style>
