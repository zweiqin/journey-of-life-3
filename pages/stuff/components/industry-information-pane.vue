<template>
  <view class="p-container" @click="handleToViewDetail">
    <view class="info">
      <view class="title">{{ title }}</view>
      <view class="time" v-if="time">{{ time.split(" ")[1] }}</view>
    </view>
    <img class="img" :src="img" alt="" />
  </view>
</template>

<script>
export default {
  props: ["title", "time", "img", "id"],
  methods: {
    handleToViewDetail() {
      uni.navigateTo({
        url: "/stuff/industry/infomation-detail?id=" + this.id,
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