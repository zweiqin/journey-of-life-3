<template>
  <view class="main-menus-conatainer">
    <scroll-view
      scroll-x="true"
      :scroll-into-view="'item_' + value"
      scroll-with-animation
    >
      <view class="wrapper">
        <view
          class="item"
          @click="handleClickOnceMenuItem(item)"
          v-for="item in onceMenus"
          :key="item.id"
          :id="`item_${item.id}`"
        >
          <image :src="item.iconUrl" mode="" />
          <text>{{ item.name }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getGoodsTypesApi } from "../../../api/home";
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.getGoodsTypes();
  },

  data() {
    return {
      onceMenus: [],
    };
  },

  methods: {
    async getGoodsTypes() {
      const res = await getGoodsTypesApi({
        goodsType: 1,
      });

      if (res.errno === 0) {
        this.onceMenus = res.data.categoryList.filter(
          (item) => item.desc === "搜家具"
        );
      }
    },

    handleClickOnceMenuItem(item) {
      this.$emit("choose", item.id);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .uni-scroll-view::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.main-menus-conatainer {
  padding: 20upx;
  background-color: #f3f3f3;

  .wrapper {
    display: flex;
    align-items: center;
  }
}
.item {
  width: 130upx;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20upx 10upx;
  color: #929292;
  margin-right: 20upx;
  transition: transform 350ms;

  image {
    width: 120upx;
    height: 120upx;
    object-fit: cover;
    margin-bottom: 10upx;
  }
}
</style>