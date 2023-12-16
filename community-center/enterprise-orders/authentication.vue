<template>
  <view class="auth-container">
    <TuanPageHead title="企业认证" padding="0 32upx" weight="500">
      <block slot="left">
        <image style="width: 64upx; height: 64upx;" src="../../static/images/con-center/order-detail-back.png"
          @click="handleBack" class="back-icon">
        </image>
      </block>
    </TuanPageHead>

    <view class="pane">

      <view class="load-img-container">
        <view class="title"> 上传营业执照</view>
        <view class="tip">请确保证件完整，编号、印章、文字、照片清楚可见</view>
        <view class="img-wrapper" style=" margin-bottom: 24upx;">
          <view class="example uploader">
            <image style="width: 88upx; height: 128upx;"
              src="../../static/images/new-community/enterprise-orders/temp.png"></image>
          </view>
          <view v-if="!authForm.createOrUpdateCompanyParam.businessLicense" class="uploader"
            @click="handleUploadImg('businessLicense')">
            <image style="width: 39upx; height: 39upx;"
              src="../../static/images/new-community/enterprise-orders/image.png"></image>
            点击上传图片
          </view>

          <image :class="{ mask: isMask }" @click="handleUploadImg('businessLicense')" v-else
            style="width: 128upx; height: 128upx; border-radius: 10upx; border: 1upx solid #f3f3f3;"
            :src="authForm.createOrUpdateCompanyParam.businessLicense"></image>
        </view>


      </view>

      <tui-alerts v-show="authedCompanyList.length" type="info" :title="`共找到${authedCompanyList.length}家企业`">
        <block slot="right">
          <button class="uni-btn company-btn" @click="companyListPickerVisible = true">点击选择</button>
        </block>
      </tui-alerts>

      <view class="form-item">
        <view class="form-label">公司名称</view>
        <view class="form-value">
          <input class="inp" @blur="handleCompanyInputBlur" type="text"
            v-model="authForm.createOrUpdateCompanyParam.companyName" placeholder="请输入公司名称">
        </view>
      </view>

      <view class="form-item">
        <view class="form-label">公司简称(选填)</view>
        <view class="form-value">
          <input class="inp" v-model="authForm.createOrUpdateCompanyParam.simpleName" type="text" placeholder="请输入公司简称">
        </view>
      </view>

      <view class="form-item">
        <view class="form-label">联系人</view>
        <view class="form-value">
          <input class="inp" type="text" v-model="authForm.createOrUpdateCompanyParam.companyDelegate"
            placeholder="请输入公司联系人">
        </view>
      </view>

      <view class="form-item">
        <view class="form-label">手机号码</view>
        <view class="form-value">
          <input class="inp" type="text" v-model="authForm.createOrUpdateCompanyParam.delegatePhoneNumber"
            placeholder="请输入联系人手机号码">
        </view>
      </view>

      <view class="form-item">
        <view class="form-label">统一社会信用代码</view>
        <view class="form-value">
          <input class="inp" type="text" v-model="authForm.createOrUpdateCompanyParam.companyCode" placeholder="统一社会信用代码">
        </view>
      </view>

      <view class="form-item" @click="handleChooseAddress">
        <view class="form-label">公司地址</view>
        <view class="form-value">
          <input readonly disabled class="inp" type="text" placeholder="请选择公司地址"
            v-model="authForm.createOrUpdateCompanyParam.companyAddress">
        </view>
      </view>

      <view class="form-item" style="display: block">
        <view class="form-label">公司详细地址</view>
        <view>
          <tui-textarea style="border-radius: 10upx; overflow: hidden;" padding="20upx" v-model="addressDetail"
            :maxlength="80" :marginTop="20" trim isCounter :size="26" backgroundColor="#f3f3f3" :borderTop="false"
            :borderBottom="false" height="132rpx" min-height="132rpx" placeholder="请输入公司详细地址"></tui-textarea>
        </view>
      </view>
    </view>

    <view class="pane">


      <view class="load-img-container">
        <view class="title"> 上传公司logo(选填)</view>
        <view class="img-wrapper" v-if="!authForm.createOrUpdateCompanyParam.companyLogo"
          @click="handleUploadImg('companyLogo')">
          <view class="uploader">
            <image style="width: 39upx; height: 39upx; margin-bottom: 24upx;"
              src="../../static/images/new-community/enterprise-orders/image.png"></image>
            点击上传图片
          </view>
        </view>

        <image @click="handleUploadImg('companyLogo')" v-else
          style="width: 128upx; height: 128upx; margin-bottom: 24upx; border-radius: 10upx; border: 1upx solid #f3f3f3;"
          :src="authForm.createOrUpdateCompanyParam.companyLogo"></image>
      </view>
    </view>

    <button class="uni-btn submit" @click="handleSubmit">提交认证</button>
    <tui-toast ref="toast"></tui-toast>
    <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>

    <!-- 选择企业 -->
    <tui-select :list="authedCompanyList" :show="companyListPickerVisible" @confirm="handleChooseCompany"
      @close="companyListPickerVisible = false"></tui-select>
  </view>
