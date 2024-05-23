<template>
  <view class="rate-container">
    <TuanPageHead padding="0">
      <view class="head-wrapper" slot="left">
        <tui-icon style="margin-left: -28upx" color="#000" :size="28" name="arrowleft" @click="handleBack"></tui-icon>
        <text class="title">发表追评</text>
      </view>
      <button slot="right" class="uni-btn pub-btn" :loading="isLoading" @click="publishComment">发表追评</button>
    </TuanPageHead>

    <view class="main">
      <view class="comment-main-wrapper">
        <view class="serve-info">
          <image :src="orderInfo.serveUrl" class="serve-img"></image>
          <view class="serve-name">{{ orderInfo.serveName }}</view>
        </view>

        <tui-textarea
          min-height="400rpx"
          v-model="commentForm.appendComment"
          autoHeight
          :borderBottom="false"
          :maxlength="-1"
          :size="28"
          padding="20rpx 0 0 0"
          placeholder="服务完成已经一段时间了，再分享分享你的心得感受吧！"
        ></tui-textarea>

        <view class="tip"> 图片/视频最多上传6张 </view>

        <view class="image-wrapper">
          <view class="empty-img" @click="handleUploadImg" v-if="!commentForm.appendFileUrl.length">
            <tui-icon name="camera" color="#666666" :size="40"></tui-icon>
            <view class="tip">发图能帮助他人更真实地了解服务</view>
          </view>

          <view class="image-list" v-else>
            <view class="image-wrapper" v-for="(img, index) in commentForm.appendFileUrl" :key="index">
              <view @click="previewVideo(img)" v-if="isVideoSource(img)" class="video-wrapper">
                <view class="video-mask">
                  <tui-icon name="play" :size="38"></tui-icon>
                </view>
                <video :src="img"></video>
              </view>
              <tui-lazyload-img mode="widthFix" v-else class="comment-img" :src="img" @click="handlePreviewImg(index)"></tui-lazyload-img>
              <view class="close" @click="handleRemoveImg(img)">
                <tui-icon class="close-icon" :size="15" color="#fff" name="shut"></tui-icon>
              </view>
            </view>

            <view class="image-wrapper add" @click="handleUploadImg" v-show="commentForm.appendFileUrl.length < 6">
              <tui-icon name="camera" color="#666666" :size="40"></tui-icon>
            </view>
          </view>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
    <TuanVideoPreview ref="tuanVideoPreviewRef"></TuanVideoPreview>
  </view>
</template>

<script>
import { IMG_UPLOAD_URL } from '../../config';
import { appendCommentApi } from '../../api/community-center';
import { isVideoSource } from '../../utils';

