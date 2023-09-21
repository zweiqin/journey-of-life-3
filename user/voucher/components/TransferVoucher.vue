<template>
  <view>
    <tui-top-dropdown :mask="false" :zIndex="1002" :maskZIndex="1001" :height="0" :show="popupVisible" @close="handleHiddenPopup">
      <view class="popup-container">
        <view class="pane-title-wrapper">
          <view class="title">代金券转增</view>
          <tui-icon :size="24" @click="handleHiddenPopup" name="close"></tui-icon>
        </view>

        <view class="input-wrapper">
          <view
            class="input-item"
            :style="{
              'border-bottom': currentReceiveUserInfo ? 'none' : '1upx solid #f6f6f6',
              'margin-bottom': currentReceiveUserInfo ? '0upx' : '30upx'
            }"
          >
            <view class="input-title">转赠账号</view>
            <input class="input" v-model="receiveUserId" placeholder="请输入要转赠的用户编号" type="number" />
            <button class="uni-btn search-btn" @click="handleSeachUser">查询</button>
          </view>

          <view
            class="receive-user-container"
            :style="{ 'border-bottom': !currentReceiveUserInfo ? 'none' : '1upx solid #e9e9e9', 'margin-bottom': currentReceiveUserInfo ? '30upx' : '0upx' }"
            v-if="currentReceiveUserInfo"
          >
            <image class="avatar" :src="currentReceiveUserInfo.avatarUrl"></image>
            <view class="receive-user-info">
              <view class="user-avatar">{{ currentReceiveUserInfo.nickname || currentReceiveUserInfo.phone }}</view>
              <view class="level">{{ currentReceiveUserInfo.userLevelDesc }}</view>
            </view>
          </view>

          <view class="input-item" style="border-bottom: 0.5px #e9e9e9 solid">
            <view class="input-title">转赠</view>
            <input class="input" v-model="transformForm.number" type="text" placeholder="请输入转增代金券数量" />
          </view>

          <view class="input-item">
            <view class="input-title">目前持有</view>
            <view class="input">{{ currentHoldVoucher }}</view>
          </view>
        </view>

        <button :loading="isLoading" class="uni-btn" @click="handleTranfer">确认转赠</button>
      </view>
    </tui-top-dropdown>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { refrshUserInfoApi } from '../../../api/user';
import { voucherTransferApi } from '../../../api/goods';
import { getUserId } from '../../../utils';

export default {
  data() {
    return {
      popupVisible: false,
      currentCount: '',
      isLoading: false,
      receiveUserId: '',
      currentReceiveUserInfo: null,
      currentHoldVoucher: 0,
      transformForm: {
        holdId: getUserId(),
        number: '',
        userId: null,
        voucherId: 1
      }
    };
  },
  methods: {
    show(count) {
      if (isNaN(count)) {
        this.transformForm.number = '';
      } else {
        this.transformForm.number = Number(count);
      }
      this.popupVisible = true;
      this.getUserHoldVoucher();
    },

    handleHiddenPopup() {
      this.currentCount = '';
      this.popupVisible = false;
    },

    // 查询用户
    async handleSeachUser() {
      if (!this.receiveUserId) {
        this.ttoast({
          type: 'info',
          title: '请输入赠予者用户ID'
        });
        return;
      }

      try {
        const res = await refrshUserInfoApi({
          userId: this.receiveUserId
        });

        if (res.errno == '0') {
          this.currentReceiveUserInfo = res.data;
          this.transformForm.userId = res.data.userId;
        } else {
          this.ttoast({
            type: 'info',
            title: res.errmsg
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 确认转赠
    async handleTranfer() {
      try {
        if (!this.transformForm.number || isNaN(this.transformForm.number)) {
          this.ttoast({
            type: 'info',
            title: '请输入合法的金额数字'
          });
          return;
        }

        if (this.transformForm.number > this.currentHoldVoucher) {
          this.ttoast({
            type: 'info',
            title: '转赠数量超过持有数量'
          });
          return;
        }

        if (!this.transformForm.userId) {
          this.ttoast({
            type: 'info',
            title: '请查询用户信息',
            content: '确保转赠人信息存在'
          });
          return
        }

        this.isLoading = true;

        await voucherTransferApi({ ...this.transformForm });
        this.ttoast('转赠成功');
        this.$emit('refresh');
        this.close();
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },

    // 获取代金券持有
    async getUserHoldVoucher() {
      try {
        const res = await refrshUserInfoApi({
          userId: getUserId()
        });

        if (res.errno == '0') {
          this.currentHoldVoucher = res.data.voucherNumber;
          if (this.transformForm.number > res.data.voucherNumber) {
            this.transformForm.number = res.data.voucherNumber;
          }
        } else {
          this.ttoast({
            type: 'info',
            title: res.errmsg
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 关闭
    close() {
      this.currentCount = '';
      this.receiveUserId = null;
      this.currentReceiveUserInfo = null;
      this.currentHoldVoucher = 0;
      this.transformForm = {
        holdId: getUserId(),
        number: '',
        userId: null,
        voucherId: 1
      };
      this.popupVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.popup-container {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  padding: 30upx;
  box-sizing: border-box;

  .pane-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 32upx;
      color: #000;
      font-weight: 500;
    }
  }

  .input-wrapper {
    // padding: 20upx;
    // background-color: #f6f6f6;
    margin-top: 40upx;
    margin-bottom: 40upx;
    .input {
      font-size: 30upx;
    }

    .input-item {
      display: flex;
      align-items: center;
      padding: 40upx 30upx;
      border-bottom: 1upx solid #e9e9e9;
      margin-bottom: 30upx;
      background-color: #fff;
      border-radius: 20upx;

      &:nth-child(3) {
        border-bottom: none;
        margin-bottom: 0;
      }

      .input-title {
        text-align: right;
        width: 140upx;
        white-space: nowrap;
        color: #ef530e;
      }

      .search-btn {
        width: auto;
        height: auto;
        padding: 10upx 20upx;
        opacity: 0.7;
        margin-bottom: 0;
        margin-top: 0;
      }

      .input {
        flex: 1;
        margin: 0 20upx 0 20upx;
      }
    }
  }

  .uni-btn {
    width: 100%;
    height: 90upx;
    background-color: #ef530e;
    margin-top: 100upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    color: #fff;
  }
}

.receive-user-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20upx;
  border-radius: 0 0 20upx 20upx;
  border-top: 1upx #f6f6f6 solid;

  .avatar {
    width: 100upx;
    height: 100upx;
    border-radius: 100px;
    border: 2upx solid #f6f6f6;
    margin-right: 20upx;
    background-color: #fff;
    flex-shrink: 0;
  }

  .receive-user-info {
    flex: 1;
  }
}
</style>
