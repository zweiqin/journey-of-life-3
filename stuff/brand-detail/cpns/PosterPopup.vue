<template>
  <tui-popup
    :duration="500"
    :modeClass="['fade']"
    :styles="styles"
    :show="popupVisible"
  >
    <view class="poster-container">
      <image
        v-show="posterImage"
        class="poster-iamge"
        :src="posterImage"
        mode=""
      />
      <l-painter
        is-canvas-to-temp-filePath
        v-show="!posterImage"
        @done="handlePainterSuccess"
        ref="painter"
        css=" background: #fff; border-radius: 32rpx"
      >
        <l-painter-image
          :src="logo"
          :css="{
            background: logoBg,
            objectFit: 'contain',
            width: '622rpx',
            height: '622rpx',
          }"
        />

        <l-painter-view
          css="padding: 32rpx;
              display: flex;
              justifyContent: space-between; 
               width: 622rpx;"
        >
          <l-painter-view css="width: 350rpx">
            <l-painter-text
              text="公司简介"
              css=" marginTop: 500upx;
                      display: inline-block;
                      color: #000;
                      fontSize: 32rpx;
                      fontWeight: bold"
            />

            <l-painter-text
              :text="desc"
              css=" display: block;
                      color: #605D52;
                      fontSize: 28rpx;
                      marginTop: 12rpx;
                      marginBottom: 14rpx;
                      line-clamp: 2
                      "
            ></l-painter-text>

            <l-painter-image
              :src="require('../../../static/images/user/code/line.png')"
              css="width: 48rpx;
                      height: 48rpx"
            ></l-painter-image>
          </l-painter-view>

          <l-painter-view css="width: 160rpx;textAlign:center;marginLeft:48rpx">
            <l-painter-image
              :src="shareCode"
              css="width: 160rpx;
                      height: 160rpx"
            ></l-painter-image>

            <l-painter-text
              text="扫码进入店铺"
              css=" display: block;
                      color: #605D52;
                      fontSize: 22rpx;
                      marginTop: 24rpx"
            ></l-painter-text>
          </l-painter-view>
        </l-painter-view>
      </l-painter>

      <button class="uni-btn" @click="handleSaveImage">保存/分享</button>

      <view class="close-wrapper">
        <tui-icon
          @click="handleClosePopup"
          name="close"
          color="#fff"
          :size="37"
        ></tui-icon>
      </view>
    </view>

    <!-- 分析logo颜色 -->
    <canvas
      class="canvas-el"
      id="tui-color-palette"
      canvas-id="tui-color-palette"
    ></canvas>
  </tui-popup>
</template>

<script>
export default {
  data() {
    return {
      styles: Object.freeze({
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        background: 'rgba(0, 0, 0, 0.6)',
      }),
      posterImage: '',
      logoBg: '#fff',
      popupVisible: false,
      shareCode: null,
      desc: '',
      logo: '',
    }
  },

  methods: {
    show({ shareCode, logo, desc }) {
      const _this = this
      this.popupVisible = true
      this.shareCode = shareCode
      this.desc = desc
      this.logo = logo
      this.$forceUpdate()

      this.$nextTick(() => {
        this.$refs.painter.canvasToTempFilePathSync({
          fileType: 'jpg',
          quality: 1,
          success: res => {
            this.$forceUpdate()
            if (!_this.posterImage) {
              _this.posterImage = res.tempFilePath
            }
          },
        })
      })
    },
    handleSaveImage() {
      uni.showToast({
        title: '长按海报即可分享和保存海报',
        duration: 2000,
        icon: 'none',
      })
    },

    // 绘制海报成功
    handlePainterSuccess() {
      const _this = this
      this.$nextTick(() => {
        this.$refs.painter.canvasToTempFilePathSync({
          fileType: 'jpg',
          quality: 1,
          success: res => {
            if (!_this.posterImage) {
              _this.posterImage = res.tempFilePath
            }
          },
        })
      })
    },

    handleClosePopup() {
      this.popupVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.poster-container {
  width: 622upx;
  border-radius: 32upx;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .uni-btn {
    width: 80%;
    height: 100upx;
    line-height: 100upx;
    border-radius: 100px;
    background-color: #fff;
    margin: 40upx 0;
  }

  .poster-iamge {
    width: 622upx;
    height: 888upx;
    border-radius: 32upx;
  }
}

.canvas-el {
  position: absolute;
  z-index: -1;
}
</style>
