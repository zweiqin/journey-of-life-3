<template>
  <view class="formBox">
    <view class="FormContainer">
      <view class="formHeader">基本信息</view>
      <tui-form ref="form">
        <view class="inputBox">
          <tui-input labelColor="#526787" :borderBottom="false" label="联系人名" placeholder="请输入姓名" clearable v-model="fromData.contacts"></tui-input>
          <tui-input labelColor="#526787" :borderBottom="false" label="联系电话" placeholder="请输入联系电话" clearable v-model="fromData.contactsTel"></tui-input>
          <tui-input labelColor="#526787" :borderBottom="false" label="身份证号" placeholder="请输入身份证号" clearable v-model="fromData.ident"></tui-input>
          <tui-input labelColor="#526787" :borderBottom="false" label="银行卡号" placeholder="请输入银行卡号" clearable v-model="fromData.contacts"></tui-input>
          <tui-input labelColor="#526787" :borderBottom="false" label="银行名称" placeholder="请输入银行名称" clearable v-model="fromData.contacts"></tui-input>
        </view>
      </tui-form>
    </view>
    <view class="FormContainer imgFilesUpload">
      <view style="margin: 0rpx" class="formHeader">个人实名认证</view>
      <view class="upload_Item">
        <view class="subtitle" style="margin-top: 24rpx">头像上传（本人正面清晰头像）</view>
        <view class="uploadBox">
          <view class="ExampleImg">
            <image class="cnmd" src="@/static/images/entryOfMerchants/ExampleImghuman.png"></image>
            <text class="gallery" @click="imgShow = true">示例图 点击浏览</text>
            <tui-gallery :urls="urls" :show="imgShow" @hide="imgShow = false"></tui-gallery>
          </view>
          <!-- 上传完成，有图片则显示这个 -->
          <view class="ExampleImg" v-if="fromData.avatarUrl">
            <tui-icon @click="fromData.avatarUrl = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
            <image class="avatarImg" :src="fromData.avatarUrl"></image>
          </view>
          <!-- 上传图片时，显示这个 -->
          <view class="add-img-icon ExampleImg" v-else @click="handleUploadImg('avatarUrl')">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
        </view>
        <view style="margin-top: 24rpx" class="subtitle">身份证上传（本人正反面清晰身份证）</view>
        <view class="uploadBox">
          <view class="bigExample">
            <image class="expItem" src="@/static/images/entryOfMerchants/shenfenzheng.png"></image>
            <image class="expItem" src="@/static/images/entryOfMerchants/shenfenzheng2.png"></image>
            <text class="gallery" @click="imgShow = true">示例图 点击浏览</text>
            <tui-gallery :urls="urls2" :show="imgShow" @hide="imgShow = false"></tui-gallery>
          </view>
        </view>
        <view class="uploadBig">
          <!-- 上传图片时，显示这个 -->
          <view class="add-img-icon" v-if="fromData.certImg1">
            <tui-icon
              @click="fromData.certImg1 = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
            <image
              class="big-img-icon" :src="fromData.certImg1"></image>
          </view>
          <view class="add-img-icon" v-else @click="handleUploadImg('certImg1')">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
          <view class="add-img-icon" v-if="fromData.certImg2">
          <tui-icon @click="fromData.certImg2 = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
            <image class="big-img-icon" :src="fromData.certImg2"></image>
          </view>
          <view class="add-img-icon" v-else @click="handleUploadImg('certImg2')">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
        </view>
        <view style="margin-top: 24rpx" class="subtitle">身份证上传（本人正反面清晰身份证）</view>
        <view class="uploadBox">
          <view class="bigExample">
            <image class="expItem" src="@/static/images/entryOfMerchants/kard1.png"></image>
            <!-- <image class="expItem" src="@/static/images/entryOfMerchants/shenfenzheng2.png"></image> -->
            <text class="gallery" @click="imgShow = true">示例图 点击浏览</text>
            <tui-gallery :urls="urls3" :show="imgShow" @hide="imgShow = false"></tui-gallery>
          </view>
        </view>
        <view class="uploadBig">
          <!-- 上传图片时，显示这个 -->
          <view class="add-img-icon" style="width: 630rpx;height: 227rpx;" v-if="fromData.BankCard1">
            <tui-icon
              @click="fromData.BankCard1 = ''" name="close-fill" color="#FC4023" :size="17" class="close-icon"></tui-icon>
            <image class="big-img-icon2" :src="fromData.BankCard1"></image>
          </view>
          <view class="add-img-icon" style="width: 630rpx;height: 227rpx;"  v-else @click="handleUploadImg('BankCard1')">
            <image class="add-icon" src="@/static/images/con-center/add-icon.png"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="nextSteps">
        <tui-button>下一步</tui-button>
    </view>
  </view>
</template>

<script>
import { getUserId, payOrderUtil } from "@/utils";
import { SELECT_ADDRESS, USER_TOKEN, B_SERVE_ORDER_NO } from "@/constant";
export default {
  name: "BasicInformation",
  data() {
    return {
      imgShow: false,
      imgKeyName: "",
      urls: [
        {
          src: require("@/static/images/entryOfMerchants/ExampleImghuman.png"),
        },
      ],
      urls2: [
        { src: require("@/static/images/entryOfMerchants/shenfenzheng.png") },
        { src: require("@/static/images/entryOfMerchants/shenfenzheng2.png") },
      ],
      urls3: [
        {
          src: require("@/static/images/entryOfMerchants/kard1.png"),
        },
      ],
      fromData: {
        contacts: "", // 门店联系人
        contactsTel: "", // 门店联系电话
        ident: "", //身份证号
        avatarUrl: "",
        certImg1: "",
        certImg2: "",
        BankCard1: ''
      },
    };
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
              url: "https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload",
              filePath: imgFile.path,
              name: "file",
              formData: {
                token: USER_TOKEN,
                userId: getUserId(),
              },
              success: (uploadFileRes) => {
                uni.hideLoading();
                _this.fromData[_this.imgKeyName] = JSON.parse(
                  uploadFileRes.data
                ).data.url;
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
    },
  },
};
</script>

<style lang="scss" scoped>
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
            width: 175rpx;
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
  height: 600rpx;
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
