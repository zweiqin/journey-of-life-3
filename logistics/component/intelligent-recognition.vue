<template>
  <view class="intelligent-recognition-container">
    <view class="title"> 地址智能识别： </view>
    <textarea
      v-model.trim="address"
      placeholder="地址智能识别: 如：广东省佛山市顺德区乐从镇和乐电商园1座李小明17000989898"
      class="textarea"
    ></textarea>
    <view class="btn-wrapper">
      <button class="btn" @click="handleShiBie">智能识别</button>
    </view>
  </view>
</template>

<script>
import { addressIntelligentRecogApi } from "../../api/logistics";
export default {
  data() {
    return {
      address: "",
    };
  },
  methods: {
    async handleShiBie() {
      if (!this.address) {
        uni.showToast({
          title: "请输入信息",
          duration: 2000,
          icon: "none",
        });
        return;
      }

      const { data } = await addressIntelligentRecogApi(this.address);

      if (data) {
        this.$emit("intelligent", data);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";
@color: #3662ec;

.intelligent-recognition-container {
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;

  textarea {
    width: 100%;
    height: 100%;
    min-height: 100px;
  }

  .title {
    font-size: @f12;
    color: @c9;
    margin: 10px 0;
  }

  .btn-wrapper {
    text-align: right;

    .btn {
      width: auto;
      color: @cw;
      display: inline;
      font-size: @f14;
      background-color: @color;
      padding: 10px;
      border-radius: 40px;
    }
  }
}
</style>