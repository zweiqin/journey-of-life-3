<template>
  <view class="fromBox">
      <view class="textH1">身份验证</view>
      <view class="textSpan">请进行人脸识别认证身份</view>
      <view class="isHumer">
        <!-- emmm 懒得写样式，直接怼了一张图片在这里 -->
      </view>
      <view class="TakeAPicture">
        <image class="humImg" :src="humImgUrl"></image>
      </view>
      <view class="textarea">
        请按照提示进行脸部扫描识别,保证头像与真人认证为同一人
        脸部扫描结果仅用作认证，官方将严格保密
        真人认证通过后，后续智能更换本人头像
      </view>
      <view class="pictureButton">
        <tui-button>马上认证</tui-button>
      </view>
      <view style="color: #888889;font-size: 24rpx;">
        拍摄要求
      </view>
      <view class="cnmbZHF">
        
      </view>
  </view>
</template>

<script>
export default {
  name: 'PersonalImg',
  data() {
    return {
      humImgUrl: require('@/static/images/entryOfMerchants/rentouxiang.png'),
    };
  }
}
</script>

<style lang="scss" scoped>
.fromBox {
  box-sizing: border-box;
  background-color: #fff;
  padding: 32rpx 30rpx;
  width: 100vw;
  height: auto;
  flex: 1;
  .textH1 {
    color: #08377F;
    font-size: 48rpx;
    /* line-height: 52px; */
    font-weight: bold;
    letter-spacing: 0.32px;
  }
  .textSpan {
    margin-top: 10rpx;
    font-size: 24rpx;
    font-weight: 350;
    line-height: 32rpx;
    color: #526787;
  }
  .isHumer {
    margin-top: 20rpx;
    /* margin-bottom: 30rpx; */
    width: 100%;
    height: 88rpx;
    background: url('@/static/images/entryOfMerchants/querenbenren.png') no-repeat center;
    background-size: 710rpx 110rpx;
  }
  .TakeAPicture {
    width: 100%;
    height: 400rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .humImg {
      width: 305rpx;
      height: 370rpx;
    }
  }
  .textarea {
    margin: 0 auto;
    width: 587rpx;
    height: 96rpx;
    color: #526787;
    font-size: 22rpx;
    font-weight: 350;
    line-height: 32rpx;
    text-align: center;
  }
  .pictureButton {
    margin: 38rpx auto;
    width: 690rpx;
    height: 88rpx;
  }
  .cnmbZHF {
    width: 690rpx;
    height: 216rpx;
    padding-bottom: 40rpx;
    background: url('@/static/images/entryOfMerchants/cnmb.png') no-repeat center;
    background-size: 690rpx 216rpx;
  }
}
</style>

