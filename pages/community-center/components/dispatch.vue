<template>
  <view class="dispatch" v-show="value">

    <view id="front" class="sub ">
    <view class="main">
      <view class="background">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/bluymdw18gabv1xygll0.png"
          alt=""
          class="img1 animate__animated animate__slideInDown"
        />
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/ryb0ley5o3onb7ulb04n.png"
          alt=""
          class="img2 animate__animated animate__slideInDown"
        />
      </view>
      <view class="front animate__animated animate__slideInDown">
        <img
          src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/10wne3xyxvf7kdsoc9nb.png"
          alt=""
          class="discount"
        />
      </view>
    </view>
    <view class="foot animate__animated animate__bounce" @click="handleToViewDetail">
      <text>立即使用</text>
    </view>
    <!-- <JIcon
      @click="$emit('input', false)"
      type="mask-close"
      class="closeIcon animate__animated animate__bounce"
    ></JIcon> -->

    <image
      src="../../../static/images/con-center/close.png"
      mode="scaleToFill"
      @click="$emit('input', false)"
      type="mask-close"
      class="closeIcon animate__animated animate__bounce"
    />



</view>
  </view>
</template>

<script>
export default {
  name: "Dispatch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleToViewDetail() {
      uni.navigateTo({
        url: "/community-center/vip-center/vip-detail",
      });
    },

  },
  created() {},
};
</script>

<style lang="scss" scoped>
#front{
  animation-duration: 1000ms;
}

.dispatch {
  background-color: rgba(98, 98, 98, 0.33);
  position: fixed;
  left: 0;
  top: 0upx;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .sub{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: -100upx;
  .main {
    // width: 100%;
    width: 290px;
    // top: -90px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .background {
      width: 100%;
      position: absolute;
      .img1 {
        width: 356upx;
        height: 348upx;
        position: absolute;
        left: 0;
        top: -180upx;
      }
      .img2 {
        width: 260upx;
        height: 240upx;
        position: absolute;
        right: 20upx;
        top: -20upx;
      }
    }
    .front {
      position: absolute;
      .discount {
        width: 350upx;
        height: 464upx;
      }
    }
  }
  .foot {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 256upx;
    width: 276upx;
    height: 68upx;
    border-radius: 100upx;
    background: linear-gradient(270deg, #8a38f5 2%, #07c2fb 78%);
    box-sizing: border-box;
    border-image: linear-gradient(180deg, #ffffff 0%, #3662ec 100%) 1;
    font-size: 36upx;
    font-weight: 500;
    color: #ffffff;
  }
  .closeIcon {
    position: relative;
    top: 290upx;
    width: 70upx;
    height: 70upx;
  }

}

}
</style>
