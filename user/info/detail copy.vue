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

      <tui-list-cell arrow @click="handleBindWxChat">
        <view class="user-info-item">
          <view class="title">微信账号</view>
          <view class="value">未绑定</view>
        </view>
      </tui-list-cell>
      <!-- #ifdef APP -->
      <tui-list-cell arrow @click="handleCheckedVersion">
        <view class="user-info-item">
          <view class="title">检查更新</view>
          <view class="value">当前版本：{{ currentVersion }}</view>
        </view>
      </tui-list-cell>
      <!-- #endif -->
    </view>

    <view class="logout section">
      <tui-list-cell style="background: rgba(0, 0, 0, 0)">
        <view @click="isShowModal = true" style="color: #fe9f21">
          退出当前帐号
        </view>
      </tui-list-cell>
    </view>

    <!-- #ifdef APP -->
    <CheckedVersion ref="checkedVersion"></CheckedVersion>
    <!-- #endif -->

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
import { getOpenIdApi, handleBindOpenIdApi } from '../../api/app'
export default {
  data() {
    return {
      isShowModal: false,
      changeNicknamePopupVisible: false,
      newNickname: '',
      isFocus: false,
      userInfo: {},
      currentVersion: '',
      code: '',
      openId: '',
      mobile: '',
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
        this.$store.dispatch('auth/logout')
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

    // 检查版本更新
    handleCheckedVersion() {
      this.$refs.checkedVersion.checkedVersion()
    },

    // 绑定微信号
    async handleBindWxChat() {
      const appid = 'wxb19ccb829623be12'
      const local =
        'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/user/info/detail'
      this.code = this.getUrlCode().code

      if (this.code == null || this.code === '') {
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          appid +
          '&redirect_uri=' +
          encodeURIComponent(local) +
          '&response_type=code&scope=snsapi_base#wechat_redirect'
      } else {
        const res = await getOpenIdApi({
          code: this.code,
        })

        alert(res)

        this.openId = res.openId
        this.mobile = res.mobile

        try {
          await handleBindOpenIdApi({
            userId: this.$store.getters.userId,
            phone: res.mobile,
            openId: res.openId,
          })

          uni.showToast({
            title: '微信绑定成功',
            duration: 2000,
          })
        } catch (error) {
          uni.showToast({
            title: '微信绑定失败',
            duration: 2000,
          })
        }
      }
    },

    // 获取url code
    getUrlCode() {
      var url = location.search
      var theRequest = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      }
      return theRequest
    },
  },

  onShow() {
    this.userInfo = uni.getStorageSync(USER_INFO)
  },

  onLoad() {
    const _this = this
    uni.getSystemInfo({
      success: function (res) {
        _this.currentVersion = res.appVersion
      },
    })
  },
}
</script>

<style lang="less" scoped>
.user-detain-info-container {
	// font-size: 28upx;
	width: 100vw;
	min-height: 100vh;
	background-color: #f6f6f6;
	// @include flex(space-between, column);
	// display: flex;
	// justify-content: space-between;
	// align-items: center;
	// flex-direction: column;
}
/deep/.header-container{
	padding: 36upx 0 56upx 40upx !important;
}
/deep/ 
	::after{
		    border-bottom: 0 solid #eaeef1 !important;
	}
.return{
	width: 24upx;
	height: 48upx;
	padding: 36upx 0 56upx 40upx;
}

.section {
	// width: 100%;
	background-color: #fff;
	border-radius: 24upx;
	margin: 0 40upx;
	min-height: 880upx;
}

.avatar {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	margin-bottom: 38upx;

	.image-wrapper {
		box-sizing: border-box;
		width: 160upx;
		height: 160upx;
		// @include flex(center);
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: rgb(184, 184, 184);
		background: #fff;
		border-radius: 50%;
		border: 4upx solid #F1F1F0;
		margin-top: 64upx;
		margin-bottom: 8upx;

		image {
			width: 188upx;
			height: 188upx;
			border-radius: 50%;
		}
	}

	text {
		color: #FFC117;
		font-size: 28upx;
	}
}

.user-info-item {
	// @include flex(space-between);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 40upx;
	// margin: 20upx 0;
	.title{
		color: #605D52;
	}
	.value{
		color: #141000;
	}
}

.logout {
	text-align: center;
	margin-top: 54upx;
	// margin-bottom: 100upx;
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
