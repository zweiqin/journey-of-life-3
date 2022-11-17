<template>
  <div class="purchase">
    <Ttitle :title="title"></Ttitle>
    <purchaseInput
      v-model="form.stuffDetail"
      :fields="purrchaseInput"
    ></purchaseInput>
    <view>上传图片/视频</view>
    <JUpload></JUpload>
    <JUpload></JUpload>
    <purchaseInput v-model="form.linkMan" :fields="linkMan"></purchaseInput>
  </div>
</template>





<script>
import purchaseInput from "./purchaseInput";
import {
  purrchaseType,
  purrchaseInput,
  upLoadImgVlog,
  linkMan,
} from "./config";
export default {
  name: "Purchase",
  props: {},
  components: {
    purchaseInput,
  },
  data() {
    return {
      keywords: "",
      purrchaseType,
      title: "一件采购",
      purrchaseInput,
      upLoadImgVlog,
      linkMan,
      form: { stuffDetail: {}, upLoadImgVlog: {}, linkMan: {} },
    };
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
  watch: {
    form: {
      handler(value) {
        // console.log(value);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
};
</script>







<style lang="scss" scoped>
.purchase {
  padding: 36upx;
}
</style>
