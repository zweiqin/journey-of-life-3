<template>
  <tui-popup :duration="500" :modeClass="mode" :styles="styles" :show="show">
    <view class="tuan-progress-containter" :class="{ active: isWait }">
      <view class="tip">{{ title }}</view>
      <tui-progress :percent="progress" :activeColor="activeColor" show-info :color="progressColor"></tui-progress>
    </view>
  </tui-popup>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '上传中'
    },
    progress: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },

    activeColor: {
      type: String,
      default: 'linear-gradient(to right,#07c160,#ff7900)'
    },

    progressColor: {
      type: String,
      default: '#ff7900'
    }
  },
  data() {
    return {
      mode: ['fade'],
      styles: Object.freeze({
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'background-color': 'rgba(0,0,0,0.5)',
        'z-index': 1000000000
      }),
      isWait: false,
      watcherTimer: null
    }
  },

  watch: {
    progress: {
      handler(value) {
        if (value === 100 || !this.show) {
          clearTimeout(this.watcherTimer)
          this.isWait = false
          return
        }
        if (this.watcherTimer) {
          clearTimeout(this.watcherTimer)
        }
        this.watcherTimer = setTimeout(() => {
          this.isWait = true
        }, 1000)
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.tuan-progress-containter {
  width: 80vw;
  padding: 30upx 20upx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10rpx;

  .tip {
    color: #3d3d3d;
    font-size: 28rpx;
    margin-bottom: 8rpx;
  }

  &.active {
    /deep/ .tui-progress__bar {
      position: relative;

      @keyframes animate-width {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      &::after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: '';
        width: 0;
        height: 100%;
        background: linear-gradient(to right, rgba(230, 255, 242, 0.534), rgba(255, 247, 240, 0.486));
        animation: animate-width 1s ease-in-out infinite;
      }
    }
  }
}
</style>
