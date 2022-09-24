<template>
  <view class="p-container" @click="handleToViewDetail">
    <view class="info">
      <view class="title"
        >震惊！！！家居产业再迎新机遇，业再迎新机遇，业再迎新机遇，市场再次
        迎来大发展...</view
      >
      <view class="time">11:23</view>
    </view>
    <img
      class="img"
      src="https://img0.baidu.com/it/u=2858541912,2398659634&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500"
      alt=""
    />
  </view>
</template>

<script>
export default {
  props: ["title", "titme", "img", "id"],

  methods: {
    handleToViewDetail() {
      uni.navigateTo({
        url: "/stuff/industry/infomation-detail",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.p-container {
  .flex();
  padding: 10px 0;

  .img {
    width: 142upx;
    height: 108upx;
    object-fit: cover;
    border-radius: 5px;
    flex-shrink: 0;
    margin-left: 20px;
  }

  .title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: @f12;
    line-height: 1.5;
  }

  .time {
    color: #999;
    font-size: 10px;
    margin-top: 5px;
  }
}
</style>