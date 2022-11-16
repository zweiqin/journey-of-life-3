<template>
  <div class="purchase">
    <purchaseInput
      v-model="form.stuffDetail"
      :fields="purrchaseInput"
    ></purchaseInput>
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
