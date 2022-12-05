<template>
  <view
    class="create-namecard"
    :style="{
      paddingBottom: form.video ? '440upx' : '120upx',
    }"
  >
    <view class="my-card-header">
      <JBack dark width="50" height="50"></JBack>
      <h2>新建名片</h2>
    </view>

    <Collapse style="margin-top: 20px" title="基本信息">
      <view class="base-info">
        <view class="avatar" @click="handleUploadAvatar">
          <view v-if="!form.headPic" class="upload-icon">+</view>
          <img class="avatar-img" :src="form.headPic" v-else alt="" />
          <view class="upload-desc">添加名片图像</view>
        </view>

        <uni-img-cropper
          ref="gmyImgCropper"
          :quality="1"
          cropperType="fixed"
          :imgSrc="imgSrc"
          @getImg="getImg"
        ></uni-img-cropper>

        <view
          class="field-wrapper"
          v-for="item in baseInfoFields"
          :key="item.label"
        >
          <view class="title">{{ item.label }}</view>
          <view class="value-wrapper">
            <input
              v-model="form[item.field]"
              type="text"
              :placeholder="item.required ? '（必填）' : ''"
            />
          </view>
        </view>
      </view>
    </Collapse>

    <Collapse style="margin-top: 20px" title="联系方式">
      <view class="field-wrapper" v-for="item in connects" :key="item.label">
        <view class="title">{{ item.label }}</view>
        <view class="value-wrapper">
          <input
            v-model="form[item.field]"
            type="text"
            :placeholder="item.required ? '（必填）' : ''"
          />
        </view>
      </view>
    </Collapse>

    <Collapse style="margin-top: 20px" title="业务简介">
      <view class="detail-wrapper">
        <textarea
          ref="textareaRef"
          @blur="handleTextareaBlur"
          v-model.trim="form.intro"
          placeholder="请输入业务简介"
          class="desc-detail"
        ></textarea>
      </view>
    </Collapse>

    <Collapse style="margin-top: 20px" title="公司简介">
      <view class="detail-wrapper">
        <textarea
          ref="textareaRef"
          v-model="form.companyProfile"
          placeholder="请输入公司简介"
          class="desc-detail"
        ></textarea>
      </view>
    </Collapse>

    <Collapse ref="collapseRef" title="图片" :collapse="false">
      <JMoreUpload
        style="margin-top: 20px"
        @upload="handleUploadImg"
        @delete="handleDeleteImg"
        :imgs="form.imgs"
      ></JMoreUpload>
    </Collapse>

    <Collapse
      :collapse="false"
      style="margin-top: 20px"
      class="upload-video"
      title="视频"
    >
      <button
        v-show="!form.video"
        class="uni-btn upload-vido"
        @click="uploadVidoe"
      >
        +
      </button>

      <video class="video-el" v-show="form.video" :src="form.video"></video>

      <view class="reupload" @click="uploadVidoe" v-show="form.video"
        >重新上传</view
      >
    </Collapse>

    <view class="create-name-card-footer">
      <button class="uni-btn">删除名片</button>
      <button class="uni-btn" @click="handleCreateNameCard">
        {{ editId ? "确认修改" : "一键生成名片" }}
      </button>
    </view>
  </view>
</template>

<script>
import Collapse from "../components/collapse-name-card.vue";
import MaskS from "../components/mask.vue";
import {
  buildNewMyCardApi,
  getNameCardDetailApi,
  updateNameCardApi,
} from "../../../api/user";
import { baseInfoFields, connects } from "./config";
import { getUserId } from "../../../utils";

