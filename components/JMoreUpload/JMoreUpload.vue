<template>
  <view>
    <view class="title" v-if="title">{{ title }}</view>
    <view class="upload-pane">
      <view class="left">
        <view @click="chooseImg" class="upload">+</view>
        <view class="img-wrapper" v-for="item in imgs" :key="item">
          <img class="iamge-background img" :src="item" mode="" />
          <JIcon
            @click="removeBackground(item)"
            class="delete-icon"
            width="40"
            height="40"
            type="delete"
          ></JIcon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    imgs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeBackground(item) {
      console.log(item);
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "确定删除当前图片吗？",
        success: function (res) {
          if (res.confirm) {
            _this.$emit("delete", item);
          }
        },
      });
    },

    chooseImg() {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          uni.uploadFile({
            url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
            filePath: chooseImageRes.tempFiles[0].path,
            name: "file",
            success: (uploadFileRes) => {
              _this.$emit("upload", JSON.parse(uploadFileRes.data).data.url);
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  color: #3d3d3d;
  font-size: 24upx;
  margin: 48upx 0 20upx 0;
  
}

.upload-pane {
  border: 1upx solid #d8d8d8;
  padding: 32upx 24upx;
  box-sizing: border-box;
  border-radius: 20upx;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .delete-icon {
    width: 32upx;
    height: 36upx;
  }

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .upload {
    margin: 0;
    width: 160upx;
    // height: 160upx;
    background-color: #ececec;
    border-radius: 20upx;
    color: #767676;
    text-align: center;
    line-height: 160upx;
    font-size: 60upx;
    margin-right: 40upx;
    margin-bottom: 20upx;
  }

  .iamge-background {
    width: 160upx;
    height: 160upx;
    object-fit: cover;
  }

  .img-wrapper {
    margin-right: 40upx;
    position: relative;

    .delete-icon {
      position: absolute;
      top: -10upx;
      right: -10px;
      border-radius: 50%;
      background-color: #ffffff;
    }

    .img {
      border-radius: 20upx;
      margin-bottom: 20upx;
    }
  }
}
</style>