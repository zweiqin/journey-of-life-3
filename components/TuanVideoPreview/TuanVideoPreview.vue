<template>
  <view class="tuan-video-preview-container">
    <tui-popup :duration="500" :modeClass="mode" :styles="styles" :show="transShow">
      <view class="main-wrapper">
        <tui-icon @click="transShow = false" class="close-icon" :size="30" name="shut" color="#fff"></tui-icon>

        <video
          v-if="videoList.length === 1"
          style="width: 100vw"
          :src="common.seamingImgUrl(videoList[0].url)"
        ></video>

        <swiper :current="currentIndex" @change="handleSwiperChange" class="swiper-container" v-if="videoList.length > 1">
          <swiper-item class="swiper-item" v-for="(video, index) in videoList" :key="video.url">
            <view class="video-wrapper">
              <view class="mask" @click="handlePlayVideo(index)"></view>
              <video ref="video.ref" style="width: 100vw" :src="video.url"></video>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </tui-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      transShow: false,
      mode: ['fade'],
      videoList: [],
      styles: Object.freeze({
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'z-index': "999999"
      }),
      currentIndex: 0
    };
  },

  methods: {
    showModel(videoUrl, videoList) {
      this.transShow = true;
      this.currentIndex = videoList.indexOf(videoUrl);
      this.videoList = videoList.map((item, index) => {
        return {
          url: item,
          ref: 'video' + index
        };
      });

      console.log("你妈的", videoList);
    },

    // 点击播放视频
    handlePlayVideo(index) {
      this.$refs['video.ref'][index].play();

      setTimeout(() => {
        this.$refs['video.ref'][index].controls = true;
      }, 10000);
    },

    // 轮播滑动了
    handleSwiperChange(e) {
      const currentIndex = e.detail.current;
      if (currentIndex > 0) {
        this.$refs['video.ref'][currentIndex - 1].pause();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  jcenter-content: center;

  .close-icon {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    z-index: 9999;
    cursor: pointer;
  }

  .swiper-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);

    .swiper-item {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;

      .video-wrapper {
        position: relative;

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 12;
        }
      }
    }
  }
}
</style>
