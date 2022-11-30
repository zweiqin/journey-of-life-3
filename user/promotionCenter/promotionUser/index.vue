<template>
  <view class="promotionUser">
    <view class="left">
      <image src="../image/userimg.png" mode="scaleToFill" class="userImg" />
      <view class="userDetail">
        <view class="name">蔡守腾</view>
        <view class="identity">
          <view class="moreidentity" v-for="item in 2" :key="item">123</view>
        </view>
      </view>
    </view>
    <view class="right">
      <image src="../image/share.png" mode="scaleToFill" class="share" />
    </view>
  </view>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
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