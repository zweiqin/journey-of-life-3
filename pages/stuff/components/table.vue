<template>
  <view class="table-container">
    <view class="list">
      <text class="type">时间</text>
      <text class="type">类别</text>
      <text class="type">地区</text>
      <text class="type">颜色</text>
      <text class="type">数量</text>
      <text class="type">联系</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    border: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.table-container {
  width: 698upx;
  height: 328upx;
  border-radius: 10upx;
  background: #ffffff;
  border: 1upx solid #999999;
  .list{
    
    .type{

    }
  }
}
</style>