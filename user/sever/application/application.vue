<template>
  <view class="application-container">
    <TuanPageHead title="邀请" background="#fff">
      <tui-icon @click="handleBack" style="margin-left: -28upx" slot="left" color="#000" :size="28" name="arrowleft"></tui-icon>
    </TuanPageHead>

    <view class="shop-info" v-if="shopInfo">
      <image class="shop-logo" :src="shopInfo.shopLogo"></image>
      <view class="info-wrapper">
        <view class="shop-name">{{ shopInfo.shopName }}</view>
        <view class="address">
          <tui-icon name="home-fill" :size="15" margin="0 10rpx 0 0"></tui-icon>
          {{ shopInfo.shopAddress }}
        </view>
      </view>
    </view>

    <view class="application-content">
      <view class="title">门店留言:</view>

      <view class="content">
        {{ currentInviteInfo.content }}
      </view>
    </view>

    <view class="footer">
      <button :loading="isLoading === '1'" class="uni-btn confirm" @click="handleClickBtn('1')">同意</button>
      <button :loading="isLoading === '2'" class="uni-btn" @click="handleClickBtn('2')">拒绝</button>
    </view>

    <tui-modal :show="modalVisible" title="提示" :content="modalContent" @click="handleClick"></tui-modal>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { shareholderApprStoreBindApplicationApi, getInviteListApi, getShopInfoByIdApi } from '../../../api/community-center'
import { USER_ID, USER_INFO } from '../../../constant'
export default {
  data() {
    return {
      modalVisible: false,
      applicationForm: {
        applicationId: undefined,
        approveAct: undefined // 1: 同意, 2：拒绝
      },
      isLoading: '',
      currentInviteInfo: {},
      shopInfo: null
    }
  },

  onLoad(options) {
    this.applicationForm.applicationId = options.id
    if (!options.id) {
      this.home()
    }
    if (!uni.getStorageSync(USER_ID)) {
      uni.redirectTo({ url: `/pages/login/login?to=/user/sever/application/application?id=${options.id}` })
    }

    this.getInviteInfo()
  },

  methods: {
    handleBack() {
      getCurrentPages().length <= 1 ? this.home() : uni.navigateBack()
    },
    async handleClick(e) {
      if (!e.index) {
        this.applicationForm.approveAct = ''
        this.modalVisible = false
      } else {
        try {
          this.isLoading = this.applicationForm.approveAct
          this.modalVisible = false
          const res = await shareholderApprStoreBindApplicationApi(this.applicationForm)
          if (res.statusCode === 20000) {
            this.ttoast('操作成功')
            setTimeout(() => {
              this.home()
            }, 2000)
          } else {
            throw new Error(res.statusMsg)
          }
        } catch (error) {
          this.ttoast({ type: 'fail', title: '操作失败', content: error.message || error })
        } finally {
          this.isLoading = ''
        }
      }
    },
    handleClickBtn(e) {
      this.applicationForm.approveAct = e
      this.modalVisible = true
    },

    home() {
      uni.switchTab({ url: '/' })
    },

    async getInviteInfo() {
      const userInfo = uni.getStorageSync(USER_INFO)
      if (!userInfo.phone) {
        return this.home()
      }
      const res = await getInviteListApi({
        bizType: 2,
        inviteUserPhone: userInfo.phone, // 被邀请人手机号
        pageNo: 1,
        pageSize: 100
      })


      if (res.statusCode === 20000) {
        const current = res.data.records.find((item) => item.id == this.applicationForm.applicationId)
        if (current) {
          this.currentInviteInfo = current
          const res2 = await getShopInfoByIdApi({ userIds: current.userId })
          if (Array.isArray(res2.data) && res2.data.length) {
            this.shopInfo = res2.data[0]
          }
        } else {
          this.home()
        }
      } else {
        this.home()
      }
    }
  },

  computed: {
    modalContent() {
      return this.applicationForm.approveAct === '1' ? '确认同意成为股东?' : this.applicationForm.approveAct === '2' ? '确认拒绝成为股东？' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.application-container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffece5;

  .application-content {
    width: 93vw;
    margin: 20rpx auto 0;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    color: #3d3d3d;
    line-height: 1.5;

    .title {
      font-size: 30rpx;
    }

    .content {
      width: 100%;
      min-height: 300rpx;
      background-color: #f6f6f6;
      margin-top: 10rpx;
      padding: 20rpx;
      box-sizing: border-box;
      color: #000;
      border-radius: 10rpx;
    }
  }

  .shop-info {
    width: 93vw;
    margin: 20rpx auto 0;
    background-color: #fff;
    padding: 20rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    color: #3d3d3d;
    line-height: 1.5;
    display: flex;

    .shop-logo {
      width: 100rpx;
      height: 100rpx;
      border-radius: 20rpx;
      flex-shrink: 0;
      margin-right: 20rpx;
    }

    .info-wrapper {
      .shop-name {
        font-weight: 500;
        margin-bottom: 10rpx;
      }

      .address {
        font-size: 28rpx;
        color: #666666;
        width: 560rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    background-color: #fff;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 88rpx;
      border-radius: 10rpx;
      background-color: #ccc;
      font-size: 28rpx;
      color: #fff;

      &.confirm {
        background-color: #fa5e2a;
        margin-right: 20rpx;
        font-weight: 500;
      }
    }
  }
}
</style>
