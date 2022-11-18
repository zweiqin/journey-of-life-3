<template>
  <div class="purchase">
    <Ttitle :title="title"></Ttitle>
    <view class="purchaseType" @click="choseType"
      >采购类型

      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/g8tymx9pnuxpeq3gqv9w.png "
        alt=""
        class="open"
        v-if="hint"
      />
      <img
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gt0qlqophx3e78rby7lu.png "
        alt=""
        class="close"
        v-else-if="!hint"
      />
    </view>
    <view class="purchaseDetail" :class="{ trigger: hint != true }">
      <view class="c">
        <view
          class="d"
          @click="chosePurchase(item.value)"
          v-for="item in purrchaseType"
          :key="item.value"
          :class="{z: item.value == currentTab}"
        >
          {{ item.label }}</view
        ></view
      >
    </view>
    <purchaseInput
      v-model="form.stuffDetail"
      :fields="purrchaseInput"
    ></purchaseInput>

    <view class="purchaseType"> 上传图片/视频</view>
    <view v-for="item in upLoadImgVlog" :key="item.value">
      <JUpload
        :title="item.lable"
        :imgUrl="form.upLoadImgVlog[item.field]"
        @upload="handleSaveImg(item.field, $event)"
        @delete="handleDeleteImg(item.field)"
      ></JUpload>
    </view>
    <view style="padding-top:40upx"></view>
    <purchaseInput v-model="form.linkMan" :fields="linkMan"></purchaseInput>
    <view class="bottom_button" @click="sumbit">发布</view>
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
import stuffStoreVue from "../../pages/stuff/components/stuff-store.vue";
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
      currentTab:0,
      hint: false,
      form: { stuffDetail: {}, upLoadImgVlog: {}, linkMan: {} },
    };
  },
  methods: {
    chosePurchase(item) {
      console.log(item);
      this.currentTab = item
    },
    choseType() {
      this.hint = !this.hint;
    },
    handleBack() {
      uni.navigateBack();
    },
    handleSaveImg(field, imgUrl) {
      this.form.upLoadImgVlog[field] = imgUrl;
      this.$forceUpdate();
    },
    handleDeleteImg(field) {
      this.form.upLoadImgVlog[field] = "";
      this.$forceUpdate();
    },
    sumbit() {
      const stuffDetail = { ...this.form.stuffDetail };
      const upLoadImgVlog = { ...this.form.upLoadImgVlog };
      const linkMan = { ...this.form.linkMan };
      console.log(stuffDetail, upLoadImgVlog, linkMan);
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
  .purchaseType {
    padding-top: 40upx;
    display: flex;
    font-size: 26upx;
  }
  .purchaseDetail {
    background-color: white;
    width: 100%;
    height: 200upx;
    transition: all 400ms;
    &.trigger {
      height: 0upx;
      overflow: hidden;
    }
    .c {
      display: flex;
      flex-wrap: wrap;
      .d {
        margin-top: 20upx;
        font-size: 24upx;
        width: 25%;
        text-align: center;
        &.z{
          color: #FA5151;
        }
      }
    }
  }
  .open {
    width: 40upx;
  }
  .close {
    width: 40upx;
  }
  .bottom_button {
    margin-top: 200upx;
    width: 100%;
    height: 72upx;
    border-radius: 40upx;
    background-color: #ff8f1f;
    text-align: center;
    line-height: 72upx;
    color: white;
    font-size: 36upx;
    font-weight: 600;
  }
}
</style>
