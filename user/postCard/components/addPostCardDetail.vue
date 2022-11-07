<template>
  <view>
    <view class="img">
        <img
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/85115xwj5kvwfuohwoox.png"
          alt=""
          class="addImg"
        />
        <view class="imgText">添加名片图像</view>
      </view>
    <view class="input">
      <view class="inputTitle">{{ inputTitle}}</view>
      <input
        :placeholder="mandatorytext"
        placeholder-class="input-placeholder"
        v-model="form.name"
        class="inputDetail"
      />
    </view>
  </view>
</template>

<script>
import { basicInformation, contact } from "../config";
export default {
  props: {
    imgUrl: String,
    inputText: String,
    inputTitle: String,
    mandatory: Boolean,
    title: String,

    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mandatorytext: "",

      form: {
        basicInformation: {},
      },
    };
  },
  computed: {},
  methods: {

    mandatoryType() {
      if (this.mandatory) {
        console.log("必填");
        this.mandatorytext = "（必填）";
      } else {
        console.log("非必填");
      }
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.mandatoryType();
  },
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
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30upx 0;
  .addImg {
    width: 160upx;
    height: 160upx;
  }
  .imgText {
    color: #999999;
    font-size: 26upx;
  }
}
.input {
  display: flex;
  .inputTitle {
    font-size: 28upx;
    font-weight: 500;
    width: 10%;
    padding-right: 20upx;
  }
  .inputDetail {
    border-bottom: 1upx solid #999999;
    width: 90%;
    font-size: 28upx;
    font-weight: 500;
  }
}
</style>