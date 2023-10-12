<template>
  <view class="base-info-container">
    <view class="user-info">
      <Avatar
        @click="$emit('handleNavigate', { url: '/user/info/detail' })"
        margin="0 24upx 0 0"
        :src="$store.getters.userId ? $store.getters.userInfo.avatarUrl : require('../../../static/images/new-user/default-user-avatar.png')"
      ></Avatar>

      <view class="right-wrapper">
        <view v-if="!$store.getters.userId">
          <view class="logout-title">您好!</view>
          <view class="logout-tip">您目前暂未登录，请<text @click="go('/pages/login/login')">前往登录</text></view>
        </view>

        <view class="user-info-detail" v-else>
          <view class="user-nack-name">{{ $store.getters.userInfo.nickName }}</view>
          <view class="tags">
            <view class="tag" v-if="$store.getters.userInfo.userId == 987"> TF001 </view>
            <view class="tag BuLinBuLinDe" v-else>
              <image style="width: 24rpx;height: 24rpx;margin: 0 5rpx;" src="@/static/images/user/hrr.png"></image>
                {{ $store.getters.userInfo.invitationCode || 'No.' + $store.getters.userInfo.userId }}
            </view>
              <view class="vip-level">
                <image style="width: 54rpx;height: 54rpx;margin: 0 5rpx;" v-if="$store.getters.userInfo.userLevelDesc == '会员'" src="@/static/images/user/huiyuan.png"></image>
                <image style="width: 54rpx;height: 54rpx;margin: 0 5rpx;" v-if="$store.getters.userInfo.userLevelDesc == '团长'" src="@/static/images/user/tuanzhang.png"></image>
                <image style="width: 54rpx;height: 54rpx;margin: 0 5rpx;" v-if="$store.getters.userInfo.userLevelDesc == '合伙人'" src="@/static/images/user/hehuoren.png"></image>
                <image style="width: 54rpx;height: 54rpx;margin: 0 5rpx;" v-if="$store.getters.userInfo.userLevelDesc == '股东'" src="@/static/images/user/gudong.png"></image>
              </view>
              <view class="medalOfHonor">

              </view>
          </view>
        </view>

        <view class="op-container">
          <view class="wrapper" @click="$emit('handleNavigate', { url: '/user/sever/chat/chat' })">
            <image src="../../../static/images/new-user/user-chat.png" mode="" />
          </view>
          <view class="wrapper" @click="$emit('handleNavigate', { url: '/user/info/detail' })">
            <image src="../../../static/images/new-user/user-setting.png" mode="" />
          </view>
        </view>
      </view>
    </view>

    <view class="account-container">
      <view class="account-item" @click="$emit('handleNavigate', { url: '/user/sever/withdrawal/index' })">
        <!-- <view class="account-item" @click="$emit('handleNavigate', { url: '/user/sever/surplus/surplus' })"> -->
        <view class="account-number"> {{ data.account || 0 }} </view>
        <view class="account-title">余额 ></view>
      </view>

      <view class="account-item" @click="$emit('handleNavigate', { url: '/user/sever/goldButler/gold-butler' })">
        <view class="account-number">
          {{ 399 }}
        </view>
        <view class="account-title">家庭小卫士</view>
      </view>

      <view class="account-item" @click="$emit('handleNavigate', { url: '/user/sever/coupon/coupon' })">
        <view class="account-number">
          {{ $store.getters.couponNumber || 0 }}
        </view>
        <view class="account-title">优惠劵</view>
      </view>
    </view>
    <!-- 家庭小卫士 -->
    <view class="goldman" @click="handleToOpen">
      <image src="../../../static/images/center/logo.png" mode="" />
      <view class="text-list">
        <view class="first">家庭小卫士</view>
        <view class="second">享受四大权益</view>
      </view>
      <view class="open">{{ isBuy ? '立即进入' : '立即开通' }}</view>
    </view>

    <tui-modal
      :show="$data._isShowTuiModel"
      title="提示"
      content="您还未登录，是否先去登录？"
      @click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
    ></tui-modal>

    <tui-modal :show="isShow" title="提示" content="您已开通家庭小卫士" @click="handleToVip"></tui-modal>
  </view>
</template>

