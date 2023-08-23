<template>
  <view class="comment-list-container">
    <view class="total-info">
      <view class="left">
        <view class="title">服务评价</view>
        <view class="number">({{ comments.length }})</view>
      </view>

      <button class="uni-btn" @click="handleViewMore" v-if="comments.length">查看更多</button>
    </view>

    <view class="list">
      <CommentItem :comment="comment" v-for="comment in comments.slice(0, 1)" :key="comment.id"></CommentItem>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import CommentItem from './CommentItem.vue';
export default {
  components: { CommentItem },
  props: {
    comments: {
      type: Array,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    }
  },

  methods: {
    handleViewMore() {
      if (!this.id) {
        this.ttoast({
          type: 'fail',
          title: '参数错误'
        });

        return;
      }

      uni.navigateTo({ url: '/community-center/comment-list?id=' + this.id });
    }
  }
};
</script>

<style lang="less" scoped>
.comment-list-container {
  width: 100%;
  padding: 0px 15px 20px 15px;
  box-sizing: border-box;

  .total-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      color: #000;
      font-weight: 500;
      font-size: 28upx;
    }

    .title {
      font-weight: bold;
    }
    
    .uni-btn {
      font-size: 28upx;
      color: rgb(254, 137, 0);
    }
  }
}
</style>