</template>

<script>
import { bAuthApi, getAuthedCompanyListApi, OCRRecognitionApi } from '../../api/community-center'
import { IMG_UPLOAD_URL } from '../../config';
import { USER_INFO } from '../../constant'
import { getUserId } from '../../utils'

export default {
  data() {
    return {
      addressDetail: "",
      companyListPickerVisible: false,
      authedCompanyList: [],
      isMask: false,
      authForm: {
        "createOrUpdateCompanyParam": {
          "simpleName": "",
          "companyLogo": "",
          "companyAddress": "",
          "businessLicense": "",
          "delegatePhoneNumber": "",
          "companyDelegate": "",
          "companyName": "",
          "companyCode": ""
        },
        "phoneNumber": uni.getStorageSync(USER_INFO).phone
      },
    }
  },
  methods: {
    handleChooseAddress() {
      this.$refs.TuanCityRef.show()
    },
    handleConfirmAddress(selectAddressInfo) {
      this.authForm.createOrUpdateCompanyParam.companyAddress = selectAddressInfo.formatAddress4
    },
    handleBack() {
      uni.navigateBack();
    },
    handleUploadImg(type) {
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
                if (type === 'businessLicense') {
                  this.isMask = false
                }
                uni.hideLoading();
                _this.authForm.createOrUpdateCompanyParam[type] = JSON.parse(uploadFileRes.data).data.url
                if (type === 'businessLicense') {
                  _this.handlerecognition(JSON.parse(uploadFileRes.data).data.url)
                }
                _this.ttoast('上传成功')
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

    // 获取已认证公司联系人
    async handleCompanyInputBlur() {
      try {
        uni.showLoading({
          title: '加载中...',
          mask: true
        });
        const res = await getAuthedCompanyListApi({
          comName: this.authForm.createOrUpdateCompanyParam.companyName
        })
        this.authedCompanyList = res.statusCode === 20000 ? (res.data || []).map(item => {
          item.text = item.companyName
          item.id = item.id
          return item
        }) : []
      } finally {
        uni.hideLoading();
      }
    },

    async handlerecognition(fileUrl) {
      try {
        uni.showLoading({
          title: '识别中...'
        });
        const res = await OCRRecognitionApi({
          fileUrl
        })

        const data = res.words_result
        if (data) {
          this.authForm.createOrUpdateCompanyParam.companyName = data['单位名称'] && data['单位名称'].words
          this.authForm.createOrUpdateCompanyParam.companyDelegate = data['法人'] && data['法人'].words
          this.authForm.createOrUpdateCompanyParam.companyCode = data['社会信用代码'] && data['社会信用代码'].words
          const address = data['地址'].words
          const parseAddress = !address ? '' : address.match(/.+?(省|市|自治区|自治州|县|盟|区|旗|镇|乡|$)/g);
          if (parseAddress.length) {
            const index = parseAddress.findIndex(item => item.includes('镇'))
            if (index !== -1) {
              this.authForm.createOrUpdateCompanyParam.companyAddress = parseAddress.slice(0, index + 1).join('')
              this.addressDetail = parseAddress.slice(index)
            } else {
              if (parseAddress[0].includes('省')) {
                this.authForm.createOrUpdateCompanyParam.companyAddress = parseAddress.slice(0, 5).join('')
                this.addressDetail = parseAddress.slice(5)
              }
            }
          }
        }

      } finally {
        uni.hideLoading()
      }
    },

    // 确认选择公司信息
    handleChooseCompany({ options }) {
      if (options) {
        this.authForm.createOrUpdateCompanyParam.simpleName = options.simpleName
        this.authForm.createOrUpdateCompanyParam.companyLogo = options.companyLogo
        this.authForm.createOrUpdateCompanyParam.businessLicense = options.businessLicense
        this.authForm.createOrUpdateCompanyParam.delegatePhoneNumber = options.delegatePhoneNumber
        this.authForm.createOrUpdateCompanyParam.companyDelegate = options.companyDelegate
        this.authForm.createOrUpdateCompanyParam.companyName = options.companyName
        this.authForm.createOrUpdateCompanyParam.companyCode = options.companyCode
        this.isMask = true
      }
      this.companyListPickerVisible = false
    },

    async handleSubmit() {
      if (!this.authForm.createOrUpdateCompanyParam.companyName) {
        this.ttoast({
          type: 'fail',
          title: '请填写公司名称'
        })
        return
      }

      // if (!this.authForm.createOrUpdateCompanyParam.simpleName) {
      //   this.ttoast({
      //     type: 'fail',
      //     title: '请填写公司简称'
      //   })
      //   return
      // }


      if (!this.authForm.createOrUpdateCompanyParam.companyDelegate) {
        this.ttoast({
          type: 'fail',
          title: '请填写公司法人'
        })
        return
      }

      if (!this.authForm.createOrUpdateCompanyParam.delegatePhoneNumber) {
        this.ttoast({
          type: 'fail',
          title: '请输入法人手机号'
        })
        return
      }

      if (!this.authForm.createOrUpdateCompanyParam.companyAddress) {
        this.ttoast({
          type: 'fail',
          title: '请选择公司地址'
        })
        return
      }

      if (!this.addressDetail) {
        this.ttoast({
          type: 'fail',
          title: '请填写公司详细地址'
        })
        return
      }

      // if (!this.authForm.createOrUpdateCompanyParam.companyCode) {
      //   this.ttoast({
      //     type: 'fail',
      //     title: '请填写公司统一信用代码'
      //   })
      //   return
      // }

      if (!this.authForm.createOrUpdateCompanyParam.businessLicense) {
        this.ttoast({
          type: 'fail',
          title: '请上传公司营业执照'
        })
        return
      }

      // if (!this.authForm.createOrUpdateCompanyParam.companyLogo) {
      //   this.ttoast({
      //     type: 'fail',
      //     title: '请上传公司logo'
      //   })
      //   return
      // }

      try {
        const postData = JSON.parse(JSON.stringify(this.authForm))
        postData.createOrUpdateCompanyParam.companyAddress = postData.createOrUpdateCompanyParam.companyAddress + " " + this.addressDetail
        const res = await bAuthApi(postData)
        if (res.statusCode === 20000) {
          this.authForm.createOrUpdateCompanyParam = {
            simpleName: "",
            companyLogo: "",
            companyAddress: "",
            businessLicense: "",
            delegatePhoneNumber: "",
            companyDelegate: "",
            companyName: "",
            companyCode: ""
          }

          this.ttoast("提交成功，请等待审核")
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        } else {
          this.ttoast({
            type: 'info',
            title: res.statusMsg
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .uni-input-placeholder {
  color: #C4C6CF;
}

.auth-container {
  min-height: 100vh;
  background-color: #F6F6FB;
  padding-bottom: 42upx;
  padding-top: 20upx;

  .pane {
    margin-top: 24upx;
    background-color: #fff;

    .company-btn {
      padding: 5upx 10upx;
      border-radius: 10upx;
      font-size: 28upx;
      color: #fff;
      transition: all 350ms;

      &:active {
        opacity: 0.6;
      }
    }

    .form-item {
      padding: 38upx 60upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .form-label {
        font-size: 28upx;
        color: #526787;
        margin-right: 98upx;
      }

      .form-value {
        flex: 1;
        display: flex;
        align-items: center;

        .inp {
          flex: 1;
          text-align: right;
        }
      }
    }

    .load-img-container {
      padding: 44upx 40upx;

      box-sizing: border-box;

      .title {
        color: #303030;
        font-size: 32upx;
        margin-bottom: 14upx;
      }

      .tip {
        font-size: 24upx;
        color: #9E9E9E;
        margin: 0 0 24upx 0;
      }

      .img-wrapper {
        display: flex;
        align-items: center;

        .mask {
          position: relative;

          &::before {
            position: absolute;
            left: 0;
            top: 0;
            content: '保密中';
            width: 128upx;
            height: 128upx;
            background: rgba(0, 0, 0, 0.295);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
          }
        }

        .uploader {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 128upx;
          height: 128upx;
          background-color: #F7FBFF;
          font-size: 16upx;
          color: #969699;



          &.example {
            position: relative;
            display: block;
            text-align: center;
            margin-right: 20upx;

            &::after {
              top: 0;
              left: 0;
              position: absolute;
              content: '示例';
              color: #fff;
              text-align: center;
              line-height: 28upx;
              display: block;
              width: 56upx;
              height: 28upx;
              background-color: #FF6619;
              border-radius: 4upx 0upx 8upx 0px;
            }
          }
        }
      }
    }


  }

  .submit {
    width: 670upx;
    height: 96upx;
    margin: 0 auto;
    background-color: #4871FE;
    margin-top: 98upx;
    margin-bottom: 42upx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 350ms;

    &:active {
      opacity: 0.8;
    }
  }
}
</style>