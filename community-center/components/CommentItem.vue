<template>
  <view class="comment-item" v-if="comment">
    <view class="user-info">
      <image class="user-avatar" :src="comment.userHeadUrl || require('../../static/images/common/default.png')"></image>
      <view class="detail">
        <view class="user-name">{{ comment.userName }}</view>
        <view class="comment-time">
          {{ comment.commentTime | formatTime }}
        </view>
      </view>
    </view>

    <view class="comment">{{ comment.content }}</view>

    <view class="rate">
      <view class="rate-item">
        <view class="rate-title">服务评分</view>
        <tui-rate active="#fe8900" :size="16" :current="comment.serverScore + '' || '5'"></tui-rate>
      </view>

      <view class="rate-item">
        <view class="rate-title">专业评分</view>
        <tui-rate active="#fe8900" :size="16" :current="comment.skillSpeciality + '' || '5'"></tui-rate>
      </view>

      <!-- 图片视频 -->
      <view class="list" v-if="comment.commentFile">
        <TuanSourceList :topLine="false" :scourceList="comment.commentFile.split(',')"></TuanSourceList>
      </view>
    </view>

    <view class="appent-commment" v-if="comment.commentAppend">
      <view class="title">客户订单完成 {{ formatTimeToNow(comment.commentAppend.createTime) }} 后追评:</view>
      <view class="comment">{{ comment.commentAppend.appendComment }}</view>
      <view class="list" v-if="comment.commentAppend.appendFileUrl">
        <TuanSourceList :topLine="false" :scourceList="comment.commentAppend.appendFileUrl.split(',')"></TuanSourceList>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs';
import zhCn from 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  filters: {
    formatTime(time) {
      return dayjs(time).locale(zhCn).from(Date.now());
    }
  },

  methods: {
    formatTimeToNow(time) {
      return dayjs(time).locale(zhCn).to(this.comment.formatTime, true);
    }
  }
};
</script>

<style lang="less" scoped>
.comment-item {
  margin-top: 70upx;
  // margin-bottom: 70upx;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .user-avatar {
      width: 70upx;
      height: 70upx;
      border-radius: 50%;
      border: 1upx solid #eee;
      flex-shrink: 0;
    }

    .detail {
      margin-left: 20upx;
      .user-name {
        font-size: 28upx;
        color: #474747;
        font-weight: 500;
      }

      .comment-time {
        color: #ccc;
        font-size: 24upx;
      }
    }
  }

  .rate {
    margin: 10upx 0;
    .rate-item {
      display: flex;
      align-items: center;
      font-size: 24upx;
      margin: 20upx 0;

      .rate-title {
        margin-right: 20upx;
        color: #ccc;
      }
    }
  }
}

.comment {
  font-size: 28upx;
  color: #000;
  font-weight: 500;
  padding-left: 20upx;
  border-left: 4upx solid #ccc;
}

.appent-commment {
  margin-top: 20upx;
  background-color: #f7f7f7;
  padding: 20upx;
  border-radius: 20upx;

  .title {
    font-size: 28upx;
    color: #fe8900;
  }

  .comment {
    border: none;
    margin: 20upx 0;
    padding-left: 0;
  }
}
</style>
