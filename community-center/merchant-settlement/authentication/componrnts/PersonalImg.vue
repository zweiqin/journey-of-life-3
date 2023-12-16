<template>
  <view class="fromBox">
      <view class="textH1">身份验证</view>
      <view class="textSpan">请进行人脸识别认证身份</view>
      <view class="isHumer">
        <!-- emmm 懒得写样式，直接怼了一张图片在这里 -->
      </view>
      <view v-if="fromData.headUrl" class="TakeAPicture">
        <view class="humImgBox">
          <tui-icon @click="fromData.headUrl = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
          <image class="humImg" :src="fromData.headUrl"></image>
        </view>
      </view>
      <view class="TakeAPicture" v-else>
        <view class="humImgBox">
          <image class="humImg" :src="humImgUrl"></image>
        </view>
      </view>
      <view class="textarea">
        请按照提示进行脸部扫描识别,保证头像与真人认证为同一人
        脸部扫描结果仅用作认证，官方将严格保密
        真人认证通过后，后续智能更换本人头像
      </view>
      <view class="pictureButton">
        <tui-button @click="handleUploadImg('headUrl')">马上认证</tui-button>
      </view>
      <view style="color: #888889;font-size: 24rpx;">
        拍摄要求
      </view>
      <view class="wdnmd">
        
      </view>
  </view>
</template>

<script>
import { IMG_UPLOAD_URL } from "../../../../config";
import { getUserId } from "@/utils";
export default {
  name: 'PersonalImg',
  data() {
    return {
      humImgUrl: require('@/static/images/entryOfMerchants/rentouxiang.png'),
      fromData: {
        headUrl: ''
      }
    };
  },
  methods: {
    // 点击上传图片
    handleUploadImg(Key) {
      this.imgKeyName = Key; // 存一次键名 方便后面赋值
      const _this = this;
      uni.chooseImage({
        sourceType: ['camera','album'],
        success: (chooseImageRes) => {
          for (const imgFile of chooseImageRes.tempFiles) {
            uni.showLoading();
            uni.uploadFile({
              url: IMG_UPLOAD_URL,
              filePath: imgFile.path,
              name: "file",
              formData: {
                userId: getUserId(),
              },
              success: (uploadFileRes) => {
                uni.hideLoading();
                _this.fromData[_this.imgKeyName] = JSON.parse(
                  uploadFileRes.data
                ).data.url;
                // console.log(_this.fromData)
              },
              fail: (error) => {
                uni.hideLoading();
                _this.ttoast({
                  type: "fail",
                  title: "图片上传失败",
                  content: error,
                });
              },
            });
          }
          return;
        },
        fail: (fail) => {
          console.log(fail);
        },
      });
    }
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
    .humImgBox {
      position: relative;
      .humImg {
        position: relative;
        width: 305rpx;
        height: 370rpx;
      }
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
  .wdnmd {
    width: 690rpx;
    height: 216rpx;
    padding-bottom: 40rpx;
    background: url('@/static/images/entryOfMerchants/cnmb.png') no-repeat center;
    background-size: 690rpx 216rpx;
  }
}.close-icon {
  position: absolute;
  top: -10upx;
  right: -10upx;
  width: 34upx;
  height: 34upx;
  z-index: 10;
}
</style>

