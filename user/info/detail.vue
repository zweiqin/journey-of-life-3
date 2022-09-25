<template>
  <view class="info-detail-container">
    <view class="op">
      <img
        src="../../static/images/store/chevron-states.png"
        alt=""
        @click="handleBack"
        class="back"
      />
      <view class="title">个人信息</view>
    </view>

    <view class="avatar-container">
      <img
        src="https://img1.baidu.com/it/u=1831586528,1339508464&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        alt=""
        class="avatar"
      />
      <view class="change-btn font-14">更换头像</view>
    </view>

    <view class="detail-container">
      <view class="item" @click="showEditDialog">
        <view class="title font-14 f-c-3d">昵称</view>
        <view class="value font-14 f-c-3d">{{ userInfo.nickName }}</view>
        <img
          src="../../static/images/common/chevron-states.png"
          class="icon"
          alt=""
        />
      </view>

      <view class="item">
        <view class="title font-14 f-c-3d">用户ID</view>
        <view class="value font-14 f-c-3d">{{ userInfo.userId }}</view>
        <img
          src="../../static/images/common/chevron-states.png"
          class="icon"
          alt=""
        />
      </view>

      <view class="item">
        <view class="title font-14 f-c-3d">账号密码</view>
        <view class="value font-14 f-c-3d">**********</view>
        <img
          src="../../static/images/common/chevron-states.png"
          class="icon"
          alt=""
        />
      </view>

      <view class="item">
        <view class="title font-14 f-c-3d">手机号</view>
        <view class="value font-14 f-c-3d">{{ userInfo.phone }}</view>
        <img
          src="../../static/images/common/chevron-states.png"
          class="icon"
          alt=""
        />
      </view>

      <view class="item">
        <view class="title font-14 f-c-3d">微信账号</view>
        <!-- <view class="unbound font-14 f-c-9" @click="handleUnboundWX">解绑</view> -->
        <view class="unbound font-14 f-c-9">未绑定</view>
      </view>

      <!-- <view class="item">
        <view class="title font-14 f-c-3d">解绑账号</view>
        <img
          src="../../static/images/common/chevron-states.png"
          class="icon"
          alt=""
        />
      </view> -->
    </view>

    <view class="logout">
      <button class="font-12 btn" @click="handleClickLogout">
        退出当前帐号
      </button>
    </view>

    <view class="picker" v-show="showLogout">
      <view class="mask" @click="showLogout = false"></view>
      <view class="items font-14 f-c-14">
        <!-- <view class="item">更换账号</view> -->
        <view class="item" @click="handleLagout">确定退出</view>
        <view class="item">取消</view>
      </view>
    </view>

    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="base"
        type="info"
        title="解绑微信"
        @confirm="handleUnboundWXConfirm"
        >确定解除与微信账号的绑定吗？</uni-popup-dialog
      >
    </uni-popup>

    <uni-popup ref="editNicknameDialogRef" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="base"
        type="info"
        title="修改昵称"
        @confirm="handleConfirmEditNickname"
      >
        <view class="edit-input">
          <view class="input-wrapper">
            <view class="title">（修改昵称）</view>
            <input v-model="nickname" type="text" />
          </view>
          <view class="error">请输入昵称</view>
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import { USER_ID, user_INFO, USER_TOKEN } from "../../constant";
import { layoutApi } from "../../api/auth";
import { getUserId } from "../../utils";

export default {
  data() {
    return {
      showLogout: false,
      nickname: "",
      userInfo: {},
    };
  },
  mounted() {
    this.userInfo = uni.getStorageSync(user_INFO);
    console.log(this.userInfo);
  },
  methods: {
    handleClickLogout() {
      this.showLogout = true;
    },

    handleBack() {
      uni.switchTab({
        url: "/pages/user/user",
      });
    },

    /**
     * @description 点击解绑微信
     */
    handleUnboundWX() {
      this.$refs.inputDialog.open();
    },

    /**
     * @description 点击修改昵称
     */
    showEditDialog() {
      this.$refs.editNicknameDialogRef.open();
    },

    /**
     * @description 确认解绑微信号
     */
    handleUnboundWXConfirm() {
      console.log("解绑");
    },

    /**
     * @description 点击确定修改昵称
     */
    handleConfirmEditNickname() {
      console.log(this.nickname);
    },

    /**
     * 点击退出
     */
    async handleLagout() {
      const res = await layoutApi(getUserId());
      if (res.errno === 0) {
        uni.removeStorageSync(USER_ID);
        uni.removeStorageSync(USER_TOKEN);
        uni.removeStorageSync(user_INFO);

        uni.navigateTo({
          url: "/pages/login/login",
        });

        return;
      }

      uni.showToast({
        title: "退出失败",
        duration: 2000,
        icon: "none",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.info-detail-container {
  padding: 72upx 32upx;
  box-sizing: border-box;
  overflow: hidden;

  .op {
    display: flex;
    align-items: center;
    font-size: 32upx;
    color: #000;

    .back {
      width: 48upx;
      margin-right: 32upx;
    }
  }

  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 30upx 0 60upx 0;

    .avatar {
      width: 188upx;
      height: 188upx;
      border-radius: 50%;
      margin-bottom: 18upx;
    }

    .change-btn {
      color: #ff8f1f;
    }
  }

  .detail-container {
    padding: 8upx;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40upx 0 6upx 0;
      border-bottom: 1upx solid #d8d8d8;

      .title {
        flex: 2;
        font-weight: bold;
      }

      .value {
        flex: 4;
      }
    }
  }

  .logout {
    margin-top: 280upx;
    .btn {
      color: #ff8f1f;
      border: none;
      background: transparent;

      &::after {
        border: none;
      }
    }
  }

  .picker {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;

    .mask {
      width: 100vw;
      height: 100vh;
      background-color: rgba(216, 216, 216, 0.5);
    }

    .items {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #fff;

      .item {
        text-align: center;
        padding: 32upx 0;
        overflow: hidden;
        border-bottom: 1upx solid #d8d8d8;
        color: #ff8f1f;

        &:last-child {
          border: none;
          color: #999;
        }
      }
    }
  }

  .edit-input {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    color: #3d3d3d;
    font-size: 28upx;
    margin: 14upx 0;
    border-bottom: 1upx solid #d8d8d8;

    .input-wrapper {
      display: flex;
      align-items: center;
    }

    .title {
      white-space: nowrap;
    }

    .error {
      height: 0;
      overflow: hidden;
      margin-left: 10px;
      color: #f40;
      transition: all 350ms linear;
    }
  }
}
</style>