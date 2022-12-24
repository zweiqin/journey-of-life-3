<template>
  <view class="promotionUser">
    <view class="left" v-if="userInfo">
      <image :src="userInfo.avatarUrl" mode="scaleToFill" class="userImg" />
      <view class="userDetail">
        <view class="name">{{ userInfo.nickName }}</view>
        <view class="identity">
          <view class="moreidentity">{{ userInfo.userLevelDesc }}</view>
        </view>
      </view>
    </view>
    <view class="right">
      <image src="../image/share.png" mode="scaleToFill" class="share" />
    </view>
  </view>
</template>

<script>
import { user_INFO } from "../../../constant";

export default {
  props: {},
  data() {
    return {
      userInfo: null
    };
  },
  computed: {},
  methods: {},
  watch: {},
  mounted(){
    console.log(1);
    this.userInfo = uni.getStorageSync(user_INFO)
  }
};
</script>
<style lang="less" scoped>
.promotionUser {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    .userImg {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
    }
    .userDetail {
      margin-left: 40upx;
      .name {
        padding-bottom: 10upx;
        font-size: 28upx;
        font-weight: 600;
      }
      .identity {
        font-size: 24upx;
        display: flex;
        .moreidentity {
          margin-right: 20upx;
        }
      }
    }
  }
  .right {
    .share {
      height: 40upx;
      width: 40upx;
    }
  }
}
</style>