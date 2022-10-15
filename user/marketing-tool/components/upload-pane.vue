<template>
  <view class="uploade-pane-container">
    <view class="title">门店logo</view>
    <view class="body">
      <view class="sub-title">上传图片</view>
      <view class="main">
        <Update></Update>
      </view>
    </view>
    <view class="title">营业执照</view>
    <view class="body">
      <view class="sub-title">上传图片</view>
      <view class="main">
        <Update></Update>
      </view>
    </view>
    <view class="title">法人身份证人面像</view>
    <view class="body">
      <view class="sub-title">上传图片</view>
      <view class="main">
        <Update></Update>
      </view>
    </view>
    <view class="title">法人身份证国徽面</view>
    <view class="body">
      <view class="sub-title">上传图片</view>
      <view class="main">
        <Update></Update>
      </view>
    </view>
    
  </view>
</template>

<script>
import Update from "../../../wxcomponents/vant/dist/uploader/index.vue";

export default {
  components: {
    Update,
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.uploade-pane-container {
  .title {
    color: @c3d;
    font-size: @f12;
    margin: 48upx 0 20upx 0;
  }

  .body {
    border: 1upx solid #d8d8d8;
    border-radius: @r10;
    padding: 32upx 16upx;
    box-sizing: border-box;

    .sub-title {
      color: @c9;
      font-size: @f12;
    }
  }
}
</style>