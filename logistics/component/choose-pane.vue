<template>
  <view>
    <view class="mask" :class="{ 'show-mask': show }"></view>
    <view
      class="choose-pane-container"
      :style="{
        transform: show
          ? 'scale(1) translate(-50%, -50%) '
          : 'scale(0) translate(-50%, -50%)',
      }"
    >
      <view class="pane">
        <view v-if="paneData.goodType" class="fu-info">
          <text>{{ paneData.goodType.split(",")[1] }}</text>
          <image
            :src="
              paneData.url ||
              'https://img2.baidu.com/it/u=2714638453,2125597042&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
            "
            mode=""
          />
        </view>
        <view class="ops">
          <image
            class="close"
            @click="close"
            src="../../static/images/wuliu/close.png"
            mode=""
          />
          <view class="op-wrapper">
            <view class="tao">
              <view class="numbers"
                ><text class="fu" @click="op('goodAmount', -1)">-</text>
                <text>{{ paneData.goodAmount }}</text>
                <text class="fu" @click="op('goodAmount', +1)">+</text></view
              >
              <text class="unit">套</text>
            </view>
            <view class="tao">
              <view class="numbers">
                <text class="fu" @click="op('packAmount', -1)">-</text>
                <text>{{ paneData.packAmount }}</text>
                <text class="fu" @click="op('packAmount', +1)">+</text>
              </view>
              <text class="unit">件</text>
            </view>
            <view class="tao">
              <view class="numbers">
                <input v-model="paneData.volume" type="text" />
              </view>
              <text class="unit">方</text>
            </view>
          </view>
        </view>
      </view>
      <button class="uni-btn" @click="handleConfirm">确定</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      paneData: {},
    };
  },

  methods: {
    // 关闭
    close() {
      this.show = false;
    },
    showPane(data) {
      this.paneData = data;
      this.show = true;
    },
    handleConfirm() {
      const data = JSON.parse(JSON.stringify(this.paneData));
      delete data.url;
      if (Number(data.volume)!== 0 && !Number(data.volume)) {
        uni.showToast({
          title: "方数输入错误" ,
          icon: 'none'
        });

        return;
      }
      this.$emit("confirm", data);
      this.close();
    },
    op(tag, number) {
      if (this.paneData[tag] + number >= 1) {
        this.paneData[tag] += number;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;

  &.show-mask {
    height: 100vh;
    background-color: transparent;
  }
}
.choose-pane-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 350ms;

  .pane {
    width: 474upx;
    height: 320upx;
    background-color: #fff;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
    border-radius: 10upx;
    padding: 26upx 24upx 66upx 46upx;
    display: flex;
    box-sizing: border-box;

    .fu-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      image {
        width: 160upx;
        height: 160upx;
        border-radius: 10upx;
      }
    }

    .ops {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      margin-left: 40upx;
      margin-right: 20upx;
    }

    .op-wrapper {
      .tao {
        display: flex;
        align-items: center;
        margin-top: 20upx;

        .unit {
          margin-left: 10upx;
        }
      }
      .numbers {
        width: 116upx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          width: 100%;
          height: 36upx;
          min-height: 36upx;
          border: 1upx solid #777777;
        }

        .fu {
          display: block;
          width: 28upx;
          height: 28upx;
          text-align: center;
          line-height: 24upx;
          background-color: #e95d20;
          color: #fff;
        }
      }
    }

    .close {
      width: 30upx;
      height: 30upx;
    }
  }

  .uni-btn {
    width: 218upx;
    height: 64upx;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e95d20;
    margin-top: 22upx;
    font-size: 28upx;
    background-color: #fff;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
  }
}
</style>