<template>
  <view class="user-detain-info-container">
    <view class="section">
      <NewHeader
        @back="handleBack"
        title="用户信息"
        position="left"
        top="61%"
        padding="40upx 60upx 20upx 0"
        tabbar="/pages/user/user"
      ></NewHeader>

      <view class="avatar">
        <view class="image-wrapper">
          <image :src="userInfo.avatarUrl" mode="" />
        </view>
        <text @click="handleChooseImage">更换头像</text>
      </view>

      <tui-list-cell arrow>
        <view
          class="user-info-item"
          @click="
            changeNicknamePopupVisible = true
            isFocus = true
          "
        >
          <view class="title">用户昵称</view>
          <view class="value">{{ userInfo.nickName }}</view>
        </view>
      </tui-list-cell>

      <tui-list-cell arrow>
        <view class="user-info-item">
          <view class="title">团蜂ID</view>
          <view class="value">{{ userInfo.userId }}</view>
        </view>
      </tui-list-cell>

      <tui-list-cell v-if="userInfo.invitationCode">
        <view class="user-info-item">
          <view class="title">会员编号</view>
          <view class="value">{{ userInfo.invitationCode }}</view>
        </view>
      </tui-list-cell>

      <tui-list-cell arrow>
        <view class="user-info-item">
          <view class="title">性别</view>
          <view class="value">{{ userInfo.gender ? '女' : '男' }}</view>
        </view>
      </tui-list-cell>

      <tui-list-cell arrow>
        <view class="user-info-item">
          <view class="title">手机号</view>
          <view class="value">{{ userInfo.phone }}</view>
        </view>
      </tui-list-cell>

      <tui-list-cell arrow>
        <view class="user-info-item">
          <view class="title">微信账号</view>
          <view class="value">未绑定</view>
        </view>
      </tui-list-cell>
    </view>

    <view class="logout section">
      <tui-list-cell style="background: rgba(0, 0, 0, 0)">
        <view @click="isShowModal = true" style="color: #fe9f21">
          退出当前帐号
        </view>
      </tui-list-cell>
    </view>

    <tui-modal
      @click="handleClickModal"
      :show="isShowModal"
      title="提示"
      content="确定退出登录吗？"
    ></tui-modal>

    <tui-bottom-popup
      backgroundColor="transparent"
      :height="300"
      :show="changeNicknamePopupVisible"
      @close="
        changeNicknamePopupVisible = false
        isFocus = false
        newNickname = ''
      "
    >
      <view class="nickname">
        <view class="pane">
          <text>修改昵称：</text>
          <input
            :focus="isFocus"
            type="text"
            v-model.trim="newNickname"
            :placeholder="userInfo.nickName"
          />
        </view>

        <button class="uni-btn" @click="handleCHnageNickName">确认</button>
      </view>
    </tui-bottom-popup>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { USER_INFO } from '../../constant'
