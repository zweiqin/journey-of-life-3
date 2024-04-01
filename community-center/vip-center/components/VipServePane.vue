<template>
  <view class="vip-serves-pane" :style="{ 'border-radius': radius }">
    <view class="title">
			<view style="font-style: italic;color: #ff4200;font-size: 40rpx;font-weight: bold;">VIP</view>
      <view class="vip-title">{{ subTitle }}</view>
    </view>

    <tui-divider :height="42" dividerColor="#CDB2A1">{{ desc }}</tui-divider>

    <view class="serve-coantainer" v-if="type === 1">
      <tui-radio-group v-model="chooseServeContent">
        <tui-label v-for="(item, index) in data" :key="index">
          <tui-list-cell unlined backgroundColor="#FFFBF4">
            <view class="thorui-align__center">
              <tui-radio
                color="#FE0000"
                :checked="item.serverContent === value"
                :value="item.serverContent"
                borderColor="#999"
              >
              </tui-radio>
              <text class="tui-text">{{
                item.serverContent.replaceAll
                  ? item.serverContent.replaceAll("\n", "")
                  : item.serverContent
              }}</text>
            </view>
          </tui-list-cell>
        </tui-label>
      </tui-radio-group>
    </view>

    <view v-else>
      <tui-label v-for="(item, index) in data" :key="index">
        <tui-list-cell unlined backgroundColor="#FFFBF4">
          <view class="thorui-align__center">
            <tui-radio color="#FE0000" checked :value="item" borderColor="#999">
            </tui-radio>
            <text class="tui-text">{{ item }}</text>
          </view>
        </tui-list-cell>
      </tui-label>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
    radius: {
      type: String,
      default: "42rpx",
    },

    data: {
      type: Array,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      default: "任意一项清洗服务",
    },

    subTitle: {
      type: String,
      default: "家庭小卫士",
    },
  },
  data() {
    return {
      chooseServeContent: "",
    };
  },

  watch: {
    chooseServeContent: {
      handler(value) {
        this.$emit("input", value);
      },
    },

    value: {
      handler(value) {
        this.serverContent = value;
      },

      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.vip-serves-pane {
  box-sizing: border-box;
  background-color: #fffbf4;
  padding: 30upx 37upx;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10upx;

    .vip-icon {
      width: 74upx;
      height: 28upx;
    }

    .vip-title {
      font-size: 32upx;
      color: #000;
      font-weight: 500;
      margin-left: 20upx;
    }
  }

  /deep/ .tui-text {
    margin-left: 34upx;
    font-size: 32upx;
    color: #3d3d3d;
  }
}
</style>