export default {
  data() {
    return {
      orderInfo: {
        serveName: '',
        serveUrl: ''
      },

      timer: null,
      commentForm: {
        appendComment: '',
        commentId: '',
        appendFileUrl: []
      },
      isLoading: false
    };
  },
  onLoad(params) {
    this.setCommentInfo(params);
  },

  methods: {
    isVideoSource,
    // 返回
    handleBack() {
      uni.switchTab({
        url: '/pages/order/order'
      });
    },
    // 设置初始化数据
    setCommentInfo(params) {
      this.orderInfo.serveName = params.serveName;
      this.orderInfo.serveUrl = params.url;
      this.commentForm.commentId = params.commentId;
    },

    // 上传图片
    handleUploadImg() {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          for (const imgFile of chooseImageRes.tempFiles) {
            uni.showLoading();
            uni.uploadFile({
              url: IMG_UPLOAD_URL,
              filePath: imgFile.path,
              name: 'file',
              success: (uploadFileRes) => {
                uni.hideLoading();
                _this.commentForm.appendFileUrl.push(JSON.parse(uploadFileRes.data).data.url);
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

    // 预览图片
    handlePreviewImg(index) {
      const urls = this.commentForm.appendFileUrl.filter((url) => !isVideoSource(url));
      uni.previewImage({
        current: index,
        urls
      });
    },

    // 预览视频
    previewVideo(videoUrl) {
      const videoList = this.commentForm.appendFileUrl.filter((url) => isVideoSource(url));
      this.$refs.tuanVideoPreviewRef.showModel(videoUrl, videoList);
    },

    // 删除图片
    handleRemoveImg(imgUrl) {
      this.commentForm.appendFileUrl = this.commentForm.appendFileUrl.filter((item) => item !== imgUrl);
    },

    // 发布评论
    async publishComment() {
      if (!this.commentForm.appendComment) {
        this.ttoast({
          type: 'info',
          title: '请输入评论内容'
        });

        return;
      }

      try {
        this.isLoading = true;
        const commentData = JSON.parse(JSON.stringify(this.commentForm));
        commentData.appendFileUrl = commentData.appendFileUrl.join(',');

        await appendCommentApi(commentData);
        this.ttoast('追评成功');
        this.resetData();
        this.timer = setTimeout(() => {
          uni.redirectTo({
            url: '/community-center/comment-order/comment-order'
          });
        }, 2000);
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '发布失败',
          content: error
        });
      } finally {
        this.isLoading = false;
      }
    },

    // 重置data
    resetData() {
      this.orderInfo = {
        serveName: '',
        serveUrl: ''
      };

      this.timer = null;
      this.commentForm = {
        appendComment: '',
        commentId: '',
        appendFileUrl: []
      };
      this.isLoading = false;
    }
  },

  onHide() {
    clearTimeout(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="less" scoped>
.rate-container {
  min-height: 100vh;
  background-color: #f6f6f6;
  padding: 0 20upx;
  box-sizing: border-box;

  /deep/ .right {
    width: 200upx;
  }

  .head-wrapper {
    display: flex;
    align-items: center;
    margin-left: 10upx;

    .title {
      white-space: nowrap;
      font-size: 32upx;
      color: #000;
      font-weight: 500;
    }
  }
  .pub-btn {
    color: #fff;
    background: linear-gradient(90deg, #ffd100, #fe753f);
    padding: 10upx 20upx;
    border-radius: 100px;
    font-size: 28upx;
    transition: all 350ms;
    white-space: nowrap;

    &:active {
      opacity: 0.7;
    }
  }

  .main {
    margin-top: 140upx;
    .comment-main-wrapper {
      width: 100%;
      padding: 20upx;
      box-sizing: border-box;
      border-radius: 20upx;
      background-color: #fff;

      .serve-info {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 30upx;
        margin-top: -90upx;

        .serve-img {
          width: 140upx;
          height: 140upx;
          border-radius: 10upx;
          border: 1upx solid #f3f3f3;
          background-color: #fefefe;
        }

        .serve-name {
          font-size: 32upx;
          font-weight: 500;
          color: #3f3f3f;
          margin-top: 20upx;
        }

        .rate-item {
          display: flex;
          align-items: center;
          margin-top: 20upx;

          .title {
            color: #888888;
            font-size: 28upx;
            margin-right: 20upx;
          }
        }
      }

      .tip {
        color: #ccc;
        font-size: 28upx;
        margin-top: 20upx;
      }

      .image-wrapper {
        margin-top: 20upx;

        .video-wrapper {
          position: relative;

          .video-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 210upx;
            height: 210upx;
            background-color: transparent;
            z-index: 9;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .empty-img {
          border: 1upx dotted #dadada;
          width: 100%;
          padding: 40upx 0;
          border-radius: 20upx;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          transition: background-color 350ms;

          &:active {
            background-color: #e6e6e6;
          }

          .tip {
            margin-top: 20upx;
            color: #b8b8b8;
            font-weight: 500;
          }
        }

        .image-list {
          font-size: 0;
          // padding-top: 20upx;
          border-top: 1upx solid #eeeeee;

          /deep/ .tui-lazyload__box.comment-img {
            width: 210upx !important;
            height: 210upx !important;
          }

          .image-wrapper {
            background-color: #f7f7f7;
            position: relative;
            width: 210upx;
            height: 210upx;
            margin-right: 20upx;
            // background-color: #000;
            display: inline-block;
            text-align: center;
            border: 1upx solid #eeeeee;
            box-sizing: border-box;
            border-radius: 20upx;
            overflow: hidden;

            &.add {
              background-color: #f7f7f7;
              text-align: center;
              line-height: 220upx;
              // display: inline-block;
              vertical-align: bottom;
              transition: all 350ms;

              &:active {
                opacity: 0.4;
              }
            }

            .close {
              position: absolute;
              top: 0;
              right: 0;
              width: 50upx;
              height: 50upx;
              background-color: rgba(0, 0, 0, 0.75);
              border-radius: 0 0 0upx 40px;
              z-index: 10;

              &-icon {
                position: relative;
                top: 4upx;
                right: -4upx;
              }
            }

            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
