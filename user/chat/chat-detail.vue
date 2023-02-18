<template>
  <view class="chat-detail">
    <view class="header-container" :class="{ fixed: scrollTop > 100 }">
      <view class="kefu-conatiner">
        <image
          @click="handleBack"
          class="back-icon"
          src="../../static/images/user/back.png"
          mode=""
        />
        <image
          class="avatar"
          src="https://img0.baidu.com/it/u=2477829979,2171947490&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          mode=""
        />
        <text class="kefu-name">客服1号</text>
      </view>

      <view class="tip">回复中...</view>
    </view>

    <view class="message-wrapper">
      <!-- <view class="time-slot">
        <view class="time-wrapper"> <text class="time">10:26</text> </view>

        <view class="kefu-wrapper">
          <view class="words">您好！有什么可以帮到您的吗？</view>
        </view>
        <view class="my-wrapper"><view class="words">没有，再见</view></view>
      </view> -->
    </view>

    <view class="op-footer">
      <view class="send-wrapper">
        <input
          type="text"
          v-model="words"
          placeholder="请输入..."
          @confirm="handleSendMessage"
          confirm-type="send"
        />
      </view>

      <image
        @click="handleSendImg"
        class="upload-img"
        src="../../static/images/user/up-img.png"
        mode=""
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      words: '',
      scrollTop: 0,
    }
  },
  methods: {
    // 点击发送消息
    handleSendMessage() {
      if (!this.words) {
        uni.showToast({
          title: '请输入消息',
          icon: 'none',
          duration: 2000,
        })
      }
    },

    // 点击选择图片
    handleSendImg() {
      //  uni.chooseImage({
      //   success: (chooseImageRes) => {
      //     const tempFilePaths = chooseImageRes.tempFilePaths;
      //     uni.uploadFile({
      //       url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
      //       filePath: tempFilePaths[0],
      //       name: 'file',
      //       formData: {
      //         'user': 'test'
      //       },
      //       success: (uploadFileRes) => {
      //         console.log(uploadFileRes.data);
      //       }
      //     });
      //   }
      //  });
    },

    // 回退
    handleBack(){
      uni.navigateTo({
         url: '/user/chat/chat'
      });
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
}
</script>

<style lang="less" scoped>
.chat-detail {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f5;

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 120upx;
    background-color: #fff;
    border-radius: 0 0 48upx 48upx;
    padding: 32upx;
    box-sizing: border-box;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    .kefu-conatiner {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .back-icon {
        width: 24upx;
        height: 48upx;
      }

      .avatar {
        width: 80upx;
        height: 80upx;
        border-radius: 50%;
        margin: 0 16upx 0 32upx;
      }

      .kefu-name {
        color: #3a3629;
        font-size: 28upx;
      }
    }

    .tip {
      text-align: center;
      line-height: 56upx;
      width: 140upx;
      height: 56upx;
      border-radius: 100upx;
      background-color: #f3f3f2;
      font-size: 24upx;
      color: #8f8d85;
    }
  }

  .message-wrapper {
    padding: 32upx;
    box-sizing: border-box;
  }

  .time-slot {
    .time-wrapper {
      text-align: center;
      margin: 20upx 0;

      .time {
        margin: 0 auto;
        display: inline-block;
        padding: 7upx 24upx;
        line-height: 42upx;
        background-color: #fff;
        border-radius: 100px;
        color: #8f8d85;
      }
    }

    .words {
      padding: 24upx;
      box-sizing: border-box;
      font-size: 28upx;
      line-height: 42upx;
      background: #fff;
      clear: both;
    }

    .kefu-wrapper {
      .words {
        float: left;
        border-radius: 0px 24px 24px 24px;
      }
    }

    .my-wrapper {
      .words {
        float: right;
        background-color: #fff1ca;
        border-radius: 24px 0 24px 24px;
      }
    }
  }

  .op-footer {
    position: fixed;
    bottom: 0;
    padding: 32upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .send-wrapper {
      flex: 1;
      background-color: brown;
      background-color: #fff;
      border-radius: 100upx;
      height: 80upx;
      display: flex;
      align-items: center;
      padding: 20upx 30upx;
      box-sizing: border-box;

      input {
        width: 100%;
      }
    }

    .upload-img {
      width: 64upx;
      height: 64upx;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 32upx;
      flex-shrink: 0;
      background-color: #fff;
    }
  }
}
</style>
