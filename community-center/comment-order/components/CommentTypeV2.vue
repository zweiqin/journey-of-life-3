<template>
  <view class="comment-type-v2-container" v-if="itemData">
    <view class="comment-text">
      <view class="comment-time">
        <text class="comment-day">{{ commentDate.day }}</text>
        <text class="day-line">/</text>
        <text class="comment-month">{{ commentDate.month }}</text>
        <text class="text">月</text>
      </view>

      <view class="comment-content"> 整体评价：{{ itemData.content }} </view>
    </view>

    <view class="file-list">
      <TuanSourceList :topLine="false" :scourceList="commentFile"></TuanSourceList>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      commentDate: {
        day: '',
        month: ''
      },
      commentFile: []
    };
  },

  methods: {
    setCommentDate(commentDate) {
      if (commentDate) {
        const date = commentDate.split(' ')[0].split('-');
        this.commentDate.day = date[2];
        this.commentDate.month = date[1];
      }

      this.$forceUpdate();
    }
  },

  watch: {
    itemData: {
      handler(commentInfo) {
        const commentFile = commentInfo.commentFile;
        this.setCommentDate(commentInfo.createTime);
        if (commentFile) {
          this.commentFile = commentFile.split(',');
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.comment-type-v2-container {
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20upx;

  .comment-text {
    padding: 20upx 20upx 0;
  }

  .comment-time {
    .comment-day {
      font-size: 34upx;
      font-weight: 500;
      color: #333;
    }

    .day-line {
      font-size: 28upx;
      color: #f40;
    }

    .comment-month {
      font-size: 28upx;
      font-weight: 500;
      color: #333;
    }

    .text {
      font-size: 28upx;
    }
  }

  .comment-content {
    margin: 20upx 0 0 0;
    font-weight: 500;
    font-size: 28upx;
    line-height: 1.5;
  }

  .file-list {
    padding: 10upx 20upx 20upx;
    box-sizing: border-box;

    /deep/ .image-list {
      padding-top: 20upx;
    }
  }
}
</style>
