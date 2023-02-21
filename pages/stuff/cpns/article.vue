<template>
  <view
    v-if="data"
    class="article-container"
    @click="go('/stuff/industry/infomation-detail?id=' + data.id)"
  >
    <image class="cover-image" :src="data.imgUrl" mode="" />
    <view class="article-detail">
      <view class="article-title">{{ data.title }}</view>
      <view class="time">{{ data.addTime }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.article-container {
  display: flex;
  align-items: center;
  margin-bottom: 20upx;
  padding-bottom: 20upx;
  border-bottom: 1upx solid #f1f1f0;

  .cover-image {
    width: 200upx;
    height: 120upx;
    border-radius: 16upx;
    object-fit: cover;
    flex-shrink: 0;
    margin-right: 20upx;
  }

  .article-detail {
    width: 486upx;
    flex: 1;

    .article-title {
      flex: 0 0 486upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .time {
      color: #605d52;
      font-size: 24upx;
      line-height: 42upx;
      margin-top: 16upx;
    }
  }
}
</style>
