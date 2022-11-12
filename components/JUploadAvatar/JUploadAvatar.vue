<template>
  <view class="j-upload-avatar-container">
    <JIcon
      @click="$emit('close')"
      class="close-icon"
      width="40"
      height="40"
      type="close"
    ></JIcon>

    <okingtz-cropper
      saveButtonText="确定"
      @uploadSuccess="uploadSuccess"
    ></okingtz-cropper>

    <view class="mask"></view>
  </view>
</template>

<script>
// import OkingtzCropper from "@/uni_modules/okingtz-cropper/components/okingtz-cropper/okingtz-cropper";
import OkingtzCropper from "../../uni_modules/okingtz-cropper/components/okingtz-cropper/okingtz-cropper.vue";

export default {
  components: {
    OkingtzCropper,
  },

  methods: {
    // 上传回调
    uploadSuccess(tempFilePath) {
      const _this = this;

      uni.uploadFile({
        url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
        filePath: tempFilePath,
        name: "file",
        success: (uploadFileRes) => {
          _this.$emit("success", uploadFileRes);
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.j-upload-avatar-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  left: -100%;
  // background-color: rgba(0, 0, 0, 0.1);
  transition: all 350ms;

  .close-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 20;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .title {
    text-align: center;
    padding-top: 20px;
    margin-bottom: 40px;
  }

  /deep/ .container {
    height: 100%;
    width: 100%;
    background-color: transparent;

    .page-body {
      height: 100%;
      width: 100%;

      .cropper-content {
        position: relative;
        min-height: 300px;
      }

      .cropper-config {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        z-index: 10;

        .cropper-choose {
          background-color: #06b9b3 !important;
        }

        .cropper-confirm {
          background-color: #409eff !important;
        }
      }
    }
  }
}
</style>