export default {
  components: {
    Collapse,
    MaskS,
  },
  data() {
    return {
      baseInfoFields,
      connects,
      form: {
        name: "",
        business: "",
        phone: "",
        position: "",
        company: "",
        wechat: "",
        address: "",
        intro: "",
        imgs: [],
        headPic: "",
        userId: getUserId(),
        isDefault: false,
        bgColor: "#183869",
        video: "",
        companyProfile:''
      },

      imgSrc: "",
    };
  },

  onLoad(options) {
    this.editId = options.edit;
    if (this.editId) {
      uni.setNavigationBarTitle({
        title: "编辑名片",
      });
      this.getNameCardDetail();
    }
  },

  methods: {
    handleTextareaBlur() {
      if (!this.form.intro) {
        const classList = this.$refs.editRef.$el.classList;
        classList.remove("animate__rotateOutUpRight");
        classList.add("animate__rotateInDownRight");
      }
    },

    // 点击一键生成名片
    handleCreateNameCard() {
      const _this = this;
      for (const item of this.baseInfoFields) {
        if (item.required && !this.form[item.field]) {
          this.$showToast(`请输入${item.label}`);
          return;
        }
      }

      const api = this.editId ? updateNameCardApi : buildNewMyCardApi;

      api({ ...this.form, id: this.editId * 1 }).then(() => {
        _this.$showToast(_this.editId ? "编辑成功" : "名片新建成功");
        _this.form = {
          name: "",
          business: "",
          phone: "",
          position: "",
          company: "",
          wechat: "",
          address: "",
          intro: "",
          imgs: [],
          headPic: "",
          userId: getUserId(),
          isDefault: false,
          bgColor: "#183869",
        };
        setTimeout(() => {
          uni.navigateTo({
            url: "/user/marketing-tools/contact-guide/my-cards",
          });
        }, 1000);
      });
    },

    // 上传图片
    handleUploadImg(img) {
      this.form.imgs.push(img);
    },

    // 删除图片
    handleDeleteImg(img) {
      const index = this.form.imgs.findIndex((item) => item === img);
      if (index !== 0) {
        this.form.imgs.splice(index, 1);
      }
    },

    // 获取图片
    getImg(e) {
      const _this = this;
      uni.showLoading({
        title: "头像上传中",
      });
      uni.uploadFile({
        url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
        filePath: e,
        name: "file",
        success: (uploadFileRes) => {
          _this.form.headPic = JSON.parse(uploadFileRes.data).data.url;
          uni.hideLoading();
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },

    // 上传头像
    handleUploadAvatar() {
      this.$refs.gmyImgCropper.chooseImage();
    },

    // 上传视频
    uploadVidoe() {
      const _this = this;
      uni.chooseVideo({
        count: 1,
        sourceType: ["camera", "album"],
        success: function (res) {
          uni.showLoading({
            title: "视频上传中",
          });
          uni.uploadFile({
            url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
            filePath: res.tempFilePath,
            name: "file",
            success: (uploadFileRes) => {
              _this.$showToast("上传成功", "success");
              _this.form.video = JSON.parse(uploadFileRes.data).data.url;
            },
            complete: () => {
              uni.hideLoading();
            },
          });
        },
      });
    },

    // 获取名片详情
    getNameCardDetail() {
      const _this = this;
      getNameCardDetailApi({
        id: this.editId,
      }).then(({ data }) => {
        console.log(data.businessCard);
        const detailInfo = data.businessCard;
        _this.form.headPic = detailInfo.headPic;
        _this.form.name = detailInfo.name;
        _this.form.intro = detailInfo.intro;
        _this.form.address = detailInfo.address;
        _this.form.company = detailInfo.company;
        _this.form.business = detailInfo.business;
        _this.form.phone = detailInfo.phone;
        _this.form.position = detailInfo.position;
        _this.form.wechat = detailInfo.wechat;
        _this.form.imgs = detailInfo.imgs;
        _this.form.video = detailInfo.video;

        // Object.assign(_this.form, detailInfo);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.create-namecard {
  padding: 40upx 30upx 120upx 46upx;
  box-sizing: border-box;

  .my-card-header {
    display: flex;
    align-items: center;

    h2 {
      color: #3d3d3d;
      font-size: 30upx;
      margin-top: -4upx;
      margin-left: 30upx;
    }
  }

  .field-wrapper {
    width: 100%;
    margin-top: 40upx;
    display: flex;

    .title {
      margin-right: 28upx;
      font-size: 28upx;
      color: #3d3d3d;
    }

    .value-wrapper {
      flex: 1;
      padding-bottom: 10upx;
      border-bottom: 1upx solid rgb(207, 207, 207);
      margin-right: 30upx;

      input {
        width: 100%;
        font-size: 28upx;
      }
    }
  }

  // 基本信息
  .base-info {
    padding: 20upx 0;
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .upload-icon {
        width: 160upx;
        height: 160upx;
        text-align: center;
        line-height: 160upx;
        background-color: #efefef;
        border-radius: 20upx;
        color: #999;
        font-size: 70upx;
      }

      .upload-desc {
        color: #999;
        font-size: 28upx;
        margin-top: 20upx;
      }
    }
  }

  .detail-wrapper {
    height: 414upx;
    border: 1upx solid #d8d8d8;
    margin-right: 30upx;
    border-radius: 20upx;
    margin-top: 20upx;
    position: relative;

    .desc-detail {
      width: 100%;
      height: 100%;
      padding: 20upx;
      box-sizing: border-box;
    }

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      background-color: aquamarine;
      width: 100%;
      height: 100%;
    }
  }

  .avatar-img {
    width: 160upx;
    height: 160upx;
    border-radius: 20upx;
  }

  .create-name-card-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 116upx;
    background-color: #fff;
    padding: 0 32upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;

    .uni-btn {
      padding: 16upx 0;
      border-radius: 100px;

      &:nth-child(1) {
        flex: 1;
        margin-right: 20upx;
        color: #fa5151;
        border: 1upx solid #fa5151;
      }

      &:nth-child(2) {
        flex: 2;
        background-color: #3662ec;
        color: #fff;
      }
    }
  }

  .upload-vido {
    margin-top: 32upx;
    margin-left: 24upx;
    width: 160upx;
    height: 160upx;
    border-radius: 20upx;
    text-align: center;
    line-height: 160upx;
    font-size: 60upx;
    background-color: #ececec;
  }

  .video-el {
    border-radius: 20upx;
    width: 100%;
    height: 400upx;
    margin-top: 20upx;
  }

  .upload-video {
    /deep/ .collapse-wrapper {
      overflow: inherit;
    }
  }

  .reupload {
    text-align: right;
    padding: 4upx 20upx;
    border-radius: 20px;
    background-color: #3662ec;
    display: inline-block;
    color: #fff;
    margin-top: 10px;
    float: right;
  }
}
</style>
