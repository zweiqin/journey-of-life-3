<template>
  <view class="cropper-container">
    <tui-cropper
      :isRound="true"
      :imageUrl="cropperUrl"
      @cropper="handleConfirm"
      @ready="handleReady"
    ></tui-cropper>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { USER_INFO } from '../../constant'
import { IMG_UPLOAD_URL } from '../../config'
import { updateUserInfoApi, refrshUserInfoApi } from '../../api/user'
export default {
  onLoad(params) {
    this.imgUrl = params.imgUrl
  },

  data() {
    return {
      imgUrl: '',
      cropperUrl: '',
      timer: null,
    }
  },

  methods: {
    handleReady() {
      this.cropperUrl = this.imgUrl
    },

    handleConfirm(e) {
      const _this = this
      const userInfo = uni.getStorageSync(USER_INFO)
      uni.showLoading({
        title: '图片上传中...',
      })
      uni.uploadFile({
        url: IMG_UPLOAD_URL,
        filePath: e.url,
        name: 'file',
        success: async uploadFileRes => {
          const avatarUrl = JSON.parse(uploadFileRes.data).data.url
          const originData = {
            nickname: userInfo.nickName,
            avatar: userInfo.avatarUrl,
            password: userInfo.password,
            id: userInfo.userId,
            avatar: avatarUrl,
          }

          updateUserInfoApi(originData)
            .then(data => {
              uni.hideLoading()
              uni.showToast({
                title: '头像修改成功',
              })

              refrshUserInfoApi({
                userId: userInfo.userId,
              }).then(({ data }) => {
                uni.setStorageSync(USER_INFO, data)
                this.userInfo = data
                this.$forceUpdate()
              })
            })
            .catch(err => {
              console.log(err)
              uni.hideLoading()
            })

          uni.showToast({
            title: '头像上传成功',
          })
          setTimeout(() => {
            uni.redirectTo({ url: '/user/info/detail' })
          }, 1000)
        },
        complete: () => {
          uni.hideLoading()
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .tui-op__btn {
  color: #fff;
}
</style>
