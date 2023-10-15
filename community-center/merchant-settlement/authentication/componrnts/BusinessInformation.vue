<template>
  <view class="formBox">
    <view class="FormContainer">
      <view class="formHeader">经营信息</view>
      <tui-form ref="form">
        <view class="inputBox">
          <tui-input labelColor="#526787" :borderBottom="false" label="门店名称" placeholder="请输入门店名称" clearable v-model="businessInformationForm.shopName"></tui-input>
          <view class="moreSlectItem">
            <tui-input label-color="#526787" label="门店地址" background-color="none" :borderBottom="false" placeholder="请选择门店地址" disabled v-model="businessInformationForm.region">
              <template #right>
                <image @click="handleChooseAddress" style="width: 30rpx; height: 30rpx; margin-right: 20rpx" src="@/static/images/entryOfMerchants/youjiantou.png" mode=""></image>
              </template>
            </tui-input>
            <!-- 团蜂地址选择 -->
            <TuanCity @confirm="handleConfirmAddress" ref="TuanCityRef"></TuanCity>
          </view>
          <!-- <tui-input labelColor="#526787" :borderBottom="false" label="门店地址" placeholder="请选择门店地址" clearable v-model="fromData.shopAddress"></tui-input> -->
          <tui-input labelColor="#526787" :borderBottom="false" label="详细地址" placeholder="请输入详细地址" @input="spliAddres" clearable v-model="businessInformationForm.addresText"></tui-input>
        </view>
      </tui-form>
    </view>
    <view class="FormContainer imgFilesUpload">
      <view style="margin: 0rpx" class="formHeader">经营执照</view>
      <view class="upload_Item">
        <view class="subtitle" style="margin-top: 24rpx">营业执照上传（正面清晰营业执照）</view>
        <view class="uploadBox">
          <view class="ExampleImg">
            <image class="cnmd" src="@/static/images/entryOfMerchants/yingyezhizhao.png"></image>
            <text class="gallery" @click="imgShow = true">示例图 点击浏览</text>
            <tui-gallery :urls="urls" :show="imgShow" @hide="imgShow = false"></tui-gallery>
          </view>
          <!-- 上传完成，有图片则显示这个 -->
          <view class="ExampleImg" v-if="businessInformationForm.businessLicense">
            <tui-icon @click="businessInformationForm.businessLicense = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
            <image class="avatarImg" :src="businessInformationForm.businessLicense"></image>
          </view>
          <!-- 上传图片时，显示这个 -->
          <view class="add-img-icon ExampleImg" v-else @click="handleUploadImg('businessLicense')">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
        </view>

        <view class="subtitle" style="margin-top: 24rpx">门店门头上传（门头照片与经营场所相符）</view>
        <view class="uploadBox">
          <view class="ExampleImg">
            <image class="cnmd" src="@/static/images/entryOfMerchants/mendian.png"></image>
            <text class="gallery" @click="imgShow = true">示例图 点击浏览</text>
            <tui-gallery :urls="urls" :show="imgShow" @hide="imgShow = false"></tui-gallery>
          </view>
          <!-- 上传完成，有图片则显示这个 -->
          <view class="ExampleImg" v-if="businessInformationForm.rotationChart">
            <tui-icon @click="businessInformationForm.rotationChart = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
            <image class="avatarImg" :src="businessInformationForm.rotationChart"></image>
          </view>
          <!-- 上传图片时，显示这个 -->
          <view class="add-img-icon ExampleImg" v-else @click="handleUploadImg('rotationChart')">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
        </view>

        <view class="subtitle" style="margin-top: 24rpx">门店LOGO上传（门店清晰LOGO图片）</view>
        <view class="uploadBox">
          <view class="ExampleImg">
            <image class="cnmd" src="@/static/images/entryOfMerchants/logo.png"></image>
            <text class="gallery" @click="imgShow = true">示例图 点击浏览</text>
            <tui-gallery :urls="urls" :show="imgShow" @hide="imgShow = false"></tui-gallery>
          </view>
          <!-- 上传完成，有图片则显示这个 -->
          <view class="ExampleImg" v-if="businessInformationForm.shopLogo">
            <tui-icon @click="businessInformationForm.shopLogo = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
            <image class="avatarImg" :src="businessInformationForm.shopLogo"></image>
          </view>
          <!-- 上传图片时，显示这个 -->
          <view class="add-img-icon ExampleImg" v-else @click="handleUploadImg('shopLogo')">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="nextSteps">
      <tui-button @click="nextSteps">下一步</tui-button>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { shopAuth, getAccountInfo, getShopInfo } from '@/api/community-center/merchantSettlement';
