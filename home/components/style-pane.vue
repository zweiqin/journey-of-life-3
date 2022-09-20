<template>
  <view class="style-container">
    <view class="title">风格专区</view>
    <view class="values">
      <view
        class="item"
        :class="{ active: selectEdId == item.id }"
        v-for="item in styleList"
        :key="item.id"
        @click="handleSelectStyle(item.id)"
        >{{ item.name }}</view
      >
    </view>
    <view class="title">品类专区</view>
    <view class="values">
      <view
        class="item"
        :class="{ active: selectEdCategoryId == item.id }"
        v-for="item in categoryList"
        :key="item.id"
        @click="handleSearchStyle(item.id)"
        >{{ item.name }}</view
      >
    </view>
  </view>
</template>

<script>
import { STYLE_LIST } from "../../constant";
import { getTypeDetailList } from "../../api/home";

export default {
  props: {
    styleId: String,
    categoryId: String,
  },
  data() {
    return {
      styleList: [],
      categoryList: [],
      selectEdId: "",
      selectEdCategoryId: "",
    };
  },

  methods: {
    handleSelectStyle(id) {
      this.$emit("changeStyle", id);
    },

    handleSearchStyle(id) {
      this.$emit("search", id);
    },
  },

  watch: {
    styleId: {
      async handler(value) {
        this.selectEdId = value;
        const res = await getTypeDetailList({
          id: value,
        });

        if (res.errno === 0) {
          this.categoryList = res.data.currentSubCategory;
        } else {
          uni.showToast({
            title: res.errmsg,
            duration: 2000,
          });
        }
      },

      immediate: true,
    },

    categoryId: {
      handler(value) {
        this.selectEdCategoryId = value;
      },

      immediate: true,
    },
  },

  mounted() {
    this.styleList = uni.getStorageSync(STYLE_LIST).map((item) => {
      item.name = item.name.replaceAll("风格", "");
      return item;
    });
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin";

.style-container {
  .title {
    font-size: @f12;
    color: @c0;
    font-weight: bold;
    margin-bottom: 24upx;
  }

  .values {
    font-size: @f12;
    color: @c3d;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 12px;

    .item {
      margin-right: 20px;
      line-height: 2;

      &.active {
        color: #ff8f1f;
      }
    }
  }
}
</style>