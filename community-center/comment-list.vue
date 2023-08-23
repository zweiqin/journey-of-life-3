<template>
  <view class="all-comments-container">
    <view class="title">
      <view>全部评论({{ commentList.length }}) </view>
      <tui-icon name="shut" @click="back" :size="18"></tui-icon>
    </view>

    <view class="comment-wrapper">
      <view class="wrapper" v-if="!isLoading && commentList.length">
        <CommentItem v-for="comment in commentList" :key="comment.id" :comment="comment"></CommentItem>
      </view>

      <view class="no-data" v-if="!isLoading && !commentList.length"> 暂无评价~ </view>
    </view>

    <LoadingMore style="margin-top: 400upx" v-show="isLoading" status="loading"></LoadingMore>
  </view>
</template>

<script>
import { getServeCommentListApi } from '../api/community-center';
import CommentItem from './components/CommentItem.vue';
export default {
  components: {
    CommentItem
  },
  data() {
    return {
      commentList: [],
      isLoading: false
    };
  },
  onLoad(options) {
    this.getCommentList(options.id);
  },
  methods: {
    async getCommentList(id) {
      try {
        this.isLoading = true;
        const commentList = await getServeCommentListApi({ serverTypeId: id });
        this.commentList = commentList;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    back() {
      uni.navigateBack();
    }
  }
};
</script>

<style lang="less" scoped>
.all-comments-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #fff;
  padding: 40upx;
  box-sizing: border-box;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.no-data {
  height: 700upx;
  text-align: center;
  line-height: 700upx;
  color: #ccc;
  letter-spacing: 0.3em;
}
</style>
