<template>
  <view class="chat-container">
    <view class="back" @click="handleBack">
      <tui-icon name="arrowleft"></tui-icon>
    </view>

    <view class="message-list">
      <!-- <view
        class="item"
        @click="go('/user/chat/chat-detail')"
        v-for="item in 20"
        :key="item"
      >
        <image
          class="avatar"
          src="https://img1.baidu.com/it/u=3486651663,3991438881&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1676739600&t=a3f31a8bc1d79cceb56b7e906da606b7"
          mode=""
        />
        <view class="chat-wrapper">
          <view class="name-time">
            <text class="name">客服一号</text>
            <text class="time">2022-01-01 10：89</text>
          </view>
          <view class="last-message"
            >按喇叭啦叼臭泥坏哈计算列宽没那就和苏埃u是你哈就是</view
          >
        </view>
      </view> -->

      <view class="no-data">暂无消息~</view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.chat-container {
  .back {
    padding: 20upx 0;
    padding-left: 16upx;
    border-bottom: 1upx solid #e5e5e5;
  }

  .message-list {
    padding: 32upx;
    box-sizing: border-box;
    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 32upx;

      .avatar {
        width: 104upx;
        height: 104upx;
        border-radius: 50%;
        flex-shrink: 0;
        margin-right: 16upx;
      }

      .chat-wrapper {
        border-bottom: 1upx solid #f1f1f0;
        padding-bottom: 20upx;
      }
      .name-time {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          color: #3a3629;
          font-size: 32upx;
          font-weight: 500;
        }

        .time {
          color: #b3b2ad;
          font-size: 28upx;
        }
      }

      .last-message {
        width: 566upx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #8f8d85;
        font-size: 28upx;
        line-height: 42upx;
        margin-top: 8upx;
      }
    }
  }
}

.no-data{
  color: #8f8d85;
  height: 300upx;
  text-align: center;
  line-height: 300upx;
  font-size: 28upx;
  letter-spacing: 6px;
}
</style>
