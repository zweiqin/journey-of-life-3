<template>
  <view class="provide-real-name-authentication-container">
    <TuanPageHead title="实名认证">
      <block slot="left">
        <image src="../../static/images/con-center/order-detail-back.png" @click="handleToOrderList" class="back-icon">
        </image>
      </block>
    </TuanPageHead>
    <main>
      <view class="form-item">
        <view class="form-title">头像上传（本人正面清晰头像）</view>
        <view class="upload-avatar-container" @click="handleUploadImg('selfie')">
          <view class="uploader" v-if="!authenticationForm.selfie">
            <img class="add-icon" src="../../static/images/con-center/add-icon.png" alt="">
          </view>

          <img class="uploader" v-else :src="authenticationForm.selfie" alt="">
        </view>
      </view>
      <view class="form-item">
        <view class="form-title">身份证上传（本人正反面清晰身份证）</view>
        <view class="example-wrapper">
          <img class="example-img" src="../../static/images/entryOfMerchants/shenfenzheng.png" alt="">
          <img class="example-img" src="../../static/images/entryOfMerchants/shenfenzheng2.png" alt="">
        </view>

        <view class="example-wrapper upload-wrapper">
          <view class="upload-one" @click="handleUploadImg('idCardFront')">
            <view class="uploader" v-if="!authenticationForm.idCardFront">
              <img src="../../static/images/con-center/add-icon.png" alt="">
            </view>

            <img v-else class="uploader" :src="authenticationForm.idCardFront" alt="">
          </view>

          <view class="upload-two" @click="handleUploadImg('idCardOpposite')">
            <view class="uploader" v-if="!authenticationForm.idCardOpposite">
              <img src="../../static/images/con-center/add-icon.png" alt="">
            </view>
            <img v-else class="uploader" :src="authenticationForm.idCardOpposite" alt="">
          </view>
        </view>
      </view>

      <view class="form-item">
        <view class="form-title">真实姓名</view>
        <view class="input-wrapper">
          <input v-model="authenticationForm.name" class="input" type="text" placeholder="请填写您的真实姓名">
        </view>
      </view>

      <view class="form-item">
        <view class="form-title">身份证号</view>
        <view class="input-wrapper">
          <input v-model="authenticationForm.idCard" class="input" type="text" placeholder="请填写您的身份证号">
        </view>
      </view>

      <view class="form-item">
        <view class="form-title">手机号</view>
        <view class="input-wrapper">
          <input style="background-color: transparent;" class="input" readonly disabled
            v-model="authenticationForm.mobile" type="number" placeholder="请填写您的手机号">
        </view>
      </view>

      <view class="form-item">
        <view class="form-title">验证码</view>
        <view class="input-wrapper">
          <input v-model="authenticationForm.code" class="input" type="number" placeholder="请填写验证码">
          <button class="send-code" @click="handleSendCode">{{ count === 60 ? '发送验证码' : `${count}s后重新发送`
          }}</button>
        </view>
      </view>

      <button class="uni-btn" :loading="isLoading" @click="handleSubmint">提交</button>
    </main>


    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>

import { getUserId } from '../../utils';
import { getCodeApi } from '../../api/auth';
import { userIdentityAuthenticationInfoApi, IDCardAnalysisApi } from '../../api/user'
import { IMG_UPLOAD_URL } from '../../config'
import { USER_INFO } from '../../constant'

