<template>
  <view class="marketing-planner-container">
    <JHeader width="50" height="50" title="营销策划师升级信息填写"></JHeader>
    <FieldPane
      :fields="infomations"
      title="信息填写"
      v-model="form.accountInfo"
    ></FieldPane>

    <JUpload
      v-for="item in identImgs"
      :key="item.label"
      :title="item.label"
      :imgUrl="form.imgs[item.field]"
      @upload="handleSaveImg(item.field, $event)"
      @delete="handleDeleteImg(item.field)"
    ></JUpload>

    <view class="buts">
      <button class="btn" @click="submit(false)">保存</button>
      <button class="btn" @click="submit(true)">提交</button>
    </view>
  </view>
</template>

<script>
import FieldPane from "./components/field-pane.vue";
import { infomations, identImgs } from "./config";

export default {
  components: {
    FieldPane,
  },

  data() {
    return {
      infomations,
      identImgs,

      // 表单
      form: {
        imgs: {},
      },
    };
  },

  methods: {
    // 图片上传成功
    handleSaveImg() {},

    // 删除图片
    handleDeleteImg() {},

    // 提交表单
    submit() {},
  },
};
</script>

<style lang="less" scoped>
.marketing-planner-container {
  padding: 46upx;
  box-sizing: border-box;

  .buts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 272upx;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 72upx;
      width: 306upx;
      font-size: 32upx;
      color: #fff;
      margin: 0;
      background-color: #07b9b9;
      border-radius: 100px;

      &:last-child {
        background-color: #fa5151;
      }
    }
  }
}
</style>