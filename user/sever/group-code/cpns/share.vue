<template>
  <view class="share-container">
    <view
      class="item"
      @click="handleClickShareItem(item.key)"
      v-for="(item, index) in shareList"
      :key="index"
    >
      <image class="icon" :src="item.icon" mode="" />
      <view class="label">{{ item.label }}</view>
    </view>

    <SaveImage :code="code" v-model="showSaveImage"></SaveImage>

    <BeeWxShare style="position: absolute" ref="beeWxShareRef"></BeeWxShare>
  </view>
</template>

<script>
import { USER_INFO } from '../../../../constant'
import SaveImage from './SaveImage.vue'
const shareList = [
  {
    label: '微信朋友',
    icon: require('../../../../static/images/user/code/we-chat.png'),
    key: 'wechat',
  },
  {
    label: '保存图片',
    icon: require('../../../../static/images/user/code/save.png'),
    key: 'image',
  },
  // {
  //   label: '分享链接',
  //   icon: require('../../../../static/images/user/code/link.png'),
  //   key: 'link',
  // },
]

export default {
  components: {
    SaveImage,
  },

  props: {
    code: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      shareList: Object.freeze(shareList),
      showSaveImage: false,
    }
  },

  methods: {
    async handleClickShareItem(shareItem, isQuit) {
      const userInfo = uni.getStorageSync(USER_INFO)
      console.log(this.code);
      const _this = this
      switch (shareItem) {
        case 'wechat':
          const data = {
            data: {
              title: '加入团蜂',
              desc: '扫一扫',
              link:
                'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/user/sever/code/fille-code?code=' +
                userInfo.invitationCode,
              imageUrl: _this.code,
            },
            successCb: () => {},
            failCb: () => {},
          }

          _this.$refs.beeWxShareRef.share(data, isQuit)
          break

        case 'image':
          this.showSaveImage = true
          break
        case 'link':
          uni.setClipboardData({
            data:
              'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/user/sever/code/fille-code?code=' +
              userInfo.invitationCode,
            success: () => {
              uni.showToast({
                title: '链接复制成功',
                duration: 2000,
              })
            },
          })
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.share-container {
  margin: 0 auto;
  position: relative;
  width: 622upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20upx 72upx;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 32upx;
  margin-top: 20upx;

  .icon {
    width: 80upx;
    height: 80upx;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    font-size: 26upx;
    line-height: 42upx;
  }
}
</style>