export default {
  data() {
    return {
      count: 60,
      isLoading: false,
      codeTimer: null,
      authenticationForm: {
        name: '', // 真实姓名
        mobile: "", // 电话号码
        idCard: "", // 身份证号
        idCardFront: "", //身份证正面
        idCardOpposite: "", // 身份证反面
        selfie: "", // 本人照片
        code: "", // 验证码
      }
    }
  },

  methods: {
    async handleUploadImg(type) {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          for (const imgFile of chooseImageRes.tempFiles) {
            uni.showLoading();
            uni.uploadFile({
              url: IMG_UPLOAD_URL,
              filePath: imgFile.path,
              name: 'file',
              formData: {
                userId: getUserId()
              },
              success: (uploadFileRes) => {
                uni.hideLoading();
                _this.authenticationForm[type] = JSON.parse(uploadFileRes.data).data.url;
                if (type === 'idCardFront') {
                  _this.parseImg(JSON.parse(uploadFileRes.data).data.url)
                }
              },
              fail: (error) => {
                uni.hideLoading();
                _this.ttoast({
                  type: 'fail',
                  title: '图片上传失败',
                  content: error
                });
              }
            });
          }
          return;
        },
        fail: (fail) => {
          console.log(fail);
        }
      });
    },

    // 解析身份证
    async parseImg(imageUrl) {
      if (!imageUrl) {
        return
      }

      try {
        const IDInfo = await IDCardAnalysisApi({
          imageUrl,
          ocrType: 0
        })

        if (IDInfo) {
          this.authenticationForm.name = IDInfo.name
          this.authenticationForm.idCard = IDInfo.tradeNo
        } else {
        }
      } catch (error) {
        console.log("身份证图片解析失败", error);
      }
    },

    // 发送验证码
    async handleSendCode() {
      if (this.codeTimer) {
        return
      }
      if (!this.authenticationForm.mobile || this.authenticationForm.mobile.length !== 11) {
        this.ttoast({
          type: "fail",
          title: "请输入有效的手机号码"
        })
        return
      }

      try {
        await getCodeApi({
          phone: this.authenticationForm.mobile,
          flag: 2
        })
        this.codeTimer = setInterval(() => {
          this.count--
          if (this.count === 0) {
            clearInterval(this.codeTimer)
            this.codeTimer = null
            this.count = 60
          }
        }, 1000)
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: error,
          content: "验证码获取失败"
        })

        this.count = 60
        clearInterval(this.codeTimer)
        this.codeTimer = null
      }
    },

    handleToOrderList() {
      uni.navigateBack()
    },

    // 点击提交
    async handleSubmint() {
      if (!this.authenticationForm.selfie) {
        this.ttoast({
          type: "fail",
          title: "请上传本人照片"
        })
        return
      }

      if (!this.authenticationForm.idCardFront) {
        this.ttoast({
          type: "fail",
          title: "请上传身份证正面照片"
        })
        return
      }

      if (!this.authenticationForm.idCardOpposite) {

        this.ttoast({
          type: "fail",
          title: "请上传身份证背面照片"
        })
        return
      }

      if (!this.authenticationForm.name) {

        this.ttoast({
          type: "fail",
          title: "请输入您的真实姓名"
        })
        return
      }

      if (!this.authenticationForm.idCard) {
        this.ttoast({
          type: "fail",
          title: "请输入您的身份证号码"
        })
        return
      }

      if (!this.authenticationForm.mobile) {

        this.ttoast({
          type: "fail",
          title: "请输入您的手机号码"
        })
        return
      }

      if (!this.authenticationForm.code) {
        this.ttoast({
          type: "fail",
          title: "请输入手机验证码"
        })
        return
      }

      try {
        this.isLoading = true
        await userIdentityAuthenticationInfoApi(this.authenticationForm)
        this.ttoast('认证成功')
        this.codeTimer = setTimeout(() => {
          uni.navigateBack()
        }, 2000);
      } catch (error) {
        this.ttoast({
          type: "fail",
          title: "认证失败",
          content: error
        })
      } finally {
        this.isLoading = false
      }
    }
  },

  onLoad() {
    const tuanUserInfo = uni.getStorageSync(USER_INFO)
    if (tuanUserInfo) {
      this.authenticationForm.mobile = tuanUserInfo.phone
    }
  }
}
</script>

<style lang="less" scoped>
.back-icon {
  width: 64upx;
  height: 64upx;
}

.provide-real-name-authentication-container {
  width: 100%;
  height: 100%;
  padding: 20upx;
  box-sizing: border-box;

  main {
    padding: 20upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;

    .form-item {
      margin-bottom: 30upx;

      .form-title {
        position: relative;
        font-size: 30upx;
        font-weight: 500;
        color: #474747;
        margin-bottom: 20upx;
        padding-left: 40upx;

        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20upx;
          height: 20upx;
          border-radius: 50%;
          background-color: #fe751a;
        }
      }

      .upload-avatar-container {
        .uploader {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 170upx;
          height: 200upx;
          background-color: #f7fbff;
          border-radius: 20upx;
          overflow: hidden;

          .add-icon {
            width: 80upx;
            height: 80upx;
            border-radius: 50%;
          }
        }
      }

      .error-message {
        margin: 10upx 0 20upx 0;
        padding: 20upx 10upx;
        border-radius: 10upx;
        font-size: 24upx;
        color: #f40;
        background-color: rgb(255, 207, 207);
        border-bottom: 1upx solid #c7c7c7;
      }

      .input-wrapper {
        padding: 20upx 0;
        border-bottom: 1upx solid #c7c7c7;
        display: flex;
        align-items: center;

        .input {
          flex: 1;
          font-size: 30upx;

        }

        .send-code {
          display: block;
          margin-left: 40upx;
          font-size: 30upx;
          padding: 5upx 10upx;
          border-radius: 10upx;
          color: #fe751a;
          line-height: 1;
          margin: 0;
          border: none;
          padding: 0;
          background: transparent;

          &::after {
            border: none;
          }
        }
      }

      .example-wrapper {
        position: relative;
        width: 100%;
        height: 228upx;
        background-color: #f7fbff;
        padding: 20upx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;



        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40upx;
          content: '示例图 点击预览';
          background-color: #cecece;
          font-size: 28upx;
          border-radius: 100upx;
          text-align: center;
          line-height: 40upx;
          color: #3a3a3a;
        }

        .example-img {
          width: 276upx;
          height: 174upx;
        }
      }

      .upload-wrapper {
        background-color: transparent;
        margin-top: 20upx;

        &::after {
          display: none;
        }

        .upload-one,
        .upload-two {
          width: 276upx;
          height: 174upx;
          background-color: #f7fbff;
          border-radius: 10upx;

          .uploader {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 60upx;
              height: 60upx;
            }
          }
        }
      }
    }

    .uni-btn {
      width: 100%;
      height: 88upx;
      border-radius: 20upx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fe751a;
      color: #fff;

    }
  }
}
</style>