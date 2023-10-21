<template>
  <view class="cancel-popup-container">
    <uni-popup
      style="width: 80%"
      ref="popup"
      type="bottom"
      @change="handleStatusChange"
    >
      <slot>
        <view class="default">
          <view class="title">{{ title }}</view>
          <radio-group @change="handleRadioChange">
            <label
              v-for="item in cancelList"
              :key="item.label"
              class="uni-list-cell uni-list-cell-pd"
            >
              <radio color="#318ffe" :value="item.label" />
              <view class="text">{{ item.value }}</view>
            </label>

            <label class="uni-list-cell uni-list-cell-pd">
              <radio color="#318ffe" value="其他" />
              <view class="text">其他</view>
            </label>

            <textarea
              v-show="showMore"
              class="input-textarea"
              placeholder="请输入取消原因"
              v-model="selectText"
            />
          </radio-group>

          <view class="btns">
            <button class="btn" @click="cancel">取消</button>
            <button class="btn" @click="confirm">确定</button>
          </view>
        </view>
      </slot>
    </uni-popup>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      default: "请选择取消原因",
    },

    position: {
      type: String,
      default: "center",
    },

    cancelList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      popupVisiable: false,
      showMore: false,
      selectText: "",
    };
  },

  methods: {
    handleStatusChange(e) {
      this.$emit("input", e.show);
    },

    handleRadioChange(e) {
      this.showMore = e.detail.value === "其他";
      this.selectText = this.showMore ? "" : e.detail.value;
    },

    cancel() {
      this.$refs.popup.close();
    },

    confirm() {
      this.$emit("confirm", this.selectText);
      this.$refs.popup.close();
    },
  },

  watch: {
    value: {
      handler(value) {
        this.popupVisiable = value;
        if (value) {
          this.$refs.popup.open(this.position);
        }
      },

      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.cancel-popup-container {
  .title {
    font-weight: bold;
  }
  .default {
    margin: 0 auto;
    width: 100%;
    transition: all 350ms linear;
    padding: 40upx 80upx;
    box-sizing: border-box;
    background-color: @cw;
    border-radius: @r5;
  }

  .uni-list-cell {
    display: flex;
    margin: 20upx 0;
    align-items: center;
  }

  .text {
    margin-left: 10upx;
    white-space: nowrap;
  }

  .input-textarea {
    padding: 10upx 0;
    border-top: 1upx solid @c9;
    min-height: 30upx;
  }

  .btns {
    display: flex;
    margin-top: 52upx;

    .btn {
      width: 120upx;
      height: 60upx;
      font-size: @f12;
      color: @cw;

      &:nth-child(1) {
        background-color: #d2691e;
        margin-right: 20upx;
      }

      &:nth-child(2) {
        background-color: #3662ec;
      }
    }
  }
}
</style>