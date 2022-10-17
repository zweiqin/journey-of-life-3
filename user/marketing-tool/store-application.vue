<template>
  <view class="store-application-container">
    <view class="header">
      <img src="" class="back" alt="" />
    </view>
    <FieldPane
      :fields="applyStoreOne"
      title="账号信息"
      v-model="form.accountInfo"
    ></FieldPane>

    <FieldPane
      :fields="applyStoreTow"
      title="门店信息"
      v-model="form.storeInfo"
    ></FieldPane>

    <UploadPane></UploadPane>
  </view>
</template>

<script>
import Update from "../../wxcomponents/vant/dist/uploader/index.vue";
import FieldPane from "./components/field-pane.vue";
import UploadPane from "./components/upload-pane.vue";
import { applyStoreOne, applyStoreTow } from "./config";

export default {
  components: {
    FieldPane,
    UploadPane,
    Update,
  },
  data() {
    return {
      applyStoreOne,
      applyStoreTow,
      form: {
        accountInfo: {},
        storeInfo: {},
      },
    };
  },
};
</script>

<style lang="less" scoped>
.store-application-container {
  padding: 40upx;
  box-sizing: border-box;
}
</style>