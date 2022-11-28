<template>
  <view class="brandGoods">
    <view class="leftSort">
      <view
        class="leftSort1"
        v-for="(item, index) in filterCategoryList"
        :key="item.value"
        :class="{
          choseSort: item.value == currentTab,
          lastSort: index == currentIndex + 1 ? true : false,
        }"
        @click="cutSort(item.value, index)"
      >
        {{ item.label }}</view
      >
      <view class="endSort"></view>
    </view>
    <view class="Goods">
      <acrossGoods
        v-for="item in allGoodsList"
        :key="item.value"
        :name="item.name"
        :sname="item.goodsSn"
        :price="item.retailPrice"
        :id="item.id"
        :url="item.picUrl"
      ></acrossGoods>
    </view>
  </view>
</template>

<script>
import { goodsSort } from "./config";
import acrossGoods from "../../../components/acrossGoods";
export default {
  props: { allGoodsList: Array, filterCategoryList: Array },
  data() {
    return { goodsSort, currentTab: 0, currentIndex: 0, CategoryId: "" };
  },
  computed: {},
  components: {
    acrossGoods,
  },
  methods: {
    cutSort(item, index) {
      this.currentTab = item;
      this.CategoryId = item;
      this.currentIndex = index;
      this.$emit("getCateGoryId", this.CategoryId);
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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
.brandGoods {
  display: flex;

  .leftSort {
    width: 160upx;
    flex-direction: column;
    display: flex;
    padding-right: 20upx;
    .leftSort1 {
      text-align: center;
      padding: 20upx 0;
      background-color: #f1f2f6;
      font-size: 28upx;
      display: flex;
      justify-content: center;
      &.choseSort {
        color: #e95d20;
        background: white;
      }
      &.lastSort {
        border-radius: 0 15upx 0 0;
      }
    }
  }
  .endSort {
    flex: 1;
    width: 160upx;
    background-color: #f1f2f6;
  }
  .Goods {
  }
}
</style>