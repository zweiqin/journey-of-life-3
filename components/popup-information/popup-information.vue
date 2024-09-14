<template>
  <view style="position: absolute; top: 0; left: 0; z-index: 99999" class="popup-information-container">
    <!-- <view style="width: 100vw;height: 100vh;"></view> -->
    <view v-show="type === 'activity' || type === 'upgrade'">
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
    <view v-if="type === 'temporaryRecruitmentActivities'">
			<tui-landscape
				show :position="1" mask mask-closable
				:close-icon="false"
				:z-index="997" :mask-z-index="996" @close="close"
			>
				<view style="position: relative;">
					<view
						style="position: absolute;z-index: 1;top: 24rpx;right: 44rpx;width: 52rpx;height: 56rpx;" @click.stop="close"
					></view>
					<view @click="type = '' || $emit('click')">
						<image
							:src="imgUrl" mode="widthFix"
							style="width: 580rpx;max-height: 75vh;"
						/>
					</view>
				</view>
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
      type: '',
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

<style lang="less" scoped>
.popup-information-container {
	/deep/ .tui-landscape__box {
		.tui-landscape__inner {
			top: 40%;
		}
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