<script>
import { userIsPurchaseApi } from '../../../api/user';
import { USER_ID } from 'constant';
import showModalMixin from 'mixin/showModal';
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isShow: false,
      isBuy: false
    };
  },
  mixins: [showModalMixin()],
  mounted() {
    this.userIsPurchase();
  },
  methods: {
    // go() {
    // 	uni.navigateTo({ url: '/user/sever/surplus/surplus' })
    // }
    handleToVip(e) {
      if (e.index) {
        uni.navigateTo({ url: '/user/sever/goldButler/gold-butler' });
      }
      this.isShow = false;
    },
    // 立即开通
    handleToOpen() {
      const url = this.isBuy ? '/user/sever/goldButler/gold-butler' : '/community-center/vip-center/vip-detail?type=2';
      uni.navigateTo({
        url
      });
    },

    // 查询用户是否购买过家庭小卫士套餐
    async userIsPurchase() {
      try {
        const userId = uni.getStorageSync(USER_ID);
        const res = await userIsPurchaseApi({
          userId,
          price: 399
        });

        if (res.statusCode === 20000) {
          if (res.data && Array.isArray(res.data) && res.data.length) {
            this.isBuy = true;
          }
        } else {
          this.isBuy = false;
          // console.log('查询是否开通金管家', res);
        }
      } catch (error) {
        // console.log('查询是否开通金管家', error);
        this.isBuy = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
view,
text {
  line-height: 1.5 !important;
}

.base-info-container {
  position: relative;
  // height: 400upx;
  background: url('../../../static/images/new-user/info-bg.png') no-repeat;
  background-size: cover;
  padding: 80upx 32upx 0upx;
  box-sizing: border-box;

  .user-info {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logout-title {
        font-size: 28upx;
        font-weight: bold;
        line-height: 42upx;
      }

      .logout-tip {
        font-size: 24upx;
        line-height: 36upx;
        margin-top: 6upx;

        text {
          color: #ffc117;
        }
      }

      .op-container {
        display: flex;
        align-items: center;
        position: absolute;
        top: 32upx;
        right: 32upx;

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80upx;
          height: 80upx;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          box-sizing: border-box;
          border: 2upx solid #f1f1f0;

          &:nth-child(1) {
            margin-right: 24upx;
          }

          image {
            width: 48upx;
            height: 48upx;
          }
        }
      }
    }
  }

  .account-container {
    width: 100%;
    height: 144upx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    margin-top: 48upx;
    border-radius: 24upx;

    .account-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .account-number {
        font-size: 42upx;
        line-height: 64upx;
        font-weight: bold;
      }

      .account-title {
        color: #8f8d85;
        font-size: 24upx;
        line-height: 36upx;
      }
    }
  }

  .goldman {
    padding: 0 22upx;
    box-sizing: border-box;
    margin-top: 20upx;
    width: 100%;
    height: 144upx;
    border-radius: 24upx;
    background: linear-gradient(262deg, #fcd188 -4%, #ecb14c -4%, #ecb24d -4%, #fcd188 56%);
    display: flex;
    align-items: center;

    image {
      width: 56upx;
      height: 56upx;
    }

    .text-list {
      flex: 1;
      padding-left: 22upx;

      .first {
        font-size: 36upx;
        font-weight: 500;
        line-height: 54upx;
        color: #333333;
      }

      .second {
        font-size: 24upx;
        line-height: 32upx;
        color: #333333;
      }
    }

    .open {
      width: 152upx;
      height: 64upx;
      border-radius: 50upx;
      background: #402d0d;
      font-size: 24upx;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .user-info-detail {
    .user-nack-name {
      font-size: 32upx;
      font-weight: bold;
      color: #141000;
    }

    .tags {
      display: flex;
      align-items: center;
      /* padding-left: 24upx; */
      box-sizing: border-box;
      margin-top: 12upx;
      flex-wrap: wrap;

      .tag {
        box-sizing: border-box;
        padding: 4rpx 6rpx;
        display: flex;
        align-items: center;
        font-size: 24upx;
        color: #c4542f;
        height: 36upx;
        background: #f7d1c2;
        margin-right: 15rpx;

        &:nth-child(1) {
          border-radius: 8rpx;
          opacity: 1;
          background: linear-gradient(90deg, #FFFFFF 0%, #F9D090 100%);
          border: 1px solid #B4560A;
          /* white-space: nowrap;
          position: relative;
          padding-left: 22upx;
          padding-right: 20upx;
          box-sizing: border-box;
          border: 4upx solid #ff7a4e;
          border-radius: 0px 12upx 12upx 0px;
          margin-right: 16upx; */

          /* &::after {
            content: '';
            width: 40upx;
            height: 40upx;
            display: block;
            position: absolute;
            background: url('../../../static/images/new-user/star.png') no-repeat;
            background-size: cover;
            left: -24upx;
          } */
        }

        &:nth-child(2) {
          padding: 0 16upx;
          color: #3a3629;
          border: 4upx solid #3a3629;
          font-weight: 500;
          border-radius: 12upx;
          background-color: #fff;
        }
      }
    }
  }
}

/deep/ .avatar-container {
  image {
    border: 2upx solid #f1f1f0;
    background-color: #fff;
    box-sizing: border-box;
  }
}
</style>