import { updateUserInfoApi, refrshUserInfoApi } from '../../api/user'
export default {
  data() {
    return {
      isShowModal: false,
      changeNicknamePopupVisible: false,
      newNickname: '',
      isFocus: false,
      userInfo: {},
    }
  },
  methods: {
    // 上传图片
    handleChooseImage() {
      const _this = this
      uni.chooseImage({
        count: 1,
        success: res => {
          // _this.newAvatarUrl = res.tempFilePaths[0]
          // uni.showLoading({
          //   title: "图片上传中...",
          // });
          // uni.uploadFile({
          //   url: UPLOAD_IMG_URL,
          //   filePath: res.tempFilePaths[0],
          //   name: "file",
          //   success: (uploadFileRes) => {
          //     const avatarUrl = JSON.parse(uploadFileRes.data).data.url;
          //     console.log(avatarUrl);
          //     _this.updateUserInfo({
          //       key: "avatar",
          //       value: avatarUrl,
          //     });
          //   },
          //   complete: () => {
          //     uni.hideLoading();
          //   },
          // });

          uni.navigateTo({
            url: '/user/info/cropper?imgUrl=' + res.tempFilePaths[0],
          })
        },
        fail: () => {
          _this.ttoast('图片上传失败')
        },
      })
    },

    // 裁切图片并上传
    cropper(e) {
      console.log(e)
    },

    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },

    // 修改用户信息
    async updateUserInfo(data, cb) {
      await this.updateUserInfo(data, cb)
      console.log(111111)
      uni.showToast({
        title: '信息修改成功',
      })
      typeof cb === 'function' && cb()
    },

    updateUserInfo(updateData, cb) {
      const _this = this
      const originData = {
        nickname: _this.userInfo.nickName,
        avatar: _this.userInfo.avatarUrl,
        password: _this.userInfo.password,
        id: _this.userInfo.userId,
      }

      originData[updateData['key']] = updateData['value']

      return new Promise((resolve, reject) => {
        uni.showLoading({
          title: '修改中',
        })
        updateUserInfoApi(originData)
          .then(() => {
            uni.hideLoading()
            uni.showToast({
              title: '信息修改成功',
            })
            this.refrshUserInfo()
            cb && typeof cb === 'function' && cb()
            resolve()
          })
          .catch(err => {
            uni.hideLoading()
            reject(err)
          })
      })
    },

    handleCHnageNickName() {
      if (!this.newNickname) {
        uni.showToast({
          title: '请填写昵称',
        })
        return
      }

      this.updateUserInfo(
        {
          key: 'nickname',
          value: this.newNickname,
        },
        () => {
          this.userInfo.newNickname = ''
          this.isFocus = false
          this.changeNicknamePopupVisible = false
          uni.hideKeyboard()
        }
      )
    },

    handleClickModal(e) {
      const { index } = e
      if (index) {
        uni.clearStorageSync()
        uni.showToast({
          title: '退出成功',
          duration: 500,
          mask: true,
        })

        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index',
          })
        }, 500)
      }
      this.isShowModal = false
    },

    // 刷新用户信息
    refrshUserInfo(cb) {
      refrshUserInfoApi({
        userId: this.userInfo.userId,
      }).then(({ data }) => {
        uni.setStorageSync(USER_INFO, data)
        this.userInfo = data
        this.$forceUpdate()
      })
    },
  },

  onShow() {
    this.userInfo = uni.getStorageSync(USER_INFO)
  },
}
</script>

<style lang="less" scoped>
.user-detain-info-container {
  font-size: 28upx;
  min-height: 100vh;
  background-color: #f4f4f4;
  // @include flex(space-between, column);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.section {
  width: 100%;
  background-color: #fff;
}

.avatar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30upx;

  .image-wrapper {
    width: 190upx;
    height: 190upx;
    // @include flex(center);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(184, 184, 184);
    border-radius: 50%;
    margin-top: 100upx;
    margin-bottom: 20upx;

    image {
      width: 188upx;
      height: 188upx;
      border-radius: 50%;
    }
  }

  text {
    color: #fc8c07;
  }
}

.user-info-item {
  // @include flex(space-between);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40upx;
  // margin: 20upx 0;
}

.logout {
  text-align: center;
  margin-top: 20upx;
  margin-bottom: 100upx;
  background-color: transparent;
  color: #fc8c07;
}

.nickname {
  // @include flex(space-around, column);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  // background-color: #f40;

  .pane {
    width: 90%;
    display: flex;
    align-items: center;

    // @include pdd(20upx);
    padding: 20upx;
    box-sizing: border-box;
    // margin: 40upx auto;
    background-color: #fff;
    border-radius: 20upx;

    tetx {
      color: #777;
    }

    input {
      flex: 1;
    }
  }

  .uni-btn {
    width: 90%;
    background-color: #fc8c07;
    color: #fff;
    padding: 30upx 0;
    border-radius: 100px;
  }
}
</style>
