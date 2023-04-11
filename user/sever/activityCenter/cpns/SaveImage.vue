<template>
  <tui-popup
    :styles="styles"
    :duration="500"
    :show="value"
    @click="handleClosePopup"
    @change="handlePopupStatusChange"
  >
    <view class="wrapper">
      <view class="popup-container">
        <l-painter ref="painter">
          <l-painter-image
            :src="require('../../../../static/images/user/code/header.png')"
            css=" background: #fff;
              objectFit: cover;
              width: 622rpx;
              height: 468rpx;"
          />

          <l-painter-view
            css="padding: 32rpx;
              display: flex;
              justifyContent: space-between; 
               width: 622rpx;"
          >
            <l-painter-view css="width: 350rpx">
              <l-painter-text
                text="公司愿景"
                css=" marginTop: 500upx;
                      display: inline-block;
                      color: #000;
                      fontSize: 32rpx;
                      fontWeight: bold"
              />

              <l-painter-text
                text="成为家居行业数字化营销的领跑者"
                css=" display: block;
                      color: #605D52;
                      fontSize: 28rpx;
                      marginTop: 24rpx;
                      marginBottom: 14rpx"
              ></l-painter-text>

              <l-painter-image
                :src="require('../../../../static/images/user/code/line.png')"
                css="width: 48rpx;
                      height: 48rpx"
              ></l-painter-image>
            </l-painter-view>

            <l-painter-view
              css="width: 160rpx;textAlign:center;marginLeft:48rpx"
            >
              <l-painter-image
                :src="code"
                css="width: 160rpx;
                      height: 160rpx"
              ></l-painter-image>

              <l-painter-text
                text="扫码加入我们"
                css=" display: block;
                      color: #605D52;
                      fontSize: 22rpx;
                      marginTop: 24rpx"
              ></l-painter-text>
            </l-painter-view>
          </l-painter-view>
        </l-painter>
      </view>

      <button class="uni-btn" @click="handleSaveImage">保存到手机</button>

      <view class="close-wrapper">
        <tui-icon
          @click="handleClosePopup"
          name="close"
          color="#fff"
          :size="37"
        ></tui-icon>
      </view>
    </view>
  </tui-popup>
</template>

<script>
import { saveImg } from '../../../../utils'
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      styles: {
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        backgroundColor: 'rgba(0,0,0,.6)',
      },
      poster: {
        views: [
          {
            src: require('../../../../static/images/user/code/header.png'),
            type: 'image',
            css: {
              background: '#fff',
              objectFit: 'cover',
              width: '622rpx',
              height: '468rpx',
            },
          },
          {
            type: 'view',
            css: {
              padding: '32rpx',
              display: 'flex',
              justifyContent: 'space-between',
            },
            views: [
              {
                type: 'view',
                css: {
                  width: '375rpx',
                  height: '100%',
                  backgroundColor: '#f40',
                },

                views: [
                  {
                    text: '公司愿景',
                    type: 'text',
                    css: {
                      marginTop: '500upx',
                      display: 'inline-block',
                      color: '#000',
                      fontSize: '32rpx',
                      fontWeight: 'bold',
                    },
                  },
                  {
                    text: '成为家居行业数字化营销的领跑者',
                    type: 'text',
                    css: {
                      display: 'block',
                      color: '#605D52',
                      fontSize: '28rpx',
                      marginTop: '24rpx',
                      marginBottom: '14rpx',
                    },
                  },
                  {
                    type: 'image',
                    src: require('../../../../static/images/user/code/line.png'),
                    css: {
                      width: '48rpx',
                      height: '48rpx',
                    },
                  },
                ],
              },

              {
                type: 'view',
                css: {
                  width: '160rpx',
                  height: '300rpx',
                  backgroundColor: '#f40',
                },

                views: [
                  {
                    type: 'image',
                    src: this.code,
                    css: {
                      width: '160rpx',
                      height: '160rpx',
                    },
                  },
                  {
                    type: 'text',
                    text: '扫码加入我们',
                    css: {
                      color: '#8F8D85',
                      fontSize: '32rpx',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    }
  },

  methods: {
    handleClosePopup() {
      this.$emit('input', false)
    },

    handlePopupStatusChange(e) {},

    // 绘制完成
    handlePainterSuccess() {
      setTimeout(() => {
        this.$refs.lPainterRef.render(this.poster)
      }, 1000)
    },

    handleSaveImage() {
      this.$refs.painter.canvasToTempFilePathSync({
        // 在nvue里是jpeg
        fileType: 'jpg',
        quality: 1,
        success: res => {
          // uni.saveImageToPhotosAlbum({
          //   filePath: res.tempFilePath,
          //   success: function () {
          //     console.log('save success')
          //   },
          // })

          saveImg(res.tempFilePath)
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.popup-container {
  width: 622upx;
  height: 754upx;
  background: #fff;
  border-radius: 40upx;
  overflow: hidden;
}

.uni-btn {
  width: 622upx;
  height: 112upx;
  background: #fff;
  color: #141000;
  font-size: 32upx;
  border-radius: 100px;
  margin-top: 40upx;
  line-height: 112upx;
}

.close-wrapper {
  margin-top: 88upx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
