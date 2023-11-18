<template>
  <view class="brand-gallery-container">
    <swiper class="scource-list-swipper" autoplay circular :current="currentItem">
      <swiper-item class="scource-list-swipper-item" v-for="item in (currentMode === 'img' ? imageList : videoList)">
        <image v-if="!isVideo(item)" style="width: 100%; height: 100%; border-radius: 20upx;" :src="item">
        </image>
        <video style="width: 100%; height: 100%; border-radius: 20upx;" v-else :src="item"></video>
      </swiper-item>
    </swiper>
    <view class="dot-wrapper" v-if="videoList.length" :class="{ position: currentMode === 'video' }">
      <view class="dot-item" @click="handleChangeMode('img')" :class="{ active: currentMode === 'img' }">图片</view>
      <view class="dot-item" @click="handleChangeMode('video')" :class="{ active: currentMode === 'video' }">视频</view>
    </view>
  </view>
</template>

<script>
import { isVideo } from '../../../../utils'

export default {
  props: {
    advertisement: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      currentMode: 'img',
      imageList: [],
      videoList: [],
      currentItem: 0
    }
  },

  watch: {
    advertisement: {
      handler(galleryStr) {
        this.initGallery(galleryStr)
      },

      immediate: true
    }
  },

  methods: {
    isVideo,
    initGallery(galleryStr) {
      if (galleryStr) {
        this.imageList = []
        this.videoList = []
        const scourseList = galleryStr.split(',')
        for (const scourse of scourseList) {
          if (isVideo(scourse)) {
            this.videoList.push(scourse)
          } else {
            this.imageList.push(scourse)
          }
        }
      }
    },
    handleChangeMode(mode) {
      if (this.currentMode === mode) return
      this.currentItem = 0
      this.currentMode = mode
      this.$forceUpdate()
    }
  },
}
</script>

<style lang="less" scoped>
.brand-gallery-container {
  position: relative;
  width: 700upx;
  height: 380upx;
  border-radius: 20upx;
  overflow: hidden;

  .scource-list-swipper {
    width: 100%;
    height: 100%;
    border-radius: 1upx solid #f1f1f1;

    .scource-list-swipper-item {
      width: 100%;
      height: 100%;
    }
  }

  .dot-wrapper {
    position: absolute;
    bottom: 20upx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    transition: all 350ms;

    &.position {
      left: 140upx;
      top: -226upx;
    }

    .dot-item {
      width: 110upx;
      height: 58upx;
      text-align: center;
      line-height: 58upx;
      font-size: 28upx;
      color: fff;
      background: rgba(251, 244, 244, 0.8);
      border-radius: 0px 50px 50px 0px;

      &:nth-child(1) {

        border-radius: 50upx 0px 0px 50upx;
      }

      &.active {
        background: #000000;
        opacity: 0.8;
        color: #fff;
      }
    }
  }
}
</style>