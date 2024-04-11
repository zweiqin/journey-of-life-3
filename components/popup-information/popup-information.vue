<template>
  <view style="position: absolute; top: 0; left: 0; z-index: 99999">
    <!-- <view style="width: 100vw;height: 100vh;"></view> -->
    <view v-show="type === 'activity' || type === 'upgrade'" class="container">
      <tui-landscape show :position="1" mask mask-closable :icon-size="28" icon-color="#FFFFFF" icon-left="50rpx" icon-right="50rpx" @close="close">
        <view @click="type = '' || $emit('click')">
          <image :src="imgUrl" mode="widthFix" style="width: 500upx; max-height: 75vh; border-radius: 20rpx;" />
          <!-- <view style="position: absolute;top: 52%;left:52%;font-size: 38rpx;font-weight: 700;">羊驼坐凳</view> -->
        </view>

        <slot name="tip">
          <view v-if="tip" class="tip">{{ tip }}</view>
        </slot>
        <button class="uni-btn" @click="handleNoShow">不再显示</button>
      </tui-landscape>
    </view>
  </view>
</template>

<script>
const app = getApp();
export default {
  name: 'PopupInformation',
  props: {
    imgUrl: String,
    popupType: {
      type: String,
      required: true
    },
    tip: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      src: '',
      type: ''
    };
  },

  watch: {},
  created() {
    // console.log(app)
  },

  methods: {
    close() {
      this.$emit('close');
      this.type = '';
    },

    show() {
      this.type = this.popupType;
    },

    handleNoShow() {
      app.globalData.isShowCommunityPopup = false;
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  image {
    // flex-shrink: 0;
  }
  /deep/ .tui-landscape__inner {
    top: 40%;
  }
}

.uni-btn {
  font-size: 28upx;
  color: #fff;
  margin-top: 10upx;
}

.tip {
  color: #fff;
  margin: 32rpx 0;
  font-size: 28rpx;
  font-weight: 500;
}
</style>
