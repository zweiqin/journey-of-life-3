<template>
  <view class="item" v-if="fansInfo" @click="$emit('view', fansInfo)">
    <view class="avatar-wrapper">
      <image class="avatar" :src="fansInfo.headImage"></image>
      <view class="mask">{{ fansInfo.role | filterRole }}</view>
    </view>
    <view class="info">
      <view class="name">{{ fansInfo.userName }}
        <!-- <tui-icon margin="0 0 0 10upx" :color="fansInfo.gender === 0 ? '#10aeff' : '#f37e7d'" name="friendadd-fill" :size="18"></tui-icon> -->
        <!-- <view class="add-time">绑定时间:{{ fansInfo.addTime }}</view> -->

        <view class="account-wrapper" style="font-size: 24upx; color: #3d3d3d; "> 产生佣金: <text style="color: #f40;">￥{{
          fansInfo.amount }}</text></view>
      </view>

			<view style="font-size: 26upx;text-align: right;">{{ fansInfo.updateTime || '--' }}</view>

      <view class="phone">
        <view class="phone-number">{{ fansInfo.phone ? fansInfo.phone.slice(0, 3) + '****' + fansInfo.phone.slice(7) : '-'
        }}
        </view>
        <button class="uni-btn" @click="handleCallPhone(fansInfo.phone)">
          <tui-icon class="icon" color="#ccc" :size="16" name="voipphone"></tui-icon>
          拨打
        </button>
      </view>

      <view class="fans-wrapper">
        <view class="fans-item">
          <view class="fans-title">粉丝数：</view>
          <view class="numbers">{{ fansInfo.fans }}</view>
        </view>
        <view class="fans-item">
          <view class="fans-title">今日粉丝数：</view>
          <view class="numbers">{{ fansInfo.todayFans }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    fansInfo: {
      type: Object,
      required: true
    }
  },

  filters: {
    filterRole(role) {
      return { 5: '区代理', 4: '加盟商', 3: '合伙人', 2: '团长', 1: '会员',0: '未知' }[role]
    }
  },

  methods: {
    handleCallPhone(phone) {
      if (!phone) return;
      uni.makePhoneCall({
        phoneNumber: phone
      });
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  margin-top: 30upx;
  padding: 20upx;
  box-sizing: border-box;
  width: 700upx;
  background-color: #fff;
  border-radius: 10upx;
  display: flex;
  align-items: flex-start;

  .avatar-wrapper {
    position: relative;
    border-radius: 10upx;
    overflow: hidden;
    border: 1upx solid #f3f3f3;

    .mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 40upx;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 24upx;
      color: #fff;
      text-align: center;
      line-height: 40upx;
    }
  }

  .avatar {
    flex-shrink: 0;
    width: 100upx;
    height: 100upx;
    border-radius: 10upx;
    display: block;
  }

  .info {
    flex: 1;
    margin-left: 20upx;

    .name {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 28upx;
      font-weight: 500;

      .add-time {
        font-size: 24upx;
      }
    }

    .phone {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24upx;
      margin-top: 16upx;

      .uni-btn {
        display: flex;
        align-items: center;
        color: #ccc;
        font-size: 24upx;

        .icon {
          margin-right: 10upx !important;
        }
      }
    }
  }
}

.fans-wrapper {
  font-size: 24upx;
  color: #3d3d3d;
  display: flex;
  align-items: center;
  margin-top: 20upx;

  .fans-item {
    flex: 1;
    color: #000;
    display: flex;

    &:nth-child(2) {
      text-align: right;
      justify-content: flex-end;
    }

    .fans-title {
      color: #ccc;
    }
  }
}
</style>