import { BusinessInformationRules } from '../toolData/rules';
import { getUserId, payOrderUtil } from '@/utils';
import { SELECT_ADDRESS, USER_TOKEN, B_SERVE_ORDER_NO } from '@/constant';
export default {
  name: 'BasicInformation',
  props: {
    businessInformationForm: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      rules: BusinessInformationRules,
      imgShow: false,
      imgKeyName: '',
      urls: [
        {
          src: require('@/static/images/entryOfMerchants/yingyezhizhao.png')
        },
        {
          src: require('@/static/images/entryOfMerchants/mendian.png')
        },
        {
          src: require('@/static/images/entryOfMerchants/logo.png')
        }
      ],
      fromData: {
        shopName: '', // 门店名称
        shopAddress: '', // 详细地址
        region: '', //地址
        businessType: '', // 经营类别
        businessLicense: '', // 营业执照
        doorHeader: '', // 门店门头
        shopLogo: '' // 门店logo
      }
    };
  },
  created() {
    getAccountInfo({
      userId: getUserId()
    }).then((res) => {
      this.businessInformationForm.accountId = res.accountId;
    });
    getShopInfo({
      userId: getUserId()
      // shopId: uni.getStorageSync('accountId')
    }).then(res => {
      for(let key in res){
        this.businessInformationForm[key] = res[key]
      }
      let addres = res.shopAddress.split(' ');
      this.businessInformationForm.region = addres[0];
      this.businessInformationForm.addresText = addres[1];
      console.log(this.businessInformationForm);
      // console.log(res)
    });
  },
  methods: {
    // 点击上传图片
    handleUploadImg(Key) {
      this.imgKeyName = Key; // 存一次键名 方便后面赋值
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          for (const imgFile of chooseImageRes.tempFiles) {
            uni.showLoading();
            uni.uploadFile({
              url: 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload',
              filePath: imgFile.path,
              name: 'file',
              formData: {
                token: USER_TOKEN,
                userId: getUserId()
              },
              success: (uploadFileRes) => {
                uni.hideLoading();
                _this.businessInformationForm[_this.imgKeyName] = JSON.parse(uploadFileRes.data).data.url;
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
    handleChooseAddress() {
      // 打开地址选择栏
      this.$refs.TuanCityRef.show();
    },
    handleConfirmAddress(selectInfo) {
      // 地址选择后的数据
      console.log(selectInfo);
      this.businessInformationForm.region = selectInfo.formatAddress4;
    },
    nextSteps() {
      // 触发下一步
      this.$refs.form
        .validate(this.businessInformationForm, this.rules)
        .then((res) => {
          // console.log(this.basicInformationForm)
          shopAuth(this.businessInformationForm)
            .then((res) => {
              // console.log(res)
              uni.setStorage({
                key: 'MERCHANT-SETTLEMENT-INFO',
                data: res
              });
              this.$emit('nextSteps', 2); // 用于跳转到下一个表单页
            })
            .catch((error) => {
              this.ttoast({
                type: 'info',
                title: error,
                content: '提交失败'
              });
            });
          // console.log('校验通过！')
        })
        .catch((errors) => {
          console.log(errors);
          this.ttoast({
            type: 'info',
            title: errors,
            content: '提交失败'
          });
        });
    },
    spliAddres(value) {
      this.businessInformationForm.shopAddress = this.businessInformationForm.region + ' ' + value;
      console.log(this.businessInformationForm.shopAddress);
    }
  }
};
</script>

<style lang="scss" scoped>
.moreSlectItem:active {
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
}
.formBox {
  position: relative;
  box-sizing: border-box;
  padding: 10rpx 30rpx 180rpx 30rpx;
  width: 100vw;
  height: auto;
  flex: 1;
  .FormContainer {
    overflow: hidden; // 清除浮动
    width: 100%;
    /* height: 733rpx; */
    background-color: #fff;
    border-radius: 20rpx;
    .formHeader {
      font-weight: 600;
      font-size: 32rpx;
      margin-left: 30rpx;
      margin-top: 39rpx;
      color: #08377f;
    }
  }
  .imgFilesUpload {
    box-sizing: border-box;
    padding: 40rpx 30rpx;
    margin-top: 24rpx;
    .upload_Item {
      /* margin-top: 38rpx;
      margin-left: 30rpx; */
      .subtitle {
        font-size: 28rpx;
        font-weight: normal;
        line-height: 38rpx;
        color: #526787;
      }
      .uploadBox {
        display: flex;
        margin-top: 24rpx;
        width: auto;
        .ExampleImg {
          margin-left: 20rpx;
          position: relative;
          width: 220rpx;
          height: 226rpx;
          background: #f7fbff;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .cnmd {
            width: 100%;
            height: 226rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
          .avatarImg {
            margin-left: 20rpx;
            width: 100%;
            height: 100%;
            border-radius: 12rpx;
          }
        }
        .add-img-icon {
          margin-left: 20rpx;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
        }
        .bigExample {
          position: relative;
          width: 100%;
          height: 228rpx;
          background: #f7fbff;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .expItem {
            background: #f7fbff;
            width: 276.34rpx;
            height: 174.91rpx;
          }
          .gallery {
            border-radius: 12rpx;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #f7fbff;
            text-align: center;
            font-size: 24rpx;
            font-weight: normal;
            line-height: 38rpx;
            background: #3982f1;
          }
        }
      }
      .uploadBig {
        margin-top: 38rpx;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .add-img-icon {
          position: relative;
          display: flex;
          align-items: center;
          width: 305rpx;
          height: 184rpx;
          border-radius: 12rpx;
          justify-content: center;
          background: #f7fbff;
          .add-icon {
            width: 60rpx;
            height: 60rpx;
          }
          .big-img-icon {
            width: 305rpx;
            height: 184rpx;
          }
          .big-img-icon2 {
            width: 630rpx;
            height: 227rpx;
          }
        }
      }
    }
  }
  .nextSteps {
    box-sizing: border-box;
    position: absolute;
    padding: 18rpx 30rpx 50rpx 30rpx;
    bottom: 0;
    left: 0;
    /* margin-top: 128rpx; */
    width: 100%;
    height: 150rpx;
    background-color: #fff;
  }
}
.inputBox {
  width: 100%;
  /* height: 460rpx; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.close-icon {
  position: absolute;
  top: -10upx;
  right: -10upx;
  width: 34upx;
  height: 34upx;
  z-index: 10;
}
</style>
