<template>
  <view class="vip-footer">

    <view class="btns">
      <button @click="go('/user/sever/goldButler/gold-butler')" class="uni-btn">
        <image class="" src="../../../static/images/con-center/vip/MORE-VIP.png"> </image>
        <text>更多套餐会员</text>
      </button>
      <button @click="go('/user/sever/goldButler/gold-butler')" class="uni-btn">
        <image class="" src="../../../static/images/con-center/vip/MY-VIP.png"> </image>
        <text>我的会员</text>
      </button>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.vip-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;


  .btns {
    height: 98upx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30upx;

    .uni-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      image {
        width: 44upx;
        height: 44upx;
      }

      text {
        color: #000;
        font-size: 28upx;
        font-weight: 500;
        margin-left: 10upx;
      }

      &:nth-child(2) {
        &::after {
          display: block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          width: 1upx;
          height: 25upx;
          border: 1upx solid #873816;
          transform: scaleX(0.5);
        }
      }

    }
  }
}
</style>