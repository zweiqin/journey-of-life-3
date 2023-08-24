<template>
  <view class="image-list" :style="{ borderTop: topLine ? '1upx solid #eeeeee' : 'none' }" v-if="scourceList && scourceList.length">
    <view class="image-wrapper" v-for="(source, index) in scourceList" :key="index">
      <view @click="previewVideo(source)" v-if="isVideoSource(source)" class="video-wrapper">
        <view class="video-mask">
          <tui-icon name="play" :size="38"></tui-icon>
        </view>
        <video :src="source"></video>
      </view>
      <tui-lazyload-img mode="widthFix" v-else class="comment-img" :src="source" @click="handlePreviewImg(index)"></tui-lazyload-img>
      <!-- <view class="close" @click="handleRemoveImg(source)">
        <tui-icon class="close-icon" :size="15" color="#fff" name="shut"></tui-icon>
      </view> -->
    </view>

    <!-- <view class="image-wrapper add" @click="handleUploadImg" v-show="commentForm.commentFile.length < 6">
      <tui-icon name="camera" color="#666666" :size="40"></tui-icon>
    </view> -->

    <TuanVideoPreview ref="tuanVideoPreviewRef"></TuanVideoPreview>
  </view>
</template>

<script>
import { isVideoSource } from '../../utils';
export default {
  props: {
    scourceList: {
      type: Array,
      required: true
    },

    topLine: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    isVideoSource,
    handlePreviewImg(index) {
      const urls = this.scourceList.filter((item) => !isVideoSource(item));
      uni.previewImage({
        current: index,
        urls
      });
    },
    previewVideo(videoUrl) {
      const videoList = this.scourceList.filter((item) => isVideoSource(item));
      console.log(videoList);
      this.$refs.tuanVideoPreviewRef.showModel(videoUrl, videoList, () => {
        uni.stopPullDownRefresh();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.image-list {
  font-size: 0;
  // padding-top: 20upx;
  border-top: 1upx solid #eeeeee;

  /deep/ .tui-lazyload__box.comment-img {
    width: 210upx !important;
    height: 210upx !important;
  }

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
    margin-bottom: 20upx;


    /deep/ .tui-lazyload__img {
      width: 210upx !important;
      height: 210upx !important;
    }

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
</style>
